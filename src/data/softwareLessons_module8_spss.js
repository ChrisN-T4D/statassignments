// Module 8 - Comparing groups and relationships in IBM SPSS:
// independent/paired t-tests, chi-square, Pearson correlation, regression, ANOVA.
// SPSS counterparts of the jamovi-module-8-unified lesson. Grounded in Learning Statistics with SPSS (LibreTexts).

const tTestPhases = {
  iDo: {
    type: 'demonstration',
    title: 'Independent and paired t-tests in SPSS',
    content: [
      {
        type: 'text',
        content:
          '<p>The design decides the test: two <strong>different</strong> groups (e.g., treatment vs. control) → <strong>Independent-Samples T Test</strong>. The <strong>same</strong> people measured twice (pre/post) → <strong>Paired-Samples T Test</strong>. Treating paired data as independent is the classic error — it throws away the correlation between the two measurements.</p>'
      },
      {
        type: 'step_sequence',
        steps: [
          {
            step: 1,
            title: 'Import the data',
            description:
              'Tools → download <strong>bmi_and_exercise.csv</strong> → <strong>File → Import Data → CSV</strong>. Check Variable View: <strong>bmi</strong> is Scale (numeric), <strong>gender</strong> is Nominal.'
          },
          {
            step: 2,
            title: 'Open the Independent-Samples T Test',
            description:
              'Menu: <strong>Analyze → Compare Means → Independent-Samples T Test</strong>. Move <strong>bmi</strong> into Test Variable(s); move <strong>gender</strong> into Grouping Variable and click <strong>Define Groups</strong> — enter the two group codes (e.g., 0 and 1).'
          },
          {
            step: 3,
            title: 'Read the output — two rows',
            description:
              'The Group Statistics table gives M and SD per group (these go in your APA sentence). The Independent Samples Test table has <strong>two rows</strong>: "Equal variances assumed" and "Equal variances not assumed". Read <strong>Levene\'s Test for Equality of Variances</strong> first: if Levene\'s p &gt; .05, use the FIRST row; if p &le; .05, use the SECOND row (Welch).'
          },
          {
            step: 4,
            title: 'Effect size',
            description:
              'SPSS does not print Cohen\'s d in the standard output. Compute it from the Group Statistics table: <strong>d = (M&#8321; &minus; M&#8322;) / s&#772;</strong>, with pooled s&#772; = &radic;((s&#178;&#8321; + s&#178;&#8322;)/2) for equal group sizes. Judge against the 0.2 / 0.5 / 0.8 benchmarks.'
          }
        ]
      },
      {
        type: 'text',
        content:
          '<p><strong>Paired test:</strong> Analyze → Compare Means → <strong>Paired-Samples T Test</strong>; move the two time-point variables into the Paired Variables box. The output includes the correlation between the pair members — that correlation is exactly what the independent test ignores.</p>'
      }
    ]
  },
  weDo: {
    type: 'guided_practice',
    title: 'Guided: choosing and running the right t-test',
    scenario: 'Designs to classify and run.',
    steps: [
      {
        instruction: 'Meditation vs. control group, anxiety scores — which menu?',
        hint: 'Two different groups → Independent-Samples T Test.',
        checkpoint: 'Analyze → Compare Means → Independent-Samples T Test; Levene decides the row.'
      },
      {
        instruction: 'Same students, exam 1 vs. exam 2 — which menu?',
        hint: 'Same people twice → Paired-Samples T Test.',
        checkpoint: 'Analyze → Compare Means → Paired-Samples T Test.'
      },
      {
        instruction: 'Levene\'s p = .02 — which row of the output?',
        hint: 'Equal variances NOT assumed (Welch).',
        checkpoint: 'Second row; report its t, df, and p.'
      }
    ],
    assessment: {
      type: 'multiple_choice',
      question: 'Pre/post data on the same people analyzed with an independent-samples t-test. What happens?',
      options: [
        'Nothing — the two tests give identical answers',
        'The analysis ignores the pre/post correlation, typically losing power',
        'SPSS refuses to run it',
        'The effect size is automatically doubled'
      ],
      correctAnswer: 1,
      feedback: {
        correct: 'Correct — pairing is information; ignoring it wastes that information.',
        incorrect: 'The paired design\'s correlation is thrown away, usually costing power.'
      }
    }
  },
  youDo: {
    type: 'independent_practice',
    title: 't-test output reading',
    scenario: 'From the Independent Samples Test table below.',
    assessment: [
      {
        type: 'multiple_choice',
        question: 'Levene\'s p = .44, first-row t(48) = 2.10, p = .041. What do you report?',
        options: [
          't(48) = 2.10, p = .041 (equal variances assumed)',
          'Welch t, second row',
          'The test failed; rerun with Levene corrected',
          'p = .44, not significant'
        ],
        correctAnswer: 0,
        feedback: { correct: 'Levene p > .05 → first row.', incorrect: 'Levene p > .05 means equal variances hold — use the first row.' }
      },
      {
        type: 'fill_blank',
        question: 'M&#8321; = 30, M&#8322; = 25, s&#8321; = 10, s&#8322; = 10. Cohen\'s d = ______.',
        answer: '0.5',
        feedback: { correct: 'd = 5/10 = 0.5 — a medium effect.', incorrect: 'd = (M&#8321;&minus;M&#8322;)/pooled SD = 5/10 = 0.5.' }
      }
    ]
  }
}

