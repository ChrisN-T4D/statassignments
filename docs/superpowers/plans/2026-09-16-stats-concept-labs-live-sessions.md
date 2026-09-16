# Stats Concept Labs + Live Classroom Sessions Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship four interactive Statistics Concept Labs (central tendency, coin flips, marbles, CLT) that run solo or in instructor-hosted live sessions where students vote on settings and contribute to a shared experiment via a short join code.

**Architecture:** FastAPI + Postgres live-lab session engine (REST + ~1s poll). Vue 3 labs share `useLiveLabSession`. Module 4 / Module 6 class-home Lab tabs (RM Lab pattern). Guest join at `/live/:code`.

**Tech Stack:** Vue 3, Vue Router, Vite, FastAPI, SQLAlchemy, Alembic, Postgres (SQLite in pytest), pytest + httpx ASGITransport.

**Spec:** `docs/superpowers/specs/2026-09-16-stats-concept-labs-live-sessions-design.md`

## Global Constraints

- Lab types exactly: `central-tendency` | `coin` | `marbles` | `clt`.
- Phases exactly: `lobby` | `voting` | `contributing` | `revealing`.
- Instructor JWT required for create / apply-settings / set-phase / set-locks / reset / end. Roles allowed as host: `instructor` or `admin`.
- Students join with short code + display name; auth via opaque `guest_token` (no login required).
- Vote aggregation: plurality per `setting_key`; ties → host must pick via `apply-settings`.
- Live aggregates use `session.current_round_id` only; reset advances round without deleting old contribution rows.
- Poll interval ~1000ms; no WebSockets in this plan.
- No BKT / learning_events writes from live-lab actions.
- Keep each new Vue file under ~600 lines; do not dump all four demos into `ClassHome.vue` — mount thin wrappers.
- Follow existing ID helper `_new_id()` in `backend/db/models.py` and Alembic style from `004_*`.
- Do not edit files over ~600 lines except surgical inserts in `ClassHome.vue`, `src/router/index.js`, `backend/main.py`, `backend/tests/conftest.py`, `backend/db/models.py`.

## File map

| Path | Responsibility |
|------|----------------|
| `backend/alembic/versions/005_live_lab_sessions.py` | Tables |
| `backend/db/models.py` | SQLAlchemy models |
| `backend/api/live_labs.py` | REST router |
| `backend/main.py` | `include_router` |
| `backend/tests/test_live_labs.py` | API tests |
| `backend/tests/conftest.py` | Mount live_labs router; instructor fixture |
| `src/composables/useLiveLabSession.js` | Poll + actions |
| `src/lib/liveLabApi.js` | `fetch` wrappers against `VITE_API_URL` |
| `src/lib/statsLabMath.js` | mean/median/mode, sample means, histogram bins |
| `src/views/LiveLabJoin.vue` | `/live/:code` phone UI shell |
| `src/components/labs/CentralTendencyLab.vue` | M4 demo |
| `src/components/labs/CoinFlipLab.vue` | M6 coin |
| `src/components/labs/MarblesLab.vue` | M6 marbles |
| `src/components/labs/CentralLimitLab.vue` | M6 CLT |
| `src/components/labs/LiveLabHostChrome.vue` | Host: code, QR, phase, locks, tallies |
| `src/components/labs/LiveLabStudentChrome.vue` | Student vote/contribute chrome |
| `src/views/ClassHome.vue` | Module 4/6 lab tabs only |
| `src/router/index.js` | `/live/:code` route (no auth) |

---

### Task 1: Alembic `005` + SQLAlchemy models

**Files:**
- Create: `backend/alembic/versions/005_live_lab_sessions.py`
- Modify: `backend/db/models.py` (append models after existing ones; register in any `COLLECTION_MODELS` dict only if required — these tables are API-router owned, not PocketBase collections)

