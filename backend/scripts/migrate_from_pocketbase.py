#!/usr/bin/env python3
"""
Migrate all PocketBase collections into PostgreSQL.

Preserves PocketBase record IDs so relations stay intact.

Usage:
  POCKETBASE_URL=https://pb.lab.clneu.com \\
  PB_ADMIN_EMAIL=admin@example.com \\
  PB_ADMIN_PASSWORD=secret \\
  DATABASE_URL=postgresql://... \\
  python backend/scripts/migrate_from_pocketbase.py

Optional:
  PB_EXPORT_JSON=./pocketbase-export.json   # skip live API, import from file
  DRY_RUN=1                                 # fetch only, no writes
"""

from __future__ import annotations

import json
import os
import sys
from datetime import date, datetime
from pathlib import Path
from typing import Any

import httpx
from sqlalchemy import text
from sqlalchemy.orm import Session

BACKEND_DIR = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(BACKEND_DIR))

from db.auth import hash_password  # noqa: E402
from db.database import SessionLocal, engine  # noqa: E402
from db.models import (  # noqa: E402
    Attempt,
    BktState,
    Class,
    Item,
    Module,
    PracticeAttempt,
    PracticeProblem,
    Roster,
    Semester,
    SoftwareLessonMetric,
    TopicReading,
    User,
    UserProgress,
    user_classes,
)

PB_URL = os.environ.get("POCKETBASE_URL", "https://pb.lab.clneu.com").rstrip("/")
PB_EMAIL = os.environ.get("PB_ADMIN_EMAIL", os.environ.get("ADMIN_EMAIL", ""))
PB_PASSWORD = os.environ.get("PB_ADMIN_PASSWORD", os.environ.get("ADMIN_PASSWORD", ""))
EXPORT_JSON = os.environ.get("PB_EXPORT_JSON", "")
DRY_RUN = os.environ.get("DRY_RUN", "") == "1"

COLLECTIONS = [
    "users",
    "classes",
    "semesters",
    "roster",
    "modules",
    "items",
    "attempts",
    "user_progress",
    "practice_problems",
    "practice_attempts",
    "topic_readings",
    "bkt_states",
    "software_lesson_metrics",
]

SKIP_PB_FIELDS = {"collectionId", "collectionName", "expand", "passwordConfirm"}


def parse_dt(value: Any) -> datetime | None:
    if not value:
        return None
    if isinstance(value, datetime):
        return value
    s = str(value).replace("Z", "+00:00")
    try:
        return datetime.fromisoformat(s.replace("+00:00", ""))
    except ValueError:
        return None


def parse_date(value: Any) -> date | None:
    if not value:
        return None
    if isinstance(value, date):
        return value
    try:
        return date.fromisoformat(str(value)[:10])
    except ValueError:
        return None


def rel_id(value: Any) -> str | None:
    if value is None or value == "":
        return None
    return str(value)


def pb_auth(client: httpx.Client) -> str:
    attempts = [
        ("/api/collections/_superusers/auth-with-password", {"identity": PB_EMAIL, "password": PB_PASSWORD}),
        ("/api/admins/auth-with-password", {"identity": PB_EMAIL, "password": PB_PASSWORD}),
        ("/api/collections/users/auth-with-password", {"identity": PB_EMAIL, "password": PB_PASSWORD}),
    ]
    for path, body in attempts:
        try:
            r = client.post(f"{PB_URL}{path}", json=body, timeout=30)
            if r.status_code == 200 and r.json().get("token"):
                return r.json()["token"]
        except httpx.HTTPError:
            continue
    raise RuntimeError(f"Could not authenticate to PocketBase at {PB_URL}")


def fetch_collection(client: httpx.Client, token: str, collection: str) -> list[dict]:
    headers = {"Authorization": token}
    page = 1
    items: list[dict] = []
    while True:
        r = client.get(
            f"{PB_URL}/api/collections/{collection}/records",
            params={"page": page, "perPage": 500},
            headers=headers,
            timeout=60,
        )
        r.raise_for_status()
        data = r.json()
        items.extend(data.get("items", []))
        if page >= data.get("totalPages", 1):
            break
        page += 1
    return items


