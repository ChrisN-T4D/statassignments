// Module 6 - Probability, normal distribution, and confidence intervals in IBM SPSS.
// SPSS counterparts of the jamovi-module-6-unified lesson: CDF.NORMAL via Compute Variable,
// Explore for CIs. Grounded in Learning Statistics with SPSS (LibreTexts).

const normalProbabilityPhases = {
  iDo: {
    type: 'demonstration',
    title: 'Normal probabilities with CDF.NORMAL in SPSS',
    content: [
      {
        type: 'text',
        content:
          '<p>SPSS computes normal-distribution probabilities with the <strong>Transform → Compute Variable</strong> menu. The function <strong>CDF.NORMAL(x, mean, sd)</strong> returns P(X &le; x) — the area to the <em>left</em> of x.</p>'
      },
      {
        type: 'step_sequence',
        steps: [
          {
            step: 1,
            title: 'Open the Compute Variable dialog',
            description:
              'Menu: <strong>Transform → Compute Variable</strong>. The dialog has a <strong>Target Variable</strong> box (top-left) and a <strong>Numeric Expression</strong> box (bottom).'
          },
          {
            step: 2,
            title: 'Name the target variable',
            description:
              'In Target Variable type a name such as <strong>p_below</strong>. SPSS names must not contain spaces.'
          },
          {
            step: 3,
            title: 'Build the expression',
            description:
              'In Numeric Expression type: <strong>CDF.NORMAL(115, 100, 15)</strong> — this computes P(X &le; 115) for IQ scores (&mu; = 100, &sigma; = 15). Click <strong>OK</strong>. The Data View gains a new column filled with the same probability for every row (SPSS computes per row; a constant expression gives a constant result).'
          },
          {
            step: 4,
            title: 'Read and interpret',
            description:
              'SPSS adds p_below &asymp; <strong>0.841</strong>. Interpretation: about <strong>84.1%</strong> of IQ scores fall at or below 115. The 68% rule checks out: z = (115&minus;100)/15 = +1.0, and the area below z = +1 is &asymp; 84%.'
          }
        ]
      },
      {
        type: 'text',
        content:
          '<p><strong>Above a value:</strong> P(X &gt; x) = 1 &minus; CDF.NORMAL(x, &mu;, &sigma;). <strong>Between two values:</strong> subtract the two CDFs. <strong>Reverse direction (percentiles):</strong> use <strong>IDF.NORMAL(p, &mu;, &sigma;)</strong> — e.g. IDF.NORMAL(0.90, 100, 15) &asymp; 119.2, the 90th percentile IQ.</p>'
      }
    ]
  },
  weDo: {
    type: 'guided_practice',
    title: 'Guided: areas under the IQ curve',
    scenario: 'IQ: &mu; = 100, &sigma; = 15. Compute each in SPSS with Compute Variable.',
    steps: [
      {
        instruction: 'P(X &le; 85)? Build CDF.NORMAL(85, 100, 15).',
        hint: 'Answer &asymp; 0.159. Compare with the 68% rule: 85 is z = &minus;1.',
        checkpoint: '&asymp;16% of scores at or below 85.'
      },
      {
        instruction: 'P(X &gt; 130)? Remember: 1 &minus; CDF.',
        hint: '1 &minus; CDF.NORMAL(130, 100, 15) &asymp; 1 &minus; 0.977 = 0.023.',
        checkpoint: '&asymp;2.3% above 130 — matches the 95% rule.'
      },
      {
        instruction: 'P(85 &le; X &le; 115)? Difference of two CDFs.',
        hint: 'CDF.NORMAL(115,...) &minus; CDF.NORMAL(85,...) &asymp; 0.841 &minus; 0.159.',
        checkpoint: '&asymp;0.682 — the 68% rule.'
      }
    ],
    assessment: {
      type: 'multiple_choice',
      question: 'Which SPSS expression gives P(X &gt; 120) for &mu; = 100, &sigma; = 15?',
      options: [
        'CDF.NORMAL(120, 100, 15)',
        '1 &minus; CDF.NORMAL(120, 100, 15)',
        'IDF.NORMAL(120, 100, 15)',
        'CDF.NORMAL(100, 120, 15)'
      ],
      correctAnswer: 1,
      feedback: {
        correct: 'Correct — CDF gives the area below, so subtract from 1 for the area above.',
        incorrect: 'CDF.NORMAL gives the area to the LEFT; flip it with 1 &minus; for above. IDF is for percentiles.'
      }
    }
  },
  youDo: {
    type: 'independent_practice',
    title: 'Percentile and probability drill',
    scenario: 'Use Transform → Compute Variable for each.',
    assessment: [
      {
        type: 'multiple_choice',
        question: 'The 90th percentile of IQ (&mu; = 100, &sigma; = 15) is closest to:',
        options: ['109', '115', '119', '130'],
        correctAnswer: 2,
        feedback: { correct: 'Good — IDF.NORMAL(0.90, 100, 15) &asymp; 119.2.', incorrect: 'Build IDF.NORMAL(0.90, 100, 15) in SPSS and compare.' }
      },
      {
        type: 'fill_blank',
        question: 'P(X &le; 100) for IQ (&mu; = 100, &sigma; = 15) equals ______.',
        answer: '0.5',
        feedback: { correct: 'The mean is the 50th percentile of a symmetric distribution.', incorrect: 'Half the distribution lies below the mean.' }
      }
    ]
  }
}