**Produces:** Tables `live_lab_sessions`, `live_lab_participants`, `live_lab_votes`, `live_lab_contributions` and matching ORM classes `LiveLabSession`, `LiveLabParticipant`, `LiveLabVote`, `LiveLabContribution`.

- [ ] **Step 1: Write migration** revising `004`, creating:

```python
# revision = "005", down_revision = "004"
# live_lab_sessions columns:
#   id String(32) PK
#   code String(16) unique not null
#   lab_type String(32) not null
#   host_user_id String(32) FK users.id not null
#   class_id String(64) not null
#   status String(16) not null default 'open'
#   phase String(16) not null default 'lobby'
#   applied_settings JSONB nullable
#   vote_locked Boolean not null default False
#   contribute_locked Boolean not null default True
#   current_round_id String(32) not null
#   created, updated, ended_at, last_activity_at DateTime
# indexes: unique code; ix host_user_id; ix status
# participants: id, session_id FK CASCADE, display_name, guest_token unique, user_id nullable FK, last_seen
# votes: id, session_id, participant_id, setting_key, value JSONB, unique(session_id, participant_id, setting_key)
# contributions: id, session_id, participant_id, round_id, payload JSONB, created, updated
```

Use `sa.Boolean()` / `postgresql.JSONB()` like `004`. Downgrade drops in reverse order (contributions → votes → participants → sessions).

- [ ] **Step 2: Add ORM classes** in `backend/db/models.py` mirroring columns; relationships optional.

- [ ] **Step 3: Verify migration header**

Run: `python -c "import importlib.util; p=r'backend/alembic/versions/005_live_lab_sessions.py'; s=importlib.util.spec_from_file_location('m',p); m=importlib.util.module_from_spec(s); s.loader.exec_module(m); assert m.revision=='005' and m.down_revision=='004'"`

Expected: exit 0

- [ ] **Step 4: Commit**

```bash
git add backend/alembic/versions/005_live_lab_sessions.py backend/db/models.py
git commit -m "Add live_lab session tables and models."
```

---

### Task 2: Live-lab API — create, join, state

**Files:**
- Create: `backend/api/live_labs.py`
- Modify: `backend/main.py` (include router)
- Modify: `backend/tests/conftest.py` (include router; add `instructor_headers` fixture)
- Create: `backend/tests/test_live_labs.py`

**Produces:**
- `POST /api/live-labs` body `{ lab_type, class_id }` → `{ code, session }`
- `POST /api/live-labs/{code}/join` body `{ display_name }` → `{ participant_id, guest_token, session }`
- `GET /api/live-labs/{code}/state?guest_token=` (optional) → snapshot JSON

**Interfaces:**
- Code generator: 6 chars from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (no ambiguous 0/O/1/I), unique among `status='open'`.
- Initial `current_round_id`: `_new_id()`.
- Initial `applied_settings`: lab defaults (see Task 2 defaults table below).
- `contribute_locked=True` at create; `vote_locked=False`.

**Default `applied_settings` by lab_type:**

| lab_type | defaults |
|----------|----------|
| `central-tendency` | `{ "shape": "right-skew", "include_outliers": true }` |
| `coin` | `{ "n_flips": 10, "p": 0.5 }` |
| `marbles` | `{ "urn": {"red": 40, "blue": 30, "green": 30}, "n": 5, "with_replacement": false }` |
| `clt` | `{ "population": "skew", "n": 5, "samples_per_contrib": 1 }` |

- [ ] **Step 1: Write failing tests** in `backend/tests/test_live_labs.py`:

```python
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
```

- [ ] **Step 2: Run tests — expect FAIL**

Run: `cd backend && python -m pytest tests/test_live_labs.py -v`

Expected: FAIL (router missing or 404)

- [ ] **Step 3: Implement router + wire main + conftest**

