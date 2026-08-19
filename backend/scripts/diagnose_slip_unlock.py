"""Diagnose concept review slip unlock for a student module."""
import json
import os
import sys

from sqlalchemy import create_engine, text

needle = sys.argv[1] if len(sys.argv) > 1 else "sharnold"
module_prefix = sys.argv[2] if len(sys.argv) > 2 else "rm-m1"

db_url = os.environ.get("DATABASE_URL")
if not db_url:
    print("DATABASE_URL not set", file=sys.stderr)
    sys.exit(1)

engine = create_engine(db_url)

with engine.connect() as conn:
    user = conn.execute(
        text(
            """
            SELECT u.id, u.email, r.student_key, r.access_mode
            FROM users u
            LEFT JOIN roster r ON r.user_id = u.id
            WHERE LOWER(COALESCE(u.email, '')) LIKE :q
               OR LOWER(COALESCE(r.bb_username, '')) LIKE :q
            LIMIT 1
            """
        ),
        {"q": f"%{needle.lower()}%"},
    ).fetchone()
    if not user:
        print("not found")
        sys.exit(1)

    uid = user.id
    print(json.dumps({"user": dict(user._mapping)}, default=str))

    attempts = conn.execute(
        text(
            """
            SELECT problem, is_correct, created
            FROM practice_attempts
            WHERE user_id = :uid AND problem LIKE :pat
            ORDER BY created
            """
        ),
        {"uid": uid, "pat": f"{module_prefix}-%"},
    ).fetchall()

    unique = {}
    for a in attempts:
        unique[a.problem] = unique.get(a.problem, 0) + 1

    print(json.dumps({
        "total_attempts": len(attempts),
        "unique_questions": len(unique),
        "repeat_counts": {k: v for k, v in sorted(unique.items()) if v > 1},
    }, indent=2))

    bkt = conn.execute(
        text(
            """
            SELECT objective_id, "pL", attempts, correct
            FROM bkt_states
            WHERE user_id = :uid AND objective_id LIKE 'RM%'
            ORDER BY objective_id
            """
        ),
        {"uid": uid},
    ).fetchall()
    print("\n=== BKT (RM objectives) ===")
    for r in bkt:
        m = dict(r._mapping)
        m["mastered"] = float(m["pL"]) >= 0.9
        print(json.dumps(m, default=str))

    below = [dict(r._mapping) for r in bkt if float(r.pL) < 0.9]
    print(json.dumps({"objectives_below_0.9": len(below), "objectives_total": len(bkt)}))
