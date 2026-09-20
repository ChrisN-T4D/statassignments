# Benchmark Practice Logging & Unique Draws Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Log benchmark practice-test attempts with `source=benchmark_practice`, shuffle MC options, and sample 15 unique items preferring unseen practice-test then CR then reuse — for all three statistics benchmarks.

**Architecture:** New pure sampling/shuffle helpers under `src/lib/`; Alembic `005` adds `source` + `benchmark_slug` on `practice_attempts`; `usePractice.submitAnswer` accepts optional source/slug; `BenchmarkPractice.vue` loads history, samples via the new helper, shuffles options, and submits each answer.

**Tech Stack:** Vue 3, FastAPI/SQLAlchemy/Alembic, Node verify scripts (no vitest).

**Spec:** `docs/superpowers/specs/2026-09-20-benchmark-practice-logging-uniqueness-design.md`

## Global Constraints

- Apply to `benchmark-1`, `benchmark-2`, `final-benchmark` only.
- Prefer unseen: practice-test (this slug) → Concept Review → reuse.
- No duplicate IDs in one 15-question run while unused bank IDs exist.
- Default `submitAnswer` source remains `concept_review`.
- Do not edit Concept Review unlock picker.

---

### Task 1: Sampling helper + verify script

**Files:**
- Create: `src/lib/benchmarkPracticeSample.js`
- Create: `scripts/verify-benchmark-practice-sample.mjs`
- Modify: `package.json` (add `verify:benchmark-practice` script)

**Interfaces:**
- Produces: `sampleBenchmarkQuestions({ modules, bankQuestions, masteryByModule, totalCount, practiceSeenIds, conceptReviewSeenIds })` → array of question objects, length ≤ totalCount, unique ids
- Produces: `classifyAttemptSeen({ problem, source, benchmark_slug }, slug)` → `'practice' | 'concept_review' | 'other'`

- [ ] **Step 1:** Implement sampler with tiered pick + fill-across-modules; Fisher–Yates for random picks (not `sort(() => Math.random()-0.5)` for selection).
- [ ] **Step 2:** Write verify script covering unique-in-run, practice-seen deferred, CR-seen deferred.
- [ ] **Step 3:** Add npm script; run verify until green.
- [ ] **Step 4:** Commit.

### Task 2: Option shuffle helper

**Files:**
- Create: `src/lib/shuffleQuestionOptions.js`
- Extend: `scripts/verify-benchmark-practice-sample.mjs`

- [ ] **Step 1:** `shuffleMcOptions(optionsTextArray)` Fisher–Yates copy; TF unchanged.
- [ ] **Step 2:** Verify shuffle preserves membership.
- [ ] **Step 3:** Commit.

### Task 3: Schema migration

**Files:**
- Modify: `backend/db/models.py` (`PracticeAttempt`)
- Create: `backend/alembic/versions/005_practice_attempt_source_slug.py` (revises `004`)

- [ ] **Step 1:** Add nullable `source` String(64), `benchmark_slug` String(64).
- [ ] **Step 2:** Migration upgrade/downgrade.
- [ ] **Step 3:** Commit.

### Task 4: submitAnswer source/slug

**Files:**
- Modify: `src/composables/usePractice.js` (`submitAnswer`)

- [ ] **Step 1:** Add optional final arg `meta = {}` with `source` (default `concept_review`) and `benchmark_slug`.
- [ ] **Step 2:** Pass `source` into `updateBKT` meta; set `attemptData.source` / `attemptData.benchmark_slug` when present.
- [ ] **Step 3:** Commit.

### Task 5: Wire BenchmarkPractice.vue

**Files:**
- Modify: `src/views/BenchmarkPractice.vue`

- [ ] **Step 1:** On start, if authenticated fetch `practice_attempts` for user; build `practiceSeenIds` / `conceptReviewSeenIds` for current slug’s bank ids.
- [ ] **Step 2:** Call `sampleBenchmarkQuestions` with config modules + bank from `getQuestionsByModule` filtered to MC/TF/MS; fallback if empty.
- [ ] **Step 3:** Shuffle MC/MS options in `convertQuestion`.
- [ ] **Step 4:** On `checkAndRecord`, call `submitAnswer(..., { source: 'benchmark_practice', benchmark_slug })` when authenticated; catch/warn without blocking UI.
- [ ] **Step 5:** Commit.

### Task 6: Smoke verify

- [ ] **Step 1:** `npm run verify:benchmark-practice`
- [ ] **Step 2:** Confirm migration file revises `004`.