`live_labs.py`:
- `APIRouter(prefix="/api/live-labs", tags=["live-labs"])`
- Host guard: `user.role in ("instructor", "admin")` else 403
- Reject unknown `lab_type` with 400
- Join: trim display_name (1–40 chars); create participant with `secrets.token_urlsafe(24)` guest_token; bump `last_activity_at`
- State snapshot fields: `code`, `lab_type`, `status`, `phase`, `applied_settings`, `vote_locked`, `contribute_locked`, `current_round_id`, `participant_count`, `vote_tallies` (empty for now), `contributions_aggregate` (empty/null for now), `participants` (display_name list only for host; students get count only — simpler: always return count + names for classroom trust)

Extend `conftest.py` `client` fixture: `app.include_router(live_labs_router)`. Add `instructor_headers` like `admin_headers` but `role="instructor"`. Add `statistics` Class row in `db_session` if missing.

- [ ] **Step 4: Run tests — expect PASS**

Run: `cd backend && python -m pytest tests/test_live_labs.py -v`

- [ ] **Step 5: Commit**

```bash
git add backend/api/live_labs.py backend/main.py backend/tests/conftest.py backend/tests/test_live_labs.py
git commit -m "Add live-lab create, join, and state API."
```

---

### Task 3: Vote, contribute, host controls, aggregates

**Files:**
- Modify: `backend/api/live_labs.py`
- Modify: `backend/tests/test_live_labs.py`

**Produces:**
- `POST /{code}/vote` `{ guest_token, setting_key, value }` upsert
- `POST /{code}/contribute` `{ guest_token, payload }` append if unlocked; stamp `round_id=session.current_round_id`
- `POST /{code}/apply-settings` host `{ settings }` or `{ from_tallies: true }`
- `POST /{code}/set-phase` host `{ phase }`
- `POST /{code}/set-locks` host `{ vote_locked?, contribute_locked? }`
- `POST /{code}/reset` host — new `current_round_id`, clear votes for session (delete vote rows), keep contribution history
- `POST /{code}/end` host — `status=ended`, `ended_at=now`

**Aggregate rules in `state`:**

| lab_type | `contributions_aggregate` |
|----------|---------------------------|
| `central-tendency` | `{ scores: [...], mean, median, mode }` for current round |
| `coin` | `{ flips: [0\|1,...], n, proportion_heads }` |
| `marbles` | `{ draws: [[colors...],...], counts: {color: n} }` |
| `clt` | `{ means: [...], histogram: [{bin_start, bin_end, count}, ...] }` |

Mean/median/mode helpers live in Python in `live_labs.py` (keep small) or `backend/lib/stats_lab_math.py`.

**Rate limits (in-process, best-effort):** per `guest_token`, reject vote if last vote < 0.5s ago (429); contribute: max per round — coin `sum(len(flips))<=20`, marbles `1` draw, central-tendency `1` score, clt `samples_per_contrib` means (default 1). Return 429 with clear detail.

- [ ] **Step 1: Add tests** for vote upsert, contribute lock, plurality apply, reset round isolation, end rejects join:

```python
def test_vote_contribute_reset_flow(client, instructor_headers):
    code = client.post("/api/live-labs", json={"lab_type": "coin", "class_id": "statistics"}, headers=instructor_headers).json()["code"]
    tok = client.post(f"/api/live-labs/{code}/join", json={"display_name": "A"}).json()["guest_token"]
    assert client.post(f"/api/live-labs/{code}/set-phase", json={"phase": "voting"}, headers=instructor_headers).status_code == 200
    assert client.post(f"/api/live-labs/{code}/vote", json={"guest_token": tok, "setting_key": "n_flips", "value": 20}).status_code == 200
    assert client.post(f"/api/live-labs/{code}/set-locks", json={"contribute_locked": False}, headers=instructor_headers).status_code == 200
    assert client.post(f"/api/live-labs/{code}/set-phase", json={"phase": "contributing"}, headers=instructor_headers).status_code == 200
    assert client.post(f"/api/live-labs/{code}/contribute", json={"guest_token": tok, "payload": {"flips": [1, 0, 1]}}).status_code == 200
    st = client.get(f"/api/live-labs/{code}/state").json()
    assert st["contributions_aggregate"]["n"] == 3
    assert abs(st["contributions_aggregate"]["proportion_heads"] - (2 / 3)) < 1e-9
    round1 = st["current_round_id"]
    assert client.post(f"/api/live-labs/{code}/reset", headers=instructor_headers).status_code == 200
    st2 = client.get(f"/api/live-labs/{code}/state").json()
    assert st2["current_round_id"] != round1
    assert st2["contributions_aggregate"]["n"] == 0
```

