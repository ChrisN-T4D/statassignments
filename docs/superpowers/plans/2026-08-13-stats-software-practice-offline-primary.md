# Stats online/offline primary Implementation Plan

> **For agentic workers:** Inline execution in this session. Spec: `docs/superpowers/specs/2026-08-13-stats-software-practice-offline-primary-design.md`

**Goal:** PSYC 4213 students get an online/offline primary tag; Concept Review yields a Canvas slip; Software Practice You do is a recording uploaded to Canvas; weekly jamovi videos are replaced.

**Architecture:** Persist `access_mode` on roster (FastAPI/Postgres). Offline-primary UI prints packets and batch-scores Concept Review. Reuse Tools screen recorder. Canvas assignment copy and syllabus weights change in the same repo.

**Tech Stack:** Vue 3, FastAPI + Alembic, Canvas API scripts.

## Global Constraints

- PSYC 4213 / statistics class only. Do not change Research Methods flows.
- You do Canvas deliverable is the recording, not a slip.
- Concept Review Canvas deliverable is the slip.
- Reuse existing Tools recorder; do not host video in Methods Market.
- Student roster PATCH may only change `access_mode`.

## File map

- Create: `backend/alembic/versions/002_roster_access_mode.py`
- Create: `src/composables/useAccessMode.js`
- Create: `src/lib/conceptReviewScoring.js`
- Create: `src/lib/conceptReviewSlipStore.js`
- Create: `src/components/CompletionSlip.vue`
- Create: `src/components/ConceptReviewPrintPacket.vue`
- Create: `src/components/SoftwarePrintPacket.vue`
- Create: `scripts/sync-canvas-statistics-mm-assignments.mjs`
- Modify: `backend/db/models.py`, `backend/api/collections.py`
- Modify: `src/composables/useProfile.js`, `src/views/Profile.vue`, `src/views/InstructorDashboard.vue`
- Modify: `src/views/Practice.vue`, `src/views/ClassHome.vue`, `src/views/SoftwareLesson.vue`
- Modify: `scripts/canvas-student-getting-started-body.html`, `scripts/update-statistics-syllabus-fall2026.py`, `src/data/statisticsCanvasLinks.js`

## Tasks

1. Roster `access_mode` column + student-safe PATCH
2. Profile + instructor override UI
3. Completion slip + Concept Review print/batch
4. Software Practice print packet + You do recording copy
5. Class home CTAs for statistics
6. Canvas/syllabus/Getting Started copy + assignment sync script
