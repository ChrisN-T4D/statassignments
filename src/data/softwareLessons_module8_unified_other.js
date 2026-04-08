// Module 8: Full unified lessons for SPSS, R, Excel, Stata — same scope and pedagogy as jamovi-module-8-unified

const M8_OBJECTIVES = [
  'Perform a chi-square goodness-of-fit test to compare observed frequencies to expected frequencies',
  'Perform a chi-square test of independence to examine relationships between two categorical variables',
  'Perform an independent samples t-test to compare means between two groups',
  'Perform a paired samples t-test for repeated measures or matched pairs',
  'Perform a one-sample t-test to compare a sample mean to a known value',
  'Calculate and interpret Pearson and Spearman correlation coefficients',
  'Perform simple linear regression with one predictor',
  'Perform multiple regression with several predictors',
  'Perform a one-way ANOVA to compare means across three or more groups',
  'Check assumptions for all statistical tests',
  'Calculate and interpret effect sizes for all analyses',
  'Report results in APA format'
]

function m8SelfCheck (softwareLabel) {
  return {
    screenshotRecognition: [
      {
        id: `m8-scenario-anova-${softwareLabel}`,
        question:
          `You are using ${softwareLabel}. An output table shows **F(2, 57) = 8.42, p = .001** comparing means across **three groups** (e.g. three teaching methods). Which procedure does this summary typically come from?`,
        options: [
          'Independent samples t-test (two groups only)',
          'One-way ANOVA (three or more independent groups)',
          'Chi-square test of independence (two categorical variables)',
          'Pearson correlation (two continuous variables)'
        ],
        correct: 1,
        explanation:
          'An F-ratio with df between = 2 (three groups → df = k−1 = 2) and a test of multiple means indicates one-way ANOVA (or a related omnibus F in regression/GLM).'
      }
    ],
    errorDiagnostic: [
      {
        id: 'error-wrong-test-m8',
        scenario:
          'You want to compare exam scores across **four** teaching methods, but you ran **six separate independent t-tests** (every pair of methods).',
        errorMessage: 'Inflated Type I error (α)',
        options: [
          'Keep all pairwise t-tests — they are more detailed',
          'Use **one-way ANOVA** first, then justified post-hoc or planned comparisons',
          'Use correlation to pick the “best” method',
          'Use only chi-square tests'
        ],
        correct: 1,
        explanation:
          'Multiple t-tests without correction inflate the family-wise error rate. Start with one-way ANOVA (or regression with dummy codes), then use post-hoc tests (e.g. Tukey) with appropriate correction.'
      }
    ],
    outputInterpretation: [
      {
        id: `m8-regression-text-${softwareLabel}`,
        question:
          '<p>Suppose your <strong>simple regression</strong> output includes:</p><ul><li><strong>R² = .46</strong></li><li><strong>F(1, 98) = 83.4, p &lt; .001</strong></li><li>Predictor <strong>Hours_Studied</strong>: <strong>b = 5.2</strong>, <strong>p &lt; .001</strong></li></ul><p>In your own words: What does R² tell you about model fit? Is the predictor statistically significant? (Software-agnostic interpretation.)</p>',
        placeholder:
          'e.g. R² is proportion of variance explained; p < .05 for the slope means a significant linear relationship...',
        hint: 'Link R² to “variance explained”; link p on the slope to “reject H₀ that β₁ = 0”.',
        requiredKeywords: [
          'variance',
          'explained',
          'R²',
          'R-squared',
          'r-squared',
          'model',
          'fit',
          'significant',
          'significance',
          'p',
          'predict',
          'predictor',
          'slope',
          'relationship'
        ],
        minRequiredKeywords: 3,
        feedback:
          'R² is the proportion of variance in the outcome explained by the model (here, one predictor). A significant p-value for the predictor (often < .05) means you reject the null that there is no linear relationship in the population.'
      }
    ]
  }
}

function m8YouDo () {
  return {
    type: 'independent_practice',
    title: 'Apply Your Skills',
    instructions:
      'Complete the Module 8 software practice tasks for your package on the class **Software Practice** tab. Re-run each analysis type (χ², t-tests, correlation, regression, ANOVA) on practice data and draft short APA-style sentences using the effect sizes and p-values your software reports.'
  }
}

