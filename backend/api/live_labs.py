import copy
import json
import secrets
import time
from collections import Counter, defaultdict
from datetime import datetime, timedelta
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from db.auth import get_current_user
from db.database import get_db
from db.models import (
    LiveLabContribution,
    LiveLabParticipant,
    LiveLabSession,
    LiveLabVote,
    User,
    _new_id,
)
from lib import stats_lab_math

router = APIRouter(prefix="/api/live-labs", tags=["live-labs"])

CODE_CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
CODE_LEN = 6
IDLE_TIMEOUT = timedelta(hours=2)

VALID_PHASES = frozenset({"lobby", "voting", "contributing", "revealing"})

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

# Best-effort in-process vote rate limit: guest_token -> last vote monotonic time
_vote_last_at: dict[str, float] = {}
VOTE_MIN_INTERVAL_S = 0.5


class CreateLiveLabBody(BaseModel):
    lab_type: str
    class_id: str


class JoinLiveLabBody(BaseModel):
    display_name: str


class VoteBody(BaseModel):
    guest_token: str
    setting_key: str
    value: Any


class ContributeBody(BaseModel):
    guest_token: str
    payload: Any


class ApplySettingsBody(BaseModel):
    settings: Optional[dict[str, Any]] = None
    from_tallies: bool = False


class SetPhaseBody(BaseModel):
    phase: str


class SetLocksBody(BaseModel):
    vote_locked: Optional[bool] = None
    contribute_locked: Optional[bool] = None


def _generate_unique_code(db: Session) -> str:
    for _ in range(50):
        code = "".join(secrets.choice(CODE_CHARSET) for _ in range(CODE_LEN))
        existing = (
            db.query(LiveLabSession)
            .filter(LiveLabSession.code == code)
            .first()
        )
        if not existing:
            return code
    raise HTTPException(status_code=500, detail="Could not allocate a unique lab code.")


def _maybe_expire_idle(db: Session, session: LiveLabSession) -> bool:
    """End open sessions idle longer than IDLE_TIMEOUT. Returns True if ended now."""
    if session.status != "open":
        return False
    last = session.last_activity_at
    if last is None:
        return False
    if datetime.utcnow() - last <= IDLE_TIMEOUT:
        return False
    session.status = "ended"
    session.last_activity_at = datetime.utcnow()
    db.commit()
    db.refresh(session)
    return True


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


def _get_session_by_code(db: Session, code: str) -> LiveLabSession:
    session = (
        db.query(LiveLabSession)
        .filter(LiveLabSession.code == code.upper())
        .first()
    )
    if not session:
        raise HTTPException(status_code=404, detail="Live lab not found.")
    return session


def _get_open_session(db: Session, code: str) -> LiveLabSession:
    session = _get_session_by_code(db, code)
    if session.status != "open":
        raise HTTPException(status_code=400, detail="Live lab is not open.")
    return session


def _require_session_host(session: LiveLabSession, user: User) -> None:
    _require_host(user)
    if user.role != "admin" and session.host_user_id != user.id:
        raise HTTPException(status_code=403, detail="Only the session host can perform this action.")


def _get_participant(
    db: Session, session: LiveLabSession, guest_token: str
) -> LiveLabParticipant:
    participant = (
        db.query(LiveLabParticipant)
        .filter(
            LiveLabParticipant.session_id == session.id,
            LiveLabParticipant.guest_token == guest_token,
        )
        .first()
    )
    if not participant:
        raise HTTPException(status_code=403, detail="Invalid guest_token for this session.")
    return participant


def _value_key(value: Any) -> str:
    return json.dumps(value, sort_keys=True, default=str)


def _vote_tallies(db: Session, session: LiveLabSession) -> dict[str, list[dict[str, Any]]]:
    votes = (
        db.query(LiveLabVote)
        .filter(LiveLabVote.session_id == session.id)
        .all()
    )
    by_key: dict[str, Counter] = defaultdict(Counter)
    value_lookup: dict[str, dict[str, Any]] = defaultdict(dict)
    for vote in votes:
        vk = _value_key(vote.value)
        by_key[vote.setting_key][vk] += 1
        value_lookup[vote.setting_key][vk] = vote.value
    tallies: dict[str, list[dict[str, Any]]] = {}
    for setting_key, counter in by_key.items():
        tallies[setting_key] = [
            {"value": value_lookup[setting_key][vk], "count": count}
            for vk, count in counter.most_common()
        ]
    return tallies


def _empty_aggregate(lab_type: str) -> dict[str, Any]:
    if lab_type == "central-tendency":
        return {"scores": [], "mean": None, "median": None, "mode": None}
    if lab_type == "coin":
        return {"flips": [], "n": 0, "proportion_heads": 0.0}
    if lab_type == "marbles":
        return {"draws": [], "counts": {}}
    if lab_type == "clt":
        return {"means": [], "histogram": []}
    return {}


