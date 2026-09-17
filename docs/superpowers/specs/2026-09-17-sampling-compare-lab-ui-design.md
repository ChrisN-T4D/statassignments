# Sampling Compare Lab — shared UI redesign

**Date:** 2026-09-17  
**Scope:** Research Methods Lab (sampling tab) + Statistics Module 6 — same component, clearer UI, animated draws  
**Out of scope:** Assignment mini-lab changes; live classroom sessions; new sampling methods beyond the existing 8

## Problem

The existing sampling simulation in `ExperimentalSamplingSimulation.vue` teaches the right ideas (μ, x̄, bias, SD of x̄, method comparison) but packs too much into one view: population grid, selection viz, score histograms, and x̄ statistics compete for attention. Critical reading guides live in collapsed `<details>`. Runs are batch-only (“build roster & run N samples”) with no step-by-step draw or animation.

Statistics Module 6 needs the same teaching tool as Research Methods, with one shared implementation.

## Goals

- **Same math and methods** as today: 8 plans, side-by-side compare, fixed roster, μ, bias, SD of x̄.
- **Population anchor at top:** μ, N, population histogram (and compact roster) stay visible after roster is built.
- **Animated selection:** walk through who gets sampled; slower on first use of a method, faster on repeats.
- **Take another sample:** one draw at a time (both plans in parallel when comparing); optional batch “Run N more (fast)”.
- **Clearer sections:** x̄-over-draws vs pooled individual-score histograms labeled separately.
- **Shared component:** one UI used by RM sampling tab and Stats Module 6 tab.

## Non-goals

- Changing assignment simulation (RM only, separate tab).
- WebSockets / live sessions in this ship.
- Replacing the campus roster metaphor.

## Approach

Extract sampling engine to `src/lib/samplingSim.js`. Build `src/components/sampling/SamplingCompareLab.vue` with the layout below. RM `ExperimentalSamplingSimulation` mounts it for the sampling tab; Stats `ClassHome` adds a Module 6 tab that mounts the same component with stats-framed intro copy.

## Layout (top → bottom)

### Controls

- Population size N, target sample size n*.
- **Plan A** and **Plan B** method selectors (rename from Left/Right); show method name in panel headers.
- **Build / reset population** — generates roster once; resets draw history and “first draw” animation flags for both plans.
- Preset chips optional later (e.g. “SRS vs Convenience”); not required v1.

### Section 1 — Population (sticky anchor)

Visible after roster build:

- **μ**, **N**, score range.
- **Population histogram** (individual scores, μ line).
- Compact roster grid (collapsible on narrow viewports).

Does not change between draws unless user rebuilds population.

### Section 2 — This sample (animated)

Side-by-side when Plan A ≠ Plan B; single panel when same method selected twice (compare mode still valid for repeated draws).

Per plan:

- Method badge (Random / Non-random) + method name.
- **Animated roster / list-walk** showing selection in progress.
- After animation completes: **x̄ for this draw**, **Δ from μ**.
- Quota convenience walk strip and metadata when applicable (same teaching content as today, stepped during animation).

Actions:

- **Take another sample** — one new draw per active plan on the **same roster**, both in parallel when comparing two methods.
- **Run N more (fast)** — batch append without per-person animation (for classroom speed).

### Section 3 — Accumulated results

- Count of draws so far per plan.
- **Avg x̄**, **bias vs μ**, **SD of x̄** (updates each draw).
- **Dot strip / rug plot** of each draw’s x̄ with μ line (primary “sampling distribution of the mean” visual).

### Section 4 — Score histograms (secondary)

- Population | Plan A pooled sampled scores | Plan B pooled sampled scores.
- Same scale, μ line, explicit caption: “Individual scores in any draw — not the same as x̄ strip above.”
- Open by default on desktop; may collapse on mobile.

## Animation behavior

### Speed tiers

| Situation | Speed | Purpose |
|-----------|--------|---------|
| **First draw after method change** for Plan A or Plan B | **Slow (teaching)** | Student sees *how* that method selects |
| **Subsequent draws** with the same method on that plan slot | **Fast** | Reinforce variability without tedium |
| **Run N more (fast)** | **Instant / minimal** | Batch classroom demo |