const correlationRegressionPhases = {
  iDo: {
    type: 'demonstration',
    title: 'Correlation and regression in SPSS',
    content: [
      {
        type: 'step_sequence',
        steps: [
          {
            step: 1,
            title: 'Pearson correlation',
            description:
              'Menu: <strong>Analyze → Correlate → Bivariate</strong>. Move the two continuous variables (e.g., <strong>age</strong> and <strong>bmi</strong> from bmi_and_exercise.csv) into Variables; keep <strong>Pearson</strong> checked, two-tailed. The output matrix shows r, its p-value, and n for each pair.'
          },
          {
            step: 2,
            title: 'Read r',
            description:
              'Sign = direction; magnitude = strength (0.1 weak, 0.3 moderate, 0.5 strong as rough anchors). Square r for variance explained: r = .4 → r&sup2; = .16 → 16% of the variation in one variable tracks the other. <strong>Correlation is not causation</strong> — ice cream sales correlate with drownings (confounder: heat).'
          },
          {
            step: 3,
            title: 'Simple regression',
            description:
              'Menu: <strong>Analyze → Regression → Linear</strong>. Move <strong>bmi</strong> into Dependent, <strong>age</strong> into Independent(s). The Coefficients table gives the intercept (Constant) and the <strong>slope</strong> (B for the predictor): slope = predicted change in the dependent variable per +1 on the predictor.'
          },
          {
            step: 4,
            title: 'APA reporting',
            description:
              'Report both: r and its p in one sentence (e.g., "BMI and age were positively correlated, r = .31, p &lt; .001"), or the regression as Y = a + b&middot;X with each coefficient\'s significance. Significance (p) says the relationship is detectable; the effect size (r, r&sup2;, slope) says how big it is.'
          }
        ]
      }
    ]
  },
  weDo: {
    type: 'guided_practice',
    title: 'Guided: interpret SPSS correlation output',
    scenario: 'Bivariate Correlations table: age × bmi r = .31, p &lt; .001, n = 250.',
    steps: [
      {
        instruction: 'Strength and direction of r = .31?',
        hint: 'Sign positive; 0.3 ≈ moderate anchor.',
        checkpoint: 'Moderate positive correlation.'
      },
      {
        instruction: 'Variance explained?',
        hint: 'Square r.',
        checkpoint: 'r&sup2; &asymp; .096 → about 9.6%.'
      },
      {
        instruction: 'Does the correlation show age CAUSES higher BMI?',
        hint: 'Correlation ≠ causation — think confounders.',
        checkpoint: 'No. Only a true experimental design supports causal claims.'
      }
    ],
    assessment: {
      type: 'multiple_choice',
      question: 'r = &minus;.60 between sleep hours and anxiety. Best interpretation?',
      options: [
        'Sleep causes lower anxiety',
        'More sleep goes with less anxiety; 36% of variance shared',
        'Anxiety causes sleep loss',
        'A weak negative relationship'
      ],
      correctAnswer: 1,
      feedback: {
        correct: 'Correct — direction, strength, r&sup2;, and no causal claim.',
        incorrect: 'Describe direction and strength (r&sup2; = .36), and skip causal language.'
      }
    }
  },
  youDo: {
    type: 'independent_practice',
    title: 'Regression output check',
    scenario: 'Linear regression: slope B = 0.42 (p &lt; .001), Constant = 22.1.',
    assessment: [
      {
        type: 'fill_blank',
        question: 'Predicted BMI for age = 40: 22.1 + 0.42 × 40 = ______.',
        answer: '38.9',
        feedback: { correct: '22.1 + 16.8 = 38.9.', incorrect: 'Intercept + slope × age = 22.1 + 0.42(40) = 38.9.' }
      },
      {
        type: 'multiple_choice',
        question: 'The slope 0.42 means:',
        options: [
          'BMI is 42% predicted by age',
          'Each additional year of age predicts +0.42 BMI on average',
          'The correlation is .42',
          'Age and BMI covary in 42% of cases'
      ],
        correctAnswer: 1,
        feedback: { correct: 'Yes — slope is predicted change in Y per +1 X.', incorrect: 'Slope is change in the DEPENDENT variable per unit of the predictor.' }
      }
    ]
  }
}

