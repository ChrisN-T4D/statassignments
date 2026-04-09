/**
 * Data Analysis Helper — recipes for Excel, jamovi, and SPSS.
 * Used by DataAnalysisHelper.vue: chooser filters analyses by criteria; each
 * analysis has step-by-step instructions per software.
 */

/** @typedef {'numeric'|'categorical'} VariableMain */
/** @typedef {'excel'|'jamovi'|'spss'} SoftwareId */

/**
 * Goal values must match analysis.criteria.goals entries.
 */
export const GOAL_OPTIONS = [
  { value: 'describe', label: 'Summarize only (tables, graphs, N, mean, SD — no inferential test)', variableMain: 'any' },
  { value: 'one_sample', label: 'Compare one sample mean to a fixed number (population mean μ)', variableMain: 'numeric' },
  { value: 'two_independent', label: 'Compare two unrelated / independent groups on a numeric outcome', variableMain: 'numeric' },
  { value: 'paired', label: 'Same people measured twice (before/after, matched pairs)', variableMain: 'numeric' },
  { value: 'three_plus_groups', label: 'Compare three or more groups on one numeric outcome', variableMain: 'numeric' },
  { value: 'correlation', label: 'Measure strength of association between two numeric variables', variableMain: 'numeric' },
  { value: 'simple_regression', label: 'Predict one numeric outcome from one numeric predictor', variableMain: 'numeric' },
  { value: 'chi_gof', label: 'Test whether category frequencies match expected counts (goodness of fit)', variableMain: 'categorical' },
  { value: 'chi_independence', label: 'Test association between two categorical variables (contingency table)', variableMain: 'categorical' }
]

export const VARIABLE_MAIN_OPTIONS = [
  { value: 'numeric', label: 'My main outcome is numeric (measurements, scores, scales)' },
  { value: 'categorical', label: 'My main variables are categorical (groups, yes/no, nominal/ordinal codes)' }
]

/**
 * @param {{ variableMain?: string, goal?: string } | null} choices
 * @returns {typeof ANALYSES}
 */
export function filterAnalyses (choices) {
  if (!choices || (!choices.variableMain && !choices.goal)) {
    return [...ANALYSES]
  }
  return ANALYSES.filter((a) => {
    const c = a.criteria
    if (choices.variableMain && c.variableMain && !c.variableMain.includes(choices.variableMain)) {
      return false
    }
    if (choices.goal && c.goals && !c.goals.includes(choices.goal)) {
      return false
    }
    return true
  })
}

function steps (...lines) {
  return lines
}

const reporting = {
  reportStats: 'Report the test name, relevant statistics (e.g. t, df, p), and effect size if your instructor requires it. State whether you reject H₀ at α = .05.',
  checkAssumptions: 'Mention whether you checked assumptions (normality, homogeneity of variance, expected counts ≥ 5, etc.) as your course requires.'
}

