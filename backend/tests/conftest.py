from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.ext.compiler import compiles


@compiles(JSONB, "sqlite")
def _compile_jsonb_sqlite(type_, compiler, **kw):
    return "JSON"


import asyncio

import httpx
import pytest
from fastapi import FastAPI
from httpx import ASGITransport
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from db.auth import create_access_token, hash_password
from db.database import Base, get_db
from db.models import Class, Roster, Semester, User
from api.collections import router as collections_router
from api.auth_register import router as auth_register_router


class SyncASGIClient:
    def __init__(self, app):
        self._loop = asyncio.new_event_loop()
        self._client = httpx.AsyncClient(
            transport=ASGITransport(app=app),
            base_url="http://testserver",
        )

    def post(self, url, **kwargs):
        return self._loop.run_until_complete(self._client.post(url, **kwargs))

    def get(self, url, **kwargs):
        return self._loop.run_until_complete(self._client.get(url, **kwargs))

    def close(self):
        self._loop.run_until_complete(self._client.aclose())
        self._loop.close()



@pytest.fixture
def db_session():
    engine = create_engine(
        "sqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    Session = sessionmaker(bind=engine, autocommit=False, autoflush=False)
    session = Session()

    session.add(
        Class(
            id="research-methods",
            name="Research Methods",
            short_name="RM",
            slug="research-methods",
            is_active=True,
            order=1,
        )
    )
    session.add(
        Semester(
            id="sem1",
            code="2026FA",
            name="Fall 2026",
            is_active=True,
        )
    )
    session.add(
        Roster(
            id="roster1",
            semester_id="sem1",
            class_id="research-methods",
            student_key="2026FA-TEST01",
            bb_username="jane.doe@nwosu.edu",
            user_id=None,
            claimed_at=None,
        )
    )
    session.commit()
    try:
        yield session
    finally:
        session.close()
        engine.dispose()


@pytest.fixture
def client(db_session):
    def _get_db():
        try:
            yield db_session
        finally:
            pass

    app = FastAPI()
    app.include_router(collections_router)
    app.include_router(auth_register_router)
    app.dependency_overrides[get_db] = _get_db
    test_client = SyncASGIClient(app)
    try:
        yield test_client
    finally:
        test_client.close()


@pytest.fixture
def admin_headers(db_session):
    admin = User(
        email="admin@example.com",
        password_hash=hash_password("adminpass1"),
        name="Admin",
        role="admin",
        verified=True,
    )
    db_session.add(admin)
    db_session.commit()
    db_session.refresh(admin)
    token = create_access_token(admin.id, admin.email, admin.role)
    return {"Authorization": f"Bearer {token}"}
