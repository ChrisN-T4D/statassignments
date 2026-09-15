# Design: Capstone Worksheet Studio (PSYC 4223)

**Date:** 2026-09-15  
**Scope:** Fall 2026 PSYC 4223 Research Methods — Methods Market `/class/research-methods` plus Canvas course **2406**  
**Worksheets in scope:** Article Review and Problem Statement, Phase 3 Worksheet, Phase 4 Worksheet (Operationalization Exploration)

## Problem

Canvas holds three high-stakes capstone worksheets (200 + 100 + 200 pts). Methods Market today offers Assignment Help tips and chapter links only. Students fill static Word/PDF templates without:

- validation (original research vs review, design labels, hypothesis language),
- synthesis across articles,
- alignment between research question, methodology path, and operationalization,
- carry-forward from earlier capstone work (topic, article cards, problem statement).

The platform already has Concept Review, the sampling mini-lab, `CANVAS_METHOD_PATHS`, and the Data Analysis Helper — but nothing connects them to the student's own study.

## Goals

1. **Capstone Worksheet Studio** — interactive, formative workspaces for all three worksheets.
2. **One capstone project** per signed-in student: topic → article cards → problem statement → Phase 3 → Phase 4, persisted and reused.
3. **Rule-based validation** with chapter-linked feedback (no AI grading, no auto-submit to Canvas).
4. **Export for Canvas** — copy/paste or download text matching Canvas worksheet sections; PDFs still attach in Canvas.
5. **Canvas template sync** — Playwright scrape of Canvas 2406 wiki/assignment pages keeps field schemas current.

## Non-goals

- Grading in Methods Market or LTI submission to Canvas (Canvas remains gradebook).
- Storing article PDFs in Methods Market (students attach PDFs in Canvas only).
- AI summarization of papers (academic integrity risk).
- Group/shared capstone projects (groups share one IRB in Canvas; v1 is per-user draft).
- BKT updates from worksheet fields (optional later; not v1).
- Statistics class (`/class/statistics`) — Research Methods only.

## Approach (locked)

**B: Study Design Studio** — Methods Market is the thinking environment; Canvas is submission and grades. Build one `CapstoneWorkspace` shell with three worksheet modules sharing one persisted `capstone_projects` record.

---

## 1. Student experience

### 1.1 Entry points

| Entry | Route |
|-------|-------|
| Class nav | `/class/research-methods/capstone` |
| Assignment Help CTA | `/class/research-methods/capstone/:worksheetId` where `worksheetId` is `article-review`, `phase-3`, or `phase-4` |
| Fall schedule banner | Week-aware nudge on `ClassHome` when a worksheet due date is within 14 days |

### 1.2 Capstone hub

Single hub shows:

- Project topic (from Phase 1 workshop, editable)
- Progress chips: Article Review · Phase 3 · Phase 4
- **Alignment summary** (once Phase 3 data exists): green/yellow flags for question ↔ path ↔ hypothesis language
- Links to open each studio module

Unsigned users may explore with **localStorage** draft; sign-in prompt to persist across devices.

### 1.3 Worksheet modules

#### A. Article Review Studio (`article-review`)

**Due:** 2026-09-11 · 200 pts · 6–8 original-research articles

Per-article **card** fields (canonical; reconcile with Canvas scrape):

| Field | Type | Validation |
|-------|------|------------|
| `apaReference` | text | Non-empty; optional DOI paste → CrossRef APA draft |
| `doi` | text | Optional |
| `isOriginalResearch` | gate (4 booleans) | Method section? Empirical results? Not review/meta? Primary data? |
| `participants` | text | N + population + recruitment |
| `designType` | enum | `experimental`, `quasi_experimental`, `survey`, `correlational`, `qualitative`, `archival`, `mixed`, `other` |
| `designRationale` | text | Why this label fits the Method section |
| `variables` | list | `{ name, role, measurementLevel }` |
| `measures` | text | Instruments/scales/procedures |
| `keyFindings` | text | Main result + direction |
| `relevance` | enum + text | `supports` / `contradicts` / `gap` + explanation |
| `limitationsNoted` | text | Optional — authors' stated limits |

**Coverage dashboard** (≥3 cards):

- Count by design type
- Construct overlap
- Warnings: all same design, &lt;6 cards, any card failing original-research gate