def _contributions_aggregate(db: Session, session: LiveLabSession) -> dict[str, Any]:
    rows = (
        db.query(LiveLabContribution)
        .filter(
            LiveLabContribution.session_id == session.id,
            LiveLabContribution.round_id == session.current_round_id,
        )
        .all()
    )
    lab_type = session.lab_type
    if lab_type == "coin":
        flips: list[int] = []
        for row in rows:
            payload = row.payload or {}
            batch = payload.get("flips") if isinstance(payload, dict) else None
            if isinstance(batch, list):
                flips.extend(int(x) for x in batch)
        n = len(flips)
        proportion = (sum(flips) / n) if n else 0.0
        return {"flips": flips, "n": n, "proportion_heads": proportion}

    if lab_type == "central-tendency":
        scores: list[float] = []
        for row in rows:
            payload = row.payload or {}
            if isinstance(payload, dict) and "score" in payload:
                scores.append(float(payload["score"]))
        return {
            "scores": scores,
            "mean": stats_lab_math.mean(scores),
            "median": stats_lab_math.median(scores),
            "mode": stats_lab_math.mode(scores),
        }

    if lab_type == "marbles":
        draws: list[list[str]] = []
        counts: Counter = Counter()
        for row in rows:
            payload = row.payload or {}
            colors = payload.get("colors") if isinstance(payload, dict) else None
            if isinstance(colors, list):
                color_list = [str(c) for c in colors]
                draws.append(color_list)
                counts.update(color_list)
        return {"draws": draws, "counts": dict(counts)}

    if lab_type == "clt":
        means: list[float] = []
        for row in rows:
            payload = row.payload or {}
            batch = payload.get("means") if isinstance(payload, dict) else None
            if isinstance(batch, list):
                means.extend(float(x) for x in batch)
        return {"means": means, "histogram": stats_lab_math.histogram(means)}

    return _empty_aggregate(lab_type) if not rows else {}


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
        "vote_tallies": _vote_tallies(db, session),
        "contributions_aggregate": _contributions_aggregate(db, session),
        "participants": [p.display_name for p in participants],
    }


def _settings_from_tallies(tallies: dict[str, list[dict[str, Any]]], base: dict[str, Any]) -> dict[str, Any]:
    applied = copy.deepcopy(base) if isinstance(base, dict) else {}
    for setting_key, options in tallies.items():
        if not options:
            continue
        top_count = options[0]["count"]
        winners = [o for o in options if o["count"] == top_count]
        if len(winners) > 1:
            raise HTTPException(
                status_code=400,
                detail=f"Tie for setting_key '{setting_key}'; host must pick via apply-settings.",
            )
        applied[setting_key] = copy.deepcopy(winners[0]["value"])
    return applied


def _validate_contribute_payload(session: LiveLabSession, payload: Any) -> None:
    """Reject empty/malformed payloads and enforce per-lab size caps."""
    if not isinstance(payload, dict):
        raise HTTPException(status_code=400, detail="payload must be an object.")

    lab_type = session.lab_type
    settings = session.applied_settings if isinstance(session.applied_settings, dict) else {}

    if lab_type == "coin":
        flips = payload.get("flips")
        if not isinstance(flips, list) or len(flips) < 1:
            raise HTTPException(
                status_code=400,
                detail="payload.flips must be a non-empty list.",
            )
        if len(flips) > 20:
            raise HTTPException(
                status_code=400,
                detail="payload.flips length must be ≤ 20.",
            )
        for x in flips:
            try:
                v = int(x)
            except (TypeError, ValueError):
                raise HTTPException(
                    status_code=400,
                    detail="payload.flips entries must be 0 or 1.",
                ) from None
            if v not in (0, 1):
                raise HTTPException(
                    status_code=400,
                    detail="payload.flips entries must be 0 or 1.",
                )
        return

    if lab_type == "marbles":
        colors = payload.get("colors")
        if not isinstance(colors, list) or len(colors) < 1:
            raise HTTPException(
                status_code=400,
                detail="payload.colors must be a non-empty list (one draw).",
            )
        max_n = int(settings.get("n") or 10)
        if len(colors) > max(max_n, 20):
            raise HTTPException(
                status_code=400,
                detail=f"payload.colors length must be ≤ {max(max_n, 20)}.",
            )
        for c in colors:
            if not isinstance(c, str) or not c.strip():
                raise HTTPException(
                    status_code=400,
                    detail="payload.colors entries must be non-empty strings.",
                )
        return

    if lab_type == "central-tendency":
        if "score" not in payload:
            raise HTTPException(
                status_code=400,
                detail="payload.score is required.",
            )
        try:
            float(payload["score"])
        except (TypeError, ValueError):
            raise HTTPException(
                status_code=400,
                detail="payload.score must be a number.",
            ) from None
        return

    if lab_type == "clt":
        means = payload.get("means")
        max_means = int(settings.get("samples_per_contrib") or 1)
        if max_means < 1:
            max_means = 1
        if not isinstance(means, list) or len(means) < 1:
            raise HTTPException(
                status_code=400,
                detail="payload.means must be a non-empty list.",
            )
        if len(means) > max_means:
            raise HTTPException(
                status_code=400,
                detail=f"payload.means length must be ≤ {max_means}.",
            )
        for x in means:
            try:
                float(x)
            except (TypeError, ValueError):
                raise HTTPException(
                    status_code=400,
                    detail="payload.means entries must be numbers.",
                ) from None
        return

    raise HTTPException(status_code=400, detail=f"Unknown lab_type: {lab_type}")


