"""
bkt_advanced.py — Advanced BKT Extensions for MethodsMarket
============================================================
Implements prerequisite-aware BKT extensions, cross-skill transfer, cognitive
load estimation, adaptive diagnostic pre-testing, and spacing-based review
scheduling for an undergraduate statistics tutoring platform (MethodsMarket).

References
----------
- Corbett & Anderson (1994). Knowledge tracing. UMUAI 4(4). https://doi.org/10.1007/BF01099821
- TransKT cross-skill transfer: https://arxiv.org/abs/2505.13489
- TrueSkill / IRT cold-start ability estimation:
  https://lt.unt.edu/sites/default/files/ctools/trueskill_2019.pdf
- Vie & Kashima (2019). Knowledge Tracing Machines. AAAI. https://arxiv.org/abs/1811.03388
- Ebbinghaus (1885). Über das Gedächtnis. [Forgetting-curve basis for SpacingScheduler]
- Cen, Koedinger & Junker (2006). Learning factors analysis. ITS 2006.
"""

from __future__ import annotations

import logging
import math
import time
from collections import defaultdict, deque
from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional, Set, Tuple

import numpy as np

logger = logging.getLogger(__name__)

_LO, _HI = 0.01, 0.99

def _clamp(v: float, lo: float = _LO, hi: float = _HI) -> float:
    """Clamp *v* to [lo, hi]."""
    return max(lo, min(hi, v))

def _logistic(x: float) -> float:
    """Standard logistic function."""
    return 1.0 / (1.0 + math.exp(-x))


# ---------------------------------------------------------------------------
# 1. PrerequisiteGraph
# ---------------------------------------------------------------------------

_DEFAULT_EDGES: Dict[str, List[str]] = {
    "descriptive_stats":  ["distributions"],
    "distributions":      ["hypothesis_testing"],
    "probability":        ["hypothesis_testing"],
    "sampling":           ["confidence_intervals"],
    "confidence_intervals": ["hypothesis_testing"],
    "hypothesis_testing": ["t_tests"],
    "t_tests":            ["anova"],
    "anova":              ["regression"],
    "regression":         [],
}


class PrerequisiteGraph:
    """
    Directed graph of KC prerequisite relationships for introductory statistics.

    The default graph encodes the canonical course sequence:
    descriptive_stats → distributions → hypothesis_testing → t_tests → anova
    → regression, with probability and sampling/CI branches merging at
    hypothesis_testing.

    Parameters
    ----------
    edges : Dict[str, List[str]], optional
        Adjacency dict ``{source_kc: [dependent_kcs]}``.
        Defaults to the built-in statistics graph.
    """

    def __init__(self, edges: Optional[Dict[str, List[str]]] = None) -> None:
        self.edges: Dict[str, List[str]] = edges if edges is not None else _DEFAULT_EDGES
        self._prereq_map: Dict[str, List[str]] = defaultdict(list)
        self._all_nodes: Set[str] = set()
        for src, deps in self.edges.items():
            self._all_nodes.add(src)
            for d in deps:
                self._prereq_map[d].append(src)
                self._all_nodes.add(d)
        logger.debug("PrerequisiteGraph: %d nodes", len(self._all_nodes))

    def get_prerequisites(self, kc_id: str) -> List[str]:
        """Return direct prerequisites of *kc_id*."""
        return list(self._prereq_map.get(kc_id, []))

    def get_all_prerequisites(self, kc_id: str) -> List[str]:
        """Return all transitive prerequisites via BFS."""
        visited: Set[str] = set()
        q: deque[str] = deque(self.get_prerequisites(kc_id))
        while q:
            n = q.popleft()
            if n not in visited:
                visited.add(n)
                q.extend(self.get_prerequisites(n))
        return list(visited)

    def get_successors(self, kc_id: str) -> List[str]:
        """Return KCs that directly depend on *kc_id*."""
        return list(self.edges.get(kc_id, []))

    def topological_sort(self) -> List[str]:
        """
        Return KCs in topological order (prerequisites first) via Kahn's algorithm.

        Raises ValueError if a cycle is detected.
        """
        in_deg: Dict[str, int] = {n: 0 for n in self._all_nodes}
        for src, deps in self.edges.items():
            for d in deps:
                in_deg[d] = in_deg.get(d, 0) + 1
        q: deque[str] = deque(n for n, d in in_deg.items() if d == 0)
        result: List[str] = []
        while q:
            n = q.popleft()
            result.append(n)
            for s in self.edges.get(n, []):
                in_deg[s] -= 1
                if in_deg[s] == 0:
                    q.append(s)
        if len(result) != len(self._all_nodes):
            raise ValueError("Cycle detected in PrerequisiteGraph.")
        return result

    def get_readiness_score(self, student_mastery: Dict[str, float], target_kc: str) -> float:
        """
        Weighted average mastery of direct prerequisites for *target_kc*.

        Returns 1.0 if *target_kc* has no prerequisites (unconditionally ready).
        Direct prerequisites receive equal weight in this implementation.
        """
        prereqs = self.get_prerequisites(target_kc)
        if not prereqs:
            return 1.0
        score = float(np.mean([student_mastery.get(p, 0.0) for p in prereqs]))
        logger.debug("Readiness '%s': %.3f", target_kc, score)
        return _clamp(score, 0.0, 1.0)

    def graph_distance(self, src: str, dst: str, max_depth: int = 10) -> int:
        """BFS shortest-path length from *src* to *dst*; returns max_depth+1 if unreachable."""
        if src == dst:
            return 0
        visited = {src}
        q: deque[Tuple[str, int]] = deque([(src, 0)])
        while q:
            node, d = q.popleft()
            if d >= max_depth:
                continue
            for nb in self.edges.get(node, []):
                if nb == dst:
                    return d + 1
                if nb not in visited:
                    visited.add(nb)
                    q.append((nb, d + 1))
        return max_depth + 1


