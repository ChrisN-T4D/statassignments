# Class Mastery Analytics & Export — Design

**Date:** 2026-08-21  
**Status:** Approved for planning  
**Scope:** Instructor Dashboard (`/instructor`) Analytics tab + Admin Dashboard (`/admin`) — frontend-only aggregation over existing PocketBase-compatible collections.

## Problem

1. Instructor Attempt / Summary / Quick Stats / At-Risk read the legacy `attempts` collection, while Concept Review writes `practice_attempts` (and Neural BKT writes `bkt_states` + `learning_events`). Analytics appears empty even when students are practicing.
2. There is no on-screen **class × module** view of overall mastery and per-objective performance (e.g. “How is the class doing on Module 1?”).
3. Export of collected research data is fragmented; Admin “Export All Data” does not dump database collections and Admin BKT Analytics shows only the logged-in admin’s personal states.

## Goals

- Show **overall module mastery** and **per-objective class stats** for a selected semester, class, and module.
- Wire default instructor analytics exports and stats to the collections students actually write.
- Provide one **Export all research data** action (multi-CSV) on Instructor and Admin.
- Keep privacy: exports use `student_key` only (no email / user id).

## Non-goals

- New backend aggregate API
- Student PII in exports
- Student×objective heatmaps
- Canvas grade sync
- Changing how BKT updates or Concept Review unlock thresholds

## Approach

**Frontend-only aggregation** in `useInstructorAnalytics.js` (and a small shared UI component reused by Instructor + Admin). Load claimed roster + `bkt_states` (and related collections for export), join with `src/data/objectives.js` via `classId` / `moduleId` / `objectiveId`.

## Definitions

| Term | Definition |
|------|------------|
| Claimed roster | Roster rows for the selected semester with a linked `user` |
| Mastered | `pL ≥ 0.90` (same as Concept Review unlock) |
| Avg mastery % (module) | Mean, over claimed students **who have at least one** `bkt_states` row for any objective in that module, of each student’s mean `pL` across that module’s objectives. Students with no BKT rows for the module are **excluded** from the mean but counted in denominator for “n with data / claimed”. |
| % module-ready | Share of **all** claimed students who have mastered ≥ **75%** of that module’s objectives (`pL ≥ 0.90`). Students with zero BKT activity on the module count as **not** ready. |
| Per-objective % mastered | Share of claimed roster with `pL ≥ 0.90` for that objective (no state ⇒ not mastered) |
| Per-objective avg pL | Mean `pL` among students who have a `bkt_states` row for that objective |
| Per-objective n | Count with a state / attempts for that objective; n mastered separately |

Class filter maps to objective `classId`: `statistics` vs `research-methods`. Module picker uses that class’s modules from content metadata / objectives.

## UI — Layout A

### Instructor Analytics tab

1. **Class Mastery** section (top of Analytics):
   - Filters: semester, class (Statistics / Research Methods), module, Load
   - Two cards: Avg mastery %; % module-ready (show `n with data / claimed`)
   - Table: Objective ID, short label/text, % mastered, avg pL, n with attempts, n mastered
   - **Export this module CSV** (aggregate rows for current filters)
2. **Export Data** block:
   - Attempt-level + Student Summary → read **`practice_attempts`**, join `user` → `student_key` via roster (semester filter when set)
   - Quick Stats / At-Risk → same source
   - Do not use legacy `attempts` in default UI (no Concept Review writer exists for it today)
3. Retain existing Mastery & Practice student rollup + research CSV buttons
4. Add primary **Export all research data** (sequential multi-CSV downloads; no new zip dependency)

### Admin

1. Reuse the same **Class Mastery** panel (new tab or section; prefer tab `Class Mastery` for discoverability)
2. **BKT Analytics**: stop calling personal `getAllBKTStates()` as the class view; redirect UX to Class Mastery (or embed the same panel). Migration-from-localStorage can remain as an admin utility if still useful, clearly labeled as personal/local only
3. **Datasets**: remove invalid collection options `courses`, `read_topics`; keep real `COLLECTION_MODELS` names
4. **Export All Data**: dump real DB collections (same multi-CSV set as instructor research export, or JSON per selected collections) — not only localStorage + static question banks

## Export all research data (file set)

Sequential downloads (one after another), filtered to claimed roster users for the selected semester (same mapping as existing `exportLearningEventsCSV` / `exportObjectiveMasteryCSV`):

1. `learning_events.csv` — existing event columns + `student_key`
2. `objective_mastery.csv` — per student × objective (`student_key`, `class_id`, `objective_id`, `pL`, attempts, …)
3. `practice_attempts.csv` — one row per Concept Review attempt: `student_key`, `problem`, `is_correct`, difficulty, time fields, `created` (no raw user id)
4. `software_lesson_metrics.csv` — `student_key` (empty if anonymous metric), `lesson_id`, `module`, `software`, `event_type`, payload summary, `created`
5. `bkt_prototypes.csv` — existing prototype export shape
6. `roster_keys.csv` — `bb_username`, `bb_id`, `student_key`, `class`, `claimed` (roster distribution file; not a learning log)

Omit collection rows whose `user` is not on the claimed roster for that semester. Do not include email or internal user id columns in any of these files.

## Architecture / components

| Unit | Responsibility |
|------|----------------|
| `useInstructorAnalytics.js` | Fetch/join/aggregate; CSV generators; export-all orchestrator; practice_attempts-based attempt stats |
| `ClassMasteryPanel.vue` (new) | Filters, cards, table, module CSV button; props/callbacks for semester list |
| `InstructorDashboard.vue` | Mount panel; wire export-all; update Attempt/Summary copy if needed |
| `Admin.vue` | Mount panel; fix Datasets list + Export All; fix BKT tab messaging |

No backend route changes required. Permissions already allow instructor/admin list of `bkt_states`, `practice_attempts`, `learning_events`, etc.

## Error handling

- Empty claimed roster → empty state: import roster / wait for claims
- Load/export failure on one collection → surface message; continue other files when exporting all
- Loading indicators on Load and Export all

## Testing (manual)

1. Signed-in instructor, semester with claimed students who have Concept Review activity: Class Mastery Module 1 shows non-zero cards/table; module CSV downloads
2. Quick Stats / Attempt CSV reflect `practice_attempts` counts (not stuck at zero when practice exists)
3. Export all produces the six CSVs with student_key columns only
4. Admin Class Mastery matches Instructor for same filters; Datasets no longer offers `courses`/`read_topics`; Export All includes DB data
5. Research Methods module filter shows `RM*` objectives only

## Success criteria

- Instructor can answer “How is the class doing on Module 1 overall and per objective?” without opening a spreadsheet
- Default analytics numbers match Concept Review activity
- One obvious path exports the research collections we collect
