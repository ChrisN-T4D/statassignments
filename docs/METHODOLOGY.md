# Methods Market — Methodology Documentation

This document describes the educational methodology, content provenance, technical architecture, and Bayesian Knowledge Tracing (BKT) implementation used by **Methods Market** (repository: `statassignments`), an adaptive learning platform for undergraduate psychology statistics and research methods.

**Audience:** instructors, researchers, developers, and students who want a technical account of how the platform works.  
**Student-facing summary:** see the in-app [About page](../src/views/About.vue) (`/about`).

---

## 1. Platform Overview

### 1.1 Purpose

Methods Market delivers mastery-based instruction for two course tracks:

| Course | Class ID | Modules | Primary textbook |
|--------|----------|---------|------------------|
| **PSYC 4213 Statistics** | `statistics` | `stats-module-1` … `stats-module-8` | *Learning Statistics with jamovi* (Navarro & Foxcroft) |
| **PSYC 4223 Research Methods** | `research-methods` | `rm-module-1` … `rm-module-13` (+ lab) | *Research Methods in Psychology*, 4th ed. (Jhangiani et al.) |

The platform combines:

- **Topic reading** — HTML lessons adapted from open textbooks, with per-software variants (jamovi, SPSS, R, Stata, Excel)
- **Concept Review** — auto-scored conceptual questions mapped to learning objectives
- **Software Practice** — guided click-path exercises in statistical software
- **Assignment Help** — Canvas workflow guidance and data-analysis recipes
- **Adaptive mastery tracking** — BKT estimates per learning objective (knowledge component)

### 1.2 Pedagogical Philosophy

Methods Market implements **mastery-based learning**: progress is tied to demonstrated understanding, not seat time or arbitrary point thresholds. The system:

1. Defines fine-grained **learning objectives** (knowledge components, KCs) per module
2. Maps every assessment item to one or more objectives
3. Updates a **mastery probability** P(L) after each response using BKT
4. Uses mastery to **unlock downstream activities** (e.g., Concept Review completion gates assignment slips in Statistics)
5. **Adapts question selection** toward objectives with lowest estimated mastery

This design follows intelligent tutoring system (ITS) principles (Corbett & Anderson, 1995; VanLehn, 2011) adapted for a single-semester undergraduate context with 5–15 attempts per KC per student.

---

## 2. Sources of Information

### 2.1 Primary Textbooks

#### Statistics — *Learning Statistics with jamovi*

| Field | Value |
|-------|-------|
| Authors | Danielle Navarro & David Foxcroft |
| License | CC BY-SA 4.0 |
| Web | https://www.learnstatswithjamovi.com/ |
| Alt URL | https://davidfoxcroft.github.io/lsj-book/ |
| Code reference | `src/data/modules.js`, `src/content/topics/` |

Module structure in `src/data/modules.js` maps each `stats-module-N` to jamovi textbook chapters (e.g., Module 1 → Chapter 1: *Why do we learn statistics?*). Topic HTML pages in `src/content/topics/<topic>__<module>/<software>.html` adapt textbook material with attribution.

#### Research Methods — *Research Methods in Psychology* (4th ed.)

| Field | Value |
|-------|-------|
| Authors | Rajiv S. Jhangiani, I-Chant A. Chiang, Carrie Cuttler, Dana C. Leighton |
| License | CC BY-NC-SA 4.0 |
| Pressbooks | https://kpu.pressbooks.pub/psychmethods4e/ |
| Code reference | `src/data/researchMethodsTextbook.js` |

`PRESSBOOKS_CHAPTERS` provides a canonical 1:1 map: `rm-module-N` ↔ Pressbooks Chapter N ↔ `rm-chapter-N` topic ID. Canvas capstone phases (Fall 2026 PSYC 4223) are cross-linked in `src/data/fall2026ResearchMethodsSchedule.js` and `src/data/researchMethodsCanvasLinks.js`.

### 2.2 Instructor-Authored Content

The following are **original instructional content** written and curated for Methods Market (not scraped from textbooks):

