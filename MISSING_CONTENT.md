# Missing Content: Statistics Class (Modules 1–8)

Breakdown of missing videos and images by module.

**How to read this document:**
- **Present** = Content exists, nothing to add
- **Missing** = Content is referenced but not yet created/uploaded
- Numbers in the summary = how many items you need to create or upload

**Progress:** Lesson content and self-checks are complete through **Module 5**. Remaining gaps are mainly images (see per-module tables below).

---

## Module 1: Introductions and Why Learn Stats

| Category | Status |
|----------|--------|
| **Topics** | Present – intro-to-stats has full content |
| **Software lessons** | N/A (no software practice in this module) |
| **Videos** | Present – none needed |
| **Images** | Present – none needed |

**Missing:** Nothing.

---

## Module 2: Research Design & Measurement

| Category | Status |
|----------|--------|
| **Topics** | Present – variables-measurement, scales-of-measurement, validity, reliability, research-design |
| **Software lessons** | N/A |
| **Videos** | Present – none needed |
| **Images** | Present – none needed |

**Missing:** Nothing.

---

## Module 3: Software Basics and Data Handling

| Category | Status |
|----------|--------|
| **Topics** | Present – software-interface, data-entry, variable-types, screen-recording-tutorial |
| **Software lessons** | Present – Jamovi, SPSS, R, Excel, Stata unified lessons |
| **Videos** | Optional – screen-recording-tutorial could use a short demo video (not required) |
| **Images** | **Missing** – 4 images (SPSS, R, Excel, Stata only; Jamovi lesson + self-check are present) |

### Images present (Jamovi Module 3)

**Jamovi lesson steps** – `public/images/lessons/jamovi/`: `jamovi-analyses-tab.png`, `jamovi-exploration-icon.png`, `jamovi-descriptives-menu.png`, `jamovi-descriptives-variables.png`, `jamovi-interface-overview.png`, `jamovi-hamburger-menu.png`.

**Jamovi self-check** – `public/images/selfcheck/jamovi/`: `jamovi-data-panel.png`, `jamovi-variable-setup.png`.

### Images to add (Jamovi Interface section)

**Jamovi interface overview** – The “Getting to Know the Jamovi Interface” section now includes an annotated image. Add a screenshot of the Jamovi interface showing the two-panel layout and ribbon:

| File | Path | Description |
|------|------|-------------|
| `jamovi-interface-overview.png` | `public/images/lessons/jamovi/` | Full Jamovi window: left = Data panel (spreadsheet + Variables/Data/Analyses/Edit tabs), right = Results panel. Used for annotated labels: Data panel, Results panel, Ribbon tabs. |

### Images to add (Jamovi Variable Types section)

**Measure type screenshot** – The “Setting Variable Types in Jamovi” section now includes an annotated image of the variable setup panel:

| File | Path | Description |
|------|------|-------------|
| `jamovi-measure-type.png` | `public/images/lessons/jamovi/` | Screenshot of the variable setup panel (right side when a column is selected) showing the **Measure type** dropdown (Nominal, Ordinal, Continuous) and **Data type** (Text, Integer, Decimal). Used for annotations: Measure type, Data type. |

### Images to upload

**SPSS, R, Excel, Stata (Interface overview – annotated):**
| File | Path | Description |
|------|------|--------------|
| `spss-interface-overview.png` | `public/images/lessons/spss/` | SPSS Data Editor, Variable View, Output |
| `rstudio-overview.png` | `public/images/lessons/r/` | RStudio interface |
| `excel-interface-overview.png` | `public/images/lessons/excel/` | Excel data entry interface |
| `stata-interface-overview.png` | `public/images/lessons/stata/` | Stata interface |

---

## Module 4: Descriptive Statistics

| Category | Status |
|----------|--------|
| **Topics** | Present – central-tendency, variability, skew-kurtosis, grouped-descriptives, standard-scores |
| **Software lessons** | Present – Running Descriptives in Jamovi **with self-check phase** (screenshot recognition, error diagnostic, output interpretation) |
| **Videos** | Present – none needed |
| **Images** | **Missing** – 1–2 self-check images (see below; lesson step images shared with Module 3) |

### Self-check phase (added)

The Module 4 software lesson now includes a full self-check with:

