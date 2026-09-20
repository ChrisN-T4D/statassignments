# Design: Benchmark practice test logging, option shuffle, and unique draws

**Date:** 2026-09-20  
**Scope:** Methods Market statistics Benchmark practice tests only — routes for `benchmark-1`, `benchmark-2`, and `final-benchmark` (`BenchmarkPractice.vue` + shared samplers in `conceptQuestions.js`).  
**Out of scope:** Concept Review question order; Software Practice; Canvas graded benchmarks; new session tables; Research Methods.

## Problem

Students (e.g. Julian Pendergraft on Benchmark 1) reported that practice tests felt like the same questions every time. Investigation found:

1. **No server logging** — `BenchmarkPractice.vue` never writes `practice_attempts`, so instructors cannot see which sets were served.
2. **Options never shuffle** — repeated items look identical (same A/B/C/D order).
3. **Sampling does not prefer unseen items** — mastery-weighted draws from a modest bank reuse items heavily across retries; the same bank feeds Concept Review, so students who finished CR already recognize most items.
4. Copy advertises that each practice test samples so **tests vary**.

## Goals

1. Log every answered practice-test item for signed-in students, with source and benchmark slug.
2. Update BKT on those answers, tagged so analytics can separate practice tests from Concept Review.
3. Within one 15-question run: **no duplicate question IDs**.
4. Across Start / Try again: **prefer unique** items in a defined tier order, then reuse only when needed.
5. **Shuffle multiple-choice / multiple-select option order** on each convert (correct answer mapping preserved).
6. Apply the same behavior to **all three** benchmark practice tests.

## Non-goals

- Changing Concept Review’s deterministic unlock picker.
- Adding a `practice_test_sessions` header table (session identity is reconstructible from attempts + timestamps).
- Blocking Start when history fetch fails.
- Guaranteeing zero overlap with Concept Review forever (bank size limits; reuse is allowed after tiers are exhausted).

## Approach (locked)

Extend existing `practice_attempts` + shared submit/BKT path. Improve the shared weighted sampler used by all three benchmarks. Wire `BenchmarkPractice.vue` to load history, sample, shuffle, and submit.

---

## 1. Schema

Add nullable columns on `practice_attempts`:

| Column | Type | Values |
|--------|------|--------|
| `source` | string (nullable) | `benchmark_practice`, `concept_review`, or null (legacy CR) |
| `benchmark_slug` | string (nullable) | `benchmark-1`, `benchmark-2`, `final-benchmark` when source is practice test |

Alembic migration + SQLAlchemy `PracticeAttempt` model update. Collections API already persists model fields; no new endpoints required if create payload includes the new keys.

**Seen classification for sampling:**

- **Practice-test seen (this slug):** `source = 'benchmark_practice'` AND `benchmark_slug = <current slug>`
- **Concept Review seen:** `source` is null, empty, or `concept_review` (and problem id is in this benchmark’s bank)
- Ignore other sources if any appear later

---

## 2. Sampling & uniqueness

On each **Start** / **Try again** (count stays **15**):

1. Compute `masteryByModule` from BKT as today (`objectivesByModule` in `getBenchmarkPracticeConfig`).
2. Use the shared weighted module mix (existing weight `1 + (1 - mastery)`).
3. When selecting a question for a chosen module, pick randomly from the first non-empty tier among that module’s eligible types (`multiple_choice`, `true_false`, `multiple_select`):
   1. Not in **practice-test seen** for this slug, and not already chosen in this run
   2. Not in **Concept Review seen**, and not already chosen in this run
   3. Any remaining in-module bank item not already chosen in this run
4. **No duplicate IDs** in the 15-item run. Do not clear “used” and re-pick duplicates while any unused bank ID exists across modules; if the weighted module’s tiers are empty, fill from other modules using the same tier order.
5. Final order of the 15 may still be shuffled for presentation.

Applies to `getBenchmark1QuestionsWeighted` / shared `getWeightedQuestions` paths for Benchmark 1, 2, and Final (and keep unweighted `getQuestions` fallbacks consistent: unique-in-run + same prefer-unseen tiers when history is supplied).

---

## 3. Option shuffle

In `BenchmarkPractice.vue` `convertQuestion` (or a tiny shared helper):

- For `multiple_choice` and `multiple_select`: Fisher–Yates shuffle of options after mapping to display text; `correct_answer` remains the correct **text**(s), so scoring is unchanged.
- `true_false`: keep True / False order (or shuffle; either is fine — **lock: keep True then False** for consistency).

---

## 4. Logging & BKT

On each recorded answer in `BenchmarkPractice.vue` (after correct/incorrect is known):

1. If authenticated, call `submitAnswer` with an options bag:
   - `source: 'benchmark_practice'`
   - `benchmark_slug: <route slug>`
2. `usePractice.submitAnswer` must accept optional source/slug (default **`concept_review`** so CR behavior is unchanged), pass `source` into `updateBKT` meta, and persist `source` + `benchmark_slug` on the `practice_attempts` create payload.
3. Guests: shuffle + unique-in-run only; no attempt row / no BKT.

**Errors:** failed history fetch → sample as if no history. Failed submit → keep UI flow; console warn. Do not block finishing the test.

---

## 5. Files

| File | Change |
|------|--------|
| `backend/db/models.py` | Add `source`, `benchmark_slug` |
| `backend/alembic/versions/<next>_practice_attempt_source_slug.py` | Migration adding `source` + `benchmark_slug` |
| `src/composables/usePractice.js` | Optional source/slug on `submitAnswer` |
| `src/data/conceptQuestions.js` | Prefer-unseen tiers + no in-run dupes for all benchmark samplers |
| `src/views/BenchmarkPractice.vue` | Load seen IDs, pass history, shuffle options, submit answers |
| Tests (new small unit file under `src/` or existing test layout) | Sampler tiers, no-dupes, option shuffle |

---

## 6. Testing

1. Unit: with empty history, weighted draw has 15 unique IDs.
2. Unit: after marking a set as practice-test seen, next draw prefers other IDs until bank pressure forces reuse.
3. Unit: CR-seen IDs are deferred until practice-test-unseen pool is empty for that module/fill path.
4. Unit: shuffled options contain the same texts; correct text still matches.
5. Manual: signed-in Start → answer → row in `practice_attempts` with `source=benchmark_practice` and correct `benchmark_slug`; BKT `learning_events` (or equivalent) show that source.

## Success criteria

- Instructors can query which problems a student saw/answered on a given benchmark practice test.
- Retries for the same slug pull new IDs when available before repeating practice-test or CR items.
- Option order is not fixed across presentations of the same item.
- Concept Review submit path still defaults to `concept_review` and does not require `benchmark_slug`.
