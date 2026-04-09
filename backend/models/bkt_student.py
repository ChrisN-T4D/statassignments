"""
bkt_student.py — Student-level services for the MethodsMarket platform.

This module implements identity resolution, behavioral clustering, at-risk
detection, and mastery aggregation for undergraduate psychology students
learning statistics.

Identity Resolution Research Context
-------------------------------------
Students in multi-section or multi-semester deployments frequently appear
under different user IDs due to LMS re-enrollment or instructor-created
accounts. Email-based canonical identity is the most reliable deduplication
strategy (Whitehill et al., 2017; Gardner & Brooks, 2018). Name-fuzzy
matching (edit-distance) serves as a fallback when email metadata is absent.

Design constraints:
- Single-semester scope: no persistent state across terms.
- 5–15 attempts per KC per student; cold-start dominates early estimates.
- Mastery expressed as probability buckets, not raw decimals.
- Per-(user, KC) mastery—not per-(user, class, KC)—to survive class transfers.
"""

import csv
import hashlib
import logging
import re
import time
from collections import defaultdict
from dataclasses import dataclass, field
from typing import Dict, List, Optional, Tuple

import numpy as np

from .bkt_core import MasteryBucket

logger = logging.getLogger(__name__)


def _bucket_label(mastery: float) -> str:
    """Map a mastery probability to its bucket string (matches :class:`MasteryBucket`)."""
    return MasteryBucket.from_pL(mastery).value


# ---------------------------------------------------------------------------
# AtRiskResult dataclass
# ---------------------------------------------------------------------------

@dataclass
class AtRiskResult:
    """
    Structured result returned by AtRiskDetector.detect().

    Attributes
    ----------
    is_at_risk:
        True when any risk threshold is exceeded.
    risk_level:
        Qualitative severity — "low", "moderate", "high", or "critical".
    risk_factors:
        Human-readable list explaining which thresholds were triggered.
    recommended_interventions:
        Suggested instructor or system actions ordered by urgency.
    struggling_kcs:
        Knowledge-component IDs where the student is below mastery threshold.
    timestamp:
        Unix epoch seconds at detection time.
    """
    is_at_risk: bool
    risk_level: str
    risk_factors: List[str]
    recommended_interventions: List[str]
    struggling_kcs: List[str]
    timestamp: float = field(default_factory=time.time)


# ---------------------------------------------------------------------------
# 1. StudentIdentityResolver
# ---------------------------------------------------------------------------

