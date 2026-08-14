"""One-shot copy of existing logs into learning_events. Run from backend/:

    python scripts/backfill_learning_events.py
"""

from __future__ import annotations

import sys
from pathlib import Path

BACKEND_DIR = Path(__file__).resolve().parents[1]
if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from sqlalchemy import select

from db.database import SessionLocal
from db.models import LearningEvent, PracticeAttempt, SoftwareLessonMetric, TopicReading
from models.class_ids import infer_class_id


def _exists(db, user_id: str, source: str, item_id: str | None, created) -> bool:
    stmt = select(LearningEvent.id).where(
        LearningEvent.user_id == user_id,
        LearningEvent.source == source,
        LearningEvent.item_id == (item_id or None),
        LearningEvent.created == created,
    )
    return db.execute(stmt).scalar_one_or_none() is not None


def backfill_practice(db) -> int:
    n = 0
    for row in db.scalars(select(PracticeAttempt)).all():
        source = "backfill_practice"
        if _exists(db, row.user_id, source, row.problem, row.created):
            continue
        db.add(
            LearningEvent(
                user_id=row.user_id,
                class_id=infer_class_id(item_id=row.problem),
                source=source,
                item_id=row.problem,
                is_correct=row.is_correct,
                answer=row.answer,
                difficulty=row.difficulty,
                active_time_seconds=row.active_time_seconds,
                total_time_seconds=row.total_time_seconds,
                time_maxed_out=row.time_maxed_out,
                idle_detected=row.idle_detected,
                time_to_first_selection=row.time_to_first_selection,
                answer_changes=row.answer_changes,
                time_since_reading=row.time_since_reading,
                time_since_last_attempt=row.time_since_last_attempt,
                has_read_topic_before=row.has_read_topic_before,
                last_topic_read_time=row.last_topic_read_time,
                last_attempt_time=row.last_attempt_time,
                created=row.created,
                updated=row.updated,
            )
        )
        n += 1
    return n


def backfill_software(db) -> int:
    n = 0
    for row in db.scalars(select(SoftwareLessonMetric)).all():
        source = "backfill_software"
        if not row.user_id:
            continue
        if _exists(db, row.user_id, source, row.lesson_id, row.created):
            continue
        db.add(
            LearningEvent(
                user_id=row.user_id,
                class_id=infer_class_id(module_id=row.module, hint="statistics"),
                source=source,
                item_id=row.lesson_id,
                lesson_id=row.lesson_id,
                module_id=row.module,
                extra={
                    "event_type": row.event_type,
                    "lesson_title": row.lesson_title,
                    "software": row.software,
                    "event_payload": row.event_payload,
                },
                created=row.created,
                updated=row.updated,
            )
        )
        n += 1
    return n


def backfill_readings(db) -> int:
    n = 0
    for row in db.scalars(select(TopicReading)).all():
        source = "backfill_reading"
        if _exists(db, row.user_id, source, row.topic_id, row.created):
            continue
        db.add(
            LearningEvent(
                user_id=row.user_id,
                class_id=infer_class_id(module_id=row.module_id),
                source=source,
                item_id=row.topic_id,
                module_id=row.module_id,
                active_time_seconds=row.active_time_seconds,
                total_time_seconds=row.total_time_seconds,
                time_maxed_out=row.time_maxed_out,
                idle_detected=row.idle_detected,
                last_reading_max_scroll_depth=row.max_scroll_depth,
                last_reading_triggered_by_error=row.triggered_by_error,
                extra={
                    "max_scroll_depth": row.max_scroll_depth,
                    "triggered_by_error": row.triggered_by_error,
                },
                created=row.created,
                updated=row.updated,
            )
        )
        n += 1
    return n


def main() -> None:
    db = SessionLocal()
    try:
        n_practice = backfill_practice(db)
        n_software = backfill_software(db)
        n_reading = backfill_readings(db)
        db.commit()
        print(
            f"backfill complete: practice={n_practice} software={n_software} readings={n_reading}"
        )
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()