// --- SPSS sections (mirror Jamovi structure) ---
const m8SectionsSPSS = [
  {
    id: 'chi-square-goodness-of-fit',
    title: 'Chi-Square Goodness-of-Fit Test in SPSS',
    objectives: [
      'Perform a chi-square goodness-of-fit test to compare observed frequencies to expected frequencies',
      'Interpret the chi-square statistic and p-value',
      'Calculate and interpret effect size (Cramér\'s V)',
      'Check assumptions for chi-square tests'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          'The **goodness-of-fit** χ² test asks whether observed category counts match a hypothesized distribution (equal or custom proportions).'
      },
      {
        type: 'callout',
        style: 'info',
        content:
          '**Example:** A die rolled 60 times — do all six faces appear equally often (fair die), or is one face over-represented?'
      },
      {
        type: 'text',
        content:
          '**Data:** One categorical variable (or frequency-weighted cases). You must know **observed counts** (or raw cases) and **expected proportions** under H₀ (e.g. 1/6 each for a fair die).'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n1. **Analyze → Nonparametric Tests → One Sample…** (new workflow) and choose **Customize tests** → **χ² Goodness-of-Fit**, **OR** use **Analyze → Nonparametric Tests → Legacy Dialogs → Chi-square…** for a single variable with **Expected values** (equal or custom).\n2. Move the category variable into the test field; define expected proportions or use **All categories equal**.\n3. In the output, find **Chi-Square**, **df**, **Asymptotic Significance (2-sided)**. Request **Effect size** if available in your version (or compute V from χ², df, N using course notes).'
      },
      {
        type: 'text',
        content:
          '**Interpret**\n\n- Large χ² → observed counts diverge from expected.\n- **p < .05** → reject H₀ of the specified expected distribution.\n- Report χ², df, p, N, and (if taught) **Cramér’s V** for effect size.\n\n**Assumptions:** independent observations; **expected frequency ≥ 5** in most cells (otherwise consider exact tests or collapsing categories).'
      },
      {
        type: 'callout',
        style: 'warning',
        content: 'If many expected counts are small, SPSS may warn you; consult your instructor about **exact** or **Monte Carlo** options.'
      }
    ]
  },
  {
    id: 'chi-square-independence',
    title: 'Chi-Square Test of Independence in SPSS',
    objectives: [
      'Perform a chi-square test of independence to examine relationships between two categorical variables',
      'Create and interpret contingency tables',
      'Calculate and interpret effect size (Cramér\'s V)',
      'Check assumptions and report results'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          'The **test of independence** asks whether two categorical variables are **associated** (H₁) or **independent** (H₀).'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** Is **Gender** related to **Voting preference** (D/R/Independent)?'
      },
      {
        type: 'text',
        content:
          '**Data:** Two categorical variables per row (or aggregated counts with weighting). Each participant counted once.'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n1. **Analyze → Descriptive Statistics → Crosstabs**.\n2. Place one variable in **Rows**, the other in **Columns**.\n3. Click **Statistics** → check **Chi-square**; optionally **Phi and Cramer’s V**.\n4. Click **Cells** → check **Expected** counts; add **Row**, **Column**, or **Total** **%** as your instructor prefers.\n5. **OK** — read **Pearson Chi-Square** (or Fisher’s Exact if shown for small expected counts).'
      },
      {
        type: 'text',
        content:
          '**Interpret**\n\n- **p < .05** → reject independence; variables are associated.\n- **Cramér’s V** (0–1): small ~.10, medium ~.30, large ~.50 (interpret with k×m table size).\n- Compare **observed vs expected** cells to describe the pattern (e.g. more males than expected in one column).'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Pattern (illustrative):** χ²(2) = 15.8, **p < .001**, **V ≈ .18** — significant but **small** association; inspect % within rows/columns to describe.'
      },
      {
        type: 'callout',
        style: 'warning',
        content:
          '**Assumptions:** independence; expected counts **≥ 5** in ≥80% of cells (rule of thumb). If violated, use **Fisher’s Exact** (2×2) or collapse categories.'
      }
    ]
  },
  {
    id: 'independent-t-test',
    title: 'Independent Samples T-Test in SPSS',
    objectives: [
      'Perform an independent samples t-test to compare means between two groups',
      'Check assumptions (normality, homogeneity of variance)',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Report results in APA format'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          'Compares **means of two unrelated groups** (e.g. men vs women) on a **continuous** outcome.'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** Do **Anxiety_Score** means differ by **Gender**?'
      },
      {
        type: 'text',
        content:
          '**Data:** **Grouping variable** (2 levels, coded numerically or as string) + **Dependent variable** (scale).'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n1. **Analyze → Compare Means → Independent-Samples T Test** (or **Analyze → Compare Means → Independent Samples T Test** depending on version).\n2. **Test Variable(s):** outcome (e.g. Anxiety_Score).\n3. **Grouping Variable:** e.g. Gender → **Define Groups** (1 and 2, or the two string codes).\n4. **Options:** request **Confidence intervals**; **Missing values** analysis-by-analysis or listwise as appropriate.'
      },
      {
        type: 'text',
        content:
          '**Output**\n\n- **Levene’s Test for Equality of Variances**:\n  - **p > .05** → use the row **“Equal variances assumed”**.\n  - **p < .05** → use **“Equal variances not assumed”** (Welch).\n- Read **t**, **df**, **p (2-tailed)**, mean difference, CI.\n- **Effect size:** **Analyze → Compare Means → Means…** with effect size options if available, or compute **Cohen’s d** from means and pooled SD (course formula).'
      },
      {
        type: 'text',
        content:
          '**Normality:** With small n, check **Shapiro-Wilk** per group (**Analyze → Descriptive Statistics → Explore → Plots**) or Q-Q plots; with **n > 30** per group, t-test is often robust.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Illustrative write-up:** *Women (M = 68.2, SD = 12.4) reported higher anxiety than men (M = 58.7, SD = 11.8), t(118) = 3.45, p = .001, d = 0.63.* (Numbers for illustration — use your output.)'
      }
    ]
  },
  {
    id: 'paired-t-test',
    title: 'Paired Samples T-Test in SPSS',
    objectives: [
      'Perform a paired samples t-test for repeated measures or matched pairs',
      'Check normality of difference scores',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Understand when to use paired vs independent t-tests'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          'Same participants (or matched pairs) measured **twice** — compares **mean difference** between two columns (e.g. Before vs After).'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** **Weight_Before** vs **Weight_After** for each client.'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n1. **Analyze → Compare Means → Paired-Samples T Test**.\n2. Select the **pair** (Variable1, Variable2) and move to **Paired Variables**.\n3. **Options:** CI for mean difference.\n4. Output: **Paired Samples Test** table — t on **differences**, df = N−1 pairs.'
      },
      {
        type: 'text',
        content:
          '**Assumption:** Differences approximately normal (Shapiro-Wilk on **computed difference** via **Transform → Compute**: Diff = After − Before, then **Explore** on Diff). Large N → robust.'
      },
      {
        type: 'text',
        content:
          '**Effect size:** Cohen’s **d_z** for paired designs = mean difference / SD of differences (use output SD of difference if provided).'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Illustrative:** *Mean weight decreased by 8.6 lbs, t(49) = 6.82, p < .001, 95% CI [−11.1, −6.1].*'
      },
      {
        type: 'callout',
        style: 'warning',
        content:
          '**Paired** = same people twice or matched pairs. **Independent** = different people in each group. Wrong choice → wrong inference.'
      }
    ]
  },
  {
    id: 'one-sample-t-test',
    title: 'One-Sample T-Test in SPSS',
    objectives: [
      'Perform a one-sample t-test to compare a sample mean to a known value',
      'Check normality assumption',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Understand when to use a one-sample t-test'
    ],
    estimatedTime: 15,
    content: [
      {
        type: 'text',
        content: 'Tests **H₀: μ = μ₀** vs two- or one-sided alternative for **one** continuous variable.'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** Is mean **IQ** of gifted students **> 100**?'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n**Analyze → Compare Means → One-Sample T Test** → select **Test Variable(s)** → enter **Test Value** (μ₀). Request **Options** CI; compare **Sig. (2-tailed)** to α.'
      },
      {
        type: 'text',
        content:
          '**Effect size:** Cohen’s **d** = (M − μ₀) / s (sample SD). Some versions offer effect size via **Options** or use syntax/extensions.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Illustrative:** *M = 118.4, SD = 12.6, t(49) = 10.34, p < .001, vs test value 100; mean difference 18.4.*'
      }
    ]
  },
  {
    id: 'correlation',
    title: 'Correlation Analysis in SPSS',
    objectives: [
      'Calculate and interpret Pearson and Spearman correlation coefficients',
      'Create correlation matrices for multiple variables',
      'Test significance of correlations',
      'Create and interpret scatterplots'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          '**Pearson r:** linear association, continuous (roughly normal). **Spearman:** monotonic / ordinal / robust to outliers.'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** **Hours_Studied** vs **Exam_Score**.'
      },
      {
        type: 'text',
        content:
          '**Scatterplot first:** **Graphs → Chart Builder → Scatter/Dot** — check linearity, outliers, homoscedasticity.'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n**Analyze → Correlate → Bivariate** → move variables → check **Pearson** and/or **Spearman** → **Two-tailed** (usually) → **OK**. For many variables, SPSS prints a **correlation matrix** with **Sig. (2-tailed)** per pair.'
      },
      {
        type: 'text',
        content:
          '**Interpret |r|:** ~.10–.29 small, .30–.49 moderate, .50+ strong (rules of thumb). **p < .05** → reject H₀ that ρ = 0.'
      },
      {
        type: 'callout',
        style: 'example',
        content: '**Illustrative:** *r = .68, p < .001* — strong positive linear association.'
      },
      {
        type: 'callout',
        style: 'warning',
        content: '**Correlation ≠ causation.** Third variables and direction of causality not established by r alone.'
      }
    ]
  },
  {
    id: 'simple-regression',
    title: 'Simple Linear Regression in SPSS',
    objectives: [
      'Perform simple linear regression with one predictor',
      'Interpret regression coefficients (intercept and slope)',
      'Evaluate model fit (R², adjusted R²)',
      'Check regression assumptions using diagnostic plots'
    ],
    estimatedTime: 30,
    content: [
      {
        type: 'text',
        content:
          'Predict **Y** from **one X**: **Ŷ = b₀ + b₁X**. **R²** = proportion of variance in Y explained.'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** Predict **Exam_Score** from **Hours_Studied**.'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n**Analyze → Regression → Linear** → **Dependent:** Exam_Score → **Independent(s):** Hours_Studied.\n\n**Statistics:** Estimates, **Model fit**, **Descriptives**; **Plots:** *ZRESID* vs *ZPRED* (residual plot), **Histogram** of residuals.\n\n**Save:** Unstandardized **Predicted** and **Residuals** if needed.'
      },
      {
        type: 'text',
        content:
          '**Read output:** **ANOVA** F test for overall model; **Coefficients** for **B** (intercept, slope), **t**, **Sig.**; **Model Summary** for **R**, **R Square**, **Adjusted R Square**.'
      },
      {
        type: 'text',
        content:
          '**Assumptions (residual-based):** roughly normal residuals (histogram/Q-Q); mean residual ≈ 0; homoscedasticity (random cloud in residual vs predicted plot); linearity.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Illustrative:** *Exam_Score = 42.8 + 5.2×Hours; R² = .46, F(1,98) = 83.4, p < .001; Hours b = 5.2, p < .001.*'
      }
    ]
  },
  {
    id: 'multiple-regression',
    title: 'Multiple Regression in SPSS',
    objectives: [
      'Perform multiple regression with several predictors',
      'Interpret standardized and unstandardized coefficients',
      'Compare nested models and assess individual predictor contributions',
      'Understand multicollinearity and VIF'
    ],
    estimatedTime: 35,
    content: [
      {
        type: 'text',
        content:
          '**Y** predicted from **several Xs** simultaneously — each **b** is the change in Y per 1-unit X **holding others constant**.'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** **Salary** ~ **Experience + Education + Age**.'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n**Analyze → Regression → Linear** → **Dependent:** Salary → **Independents:** block all predictors (continuous in same box; categorical predictors as **dummy variables** or use **Categorical** button if available).\n\n**Statistics:** **Estimates**, **Model fit**, **R squared change**, **Collinearity diagnostics** (**VIF**, tolerance).\n\n**Plots:** residual diagnostics as in simple regression.'
      },
      {
        type: 'text',
        content:
          '**Standardized coefficients (Beta)** — compare **relative** importance (same scale). **Unstandardized b** — prediction in original units.\n\n**VIF:** > 5 moderate concern; > 10 strong **multicollinearity** (unstable coefficients).'
      },
      {
        type: 'text',
        content:
          '**R²** rises with any added predictor; **Adjusted R²** penalizes extra predictors — use for comparing models with different numbers of terms.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Illustrative:** *R² = .68, Adj R² = .66; Experience and Education significant; Age p = .268; VIFs < 2.*'
      },
      {
        type: 'callout',
        style: 'warning',
        content: 'High VIF → keep one of redundant predictors, combine, or use regularization (advanced).'
      }
    ]
  },
  {
    id: 'one-way-anova',
    title: 'Running a One-Way ANOVA in SPSS',
    objectives: [
      'Perform a one-way ANOVA to compare means across three or more groups',
      'Interpret the F-ratio, p-value, and effect size (eta-squared)',
      'Conduct post-hoc tests with appropriate corrections for multiple comparisons',
      'Check assumptions using Levene\'s test and Q-Q plots'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          '**One-way ANOVA:** one categorical factor (≥3 levels), one continuous DV — omnibus test: **any** mean differs.'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** **Exam_Score** by **Study_Method** (Visual / Auditory / Kinesthetic).'
      },
      {
        type: 'text',
        content:
          '**Data layout:** **DV** scale; **Factor** nominal with ≥3 levels (one row per participant).'
      },
      {
        type: 'text',
        content:
          '**Run in SPSS**\n\n**Analyze → Compare Means → One-Way ANOVA** → **Dependent List:** Exam_Score → **Factor:** Study_Method.\n\n**Options:** **Descriptive**, **Homogeneity of variance test** (**Levene**), **Brown-Forsythe** / **Welch** if unequal variances.\n\n**Post Hoc:** **Tukey** (common) or **Bonferroni** / **Scheffé** per course.\n\n**Plots:** optional means plot.'
      },
      {
        type: 'text',
        content:
          '**If Levene p < .05:** variances unequal — report **Welch** or **Brown-Forsythe** if available, or robust ANOVA per instructor.\n\n**Effect size:** **η²** or **ω²** from **Options** or compute (course notes).'
      },
      {
        type: 'text',
        content:
          '**If omnibus F is significant:** interpret **post-hoc** pairwise table (adjusted p) to see **which** groups differ.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Illustrative:** *F(2,57) = 8.42, p = .001, η² = .23; Tukey: Kinesthetic > Visual and Auditory.*'
      }
    ]
  }
]

