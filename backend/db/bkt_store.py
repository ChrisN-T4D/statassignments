"""Persist and restore BKT mastery state in PostgreSQL."""

from __future__ import annotations

from datetime import datetime
from typing import Any, Protocol

from sqlalchemy import select
from sqlalchemy.orm import Session

from db.models import BktPrototype, BktState


class BKTModelProtocol(Protocol):
    student_states: dict[str, dict[str, dict[str, Any]]]


def _row_to_state(row: BktState) -> dict[str, Any]:
    return {
        "pL": row.pL,
        "pL0": row.pL0,
        "pT": row.pT,
        "pS": row.pS,
        "pG": row.pG,
        "attempts": row.attempts,
        "correct": row.correct,
        "incorrect": row.incorrect,
    }


def persist_bkt_state(
    db: Session,
    user_id: str,
    objective_id: str,
    state: dict[str, Any],
    last_updated: datetime | None = None,
) -> BktState:
    """Upsert one user/objective BKT state row."""
    last_updated = last_updated or datetime.utcnow()
    row = db.execute(
        select(BktState).where(
            BktState.user_id == user_id,
            BktState.objective_id == objective_id,
        )
    ).scalar_one_or_none()

    fields = {
        "user_id": user_id,
        "objective_id": objective_id,
        "pL": float(state["pL"]),
        "pL0": float(state["pL0"]),
        "pT": float(state["pT"]),
        "pS": float(state["pS"]),
        "pG": float(state["pG"]),
        "attempts": int(state["attempts"]),
        "correct": int(state["correct"]),
        "incorrect": int(state["incorrect"]),
        "last_updated": last_updated,
    }

    if row:
        for key, value in fields.items():
            setattr(row, key, value)
    else:
        row = BktState(**fields)
        db.add(row)

    db.commit()
    db.refresh(row)
    return row


def load_bkt_state(db: Session, user_id: str, objective_id: str) -> dict[str, Any] | None:
    row = db.execute(
        select(BktState).where(
            BktState.user_id == user_id,
            BktState.objective_id == objective_id,
        )
    ).scalar_one_or_none()
    return _row_to_state(row) if row else None


def persist_bkt_prototype(
    db: Session,
    user_id: str,
    class_id: str,
    probs: list[float],
    prototype_id: int,
    last_updated: datetime | None = None,
) -> BktPrototype:
    last_updated = last_updated or datetime.utcnow()
    row = db.execute(
        select(BktPrototype).where(
            BktPrototype.user_id == user_id,
            BktPrototype.class_id == class_id,
        )
    ).scalar_one_or_none()
    fields = {
        "user_id": user_id,
        "class_id": class_id,
        "probs": [float(p) for p in probs],
        "prototype_id": int(prototype_id),
        "last_updated": last_updated,
    }
    if row:
        for key, value in fields.items():
            setattr(row, key, value)
    else:
        row = BktPrototype(**fields)
        db.add(row)
    db.commit()
    db.refresh(row)
    return row


def load_bkt_prototype(db: Session, user_id: str, class_id: str) -> dict[str, Any] | None:
    row = db.execute(
        select(BktPrototype).where(
            BktPrototype.user_id == user_id,
            BktPrototype.class_id == class_id,
        )
    ).scalar_one_or_none()
    if not row:
        return None
    return {
        "probs": row.probs,
        "prototype_id": row.prototype_id,
        "class_id": row.class_id,
    }


def hydrate_bkt_model(model: BKTModelProtocol, db: Session) -> int:
    """Load all persisted BKT rows into the in-memory model."""
    rows = db.scalars(select(BktState)).all()
    for row in rows:
        if row.user_id not in model.student_states:
            model.student_states[row.user_id] = {}
        model.student_states[row.user_id][row.objective_id] = _row_to_state(row)

    proto_store = getattr(model, "student_prototype_probs", None)
    if isinstance(proto_store, dict):
        for row in db.scalars(select(BktPrototype)).all():
            key = f"{row.user_id}::{row.class_id}"
            proto_store[key] = row.probs

    return len(rows)