| Content type | Location | Notes |
|--------------|----------|-------|
| Learning objectives | `src/data/objectives.js` | ~80+ KCs with `objectiveType`: `content`, `hybrid`, or `software` |
| Concept Review (Statistics) | `src/data/conceptQuestions.js` | MC, T/F, multi-select, fill-blank, matching |
| Concept Review (Research Methods) | `src/data/conceptQuestionsRm/*.js` | Per-module question banks |
| Question → objective map | `src/data/questionObjectiveMap.js` | Drives BKT updates |
| Software practice tasks | `src/data/statisticsPractices.js` + parallel files | Cross-software parity via `practiceObjectiveKey` |
| Software lessons | `src/data/softwareLessons*.js` | Step-by-step guides per package |
| Assignment help | `src/data/assignmentHelp*.js` | Canvas submission workflows |
| Data analysis recipes | `src/data/dataAnalysisRecipes.js` | Decision trees for choosing analyses |

Questions may cite primary literature where pedagogically relevant (e.g., Evans et al., 1983 for belief bias in `conceptQuestions.js`).

### 2.3 External Datasets

Methods Market does **not** use external statistical datasets to drive BKT or question selection. Software practice uses embedded/synthetic scenarios in static JavaScript. Student interaction data (responses, timing, reading events) is logged to PostgreSQL for analytics and model inputs.

### 2.4 Academic References (Theoretical Foundation)

The About page and backend cite:

**Bayesian Knowledge Tracing**
- Corbett, A. T., & Anderson, J. R. (1995). Knowledge tracing: Modeling the acquisition of procedural knowledge. *User Modeling and User-Adapted Interaction, 4*(4), 253–278.
- Yudelson, M. V., Koedinger, K. R., & Gordon, G. J. (2013). Individualized Bayesian knowledge tracing models. *AIED 2013*.

**Item Response Theory (difficulty adjustment)**
- Embretson, S. E., & Reise, S. P. (2000). *Item response theory for psychologists.*
- Baker, F. B., & Kim, S. H. (2004). *Item response theory: Parameter estimation techniques.*

**Adaptive learning & deep KT**
- VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems. *Educational Psychologist, 46*(4), 197–221.
- Khajah, M., Lindsey, R. V., & Mozer, M. C. (2016). How deep is knowledge tracing? *EDM 2016*.

**Neural BKT / interpretable student models**
- KISR Development interpretable student models research code: https://github.com/KISRDevelopment/interpretable_student_models_paper_code

**Forgetting in BKT** (`bkt_core.py`)
- Wan, H., et al. (2023). Modelling forgetting in student knowledge tracing with spaced repetition. *EDM 2023 Workshop on Knowledge Tracing*.
- Pardos, Z. A., & Heffernan, N. T. (2011). KT-IDEM: Introducing item difficulty to the knowledge tracing model. *UMAP 2011*.

---

## 3. Learning Activities & Assessment Methodology

### 3.1 Knowledge Components (Learning Objectives)

Each KC is defined in `src/data/objectives.js` with:

- `objectiveId` — e.g., `M1-O1`, `M2-O3` (Statistics) or RM-specific IDs
- `classId` + `moduleId` — disambiguates Statistics M1 from Research Methods M1
- `objectiveType`:
  - **`content`** — conceptual knowledge; gates Concept Review mastery
  - **`hybrid`** — conceptual + applied; gates Concept Review mastery
  - **`software`** — procedural software skills; tracked by BKT but does **not** gate Concept Review slips

### 3.2 Concept Review

**Purpose:** Assess conceptual understanding with immediate feedback and BKT updates.

**Scoring:** Deterministic rules in `src/lib/conceptReviewScoring.js` for each item type (no LLM grading).

**Adaptive serving:** `pickNextConceptReviewQuestion()` in `src/lib/conceptReviewUnlock.js` prioritizes objectives with the lowest P(L) that still need practice or mastery.

**Mastery unlock rule (Statistics, online mode):**

A module's Concept Review is complete when **either**:

1. **Mastery criterion:** For every eligible `content`/`hybrid` objective with ≥2 mapped questions in scope, the student has answered ≥2 items **and** P(L) ≥ 0.90; **or**
2. **Bank exhausted:** All in-scope questions have been attempted.