const confidenceIntervalPhases = {
  iDo: {
    type: 'demonstration',
    title: 'Confidence intervals with Explore in SPSS',
    content: [
      {
        type: 'text',
        content:
          '<p>SPSS reports a 95% confidence interval for the mean in <strong>Analyze → Descriptive Statistics → Explore</strong> (also in Descriptives via the Bootstrap option, and in every T-Test output). We use Explore on a real variable.</p>'
      },
      {
        type: 'step_sequence',
        steps: [
          {
            step: 1,
            title: 'Open the dataset',
            description:
              'Tools → download <strong>bmi_and_exercise.csv</strong> → in SPSS: <strong>File → Import Data → CSV</strong>. Accept the defaults on the first dialog; verify <strong>bmi</strong> imported as a numeric (Scale) variable in Variable View.'
          },
          {
            step: 2,
            title: 'Run Explore',
            description:
              'Menu: <strong>Analyze → Descriptive Statistics → Explore</strong>. Move <strong>bmi</strong> into the <strong>Dependent List</strong>. Under Display, choose <strong>Statistics</strong> (we want numbers, not plots, for now).'
          },
          {
            step: 3,
            title: 'Read the output',
            description:
              'The <strong>Descriptives</strong> table shows: Mean = 29.8, SE &asymp; 0.52, and a <strong>95% Confidence Interval for the Mean</strong> of roughly 28.8 to 30.8 (SPSS computes it with the t distribution — note it reports the same interval as the One-Sample T-Test output).'
          },
          {
            step: 4,
            title: 'Interpret it correctly',
            description:
              'Correct: <em>&ldquo;We are 95% confident that the interval 28.8 to 30.8 contains the population mean BMI.&rdquo;</em> The 95% refers to the PROCEDURE: across many samples, 95% of intervals computed this way capture &mu;. It is NOT a 95% probability that &mu; sits in this particular interval, and it says nothing about individual BMI values (that would be a prediction interval).'
          }
        ]
      },
      {
        type: 'text',
        content:
          '<p><strong>SE vs SD:</strong> the same output shows SD = 8.24 (spread of individuals) and SE = 0.52 (spread of sample means). Bigger n shrinks SE, not SD — SE = SD/&radic;n. This is why the CI is narrow even though BMIs vary a lot.</p>'
      }
    ]
  },
  weDo: {
    type: 'guided_practice',
    title: 'Guided: CIs from the same dataset',
    scenario: 'bmi_and_exercise.csv, n = 250.',
    steps: [
      {
        instruction: 'What happens to the CI if we compute it for a 50-row subset?',
        hint: 'Use Data → Select Cases (random sample, n = 50), rerun Explore.',
        checkpoint: 'SE grows (SD/&radic;50), so the CI widens — smaller n, less precision.'
      },
      {
        instruction: 'Where else in SPSS will you find this same CI?',
        hint: 'Run Analyze → Compare Means → One-Sample T Test on bmi.',
        checkpoint: 'The T-Test output includes the identical 95% CI for the mean.'
      }
    ],
    assessment: {
      type: 'multiple_choice',
      question: 'A 95% CI for mean BMI is 28.8 to 30.8. Which interpretation is correct?',
      options: [
        '95% of students have a BMI between 28.8 and 30.8',
        'There is a 95% probability the sample mean is in the interval',
        'The interval-computing procedure captures the true mean in 95% of samples',
        '95% of samples have mean BMI exactly 29.8'
      ],
      correctAnswer: 2,
      feedback: {
        correct: 'Correct — confidence attaches to the procedure, not to one interval or to individuals.',
        incorrect: 'The CI is about the POPULATION mean via the sampling procedure — not individuals, not the sample mean.'
      }
    }
  },
  youDo: {
    type: 'independent_practice',
    title: 'CI interpretation check',
    scenario: 'Quiz.',
    assessment: [
      {
        type: 'multiple_choice',
        question: 'SE = SD/&radic;n. If n quadruples, the SE...',
        options: ['quadruples', 'doubles', 'halves', 'is divided by 4'],
        correctAnswer: 2,
        feedback: { correct: '&radic;4 = 2, so SE halves.', incorrect: 'SE shrinks with the SQUARE ROOT of n, not n itself.' }
      },
      {
        type: 'multiple_choice',
        question: 'Which statistic describes the variability of individual BMI values?',
        options: ['SE', 'SD', '95% CI width', 'df'],
        correctAnswer: 1,
        feedback: { correct: 'SD describes individuals; SE describes sample means.', incorrect: 'SE and CI describe the mean\'s precision, not individual spread.' }
      }
    ]
  }
}

export const module6SpssLessons = [
  {
    id: 'spss-module-6-normal-ci',
    module: 'stats-module-6',
    title: 'Normal Probabilities and Confidence Intervals in SPSS',
    software: 'spss',
    objectives: [
      'Compute normal-distribution probabilities with CDF.NORMAL and percentiles with IDF.NORMAL',
      'Produce and read a 95% confidence interval with Explore',
      'Distinguish SD from SE and interpret a CI correctly'
    ],
    estimatedTime: 35,
    phases: {
      iDo: normalProbabilityPhases.iDo,
      weDo: normalProbabilityPhases.weDo,
      youDo: normalProbabilityPhases.youDo
    }
  },
  {
    id: 'spss-module-6-confidence-intervals',
    module: 'stats-module-6',
    title: 'Confidence Intervals in SPSS',
    software: 'spss',
    objectives: [
      'Compute a 95% CI for a mean with Explore',
      'Interpret what a confidence interval does and does not mean',
      'Explain how n affects interval width'
    ],
    estimatedTime: 25,
    phases: confidenceIntervalPhases
  }
]