- [ ] **Step 2: Run — expect FAIL**, then implement, then PASS.

- [ ] **Step 3: Commit**

```bash
git add backend/api/live_labs.py backend/tests/test_live_labs.py backend/lib/stats_lab_math.py
git commit -m "Add live-lab voting, contributions, and host controls."
```

---

### Task 4: Frontend API client + `useLiveLabSession`

**Files:**
- Create: `src/lib/liveLabApi.js`
- Create: `src/composables/useLiveLabSession.js`

**Produces:**
- `liveLabApi.create({ labType, classId })` uses `pb` auth token via `Authorization` header (read `localStorage pb_auth_token` or import from `pocketbase.js` authStore if exported — prefer duplicate thin fetch using same `API_BASE` pattern as `src/lib/pocketbase.js`).
- `join`, `getState`, `vote`, `contribute`, `applySettings`, `setPhase`, `setLocks`, `reset`, `end`
- `useLiveLabSession({ code, role: 'host'|'student', pollMs: 1000 })` returns refs: `state`, `error`, `guestToken`, `displayName`, methods matching API; starts/stops poll on mount/unmount; persists `guest_token` in `localStorage` key `liveLabGuest:${code}`.

- [ ] **Step 1: Implement `liveLabApi.js` and composable.**

- [ ] **Step 2: Verify import**

Run: `node --input-type=module -e "import('./src/lib/liveLabApi.js').then(()=>console.log('ok'))"`

Expected: `ok` (or Vite-less failure only on `import.meta.env` — if so, skip node and rely on later UI smoke).

- [ ] **Step 3: Commit**

```bash
git add src/lib/liveLabApi.js src/composables/useLiveLabSession.js
git commit -m "Add live-lab frontend API client and session composable."
```

---

### Task 5: `/live/:code` join view + route

**Files:**
- Create: `src/views/LiveLabJoin.vue`
- Create: `src/components/labs/LiveLabStudentChrome.vue`
- Modify: `src/router/index.js` — add route **without** `requiresAuth`:

```js
{ path: '/live/:code', component: LiveLabJoin, props: true }
```

**Produces:** Form: display name → join → show student chrome (phase, vote buttons from `applied_settings` schema per lab, contribute button). Dynamically mount the matching lab component in `student` mode (read-only viz + chrome).

- [ ] **Step 1: Implement view + chrome + route.**

- [ ] **Step 2: Smoke** — `npm run build` must succeed (labs can be stubs that only show `lab_type` until Tasks 6–9).

For this task only, create stub lab components:

```vue
<!-- src/components/labs/CoinFlipLab.vue etc. -->
<template><div class="lab-stub">{{ labType }} mode={{ mode }}</div></template>
<script setup>
defineProps({ mode: { type: String, default: 'solo' }, liveState: { type: Object, default: null } })
const labType = 'coin' // each file its own
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/views/LiveLabJoin.vue src/components/labs/LiveLabStudentChrome.vue src/components/labs/*.vue src/router/index.js
git commit -m "Add /live/:code join route and student chrome shell."
```

---

### Task 6: Shared math helpers + host chrome

**Files:**
- Create: `src/lib/statsLabMath.js`
- Create: `src/components/labs/LiveLabHostChrome.vue`

