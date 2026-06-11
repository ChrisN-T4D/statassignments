from fastapi import HTTPException, status
from sqlalchemy.orm import Session

from db.models import User, Roster, COLLECTION_MODELS


def _is_admin(user: User | None) -> bool:
    return user is not None and user.role == "admin"


def _is_instructor(user: User | None) -> bool:
    return user is not None and user.role in ("instructor", "admin")


def can_list(collection: str, user: User | None) -> bool:
    public_read = {
        "classes",
        "semesters",
        "modules",
        "items",
        "practice_problems",
    }
    if collection in public_read:
        return True
    if collection == "users":
        return _is_admin(user)
    return user is not None


def can_view(collection: str, user: User | None, record, db: Session) -> bool:
    if not can_list(collection, user):
        return False
    if _is_admin(user):
        return True

    uid = str(user.id) if user else None

    if collection == "roster":
        if _is_instructor(user):
            return True
        return uid and str(getattr(record, "user_id", "")) == uid

    if collection in ("user_progress", "practice_attempts", "topic_readings", "bkt_states"):
        if _is_instructor(user):
            return True
        return uid and str(getattr(record, "user_id", "")) == uid

    if collection == "software_lesson_metrics":
        if _is_instructor(user):
            return True
        rec_user = getattr(record, "user_id", None)
        return rec_user is None or (uid and str(rec_user) == uid)

    if collection == "attempts":
        if _is_instructor(user):
            return True
        if not uid:
            return False
        profile = db.get(Roster, record.profile_id)
        return profile is not None and str(profile.user_id) == uid

    return True


def can_create(collection: str, user: User | None, payload: dict) -> bool:
    if collection == "users":
        return True  # signup or admin create handled in route
    if _is_admin(user):
        return True

    uid = str(user.id) if user else None
    if not uid:
        return collection == "software_lesson_metrics"

    owner_fields = {
        "user_progress": "user",
        "practice_attempts": "user",
        "topic_readings": "user",
        "bkt_states": "user",
        "software_lesson_metrics": "user",
    }
    if collection in owner_fields:
        field = owner_fields[collection]
        val = payload.get(field)
        if collection == "software_lesson_metrics" and not val:
            return True
        return str(val) == uid

    if collection == "attempts":
        return user is not None
    if collection == "roster":
        return _is_instructor(user)
    if collection in ("classes", "semesters", "modules", "items", "practice_problems"):
        return False

    return user is not None


def can_update(collection: str, user: User | None, record) -> bool:
    if _is_admin(user):
        return True

    uid = str(user.id) if user else None

    if collection == "users":
        return uid and str(record.id) == uid

    if collection == "roster":
        if _is_instructor(user):
            return True
        return uid and str(getattr(record, "user_id", "")) == uid

    if collection in ("user_progress", "topic_readings", "bkt_states"):
        return uid and str(getattr(record, "user_id", "")) == uid

    return False


def can_delete(collection: str, user: User | None, record) -> bool:
    if _is_admin(user):
        return True
    if collection in ("bkt_states", "topic_readings", "user_progress"):
        uid = str(user.id) if user else None
        return uid and str(getattr(record, "user_id", "")) == uid
    return False


def assert_allowed(condition: bool, message: str = "Forbidden"):
    if not condition:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=message)