# ---------------------------------------------------------------------------
# 2. CrossSkillTransfer
# ---------------------------------------------------------------------------


class CrossSkillTransfer:
    """
    Models inter-KC knowledge transfer based on prerequisite structure.

    Implements a simplified variant of TransKT (https://arxiv.org/abs/2505.13489):
    high mastery on prerequisite KCs provides additive bonuses to the P(mastered)
    estimates of dependent KCs, with bonuses decaying exponentially with graph distance.

    Parameters
    ----------
    prerequisite_graph : PrerequisiteGraph
    transfer_rate : float
        Fraction of source mastery transferred per direct link (default 0.15).
    """

    def __init__(self, prerequisite_graph: PrerequisiteGraph, transfer_rate: float = 0.15) -> None:
        self.graph = prerequisite_graph
        self.transfer_rate = transfer_rate

    def compute_transfer_bonus(self, source_kc: str, target_kc: str, source_mastery: float) -> float:
        """
        Compute the mastery bonus transferred from *source_kc* to *target_kc*.

        Priority:
        1. Direct prerequisite link → ``transfer_rate * source_mastery``
        2. Transitive prerequisite (d ≤ 4 hops) → decayed by ``exp(-0.5*(d-1))``
        3. Shared prerequisite siblings → Jaccard-weighted, halved rate
        4. No relationship → 0.0
        """
        if source_kc == target_kc:
            return 0.0

        # Direct prerequisite
        if source_kc in set(self.graph.get_prerequisites(target_kc)):
            bonus = self.transfer_rate * source_mastery
            logger.debug("Direct transfer %s→%s: %.4f", source_kc, target_kc, bonus)
            return bonus

        # Transitive prerequisite
        d = self.graph.graph_distance(source_kc, target_kc)
        if d <= 4:
            bonus = self.transfer_rate * source_mastery * math.exp(-0.5 * (d - 1))
            logger.debug("Indirect transfer %s→%s (d=%d): %.4f", source_kc, target_kc, d, bonus)
            return bonus

        # Structural sibling (shared prerequisite ancestors)
        src_prereqs = set(self.graph.get_all_prerequisites(source_kc))
        tgt_prereqs = set(self.graph.get_all_prerequisites(target_kc))
        shared = src_prereqs & tgt_prereqs
        if shared:
            union = src_prereqs | tgt_prereqs
            sim = len(shared) / len(union) if union else 0.0
            bonus = (self.transfer_rate / 2.0) * source_mastery * sim
            logger.debug("Sibling transfer %s→%s (sim=%.2f): %.4f", source_kc, target_kc, sim, bonus)
            return bonus

        return 0.0

    def apply_transfer(self, student_mastery: Dict[str, float]) -> Dict[str, float]:
        """
        Apply cross-skill transfer bonuses to all KCs and return adjusted mastery dict.

        Bonuses are additive and results are clamped to [0.01, 0.99].

        References
        ----------
        TransKT: https://arxiv.org/abs/2505.13489
        """
        adjusted: Dict[str, float] = {}
        kcs = list(student_mastery)
        for tgt in kcs:
            bonus = sum(
                self.compute_transfer_bonus(src, tgt, student_mastery[src])
                for src in kcs if src != tgt
            )
            adjusted[tgt] = _clamp(student_mastery[tgt] + bonus)
            if abs(bonus) > 1e-6:
                logger.debug("Transfer '%s': %.4f → %.4f", tgt, student_mastery[tgt], adjusted[tgt])
        return adjusted


