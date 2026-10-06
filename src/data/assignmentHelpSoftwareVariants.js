/**
 * Optional per-software overrides for assignment help (statistics class).
 * jamovi: null means use the base assignment text in assignmentHelp.js.
 */
// Module 5: Graphing and Data Manipulation
const m5Help = {
  spss: {
    tips: [
      'Create histograms via Graphs → Chart Builder (Histogram template). Drag your continuous variable to the axis.',
      'For boxplots: Graphs → Chart Builder → Boxplot. Drag categorical grouping variable to X axis, continuous outcome to Y axis.',
      'Filter subsets with Data → Select Cases → If condition (e.g., age > 21). Restore with Select All.',
      'Recode variables: Transform → Recode into Different Variables. Define ranges for each new category label.',
      'Center a variable: Transform → Compute Variable, e.g., CenteredX = X - 100. Use Compute for any custom transformation.',
      'Upload your screen-recording video to the Canvas Module 5 Software Practice assignment for credit.'
    ],
    formulas: [
      { name: 'Center variable', formula: 'Compute: CenteredX = X - mean_value', note: 'Mean value from Descriptives output.' },
      { name: 'Standardize (z-score)', formula: 'Compute: Z = (X - mean) / SD', note: 'Or use Descriptives with Save standardized values.' }
    ],
    getHelp: 'Review Module 5 Topics (histograms, filtering, recoding). For chart builder issues, try Legacy Dialogs → Histogram as a simpler alternative. Office hours for recoding logic.'
  },
  r: {
    tips: [
      'Histograms: hist(x) or ggplot(data, aes(x)) + geom_histogram(). Add bins argument to adjust bin width.',
      'Boxplots: boxplot(y ~ group, data) or ggplot + geom_boxplot(). Group by factor variable.',
      'Filter subsets: subset(data, condition) or dplyr::filter(data, condition).',
      'Recode/transform: dplyr::mutate with ifelse() or case_when(). For categorical labels: factor(x, labels=c(...)).',
      'Center variable: mutate(data, centered = x - mean(x, na.rm=TRUE)).',
      'Save plots: ggsave("plot.pdf", plot) for ggplot objects. Upload your screen-recording video to Canvas.'
    ],
    formulas: [
      { name: 'Filter', formula: 'filter(data, age > 21)', note: 'dplyr filter keeps rows meeting condition.' },
      { name: 'Recode', formula: 'mutate(data, grp = ifelse(age > 21, "Adult", "Minor"))', note: 'case_when for multiple conditions.' }
    ],
    getHelp: 'Module 5 R lessons cover ggplot basics. For recoding issues, check factor levels and label mapping. Email instructor for package installation problems.'
  },
  excel: {
    tips: [
      'Insert → Charts → Histogram for continuous data. Adjust bin width via Format Axis → Bin Width.',
      'Boxplot: Insert → Charts → Insert Statistic Chart → Box and Whisker. Select your data range carefully.',
      'Filter: Data → Filter. Click dropdown on column header, choose Custom Filter for conditions.',
      'Recode with formulas: =IF(A2>21, "Adult", "Minor") copied down. For multiple categories use nested IF or IFS.',
      'Center variable: =A2-AVERAGE($A$2:$A$100). Use absolute references ($A$2) so fill-down works.',
      'Screenshot your charts and upload with your video to Canvas for credit.'
    ],
    formulas: [
      { name: 'Conditional label', formula: '=IF(A2>21, "Adult", "Minor")', note: 'Nested IF for 3+ categories.' },
      { name: 'Center', formula: '=A2-AVERAGE($A$2:$A$100)', note: 'Lock range with $ for fill-down.' }
    ],
    getHelp: 'Excel histogram bins can be tricky; adjust via Format Axis if too many/few bins. For IFS function, check your Excel version supports it (2019+). Office hours for chart formatting.'
  },
  stata: {
    tips: [
      'Histogram: histogram varname, frequency. Add normal to overlay normal curve. Use xlabel() to adjust axis labels.',
      'Boxplot: graph box outcome, over(group). Add by() option or use graph bar for grouped comparisons.',
      'Filter: keep if condition (permanent) or use subset with by(). For temporary filtering, use by prefix commands.',
      'Recode: recode var (range=newval) ... . Use generate for new variables; replace for in-place changes.',
      'Center variable: gen centered = var - mean from summarize. Or use egen with mean() then subtract.',
      'Save graphs: graph export "plot.png", replace. Upload your screen-recording video to Canvas.'
    ],
    formulas: [
      { name: 'Filter (keep)', formula: 'keep if age > 21', note: 'Permanent; use save before to keep original.' },
      { name: 'Recode', formula: 'recode age (18/21=1) (22/max=2), generate(adult)', note: 'Range syntax: low/high=newvalue.' }
    ],
    getHelp: 'Module 5 Stata lessons. For recode, test with a small dataset first to verify ranges. Graph issues often involve variable types (numeric vs string). Statalist or office hours for help.'
  }
}