class StudentIdentityResolver:
    """
    Resolves fragmented student identities across classes or sections.

    In multi-section deployments the same physical student may hold several
    distinct user_id values (one per class enrollment).  This class builds a
    canonical identity map so that BKT mastery estimates survive the
    fragmentation.

    Parameters
    ----------
    resolution_strategy:
        Primary deduplication approach.  One of:
        - "email"      — lowercase-normalised email comparison (default)
        - "name_fuzzy" — edit-distance name matching
        - "lms_id"     — external LMS identifier field
    """

    def __init__(self, resolution_strategy: str = "email") -> None:
        valid = {"email", "name_fuzzy", "lms_id"}
        if resolution_strategy not in valid:
            raise ValueError(f"resolution_strategy must be one of {valid}")
        self.resolution_strategy = resolution_strategy

        # canonical_id -> [user_ids]
        self._canonical_map: Dict[str, List[str]] = {}
        # user_id -> canonical_id (reverse lookup)
        self._reverse_map: Dict[str, str] = {}

        logger.info("StudentIdentityResolver initialised with strategy=%s",
                    resolution_strategy)

    # ------------------------------------------------------------------
    # Email helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _normalise_email(email: str) -> str:
        """
        Produce a canonical email address.

        Steps:
        - Strip whitespace, lower-case.
        - For Gmail addresses: remove dots from local part, strip plus-aliases.
        - For all addresses: strip plus-aliases (user+tag@host -> user@host).
        """
        email = email.strip().lower()
        if not email:
            return email
        parts = email.split("@")
        if len(parts) != 2:
            return email
        local, domain = parts
        # Strip plus-alias
        local = local.split("+")[0]
        # Gmail dot-insensitivity
        if domain in ("gmail.com", "googlemail.com"):
            local = local.replace(".", "")
        return f"{local}@{domain}"

    def resolve_email(self, records: List[Dict]) -> Dict[str, List[str]]:
        """
        Group user records by normalised email address.

        Parameters
        ----------
        records:
            Each record must contain at minimum ``user_id`` and ``email``.
            Optional fields: ``name``, ``class_id``.

        Returns
        -------
        Dict mapping canonical_id -> [user_ids].
        The canonical_id is a SHA-256 prefix of the normalised email so it
        is stable across calls without exposing PII in logs.
        """
        email_to_ids: Dict[str, List[str]] = defaultdict(list)
        skipped = 0

        for rec in records:
            uid = str(rec.get("user_id", "")).strip()
            raw_email = str(rec.get("email", "")).strip()
            if not uid or not raw_email:
                skipped += 1
                continue
            norm = self._normalise_email(raw_email)
            email_to_ids[norm].append(uid)

        if skipped:
            logger.warning("resolve_email: skipped %d records with missing fields",
                           skipped)

        result: Dict[str, List[str]] = {}
        for norm_email, uid_list in email_to_ids.items():
            cid = self._make_canonical_id(norm_email)
            result[cid] = uid_list
            for uid in uid_list:
                self._canonical_map.setdefault(cid, uid_list)
                self._reverse_map[uid] = cid

        logger.info("resolve_email: %d records -> %d canonical identities",
                    len(records), len(result))
        return result

    # ------------------------------------------------------------------
    # Fuzzy name helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _normalise_name(name: str) -> str:
        """Lower-case, strip punctuation, collapse whitespace."""
        name = name.lower().strip()
        name = re.sub(r"[^a-z\s]", "", name)
        return re.sub(r"\s+", " ", name)

    @staticmethod
    def _edit_distance(a: str, b: str) -> int:
        """
        Classic Wagner-Fischer dynamic-programming edit distance.
        O(|a|·|b|) time and O(|b|) space.
        No external dependencies required.
        """
        if a == b:
            return 0
        if len(a) < len(b):
            a, b = b, a
        prev = list(range(len(b) + 1))
        for i, ca in enumerate(a, 1):
            curr = [i] + [0] * len(b)
            for j, cb in enumerate(b, 1):
                curr[j] = min(
                    prev[j] + 1,          # deletion
                    curr[j - 1] + 1,      # insertion
                    prev[j - 1] + (0 if ca == cb else 1),  # substitution
                )
            prev = curr
        return prev[-1]

    @staticmethod
    def _similarity(a: str, b: str) -> float:
        """Normalised edit-distance similarity in [0, 1]."""
        if not a and not b:
            return 1.0
        dist = StudentIdentityResolver._edit_distance(a, b)
        return 1.0 - dist / max(len(a), len(b))

    def resolve_name_fuzzy(
        self, records: List[Dict], threshold: float = 0.85
    ) -> Dict[str, List[str]]:
        """
        Group user records by fuzzy name similarity.

        Uses greedy single-link clustering: the first record with a name above
        *threshold* similarity to an existing canonical name becomes part of
        that group; otherwise it seeds a new group.

        Parameters
        ----------
        records:
            Each record must contain ``user_id`` and ``name``.
        threshold:
            Minimum normalised similarity to consider two names the same
            person.  Range [0, 1]; default 0.85.

        Returns
        -------
        Dict mapping canonical_id -> [user_ids].
        """
        groups: List[Tuple[str, List[str]]] = []  # (representative_name, [uid])

        for rec in records:
            uid = str(rec.get("user_id", "")).strip()
            raw_name = str(rec.get("name", "")).strip()
            if not uid or not raw_name:
                continue
            norm = self._normalise_name(raw_name)

            matched = False
            for rep_name, uid_list in groups:
                if self._similarity(norm, rep_name) >= threshold:
                    uid_list.append(uid)
                    matched = True
                    break
            if not matched:
                groups.append((norm, [uid]))

        result: Dict[str, List[str]] = {}
        for rep_name, uid_list in groups:
            cid = self._make_canonical_id(rep_name)
            result[cid] = uid_list
            for uid in uid_list:
                self._canonical_map.setdefault(cid, uid_list)
                self._reverse_map[uid] = cid

        logger.info("resolve_name_fuzzy: %d records -> %d canonical identities "
                    "(threshold=%.2f)", len(records), len(result), threshold)
        return result

    # ------------------------------------------------------------------
    # Mastery merge
    # ------------------------------------------------------------------

    def merge_mastery(
        self, mastery_dicts: List[Dict[str, float]]
    ) -> Dict[str, float]:
        """
        Merge mastery estimates from multiple user_ids belonging to one person.

        For each KC the maximum probability is taken, reflecting the most
        evidence of learning observed across all class contexts.

        Parameters
        ----------
        mastery_dicts:
            List of {kc_id: mastery_probability} dicts.

        Returns
        -------
        Single merged {kc_id: mastery_probability} dict.
        """
        merged: Dict[str, float] = {}
        for d in mastery_dicts:
            for kc, prob in d.items():
                merged[kc] = max(merged.get(kc, 0.0), float(prob))
        return merged

    def get_canonical_id(self, user_id: str) -> str:
        """
        Return the canonical identity for *user_id*, or *user_id* itself if
        no mapping has been resolved.
        """
        return self._reverse_map.get(user_id, user_id)

    def generate_resolution_report(self) -> Dict:
        """
        Summarise identity-resolution statistics.

        Returns
        -------
        Dict with keys:
        - total_user_ids: int
        - unique_identities: int
        - merged_groups: int  (groups with >1 user_id)
        - largest_group: int  (most user_ids in a single canonical identity)
        - potential_conflicts: int  (groups with >3 user_ids, likely errors)
        """
        total_ids = len(self._reverse_map)
        unique = len(self._canonical_map)
        merged = sum(1 for v in self._canonical_map.values() if len(v) > 1)
        sizes = [len(v) for v in self._canonical_map.values()]
        largest = max(sizes, default=0)
        conflicts = sum(1 for s in sizes if s > 3)

        report = {
            "total_user_ids": total_ids,
            "unique_identities": unique,
            "merged_groups": merged,
            "largest_group": largest,
            "potential_conflicts": conflicts,
        }
        logger.debug("Resolution report: %s", report)
        return report

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _make_canonical_id(key: str) -> str:
        """Stable, opaque canonical ID derived from *key* (email or name)."""
        return "cid_" + hashlib.sha256(key.encode()).hexdigest()[:12]


