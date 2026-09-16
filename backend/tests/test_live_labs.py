import time


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


def test_vote_contribute_reset_flow(client, instructor_headers):
    code = client.post(
        "/api/live-labs",
        json={"lab_type": "coin", "class_id": "statistics"},
        headers=instructor_headers,
    ).json()["code"]
    tok = client.post(f"/api/live-labs/{code}/join", json={"display_name": "A"}).json()["guest_token"]
    assert (
        client.post(
            f"/api/live-labs/{code}/set-phase",
            json={"phase": "voting"},
            headers=instructor_headers,
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/vote",
            json={"guest_token": tok, "setting_key": "n_flips", "value": 20},
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/set-locks",
            json={"contribute_locked": False},
            headers=instructor_headers,
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/set-phase",
            json={"phase": "contributing"},
            headers=instructor_headers,
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/contribute",
            json={"guest_token": tok, "payload": {"flips": [1, 0, 1]}},
        ).status_code
        == 200
    )
    st = client.get(f"/api/live-labs/{code}/state").json()
    assert st["contributions_aggregate"]["n"] == 3
    assert abs(st["contributions_aggregate"]["proportion_heads"] - (2 / 3)) < 1e-9
    round1 = st["current_round_id"]
    assert client.post(f"/api/live-labs/{code}/reset", headers=instructor_headers).status_code == 200
    st2 = client.get(f"/api/live-labs/{code}/state").json()
    assert st2["current_round_id"] != round1
    assert st2["contributions_aggregate"]["n"] == 0


def test_vote_upsert_and_plurality_apply(client, instructor_headers):
    code = client.post(
        "/api/live-labs",
        json={"lab_type": "coin", "class_id": "statistics"},
        headers=instructor_headers,
    ).json()["code"]
    tok_a = client.post(f"/api/live-labs/{code}/join", json={"display_name": "A"}).json()["guest_token"]
    tok_b = client.post(f"/api/live-labs/{code}/join", json={"display_name": "B"}).json()["guest_token"]
    client.post(
        f"/api/live-labs/{code}/set-phase",
        json={"phase": "voting"},
        headers=instructor_headers,
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/vote",
            json={"guest_token": tok_a, "setting_key": "n_flips", "value": 10},
        ).status_code
        == 200
    )
    time.sleep(0.55)
    assert (
        client.post(
            f"/api/live-labs/{code}/vote",
            json={"guest_token": tok_a, "setting_key": "n_flips", "value": 20},
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/vote",
            json={"guest_token": tok_b, "setting_key": "n_flips", "value": 20},
        ).status_code
        == 200
    )
    st = client.get(f"/api/live-labs/{code}/state").json()
    tallies = st["vote_tallies"]["n_flips"]
    by_value = {str(t["value"]): t["count"] for t in tallies}
    assert by_value["20"] == 2
    assert "10" not in by_value
    assert (
        client.post(
            f"/api/live-labs/{code}/apply-settings",
            json={"from_tallies": True},
            headers=instructor_headers,
        ).status_code
        == 200
    )
    st2 = client.get(f"/api/live-labs/{code}/state").json()
    assert st2["applied_settings"]["n_flips"] == 20


def test_contribute_locked_rejects(client, instructor_headers):
    code = client.post(
        "/api/live-labs",
        json={"lab_type": "coin", "class_id": "statistics"},
        headers=instructor_headers,
    ).json()["code"]
    tok = client.post(f"/api/live-labs/{code}/join", json={"display_name": "A"}).json()["guest_token"]
    r = client.post(
        f"/api/live-labs/{code}/contribute",
        json={"guest_token": tok, "payload": {"flips": [1]}},
    )
    assert r.status_code == 400


def test_end_rejects_join(client, instructor_headers):
    code = client.post(
        "/api/live-labs",
        json={"lab_type": "coin", "class_id": "statistics"},
        headers=instructor_headers,
    ).json()["code"]
    assert client.post(f"/api/live-labs/{code}/end", headers=instructor_headers).status_code == 200
    j = client.post(f"/api/live-labs/{code}/join", json={"display_name": "Late"})
    assert j.status_code == 400


def test_classroom_smoke_coin_flow(client, instructor_headers):
    """End-to-end classroom path: create → join×2 → vote → apply → unlock → contribute → reset → end."""
    code = client.post(
        "/api/live-labs",
        json={"lab_type": "coin", "class_id": "statistics"},
        headers=instructor_headers,
    ).json()["code"]
    tok_a = client.post(f"/api/live-labs/{code}/join", json={"display_name": "A"}).json()["guest_token"]
    tok_b = client.post(f"/api/live-labs/{code}/join", json={"display_name": "B"}).json()["guest_token"]
    assert (
        client.post(
            f"/api/live-labs/{code}/set-phase",
            json={"phase": "voting"},
            headers=instructor_headers,
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/vote",
            json={"guest_token": tok_a, "setting_key": "n_flips", "value": 20},
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/vote",
            json={"guest_token": tok_b, "setting_key": "n_flips", "value": 20},
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/apply-settings",
            json={"from_tallies": True},
            headers=instructor_headers,
        ).status_code
        == 200
    )
    st = client.get(f"/api/live-labs/{code}/state").json()
    assert st["applied_settings"]["n_flips"] == 20
    assert st["participant_count"] == 2
    assert (
        client.post(
            f"/api/live-labs/{code}/set-locks",
            json={"contribute_locked": False},
            headers=instructor_headers,
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/set-phase",
            json={"phase": "contributing"},
            headers=instructor_headers,
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/contribute",
            json={"guest_token": tok_a, "payload": {"flips": [1, 0, 1]}},
        ).status_code
        == 200
    )
    assert (
        client.post(
            f"/api/live-labs/{code}/contribute",
            json={"guest_token": tok_b, "payload": {"flips": [0, 1]}},
        ).status_code
        == 200
    )
    st2 = client.get(f"/api/live-labs/{code}/state").json()
    assert st2["contributions_aggregate"]["n"] == 5
    assert abs(st2["contributions_aggregate"]["proportion_heads"] - (3 / 5)) < 1e-9
    round1 = st2["current_round_id"]
    assert client.post(f"/api/live-labs/{code}/reset", headers=instructor_headers).status_code == 200
    st3 = client.get(f"/api/live-labs/{code}/state").json()
    assert st3["current_round_id"] != round1
    assert st3["contributions_aggregate"]["n"] == 0
    assert client.post(f"/api/live-labs/{code}/end", headers=instructor_headers).status_code == 200
    late = client.post(f"/api/live-labs/{code}/join", json={"display_name": "Late"})
    assert late.status_code == 400