const m8WeDoSPSS = {
  type: 'guided_practice',
  title: 'Guided Practice: Advanced Statistical Analyses (SPSS)',
  instructions:
    'Work through one short example per analysis in SPSS. Use practice datasets from your course or the class data files.',
  steps: [
    {
      instruction: 'χ² **Goodness-of-fit**: Nonparametric (One Sample / Legacy Chi-square) with expected proportions.',
      hint: 'Analyze → Nonparametric Tests',
      checkpoint: 'χ², df, p in output; check expected counts.'
    },
    {
      instruction: 'χ² **Independence**: **Crosstabs** with Chi-square and Cramér’s V.',
      hint: 'Cells → Expected; Statistics → Chi-square',
      checkpoint: 'Contingency table + p-value.'
    },
    {
      instruction: '**Independent t**: Compare two groups; use correct Levene row.',
      hint: 'Compare Means → Independent-Samples T Test',
      checkpoint: 't, df, p, means reported.'
    },
    {
      instruction: '**Paired t**: Two columns as a pair.',
      hint: 'Compare Means → Paired-Samples T Test',
      checkpoint: 'Mean difference and p.'
    },
    {
      instruction: '**One-sample t**: Test value = μ₀.',
      hint: 'Compare Means → One-Sample T Test',
      checkpoint: 'Mean difference vs test value.'
    },
    {
      instruction: '**Correlation**: Bivariate Pearson/Spearman + Chart Builder scatter.',
      hint: 'Correlate → Bivariate',
      checkpoint: 'r, p, scatter reviewed.'
    },
    {
      instruction: '**Simple regression**: Linear; save residuals; inspect plots.',
      hint: 'Regression → Linear',
      checkpoint: 'R², F, coefficients, residual plot.'
    },
    {
      instruction: '**Multiple regression**: All predictors; request **Collinearity diagnostics**.',
      hint: 'VIF in Coefficients table',
      checkpoint: 'Adjusted R², betas, VIF interpreted.'
    },
    {
      instruction: '**One-way ANOVA**: Factor with 3+ levels; **Tukey** post hoc if F significant.',
      hint: 'Compare Means → One-Way ANOVA',
      checkpoint: 'F, post-hoc pairs, Levene noted.'
    }
  ]
}

