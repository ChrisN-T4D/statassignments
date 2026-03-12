/**
 * Excel guides based on Stats Made Easy (statsmadeasy.com/excel-guides):
 * 1. Get your Data Ready  2. Data Tables & Filters  3. Pivot Tables
 */

export const excelGuidesLessons = [
  {
    id: 'excel-get-data-ready',
    module: 'stats-module-3',
    title: 'Get your Data Ready',
    software: 'excel',
    guideOrder: 2,
    objectives: [
      'Clean an existing dataset in Excel',
      'Delete unnecessary columns and rows',
      'Rename variables and handle missing values',
      'Create a codebook to document your variables'
    ],
    estimatedTime: 35,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Cleaning Data and Creating a Codebook',
        sections: [
          {
            id: 'cleaning-overview',
            title: 'Cleaning your Dataset',
            objectives: [
              'Delete variables (columns) that are not required',
              'Rename variables where necessary',
              'Delete unnecessary header rows',
              'Remove incomplete observations',
              'Replace missing value codes (e.g. -99) with na or blank'
            ],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content: 'Often you already have a dataset from a survey tool (Qualtrics, SurveyMonkey, MS Forms). This guide shows how to get your data ready for analysis in Excel. Always <strong>save a copy of your raw data</strong> before making changes.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Delete variables (columns) that are not required',
                    description: 'Go through your variables and decide which you need. Select the columns you want to remove (click the column letter, Ctrl/Cmd to select multiple), then <strong>right-click → Delete</strong>. Keep only the columns you will use for analysis or that you need for reference.'
                  },
                  {
                    step: 2,
                    title: 'Rename variables where necessary',
                    description: 'If column names are long survey questions (e.g. "What is your age?"), rename them to short, clear names (e.g. <strong>Age</strong>, <strong>Gender</strong>). Click the header cell and type the new name. Keep a record of the original questions for your codebook or for variable descriptions in Jamovi.'
                  },
                  {
                    step: 3,
                    title: 'Delete unnecessary rows (e.g. extra header rows)',
                    description: 'Many exports include extra rows above the data (instructions, question text). Delete those rows so you have <strong>exactly one header row</strong> with variable names. Select the rows to remove, right-click → Delete.'
                  },
                  {
                    step: 4,
                    title: 'Remove incomplete observations',
                    description: 'Survey platforms often add a "progress" or "completion" column. Decide a cutoff (e.g. keep only respondents who completed at least 80%). Go to <strong>Data → Filter</strong> (toggle Filter on). Click the filter arrow on the progress column, sort or filter to show rows below your threshold, select those rows, and delete them. Remove any duplicate header rows; you should have one header row at the top.'
                  },
                  {
                    step: 5,
                    title: 'Handle missing data',
                    description: 'Check your survey or dataset documentation for the missing-value code (often <strong>-99</strong>). Jamovi recognises blanks and <strong>na</strong> as missing. In Excel: use <strong>Find & Replace</strong> (Ctrl+H / Cmd+H). In "Find what" enter the missing code (e.g. -99); in "Replace with" enter <strong>na</strong> or leave blank. Click Replace All. Your missing values are now in a form that other software will recognise.'
                  }
                ]
              }
            ]
          },
          {
            id: 'codebook',
            title: 'Create a Codebook',
            objectives: [
              'List variable names and descriptions',
              'Document data types and category codes'
            ],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content: 'A <strong>codebook</strong> helps you and others make sense of the dataset. It should include: variable names, descriptions (e.g. the full question text), type of data, and group details (e.g. Male = 0, Female = 1). Create a separate sheet or workbook with one row per variable and columns for name, description, type, and codes.'
              },
              {
                type: 'callout',
                style: 'tip',
                content: 'You can add the same descriptions into the variable description/label field in Jamovi after importing your cleaned CSV.'
              }
            ]
          }
        ]
      },
      weDo: { type: 'guided_practice', title: 'Guided Practice', instructions: 'Try cleaning a small dataset: delete one column, rename a header, and use Find & Replace for a missing value.', steps: [] },
      selfCheck: { screenshotRecognition: [], errorDiagnostic: [], outputInterpretation: [] },
      youDo: { type: 'independent_practice', title: 'Apply Your Skills', summary: 'Practice cleaning a dataset and creating a simple codebook.', instructions: 'Use your own data or a sample CSV and apply the cleaning steps.', questions: [] }
    }
  },
  {
    id: 'excel-data-tables',
    module: 'stats-module-3',
    title: 'Data Tables & Filters',
    software: 'excel',
    guideOrder: 3,
    objectives: [
      'Create an Excel Data Table (Format as Table)',
      'Add and remove rows and columns in a table',
      'Use table filters to explore subsets of data',
      'Use basic formulas in table columns'
    ],
    estimatedTime: 30,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Data Tables and Filtering',
        sections: [
          {
            id: 'create-table',
            title: 'Create a Data Table',
            objectives: ['Create a table from your dataset', 'Use the table for filtering and later for Pivot Tables'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content: 'Excel <strong>Data Tables</strong> (Format as Table) make it easier to filter, sort, and manage your data. You can also use a table as the source for a Pivot Table later.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Select a cell within your dataset',
                    description: 'Click any cell that has data (including the header row).'
                  },
                  {
                    step: 2,
                    title: 'Format as Table',
                    description: 'Go to <strong>Home → Format as Table</strong> (or press <strong>Ctrl+T</strong> on PC / <strong>Command+T</strong> on Mac). Choose a style from the menu.'
                  },
                  {
                    step: 3,
                    title: 'Confirm the range and header',
                    description: 'In the dialog, check that the cell range includes all your data. Ensure <strong>My table has headers</strong> is checked so the first row is treated as variable names. Click OK.'
                  }
                ]
              }
            ]
          },
          {
            id: 'filtering',
            title: 'Filtering your Data',
            objectives: ['Use the filter dropdowns on table columns', 'Clear filters to show all data again'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content: 'Once your data are in a table, each header cell has a <strong>filter arrow</strong>. Click it to filter by that variable.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Apply a filter',
                    description: 'Click the dropdown arrow on the column you want to filter. Uncheck "Select All" and check only the categories or values you want to keep. Click OK. The table now shows only rows that match.'
                  },
                  {
                    step: 2,
                    title: 'Clear the filter',
                    description: 'Click the same dropdown; choose <strong>Clear Filter</strong>. The full dataset is visible again. You can apply filters on multiple columns; each filter narrows the subset further.'
                  }
                ]
              }
            ]
          },
          {
            id: 'formulas',
            title: 'Using Formulas in Tables',
            objectives: ['Use basic formulas (e.g. =, AVERAGE, SUM) in table columns'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content: 'In any cell, type <strong>=</strong> to start a formula. You can use functions like <strong>AVERAGE</strong>, <strong>SUM</strong>, <strong>MIN</strong>, <strong>MAX</strong>, and arithmetic (+, -, *, /). Table column names can be used in formulas (e.g. =[Score]/10). New columns in the table can calculate values from other columns.'
              }
            ]
          }
        ]
      },
      weDo: { type: 'guided_practice', title: 'Guided Practice', instructions: 'Create a table from a small dataset and try filtering by one variable.', steps: [] },
      selfCheck: { screenshotRecognition: [], errorDiagnostic: [], outputInterpretation: [] },
      youDo: { type: 'independent_practice', title: 'Apply Your Skills', summary: 'Practice creating tables and filtering.', instructions: 'Format your data as a table and explore it with filters.', questions: [] }
    }
  },
  {
    id: 'excel-pivot-tables',
    module: 'stats-module-3',
    title: 'Pivot Tables',
    software: 'excel',
    guideOrder: 4,
    objectives: [
      'Create a Pivot Table from a data table',
      'Place variables in Rows, Columns, and Values',
      'Summarise values by Count, Average, or other statistics',
      'Show values as row or column percentages',
      'Use filters and slicers on Pivot Tables'
    ],
    estimatedTime: 35,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Pivot Tables',
        sections: [
          {
            id: 'pivot-overview',
            title: 'Pivot Tables Overview',
            objectives: ['Understand what a Pivot Table does', 'Know that row/column variables should be categorical'],
            estimatedTime: 5,
            content: [
              {
                type: 'text',
                content: 'A <strong>Pivot Table</strong> summarises your data into a contingency-style table: you choose which variables go in <strong>Rows</strong> and <strong>Columns</strong>, and what <strong>Values</strong> to show (e.g. count, average). The variables you use for rows and columns should be <strong>categorical</strong> (nominal or ordinal).'
              },
              {
                type: 'callout',
                style: 'info',
                content: '<strong>Row and column percentages:</strong> Column percentages show the proportion in each row within a column. Row percentages show the proportion in each column within a row. Use "Show values as" in the Pivot Table to display percentages.'
              }
            ]
          },
          {
            id: 'create-pivot',
            title: 'Create a Pivot Table',
            objectives: ['Insert a Pivot Table from your data table', 'Drag fields into Rows, Columns, and Values'],
            estimatedTime: 15,
            content: [
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Summarise with Pivot Table',
                    description: 'Click a cell in your <strong>data table</strong>. Go to <strong>Table Design → Summarise with Pivot Table</strong> (or Insert → PivotTable). Confirm the range and choose where to put the Pivot Table (new sheet or existing). Click OK.'
                  },
                  {
                    step: 2,
                    title: 'Add fields',
                    description: 'In the Pivot Table Fields pane, drag your categorical variable(s) into <strong>Rows</strong> and/or <strong>Columns</strong>. Drag the variable you want to summarise (e.g. a count or a numeric variable) into <strong>Values</strong>. The table updates as you add or move fields.'
                  },
                  {
                    step: 3,
                    title: 'Change how values are summarised',
                    description: 'By default, numeric values may show as Sum. Right-click a value in the Pivot Table → <strong>Summarise values by</strong> → choose <strong>Average</strong>, <strong>Count</strong>, Min, Max, etc. For categorical data, use Count.'
                  },
                  {
                    step: 4,
                    title: 'Show values as percentages',
                    description: 'Right-click a value → <strong>Show values as</strong> → choose <strong>% of Row Total</strong> or <strong>% of Column Total</strong> to get row or column percentages.'
                  }
                ]
              }
            ]
          },
          {
            id: 'filters-slicers',
            title: 'Filters and Slicers',
            objectives: ['Use report filters or slicers to limit the data in the Pivot Table'],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content: 'You can filter the data in the Pivot Table by dragging a field into <strong>Filters</strong>, or by adding a <strong>Slicer</strong>: go to PivotTable Analyze → Insert Slicer, choose a field, and use the slicer buttons to show only selected categories. Clear filters when you want to see all data again.'
              }
            ]
          }
        ]
      },
      weDo: { type: 'guided_practice', title: 'Guided Practice', instructions: 'Create a Pivot Table with one row variable and one value (Count or Average).', steps: [] },
      selfCheck: { screenshotRecognition: [], errorDiagnostic: [], outputInterpretation: [] },
      youDo: { type: 'independent_practice', title: 'Apply Your Skills', summary: 'Practice building Pivot Tables and showing percentages.', instructions: 'Build a Pivot Table and try different "Show values as" options.', questions: [] }
    }
  }
]
