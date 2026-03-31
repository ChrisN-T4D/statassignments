/**
 * Software practice tasks parallel to Module 4 jamovi "To Do" items (same learning goals).
 * Each entry shares practiceObjectiveKey with the jamovi row of the same order in statisticsPractices.js.
 */
export const module4SoftwarePracticeParallels = [
  // --- m4-deviation-scores (order 1) ---
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-deviation-scores',
    title: 'Deviation scores (Extraversion − mean)',
    description: 'Create a column showing each Extraversion score minus the sample mean.',
    instructions:
      'With your personality data loaded, add a variable `dev_ex` = Extraversion minus its mean. Example: `data <- data %>% dplyr::mutate(dev_ex = Extraversion - mean(Extraversion, na.rm = TRUE))` or base R: `data$dev_ex <- data$Extraversion - mean(data$Extraversion, na.rm = TRUE)`. Run `head()` and confirm the new column.',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'Use mean(..., na.rm = TRUE) if there are missing values.',
    submission: 'Script snippet or screenshot showing the new column and head(data).',
    order: 1,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-deviation-scores',
    title: 'Deviation scores in SPSS (Compute)',
    description: 'Use Compute to create Extraversion minus the mean of Extraversion.',
    instructions:
      'Transform > Compute Variable. Target: DEV_EX. Numeric expression: Extraversion - MEAN(Extraversion). (If your variable name differs, substitute it.) Run Descriptives on DEV_EX and note the mean is ~0.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'MEAN(Extraversion) uses the variable mean across cases in SPSS Compute.',
    submission: 'Screenshot of Compute dialog or output showing DEV_EX.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-deviation-scores',
    title: 'Deviation scores in Excel',
    description: 'Add a column Extraversion minus the average of the column.',
    instructions:
      'Suppose Extraversion is in column B (B2:B101). In C2 use =B2-AVERAGE($B$2:$B$101) and fill down. Verify the average of column C is ~0.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'Lock the AVERAGE range with $ so the reference does not shift.',
    submission: 'Screenshot showing formula and a few rows.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-deviation-scores',
    title: 'Deviation scores in Stata',
    description: 'Generate a deviation score for Extraversion.',
    instructions:
      'After loading data: `summarize Extraversion` then `gen dev_ex = Extraversion - r(mean)` (replace variable name if needed). `summarize dev_ex` — mean should be ~0.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'r(mean) stores the mean from the immediately prior summarize.',
    submission: 'Screenshot of commands and summarize dev_ex.',
    order: 1,
    is_active: true
  },

  // --- m4-z-scores (order 2) ---
  {
    module: 'module-4',
    topic: 'z-scores',
    practiceObjectiveKey: 'm4-z-scores',
    title: 'Z-scores in R',
    description: 'Standardize Extraversion to z-scores.',
    instructions:
      'Create `z_ex <- scale(data$Extraversion)` or add to tibble with mutate(z_ex = as.numeric(scale(Extraversion))). Inspect with head().',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'scale() returns a matrix; as.numeric() or drop attributes for a plain vector column.',
    submission: 'Screenshot or output showing z-scores.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'z-scores',
    practiceObjectiveKey: 'm4-z-scores',
    title: 'Z-scores in SPSS',
    description: 'Save standardized scores for Extraversion.',
    instructions:
      'Analyze > Descriptive Statistics > Descriptives. Add Extraversion. Check “Save standardized values as variables.” Run and find ZExtraversion (or similar) in Data View.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'The new variable name is usually Z + variable name.',
    submission: 'Screenshot of Descriptives dialog or Data View with z column.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'z-scores',
    practiceObjectiveKey: 'm4-z-scores',
    title: 'Z-scores in Excel',
    description: 'Use STANDARDIZE for Extraversion.',
    instructions:
      'If Extraversion is in B2:B101, in C2 enter =STANDARDIZE(B2,AVERAGE($B$2:$B$101),STDEV.S($B$2:$B$101)) and fill down.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'STDEV.S is sample SD; match your course convention.',
    submission: 'Screenshot with formula and values.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'z-scores',
    practiceObjectiveKey: 'm4-z-scores',
    title: 'Z-scores in Stata',
    description: 'Standardize Extraversion with egen.',
    instructions:
      '`egen z_ex = std(Extraversion)` then `summarize z_ex` (mean ~0, sd ~1).',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'std() in egen computes (x−mean)/sd by default.',
    submission: 'Screenshot of commands and summarize.',
    order: 2,
    is_active: true
  },

  // --- m4-normality (order 3) ---
  {
    module: 'module-4',
    topic: 'normality',
    practiceObjectiveKey: 'm4-normality',
    title: 'Normality check in R (Shapiro–Wilk)',
    description: 'Test Extraversion for normality.',
    instructions:
      '`shapiro.test(data$Extraversion)` on a reasonable N (Shapiro is often used for n roughly 3–5000). Interpret the p-value.',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'Small p suggests departure from normality; use plots too.',
    submission: 'Output of shapiro.test.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'normality',
    practiceObjectiveKey: 'm4-normality',
    title: 'Normality check in SPSS',
    description: 'Shapiro–Wilk or Explore for Extraversion.',
    instructions:
      'Analyze > Descriptive Statistics > Explore. Add Extraversion. Under Plots check Normality plots with tests, or use Shapiro–Wilk from Descriptives if available in your version.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'Explore is a common path for normality tests and Q–Q plots.',
    submission: 'Screenshot of tests output.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'normality',
    practiceObjectiveKey: 'm4-normality',
    title: 'Normality assessment in Excel',
    description: 'Use a histogram and skewness; optional Shapiro if you have Analysis Toolpak / add-in.',
    instructions:
      'Build a histogram for Extraversion. If available, use Descriptive Statistics with skewness/kurtosis. Note: Excel has no built-in Shapiro–Wilk; focus on visual + skewness for this task.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'Compare skewness to rule-of-thumb (|skew| > 1 suggests strong skew).',
    submission: 'Screenshot of histogram or descriptive stats.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'normality',
    practiceObjectiveKey: 'm4-normality',
    title: 'Normality check in Stata',
    description: 'Shapiro–Wilk for Extraversion.',
    instructions:
      '`histogram Extraversion, normal` then `swilk Extraversion`. Interpret p-value.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'swilk has sample size limits; Stata will warn if too large.',
    submission: 'Screenshot of swilk output.',
    order: 3,
    is_active: true
  },

  // --- m4-report-descriptives (order 4) ---
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-report-descriptives',
    title: 'Report descriptives in R',
    description: 'Summarize mean, median, SD, min, max for Extraversion.',
    instructions:
      '`summary()` plus `sd(..., na.rm=TRUE)` or `psych::describe()` / `skimr::skim()` for a compact table. Write 1–2 sentences.',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'Install.packages if using psych or skimr.',
    submission: 'Output + short write-up.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-report-descriptives',
    title: 'Report descriptives in SPSS',
    description: 'Frequencies/Descriptives for Extraversion.',
    instructions:
      'Analyze > Descriptive Statistics > Descriptives. Request mean, median, std deviation, min, max. Summarize in prose.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'Options button selects statistics.',
    submission: 'Table screenshot + 1–2 sentences.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-report-descriptives',
    title: 'Report descriptives in Excel',
    description: 'Use AVERAGE, MEDIAN, STDEV.S, MIN, MAX on Extraversion.',
    instructions:
      'Below your data (or in a summary block), compute all five statistics for the Extraversion column.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'MEDIAN and STDEV.S are in the Formulas ribbon.',
    submission: 'Screenshot of cells with formulas/results + brief interpretation.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-report-descriptives',
    title: 'Report descriptives in Stata',
    description: 'summarize Extraversion with detail.',
    instructions:
      '`summarize Extraversion, detail` reports mean, median, SD-ish spread, min, max. Summarize in prose.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: ', detail gives skewness/kurtosis too.',
    submission: 'Output screenshot + sentences.',
    order: 4,
    is_active: true
  },

  // --- m4-split-by-group (order 5) ---
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-split-by-group',
    title: 'Descriptives by group in R',
    description: 'Compare Extraversion across a grouping variable.',
    instructions:
      '`aggregate(Extraversion ~ Group, data, FUN = mean)` or `dplyr::group_by(Group) %>% summarize(...)` for mean and SD by group.',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'Pick any binary/few-level column (e.g. gender) as Group.',
    submission: 'Output table + 2–3 sentence comparison.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-split-by-group',
    title: 'Descriptives by group in SPSS',
    description: 'Split-file or Explore by group.',
    instructions:
      'Use Data > Split File > Compare groups, then Descriptives for Extraversion; or Explore with factor list for groups.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'Turn Split File off after you finish.',
    submission: 'Output screenshot + comparison sentences.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-split-by-group',
    title: 'Descriptives by group in Excel',
    description: 'Use AVERAGEIF / STDEV.S with IF or a PivotTable.',
    instructions:
      'For each group code, compute mean (and optionally SD) of Extraversion. PivotTable: rows = group, values = Average of Extraversion.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'PivotTable is fastest for multiple groups.',
    submission: 'Screenshot + brief comparison.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-split-by-group',
    title: 'Descriptives by group in Stata',
    description: 'bysort group: summarize Extraversion',
    instructions:
      '`bysort gender: summarize Extraversion` (replace gender with your grouping variable). Compare means across groups.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'Ensure group variable is numeric or string allowed for bysort.',
    submission: 'Output + short write-up.',
    order: 5,
    is_active: true
  },

  // --- m4-z-inspect (order 6) ---
  {
    module: 'module-4',
    topic: 'z-scores',
    practiceObjectiveKey: 'm4-z-inspect',
    title: 'Inspect z-scores in R',
    description: 'Flag cases with |z| ≥ 2 for Extraversion.',
    instructions:
      'After creating z scores, `which(abs(z_ex) >= 2)` or filter rows. Note case numbers or row ids.',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'Use your actual z column name.',
    submission: 'Code/output listing flagged cases.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'z-scores',
    practiceObjectiveKey: 'm4-z-inspect',
    title: 'Inspect z-scores in SPSS',
    description: 'Sort or filter ZExtraversion to find |z| ≥ 2.',
    instructions:
      'Create z-scores (prior task). In Data View, sort descending on Z column or use Select Cases IF abs(ZExtraversion) >= 2.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'Variable name may be ZEXTRAVERSION etc.',
    submission: 'Screenshot showing extreme z rows.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'z-scores',
    practiceObjectiveKey: 'm4-z-inspect',
    title: 'Inspect z-scores in Excel',
    description: 'Use ABS and conditional formatting or filter.',
    instructions:
      'Highlight cells where ABS(z_column) >= 2.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'Conditional formatting > New Rule > formula.',
    submission: 'Screenshot with highlighted rows.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'z-scores',
    practiceObjectiveKey: 'm4-z-inspect',
    title: 'Inspect z-scores in Stata',
    description: 'List cases with abs(z) ≥ 2.',
    instructions:
      '`egen z_ex = std(Extraversion)` then `list if abs(z_ex) >= 2`.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'Adjust variable names to match your dataset.',
    submission: 'Output listing.',
    order: 6,
    is_active: true
  },

  // --- m4-skew-justify (order 7) ---
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-skew-justify',
    title: 'Skew and reporting in R',
    description: 'Use skewness and plots to justify mean/SD vs median/IQR.',
    instructions:
      '`moments::skewness` or `e1071::skewness` on Extraversion; optional ggplot histogram. Write 2–3 sentences on whether mean/SD or median/IQR is more appropriate.',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'If skew is large or outliers dominate, prefer median/IQR.',
    submission: 'Plot/stat + short justification.',
    order: 7,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-skew-justify',
    title: 'Skew and reporting in SPSS',
    description: 'From Descriptives or Explore, use skewness and plot.',
    instructions:
      'Request skewness and histogram. Argue for mean/SD vs median/IQR in 2–3 sentences.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'Explore provides plots + normality skew info.',
    submission: 'Output + justification.',
    order: 7,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-skew-justify',
    title: 'Skew and reporting in Excel',
    description: 'Use SKEW function and histogram.',
    instructions:
      '=SKEW(range) for Extraversion. Build histogram. Justify mean/SD vs median/IQR.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'SKEW uses sample skewness.',
    submission: 'Screenshot + short paragraph.',
    order: 7,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    practiceObjectiveKey: 'm4-skew-justify',
    title: 'Skew and reporting in Stata',
    description: 'summarize, detail + histogram.',
    instructions:
      '`summarize Extraversion, detail` and `histogram Extraversion, normal`. Justify reporting choice.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'detail shows skewness and kurtosis.',
    submission: 'Output + justification.',
    order: 7,
    is_active: true
  }
]
