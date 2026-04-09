"""
Neural Bayesian Knowledge Tracing with Multidimensional Student Abilities

Based on research from:
KISRDevelopment/interpretable_student_models_paper_code

Key features:
- Multidimensional student abilities (4 dimensions)
- Student prototypes for generalization
- Sequential Bayesian updating
- IRT-integrated observation probabilities
"""

import numpy as np
from typing import Dict, List, Optional
from dataclasses import dataclass
import math
import time


@dataclass
class StudentPrototype:
    """
    Multidimensional student ability prototype

    Four dimensions (from research paper):
    - guessing: Baseline correct probability when skill not learned
    - not_slipping_boost: Boost to correctness when skill is learned
    - learning: Learning rate (how fast they acquire skills)
    - retention: Retention rate (how well they remember)
    """
    id: int
    name: str
    guessing: float
    not_slipping_boost: float
    learning: float
    retention: float


class NeuralBKTModel:
    """
    Neural BKT with multidimensional abilities and student prototypes

    This implements the core algorithms from the research paper:
    1. Multidimensional student prototypes
    2. Sequential Bayesian model averaging
    3. IRT-integrated BKT
    """

    def __init__(self, num_prototypes: int = 5, num_objectives: int = 50):
        """
        Initialize Neural BKT model

        Args:
            num_prototypes: Number of student prototypes to use
            num_objectives: Number of learning objectives
        """
        self.num_objectives = num_objectives

        # Initialize student prototypes (5 common learning profiles)
        all_prototypes = self._create_default_prototypes()
        requested = max(1, int(num_prototypes))
        self.prototypes = all_prototypes[:min(requested, len(all_prototypes))]
        self.num_prototypes = len(self.prototypes)

        # Student states: user_id -> {objective_id -> state}
        self.student_states: Dict[str, Dict[str, Dict]] = {}

        # Student prototype posteriors: user_id -> [prob for each prototype]
        self.student_prototype_probs: Dict[str, np.ndarray] = {}

        # Base BKT parameters (per objective)
        self.base_params = self._initialize_base_params()

    def _create_default_prototypes(self) -> List[StudentPrototype]:
        """
        Create 5 default student prototypes based on common learning profiles

        These are based on the research paper's findings about
        multidimensional student abilities
        """
        return [
            StudentPrototype(
                id=0,
                name="Fast Learner",
                guessing=0.3,  # Moderate guessing
                not_slipping_boost=0.8,  # High accuracy when learned
                learning=0.25,  # Fast learning
                retention=0.95  # Excellent retention
            ),
            StudentPrototype(
                id=1,
                name="Careful Student",
                guessing=0.15,  # Low guessing (waits until sure)
                not_slipping_boost=0.9,  # Very accurate when learned
                learning=0.15,  # Moderate learning rate
                retention=0.85  # Good retention
            ),
            StudentPrototype(
                id=2,
                name="Struggling Student",
                guessing=0.35,  # Higher guessing
                not_slipping_boost=0.5,  # Still makes mistakes when learned
                learning=0.10,  # Slow learning
                retention=0.70  # Poor retention
            ),
            StudentPrototype(
                id=3,
                name="Inconsistent Student",
                guessing=0.25,  # Average guessing
                not_slipping_boost=0.6,  # Moderate accuracy
                learning=0.12,  # Slow learning
                retention=0.75  # Below average retention
            ),
            StudentPrototype(
                id=4,
                name="Average Student",
                guessing=0.25,  # Standard guessing rate
                not_slipping_boost=0.7,  # Good accuracy when learned
                learning=0.15,  # Standard learning rate
                retention=0.80  # Standard retention
            )
        ]

    def _get_reading_time_bonus(self, user_id: str, objective_id: str) -> float:
        """
        Calculate prior knowledge bonus based on topic reading time.

        Students who spend more time reading relevant topics start with higher P(L0).
        This is a heuristic until we collect data showing the relationship.

        Returns:
            Bonus to add to P(L0), range [0.0, 0.15]
        """
        # TODO: Query topic_readings from database for this user/objective
        # For now, return 0 (no bonus) until we implement database queries
        #
        # Future implementation:
        # - Map objectives to relevant topics
        # - Query total reading time for those topics
        # - Apply scaling:
        #   - < 5 min total reading: +0.00 bonus
        #   - 5-15 min reading: +0.05 bonus
        #   - 15-30 min reading: +0.10 bonus
        #   - > 30 min reading: +0.15 bonus (diminishing returns)

        return 0.0

    def _initialize_base_params(self) -> Dict:
        """Initialize base BKT parameters (before prototype adjustments)"""
        return {
            'pL0': 0.1,  # Prior knowledge
            'pT_base': 0.15,  # Base learning rate
            'pS_base': 0.1,  # Base slip rate
            'pG_base': 0.25,  # Base guess rate
            'pF_base': 0.05  # Base forget rate
        }

    def _get_difficulty_adjustments(self, difficulty: str) -> Dict[str, float]:
        """
        Get difficulty-based parameter adjustments (IRT integration)

        From research: adjust slip and guess based on question difficulty
        """
        difficulty_params = {
            'easy': {
                'pG_adjust': 0.10,  # Easier to guess correctly
                'pS_adjust': -0.05  # Less likely to slip
            },
            'medium': {
                'pG_adjust': 0.0,
                'pS_adjust': 0.0
            },
            'hard': {
                'pG_adjust': -0.10,  # Harder to guess correctly
                'pS_adjust': 0.05  # More likely to slip even if learned
            }
        }
        return difficulty_params.get(difficulty, difficulty_params['medium'])

    def _sigmoid(self, x: float) -> float:
        """Sigmoid function for logit conversion"""
        return 1.0 / (1.0 + math.exp(-x))

    def _logit(self, p: float) -> float:
        """Convert probability to logit"""
        p = max(0.01, min(0.99, p))  # Clamp to avoid log(0)
        return math.log(p / (1 - p))

    def _get_prototype_adjusted_params(
        self,
        prototype: StudentPrototype,
        difficulty: str
    ) -> Dict[str, float]:
        """
        Get BKT parameters adjusted for student prototype and difficulty

        This implements the multidimensional ability model from the research
        """
        diff_adjust = self._get_difficulty_adjustments(difficulty)

        # Guess probability (when NOT learned)
        pG_logit = self._logit(self.base_params['pG_base'])
        pG_logit += prototype.guessing + diff_adjust['pG_adjust']
        pG = self._sigmoid(pG_logit)

        # Slip probability (when learned)
        pS_logit = self._logit(self.base_params['pS_base'])
        pS_logit += diff_adjust['pS_adjust'] - prototype.not_slipping_boost
        pS = self._sigmoid(pS_logit)

        # Learning rate
        pT_logit = self._logit(self.base_params['pT_base'])
        pT_logit += prototype.learning
        pT = self._sigmoid(pT_logit)

        # Forget rate
        pF_logit = self._logit(self.base_params['pF_base'])
        pF_logit -= prototype.retention
        pF = self._sigmoid(pF_logit)

        return {
            'pG': max(0.01, min(0.99, pG)),
            'pS': max(0.01, min(0.99, pS)),
            'pT': max(0.01, min(0.99, pT)),
            'pF': max(0.01, min(0.99, pF))
        }

    def _bkt_update(
        self,
        pL: float,
        is_correct: bool,
        params: Dict[str, float]
    ) -> float:
        """
        Standard BKT update using Bayes' theorem

        This is the core BKT algorithm (HMM forward algorithm)
        """
        pG = params['pG']
        pS = params['pS']
        pT = params['pT']
        pF = params['pF']

        # Step 1: Update belief based on observation
        if is_correct:
            # P(L | correct) using Bayes
            p_correct = pL * (1 - pS) + (1 - pL) * pG
            pL_given_obs = (pL * (1 - pS)) / p_correct if p_correct > 0 else pL
        else:
            # P(L | incorrect) using Bayes
            p_incorrect = pL * pS + (1 - pL) * (1 - pG)
            pL_given_obs = (pL * pS) / p_incorrect if p_incorrect > 0 else pL

        # Step 2: Apply learning transition
        pL_new = pL_given_obs + (1 - pL_given_obs) * pT

        # Step 3: Apply forgetting (optional, usually small)
        pL_new = pL_new * (1 - pF)

        # Clamp to valid range
        return max(0.01, min(0.99, pL_new))

    def _sequential_bayesian_update(
        self,
        user_id: str,
        objective_id: str,
        is_correct: bool,
        difficulty: str
    ) -> np.ndarray:
        """
        Sequential Bayesian updating over student prototypes

        From research: Update posterior probability of each prototype
        based on observed performance
        """
        # Get or initialize prototype probabilities (uniform prior)
        if user_id not in self.student_prototype_probs:
            self.student_prototype_probs[user_id] = np.ones(self.num_prototypes) / self.num_prototypes

        probs = self.student_prototype_probs[user_id]

        # Compute likelihood of observation under each prototype
        likelihoods = []
        for prototype in self.prototypes:
            params = self._get_prototype_adjusted_params(prototype, difficulty)

            # Use current mastery on this objective when available.
            objective_state = self.student_states.get(user_id, {}).get(objective_id, {})
            objective_pL = objective_state.get('pL', self.base_params['pL0'])
            objective_pL = max(0.01, min(0.99, objective_pL))

            if is_correct:
                likelihood = objective_pL * (1 - params['pS']) + (1 - objective_pL) * params['pG']
            else:
                likelihood = objective_pL * params['pS'] + (1 - objective_pL) * (1 - params['pG'])

            likelihoods.append(likelihood)

        likelihoods = np.array(likelihoods)

        # Update posterior using Bayes' rule
        posterior = probs * likelihoods
        posterior = posterior / posterior.sum() if posterior.sum() > 0 else probs

        self.student_prototype_probs[user_id] = posterior

        return posterior

    def _get_time_based_adjustments(
        self,
        active_time: Optional[int],
        total_time: Optional[int],
        was_maxed_out: bool,
        idle_detected: bool,
        difficulty: str,
        is_correct: bool
    ) -> Dict[str, float]:
        """
        Calculate time-based adjustments to guess/slip probabilities using heuristics.

        These are research-backed rules until we collect enough data for ML training.
        The adjustments are conservative to avoid over-correcting.

        Returns:
            dict with 'pG_adjustment' and 'pS_adjustment' (additive adjustments)
        """
        # Default: no adjustment
        pG_adj = 0.0
        pS_adj = 0.0

        # If no time data, return defaults
        if active_time is None:
            return {'pG_adjustment': pG_adj, 'pS_adjustment': pS_adj}

        # Data quality flags - reduce confidence if unreliable
        reliability_factor = 1.0
        if was_maxed_out or idle_detected:
            reliability_factor = 0.3  # Much less confident in time interpretation

        # Expected time ranges by difficulty (seconds)
        expected_ranges = {
            'easy': (10, 45),     # 10-45 seconds
            'medium': (20, 90),   # 20-90 seconds
            'hard': (30, 180)     # 30-180 seconds
        }
        min_expected, max_expected = expected_ranges.get(difficulty, (20, 90))

        # === HEURISTIC RULES ===

        # Rule 1: Very fast answers (< 5s) suggest guessing/rushing
        if active_time < 5:
            if is_correct:
                # Fast correct = likely lucky guess
                pG_adj += 0.15 * reliability_factor
            # Fast incorrect already covered by base guess probability

        # Rule 2: Extremely fast relative to difficulty
        elif active_time < min_expected * 0.5:
            if is_correct:
                # Too fast for difficulty = likely guessing
                pG_adj += 0.10 * reliability_factor

        # Rule 3: Appropriate time for difficulty (in expected range)
        elif min_expected <= active_time <= max_expected:
            if is_correct:
                # Good time + correct = likely genuine understanding
                pG_adj -= 0.05 * reliability_factor  # Reduce guess probability
                pS_adj -= 0.03 * reliability_factor  # Reduce slip probability

        # Rule 4: Moderately slow (up to 2x expected max)
        elif active_time <= max_expected * 2:
            if is_correct:
                # Slower but correct = working through it, slight slip risk
                pS_adj += 0.02 * reliability_factor
            else:
                # Slow incorrect = struggling with concept
                pass  # Base parameters already handle this

        # Rule 5: Very slow (> 2x expected max)
        elif active_time > max_expected * 2:
            # Very slow = either struggling significantly or distracted
            pS_adj += 0.05 * reliability_factor

        # Rule 6: Idle detection override
        if idle_detected and total_time:
            idle_ratio = (total_time - active_time) / max(total_time, 1)
            if idle_ratio > 0.3:  # More than 30% idle
                # Significant distraction, reduce reliability of answer
                if is_correct:
                    pG_adj += 0.08 * reliability_factor

        # Clamp adjustments to reasonable bounds
        pG_adj = max(-0.10, min(0.20, pG_adj))
        pS_adj = max(-0.05, min(0.15, pS_adj))

        return {
            'pG_adjustment': pG_adj,
            'pS_adjustment': pS_adj
        }

    def _get_engagement_adjustments(
        self,
        time_to_first_selection: Optional[int],
        answer_changes: Optional[int],
        time_since_reading: Optional[int],
        time_since_last_attempt: Optional[int],
        has_read_topic_before: Optional[bool],
        last_topic_read_time: Optional[int],
        last_attempt_time: Optional[int],
        last_reading_max_scroll_depth: Optional[int],
        last_reading_triggered_by_error: Optional[bool],
        difficulty: str,
        is_correct: bool
    ) -> Dict[str, float]:
        """
        Heuristic adjustments from confidence, sequence, and reading engagement.
        Returns pG_adjustment and pS_adjustment (additive to time adjustments).
        """
        pG_adj = 0.0
        pS_adj = 0.0

        # Confidence: fast first selection or answer changes suggest guessing if correct
        if time_to_first_selection is not None:
            if time_to_first_selection < 5 and is_correct:
                pG_adj += 0.08  # Very fast correct = more guess-like
            elif 5 <= time_to_first_selection <= 25 and is_correct:
                pG_adj -= 0.02  # Thoughtful correct = slightly more reliable
        if answer_changes is not None and answer_changes > 0:
            if is_correct:
                pG_adj += 0.05  # Changed answer then correct = less confident
            else:
                pS_adj -= 0.02  # Changed answer then wrong = uncertain, slight slip reduction

        # Sequence: recent reading or prior reading can make correct more reliable
        if has_read_topic_before is not None and has_read_topic_before and is_correct:
            if time_since_reading is not None and time_since_reading < 300:
                pG_adj -= 0.03  # Read within 5 min + correct = more likely real learning
            else:
                pG_adj -= 0.01  # Had read before = slightly more reliable

        # Reading quality: high scroll depth = substantive reading
        if last_reading_max_scroll_depth is not None and last_reading_max_scroll_depth >= 80 and is_correct:
            pG_adj -= 0.02  # Read most of topic + correct = more reliable
        # Return visit after error: they just reviewed, correct is more credible
        if last_reading_triggered_by_error is not None and last_reading_triggered_by_error and is_correct:
            pG_adj -= 0.04  # Came back after wrong answer and got right = likely learned

        pG_adj = max(-0.08, min(0.12, pG_adj))
        pS_adj = max(-0.04, min(0.08, pS_adj))
        return {'pG_adjustment': pG_adj, 'pS_adjustment': pS_adj}

    def _derive_time_since_seconds(
        self,
        explicit_seconds: Optional[int],
        timestamp_value: Optional[int]
    ) -> Optional[int]:
        """
        Derive elapsed seconds from either an explicit value or a timestamp.

        Timestamp may be in milliseconds or seconds epoch format.
        """
        if explicit_seconds is not None and explicit_seconds >= 0:
            return explicit_seconds
        if timestamp_value is None or timestamp_value < 0:
            return None

        now_seconds = int(time.time())
        # Heuristic: values larger than year-3000 in seconds are likely milliseconds.
        ts_seconds = timestamp_value // 1000 if timestamp_value > 32503680000 else timestamp_value
        elapsed = now_seconds - ts_seconds
        return elapsed if elapsed >= 0 else None

    def update(
        self,
        user_id: str,
        objective_id: str,
        is_correct: bool,
        difficulty: str = 'medium',
        active_time_seconds: Optional[int] = None,
        total_time_seconds: Optional[int] = None,
        was_maxed_out: Optional[bool] = False,
        idle_detected: Optional[bool] = False,
        time_to_first_selection: Optional[int] = None,
        answer_changes: Optional[int] = None,
        time_since_reading: Optional[int] = None,
        time_since_last_attempt: Optional[int] = None,
        has_read_topic_before: Optional[bool] = None,
        last_topic_read_time: Optional[int] = None,
        last_attempt_time: Optional[int] = None,
        last_reading_max_scroll_depth: Optional[int] = None,
        last_reading_triggered_by_error: Optional[bool] = None,
        problem_id: Optional[str] = None,
    ) -> Dict:
        """
        Update BKT state after student response

        Uses multidimensional prototypes and sequential Bayesian updating

        Time tracking parameters are accepted and stored for future neural network training.
        Full integration of time features into predictions requires training a model that
        uses time patterns to distinguish confident mastery from lucky guessing.
        """
        difficulty = str(difficulty).lower() if difficulty else 'medium'
        if difficulty not in ('easy', 'medium', 'hard'):
            difficulty = 'medium'

        # Initialize user state if needed
        if user_id not in self.student_states:
            self.student_states[user_id] = {}

        # Initialize objective state if needed
        if objective_id not in self.student_states[user_id]:
            prior_bonus = self._get_reading_time_bonus(user_id, objective_id)
            pL0 = max(0.01, min(0.99, self.base_params['pL0'] + prior_bonus))
            self.student_states[user_id][objective_id] = {
                'pL': pL0,
                'pL0': pL0,
                'pT': self.base_params['pT_base'],
                'pS': self.base_params['pS_base'],
                'pG': self.base_params['pG_base'],
                'attempts': 0,
                'correct': 0,
                'incorrect': 0
            }

        state = self.student_states[user_id][objective_id]

        # Get time-based parameter adjustments (heuristic-based for now)
        time_adjustments = self._get_time_based_adjustments(
            active_time_seconds,
            total_time_seconds,
            was_maxed_out,
            idle_detected,
            difficulty,
            is_correct
        )
        resolved_time_since_reading = self._derive_time_since_seconds(
            time_since_reading,
            last_topic_read_time
        )
        resolved_time_since_last_attempt = self._derive_time_since_seconds(
            time_since_last_attempt,
            last_attempt_time
        )

        # Get engagement-based adjustments (confidence, sequence, reading)
        engagement_adjustments = self._get_engagement_adjustments(
            time_to_first_selection,
            answer_changes,
            resolved_time_since_reading,
            resolved_time_since_last_attempt,
            has_read_topic_before,
            last_topic_read_time,
            last_attempt_time,
            last_reading_max_scroll_depth,
            last_reading_triggered_by_error,
            difficulty,
            is_correct
        )
        # Combine and clamp total adjustments
        total_pG = time_adjustments['pG_adjustment'] + engagement_adjustments['pG_adjustment']
        total_pS = time_adjustments['pS_adjustment'] + engagement_adjustments['pS_adjustment']
        total_pG = max(-0.15, min(0.25, total_pG))
        total_pS = max(-0.08, min(0.18, total_pS))

        # Update prototype probabilities
        prototype_probs = self._sequential_bayesian_update(user_id, objective_id, is_correct, difficulty)

        # Get weighted average of BKT updates across prototypes with time + engagement adjustments
        pL_updates = []
        for i, prototype in enumerate(self.prototypes):
            params = self._get_prototype_adjusted_params(prototype, difficulty)

            # Apply combined time + engagement adjustments to parameters
            params['pG'] = max(0.01, min(0.99, params['pG'] + total_pG))
            params['pS'] = max(0.01, min(0.99, params['pS'] + total_pS))

            pL_new = self._bkt_update(state['pL'], is_correct, params)
            pL_updates.append(pL_new)

        # Weighted average based on prototype probabilities
        pL_new = np.average(pL_updates, weights=prototype_probs)

        # Get parameters from most likely prototype
        best_prototype_idx = np.argmax(prototype_probs)
        best_prototype = self.prototypes[best_prototype_idx]
        best_params = self._get_prototype_adjusted_params(best_prototype, difficulty)

        # Update state
        state['pL'] = pL_new
        state['pT'] = best_params['pT']
        state['pS'] = best_params['pS']
        state['pG'] = best_params['pG']
        state['attempts'] += 1

        if is_correct:
            state['correct'] += 1
        else:
            state['incorrect'] += 1

        return state

    def get_state(self, user_id: str, objective_id: str) -> Optional[Dict]:
        """Get current BKT state for user-objective pair"""
        if user_id in self.student_states and objective_id in self.student_states[user_id]:
            return self.student_states[user_id][objective_id]
        return None

    def get_student_profile(self, user_id: str) -> Dict:
        """
        Get student's multidimensional ability profile

        Returns the most likely prototype and its parameters
        """
        if user_id not in self.student_prototype_probs:
            # Return a deterministic default profile when no history exists.
            default = next((p for p in self.prototypes if p.name == "Average Student"), self.prototypes[-1])
            base_confidence = 1.0 / max(1, len(self.prototypes))
            return {
                'prototype_id': default.id,
                'prototype_name': default.name,
                'guessing': default.guessing,
                'not_slipping': default.not_slipping_boost,
                'learning': default.learning,
                'retention': default.retention,
                'confidence': base_confidence  # Uniform prior confidence
            }

        probs = self.student_prototype_probs[user_id]
        best_idx = np.argmax(probs)
        best_prototype = self.prototypes[best_idx]

        return {
            'prototype_id': best_prototype.id,
            'prototype_name': best_prototype.name,
            'guessing': best_prototype.guessing,
            'not_slipping': best_prototype.not_slipping_boost,
            'learning': best_prototype.learning,
            'retention': best_prototype.retention,
            'confidence': float(probs[best_idx])
        }

    def predict(self, user_id: str, objective_ids: List[str]) -> List[Dict]:
        """
        Predict student performance on objectives

        Returns probability of correct response for each objective
        """
        predictions = []

        for objective_id in objective_ids:
            state = self.get_state(user_id, objective_id)

            if not state:
                # No history - use prior
                pL = self.base_params['pL0']
                pS = self.base_params['pS_base']
                pG = self.base_params['pG_base']
            else:
                pL = state['pL']
                pS = state['pS']
                pG = state['pG']

            # Predicted probability of correct response
            p_correct = pL * (1 - pS) + (1 - pL) * pG

            # Determine mastery level
            mastery_percent = pL * 100
            if mastery_percent >= 90:
                mastery_level = "Mastered"
                recommended_difficulty = "hard"
            elif mastery_percent >= 75:
                mastery_level = "Proficient"
                recommended_difficulty = "medium"
            elif mastery_percent >= 60:
                mastery_level = "Developing"
                recommended_difficulty = "medium"
            else:
                mastery_level = "Not Yet Mastered"
                recommended_difficulty = "easy"

            predictions.append({
                'objective_id': objective_id,
                'prob_correct': float(p_correct),
                'recommended_difficulty': recommended_difficulty,
                'mastery_level': mastery_level
            })

        return predictions

    def get_all_prototypes(self) -> List[Dict]:
        """Get all student prototypes with their parameters"""
        return [
            {
                'id': p.id,
                'name': p.name,
                'guessing': p.guessing,
                'not_slipping_boost': p.not_slipping_boost,
                'learning': p.learning,
                'retention': p.retention
            }
            for p in self.prototypes
        ]