// --- R sections ---
const m8SectionsR = [
  {
    id: 'chi-square-goodness-of-fit',
    title: 'Chi-Square Goodness-of-Fit Test in R',
    objectives: [
      'Perform a chi-square goodness-of-fit test to compare observed frequencies to expected frequencies',
      'Interpret the chi-square statistic and p-value',
      'Calculate and interpret effect size (Cramér\'s V)',
      'Check assumptions for chi-square tests'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          'Use **`chisq.test(x, p = ...)`** where **x** is a **vector of observed counts** (or a table) and **p** is the vector of **expected probabilities** (sum to 1). For equal expected frequencies: **`p = rep(1/k, k)`**.'
      },
      {
        type: 'callout',
        style: 'info',
        content: '**Example:** `obs <- c(8,12,9,11,10,10)` for six die faces; `chisq.test(obs, p = rep(1/6,6))`.'
      },
      {
        type: 'text',
        content:
          '**Output:** **`$statistic`** (χ²), **`$parameter`** (df), **`$p.value`**. **`$expected`** shows expected counts — verify **≥ 5** rule.'
      },
      {
        type: 'text',
        content:
          '**Effect size:** Cramér’s V from χ², N, and number of categories (see course formula). Packages like **`effectsize`** may provide **`cramers_v()`** for related designs.'
      },
      {
        type: 'callout',
        style: 'warning',
        content: 'For one-dimensional **table object**, ensure `chisq.test` receives **counts**, not raw unsummarized factor without tabulation (`table()` first if needed).'
      }
    ]
  },
  {
    id: 'chi-square-independence',
    title: 'Chi-Square Test of Independence in R',
    objectives: [
      'Perform a chi-square test of independence to examine relationships between two categorical variables',
      'Create and interpret contingency tables',
      'Calculate and interpret effect size (Cramér\'s V)',
      'Check assumptions and report results'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          '**`tbl <- table(var1, var2)`** then **`chisq.test(tbl)`**. For raw data: **`xtabs(~ gender + vote, data = d)`**.'
      },
      {
        type: 'text',
        content:
          '**Output:** Pearson χ², df, p-value; **`$expected`** table. If expected counts are small, use **`simulate.p.value = TRUE`** in `chisq.test`, or **Fisher’s exact** **`fisher.test(tbl)`** for 2×2.'
      },
      {
        type: 'text',
        content:
          '**Cramér’s V:** **`effectsize::cramers_v(tbl)`** or manual. **`assocstats(tbl)`** in **`vcd`** package gives multiple association measures.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          'Describe **pattern** with **`prop.table(tbl, margin = 1)`** (row %) or **`margin = 2`** (column %).'
      }
    ]
  },
  {
    id: 'independent-t-test',
    title: 'Independent Samples T-Test in R',
    objectives: [
      'Perform an independent samples t-test to compare means between two groups',
      'Check assumptions (normality, homogeneity of variance)',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Report results in APA format'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          '**`t.test(y ~ group, data = d, var.equal = TRUE)`** for Student’s t (equal variances). **Default** `var.equal = FALSE` → **Welch** (unequal variances) — often preferred unless you justify pooling.'
      },
      {
        type: 'text',
        content:
          '**Formula:** **`t.test(Anxiety ~ Gender, data = d)`** with **Gender** as **factor** with two levels.'
      },
      {
        type: 'text',
        content:
          '**Effect size:** **`effectsize::cohens_d(y ~ group, data = d)`** or **`hedges_g()`**. **Normality:** **`shapiro.test()`** per group if n small; **Q-Q plots** `qqnorm` by group.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          'Report: *t(df) = …, p = …, 95% CI […, …]*; group means from **`aggregate(y ~ group, data, mean)`**.'
      }
    ]
  },
  {
    id: 'paired-t-test',
    title: 'Paired Samples T-Test in R',
    objectives: [
      'Perform a paired samples t-test for repeated measures or matched pairs',
      'Check normality of difference scores',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Understand when to use paired vs independent t-tests'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content: '**`t.test(before, after, paired = TRUE)`** or **`t.test(extra = after - before)`** on difference vector.'
      },
      {
        type: 'text',
        content:
          '**Check **`shapiro.test(after - before)`** on differences. **`effectsize::cohens_d(after, before, paired = TRUE)`** for paired d.'
      },
      {
        type: 'callout',
        style: 'warning',
        content: 'Do **not** use `paired = FALSE` for before/after on the **same** subjects.'
      }
    ]
  },
  {
    id: 'one-sample-t-test',
    title: 'One-Sample T-Test in R',
    objectives: [
      'Perform a one-sample t-test to compare a sample mean to a known value',
      'Check normality assumption',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Understand when to use a one-sample t-test'
    ],
    estimatedTime: 15,
    content: [
      {
        type: 'text',
        content: '**`t.test(iq, mu = 100)`** — two-sided by default; **`alternative = "greater"`** for one-sided.'
      },
      {
        type: 'text',
        content: '**Effect size:** **`effectsize::cohens_d(iq, mu = 100)`** (one-sample d).'
      }
    ]
  },
  {
    id: 'correlation',
    title: 'Correlation Analysis in R',
    objectives: [
      'Calculate and interpret Pearson and Spearman correlation coefficients',
      'Create correlation matrices for multiple variables',
      'Test significance of correlations',
      'Create and interpret scatterplots'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          '**`cor(x, y, method = "pearson")`**; **`cor.test(x, y)`** gives **CI and p**. **`pairs(df)`** or **`GGally::ggpairs`** for matrix scatterplots.'
      },
      {
        type: 'text',
        content:
          '**Matrix:** **`cor(df[, c("v1","v2","v3")], use = "pairwise.complete.obs")`**. **`psych::corr.test`** gives **p-values** for all pairs.'
      },
      {
        type: 'callout',
        style: 'warning',
        content: '**ggplot2:** **`geom_point`** + **`geom_smooth(method = lm)`** for visual linear trend (do not over-interpret causality).'
      }
    ]
  },
  {
    id: 'simple-regression',
    title: 'Simple Linear Regression in R',
    objectives: [
      'Perform simple linear regression with one predictor',
      'Interpret regression coefficients (intercept and slope)',
      'Evaluate model fit (R², adjusted R²)',
      'Check regression assumptions using diagnostic plots'
    ],
    estimatedTime: 30,
    content: [
      {
        type: 'text',
        content: '**`m <- lm(exam ~ hours, data = d)`**; **`summary(m)`** → **Coefficients**, **R-squared**, **F-statistic**.'
      },
      {
        type: 'text',
        content:
          '**Diagnostics:** **`plot(m)`** — residual vs fitted, Q-Q, scale-location, leverage. **`performance::check_model(m)`** (package **performance**) for visual checks.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Tidy output:** **`broom::tidy(m)`**, **`glance(m)`** for reporting tables.'
      }
    ]
  },
  {
    id: 'multiple-regression',
    title: 'Multiple Regression in R',
    objectives: [
      'Perform multiple regression with several predictors',
      'Interpret standardized and unstandardized coefficients',
      'Compare nested models and assess individual predictor contributions',
      'Understand multicollinearity and VIF'
    ],
    estimatedTime: 35,
    content: [
      {
        type: 'text',
        content:
          '**`lm(salary ~ experience + education + age, data = d)`**. **Standardized:** **`lm(scale(salary) ~ scale(experience) + ...)`** or **`lm.beta`** package; **`summary`** on scaled model gives **beta-like** interpretation.'
      },
      {
        type: 'text',
        content:
          '**VIF:** **`car::vif(m)`** — **GVIF** for factors. **> 5–10** problematic.'
      },
      {
        type: 'text',
        content:
          '**Compare models:** **`anova(m_small, m_big)`** nested F test; **AIC** **`AIC(m1, m2)`**.'
      }
    ]
  },
  {
    id: 'one-way-anova',
    title: 'Running a One-Way ANOVA in R',
    objectives: [
      'Perform a one-way ANOVA to compare means across three or more groups',
      'Interpret the F-ratio, p-value, and effect size (eta-squared)',
      'Conduct post-hoc tests with appropriate corrections for multiple comparisons',
      'Check assumptions using Levene\'s test and Q-Q plots'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          '**`fit <- aov(score ~ method, data = d)`** with **method** as **factor**; **`summary(fit)`** → F and p.'
      },
      {
        type: 'text',
        content:
          '**Levene:** **`car::leveneTest(score ~ method, data = d)`**. If violated → **`oneway.test(score ~ method, data = d, var.equal = FALSE)`** (Welch one-way).'
      },
      {
        type: 'text',
        content:
          '**Post hoc:** **`TukeyHSD(fit)`**; or **`emmeans::emmeans(fit, pairwise ~ method)`** with **multcomp** adjustments per course.'
      },
      {
        type: 'text',
        content:
          '**Effect size:** **`effectsize::eta_squared(fit)`** or **ω²** variants from **effectsize**.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          '**Plot means:** **`ggplot2::ggplot(d, aes(method, score)) + geom_boxplot()`** + points.'
      }
    ]
  }
]

