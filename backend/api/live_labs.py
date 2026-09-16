import secrets
from datetime import datetime
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.orm import Session

from db.auth import get_current_user
from db.database import get_db
from db.models import LiveLabParticipant, LiveLabSession, User, _new_id

router = APIRouter(prefix="/api/live-labs", tags=["live-labs"])

CODE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
CODE_LEN = 6

LAB_DEFAULTS: dict[str, dict[str, Any]] = {
    "central-tendency": {"shape": "right-skew", "include_outliers": True},
    "coin": {"n_flips": 10, "p": 0.5},
    "marbles": {
        "urn": {"red": 40, "blue": 30, "green": 30},
        "n": 5,
        "with_replacement": False,
    },
    "clt": {"population": "skew", "n": 5, "samples_per_contrib": 1},
}


class CreateLiveLabBody(BaseModel):
    lab_type: str
    class_id: str


class JoinLiveLabBody(BaseModel):
    display_name: str


def _generate_unique_code(db: Session) -> str:
    for _ in range(50):
        code = "".join(secrets.choice(CODE_CHARSET) for _ in range(CODE_LEN))
        existing = (
            db.query(LiveLabSession)
            .filter(LiveLabSession.code == code, LiveLabSession.status == "open")
            .first()
        )
        if not existing:
            return code
    raise HTTPException(status_code=500, detail="Could not allocate a unique lab code.")


def _require_host(user: User) -> None:
    if user.role not in ("instructor", "admin"):
        raise HTTPException(status_code=403, detail="Only instructors or admins can host live labs.")


def _session_payload(session: LiveLabSession) -> dict[str, Any]:
    return {
        "id": session.id,
        "code": session.code,
        "lab_type": session.lab_type,
        "class_id": session.class_id,
        "status": session.status,
        "phase": session.phase,
        "applied_settings": session.applied_settings,
        "vote_locked": session.vote_locked,
        "contribute_locked": session.contribute_locked,
        "current_round_id": session.current_round_id,
    }


def _get_open_session(db: Session, code: str) -> LiveLabSession:
    session = (
        db.query(LiveLabSession)
        .filter(LiveLabSession.code == code.upper())
        .first()
    )
    if not session:
        raise HTTPException(status_code=404, detail="Live lab not found.")
    if session.status != "open":
        raise HTTPException(status_code=400, detail="Live lab is not open.")
    return session


def _state_snapshot(db: Session, session: LiveLabSession) -> dict[str, Any]:
    participants = (
        db.query(LiveLabParticipant)
        .filter(LiveLabParticipant.session_id == session.id)
        .all()
    )
    return {
        "code": session.code,
        "lab_type": session.lab_type,
        "status": session.status,
        "phase": session.phase,
        "applied_settings": session.applied_settings,
        "vote_locked": session.vote_locked,
        "contribute_locked": session.contribute_locked,
        "current_round_id": session.current_round_id,
        "participant_count": len(participants),
        "vote_tallies": {},
        "contributions_aggregate": None,
        "participants": [p.display_name for p in participants],
    }


@router.post("")
def create_live_lab(
    body: CreateLiveLabBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    _require_host(user)
    lab_type = (body.lab_type or "").strip()
    if lab_type not in LAB_DEFAULTS:
        raise HTTPException(status_code=400, detail=f"Unknown lab_type: {lab_type}")

    class_id = (body.class_id or "").strip()
    if not class_id:
        raise HTTPException(status_code=400, detail="class_id is required.")

    now = datetime.utcnow()
    session = LiveLabSession(
        code=_generate_unique_code(db),
        lab_type=lab_type,
        host_user_id=user.id,
        class_id=class_id,
        status="open",
        phase="lobby",
        applied_settings=dict(LAB_DEFAULTS[lab_type]),
        vote_locked=False,
        contribute_locked=True,
        current_round_id=_new_id(),
        last_activity_at=now,
    )
    db.add(session)
    db.commit()
    db.refresh(session)
    return {"code": session.code, "session": _session_payload(session)}


@router.post("/{code}/join")
def join_live_lab(
    code: str,
    body: JoinLiveLabBody,
    db: Session = Depends(get_db),
):
    display_name = (body.display_name or "").strip()
    if not display_name or len(display_name) > 40:
        raise HTTPException(
            status_code=400,
            detail="display_name must be 1–40 characters after trimming.",
        )

    session = _get_open_session(db, code)
    now = datetime.utcnow()
    participant = LiveLabParticipant(
        session_id=session.id,
        display_name=display_name,
        guest_token=secrets.token_urlsafe(24),
        last_seen=now,
    )
    session.last_activity_at = now
    db.add(participant)
    db.commit()
    db.refresh(participant)
    db.refresh(session)
    return {
        "participant_id": participant.id,
        "guest_token": participant.guest_token,
        "session": _session_payload(session),
    }


@router.get("/{code}/state")
def get_live_lab_state(
    code: str,
    guest_token: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    session = (
        db.query(LiveLabSession)
        .filter(LiveLabSession.code == code.upper())
        .first()
    )
    if not session:
        raise HTTPException(status_code=404, detail="Live lab not found.")

    if guest_token:
        participant = (
            db.query(LiveLabParticipant)
            .filter(
                LiveLabParticipant.session_id == session.id,
                LiveLabParticipant.guest_token == guest_token,
            )
            .first()
        )
        if participant:
            participant.last_seen = datetime.utcnow()
            session.last_activity_at = datetime.utcnow()
            db.commit()

    return _state_snapshot(db, session)