def fetch_user_password(client: httpx.Client, token: str, user_id: str) -> str | None:
    headers = {"Authorization": token}
    r = client.get(
        f"{PB_URL}/api/collections/users/records/{user_id}",
        headers=headers,
        timeout=30,
    )
    if r.status_code != 200:
        return None
    return r.json().get("password")


def load_export() -> dict[str, list[dict]]:
    path = Path(EXPORT_JSON)
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, list):
        raise ValueError("Export JSON must be an object keyed by collection name")
    return data


def fetch_all(client: httpx.Client, token: str) -> dict[str, list[dict]]:
    out: dict[str, list[dict]] = {}
    for name in COLLECTIONS:
        try:
            records = fetch_collection(client, token, name)
            print(f"  fetched {name}: {len(records)} records")
            out[name] = records
        except httpx.HTTPStatusError as exc:
            if exc.response.status_code == 404:
                print(f"  skip {name}: collection not found on PocketBase")
                out[name] = []
            else:
                raise
    return out


def clear_tables(db: Session):
    tables = [
        "software_lesson_metrics",
        "bkt_states",
        "topic_readings",
        "practice_attempts",
        "practice_problems",
        "user_progress",
        "attempts",
        "items",
        "modules",
        "roster",
        "user_classes",
        "semesters",
        "classes",
        "users",
    ]
    for table in tables:
        db.execute(text(f"TRUNCATE TABLE {table} CASCADE"))
    db.commit()


def import_users(db: Session, records: list[dict], client: httpx.Client | None, token: str | None):
    for rec in records:
        pw = rec.get("password")
        if not pw and client and token:
            pw = fetch_user_password(client, token, rec["id"])
        password_hash = pw if pw and str(pw).startswith("$2") else hash_password(pw or "migration-reset-required")

        user = User(
            id=rec["id"],
            email=rec["email"],
            password_hash=password_hash,
            name=rec.get("name"),
            role=rec.get("role") or "student",
            verified=bool(rec.get("verified", True)),
            created=parse_dt(rec.get("created")) or datetime.utcnow(),
            updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
        )
        db.merge(user)

        class_ids = rec.get("classes") or []
        if class_ids:
            db.execute(user_classes.delete().where(user_classes.c.user_id == rec["id"]))
            for cid in class_ids:
                db.execute(
                    user_classes.insert().values(user_id=rec["id"], class_id=str(cid))
                )
    db.flush()
    print(f"  imported users: {len(records)}")


