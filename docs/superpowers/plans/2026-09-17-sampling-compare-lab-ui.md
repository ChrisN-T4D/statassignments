# Sampling Compare Lab UI — implementation plan

**Spec:** `docs/superpowers/specs/2026-09-17-sampling-compare-lab-ui-design.md`

## Done in this branch

1. `src/lib/samplingSim.js` — extracted engine + `sampleDrawDetailed` animation steps
2. `src/components/sampling/SamplingCompareLab.vue` — shared UI (population top, animated draws, x̄ strip)
3. RM `ExperimentalSamplingSimulation` — sampling tab mounts shared component
4. Stats Module 6 — `lab-sampling-methods` tab on class home
5. `scripts/verify-sampling-sim.mjs` — smoke test

## Verify

```bash
node scripts/verify-sampling-sim.mjs
npm run build
```

Manual: Build population → Take another sample (slow) → repeat (fast) → change method (slow again) → Run N more (fast).