const m8WeDoR = {
  type: 'guided_practice',
  title: 'Guided Practice: Advanced Statistical Analyses (R)',
  instructions: 'Run each analysis in RStudio with a script (.R or Quarto). Use **tidyverse**/**broom**/**effectsize**/**car** as your course allows.',
  steps: [
    { instruction: 'GOF χ²: `chisq.test(obs, p = ...)`', hint: 'Check $expected', checkpoint: 'χ², p, expected counts' },
    { instruction: 'Independence: `chisq.test(table(v1,v2))`', hint: 'prop.table', checkpoint: 'χ² and effect size' },
    { instruction: '`t.test(y ~ g, data = d)`', hint: 'var.equal', checkpoint: 'Welch vs Student' },
    { instruction: '`t.test(before, after, paired=TRUE)`', hint: '', checkpoint: 'Paired result' },
    { instruction: '`t.test(x, mu = μ0)`', hint: '', checkpoint: 'One-sample' },
    { instruction: '`cor.test` + scatterplot', hint: 'ggplot', checkpoint: 'r, p, plot' },
    { instruction: '`lm(y~x)` + `plot(m)`', hint: 'summary(lm)', checkpoint: 'R², residuals' },
    { instruction: '`lm(y~x1+x2)` + `car::vif`', hint: '', checkpoint: 'VIF, Adj R²' },
    { instruction: '`aov` + `TukeyHSD`', hint: 'leveneTest', checkpoint: 'F + pairwise' }
  ]
}

