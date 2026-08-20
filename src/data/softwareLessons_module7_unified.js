// Module 7: Hypothesis Testing - Unified Lesson Structure
// One jamovi lesson with multiple Learn sections (same model as Module 3)

export const module7UnifiedLessons = [
  {
    id: 'jamovi-module-7-unified',
    module: 'stats-module-7',
    title: 'Hypothesis Testing in Jamovi',
    software: 'jamovi',
    objectives: [
      'Run and interpret a binomial / Proportion Test (2 Outcomes) in jamovi',
      'Run and interpret a one-sample t-test in jamovi',
      'Interpret p-values correctly and make reject / fail-to-reject decisions'
    ],
    estimatedTime: 65,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Binomial Test, One-Sample t-Test, and P-Values',
        sections: [
          {
            id: 'binomial-test',
            title: 'Binomial Test (2 Outcomes) in Jamovi',
            objectives: [
              'Conduct a binomial / proportion test for a two-level variable',
              'Set Test value and read Proportion and p',
              'Decide reject or fail to reject H₀ at α = .05'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'callout',
                style: 'tip',
                content:
                  '<strong>Dataset:</strong> Tools → download <strong>personality_data.csv</strong> → jamovi <strong>☰ → Open</strong>. Analyze <strong>gender</strong> (Nominal, two levels).'
              },
              {
                type: 'text',
                content:
                  'The binomial test asks whether the proportion of one outcome differs from a hypothesized value (often 0.5). Chapter 9’s ESP story (62/100 correct vs 50%) is the same <em>idea</em>, but in jamovi you run the test on a data file - here, <strong>personality_data.csv</strong> from Tools, using <strong>gender</strong> with H₀: the population proportion of a chosen gender level = 0.5.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open personality_data.csv and find the variables',
                    description:
                      'Tools → download <strong>personality_data.csv</strong> → jamovi <strong>☰ → Open</strong>. In the variable list you should see <strong>id</strong>, <strong>gender</strong>, <strong>age</strong>, <strong>ethnicity</strong>, and the Big Five scales (<strong>extraversion</strong>, <strong>agreeableness</strong>, and so on).',
                    image: '/lessons/hypothesis-testing/jamovi/personality-variables.png'
                  },
                  {
                    step: 2,
                    title: 'Set gender to Nominal',
                    description:
                      'Open variable setup for <strong>gender</strong> (click the column header / Setup). Set <strong>Measure type</strong> to <strong>Nominal</strong> and <strong>Data type</strong> to <strong>Text</strong>. Levels should show <strong>Female</strong> and <strong>Male</strong>.',
                    image: '/lessons/hypothesis-testing/jamovi/gender-nominal-setup.png'
                  },
                  {
                    step: 3,
                    title: 'Open Frequencies → 2 Outcomes',
                    description:
                      'Go to <strong>Analyses → Frequencies</strong>. Under One Sample Proportion Tests, choose <strong>2 Outcomes (Binomial test)</strong>. The analysis panel is titled <strong>Proportion Test (2 Outcomes)</strong>.',
                    image: '/lessons/hypothesis-testing/jamovi/frequencies-2outcomes-menu.png'
                  },
                  {
                    step: 4,
                    title: 'Move gender and set Test value',
                    description:
                      'Move <strong>gender</strong> into the Variable box. Leave <strong>Values are counts</strong> unchecked. Set <strong>Test value</strong> to <strong>0.5</strong>. Keep <strong>≠ Test value</strong> (two-sided). Optional: check <strong>Confidence intervals</strong> (95%).',
                    image: '/lessons/hypothesis-testing/jamovi/binomial-setup.png'
                  },
                  {
                    step: 5,
                    title: 'Read the Results',
                    description:
                      'The <strong>Binomial Test</strong> table shows Level, Count, Total, Proportion, and <strong>p</strong>. If <strong>p &lt; .05</strong>, reject H₀; if <strong>p ≥ .05</strong>, fail to reject H₀.'
                  }
                ]
              },
              {
                type: 'text',
                content:
                  '<h4>Hypotheses for this section</h4><ul><li><strong>H₀:</strong> θ = 0.5</li><li><strong>H₁:</strong> θ ≠ 0.5</li><li><strong>Menu:</strong> Analyses → Frequencies → <strong>2 Outcomes</strong> (panel: Proportion Test)</li><li><strong>Variable:</strong> <strong>gender</strong> from <strong>personality_data.csv</strong></li></ul>'
              }
            ]
          },
          {
            id: 'one-sample-t-test',
            title: 'One-Sample t-Test in Jamovi',
            objectives: [
              'Run a one-sample t-test on a continuous variable',
              'Set a Test value and read t, df, and p',
              'Request effect size (Cohen\'s d) when useful'
            ],
            estimatedTime: 25,
            content: [
              {
                type: 'callout',
                style: 'tip',
                content:
                  '<strong>Dataset:</strong> Tools → download <strong>bmi_and_exercise.csv</strong> → ☰ → Open. Use continuous column <strong>bmi</strong>. For this lesson, H₀: μ = 25.'
              },
              {
                type: 'text',
                content:
                  'The one-sample t-test asks whether a sample mean differs from a hypothesized value. Use it when you have <strong>one group</strong> of continuous data and a <strong>known comparison value</strong>.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open bmi_and_exercise.csv',
                    description:
                      'Tools → download <strong>bmi_and_exercise.csv</strong> → jamovi <strong>☰ → Open</strong>. Confirm <strong>bmi</strong> is Continuous.'
                  },
                  {
                    step: 2,
                    title: 'Open One Sample T-Test',
                    description:
                      'Go to <strong>Analyses → T-Tests</strong> and choose <strong>One Sample T-Test</strong>.',
                    image: '/lessons/hypothesis-testing/jamovi/t-tests-one-sample-menu.png'
                  },
                  {
                    step: 3,
                    title: 'Move bmi and set Test value to 25',
                    description:
                      'Move <strong>bmi</strong> to <strong>Dependent Variables</strong>. Under Hypothesis, set <strong>Test value</strong> to <strong>25</strong> and keep <strong>≠ Test value</strong> (two-sided). Leave Student\'s test checked.',
                    image: '/lessons/hypothesis-testing/jamovi/t-test-setup.png'
                  },
                  {
                    step: 4,
                    title: 'Optional: effect size and assumptions',
                    description:
                      'Under Additional Statistics, you can check <strong>Effect size</strong> (Cohen\'s d). Under Assumption Checks, you can request a normality test or Q-Q plot.'
                  },
                  {
                    step: 5,
                    title: 'Read the output',
                    description:
                      'Report <strong>t</strong>, <strong>df</strong>, <strong>p</strong>, and the sample mean. If <strong>p &lt; .05</strong>, reject H₀; if <strong>p ≥ .05</strong>, fail to reject H₀. Cohen\'s d describes size of the difference, not just significance.'
                  }
                ]
              }
            ]
          },
          {
            id: 'interpreting-pvalues',
            title: 'Interpreting P-Values and Making Decisions',
            objectives: [
              'State what a p-value means (and what it does not)',
              'Compare p to α and choose reject or fail to reject',
              'Avoid common p-value misconceptions'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'callout',
                style: 'tip',
                content:
                  'When you practice in jamovi, use Tools files (<strong>personality_data.csv</strong>, <strong>bmi_and_exercise.csv</strong>) so p-values come from real analyses, not made-up numbers.'
              },
              {
                type: 'text',
                content:
                  '<h3>What is a P-Value?</h3><p><strong>Correct:</strong> the probability of observing data as extreme as (or more extreme than) what you got, <em>assuming the null hypothesis is true</em>. In plain English: if there were truly no effect, how surprising would these data be?</p>'
              },
              {
                type: 'text',
                content:
                  '<h4>Never say these</h4><ul><li>"The probability that the null is true"</li><li>"The probability that the results are due to chance"</li><li>"How important or large the effect is" (that is effect size)</li><li>"The probability of making a mistake" (that is α / Type I error rate)</li></ul>'
              },
              {
                type: 'text',
                content:
                  '<h4>Making decisions</h4><ul><li><strong>If p ≤ α</strong> (usually .05): Reject H₀ (statistically significant)</li><li><strong>If p > α:</strong> Fail to reject H₀ (not statistically significant)</li></ul><p>Fail to reject does <em>not</em> prove H₀ is true. The difference between p = 0.051 and p = 0.049 is not a meaningful cliff.</p>'
              },
              {
                type: 'table',
                headers: ['P-Value', 'At α = 0.05', 'Interpretation', 'Decision'],
                rows: [
                  ['p = 0.001', 'Significant', 'Very strong evidence against H₀', 'Reject H₀'],
                  ['p = 0.023', 'Significant', 'Good evidence against H₀', 'Reject H₀'],
                  ['p = 0.051', 'Not significant', 'Insufficient evidence against H₀', 'Fail to reject H₀'],
                  ['p = 0.324', 'Not significant', 'Little evidence against H₀', 'Fail to reject H₀']
                ]
              },
              {
                type: 'text',
                content:
                  '<h4>P-values and confidence intervals</h4><ul><li>If a 95% CI <strong>excludes</strong> the null value → typically p &lt; .05</li><li>If a 95% CI <strong>includes</strong> the null value → typically p &gt; .05</li></ul>'
              }
            ]
          }
        ]
      },

      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: Hypothesis Testing in Jamovi',
        instructions:
          'Follow along in jamovi. Use Tools datasets: <strong>personality_data.csv</strong> (gender) and <strong>bmi_and_exercise.csv</strong> (bmi). Complete each checkpoint.',
        steps: [
          {
            instruction:
              'Tools → personality_data.csv → ☰ Open. Confirm gender is Nominal with two levels.',
            hint: 'Click the gender column header to check measure type.',
            checkpoint: 'gender is Nominal; Female/Male (or similar) appear in the grid.'
          },
          {
            instruction:
              'Analyses → Frequencies → 2 Outcomes. Move gender into the Variable box. Test value 0.5; keep ≠ Test value.',
            hint: 'Panel title is Proportion Test (2 Outcomes). Leave Values are counts unchecked.',
            checkpoint: 'Binomial Test table shows Count, Proportion, and p for each level.'
          },
          {
            instruction:
              'Read p for one gender level. At α = .05, state reject or fail to reject H₀: θ = 0.5.',
            hint: 'Compare p to .05. Fail to reject is not proof of exactly 50/50.',
            checkpoint: 'You can state a decision and what p means under H₀.'
          },
          {
            instruction:
              'Tools → bmi_and_exercise.csv → ☰ Open. Confirm bmi is Continuous.',
            hint: 'Switch files with ☰ → Open after downloading from Tools.',
            checkpoint: 'bmi column is Continuous with many numeric rows.'
          },
          {
            instruction:
              'Analyses → T-Tests → One Sample T-Test. Dependent = bmi; Test value = 25.',
            hint: 'Optional: check Effect size for Cohen\'s d.',
            checkpoint: 'Results show t, df, p, and mean for bmi.'
          },
          {
            instruction:
              'At α = .05, decide reject or fail to reject H₀: μ = 25. Say what p means under H₀ (not "probability H₀ is true").',
            hint: 'If p = 0.069, fail to reject - that does not prove mean BMI equals 25.',
            checkpoint: 'You correctly interpret p and the decision rule.'
          }
        ]
      },

      selfCheck: {
        screenshotRecognition: [
          {
            id: 'm7-binomial-panel',
            question:
              'This jamovi panel is open. What analysis is this, and which menu path opens it?',
            image: '/images/lessons/jamovi/binomial-setup.png',
            correct: 1,
            explanation:
              'The panel title is Proportion Test (2 Outcomes). Open it with Analyses → Frequencies → 2 Outcomes.'
          },
          {
            id: 'm7-ttest-menu',
            question:
              'You want to test whether mean BMI differs from 25. Which jamovi path is correct?',
            options: [
              'Analyses → Frequencies → 2 Outcomes',
              'Analyses → T-Tests → One Sample T-Test',
              'Data → Filters',
              'Analyses → ANOVA → One-Way ANOVA'
            ],
            correct: 1,
            explanation:
              'One continuous outcome vs a hypothesized mean: Analyses → T-Tests → One Sample T-Test. Use bmi from bmi_and_exercise.csv.'
          }
        ],
        errorDiagnostic: [
          {
            id: 'm7-binomial-empty-table',
            scenario:
              'You opened Frequencies → 2 Outcomes. Results show a Binomial Test table with headers but no numbers.',
            errorMessage: 'Empty Binomial Test table',
            options: [
              'You have not moved a two-level variable (e.g. gender) into the Variable box yet',
              'You must check Values are counts for every CSV',
              'The test only works if Test value is 0',
              'You need a paid jamovi module'
            ],
            correct: 0,
            explanation:
              'The table stays empty until you move a Nominal two-level variable such as gender into the Variable box.'
          },
          {
            id: 'm7-pvalue-misread',
            scenario:
              'A classmate says: "p = 0.03 means there is a 3% chance the null hypothesis is true."',
            errorMessage: 'Wrong interpretation of p',
            options: [
              'Incorrect: p is how surprising the data would be if H₀ were true, not the probability that H₀ is true',
              'Correct: that is Fisher\'s definition',
              'Correct only when α = .05',
              'Correct for one-sided tests only'
            ],
            correct: 0,
            explanation:
              'A p-value is not P(H₀ is true). It is the probability of data as extreme as (or more extreme than) observed, assuming H₀ is true.'
          }
        ],
        outputInterpretation: [
          {
            id: 'm7-interpret-binomial',
            question:
              'Look at this <strong>Proportion Test (2 Outcomes)</strong> setup: <strong>gender</strong> is in the Variable box and Test value is <strong>0.5</strong>. Suppose the Binomial Test results show a sample proportion near 0.52 and <strong>p = 0.48</strong>. At α = .05: (1) State H₀ in plain language. (2) Do you reject or fail to reject H₀? Does that decision prove the population is exactly 50/50? Why or why not?',
            image: '/images/lessons/jamovi/binomial-setup.png',
            placeholder:
              'e.g. H₀ says the population proportion for a gender level is 0.5. With p = 0.48 I fail to reject; that is not proof the population is exactly 50/50...',
            hint: 'Compare p to .05. Fail to reject ≠ prove H₀ is true.',
            requiredKeywords: [
              '0.5', 'proportion', 'h0', 'h₀', 'null', 'population',
              'fail', 'reject', '0.48', '.48', 'p = 0.48', 'p=0.48',
              'prove', 'not prove', 'does not prove', 'evidence', 'insufficient', 'not true'
            ],
            minRequiredKeywords: 4,
            feedback:
              'H₀: the population proportion for a gender level equals 0.5. With p = 0.48 (greater than .05), fail to reject H₀. That means insufficient evidence against H₀ - it does not prove the population is exactly 50/50.'
          },
          {
            id: 'm7-interpret-ttest',
            question:
              'Look at this <strong>One Sample T-Test</strong> setup for <strong>bmi</strong> with Test value <strong>25</strong>. Suppose Results show <strong>t = 2.10</strong>, <strong>df = 249</strong>, mean ≈ 29.8, and <strong>p = 0.037</strong>. At α = .05: (1) Do you reject or fail to reject H₀: μ = 25? (2) Name two numbers from this output (besides p) you would report in a write-up.',
            image: '/images/lessons/jamovi/t-test-setup.png',
            placeholder:
              'e.g. Reject H₀ because p = 0.037 < .05. I would report t = 2.10 and df = 249 (or the mean)...',
            hint: 'Decision uses p vs .05. Typical write-ups include t and df (and often the mean or Cohen\'s d).',
            requiredKeywords: [
              'reject', '0.037', '.037', 'p = 0.037', 'p=0.037',
              't', '2.10', '2.1', 'df', '249', 'mean', '29.8', 'cohen', 'd', '25'
            ],
            minRequiredKeywords: 4,
            feedback:
              'Reject H₀ (p = 0.037 < .05): there is evidence the mean BMI differs from 25. Report t (e.g. 2.10) and df (249); the sample mean (and Cohen\'s d, if requested) are also useful.'
          }
        ]
      },

      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        summary:
          'Record yourself completing Module 7 Software Practice in jamovi: binomial (2 Outcomes) on gender from personality_data.csv, one-sample t-test on bmi from bmi_and_exercise.csv, and clear p-value decisions. Talk through menus and output, then upload to Canvas.',
        instructions:
          'Start recording (Tools or your phone). Open class CSVs from the Tools bar, complete each exercise below in jamovi, then stop, download the video, and upload it to Canvas as Module 7: Software Practice. Mark each exercise complete when finished.'
      }
    }
  }
]
