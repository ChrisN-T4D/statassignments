from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from pydantic import BaseModel
from sqlalchemy.orm import Session, joinedload

from db.auth import (
    create_access_token,
    get_current_user,
    get_current_user_optional,
    hash_password,
    user_to_record,
    verify_password,
)
from db.database import get_db
from db.filters import apply_sort, parse_filter
from db.models import COLLECTION_MODELS, Class, User
from db.permissions import assert_allowed, can_create, can_delete, can_list, can_update, can_view
from db.serialize import apply_expand, payload_to_columns, to_api_record

router = APIRouter(prefix="/api/collections", tags=["collections"])


class AuthPasswordBody(BaseModel):
    identity: str
    password: str


class RecordBody(BaseModel):
    model_config = {"extra": "allow"}


def _get_model(collection: str):
    model = COLLECTION_MODELS.get(collection)
    if not model:
        raise HTTPException(status_code=404, detail=f"Collection not found: {collection}")
    return model


def _expand_list(expand: Optional[str]) -> list[str]:
    if not expand:
        return []
    return [f.strip() for f in expand.split(",") if f.strip()]


@router.post("/users/auth-with-password")
def auth_with_password(body: AuthPasswordBody, db: Session = Depends(get_db)):
    user = (
        db.query(User)
        .options(joinedload(User.classes))
        .filter(User.email == body.identity)
        .first()
    )
    if not user or not verify_password(body.password, user.password_hash):
        raise HTTPException(status_code=400, detail="Invalid login credentials")
    token = create_access_token(user.id, user.email, user.role)
    return {"token": token, "record": user_to_record(user)}


@router.post("/users/auth-refresh")
def auth_refresh(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user:
        raise HTTPException(status_code=401, detail="Authentication required")
    db.refresh(user)
    token = create_access_token(user.id, user.email, user.role)
    return {"token": token, "record": user_to_record(user)}


@router.post("/users/request-password-reset")
def request_password_reset(body: dict):
    # Stub — email delivery not configured
    return {"success": True}


@router.get("/{collection}/records")
def list_records(
    collection: str,
    page: int = Query(1, ge=1),
    perPage: int = Query(500, ge=1, le=2000),
    filter: Optional[str] = None,
    sort: Optional[str] = None,
    expand: Optional[str] = None,
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    model = _get_model(collection)
    assert_allowed(can_list(collection, user))

    query = db.query(model)
    if collection == "users":
        query = query.options(joinedload(User.classes))
    try:
        clause = parse_filter(model, collection, filter)
        if clause is not None:
            query = query.filter(clause)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

    query = apply_sort(query, model, sort, collection)
    total = query.count()
    offset = (page - 1) * perPage
    rows = query.offset(offset).limit(perPage).all()

    expand_fields = _expand_list(expand)
    items = []
    for row in rows:
        if not can_view(collection, user, row, db):
            continue
        record = to_api_record(row, collection)
        record = apply_expand(db, collection, record, expand_fields)
        items.append(record)

    return {
        "page": page,
        "perPage": perPage,
        "totalItems": total,
        "totalPages": max(1, (total + perPage - 1) // perPage),
        "items": items,
    }


@router.get("/{collection}/records/{record_id}")
def get_record(
    collection: str,
    record_id: str,
    expand: Optional[str] = None,
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    model = _get_model(collection)
    if collection == "users":
        row = (
            db.query(User)
            .options(joinedload(User.classes))
            .filter(User.id == record_id)
            .first()
        )
    else:
        row = db.get(model, record_id)
    if not row:
        raise HTTPException(status_code=404, detail="Record not found")
    assert_allowed(can_view(collection, user, row, db))
    record = to_api_record(row, collection)
    record = apply_expand(db, collection, record, _expand_list(expand))
    return record


@router.post("/{collection}/records")
def create_record(
    collection: str,
    body: RecordBody,
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    model = _get_model(collection)
    payload = body.model_dump(exclude_unset=True)

    if collection == "users":
        email = payload.get("email")
        password = payload.get("password")
        if not email or not password:
            raise HTTPException(status_code=400, detail="email and password required")
        if db.query(User).filter(User.email == email).first():
            raise HTTPException(status_code=400, detail="Email already in use")
        is_admin_create = user and user.role == "admin"
        if not is_admin_create and user:
            raise HTTPException(status_code=403, detail="Only admins can create users while logged in")
        new_user = User(
            email=email,
            password_hash=hash_password(password),
            name=payload.get("name"),
            role=payload.get("role", "student"),
            verified=True,
        )
        class_ids = payload.get("classes") or []
        if class_ids:
            new_user.classes = db.query(Class).filter(Class.id.in_(class_ids)).all()
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return to_api_record(new_user, "users")

    assert_allowed(can_create(collection, user, payload))

    columns = payload_to_columns(collection, payload)
    class_ids = columns.pop("_class_ids", None)
    if "password" in columns:
        columns["password_hash"] = hash_password(columns.pop("password"))

    row = model()
    for key, value in columns.items():
        if hasattr(row, key):
            setattr(row, key, value)

    if collection == "attempts" and user and not columns.get("profile_id"):
        pass  # caller supplies profile

    db.add(row)
    db.commit()
    db.refresh(row)
    return to_api_record(row, collection)


@router.patch("/{collection}/records/{record_id}")
def update_record(
    collection: str,
    record_id: str,
    body: RecordBody,
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    model = _get_model(collection)
    row = db.get(model, record_id)
    if not row:
        raise HTTPException(status_code=404, detail="Record not found")
    assert_allowed(can_update(collection, user, row))

    payload = body.model_dump(exclude_unset=True)
    columns = payload_to_columns(collection, payload)
    class_ids = columns.pop("_class_ids", None)

    if collection == "users" and "password" in columns:
        columns["password_hash"] = hash_password(columns.pop("password"))

    for key, value in columns.items():
        if hasattr(row, key):
            setattr(row, key, value)

    if collection == "users" and class_ids is not None:
        row.classes = db.query(Class).filter(Class.id.in_(class_ids)).all()

    db.commit()
    db.refresh(row)
    return to_api_record(row, collection)


@router.delete("/{collection}/records/{record_id}")
def delete_record(
    collection: str,
    record_id: str,
    user: Optional[User] = Depends(get_current_user_optional),
    db: Session = Depends(get_db),
):
    model = _get_model(collection)
    row = db.get(model, record_id)
    if not row:
        raise HTTPException(status_code=404, detail="Record not found")
    assert_allowed(can_delete(collection, user, row))
    db.delete(row)
    db.commit()
    return {"success": True}
