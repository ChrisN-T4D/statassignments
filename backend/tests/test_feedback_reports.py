import pytest

from db.auth import create_access_token, hash_password
from db.models import User


@pytest.fixture
def student_user(db_session):
    user = User(
        email="student@example.com",
        password_hash=hash_password("studentpass1"),
        name="Student",
        role="student",
        verified=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture
def instructor_user(db_session):
    user = User(
        email="instructor@example.com",
        password_hash=hash_password("instructorpass1"),
        name="Instructor",
        role="instructor",
        verified=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture
def student_headers(student_user):
    token = create_access_token(student_user.id, student_user.email, student_user.role)
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def instructor_headers(instructor_user):
    token = create_access_token(instructor_user.id, instructor_user.email, instructor_user.role)
    return {"Authorization": f"Bearer {token}"}


def test_student_can_create_feedback(client, student_user, student_headers):
    response = client.post(
        "/api/collections/feedback_reports/records",
        headers=student_headers,
        json={
            "user": student_user.id,
            "category": "bug",
            "subject": "Stuck on question",
            "message": "Cannot click next after wrong answer",
            "status": "open",
        },
    )
    assert response.status_code == 200
    data = response.json()
    assert data["category"] == "bug"
    assert data["user"] == student_user.id


def test_instructor_cannot_list_feedback(client, instructor_headers):
    response = client.get(
        "/api/collections/feedback_reports/records",
        headers=instructor_headers,
    )
    assert response.status_code == 403


def test_student_cannot_update_feedback(client, student_user, student_headers):
    create = client.post(
        "/api/collections/feedback_reports/records",
        headers=student_headers,
        json={
            "user": student_user.id,
            "category": "feedback",
            "subject": "Suggestion",
            "message": "Add dark mode",
            "status": "open",
        },
    )
    report_id = create.json()["id"]

    response = client.patch(
        f"/api/collections/feedback_reports/records/{report_id}",
        headers=student_headers,
        json={"status": "resolved"},
    )
    assert response.status_code == 403


def test_admin_can_resolve_feedback(client, admin_headers, student_user, student_headers):
    create = client.post(
        "/api/collections/feedback_reports/records",
        headers=student_headers,
        json={
            "user": student_user.id,
            "category": "content",
            "subject": "Typo in module 2",
            "message": "Answer key looks wrong",
            "status": "open",
        },
    )
    report_id = create.json()["id"]

    response = client.patch(
        f"/api/collections/feedback_reports/records/{report_id}",
        headers=admin_headers,
        json={"status": "resolved", "admin_notes": "Fixed in content update"},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "resolved"
    assert response.json()["admin_notes"] == "Fixed in content update"
