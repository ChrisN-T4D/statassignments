from datetime import date, datetime
from uuid import UUID

from sqlalchemy.inspection import inspect

from db.models import (
    FIELD_ALIASES,
    REVERSE_ALIASES,
    EXPAND_RELATIONS,
    User,
    COLLECTION_MODELS,
)


def _iso(value):
    if value is None:
        return None
    if isinstance(value, datetime):
        return value.isoformat() + "Z"
    if isinstance(value, date):
        return value.isoformat()
    if isinstance(value, UUID):
        return str(value)
    return value


def to_api_record(instance, collection: str, expand: dict | None = None) -> dict:
    aliases = REVERSE_ALIASES.get(collection, {})
    data: dict = {
        "id": str(instance.id),
        "collectionId": collection,
        "collectionName": collection,
        "created": _iso(instance.created),
        "updated": _iso(instance.updated),
    }

    mapper = inspect(instance.__class__)
    for col in mapper.columns:
        if col.name in ("id", "created", "updated", "password_hash"):
            continue
        api_key = aliases.get(col.name, col.name)
        value = getattr(instance, col.name)
        if value is None and col.name.endswith("_id"):
            data[api_key] = ""
        else:
            data[api_key] = _iso(value)

    if collection == "users":
        data.pop("password_hash", None)
        if hasattr(instance, "classes"):
            data["classes"] = [str(c.id) for c in instance.classes]

    if expand:
        data["expand"] = expand

    return data


def expand_user_classes(user: User, db) -> dict:
    return {str(c.id): to_api_record(c, "classes") for c in user.classes}


def apply_expand(db, collection: str, record: dict, expand_fields: list[str]) -> dict:
    if not expand_fields:
        return record

    relations = EXPAND_RELATIONS.get(collection, {})
    expand_data: dict = {}
    model = COLLECTION_MODELS[collection]
    instance = db.get(model, record["id"])
    if not instance:
        return record

    for field in expand_fields:
        field = field.strip()
        if field not in relations:
            continue
        rel_info = relations[field]
        if field == "classes" and collection == "users":
            expand_data[field] = [to_api_record(c, "classes") for c in instance.classes]
            continue
        fk_col, related_model = rel_info
        fk_val = getattr(instance, fk_col)
        if fk_val is None:
            continue
        related = db.get(related_model, fk_val)
        if related:
            related_collection = related.__tablename__
            expand_data[field] = to_api_record(related, related_collection)

    if expand_data:
        record = {**record, "expand": expand_data}
    return record


def payload_to_columns(collection: str, payload: dict) -> dict:
    aliases = FIELD_ALIASES.get(collection, {})
    result = {}
    for key, value in payload.items():
        if key in ("id", "created", "updated", "collectionId", "collectionName", "expand"):
            continue
        if key == "passwordConfirm":
            continue
        col = aliases.get(key, key)
        if value == "" and col.endswith("_id"):
            result[col] = None
        elif col == "classes" and collection == "users":
            result["_class_ids"] = value
        else:
            result[col] = value
    return result