**Problem statement builder:**

- Pull `relevance` snippets
- Prompts: agreement theme, contradiction, gap
- Scaffold template: "Although …, little is known about … in …"
- Output field: `problemStatement` (text)

**Export:** annotated bibliography block + problem statement (plain text / markdown).

#### B. Phase 3 Studio (`phase-3`)

**Due:** 2026-10-30 · 100 pts · submit with Phase 4

| Field | Type | Validation |
|-------|------|------------|
| `researchQuestion` | text | Testable; flag vague wording ("Does X affect people?") |
| `gapFromLitReview` | text | Pre-fill from `problemStatement` if present |
| `independentVariable` | text | |
| `dependentVariable` | text | |
| `additionalConstructs` | list | Covariates, mediators, etc. |
| `hypothesis` | text | Language linter vs chosen path (see §3) |
| `nullHypothesis` | text | Optional |
| `feasibility` | checklist | Participants accessible? Timeline fits semester? Ethics considered? |

**Chapter links:** Ch. 2, Ch. 4 (Assignment Help already maps these).

#### C. Phase 4 Studio (`phase-4`)

**Due:** 2026-10-30 · 200 pts · unlocks method-path guides

**Pathway table** — for each of `path-1-survey`, `path-2-qualitative`, `path-3-experimental`, `path-4-archival` (IDs from `CANVAS_METHOD_PATHS`):

| Column | Type |
|--------|------|
| `couldUseThisPath` | yes/no/unsure |
| `researchQuestionFit` | text |
| `ivDvSummary` | text |
| `samplingOrAssignment` | text |
| `measurementPlan` | text |
| `feasibilityThisSemester` | yes/no + note |

**Chosen path:** `chosenPathId` (one of four).

**Operationalization table** (Helpful Table digitized) — per construct:

| Column | Type |
|--------|------|
| `constructName` | text |
| `operationalDefinition` | text |
| `scaleOrInstrument` | text |
| `measurementLevel` | enum: nominal, ordinal, interval, ratio |
| `reliabilityEvidence` | text |
| `validityThreats` | text |
| `validityMitigation` | text |

Construct rows pre-seeded from Phase 3 IV/DV/list.

**Export:** pathway table summary + operationalization table for chosen path.

### 1.4 Alignment dashboard (hub + Phase 3/4 footers)

Rule-based flags (no ML):

| Rule | Flag |
|------|------|
| Phase 3 hypothesis uses causal verbs but `chosenPathId` ≠ experimental | Yellow |
| Phase 3 IV labeled "manipulated" but path is survey/archival | Yellow |
| Phase 4 chosen path `couldUseThisPath` was "no" in table | Red |
| Research question unchanged from problem statement with no refinement note | Yellow |
| &lt;6 article cards complete when opening Phase 3 | Info |

Each flag links to relevant Concept Review (`rm-module-2`, `rm-module-4`, `rm-module-5`, etc.).

---

## 2. Data model

### 2.1 `capstone_projects` (new Postgres table + PocketBase-compatible collection)

One row per `(user_id, class_id)` where `class_id = 'research-methods'`.

```json
{
  "id": "…",
  "user_id": "…",
  "class_id": "research-methods",
  "topic": "string",
  "searchTerms": ["string"],
  "articleCards": [ /* ArticleCard */ ],
  "problemStatement": "string",
  "phase3": { /* Phase3Fields */ },
  "phase4": {
    "pathwayRows": { "path-1-survey": {}, … },
    "chosenPathId": "path-3-experimental",
    "operationalizations": [ /* OpRow */ ]
  },
  "updated": "ISO datetime"
}
```

- **Autosave:** debounced PATCH on field blur (500ms), same pattern as profile updates.
- **Privacy:** student-owned; instructors do not read draft content in v1 (analytics counts only later).

### 2.2 Schema source of truth

`src/data/capstoneWorksheetSchemas.js` — field definitions, enums, validation messages, export section labels.

Regenerate or verify against Canvas via:

`scripts/fetch-canvas-rm-worksheets-playwright.mjs` → `scripts/canvas-rm-worksheet-fields.json`

Canvas course **2406** page slugs (initial guess; confirm on scrape):