// Module 6: Probability, Sampling, and Confidence Intervals
const m6Help = {
  spss: {
    tips: [
      'For binomial probabilities, use Transform → Compute with the appropriate formula or look up in binomial tables.',
      'Normal probabilities: use the cumulative distribution via Transform → Compute with the CDF.NORM function.',
      'Sampling distributions: use repeated sampling in a loop or macro to demonstrate the Central Limit Theorem.',
      'Confidence intervals for the mean: Analyze → Descriptive Statistics → Explore, check Confidence Interval for Mean.',
      'Record your process in Methods Market, then upload the video to the Canvas Module 6 Software Practice assignment.',
      'Use the Tools panel in Methods Market to download practice datasets.'
    ],
    formulas: [
      { name: 'Normal CDF', formula: 'CDF.NORM(x, mean, sd)', note: 'Cumulative probability up to x.' },
      { name: 'Confidence interval', formula: 'Mean ± t(α/2, df) × SE', note: 'SE = SD/√n; use Explore output for the interval.' }
    ],
    getHelp: 'Module 6 Topics cover CLT and confidence intervals conceptually. SPSS Compute functions for distributions can be confusing — office hours for formula help. Use binomial tables if CDF.BINOM is unavailable.'
  },
  r: {
    tips: [
      'Binomial probabilities: pbinom(q, size, prob) for cumulative; dbinom(x, size, prob) for exact probability.',
      'Normal probabilities: pnorm(q, mean, sd) for cumulative; dnorm(x, mean, sd) for density.',
      'CLT demonstration: simulate repeated samples with replicate() and plot sampling distribution of means.',
      'Confidence interval for mean: t.test(x)$conf.int gives the interval. Or use prop.test for proportions.',
      'Record your R session and upload the video to Canvas for credit.',
      'Use set.seed() for reproducible random sampling demonstrations.'
    ],
    formulas: [
      { name: 'Normal probability', formula: 'pnorm(2.5, 0, 1)', note: 'P(Z < 2.5) = 0.9938.' },
      { name: 'Confidence interval', formula: 't.test(data$x)$conf.int', note: '95% CI by default; use conf.level=0.99 for 99%.' }
    ],
    getHelp: 'Module 6 R lessons. pnorm vs dnorm is a common confusion — pnorm gives cumulative probability. For CLT simulations, ensure you understand the difference between sample and population SD. Email instructor for R issues.'
  },
  excel: {
    tips: [
      'Binomial: =BINOM.DIST(x, n, p, TRUE) for cumulative probability.',
      'Normal: =NORM.DIST(x, mean, sd, TRUE) for cumulative. =NORM.S.DIST(z, TRUE) for standard normal.',
      'Confidence interval for mean: =CONFIDENCE.T(alpha, sd, n) gives the margin of error; add/subtract from mean.',
      'For CLT demonstration, use RAND() to generate samples and AVERAGE() to compute sample means repeatedly.',
      'Record your Excel session and upload with screenshots to Canvas.',
      'Use Data Analysis ToolPak for additional probability functions if available.'
    ],
    formulas: [
      { name: 'Binomial CDF', formula: '=BINOM.DIST(3, 10, 0.5, TRUE)', note: 'P(X ≤ 3) for 10 trials, p=0.5.' },
      { name: 'Confidence interval', formula: '=AVERAGE(range)±CONFIDENCE.T(0.05, STDEV.S(range), COUNT(range))', note: '95% CI for mean.' }
    ],
    getHelp: 'Excel probability functions can be confusing — check the cumulative vs probability density argument (TRUE vs FALSE). For CLT, use enough samples (100+) to see the normal distribution emerge. Office hours for formula issues.'
  },
  stata: {
    tips: [
      'Binomial probabilities: use the binomial distribution functions via display or compute.',
      'Normal probabilities: display normal(z) for cumulative standard normal. Use invnormal() for inverse.',
      'Sampling distributions: use simulation with random seed and repeated sampling loops.',
      'Confidence intervals: ci varname gives CI for mean. ci proportion for proportions.',
      'Record your Stata session and upload the video to Canvas.',
      'Use the bootstrap command for resampling demonstrations.'
    ],
    formulas: [
      { name: 'Normal CDF', formula: 'normal(2.5)', note: 'P(Z < 2.5) in standard normal.' },
      { name: 'Confidence interval', formula: 'ci x', note: '95% CI for mean of variable x.' }
    ],
    getHelp: 'Module 6 Stata lessons. For CLT demonstrations, ensure you understand the difference between the population distribution and sampling distribution. Statalist or office hours for simulation issues.'
  }
}

