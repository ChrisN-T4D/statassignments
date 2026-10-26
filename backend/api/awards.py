"""Badges earned for mastery. Students cannot create awards directly; they ask the server to claim one and the
server checks the evidence in the attempt log and the BKT state."""

from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from db.auth import get_current_user
from db.database import get_db
from db.models import Award, BktState, LearningEvent, PracticeAttempt, User
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


def _flags_of(source: str | None) -> list[str]:
    if not source or "|" not in source:
        return []
    return [f for f in source.split("|", 1)[1].split(",") if f]


def _event_context(db: Session, user: User) -> tuple[dict[str, float], dict[str, list[tuple[bool, bool]]]]:
    """BKT mastery per objective, and each objective's recent answers (newest first) as (correct, has_warning_flags)."""
    pl = {row.objective_id: row.pL for row in db.query(BktState).filter(BktState.user_id == user.id).all()}
    rows = (
        db.query(LearningEvent.objective_ids, LearningEvent.is_correct, LearningEvent.source)
        .filter(LearningEvent.user_id == user.id)
        .order_by(LearningEvent.created.desc())
        .limit(4000)
        .all()
    )
    recent: dict[str, list[tuple[bool, bool]]] = {}
    for objective_ids, is_correct, source in rows:
        if is_correct is None:
            continue
        ids = objective_ids if isinstance(objective_ids, list) else ([objective_ids] if objective_ids else [])
        for oid in ids:
            bucket = recent.setdefault(oid, [])
            if len(bucket) < 30:
                bucket.append((bool(is_correct), bool(_flags_of(source))))
    return pl, recent


def _objective_earned(pl: dict, recent: dict, objective_id: str, items: int) -> bool:
    """BKT at the mastery line AND a clean streak. Answers with warning flags (too fast, left the page, retries) are
    neutral: they neither extend nor break the streak. A wrong answer breaks it. Target is the streak length, or every
    item when the objective has fewer than that."""
    if pl.get(objective_id, 0) < cat.MASTERY_PL:
        return False
    target = min(cat.STREAK_NEEDED, items) if items > 0 else cat.DEFAULT_ITEMS
    streak = 0
    for correct, flagged in recent.get(objective_id, []):
        if not correct:
            break
        if flagged:
            continue
        streak += 1
        if streak >= target:
            return True
    return False


def _module_state(db: Session, user: User, spec: dict, existing: dict[str, Award]) -> str | None:
    states = [existing[t].state for t in spec["requires"] if t in existing]
    allowed = cat.CHECKED_STATES if spec["min_state"] == "checked" else cat.EARNED_STATES
    if sum(1 for s in states if s in allowed) < spec["min_count"]:
        return None
    if spec["flavor"] == "math":
        return "confirmed" if all(s == "confirmed" for s in states) else "unverified"
    return "earned"


def _verified_state(db: Session, user: User, award_id: str, spec: dict) -> str | None:
    existing = {a.award_id: a for a in db.query(Award).filter(Award.user_id == user.id).all()}
    if spec["kind"] == "module":
        return _module_state(db, user, spec, existing)
    if spec["flavor"] == "objectives":
        pl, recent = _event_context(db, user)
        return "earned" if _objective_earned(pl, recent, spec["objective_id"], spec["items"]) else None
    if not _practice_ok(db, user, spec["objective_id"], spec["problem_prefix"]):
        return None
    return _check_state(db, user, spec["problem_prefix"]) or "practice"


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


def _upsert(db: Session, user: User, award_id: str, spec: dict, state: str, existing: dict[str, Award]) -> tuple[Award, str | None]:
    """Create the award or move it up a state; never down. Returns the row and "created", "upgraded" or None."""
    row = existing.get(award_id)
    if row is None:
        row = Award(
            user_id=user.id,
            award_id=award_id,
            kind=spec["kind"],
            module_id=spec["module_id"],
            objective_id=spec.get("objective_id"),
            state=state,
            earned_at=datetime.utcnow(),
        )
        db.add(row)
        existing[award_id] = row
        return row, "created"
    if cat.STATE_RANK[state] > cat.STATE_RANK[row.state]:
        row.state = state
        return row, "upgraded"
    return row, None


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
    existing = {a.award_id: a for a in db.query(Award).filter(Award.user_id == user.id).all()}
    row, what = _upsert(db, user, body.award_id, spec, state, existing)
    db.commit()
    db.refresh(row)
    return {"award": award_to_dict(row), "created": what == "created", "upgraded": what == "upgraded"}


@router.post("/sync")
def sync_awards(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Check every objective badge (Statistics Modules 1-8) against the student's answer log and record what is
    earned. Cheap enough to call after answering questions and when the profile opens. Math Refresher badges are
    claimed from Math Practice."""
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    existing = {a.award_id: a for a in db.query(Award).filter(Award.user_id == user.id).all()}
    pl, recent = _event_context(db, user)
    new: list[Award] = []
    upgraded: list[Award] = []
    for mod in cat.CATALOG["modules"]:
        if mod["kind"] != "objectives":
            continue
        for t in mod["topics"]:
            if _objective_earned(pl, recent, t["objective_id"], t.get("items", 0)):
                row, what = _upsert(db, user, t["award_id"], cat.AWARDS[t["award_id"]], "earned", existing)
                if what == "created":
                    new.append(row)
                elif what == "upgraded":
                    upgraded.append(row)
        badge_id = mod["module_badge"]["award_id"]
        spec = cat.AWARDS[badge_id]
        state = _module_state(db, user, spec, existing)
        if state:
            row, what = _upsert(db, user, badge_id, spec, state, existing)
            if what == "created":
                new.append(row)
            elif what == "upgraded":
                upgraded.append(row)
    db.commit()
    for row in new + upgraded:
        db.refresh(row)
    return {
        "new": [award_to_dict(a) for a in new],
        "upgraded": [award_to_dict(a) for a in upgraded],
        "items": [award_to_dict(a) for a in sorted(existing.values(), key=lambda a: a.earned_at)],
    }


@router.get("/mine")
def my_awards(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    rows = db.query(Award).filter(Award.user_id == user.id).order_by(Award.earned_at).all()
    return {"items": [award_to_dict(a) for a in rows]}