# ---------------------------------------------------------------------------
# 3. CognitiveLoadEstimator
# ---------------------------------------------------------------------------


class CognitiveLoadLevel(Enum):
    """Ordinal cognitive load levels derived from student behavioral signals."""
    LOW = "low"
    MODERATE = "moderate"
    HIGH = "high"
    OVERLOADED = "overloaded"


@dataclass
class CognitiveLoadConfig:
    """Thresholds for cognitive load signal scoring."""
    ttfs_fast: float = 3.0          # s: below → impulsive / guessing
    ttfs_slow: float = 60.0         # s: above → confusion
    changes_high: int = 3           # answer changes ≥ this → high load
    cramming_gap: float = 300.0     # s: gap < this → cramming
    optimal_gap: float = 3600.0     # s: gap > this → good spacing
    errors_moderate: int = 2        # consecutive errors → MODERATE signal
    errors_high: int = 3            # → HIGH signal
    errors_overloaded: int = 5      # → OVERLOADED signal


@dataclass
class SessionObservation:
    """Behavioral metadata for a single item response."""
    kc_id: str
    is_correct: bool
    difficulty: float                           # proportion-correct scale ∈ [0,1]
    time_to_first_selection: float              # seconds
    active_time: float                          # total active time on item (s)
    answer_changes: int
    timestamp: float = field(default_factory=time.time)
    time_since_last_attempt: Optional[float] = None  # None if first attempt