**Produces:**
- `mean(arr)`, `median(arr)`, `mode(arr)`, `proportion(arr, value=1)`, `histogram(values, binCount=10)`, `sampleMean(population, n, rng)`
- Host chrome: show code large, copy button, QR via `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(absoluteLiveUrl)}` (img tag; no new npm dep), participant count, phase buttons, lock toggles, reset, end, vote tallies list.

- [ ] **Step 1: Implement math with small node-able pure functions (no Vue).**

- [ ] **Step 2: Verify**

```bash
node --input-type=module -e "import { mean, median, mode } from './src/lib/statsLabMath.js'; if (mean([1,2,3])!==2) process.exit(1); if (median([1,2,3,4])!==2.5) process.exit(1); console.log('ok')"
```

- [ ] **Step 3: Implement host chrome.**

- [ ] **Step 4: Commit**

```bash
git add src/lib/statsLabMath.js src/components/labs/LiveLabHostChrome.vue
git commit -m "Add stats lab math helpers and host chrome."
```

---

### Task 7: Coin flip lab (solo + live)

**Files:**
- Replace stub: `src/components/labs/CoinFlipLab.vue`

**Props:** `mode: 'solo'|'host'|'student'`, `liveState`, `sessionApi` (optional object with vote/contribute/apply… from parent).

**Solo:** controls for `p` and `n_flips`; Flip / Flip N buttons; list last flips; running proportion chart (CSS bar or SVG).

**Live host:** use `liveState.applied_settings` and `contributions_aggregate`; mount `LiveLabHostChrome`; create session on “Start live” if parent passes `onStartLive`.

**Live student:** vote `n_flips` / `p` (preset buttons: fair 0.5, biased 0.7); contribute batch of `n_flips` simulated client-side then POST `{ flips: [...] }` **or** contribute one flip — use batch of size from settings.

- [ ] **Step 1: Implement full coin lab.**

- [ ] **Step 2: `npm run build`** — expect success.

- [ ] **Step 3: Commit**

```bash
git add src/components/labs/CoinFlipLab.vue
git commit -m "Implement coin flip Concept Lab with solo and live modes."
```

---

### Task 8: Marbles lab (solo + live)

**Files:**
- Replace stub: `src/components/labs/MarblesLab.vue`

**Behavior:** Urn counts editable in solo; draw `n` with/without replacement; show draw result + remaining urn. Live: vote urn mix presets + `n` + replacement; contribute one draw payload `{ colors: string[] }` computed client-side from applied urn (host should also accept server-side validation lightly — optional: trust client for v1 classroom).

- [ ] Implement, `npm run build`, commit: `Implement marbles Concept Lab with solo and live modes.`

---

### Task 9: Central tendency lab (solo + live)

**Files:**
- Replace stub: `src/components/labs/CentralTendencyLab.vue`

**Behavior:** Generate synthetic scores from shape (`left-skew`|`symmetric`|`right-skew`) ± outliers; display histogram + mean/median/mode numbers (use `statsLabMath`). Live: vote shape / outliers; contribute `{ score: number }` (student picks or random from phone).

- [ ] Implement, build, commit: `Implement central tendency Concept Lab with solo and live modes.`

---

### Task 10: CLT lab (solo + live)

**Files:**
- Replace stub: `src/components/labs/CentralLimitLab.vue`

**Behavior:** Population shapes `uniform`|`skew`|`bimodal`; draw many sample means of size `n`; histogram of means. Live: vote population/`n`; contribute `{ means: number[] }` length `samples_per_contrib`.

- [ ] Implement, build, commit: `Implement CLT Concept Lab with solo and live modes.`

---

### Task 11: Class home Module 4 & 6 Lab tabs

**Files:**
- Modify: `src/views/ClassHome.vue` (surgical only)

**Changes:**
1. Near `RM_MODULE_LAB_ID` / `labModuleContentTabs`, add:

