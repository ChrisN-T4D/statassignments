// Module 6: Probability and Sampling - Unified Jamovi lesson
// Learn (I do) → Practice + Self-Check (We do) → Apply (You do)

export const module6UnifiedLessons = [
  {
    id: 'jamovi-module-6-unified',
    module: 'stats-module-6',
    title: 'Normal Distribution and Confidence Intervals in Jamovi',
    software: 'jamovi',
    objectives: [
      'Compute z-scores with Data → Compute',
      'Interpret z-scores using the empirical rule',
      'Request a confidence interval for the mean in Descriptives',
      'Explain how sample size affects CI width'
    ],
    estimatedTime: 50,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Z-Scores and Confidence Intervals',
        sections: [
          {
            id: 'z-scores-in-jamovi',
            title: 'Computing Z-Scores in Jamovi',
            objectives: [
              'Create a z-score column with Data → Compute',
              'Match variable-name casing in formulas',
              'Interpret positive and negative z-scores'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content:
                  'A <strong>z-score</strong> tells you how many standard deviations a value is from a reference mean: <em>z = (X − μ) / σ</em>. <strong>Dataset:</strong> Tools → download <strong>bmi_and_exercise.csv</strong> → ☰ → Open. Use continuous column <strong>bmi</strong>. Build z-scores with <strong>Data → Compute</strong>. Use this teaching formula against a fixed reference: <strong>(bmi − 25) / 5</strong>. Match lowercase <strong>bmi</strong>.'
              },
              {
                type: 'callout',
                style: 'tip',
                content: 'Class CSVs live in the Methods Market <strong>Tools</strong> panel (right side). Use the same files across modules - do not invent a one-off spreadsheet for this course.'
              },
              {
                type: 'definition_list',
                items: [
                  {
                    term: 'Z-score',
                    icon: 'Z',
                    definition: 'Number of SDs from the mean: z = (X − μ) / σ. Positive = above the mean; negative = below.',
                    color: '#3b82f6'
                  },
                  {
                    term: 'Empirical rule',
                    icon: '68',
                    definition: 'For a normal distribution: ~68% within ±1 SD, ~95% within ±2 SD, ~99.7% within ±3 SD.',
                    color: '#10b981'
                  }
                ]
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open the Tools dataset',
                    description:
                      'From Methods Market <strong>Tools</strong>, download <strong>bmi_and_exercise.csv</strong> and open it in jamovi (☰ → Open). Confirm <strong>bmi</strong> is Continuous.'
                  },
                  {
                    step: 2,
                    title: 'Open Compute',
                    description:
                      'Go to the <strong>Data</strong> tab and click <strong>Compute</strong> (calculator icon).',
                    image: '/images/lessons/jamovi/jamovi-compute-button.png'
                  },
                  {
                    step: 3,
                    title: 'Name the z-score variable',
                    description:
                      'Name the new variable (e.g. <strong>z_bmi</strong>). Check the <strong>exact casing</strong> of your column - the Tools file uses lowercase <strong>bmi</strong>.',
                    image: '/images/lessons/jamovi/jamovi-compute-name.png'
                  },
                  {
                    step: 4,
                    title: 'Enter the z formula',
                    description:
                      'In the formula box type: <strong>(bmi − 25) / 5</strong>. This standardizes each BMI against a fixed reference. Click away or press Enter so the new column fills. <strong>Population vs sample:</strong> Here we use a fixed reference (e.g. 25 and 5) for teaching. You can also compute z with the <em>sample</em> mean and SD from Descriptives - same idea, different numbers.',
                    image: '/images/lessons/jamovi/jamovi-compute-formula.png'
                  },
                  {
                    step: 5,
                    title: 'Interpret the z column',
                    description:
                      'A z of <strong>2</strong> means 2 SDs above the reference mean. A negative z means below the reference. Values with |z| &gt; 2 are unusual under the empirical rule for a normal distribution.'
                  }
                ]
              }
            ]
          },
          {
            id: 'confidence-intervals-in-jamovi',
            title: 'Confidence Intervals in Jamovi',
            objectives: [
              'Turn on the CI for the mean in Descriptives',
              'Read the lower and upper bounds',
              'See that larger n usually narrows the CI'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content:
                  'A <strong>confidence interval (CI)</strong> for the mean is a range of plausible values for the population mean. <strong>Dataset:</strong> keep <strong>bmi_and_exercise.csv</strong> open from Tools. In Jamovi you request the CI inside <strong>Descriptives</strong> under Statistics, not as a separate menu.'
              },
              {
                type: 'definition_list',
                items: [
                  {
                    term: '95% CI',
                    icon: 'CI',
                    definition:
                      'The procedure that produces intervals that capture the true mean about 95% of the time across many repeated samples, not “95% probability this one interval contains the mean.”',
                    color: '#3b82f6'
                  },
                  {
                    term: 'Width',
                    icon: '↔',
                    definition: 'Narrower CI = more precision. Larger samples and less variability usually produce narrower intervals.',
                    color: '#f59e0b'
                  }
                ]
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open Descriptives',
                    description:
                      'Click <strong>Analyses → Exploration → Descriptives</strong>. Drag <strong>bmi</strong> into the Variables box.',
                    image: '/images/lessons/jamovi/jamovi-descriptives-menu.png'
                  },
                  {
                    step: 2,
                    title: 'Request the confidence interval',
                    description:
                      'Open the <strong>Statistics</strong> section in the options panel. Check <strong>Confidence interval for Mean</strong> (leave the level at 95%).',
                    image: '/images/lessons/jamovi/jamovi-descriptives-ci-statistics.png'
                  },
                  {
                    step: 3,
                    title: 'Read the output',
                    description:
                      'In the Results panel, find the <strong>95% CI mean lower bound</strong> and <strong>upper bound</strong> next to the mean for <strong>bmi</strong>.',
                    image: '/images/lessons/jamovi/jamovi-descriptives-ci-results.png'
                  },
                  {
                    step: 4,
                    title: 'Compare precision',
                    description:
                      'Note the CI width. Larger samples (or less variability) usually produce a <strong>narrower</strong> CI - more precision, all else equal. You can also run Descriptives on <strong>exercise_per_week</strong> from the same Tools file and compare widths.'
                  }
                ]
              },
              {
                type: 'callout',
                style: 'warning',
                content:
                  '<strong>Common mistake:</strong> A 95% CI does <em>not</em> mean “there is a 95% chance the true mean is in this interval.” It means the method works about 95% of the time across repeated sampling.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice: Z-Scores and CIs with BMI data',
        instructions:
          'Follow along in Jamovi. Dataset: Tools → <strong>bmi_and_exercise.csv</strong> → ☰ → Open. Complete each checkpoint before moving on.',
        steps: [
          {
            instruction:
              'Open bmi_and_exercise.csv from Tools. Confirm bmi is Continuous.',
            hint: 'Tools is on the right in Software Practice.',
            checkpoint: 'bmi column is visible with many numeric rows.'
          },
          {
            instruction:
              'Run Analyses → Exploration → Descriptives on bmi. Note the sample mean and SD.',
            hint: 'Exploration is under Analyses; drag bmi into Variables.',
            checkpoint: 'Results show N, Mean, and SD for bmi.'
          },
          {
            instruction:
              'Data → Compute. Name the variable z_bmi. Formula: (bmi − 25) / 5 (exact casing). Confirm the column fills.',
            hint: 'If the formula fails, check spelling and case of bmi.',
            checkpoint: 'z_bmi has positive and negative values.'
          },
          {
            instruction:
              'In Descriptives, open Statistics and check Confidence interval for bmi. Write down the lower and upper bounds.',
            hint: 'Still under Exploration → Descriptives.',
            checkpoint: 'You can read a 95% CI for mean bmi.'
          },
          {
            instruction:
              'Also run Descriptives + CI on exercise_per_week from the same file. Compare which CI looks wider and why (variability / scale).',
            hint: 'Wider intervals often go with more spread or different units - discuss precision, not just sample size.',
            checkpoint: 'You compared two CIs from the same Tools dataset.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [
          {
            id: 'm6-compute-location',
            question: 'Where do you create a z-score column in Jamovi?',
            image: '/images/lessons/jamovi/jamovi-compute-button.png',
            options: [
              'Analyses → T-Tests',
              'Data tab → Compute',
              'Analyses → Frequencies',
              'Edit → Preferences'
            ],
            correct: 1,
            explanation: 'Z-scores are built with Data → Compute using a formula like (X − mean) / SD.'
          },
          {
            id: 'm6-ci-location',
            question: 'Where do you turn on a confidence interval for the mean?',
            image: '/images/lessons/jamovi/jamovi-descriptives-ci-full.png',
            options: [
              'Analyses → Regression only',
              'Descriptives → Statistics → Confidence interval',
              'Data → Filters',
              'Variable View → Levels'
            ],
            correct: 1,
            explanation: 'In Descriptives, expand Statistics and check Confidence interval for the mean.'
          }
        ],
        errorDiagnostic: [
          {
            id: 'm6-casing-error',
            scenario:
              'You typed (BMI − 25) / 5 in Compute, but the spreadsheet column is named bmi (lowercase). The new column is empty or shows an error.',
            errorMessage: 'Unknown variable / empty column',
            options: [
              'Jamovi is case-sensitive - match the exact column name (bmi vs BMI)',
              'You must use SPSS syntax in Jamovi',
              'Z-scores only work for N > 30',
              'You need Analyses → ANOVA first'
            ],
            correct: 0,
            explanation: 'Formulas must use the exact variable name from Tools (usually lowercase bmi), including capitalization.'
          },
          {
            id: 'm6-ci-missing',
            scenario:
              'You ran Descriptives and see Mean and SD, but no confidence interval appears.',
            errorMessage: 'No CI in output',
            options: [
              'Open Statistics in Descriptives and check Confidence interval',
              'Confidence intervals require a paid jamovi module',
              'You must compute z-scores first',
              'CIs only appear for categorical variables'
            ],
            correct: 0,
            explanation: 'The CI is optional - enable it under Statistics in the Descriptives panel.'
          }
        ],
        outputInterpretation: [
          {
            id: 'm6-interpret-z-ci',
            question:
              'Look at this jamovi <strong>Normal Distribution</strong> calculator output (Mean = 100, SD = 15). (1) What probability is being computed (in words: between which scores)? (2) What is that probability from the Results table? (3) In one sentence, what does the shaded region on the plot represent?',
            image: '/images/lessons/jamovi/jamovi-normal-probability-results.png',
            placeholder:
              'e.g. Probability between 85 and 120; 0.750; the shaded area is that probability under the normal curve...',
            hint: 'Read x1, x2, and the Probability row. Tie the shaded “P (Area)” to that result.',
            requiredKeywords: [
              '85', '120', 'between', 'from', 'to',
              '0.750', '0.75', '.750', '.75', '75%', 'probability',
              'shaded', 'area', 'curve', 'under', 'plot', 'region', 'normal'
            ],
            minRequiredKeywords: 4,
            feedback:
              'The calculator is finding P(85 ≤ X ≤ 120) for a Normal(100, 15) distribution. The Results table shows probability 0.750. The shaded region under the curve is that probability (area between 85 and 120).'
          }
        ]
      },
      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        summary:
          'Record yourself completing the Module 6 Software Practice tasks in jamovi. Use a <strong>different</strong> Tools file than Learn/Practice: open <strong>personality_data.csv</strong> (not bmi_and_exercise.csv). Run z-scores and a confidence interval for the mean on a continuous scale such as <strong>extraversion</strong> or <strong>age</strong>, then complete the Module 6 Apply exercises below.',
        instructions:
          'Start recording (Tools or your phone). Open <strong>personality_data.csv</strong> from Tools, complete each exercise below in jamovi, then stop, download the video, and upload it to Canvas as Module 6: Software Practice. Mark each exercise complete when finished.'
        // Exercises come from statisticsPractices.js (module-6, software jamovi)
      }
    }
  }
]
