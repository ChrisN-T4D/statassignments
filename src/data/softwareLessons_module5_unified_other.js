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
      'Build histograms, boxplots, and bar charts with Chart Builder',
      'Use Select Cases with logical expressions to analyze subsets',
      'Use Compute Variable and Recode into Different Variables to center, transform, and categorize'
    ],
    estimatedTime: 60,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Graphs, Select Cases, and Transformations',
        sections: [
          {
            id: 'creating-histograms',
            title: 'Charts in Chart Builder',
            objectives: ['Build a histogram', 'Build a boxplot and a bar chart', 'Read distribution shape'],
            estimatedTime: 20,
            content: [
              {
                type: 'callout',
                style: 'tip',
                content: '<strong>Dataset (Tools bar):</strong> Learn uses <strong>bmi_and_exercise.csv</strong> (open it with <strong>File &rarr; Open &rarr; Data&hellip;</strong>, Files of type: Text). Apply uses <strong>personality_data.csv</strong>. Before graphing, check in Variable View that numeric variables are <strong>Scale</strong> and category variables are <strong>Nominal</strong> or <strong>Ordinal</strong>; Chart Builder uses Measure to offer the right options.'
              },
              {
                type: 'step_sequence',
                steps: [
                  { step: 1, title: 'Open Chart Builder', description: 'Choose <strong>Graphs &rarr; Chart Builder&hellip;</strong>. If SPSS reminds you to check measurement levels, click <strong>OK</strong>.' },
                  { step: 2, title: 'Pick the chart', description: 'In the <strong>Gallery</strong> tab choose <strong>Histogram</strong> (or <strong>Boxplot</strong>, or <strong>Bar</strong>) and drag the first picture (<em>Simple &hellip;</em>) up into the preview area.' },
                  { step: 3, title: 'Add the variable', description: 'Drag <strong>bmi</strong> from the variable list onto the x-axis box (for a boxplot, onto the y-axis). For a bar chart of counts, drag a categorical variable onto the x-axis.' },
                  { step: 4, title: 'Run and read', description: 'Click <strong>OK</strong>. The chart appears in the Viewer. Double-click it to open the Chart Editor and change titles, bin width, or colors.' }
                ]
              },
              {
                type: 'text',
                content: 'Read a histogram for <strong>shape</strong>: is it symmetric or skewed (long tail to one side)? One peak or two? Are there bars far from the rest? For bmi, compare the histogram with the skewness value from Module 4. For a boxplot, the thick line is the median, the box is the middle half (Q1 to Q3), and circles beyond the whiskers are potential outliers (SPSS prints their row numbers).'
              },
              {
                type: 'callout',
                style: 'tip',
                content: 'Histogram: continuous data. Bar chart: categories. Boxplot: compare groups or spot outliers. Scatterplot (Scatter/Dot gallery): two continuous variables.'
              }
            ]
          },
          {
            id: 'filtering-data',
            title: 'Select Cases and logical expressions',
            objectives: ['Include rows by condition', 'Write a logical expression with AND/OR', 'Turn selection off'],
            estimatedTime: 15,
            content: [
              {
                type: 'step_sequence',
                steps: [
                  { step: 1, title: 'Open Select Cases', description: 'Choose <strong>Data &rarr; Select Cases&hellip;</strong>.' },
                  { step: 2, title: 'Set the condition', description: 'Choose <strong>If condition is satisfied</strong>, click <strong>If&hellip;</strong>, type <strong>bmi >= 25</strong>, and click <strong>Continue</strong>.' },
                  { step: 3, title: 'Apply', description: 'Leave Output on <strong>Filter out unselected cases</strong> and click <strong>OK</strong>. Unselected rows get a slash through their row number.' },
                  { step: 4, title: 'Check and turn off', description: 'Run Descriptives to see the smaller N. When finished, go back to <strong>Data &rarr; Select Cases&hellip;</strong>, choose <strong>All cases</strong>, and click OK.' }
                ]
              },
              {
                type: 'definition_list',
                items: [
                  { term: '=  and  ~=', icon: '=', definition: 'Equal and not equal in a condition. SPSS uses a single <code>=</code> for equality; <code>==</code> is an error.', color: '#3b82f6' },
                  { term: '>=  <=  >  <', icon: '≥', definition: '<code>bmi &gt;= 25</code> keeps BMI of 25 and above.', color: '#7c3aed' },
                  { term: 'AND / OR / NOT', icon: '&', definition: '<code>bmi &gt;= 25 AND exercise_per_week &lt; 2</code> needs both. Use parentheses to control grouping.', color: '#10b981' }
                ]
              },
              {
                type: 'callout',
                style: 'warning',
                content: 'Never choose <strong>Delete unselected cases</strong> in Select Cases. It removes rows permanently. Always note the N and the condition when you report results from a selected subset.'
              }
            ]
          },
          {
            id: 'transforming-variables',
            title: 'Compute Variable and Recode',
            objectives: ['Center a variable', 'Apply a function', 'Create categories with Recode into Different Variables'],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content: '<strong>Compute Variable</strong> (<em>Transform &rarr; Compute Variable&hellip;</em>): type a name in <strong>Target Variable</strong> and a formula in <strong>Numeric Expression</strong>. To <strong>center</strong> bmi, first read its mean from Descriptives (29.81), then enter <code>bmi - 29.81</code> for <code>bmi_c</code>. SPSS has no function that returns the column mean inside Compute (<code>MEAN()</code> averages across the variables you list for each row), so type in the mean from your output. Other expressions: <code>ABS(bmi_c)</code>, <code>LN(bmi)</code>, <code>LG10(bmi)</code>, <code>SQRT(bmi)</code>.'
              },
              {
                type: 'text',
                content: '<strong>Recode</strong> to make categories: <em>Transform &rarr; Recode into Different Variables&hellip;</em>. Move <strong>bmi</strong> in, name the output <code>bmi_cat</code>, click <strong>Change</strong>, then <strong>Old and New Values&hellip;</strong>. Add the rules <em>Range, LOWEST through 18.49 &rarr; 1</em>, <em>Range 18.5 through 24.99 &rarr; 2</em>, <em>Range, value through HIGHEST: 25 &rarr; 3</em>, and finish with Continue and OK. In Variable View add value labels (1 = Underweight, 2 = Normal, 3 = Overweight) and set Measure to Ordinal.'
              },
              {
                type: 'callout',
                style: 'warning',
                content: 'Always choose <strong>Into Different Variables</strong>, not <em>Into Same Variables</em>, which overwrites your original data. Check every new variable with Descriptives (min and max) or Frequencies.'
              },
              {
                type: 'callout',
                style: 'tip',
                content: 'For the same transformation on several variables, click <strong>Paste</strong> instead of OK, copy the COMPUTE line in the Syntax Editor, change the variable names, and choose <strong>Run &rarr; All</strong>.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice: SPSS',
        instructions: 'Use bmi_and_exercise.csv from the Tools bar.',
        steps: [
          {
            instruction: 'Open bmi_and_exercise.csv, then use Graphs > Chart Builder to draw a histogram of bmi.',
            hint: 'Gallery: Histogram, then drag the first picture into the preview area and drag bmi onto the x-axis.',
            checkpoint: 'A histogram of bmi appears in the Viewer. You can say whether it is symmetric or skewed.'
          },
          {
            instruction: 'Draw a boxplot of bmi (Chart Builder > Boxplot > Simple Boxplot).',
            hint: 'Drag bmi onto the y-axis.',
            checkpoint: 'You can point to the median, the box, and any circles beyond the whiskers.'
          },
          {
            instruction: 'Select Cases: Data > Select Cases > If condition is satisfied, with bmi >= 25. Run Descriptives on bmi and note N.',
            hint: 'Unselected rows have a slash through their row number.',
            checkpoint: 'N is smaller than 250 and the minimum is at least 25.'
          },
          {
            instruction: 'Turn the selection off (Data > Select Cases > All cases) and run Descriptives again.',
            hint: 'The status bar no longer says Filter On.',
            checkpoint: 'N is back to 250.'
          },
          {
            instruction: 'Compute bmi_c = bmi minus the mean from Descriptives, then check that its mean is about 0.',
            hint: 'Transform > Compute Variable. Numeric Expression: bmi - 29.81',
            checkpoint: 'The new column bmi_c appears in Data View and its mean is essentially 0.'
          },
          {
            instruction: 'Recode bmi into Different Variables: under 18.5, 18.5 to under 25, 25 and over. Add value labels, then run Frequencies on bmi_cat.',
            hint: 'Use Range, LOWEST through value and Range, value through HIGHEST.',
            checkpoint: 'The Frequencies table has three labeled categories that add up to 250.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [
          {
            id: 'm5-spss-filter',
            scenario: 'Select Cases with the condition Gender = "F" selects 0 cases.',
            errorMessage: 'No cases selected',
            options: [
              'The values may be coded differently (for example 1/2, or "Female"); check Frequencies and Value Labels',
              'SPSS cannot select cases',
              'You must delete the other rows first',
              'Use Excel only'
            ],
            correct: 0,
            explanation: 'The condition must match the stored values exactly, including case for text. Run Frequencies on the variable first to see what values it holds.'
          },
          {
            id: 'm5-spss-equals',
            scenario: 'You typed bmi == 25 in the Select Cases If box and SPSS shows a syntax error.',
            errorMessage: 'Syntax error',
            options: [
              'SPSS uses a single = for equality in a condition: bmi = 25',
              'Select Cases cannot use numbers',
              'The variable must be String',
              'Restart SPSS'
            ],
            correct: 0,
            explanation: 'Many programs use ==, but SPSS uses a single = for comparison in conditions, and ~= for not equal.'
          },
          {
            id: 'm5-spss-recode-same',
            scenario: 'You recoded Age into three groups with Recode into Same Variables. Now you cannot get the original ages back.',
            errorMessage: 'No error message; the original values are gone.',
            options: [
              'Recode into Same Variables overwrote the original. Use Into Different Variables next time and keep the original file',
              'SPSS always stores a backup',
              'Restart SPSS and the ages return',
              'Change Measure to Scale'
            ],
            correct: 0,
            explanation: 'Into Same Variables replaces the old values. Recoding into a new variable keeps the original data intact.'
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
