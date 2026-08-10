"""One-shot wipe of student users, roster keys, and linked attempts.

Triggered when FORCE_WIPE_STUDENT_DATA=1. Keeps role=admin users and
course content (classes, semesters, modules, items, practice_problems).
"""

from __future__ import annotations

import os
import sys
from pathlib import Path

BACKEND_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_ROOT))

from sqlalchemy import delete, func, select  # noqa: E402

from db.database import SessionLocal  # noqa: E402
from db.models import Attempt, Roster, User  # noqa: E402


def wipe_student_data() -> None:
    if os.environ.get("FORCE_WIPE_STUDENT_DATA", "").strip() != "1":
        print("FORCE_WIPE_STUDENT_DATA is not 1 — skipping wipe.", flush=True)
        return

    db = SessionLocal()
    try:
        attempt_count = db.scalar(select(func.count()).select_from(Attempt)) or 0
        roster_count = db.scalar(select(func.count()).select_from(Roster)) or 0
        student_count = (
            db.scalar(select(func.count()).select_from(User).where(User.role != "admin")) or 0
        )
        admin_emails = [e for (e,) in db.execute(select(User.email).where(User.role == "admin")).all()]

        print(
            f"Wiping student data: attempts={attempt_count}, roster={roster_count}, "
            f"non_admin_users={student_count}; keeping admins={admin_emails}",
            flush=True,
        )

        # attempts.profile_id -> roster.id has no ON DELETE CASCADE
        db.execute(delete(Attempt))
        db.execute(delete(Roster))
        db.execute(delete(User).where(User.role != "admin"))
        db.commit()

        remaining_users = db.scalar(select(func.count()).select_from(User)) or 0
        remaining_roster = db.scalar(select(func.count()).select_from(Roster)) or 0
        remaining_attempts = db.scalar(select(func.count()).select_from(Attempt)) or 0
        print(
            f"Wipe complete. remaining users={remaining_users}, roster={remaining_roster}, "
            f"attempts={remaining_attempts}",
            flush=True,
        )
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    wipe_student_data()
