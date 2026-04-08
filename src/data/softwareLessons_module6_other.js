// Module 6 — Normal distribution & confidence intervals (SPSS, R, Excel, Stata)

const normalYouDo = [
  {
    id: 'q1',
    type: 'multiple_choice',
    question: 'If IQ scores have mean=100 and SD=15, what is the z-score for an IQ of 130?',
    options: [
      { id: 'a', text: 'z = 1.0' },
      { id: 'b', text: 'z = 1.5' },
      { id: 'c', text: 'z = 2.0' },
      { id: 'd', text: 'z = 2.5' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Correct! z = (130 - 100) / 15 = 2.0',
      incorrect: 'z = (X - μ) / σ = (130 - 100) / 15 = 2.0'
    }
  },
  {
    id: 'q2',
    type: 'multiple_choice',
    question: 'Approximately what percentage of values fall within ±2 SD of the mean (empirical rule)?',
    options: [
      { id: 'a', text: '68%' },
      { id: 'b', text: '95%' },
      { id: 'c', text: '99.7%' },
      { id: 'd', text: '100%' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Right!',
      incorrect: '68% ±1 SD, 95% ±2 SD, 99.7% ±3 SD.'
    }
  },
  {
    id: 'q3',
    type: 'fill_blank',
    question: 'For mean=50 and SD=10, z = (X - ____) / ____',
    answer: ['50, 10', '50) / 10'],
    caseSensitive: false,
    feedback: {
      correct: 'Correct!',
      incorrect: '(X - mean) / SD = (X - 50) / 10'
    }
  },
  {
    id: 'q4',
    type: 'multiple_choice',
    question: 'A z-score of -1.5 means:',
    options: [
      { id: 'a', text: '1.5 points below the mean' },
      { id: 'b', text: '1.5 standard deviations below the mean' },
      { id: 'c', text: '1.5 SD above the mean' },
      { id: 'd', text: 'Exactly average' }
    ],
    correct: 'b',
    feedback: { correct: 'Correct!', incorrect: 'Z is in SD units.' }
  }
]

const ciYouDo = [
  {
    id: 'q1',
    type: 'multiple_choice',
    question: '95% CI for mean IQ is [95, 105]. Correct interpretation?',
    options: [
      { id: 'a', text: '95% of people have IQ in that range' },
      { id: 'b', text: 'We are 95% confident the population mean is in that interval' },
      { id: 'c', text: '95% probability the mean is in the interval' },
      { id: 'd', text: 'The sample mean is 95 or 105' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Correct!',
      incorrect: 'CI refers to the parameter (population mean), not individual scores or P(mean).'
    }
  },
  {
    id: 'q2',
    type: 'multiple_select',
    question: 'What tends to make a CI narrower? (Select all)',
    options: [
      { id: 'a', text: 'Larger sample size' },
      { id: 'b', text: 'Smaller SD' },
      { id: 'c', text: 'Lower confidence level (e.g. 90%)' },
      { id: 'd', text: 'Higher confidence level (99%)' }
    ],
    correct: ['a', 'b', 'c'],
    feedback: {
      correct: 'Right!',
      incorrect: 'Larger n, smaller spread, or lower confidence → narrower. 99% is wider.'
    }
  },
  {
    id: 'q3',
    type: 'multiple_choice',
    question: '95% CI [82, 88]. Researcher claims μ = 90. Conclusion?',
    options: [
      { id: 'a', text: 'Data support 90' },
      { id: 'b', text: '90 is outside the CI — inconsistent with data at α=.05' },
      { id: 'c', text: 'Cannot tell' },
      { id: 'd', text: 'Need χ²' }
    ],
    correct: 'b',
    feedback: { correct: 'Right!', incorrect: 'Value outside 95% CI → reject at two-sided .05.' }
  },
  {
    id: 'q4',
    type: 'fill_blank',
    question: 'To be more confident the interval captures μ, use a ____ % level and the interval becomes ____.',
    answer: ['higher, wider', '99, wider'],
    caseSensitive: false,
    feedback: { correct: 'Yes!', incorrect: 'Higher confidence → wider interval.' }
  }
]

function normalLesson (id, software, title, weInstructions, weSteps) {
  return {
    id,
    module: 'stats-module-6',
    title,
    software,
    objectives: [
      'Calculate z-scores',
      'Interpret normal probabilities and the empirical rule',
      'Apply z to real values'
    ],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'The normal distribution',
        content: [
          {
            type: 'text',
            content:
              'Z = (X − μ) / σ. The empirical rule: ~68% within ±1σ, ~95% within ±2σ, ~99.7% within ±3σ. Use your software’s descriptives and formulas to standardize.'
          },
          {
            type: 'definition_list',
            items: [
              { term: 'Z-Score', icon: 'Z', definition: 'Standard deviations from the mean', color: '#3b82f6' },
              { term: 'Empirical rule', icon: '68', definition: '68–95–99.7 for normal-like data', color: '#10b981' }
            ]
          },
          {
            type: 'callout',
            style: 'tip',
            content: '|z| > 2 is unusual; |z| > 3 is rare.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice with z-scores',
        instructions: weInstructions,
        steps: weSteps
      },
      youDo: { type: 'assessment', title: 'Check your understanding', questions: normalYouDo }
    }
  }
}

function ciLesson (id, software, title, weSteps) {
  return {
    id,
    module: 'stats-module-6',
    title,
    software,
    objectives: ['Read CIs', 'Interpret width', 'Relate to n and variability'],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Confidence intervals',
        content: [
          {
            type: 'text',
            content:
              'A CI is a range of plausible values for a parameter. Width reflects precision (n, SD, confidence level). A 95% CI procedure captures μ in 95% of repeated samples (frequentist view).'
          },
          {
            type: 'callout',
            style: 'warning',
            content: 'Do not say “95% probability μ is in this interval” (common misinterpretation).'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Explore CI width',
        instructions: 'Use 10 scores then add 10 more; compare CI.',
        steps: weSteps
      },
      youDo: { type: 'assessment', title: 'Check your understanding', questions: ciYouDo }
    }
  }
}

export const module6LessonsOther = [
  normalLesson(
    'spss-normal-distribution',
    'spss',
    'Working with the Normal Distribution in SPSS',
    'IQ column; mean 100 SD 15 for reference z.',
    [
      {
        instruction: 'Enter IQ scores in one column (Continuous).',
        hint: 'Variable View type Numeric.',
        checkpoint: '9 values entered.'
      },
      {
        instruction: 'Descriptive Statistics → Descriptives on IQ.',
        hint: 'Analyze menu.',
        checkpoint: 'Mean and SD on output.'
      },
      {
        instruction: 'Transform → Compute: z_pop = (IQ - 100) / 15.',
        hint: 'Test value population μ, σ.',
        checkpoint: 'Z column created.'
      },
      {
        instruction: 'Count how many IQs fall between 85 and 115 (±1 SD from 100).',
        hint: 'Empirical rule expectation ~68% for large normal samples.',
        checkpoint: 'Rough check vs 68%.'
      }
    ]
  ),
  normalLesson(
    'r-normal-distribution',
    'r',
    'Working with the Normal Distribution in R',
    'Vectors and mean/sd.',
    [
      { instruction: '`iq <- c(...)` nine values.', hint: 'c()', checkpoint: 'length 9' },
      { instruction: '`mean(iq); sd(iq)`', hint: 'na.rm if needed', checkpoint: 'stats' },
      { instruction: '`z <- (iq - 100) / 15`', hint: 'vectorized', checkpoint: 'z values' },
      { instruction: 'Count between 85 and 115 with `sum(iq >= 85 & iq <= 115)`', hint: 'logical', checkpoint: 'count' }
    ]
  ),
  normalLesson(
    'excel-normal-distribution',
    'excel',
    'Working with the Normal Distribution in Excel',
    'Columns A IQ; formulas.',
    [
      { instruction: 'Type 9 IQs in A2:A10.', hint: 'Numeric', checkpoint: 'Data in' },
      { instruction: '=AVERAGE(A2:A10), =STDEV.S(A2:A10)', hint: 'Sheet', checkpoint: 'Mean SD' },
      { instruction: 'B2 =(A2-100)/15 fill down', hint: 'Population ref', checkpoint: 'Z' },
      { instruction: 'Count between 85–115 with COUNTIFS', hint: 'COUNTIFS', checkpoint: 'n in range' }
    ]
  ),
  normalLesson(
    'stata-normal-distribution',
    'stata',
    'Working with the Normal Distribution in Stata',
    'generate z.',
    [
      { instruction: '`input iq` ... `end` or use editor.', hint: '9 values', checkpoint: 'variable iq' },
      { instruction: '`summarize iq`', hint: '', checkpoint: 'mean sd' },
      { instruction: '`gen z = (iq - 100) / 15`', hint: '', checkpoint: 'z' },
      { instruction: '`count if iq >= 85 & iq <= 115`', hint: '', checkpoint: 'count' }
    ]
  ),
  ciLesson('spss-confidence-intervals', 'spss', 'Understanding Confidence Intervals in SPSS', [
    { instruction: 'Enter 10 scores; Descriptives → Options → Confidence interval for mean.', hint: 'Analyze → Descriptive Statistics', checkpoint: 'CI shown' },
    { instruction: 'Add 10 more scores; rerun.', hint: 'Larger n', checkpoint: 'CI narrower' }
  ]),
  ciLesson('r-confidence-intervals', 'r', 'Understanding Confidence Intervals in R', [
    { instruction: '`t.test(x, conf.level=0.95)$conf.int` for one sample.', hint: '10 values', checkpoint: 'interval' },
    { instruction: 'Append 10 values; rerun t.test.', hint: '', checkpoint: 'narrower' }
  ]),
  ciLesson('excel-confidence-intervals', 'excel', 'Understanding Confidence Intervals in Excel', [
    { instruction: 'Data Analysis → Descriptive Statistics → Confidence level 95%.', hint: 'ToolPak', checkpoint: 'CI col' },
    { instruction: 'Double n; refresh analysis.', hint: '', checkpoint: 'width shrinks' }
  ]),
  ciLesson('stata-confidence-intervals', 'stata', 'Understanding Confidence Intervals in Stata', [
    { instruction: '`ci means score` or `mean score` with CI options (version-dependent).', hint: '10 obs', checkpoint: 'CI' },
    { instruction: 'Add observations; rerun.', hint: '', checkpoint: 'narrower CI' }
  ])
]
