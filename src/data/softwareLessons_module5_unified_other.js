// Module 5 unified lesson — SPSS, R, Excel, Stata (parallel to jamovi-module-5-unified)

const m5YouDoCommon = [
  {
    id: 'q2',
    type: 'multiple_choice',
    question: 'A histogram shows values clustered on the left with a long tail extending to the right. This distribution is:',
    options: [
      { id: 'a', text: 'Negatively skewed (left-skewed)' },
      { id: 'b', text: 'Positively skewed (right-skewed)' },
      { id: 'c', text: 'Symmetric' },
      { id: 'd', text: 'Bimodal' }
    ],
    correct: 'b',
    feedback: { correct: 'Correct!', incorrect: 'A long tail to the right indicates positive skew.' }
  },
  {
    id: 'q3',
    type: 'multiple_choice',
    question: 'To include only participants over age 21, which filter expression should you use?',
    options: [
      { id: 'a', text: 'age = 21' },
      { id: 'b', text: 'age > 21' },
      { id: 'c', text: 'age => 21' },
      { id: 'd', text: 'age > "21"' }
    ],
    correct: 'b',
    feedback: { correct: 'Correct!', incorrect: 'Use age > 21 for strictly greater than 21.' }
  },
  {
    id: 'q5',
    type: 'multiple_choice',
    question: 'To turn a continuous score into categories (e.g. High/Low), you typically:',
    options: [
      { id: 'a', text: 'Define cut-points or recode rules mapping ranges to labels' },
      { id: 'b', text: 'Only sort the column' },
      { id: 'c', text: 'Delete missing rows' },
      { id: 'd', text: 'Change font color' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Correct!',
      incorrect: 'Use recode rules, if/else logic, or CASE WHEN–style logic to map intervals to categories.'
    }
  },
  {
    id: 'q6',
    type: 'fill_blank',
    question: 'When recoding age so that age > 18 gives "Adult" and else "Minor", you need two output labels: ____ and ____.',
    answer: ['Adult, Minor', 'adult, minor', '"Adult", "Minor"'],
    caseSensitive: false,
    feedback: {
      correct: 'Right!',
      incorrect: 'Map the TRUE condition to one label (e.g. Adult) and the else case to the other (Minor).'
    }
  }
]

export const module5UnifiedLessonsOther = [
  {
    id: 'spss-module-5-unified',
    module: 'stats-module-5',
    title: 'Graphing and Data Manipulation in SPSS',
    software: 'spss',
    objectives: [
      'Create histograms for continuous variables',
      'Use Select Cases to analyze subsets',
      'Recode and compute variables for categories and centered scores'
    ],
    estimatedTime: 75,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Histograms, Select Cases, and Recode',
        sections: [
          {
            id: 'creating-histograms',
            title: 'Histograms in SPSS',
            objectives: ['Build a histogram', 'Assess shape'],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content:
                  '**Graphs → Chart Builder** (or **Legacy Dialogs → Histogram**). Drag your continuous variable (e.g. Extraversion) to the Y axis as histogram. Run the chart. Check symmetry, skew, and number of peaks.'
              },
              {
                type: 'step_sequence',
                steps: [
                  { step: 1, title: 'Chart Builder', description: '**Graphs → Chart Builder**. Choose Histogram.' },
                  { step: 2, title: 'Variable', description: 'Drag **Extraversion** (or BMI) to the horizontal axis.' },
                  { step: 3, title: 'OK', description: 'Run and read shape in the Output window.' }
                ]
              }
            ]
          },
          {
            id: 'filtering-data',
            title: 'Select Cases in SPSS',
            objectives: ['Include rows by condition'],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content:
                  '**Data → Select Cases**. Choose **If condition is satisfied**. Condition example: **Extraversion >= 4**. Turn selection off later with **All cases** to restore the full file.'
              },
              {
                type: 'definition_list',
                items: [
                  { term: '>=', icon: '≥', definition: 'Extraversion >= 4 keeps scores 4 and 5', color: '#3b82f6' },
                  { term: 'and / or', icon: '&', definition: 'Combine with AND / OR in the condition dialog', color: '#10b981' }
                ]
              }
            ]
          },
          {
            id: 'transforming-variables',
            title: 'Recode and Compute in SPSS',
            objectives: ['High/Low categories', 'Center a variable'],
            estimatedTime: 30,
            content: [
              {
                type: 'text',
                content:
                  '**Transform → Recode into Different Variables**: range 4 through highest → **High**, else → **Low** (or use **Recode into Same Variables** carefully). For centering: **Transform → Compute**: **Ex_cent = Extraversion - MEAN(Extraversion)**.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice: SPSS',
        instructions: 'Use personality-style data with Extraversion.',
        steps: [
          {
            instruction: 'Chart Builder: histogram of Extraversion.',
            hint: 'Graphs menu.',
            checkpoint: 'Histogram visible in output.'
          },
          {
            instruction: 'Select Cases: Extraversion >= 4; run Descriptives to confirm N changed.',
            hint: 'Data → Select Cases.',
            checkpoint: 'Subset active.'
          },
          {
            instruction: 'Recode Extraversion to High/Low; Compute centered Extraversion.',
            hint: 'Transform menu.',
            checkpoint: 'New variables in Data View.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'm5-spss-filter',
            scenario: 'Select Cases shows 0 cases for Gender = "F".',
            errorMessage: 'No cases',
            options: [
              'Values may be coded 0/1 or labels differ — check Value Labels',
              'SPSS cannot filter',
              'You must delete other rows',
              'Use Excel only'
            ],
            correct: 0,
            explanation: 'Match exact values and string case; inspect Frequencies first.'
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
            question: 'Order the steps for a histogram in SPSS Chart Builder:',
            items: [
              { id: 'a', text: 'Choose Histogram gallery' },
              { id: 'b', text: 'Open Graphs → Chart Builder' },
              { id: 'c', text: 'Drag variable to axis' },
              { id: 'd', text: 'OK' }
            ],
            correctOrder: ['b', 'a', 'c', 'd'],
            feedback: { correct: 'Good!', incorrect: 'Chart Builder → Histogram → variable → OK.' }
          },
          {
            id: 'q4',
            type: 'multiple_choice',
            question: 'When Select Cases is active with a condition, excluded rows are:',
            options: [
              { id: 'a', text: 'Deleted from the file' },
              { id: 'b', text: 'Still in the file but skipped by analyses' },
              { id: 'c', text: 'Moved to another sheet' },
              { id: 'd', text: 'Encrypted' }
            ],
            correct: 'b',
            feedback: { correct: 'Right!', incorrect: 'SPSS marks excluded cases; they remain in the dataset.' }
          },
          ...m5YouDoCommon
        ]
      }
    }
  },
  {
    id: 'r-module-5-unified',
    module: 'stats-module-5',
    title: 'Graphing and Data Manipulation in R',
    software: 'r',
    objectives: ['ggplot2 histograms', 'dplyr filter', 'mutate for recode and center'],
    estimatedTime: 75,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: ggplot2, dplyr::filter, mutate',
        sections: [
          {
            id: 'creating-histograms',
            title: 'Histograms in R',
            objectives: ['ggplot geom_histogram'],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content:
                  '`ggplot2::ggplot(data, aes(x = Extraversion)) + geom_histogram(bins = 30)` or base `hist(data$Extraversion)`. Inspect skew and modality.'
              }
            ]
          },
          {
            id: 'filtering-data',
            title: 'dplyr::filter',
            objectives: ['Subset rows'],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content:
                  '`data %>% filter(Extraversion >= 4)`. Chain with `summarise()` for descriptives on the subset. Use `filter()` non-destructively; keep full `data` object.'
              }
            ]
          },
          {
            id: 'transforming-variables',
            title: 'mutate and case_when',
            objectives: ['Categories and centering'],
            estimatedTime: 30,
            content: [
              {
                type: 'text',
                content:
                  '`mutate(cat = if_else(Extraversion >= 4, "High", "Low"), ex_c = Extraversion - mean(Extraversion, na.rm = TRUE))` or `case_when(Extraversion >= 4 ~ "High", TRUE ~ "Low")`.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice: R',
        instructions: 'tidyverse recommended.',
        steps: [
          { instruction: 'Plot histogram of Extraversion.', hint: 'ggplot or hist.', checkpoint: 'Plot renders.' },
          { instruction: 'filter(Extraversion >= 4); nrow() vs full data.', hint: 'dplyr', checkpoint: 'Fewer rows.' },
          { instruction: 'mutate High/Low and centered Extraversion.', hint: 'if_else / case_when', checkpoint: 'New columns.' }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'm5-r-na',
            scenario: 'mean(Extraversion) returns NA in mutate.',
            errorMessage: 'NA',
            options: [
              'Use mean(Extraversion, na.rm = TRUE)',
              'Install Jamovi',
              'Use attach() only',
              'Delete ggplot2'
            ],
            correct: 0,
            explanation: 'Pass na.rm = TRUE when missing values exist.'
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
            question: 'Typical order for a dplyr histogram workflow snippet:',
            items: [
              { id: 'a', text: 'Add geom_histogram()' },
              { id: 'b', text: 'Start ggplot(data, aes(x = var))' },
              { id: 'c', text: 'Print or view plot' },
              { id: 'd', text: 'Load ggplot2' }
            ],
            correctOrder: ['d', 'b', 'a', 'c'],
            feedback: { correct: 'Good!', incorrect: 'library → ggplot aes → geom_histogram → view.' }
          },
          {
            id: 'q4',
            type: 'multiple_choice',
            question: '`filter()` in dplyr:',
            options: [
              { id: 'a', text: 'Permanently deletes rows from the disk file' },
              { id: 'b', text: 'Returns a new table with fewer rows; original unchanged' },
              { id: 'c', text: 'Only works on Excel' },
              { id: 'd', text: 'Sorts columns' }
            ],
            correct: 'b',
            feedback: { correct: 'Right!', incorrect: 'dplyr filter is non-destructive unless you overwrite.' }
          },
          ...m5YouDoCommon
        ]
      }
    }
  },
  {
    id: 'excel-module-5-unified',
    module: 'stats-module-5',
    title: 'Graphing and Data Manipulation in Excel',
    software: 'excel',
    objectives: ['Histogram chart', 'FILTER / tables', 'IF and AVERAGE for categories and centering'],
    estimatedTime: 75,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Charts, FILTER, formulas',
        sections: [
          {
            id: 'creating-histograms',
            title: 'Histogram in Excel',
            objectives: ['Insert statistics chart'],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content:
                  'Select Extraversion column → **Insert → Charts → Histogram** (or **Insert Statistic Chart → Histogram** depending on version). Adjust bins under Format Axis if needed.'
              }
            ]
          },
          {
            id: 'filtering-data',
            title: 'Filter rows',
            objectives: ['AutoFilter or FILTER()'],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content:
                  '**Data → Filter** on header row, or `=FILTER(A2:C500, B2:B500>=4)` (Microsoft 365). Filtered rows hide; they are not deleted.'
              }
            ]
          },
          {
            id: 'transforming-variables',
            title: 'IF and centering',
            objectives: ['Categories', 'X - AVERAGE(X)'],
            estimatedTime: 30,
            content: [
              {
                type: 'text',
                content:
                  'Category: `=IF(B2>=4,"High","Low")`. Center: `=B2-AVERAGE($B$2:$B$500)` with locked range.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice: Excel',
        instructions: 'Extraversion in column B.',
        steps: [
          { instruction: 'Insert histogram for B2:B100.', hint: 'Insert tab.', checkpoint: 'Chart on sheet.' },
          { instruction: 'Filter B >= 4 or use FILTER function.', hint: 'Data → Filter.', checkpoint: 'Subset visible.' },
          { instruction: 'Columns for High/Low and centered Extraversion.', hint: 'IF and AVERAGE.', checkpoint: 'Formulas filled down.' }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'm5-excel-filter',
            scenario: 'FILTER returns #CALC!.',
            errorMessage: 'Empty',
            options: [
              'No rows meet the condition — check criteria',
              'Excel cannot filter',
              'Delete column A',
              'Use only Mac'
            ],
            correct: 0,
            explanation: 'Adjust condition or source range.'
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
            question: 'Steps to add a histogram chart from a data column:',
            items: [
              { id: 'a', text: 'Select the data column' },
              { id: 'b', text: 'Insert → Histogram chart' },
              { id: 'c', text: 'Adjust bin settings if needed' }
            ],
            correctOrder: ['a', 'b', 'c'],
            feedback: { correct: 'Good!', incorrect: 'Select data, insert histogram, tune bins.' }
          },
          {
            id: 'q4',
            type: 'multiple_choice',
            question: 'Excel AutoFilter hides rows that do not match; those rows:',
            options: [
              { id: 'a', text: 'Are deleted from the workbook' },
              { id: 'b', text: 'Remain in the sheet but hidden' },
              { id: 'c', text: 'Move to another file' },
              { id: 'd', text: 'Become bold' }
            ],
            correct: 'b',
            feedback: { correct: 'Right!', incorrect: 'Filtering hides rows; clear filter to show all.' }
          },
          ...m5YouDoCommon
        ]
      }
    }
  },
  {
    id: 'stata-module-5-unified',
    module: 'stats-module-5',
    title: 'Graphing and Data Manipulation in Stata',
    software: 'stata',
    objectives: ['histogram', 'if condition', 'recode / egen'],
    estimatedTime: 75,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: histogram, if, generate',
        sections: [
          {
            id: 'creating-histograms',
            title: 'histogram',
            objectives: ['Univariate plot'],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content: '`histogram Extraversion, frequency` or `histogram Extraversion, normal`. Inspect skew and modality.'
              }
            ]
          },
          {
            id: 'filtering-data',
            title: 'if and preserve/restore',
            objectives: ['Subset analyses'],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content:
                  'Prefix commands: `summarize Extraversion if Extraversion >= 4`. For temporary subset: `preserve`, `keep if Extraversion>=4`, run analysis, `restore`.'
              }
            ]
          },
          {
            id: 'transforming-variables',
            title: 'generate and recode',
            objectives: ['Categories and centering'],
            estimatedTime: 30,
            content: [
              {
                type: 'text',
                content:
                  '`gen high = Extraversion >= 4` then `recode high (0=2 "Low")(1=1 "High"), gen(cat)` or string: `gen cat = "High" if Extraversion>=4` etc. Center: `egen m = mean(Extraversion)` then `gen exc = Extraversion - m`.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice: Stata',
        instructions: 'Personality data in memory.',
        steps: [
          { instruction: 'histogram Extraversion.', hint: 'Graphics menu or command.', checkpoint: 'Graph window.' },
          { instruction: 'summarize Extraversion if Extraversion>=4.', hint: 'if qualifier', checkpoint: 'Smaller N.' },
          { instruction: 'gen categorical and centered variable.', hint: 'generate/egen', checkpoint: 'New vars listed.' }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'm5-stata-if',
            scenario: '`if Extraversion >= 4` yields no observations.',
            errorMessage: 'r(2000)',
            options: [
              'Variable name or type wrong — check `describe`',
              'Stata cannot filter',
              'Need Python',
              'Buy SPSS'
            ],
            correct: 0,
            explanation: 'Confirm variable is numeric and spelling matches.'
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
            question: 'Order: temporary subset workflow in Stata:',
            items: [
              { id: 'a', text: 'restore' },
              { id: 'b', text: 'preserve' },
              { id: 'c', text: 'keep if ...' },
              { id: 'd', text: 'run analysis' }
            ],
            correctOrder: ['b', 'c', 'd', 'a'],
            feedback: { correct: 'Good!', incorrect: 'preserve → keep if → analyze → restore.' }
          },
          {
            id: 'q4',
            type: 'multiple_choice',
            question: '`keep if` without preserve:',
            options: [
              { id: 'a', text: 'Permanently drops non-matching rows from the dataset in memory' },
              { id: 'b', text: 'Never changes data' },
              { id: 'c', text: 'Only affects graphs' },
              { id: 'd', text: 'Exports to CSV automatically' }
            ],
            correct: 'a',
            feedback: {
              correct: 'Right — use preserve/restore or reload if you need the full data back.',
              incorrect: 'keep if removes rows from memory until you reload or restore.'
            }
          },
          ...m5YouDoCommon
        ]
      }
    }
  }
]