// --- Excel sections ---
const m8SectionsExcel = [
  {
    id: 'chi-square-goodness-of-fit',
    title: 'Chi-Square Goodness-of-Fit in Excel',
    objectives: [
      'Perform a chi-square goodness-of-fit test to compare observed frequencies to expected frequencies',
      'Interpret the chi-square statistic and p-value',
      'Calculate and interpret effect size (Cramér\'s V)',
      'Check assumptions for chi-square tests'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          'Excel has **no single-button GOF** in all versions. Options: (1) **CHISQ.TEST** when you have **observed** and **expected** **counts** in parallel ranges (same length). (2) **Real Statistics Resource Pack** add-in (if allowed). (3) Run in **SPSS/R/Stata** and paste results — acceptable if your instructor allows.'
      },
      {
        type: 'text',
        content:
          '**Manual χ²:** χ² = Σ (O−E)²/E ; df = k−1; **p** = **CHISQ.DIST.RT(χ², df)**.'
      },
      {
        type: 'callout',
        style: 'warning',
        content:
          'For publication-quality GOF, prefer **SPSS/R/Stata**; use Excel to **organize counts** and **compute** χ² if taught.'
      }
    ]
  },
  {
    id: 'chi-square-independence',
    title: 'Chi-Square Test of Independence in Excel',
    objectives: [
      'Perform a chi-square test of independence to examine relationships between two categorical variables',
      'Create and interpret contingency tables',
      'Calculate and interpret effect size (Cramér\'s V)',
      'Check assumptions and report results'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          '**Contingency table:** PivotTable counts for **Row** = variable A, **Columns** = B. **CHISQ.TEST(actual_range, expected_range)** where **expected** = row total × column total / grand total for each cell.'
      },
      {
        type: 'text',
        content:
          '**CHISQ.TEST** returns **p-value** only (not χ² statistic directly in older versions) — newer builds may differ; verify with **Data → Data Types** / function help.'
      },
      {
        type: 'text',
        content:
          '**Cramér’s V:** compute from χ², N, r, c (course formula). **Conditional %** from PivotTable **Show Values As** → **% of row** / **column**.'
      }
    ]
  },
  {
    id: 'independent-t-test',
    title: 'Independent Samples T-Test in Excel',
    objectives: [
      'Perform an independent samples t-test to compare means between two groups',
      'Check assumptions (normality, homogeneity of variance)',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Report results in APA format'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          '**Data Analysis ToolPak:** **t-Test: Two-Sample Assuming Equal Variances** or **Unequal Variances**. Stack **Y** in one column and **group code** in another, or use **two columns** (one per group) depending on tool layout.'
      },
      {
        type: 'text',
        content:
          '**Functions:** **T.TEST(array1, array2, tails, type)** — **type 2** = two-sample equal var, **type 3** = Welch. Build **means**, **SDs**, **p** from formulas if needed.'
      },
      {
        type: 'text',
        content:
          '**Cohen’s d:** use course formula from group means and pooled SD.'
      }
    ]
  },
  {
    id: 'paired-t-test',
    title: 'Paired Samples T-Test in Excel',
    objectives: [
      'Perform a paired samples t-test for repeated measures or matched pairs',
      'Check normality of difference scores',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Understand when to use paired vs independent t-tests'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          '**Data Analysis → t-Test: Paired Two Sample for Means** on two columns. Or **T.TEST** with **type = 1** (paired).'
      },
      {
        type: 'text',
        content: '**Difference column** `=After-Before`; **Shapiro** not built-in — use Q-Q by eye or export to R/SPSS for formal test.'
      }
    ]
  },
  {
    id: 'one-sample-t-test',
    title: 'One-Sample T-Test in Excel',
    objectives: [
      'Perform a one-sample t-test to compare a sample mean to a known value',
      'Check normality assumption',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Understand when to use a one-sample t-test'
    ],
    estimatedTime: 15,
    content: [
      {
        type: 'text',
        content:
          'If **Data Analysis** includes **one-sample t**, use it. Otherwise: **t = (M − μ₀)/(s/√n)**; **p** = **T.DIST.2T(ABS(t), n−1)** (two-sided).'
      }
    ]
  },
  {
    id: 'correlation',
    title: 'Correlation Analysis in Excel',
    objectives: [
      'Calculate and interpret Pearson and Spearman correlation coefficients',
      'Create correlation matrices for multiple variables',
      'Test significance of correlations',
      'Create and interpret scatterplots'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          '**CORREL(array1, array2)**. **Data Analysis → Correlation** for matrix. **Scatter** chart: insert **X-Y** chart.'
      },
      {
        type: 'text',
        content:
          '**p-value for r:** not a single function in all versions — use **t = r√((n−2)/(1−r²))**, **T.DIST.2T**, or **Real Statistics** / other software.'
      }
    ]
  },
  {
    id: 'simple-regression',
    title: 'Simple Linear Regression in Excel',
    objectives: [
      'Perform simple linear regression with one predictor',
      'Interpret regression coefficients (intercept and slope)',
      'Evaluate model fit (R², adjusted R²)',
      'Check regression assumptions using diagnostic plots'
    ],
    estimatedTime: 30,
    content: [
      {
        type: 'text',
        content:
          '**Data Analysis → Regression** — **Y** range, **X** range, **Labels**, **Residual Plots**. **LINEST** array function returns slope, intercept, R² (learn syntax from help).'
      },
      {
        type: 'text',
        content:
          '**Read:** **R Square**, **Coefficients** table, **Significance F** (overall), **P-value** per coefficient.'
      }
    ]
  },
  {
    id: 'multiple-regression',
    title: 'Multiple Regression in Excel',
    objectives: [
      'Perform multiple regression with several predictors',
      'Interpret standardized and unstandardized coefficients',
      'Compare nested models and assess individual predictor contributions',
      'Understand multicollinearity and VIF'
    ],
    estimatedTime: 35,
    content: [
      {
        type: 'text',
        content:
          '**Regression** with **multiple adjacent X columns**. Check **Collinearity** / **VIF** only if your Excel build or add-in provides it — otherwise compute **VIF** in another program or use **CORREL** matrix to spot r > .9.'
      },
      {
        type: 'text',
        content:
          '**Standardized betas:** **Data Analysis** may not print β directly — **standardize columns** (Z-scores) first with **STANDARDIZE**, then regress, or export to R/SPSS.'
      }
    ]
  },
  {
    id: 'one-way-anova',
    title: 'One-Way ANOVA in Excel',
    objectives: [
      'Perform a one-way ANOVA to compare means across three or more groups',
      'Interpret the F-ratio, p-value, and effect size (eta-squared)',
      'Conduct post-hoc tests with appropriate corrections for multiple comparisons',
      'Check assumptions using Levene\'s test and Q-Q plots'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          '**Data Analysis → Anova: Single Factor** — **Input Range** with **groups in columns** (or rows), **Labels in First Row**. Read **F**, **P-value**, **F crit**.'
      },
      {
        type: 'text',
        content:
          '**Post hoc:** Excel does **not** include Tukey by default — use **Real Statistics**, manual **Bonferroni t** with adjusted α, or **copy means** to **SPSS/R/Stata**.'
      },
      {
        type: 'callout',
        style: 'warning',
        content: 'For **3+ groups** and **reporting**, confirm with your instructor whether **Excel-only** post hoc is acceptable.'
      }
    ]
  }
]

