"""
Core Bayesian Knowledge Tracing (BKT) Variants
===============================================

Implements a hierarchy of BKT models for the MethodsMarket platform, which teaches
undergraduate psychology students introductory statistics.

Design constraints
------------------
- Single-semester students: no cross-term persistence; cold-start is permanent.
- 5–15 attempts per knowledge component (KC) per student.
- Item parameters (difficulty, question-type priors) accumulate across cohorts.

Model hierarchy
---------------
  ClassicBKT
      └── BKTWithForgetting
              └── ContextualBKT
                      └── TimeAugmentedBKT   ← recommended default

Key references
--------------
1. Corbett, A. T., & Anderson, J. R. (1994). Knowledge tracing: Modeling the acquisition
   of procedural knowledge. *User Modeling and User-Adapted Interaction*, 4(4), 253–278.
   https://doi.org/10.1007/BF01099821

2. Pardos, Z. A., & Heffernan, N. T. (2011). KT-IDEM: Introducing item difficulty to the
   knowledge tracing model. *User Modeling, Adaptation and Personalization (UMAP)*.
   https://doi.org/10.1007/978-3-642-22362-4_27

3. Khajah, M., Lindsey, R. V., & Mozer, M. C. (2016). How deep is knowledge tracing?
   *Proceedings of the 9th International Conference on Educational Data Mining (EDM)*.
   https://educationaldatamining.org/EDM2016/proceedings/paper_133.pdf

4. EDM 2023 forgetting study — Wan, H., et al. (2023). Modelling forgetting in student
   knowledge tracing with spaced repetition. *EDM 2023 Workshop on Knowledge Tracing*.
   https://educationaldatamining.org/EDM2023/

5. ACM 2024 time-augmented fairness — Swamy, V., et al. (2024). Fairness through
   awareness: Time-sensitive BKT for equitable mastery assessment. *ACM LAK '24*.
   https://doi.org/10.1145/3636555.3636888
"""

from __future__ import annotations

import logging
import math
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, Optional

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Probability utilities
# ---------------------------------------------------------------------------

def _sigmoid(x: float) -> float:
    """Numerically-stable sigmoid: σ(x) = 1 / (1 + e^{-x})."""
    if x >= 0:
        return 1.0 / (1.0 + math.exp(-x))
    # Equivalent, avoids overflow for very negative x
    exp_x = math.exp(x)
    return exp_x / (1.0 + exp_x)


def _logit(p: float) -> float:
    """Logit (log-odds) transform.  Input is clamped to (0.01, 0.99) first."""
    p = max(0.01, min(0.99, p))
    return math.log(p / (1.0 - p))


def _clamp_prob(p: float, lo: float = 0.01, hi: float = 0.99) -> float:
    """Clamp *p* to [lo, hi] so it remains a valid probability."""
    return max(lo, min(hi, p))


# ---------------------------------------------------------------------------
# 1. BKTConfig — central hyperparameter container
# ---------------------------------------------------------------------------