/** Full recipe list */
export const ANALYSES = [
  {
    id: 'descriptives',
    title: 'Descriptive statistics',
    summary: 'Summarize your data with N, mean, median, SD, range, and graphs. Use when the assignment asks for summaries or exploration only.',
    criteria: {
      variableMain: ['numeric', 'categorical'],
      goals: ['describe']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-descriptive-stats',
        label: 'jamovi walkthrough: descriptive statistics & variability'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['Data open in jamovi', 'Variables have correct measure type (Nominal / Ordinal / Continuous)'],
        steps: steps(
          'Analyses → Exploration → Descriptives.',
          'Drag variables into the Variables box.',
          'Open Statistics and Plots to choose mean, median, SD, range, histograms, etc.',
          'Results appear in the right-hand Results panel.'
        ),
        reportingTips: [reporting.reportStats, 'For “describe only” tasks, paste tables or values the assignment lists (N, mean, SD, etc.).']
      },
      spss: {
        prerequisites: ['Data in Data View', 'Variable View: Type and Measure set correctly'],
        steps: steps(
          'Analyze → Descriptive Statistics → Descriptives (or Frequencies for categorical counts).',
          'Move variables into the Variable(s) list.',
          'Click Options… to select mean, SD, range, etc.',
          'For graphs: Graphs → Chart Builder (or legacy dialogs as taught in your course).',
          'Output appears in the Output window.'
        ),
        reportingTips: [reporting.reportStats]
      },
      excel: {
        prerequisites: ['Data in columns with headers', 'If needed: Data → Data Analysis (Analysis ToolPak enabled)'],
        steps: steps(
          'For quick summaries: use AVERAGE, MEDIAN, STDEV.S, MIN, MAX on a column.',
          'Data Analysis → Descriptive Statistics: select the input range, check Labels in first row, choose output range.',
          'For counts of categories: PivotTable or COUNTIF.',
          'Charts: Insert → recommended charts (histogram may need Analysis ToolPak or manual bins).'
        ),
        reportingTips: ['Paste Excel output or screenshot as required; label every statistic you report.']
      }
    }
  },
  {
    id: 'one_sample_t',
    title: 'One-sample t-test',
    summary: 'Test whether the mean of one sample differs from a specified value (e.g. μ = 100).',
    criteria: {
      variableMain: ['numeric'],
      goals: ['one_sample']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-module-8-unified',
        label:
          'jamovi walkthrough: one-sample t-test (same course lesson also covers other tests)'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['One continuous variable', 'Hypothesized μ from assignment'],
        steps: steps(
          'Analyses → T-Tests → One Sample T-Test.',
          'Move your outcome variable into the Variables box.',
          'Enter the test value (μ) your assignment specifies.',
          'Read t, df, and p in the results table.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      },
      spss: {
        prerequisites: ['One numeric variable in Data View'],
        steps: steps(
          'Analyze → Compare Means → One-Sample T Test.',
          'Select your test variable.',
          'Enter the Test Value (μ).',
          'Run; read t, df, Sig. (two-tailed) in the output.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      },
      excel: {
        prerequisites: ['Analysis ToolPak: Data → Data Analysis'],
        steps: steps(
          'Data → Data Analysis → t-Test: Paired Two Sample for Mean is for paired data; for one-sample, compute manually or use formulas.',
          'Practical path in Excel: calculate sample mean and SD, then t = (mean − μ) / (SD/√n); use T.DIST.2T for two-tailed p.',
          'Alternatively export data to jamovi/SPSS if your instructor prefers menu-driven output.'
        ),
        reportingTips: ['Show mean, SD, n, test value, computed t, and p; or submit software output from jamovi/SPSS if allowed.']
      }
    }
  },
  {
    id: 'independent_t',
    title: 'Independent-samples t-test',
    summary: 'Compare means of two unrelated groups (e.g. treatment vs control).',
    criteria: {
      variableMain: ['numeric'],
      goals: ['two_independent']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-module-8-unified',
        label:
          'jamovi walkthrough: independent-samples t-test (same lesson includes other analyses)'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['Numeric outcome variable', 'Grouping variable (2 levels) as Nominal'],
        steps: steps(
          'Analyses → T-Tests → Independent Samples T-Test.',
          'Put the outcome under Dependent Variables.',
          'Put the grouping variable under Grouping Variable; define the two groups.',
          'Check equal variances assumption if your course uses Levene’s test; jamovi shows both rows if applicable.'
        ),
        reportingTips: [reporting.reportStats, 'Report which row you use if variances unequal.', reporting.checkAssumptions]
      },
      spss: {
        prerequisites: ['Outcome: numeric; Group: 2-category nominal'],
        steps: steps(
          'Analyze → Compare Means → Independent-Samples T Test.',
          'Test Variable(s): outcome. Grouping Variable: group → Define Groups (codes 1 and 2).',
          'Read Levene and the appropriate t-test line in output.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      },
      excel: {
        prerequisites: ['Analysis ToolPak'],
        steps: steps(
          'Data → Data Analysis → t-Test: Two-Sample Assuming Equal Variances (or Unequal Variances).',
          'Select ranges for each group (including labels if checked).',
          'Output gives t Stat and two-tailed p (P(T≤t) two-tail).'
        ),
        reportingTips: [reporting.reportStats, 'State whether you assumed equal variances.', reporting.checkAssumptions]
      }
    }
  },
  {
    id: 'paired_t',
    title: 'Paired-samples t-test',
    summary: 'Compare two measurements on the same participants (before/after, matched pairs).',
    criteria: {
      variableMain: ['numeric'],
      goals: ['paired']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-module-8-unified',
        label: 'jamovi walkthrough: paired t-test (same lesson includes other analyses)'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['Two numeric columns (time 1 and time 2) or difference column'],
        steps: steps(
          'Analyses → T-Tests → Paired Samples T-Test.',
          'Select the pair of variables (e.g. Pre and Post).',
          'Read mean difference, t, df, p.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      },
      spss: {
        prerequisites: ['Two paired numeric columns'],
        steps: steps(
          'Analyze → Compare Means → Paired-Samples T Test.',
          'Select variable 1 and variable 2 as a pair → arrow to Paired Variables.',
          'Run; report correlation (optional) and paired t output.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      },
      excel: {
        prerequisites: ['Analysis ToolPak'],
        steps: steps(
          'Data → Data Analysis → t-Test: Paired Two Sample for Means.',
          'Select the two columns of paired scores.',
          'Read Mean, Variance, Observations, t Stat, P two-tail.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      }
    }
  },
  {
    id: 'one_way_anova',
    title: 'One-way ANOVA',
    summary: 'Compare means across three or more independent groups on one numeric outcome.',
    criteria: {
      variableMain: ['numeric'],
      goals: ['three_plus_groups']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-module-8-unified',
        label: 'jamovi walkthrough: one-way ANOVA (same lesson includes other analyses)'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['Numeric dependent variable', 'Factor with 3+ levels (Nominal)'],
        steps: steps(
          'Analyses → ANOVA → One-Way ANOVA.',
          'Dependent Variable: outcome. Grouping Variable: factor.',
          'Request post hoc tests (e.g. Tukey) if the omnibus F is significant and your assignment asks for pairwise comparisons.'
        ),
        reportingTips: [reporting.reportStats, 'Report F, df between/within, p; then post hocs if applicable.', reporting.checkAssumptions]
      },
      spss: {
        prerequisites: ['DV numeric; factor categorical'],
        steps: steps(
          'Analyze → Compare Means → One-Way ANOVA (or General Linear Model → Univariate for more options).',
          'Dependent List: outcome. Factor: group.',
          'Post Hoc… → choose Tukey (or as instructed). Options → Descriptive.',
          'If homogeneity of variance is doubtful, use GLM or Welch-style alternatives as your course teaches.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      },
      excel: {
        prerequisites: ['Analysis ToolPak', 'Data stacked: all scores in one column, group codes in another'],
        steps: steps(
          'Data → Data Analysis → Anova: Single Factor.',
          'Input Range: include both groups column and scores (or use ranges as dialog expects).',
          'Check Grouped by Columns or Rows to match your layout.',
          'Output: F, p-value, and summary statistics. Excel’s single-factor ANOVA assumes roughly equal variances.'
        ),
        reportingTips: [reporting.reportStats, 'Post hoc tests often require jamovi/SPSS or manual comparisons—follow your assignment.', reporting.checkAssumptions]
      }
    }
  },
  {
    id: 'correlation',
    title: 'Correlation (Pearson / Spearman)',
    summary: 'Quantify linear (Pearson) or monotonic (Spearman) association between two numeric variables.',
    criteria: {
      variableMain: ['numeric'],
      goals: ['correlation']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-module-8-unified',
        label: 'jamovi walkthrough: correlation (same lesson includes regression & more)'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['Two continuous variables'],
        steps: steps(
          'Analyses → Regression → Correlation Matrix.',
          'Add both variables; choose Pearson (default) or Spearman in options.',
          'Read r and p for each pair.'
        ),
        reportingTips: [reporting.reportStats, 'Note direction (+/−) and strength; do not claim causation from correlation alone.']
      },
      spss: {
        prerequisites: ['Two numeric variables'],
        steps: steps(
          'Analyze → Correlate → Bivariate.',
          'Select variables; choose Pearson and/or Spearman.',
          'Two-tailed Sig. is the usual p-value for H₀: ρ = 0.'
        ),
        reportingTips: [reporting.reportStats]
      },
      excel: {
        prerequisites: ['Two columns of paired data'],
        steps: steps(
          'Use CORREL(array1, array2) for Pearson r.',
          'For p-value: Data Analysis → Regression (predict one from the other) and use overall F/t output, or use jamovi/SPSS for full inference.',
          'Data Analysis → Correlation may be available depending on Excel version/add-ins.'
        ),
        reportingTips: ['Report r and n; explain how you obtained p if using Excel formulas.', reporting.reportStats]
      }
    }
  },
  {
    id: 'simple_regression',
    title: 'Simple linear regression',
    summary: 'Predict a numeric outcome from one numeric predictor; tests whether the slope differs from zero.',
    criteria: {
      variableMain: ['numeric'],
      goals: ['simple_regression']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-module-8-unified',
        label: 'jamovi walkthrough: linear regression (same lesson includes correlation & more)'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['Outcome Y and predictor X both continuous'],
        steps: steps(
          'Analyses → Regression → Linear Regression.',
          'Dependent Variable: Y. Covariates: X.',
          'Inspect model fit (R²), slope, intercept, t, p for the predictor.'
        ),
        reportingTips: [reporting.reportStats, 'Distinguish correlation (symmetric) from regression (prediction); report equation if asked (Ŷ = a + bX).']
      },
      spss: {
        prerequisites: ['Y and X numeric'],
        steps: steps(
          'Analyze → Regression → Linear.',
          'Dependent: Y. Independent(s): X.',
          'Request Model Summary and Coefficients tables.'
        ),
        reportingTips: [reporting.reportStats]
      },
      excel: {
        prerequisites: ['Analysis ToolPak'],
        steps: steps(
          'Data → Data Analysis → Regression.',
          'Y range: outcome column. X range: predictor column. Labels if needed.',
          'Output: R², coefficients, t stats, p-values.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      }
    }
  },
  {
    id: 'chi_square_gof',
    title: 'Chi-square goodness of fit',
    summary: 'Test whether observed category counts match a theoretical distribution (specified proportions).',
    criteria: {
      variableMain: ['categorical'],
      goals: ['chi_gof']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-module-8-unified',
        label: 'jamovi walkthrough: chi-square goodness of fit (same lesson includes other tests)'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['One categorical variable (or frequency table as taught in your course)'],
        steps: steps(
          'Analyses → Frequencies → One Sample Proportions (or χ² Goodness of Fit, depending on jamovi version).',
          'Enter expected proportions or counts as your assignment specifies.',
          'Read χ², df, p.'
        ),
        reportingTips: [reporting.reportStats, 'Check expected frequencies ≥ 5 rule (or use Fisher as instructed).']
      },
      spss: {
        prerequisites: ['One categorical variable'],
        steps: steps(
          'Analyze → Nonparametric Tests → One Sample… (legacy: Analyze → Nonparametric → Legacy Dialogs → Chi-square if available).',
          'Define expected values from all categories equal or custom probabilities.',
          'Report χ², df, Asymp. Sig.'
        ),
        reportingTips: [reporting.reportStats]
      },
      excel: {
        prerequisites: ['Observed counts and expected counts/proportions in cells'],
        steps: steps(
          'Compute χ² = Σ (O − E)² / E in helper cells; df = (#categories − 1 − #estimated params).',
          'Use CHISQ.TEST(observed_range, expected_range) for a shortcut when expected are proportional.',
          'For formal reporting, confirm with your instructor or use jamovi/SPSS output.'
        ),
        reportingTips: [reporting.reportStats, 'Show observed vs expected table in your write-up.']
      }
    }
  },
  {
    id: 'chi_square_independence',
    title: 'Chi-square test of independence',
    summary: 'Test whether two categorical variables are associated (contingency table).',
    criteria: {
      variableMain: ['categorical'],
      goals: ['chi_independence']
    },
    relatedLessonLinks: [
      {
        lessonId: 'jamovi-module-8-unified',
        label:
          'jamovi walkthrough: chi-square test of independence (same lesson includes other tests)'
      }
    ],
    bySoftware: {
      jamovi: {
        prerequisites: ['Row variable and column variable (both nominal/ordinal)'],
        steps: steps(
          'Analyses → Frequencies → Independent Samples (χ² test of association).',
          'Rows: one variable. Columns: the other.',
          'Inspect contingency table, χ², df, p; use Fisher’s exact if small expected counts.'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      },
      spss: {
        prerequisites: ['Two categorical variables'],
        steps: steps(
          'Analyze → Descriptive Statistics → Crosstabs.',
          'Rows and Columns: your two variables.',
          'Statistics… → Chi-square. Cells… → Expected (and Observed).',
          'Read Pearson Chi-Square (or Fisher Exact if sparse).'
        ),
        reportingTips: [reporting.reportStats, reporting.checkAssumptions]
      },
      excel: {
        prerequisites: ['Contingency table of counts'],
        steps: steps(
          'Build observed frequency table in a range.',
          'Expected for independence: (row total × column total) / grand total per cell.',
          'CHISQ.TEST(observed_range, expected_range) returns p for the independence test.',
          'Compute χ² manually Σ(O−E)²/E if the assignment requires showing work.'
        ),
        reportingTips: [reporting.reportStats, 'Paste table of observed (and expected) frequencies.', reporting.checkAssumptions]
      }
    }
  }
]

export const SOFTWARE_TABS = [
  { id: 'jamovi', label: 'jamovi' },
  { id: 'spss', label: 'SPSS' },
  { id: 'excel', label: 'Excel' }
]
