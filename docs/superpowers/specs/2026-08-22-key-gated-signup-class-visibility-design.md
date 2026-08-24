# Design: Key-gated signup, unrecognized email, and class visibility

**Date:** 2026-08-22
**Status:** Approved
**App:** Methods Market (`statassignments`)
**Live:** https://methods-market.clneu.com

## Problem

Anyone can create a Methods Market account with any email (`POST /api/collections/users/records` while logged out). Students then claim a key later at `/claim`. That produces extra accounts, lets students invent emails, and shows every course on the home page before sign-in. Direct `/class/...` URLs (including Canvas links) also work without a session. After login, home already filters `user.classes`, but the course switcher and raw class URLs still expose courses the student is not on.

## Decisions

1. New student signup requires a **student key** up front. The email must match the roster email for that key (`roster.bb_username`), case-insensitive, trimmed. That email is their school `.edu`.
2. Existing accounts keep working with whatever email they already use. The new rule applies only to new signups.
3. A student who claims more than one key on the same account sees every class tied to those keys.
4. Logged-out visitors get a landing page with Sign in / Sign up only. Class lists and class URLs are not available until they sign in, and then only for classes they belong to.
5. Sign-in never creates a user. An email with no account gets an unrecognized-email message.

## Architecture

One new FastAPI endpoint owns signup: `POST /api/auth/register-with-key`. It looks up the roster row, checks the email, creates the student, claims the key, assigns `roster.class_id` onto `user.classes`, and returns a JWT the same shape as `auth-with-password` (`{ token, record }`).

Anonymous collection create for `users` is closed. Admins still create users from Admin. Instructors still create roster rows (email + key), not user accounts.

The Vue app stops calling `pb.collection('users').create` for students. `useAuth.signUp` calls the new endpoint. Router guards require auth for class and practice content. `useClasses.assignedClasses` returns no classes when logged out. CourseSwitcher only lists courses the signed-in user belongs to.

No schema migration. Roster already has `student_key`, `bb_username`, `class_id`, and claim fields (alembic `002` / `003`).

## Signup

**Form (`Auth.vue`, create-account mode):** student key, school email, full name, password (minimum 8 characters). Semester is inferred from the key (for example `2026FA-…`). No semester dropdown on signup.

**Request body:**

```json
{
  "student_key": "2026FA-X7K9M2",
  "email": "jane.doe@nwosu.edu",
  "password": "********",
  "name": "Jane Doe"
}
```

**Server steps (one transaction):**

1. Normalize email with the existing `normalizeRosterEmail` rule (trim + lowercase). Trim the key.
2. Find `roster` where `student_key` equals the trimmed key. If missing: 400, `Student key not found. Check your key and try again.`
3. If `roster.user_id` is set: 400, `This student key has already been claimed. If this is your key, contact your instructor.`
4. If normalized email does not equal normalized `bb_username`: 400, `This email does not match the roster. Use your school .edu email.`
5. If a user already exists with that email: 400, `An account with this email already exists. Sign in instead.`
6. Insert `users` row: `role=student`, `verified=true`, bcrypt password. Password shorter than 8 characters: 400.
7. Set `roster.user_id`, `claimed_at=now`. Append `roster.class_id` to `user.classes` if present and not already listed.
8. Return `{ token, record }` with `record.classes` populated.

If the roster row has no `bb_username`, treat it as an email mismatch (instructors must store the school email on the key). If `class_id` is null (legacy row), still create and claim the user; they will have no class until an instructor assigns one.

**API lockdown:** `POST /api/collections/users/records` succeeds only for `role=admin`. Logged-out and student/instructor callers get 403. Instructor “add one student” continues to create **roster** rows only.

**Existing `/claim`:** unchanged. Students who already have an account from open signup can still link a key there. New signups skip `/claim` because register-with-key already claimed.

## Sign-in

`POST /api/collections/users/auth-with-password` does not create users.

Split the current combined failure:

- No user for that email: **404**, detail `This email is not recognized. Use your school .edu email, or sign up with your student key.`
- User exists, password wrong: **400**, detail `Invalid login credentials.` (same as today for a bad password)

Frontend `parseAuthError` maps 404 on sign-in to that unrecognized-email sentence. Do not map a wrong password to “unrecognized.”

Forgot-password stays the stub (no email sent). Instructors and admins sign in with email + password and no key.