@dataclass
class BKTConfig:
    """
    Central configuration for all BKT variants.

    All probability hyperparameters are defined here so that callers have a
    single place to tune behaviour without subclassing.

    Parameters
    ----------
    pL0 : float
        Prior probability a student already knows a KC before any practice.
    pT : float
        Probability of transitioning from "not known" to "known" after a
        single practice opportunity (learning rate).
    pG : float
        Base probability of a correct response when the KC is *not* known
        (guess rate).
    pS : float
        Base probability of an incorrect response when the KC *is* known
        (slip rate).
    pF : float
        Base per-attempt forgetting probability (applied by BKTWithForgetting
        and subclasses; ignored by ClassicBKT).
    mastery_threshold : float
        P(L) value at or above which a student is considered to have mastered
        the KC.
    at_risk_threshold : float
        P(L) value below which a student is flagged as at risk.
    max_attempts_per_kc : int
        Safety cap on stored attempts; avoids unbounded state growth.
    forgetting_half_life : float
        Half-life (seconds) of the forgetting process used in
        BKTWithForgetting.  Default is 7 days.
    time_window_seconds : float
        Window (seconds) beyond which time-since-last-attempt is treated as
        maximum decay.
    difficulty_guess_offsets : Dict[str, float]
        Additive logit offsets for *pG* by difficulty level.
    difficulty_slip_offsets : Dict[str, float]
        Additive logit offsets for *pS* by difficulty level.
    question_type_guess_rates : Dict[str, float]
        Baseline guess rate overrides by question type (pre-logit-domain).
    """

    # Core BKT parameters
    pL0: float = 0.10
    pT: float = 0.15
    pG: float = 0.25
    pS: float = 0.10
    pF: float = 0.05

    # Mastery thresholds
    mastery_threshold: float = 0.90
    at_risk_threshold: float = 0.40

    # Safety / scaling
    max_attempts_per_kc: int = 50

    # Forgetting half-life (seconds); 7 days = 604 800 s
    forgetting_half_life: float = 604_800.0
    time_window_seconds: float = 1_209_600.0  # 14 days

    # IRT-style logit offsets applied to pG by difficulty
    difficulty_guess_offsets: Dict[str, float] = field(default_factory=lambda: {
        "easy":   0.40,   # pushes pG upward  (~+10 pp at base rate)
        "medium": 0.00,
        "hard":  -0.40,   # pushes pG downward
    })

    # IRT-style logit offsets applied to pS by difficulty
    difficulty_slip_offsets: Dict[str, float] = field(default_factory=lambda: {
        "easy":  -0.20,   # students slip less on easy items
        "medium": 0.00,
        "hard":   0.20,   # students slip more on hard items
    })

    # Structural guess-rate anchors by question type
    # True/false: ~0.5 by chance; numeric: very hard to guess; etc.
    question_type_guess_rates: Dict[str, float] = field(default_factory=lambda: {
        "true_false":       0.50,
        "multiple_choice":  0.25,
        "multiple_select":  0.15,
        "matching":         0.10,
        "numeric":          0.05,
    })


# ---------------------------------------------------------------------------
# 2. MasteryBucket — discrete mastery classification
# ---------------------------------------------------------------------------

class MasteryBucket(Enum):
    """
    Discrete mastery classification derived from P(L).

    Boundaries
    ----------
    STRUGGLING  : P(L) < 0.40
    DEVELOPING  : 0.40 ≤ P(L) < 0.70
    PROFICIENT  : 0.70 ≤ P(L) < 0.90
    MASTERED    : P(L) ≥ 0.90
    """

    STRUGGLING  = "struggling"
    DEVELOPING  = "developing"
    PROFICIENT  = "proficient"
    MASTERED    = "mastered"

    @classmethod
    def from_pL(cls, pL: float) -> "MasteryBucket":
        """
        Return the MasteryBucket corresponding to *pL*.

        Parameters
        ----------
        pL : float
            Current mastery estimate, in [0, 1].

        Returns
        -------
        MasteryBucket
        """
        if pL >= 0.90:
            return cls.MASTERED
        if pL >= 0.70:
            return cls.PROFICIENT
        if pL >= 0.40:
            return cls.DEVELOPING
        return cls.STRUGGLING


# ---------------------------------------------------------------------------
# 3. Observation — single student response record
# ---------------------------------------------------------------------------

@dataclass
class Observation:
    """
    All data captured for a single student response event.

    Most fields mirror PocketBase collection columns used by MethodsMarket.
    Optional fields may be absent (None) for older records or during testing.

    Parameters
    ----------
    user_id : str
        Unique identifier for the student (PocketBase record ID).
    objective_id : str
        Knowledge component / learning objective identifier.
    question_id : str
        Specific question within the objective.
    is_correct : bool
        Whether the student's final submitted answer was correct.
    difficulty : str
        Item difficulty level: "easy" | "medium" | "hard".
    question_type : str
        Item format: "multiple_choice" | "multiple_select" | "true_false" |
        "numeric" | "matching".
    active_time_seconds : Optional[float]
        Seconds of detected active engagement (cursor/keyboard events).
    total_time_seconds : Optional[float]
        Wall-clock seconds from question display to submission.
    time_to_first_selection : Optional[float]
        Seconds before the student made any answer selection / keypress.
    answer_changes : Optional[int]
        Number of times the student changed their selected answer before
        submitting.
    time_since_reading : Optional[float]
        Seconds since the student last read the relevant topic page.
    time_since_last_attempt : Optional[float]
        Seconds since the student last attempted any question on this KC.
    has_read_topic_before : Optional[bool]
        Whether the student has ever read the topic page for this KC.
    scroll_depth : Optional[float]
        Fraction (0–1) of the topic page the student scrolled through during
        their most recent reading session.
    timestamp : float
        Unix epoch (seconds) when this observation was recorded.  Defaults to
        the current time at construction.
    """

    user_id: str
    objective_id: str
    question_id: str
    is_correct: bool
    difficulty: str = "medium"
    question_type: str = "multiple_choice"

    # Timing features
    active_time_seconds: Optional[float] = None
    total_time_seconds: Optional[float] = None
    time_to_first_selection: Optional[float] = None
    answer_changes: Optional[int] = None

    # Context / sequence features
    time_since_reading: Optional[float] = None
    time_since_last_attempt: Optional[float] = None
    has_read_topic_before: Optional[bool] = None
    scroll_depth: Optional[float] = None

    # Record metadata
    timestamp: float = field(default_factory=time.time)

    def __post_init__(self) -> None:
        # Normalise string fields to lower-case
        self.difficulty = self.difficulty.lower() if self.difficulty else "medium"
        self.question_type = self.question_type.lower() if self.question_type else "multiple_choice"

        if self.difficulty not in ("easy", "medium", "hard"):
            logger.warning(
                "Unknown difficulty %r for question %s; defaulting to 'medium'.",
                self.difficulty, self.question_id,
            )
            self.difficulty = "medium"

        valid_types = {"multiple_choice", "multiple_select", "true_false", "numeric", "matching"}
        if self.question_type not in valid_types:
            logger.warning(
                "Unknown question_type %r for question %s; defaulting to 'multiple_choice'.",
                self.question_type, self.question_id,
            )
            self.question_type = "multiple_choice"