Constants: `MASTERY_PL = 0.9`, `MIN_ITEMS_PER_OBJECTIVE = 2`.

Research Methods Concept Review is **not** mastery-gated for assignment slips (by design).

**Offline mode:** Students may complete a print packet; first batch submission unlocks the slip at any score, with BKT updated post-hoc.

### 3.3 Software Practice

Guided exercises in `SoftwareLesson.vue` / `SoftwarePractice.vue` using `statisticsPractices.js`. BKT updates fire with `source: 'software_youdo'` or `'software_selfcheck'`. Cross-software parity is maintained via parallel data files and verified by `npm run parity:all`.

### 3.4 Topic Reading & Engagement

`TopicView.vue` logs reading time, scroll depth, and error-triggered revisits. These signals are passed to the backend BKT engine as sequence/engagement telemetry (time since reading, return visits after errors, etc.).

### 3.5 Mastery Labels & Thresholds

| P(L) range | Backend bucket (`MasteryBucket`) | Frontend label (`useBKT.js`) |
|------------|----------------------------------|------------------------------|
| ≥ 0.90 | MASTERED | Mastered |
| 0.70 – 0.89 | PROFICIENT | Proficient |
| 0.60 – 0.69 | — | Developing |
| 0.40 – 0.59 | DEVELOPING | Not Yet Mastered |
| < 0.40 | STRUGGLING | Not Yet Mastered |

**At-risk threshold:** P(L) < 0.40 (`at_risk_threshold` in `BKTConfig`).

**Class analytics:** `src/lib/classMasteryStats.js` uses 0.90 mastery threshold; a module is "ready" when ≥75% of objectives are mastered per student.

### 3.6 Student Privacy

Students authenticate with pseudonymous accounts and claim roster keys (`student_key`). Instructor exports use roster identifiers, not email, unless explicitly provided. See About page data privacy section.

---

## 4. Technical Architecture

### 4.1 Stack

| Layer | Technology | Version / notes |
|-------|------------|-----------------|
| **Frontend** | Vue 3, Vue Router 4, Vite | `vue ^3.4`, `vite ^7.3` |
| **Backend** | FastAPI, Uvicorn | `fastapi 0.109` |
| **ORM / migrations** | SQLAlchemy 2, Alembic | |
| **Database** | PostgreSQL 16 | Docker / Railway |
| **Auth** | JWT (`python-jose`, `passlib`) | `src/lib/pocketbase.js` is a FastAPI compatibility shim |
| **BKT** | JavaScript (local) + Python (backend) | See Section 5 |
| **Deployment** | Docker Compose (dev), Railway (prod) | `docs/RAILWAY.md` |

### 4.2 Repository Layout

```
statassignments/
├── src/                    # Vue SPA
│   ├── composables/        # useBKT.js, usePractice.js, useAuth.js
│   ├── data/               # Static curriculum & question banks
│   ├── content/topics/     # Per-software HTML topic pages
│   └── views/              # Practice, About, Profile, Instructor, …
├── backend/
│   ├── main.py             # FastAPI app, BKT routes
│   ├── models/             # neural_bkt.py, bkt_core.py, bkt_tabular.py
│   └── db/                 # SQLAlchemy models, bkt_store.py
└── docs/                   # Setup, parity reports, this document
```

### 4.3 Data Persistence

Key PostgreSQL tables (`backend/db/models.py`):

| Table | Purpose |
|-------|---------|
| `bkt_states` | Per-user, per-objective P(L), parameters, attempt counts |
| `bkt_prototypes` | Per-user, per-class prototype posterior weights |
| `learning_events` | Granular response telemetry for research/analytics |
| `practice_attempts` | Practice session records |
| `topic_readings` | Reading engagement events |
| `user_progress` | Module/topic completion flags |

Frontend caches BKT state in `localStorage` (`bkt-<objectiveId>`) for offline reads; backend is source of truth when authenticated.

### 4.4 Hybrid BKT Architecture

