# Capstone Study Plan Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a persisted **Study Plan** in Methods Market: article review cards, lit-review-era study focus notes, Phase 3 elevator speech (lit review + gap summary), and Phase 4 operationalization exploration — with resource links and Canvas export. MM guides; students think.

**Architecture:** `capstone_projects` JSONB row per user; routes under `/class/research-methods/study-plan`; minimal validation (export formatting + word-count hint only); Playwright syncs Canvas assignment 44935 for Phase 4 field labels. Phase 3 elevator speech is MM-authored. Reuse `METHOD_PATHS_LIST` and embedded `DataAnalysisHelper` for Phase 4.

**Tech Stack:** Vue 3, FastAPI, Postgres/Alembic, PocketBase-compatible API, Vitest, Playwright MCP (neu1, dev-only).

**Spec:** `docs/superpowers/specs/2026-09-15-capstone-worksheets-studio-design.md`

## Global Constraints

- Research Methods only: `class_id = 'research-methods'`, Canvas **2406**.
- **No** path recommendations, hypothesis linters, alignment auto-flags, AI prose, or pass/fail source gates.
- Source help = self-check checklists + links (Ch. 2, library, Canvas).
- Phase 3 = **elevator speech** (what we know, gap, study pitch) — **not** IV/DV/hypothesis; replaces legacy Canvas gap→RQ worksheet.
- Phase 4 schema mirrors Canvas assignment **44935** (Playwright); wiki phase pages are empty shells.
- Student copy: no em dashes; export panels say Canvas is graded, MM is draft workspace.
- Ship order: Article Review (P1) → Study focus (P1.5) → Phase 4 (P2) → Phase 3 elevator speech (P2-light).

---

## File map

| File | Responsibility |
|------|----------------|
| `src/data/capstoneArticleReviewWorksheet.js` | Article review fields from Canvas PDF |
| `src/data/capstonePhase3Worksheet.js` | Phase 3 elevator speech (MM-authored) |
| `src/data/capstonePhase4Worksheet.js` | Phase 4 Parts A–E from Canvas assignment 44935 |
| `src/data/capstoneWorksheetSchemas.js` | Study focus, `emptyCapstoneProject()`, export aggregator |
| `src/lib/capstoneValidation.js` | `buildExportText`, `elevatorSpeechWordCount` only |
| `src/lib/capstoneValidation.test.js` | Export + word count tests |
| `src/composables/useCapstoneProject.js` | Load/save/autosave |
| `src/views/StudyPlanHub.vue` | Hub |
| `src/views/StudyPlanSection.vue` | Section router |
| `src/components/study-plan/*.vue` | Section UIs |
| `src/router/index.js` | Routes |
| `backend/` | `capstone_projects` model + migration + tests |
| `scripts/fetch-canvas-rm-assignment-instructions.mjs` | Phase 4 assignment scrape (+ legacy 44903 for drift) |
| `scripts/fetch-canvas-rm-worksheets-playwright.mjs` | Wiki pages (helpful-table, path guides) |
| `src/data/assignmentHelpResearchMethods.js` | Phase 3/4 tips + `studyPlanPath` CTAs |

---

### Task 1: Schemas and export helpers

**Files:**
- Existing: `src/data/capstonePhase3Worksheet.js`, `src/data/capstonePhase4Worksheet.js`
- Create: `src/data/capstoneWorksheetSchemas.js`
- Create: `src/lib/capstoneValidation.js`
- Create: `src/lib/capstoneValidation.test.js`

**Interfaces:**
- `emptyCapstoneProject()` includes `studyFocus` and `phase3: { whatWeKnow, theGap, myStudyPitch, elevatorSpeech }`
- `buildExportText('article-review' | 'study-focus' | 'phase-3' | 'phase-4', project)`
- `elevatorSpeechWordCount(text) => number`

- [ ] **Step 1:** Wire `capstoneWorksheetSchemas.js` to import phase 3/4 schemas and study focus fields.
- [ ] **Step 2:** Implement `buildExportText` for phase-3 with headings: What we know / The gap / My study / Full elevator speech; phase-4 Parts A–E.
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

**Components:** `ArticleCardEditor.vue`, `SourceSelfCheck.vue`, `ProblemStatementForm.vue`, `RqHypothesisForm.vue`, `StudyPlanExportPanel.vue`

- [ ] Header: name + proposed project title.
- [ ] Eight article slots using `ARTICLE_CARD_FIELDS` from `capstoneArticleReviewWorksheet.js` (what/why/participants/methodology/results/strengths/weaknesses/connection + optional comments).
- [ ] Per-card source self-check (MM-only) with Ch. 2 / Ch. 11 links.
- [ ] Problem statement: four fields matching worksheet (what we know / don’t know / want to know / combined).
- [ ] Research questions + hypotheses (early draft fields on same assignment).
- [ ] Export full worksheet in Canvas field order for paste.
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

### Task 7: Phase 4 operationalization exploration (P2)

**Components:** `Phase4PathwayExplorer.vue`, `Phase4ComparisonTable.vue`

- [ ] Parts A–B recap; prefill `proposedResearchQuestion` from `studyFocus.workingResearchQuestion`.
- [ ] Part C: four pathway forms from `PHASE4_PATHWAYS`; `notViable` toggle; links to Canvas path guides + chapters.
- [ ] Part D: comparison table from `PHASE4_COMPARISON_CRITERIA`; link to Helpful Table wiki.
- [ ] Part E: `chosenPathwayId` radio; embed `DataAnalysisHelper` with matching `methodPathId`.
- [ ] Export Parts A–E for Canvas paste.
- [ ] Commit `feat: phase 4 study plan section`.

---

### Task 8: Phase 3 elevator speech (P2-light)

**Component:** `ElevatorSpeechForm.vue`

- [ ] Fields: `whatWeKnow`, `theGap`, `myStudyPitch`, `elevatorSpeech`.
- [ ] Read-only sidebar: `problemStatement`, `studyFocus.workingGap`.
- [ ] Word-count hint (~150–250 words); link Ch. 2.
- [ ] Export for Canvas Phase 3 worksheet.
- [ ] Assignment Help Phase 3 tips describe elevator speech, not IV/DV.
- [ ] Commit `feat: phase 3 elevator speech section`.

---

### Task 9: Playwright scrape and schema verify

- [ ] `fetch-canvas-rm-assignment-instructions.mjs` — assignments 44898, 44903, 44935.
- [ ] `fetch-canvas-rm-worksheets-playwright.mjs` — helpful-table + path guide wiki pages.
- [ ] `verify-capstone-schemas.mjs` — confirm Phase 4 `exportLabel`s match assignment scrape; Phase 3 is MM-authored.
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
| Phase 4 from Canvas assignment 44935 | 7 |
| No auto-thinking features | Global Constraints |
| Guide-only pedagogy | 5, 6, 7, 8 |

---

## Execution handoff

Plan saved. Choose subagent-driven or inline execution when ready to build.
