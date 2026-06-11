import os
from datetime import datetime, timedelta
from typing import Optional

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from db.database import get_db
from db.models import User

SECRET_KEY = os.environ.get("JWT_SECRET", "dev-change-me-in-production")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_DAYS = int(os.environ.get("JWT_EXPIRE_DAYS", "7"))

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer(auto_error=False)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)


def create_access_token(user_id: str, email: str, role: str) -> str:
    expire = datetime.utcnow() + timedelta(days=ACCESS_TOKEN_EXPIRE_DAYS)
    payload = {
        "id": user_id,
        "email": email,
        "role": role,
        "exp": expire,
        "type": "auth",
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def decode_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError as exc:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc


def user_to_record(user: User, include_classes: bool = True) -> dict:
    record = {
        "id": str(user.id),
        "email": user.email,
        "name": user.name or "",
        "role": user.role,
        "verified": user.verified,
        "created": user.created.isoformat() + "Z",
        "updated": user.updated.isoformat() + "Z",
        "collectionId": "_pb_users_auth_",
        "collectionName": "users",
    }
    if include_classes:
        record["classes"] = [str(c.id) for c in user.classes]
    return record


def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(security),
    db: Session = Depends(get_db),
) -> Optional[User]:
    if not credentials:
        return None
    payload = decode_token(credentials.credentials)
    user_id = payload.get("id")
    if not user_id:
        return None
    return db.get(User, user_id)


def get_current_user(user: Optional[User] = Depends(get_optional_user)) -> User:
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Authentication required")
    return user


def get_current_user_optional(user: Optional[User] = Depends(get_optional_user)) -> Optional[User]:
    return user