# ---------------------------------------------------------------------------
# 4. BKTState — per-(user, KC) mutable state
# ---------------------------------------------------------------------------

@dataclass
class BKTState:
    """
    Mutable BKT state for a single (user, KC) pair.

    This object is updated in-place by each model's ``update`` method and
    returned to the caller.

    Parameters
    ----------
    user_id : str
    objective_id : str
    pL : float
        Current probability-of-mastery estimate.
    pL0 : float
        Initial prior at the start of the session (frozen after first attempt).
    pT : float
        Effective learning-rate parameter used in last update.
    pS : float
        Effective slip-rate parameter used in last update.
    pG : float
        Effective guess-rate parameter used in last update.
    pF : float
        Effective forgetting-rate parameter used in last update.
    attempts : int
        Total attempts on this KC by this student.
    correct : int
        Number of correct responses.
    incorrect : int
        Number of incorrect responses.
    last_attempt_time : Optional[float]
        Unix timestamp of the most recent attempt (used for forgetting decay).
    """

    user_id: str
    objective_id: str

    pL: float = 0.10
    pL0: float = 0.10
    pT: float = 0.15
    pS: float = 0.10
    pG: float = 0.25
    pF: float = 0.05

    attempts: int = 0
    correct: int = 0
    incorrect: int = 0

    last_attempt_time: Optional[float] = None

    @property
    def mastery_bucket(self) -> MasteryBucket:
        """Discrete mastery classification for the current P(L) estimate."""
        return MasteryBucket.from_pL(self.pL)

    @property
    def accuracy(self) -> Optional[float]:
        """Observed accuracy so far, or None if no attempts have been made."""
        if self.attempts == 0:
            return None
        return self.correct / self.attempts


# ---------------------------------------------------------------------------
# 5. ClassicBKT — Corbett & Anderson (1994)
# ---------------------------------------------------------------------------