const m8WeDoExcel = {
  type: 'guided_practice',
  title: 'Guided Practice: Advanced Statistical Analyses (Excel)',
  instructions:
    'Enable **Analysis ToolPak**. Where Excel is weak (GOF, post hoc, VIF), note limitations and use the approach your instructor approves (including replicating in SPSS/R/Stata).',
  steps: [
    { instruction: 'GOF: CHISQ.TEST or manual χ² + CHISQ.DIST.RT', hint: 'Observed vs expected ranges', checkpoint: 'p-value' },
    { instruction: 'Independence: PivotTable + CHISQ.TEST', hint: '', checkpoint: 'p-value' },
    { instruction: 'Independent t: ToolPak or T.TEST', hint: 'Equal vs unequal', checkpoint: 'p, means' },
    { instruction: 'Paired t: ToolPak paired', hint: '', checkpoint: 'p' },
    { instruction: 'One-sample: formula or ToolPak', hint: 't, T.DIST.2T', checkpoint: 'p' },
    { instruction: 'CORREL + scatter chart', hint: '', checkpoint: 'r + plot' },
    { instruction: 'Regression: Data Analysis; residual plot option', hint: '', checkpoint: 'R², coefficients' },
    { instruction: 'Multiple X columns; check multicollinearity via correlations', hint: '', checkpoint: 'Model summary' },
    { instruction: 'ANOVA: Single Factor; plan post hoc per instructor', hint: '', checkpoint: 'F, p' }
  ]
}