class CognitiveLoadEstimator:
    """
    Estimates momentary cognitive load from behavioral signals.

    Uses additive signal scoring: each behavioral indicator contributes a
    positive load score; the total maps to a ``CognitiveLoadLevel``.

    Signals considered
    ------------------
    - ``time_to_first_selection``: very fast (<3 s) or very slow (>60 s)
    - ``answer_changes``: 3+ changes → high load; 0 + wrong → rushing
    - ``active_time`` vs. difficulty-expected time
    - ``time_since_last_attempt``: short gaps → cramming indicator
    - Consecutive errors on the same KC

    Parameters
    ----------
    config : CognitiveLoadConfig, optional
    """

    def __init__(self, config: Optional[CognitiveLoadConfig] = None) -> None:
        self.cfg = config or CognitiveLoadConfig()
        self._consec_errors: Dict[str, int] = defaultdict(int)

    def estimate(self, obs: SessionObservation) -> CognitiveLoadLevel:
        """Estimate cognitive load level for a single observation."""
        cfg = self.cfg
        score = 0.0

        # Time to first selection
        if obs.time_to_first_selection < cfg.ttfs_fast:
            score += 0.5 if not obs.is_correct else 0.0
        elif obs.time_to_first_selection > cfg.ttfs_slow:
            score += 1.5

        # Answer changes
        if obs.answer_changes >= cfg.changes_high:
            score += 1.5
        elif obs.answer_changes == 0 and not obs.is_correct:
            score += 0.5  # rushing

        # Active time vs. expected
        expected = max(5.0, 30.0 * (1.0 - obs.difficulty) + 10.0)
        ratio = obs.active_time / expected
        if ratio > 3.0:
            score += 1.0
        elif ratio < 0.3:
            score += 0.5

        # Spacing effect
        if obs.time_since_last_attempt is not None:
            if obs.time_since_last_attempt < cfg.cramming_gap:
                score += 0.75
            elif obs.time_since_last_attempt > cfg.optimal_gap:
                score = max(0.0, score - 0.25)

        # Consecutive errors
        self._consec_errors[obs.kc_id] = 0 if obs.is_correct else self._consec_errors[obs.kc_id] + 1
        c = self._consec_errors[obs.kc_id]
        if c >= cfg.errors_overloaded:
            score += 3.0
        elif c >= cfg.errors_high:
            score += 2.0
        elif c >= cfg.errors_moderate:
            score += 1.0

        if score < 1.0:
            level = CognitiveLoadLevel.LOW
        elif score < 2.5:
            level = CognitiveLoadLevel.MODERATE
        elif score < 4.5:
            level = CognitiveLoadLevel.HIGH
        else:
            level = CognitiveLoadLevel.OVERLOADED

        logger.debug("CogLoad KC='%s' score=%.2f → %s", obs.kc_id, score, level.value)
        return level

    def get_pacing_recommendation(self, load_level: CognitiveLoadLevel, current_difficulty: float) -> Dict:
        """
        Return a pacing recommendation dict.

        Keys: ``action``, ``difficulty_delta``, ``message``, ``suggest_break``, ``suggest_review``.

        - LOW:        increase difficulty
        - MODERATE:   maintain (optimal zone)
        - HIGH:       reduce difficulty + suggest review
        - OVERLOADED: recommend break or topic switch
        """
        recs = {
            CognitiveLoadLevel.LOW: {
                "action": "increase_difficulty", "difficulty_delta": -0.10,
                "message": "You're doing great! Let's try something more challenging.",
                "suggest_break": False, "suggest_review": False,
            },
            CognitiveLoadLevel.MODERATE: {
                "action": "maintain", "difficulty_delta": 0.0,
                "message": "You're in the optimal learning zone. Keep going!",
                "suggest_break": False, "suggest_review": False,
            },
            CognitiveLoadLevel.HIGH: {
                "action": "reduce_difficulty", "difficulty_delta": +0.15,
                "message": "This looks challenging. Let's try a simpler problem first.",
                "suggest_break": False, "suggest_review": True,
            },
            CognitiveLoadLevel.OVERLOADED: {
                "action": "break_or_switch", "difficulty_delta": +0.25,
                "message": "Consider taking a short break or reviewing earlier material.",
                "suggest_break": True, "suggest_review": True,
            },
        }
        return recs[load_level]

    def track_session_load(self, session_observations: List[SessionObservation]) -> Dict:
        """
        Analyse cognitive load trajectory over a full practice session.

        Returns
        -------
        Dict with keys: ``load_trajectory`` (List[str]), ``peak_load`` (str),
        ``average_load_score`` (float, 0=LOW … 3=OVERLOADED),
        ``overloaded_count`` (int), ``recommendation`` (Dict).
        """
        _score = {CognitiveLoadLevel.LOW: 0, CognitiveLoadLevel.MODERATE: 1,
                  CognitiveLoadLevel.HIGH: 2, CognitiveLoadLevel.OVERLOADED: 3}
        self._consec_errors.clear()
        trajectory, scores = [], []
        peak = CognitiveLoadLevel.LOW
        for obs in session_observations:
            lvl = self.estimate(obs)
            trajectory.append(lvl.value)
            scores.append(_score[lvl])
            if _score[lvl] > _score[peak]:
                peak = lvl
        final_lvl = CognitiveLoadLevel(trajectory[-1]) if trajectory else CognitiveLoadLevel.LOW
        final_diff = session_observations[-1].difficulty if session_observations else 0.5
        return {
            "load_trajectory": trajectory,
            "peak_load": peak.value,
            "average_load_score": float(np.mean(scores)) if scores else 0.0,
            "overloaded_count": scores.count(3),
            "recommendation": self.get_pacing_recommendation(final_lvl, final_diff),
        }


# ---------------------------------------------------------------------------
# 4. DiagnosticPretest
# ---------------------------------------------------------------------------

_PROTOTYPE_NAMES = ["fast_learner", "careful_student", "struggling_student",
                    "inconsistent_student", "average_student"]


