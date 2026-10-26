"""Badge catalog. The server decides what counts as earned, so this lives here and not only in the front end.

Math Refresher (Statistics Module 0): one topic badge per objective M0-O1..O7 and one module badge.
Problem ids from Math Practice start with `m0-<objective>-` (see src/lib/mathPractice/generators.js).
"""

MATH_MODULE_ID = "stats-module-0"
MATH_OBJECTIVES = ["M0-O1", "M0-O2", "M0-O3", "M0-O4", "M0-O5", "M0-O6", "M0-O7"]

# Practice mastery: BKT at or above this line (same as Concept Review) plus correct practice answers.
MASTERY_PL = 0.9
MIN_PRACTICE_CORRECT = 3

# Mastery Check: 5 questions, pass at 4, all taken together.
CHECK_QUESTIONS = 5
CHECK_PASS = 4
CHECK_WINDOW_MINUTES = 30
# Two or more flagged answers on a passed check mean "unverified" (flags other than a timeout).
UNVERIFIED_FLAGGED_ANSWERS = 2

STATE_RANK = {"practice": 1, "unverified": 2, "confirmed": 3}


def topic_award_id(objective_id: str) -> str:
    return f"math-topic:{objective_id}"


MODULE_AWARD_ID = f"math-module:{MATH_MODULE_ID}"

AWARDS: dict[str, dict] = {}
for _o in MATH_OBJECTIVES:
    AWARDS[topic_award_id(_o)] = {
        "kind": "topic",
        "module_id": MATH_MODULE_ID,
        "objective_id": _o,
        "problem_prefix": f"m0-{_o}-",
    }
AWARDS[MODULE_AWARD_ID] = {
    "kind": "module",
    "module_id": MATH_MODULE_ID,
    "requires": [topic_award_id(o) for o in MATH_OBJECTIVES],
}