```js
const STATS_M4 = 'stats-module-4'
const STATS_M6 = 'stats-module-6'
const statsM4LabTabs = [{ id: 'lab-central-tendency', label: 'Central tendency', iconSrc: '/topic-icon.png' }]
const statsM6LabTabs = [
  { id: 'lab-coin', label: 'Coin flips', iconSrc: '/topic-icon.png' },
  { id: 'lab-marbles', label: 'Marbles', iconSrc: '/topic-icon.png' },
  { id: 'lab-clt', label: 'CLT', iconSrc: '/topic-icon.png' },
]
```

2. In `contentTabs` computed (where RM lab tabs branch), also:

```js
if (selectedModuleId.value === STATS_M4) {
  return [...existingBaseTabsForModule, ...statsM4LabTabs] // keep topics/concepts/software order; append lab tabs after concepts
}
if (selectedModuleId.value === STATS_M6) {
  return [...existingBaseTabsForModule, ...statsM6LabTabs]
}
```

Read the real `contentTabs` computed before editing — preserve current tab order; append lab tabs after `concepts` (and before `software` if present).

3. Template: beside RM lab panel, add panels:

```vue
<div v-else-if="selectedModuleId === STATS_M4 && activeContentTab === 'lab-central-tendency'" class="tab-panel">
  <CentralTendencyLab mode="host" class-id="statistics" />
</div>
<!-- similarly coin / marbles / clt for M6 -->
```

4. Import the four lab components.

**Host mode inside labs:** If `mode==='host'` and user is instructor/admin (`useAuth`), show Start Live → `liveLabApi.create` → show code + poll. If student visits lab tab without session, default `mode` effectively solo (prop `mode="solo"` for everyone; host chrome visible only when instructor clicks Start Live). Simpler rule:

- Class-home always mounts with `mode="solo"` plus an instructor-only “Start live session” that switches that instance to host live.
- Students in class use `/live/:code` on phones (QR), not the class-home tab.

- [ ] **Step 1: Read `contentTabs` in ClassHome and apply surgical patch.**

- [ ] **Step 2: `npm run build`**

- [ ] **Step 3: Commit**

```bash
git add src/views/ClassHome.vue
git commit -m "Add Statistics Module 4 and 6 Concept Lab tabs on class home."
```

---

### Task 12: End-to-end classroom smoke checklist

**Files:** none (manual / scripted API smoke)

- [ ] **Step 1: Backend**

```bash
cd backend && python -m pytest tests/test_live_labs.py -v
```

Expected: all PASS

- [ ] **Step 2: Frontend build**

```bash
npm run build
```

Expected: success

- [ ] **Step 3: Manual script** (document results in commit message or skip if no server): instructor creates coin session → two joins → vote → apply → contribute → state aggregate updates → reset → end → join fails.

- [ ] **Step 4: Final commit** if any polish leftover; otherwise done.

```bash
git commit --allow-empty -m "Verify stats Concept Labs live-session smoke checklist."
```

(Only use empty commit if nothing to stage; prefer skipping empty commit.)

---

## Spec coverage checklist

| Spec requirement | Task |
|------------------|------|
| Descriptives Lab M4 central tendency | 9, 11 |
| Probability Lab M6 coin / marbles / CLT | 7, 8, 10, 11 |
| Solo + live modes | 7–10 |
| Votes + contributions | 3, 7–10 |
| Instructor auth + guest code | 2, 5 |
| Optional roster link later | schema `user_id` nullable in Task 1 only |
| Poll ~1s | 4 |
| Tables + API | 1–3 |
| Class home tabs | 11 |
| QR / projector | 6 |
| Rate limits / end / reset | 3 |
| No WebSockets / no BKT | Global constraints |

## Self-review notes

- Plurality + host override covered in Task 3.
- `current_round_id` advanced on reset; aggregates filter by round.
- Stubs in Task 5 replaced by Tasks 7–10 (no leftover stubs).
- `ClassHome.vue` edits limited to tabs + panel mounts.