class DiagnosticPretest:
    """
    Adaptive diagnostic pre-test for cold-start mastery initialisation.

    Uses an IRT-inspired online ability estimator (similar to TrueSkill / ELO)
    to select maximally informative items and generate per-KC P(L0) priors.

    Reference: https://lt.unt.edu/sites/default/files/ctools/trueskill_2019.pdf

    Parameters
    ----------
    kc_list : List[str]
    prerequisite_graph : PrerequisiteGraph
    items_per_kc : int
        Maximum diagnostic items per KC (default 2).
    """

    def __init__(self, kc_list: List[str], prerequisite_graph: PrerequisiteGraph,
                 items_per_kc: int = 2) -> None:
        self.kc_list = kc_list
        self.graph = prerequisite_graph
        self.items_per_kc = items_per_kc
        topo = prerequisite_graph.topological_sort()
        kc_set = set(kc_list)
        self._kc_order = [k for k in topo if k in kc_set] + \
                         [k for k in kc_list if k not in set(topo)]
        logger.debug("DiagnosticPretest: %d KCs in prereq order", len(self._kc_order))

    def update_ability(self, current_ability: float, is_correct: bool,
                       item_difficulty: float, step: int) -> float:
        """
        Online ability update on the logit scale.

        Step size decays as ``0.5 / sqrt(step)`` to simulate decreasing
        learning rate with more evidence.

        Reference: https://lt.unt.edu/sites/default/files/ctools/trueskill_2019.pdf
        """
        step_size = 0.5 / math.sqrt(max(1, step))
        expected = _logistic(current_ability - item_difficulty)
        new_ability = current_ability + step_size * (float(is_correct) - expected)
        logger.debug("Ability: %.3f → %.3f (correct=%s)", current_ability, new_ability, is_correct)
        return new_ability

    def select_next_item(self, current_ability: float, answered_items: Set[str]) -> Tuple[str, str]:
        """
        Select the next (kc_id, question_id) pair for the diagnostic.

        Strategy
        --------
        1. Follow topological (prerequisite-first) order.
        2. Prefer untested KCs; skip KCs at item quota.
        3. Require at least one prereq item before testing a dependent KC.
        4. Returns a synthetic question_id encoding the KC and item number.
        """
        answered_by_kc: Dict[str, int] = defaultdict(int)
        for qid in answered_items:
            parts = qid.split("__", 1)
            if len(parts) == 2:
                answered_by_kc[parts[0]] += 1

        for kc in self._kc_order:
            if answered_by_kc[kc] >= self.items_per_kc:
                continue
            prereqs = self.graph.get_prerequisites(kc)
            if all(answered_by_kc[p] >= 1 for p in prereqs):
                qid = f"{kc}__q{answered_by_kc[kc] + 1}"
                logger.debug("DiagnosticPretest selected (%s, %s)", kc, qid)
                return (kc, qid)

        # Fallback: least-answered KC
        min_kc = min(self._kc_order, key=lambda k: answered_by_kc[k])
        qid = f"{min_kc}__q{answered_by_kc[min_kc] + 1}"
        return (min_kc, qid)

    def generate_initial_mastery(self, ability: float,
                                 kc_responses: Dict[str, List[bool]]) -> Dict[str, float]:
        """
        Map post-diagnostic ability to initial P(L0) per KC.

        - KCs with direct responses: blend proportion-correct with global prior.
        - KCs without responses: infer from ability + prerequisite chain (attenuated).

        Returns Dict[kc_id → initial_pL0] clamped to [0.01, 0.99].
        """
        global_prior = _clamp(_logistic(ability))
        initial: Dict[str, float] = {}
        for kc in self.kc_list:
            if kc in kc_responses and kc_responses[kc]:
                rs = kc_responses[kc]
                prop = float(sum(rs)) / len(rs)
                alpha = min(1.0, len(rs) / (self.items_per_kc + 1))
                p = alpha * prop + (1.0 - alpha) * global_prior
            else:
                prereqs = self.graph.get_all_prerequisites(kc)
                if prereqs:
                    p = float(np.mean([initial.get(pp, global_prior) for pp in prereqs])) * 0.85
                else:
                    p = global_prior * 0.9
            initial[kc] = _clamp(p)
        logger.debug("Generated initial mastery for %d KCs (ability=%.3f)", len(initial), ability)
        return initial

    def estimate_prototype_priors(self, ability: float,
                                  responses: Dict[str, List[bool]]) -> Dict[str, float]:
        """
        Estimate prior probability of belonging to each student prototype.

        Prototypes (aligned with neural_bkt.py)
        ----------------------------------------
        fast_learner, careful_student, struggling_student,
        inconsistent_student, average_student.

        Uses Gaussian affinity over (ability, proportion-correct, response variance).
        Returns a normalised probability distribution.
        """
        def _g(x: float, mu: float, sig: float) -> float:
            return math.exp(-0.5 * ((x - mu) / sig) ** 2)

        all_rs = [r for rs in responses.values() for r in rs]
        prop = float(sum(all_rs)) / len(all_rs) if all_rs else 0.5
        kc_accs = [float(sum(rs)) / len(rs) for rs in responses.values() if rs]
        var = float(np.var(kc_accs)) if len(kc_accs) > 1 else 0.0

        raw = {
            "fast_learner":         _g(ability, 1.5, 0.8) * _g(prop, 0.9, 0.10),
            "careful_student":      _g(ability, 0.8, 0.7) * _g(prop, 0.8, 0.12),
            "struggling_student":   _g(ability, -1.5, 0.9) * _g(prop, 0.3, 0.15),
            "inconsistent_student": _g(ability, 0.0, 0.9) * _g(var, 0.1, 0.08),
            "average_student":      _g(ability, 0.0, 0.6) * _g(prop, 0.6, 0.15),
        }
        total = sum(raw.values())
        priors = {k: v / total for k, v in raw.items()} if total > 1e-12 else \
                 {k: 1.0 / len(_PROTOTYPE_NAMES) for k in _PROTOTYPE_NAMES}
        logger.debug("Prototype priors (a=%.2f, p=%.2f): %s", ability, prop,
                     {k: f"{v:.3f}" for k, v in priors.items()})
        return priors


