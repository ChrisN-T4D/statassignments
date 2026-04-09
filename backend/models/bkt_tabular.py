"""
Time-augmented tabular BKT compatible with :class:`NeuralBKTModel`'s API.

Delegates mastery updates to :class:`bkt_core.TimeAugmentedBKT` (forgetting,
contextual pG/pS, response-time and engagement heuristics). Enable with
environment variable ``BKT_ENGINE=tabular``; default remains ``neural``.
"""

from __future__ import annotations

import time
from typing import Dict, List, Optional

from .bkt_core import BKTConfig, BKTState, Observation, TimeAugmentedBKT

_TABULAR_PROTOTYPE_META: List[Dict] = [
    {
        "id": 0,
        "name": "Fast Learner",
        "guessing": 0.3,
        "not_slipping_boost": 0.8,
        "learning": 0.25,
        "retention": 0.95,
    },
    {
        "id": 1,
        "name": "Careful Student",
        "guessing": 0.15,
        "not_slipping_boost": 0.9,
        "learning": 0.15,
        "retention": 0.85,
    },
    {
        "id": 2,
        "name": "Struggling Student",
        "guessing": 0.35,
        "not_slipping_boost": 0.5,
        "learning": 0.10,
        "retention": 0.70,
    },
    {
        "id": 3,
        "name": "Inconsistent Student",
        "guessing": 0.25,
        "not_slipping_boost": 0.6,
        "learning": 0.12,
        "retention": 0.75,
    },
    {
        "id": 4,
        "name": "Average Student",
        "guessing": 0.25,
        "not_slipping_boost": 0.7,
        "learning": 0.15,
        "retention": 0.80,
    },
]


def _derive_time_since_seconds(
    explicit_seconds: Optional[int],
    timestamp_value: Optional[int],
) -> Optional[float]:
    if explicit_seconds is not None and explicit_seconds >= 0:
        return float(explicit_seconds)
    if timestamp_value is None or timestamp_value < 0:
        return None
    now_seconds = int(time.time())
    ts_seconds = timestamp_value // 1000 if timestamp_value > 32503680000 else timestamp_value
    elapsed = now_seconds - int(ts_seconds)
    return float(elapsed) if elapsed >= 0 else None


def _scroll_fraction(depth: Optional[int]) -> Optional[float]:
    """Map client scroll depth (0–100 or 0–1) to Observation.scroll_depth in [0, 1]."""
    if depth is None or depth < 0:
        return None
    if depth <= 1:
        return float(depth)
    return min(1.0, float(depth) / 100.0)