| Worksheet | Likely Canvas slug |
|-----------|-------------------|
| Article Review | `article-review-and-problem-statement` or assignment description |
| Phase 3 | `phase-3-worksheet` |
| Phase 4 | `phase-4-worksheet` |
| Helpful Table | `helpful-table` |

---

## 3. Validation library

`src/lib/capstoneValidation.js` — pure functions, unit-tested:

- `checkOriginalResearchGate(card)` → `{ pass, failedGates[] }`
- `classifyDesignMismatch(card)` → compares `designType` vs free-text participants/measures
- `lintHypothesisLanguage(hypothesis, chosenPathId)` → causal verb list vs path
- `checkPhase34Alignment(phase3, phase4)` → alignment flags array
- `buildExportText(worksheetId, project)` → string for clipboard

Causal verb list (initial): `cause`, `causes`, `lead to`, `leads to`, `increase`, `decrease`, `effect on`, `affect` (contextual — experimental path allows).

---

## 4. UI architecture

```
src/views/CapstoneHub.vue
src/views/CapstoneWorksheet.vue          # router child; worksheetId prop
src/components/capstone/
  ArticleCardEditor.vue
  ArticleCoverageDashboard.vue
  ProblemStatementBuilder.vue
  Phase3Form.vue
  PathwayExplorer.vue
  OperationalizationTable.vue
  AlignmentFlags.vue
  CapstoneExportPanel.vue
src/composables/useCapstoneProject.js
src/data/capstoneWorksheetSchemas.js
src/lib/capstoneValidation.js
```

Reuse styling from `AssignmentHelpDetail.vue` and card patterns from `ExperimentalSamplingSimulation.vue` (section headings, hints, `details` for help).

---

## 5. Canvas / Playwright pipeline

Mirror `scripts/fetch-canvas-benchmark-study-guides-playwright.mjs`:

1. SSO bootstrap to NWOSU Instructure
2. Navigate course **2406** wiki pages for each worksheet
3. Extract headings and field labels from `.user_content`
4. Write `scripts/canvas-rm-worksheet-fields.json`
5. CI or manual `npm run verify:capstone-schemas` compares JSON to `capstoneWorksheetSchemas.js`

No runtime dependency on Playwright for students.

---

## 6. Phased delivery (Fall 2026)

| Phase | Ship by | Deliverable |
|-------|---------|-------------|
| **P0** | Before week 3 (Aug 31) | Schema scrape script + `capstone_projects` API + hub shell |
| **P1** | Week 3 workshop (Sep 4) | Article Review Studio + export |
| **P2** | Week 10 (Oct 19) | Phase 3 + Phase 4 studios + alignment dashboard |
| **P3** | After Phase 4 due | Lit review bridge (import article cards into Assignment Help for Draft 1) |

P1 is the classroom-critical path (Article Review due Sep 11).

---

## 7. Assignment Help integration

Extend `assignmentHelpResearchMethods.js` entries:

```js
{
  id: 'rm-article-review',
  studioPath: '/class/research-methods/capstone/article-review',
  studioLabel: 'Open Article Review Studio',
  …
}
```

`AssignmentHelpDetail.vue`: if `studioPath` present, show primary CTA above tips (same prominence as benchmark practice test).

---

## 8. Testing

| Layer | What |
|-------|------|
| `src/lib/capstoneValidation.test.js` | Vitest — all validation rules |
| `backend/tests/test_capstone_projects.py` | CRUD, auth (own row only), class_id filter |
| `scripts/verify-capstone-schemas.mjs` | Schema drift vs Canvas JSON |
| Manual | Export paste matches Canvas template sections |

---

## 9. Copy / pedagogy rules

- MM studio is **formative**; Canvas submission is **graded**. Say this on every export panel.
- Never show "submit to Canvas" button that implies auto-upload.
- Link to Pressbooks chapters via existing `practiceLinks` / `conceptReviewPathForTopicId`.
- No em dashes in student-facing copy (syllabus convention).

---

## 10. Success criteria

1. Signed-in student can complete all three worksheets in MM, export text, and paste into Canvas.
2. Article Review Studio flags a non-original source before export.
3. Phase 3/4 alignment flags fire on intentional test cases in unit tests.
4. Article cards populate Phase 3 gap and Phase 4 construct rows without re-entry.
5. Playwright scrape script runs on neu1 and produces field JSON for instructor review.