# ---------------------------------------------------------------------------
# 2. StudentClusterer
# ---------------------------------------------------------------------------

class StudentClusterer:
    """
    Groups students into behavioural clusters to inform BKT parameter priors.

    Rule-based classification is used instead of ML to remain effective at
    small cohort sizes (20–200 students per semester) without overfitting.

    Parameters
    ----------
    n_clusters:
        Number of target clusters.  Four profiles are pre-defined; this
        parameter is exposed for forward-compatibility with future ML backends.
    """

    PROFILES = ("quick_learner", "steady_worker", "struggling", "erratic")

    def __init__(self, n_clusters: int = 4) -> None:
        self.n_clusters = n_clusters
        # student_id -> cluster label
        self._assignments: Dict[str, str] = {}
        logger.info("StudentClusterer initialised with n_clusters=%d", n_clusters)

    # ------------------------------------------------------------------
    # Feature extraction
    # ------------------------------------------------------------------

    def extract_features(self, interaction_history: List[Dict]) -> Dict[str, float]:
        """
        Derive behavioural features from a student's interaction log.

        Each interaction dict should contain (all optional except ``correct``):
        - ``correct``:        1 / 0 / True / False
        - ``time_on_task``:   seconds spent on this question
        - ``changed_answer``: bool — student revised answer before submitting
        - ``scroll_depth``:   float in [0, 1] — reading engagement proxy
        - ``kc_id``:          knowledge component identifier

        Returns
        -------
        Dict with keys:
        - accuracy_first_3:        accuracy on the first 3 attempts
        - accuracy_trend:          OLS slope of correct/incorrect over time
        - avg_time_per_question:   mean seconds per interaction
        - time_variance:           variance of time-on-task
        - answer_change_rate:      proportion of answers that were revised
        - reading_engagement:      mean scroll depth (0 if absent)
        - attempts_before_mastery: attempts until mastery (NaN if not reached)
        """
        if not interaction_history:
            return self._zero_features()

        corrects = [int(bool(i.get("correct", 0))) for i in interaction_history]
        times = [float(i.get("time_on_task", 0.0)) for i in interaction_history]
        changed = [int(bool(i.get("changed_answer", False))) for i in interaction_history]
        scrolls = [float(i.get("scroll_depth", 0.0)) for i in interaction_history]

        n = len(corrects)

        # accuracy_first_3
        first3 = corrects[:3]
        accuracy_first_3 = float(np.mean(first3)) if first3 else 0.0

        # accuracy_trend: OLS slope over all attempts
        if n >= 2:
            x = np.arange(n, dtype=float)
            slope = float(np.polyfit(x, corrects, 1)[0])
        else:
            slope = 0.0

        avg_time = float(np.mean(times)) if times else 0.0
        time_var = float(np.var(times)) if len(times) > 1 else 0.0
        change_rate = float(np.mean(changed)) if changed else 0.0
        reading_eng = float(np.mean(scrolls)) if scrolls else 0.0

        # attempts_before_mastery: rolling BKT estimate exceeds 0.9
        attempts_before = float("nan")
        running_p = 0.3  # rough pL0
        for idx, c in enumerate(corrects):
            pT, pG, pS = 0.2, 0.25, 0.1
            # Simple forward update (not the authoritative BKT — just for clustering)
            if c:
                num = running_p * (1 - pS)
                denom = num + (1 - running_p) * pG
            else:
                num = running_p * pS
                denom = num + (1 - running_p) * (1 - pG)
            posterior = num / denom if denom else running_p
            running_p = posterior + (1 - posterior) * pT
            if running_p >= 0.9:
                attempts_before = float(idx + 1)
                break

        return {
            "accuracy_first_3": accuracy_first_3,
            "accuracy_trend": slope,
            "avg_time_per_question": avg_time,
            "time_variance": time_var,
            "answer_change_rate": change_rate,
            "reading_engagement": reading_eng,
            "attempts_before_mastery": attempts_before,
        }

    @staticmethod
    def _zero_features() -> Dict[str, float]:
        return {
            "accuracy_first_3": 0.0,
            "accuracy_trend": 0.0,
            "avg_time_per_question": 0.0,
            "time_variance": 0.0,
            "answer_change_rate": 0.0,
            "reading_engagement": 0.0,
            "attempts_before_mastery": float("nan"),
        }

    # ------------------------------------------------------------------
    # Cluster assignment
    # ------------------------------------------------------------------

    def assign_cluster(self, features: Dict[str, float]) -> str:
        """
        Map feature vector to one of four behavioural clusters using rules.

        Rules (evaluated in priority order):
        1. accuracy_first_3 > 0.7 AND accuracy_trend > 0  → "quick_learner"
        2. accuracy_first_3 > 0.4 AND accuracy_trend > 0  → "steady_worker"
        3. accuracy_trend < -0.1 OR accuracy_first_3 < 0.3 → "struggling"
        4. Otherwise                                        → "erratic"
        """
        a3 = features.get("accuracy_first_3", 0.0)
        trend = features.get("accuracy_trend", 0.0)

        if a3 > 0.7 and trend > 0:
            cluster = "quick_learner"
        elif a3 > 0.4 and trend > 0:
            cluster = "steady_worker"
        elif trend < -0.1 or a3 < 0.3:
            cluster = "struggling"
        else:
            cluster = "erratic"

        logger.debug("assign_cluster: a3=%.2f trend=%.4f -> %s", a3, trend, cluster)
        return cluster

    def get_cluster_priors(self, cluster: str) -> Dict[str, float]:
        """
        Return BKT parameter adjustment bonuses for *cluster*.

        The values are additive deltas applied to the platform's default BKT
        parameters before fitting.  They nudge the model toward priors that
        reflect the student's observed behaviour pattern.

        Returns
        -------
        Dict with zero or more keys from:
        ``pL0_bonus``, ``pT_bonus``, ``pG_bonus``, ``pS_bonus``.
        """
        priors: Dict[str, Dict[str, float]] = {
            "quick_learner": {"pL0_bonus": 0.10, "pT_bonus": 0.05},
            "steady_worker": {"pL0_bonus": 0.00, "pT_bonus": 0.02},
            "struggling":    {"pL0_bonus": -0.05, "pT_bonus": -0.03},
            "erratic":       {"pG_bonus": 0.05},
        }
        result = priors.get(cluster, {})
        logger.debug("get_cluster_priors(%s): %s", cluster, result)
        return result

    def recluster(self, all_features: Dict[str, Dict]) -> Dict[str, str]:
        """
        Re-assign every student to a cluster based on accumulated features.

        Parameters
        ----------
        all_features:
            Mapping of student_id -> feature dict (as returned by
            :meth:`extract_features`).

        Returns
        -------
        Mapping of student_id -> cluster label.  Also updates internal
        ``_assignments`` cache.
        """
        new_assignments: Dict[str, str] = {}
        for sid, feats in all_features.items():
            new_assignments[sid] = self.assign_cluster(feats)

        self._assignments.update(new_assignments)
        logger.info("recluster: processed %d students", len(new_assignments))
        return new_assignments