class TabularBKTModel:
    """
    Same public methods as :class:`neural_bkt.NeuralBKTModel` for FastAPI routes.

    Does not maintain prototype posteriors; profile endpoints return the same
    default as an uninitialized neural model.
    """

    def __init__(self, num_prototypes: int = 5, num_objectives: int = 50) -> None:
        self.num_objectives = num_objectives
        n = max(1, min(int(num_prototypes), len(_TABULAR_PROTOTYPE_META)))
        self.num_prototypes = n
        self.config = BKTConfig()
        self._engine = TimeAugmentedBKT(self.config)
        self.student_states: Dict[str, Dict[str, Dict]] = {}

    def _state_to_dict(self, s: BKTState) -> Dict:
        return {
            "pL": s.pL,
            "pL0": s.pL0,
            "pT": s.pT,
            "pS": s.pS,
            "pG": s.pG,
            "attempts": s.attempts,
            "correct": s.correct,
            "incorrect": s.incorrect,
            "last_attempt_time": s.last_attempt_time,
        }

    def _dict_to_state(self, d: Dict, user_id: str, objective_id: str) -> BKTState:
        return BKTState(
            user_id=user_id,
            objective_id=objective_id,
            pL=float(d.get("pL", self.config.pL0)),
            pL0=float(d.get("pL0", self.config.pL0)),
            pT=float(d.get("pT", self.config.pT)),
            pS=float(d.get("pS", self.config.pS)),
            pG=float(d.get("pG", self.config.pG)),
            pF=float(d.get("pF", self.config.pF)),
            attempts=int(d.get("attempts", 0)),
            correct=int(d.get("correct", 0)),
            incorrect=int(d.get("incorrect", 0)),
            last_attempt_time=d.get("last_attempt_time"),
        )

    def update(
        self,
        user_id: str,
        objective_id: str,
        is_correct: bool,
        difficulty: str = "medium",
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
        difficulty = str(difficulty).lower() if difficulty else "medium"
        if difficulty not in ("easy", "medium", "hard"):
            difficulty = "medium"

        if user_id not in self.student_states:
            self.student_states[user_id] = {}

        raw = self.student_states[user_id].get(objective_id)
        if raw is None:
            bkt_state = self._engine.get_initial_state(user_id, objective_id)
        else:
            bkt_state = self._dict_to_state(raw, user_id, objective_id)

        resolved_reading = _derive_time_since_seconds(
            time_since_reading, last_topic_read_time
        )
        resolved_last_attempt = _derive_time_since_seconds(
            time_since_last_attempt, last_attempt_time
        )

        active_f = float(active_time_seconds) if active_time_seconds is not None else None
        total_f = float(total_time_seconds) if total_time_seconds is not None else None

        obs = Observation(
            user_id=user_id,
            objective_id=objective_id,
            question_id=(problem_id or "unknown"),
            is_correct=is_correct,
            difficulty=difficulty,
            question_type="multiple_choice",
            active_time_seconds=active_f,
            total_time_seconds=total_f,
            time_to_first_selection=(
                float(time_to_first_selection) if time_to_first_selection is not None else None
            ),
            answer_changes=answer_changes,
            time_since_reading=resolved_reading,
            time_since_last_attempt=resolved_last_attempt,
            has_read_topic_before=has_read_topic_before,
            scroll_depth=_scroll_fraction(last_reading_max_scroll_depth),
            timestamp=time.time(),
        )

        self._engine.update(bkt_state, obs)
        out = self._state_to_dict(bkt_state)
        self.student_states[user_id][objective_id] = out
        return {
            "pL": out["pL"],
            "pL0": out["pL0"],
            "pT": out["pT"],
            "pS": out["pS"],
            "pG": out["pG"],
            "attempts": out["attempts"],
            "correct": out["correct"],
            "incorrect": out["incorrect"],
        }

    def get_state(self, user_id: str, objective_id: str) -> Optional[Dict]:
        if user_id not in self.student_states:
            return None
        raw = self.student_states[user_id].get(objective_id)
        if not raw:
            return None
        return {
            "pL": raw["pL"],
            "pL0": raw["pL0"],
            "pT": raw["pT"],
            "pS": raw["pS"],
            "pG": raw["pG"],
            "attempts": raw["attempts"],
            "correct": raw["correct"],
            "incorrect": raw["incorrect"],
        }

    def get_student_profile(self, user_id: str) -> Dict:
        default = next(
            (p for p in _TABULAR_PROTOTYPE_META if p["name"] == "Average Student"),
            _TABULAR_PROTOTYPE_META[-1],
        )
        base_confidence = 1.0 / max(1, self.num_prototypes)
        return {
            "prototype_id": default["id"],
            "prototype_name": default["name"],
            "guessing": default["guessing"],
            "not_slipping": default["not_slipping_boost"],
            "learning": default["learning"],
            "retention": default["retention"],
            "confidence": base_confidence,
        }

    def predict(self, user_id: str, objective_ids: List[str]) -> List[Dict]:
        predictions = []
        for objective_id in objective_ids:
            state = self.get_state(user_id, objective_id)
            if not state:
                pL = self.config.pL0
                pS = self.config.pS
                pG = self.config.pG
            else:
                pL = state["pL"]
                pS = state["pS"]
                pG = state["pG"]

            p_correct = pL * (1 - pS) + (1 - pL) * pG
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

            predictions.append(
                {
                    "objective_id": objective_id,
                    "prob_correct": float(p_correct),
                    "recommended_difficulty": recommended_difficulty,
                    "mastery_level": mastery_level,
                }
            )
        return predictions

    def get_all_prototypes(self) -> List[Dict]:
        return [
            {
                "id": p["id"],
                "name": p["name"],
                "guessing": p["guessing"],
                "not_slipping_boost": p["not_slipping_boost"],
                "learning": p["learning"],
                "retention": p["retention"],
            }
            for p in _TABULAR_PROTOTYPE_META[: self.num_prototypes]
        ]
