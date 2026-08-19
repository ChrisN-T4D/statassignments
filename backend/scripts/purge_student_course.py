"""Remove cross-course activity for a student. Usage: python scripts/purge_student_course.py <bb_username> statistics"""
import json
import os
import sys

from sqlalchemy import create_engine, text

needle = sys.argv[1].lower() if len(sys.argv) > 1 else "sharnold"
purge_course = sys.argv[2] if len(sys.argv) > 2 else "statistics"

db_url = os.environ.get("DATABASE_URL")
if not db_url:
    print("DATABASE_URL not set", file=sys.stderr)
    sys.exit(1)

engine = create_engine(db_url)

with engine.begin() as conn:
    user_row = conn.execute(
        text(
            """
            SELECT u.id, u.email
            FROM users u
            WHERE LOWER(COALESCE(u.email, '')) LIKE :q
               OR u.id IN (
                   SELECT user_id FROM roster
                   WHERE LOWER(COALESCE(bb_username, '')) LIKE :q AND user_id IS NOT NULL
               )
            LIMIT 1
            """
        ),
        {"q": f"%{needle}%"},
    ).fetchone()
    if not user_row:
        print("User not found")
        sys.exit(1)

    user_id = user_row.id
    print(json.dumps({"user_id": user_id, "email": user_row.email}))

    stats_class = conn.execute(
        text("SELECT id, slug FROM classes WHERE slug = :slug"),
        {"slug": purge_course},
    ).fetchone()

    rm_class = conn.execute(
        text("SELECT id, slug FROM classes WHERE slug = 'research-methods'"),
    ).fetchone()

    # Drop statistics from user_classes if present
    if stats_class:
        removed = conn.execute(
            text("DELETE FROM user_classes WHERE user_id = :uid AND class_id = :cid"),
            {"uid": user_id, "cid": stats_class.id},
        )
        print(json.dumps({"user_classes_removed": removed.rowcount}))

    remaining_classes = conn.execute(
        text(
            """
            SELECT cl.slug FROM user_classes uc
            JOIN classes cl ON cl.id = uc.class_id
            WHERE uc.user_id = :uid ORDER BY cl.slug
            """
        ),
        {"uid": user_id},
    ).fetchall()
    print(json.dumps({"user_classes_after": [r[0] for r in remaining_classes]}))

    pa = conn.execute(
        text(
            """
            DELETE FROM practice_attempts
            WHERE user_id = :uid AND (
              problem LIKE 'stats-%' OR problem LIKE 'stats-module-%'
            )
            """
        ),
        {"uid": user_id},
    )
    print(json.dumps({"practice_attempts_deleted": pa.rowcount}))

    le = conn.execute(
        text(
            """
            DELETE FROM learning_events
            WHERE user_id = :uid AND class_id = :course
            """
        ),
        {"uid": user_id, "course": purge_course},
    )
    print(json.dumps({"learning_events_deleted": le.rowcount}))

    bkt = conn.execute(
        text(
            """
            DELETE FROM bkt_states
            WHERE user_id = :uid AND objective_id NOT LIKE 'RM%'
            """
        ),
        {"uid": user_id},
    )
    print(json.dumps({"bkt_states_deleted": bkt.rowcount}))

    proto = conn.execute(
        text(
            """
            DELETE FROM bkt_prototypes
            WHERE user_id = :uid AND class_id = :course
            """
        ),
        {"uid": user_id, "course": purge_course},
    )
    print(json.dumps({"bkt_prototypes_deleted": proto.rowcount}))

    slm = conn.execute(
        text(
            """
            DELETE FROM software_lesson_metrics
            WHERE user_id = :uid AND (
              module LIKE 'stats-%' OR module LIKE 'stats-module-%'
            )
            """
        ),
        {"uid": user_id},
    )
    print(json.dumps({"software_lesson_metrics_deleted": slm.rowcount}))

    # Verify roster still RM-only
    roster = conn.execute(
        text(
            """
            SELECT r.student_key, cl.slug
            FROM roster r
            LEFT JOIN classes cl ON cl.id = r.class_id
            WHERE r.user_id = :uid
            """
        ),
        {"uid": user_id},
    ).fetchall()
    print(json.dumps({"roster": [{"student_key": r[0], "class": r[1]} for r in roster]}))

    counts = conn.execute(
        text(
            """
            SELECT
              (SELECT COUNT(*) FROM practice_attempts WHERE user_id = :uid) AS pa,
              (SELECT COUNT(*) FROM practice_attempts WHERE user_id = :uid AND problem LIKE 'stats-%') AS pa_stats,
              (SELECT COUNT(*) FROM learning_events WHERE user_id = :uid AND class_id = :course) AS le_stats
            """
        ),
        {"uid": user_id, "course": purge_course},
    ).fetchone()
    print(json.dumps({"remaining": dict(counts._mapping)}))
