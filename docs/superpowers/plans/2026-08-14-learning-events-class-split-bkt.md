# Learning Events + Class-Split BKT Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Append-only `learning_events` for every signed-in interaction, plus BKT prototypes split by class for dual-enrolled students.

**Architecture:** Same Neural BKT engine. Mastery remains `(user, objective_id)`. Prototypes keyed `user_id::class_id`. `/bkt/update` writes BKT state, prototype row, and one event. Unscored UI paths create `learning_events` only. Instructor CSVs export `student_key` never user id.

**Tech Stack:** Vue 3, FastAPI, SQLAlchemy, Alembic, Postgres, PocketBase-compatible collections API.

**Spec:** `docs/superpowers/specs/2026-08-14-learning-events-class-split-bkt-design.md`

## Global Constraints

- Do not deploy to Railway.
- Do not log unsigned sessions.
- We-Do / hints / Apply / topic reads must not call `updateBKT`.
- Event rows are insert-only (no app updates/deletes except admin).
- Class slugs: `statistics` | `research-methods`.
- Keep writing `practice_attempts`, `software_lesson_metrics`, `topic_readings`.

---

### Task 1: Class inference helper

**Files:**
- Create: `backend/models/class_ids.py`
- Create: `src/data/classIds.js`

- [ ] Add `infer_class_id` / `inferClassId` and `prototype_key` as specified in the spec (RM*/rm-* → research-methods, else statistics).
- [ ] Verify with a short Python/node check that `RM1-O1` and `rm-m1-q1` map to research-methods and `M4-S1` / `stats-m4-q1` map to statistics.

### Task 2: Schema

**Files:**
- Modify: `backend/db/models.py`
- Create: `backend/alembic/versions/002_learning_events_bkt_prototypes.py`
- Modify: `backend/db/permissions.py`

- [ ] Add `LearningEvent` and `BktPrototype` models; register collections and `user` aliases.
- [ ] Alembic upgrade adds both tables and unique `(user_id, class_id)` on prototypes.
- [ ] Students create own `learning_events`; instructors list; no student update/delete.

### Task 3: Persist prototypes + log events from `/bkt/update`

**Files:**
- Modify: `backend/db/bkt_store.py`
- Modify: `backend/models/neural_bkt.py` (edit functions in place; do not rewrite the file)
- Modify: `backend/models/bkt_tabular.py` (add `class_id=None` to `update` and `get_student_profile`)
- Modify: `backend/main.py`

- [ ] Key `student_prototype_probs` as `user_id::class_id`. Hydrate/persist `bkt_prototypes`.
- [ ] `POST /bkt/update` infers class, captures pL_before, updates BKT, upserts prototype, inserts `learning_events`. Event failure must not fail the BKT response.

### Task 4: Frontend scored + unscored writes

**Files:**
- Modify: `src/composables/useBKT.js`
- Modify: `src/composables/usePractice.js`
- Modify: `src/views/SoftwareLesson.vue` (`recordSoftwarePracticeBkt` only)
- Modify: `src/composables/useSoftwareLessonMetrics.js`
- Modify: `src/views/TopicView.vue` (`saveTopicReadingTime` only)
- Create: `src/composables/useLearningEvents.js` if needed

- [ ] Pass `source`, `answer`, `class_id` hint, `module_id` into `/bkt/update`.
- [ ] After existing software metrics and topic_readings creates, also insert `learning_events` (unscored sources from the spec).

### Task 5: Instructor exports + backfill script

**Files:**
- Modify: `src/composables/useInstructorAnalytics.js`
- Modify: `src/views/InstructorDashboard.vue` (analytics tab only)
- Create: `backend/scripts/backfill_learning_events.py`

- [ ] Events / mastery / prototype CSVs with `student_key` only, roster-filtered.
- [ ] Backfill copies existing practice_attempts, software_lesson_metrics, topic_readings; skip duplicates; pL null.

### Task 6: Do not deploy

- [ ] Leave Railway untouched.
