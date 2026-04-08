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
      'Run Descriptives for continuous variables',
      'Interpret N, mean, median, SD, min, max',
      'Use Compute to create deviation and squared deviation variables',
      'Relate sum of squared deviations to variance and SD'
    ],
    estimatedTime: 35,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Descriptives and variability in SPSS',
        sections: [
          {
            id: 'running-descriptives',
            title: 'Descriptive statistics',
            objectives: ['Run Descriptives', 'Select variables', 'Read the table'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  'Use **Analyze → Descriptive Statistics → Descriptives**. Move **BMI** and **exercise** (or your variable names) into the Variable(s) list. Click **Options** and ensure Mean, Std deviation, Minimum, Maximum are checked. Use your **BMI and exercise** dataset.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open Descriptives',
                    description: 'Menu: **Analyze → Descriptive Statistics → Descriptives**.'
                  },
                  {
                    step: 2,
                    title: 'Add variables',
                    description: 'Move continuous variables (e.g. BMI, exercise_hours) into the Variable(s) box.'
                  },
                  {
                    step: 3,
                    title: 'Choose statistics',
                    description: 'Click **Options**. Include at least Mean, Std. deviation, Minimum, Maximum. OK to run.'
                  },
                  {
                    step: 4,
                    title: 'Read output',
                    description: 'The table lists N, mean, SD, min, max per variable.'
                  }
                ]
              },
              {
                type: 'callout',
                style: 'tip',
                content:
                  'For skewness/kurtosis or percentiles, use **Analyze → Descriptive Statistics → Explore** or check additional options where available.'
              }
            ]
          },
          {
            id: 'computing-deviations',
            title: 'Deviation scores (X − mean)',
            objectives: ['Use Compute Variable', 'Create BMI − mean(BMI)'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  '**Deviation** = X − mean of X. In SPSS: **Transform → Compute Variable**. First note the mean of BMI from **Descriptives**. Target variable: e.g. **bmi_dev**. Numeric expression: **BMI − [paste mean]** OR use **Aggregate** to add the sample mean as a variable then subtract. Simple path: type the numeric mean from output, e.g. **BMI − 24.5** (replace with your mean).'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Compute Variable',
                    description: '**Transform → Compute Variable**.'
                  },
                  {
                    step: 2,
                    title: 'Target name',
                    description: 'Target Variable: **bmi_dev** (or similar).'
                  },
                  {
                    step: 3,
                    title: 'Expression',
                    description: 'Numeric Expression: **BMI − [mean from Descriptives]** (use your BMI variable name and paste the reported mean).'
                  },
                  {
                    step: 4,
                    title: 'Verify',
                    description: 'Run **Descriptives** on **bmi_dev** — the mean should be ~0.'
                  }
                ]
              }
            ]
          },
          {
            id: 'squared-deviations-ss',
            title: 'Squared deviations and SS',
            objectives: ['Compute (X − mean)²', 'Sum squared deviations'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content:
                  'Create **bmi_sqdev** = **(BMI − mean)²** using the same mean as before. Sum of squared deviations **SS** = sum of that column. In SPSS: **Descriptives** on **bmi_sqdev** with **Sum** in Options, or **Aggregate** / **Excel-style** manual check. Variance = SS/(N−1); SD = √variance — compare to SD of BMI from Descriptives.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Squared deviation',
                    description: '**Transform → Compute**: **bmi_sqdev = (BMI − mean)²** (same mean constant as above).'
                  },
                  {
                    step: 2,
                    title: 'Sum (SS)',
                    description: '**Analyze → Descriptives → Descriptives** on **bmi_sqdev**, **Options → Sum**. That sum is SS for BMI (using that mean).'
                  }
                ]
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided practice: Descriptives and compute',
        instructions: 'Follow along in SPSS with BMI and exercise data.',
        steps: [
          {
            instruction: 'Open your dataset with BMI and exercise columns.',
            hint: 'CSV: **File → Import Data → CSV** (or open .sav).',
            checkpoint: 'Variables appear in Data View.'
          },
          {
            instruction: 'Run Descriptives on BMI and exercise; record mean of BMI.',
            hint: 'Analyze → Descriptive Statistics → Descriptives.',
            checkpoint: 'You have a mean for BMI.'
          },
          {
            instruction: 'Compute bmi_dev = BMI minus that mean; Descriptives on bmi_dev (mean ~0).',
            hint: 'Transform → Compute Variable.',
            checkpoint: 'Deviation column mean near zero.'
          },
          {
            instruction: 'Compute bmi_sqdev = (BMI − mean)²; get Sum of bmi_sqdev as SS.',
            hint: 'Descriptives → Options → Sum.',
            checkpoint: 'SS matches SS = (N−1)×variance relationship with reported SD.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'spss-desc-1',
            scenario: 'Descriptives runs but N is smaller than your row count.',
            errorMessage: 'Listwise missing handling',
            options: [
              'SPSS deleted all rows',
              'Some variables have missing values; SPSS uses valid N per analysis',
              'You must use Excel instead',
              'Variable is string type'
            ],
            correct: 1,
            explanation: 'Descriptives uses valid cases; missing values on included variables reduce N.'
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
