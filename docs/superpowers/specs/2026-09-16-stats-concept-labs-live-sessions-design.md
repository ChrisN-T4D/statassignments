# Stats Concept Labs + Live Classroom Sessions

**Date:** 2026-09-16  
**Scope:** PSYC 4213 / Methods Market Statistics — interactive Concept Labs for Modules 4 and 6, with shared live sessions for in-class use  
**Out of scope:** Graded credit / attendance from sessions; WebSockets; Research Methods labs (existing sampling/assignment sim unchanged); cross-class analytics dashboards; roster-linked identity required to play

## Problem

Statistics Concepts (central tendency, probability, sampling distributions, CLT) are easy to lecture and hard to *see*. Methods Market already has a strong interactive pattern in Research Methods (`ExperimentalSamplingSimulation` on the Lab module), but Statistics has no equivalent Concept Labs. Instructors also need demos that work on a projector **and** on student phones in the same room, with students voting on settings and contributing to a shared experiment.

## Goals

- Two **separate** Concept Labs under Statistics:
  - **Descriptives Lab** (Module 4): central tendency
  - **Probability Lab** (Module 6): coin flips, marbles, central limit theorem
- Every demo works in **solo** mode (local, no network) and **live session** mode (shared class state).
- Live sessions support:
  - **Setting votes** (students propose parameters; instructor applies or locks)
  - **Pooled contributions** (each student adds flips / draws / scores / sample-means into one class result)
- Instructor always authenticated; students join via **short session code** (guests OK); optional roster link later for credit/attendance (schema-ready, not required in v1).
- Projector-friendly instructor view + minimal phone UI for students.

## Non-goals

- True WebSocket push (v1 uses REST poll ~1s; SSE optional later if poll feels laggy).
- Requiring sign-in or student key to join/contribute.
- Awarding Concept Review / BKT credit from live-lab actions in v1.
- Replacing textbook HTML topics or Software Practice exercises.
- Building more demos than the four listed above in this ship.

## Approach

**Approach 1 (chosen):** One backend **live-lab session engine** plus four Vue demo components that share a `useLiveLabSession` composable. Demos also run fully client-side when no session is active. Placement mirrors RM Lab tabs on Statistics class home for Module 4 and Module 6.

Rejected: full WebSockets (extra Railway complexity for classroom cadence); solo-only first (contradicts shared-session-as-v1 requirement).

## Architecture

```
Class home (statistics)
  ├─ Module 4 tab: Descriptives Lab → CentralTendencyLab.vue
  └─ Module 6 tab: Probability Lab → tabs/panels for Coin / Marbles / CLT

/live/:code  → student join + phone UI (demo type from session)

useLiveLabSession()  ↔  FastAPI /api/live-labs/*  ↔  Postgres
```

Solo mode never calls the API. Live mode: instructor creates session; students join; clients poll `GET .../state`.

## Labs and demos

### Descriptives Lab (Module 4)

| Demo | Solo behavior | Votes | Contributions |
|------|---------------|-------|---------------|
| **Central tendency** | Skewed distribution; show mean vs median vs mode; toggle outliers | Distribution shape; include/exclude outliers | Each student adds one numeric “score” to a shared class dataset; class mean/median/mode update |

### Probability Lab (Module 6)

| Demo | Solo behavior | Votes | Contributions |
|------|---------------|-------|---------------|
| **Coin flips** | Fair/biased coin; flip or batch; running proportion | Flips per round; fair vs biased *p* | Each student submits a flip or small batch into the shared sequence |
| **Marbles** | Urn with colors; draw with/without replacement | Urn mix; draw size *n*; with vs without replacement | Each student draws once into the shared sample |
| **CLT** | Non-normal population; many samples of size *n*; histogram of means | Population shape; *n*; number of samples | Each student contributes one (or few) sample-mean(s) to the shared sampling distribution |

### Instructor controls (all live demos)

- Open / lock voting
- Apply settings: default **plurality** on each `setting_key` (ties → instructor picks); or instructor overrides manually
- Open / lock contributions
- Clear / reset round (new `round_id`; prior contributions retained in DB but excluded from live aggregates)
- End session
- Projector emphasis: large charts, vote tallies, participant count (“N phones connected”)

### Student phone UI

- Join with code (+ optional display name)
- Large vote buttons when phase = voting
- One-tap contribute when phase = contributing
- Minimal chrome; read-only chart summary when locked/revealing

## Data model

### `live_lab_sessions`

