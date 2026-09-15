# Capstone Worksheet Studio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build interactive Article Review, Phase 3, and Phase 4 worksheet studios in Methods Market with one persisted capstone project per student, rule-based validation, and Canvas-ready export.

**Architecture:** New `capstone_projects` JSONB-backed row per user; Vue hub + three worksheet views; pure validation module; Playwright script syncs field labels from Canvas 2406. Canvas stays gradebook; MM is formative only.

**Tech Stack:** Vue 3, FastAPI, Postgres/Alembic, PocketBase-compatible `/api/collections`, Vitest, Playwright MCP (neu1, dev-only).

**Spec:** `docs/superpowers/specs/2026-09-15-capstone-worksheets-studio-design.md`

## Global Constraints

- Research Methods class only: `class_id = 'research-methods'`, Canvas course **2406**.
- No grading, PDF storage, AI summarization, or Canvas auto-submit in v1.
- Student-facing copy: no em dashes; formative vs graded distinction on every export panel.
- Follow existing patterns: `pb.collection()` CRUD, Alembic migration, `backend/db/permissions.py` user-scoped access.
- Ship **Article Review Studio (P1)** before **Phase 3/4 (P2)** per Fall 2026 calendar.

---

## File map

| File | Responsibility |
|------|----------------|
| `src/data/capstoneWorksheetSchemas.js` | Field defs, enums, export section labels |
| `src/lib/capstoneValidation.js` | Pure validation + export text builders |
| `src/lib/capstoneValidation.test.js` | Vitest |
| `src/composables/useCapstoneProject.js` | Load/save/autosave capstone project |
| `src/views/CapstoneHub.vue` | Hub + alignment summary |
| `src/views/CapstoneWorksheet.vue` | Worksheet router shell |
| `src/components/capstone/*.vue` | Worksheet UI pieces |
| `src/router/index.js` | Routes |
| `backend/db/models.py` | `CapstoneProject` model |
| `backend/alembic/versions/006_capstone_projects.py` | Migration |
| `backend/db/permissions.py` | Collection rules |
| `backend/tests/test_capstone_projects.py` | API tests |
| `scripts/fetch-canvas-rm-worksheets-playwright.mjs` | Canvas field scrape |
| `scripts/verify-capstone-schemas.mjs` | Drift check |
| `scripts/canvas-rm-worksheet-fields.json` | Scraped labels (committed after first run) |

---

### Task 1: Worksheet schemas and validation (no backend)

**Files:**
- Create: `src/data/capstoneWorksheetSchemas.js`
- Create: `src/lib/capstoneValidation.js`
- Create: `src/lib/capstoneValidation.test.js`
- Modify: `package.json` (add vitest script if missing)

**Interfaces:**
- Produces: `DESIGN_TYPES`, `MEASUREMENT_LEVELS`, `PATH_IDS`, `ARTICLE_CARD_FIELDS`, `PHASE3_FIELDS`, `PHASE4_PATHWAY_COLUMNS`, `OPERATIONALIZATION_COLUMNS`
- Produces: `emptyArticleCard()`, `emptyCapstoneProject()`, `checkOriginalResearchGate(card)`, `lintHypothesisLanguage(hypothesis, pathId)`, `checkPhase34Alignment(phase3, phase4, chosenPathId)`, `buildExportText(worksheetId, project)`

- [ ] **Step 1: Add vitest if not present**

In `package.json` devDependencies add `"vitest": "^2.0.0"` and script `"test:unit": "vitest run"`.

- [ ] **Step 2: Create `capstoneWorksheetSchemas.js`**

```javascript
export const PATH_IDS = ['path-1-survey', 'path-2-qualitative', 'path-3-experimental', 'path-4-archival']

export const DESIGN_TYPES = [
  'experimental', 'quasi_experimental', 'survey', 'correlational',
  'qualitative', 'archival', 'mixed', 'other'
]

export const MEASUREMENT_LEVELS = ['nominal', 'ordinal', 'interval', 'ratio']

export function emptyArticleCard () {
  return {
    id: crypto.randomUUID(),
    apaReference: '',
    doi: '',
    originalResearchGates: { hasMethod: false, hasResults: false, notReview: false, primaryData: false },
    participants: '',
    designType: '',
    designRationale: '',
    variables: [],
    measures: '',
    keyFindings: '',
    relevanceType: '',
    relevanceNote: '',
    limitationsNoted: ''
  }
}

export function emptyCapstoneProject () {
  const pathwayRows = {}
  for (const id of PATH_IDS) {
    pathwayRows[id] = {
      couldUseThisPath: '',
      researchQuestionFit: '',
      ivDvSummary: '',
      samplingOrAssignment: '',
      measurementPlan: '',
      feasibilityThisSemester: '',
      feasibilityNote: ''
    }
  }
  return {
    topic: '',
    searchTerms: [],
    articleCards: [],
    problemStatement: '',
    phase3: {
      researchQuestion: '',
      gapFromLitReview: '',
      independentVariable: '',
      dependentVariable: '',
      additionalConstructs: [],
      hypothesis: '',
      nullHypothesis: '',
      feasibility: { participantsAccessible: false, timelineFits: false, ethicsConsidered: false }
    },
    phase4: { pathwayRows, chosenPathId: '', operationalizations: [] }
  }
}
```