# ---------------------------------------------------------------------------
# 3. AtRiskDetector
# ---------------------------------------------------------------------------

class AtRiskDetector:
    """
    Identifies students at risk of failing based on mastery and engagement.

    Parameters
    ----------
    config:
        Optional dict overriding default thresholds:
        - mastery_threshold (float, default 0.4)
        - kc_struggling_ratio (float, default 0.5)
        - consecutive_errors (int, default 4)
        - engagement_drop (float, default 0.3)
        - time_in_semester_threshold (float, default 0.6)
    """

    _DEFAULTS = {
        "mastery_threshold": 0.4,
        "kc_struggling_ratio": 0.5,
        "consecutive_errors": 4,
        "engagement_drop": 0.3,
        "time_in_semester_threshold": 0.6,
    }

    def __init__(self, config: Optional[Dict] = None) -> None:
        cfg = dict(self._DEFAULTS)
        if config:
            cfg.update(config)
        self.mastery_threshold: float = float(cfg["mastery_threshold"])
        self.kc_struggling_ratio: float = float(cfg["kc_struggling_ratio"])
        self.consecutive_errors: int = int(cfg["consecutive_errors"])
        self.engagement_drop: float = float(cfg["engagement_drop"])
        self.time_in_semester_threshold: float = float(cfg["time_in_semester_threshold"])
        logger.info("AtRiskDetector initialised with config=%s", cfg)

    # ------------------------------------------------------------------
    # Core detection
    # ------------------------------------------------------------------

    def detect(
        self,
        student_mastery: Dict[str, float],
        interaction_history: List[Dict],
        semester_progress: float,
    ) -> AtRiskResult:
        """
        Evaluate a student's risk status.

        Parameters
        ----------
        student_mastery:
            Mapping of kc_id -> mastery probability in [0, 1].
        interaction_history:
            Chronological list of interaction dicts.  Each should contain:
            ``correct`` (int/bool), ``kc_id`` (str), ``timestamp`` (float),
            ``session_id`` (str, optional).
        semester_progress:
            Float in [0, 1] representing how far through the semester we are.

        Returns
        -------
        :class:`AtRiskResult` instance.
        """
        risk_factors: List[str] = []
        interventions: List[str] = []
        struggling_kcs: List[str] = []

        # ---- Factor 1: KC mastery below threshold -------------------------
        attempted_kcs = set(student_mastery.keys())
        if attempted_kcs:
            for kc, m in student_mastery.items():
                if m < self.mastery_threshold:
                    struggling_kcs.append(kc)
            ratio = len(struggling_kcs) / len(attempted_kcs)
            if ratio >= self.kc_struggling_ratio:
                risk_factors.append(
                    f"{len(struggling_kcs)}/{len(attempted_kcs)} KCs below mastery "
                    f"threshold ({self.mastery_threshold:.0%})"
                )
                interventions.append(
                    "Schedule office-hours review of: " + ", ".join(struggling_kcs[:3])
                )

        # ---- Factor 2: Consecutive errors on any KC -----------------------
        max_streak, streak_kc = self._max_consecutive_errors(interaction_history)
        if max_streak >= self.consecutive_errors:
            risk_factors.append(
                f"{max_streak} consecutive errors on KC '{streak_kc}'"
            )
            interventions.append(
                f"Provide targeted hint sequence for '{streak_kc}'"
            )

        # ---- Factor 3: Engagement decline ---------------------------------
        drop = self._engagement_drop(interaction_history)
        if drop >= self.engagement_drop:
            risk_factors.append(
                f"Session frequency dropped {drop:.0%} recently"
            )
            interventions.append(
                "Send re-engagement nudge; check LMS login recency"
            )

        # ---- Factor 4: Late semester + low overall mastery ----------------
        if semester_progress >= self.time_in_semester_threshold:
            overall = float(np.mean(list(student_mastery.values()))) \
                if student_mastery else 0.0
            if overall < self.mastery_threshold:
                risk_factors.append(
                    f"Past {self.time_in_semester_threshold:.0%} of semester "
                    f"with overall mastery {overall:.0%}"
                )
                interventions.append(
                    "Escalate to instructor; consider alternative assessment path"
                )

        # ---- Compute risk level -------------------------------------------
        n = len(risk_factors)
        if n == 0:
            risk_level = "low"
        elif n == 1:
            risk_level = "moderate"
        elif n == 2:
            risk_level = "high"
        else:
            risk_level = "critical"

        is_at_risk = n > 0

        if not interventions:
            interventions.append("Continue monitoring; no immediate action required")

        result = AtRiskResult(
            is_at_risk=is_at_risk,
            risk_level=risk_level,
            risk_factors=risk_factors,
            recommended_interventions=interventions,
            struggling_kcs=struggling_kcs,
        )
        logger.info(
            "detect: risk_level=%s factors=%d struggling_kcs=%d",
            risk_level, n, len(struggling_kcs),
        )
        return result

    # ------------------------------------------------------------------
    # Class-level summary
    # ------------------------------------------------------------------

    def get_class_risk_summary(self, all_students: Dict[str, Dict]) -> Dict:
        """
        Aggregate risk statistics across all students in a class.

        Parameters
        ----------
        all_students:
            Mapping of student_id -> dict with keys:
            - ``mastery``:              {kc_id: float}
            - ``interaction_history``:  List[Dict]
            - ``semester_progress``:    float

        Returns
        -------
        Dict with:
        - risk_counts:          {low, moderate, high, critical}
        - most_struggling_kcs:  list of KC IDs sorted by frequency of struggle
        - class_mastery_mean:   float, average mastery across all students/KCs
        - students_at_risk:     list of student_ids flagged is_at_risk=True
        """
        risk_counts: Dict[str, int] = {"low": 0, "moderate": 0, "high": 0, "critical": 0}
        kc_struggle_freq: Dict[str, int] = defaultdict(int)
        all_masteries: List[float] = []
        at_risk_ids: List[str] = []

        for sid, info in all_students.items():
            mastery = info.get("mastery", {})
            history = info.get("interaction_history", [])
            progress = float(info.get("semester_progress", 0.5))

            result = self.detect(mastery, history, progress)
            risk_counts[result.risk_level] = risk_counts.get(result.risk_level, 0) + 1

            for kc in result.struggling_kcs:
                kc_struggle_freq[kc] += 1

            all_masteries.extend(mastery.values())

            if result.is_at_risk:
                at_risk_ids.append(sid)

        sorted_kcs = sorted(kc_struggle_freq, key=kc_struggle_freq.get, reverse=True)
        class_mean = float(np.mean(all_masteries)) if all_masteries else 0.0

        return {
            "risk_counts": risk_counts,
            "most_struggling_kcs": sorted_kcs[:5],
            "class_mastery_mean": class_mean,
            "students_at_risk": at_risk_ids,
        }

    # ------------------------------------------------------------------
    # Private helpers
    # ------------------------------------------------------------------

    def _max_consecutive_errors(
        self, history: List[Dict]
    ) -> Tuple[int, str]:
        """Return (max_streak, kc_id) for the worst consecutive error run."""
        kc_streaks: Dict[str, int] = defaultdict(int)
        kc_max: Dict[str, int] = defaultdict(int)

        for interaction in history:
            kc = str(interaction.get("kc_id", "_unknown"))
            correct = int(bool(interaction.get("correct", 1)))
            if correct:
                kc_streaks[kc] = 0
            else:
                kc_streaks[kc] += 1
                kc_max[kc] = max(kc_max[kc], kc_streaks[kc])

        if not kc_max:
            return 0, ""
        worst_kc = max(kc_max, key=kc_max.get)
        return kc_max[worst_kc], worst_kc

    def _engagement_drop(self, history: List[Dict]) -> float:
        """
        Estimate session-frequency decline.

        Splits history into first-half and second-half by timestamp, counts
        unique sessions in each, returns relative drop (0 if no decline).
        """
        if len(history) < 4:
            return 0.0

        timestamps = [float(i.get("timestamp", 0.0)) for i in history]
        mid = (min(timestamps) + max(timestamps)) / 2.0

        sessions_early: set = set()
        sessions_late: set = set()
        for i, interaction in enumerate(history):
            ts = float(interaction.get("timestamp", timestamps[i]))
            sid = str(interaction.get("session_id", f"auto_{ts:.0f}"))
            if ts <= mid:
                sessions_early.add(sid)
            else:
                sessions_late.add(sid)

        early_n = max(len(sessions_early), 1)
        late_n = len(sessions_late)
        if late_n >= early_n:
            return 0.0
        return (early_n - late_n) / early_n