| Column | Notes |
|--------|--------|
| `id` | UUID / PK |
| `code` | Short join code (e.g. 6 chars), unique among open sessions |
| `lab_type` | `central-tendency` \| `coin` \| `marbles` \| `clt` |
| `host_user_id` | Instructor (required) |
| `class_id` | e.g. `statistics` |
| `status` | `open` \| `ended` |
| `phase` | `voting` \| `contributing` \| `revealing` \| `lobby` |
| `applied_settings` | JSON — current effective demo parameters |
| `vote_locked` | bool |
| `contribute_locked` | bool |
| `current_round_id` | String; stamped onto new contributions; advanced on reset |
| `created` / `updated` / `ended_at` | timestamps |
| `last_activity_at` | for idle expiry |

### `live_lab_participants`

| Column | Notes |
|--------|--------|
| `id` | PK |
| `session_id` | FK |
| `display_name` | Guest-chosen; not PII-validated |
| `guest_token` | Opaque token (localStorage); required for guest auth on vote/contribute |
| `user_id` | Nullable — optional roster link later |
| `last_seen` | Heartbeat via poll/join |

### `live_lab_votes`

| Column | Notes |
|--------|--------|
| `session_id`, `participant_id` | FKs |
| `setting_key` | e.g. `n`, `p`, `shape` |
| `value` | JSON |
| Unique | One active vote per (`session_id`, `participant_id`, `setting_key`); upsert on re-vote |

### `live_lab_contributions`

| Column | Notes |
|--------|--------|
| `session_id`, `participant_id` | FKs |
| `payload` | JSON — score / flips / marble draw / sample-mean |
| `round_id` | Required string set by host on each reset; live aggregates use current `round_id` only |
| `created` | timestamp |

## API

All under `/api/live-labs` (FastAPI). Host actions require instructor JWT. Guest actions require `guest_token` for that session.

| Method | Path | Who | Purpose |
|--------|------|-----|---------|
| `POST` | `/` | Instructor | Create session (`lab_type`, `class_id`) → `{ code, session }` |
| `POST` | `/{code}/join` | Anyone | Join with display name → participant + guest_token |
| `GET` | `/{code}/state` | Host or participant | Snapshot: settings, phase, tallies, aggregates, participant count |
| `POST` | `/{code}/vote` | Participant | Upsert vote for a setting key |
| `POST` | `/{code}/contribute` | Participant | Append contribution (if contribute unlocked) |
| `POST` | `/{code}/apply-settings` | Host | Set `applied_settings` from tally winner or manual choice |
| `POST` | `/{code}/set-phase` | Host | lobby / voting / contributing / revealing |
| `POST` | `/{code}/set-locks` | Host | vote_locked / contribute_locked |
| `POST` | `/{code}/reset` | Host | Clear votes and/or contributions for new round |
| `POST` | `/{code}/end` | Host | End session |

**State poll interval:** ~1s on active live views. Consider SSE in a follow-up if needed.

## Security and classroom limits

- Short codes; reject join on `ended` or expired idle sessions (e.g. end after 2h idle or explicit end).
- Rate limits per participant: vote ≤ ~1/s; contribute capped per round (demo-specific, e.g. 1 marble draw, ≤10 flips, 1–5 sample-means).
- Host-only for apply / phase / locks / reset / end.
- Guests: opaque token only; no email required.
- Do not log contribution payloads into BKT / learning_events in v1 (optional later).

## Frontend placement

- Extend Statistics class home Module 4 and Module 6 with Lab-style tabs (pattern from `ClassHome.vue` RM Lab + `ExperimentalSamplingSimulation`).
- Route `/live/:code` for phone join (works without full class navigation).
- Shared composable `useLiveLabSession.js`; presentational demo components stay mostly pure (inputs → viz).
- QR code on instructor view pointing at `/live/:code` (generate client-side).

## UX modes

| Mode | Controls | Data |
|------|----------|------|
| Solo | Full local controls | In-component state only |
| Live (host) | Phase, locks, apply, reset, end + projector charts | API state |
| Live (student) | Vote / contribute only | API state |

Banner on lab: **Solo | Live** with code when live.

## Testing

- Backend: create/join/vote/contribute/apply/reset/end; host-only guards; rate limits; unique vote upsert; ended session rejects.
- Frontend: solo demos render and update without API; live join flow; poll updates charts; phone layout usable at ~375px width.
- Manual classroom smoke: instructor projector + 2+ phones on same Wi‑Fi / cellular.

## Rollout

1. Alembic migration + live-lab API + join/state smoke.
2. `useLiveLabSession` + `/live/:code` shell.
3. Four demos in solo mode.
4. Wire live votes/contributions per demo.
5. Class-home Module 4 / Module 6 Lab entry points + QR.
6. Deploy Railway (backend migration on boot; frontend env unchanged beyond existing API URL).

## Open follow-ups (explicitly deferred)

- Optional `user_id` roster link for credit/attendance.
- SSE or WebSockets if poll latency is a classroom complaint.
- Persistence of session replays for after-class review.
- Additional demos (variability, confidence intervals, etc.).
