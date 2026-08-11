# Class-aware roster keys Implementation Plan

> **For agentic workers:** Implement task-by-task. Steps use checkbox syntax.

**Goal:** Tie each student key to a Methods Market class, detect class from CSV filename, assign class on claim.

**Architecture:** Add `roster.class_id`; import UI detects/overrides class; create writes class; claim updates `user.classes`; export includes class slug.

**Tech Stack:** FastAPI + SQLAlchemy + Alembic, Vue 3 frontend, Railway deploy via `main`.

## Global Constraints

- Duplicate keys: per semester **and** class.
- Do not remove existing `user.classes` on claim—only append.
- Admins/instructors can import; students claim own key only.

---

### Task 1: Migration + model

- [ ] Add Alembic `002_roster_class_id.py`: nullable `class_id` FK to `classes.id`.
- [ ] Update `backend/db/models.py` Roster with `class_id` + relationship.
- [ ] Update `FIELD_ALIASES` / `EXPAND_RELATIONS` for roster `class`.

### Task 2: Claim assigns class

- [ ] In `collections.py` roster update: allow claim when `user_id` is null and payload user is current user.
- [ ] After claim, append roster’s class to `user.classes` if present and missing.

### Task 3: Filename detect + import UI

- [ ] Add `detectClassFromFilename(filename, classes)` in `useInstructorAnalytics.js`.
- [ ] Pass `classId` into `createRosterEntries`; write `class` on create.
- [ ] Duplicate check scoped to same class.
- [ ] InstructorDashboard: class dropdown + disable create until set; export includes class.

### Task 4: Deploy

- [ ] Push to `main`; confirm backend migration + frontend deploy.
