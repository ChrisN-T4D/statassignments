from db.auth import hash_password
from db.models import Roster, User

REGISTER_URL = "/api/auth/register-with-key"
VALID_BODY = {
    "student_key": "2026FA-TEST01",
    "email": "Jane.Doe@NWOSU.edu",
    "password": "password1",
    "name": "Jane Doe",
}


def test_register_with_key_happy_path(client, db_session):
    response = client.post(REGISTER_URL, json=VALID_BODY)
    assert response.status_code == 200
    data = response.json()
    assert data.get("token")
    assert data["record"]["email"] == "jane.doe@nwosu.edu"
    assert "research-methods" in data["record"]["classes"]

    roster = db_session.get(Roster, "roster1")
    db_session.refresh(roster)
    assert roster.user_id == data["record"]["id"]
    assert roster.claimed_at is not None


def test_register_rejects_mismatched_email(client, db_session):
    response = client.post(
        REGISTER_URL,
        json={**VALID_BODY, "email": "other@nwosu.edu"},
    )
    assert response.status_code == 400
    assert (
        response.json()["detail"]
        == "This email does not match the roster. Use your school .edu email."
    )
    assert db_session.query(User).filter(User.role == "student").count() == 0
    roster = db_session.get(Roster, "roster1")
    assert roster.user_id is None


def test_register_unknown_key(client):
    response = client.post(
        REGISTER_URL,
        json={**VALID_BODY, "student_key": "2026FA-NOPE00"},
    )
    assert response.status_code == 400
    assert (
        response.json()["detail"]
        == "Student key not found. Check your key and try again."
    )


def test_register_claimed_key(client, db_session):
    existing = User(
        email="already@nwosu.edu",
        password_hash=hash_password("password1"),
        role="student",
        verified=True,
    )
    db_session.add(existing)
    db_session.commit()
    db_session.refresh(existing)
    roster = db_session.get(Roster, "roster1")
    roster.user_id = existing.id
    db_session.commit()

    response = client.post(REGISTER_URL, json=VALID_BODY)
    assert response.status_code == 400
    assert response.json()["detail"] == (
        "This student key has already been claimed. If this is your key, contact your instructor."
    )


def test_register_duplicate_email(client, db_session):
    db_session.add(
        User(
            email="jane.doe@nwosu.edu",
            password_hash=hash_password("password1"),
            role="student",
            verified=True,
        )
    )
    db_session.commit()

    response = client.post(REGISTER_URL, json=VALID_BODY)
    assert response.status_code == 400
    assert (
        response.json()["detail"]
        == "An account with this email already exists. Sign in instead."
    )


def test_register_short_password(client):
    response = client.post(
        REGISTER_URL,
        json={**VALID_BODY, "password": "short"},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Password must be at least 8 characters."


def test_anonymous_cannot_create_user(client):
    response = client.post(
        "/api/collections/users/records",
        json={
            "email": "invented@nwosu.edu",
            "password": "password1",
            "name": "Invented",
        },
    )
    assert response.status_code == 403


def test_admin_can_create_user(client, admin_headers):
    response = client.post(
        "/api/collections/users/records",
        json={
            "email": "newadmincreated@nwosu.edu",
            "password": "password1",
            "name": "Created",
        },
        headers=admin_headers,
    )
    assert response.status_code == 200
    assert response.json()["email"] == "newadmincreated@nwosu.edu"


def test_sign_in_unrecognized_email(client):
    response = client.post(
        "/api/collections/users/auth-with-password",
        json={"identity": "nobody@nwosu.edu", "password": "password1"},
    )
    assert response.status_code == 404
    assert response.json()["detail"] == (
        "This email is not recognized. Use your school .edu email, or sign up with your student key."
    )


def test_sign_in_wrong_password(client, db_session):
    db_session.add(
        User(
            email="jane.doe@nwosu.edu",
            password_hash=hash_password("password1"),
            role="student",
            verified=True,
        )
    )
    db_session.commit()

    response = client.post(
        "/api/collections/users/auth-with-password",
        json={"identity": "jane.doe@nwosu.edu", "password": "wrongpass"},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Invalid login credentials."