```
Student answers question
        │
        ▼
getObjectivesForQuestion(problemId)  ← questionObjectiveMap.js
        │
        ▼
updateBKT() in useBKT.js
        │
        ├─── USE_NEURAL_BKT && FastAPI reachable?
        │         │
        │    YES  ▼
        │    POST /bkt/update  →  NeuralBKTModel (default)
        │                      or  TabularBKTModel (BKT_ENGINE=tabular)
        │         │
        │         ▼
        │    Persist bkt_states (Postgres)
        │
        NO (fallback)
        ▼
    Local JS Bayes update (~1–2 ms)
        │
        ▼
    localStorage + API cache
```

**Engine selection:** Environment variable `BKT_ENGINE`:
- `neural` (default) — prototype-averaging multidimensional model
- `tabular` — `TimeAugmentedBKT` from `bkt_core.py`

---

## 5. Bayesian Knowledge Tracing (BKT) — Detailed Methodology

### 5.1 Model Family

BKT treats each knowledge component as a **two-state Hidden Markov Model**:

- **Latent state:** learned (L) vs. not learned (¬L)
- **Observations:** correct vs. incorrect responses

The platform implements a **hierarchy of BKT variants** in `backend/models/bkt_core.py`:

```
ClassicBKT
    └── BKTWithForgetting      (exponential decay between attempts)
            └── ContextualBKT    (difficulty + question-type offsets)
                    └── TimeAugmentedBKT   (response time + engagement)
```

Production backends use either **Neural BKT** (prototype averaging) or **Tabular BKT** (wraps `TimeAugmentedBKT`). The browser fallback implements **Classic BKT** with IRT-inspired difficulty constants.

### 5.2 Parameter Notation

Methods Market uses **Corbett–Anderson notation** (not `p_init` / `p_transit`):

| Symbol | Code name | Meaning | Default |
|--------|-----------|---------|---------|
| **P(L₀)** | `pL0` | Prior probability of mastery before practice | 0.10 |
| **P(T)** | `pT` | Learning transition: P(learn \| opportunity) | 0.15 |
| **P(S)** | `pS` | Slip: P(incorrect \| learned) | 0.10 |
| **P(G)** | `pG` | Guess: P(correct \| not learned) | 0.25 |
| **P(F)** | `pF` | Forgetting rate (backend only) | 0.05 |
| **P(L)** | `pL` | Current mastery estimate | starts at P(L₀) |

### 5.3 Core Update Equations

After each observation, the model applies a **two-step update**:

#### Step 1: Bayesian observation update

**If correct:**

```
P(correct) = P(L)·(1 − P(S)) + (1 − P(L))·P(G)

P(L | correct) = P(L)·(1 − P(S)) / P(correct)
```

**If incorrect:**

```
P(incorrect) = P(L)·P(S) + (1 − P(L))·(1 − P(G))

P(L | incorrect) = P(L)·P(S) / P(incorrect)
```

Implemented identically in:
- `src/composables/useBKT.js` (lines 336–353)
- `backend/models/bkt_core.py` → `ClassicBKT._bayes_update()`
- `backend/models/neural_bkt.py` → `NeuralBKTModel._bkt_update()`

#### Step 2: Learning transition

```
P(L_new) = P(L | obs) + (1 − P(L | obs)) · P(T)
```

#### Step 3 (backend extensions)

**Forgetting** (`BKTWithForgetting`, `NeuralBKTModel`):

```
pF_eff = pF · (1 − exp(−Δt / half_life))     # tabular engine
P(L_new) = P(L_new) · (1 − pF)                # neural engine (per-attempt)
```

Default forgetting half-life: 7 days (604,800 seconds).

**Clamping:** All P(L) values are clamped to [0.01, 0.99] to avoid degenerate probabilities.

### 5.4 Difficulty Adjustment (IRT-Inspired)

Item difficulty modulates P(G) and P(S). This is **heuristic**, not calibrated item response theory — fixed offsets, not data-fitted item parameters.

#### Local BKT (JavaScript) — absolute replacement values

| Difficulty | P(G) | P(S) |
|------------|------|------|
| easy | 0.35 | 0.05 |
| medium | 0.25 | 0.10 |
| hard | 0.15 | 0.15 |

