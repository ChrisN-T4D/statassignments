// Module 7: Hypothesis Testing in IBM SPSS (unified lesson, same model as the jamovi Module 7 lesson).
// Numbers come from the Tools files: personality_data.csv (gender, age) and bmi_and_exercise.csv (bmi).

export const module7SpssLessons = [
  {
    id: 'spss-module-7-unified',
    module: 'stats-module-7',
    title: 'Hypothesis Testing in SPSS',
    software: 'spss',
    objectives: [
      'Run and interpret a binomial test in SPSS',
      'Run and interpret a one-sample t-test in SPSS',
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
            title: 'Binomial Test in SPSS',
            objectives: [
              'Prepare a two-level variable for the binomial test',
              'Set the test proportion and read the exact p',
              'Decide reject or fail to reject H₀ at α = .05'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'callout',
                style: 'tip',
                content:
                  '<strong>Dataset:</strong> Tools &rarr; download <strong>personality_data.csv</strong> &rarr; <strong>File &rarr; Open &rarr; Data&hellip;</strong> (Files of type: Text; Delimited, names at top, Comma). We test the variable <strong>gender</strong>: H₀: the population proportion of women is 0.5; H₁: it is not 0.5.'
              },
              {
                type: 'text',
                content:
                  'The binomial test asks whether the proportion of one outcome differs from a hypothesized value (often 0.5). SPSS needs the two-level variable to be <strong>numeric</strong>, so a text variable such as gender is recoded first.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Check the variable',
                    description:
                      'Run <strong>Analyze &rarr; Descriptive Statistics &rarr; Frequencies&hellip;</strong> on <strong>gender</strong>. You should see two categories, Female (430) and Male (304), with 734 valid cases. Set its Measure to <strong>Nominal</strong> in Variable View.'
                  },
                  {
                    step: 2,
                    title: 'Recode to numbers',
                    description:
                      'Choose <strong>Transform &rarr; Automatic Recode&hellip;</strong>, move <strong>gender</strong> in, type <strong>gender_n</strong> as the new name, click <strong>Add New Name</strong>, and click <strong>OK</strong>. SPSS codes Female = 1 and Male = 2 and attaches value labels.'
                  },
                  {
                    step: 3,
                    title: 'Open the Binomial test',
                    description:
                      'Choose <strong>Analyze &rarr; Nonparametric Tests &rarr; Legacy Dialogs &rarr; Binomial&hellip;</strong>.'
                  },
                  {
                    step: 4,
                    title: 'Set up the test',
                    description:
                      'Move <strong>gender_n</strong> into <strong>Test Variable List</strong>. Under <strong>Define Dichotomy</strong> keep <strong>Get from data</strong>. Set <strong>Test Proportion</strong> to <strong>.50</strong> and click <strong>OK</strong>.'
                  },
                  {
                    step: 5,
                    title: 'Read the Binomial Test table',
                    description:
                      'The table lists Group 1 and Group 2 with their N and <strong>Observed Prop.</strong> (Female .59, Male .41), the <strong>Test Prop.</strong> (.50), and <strong>Exact Sig.</strong> (2-tailed). Here it prints <strong>.000</strong>, which you report as <strong>p &lt; .001</strong>. Since p &lt; .05, reject H₀.'
                  }
                ]
              },
              {
                type: 'callout',
                style: 'warning',
                content:
                  '<strong>Group 1 is whichever value SPSS meets first in the data</strong> when you use <em>Get from data</em>, so the proportion listed first may be either category. Read the Category column, not just the row order. Also, when the Test Proportion is not .50, SPSS reports a <strong>1-tailed</strong> p-value; with .50 it reports 2-tailed.'
              }
            ]
          },
          {
            id: 'one-sample-t-test',
            title: 'One-Sample t-Test in SPSS',
            objectives: [
              'Run a one-sample t-test on a continuous variable',
              'Set a Test Value and read t, df, and Sig. (2-tailed)',
              'Get Cohen\'s d and a confidence interval'
            ],
            estimatedTime: 25,
            content: [
              {
                type: 'callout',
                style: 'tip',
                content:
                  '<strong>Dataset:</strong> Tools &rarr; download <strong>bmi_and_exercise.csv</strong> &rarr; open as before. Use the Scale variable <strong>bmi</strong>. H₀: μ = 25; H₁: μ ≠ 25.'
              },
              {
                type: 'text',
                content:
                  'The one-sample t-test asks whether a sample mean differs from a hypothesized value. Use it with <strong>one group</strong> of continuous data and a <strong>known comparison value</strong>.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open the test',
                    description:
                      'Choose <strong>Analyze &rarr; Compare Means &rarr; One-Sample T Test&hellip;</strong> (in newer versions the menu may read <em>Compare Means and Proportions</em>).'
                  },
                  {
                    step: 2,
                    title: 'Move bmi and set the Test Value',
                    description:
                      'Move <strong>bmi</strong> into <strong>Test Variable(s)</strong> and type <strong>25</strong> in <strong>Test Value</strong>.'
                  },
                  {
                    step: 3,
                    title: 'Options',
                    description:
                      'Click <strong>Options&hellip;</strong> to set the confidence level (95% by default). In SPSS 27 and later, also tick <strong>Estimate effect sizes</strong> in the main dialog to get Cohen\'s d. Click <strong>OK</strong>.'
                  },
                  {
                    step: 4,
                    title: 'Read One-Sample Statistics',
                    description:
                      'The first table gives N = 250, Mean = 29.81, Std. Deviation = 8.24, and Std. Error Mean = 0.52.'
                  },
                  {
                    step: 5,
                    title: 'Read One-Sample Test',
                    description:
                      'The second table gives <strong>t = 9.23</strong>, <strong>df = 249</strong>, <strong>Sig. (2-tailed) = .000</strong> (report <strong>p &lt; .001</strong>), the <strong>Mean Difference</strong> (4.81), and the 95% confidence interval of that difference. If Sig. is below .05, reject H₀. Without the effect-size table, compute <strong>d = Mean Difference / SD = 4.81 / 8.24 &asymp; 0.58</strong>.'
                  },
                  {
                    step: 6,
                    title: 'Write it up: APA-style results statement',
                    description:
                      'Participants\' mean BMI (M = 29.8, SD = 8.24) was significantly higher than the reference value of 25, t(249) = 9.23, p &lt; .001, d = 0.58. Note that SPSS\'s confidence interval is for the <em>difference</em> from the test value, not for the mean itself.'
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
              'Report SPSS\'s .000 correctly'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content:
                  '<h3>What is a P-Value?</h3><p><strong>Correct:</strong> the probability of observing data as extreme as (or more extreme than) what you got, <em>assuming the null hypothesis is true</em>. In plain English: if there were truly no effect, how surprising would these data be?</p>'
              },
              {
                type: 'text',
                content:
                  '<h4>Never say these</h4><ul><li>"The probability that the null is true"</li><li>"The probability that the results are due to chance"</li><li>"How important or large the effect is" (that is effect size)</li><li>"The probability of making a mistake" (that is &alpha;, the Type I error rate)</li></ul>'
              },
              {
                type: 'text',
                content:
                  '<h4>Making decisions</h4><ul><li><strong>If p &le; &alpha;</strong> (usually .05): reject H₀ (statistically significant)</li><li><strong>If p &gt; &alpha;:</strong> fail to reject H₀ (not statistically significant)</li></ul><p>Fail to reject does <em>not</em> prove H₀ is true. The difference between p = .051 and p = .049 is not a meaningful cliff.</p>'
              },
              {
                type: 'table',
                headers: ['P-Value', 'At α = .05', 'Interpretation', 'Decision'],
                rows: [
                  ['p = .001', 'Significant', 'Very strong evidence against H₀', 'Reject H₀'],
                  ['p = .023', 'Significant', 'Good evidence against H₀', 'Reject H₀'],
                  ['p = .051', 'Not significant', 'Insufficient evidence against H₀', 'Fail to reject H₀'],
                  ['p = .324', 'Not significant', 'Little evidence against H₀', 'Fail to reject H₀']
                ]
              },
              {
                type: 'callout',
                style: 'warning',
                content:
                  '<strong>Sig. = .000 does not mean p is zero.</strong> SPSS shows three decimals. Write <strong>p &lt; .001</strong>. In the Sig. column, double-click the table cell to see more digits if you need them.'
              },
              {
                type: 'text',
                content:
                  '<h4>P-values and confidence intervals</h4><ul><li>If the 95% CI of the difference <strong>excludes 0</strong> (the null value of the difference) &rarr; p &lt; .05</li><li>If it <strong>includes 0</strong> &rarr; p &gt; .05</li></ul>'
              }
            ]
          }
        ]
      },

      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: Hypothesis Testing in SPSS',
        instructions:
          'Follow along in SPSS. Use Tools datasets: personality_data.csv (gender) and bmi_and_exercise.csv (bmi). Complete each checkpoint.',
        steps: [
          {
            instruction: 'Open personality_data.csv (File > Open > Data, Files of type: Text). Run Frequencies on gender.',
            hint: 'Analyze > Descriptive Statistics > Frequencies. Gender is text, so it appears left-aligned in Data View.',
            checkpoint: 'You see Female 430 and Male 304 (734 valid cases).'
          },
          {
            instruction: 'Transform > Automatic Recode: gender into the new variable gender_n.',
            hint: 'Click Add New Name before OK.',
            checkpoint: 'gender_n has value labels Female (1) and Male (2).'
          },
          {
            instruction: 'Analyze > Nonparametric Tests > Legacy Dialogs > Binomial. Test Variable List = gender_n, Test Proportion = .50.',
            hint: 'Keep Get from data under Define Dichotomy.',
            checkpoint: 'The Binomial Test table shows N, Observed Prop., and Exact Sig. (2-tailed).'
          },
          {
            instruction: 'At α = .05, decide reject or fail to reject H₀: the proportion is .50. Say what p means under H₀.',
            hint: 'Exact Sig. prints as .000; report p < .001. Fail to reject would not prove 50/50.',
            checkpoint: 'You can state a decision and what p means if H₀ were true.'
          },
          {
            instruction: 'Open bmi_and_exercise.csv. Analyze > Compare Means > One-Sample T Test. Test Variable = bmi, Test Value = 25.',
            hint: 'In SPSS 27 and later tick Estimate effect sizes for Cohen\'s d.',
            checkpoint: 'Output shows t = 9.23, df = 249, and Sig. (2-tailed) = .000.'
          },
          {
            instruction: 'Decide reject or fail to reject H₀: μ = 25. Write an APA sentence with M, SD, t(df), p, and d.',
            hint: 'd = Mean Difference / SD = 4.81 / 8.24.',
            checkpoint: 'Your sentence includes M = 29.8, SD = 8.24, t(249) = 9.23, p < .001, d = 0.58.'
          }
        ]
      },

      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'm7-spss-binomial-string',
            scenario:
              'You try the Binomial test on gender, but gender does not appear in the Test Variable List.',
            errorMessage: 'The variable is not in the list of available variables',
            options: [
              'Gender is a text (string) variable; recode it to numbers with Automatic Recode first',
              'The Binomial test only works with Scale variables',
              'You must turn on Split File',
              'SPSS needs a paid module'
            ],
            correct: 0,
            explanation:
              'The legacy Binomial test needs a numeric variable. Transform > Automatic Recode makes a numeric copy with value labels.'
          },
          {
            id: 'm7-spss-sig-zero',
            scenario: 'Your One-Sample Test table shows Sig. (2-tailed) = .000. A classmate writes "p = 0".',
            errorMessage: 'Reporting error',
            options: [
              'Write p < .001; SPSS rounds to three decimals and p is never exactly zero',
              'p = 0 is correct',
              'Write p = .000',
              'Change the test value'
            ],
            correct: 0,
            explanation: 'A displayed .000 means p is less than .0005. Report p < .001.'
          },
          {
            id: 'm7-pvalue-misread',
            scenario: 'A classmate says: "p = .03 means there is a 3% chance the null hypothesis is true."',
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
            id: 'm7-spss-interpret-binomial',
            question:
              'SPSS Binomial Test output for gender_n (Test Proportion .50): Group 1 = Female, N = 430, Observed Prop. = .59; Group 2 = Male, N = 304, Observed Prop. = .41; Total N = 734; Exact Sig. (2-tailed) = .000. (1) Which group is larger? (2) At α = .05, do you reject or fail to reject H₀: the population proportion equals .50? (3) In one sentence, what does p < .001 mean under H₀ (not "probability H₀ is true")?',
            placeholder:
              'e.g. Female is larger (.59). Reject H₀. p < .001 means data this extreme would be very unlikely if the true proportion were .50...',
            hint: 'Compare Observed Prop. with .50. Decision: compare p to .05. Remember what p means assuming H₀.',
            requiredKeywords: [
              '.59', '0.59', 'female', 'larger', 'above', 'greater', 'higher', 'more than',
              'reject', '.001', 'p < .001', 'p<.001',
              '.50', '0.5', 'proportion', 'h0', 'h₀', 'null',
              'unlikely', 'assuming', 'if', 'true', 'under', 'extreme', 'probability'
            ],
            minRequiredKeywords: 5,
            feedback:
              'Female is larger (.59 vs .41). Reject H₀ at α = .05 because p < .001. That p-value means: if the population proportion really were .50, results this extreme (or more) would be very unlikely. It is not the probability that H₀ is true.'
          },
          {
            id: 'm7-spss-interpret-ttest',
            question:
              'SPSS One-Sample Test output for age with Test Value = 0: t = 147.8, df = 733, Sig. (2-tailed) = .000, Mean Difference = 19.25. (1) Report t and df. (2) At α = .05, do you reject or fail to reject H₀: μ = 0? (3) What does "2-tailed" tell you about the alternative hypothesis?',
            placeholder:
              'e.g. t(733) = 147.8. Reject H₀. 2-tailed means the alternative is mean not equal to 0...',
            hint: 'Decision uses Sig. versus .05. 2-tailed corresponds to a non-directional alternative.',
            requiredKeywords: [
              '147', 't', '733', 'df',
              'reject', '.001', 'p < .001', 'p<.001',
              '0', 'mean', 'mu', 'μ', 'h0', 'h₀', 'null',
              'not equal', '≠', 'two', 'two-sided', 'two sided', 'two-tailed', 'alternative', 'ha', 'hₐ'
            ],
            minRequiredKeywords: 5,
            feedback:
              't(733) = 147.8. Reject H₀ at α = .05 (p < .001): mean age differs from 0. "2-tailed" means the alternative hypothesis is two-sided (μ ≠ 0).'
          }
        ]
      },

      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        summary:
          'Record yourself completing Module 7 Software Practice in SPSS on different variables/files than Learn and Practice: (1) a binomial test on a two-level variable you create from bmi_and_exercise.csv (for example Recode bmi into under 25 vs 25 and over), not gender from personality_data.csv; (2) a one-sample t-test on age (or a Big Five scale) from personality_data.csv, not bmi. Talk through menus, output, and p-value decisions, then upload to Canvas.',
        instructions:
          'Start recording (Tools or your phone). Use the Apply datasets above (bmi_and_exercise.csv for the binomial; personality_data.csv for the t-test). Complete each exercise below in SPSS, then stop, download the video, and upload it to Canvas as Module 7: Software Practice. Mark each exercise complete when finished.'
      }
    }
  }
]