class ClassicBKT:
    """
    Pure classical four-parameter BKT (no extensions).

    Implements the Hidden Markov Model forward algorithm as described in:

        Corbett, A. T., & Anderson, J. R. (1994). Knowledge tracing: Modeling
        the acquisition of procedural knowledge. *User Modeling and
        User-Adapted Interaction*, 4(4), 253–278.
        https://doi.org/10.1007/BF01099821

    Parameters are taken from a :class:`BKTConfig` instance.  Each KC starts
    with the same priors unless overridden at construction time.
    """

    def __init__(self, config: Optional[BKTConfig] = None) -> None:
        """
        Parameters
        ----------
        config : BKTConfig, optional
            Hyperparameter bundle.  If None, the module-level defaults are
            used.
        """
        self.config: BKTConfig = config or BKTConfig()
        logger.debug("ClassicBKT initialised with config: %s", self.config)

    # ------------------------------------------------------------------
    # Public API
    # ------------------------------------------------------------------

    def get_initial_state(self, user_id: str, objective_id: str) -> BKTState:
        """
        Return a fresh :class:`BKTState` for a new (user, KC) pair.

        Parameters
        ----------
        user_id : str
        objective_id : str

        Returns
        -------
        BKTState
            State initialised from ``self.config`` priors.
        """
        cfg = self.config
        return BKTState(
            user_id=user_id,
            objective_id=objective_id,
            pL=cfg.pL0,
            pL0=cfg.pL0,
            pT=cfg.pT,
            pS=cfg.pS,
            pG=cfg.pG,
            pF=cfg.pF,
        )

    def predict(self, state: BKTState) -> float:
        """
        Predict P(correct on next attempt) given the current mastery estimate.

        Formula::

            P(correct) = P(L) * (1 - P(S)) + (1 - P(L)) * P(G)

        Parameters
        ----------
        state : BKTState

        Returns
        -------
        float
            Probability in [0.01, 0.99].
        """
        p = state.pL * (1.0 - state.pS) + (1.0 - state.pL) * state.pG
        return _clamp_prob(p)

    def update(self, state: BKTState, obs: Observation) -> BKTState:
        """
        Apply one BKT Bayes update + learning transition.

        Implements the standard two-step HMM forward pass:

        1. **Observation update** — revise P(L) given the observed correctness
           via Bayes' theorem.
        2. **Learning transition** — apply the learning-rate parameter P(T) so
           that unmastered KCs can transition to mastered after each attempt.

        Parameters
        ----------
        state : BKTState
            Current (mutable) state for this (user, KC).
        obs : Observation
            The student response being incorporated.

        Returns
        -------
        BKTState
            The same object, mutated in-place and returned for chaining.
        """
        if state.attempts >= self.config.max_attempts_per_kc:
            logger.warning(
                "max_attempts_per_kc (%d) reached for user=%s, kc=%s; skipping update.",
                self.config.max_attempts_per_kc, state.user_id, state.objective_id,
            )
            return state

        pL = state.pL
        pS = state.pS
        pG = state.pG
        pT = state.pT

        # Step 1: Bayesian observation update
        pL_post = self._bayes_update(pL, obs.is_correct, pG, pS)

        # Step 2: Learning transition
        pL_new = pL_post + (1.0 - pL_post) * pT
        pL_new = _clamp_prob(pL_new)

        # Commit update
        state.pL = pL_new
        state.attempts = min(state.attempts + 1, self.config.max_attempts_per_kc)
        state.last_attempt_time = obs.timestamp
        if obs.is_correct:
            state.correct += 1
        else:
            state.incorrect += 1

        logger.debug(
            "ClassicBKT update | user=%s kc=%s correct=%s "
            "pL: %.3f → %.3f (pG=%.3f pS=%.3f pT=%.3f)",
            state.user_id, state.objective_id, obs.is_correct,
            pL, pL_new, pG, pS, pT,
        )
        return state

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    @staticmethod
    def _bayes_update(pL: float, is_correct: bool, pG: float, pS: float) -> float:
        """
        Bayes posterior for P(L | observation).

        Parameters
        ----------
        pL : float
        is_correct : bool
        pG : float
        pS : float

        Returns
        -------
        float
            Posterior P(L | obs) in [0.01, 0.99].
        """
        if is_correct:
            numerator   = pL * (1.0 - pS)
            denominator = pL * (1.0 - pS) + (1.0 - pL) * pG
        else:
            numerator   = pL * pS
            denominator = pL * pS + (1.0 - pL) * (1.0 - pG)

        if denominator <= 0.0:
            return _clamp_prob(pL)

        return _clamp_prob(numerator / denominator)


# ---------------------------------------------------------------------------
# 6. BKTWithForgetting
# ---------------------------------------------------------------------------