// Module 7: Hypothesis Testing
const m7Help = {
  spss: {
    tips: [
      'One-sample t-test: Analyze → Compare Means → One-Sample T Test. Set test value to hypothesized population mean.',
      'Independent samples t-test: Analyze → Compare Means → Independent-Samples T Test. Specify grouping variable.',
      'Paired samples t-test: Analyze → Compare Means → Paired-Samples T Test. Select paired variables.',
      'Chi-square test: Analyze → Descriptive Statistics → Crosstabs → Statistics → Chi-square.',
      'Always check assumptions: normality (Explore output), equal variances (Levene test for t-tests).',
      'Record your process in Methods Market, then upload the video to Canvas for credit.'
    ],
    formulas: [
      { name: 'One-sample t-test', formula: 't = (x̄ - μ₀) / (s/√n)', note: 'Compare sample mean to hypothesized population mean.' },
      { name: 'Effect size (Cohen d)', formula: 'd = (M₁ - M₂) / SD_pooled', note: 'Small=0.2, Medium=0.5, Large=0.8.' }
    ],
    getHelp: 'Module 7 Topics cover hypothesis testing concepts. SPSS output can be dense — focus on the significance value and effect size. For assumptions, use Explore output for normality. Office hours for interpreting output.'
  },
  r: {
    tips: [
      'One-sample t-test: t.test(x, mu=100).',
      'Independent samples: t.test(x, y, var.equal=FALSE) — use Welch test unless variances are equal.',
      'Paired samples: t.test(x, y, paired=TRUE).',
      'Chi-square test: chisq.test(matrix(data, nrow=k)) or chisq.test(factor1, factor2).',
      'Check assumptions: Shapiro-Wilk test (shapiro.test(x)) for normality; var.test(x, y) for equal variances.',
      'Record your R session and upload the video to Canvas.'
    ],
    formulas: [
      { name: 'T-test', formula: 't.test(x, y)', note: 'Welch t-test by default; use var.equal=TRUE for Student t-test.' },
      { name: 'Chi-square', formula: 'chisq.test(table)', note: 'Goodness-of-fit or test of independence.' }
    ],
    getHelp: 'Module 7 R lessons. Common issues: forgetting to convert character variables to factors for chi-square; using paired=TRUE when not appropriate. Shapiro-Wilk test is sensitive to sample size. Email instructor for help.'
  },
  excel: {
    tips: [
      'Excel lacks built-in t-test functions; use the Data Analysis ToolPak: Data → Data Analysis → t-Test.',
      'Choose the appropriate test: One-Sample, Two-Sample Assuming Equal Variances, or Paired.',
      'Chi-square: =CHISQ.DIST(x, df, TRUE) for p-value from chi-square statistic.',
      'Calculate chi-square statistic manually: =SUM((observed-expected)^2/expected) for each cell, then sum.',
      'Record your Excel session and upload with screenshots to Canvas.',
      'Enable ToolPak: File → Options → Add-ins → Go → check Analysis ToolPak.'
    ],
    formulas: [
      { name: 'Chi-square statistic', formula: 'Σ((O-E)²/E) for each cell', note: 'Manual calculation; compare to critical value or use CHISQ.DIST for p-value.' },
      { name: 'P-value', formula: '=CHISQ.DIST.RT(chi_sq, df)', note: 'Right-tail probability for chi-square.' }
    ],
    getHelp: 'Excel is not ideal for hypothesis testing; use ToolPak carefully. Manual chi-square calculations are error-prone — verify with a calculator or other software. Office hours for ToolPak setup and interpretation.'
  },
  stata: {
    tips: [
      'One-sample t-test: ttest var = 100.',
      'Independent samples: ttest var, by(group) — assumes equal variances by default; add welch option.',
      'Paired samples: ttest var1 = var2.',
      'Chi-square: tab var1 var2, chi2 or cm test for manual chi-square calculation.',
      'Check assumptions: test normality with swilk var (Shapiro-Wilk); test equal variances with sdtest.',
      'Record your Stata session and upload the video to Canvas.'
    ],
    formulas: [
      { name: 'T-test', formula: 'ttest x, by(group)', note: 'Add welch for Welch t-test.' },
      { name: 'Chi-square', formula: 'tab x y, chi2', note: 'Goodness-of-fit: cm test for manual calculation.' }
    ],
    getHelp: 'Module 7 Stata lessons. Stata t-test output includes effect size estimates. For assumptions, use swilk for normality and sdtest for equal variances. Statalist or office hours for interpretation.'
  }
}

