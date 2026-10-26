"""Badge catalog. The server decides what counts as earned. The list of badges itself is `badge_catalog.json`,
generated from the course data by scripts/build-badge-catalog.mjs and also read by the app (src/data/badges.js).

Two flavors:
- math: Math Refresher (Statistics Module 0). Earned through Math Practice and its Mastery Check.
  Problem ids start with `m0-<objective>-` (src/lib/mathPractice/generators.js).
- objectives: every other module. An objective badge is earned when BKT is at the mastery line and the most recent
  clean answers on it are correct (any source: Concept Review, Software Practice, benchmark practice). A module
  badge (gold) is earned when enough of the module's objective badges are earned.
"""

import json
from pathlib import Path

CATALOG = json.loads((Path(__file__).with_name("badge_catalog.json")).read_text(encoding="utf-8"))
RULES = CATALOG["rules"]

MASTERY_PL = RULES["mastery_pl"]
STREAK_NEEDED = RULES["streak"]
DEFAULT_ITEMS = RULES["default_items"]

# Math Practice: correct practice answers needed on top of BKT at the mastery line.
MIN_PRACTICE_CORRECT = 3

# Mastery Check: 5 questions, pass at 4, all taken together.
CHECK_QUESTIONS = 5
CHECK_PASS = 4
CHECK_WINDOW_MINUTES = 30
# Two or more flagged answers on a passed check mean "unverified" (flags other than a timeout).
UNVERIFIED_FLAGGED_ANSWERS = 2

# practice < unverified < earned < confirmed. "earned" is an objective badge from Concept Review / Software Practice.
STATE_RANK = {"practice": 1, "unverified": 2, "earned": 3, "confirmed": 4}
CHECKED_STATES = ("confirmed", "unverified")
EARNED_STATES = ("earned", "confirmed", "unverified")

AWARDS: dict[str, dict] = {}
for _mod in CATALOG["modules"]:
    _flavor = "math" if _mod["kind"] == "math" else "objectives"
    for _t in _mod["topics"]:
        AWARDS[_t["award_id"]] = {
            "kind": "topic",
            "flavor": _flavor,
            "module_id": _mod["id"],
            "objective_id": _t["objective_id"],
            "problem_prefix": _t.get("problem_prefix"),
            "items": _t.get("items", 0),
        }
    _b = _mod["module_badge"]
    AWARDS[_b["award_id"]] = {
        "kind": "module",
        "flavor": _flavor,
        "module_id": _mod["id"],
        "requires": [t["award_id"] for t in _mod["topics"]],
        "min_count": _b["min_count"],
        "min_state": _b["min_state"],
    }

# Kept for the Math Refresher tests and callers that use the old names
MATH_MODULE_ID = "stats-module-0"
MODULE_AWARD_ID = "math-module:stats-module-0"