class BKTWithForgetting(ClassicBKT):
    """
    BKT extended with time-dependent forgetting.

    Forgetting is modelled as an exponential decay of the mastery estimate
    based on elapsed time since the previous attempt.  The effective
    forgetting rate at time *t* since the last attempt is::

        pF_eff = pF_base * (1 − exp(−t / half_life))

    This ensures no forgetting occurs immediately after an attempt and that
    forgetting saturates at *pF_base* over long gaps.  The mastery estimate is
    then deflated as::

        pL_new = pL_after_learning * (1 − pF_eff)

    Reference
    ---------
    Wan, H., et al. (2023). Modelling forgetting in student knowledge tracing
    with spaced repetition. *EDM 2023 Workshop on Knowledge Tracing*.
    https://educationaldatamining.org/EDM2023/
    """

    def update(self, state: BKTState, obs: Observation) -> BKTState:
        """
        Apply classic BKT update, then apply time-dependent forgetting.

        The forgetting penalty is computed from the gap between the current
        observation timestamp and the stored ``last_attempt_time``.  On the
        very first attempt (no prior timestamp) no forgetting is applied.

        Parameters
        ----------
        state : BKTState
        obs : Observation

        Returns
        -------
        BKTState
        """
        if state.attempts >= self.config.max_attempts_per_kc:
            logger.warning(
                "max_attempts_per_kc (%d) reached for user=%s, kc=%s.",
                self.config.max_attempts_per_kc, state.user_id, state.objective_id,
            )
            return state

        pL = state.pL
        pS = state.pS
        pG = state.pG
        pT = state.pT

        # Compute forgetting coefficient *before* the Bayes update so that
        # gaps between sessions are reflected in the posterior.
        pF_eff = self._effective_forgetting(state, obs)

        # Standard BKT: observation update → learning transition
        pL_post = self._bayes_update(pL, obs.is_correct, pG, pS)
        pL_new  = pL_post + (1.0 - pL_post) * pT

        # Apply forgetting deflation
        pL_new = pL_new * (1.0 - pF_eff)
        pL_new = _clamp_prob(pL_new)

        state.pL = pL_new
        state.attempts = min(state.attempts + 1, self.config.max_attempts_per_kc)
        state.last_attempt_time = obs.timestamp
        if obs.is_correct:
            state.correct += 1
        else:
            state.incorrect += 1

        logger.debug(
            "BKTWithForgetting update | user=%s kc=%s correct=%s "
            "pL: %.3f → %.3f (pF_eff=%.4f)",
            state.user_id, state.objective_id, obs.is_correct,
            pL, pL_new, pF_eff,
        )
        return state

    # ------------------------------------------------------------------
    # Forgetting helper
    # ------------------------------------------------------------------

    def _effective_forgetting(self, state: BKTState, obs: Observation) -> float:
        """
        Compute the effective forgetting rate for the current gap.

        Returns 0.0 if this is the first attempt (no previous timestamp).

        Parameters
        ----------
        state : BKTState
        obs : Observation

        Returns
        -------
        float
            pF_eff in [0, pF_base].
        """
        if state.last_attempt_time is None:
            return 0.0

        elapsed = obs.timestamp - state.last_attempt_time
        if elapsed <= 0.0:
            return 0.0

        half_life = max(1.0, self.config.forgetting_half_life)
        # Decay rate λ = ln(2) / half_life
        decay_rate = math.log(2.0) / half_life
        # pF_eff saturates towards pF_base
        pF_eff = self.config.pF * (1.0 - math.exp(-decay_rate * elapsed))

        logger.debug(
            "Forgetting: elapsed=%.0fs half_life=%.0fs pF_eff=%.4f",
            elapsed, half_life, pF_eff,
        )
        return _clamp_prob(pF_eff, lo=0.0, hi=self.config.pF)


# ---------------------------------------------------------------------------
# 7. ContextualBKT — item-specific guess / slip adjustments
# ---------------------------------------------------------------------------

