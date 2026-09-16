def test_create_requires_auth(client):
    r = client.post("/api/live-labs", json={"lab_type": "coin", "class_id": "statistics"})
    assert r.status_code in (401, 403)


def test_instructor_creates_and_guest_joins(client, instructor_headers):
    r = client.post(
        "/api/live-labs",
        json={"lab_type": "coin", "class_id": "statistics"},
        headers=instructor_headers,
    )
    assert r.status_code == 200
    code = r.json()["code"]
    assert len(code) == 6
    j = client.post(f"/api/live-labs/{code}/join", json={"display_name": "Alex"})
    assert j.status_code == 200
    body = j.json()
    assert body["guest_token"]
    st = client.get(f"/api/live-labs/{code}/state", params={"guest_token": body["guest_token"]})
    assert st.status_code == 200
    data = st.json()
    assert data["lab_type"] == "coin"
    assert data["phase"] == "lobby"
    assert data["participant_count"] == 1
    assert data["applied_settings"]["p"] == 0.5