- [ ] **Step 3: Create `capstoneValidation.js` with gates, linter, export**

Implement functions from spec §3. `buildExportText('article-review' | 'phase-3' | 'phase-4', project)` returns plain-text sections matching Canvas worksheet headings.

- [ ] **Step 4: Write tests**

```javascript
import { describe, it, expect } from 'vitest'
import { checkOriginalResearchGate, lintHypothesisLanguage } from './capstoneValidation.js'

describe('checkOriginalResearchGate', () => {
  it('fails when Method gate unchecked', () => {
    const card = { originalResearchGates: { hasMethod: false, hasResults: true, notReview: true, primaryData: true } }
    expect(checkOriginalResearchGate(card).pass).toBe(false)
  })
})

describe('lintHypothesisLanguage', () => {
  it('flags causal language on survey path', () => {
    const r = lintHypothesisLanguage('X causes Y', 'path-1-survey')
    expect(r.flags.length).toBeGreaterThan(0)
  })
})
```

- [ ] **Step 5: Run tests**

```bash
cd /home/chris/cursor-workers/statassignments && npm run test:unit
```

Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/data/capstoneWorksheetSchemas.js src/lib/capstoneValidation.js src/lib/capstoneValidation.test.js package.json package-lock.json
git commit -m "feat(rm): capstone worksheet schemas and validation"
```

---

### Task 2: Backend `capstone_projects` collection

**Files:**
- Create: `backend/alembic/versions/006_capstone_projects.py`
- Modify: `backend/db/models.py`
- Modify: `backend/db/permissions.py`
- Create: `backend/tests/test_capstone_projects.py`

**Interfaces:**
- Produces: PocketBase collection `capstone_projects` with unique `(user_id, class_id)`; JSONB column `payload` holding project object from `emptyCapstoneProject()`.

- [ ] **Step 1: Alembic migration**

```python
def upgrade():
    op.create_table(
        "capstone_projects",
        sa.Column("id", sa.String(32), primary_key=True),
        sa.Column("user_id", sa.String(32), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("class_id", sa.String(64), nullable=False),
        sa.Column("payload", postgresql.JSONB(), nullable=False),
        sa.Column("created", sa.DateTime(), nullable=False),
        sa.Column("updated", sa.DateTime(), nullable=False),
    )
    op.create_index("ix_capstone_projects_user_id", "capstone_projects", ["user_id"])
    op.create_unique_constraint("uq_capstone_projects_user_class", "capstone_projects", ["user_id", "class_id"])
```

- [ ] **Step 2: SQLAlchemy model** — mirror `FeedbackReport` pattern; register in `COLLECTION_MODELS`.

- [ ] **Step 3: Permissions** — user can CRUD own rows only; filter `class_id` on list.

- [ ] **Step 4: Tests** — create, update payload, 403 on other user's row:

```python
def test_capstone_project_crud(client, student_token):
    r = client.post("/api/collections/capstone_projects/records", json={
        "class_id": "research-methods",
        "payload": {"topic": "sleep", "articleCards": []}
    }, headers=auth(student_token))
    assert r.status_code == 200
```

- [ ] **Step 5: Run pytest**

```bash
cd backend && pytest tests/test_capstone_projects.py -v
```

- [ ] **Step 6: Commit**

```bash
git commit -m "feat(backend): capstone_projects collection"
```

---

### Task 3: `useCapstoneProject` composable

**Files:**
- Create: `src/composables/useCapstoneProject.js`

**Interfaces:**
- Consumes: `pb.collection('capstone_projects')`, `emptyCapstoneProject()` from schemas
- Produces: `{ project, loading, error, load(), saveDebounced(), ensureCard(), removeCard() }`

- [ ] **Step 1: Implement load** — `getList` filter `user = $userId` and `class_id = research-methods`; if none, create with `emptyCapstoneProject()`.

- [ ] **Step 2: Implement debounced save** — 500ms debounce on `payload` merge; PATCH existing record.

- [ ] **Step 3: localStorage fallback** — key `capstone-draft-research-methods` when not signed in; merge prompt on sign-in.

- [ ] **Step 4: Commit**

```bash
git commit -m "feat: useCapstoneProject composable"
```

---

### Task 4: Routes and Capstone hub shell

**Files:**
- Create: `src/views/CapstoneHub.vue`
- Create: `src/views/CapstoneWorksheet.vue` (placeholder tabs)
- Modify: `src/router/index.js`
- Modify: `src/views/ClassHome.vue` (nav link for RM class)

**Interfaces:**
- Routes:
  - `/class/:classId/capstone` → `CapstoneHub`
  - `/class/:classId/capstone/:worksheetId` → `CapstoneWorksheet` (`article-review` | `phase-3` | `phase-4`)

- [ ] **Step 1: Add routes** with `meta: { requiresAuth: true }`; guard `classId === 'research-methods'`.

- [ ] **Step 2: CapstoneHub** — topic field, three progress cards linking to worksheets, alignment flags when `phase3` + `phase4.chosenPathId` exist (call `checkPhase34Alignment`).

- [ ] **Step 3: ClassHome** — add "Capstone Studio" nav item when `isResearchMethodsClass`.

- [ ] **Step 4: Manual smoke** — `npm run dev`, visit `/class/research-methods/capstone`.

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: capstone hub routes and shell"
```

---

### Task 5: Article Review Studio (P1 — ship first)

**Files:**
- Create: `src/components/capstone/ArticleCardEditor.vue`
- Create: `src/components/capstone/ArticleCoverageDashboard.vue`
- Create: `src/components/capstone/ProblemStatementBuilder.vue`
- Create: `src/components/capstone/CapstoneExportPanel.vue`
- Modify: `src/views/CapstoneWorksheet.vue`

- [ ] **Step 1: ArticleCardEditor** — one card form with original-research gate checkboxes, design type `<select>`, relevance type radio, live `checkOriginalResearchGate` banner.

- [ ] **Step 2: Card list** — add/remove cards; min 6 reminder; duplicate APA warning.

- [ ] **Step 3: Coverage dashboard** — design type counts, construct list, warnings from spec §1.3A.

- [ ] **Step 4: Problem statement builder** — three prompts + scaffold textarea; write to `project.problemStatement`.

- [ ] **Step 5: CapstoneExportPanel** — `buildExportText('article-review', project)`, Copy button, formative disclaimer.

- [ ] **Step 6: Optional DOI helper** — if `doi` filled, `fetch(https://api.crossref.org/works/${doi})` populate `apaReference` draft (student confirms). Graceful fail offline.

- [ ] **Step 7: Commit**

```bash
git commit -m "feat: article review studio"
```

---

### Task 6: Phase 3 Studio

**Files:**
- Create: `src/components/capstone/Phase3Form.vue`
- Modify: `src/views/CapstoneWorksheet.vue`

- [ ] **Step 1: Pre-fill** `gapFromLitReview` from `problemStatement` when empty.

- [ ] **Step 2: Phase3Form** — all Phase 3 fields; feasibility checklist.

- [ ] **Step 3: Hypothesis linter** — show `lintHypothesisLanguage` warnings (path from `phase4.chosenPathId` if set, else info-only).

- [ ] **Step 4: Export** — `buildExportText('phase-3', project)` in CapstoneExportPanel.

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: phase 3 worksheet studio"
```

---

### Task 7: Phase 4 Studio (pathway + operationalization)

**Files:**
- Create: `src/components/capstone/PathwayExplorer.vue`
- Create: `src/components/capstone/OperationalizationTable.vue`
- Modify: `src/views/CapstoneWorksheet.vue`

- [ ] **Step 1: PathwayExplorer** — 4 tabs from `METHOD_PATHS_LIST` in `researchMethodsTextbook.js`; one row set per path from `phase4.pathwayRows`.

- [ ] **Step 2: Path chooser** — radio `chosenPathId`; link to `CANVAS_METHOD_PATHS[id].moduleIds` Concept Review.

- [ ] **Step 3: OperationalizationTable** — seed rows from Phase 3 IV/DV/`additionalConstructs`; editable Helpful Table columns.

- [ ] **Step 4: Export** — `buildExportText('phase-4', project)`.

- [ ] **Step 5: Commit**

```bash
git commit -m "feat: phase 4 pathway and operationalization studio"
```

---

### Task 8: Alignment dashboard component

**Files:**
- Create: `src/components/capstone/AlignmentFlags.vue`
- Modify: `src/views/CapstoneHub.vue`, `src/views/CapstoneWorksheet.vue` (phase-3/4 footers)

- [ ] **Step 1: AlignmentFlags** — render flags from `checkPhase34Alignment`; each flag links to `conceptReviewPathForTopicId`.

- [ ] **Step 2: Wire on hub and Phase 3/4 pages.**

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: capstone alignment flags"
```

---

### Task 9: Assignment Help integration

**Files:**
- Modify: `src/data/assignmentHelpResearchMethods.js`
- Modify: `src/views/AssignmentHelpDetail.vue`

- [ ] **Step 1: Add `studioPath` + `studioLabel`** to `rm-article-review`, `rm-phase-3-worksheet`, `rm-phase-4-worksheet`.

- [ ] **Step 2: AssignmentHelpDetail** — primary CTA button when `assignment.studioPath` set (research-methods only).

- [ ] **Step 3: Commit**

```bash
git commit -m "feat: assignment help links to capstone studio"
```

---

### Task 10: Playwright Canvas scrape + schema verify

**Files:**
- Create: `scripts/fetch-canvas-rm-worksheets-playwright.mjs`
- Create: `scripts/verify-capstone-schemas.mjs`
- Create: `scripts/canvas-rm-worksheet-fields.json` (placeholder until scrape runs)
- Modify: `package.json` scripts

- [ ] **Step 1: Playwright script** — course `2406`, pages for article review, phase 3, phase 4, helpful table; extract `h2/h3` + following list items to JSON.

- [ ] **Step 2: verify script** — compare JSON field labels to `capstoneWorksheetSchemas.js` export section keys; exit 1 on drift.

- [ ] **Step 3: npm scripts**

```json
"fetch:canvas-rm-worksheets": "node scripts/fetch-canvas-rm-worksheets-playwright.mjs",
"verify:capstone-schemas": "node scripts/verify-capstone-schemas.mjs"
```

- [ ] **Step 4: Run verify locally** (placeholder JSON passes or warns "not scraped yet").

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: canvas rm worksheet scrape and schema verify"
```

---

### Task 11: Fall schedule nudge on ClassHome

**Files:**
- Modify: `src/views/ClassHome.vue`
- Uses: `ASSIGNMENT_DEADLINES` from `fall2026ResearchMethodsSchedule.js`

- [ ] **Step 1: Banner** — if today within 14 days of `rm-article-review`, `rm-phase-3-worksheet`, or `rm-phase-4-worksheet` due, show link to matching `capstone/:worksheetId`.

- [ ] **Step 2: Commit**

```bash
git commit -m "feat: capstone due-date nudges on class home"
```

---

### Task 12: Documentation and memory

**Files:**
- Modify: `docs/METHODOLOGY.md` (§1.1 add Capstone Studio bullet)
- Modify: `$CURSOR_MEMORY/statassignments/CONTEXT.md` (changelog row)

- [ ] **Step 1: METHODOLOGY** — one paragraph on formative capstone workspaces.

- [ ] **Step 2: cursor-memory** — note routes, collection name, Fall 2026 ship order.

- [ ] **Step 3: Commit**

```bash
git commit -m "docs: capstone worksheet studio"
```

---

## Self-review (plan vs spec)

| Spec requirement | Task |
|------------------|------|
| Article Review cards + coverage + problem statement | Task 5 |
| Phase 3 fields + hypothesis linter | Task 6 |
| Phase 4 pathway table + operationalization | Task 7 |
| Alignment dashboard | Task 8 |
| Persisted capstone project | Tasks 2–3 |
| Export for Canvas | Tasks 5–7 (CapstoneExportPanel) |
| Playwright scrape | Task 10 |
| Assignment Help CTAs | Task 9 |
| P1 before P2 delivery order | Tasks 5 before 6–7 |
| No grading / no PDF in MM | Global Constraints |
| localStorage unsigned fallback | Task 3 |

No placeholders remain in task steps above.

---

## Execution handoff

**Plan complete and saved to `docs/superpowers/plans/2026-09-15-capstone-worksheets-studio.md`.**

**Two execution options:**

1. **Subagent-Driven (recommended)** — fresh subagent per task, review between tasks
2. **Inline Execution** — run tasks in-session with executing-plans checkpoints

**Which approach?**
