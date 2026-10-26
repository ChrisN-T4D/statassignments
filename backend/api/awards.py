"""Badges earned for mastery. Students cannot create awards directly; they ask the server to claim one and the
server checks the evidence in the attempt log and the BKT state."""

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from db.auth import get_current_user
from db.database import get_db
from db.models import Award, BktState, PracticeAttempt, User
from lib import awards_catalog as cat

router = APIRouter(prefix="/api/awards", tags=["awards"])


class ClaimBody(BaseModel):
    award_id: str


def _practice_ok(db: Session, user: User, objective_id: str, prefix: str) -> bool:
    state = (
        db.query(BktState)
        .filter(BktState.user_id == user.id, BktState.objective_id == objective_id)
        .first()
    )
    if not state or state.pL < cat.MASTERY_PL:
        return False
    correct = (
        db.query(PracticeAttempt)
        .filter(
            PracticeAttempt.user_id == user.id,
            PracticeAttempt.source == "math_practice",
            PracticeAttempt.problem.like(f"{prefix}%"),
            PracticeAttempt.is_correct.is_(True),
        )
        .count()
    )
    return correct >= cat.MIN_PRACTICE_CORRECT


def _flagged(source: str | None) -> bool:
    """`math_mastery_check|paste,left-page`: any flag other than a timeout is a warning sign."""
    if not source or "|" not in source:
        return False
    flags = {f for f in source.split("|", 1)[1].split(",") if f}
    return bool(flags - {"timed-out"})


def _check_state(db: Session, user: User, prefix: str) -> str | None:
    rows = (
        db.query(PracticeAttempt)
        .filter(
            PracticeAttempt.user_id == user.id,
            PracticeAttempt.source.like("math_mastery_check%"),
            PracticeAttempt.problem.like(f"{prefix}%"),
        )
        .order_by(PracticeAttempt.created.desc())
        .limit(cat.CHECK_QUESTIONS)
        .all()
    )
    if len(rows) < cat.CHECK_QUESTIONS:
        return None
    if len({r.problem for r in rows}) != cat.CHECK_QUESTIONS:
        return None
    if rows[0].created - rows[-1].created > timedelta(minutes=cat.CHECK_WINDOW_MINUTES):
        return None
    if sum(1 for r in rows if r.is_correct) < cat.CHECK_PASS:
        return None
    flagged = sum(1 for r in rows if _flagged(r.source))
    return "unverified" if flagged >= cat.UNVERIFIED_FLAGGED_ANSWERS else "confirmed"


def _existing(db: Session, user: User, award_id: str) -> Award | None:
    return db.query(Award).filter(Award.user_id == user.id, Award.award_id == award_id).first()


def _verified_state(db: Session, user: User, award_id: str, spec: dict) -> str | None:
    if spec["kind"] == "topic":
        if not _practice_ok(db, user, spec["objective_id"], spec["problem_prefix"]):
            return None
        return _check_state(db, user, spec["problem_prefix"]) or "practice"
    # module badge: every topic must have passed its check
    states = []
    for topic_id in spec["requires"]:
        row = _existing(db, user, topic_id)
        if not row or row.state not in ("confirmed", "unverified"):
            return None
        states.append(row.state)
    return "confirmed" if all(s == "confirmed" for s in states) else "unverified"


def award_to_dict(a: Award) -> dict:
    return {
        "id": a.id,
        "award_id": a.award_id,
        "kind": a.kind,
        "module_id": a.module_id,
        "objective_id": a.objective_id,
        "state": a.state,
        "earned_at": a.earned_at.isoformat() + "Z" if a.earned_at else None,
    }


@router.post("/claim")
def claim_award(body: ClaimBody, user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    spec = cat.AWARDS.get(body.award_id)
    if not spec:
        raise HTTPException(status_code=404, detail="Unknown award")
    state = _verified_state(db, user, body.award_id, spec)
    if not state:
        raise HTTPException(status_code=409, detail="Not earned yet")

    row = _existing(db, user, body.award_id)
    created = upgraded = False
    if row is None:
        row = Award(
            user_id=user.id,
            award_id=body.award_id,
            kind=spec["kind"],
            module_id=spec["module_id"],
            objective_id=spec.get("objective_id"),
            state=state,
            earned_at=datetime.utcnow(),
        )
        db.add(row)
        created = True
    elif cat.STATE_RANK[state] > cat.STATE_RANK[row.state]:
        row.state = state
        upgraded = True
    db.commit()
    db.refresh(row)
    return {"award": award_to_dict(row), "created": created, "upgraded": upgraded}


@router.get("/mine")
def my_awards(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    rows = db.query(Award).filter(Award.user_id == user.id).order_by(Award.earned_at).all()
    return {"items": [award_to_dict(a) for a in rows]}
