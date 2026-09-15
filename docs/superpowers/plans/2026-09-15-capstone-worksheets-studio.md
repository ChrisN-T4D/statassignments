# Capstone Study Plan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a persisted **Study Plan** in Methods Market: article review cards, lit-review-era study focus notes, Phase 3 elevator speech (lit review + gap summary), and Phase 4 pathway/operationalization — with resource links and Canvas export. MM guides; students think.

**Architecture:** `capstone_projects` JSONB row per user; routes under `/class/research-methods/study-plan`; minimal validation (export formatting + word-count hint only); Playwright syncs Canvas field labels. Reuse `METHOD_PATHS_LIST` and embedded `DataAnalysisHelper` for Phase 4.

**Tech Stack:** Vue 3, FastAPI, Postgres/Alembic, PocketBase-compatible API, Vitest, Playwright MCP (neu1, dev-only).

**Spec:** `docs/superpowers/specs/2026-09-15-capstone-worksheets-studio-design.md`

## Global Constraints

- Research Methods only: `class_id = 'research-methods'`, Canvas **2406**.
- **No** path recommendations, hypothesis linters, alignment auto-flags, AI prose, or pass/fail source gates.
- Source help = self-check checklists + links (Ch. 2, library, Canvas).
- Phase 3 = **elevator speech** (what we know, gap, study pitch) — **not** IV/DV/hypothesis.
- Student copy: no em dashes; export panels say Canvas is graded, MM is draft workspace.
- Ship order: Article Review (P1) → Study focus (P1.5) → Phase 4 (P2) → Phase 3 elevator speech (P2-light).

---

## File map

| File | Responsibility |
|------|----------------|
| `src/data/capstoneWorksheetSchemas.js` | Fields, enums, export labels |
| `src/lib/capstoneValidation.js` | `buildExportText`, `elevatorSpeechWordCount` only |
| `src/lib/capstoneValidation.test.js` | Export + word count tests |
| `src/composables/useCapstoneProject.js` | Load/save/autosave |
| `src/views/StudyPlanHub.vue` | Hub |
| `src/views/StudyPlanSection.vue` | Section router |
| `src/components/study-plan/*.vue` | Section UIs |
| `src/router/index.js` | Routes |
| `backend/` | `capstone_projects` model + migration + tests |
| `scripts/fetch-canvas-rm-worksheets-playwright.mjs` | Canvas scrape |
| `src/data/assignmentHelpResearchMethods.js` | Updated Phase 3 tips + `studyPlanPath` CTAs |

---

### Task 1: Schemas and export helpers

**Files:**
- Create: `src/data/capstoneWorksheetSchemas.js`
- Create: `src/lib/capstoneValidation.js`
- Create: `src/lib/capstoneValidation.test.js`

**Interfaces:**
- `emptyCapstoneProject()` includes `studyFocus` and `phase3: { whatWeKnow, theGap, myStudyPitch, elevatorSpeech }`
- `buildExportText('article-review' | 'study-focus' | 'phase-3' | 'phase-4', project)`
- `elevatorSpeechWordCount(text) => number`

- [ ] **Step 1:** Implement schemas per spec §2.1 (article card with `sourceChecklist` booleans, not gates).
- [ ] **Step 2:** Implement `buildExportText` for phase-3 with headings: What we know / The gap / My study / Full elevator speech.
- [ ] **Step 3:** Vitest: export includes all phase3 fields; word count on sample text.
- [ ] **Step 4:** `npm run test:unit` passes.
- [ ] **Step 5:** Commit `feat(rm): study plan schemas and export helpers`.

---

### Task 2: Backend `capstone_projects`

Same as prior plan: Alembic `006`, model, permissions, `test_capstone_projects.py`. Payload stores full project JSON from Task 1.

- [ ] Commit `feat(backend): capstone_projects collection`.

---

### Task 3: `useCapstoneProject` composable

