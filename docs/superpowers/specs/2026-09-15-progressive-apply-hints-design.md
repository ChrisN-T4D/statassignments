# Progressive Apply Hints + Stretch Challenge Labels

**Date:** 2026-09-15  
**Scope:** Statistics Software Practice (Methods Market) — platform machinery for all modules; content authored module-by-module  
**Out of scope:** Student-facing mastery meters; Concept Review hints; Research Methods; adaptive recommendation engine

## Problem

1. Module 3 Apply item 6 (`m3-computed-column`, total-score Compute) asks students to do something Learn / Practice / Self-check do not teach. Full Compute teaching lands in Module 4 (deviations); richer transforms in Module 5.
2. Apply hints are a single flat string with Show/Hide. That is weak scaffolding and only yields a binary `hint_used` signal for instructors.

## Goals

- Progressive hints: **Nudge → Scaffold → Walkthrough**, unlocked stepwise.
- **Stretch challenge** label so students know an item is ahead of Learn without feeling behind.
- Instructor-only mastery signal from **deepest hint tier** opened.
- Platform-wide schema/UI now; accurate hint copy filled **module by module** (Module 3 first).

## Non-goals

- No student-visible “mastery” or readiness score.
- No forced rewrite of every exercise in one pass (legacy `hint` must keep working).
- No changing grade weight or making stretch items required beyond existing Apply flow.

## Approach

Extend exercise records in `statisticsPractices.js` (Approach 1 from brainstorm). Optional `hints[]` and `stretch` metadata; Apply UI and metrics grow to support tiers; content migrates per module.

## Data model

On each Software Practice exercise object:

```js
// Optional progressive hints (preferred when authored)
hints: [
  'Tier 1 — nudge',
  'Tier 2 — scaffold',
  'Tier 3 — walkthrough'
],

// Optional stretch labeling (student-facing badge only)
stretch: {
  label: 'Stretch challenge',
  subtitle: 'Taught fully in Module 4 — use hints freely.'
},

// Legacy — keep for unmigrated exercises and as fallback
hint: '…'
```

**Rules**

| Condition | Behavior |
|-----------|----------|
| `hints` length ≥ 1 | Progressive UI; ignore single `hint` for display (may keep `hint` as Tier 1 duplicate during migration) |
| Only `hint` | Current Show/Hide UI unchanged |
| `stretch` set | Show badge + subtitle on Apply card |
| No `stretch` | No badge |

**Module 3 Q6:** All software parallels with `practiceObjectiveKey: 'm3-computed-column'` get `stretch` + three-tier `hints` (software-specific walkthroughs).

## Apply UI

Primary surface: `SoftwareLesson.vue` Apply phase. Mirror the same interaction in `SoftwarePractice.vue` when it renders the same exercise cards / print HTML.

**Stretch challenge**

- Badge text: **Stretch challenge** (exact label).
- Optional `subtitle` under the badge (curriculum-honest framing).

**Hint unlock (option A)**

1. **Show hint** → reveal Tier 1 only.  
2. **Next hint** → reveal Tier 2; Tier 1 stays visible.  
3. **Next hint** → reveal Tier 3; all three stay visible.  
4. Button becomes **Hide hints** (collapse). Reopening restores the deepest tier opened this session.

**Student-facing tier labels**

- Hint 1 · Nudge  
- Hint 2 · Scaffold  
- Hint 3 · Walkthrough  

No mastery language on the student UI.

## Instructor analytics

Extend existing `hint_used` software-lesson metrics (do not invent a parallel event type for v1).

Payload additions:

```js
{
  exercise_title: string,
  hint_tier: 1 | 2 | 3,      // tier just revealed
  max_hint_tier: 1 | 2 | 3 // deepest opened this session for that exercise
}
```

- Log once per newly revealed tier.
- Legacy single-hint: `hint_tier: 1`, `max_hint_tier: 1`.
- Instructor interpretation (dashboard polish can follow metrics plumbing):
  - Core item, tier 0–1 → on track  
  - Core item, tier 2–3 → needs support  
  - Stretch challenge, tier 2–3 → expected, not a red flag  

Student UI does not surface this.

## Content rollout

1. **Platform ship:** schema support + UI + logging; all unmigrated exercises keep working via `hint`.
2. **Module 3 first:** author `hints` for Apply items as reviewed; prioritize `m3-computed-column` across jamovi / R / SPSS / Excel / Stata.
3. **Later modules:** when reviewing each module for accuracy, replace flat `hint` with three tiers; mark true stretch items with `stretch`.

**Example — Jamovi `m3-computed-column`**

- Tier 1: Look on the Data tab for a way to add a new variable from a formula.  
- Tier 2: Data → Add → Computed Variable. Name it `Total`. Build a sum of your item columns (click names to insert).  
- Tier 3: Formula like `Item1 + Item2 + Item3` (use real column names). Confirm the column appears; spot-check one row by hand.

**Copy tweak:** Module 3 Jamovi Apply `youDo.summary` currently implies only import / measure / export. Add one sentence that a Stretch challenge may preview skills taught in a later module.

**Docs:** Update `docs/SOFTWARE_EQUIVALENCY_MAP.md` for `m3-computed-column` when hints/stretch land so parallels stay documented.

## Files likely touched (implementation plan will detail)

- `src/data/statisticsPractices.js` — `hints` / `stretch` on Module 3 (then later modules)
- `src/views/SoftwareLesson.vue` — progressive hint UI + stretch badge
- `src/views/SoftwarePractice.vue` — same interaction / print hint HTML if applicable
- `src/composables/useSoftwareLessonMetrics.js` — `hint_tier` / `max_hint_tier` on `trackHintUsed`
- Instructor dashboard / analytics consumers — report deepest tier when ready (may be follow-up)
- `src/data/softwareLessons_module3_unified.js` — Apply summary line for stretch preview
- `docs/SOFTWARE_EQUIVALENCY_MAP.md` — document stretch + tier pattern for `m3-computed-column`

## Success criteria

- Student on Module 3 Q6 sees **Stretch challenge** and can step through three hints without being told they failed Learn.
- Instructor metrics distinguish hint depth (not only binary used/not).
- Exercises without `hints` still behave exactly as today.
- Module 4+ content can adopt the same fields without another UI rewrite.

## Open follow-ups (not blocking v1)

- Instructor dashboard columns for avg / max hint tier per exercise.
- Whether Practice (`weDo`) step hints should later adopt the same three-tier pattern.
- Syncing stretch flags into offline print packet if that path still lists Apply hints.