def _check_contribute_rate_limit(
    db: Session,
    session: LiveLabSession,
    participant: LiveLabParticipant,
    payload: Any,
) -> None:
    existing = (
        db.query(LiveLabContribution)
        .filter(
            LiveLabContribution.session_id == session.id,
            LiveLabContribution.participant_id == participant.id,
            LiveLabContribution.round_id == session.current_round_id,
        )
        .all()
    )
    lab_type = session.lab_type
    settings = session.applied_settings if isinstance(session.applied_settings, dict) else {}

    if lab_type == "coin":
        used = 0
        for row in existing:
            batch = (row.payload or {}).get("flips") if isinstance(row.payload, dict) else None
            if isinstance(batch, list):
                used += len(batch)
        incoming = payload.get("flips") if isinstance(payload, dict) else None
        add = len(incoming) if isinstance(incoming, list) else 0
        if used + add > 20:
            raise HTTPException(
                status_code=429,
                detail=f"Coin flip limit exceeded for this round (max 20 flips; used {used}).",
            )
        return

    if lab_type == "marbles":
        if existing:
            raise HTTPException(
                status_code=429,
                detail="Marbles allow at most 1 draw per participant per round.",
            )
        return

    if lab_type == "central-tendency":
        if existing:
            raise HTTPException(
                status_code=429,
                detail="Central tendency allows at most 1 score per participant per round.",
            )
        return

    if lab_type == "clt":
        max_means = int(settings.get("samples_per_contrib") or 1)
        used = 0
        for row in existing:
            batch = (row.payload or {}).get("means") if isinstance(row.payload, dict) else None
            if isinstance(batch, list):
                used += len(batch)
        incoming = payload.get("means") if isinstance(payload, dict) else None
        add = len(incoming) if isinstance(incoming, list) else 0
        if used + add > max_means:
            raise HTTPException(
                status_code=429,
                detail=(
                    f"CLT means limit exceeded for this round "
                    f"(max {max_means}; used {used})."
                ),
            )


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
    session = None
    last_error: Optional[Exception] = None
    for _ in range(5):
        try:
            session = LiveLabSession(
                code=_generate_unique_code(db),
                lab_type=lab_type,
                host_user_id=user.id,
                class_id=class_id,
                status="open",
                phase="lobby",
                applied_settings=copy.deepcopy(LAB_DEFAULTS[lab_type]),
                vote_locked=False,
                contribute_locked=True,
                current_round_id=_new_id(),
                last_activity_at=now,
            )
            db.add(session)
            db.commit()
            db.refresh(session)
            break
        except IntegrityError as exc:
            db.rollback()
            last_error = exc
            session = None
    if session is None:
        raise HTTPException(
            status_code=500,
            detail="Could not allocate a unique lab code.",
        ) from last_error
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

    session = _get_session_by_code(db, code)
    expired = _maybe_expire_idle(db, session)
    if session.status != "open":
        if expired:
            raise HTTPException(
                status_code=410,
                detail="Live lab session expired due to inactivity.",
            )
        raise HTTPException(status_code=400, detail="Live lab is not open.")
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
    session = _get_session_by_code(db, code)
    _maybe_expire_idle(db, session)

    if guest_token and session.status == "open":
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