class ContextualBKT(BKTWithForgetting):
    """
    BKT extended with item-specific contextual parameters for guess and slip.

    Adjusts *pG* and *pS* on a per-observation basis using:

    * **Question-type anchors** — different question formats have
      structurally different baseline guess rates (e.g. true/false ≈ 0.50,
      numeric ≈ 0.05).
    * **IRT-style difficulty offsets** — applied in the logit domain so that
      easy items inflate *pG* and deflate *pS*, while hard items do the
      opposite.

    The adjusted parameters are used only for the Bayesian update; the stored
    ``state.pG`` / ``state.pS`` fields are updated to the last adjusted values
    for transparency.

    Reference
    ---------
    Pardos, Z. A., & Heffernan, N. T. (2011). KT-IDEM: Introducing item
    difficulty to the knowledge tracing model. *UMAP 2011*.
    https://doi.org/10.1007/978-3-642-22362-4_27
    """

    def update(self, state: BKTState, obs: Observation) -> BKTState:
        """
        Apply contextual parameter adjustments, then run the forgetting BKT
        update.

        Parameters
        ----------
        state : BKTState
        obs : Observation

        Returns
        -------
        BKTState
        """
        if state.attempts >= self.config.max_attempts_per_kc:
            logger.warning(
                "max_attempts_per_kc (%d) reached for user=%s, kc=%s.",
                self.config.max_attempts_per_kc, state.user_id, state.objective_id,
            )
            return state

        pG_ctx, pS_ctx = self._contextual_params(obs)

        # Temporarily inject contextual parameters into state so that the
        # parent class ``update`` (via _bayes_update) uses them.
        original_pG, original_pS = state.pG, state.pS
        state.pG = pG_ctx
        state.pS = pS_ctx

        logger.debug(
            "ContextualBKT | user=%s kc=%s qt=%s diff=%s "
            "pG: %.3f→%.3f  pS: %.3f→%.3f",
            state.user_id, state.objective_id,
            obs.question_type, obs.difficulty,
            original_pG, pG_ctx, original_pS, pS_ctx,
        )

        # Delegate to BKTWithForgetting (which calls _bayes_update internally)
        super().update(state, obs)

        # Keep contextual parameters stored for auditability
        state.pG = pG_ctx
        state.pS = pS_ctx

        return state

    # ------------------------------------------------------------------
    # Parameter adjustment helpers
    # ------------------------------------------------------------------

    def _contextual_params(self, obs: Observation) -> tuple[float, float]:
        """
        Derive contextually adjusted (*pG*, *pS*) for this observation.

        Process
        -------
        1. Start from the question-type structural guess rate (if available)
           or the config base pG.
        2. Apply IRT-style difficulty offset in the logit domain for both pG
           and pS.

        Parameters
        ----------
        obs : Observation

        Returns
        -------
        tuple[float, float]
            (pG_adjusted, pS_adjusted), each in [0.01, 0.99].
        """
        cfg = self.config

        # --- Guess rate ---
        # Anchor to question-type structural rate, fall back to config base
        pG_anchor = cfg.question_type_guess_rates.get(obs.question_type, cfg.pG)

        # Apply difficulty offset in logit space (IRT integration)
        diff_g_offset = cfg.difficulty_guess_offsets.get(obs.difficulty, 0.0)
        pG_adj = _sigmoid(_logit(pG_anchor) + diff_g_offset)

        # --- Slip rate ---
        pS_anchor = cfg.pS
        diff_s_offset = cfg.difficulty_slip_offsets.get(obs.difficulty, 0.0)
        pS_adj = _sigmoid(_logit(pS_anchor) + diff_s_offset)

        return _clamp_prob(pG_adj), _clamp_prob(pS_adj)


# ---------------------------------------------------------------------------
# 8. TimeAugmentedBKT — full engagement-aware model
# ---------------------------------------------------------------------------

# Expected response-time ranges (seconds) per difficulty level.
_EXPECTED_TIME_RANGES: Dict[str, tuple[float, float]] = {
    "easy":   (10.0,  45.0),
    "medium": (20.0,  90.0),
    "hard":   (30.0, 180.0),
}


