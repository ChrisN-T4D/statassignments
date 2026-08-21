# Instructor add-one student key Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let an instructor type one student email on the roster tab, generate a `SEMCODE-XXXXXX` key, show it with copy, include it in Download Student Keys CSV, and if the email is already on a roster choose show-existing or create-new.

**Architecture:** Optional `class_id` on `roster`. Email stored in existing `bb_username` (trimmed, lowercased). New frontend helpers + `AddOneStudent.vue`; dashboard only mounts the component. Reuse PocketBase-compatible roster create. No new API route. No outbound email.

**Tech Stack:** Vue 3, FastAPI, SQLAlchemy, Alembic, Postgres.

**Spec:** `docs/superpowers/specs/2026-08-21-instructor-add-one-student-key-design.md`

## Global Constraints

- Store email in `bb_username` only; no new email column.
- Analytics exports stay `student_key` only.
- Keys CSV format unchanged (`bb_username`, `bb_id`, `student_key`, `claimed`).
- CSV import unchanged and does not set `class_id`.
- Detection searches all roster rows, case-insensitive.
- Create-new-key uses the currently selected semester + class.
- Missing class on a row displays as Unassigned.
- Do not edit files over ~600 lines except a two-anchor insert in `InstructorDashboard.vue`.
- No new automated test suite; per-step verify commands instead.

---

### Task 1: Email helpers

**Files:**
- Create: `src/utils/rosterEmail.js`

**Produces:** `normalizeRosterEmail(email)`, `isValidRosterEmail(email)`

- [ ] Create `src/utils/rosterEmail.js` with trim/lowercase normalize and `/.+@.+\..+/` validation.
- [ ] Verify with node import.
- [ ] Commit.

### Task 2: Alembic `002` roster.class_id

**Files:**
- Create: `backend/alembic/versions/002_roster_class_id.py`

**Produces:** nullable `roster.class_id` FK to `classes.id`, revises `001`

- [ ] Add migration matching `001` header style (`revision = "002"`, `down_revision = "001"`).
- [ ] Commit.

### Task 3: Roster model + API aliases

**Files:**
- Modify: `backend/db/models.py` (`Roster`, `FIELD_ALIASES['roster']`, `EXPAND_RELATIONS['roster']`)

**Produces:** API field `class` maps to `class_id`; expand `class` returns the Class record.

- [ ] Add `class_id` and `class_` relationship on `Roster`.
- [ ] Add `"class": "class_id"` alias and expand tuple.
- [ ] Commit.

### Task 4: Add-one composable

**Files:**
- Create: `src/composables/useAddOneStudent.js`

**Consumes:** `normalizeRosterEmail`, `isValidRosterEmail`; `pb.collection('roster'|'classes')`; existing key charset `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (6 chars after `semesterCode-`).

**Produces:** `fetchClasses()`, `findRosterByEmail(email)`, `createOneRosterEntry({ semesterId, semesterCode, classId, email })`

- [ ] Implement lookup (all roster, expand `semester,class`, client-side email match) and create (unique key in semester, `class` set, `bb_id` empty).
- [ ] Commit.

### Task 5: AddOneStudent component

**Files:**
- Create: `src/components/AddOneStudent.vue`

**Consumes:** composable from Task 4; props `semesterId`, `semesterCode`.

**Produces:** UI for class + email, generate, detection banner, show-existing / create-new, copy, emit `roster-updated`.

- [ ] Implement per spec copy (`Enter a valid email.`, `Detected on roster (semester, class)`).
- [ ] Commit.

### Task 6: Mount on instructor dashboard

**Files:**
- Modify: `src/views/InstructorDashboard.vue` (two anchors only: import + insert between Semester section and Roster Stats)

- [ ] Import and render `AddOneStudent` when `rosterSemesterId` is set; `@roster-updated="loadRosterStats"`.
- [ ] Commit.

## Manual verification (after tasks)

- Fresh email → key on screen, in keys CSV, counts increment.
- Same email → detection; show existing does not create; create new adds a second row.
- CSV-imported row → class Unassigned.
- Invalid email / missing class → no row.