# ---------------------------------------------------------------------------
# 4. MasteryDashboard
# ---------------------------------------------------------------------------

class MasteryDashboard:
    """
    Aggregates and formats mastery data for instructor and student views.

    All methods are stateless; the dashboard is a pure transformation layer
    over mastery dicts produced by the BKT engine.
    """

    # Rough mastery -> letter grade mapping (single-semester heuristic)
    _GRADE_BANDS = [
        (0.90, "A"),
        (0.80, "B"),
        (0.70, "C"),
        (0.60, "D"),
        (0.00, "F"),
    ]

    def __init__(self) -> None:
        logger.info("MasteryDashboard initialised")

    # ------------------------------------------------------------------
    # Student-level summary
    # ------------------------------------------------------------------

    def get_student_summary(
        self, user_id: str, mastery: Dict[str, float]
    ) -> Dict:
        """
        Build a per-student mastery summary for the front-end dashboard.

        Parameters
        ----------
        user_id:
            Student identifier (used as-is in the returned dict).
        mastery:
            KC-level mastery probabilities, e.g. ``{"mean": 0.72, ...}``.

        Returns
        -------
        Dict with:
        - user_id
        - overall_mastery:       float, weighted (equal-weight) average
        - bucket_distribution:   {bucket_label: count}
        - strongest_kcs:         list of up to 3 (kc_id, mastery) pairs
        - weakest_kcs:           list of up to 3 (kc_id, mastery) pairs
        - estimated_grade_range: str, e.g. "B"
        """
        if not mastery:
            return {
                "user_id": user_id,
                "overall_mastery": 0.0,
                "bucket_distribution": {b.value: 0 for b in MasteryBucket},
                "strongest_kcs": [],
                "weakest_kcs": [],
                "estimated_grade_range": "F",
            }

        overall = float(np.mean(list(mastery.values())))

        bucket_dist: Dict[str, int] = {b.value: 0 for b in MasteryBucket}
        for m in mastery.values():
            bucket_dist[_bucket_label(m)] += 1

        sorted_kcs = sorted(mastery.items(), key=lambda x: x[1], reverse=True)
        strongest = [(k, round(v, 4)) for k, v in sorted_kcs[:3]]
        weakest   = [(k, round(v, 4)) for k, v in sorted_kcs[-3:]]

        grade = self._mastery_to_grade(overall)

        return {
            "user_id": user_id,
            "overall_mastery": round(overall, 4),
            "bucket_distribution": bucket_dist,
            "strongest_kcs": strongest,
            "weakest_kcs": weakest,
            "estimated_grade_range": grade,
        }

    # ------------------------------------------------------------------
    # Class-level summary
    # ------------------------------------------------------------------

    def get_class_summary(
        self, all_mastery: Dict[str, Dict[str, float]]
    ) -> Dict:
        """
        Build a class-wide mastery summary.

        Parameters
        ----------
        all_mastery:
            Mapping of student_id -> {kc_id: mastery_probability}.

        Returns
        -------
        Dict with:
        - class_average_mastery:   {kc_id: float}
        - class_bucket_distribution: {kc_id: {bucket: count}}
        - hardest_kcs:             list of (kc_id, avg_mastery) sorted ascending
        - students_by_risk:        placeholder (requires AtRiskDetector integration)
        """
        kc_values: Dict[str, List[float]] = defaultdict(list)
        for student_mastery in all_mastery.values():
            for kc, m in student_mastery.items():
                kc_values[kc].append(m)

        class_avg: Dict[str, float] = {
            kc: round(float(np.mean(vals)), 4)
            for kc, vals in kc_values.items()
        }

        class_bucket_dist: Dict[str, Dict[str, int]] = {}
        for kc, vals in kc_values.items():
            dist = {b.value: 0 for b in MasteryBucket}
            for m in vals:
                dist[_bucket_label(m)] += 1
            class_bucket_dist[kc] = dist

        hardest = sorted(class_avg.items(), key=lambda x: x[1])

        return {
            "class_average_mastery": class_avg,
            "class_bucket_distribution": class_bucket_dist,
            "hardest_kcs": hardest[:5],
            "students_by_risk": {},  # populate by joining with AtRiskDetector
        }

    # ------------------------------------------------------------------
    # CSV export
    # ------------------------------------------------------------------

    def export_mastery_csv(
        self, all_mastery: Dict[str, Dict[str, float]], filename: str
    ) -> str:
        """
        Export mastery data to a CSV file.

        Rows represent students; columns represent KCs.  Each cell contains
        the mastery probability as a percentage and the bucket label,
        e.g. "72.3% (proficient)".

        Parameters
        ----------
        all_mastery:
            Mapping of student_id -> {kc_id: mastery_probability}.
        filename:
            Destination file path.

        Returns
        -------
        Absolute path of the written file (same as *filename*).
        """
        all_kcs: List[str] = sorted(
            {kc for m in all_mastery.values() for kc in m}
        )
        header = ["student_id"] + [f"{kc}_pct" for kc in all_kcs] \
               + [f"{kc}_bucket" for kc in all_kcs]

        with open(filename, "w", newline="", encoding="utf-8") as fh:
            writer = csv.writer(fh)
            writer.writerow(header)
            for sid, mastery in sorted(all_mastery.items()):
                pct_row = [
                    f"{mastery.get(kc, 0.0) * 100:.1f}%" for kc in all_kcs
                ]
                bucket_row = [
                    _bucket_label(mastery.get(kc, 0.0)) for kc in all_kcs
                ]
                writer.writerow([sid] + pct_row + bucket_row)

        logger.info("export_mastery_csv: wrote %d students to %s",
                    len(all_mastery), filename)
        return filename

    # ------------------------------------------------------------------
    # Private helpers
    # ------------------------------------------------------------------

    def _mastery_to_grade(self, mastery: float) -> str:
        """Convert overall mastery probability to a letter-grade estimate."""
        for threshold, letter in self._GRADE_BANDS:
            if mastery >= threshold:
                return letter
        return "F"