- **Screenshot recognition:** “Where does the Descriptives output appear?” → uses `jamovi-results-panel.png` (same as Module 3; may already be present).
- **Error diagnostic:** “N = 0 and no statistics” scenario (no image).
- **Output interpretation:** “For **Height** only: what is N, mean, and standard deviation?” → uses `jamovi-descriptives-output1.png`. Expected answer: **sample size (N) = 49, mean (average) = 70, standard deviation = 1.17.** The screenshot should show two variables; the row for **Height** must show these values.

### Images to upload

**Lesson steps** (same as Module 3 – jamovi-analyses-tab, exploration-icon, descriptives-menu, descriptives-variables).



## Module 5: Graphing and Visualization ✓ (got through Module 5)

Module 5 is organized in the app as **Chapter 5: Drawing Graphs** (histograms, boxplots, bar-charts, scatterplots) and **Chapter 6: Pragmatic Matters** (tabulating-data, logical-expressions, transforming-variables, mathematical-functions, filtering-data). Software lessons are three Jamovi lessons only (no separate “learn segments” beyond these).

| Category | Status |
|----------|--------|
| **Topics** | Present – under Chapter 5 and Chapter 6 as above |
| **Software lessons** | Present – Creating Histograms, Filtering Data, Transforming Variables **with self-check phase** (screenshot recognition, error diagnostic, and histogram output interpretation with expanded keyword grading) |
| **Videos** | Present – none needed |
| **Images** | **Missing** – 12 lesson step images to upload (see below); self-check images present (jamovi-results-panel, jamovi-data-panel, jamovi-histogram-interpretation) |

### Self-check phase (added)

All three Module 5 Jamovi lessons now include a Self-Check phase:

- **Creating Histograms:** Screenshot recognition (where does the histogram appear? → Results panel); error diagnostic (no histogram appears → expand Plots and check Histogram); **output interpretation** (short answer: describe the histogram shape—symmetric/skewed, unimodal/bimodal, center). Uses `jamovi-results-panel.png` and `jamovi-histogram-interpretation.png`.
- **Filtering Data:** Screenshot recognition (where do you create filters? → Data tab); error diagnostic (filter shows 0 cases → variable name case-sensitive / syntax). Uses existing `jamovi-data-panel.png`.
- **Transforming Variables:** Screenshot recognition (where is Transform? → Data tab); error diagnostic (recode condition wrong or empty column → check source variable and conditions). Uses existing `jamovi-data-panel.png`.

### Images to upload

**Histograms lesson:** (Step 4 in the lesson is “Interpret the histogram” — no step image; self-check uses `jamovi-histogram-interpretation.png`.)
| File | Path | Description |
|------|------|--------------|
| `jamovi-exploration-menu.png` | `public/images/lessons/jamovi/` | Step 1: Go to Exploration |
| `jamovi-histogram-variable.png` | `public/images/lessons/jamovi/` | Step 2: Add your variable |
| `jamovi-histogram-checkbox.png` | `public/images/lessons/jamovi/` | Step 3: Enable histogram |

**Filtering lesson:** (Steps match the lesson: Open Filters → Create filter → Write expression → Filter off → Filter on.)
| File | Path | Description |
|------|------|--------------|
| `jamovi-open-filters.png` | `public/images/lessons/jamovi/` | Step 1: Open Filters (Data tab → Filters button) |
| `jamovi-create-filters.png` | `public/images/lessons/jamovi/` | Step 2: Create filter (New Filter, name it) |
| `jamovi-filter-expression.png` | `public/images/lessons/jamovi/` | Step 3: Write expression (e.g. Extraversion >= 4) |
| `jamovi-filter-off.png` | `public/images/lessons/jamovi/` | Step 4: Filter off – checkbox unchecked, all rows included |
| `jamovi-filter-on.png` | `public/images/lessons/jamovi/` | Step 5: Filter on – checkbox checked, only matching rows; others faded |

