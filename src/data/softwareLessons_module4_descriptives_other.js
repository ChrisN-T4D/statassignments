// Module 4: Descriptive statistics — SPSS, R, Excel, Stata (parallel to jamovi-descriptive-stats in softwareLessons.js)

const sharedYouDoStats = [
  {
    id: 'q3',
    type: 'multiple_choice',
    question: 'You run descriptives on a variable and get: N=50, Mean=75.4, SD=12.3. What does SD tell you?',
    options: [
      { id: 'a', text: 'The most common score is 12.3' },
      { id: 'b', text: 'Scores typically vary about 12.3 points from the mean' },
      { id: 'c', text: 'There are 12.3 outliers in the data' },
      { id: 'd', text: 'The difference between highest and lowest is 12.3' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Right! Standard Deviation measures how spread out scores are from the mean.',
      incorrect:
        'SD (Standard Deviation) tells you the average distance of scores from the mean. An SD of 12.3 means scores typically vary about 12.3 points from the mean of 75.4.'
    }
  },
  {
    id: 'q4',
    type: 'multiple_choice',
    question: 'Which statistic is the "middle" score when data are sorted in order?',
    options: [
      { id: 'a', text: 'Mean' },
      { id: 'b', text: 'Median' },
      { id: 'c', text: 'Mode' },
      { id: 'd', text: 'Standard deviation' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Correct! The median is the middle value when data are ordered.',
      incorrect: 'The median is the middle score. Mean is the average, mode is the most frequent, SD measures spread.'
    }
  }
]

export const module4DescriptiveLessonsOther = [
  {
    id: 'spss-descriptive-stats',
    module: 'stats-module-4',
    title: 'Running Descriptive Statistics in SPSS',
    software: 'spss',
    objectives: [
      'Run Descriptives and Frequencies and read N, mean, median, SD, min, max',
      'Get skewness, kurtosis, the IQR, and a normality test from Explore',
      'Use Compute Variable to build deviation and squared deviation scores',
      'Relate the sum of squared deviations (SS) to variance and SD'
    ],
    estimatedTime: 35,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Descriptives and variability in SPSS',
        sections: [
          {
            id: 'running-descriptives',
            title: 'Descriptives: mean, SD, minimum, maximum',
            objectives: ['Run Descriptives', 'Read the table', 'Match output labels to notation'],
            estimatedTime: 8,
            content: [
              {
                type: 'callout',
                style: 'tip',
                content: '<strong>Dataset (Tools bar):</strong> In Methods Market, open <strong>Tools</strong> (right side) and download <strong>bmi_and_exercise.csv</strong>. In SPSS use <strong>File &rarr; Open &rarr; Data&hellip;</strong>, set Files of type to Text, and work through the Text Import Wizard from Module 3 (Delimited, names at top, Comma). The variables are <strong>consumption_vegetables_per_day</strong>, <strong>bmi</strong>, and <strong>exercise_per_week</strong>. Check Variable View: all three should be Numeric and Scale.'
              },
              {
                type: 'step_sequence',
                steps: [
                  { step: 1, title: 'Open Descriptives', description: 'Choose <strong>Analyze &rarr; Descriptive Statistics &rarr; Descriptives&hellip;</strong>' },
                  { step: 2, title: 'Add variables', description: 'Select <strong>bmi</strong> and <strong>exercise_per_week</strong> and click the blue arrow to move them into <strong>Variable(s)</strong>.' },
                  { step: 3, title: 'Choose statistics', description: 'Click <strong>Options&hellip;</strong>. Mean, Std. deviation, Minimum, and Maximum are ticked by default. Also tick <strong>Variance</strong> and <strong>Range</strong>, then <strong>Continue</strong>.' },
                  { step: 4, title: 'Run and read', description: 'Click <strong>OK</strong>. In the Viewer, the <em>Descriptive Statistics</em> table lists N, Minimum, Maximum, Mean, Std. Deviation, and Variance for each variable.' }
                ]
              },
              {
                type: 'text',
                content: 'Match SPSS labels to the notation from the chapter: <strong>N</strong> is the number of scores, <strong>Mean</strong> is X&#772; (&ldquo;X-bar&rdquo;), <strong>Std. Deviation</strong> is <em>s</em>, and <strong>Variance</strong> is <em>s</em>&sup2;. SPSS always uses the sample formulas (dividing by n &minus; 1). For <strong>bmi</strong> you should see N = 250, Mean &asymp; 29.81, and Std. Deviation &asymp; 8.24.'
              },
              {
                type: 'callout',
                style: 'warning',
                content: 'Descriptives does <strong>not</strong> give the median, mode, or IQR. Those come from Frequencies and Explore (next section).'
              }
            ]
          },
          {
            id: 'frequencies-explore',
            title: 'Median, mode, IQR, skewness, and normality',
            objectives: ['Get the median and mode from Frequencies', 'Use Explore for IQR, skewness, kurtosis', 'Read a normality test'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content: '<strong>Frequencies</strong> for the median and mode: <em>Analyze &rarr; Descriptive Statistics &rarr; Frequencies&hellip;</em>, move <strong>bmi</strong> into Variable(s), click <strong>Statistics&hellip;</strong>, tick <strong>Mean, Median, Mode</strong> (and <strong>Quartiles</strong>, <strong>Skewness</strong>, <strong>Kurtosis</strong> if you like), click <strong>Continue</strong>, and <strong>untick Display frequency tables</strong> before OK. A continuous variable like BMI would otherwise produce a table with a row for every value.'
              },
              {
                type: 'text',
                content: '<strong>Explore</strong> gives most of this in one place: <em>Analyze &rarr; Descriptive Statistics &rarr; Explore&hellip;</em>, move <strong>bmi</strong> into <strong>Dependent List</strong>. Under <strong>Display</strong> keep <em>Both</em>. The <em>Descriptives</em> table includes the mean, median, variance, SD, minimum, maximum, range, <strong>Interquartile Range</strong>, <strong>Skewness</strong>, and <strong>Kurtosis</strong> (each with a standard error).'
              },
              {
                type: 'text',
                content: 'To check normality, click <strong>Plots&hellip;</strong> in Explore and tick <strong>Normality plots with tests</strong>. The output adds a <em>Tests of Normality</em> table. Use the <strong>Shapiro-Wilk</strong> row: a Sig. below .05 suggests the data are not normally distributed. Also look at the Normal Q-Q plot; points close to the line suggest normality. With large samples tiny departures can be &ldquo;significant&rdquo;, so combine the test with the plot and the skewness value.'
              },
              {
                type: 'callout',
                style: 'tip',
                content: 'Rule of thumb for reporting: if the distribution is roughly symmetric, report the mean and SD. If it is clearly skewed or has outliers, report the median and IQR.'
              }
            ]
          },
          {
            id: 'computing-deviations',
            title: 'Deviation scores (X − mean)',
            objectives: ['Use Compute Variable', 'Create bmi minus the mean of bmi'],
            estimatedTime: 7,
            content: [
              {
                type: 'text',
                content: 'A <strong>deviation</strong> is X<sub>i</sub> &minus; X&#772;: how far one score is from the mean. Get the mean of <strong>bmi</strong> from Descriptives first (29.81), then build the new variable.'
              },
              {
                type: 'step_sequence',
                steps: [
                  { step: 1, title: 'Open Compute Variable', description: 'Choose <strong>Transform &rarr; Compute Variable&hellip;</strong>' },
                  { step: 2, title: 'Name the target', description: 'In <strong>Target Variable</strong> type <strong>bmi_dev</strong>.' },
                  { step: 3, title: 'Enter the expression', description: 'In <strong>Numeric Expression</strong> type <strong>bmi - 29.81</strong> (use the mean you read from your table; for exact results copy the full mean from the table by double-clicking it, or give SPSS more decimals).' },
                  { step: 4, title: 'Verify', description: 'Click <strong>OK</strong>, then run Descriptives on <strong>bmi_dev</strong>. The mean should be very close to 0, because deviations from the mean always sum to zero.' }
                ]
              }
            ]
          },
          {
            id: 'squared-deviations-ss',
            title: 'Squared deviations, SS, variance, and SD',
            objectives: ['Compute (X − mean)²', 'Sum squared deviations', 'Rebuild the variance and SD'],
            estimatedTime: 7,
            content: [
              {
                type: 'text',
                content: 'Square each deviation and add them up: SS = &Sigma;(X<sub>i</sub> &minus; X&#772;)&sup2;. Dividing SS by n &minus; 1 gives the sample variance s&sup2;, and the square root gives s.'
              },
              {
                type: 'step_sequence',
                steps: [
                  { step: 1, title: 'Squared deviation', description: '<strong>Transform &rarr; Compute Variable&hellip;</strong>: Target <strong>bmi_sqdev</strong>, Numeric Expression <strong>bmi_dev ** 2</strong>. Click OK.' },
                  { step: 2, title: 'Sum them (SS)', description: '<strong>Analyze &rarr; Descriptive Statistics &rarr; Descriptives&hellip;</strong> on <strong>bmi_sqdev</strong>; <strong>Options&hellip; &rarr; Sum</strong>. The sum is SS, about 16,920 for bmi.' },
                  { step: 3, title: 'Rebuild the variance and SD', description: 'Variance = SS / (n − 1) = 16,920 / 249 ≈ 67.95. SD = √67.95 ≈ 8.24. Compare with the Std. Deviation SPSS reported earlier.' }
                ]
              },
              {
                type: 'text',
                content: 'Small differences in the last digits come from rounding the mean to two decimals.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided practice: Descriptives and Compute',
        instructions: 'Follow along in SPSS with the BMI and exercise data (bmi_and_exercise.csv from Tools).',
        steps: [
          {
            instruction: 'Open bmi_and_exercise.csv with File → Open → Data… (Files of type: Text) and complete the Text Import Wizard.',
            hint: 'Delimited; variable names at top of file: Yes; delimiter: Comma. Then check Variable View: all three variables should be Numeric and Scale.',
            checkpoint: 'Three variables appear in Data View, with 250 rows.'
          },
          {
            instruction: 'Run Analyze → Descriptive Statistics → Descriptives… on bmi and exercise_per_week. Record the mean of bmi.',
            hint: 'Move both variables into Variable(s), then OK.',
            checkpoint: 'N = 250. The mean of bmi is about 29.81 and its Std. Deviation about 8.24.'
          },
          {
            instruction: 'Run Analyze → Descriptive Statistics → Explore… on bmi. Find the median, the IQR, and the skewness.',
            hint: 'The Descriptives table has rows for Median, Interquartile Range, and Skewness.',
            checkpoint: 'You can state whether the bmi mean and median are close and whether skewness is near 0.'
          },
          {
            instruction: 'Compute bmi_dev = bmi minus the mean with Transform → Compute Variable…. Run Descriptives on bmi_dev.',
            hint: 'Numeric Expression: bmi - 29.81',
            checkpoint: 'The mean of bmi_dev is essentially 0 (it may show as a tiny number such as .0000).'
          },
          {
            instruction: 'Compute bmi_sqdev = bmi_dev ** 2, then use Descriptives with Options → Sum to get SS. Calculate SS / 249 and compare with the variance of bmi.',
            hint: 'Variance = SS / (n − 1) with n = 250.',
            checkpoint: 'SS is about 16,920 and SS / 249 is about 67.95, matching the variance from Descriptives (and its square root matches the SD).'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'spss-desc-1',
            scenario: 'Descriptives runs but N is smaller than your row count.',
            errorMessage: 'The Descriptive Statistics table shows N = 241 for a file with 250 rows.',
            options: [
              'SPSS deleted rows from the file',
              'Some cases have missing values on that variable; SPSS only uses valid cases',
              'You must use Excel instead',
              'The variable is a string'
            ],
            correct: 1,
            explanation: 'Descriptives reports valid N. Blank cells or declared missing-value codes reduce N. Check Variable View for missing codes, then look at the Data View for blanks.'
          },
          {
            id: 'spss-desc-2',
            scenario: 'You wanted the median of a variable and ran Descriptives, but there is no median in the table.',
            errorMessage: 'No error message; the Median is simply not listed.',
            options: [
              'The data have no median',
              'Descriptives does not offer a median; use Frequencies (Statistics) or Explore',
              'Change the variable to Nominal',
              'Turn on Split File'
            ],
            correct: 1,
            explanation: 'Descriptives only offers mean, sum, SD, variance, range, min, max, standard error, kurtosis, and skewness. The median, mode, and quartiles come from Frequencies or Explore.'
          },
          {
            id: 'spss-desc-3',
            scenario: 'Earlier you used Data → Split File to compare two groups. Now every new analysis is printing separate tables for each group, which you did not want.',
            errorMessage: 'No error message. Split File is still switched on.',
            options: [
              'Delete the grouping variable',
              'Go to Data → Split File and choose Analyze all cases, do not create groups',
              'Restart SPSS and discard your data',
              'Change Measure to Scale'
            ],
            correct: 1,
            explanation: 'Split File stays active until you turn it off. Switch it back to Analyze all cases.'
          }
        ],
        outputInterpretation: []
      },
      youDo: {
        type: 'assessment',
        title: 'Check your understanding',
        questions: [
          {
            id: 'q1',
            type: 'ordering',
            question: 'Order the steps to run Descriptives in SPSS:',
            items: [
              { id: 'a', text: 'Move variables into Variable(s)' },
              { id: 'b', text: 'Choose Analyze → Descriptive Statistics → Descriptives' },
              { id: 'c', text: 'Click OK' },
              { id: 'd', text: 'Open Options if needed, then OK' }
            ],
            correctOrder: ['b', 'a', 'd', 'c'],
            feedback: {
              correct: 'Good — Descriptives dialog, variables, options, run.',
              incorrect: 'Open Descriptives, add variables, set options, OK.'
            }
          },
          {
            id: 'q2',
            type: 'fill_blank',
            question: 'To create a new variable from a formula in SPSS, use the ________ menu.',
            answer: ['Transform', 'transform'],
            caseSensitive: false,
            feedback: {
              correct: 'Yes — Transform → Compute Variable.',
              incorrect: 'Use **Transform** (Compute Variable).'
            }
          },
          ...sharedYouDoStats
        ]
      }
    }
  },
  {
    id: 'r-descriptive-stats',
    module: 'stats-module-4',
    title: 'Running Descriptive Statistics in R',
    software: 'r',
    objectives: [
      'Summarize variables with summary(), mean(), sd()',
      'Use dplyr mutate for deviation scores',
      'Compute SS and connect to var(), sd()'
    ],
    estimatedTime: 35,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Descriptives in R',
        sections: [
          {
            id: 'running-descriptives',
            title: 'Descriptive statistics',
            objectives: ['Summarize continuous variables'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  'Load your CSV (e.g. `read.csv()`). For **BMI** and **exercise**: `summary(data$BMI)`, `mean(data$BMI, na.rm=TRUE)`, `sd(data$BMI, na.rm=TRUE)`, `min`, `max`. With **dplyr**: `data %>% summarise(across(c(BMI, exercise), list(mean = ~mean(.x, na.rm=TRUE), sd = ~sd(.x, na.rm=TRUE))))`.'
              },
              {
                type: 'step_sequence',
                steps: [
                  { step: 1, title: 'Load data', description: '`data <- read.csv("bmi_and_exercise.csv")` (adjust path).' },
                  { step: 2, title: 'Quick summary', description: '`summary(data)` or per-column `mean(..., na.rm=TRUE)`.' },
                  { step: 3, title: 'SD and range', description: '`sd(data$BMI, na.rm=TRUE)`; `range(data$BMI, na.rm=TRUE)`.' }
                ]
              }
            ]
          },
          {
            id: 'computing-deviations',
            title: 'Deviation scores',
            objectives: ['mutate dev = x - mean(x)'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  '`library(dplyr); data <- data %>% mutate(bmi_dev = BMI - mean(BMI, na.rm=TRUE))`. Check `mean(data$bmi_dev, na.rm=TRUE)` is ~0.'
              }
            ]
          },
          {
            id: 'squared-ss',
            title: 'Squared deviations and SS',
            objectives: ['Square deviations', 'Sum for SS'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  '`mutate(bmi_sqdev = (BMI - mean(BMI, na.rm=TRUE))^2)` then `sum(data$bmi_sqdev, na.rm=TRUE)` for **SS**. Compare `var(BMI, na.rm=TRUE)*(n-1)/n` vs sample variance — R `var()` uses N−1; `sd()` = sqrt(var).'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided practice in R',
        instructions: 'Use RStudio or console with BMI/exercise data.',
        steps: [
          {
            instruction: 'Read CSV; print summary of BMI and exercise.',
            hint: 'read.csv; summary.',
            checkpoint: 'Means and SDs visible.'
          },
          {
            instruction: 'Add bmi_dev and bmi_sqdev with dplyr mutate.',
            hint: 'mean(BMI, na.rm=TRUE) inside mutate.',
            checkpoint: 'mean(bmi_dev) ~ 0.'
          },
          {
            instruction: 'Compute sum(bmi_sqdev); relate to sd(BMI).',
            hint: 'SS = (n-1)*var(BMI) for sample var.',
            checkpoint: 'Numeric consistency check.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'r-desc-1',
            scenario: 'mean() returns NA.',
            errorMessage: 'NA in data',
            options: [
              'Use na.rm=TRUE',
              'Delete R',
              'Install SPSS',
              'Rename file to .xlsx'
            ],
            correct: 0,
            explanation: 'Pass na.rm=TRUE to mean/sd/sum when missing values exist.'
          }
        ],
        outputInterpretation: []
      },
      youDo: {
        type: 'assessment',
        title: 'Check your understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'Which dplyr function adds or transforms columns?',
            options: [
              { id: 'a', text: 'summarise()' },
              { id: 'b', text: 'mutate()' },
              { id: 'c', text: 'filter()' },
              { id: 'd', text: 'arrange()' }
            ],
            correct: 'b',
            feedback: {
              correct: 'mutate() adds columns.',
              incorrect: 'Use **mutate()** to add deviation or squared columns.'
            }
          },
          {
            id: 'q2',
            type: 'fill_blank',
            question: 'In R, sample variance uses denominator N minus ____.',
            answer: ['1', 'one'],
            caseSensitive: false,
            feedback: {
              correct: 'Yes — unbiased sample variance uses N−1.',
              incorrect: 'Sample variance uses **1** (N−1).'
            }
          },
          ...sharedYouDoStats
        ]
      }
    }
  },
  {
    id: 'excel-descriptive-stats',
    module: 'stats-module-4',
    title: 'Running Descriptive Statistics in Excel',
    software: 'excel',
    objectives: [
      'Use AVERAGE, STDEV.S, MIN, MAX, COUNT',
      'Build deviation columns with $ absolute references',
      'Sum squared deviations and relate to STDEV.S'
    ],
    estimatedTime: 35,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Descriptives in Excel',
        sections: [
          {
            id: 'running-descriptives',
            title: 'Descriptive statistics',
            objectives: ['Functions on columns'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  'Put **BMI** in column B (B2:Bn). **=AVERAGE(B2:B100)**, **=STDEV.S(B2:B100)** (sample SD), **=MIN(B2:B100)**, **=MAX(B2:B100)**, **=COUNT(B2:B100)**. Use **Data Analysis → Descriptive Statistics** (ToolPak) for a summary table if enabled.'
              }
            ]
          },
          {
            id: 'deviations',
            title: 'Deviation column',
            objectives: ['X − AVERAGE(range)'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  'In C2: **=B2-AVERAGE($B$2:$B$100)** and fill down. **=AVERAGE(C2:C100)** should be ~0.'
              }
            ]
          },
          {
            id: 'ss',
            title: 'Squared deviations and SS',
            objectives: ['POWER or ^2', 'SUM'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  'D2: **=C2^2** (or **=POWER(C2,2)**). **SS = SUM(D2:D100)**. Sample variance ≈ **SS/(COUNT−1)**; **STDEV.S** should match **SQRT** of that.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided practice in Excel',
        instructions: 'Use BMI in column B.',
        steps: [
          {
            instruction: 'Enter formulas for mean and STDEV.S of BMI.',
            hint: 'AVERAGE, STDEV.S.',
            checkpoint: 'Cells show numeric results.'
          },
          {
            instruction: 'Column C: deviation; column D: square; cell: SUM of D.',
            hint: 'Lock B range with $.',
            checkpoint: 'SS computed.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'excel-desc-1',
            scenario: 'Your deviation column shows #VALUE! for some rows.',
            errorMessage: 'Formula error',
            options: [
              'Height column contains text',
              'You must reinstall Windows',
              'STDEV.S is spelled wrong',
              'Excel cannot compute means'
            ],
            correct: 0,
            explanation: 'Non-numeric cells break arithmetic; clean data or use VALUE().'
          }
        ],
        outputInterpretation: []
      },
      youDo: {
        type: 'assessment',
        title: 'Check your understanding',
        questions: [
          {
            id: 'q1',
            type: 'fill_blank',
            question: 'Excel function for sample standard deviation is STDEV.____ (two letters).',
            answer: ['S', 's'],
            caseSensitive: false,
            feedback: {
              correct: 'STDEV.S is sample SD.',
              incorrect: 'Use **STDEV.S** (sample); STDEV.P is population.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'Why use $B$2:$B$100 inside AVERAGE when filling deviation formulas down?',
            options: [
              { id: 'a', text: 'Excel requires dollar signs for all formulas' },
              { id: 'b', text: 'So every row subtracts the same overall mean' },
              { id: 'c', text: 'To hide the column' },
              { id: 'd', text: 'To convert to dates' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Right — fixed range = column mean for all rows.',
              incorrect: 'Absolute references keep the mean range fixed.'
            }
          },
          ...sharedYouDoStats
        ]
      }
    }
  },
  {
    id: 'stata-descriptive-stats',
    module: 'stats-module-4',
    title: 'Running Descriptive Statistics in Stata',
    software: 'stata',
    objectives: [
      'Use summarize and tabstat',
      'generate deviation variables',
      'Connect SS to variance and r(sd)'
    ],
    estimatedTime: 35,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Descriptives in Stata',
        sections: [
          {
            id: 'running-descriptives',
            title: 'Descriptive statistics',
            objectives: ['summarize, detail'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  'Import CSV: **import delimited "file.csv", clear**. **summarize BMI exercise** or **tabstat BMI exercise, statistics(mean sd min max n)**.'
              }
            ]
          },
          {
            id: 'deviations',
            title: 'Deviation scores',
            objectives: ['gen after summarize'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  '**summarize BMI** then **gen bmi_dev = BMI - r(mean)**. **summarize bmi_dev** — mean ~0.'
              }
            ]
          },
          {
            id: 'ss',
            title: 'Squared deviations',
            objectives: ['gen sq; egen or total'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  '**gen bmi_sqdev = bmi_dev^2**. Get SS with **tabstat bmi_sqdev, statistics(sum)** (or install **ssc install asdoc** / use **egen ss = total(bmi_sqdev)** if you prefer a variable holding the sum). Compare SS to **(N−1)×variance** from **summarize BMI**.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided practice in Stata',
        instructions: 'BMI variable in memory.',
        steps: [
          {
            instruction: 'summarize BMI; gen bmi_dev = BMI - r(mean).',
            hint: 'r(mean) after summarize.',
            checkpoint: 'bmi_dev mean ~0.'
          },
          {
            instruction: 'gen bmi_sqdev = bmi_dev^2; tabstat bmi_sqdev, stat(sum).',
            hint: 'tabstat ... , stat(sum)',
            checkpoint: 'SS value obtained.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'stata-desc-1',
            scenario: '`gen bmi_dev = BMI - r(mean)` says r(mean) invalid.',
            errorMessage: 'r() not found',
            options: [
              'Run summarize BMI in the same session immediately before',
              'Stata does not support deviations',
              'You must buy a license',
              'BMI must be string'
            ],
            correct: 0,
            explanation: 'r(mean) exists only after a command that stores it, e.g. summarize.'
          }
        ],
        outputInterpretation: []
      },
      youDo: {
        type: 'assessment',
        title: 'Check your understanding',
        questions: [
          {
            id: 'q1',
            type: 'fill_blank',
            question: 'After summarize BMI, Stata stores the mean in r(____).',
            answer: ['mean', 'Mean'],
            caseSensitive: false,
            feedback: {
              correct: 'r(mean) holds the mean.',
              incorrect: 'Use **r(mean)** after summarize.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'Stata’s **summarize** shows sample SD by default; variance uses:',
            options: [
              { id: 'a', text: 'N in denominator' },
              { id: 'b', text: 'N−1 in denominator (sample variance)' },
              { id: 'c', text: 'Always population' },
              { id: 'd', text: 'Median only' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Sample variance uses N−1.',
              incorrect: 'Stata summarize SD matches sample SD (N−1).'
            }
          },
          ...sharedYouDoStats
        ]
      }
    }
  }
]