// --- Stata sections ---
const m8SectionsStata = [
  {
    id: 'chi-square-goodness-of-fit',
    title: 'Chi-Square Goodness-of-Fit Test in Stata',
    objectives: [
      'Perform a chi-square goodness-of-fit test to compare observed frequencies to expected frequencies',
      'Interpret the chi-square statistic and p-value',
      'Calculate and interpret effect size (Cramér\'s V)',
      'Check assumptions for chi-square tests'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content:
          '**`csgof`** (install **`ssc install csgof`**) or **`tabulate`** one variable and **`chitest`** / **`cchi`** patterns per course. For **equal expected** counts: **`csgof var, equal`**. Custom expected: see **`help csgof`**.'
      },
      {
        type: 'text',
        content:
          'Alternatively: enter **observed** and **expected** as variables and compute χ² manually, or use **R** for **`chisq.test`** if simpler.'
      },
      {
        type: 'callout',
        style: 'warning',
        content: 'Stata community commands vary by version; follow **your lab handout** for the exact **SSC** package name.'
      }
    ]
  },
  {
    id: 'chi-square-independence',
    title: 'Chi-Square Test of Independence in Stata',
    objectives: [
      'Perform a chi-square test of independence to examine relationships between two categorical variables',
      'Create and interpret contingency tables',
      'Calculate and interpret effect size (Cramér\'s V)',
      'Check assumptions and report results'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content: '**`tabulate var1 var2, chi2 V`** — **chi2** test, **Cramér’s V** (**V** option). **`expected`** shows expected counts.'
      },
      {
        type: 'text',
        content: '**Small samples:** **`tabi`** with **`exact`** or **`fisher`** options where applicable.'
      },
      {
        type: 'callout',
        style: 'example',
        content: '**`tabulate gender vote, chi2 col`** — column % for interpretation.'
      }
    ]
  },
  {
    id: 'independent-t-test',
    title: 'Independent Samples T-Test in Stata',
    objectives: [
      'Perform an independent samples t-test to compare means between two groups',
      'Check assumptions (normality, homogeneity of variance)',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Report results in APA format'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content:
          '**`ttest anxiety, by(gender)`** (two groups). Stata shows **Welch** and **pooled** variants — choose per **Levene** / **sdtest**.'
      },
      {
        type: 'text',
        content: '**`esize twosample anxiety, by(gender)`** (Stata 15+) for **Cohen’s d**; or **manual** from means/SDs.'
      },
      {
        type: 'text',
        content: '**`histogram anxiety, by(gender)`** or **`qnorm`** by group for normality.'
      }
    ]
  },
  {
    id: 'paired-t-test',
    title: 'Paired Samples T-Test in Stata',
    objectives: [
      'Perform a paired samples t-test for repeated measures or matched pairs',
      'Check normality of difference scores',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Understand when to use paired vs independent t-tests'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content: '**`ttest before == after`** or **`signrank`** / **`wilcoxon`** (nonparametric paired) if needed.'
      },
      {
        type: 'text',
        content: '**`gen d = after - before`** then **`swilk d`** for normality of differences.'
      }
    ]
  },
  {
    id: 'one-sample-t-test',
    title: 'One-Sample T-Test in Stata',
    objectives: [
      'Perform a one-sample t-test to compare a sample mean to a known value',
      'Check normality assumption',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Understand when to use a one-sample t-test'
    ],
    estimatedTime: 15,
    content: [
      {
        type: 'text',
        content: '**`ttest iq == 100`** — two-sided by default.'
      },
      {
        type: 'text',
        content: '**`display`**, **`scalar`**, or **`esize`** for **d** vs μ₀.'
      }
    ]
  },
  {
    id: 'correlation',
    title: 'Correlation Analysis in Stata',
    objectives: [
      'Calculate and interpret Pearson and Spearman correlation coefficients',
      'Create correlation matrices for multiple variables',
      'Test significance of correlations',
      'Create and interpret scatterplots'
    ],
    estimatedTime: 20,
    content: [
      {
        type: 'text',
        content: '**`pwcorr v1 v2 v3, sig star(0.05)`** — Pearson + **p**. **`spearman`** for Spearman.'
      },
      {
        type: 'text',
        content: '**`scatter y x`** or **`twoway scatter y x`** for visual check.'
      }
    ]
  },
  {
    id: 'simple-regression',
    title: 'Simple Linear Regression in Stata',
    objectives: [
      'Perform simple linear regression with one predictor',
      'Interpret regression coefficients (intercept and slope)',
      'Evaluate model fit (R², adjusted R²)',
      'Check regression assumptions using diagnostic plots'
    ],
    estimatedTime: 30,
    content: [
      {
        type: 'text',
        content: '**`regress exam hours`** — **Coef.**, **_cons**, **R-squared**, **F**, **P>|t|**.'
      },
      {
        type: 'text',
        content: '**`rvfplot`** (residual vs fitted); **`estat imtest, white`** (heteroskedasticity, advanced); **`predict e, resid`** then **`qnorm e`**.'
      }
    ]
  },
  {
    id: 'multiple-regression',
    title: 'Multiple Regression in Stata',
    objectives: [
      'Perform multiple regression with several predictors',
      'Interpret standardized and unstandardized coefficients',
      'Compare nested models and assess individual predictor contributions',
      'Understand multicollinearity and VIF'
    ],
    estimatedTime: 35,
    content: [
      {
        type: 'text',
        content: '**`regress salary experience education age`**.'
      },
      {
        type: 'text',
        content: '**`estat vif`** after **regress** — **VIF** per predictor. **> 5–10** concern.'
      },
      {
        type: 'text',
        content: '**Standardized:** **`regress salary experience education age, beta`** (reports **beta** column) or **`regress`** on **egen z**-scored variables.'
      },
      {
        type: 'text',
        content: '**Nested models:** **`nestreg`** or **`lrtest`** (with **`logit`**/ML models); for **OLS**, **F test** on **SSR** difference (`test` with **`accumulate`**).'
      }
    ]
  },
  {
    id: 'one-way-anova',
    title: 'Running a One-Way ANOVA in Stata',
    objectives: [
      'Perform a one-way ANOVA to compare means across three or more groups',
      'Interpret the F-ratio, p-value, and effect size (eta-squared)',
      'Conduct post-hoc tests with appropriate corrections for multiple comparisons',
      'Check assumptions using Levene\'s test and Q-Q plots'
    ],
    estimatedTime: 25,
    content: [
      {
        type: 'text',
        content: '**`oneway score method, tabulate bonferroni`** — **F**, **Bonferroni**-adjusted pairwise (syntax variants exist).'
      },
      {
        type: 'text',
        content: '**`anova score method`** for **balanced** / **factorial** extensions; **`regress score i.method`** equivalent cell means model.'
      },
      {
        type: 'text',
        content: '**Post hoc:** **`pwmean score, over(method) mcompare(tukey)`** (Stata 15+ style commands) — match **your Stata version** **help** file.'
      },
      {
        type: 'text',
        content: '**Levene:** **`robvar score, by(method)`** or **`oneway`’s** test options; **graph box score, over(method)**.'
      },
      {
        type: 'callout',
        style: 'example',
        content:
          'Report **F(df₁,df₂)**, **p**, **η²** (**`estat esize`** where available), then **pairwise** table.'
      }
    ]
  }
]

const m8WeDoStata = {
  type: 'guided_practice',
  title: 'Guided Practice: Advanced Statistical Analyses (Stata)',
  instructions:
    'Use **do-files**; **`help`** for each command. SSC packages (e.g. **csgof**) only if your course requires them.',
  steps: [
    { instruction: 'GOF χ² (course command)', hint: 'csgof / chitest', checkpoint: 'χ², p' },
    { instruction: '`tabulate A B, chi2 V`', hint: 'expected', checkpoint: 'Independence' },
    { instruction: '`ttest y, by(g)`', hint: 'Welch vs pooled', checkpoint: 't test' },
    { instruction: '`ttest before==after`', hint: '', checkpoint: 'Paired' },
    { instruction: '`ttest iq==100`', hint: '', checkpoint: 'One-sample' },
    { instruction: '`pwcorr , sig` + scatter', hint: '', checkpoint: 'r, p' },
    { instruction: '`regress y x` + rvfplot', hint: '', checkpoint: 'R², residuals' },
    { instruction: '`regress y x1 x2` + estat vif', hint: '', checkpoint: 'VIF' },
    { instruction: '`oneway` or `anova` + post hoc', hint: 'Tukey/Bonferroni', checkpoint: 'F + pairs' }
  ]
}

function buildM8Lesson (id, software, displayName, sections, weDo) {
  return {
    id,
    module: 'stats-module-8',
    title: `Advanced Statistical Analysis in ${displayName}`,
    software,
    objectives: M8_OBJECTIVES,
    estimatedTime: 215,
    phases: {
      iDo: {
        type: 'multi_section',
        title: `Learn Advanced Analyses (${displayName})`,
        sections
      },
      weDo,
      selfCheck: m8SelfCheck(displayName),
      youDo: m8YouDo()
    }
  }
}

export const module8UnifiedLessonsOther = [
  buildM8Lesson('spss-module-8-unified', 'spss', 'SPSS', m8SectionsSPSS, m8WeDoSPSS),
  buildM8Lesson('r-module-8-unified', 'r', 'R', m8SectionsR, m8WeDoR),
  buildM8Lesson('excel-module-8-unified', 'excel', 'Excel', m8SectionsExcel, m8WeDoExcel),
  buildM8Lesson('stata-module-8-unified', 'stata', 'Stata', m8SectionsStata, m8WeDoStata)
]