**Transforming Variables lesson:** (Uses the **Transform** tool, not Compute. Steps: Select variable (Extraversion) → Open Transform → Name variable → Create new transform → Add recode condition (if Extraversion >= 4 use 'High', else use 'Low') → Check results.)
| File | Path | Description |
|------|------|--------------|
| `jamovi-transform-button.png` | `public/images/lessons/jamovi/` | Step 1–2: Select Extraversion; Open Transform (Data tab → Transform or right‑click column → Transform) |
| `jamovi-transform-name.png` | `public/images/lessons/jamovi/` | Step 3: Name the transformed variable (e.g. Extraversion_category) |
| `jamovi-transform-create-transform.png` | `public/images/lessons/jamovi/` | Step 4: Create new transform (distinct from opening Transform; the UI to start adding rules) |
| `jamovi-transform-recode.png` | `public/images/lessons/jamovi/` | Step 5: Add recode condition (keep $source, add >= 4; use 'High'; else use 'Low') |
| `jamovi-transform-results.png` | `public/images/lessons/jamovi/` | Step 6: Check results (new column; source unchanged) |

---

## Module 6: Probability and Sampling

| Category | Status |
|----------|--------|
| **Topics** | Present – probability-concepts, probability-rules, binomial-distribution, normal-distribution, other-distributions, sampling-theory, law-of-large-numbers, central-limit-theorem, parameter-estimation, confidence-intervals |
| **Software lessons** | N/A |
| **Videos** | Present – none needed |
| **Images** | Present – none needed |

**Missing:** Nothing.

---

## Module 7: Hypothesis Testing

| Category | Status |
|----------|--------|
| **Topics** | Present – hypothesis-testing, p-values, effect-size |
| **Software lessons** | Present – Binomial test, One-sample t-test |
| **Videos** | Present – none needed |
| **Images** | **Missing** – 2 images to upload (see below) |

### Images to upload

| File | Path | Description |
|------|------|--------------|
| `binomial-setup.png` | `public/lessons/hypothesis-testing/jamovi/` | Binomial test setup (Frequencies → Proportion Test) |
| `t-test-setup.png` | `public/lessons/hypothesis-testing/jamovi/` | One-sample t-test setup (T-Tests → One Sample) |

---

## Module 8: Categorical Data Analysis, T-Tests, Regression, & ANOVA

| Category | Status |
|----------|--------|
| **Topics** | Present – chi-square, t-tests, correlation, regression, ANOVA topics |
| **Software lessons** | Present – Jamovi unified lesson (chi-square, t-tests, correlation, regression, ANOVA) |
| **Videos** | **Missing** – 1 video to record (Correlation topic has placeholder YouTube video) |
| **Images** | **Missing** – 3 images to upload (see below) |

### Video to record

| Video | Topic | Action |
|-------|-------|--------|
| **Running Correlation in Jamovi** | correlation | Replace placeholder YouTube ID in `topics.js` (currently `dQw4w9WgXcQ`). Record 3–5 min walkthrough. Optional backup: `/videos/backups/correlation-tutorial.mp4` |

### Images to upload

**Lesson:**
| File | Path | Description |
|------|------|--------------|
| `anova-data-setup.png` | `public/images/lessons/jamovi/` | One-Way ANOVA data setup (annotated) |

**Self-check:**
| File | Path | Description |
|------|------|--------------|
| `jamovi-anova-output.png` | `public/images/selfcheck/jamovi/` | ANOVA output interpretation |
| `jamovi-regression-output.png` | `public/images/selfcheck/jamovi/` | Regression output interpretation |

---

## Summary by Module

*"To upload" / "To record" = items you still need to create. "—" = nothing needed.*

| Module | Topics | Images to upload | Videos to record |
|--------|--------|------------------|------------------|
| 1 | Present | — | — |
| 2 | Present | — | — |
| 3 | Present | 4 (SPSS, R, Excel, Stata) | Optional (screen recording) |
| 4 | Present (incl. self-check) | 1–2 | — |
| 5 | Present | 12 | — |
| 6 | Present | — | — |
| 7 | Present | 2 | — |
| 8 | Present | 3 | 1 (correlation tutorial) |

---

## UI Icons (shared across all modules)

**Missing** – 8 icons to upload. Place in `public/`:

| File | Purpose |
|------|---------|
| `topic-icon.png` | Topics tab |
| `content-review-icon.png` | Concept Review tab |
| `software-practice-icon.png` | Software Practice tab |
| `jamovi-icon.png` | Software selector |
| `r-icon.png` | Software selector |
| `SPSS-icon.png` | Software selector |
| `excel-icon.png` | Software selector |
| `stata-icon.png` | Software selector |
