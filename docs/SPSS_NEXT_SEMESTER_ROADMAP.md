# SPSS next-semester adaptation roadmap

**Owner:** Methods Market engineering  
**Card:** MM-5 — Adapt for SPSS (Next Semester)  
**Scope:** Statistics Software Practice modules 3–8

## Recommendation

Treat SPSS as an existing software track that needs release preparation, not as a
new parallel curriculum. The repository already contains SPSS lessons for every
software-practice module, SPSS-specific Assignment Help variants, and the shared
software-equivalency map. The next-semester work should validate the learner path,
repair any version-sensitive instructions, and package a small instructor checklist.

## Current coverage

| Module | Existing SPSS lesson | Next-semester status |
|---|---:|---|
| 3 — Data handling | Yes | Validate import, Variable View, labels, save/export |
| 4 — Descriptives | Yes | Validate Compute, Descriptives, Explore, z-scores |
| 5 — Graphing/data manipulation | Yes | Validate Chart Builder, Select Cases, Recode |
| 6 — Probability/CI | Yes | Validate distribution functions and CI workflow |
| 7 — Hypothesis testing | Yes | Validate binomial and one-sample t-test output |
| 8 — Tests/relationships | Yes | Validate χ², t-tests, ANOVA, correlation, regression |

Supporting sources:

- `src/data/softwareLessons_module3_unified.js`
- `src/data/softwareLessons_module4_descriptives_other.js`
- `src/data/softwareLessons_module5_unified_other.js`
- `src/data/softwareLessons_module6_other.js`
- `src/data/softwareLessons_module7_other.js`
- `src/data/softwareLessons_module8_unified_other.js`
- `src/data/assignmentHelpSoftwareVariants.js`
- `docs/SOFTWARE_EQUIVALENCY_MAP.md`

## Phased plan

### Phase 1 — Freeze the teaching contract

1. Confirm the next semester's SPSS version/licensing model (campus install,
   virtual lab, or student license).
2. Keep the student workflow consistent: **Learn → Practice → Apply → record
   the process → upload the video/output where the course requires it**.
3. Keep Methods Market as the instructional layer; do not create a second SPSS
   assignment system or duplicate Canvas due dates in the app.
4. Decide which output is required for each assignment: screenshot, `.sav`,
   syntax file, exported table, or screen recording.

**Deliverable:** one-page instructor contract listing software version,
installation route, required files, and submission locations.

### Phase 2 — Validate the high-risk SPSS paths

Test the following in a clean SPSS profile using the same datasets named by the
lessons:

- CSV/Excel import and variable type/measurement settings.
- `Transform → Compute Variable`, including missing-value behavior.
- `Analyze → Descriptive Statistics → Explore` and normality output.
- Chart Builder, Select Cases, Recode, and restoring the full sample.
- Binomial and one-sample t-test dialogs, including two-sided significance.
- Crosstabs/χ², independent and paired t-tests, one-way ANOVA/post-hoc tests.
- Bivariate correlation and linear regression, including residual diagnostics.
- Saving `.sav`, exporting `.csv`, and preserving syntax/output evidence.

For every path, capture: **menu route, expected output label, common failure,
recovery step, and evidence students submit**.

**Deliverable:** `docs/` validation notes or updated lesson copy for every
failed/version-sensitive step.

### Phase 3 — Improve the student-facing track

1. Add a short “SPSS version differences” note wherever menu names differ.
2. Prefer syntax alongside clicks for repeatability, but do not require syntax
   when the assignment is explicitly a GUI walkthrough.
3. Make the Apply step independent: students should use a fresh dataset or
   changed variable names rather than copy the Learn example exactly.
4. Add a visible checkpoint after each major operation (new variable, filtered
   sample, analysis output, saved file).
5. Ensure Assignment Help names the correct SPSS output and does not promise a
   feature unavailable in the student's licensed version.

**Deliverable:** reviewed SPSS variants for modules 3–8 plus a short troubleshooting
section covering import, missing values, filters, and output interpretation.

### Phase 4 — Instructor and release verification

Run the existing checks before next-semester publication:

```text
npm run audit:software
npm run parity:map
npm run parity:practice
npm run build
```

Then manually verify one complete SPSS path from Class Home → Software Practice
→ Assignment Help → recording/submission guidance. Confirm the selected SPSS
variant survives navigation and that links remain internal to Methods Market
until the student is told to submit externally.

**Deliverable:** release checklist with date, SPSS version tested, datasets used,
and any known limitations.

## Explicit non-goals

- Rewriting the existing Jamovi lessons.
- Adding Canvas API/LTI grade sync.
- Promising SPSS access or purchasing licenses for students.
- Requiring students to submit raw SPSS output when the course only needs a
  screen recording.
- Eliminating the other supported software tracks.

## Acceptance criteria

- SPSS appears as a selectable, usable track for modules 3–8.
- Each module has a coherent Learn/Practice/Apply path and a verifiable output.
- All menu paths are tested against the semester's supported SPSS version.
- Assignment Help instructions match the actual Canvas submission requirement.
- Software parity and production build checks pass.
- Instructor can publish the track using the release checklist without editing
  source code or guessing which dataset/output is required.

## Open decisions before implementation

1. Which SPSS version should be the canonical test target?
2. Will students submit screen recordings, `.spv`/output files, syntax, or a
   combination for each module?
3. Which SPSS datasets are guaranteed to be available in the next course shell?
4. Is the SPSS track required for all students, or an instructor-selected
   software preference like the current profile setting?