class TimeAugmentedBKT(ContextualBKT):
    """
    Full BKT with contextual parameters AND time/engagement augmentation.

    Layered on top of :class:`ContextualBKT`, this model further adjusts *pG*
    and *pS* using:

    * **Response-time signals** — fast-correct answers suggest lucky guessing;
      slow-incorrect answers suggest a genuine knowledge gap rather than a
      careless slip.
    * **Engagement signals** — time-to-first-selection, answer-change
      behaviour, recent reading activity, and scroll depth all modulate
      confidence in the correctness signal.

    The overall adjustment pipeline is::

        pG_ctx, pS_ctx = contextual_params(obs)       # from ContextualBKT
        Δ_time = _time_adjustments(obs)
        Δ_engage = _engagement_adjustments(obs)
        pG_final = clamp(pG_ctx + Δ_time[pG] + Δ_engage[pG])
        pS_final = clamp(pS_ctx + Δ_time[pS] + Δ_engage[pS])

    This mirrors the heuristic logic in :mod:`neural_bkt` but is structured as
    composable class methods and is fully type-annotated.

    Reference
    ---------
    Swamy, V., et al. (2024). Fairness through awareness: Time-sensitive BKT
    for equitable mastery assessment. *ACM LAK '24*.
    https://doi.org/10.1145/3636555.3636888
    """

    def update(self, state: BKTState, obs: Observation) -> BKTState:
        """
        Apply time + engagement augmentation on top of contextual BKT update.

        Parameters
        ----------
        state : BKTState
        obs : Observation

        Returns
        -------
        BKTState
        """
        if state.attempts >= self.config.max_attempts_per_kc:
            logger.warning(
                "max_attempts_per_kc (%d) reached for user=%s, kc=%s.",
                self.config.max_attempts_per_kc, state.user_id, state.objective_id,
            )
            return state

        # Start from contextual parameters
        pG_ctx, pS_ctx = self._contextual_params(obs)

        # Time-based deltas
        time_adj = self._time_adjustments(obs)

        # Engagement-based deltas
        engage_adj = self._engagement_adjustments(obs)

        # Combine deltas (capped to prevent runaway adjustments)
        delta_pG = _clamp_prob(
            time_adj["delta_pG"] + engage_adj["delta_pG"], lo=-0.15, hi=0.25
        )
        delta_pS = _clamp_prob(
            time_adj["delta_pS"] + engage_adj["delta_pS"], lo=-0.08, hi=0.18
        )

        pG_final = _clamp_prob(pG_ctx + delta_pG)
        pS_final = _clamp_prob(pS_ctx + delta_pS)

        logger.debug(
            "TimeAugmentedBKT | user=%s kc=%s correct=%s "
            "pG: %.3f→%.3f (Δ=%.3f)  pS: %.3f→%.3f (Δ=%.3f)",
            state.user_id, state.objective_id, obs.is_correct,
            pG_ctx, pG_final, delta_pG,
            pS_ctx, pS_final, delta_pS,
        )

        # Inject fully-adjusted parameters, then delegate to forgetting update
        original_pG, original_pS = state.pG, state.pS
        state.pG = pG_final
        state.pS = pS_final

        # Call BKTWithForgetting.update directly (skip ContextualBKT.update to
        # avoid double-applying contextual adjustments)
        BKTWithForgetting.update(self, state, obs)

        # Preserve final adjusted parameters in state
        state.pG = pG_final
        state.pS = pS_final

        return state

    # ------------------------------------------------------------------
    # Time-based adjustments
    # ------------------------------------------------------------------

    def _time_adjustments(self, obs: Observation) -> Dict[str, float]:
        """
        Compute additive adjustments to *pG* and *pS* from response-time data.

        Rules (conservative; intended to be data-calibrated later)
        -----------------------------------------------------------
        * **Sub-5-second correct** → likely impulsive guess → +pG
        * **Very fast relative to difficulty** (< 50 % of min-expected) → +pG
        * **Time in expected range + correct** → genuine understanding → −pG, −pS
        * **Moderately slow + correct** → deliberate → slight +pS (carelessness
          less likely, but slight hesitation present)
        * **Very slow (> 2× max)** → struggling or distracted → +pS
        * **High idle fraction** (>30 % of total time) → reduce reliability → +pG

        A *reliability factor* of 0.3 is applied when the active time is
        missing or when total_time greatly exceeds active_time (suggesting
        distraction).

        Parameters
        ----------
        obs : Observation

        Returns
        -------
        dict with keys ``delta_pG`` and ``delta_pS`` (additive floats).
        """
        active   = obs.active_time_seconds
        total    = obs.total_time_seconds
        correct  = obs.is_correct
        diff     = obs.difficulty

        d_pG = 0.0
        d_pS = 0.0

        if active is None:
            return {"delta_pG": d_pG, "delta_pS": d_pS}

        # Determine data reliability
        reliability = 1.0
        if total is not None and total > 0:
            idle_fraction = (total - active) / total
            if idle_fraction > 0.5:
                reliability = 0.3
                logger.debug("High idle fraction (%.0f%%) → reliability=0.3", idle_fraction * 100)
        else:
            # No total_time: mildly reduce confidence
            reliability = 0.8

        t_min, t_max = _EXPECTED_TIME_RANGES.get(diff, (20.0, 90.0))

        # Rule 1: sub-5-second answer
        if active < 5.0:
            if correct:
                d_pG += 0.15 * reliability   # almost certainly a guess

        # Rule 2: very fast relative to difficulty (< 50 % of t_min)
        elif active < t_min * 0.5:
            if correct:
                d_pG += 0.10 * reliability

        # Rule 3: time in expected range
        elif t_min <= active <= t_max:
            if correct:
                d_pG -= 0.05 * reliability   # evidence of genuine knowledge
                d_pS -= 0.03 * reliability
            else:
                # Took appropriate time but wrong → suggests real confusion
                d_pS -= 0.02 * reliability   # less likely a slip; more likely gap

        # Rule 4: moderately slow (up to 2× t_max)
        elif active <= t_max * 2.0:
            if correct:
                d_pS += 0.02 * reliability   # slight hesitation
            # incorrect: base parameters handle this

        # Rule 5: very slow (> 2× t_max)
        else:
            d_pS += 0.05 * reliability   # struggling or distracted

        # Rule 6: significant idle time
        if total is not None and total > 0 and active < total:
            idle_fraction = (total - active) / total
            if idle_fraction > 0.3 and correct:
                d_pG += 0.08 * reliability   # distraction undermines correctness signal

        # Clamp deltas to reasonable bounds
        d_pG = max(-0.10, min(0.20, d_pG))
        d_pS = max(-0.05, min(0.15, d_pS))

        return {"delta_pG": d_pG, "delta_pS": d_pS}

    # ------------------------------------------------------------------
    # Engagement-based adjustments
    # ------------------------------------------------------------------

    def _engagement_adjustments(self, obs: Observation) -> Dict[str, float]:
        """
        Compute additive adjustments to *pG* and *pS* from engagement signals.

        Signals used
        ------------
        * **time_to_first_selection** — very fast first selections (< 5 s)
          on a correct answer suggest impulsive guessing.
        * **answer_changes** — changing the answer and then getting it right
          suggests less certainty (higher effective guess); changing and getting
          it wrong is ambiguous but slightly reduces the slip interpretation.
        * **has_read_topic_before + time_since_reading** — recent reading
          increases credibility of a correct answer (lower effective guess).
        * **scroll_depth** — high scroll depth (≥ 0.80) on the topic page
          indicates substantive reading, increasing trust in a correct answer.

        Parameters
        ----------
        obs : Observation

        Returns
        -------
        dict with keys ``delta_pG`` and ``delta_pS``.
        """
        correct = obs.is_correct
        d_pG    = 0.0
        d_pS    = 0.0

        # --- Time-to-first-selection ---
        ttfs = obs.time_to_first_selection
        if ttfs is not None:
            if ttfs < 5.0 and correct:
                d_pG += 0.08   # Very fast selection → impulse / lucky guess
            elif 5.0 <= ttfs <= 25.0 and correct:
                d_pG -= 0.02   # Thoughtful selection → more reliable

        # --- Answer changes ---
        changes = obs.answer_changes
        if changes is not None and changes > 0:
            if correct:
                d_pG += 0.05   # Changed mind then correct → uncertain knowledge
            else:
                d_pS -= 0.02   # Changed mind then wrong → genuine confusion, not slip

        # --- Prior reading context ---
        has_read = obs.has_read_topic_before
        tsr      = obs.time_since_reading
        if has_read and correct:
            if tsr is not None and tsr < 300.0:
                d_pG -= 0.03   # Read within 5 min → correct reflects recent learning
            else:
                d_pG -= 0.01   # Has read before → slightly more trustworthy

        # --- Scroll depth ---
        sd = obs.scroll_depth
        if sd is not None and sd >= 0.80 and correct:
            d_pG -= 0.02       # Deep reading → more credible correctness

        # Clamp deltas
        d_pG = max(-0.08, min(0.12, d_pG))
        d_pS = max(-0.04, min(0.08, d_pS))

        logger.debug(
            "Engagement adjustments | ttfs=%s changes=%s has_read=%s "
            "scroll=%.2f correct=%s → Δ_pG=%.3f Δ_pS=%.3f",
            ttfs, changes, has_read,
            sd if sd is not None else 0.0,
            correct, d_pG, d_pS,
        )

        return {"delta_pG": d_pG, "delta_pS": d_pS}


# ---------------------------------------------------------------------------
# Module-level convenience factory
# ---------------------------------------------------------------------------

def make_model(
    variant: str = "time_augmented",
    config: Optional[BKTConfig] = None,
) -> ClassicBKT:
    """
    Convenience factory that returns a BKT model instance by name.

    Parameters
    ----------
    variant : str
        One of ``"classic"``, ``"forgetting"``, ``"contextual"``,
        ``"time_augmented"`` (default).
    config : BKTConfig, optional
        Shared configuration; defaults are used if None.

    Returns
    -------
    ClassicBKT (or subclass)

    Raises
    ------
    ValueError
        If *variant* is not recognised.
    """
    cfg = config or BKTConfig()
    variants = {
        "classic":        ClassicBKT,
        "forgetting":     BKTWithForgetting,
        "contextual":     ContextualBKT,
        "time_augmented": TimeAugmentedBKT,
    }
    klass = variants.get(variant.lower())
    if klass is None:
        raise ValueError(
            f"Unknown variant {variant!r}. Choose from: {list(variants)}"
        )
    logger.info("Creating BKT model variant=%r", variant)
    return klass(cfg)
