"""Append-only learning_events inserts. Never update or delete from app code."""

from __future__ import annotations

from typing import Any

from sqlalchemy.orm import Session

from db.models import LearningEvent


def insert_learning_event(db: Session, **fields: Any) -> LearningEvent | None:
    row = LearningEvent(**fields)
    db.add(row)
    db.commit()
    db.refresh(row)
    return row
