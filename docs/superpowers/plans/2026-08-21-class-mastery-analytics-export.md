# Class Mastery Analytics & Export Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Class Mastery panel (overall + per-objective) on Instructor and Admin, rewire attempt analytics to `practice_attempts`, and add multi-CSV “export all research data.”

**Architecture:** Pure aggregation in `src/lib/classMasteryStats.js`; fetch/export helpers in `useInstructorAnalytics.js` (and thin `exportPracticeAttemptsCSV` / `exportAllResearchData`); shared UI `ClassMasteryPanel.vue` mounted on both dashboards. Frontend-only; no backend changes.

**Tech Stack:** Vue 3, existing `pb` PocketBase client, `objectives.js` / `modules.js`.

**Spec:** `docs/superpowers/specs/2026-08-21-class-mastery-analytics-export-design.md`

## Global Constraints

- Mastered: `pL >= 0.90`
- Module-ready: student mastered >= 75% of module objectives; no BKT on module ⇒ not ready
- Avg mastery: mean of per-student mean pL; exclude students with zero BKT rows on module from the mean
- Exports: `student_key` only (no email / user id)
- Do not add JSZip; sequential CSV downloads
- Prefer new small files over bloating `useInstructorAnalytics.js` (already ~800 lines)

---

### Task 1: Pure class mastery aggregation + verify script

**Files:**
- Create: `src/lib/classMasteryStats.js`
- Create: `scripts/verify-class-mastery-stats.mjs`

**Interfaces:**
- Produces: `MASTERY_THRESHOLD` (0.9), `MODULE_READY_FRACTION` (0.75), `computeClassMastery({ moduleObjectives, claimedUserIds, bktRecords })` → `{ claimedCount, withDataCount, avgMasteryPct, moduleReadyPct, moduleReadyCount, objectives: [...] }`

- [ ] **Step 1:** Implement `computeClassMastery` per spec definitions (see design doc).
- [ ] **Step 2:** Add `scripts/verify-class-mastery-stats.mjs` with fixture users/objectives asserting avg mastery, % ready, and per-objective rows.
- [ ] **Step 3:** Run `node scripts/verify-class-mastery-stats.mjs` — expect exit 0.
- [ ] **Step 4:** Commit `feat: class mastery aggregation helpers`

---

### Task 2: Rewire `fetchAttempts` / at-risk / exports to `practice_attempts`

**Files:**
- Modify: `src/composables/useInstructorAnalytics.js`

**Interfaces:**
- `fetchAttempts(filters)` returns rows shaped for existing CSV helpers OR update CSV helpers to practice shape: `{ student_key, problem, is_correct, difficulty, active_time_seconds, created, semester_code }` via roster map when `filters.semesterId` set; if no semesterId, map all claimed roster keys across active semesters or require semester (prefer: if semesterId missing, still load all practice_attempts but only include users found on any roster with student_key).

- [ ] Replace body of `fetchAttempts` to read `practice_attempts`, join roster for `student_key`.
- [ ] Update `exportAttemptsCSV` headers to practice fields (drop software_type columns that do not exist on practice_attempts; keep accuracy / problem / times).
- [ ] Update `exportStudentSummaryCSV` and `fetchAtRiskStudents` accordingly (hint_used may be absent — omit that at-risk reason or treat as 0).
- [ ] Commit `fix: instructor attempt analytics use practice_attempts`

---

### Task 3: Class Mastery fetch + module CSV + export-all orchestrator

**Files:**
- Modify: `src/composables/useInstructorAnalytics.js` (append exports; keep file under control by adding focused functions)

- [ ] Add `fetchClassMastery({ semesterId, classId, moduleId })` using roster + `bkt_states` + `getObjectivesByModule` / objectives filtered by `moduleId`.
- [ ] Add `exportClassMasteryCSV(...)` for aggregate objective table.
- [ ] Add `exportPracticeAttemptsCSV(semesterId)`, `exportSoftwareLessonMetricsCSV(semesterId)`.
- [ ] Add `exportAllResearchData(semesterId, downloadCSV)` that sequentially calls existing + new exporters with short delay between downloads.
- [ ] Return new functions from `useInstructorAnalytics()`.
- [ ] Commit `feat: class mastery fetch and export-all`

---

### Task 4: `ClassMasteryPanel.vue` (Layout A)

**Files:**
- Create: `src/components/ClassMasteryPanel.vue`

- [ ] Props: `semesters` (array). Uses composable internally or emits load — prefer call `fetchClassMastery` / `exportClassMasteryCSV` / `downloadCSV` from composable inside the panel.
- [ ] UI: semester, class (`statistics` | `research-methods`), module select from `getContentModulesByClass`, Load, two cards, table, Export this module CSV.
- [ ] Empty / error states per spec.
- [ ] Commit `feat: ClassMasteryPanel component`

---

### Task 5: Wire Instructor Dashboard

**Files:**
- Modify: `src/views/InstructorDashboard.vue`

- [ ] Import `ClassMasteryPanel`; place at top of Analytics tab.
- [ ] Add **Export all research data** button (semester from Class Mastery or masterySemesterId / filters.semesterId — use shared `exportSemesterId` ref defaulting to first active semester).
- [ ] Soften Attempt/Summary copy to say Concept Review (`practice_attempts`).
- [ ] Commit `feat: instructor class mastery and export all`

---

### Task 6: Wire Admin Dashboard

**Files:**
- Modify: `src/views/Admin.vue`

- [ ] Add tab `{ id: 'class-mastery', label: 'Class Mastery' }`; render `ClassMasteryPanel` with semesters loaded via composable.
- [ ] BKT tab: note that class view is under Class Mastery; keep migrate utility labeled personal/local.
- [ ] Datasets: remove `courses`, `read_topics`; fix `exportAllData` to call `exportAllResearchData` when a semester is selected (add semester select near Export All) OR download multi-CSV via composable.
- [ ] Commit `feat: admin class mastery and real export all`

---

### Task 7: Smoke verify

- [ ] Run `node scripts/verify-class-mastery-stats.mjs`
- [ ] Run `npm run build` (or vite build) to ensure Vue compiles
- [ ] Commit any fixups if needed
