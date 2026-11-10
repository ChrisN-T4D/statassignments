// Module 8 dataset contract shared by all software variants. Synthetic teaching data only.
export const module8Datasets = [
  {
    "name": "module8_learning.csv",
    "filename": "module8_learning.csv",
    "url": "/module8_learning.csv",
    "description": "90 synthetic observations: groups, teaching methods, correlation, paired and repeated measures."
  },
  {
    "name": "module8_survey.csv",
    "filename": "module8_survey.csv",
    "url": "/module8_survey.csv",
    "description": "300 synthetic survey observations: Major and StressLevel."
  },
  {
    "name": "module8_contingency.csv",
    "filename": "module8_contingency.csv",
    "url": "/module8_contingency.csv",
    "description": "100 synthetic independent observations: Group and Outcome."
  },
  {
    "name": "module8_small_counts.csv",
    "filename": "module8_small_counts.csv",
    "url": "/module8_small_counts.csv",
    "description": "16 synthetic observations for Fisher exact test."
  },
  {
    "name": "module8_paired_categories.csv",
    "filename": "module8_paired_categories.csv",
    "url": "/module8_paired_categories.csv",
    "description": "100 synthetic paired categorical observations."
  },
  {
    "name": "module8_suits.csv",
    "filename": "module8_suits.csv",
    "url": "/module8_suits.csv",
    "description": "200 synthetic suit selections for goodness-of-fit."
  },
  {
    "name": "module8_skewed.csv",
    "filename": "module8_skewed.csv",
    "url": "/module8_skewed.csv",
    "description": "40 synthetic observations for rank-based practice."
  }
];
const plans = {
  "m8-cohens-d-onesample": {
    "file": "module8_learning.csv",
    "columns": [
      "Score"
    ],
    "task": "Run a one-sample t-test of Score against a reference mean of 70. Compute one-sample Cohen’s d = (mean(Score) - 70) / sample SD(Score). Report the mean, SD, d and its direction. Interpret the standardized difference in context. This is a hypothetical teaching reference, not a population norm."
  },
  "m8-ttest-independent-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-independent-t-report": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-ttest-full-writeup": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-ttest-manuscript-results": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-ttest-student-welch": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Run both Student and Welch independent-samples t-tests of Score by Group. Compare variances, test statistics and degrees of freedom; explain why Welch degrees of freedom can be fractional."
  },
  "m8-ttest-pooled-vs-welch": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Run both Student and Welch independent-samples t-tests of Score by Group. Compare variances, test statistics and degrees of freedom; explain why Welch degrees of freedom can be fractional."
  },
  "m8-ttest-levene": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-ttest-shapiro": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-ttest-qq-plot": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-ttest-one-sided": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Test the directional hypothesis that Treatment has a higher mean Score than Control. Check group ordering and subtraction direction before selecting the one-sided alternative; report your conclusion."
  },
  "m8-ttest-cohens-d-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-ttest-ci-mean-diff": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test.\nCheck group Q-Q plots, Shapiro-Wilk tests and Levene’s test; explain the evidence together.\nReport group means and SDs, mean difference with 95% CI, t, df, p and Cohen’s d.\nInterpret direction, magnitude and uncertainty; write one APA-style results paragraph."
  },
  "m8-ttest-paired-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "Before",
      "After"
    ],
    "task": "Each row is the same simulated participant measured Before and After tutoring. Run a paired t-test in the direction After minus Before. Compute Difference = After - Before and run a two-sided one-sample t-test of Difference against 0 using the same complete rows. Compare t, df and p: they match when subtraction direction, rows and options match. Reversing the pair changes the sign of t, not its two-sided p-value."
  },
  "m8-ttest-difference-scores": {
    "file": "module8_learning.csv",
    "columns": [
      "Before",
      "After"
    ],
    "task": "Each row is the same simulated participant measured Before and After tutoring. Run a paired t-test in the direction After minus Before. Compute Difference = After - Before and run a two-sided one-sample t-test of Difference against 0 using the same complete rows. Compare t, df and p: they match when subtraction direction, rows and options match. Reversing the pair changes the sign of t, not its two-sided p-value."
  },
  "m8-ttest-mann-whitney": {
    "file": "module8_skewed.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Inspect the skewed Score distributions by Group, then run Mann-Whitney U for the independent groups. Explain what the rank-based result supports; do not describe it automatically as a test of means."
  },
  "m8-ttest-wilcoxon": {
    "file": "module8_skewed.csv",
    "columns": [
      "Before",
      "After"
    ],
    "task": "Each row is one simulated participant. Inspect After - Before, then run Wilcoxon signed-rank on the paired columns. Discuss its assumptions and interpretation."
  },
  "m8-correlation-pearson-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y).\nCalculate Pearson’s r and its p-value.\nInterpret direction and strength alongside the scatterplot; do not claim causation."
  },
  "m8-correlation-interpret": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y).\nCalculate Pearson’s r and its p-value.\nInterpret direction and strength alongside the scatterplot; do not claim causation."
  },
  "m8-scatterplot-regression-line": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y).\nAdd a fitted linear regression line.\nDescribe the relationship and how well the line follows the observations."
  },
  "m8-scatterplot-grouped": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y), colored or paneled by Group.\nCompare patterns between Control and Treatment."
  },
  "m8-scatterplot-matrix": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Create a scatterplot matrix of StudyHours, ExamScore and SleepHours (or three pairwise scatterplots).\nDescribe the patterns and any unusual observations."
  },
  "m8-regression-simple-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Fit ExamScore predicted by StudyHours.\nReport slope, its uncertainty and p-value, and R-squared.\nInterpret the slope and variance explained in context; do not claim causation."
  },
  "m8-regression-simple-interpret": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Fit ExamScore predicted by StudyHours.\nReport slope, its uncertainty and p-value, and R-squared.\nInterpret the slope and variance explained in context; do not claim causation."
  },
  "m8-anova-oneway-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA.\nInspect Levene’s test and a Q-Q plot of model residuals; explain the assumption checks.\nReport F, df, p and eta-squared.\nObtain Holm-adjusted pairwise post-hoc comparisons where appropriate; explain adjusted p-values.\nWrite one contextual APA-style results paragraph."
  },
  "m8-anova-oneway-ch13": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA.\nInspect Levene’s test and a Q-Q plot of model residuals; explain the assumption checks.\nReport F, df, p and eta-squared.\nObtain Holm-adjusted pairwise post-hoc comparisons where appropriate; explain adjusted p-values.\nWrite one contextual APA-style results paragraph."
  },
  "m8-anova-gamlj-oneway": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA.\nInspect Levene’s test and a Q-Q plot of model residuals; explain the assumption checks.\nReport F, df, p and eta-squared.\nObtain Holm-adjusted pairwise post-hoc comparisons where appropriate; explain adjusted p-values.\nWrite one contextual APA-style results paragraph."
  },
  "m8-anova-full-writeup": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA.\nInspect Levene’s test and a Q-Q plot of model residuals; explain the assumption checks.\nReport F, df, p and eta-squared.\nObtain Holm-adjusted pairwise post-hoc comparisons where appropriate; explain adjusted p-values.\nWrite one contextual APA-style results paragraph."
  },
  "m8-anova-factorial-gamlj": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "Group",
      "MethodScore"
    ],
    "task": "Fit MethodScore predicted by Method, Group and Method × Group. Both factors are categorical and all six cells contain observations. In jamovi use GAMLj. Obtain an interaction plot and explain the interaction and main effects."
  },
  "m8-anova-posthoc-holm": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA.\nInspect Levene’s test and a Q-Q plot of model residuals; explain the assumption checks.\nReport F, df, p and eta-squared.\nObtain Holm-adjusted pairwise post-hoc comparisons where appropriate; explain adjusted p-values.\nWrite one contextual APA-style results paragraph."
  },
  "m8-anova-levene": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA.\nInspect Levene’s test and a Q-Q plot of model residuals; explain the assumption checks.\nReport F, df, p and eta-squared.\nObtain Holm-adjusted pairwise post-hoc comparisons where appropriate; explain adjusted p-values.\nWrite one contextual APA-style results paragraph."
  },
  "m8-anova-qq-residuals": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA.\nInspect Levene’s test and a Q-Q plot of model residuals; explain the assumption checks.\nReport F, df, p and eta-squared.\nObtain Holm-adjusted pairwise post-hoc comparisons where appropriate; explain adjusted p-values.\nWrite one contextual APA-style results paragraph."
  },
  "m8-anova-welch": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Run standard and Welch one-way ANOVA of MethodScore by Method. Compare the results; the dataset need not violate an assumption to practice both procedures."
  },
  "m8-anova-kruskal": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Run Kruskal-Wallis for MethodScore by Method. Explain that it compares rank distributions and is not automatically a comparison of means."
  },
  "m8-anova-repeated-measures": {
    "file": "module8_learning.csv",
    "columns": [
      "Speech",
      "Conceptual",
      "Syntax"
    ],
    "task": "Use all 90 rows; each row is one participant measured on three tasks.\nDefine within-participant factor Task: Speech, Conceptual and Syntax; assign the matching columns.\nRun repeated-measures ANOVA and inspect Mauchly’s test.\nReport the test and an appropriate sphericity correction if needed; interpret the result."
  },
  "m8-anova-mauchly": {
    "file": "module8_learning.csv",
    "columns": [
      "Speech",
      "Conceptual",
      "Syntax"
    ],
    "task": "Use all 90 rows; each row is one participant measured on three tasks.\nDefine within-participant factor Task: Speech, Conceptual and Syntax; assign the matching columns.\nRun repeated-measures ANOVA and inspect Mauchly’s test.\nReport the test and an appropriate sphericity correction if needed; interpret the result."
  },
  "m8-anova-friedman": {
    "file": "module8_learning.csv",
    "columns": [
      "Speech",
      "Conceptual",
      "Syntax"
    ],
    "task": "Use all 90 participants’ paired Speech, Conceptual and Syntax scores.\nRun Friedman on these three columns.\nReport the statistic and p-value; interpret the rank-based result."
  },
  "m8-chisq-gof": {
    "file": "module8_suits.csv",
    "columns": [
      "Suit"
    ],
    "task": "Run chi-square goodness-of-fit on Suit using .25 expected proportion per suit.\nReport observed and expected counts, chi-square, df and p; interpret the result."
  },
  "m8-chisq-custom-proportions": {
    "file": "module8_suits.csv",
    "columns": [
      "Suit"
    ],
    "task": "Run chi-square goodness-of-fit on Suit using clubs=.20, diamonds=.30, hearts=.30 and spades=.20.\nReport observed and expected counts, chi-square, df and p; compare with equal proportions."
  },
  "m8-chisq-independence": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "State hypotheses for Major and StressLevel using the 300 supplied survey records.\nDisplay observed and expected counts; check chi-square assumptions.\nRun chi-square independence and report chi-square, df, p and Cramér’s V.\nInspect standardized residuals and describe which cells contribute to the association.\nWrite one contextual results paragraph using your actual output."
  },
  "m8-chisq-cramers-v": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "State hypotheses for Major and StressLevel using the 300 supplied survey records.\nDisplay observed and expected counts; check chi-square assumptions.\nRun chi-square independence and report chi-square, df, p and Cramér’s V.\nInspect standardized residuals and describe which cells contribute to the association.\nWrite one contextual results paragraph using your actual output."
  },
  "m8-chisq-apa-writeup": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "State hypotheses for Major and StressLevel using the 300 supplied survey records.\nDisplay observed and expected counts; check chi-square assumptions.\nRun chi-square independence and report chi-square, df, p and Cramér’s V.\nInspect standardized residuals and describe which cells contribute to the association.\nWrite one contextual results paragraph using your actual output."
  },
  "m8-chisq-standardized-residuals": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "State hypotheses for Major and StressLevel using the 300 supplied survey records.\nDisplay observed and expected counts; check chi-square assumptions.\nRun chi-square independence and report chi-square, df, p and Cramér’s V.\nInspect standardized residuals and describe which cells contribute to the association.\nWrite one contextual results paragraph using your actual output."
  },
  "m8-chisq-survey-analysis": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "State hypotheses for Major and StressLevel using the 300 supplied survey records.\nDisplay observed and expected counts; check chi-square assumptions.\nRun chi-square independence and report chi-square, df, p and Cramér’s V.\nInspect standardized residuals and describe which cells contribute to the association.\nWrite one contextual results paragraph using your actual output."
  },
  "m8-chisq-expected-freq": {
    "file": "module8_contingency.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome: A has 30 Success and 20 Failure; B has 15 Success and 35 Failure.\nDisplay expected counts; verify one using row total × column total / 100.\nCalculate χ² = Σ[(O − E)² / E] by hand and compare with the uncorrected software statistic.\nCompare corrected and uncorrected chi-square results; explain the continuity correction."
  },
  "m8-chisq-continuity": {
    "file": "module8_contingency.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome: A has 30 Success and 20 Failure; B has 15 Success and 35 Failure.\nDisplay expected counts; verify one using row total × column total / 100.\nCalculate χ² = Σ[(O − E)² / E] by hand and compare with the uncorrected software statistic.\nCompare corrected and uncorrected chi-square results; explain the continuity correction."
  },
  "m8-chisq-assumptions": {
    "file": "module8_contingency.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome: A has 30 Success and 20 Failure; B has 15 Success and 35 Failure.\nDisplay expected counts; verify one using row total × column total / 100.\nCalculate χ² = Σ[(O − E)² / E] by hand and compare with the uncorrected software statistic.\nCompare corrected and uncorrected chi-square results; explain the continuity correction."
  },
  "m8-chisq-by-hand": {
    "file": "module8_contingency.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome: A has 30 Success and 20 Failure; B has 15 Success and 35 Failure.\nDisplay expected counts; verify one using row total × column total / 100.\nCalculate χ² = Σ[(O − E)² / E] by hand and compare with the uncorrected software statistic.\nCompare corrected and uncorrected chi-square results; explain the continuity correction."
  },
  "m8-chisq-fisher": {
    "file": "module8_small_counts.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome, display expected counts, and run Fisher’s exact test for this small 2×2 table. Report the exact p-value and why the small counts matter."
  },
  "m8-chisq-mcnemar": {
    "file": "module8_paired_categories.csv",
    "columns": [
      "ResponseBefore",
      "ResponseAfter"
    ],
    "task": "Each of the 100 rows is the same simulated person before and after an advertisement. Run McNemar on ResponseBefore and ResponseAfter. Do not use an independent-groups chi-square test for these pairs."
  }
};
export function withModule8Dataset(exercise) {
  if (exercise.module !== 'module-8') return exercise;
  const plan = plans[exercise.practiceObjectiveKey];
  if (!plan) {
    if (exercise.software_type === 'conceptual' || ['written_response','conceptual'].includes(exercise.exercise_type))
      return {...exercise, instructions: exercise.instructions + ' This is an explanation task; no new dataset or experiment is required.'};
    return exercise;
  }
  const instructionSteps = [
    'Open '+plan.file+' from Tools → Datasets or the download link.',
    'Use columns (case-sensitive): '+plan.columns.join(', ')+'. Set categories to nominal and measurements to continuous.',
    ...plan.task.split(/\n|(?<=\.)\s+(?=[A-Z])/).filter(Boolean),
    'Keep your output and explanation as evidence. Reuse this supplied synthetic file for related tasks.'
  ];
  return {...exercise,
    instructionSteps,
    submission: 'Submit the requested output and your explanation using your actual results.',
    dataset: {filename: plan.file, url: '/'+plan.file, columns: plan.columns},
    instructions: instructionSteps.join('\n'),
    description: 'Use '+plan.file+' — '+plan.columns.join(', ')+'.',
    hint: 'Use '+exercise.software_type+' to perform the analysis requested in the title. ID identifies rows and is never an outcome or predictor. Report your actual results; example numbers from other datasets are not answer targets.',
    sample_data: null, sample_answer: undefined, success_message: undefined
  };
}