@router.post("/{code}/vote")
def vote_live_lab(
    code: str,
    body: VoteBody,
    db: Session = Depends(get_db),
):
    session = _get_open_session(db, code)
    if session.vote_locked:
        raise HTTPException(status_code=400, detail="Voting is locked.")

    guest_token = (body.guest_token or "").strip()
    setting_key = (body.setting_key or "").strip()
    if not guest_token or not setting_key:
        raise HTTPException(status_code=400, detail="guest_token and setting_key are required.")

    now_mono = time.monotonic()
    last = _vote_last_at.get(guest_token)
    if last is not None and (now_mono - last) < VOTE_MIN_INTERVAL_S:
        raise HTTPException(status_code=429, detail="Vote rate limit: wait 0.5s between votes.")
    _vote_last_at[guest_token] = now_mono

    participant = _get_participant(db, session, guest_token)
    existing = (
        db.query(LiveLabVote)
        .filter(
            LiveLabVote.session_id == session.id,
            LiveLabVote.participant_id == participant.id,
            LiveLabVote.setting_key == setting_key,
        )
        .first()
    )
    if existing:
        existing.value = body.value
    else:
        db.add(
            LiveLabVote(
                session_id=session.id,
                participant_id=participant.id,
                setting_key=setting_key,
                value=body.value,
            )
        )
    now = datetime.utcnow()
    participant.last_seen = now
    session.last_activity_at = now
    db.commit()
    return {"ok": True, "state": _state_snapshot(db, session)}


@router.post("/{code}/contribute")
def contribute_live_lab(
    code: str,
    body: ContributeBody,
    db: Session = Depends(get_db),
):
    session = _get_open_session(db, code)
    if session.contribute_locked:
        raise HTTPException(status_code=400, detail="Contributions are locked.")

    guest_token = (body.guest_token or "").strip()
    if not guest_token:
        raise HTTPException(status_code=400, detail="guest_token is required.")

    participant = _get_participant(db, session, guest_token)
    _validate_contribute_payload(session, body.payload)
    _check_contribute_rate_limit(db, session, participant, body.payload)

    now = datetime.utcnow()
    db.add(
        LiveLabContribution(
            session_id=session.id,
            participant_id=participant.id,
            round_id=session.current_round_id,
            payload=body.payload,
        )
    )
    participant.last_seen = now
    session.last_activity_at = now
    db.commit()
    db.refresh(session)
    return {"ok": True, "state": _state_snapshot(db, session)}


@router.post("/{code}/apply-settings")
def apply_settings(
    code: str,
    body: ApplySettingsBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    session = _get_open_session(db, code)
    _require_session_host(session, user)

    if body.from_tallies:
        tallies = _vote_tallies(db, session)
        base = session.applied_settings if isinstance(session.applied_settings, dict) else {}
        session.applied_settings = _settings_from_tallies(tallies, base)
    elif body.settings is not None:
        session.applied_settings = copy.deepcopy(body.settings)
    else:
        raise HTTPException(
            status_code=400,
            detail="Provide settings or from_tallies: true.",
        )

    session.last_activity_at = datetime.utcnow()
    db.commit()
    db.refresh(session)
    return {"ok": True, "session": _session_payload(session), "state": _state_snapshot(db, session)}


@router.post("/{code}/set-phase")
def set_phase(
    code: str,
    body: SetPhaseBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    session = _get_open_session(db, code)
    _require_session_host(session, user)
    phase = (body.phase or "").strip()
    if phase not in VALID_PHASES:
        raise HTTPException(
            status_code=400,
            detail=f"phase must be one of: {', '.join(sorted(VALID_PHASES))}",
        )
    session.phase = phase
    session.last_activity_at = datetime.utcnow()
    db.commit()
    db.refresh(session)
    return {"ok": True, "session": _session_payload(session)}


@router.post("/{code}/set-locks")
def set_locks(
    code: str,
    body: SetLocksBody,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    session = _get_open_session(db, code)
    _require_session_host(session, user)
    if body.vote_locked is None and body.contribute_locked is None:
        raise HTTPException(
            status_code=400,
            detail="Provide vote_locked and/or contribute_locked.",
        )
    if body.vote_locked is not None:
        session.vote_locked = body.vote_locked
    if body.contribute_locked is not None:
        session.contribute_locked = body.contribute_locked
    session.last_activity_at = datetime.utcnow()
    db.commit()
    db.refresh(session)
    return {"ok": True, "session": _session_payload(session)}


@router.post("/{code}/reset")
def reset_live_lab(
    code: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    session = _get_open_session(db, code)
    _require_session_host(session, user)
    db.query(LiveLabVote).filter(LiveLabVote.session_id == session.id).delete()
    session.current_round_id = _new_id()
    session.last_activity_at = datetime.utcnow()
    db.commit()
    db.refresh(session)
    return {"ok": True, "session": _session_payload(session), "state": _state_snapshot(db, session)}


@router.post("/{code}/end")
def end_live_lab(
    code: str,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    session = _get_open_session(db, code)
    _require_session_host(session, user)
    now = datetime.utcnow()
    session.status = "ended"
    session.ended_at = now
    session.last_activity_at = now
    db.commit()
    db.refresh(session)
    return {"ok": True, "session": _session_payload(session)}