def import_classes(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            Class(
                id=rec["id"],
                name=rec["name"],
                short_name=rec.get("short_name") or rec["name"][:64],
                slug=rec.get("slug") or None,
                description=rec.get("description"),
                color=rec.get("color"),
                icon=rec.get("icon"),
                topics=rec.get("topics"),
                order=rec.get("order"),
                is_active=rec.get("is_active", True),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported classes: {len(records)}")


def import_semesters(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            Semester(
                id=rec["id"],
                code=rec["code"],
                name=rec.get("name"),
                start_date=parse_date(rec.get("start_date")),
                end_date=parse_date(rec.get("end_date")),
                is_active=rec.get("is_active", True),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported semesters: {len(records)}")


def import_roster(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            Roster(
                id=rec["id"],
                semester_id=rel_id(rec.get("semester")),
                student_key=rec["student_key"],
                claim_token=rec.get("claim_token") or None,
                user_id=rel_id(rec.get("user")),
                claimed_at=parse_dt(rec.get("claimed_at")),
                bb_username=rec.get("bb_username"),
                bb_id=rec.get("bb_id"),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported roster: {len(records)}")


def import_modules(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            Module(
                id=rec["id"],
                class_id=rel_id(rec.get("class")),
                topic_id=rec["topic_id"],
                title=rec["title"],
                description=rec.get("description"),
                software_type=rec.get("software_type") or "all",
                semester_id=rel_id(rec.get("semester")),
                order=rec.get("order"),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported modules: {len(records)}")


def import_items(db: Session, records: list[dict]):
    for rec in records:
        prompt = rec.get("prompt") or rec.get("question")
        db.merge(
            Item(
                id=rec["id"],
                module_id=rel_id(rec.get("module")),
                title=rec.get("title"),
                question=prompt,
                item_type=rec.get("item_type"),
                question_type=rec.get("question_type"),
                options=rec.get("options"),
                correct_answer=rec.get("correct_answer") or rec.get("answer_key"),
                answer_key=rec.get("answer_key"),
                explanation=rec.get("explanation"),
                hint=rec.get("hint"),
                difficulty=rec.get("difficulty"),
                tags=rec.get("tags"),
                order=rec.get("order"),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported items: {len(records)}")


def import_attempts(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            Attempt(
                id=rec["id"],
                semester_id=rel_id(rec.get("semester")),
                profile_id=rel_id(rec.get("profile")),
                module_id=rel_id(rec.get("module")),
                item_id=rel_id(rec.get("item")),
                software_type=rec.get("software_type"),
                response=rec.get("response"),
                is_correct=bool(rec.get("is_correct")),
                score=rec.get("score"),
                time_spent_seconds=rec.get("time_spent_seconds"),
                active_time_seconds=rec.get("active_time_seconds"),
                total_time_seconds=rec.get("total_time_seconds"),
                time_maxed_out=rec.get("time_maxed_out"),
                idle_detected=rec.get("idle_detected"),
                attempt_no=rec.get("attempt_no"),
                hint_used=rec.get("hint_used"),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported attempts: {len(records)}")


def import_user_progress(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            UserProgress(
                id=rec["id"],
                user_id=rel_id(rec.get("user")),
                topic_id=rec["topic_id"],
                completed=bool(rec.get("completed")),
                completed_at=parse_dt(rec.get("completed_at")),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported user_progress: {len(records)}")


def import_practice_problems(db: Session, records: list[dict]):
    for rec in records:
        options = rec.get("options")
        if isinstance(options, str):
            try:
                options = json.loads(options)
            except json.JSONDecodeError:
                pass
        db.merge(
            PracticeProblem(
                id=rec["id"],
                topic_id=rec["topic_id"],
                question_id=rec.get("question_id") or None,
                question=rec["question"],
                question_type=rec["question_type"],
                options=options,
                correct_answer=rec["correct_answer"],
                explanation=rec.get("explanation"),
                hint=rec.get("hint"),
                difficulty=rec.get("difficulty"),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported practice_problems: {len(records)}")


def import_practice_attempts(db: Session, records: list[dict]):
    for rec in records:
        problem = rec.get("problem")
        if isinstance(problem, dict):
            problem = problem.get("id", str(problem))
        db.merge(
            PracticeAttempt(
                id=rec["id"],
                user_id=rel_id(rec.get("user")),
                problem=str(problem)[:120],
                answer=rec.get("answer", ""),
                is_correct=bool(rec.get("is_correct")),
                difficulty=rec.get("difficulty"),
                active_time_seconds=rec.get("active_time_seconds"),
                total_time_seconds=rec.get("total_time_seconds"),
                time_maxed_out=rec.get("time_maxed_out"),
                idle_detected=rec.get("idle_detected"),
                time_to_first_selection=rec.get("time_to_first_selection"),
                answer_changes=rec.get("answer_changes"),
                time_since_reading=rec.get("time_since_reading"),
                time_since_last_attempt=rec.get("time_since_last_attempt"),
                has_read_topic_before=rec.get("has_read_topic_before"),
                last_topic_read_time=rec.get("last_topic_read_time"),
                last_attempt_time=rec.get("last_attempt_time"),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported practice_attempts: {len(records)}")


def import_topic_readings(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            TopicReading(
                id=rec["id"],
                user_id=rel_id(rec.get("user")),
                topic_id=rec["topic_id"],
                module_id=rec.get("module_id"),
                active_time_seconds=rec.get("active_time_seconds"),
                total_time_seconds=rec.get("total_time_seconds"),
                time_maxed_out=rec.get("time_maxed_out"),
                idle_detected=rec.get("idle_detected"),
                max_scroll_depth=rec.get("max_scroll_depth"),
                triggered_by_error=rec.get("triggered_by_error"),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported topic_readings: {len(records)}")


def import_bkt_states(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            BktState(
                id=rec["id"],
                user_id=rel_id(rec.get("user")),
                objective_id=rec["objective_id"],
                pL=float(rec["pL"]),
                pL0=float(rec["pL0"]),
                pT=float(rec["pT"]),
                pS=float(rec["pS"]),
                pG=float(rec["pG"]),
                attempts=int(rec["attempts"]),
                correct=int(rec["correct"]),
                incorrect=int(rec["incorrect"]),
                last_updated=parse_dt(rec.get("last_updated")) or datetime.utcnow(),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported bkt_states: {len(records)}")


def import_software_lesson_metrics(db: Session, records: list[dict]):
    for rec in records:
        db.merge(
            SoftwareLessonMetric(
                id=rec["id"],
                user_id=rel_id(rec.get("user")),
                lesson_id=rec["lesson_id"],
                lesson_title=rec.get("lesson_title"),
                module=rec.get("module"),
                software=rec.get("software"),
                event_type=rec["event_type"],
                event_payload=rec.get("event_payload"),
                created=parse_dt(rec.get("created")) or datetime.utcnow(),
                updated=parse_dt(rec.get("updated")) or datetime.utcnow(),
            )
        )
    db.flush()
    print(f"  imported software_lesson_metrics: {len(records)}")


IMPORTERS = [
    ("users", import_users),
    ("classes", import_classes),
    ("semesters", import_semesters),
    ("roster", import_roster),
    ("modules", import_modules),
    ("items", import_items),
    ("attempts", import_attempts),
    ("user_progress", import_user_progress),
    ("practice_problems", import_practice_problems),
    ("practice_attempts", import_practice_attempts),
    ("topic_readings", import_topic_readings),
    ("bkt_states", import_bkt_states),
    ("software_lesson_metrics", import_software_lesson_metrics),
]


def run_import(db: Session, data: dict[str, list[dict]], client: httpx.Client | None, token: str | None):
    print("\nImporting into PostgreSQL...")
    clear_tables(db)
    for name, importer in IMPORTERS:
        records = data.get(name, [])
        if not records:
            continue
        if name == "users":
            import_users(db, records, client, token)
        else:
            importer(db, records)
    db.commit()


def main():
    print("PocketBase → PostgreSQL migration")
    print(f"  Source: {EXPORT_JSON or PB_URL}")
    print(f"  Target: {os.environ.get('DATABASE_URL', '(from env)')}")

    if not EXPORT_JSON and (not PB_EMAIL or not PB_PASSWORD):
        print("\nError: set PB_ADMIN_EMAIL and PB_ADMIN_PASSWORD (or use PB_EXPORT_JSON)")
        sys.exit(1)

    # Ensure schema exists
    from alembic.config import Config
    from alembic import command

    alembic_cfg = Config(str(BACKEND_DIR / "alembic.ini"))
    command.upgrade(alembic_cfg, "head")

    client: httpx.Client | None = None
    token: str | None = None

    if EXPORT_JSON:
        data = load_export()
        for name in COLLECTIONS:
            print(f"  loaded {name}: {len(data.get(name, []))} records")
    else:
        client = httpx.Client()
        print(f"\nConnecting to {PB_URL}...")
        token = pb_auth(client)
        print("  authenticated")
        data = fetch_all(client, token)

    if DRY_RUN:
        print("\nDRY_RUN=1 — no database writes")
        total = sum(len(data.get(c, [])) for c in COLLECTIONS)
        print(f"Would import {total} total records")
        return

    db = SessionLocal()
    try:
        run_import(db, data, client, token)
        print("\nMigration complete.")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()
        if client:
            client.close()


if __name__ == "__main__":
    main()