// Module 8: Comparing Groups and Relationships
const m8Help = {
  spss: {
    tips: [
      'One-way ANOVA: Analyze → Compare Means → One-Way ANOVA. Post-hoc tests: click Post Hoc, select Tukey.',
      'Multiple regression: Analyze → Regression → Linear. Check assumptions in Plots.',
      'Pearson correlation: Analyze → Correlate → Bivariate. Select Pearson checkbox.',
      'Always check assumptions: normality (residuals), homogeneity of variance (Levene test).',
      'Record your process in Methods Market, then upload the video to Canvas for credit.',
      'Use the Tools panel in Methods Market for practice datasets.'
    ],
    formulas: [
      { name: 'ANOVA F-ratio', formula: 'F = MS_between / MS_within', note: 'Tests if group means differ.' },
      { name: 'Regression', formula: 'Y = a + bX', note: 'Intercept (a) and slope (b) estimated by least squares.' }
    ],
    getHelp: 'Module 8 Topics cover ANOVA and regression concepts. SPSS regression output is detailed — focus on R², F-statistic, and beta weights. Post-hoc tests clarify which groups differ. Office hours for interpreting complex output.'
  },
  r: {
    tips: [
      'One-way ANOVA: aov(y ~ group, data) followed by TukeyHSD() for post-hoc tests.',
      'Multiple regression: lm(y ~ x1 + x2 + ..., data). Use summary() for detailed output.',
      'Pearson correlation: cor.test(x, y) or cor(x, y) for correlation coefficient only.',
      'Check assumptions: Shapiro-Wilk on residuals (shapiro.test(resid(model))); Breusch-Pagan test for homoscedasticity.',
      'Record your R session and upload the video to Canvas.',
      'Use diagnostic plots: plot(model) for regression diagnostics.'
    ],
    formulas: [
      { name: 'ANOVA', formula: 'aov(y ~ group, data)', note: 'Use TukeyHSD(model) for pairwise comparisons.' },
      { name: 'Regression', formula: 'lm(y ~ x1 + x2, data)', note: 'Use summary(model) for coefficients and significance.' }
    ],
    getHelp: 'Module 8 R lessons. Common issues: factor vs numeric variables in regression; interpreting R² vs adjusted R². Check residual plots for outliers. Email instructor for model specification issues.'
  },
  excel: {
    tips: [
      'One-way ANOVA: Data → Data Analysis → ANOVA: Single Factor. Input range should include group labels.',
      'Multiple regression: Data → Data Analysis → Regression. Specify input Y and X ranges carefully.',
      'Pearson correlation: =PEARSON(x_range, y_range) or Data Analysis → Correlation.',
      'Check assumptions: Create residual plots manually; use Shapiro-Wilk test from ToolPak if available.',
      'Record your Excel session and upload with screenshots to Canvas.',
      'Enable ToolPak if not already done (see Module 7 help).'
    ],
    formulas: [
      { name: 'Correlation', formula: '=PEARSON(A2:A100, B2:B100)', note: 'Pearson correlation coefficient.' },
      { name: 'Regression', formula: 'Data Analysis → Regression', note: 'Excel does not have a regression formula; use ToolPak.' }
    ],
    getHelp: 'Excel regression output can be confusing — focus on R², significance F, and p-values for coefficients. Manual residual plot creation is tedious but important. Office hours for interpretation.'
  },
  stata: {
    tips: [
      'One-way ANOVA: anova y group. Use bonferroni or tukey post-hoc tests with the contrasts command.',
      'Multiple regression: regress y x1 x2 .... Useestat vif for multicollinearity check.',
      'Pearson correlation: correlate x y or pwcorr x y for pairwise correlations with p-values.',
      'Check assumptions: estat hettest for heteroscedasticity; normality test on residuals with swilk.',
      'Record your Stata session and upload the video to Canvas.',
      'Use predict for residual analysis and diagnostic plots.'
    ],
    formulas: [
      { name: 'ANOVA', formula: 'anova y group', note: 'Use contrasts for post-hoc comparisons.' },
      { name: 'Regression', formula: 'regress y x1 x2', note: 'Use estat vif and predict for diagnostics.' }
    ],
    getHelp: 'Module 8 Stata lessons. Stata provides detailed regression diagnostics with estat commands. For multicollinearity, check VIF values (VIF > 10 is problematic). Statalist or office hours for model specification.'
  }
}