#### Backend `BKTConfig` — logit offsets

| Difficulty | Guess offset | Slip offset |
|------------|--------------|-------------|
| easy | +0.40 | −0.20 |
| medium | 0.00 | 0.00 |
| hard | −0.40 | +0.20 |

#### Question-type guess anchors (`BKTConfig`)

| Type | Baseline P(G) |
|------|---------------|
| true_false | 0.50 |
| multiple_choice | 0.25 |
| multiple_select | 0.15 |
| matching | 0.10 |
| numeric | 0.05 |

### 5.5 Adaptive Prior (P(L₀))

When initializing a new objective, `adaptPrior()` in `useBKT.js` sets P(L₀) from the student's average mastery across existing objectives:

| Average P(L) across objectives | Adaptive P(L₀) |
|-------------------------------|----------------|
| ≥ 0.70 | 0.20 |
| ≥ 0.40 | 0.15 |
| < 0.40 | 0.10 (default) |

This implements a simple **transfer-of-learning** heuristic: students who demonstrate broad mastery receive higher priors on new topics.

### 5.6 Tier 1: Local BKT (Browser Fallback)

- **File:** `src/composables/useBKT.js`
- **When used:** FastAPI unreachable, user unauthenticated, or `USE_NEURAL_BKT = false`
- **Latency:** ~1–2 ms
- **Features:** Classic 4-parameter BKT, difficulty-adjusted P(G)/P(S), adaptive P(L₀)
- **Does not include:** forgetting, prototype averaging, time/engagement heuristics

### 5.7 Tier 2a: Neural BKT (Default Production Engine)

- **File:** `backend/models/neural_bkt.py`
- **Selection:** `BKT_ENGINE=neural` (default)
- **Research basis:** KISR interpretable student models (multidimensional abilities + prototype averaging)

Despite the name, this is **not a trained neural network**. It is an interpretable model that:

1. Maintains **5 student prototypes** with multidimensional ability profiles
2. Performs **sequential Bayesian updating** over prototype posteriors after each response
3. Computes a **prototype-weighted average** of per-prototype BKT updates

#### Student Prototypes

| Profile | Learning (dim) | Retention | Guessing (dim) | Not-slipping boost |
|---------|----------------|-----------|----------------|-------------------|
| Fast Learner | 0.25 | 0.95 | 0.30 | 0.80 |
| Careful Student | 0.15 | 0.85 | 0.15 | 0.90 |
| Struggling Student | 0.10 | 0.70 | 0.35 | 0.50 |
| Inconsistent Student | 0.12 | 0.75 | 0.25 | 0.60 |
| Average Student | 0.15 | 0.80 | 0.25 | 0.70 |

Prototype dimensions adjust P(G), P(S), P(T), and P(F) via logit-space offsets in `_get_prototype_adjusted_params()`.

#### Update pipeline (`NeuralBKTModel.update()`)

1. **Sequential Bayesian update** over prototypes: compute likelihood of observation under each prototype; update posterior weights (uniform prior on first encounter)
2. **Per-prototype BKT update** with difficulty-adjusted parameters
3. **Time/engagement adjustments** to P(G)/P(S) from response timing heuristics (`_get_time_based_adjustments()`)
4. **Weighted average** of prototype P(L) updates using posterior weights
5. **Persist** scalar state to `bkt_states`; prototype posteriors to `bkt_prototypes` (in-memory warm-up on restart)

#### API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /bkt/update` | Update P(L) after a response |
| `GET /bkt/state/{user_id}/{objective_id}` | Retrieve current state |
| `GET /student/profile/{user_id}` | Prototype posterior + ability profile |
| `POST /predict` | Predicted P(correct) per objective |
| `GET /health` | Engine status + `bkt_engine` field |

### 5.8 Tier 2b: Tabular BKT (Alternative Engine)

