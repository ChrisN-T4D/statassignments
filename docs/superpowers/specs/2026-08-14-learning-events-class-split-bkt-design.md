# Learning events + class-split BKT

Date: 2026-08-14  
Status: approved  
Goal: Persist a publication-grade, append-only interaction log, and give dual-enrolled students separate BKT learner prototypes per class.

## Decisions

- Same BKT engine for Statistics and Research Methods. Do not train two models.
- Mastery stays one row per `(user_id, objective_id)`. Objective IDs already do not collide (`M*` vs `RM*`).
- Learner prototypes (Fast Learner, Careful, Struggling, Inconsistent, Average) are keyed by `(user_id, class_id)` so a student in both courses has two independent profiles.
- Research log is a new append-only `learning_events` table (never updated or deleted by app code).
- Full item payload: item id, objectives, class, correctness, **raw answer**, difficulty, time/engagement, `pL_before`, `pL_after`, winning prototype id.
- Log every **signed-in** interaction (Concept Review, software Self-Check/You-Do, We-Do next, hints, Apply complete, phase/lesson complete, topic reads). Unsigned sessions write nothing.
- We-Do / hints / Apply / topic reads do **not** update mastery (`is_correct` is null).
- Class is inferred on the server. Client `class_id` is a hint only.
- Exports use `student_key`, never email or user id.
- Do not deploy until the existing Jamovi-content hold is lifted. Code can land now; collection starts on the next backend deploy.

## Class inference

`class_id` is one of `statistics` | `research-methods`.

Inspect, in order: `objective_id`, `item_id`, `module_id`, then client hint.

- If the value starts with `RM`, `rm-`, or contains `research-methods` → `research-methods`.
- Otherwise → `statistics` (covers `M1-O1`, `M4-S1`, `stats-m4-q1`, `stats-module-4`, software lesson ids).

If a prototype row is missing for that `(user, class)`, start uniform `1/5`. Never copy the other class’s vector.

## Data model

### `learning_events` (append-only)

| Column | Type | Notes |
|---|---|---|
| id | string PK | existing id helper |
| user_id | FK users | required |
| class_id | string(64) | `statistics` or `research-methods` |
| source | string(64) | see sources below |
| item_id | string, nullable | question / self-check / you-do id |
| lesson_id | string, nullable | software lesson id |
| module_id | string, nullable | `stats-module-4`, `rm-module-1` |
| objective_ids | JSONB | list of strings |
| is_correct | bool, nullable | null if unscored |
| answer | JSONB | raw answer (string, number, array, or object) |
| difficulty | string, nullable | easy / medium / hard |
| active_time_seconds, total_time_seconds | int, nullable | |
| time_maxed_out, idle_detected | bool, nullable | |
| time_to_first_selection, answer_changes | int, nullable | |
| time_since_reading, time_since_last_attempt | int, nullable | |
| has_read_topic_before | bool, nullable | |
| last_topic_read_time, last_attempt_time | int, nullable | |
| last_reading_max_scroll_depth | int, nullable | |
| last_reading_triggered_by_error | bool, nullable | |
| pL_before, pL_after | float, nullable | null for unscored and for backfilled history |
| prototype_id | int, nullable | winning prototype after this update |
| extra | JSONB, nullable | leftover payload (phase name, hint title, scroll, etc.) |
| created, updated | datetime | TimestampMixin |

Sources: `concept_review`, `software_selfcheck`, `software_youdo`, `software_wedo`, `software_hint`, `software_apply`, `software_phase`, `software_lesson_complete`, `topic_read`, `backfill_practice`, `backfill_software`, `backfill_reading`.

Register in `COLLECTION_MODELS` as `learning_events` with alias `user` → `user_id`. Students may create rows for themselves. Instructors/admins may list. Nobody updates or deletes via the API except admin.

### `bkt_prototypes`

| Column | Type |
|---|---|
| id | string PK |
| user_id | FK users |
| class_id | string(64) |
| probs | JSONB | length-5 list of floats summing ~1 |
| prototype_id | int | argmax |
| last_updated | datetime |
| unique (user_id, class_id) | |

Hydrate into the in-memory model on boot. Persist after every BKT update.

### Unchanged

- `bkt_states` unique `(user_id, objective_id)` — keep.
- `practice_attempts`, `software_lesson_metrics`, `topic_readings` — keep writing so current UI does not break. Paper dataset is `learning_events`.

## Write path

### Scored (updates BKT + event)

`POST /bkt/update` gains optional: `class_id`, `source`, `answer` (any JSON), `module_id`, `lesson_id`, `objective_ids`.

1. Infer `class_id`.
2. Read `pL_before` from current state (or 0.1 if new).
3. Run BKT using that class’s prototype vector.
4. Upsert `bkt_states` and `bkt_prototypes`.
5. Insert `learning_events` (pL before/after, answer, source default `concept_review`).
6. If event insert fails, still return the BKT response and log a warning. If BKT fails, still attempt the event insert with `pL_after` null.

Frontend: `useBKT.updateBKT` and `usePractice.submitAnswer` pass `source`, `answer`, `class_id` hint, `module_id`. Software Self-Check / You-Do pass `source` `software_selfcheck` / `software_youdo` and the given answer.

### Unscored (event only)

`pb.collection('learning_events').create(...)` from:

- TopicView `saveTopicReadingTime` (`source=topic_read`, extra includes scroll/idle).
- `useSoftwareLessonMetrics` after each existing metric (`software_hint`, `software_phase`, `software_apply`, `software_lesson_complete`, plus We-Do mapped to `software_wedo` if/when that event exists; phase `weDo` → `software_wedo`).

No BKT call.

## API

- `GET /student/profile/{user_id}?class_id=statistics` — default `statistics` if omitted.
- Neural and tabular `update(..., class_id=None)` and `get_student_profile(user_id, class_id=None)` must accept `class_id`. Tabular may ignore prototypes but must not TypeError.

## Exports (instructor, roster-filtered)

Three CSVs, `student_key` only:

1. **Events** — all `learning_events` columns except `user_id`. Filter by `class_id` and semester roster.
2. **Mastery** — `student_key, class_id, objective_id, pL, attempts, correct, incorrect, last_updated`.
3. **Prototypes** — `student_key, class_id, prototype_id, p0..p4` (or named columns).

Wire buttons on the instructor dashboard next to the existing mastery export.

## Backfill (one-shot script)

`backend/scripts/backfill_learning_events.py`:

- Copy `practice_attempts` → events with `source=backfill_practice`, class from problem id (`rm-m*` vs other). `pL_*` null. Skip if an event with same `user_id`, `item_id`, `created` already exists.
- Copy `software_lesson_metrics` → `backfill_software`.
- Copy `topic_readings` → `backfill_reading`.

Run manually after deploy, not on every boot.

## Failure / privacy

- Unsigned: no writes.
- Students cannot list other users’ events.
- Shared/publication CSVs: `student_key` only. DB retains user_id + answers for the researcher.
- Do not log passwords or auth tokens.

## Out of scope

- Railway deploy.
- Unsigned session capture.
- Cross-class mastery transfer (RM12 ↛ M4).
- Training a new neural net.
- Changing We-Do so it updates BKT.