“First draw” is tracked **per plan slot** (A and B independently): changing Plan A from SRS → Convenience resets Plan A to slow once; Plan B unchanged unless its method also changed.

Changing n* or rebuilding population does **not** reset slow-first flags unless the method also changed or user explicitly rebuilds population (rebuild resets all draw history and slow flags).

### Suggested timings

- **Slow:** ~40–60ms per selection step (quota list walk, systematic every-kth, SRS pick order); cluster = dorm block ~300ms; purposive = rank reveal ~80ms per person.
- **Fast:** ~8–12ms per step, or highlight whole sample in ≤200ms total.
- **Skip animation** accessible (prefers-reduced-motion: jump to final state; optional “Skip animation” control during slow walk).

### Method-specific animation

| Method | Slow walk |
|--------|-----------|
| Convenience | List positions 1…n* highlight in order |
| Quota | List walk: in-sample vs passed-over, with stratum table filling live |
| SRS / stratified / systematic / multi-stage | Picks appear in selection order on grid |
| Cluster | Whole dorm blocks highlight together |
| Purposive | Highest scores highlight by rank (#1…#n*) |

## Interaction flow

1. User sets N, n*, Plan A, Plan B → **Build population**.
2. Section 1 appears (population histogram + μ).
3. User clicks **Take another sample** → slow animation for any plan whose method is on its “first draw”; show x̄; append to Section 3 strip.
4. Repeat → fast animation.
5. User changes Plan B method → next draw for B is slow again; A stays fast if unchanged.
6. **Run 20 more (fast)** appends 20 x̄ values without step animation; Section 3 stats and strip update.

## Shared usage

| Consumer | Integration |
|----------|-------------|
| RM Lab | `ExperimentalSamplingSimulation` sampling tab → `<SamplingCompareLab intro="rm" />` |
| Stats M6 | `ClassHome` new tab `lab-sampling-methods` → `<SamplingCompareLab intro="stats" />` |
| Engine | `src/lib/samplingSim.js` — population generation, `sampleDrawForMethod`, `SAMPLING_PLAN_META`, histogram helpers |

Intro prop switches lead paragraph only; all behavior identical.

## File map

| Path | Role |
|------|------|
| `src/lib/samplingSim.js` | Extracted pure logic from `ExperimentalSamplingSimulation.vue` |
| `src/components/sampling/SamplingCompareLab.vue` | New shared UI (~500–700 lines target) |
| `src/components/sampling/SamplingRosterGrid.vue` | Roster + animation highlights (optional subcomponent) |
| `src/components/sampling/SamplingHistPanel.vue` | Histogram SVG blocks (optional subcomponent) |
| `ExperimentalSamplingSimulation.vue` | Slim: tabs + assignment panel + `<SamplingCompareLab embed-tab="sampling" />` |
| `src/views/ClassHome.vue` | Stats M6 tab mount |

Keep `ExperimentalSamplingSimulation.vue` assignment half unchanged.

## Testing

- Unit tests in `src/lib/samplingSim.test.js` (or vitest): each method returns correct n*, quota skip sets, purposive bias direction.
- Manual: build roster → slow first draw → fast second → change method → slow again; parallel A/B; reduced-motion skips animation.
- RM regression: assignment tab still works; sampling tab reaches same bias patterns as before for SRS vs purposive preset.

## Rollout

1. Extract `samplingSim.js` + tests (no UI change).
2. Build `SamplingCompareLab.vue` with new layout and animation.
3. Wire RM sampling tab to new component; verify parity.
4. Add Stats M6 tab.
5. Deploy Railway (frontend only unless no backend touch).

## Open follow-ups (deferred)

- Preset comparison chips (“SRS vs Convenience”).
- Live session: each phone contributes one x̄.
- Instructor “replay last slow walk” button without taking a new sample.

## Approval notes (2026-09-17)

User confirmed hybrid layout (population/histogram top, animated draws, take another sample, shared RM+Stats). Animation: **slow walkthrough first time a plan uses a sampling type; faster on subsequent draws with that same type** until method changes or population rebuild.