- [ ] Load/create/save with debounce; localStorage fallback when signed out.
- [ ] Commit `feat: useCapstoneProject composable`.

---

### Task 4: Routes and Study Plan hub

**Routes:**
- `/class/:classId/study-plan`
- `/class/:classId/study-plan/:sectionId` (`article-review`, `study-focus`, `phase-3`, `phase-4`)

- [ ] `StudyPlanHub.vue` — topic, four section chips, no alignment dashboard.
- [ ] `ClassHome.vue` — "Study Plan" nav for research-methods.
- [ ] Commit `feat: study plan hub and routes`.

---

### Task 5: Article Review section (P1)

**Components:** `ArticleCardEditor.vue`, `SourceChecklist.vue`, `StudyPlanExportPanel.vue`

- [ ] Card fields + per-card source checklist with resource links (Ch. 2).
- [ ] Problem statement field (blank + prompt only).
- [ ] Factual card count display.
- [ ] Export annotated bib + problem statement.
- [ ] Commit `feat: article review study plan section`.

---

### Task 6: Study focus section (P1.5)

**Component:** `StudyFocusNotes.vue`

- [ ] Fields: `workingGap`, `workingResearchQuestion`, `litReviewThemes`, `sourcesToCite`.
- [ ] Links to Ch. 2, Ch. 11, Canvas lit review checklist.
- [ ] Assignment Help: add `studyPlanPath` on `rm-lit-review-draft-1` and `rm-lit-review-final`.
- [ ] `AssignmentHelpDetail.vue`: CTA when `studyPlanPath` set.
- [ ] Commit `feat: study focus notes and lit review links`.

---

### Task 7: Phase 4 pathway and operationalization (P2)

**Components:** `PathwayTable.vue`, `OperationalizationTable.vue`

- [ ] Pathway columns from `METHOD_PATHS_LIST`; each cell has chapter/path-guide links.
- [ ] `chosenPathId` radio; embed `DataAnalysisHelper` with `methodPathId`.
- [ ] Operationalization table; empty construct rows optional from study focus (names only).
- [ ] Export pathway + ops table.
- [ ] Commit `feat: phase 4 study plan section`.

---

### Task 8: Phase 3 elevator speech (P2-light)

**Component:** `ElevatorSpeechForm.vue`

- [ ] Fields: `whatWeKnow`, `theGap`, `myStudyPitch`, `elevatorSpeech`.
- [ ] Read-only sidebar: `problemStatement`, `studyFocus.workingGap`.
- [ ] Word-count hint (~150–250 words); link Ch. 2.
- [ ] Export for Canvas Phase 3 worksheet.
- [ ] Update `assignmentHelpResearchMethods.js` Phase 3 tips (elevator speech, not IV/DV).
- [ ] Commit `feat: phase 3 elevator speech section`.

---

### Task 9: Playwright scrape and schema verify

- [ ] `fetch-canvas-rm-worksheets-playwright.mjs` for course 2406.
- [ ] `verify-capstone-schemas.mjs` — confirm Phase 3 export headings match Canvas after instructor updates assignment text to elevator speech format.
- [ ] Commit `chore: canvas rm worksheet scrape`.

---

### Task 10: Due-date nudges and docs

- [ ] `ClassHome` banner within 14 days of worksheet dues → correct study-plan section.
- [ ] `docs/METHODOLOGY.md` one paragraph on Study Plan.
- [ ] Commit `docs: study plan`.

---

## Self-review

| Spec requirement | Task |
|----------------|------|
| Article cards + source checklists | 5 |
| Study focus during lit review | 6 |
| Phase 3 elevator speech | 8 |
| Phase 4 pathway + reuse path infra | 7 |
| No auto-thinking features | Global Constraints |
| Guide-only pedagogy | 5, 6, 8 |

---

## Execution handoff

Plan saved. Choose subagent-driven or inline execution when ready to build.