const chiSquareAnovaPhases = {
  iDo: {
    type: 'demonstration',
    title: 'Chi-square and ANOVA in SPSS',
    content: [
      {
        type: 'text',
        content:
          '<p>Match the question to the test: <strong>categorical counts</strong> → chi-square; <strong>3+ group means</strong> → one-way ANOVA.</p>'
      },
      {
        type: 'step_sequence',
        steps: [
          {
            step: 1,
            title: 'Chi-square test of independence',
            description:
              'Menu: <strong>Analyze → Descriptive Statistics → Crosstabs</strong>. Put one categorical variable in Rows, the other in Columns. Click <strong>Statistics</strong> and check <strong>Chi-square</strong>. The output\'s Pearson Chi-Square row gives &chi;&sup2;, df, and p. A significant result means the two variables are related (cells deviate from independence) — check the expected-count warning: SPSS flags if any expected cell count &lt; 5.'
          },
          {
            step: 2,
            title: 'Goodness of fit (one variable)',
            description:
              'For "do counts match expected proportions?" use <strong>Analyze → Nonparametric Tests → Legacy Dialogs → Chi-square</strong>. Independence test = TWO variables (Crosstabs); goodness of fit = ONE variable.'
          },
          {
            step: 3,
            title: 'One-way ANOVA',
            description:
              'Menu: <strong>Analyze → Compare Means → One-Way ANOVA</strong>. Dependent list = the continuous outcome; Factor = the grouping variable. The ANOVA table gives <strong>F = between-group variance / within-group variance</strong> — a big F means group-mean differences dominate noise. Request <strong>Post Hoc → Tukey</strong> to see WHICH pairs differ.'
          },
          {
            step: 4,
            title: 'Interactions in one sentence',
            description:
              'An interaction means the effect of one variable DEPENDS on another (drug works for men but not women). In a plot, the group lines cross (or would). Factorial designs test this with Analyze → General Linear Model → Univariate.'
          }
        ]
      },
      {
        type: 'table',
        headers: ['Research question', 'Test', 'SPSS menu'],
        rows: [
          ['Compare 2 group means', 'Independent t', 'Compare Means → Independent-Samples T Test'],
          ['Compare 3+ group means', 'One-way ANOVA', 'Compare Means → One-Way ANOVA'],
          ['Relate two continuous variables', 'Correlation / regression', 'Correlate → Bivariate; Regression → Linear'],
          ['Relate two categorical variables', 'Chi-square independence', 'Descriptive Statistics → Crosstabs'],
          ['Counts vs. expected proportions', 'Chi-square GOF', 'Nonparametric Tests → Legacy Dialogs → Chi-square']
        ]
      }
    ]
  },
  weDo: {
    type: 'guided_practice',
    title: 'Guided: match the test',
    scenario: 'Classify each question.',
    steps: [
      {
        instruction: 'Is major (Psych/Nursing/Business) related to study-abroad intent (yes/no)?',
        hint: 'Two categorical variables.',
        checkpoint: 'Chi-square test of independence (Crosstabs).'
      },
      {
        instruction: 'Do exam scores differ across THREE teaching methods?',
        hint: '3+ means.',
        checkpoint: 'One-way ANOVA; Tukey post hoc for pairs.'
      },
      {
        instruction: 'Does the method effect differ for first-years vs. seniors?',
        hint: 'Effect depends on another variable.',
        checkpoint: 'Interaction — factorial ANOVA (GLM Univariate).'
      }
    ],
    assessment: {
      type: 'multiple_choice',
      question: 'F = 9.4, p &lt; .001 in a one-way ANOVA with three groups. This tells you:',
      options: [
        'Group 1 differs from Group 2 specifically',
        'At least one group mean differs from the others',
        'All three means are equal',
        'The variances are unequal'
      ],
      correctAnswer: 1,
      feedback: {
        correct: 'Correct — ANOVA is an omnibus test; use post hocs to locate the difference.',
        incorrect: 'ANOVA says SOME difference exists; Tukey tells you which pairs.'
      }
    }
  },
  youDo: {
    type: 'independent_practice',
    title: 'Test-family quiz',
    scenario: 'Cumulative check.',
    assessment: [
      {
        type: 'multiple_choice',
        question: 'SPSS warns "1 expected cell count < 5" in your Crosstabs chi-square. You should:',
        options: [
          'Ignore it — chi-square is robust to everything',
          'Consider combining categories or Fisher\'s exact test (2×2)',
          'Switch to a t-test',
          'Increase alpha'
        ],
        correctAnswer: 1,
        feedback: { correct: 'Right — small expected counts distort &chi;&sup2;; collapse categories or use exact tests.', incorrect: 'Small expected counts are the classic chi-square violation.' }
      },
      {
        type: 'multiple_choice',
        question: 'Which pairing is CORRECT?',
        options: [
          'Categorical → ANOVA',
          ['Two group means → chi-square'],
          ['3+ means → ANOVA (F)'],
          ['Continuous variables → Crosstabs']
        ],
        correctAnswer: 2,
        feedback: { correct: 'F compares 3+ means.', incorrect: 'Review the matching table: means → t/F; counts → chi-square; continuous → correlation.' }
      }
    ]
  }
}

