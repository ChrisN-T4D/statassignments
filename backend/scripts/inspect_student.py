"""One-off inspect student by bb_username or email fragment. Usage: python scripts/inspect_student.py sharnold"""
import json
import os
import sys

from sqlalchemy import create_engine, text

needle = (sys.argv[1] if len(sys.argv) > 1 else "sharnold").lower()
db_url = os.environ.get("DATABASE_URL")
if not db_url:
    print("DATABASE_URL not set", file=sys.stderr)
    sys.exit(1)

engine = create_engine(db_url)

queries = {
    "roster": text(
        """
        SELECT r.id, r.student_key, r.bb_username, r.user_id, r.class_id,
               cl.slug AS class_slug, cl.name AS class_name, u.email
        FROM roster r
        LEFT JOIN classes cl ON cl.id = r.class_id
        LEFT JOIN users u ON u.id = r.user_id
        WHERE LOWER(COALESCE(r.bb_username, '')) LIKE :q
           OR LOWER(COALESCE(u.email, '')) LIKE :q
        ORDER BY r.student_key
        """
    ),
    "user_classes": text(
        """
        SELECT u.id, u.email, array_agg(cl.slug ORDER BY cl.slug) AS classes
        FROM users u
        LEFT JOIN user_classes uc ON uc.user_id = u.id
        LEFT JOIN classes cl ON cl.id = uc.class_id
        WHERE LOWER(COALESCE(u.email, '')) LIKE :q
           OR u.id IN (
               SELECT user_id FROM roster
               WHERE LOWER(COALESCE(bb_username, '')) LIKE :q
           )
        GROUP BY u.id, u.email
        """
    ),
    "practice_by_module": text(
        """
        SELECT
          CASE
            WHEN pa.problem LIKE 'rm-%' THEN 'research-methods'
            WHEN pa.problem LIKE 'stats-%' THEN 'statistics'
            ELSE 'other'
          END AS inferred_class,
          COUNT(*) AS attempts,
          MIN(pa.created) AS first_at,
          MAX(pa.created) AS last_at
        FROM practice_attempts pa
        WHERE pa.user_id IN (
          SELECT DISTINCT user_id FROM roster
          WHERE LOWER(COALESCE(bb_username, '')) LIKE :q AND user_id IS NOT NULL
          UNION
          SELECT id FROM users
          WHERE LOWER(COALESCE(email, '')) LIKE :q
        )
        GROUP BY 1
        ORDER BY 1
        """
    ),
    "learning_events_by_class": text(
        """
        SELECT le.class_id, le.source, COUNT(*) AS n
        FROM learning_events le
        WHERE le.user_id IN (
          SELECT DISTINCT user_id FROM roster
          WHERE LOWER(COALESCE(bb_username, '')) LIKE :q AND user_id IS NOT NULL
          UNION
          SELECT id FROM users
          WHERE LOWER(COALESCE(email, '')) LIKE :q
        )
        GROUP BY le.class_id, le.source
        ORDER BY le.class_id, le.source
        """
    ),
    "sample_attempts": text(
        """
        SELECT pa.problem, pa.answer, pa.is_correct, pa.created
        FROM practice_attempts pa
        WHERE pa.user_id IN (
          SELECT DISTINCT user_id FROM roster
          WHERE LOWER(COALESCE(bb_username, '')) LIKE :q AND user_id IS NOT NULL
          UNION
          SELECT id FROM users
          WHERE LOWER(COALESCE(email, '')) LIKE :q
        )
        ORDER BY pa.created DESC
        LIMIT 15
        """
    ),
}

with engine.connect() as conn:
    params = {"q": f"%{needle}%"}
    for name, q in queries.items():
        print(f"\n=== {name} ===")
        rows = conn.execute(q, params).fetchall()
        if not rows:
            print("(none)")
            continue
        for row in rows:
            print(json.dumps(dict(row._mapping), default=str))
