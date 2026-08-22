from datetime import datetime

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import func
from sqlalchemy.orm import Session, joinedload

from db.auth import create_access_token, hash_password, user_to_record
from db.database import get_db
from db.models import Class, Roster, User

router = APIRouter(prefix="/api/auth", tags=["auth"])


def normalize_roster_email(email: str) -> str:
    return str(email or "").strip().lower()


class RegisterWithKeyBody(BaseModel):
    student_key: str
    email: str
    password: str
    name: str = ""


@router.post("/register-with-key")
def register_with_key(body: RegisterWithKeyBody, db: Session = Depends(get_db)):
    email = normalize_roster_email(body.email)
    student_key = (body.student_key or "").strip()
    password = body.password or ""
    name = (body.name or "").strip()

    if len(password) < 8:
        raise HTTPException(
            status_code=400, detail="Password must be at least 8 characters."
        )

    roster = db.query(Roster).filter(Roster.student_key == student_key).first()
    if not roster:
        raise HTTPException(
            status_code=400,
            detail="Student key not found. Check your key and try again.",
        )

    if roster.user_id:
        raise HTTPException(
            status_code=400,
            detail=(
                "This student key has already been claimed. "
                "If this is your key, contact your instructor."
            ),
        )

    roster_email = normalize_roster_email(roster.bb_username)
    if not roster_email or roster_email != email:
        raise HTTPException(
            status_code=400,
            detail="This email does not match the roster. Use your school .edu email.",
        )

    existing = (
        db.query(User)
        .filter(func.lower(User.email) == email)
        .first()
    )
    if existing:
        raise HTTPException(
            status_code=400,
            detail="An account with this email already exists. Sign in instead.",
        )

    new_user = User(
        email=email,
        password_hash=hash_password(password),
        name=name or None,
        role="student",
        verified=True,
    )
    db.add(new_user)
    db.flush()

    roster.user_id = new_user.id
    roster.claimed_at = datetime.utcnow()

    if roster.class_id:
        class_row = db.get(Class, roster.class_id)
        if class_row and class_row not in new_user.classes:
            new_user.classes.append(class_row)

    db.commit()
    user = (
        db.query(User)
        .options(joinedload(User.classes))
        .filter(User.id == new_user.id)
        .first()
    )
    token = create_access_token(user.id, user.email, user.role)
    return {"token": token, "record": user_to_record(user)}