After a successful student sign-in: if the URL has a safe in-app `redirect` (path starting with `/class/`) and that class is in `record.classes`, go there; otherwise go to `/`. Admins → `/admin`. Instructors → `/instructor`.

## Landing page and class gates

**Logged out**

- `/` is a landing page: Methods Market title, short intro, **Sign in** and **Sign up** buttons (to `/auth` and `/auth` create-account mode). No course cards.
- `CourseSwitcher` is hidden.
- Public routes: `/`, `/auth`, `/about`.
- All `/class/:classId…` routes, plus `/practice`, `/topic/:id`, `/lesson/:id`, `/software-practice/:topicId`, require auth. Unauthenticated visits redirect to `/auth?redirect=<original path+query>`.
- Resources drawer may remain; it must not list courses.

**Logged in, student**

- Home lists only classes in `user.classes` (claimed keys). Empty list if they have no claimed key yet, with a prompt to `/claim`.
- Visiting a class they are not in: redirect to `/` with a short “You’re not enrolled in this class” message (query or existing toast/error pattern).
- `CourseSwitcher` shows only psych-methods courses that appear in `user.classes`. Hide the bar if that filtered list is empty or has one course (no switch to leak).

**Instructors and admins**

- See and open all active classes, including course switcher. No enrollment check.

**Guests vs assignedClasses**

Today `useClasses` returns every active class when `user` is null. Change: logged out → `[]`. Admin/instructor → all active. Student → intersection of active classes and `user.classes`.

## Error handling

| Situation | HTTP | User-facing copy |
|-----------|------|------------------|
| Unknown key | 400 | Student key not found. Check your key and try again. |
| Key already claimed | 400 | This student key has already been claimed. If this is your key, contact your instructor. |
| Email ≠ roster email | 400 | This email does not match the roster. Use your school .edu email. |
| Email already a user | 400 | An account with this email already exists. Sign in instead. |
| Password &lt; 8 chars | 400 | Password must be at least 8 characters. |
| Sign-in, unknown email | 404 | This email is not recognized. Use your school .edu email, or sign up with your student key. |
| Sign-in, bad password | 400 | Invalid login credentials. |
| Class URL, not enrolled | redirect `/` | You’re not enrolled in this class. |
| Class URL, logged out | redirect `/auth?redirect=…` | (auth page) |

Do not return whether an unknown sign-in email exists on the roster. Unrecognized vs already-exists is only distinguished at **signup** (step 5) and by the 404 vs 400 split on sign-in.

## Testing

There is no pytest suite today. Add `pytest` plus `httpx` to backend test deps if missing. Add `backend/tests/test_register_with_key.py` using FastAPI `TestClient` and an in-memory SQLite engine with `Base.metadata.create_all`, overriding `get_db`. Cover:

- Happy path: unclaimed key + matching `.edu` → 200, user created, roster claimed, class on `record.classes`, token present.
- Mismatched email → 400, no user created, roster still unclaimed.
- Unknown key → 400.
- Claimed key → 400.
- Duplicate email → 400.
- Anonymous `POST /api/collections/users/records` → 403.
- Admin can still create a user via collections.
- `auth-with-password` unknown email → 404 with unrecognized copy; wrong password → 400.

Frontend: `vite build` must succeed. Manual check: logged-out `/` has no class cards; `/class/research-methods` redirects to auth; after signup only the claimed class appears.

## Out of scope

- Migrating existing accounts onto roster `.edu` addresses.
- Extra `.edu` regex beyond matching `bb_username`.
- Sending forgot-password email.
- Deleting orphan accounts from the old open signup.
- Splitting Statistics in-person vs online into separate classes.
- Changing how instructors import CSV or add-one-student (still writes roster email + key).

## Files (expected)

- Create: `backend/api/auth_register.py`
- Modify: `backend/main.py` (include that router)
- Modify: `backend/api/collections.py` (lock down user create; split auth-with-password errors)
- Modify: `src/composables/useAuth.js`, `src/lib/pocketbase.js`, `src/views/Auth.vue`, `src/views/Home.vue`, `src/router/index.js`, `src/composables/useClasses.js`, `src/components/CourseSwitcher.vue`
- Keep: `src/views/ClaimProfile.vue` and `useProfile.claimByStudentKey` for legacy accounts
- Test: `backend/tests/test_register_with_key.py`
