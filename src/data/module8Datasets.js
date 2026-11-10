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
  "m8-cohens-d-onesample": {"file":"module8_learning.csv","columns":["Score"],"task":"Run a one-sample t-test of Score against a reference mean of 70. Compute one-sample Cohen’s d = (mean(Score) - 70) / sample SD(Score). Report the mean, SD, d and its direction. Interpret the standardized difference in context. This is a hypothetical teaching reference, not a population norm."},
  "m8-ttest-independent-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test. Check assumptions, report group descriptives, the mean difference and its 95% CI, t, df, p and effect size. Explain the result in context."
  },
  "m8-independent-t-report": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test. Check assumptions, report group descriptives, the mean difference and its 95% CI, t, df, p and effect size. Explain the result in context."
  },
  "m8-ttest-full-writeup": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test. Check assumptions, report group descriptives, the mean difference and its 95% CI, t, df, p and effect size. Explain the result in context."
  },
  "m8-ttest-manuscript-results": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Compare Score between Control and Treatment with an independent-samples t-test. Check assumptions, report group descriptives, the mean difference and its 95% CI, t, df, p and effect size. Explain the result in context."
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
    "task": "Check homogeneity of variance for Score by Group with Levene’s test. Report its p-value and explain the implication for Student versus Welch testing."
  },
  "m8-ttest-shapiro": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Inspect Score separately by Group with Q-Q plots and Shapiro-Wilk tests. Describe the evidence without treating a normality p-value alone as an automatic test-selection rule."
  },
  "m8-ttest-qq-plot": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Inspect Score separately by Group with Q-Q plots and Shapiro-Wilk tests. Describe the evidence without treating a normality p-value alone as an automatic test-selection rule."
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
    "task": "Run an independent-samples t-test of Score by Group. Enable Cohen’s d and the 95% confidence interval for the mean difference. Interpret magnitude, direction and uncertainty in context."
  },
  "m8-ttest-ci-mean-diff": {
    "file": "module8_learning.csv",
    "columns": [
      "Group",
      "Score"
    ],
    "task": "Run an independent-samples t-test of Score by Group. Enable Cohen’s d and the 95% confidence interval for the mean difference. Interpret magnitude, direction and uncertainty in context."
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
    "task": "Plot StudyHours (X) against ExamScore (Y), calculate Pearson correlation, and fit ExamScore predicted by StudyHours. Interpret direction, slope and R-squared without claiming causation. For a scatterplot matrix include SleepHours; for grouped plots color by Group. Use the plot or model requested in the task title."
  },
  "m8-correlation-interpret": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y), calculate Pearson correlation, and fit ExamScore predicted by StudyHours. Interpret direction, slope and R-squared without claiming causation. For a scatterplot matrix include SleepHours; for grouped plots color by Group. Use the plot or model requested in the task title."
  },
  "m8-scatterplot-regression-line": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y), calculate Pearson correlation, and fit ExamScore predicted by StudyHours. Interpret direction, slope and R-squared without claiming causation. For a scatterplot matrix include SleepHours; for grouped plots color by Group. Use the plot or model requested in the task title."
  },
  "m8-scatterplot-grouped": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y), calculate Pearson correlation, and fit ExamScore predicted by StudyHours. Interpret direction, slope and R-squared without claiming causation. For a scatterplot matrix include SleepHours; for grouped plots color by Group. Use the plot or model requested in the task title."
  },
  "m8-scatterplot-matrix": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y), calculate Pearson correlation, and fit ExamScore predicted by StudyHours. Interpret direction, slope and R-squared without claiming causation. For a scatterplot matrix include SleepHours; for grouped plots color by Group. Use the plot or model requested in the task title."
  },
  "m8-regression-simple-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y), calculate Pearson correlation, and fit ExamScore predicted by StudyHours. Interpret direction, slope and R-squared without claiming causation. For a scatterplot matrix include SleepHours; for grouped plots color by Group. Use the plot or model requested in the task title."
  },
  "m8-regression-simple-interpret": {
    "file": "module8_learning.csv",
    "columns": [
      "StudyHours",
      "ExamScore",
      "SleepHours",
      "Group"
    ],
    "task": "Plot StudyHours (X) against ExamScore (Y), calculate Pearson correlation, and fit ExamScore predicted by StudyHours. Interpret direction, slope and R-squared without claiming causation. For a scatterplot matrix include SleepHours; for grouped plots color by Group. Use the plot or model requested in the task title."
  },
  "m8-anova-oneway-nav": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA. Method is the categorical factor; MethodScore is continuous. Check assumptions, report F, df, p and eta-squared, and use Holm-adjusted post-hoc comparisons where appropriate. Write a contextual results paragraph. In jamovi, use GAMLj if requested in the title; in other packages use the equivalent one-way model."
  },
  "m8-anova-oneway-ch13": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA. Method is the categorical factor; MethodScore is continuous. Check assumptions, report F, df, p and eta-squared, and use Holm-adjusted post-hoc comparisons where appropriate. Write a contextual results paragraph. In jamovi, use GAMLj if requested in the title; in other packages use the equivalent one-way model."
  },
  "m8-anova-gamlj-oneway": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA. Method is the categorical factor; MethodScore is continuous. Check assumptions, report F, df, p and eta-squared, and use Holm-adjusted post-hoc comparisons where appropriate. Write a contextual results paragraph. In jamovi, use GAMLj if requested in the title; in other packages use the equivalent one-way model."
  },
  "m8-anova-full-writeup": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Compare MethodScore across Traditional, Online and Hybrid using one-way ANOVA. Method is the categorical factor; MethodScore is continuous. Check assumptions, report F, df, p and eta-squared, and use Holm-adjusted post-hoc comparisons where appropriate. Write a contextual results paragraph. In jamovi, use GAMLj if requested in the title; in other packages use the equivalent one-way model."
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
    "task": "Run one-way ANOVA of MethodScore by Method and obtain all pairwise post-hoc comparisons with Holm correction. Explain adjusted p-values."
  },
  "m8-anova-levene": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Fit one-way ANOVA of MethodScore by Method. Inspect Levene’s test and a Q-Q plot of model residuals; report the evidence for the assumptions."
  },
  "m8-anova-qq-residuals": {
    "file": "module8_learning.csv",
    "columns": [
      "Method",
      "MethodScore"
    ],
    "task": "Fit one-way ANOVA of MethodScore by Method. Inspect Levene’s test and a Q-Q plot of model residuals; report the evidence for the assumptions."
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
    "task": "Each row is one participant measured on three tasks. Define a within-participant factor Task with levels Speech, Conceptual and Syntax and assign the corresponding columns. Run repeated-measures ANOVA, inspect Mauchly’s test and report a correction if needed. For the Friedman task, run Friedman on the same three paired columns instead. Use all 90 rows."
  },
  "m8-anova-mauchly": {
    "file": "module8_learning.csv",
    "columns": [
      "Speech",
      "Conceptual",
      "Syntax"
    ],
    "task": "Each row is one participant measured on three tasks. Define a within-participant factor Task with levels Speech, Conceptual and Syntax and assign the corresponding columns. Run repeated-measures ANOVA, inspect Mauchly’s test and report a correction if needed. For the Friedman task, run Friedman on the same three paired columns instead. Use all 90 rows."
  },
  "m8-anova-friedman": {
    "file": "module8_learning.csv",
    "columns": [
      "Speech",
      "Conceptual",
      "Syntax"
    ],
    "task": "Each row is one participant measured on three tasks. Define a within-participant factor Task with levels Speech, Conceptual and Syntax and assign the corresponding columns. Run repeated-measures ANOVA, inspect Mauchly’s test and report a correction if needed. For the Friedman task, run Friedman on the same three paired columns instead. Use all 90 rows."
  },
  "m8-chisq-gof": {
    "file": "module8_suits.csv",
    "columns": [
      "Suit"
    ],
    "task": "Run chi-square goodness-of-fit on Suit. For the equal-proportions task use .25 per suit; for custom proportions use clubs=.20, diamonds=.30, hearts=.30, spades=.20. The file has 200 rows: clubs=35, diamonds=51, hearts=64, spades=50. Report observed/expected counts, chi-square, df and p."
  },
  "m8-chisq-custom-proportions": {
    "file": "module8_suits.csv",
    "columns": [
      "Suit"
    ],
    "task": "Run chi-square goodness-of-fit on Suit. For the equal-proportions task use .25 per suit; for custom proportions use clubs=.20, diamonds=.30, hearts=.30, spades=.20. The file has 200 rows: clubs=35, diamonds=51, hearts=64, spades=50. Report observed/expected counts, chi-square, df and p."
  },
  "m8-chisq-independence": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "Use the supplied 300 simulated survey records, not a survey you must conduct. Test association between Major (Psychology, Biology, Math) and StressLevel (Low, Medium, High) with chi-square independence. State hypotheses, display observed/expected counts, check assumptions, report chi-square, df, p and Cramér’s V, and interpret the result. For the residuals task also inspect standardized residuals; report what you observe rather than assuming significance."
  },
  "m8-chisq-cramers-v": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "Use the supplied 300 simulated survey records, not a survey you must conduct. Test association between Major (Psychology, Biology, Math) and StressLevel (Low, Medium, High) with chi-square independence. State hypotheses, display observed/expected counts, check assumptions, report chi-square, df, p and Cramér’s V, and interpret the result. For the residuals task also inspect standardized residuals; report what you observe rather than assuming significance."
  },
  "m8-chisq-apa-writeup": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "Use the supplied 300 simulated survey records, not a survey you must conduct. Test association between Major (Psychology, Biology, Math) and StressLevel (Low, Medium, High) with chi-square independence. State hypotheses, display observed/expected counts, check assumptions, report chi-square, df, p and Cramér’s V, and interpret the result. For the residuals task also inspect standardized residuals; report what you observe rather than assuming significance."
  },
  "m8-chisq-standardized-residuals": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "Use the supplied 300 simulated survey records, not a survey you must conduct. Test association between Major (Psychology, Biology, Math) and StressLevel (Low, Medium, High) with chi-square independence. State hypotheses, display observed/expected counts, check assumptions, report chi-square, df, p and Cramér’s V, and interpret the result. For the residuals task also inspect standardized residuals; report what you observe rather than assuming significance."
  },
  "m8-chisq-survey-analysis": {
    "file": "module8_survey.csv",
    "columns": [
      "Major",
      "StressLevel"
    ],
    "task": "Use the supplied 300 simulated survey records, not a survey you must conduct. Test association between Major (Psychology, Biology, Math) and StressLevel (Low, Medium, High) with chi-square independence. State hypotheses, display observed/expected counts, check assumptions, report chi-square, df, p and Cramér’s V, and interpret the result. For the residuals task also inspect standardized residuals; report what you observe rather than assuming significance."
  },
  "m8-chisq-expected-freq": {
    "file": "module8_contingency.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome: A has 30 Success and 20 Failure; B has 15 Success and 35 Failure. Display expected counts and verify one by row total × column total / 100. Run chi-square independence. For hand calculation compare the uncorrected statistic; for continuity correction compare corrected and uncorrected results."
  },
  "m8-chisq-continuity": {
    "file": "module8_contingency.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome: A has 30 Success and 20 Failure; B has 15 Success and 35 Failure. Display expected counts and verify one by row total × column total / 100. Run chi-square independence. For hand calculation compare the uncorrected statistic; for continuity correction compare corrected and uncorrected results."
  },
  "m8-chisq-assumptions": {
    "file": "module8_contingency.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome: A has 30 Success and 20 Failure; B has 15 Success and 35 Failure. Display expected counts and verify one by row total × column total / 100. Run chi-square independence. For hand calculation compare the uncorrected statistic; for continuity correction compare corrected and uncorrected results."
  },
  "m8-chisq-by-hand": {
    "file": "module8_contingency.csv",
    "columns": [
      "Group",
      "Outcome"
    ],
    "task": "Cross-tabulate Group and Outcome: A has 30 Success and 20 Failure; B has 15 Success and 35 Failure. Display expected counts and verify one by row total × column total / 100. Run chi-square independence. For hand calculation compare the uncorrected statistic; for continuity correction compare corrected and uncorrected results."
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
  return {...exercise,
    dataset: {filename: plan.file, url: '/'+plan.file, columns: plan.columns},
    instructions: 'Download '+plan.file+' from Tools → Datasets (or the link below) and open it in your chosen software. These are synthetic teaching records; do not invent, collect or simulate data and do not use lsj-data for this task. Reuse this file for related tasks. Columns (case-sensitive): '+plan.columns.join(', ')+'. Set grouping/category columns to nominal and measurement columns to continuous. '+plan.task,
    description: 'Use '+plan.file+' — '+plan.columns.join(', ')+'.',
    hint: 'Use '+exercise.software_type+' to perform the analysis requested in the title. ID identifies rows and is never an outcome or predictor. Report your actual results; example numbers from other datasets are not answer targets.',
    sample_data: null, sample_answer: undefined, success_message: undefined
  };
}