export const ASSIGNMENT_HELP_BY_SOFTWARE = {
  'm5-graphing': {
    jamovi: null,
    spss: m5Help.spss,
    r: m5Help.r,
    excel: m5Help.excel,
    stata: m5Help.stata
  },
  'm6-probability': {
    jamovi: null,
    spss: m6Help.spss,
    r: m6Help.r,
    excel: m6Help.excel,
    stata: m6Help.stata
  },
  'm7-hypothesis': {
    jamovi: null,
    spss: m7Help.spss,
    r: m7Help.r,
    excel: m7Help.excel,
    stata: m7Help.stata
  },
  'm8-comparing-groups': {
    jamovi: null,
    spss: m8Help.spss,
    r: m8Help.r,
    excel: m8Help.excel,
    stata: m8Help.stata
  },
  'm4-descriptives': {
    jamovi: null,
    spss: {
      tips: [
        'Enter height in one column in SPSS Data View (e.g. variable name Height, Numeric).',
        'Analyze → Descriptive Statistics → Descriptives for N, mean, median, mode, range, variance, SD.',
        'Transform → Compute Variable for each formula; use your variable name instead of Height. For deviation: Height - [mean from Descriptives]. For squared deviation: (Height - mean)^2. Sum squared column via Descriptives with Sum in Options for SS.',
        'Z-score: use Descriptives “Save standardized values as variables” if available, or Compute (Height - mean) / SD using the sample mean and SD from Descriptives.',
        'Interpret SD in your own words. For z = 2.5, raw score X = mean + 2.5×SD. Save .sav and submit per LMS.'
      ],
      formulas: [
        {
          name: 'Deviation score',
          formula: 'Height - [sample mean of Height]',
          note: 'In Compute: use the numeric mean from Descriptives, or Aggregate to add a constant mean column first.'
        },
        {
          name: 'Squared deviation',
          formula: '(Height - [mean])**2',
          note: 'SPSS uses ** or ^ for power in some versions; use ** in Compute.'
        },
        {
          name: 'Z-score',
          formula: 'Z = (X - mean) / SD',
          note: 'Compute: (Height - mean) / SD using sample mean and SD, or use saved z-scores from Descriptives.'
        },
        {
          name: 'Sum of squared deviations (SS)',
          formula: 'SS = Σ(X - mean)²',
          note: 'Sum the squared-deviation column; Descriptives on that column with Sum in Options.'
        },
        {
          name: 'Raw score from z (e.g. z = 2.5)',
          formula: 'X = mean + z × SD',
          note: 'Use mean and SD from Descriptives on Height.'
        }
      ],
      getHelp:
        'Review Topics: central tendency, variability, standard scores. SPSS: Descriptives and Compute are under Analyze and Transform. Office hours for z-scores or SS if stuck.'
    },
    r: {
      tips: [
        'Store height in a vector or column, e.g. data$Height from CSV.',
        '`summary(data$Height)`; `mean(data$Height, na.rm=TRUE)`; `sd(...)`; `var(...)`; min/max.',
        'Deviations: `data <- data %>% dplyr::mutate(dev = Height - mean(Height, na.rm=TRUE))`. Squared: `mutate(sqdev = dev^2)`. SS: `sum(data$sqdev, na.rm=TRUE)`.',
        'Z-scores: `scale(Height)` or manual `(Height - mean(Height))/sd(Height)`.',
        'Interpret SD; for z = 2.5 use X = mean + 2.5*SD. Submit script snippet or output per LMS.'
      ],
      formulas: [
        {
          name: 'Deviation score',
          formula: 'Height - mean(Height, na.rm = TRUE)',
          note: 'dplyr: mutate(dev = Height - mean(Height, na.rm = TRUE))'
        },
        {
          name: 'Squared deviation',
          formula: '(Height - mean(Height, na.rm = TRUE))^2',
          note: 'mutate after deviation or one mutate with nested mean.'
        },
        {
          name: 'Z-score',
          formula: 'as.numeric(scale(Height))',
          note: 'Or (Height - mean(Height))/sd(Height) with na.rm as needed.'
        },
        {
          name: 'SS',
          formula: 'sum((Height - mean(Height))^2, na.rm = TRUE)',
          note: 'Matches sum of squared deviations about the sample mean.'
        },
        {
          name: 'Raw score from z',
          formula: 'mean(Height) + 2.5 * sd(Height)',
          note: 'Replace 2.5 with your z if different.'
        }
      ],
      getHelp:
        'Topics: central tendency, variability, standard scores. R: dplyr mutate and scale() are covered in Software lessons. Ask in office hours for SS vs variance notation.'
    },
    excel: {
      tips: [
        'Put Height in a column (e.g. B2:B50).',
        'Use =AVERAGE(B2:B50), =STDEV.S(B2:B50), =MIN, =MAX, =MEDIAN, =MODE.SNGL (if applicable).',
        'Deviation: =B2-AVERAGE($B$2:$B$50) fill down. Squared: =C2^2. SS: =SUM(D2:D50).',
        'Z: =(B2-AVERAGE($B$2:$B$50))/STDEV.S($B$2:$B$50) fill down.',
        'Interpret SD; X for z=2.5: =AVERAGE(...)+2.5*STDEV.S(...). Submit workbook or screenshots per LMS.'
      ],
      formulas: [
        { name: 'Deviation', formula: '=B2 - AVERAGE($B$2:$B$100)', note: 'Adjust column/row range; lock $ for fill-down.' },
        { name: 'Squared deviation', formula: '=(B2 - AVERAGE($B$2:$B$100))^2', note: 'Or reference deviation cell ^2.' },
        { name: 'Z-score', formula: '=(B2-AVERAGE($B$2:$B$100))/STDEV.S($B$2:$B$100)', note: 'STDEV.S = sample SD.' },
        { name: 'SS', formula: '=SUM(D2:D100)', note: 'D column = squared deviations.' },
        { name: 'Raw from z', formula: '=AVERAGE($B$2:$B$100) + 2.5 * STDEV.S($B$2:$B$100)', note: 'Shows X when z = 2.5.' }
      ],
      getHelp:
        'Topics: central tendency, variability, standard scores. Excel lacks some tests; descriptives use built-in functions or Data Analysis ToolPak. Office hours for formula checks.'
    },
    stata: {
      tips: [
        '`import delimited` or use Data Editor; variable Height.',
        '`summarize Height, detail` for mean, SD, min, max, etc.',
        '`summarize Height` then `gen dev = Height - r(mean)`; `gen sqdev = dev^2`; `tabstat sqdev, statistics(sum)` for SS.',
        'Z: `egen z_h = std(Height)` or manual gen using mean/sd from summarize.',
        'Interpret SD; display mean + 2.5*r(sd) after summarize. Submit .do log and/or dataset per LMS.'
      ],
      formulas: [
        { name: 'Deviation', formula: 'gen dev = Height - r(mean)', note: 'Run summarize Height immediately before; r(mean) is the sample mean.' },
        { name: 'Squared deviation', formula: 'gen sqdev = dev^2', note: 'After dev exists.' },
        { name: 'Z-score', formula: 'egen z_h = std(Height)', note: 'Or gen z = (Height - r(mean))/r(sd) with care after summarize.' },
        { name: 'SS', formula: 'tabstat sqdev, statistics(sum)', note: 'After sqdev = (Height-mean)^2.' },
        { name: 'Raw from z', formula: 'display r(mean) + 2.5*r(sd)', note: 'After summarize Height.' }
      ],
      getHelp:
        'Topics: central tendency, variability, standard scores. Stata: summarize, generate, egen std. Software lessons Module 4 + office hours.'
    }
  },
  'm3-jamovi-exploration': {
    jamovi: null,
    spss: {
      tips: [
        'Import Personality Data CSV: File → Import Data → CSV (or read in Text Wizard).',
        'Analyze → Descriptive Statistics → Descriptives (or Frequencies for categorical). For two variables report mean, median, SD; for one variable add a chart via Graphs (e.g. Histogram, Bar).',
        'Turn in: short paragraph + screenshot of Data View, descriptives output, and chart.'
      ],
      getHelp:
        'Software lessons (Module 3, SPSS track): importing, variable properties, descriptives. If import fails, check delimiter and first row as variable names.'
    },
    r: {
      tips: [
        '`read.csv()` the Personality Data; `str(data)` for types; `summary()` or `skimr` for descriptives.',
        'For two numeric variables: means/SDs; for one variable: `hist()` or `ggplot` bar.',
        'Turn in: paragraph + screenshot of console/plots or Quarto/HTML output.'
      ],
      getHelp: 'Module 3 R lessons + dplyr/summary. Ask during in-class discussion or email instructor if paths or packages fail.'
    },
    excel: {
      tips: [
        'Data → From Text/CSV for Personality Data; set types in Power Query or format cells.',
        'Use AVERAGE, MEDIAN, STDEV.S; insert Histogram or Column chart.',
        'Turn in: paragraph + workbook screenshot with data and chart.'
      ],
      getHelp: 'Module 3 Excel guides (Get Data Ready). Office hours for Pivot vs raw formulas.'
    },
    stata: {
      tips: [
        '`import delimited "PersonalityData.csv", clear`',
        '`describe`; `summarize Extraversion Agreeableness` (adjust names); `histogram Extraversion` or `graph bar`.',
        'Turn in: paragraph + screenshot of Results/Graph.'
      ],
      getHelp: 'Module 3 Stata lessons; Statalist or office hours for import options.'
    }
  },
  'm3-video-jamovi': {
    jamovi: null,
    spss: {
      tips: [
        'Screen record: import Personality CSV, show Variable View/Data View, set variable types/labels.',
        'Rename one variable to your name. Compute mean of agreeableness: Transform → Compute, e.g. MEAN.1(agreeableness) if single column mean is just the value — for column mean use **Aggregate** or note: *mean of the agreeableness column* = constant; assignment may want row mean across items — use **Compute** with (A1+A2+A3)/n or **MEAN.n** functions for multiple columns.',
        'Save .sav; upload video + file.'
      ],
      formulas: [
        {
          name: 'Mean across several item columns (example)',
          formula: '(A1 + A2 + A3) / 3',
          note: 'If agreeableness is one column, “mean of agreeableness” is that column’s mean — use Aggregate or report Descriptives mean; if multiple items, average per row in Compute.'
        }
      ],
      getHelp: 'Clarify with instructor if the assignment expects row-wise mean of several items vs column mean; SPSS Compute and Aggregate differ from jamovi VMEAN.'
    },
    r: {
      tips: [
        'Record: read.csv, rename column (`dplyr::rename`), `mutate` row mean across agreeableness items if multiple columns, or show `mean(data$agreeableness)`.',
        'Save `.RData` or write_csv snapshot; upload with video.'
      ],
      formulas: [
        {
          name: 'Column mean (one variable)',
          formula: 'mean(data$agreeableness, na.rm = TRUE)',
          note: 'For row mean across items: rowMeans across selected columns.'
        }
      ],
      getHelp: 'Module 3 R content; dplyr rename/mutate.'
    },
    excel: {
      tips: [
        'Import CSV; rename column header to your name.',
        'If one Agreeableness column: cell = AVERAGE(that column) as a constant cell; if multiple items: =AVERAGE(D2:F2) filled down.',
        'Save .xlsx; upload with video.'
      ],
      formulas: [{ name: 'Row mean across items', formula: '=AVERAGE(D2:F2)', note: 'Adjust columns.' }],
      getHelp: 'Excel Module 3 guides.'
    },
    stata: {
      tips: [
        'import delimited; `rename`; `egen rowmean = rowmean(a1 a2 a3)` or `summarize agreeableness` for column mean.',
        'save "submission.dta"; upload with video.'
      ],
      formulas: [
        { name: 'Row mean', formula: 'egen rowmean = rowmean(a1 a2 a3)', note: 'Replace with your item variable names.' }
      ],
      getHelp: 'Stata Module 3 lessons.'
    }
  }
}
