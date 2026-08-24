# Key-gated signup and class visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Students can only create an account with a roster student key and matching school `.edu`; signed-out visitors see a landing page; signed-in students only see classes they have claimed.

**Architecture:** New `POST /api/auth/register-with-key` creates the user, claims the roster row, and returns a JWT in one transaction. Anonymous `POST /api/collections/users/records` is closed. Sign-in returns 404 for unknown emails. Vue route guards require auth for class/practice routes and enrollment for `/class/:classId`.

**Tech Stack:** Vue 3, Vue Router, FastAPI, SQLAlchemy, JWT (existing `db.auth`).

**Spec:** `docs/superpowers/specs/2026-08-22-key-gated-signup-class-visibility-design.md`

## Global Constraints

- Do not migrate existing user emails. Old accounts still sign in as they do today.
- `/claim` stays for legacy accounts that never linked a key.
- Admins still create users via the collections API. Instructors still create roster rows only.
- Password minimum for new signup is 8 characters.
- Error copy must match the spec table exactly.
- No schema migration.
- Do not commit unless the user asks.

---

### Task 1: Test harness + register-with-key endpoint

**Files:**
- Create: `backend/tests/conftest.py`
- Create: `backend/tests/test_register_with_key.py`
- Create: `backend/api/auth_register.py`
- Modify: `backend/main.py` (include router after `collections_router`)
- Modify: `backend/requirements.txt` (add `pytest==8.0.0`)

**Interfaces:**
- Produces: `POST /api/auth/register-with-key` body `{ student_key, email, password, name }` → `{ token, record }` using `user_to_record`.
- Produces: `normalize_roster_email(email: str) -> str` in `auth_register.py` (trim + lower).

- [ ] **Step 1: Add pytest and an in-memory SQLite TestClient that does not boot `main.py` startup (no alembic/BKT).**

`conftest.py` must:
- Compile PostgreSQL `JSONB` as `JSON` on SQLite.
- `create_all` on an in-memory SQLite engine.
- Build a **minimal** FastAPI app that only includes `collections.router` and `auth_register.router`.
- Override `get_db`.
- Seed a `Class` (`id="research-methods"`, slug `research-methods`, `is_active=True`), a `Semester`, and an unclaimed `Roster` (`student_key="2026FA-TEST01"`, `bb_username="jane.doe@nwosu.edu"`, `class_id="research-methods"`, `user_id=None`).
- Yield `TestClient`.

Do not `from main import app` — startup runs migrations and BKT.

- [ ] **Step 2: Write failing tests in `test_register_with_key.py` for:**

1. Happy path: POST register-with-key with key `2026FA-TEST01`, email `Jane.Doe@NWOSU.edu`, password `password1`, name `Jane Doe` → 200, `token` present, `record.email == "jane.doe@nwosu.edu"`, `"research-methods"` in `record.classes`. Follow-up GET roster (as that user or via db) shows `user_id` set.
2. Mismatched email `other@nwosu.edu` → 400, detail `This email does not match the roster. Use your school .edu email.` No user row created.
3. Unknown key → 400, `Student key not found. Check your key and try again.`
4. Claimed key (set `user_id` first) → 400, `This student key has already been claimed. If this is your key, contact your instructor.`
5. Duplicate email (pre-create user with that email) → 400, `An account with this email already exists. Sign in instead.`
6. Password `short` → 400, `Password must be at least 8 characters.`
7. Anonymous `POST /api/collections/users/records` with email/password → 403.
8. Admin bearer token can still `POST /api/collections/users/records`.
9. `POST /api/collections/users/auth-with-password` with unknown email → 404, detail `This email is not recognized. Use your school .edu email, or sign up with your student key.`
10. Wrong password for an existing user → 400, `Invalid login credentials.`

FastAPI returns `{"detail": "<string>"}`. Assert `response.json()["detail"]`.

- [ ] **Step 3: Run tests; confirm they fail because the route/lockdown is missing.**

Run from `backend/`: `python -m pytest tests/test_register_with_key.py -q`

- [ ] **Step 4: Implement `backend/api/auth_register.py`.**

```python
# POST /api/auth/register-with-key
# 1. normalize email; trim key
# 2. find Roster by student_key
# 3. claimed → 400 claimed copy
# 4. missing bb_username or mismatch → 400 mismatch copy
# 5. existing User.email → 400 already exists copy
# 6. len(password) < 8 → 400
# 7. create User(role=student, verified=True, email=normalized)
# 8. roster.user_id = user.id; roster.claimed_at = utcnow
# 9. if roster.class_id: append Class to user.classes
# 10. commit; return {token, record: user_to_record(user)}
```

Use `joinedload(User.classes)` before `user_to_record`.