# ---------------------------------------------------------------------------
# 5. SpacingScheduler
# ---------------------------------------------------------------------------


class SpacingScheduler:
    """
    Optimises KC review timing via expanding-interval spaced repetition.

    Each successful review doubles the next review interval (Ebbinghaus
    forgetting-curve principle), capped within a single-semester window.

    Parameters
    ----------
    min_spacing_hours : float
        Minimum gap before suggesting a review (default 4 h).
    max_spacing_hours : float
        Maximum scheduling horizon — 168 h (7 days) by default.
    semester_end_timestamp : float, optional
        Unix timestamp of the course end / final exam.  Reviews will not be
        scheduled after this point.
    """

    def __init__(self, min_spacing_hours: float = 4.0, max_spacing_hours: float = 168.0,
                 semester_end_timestamp: Optional[float] = None) -> None:
        self.min_s = min_spacing_hours * 3600.0
        self.max_s = max_spacing_hours * 3600.0
        self.semester_end = semester_end_timestamp
        logger.debug("SpacingScheduler: min=%.1fh max=%.1fh", min_spacing_hours, max_spacing_hours)

    def compute_next_review(self, kc_id: str, current_mastery: float,
                            attempt_count: int, last_attempt_time: float) -> float:
        """
        Return the recommended Unix timestamp for the next review of *kc_id*.

        Algorithm
        ---------
        1. Estimate successful reviews as ``round(attempt_count * mastery)``.
        2. Expand interval: ``min_spacing * 2^successful_reviews``.
        3. Scale by mastery (low mastery → shorter interval for quicker re-exposure).
        4. Clamp to [min_spacing, max_spacing] and respect semester end.
        """
        n_success = min(round(attempt_count * current_mastery), 10)
        raw = self.min_s * (2.0 ** n_success)
        interval = max(self.min_s, min(raw, self.max_s)) * (0.5 + 0.5 * current_mastery)
        next_review = last_attempt_time + interval
        if self.semester_end is not None:
            next_review = min(next_review, self.semester_end)
        logger.debug("SpacingScheduler KC='%s': mastery=%.2f n_success=%d interval=%.1fh",
                     kc_id, current_mastery, n_success, interval / 3600.0)
        return next_review

    def get_priority_queue(self, student_mastery: Dict[str, float],
                           last_attempts: Dict[str, float],
                           attempt_counts: Optional[Dict[str, int]] = None,
                           now: Optional[float] = None) -> List[Tuple[str, float]]:
        """
        Return KCs sorted by review urgency (most urgent first).

        Urgency = ``overdue_factor * (1 - mastery)``, where
        ``overdue_factor > 1`` when the review is past due.
        KCs never attempted receive the highest urgency.

        Parameters
        ----------
        student_mastery : Dict[str, float]
        last_attempts : Dict[str, float]  — kc_id → Unix timestamp
        attempt_counts : Dict[str, int], optional — defaults to 1 per KC
        now : float, optional — current time; defaults to ``time.time()``

        Returns
        -------
        List[Tuple[str, float]]
            ``[(kc_id, urgency_score), ...]`` sorted descending.
        """
        now = now or time.time()
        counts = attempt_counts or {k: 1 for k in student_mastery}
        queue: List[Tuple[str, float]] = []
        for kc, mastery in student_mastery.items():
            last_t = last_attempts.get(kc)
            if last_t is None:
                urgency = 2.0 * (1.0 - mastery)
            else:
                next_rev = self.compute_next_review(kc, mastery, counts.get(kc, 1), last_t)
                interval = max(1.0, next_rev - last_t)
                overdue_factor = max(0.1, 1.0 - (next_rev - now) / interval)
                urgency = overdue_factor * (1.0 - mastery)
            queue.append((kc, urgency))
        queue.sort(key=lambda x: x[1], reverse=True)
        logger.debug("Priority queue top-3: %s", queue[:3])
        return queue