export const module8SpssLessons = [
  {
    id: 'spss-module-8-ttests',
    module: 'stats-module-8',
    title: 'Independent and Paired t-Tests in SPSS',
    software: 'spss',
    objectives: [
      'Choose independent vs. paired t-tests from the design',
      'Run the test and read the Levene/Welch rows correctly',
      'Compute Cohen\'s d from the Group Statistics table'
    ],
    estimatedTime: 30,
    phases: tTestPhases
  },
  {
    id: 'spss-module-8-correlation-regression',
    module: 'stats-module-8',
    title: 'Correlation and Regression in SPSS',
    software: 'spss',
    objectives: [
      'Run a Pearson correlation with Bivariate Correlations',
      'Run a simple linear regression and interpret the slope',
      'Report r, r&sup2;, and regression results in APA style'
    ],
    estimatedTime: 30,
    phases: correlationRegressionPhases
  },
  {
    id: 'spss-module-8-chisquare-anova',
    module: 'stats-module-8',
    title: 'Chi-Square and ANOVA in SPSS',
    software: 'spss',
    objectives: [
      'Run a chi-square test of independence with Crosstabs',
      'Run a one-way ANOVA with Tukey post hoc',
      'Match research questions to test families'
    ],
    estimatedTime: 35,
    phases: chiSquareAnovaPhases
  }
]