- [ ] **Step 5: In `collections.py` `create_record` for users:** allow only `user and user.role == "admin"`. Anyone else (including anonymous) 403 `Only admins can create users`.

- [ ] **Step 6: In `auth_with_password`:** if no user for identity, 404 with unrecognized copy. If user exists and password fails, 400 `Invalid login credentials.` Lookup email case-insensitively (`func.lower(User.email) == identity.strip().lower()`) so existing mixed-case accounts still sign in; keep register storing lowercase.

- [ ] **Step 7: `app.include_router` the new router in `main.py`.**

- [ ] **Step 8: Re-run pytest until all 10 cases pass.**

---

### Task 2: Frontend signup and sign-in copy

**Files:**
- Modify: `src/lib/pocketbase.js`
- Modify: `src/composables/useAuth.js`
- Modify: `src/views/Auth.vue`

**Interfaces:**
- Consumes: `POST /api/auth/register-with-key`
- Produces: `pb.registerWithKey({ student_key, email, password, name })` which stores token/record like `authWithPassword`.
- Produces: `useAuth.signUp(email, password, fullName, studentKey)` calling that helper (no `users.create`).

- [ ] **Step 1: Add `registerWithKey` on `pb` in `pocketbase.js`.** POST `/api/auth/register-with-key`, then `saveAuth` with returned token/record.

- [ ] **Step 2: Change `signUp` in `useAuth.js` to call `pb.registerWithKey`.** Do not create then login. `parseAuthError`: if `err.status === 404`, return `This email is not recognized. Use your school .edu email, or sign up with your student key.` Prefer `err.message` when it is already one of the spec strings (400 details from FastAPI land in `err.message` via `data.detail`).

- [ ] **Step 3: Auth.vue create-account form:** add required Student Key field. Password `minlength="8"`. Read `route.query.mode === 'signup'` to start in create-account mode. After success, if `route.query.redirect` is a safe in-app path (starts with `/` and not `//`), `window.location.href = redirect`, else existing role routing (`/admin`, `/instructor`, `/`). Same redirect rule after sign-in.

Safe redirect helper:

```javascript
function safeRedirect(path) {
  if (typeof path !== 'string') return null
  if (!path.startsWith('/')) return null
  if (path.startsWith('//')) return null
  return path
}
```

---

### Task 3: Landing page, assigned classes, route gates

**Files:**
- Modify: `src/composables/useClasses.js`
- Modify: `src/views/Home.vue`
- Modify: `src/router/index.js`
- Modify: `src/components/CourseSwitcher.vue`

- [ ] **Step 1: `assignedClasses`:** logged out → `[]`. `admin` or `instructor` → all active. Student → active classes whose `id` is in `user.classes`. Empty `user.classes` → `[]`.

- [ ] **Step 2: Home.vue:** if `!isAuthenticated`, show hero + Sign in (`/auth`) + Sign up (`/auth?mode=signup`); hide the course grid. If authenticated and `classes.length === 0` and role is student, show “Link your student key” to `/claim` (legacy). If `route.query.notice === 'not-enrolled'`, show `You’re not enrolled in this class.` Keep About footer.

- [ ] **Step 3: Router:** set `meta.requiresAuth: true` on every `/class/:classId…` route, `/practice`, `/practice/:topicId`, `/software-practice/:topicId`, `/topic/:id`, `/lesson/:lessonId`. Public: `/`, `/auth`, `/about`. Unauthenticated + requiresAuth → `/auth?redirect=<to.fullPath>`.

After auth check, if path starts with `/class/` and role is not admin/instructor: `await fetchClasses()`, resolve `to.params.classId` by slug or id against `allClasses`. If not found or id not in `user.classes`, `next('/?notice=not-enrolled')`.

- [ ] **Step 4: CourseSwitcher:** import `useAuth` and `useClasses`. Visible only when current route is a psych-methods class path AND the user is signed in. `admin`/`instructor`: all `PSYCH_METHODS_COURSES`. Student: only courses whose `slug` or `id` is in `assignedClasses`. Hide if that list length is 0 or 1 (nothing to switch, and do not leak Experimental).

- [ ] **Step 5: `npm run build` from repo root must succeed.**

- [ ] **Step 6: Re-run `python -m pytest tests/test_register_with_key.py -q` from `backend/`.**

---

## Verify (manual after deploy)

1. Logged out `/` has no class cards; `/class/research-methods` goes to sign in.
2. Sign in with a never-used email → unrecognized message, no new user.
3. Sign up without a key fails; with key + matching `.edu` lands in that class only.
4. Sign up with a different email than the roster → mismatch message.
5. Existing account still signs in.
6. Instructor/admin still see all classes.