// Consolidate repeated analyses within each software package, retaining distinct methods.
const taskGroups = [
  [
    "Chi-square association: assumptions, effect size and report",
    [
      "m8-chisq-independence",
      "m8-chisq-cramers-v",
      "m8-chisq-apa-writeup",
      "m8-chisq-standardized-residuals",
      "m8-chisq-survey-analysis"
    ]
  ],
  [
    "Expected counts, hand calculation and continuity correction",
    [
      "m8-chisq-expected-freq",
      "m8-chisq-continuity",
      "m8-chisq-assumptions",
      "m8-chisq-by-hand"
    ]
  ],
  [
    "Independent t-test: assumptions, effect size and report",
    [
      "m8-ttest-independent-nav",
      "m8-independent-t-report",
      "m8-ttest-full-writeup",
      "m8-ttest-manuscript-results",
      "m8-ttest-levene",
      "m8-ttest-shapiro",
      "m8-ttest-qq-plot",
      "m8-ttest-cohens-d-nav",
      "m8-ttest-ci-mean-diff"
    ]
  ],
  [
    "Student versus Welch: variances and degrees of freedom",
    [
      "m8-ttest-student-welch",
      "m8-ttest-pooled-vs-welch"
    ]
  ],
  [
    "Paired t-test and difference scores",
    [
      "m8-ttest-paired-nav",
      "m8-ttest-difference-scores"
    ]
  ],
  [
    "Pearson correlation and interpretation",
    [
      "m8-correlation-pearson-nav",
      "m8-correlation-interpret"
    ]
  ],
  [
    "Simple regression and interpretation",
    [
      "m8-regression-simple-nav",
      "m8-regression-simple-interpret"
    ]
  ],
  [
    "One-way ANOVA: assumptions, post-hoc tests and report",
    [
      "m8-anova-oneway-nav",
      "m8-anova-oneway-ch13",
      "m8-anova-gamlj-oneway",
      "m8-anova-full-writeup",
      "m8-anova-posthoc-holm",
      "m8-anova-levene",
      "m8-anova-qq-residuals"
    ]
  ],
  [
    "Repeated-measures ANOVA and sphericity",
    [
      "m8-anova-repeated-measures",
      "m8-anova-mauchly"
    ]
  ]
];
export function consolidateModule8Exercises(exercises) {
 const seen = new Set();
 return exercises.flatMap(exercise => {
  if (exercise.module !== 'module-8' || !exercise.is_active) return [exercise];
  const group = taskGroups.find(([, keys]) => keys.includes(exercise.practiceObjectiveKey));
  if (!group) return [exercise];
  const id = exercise.software_type + ':' + group[0];
  if (seen.has(id)) return [];
  seen.add(id);
  return [{...exercise, title: group[0], exercise_type: 'instructional'}];
 });
}