- **File:** `backend/models/bkt_tabular.py`
- **Selection:** `BKT_ENGINE=tabular`
- **Engine:** `TimeAugmentedBKT` from `bkt_core.py`
- **Features:** Full model hierarchy — forgetting, contextual difficulty, question-type offsets, response-time and engagement adjustments
- **Recommended in code comments** as the most complete classical BKT implementation; Neural BKT is default for multidimensional personalization

### 5.9 Behavioral Telemetry Inputs

When available, the frontend sends these fields to `POST /bkt/update`:

| Category | Fields |
|----------|--------|
| **Time** | `active_time_seconds`, `total_time_seconds`, `was_maxed_out`, `idle_detected` |
| **Confidence** | `time_to_first_selection`, `answer_changes` |
| **Spacing / reading** | `time_since_reading`, `time_since_last_attempt`, `has_read_topic_before`, `last_reading_max_scroll_depth`, `last_reading_triggered_by_error` |
| **Traceability** | `problem_id`, `source`, `module_id`, `class_id` |

Neural BKT applies conservative heuristic adjustments (e.g., very fast correct answers on hard items → slight P(G) increase; idle/tab-away → reduced confidence in timing interpretation).

### 5.10 Skill Model & Question Mapping

BKT updates are **per objective**, not per question. The mapping in `src/data/questionObjectiveMap.js` defines which objectives each question addresses:

```javascript
'stats-m1-q1': ['M1-O1'],
'stats-m1-q3': ['M1-O2'],
// multi-objective items map to multiple KCs
```

When a student answers, `usePractice.js` calls `updateBKT()` once per mapped objective.

### 5.11 Experimental / Unwired Models

The following exist in the codebase but are **not connected to the production API**:

| File | Capability |
|------|------------|
| `backend/models/bkt_advanced.py` | Prerequisite graphs, spacing scheduler, transfer learning |
| `backend/models/bkt_student.py`, `bkt_neural.py` | Additional model experiments |
| `POST /admin/retrain` | Stub — no fitted model retraining yet |

---

## 6. Instructor Analytics

Instructors (`role: instructor`) can:

1. Import rosters and distribute claim keys (`/instructor`)
2. View class mastery by module (`ClassMasteryPanel`)
3. Export CSV datasets (`useClassMasteryAnalytics.js`): objective mastery, learning events, practice attempts

**Module readiness metric:** ≥75% of students have mastered ≥75% of module objectives (P(L) ≥ 0.90).

---

## 7. Known Limitations & Future Work

| Area | Current state |
|------|---------------|
| **IRT calibration** | Difficulty offsets are fixed heuristics, not EM-fitted item parameters |
| **Neural BKT** | Prototype-based interpretable model; no PyTorch training pipeline in production |
| **Reading-time prior bonus** | `_get_reading_time_bonus()` returns 0.0 (TODO: query `topic_readings`) |
| **Prototype persistence** | Posteriors reload from DB but warm up from new attempts after server restart |
| **BKT unit tests** | Unlock/scoring scripts exist; Bayes math not covered in CI |
| **Documentation drift** | `docs/README-FULL.md`, `SETUP_NEURAL_BKT.md` still reference legacy PocketBase architecture |

---

## 8. Key File Reference

| Topic | Primary files |
|-------|---------------|
| BKT frontend | `src/composables/useBKT.js` |
| BKT practice integration | `src/composables/usePractice.js` |
| Concept Review unlock | `src/lib/conceptReviewUnlock.js` |
| BKT core math | `backend/models/bkt_core.py` |
| Neural BKT | `backend/models/neural_bkt.py` |
| Tabular BKT | `backend/models/bkt_tabular.py` |
| API routes | `backend/main.py` |
| DB schema | `backend/db/models.py` |
| Objectives | `src/data/objectives.js` |
| Question mapping | `src/data/questionObjectiveMap.js` |
| Statistics modules | `src/data/modules.js` |
| RM textbook map | `src/data/researchMethodsTextbook.js` |
| Student About page | `src/views/About.vue` |
| Backend docs | `backend/README.md` |

---

## 9. Document History

| Date | Change |
|------|--------|
| 2026-09-14 | Initial comprehensive methodology document |

---

*Methods Market — evidence-based, mastery-oriented learning for psychology statistics and research methods.*
