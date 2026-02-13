// Statistics Class - Jamovi Practice Exercises
// Practice problems for learning statistical concepts and Jamovi software skills
// Organized by module to match the course structure

export const statisticsModules = [
  {
    id: 'module-2',
    title: 'Module 2 - Research Design & Measurement',
    description: 'Understanding levels of measurement and evaluating reliability/validity',
    order: 1
  },
  {
    id: 'module-3',
    title: 'Module 3 - Jamovi and Data Handling',
    description: 'Learning the Jamovi interface, importing data, and basic operations',
    order: 2
  },
  {
    id: 'module-4',
    title: 'Module 4 - Descriptive Statistics',
    description: 'Calculating descriptive statistics, deviation scores, and z-scores',
    order: 3
  },
  {
    id: 'module-5',
    title: 'Module 5 - Graphing and Visualization',
    description: 'Creating histograms, bar charts, and transforming data',
    order: 4
  },
  {
    id: 'module-6',
    title: 'Module 6 - Probability and Sampling',
    description: 'Normal distribution, probability calculations, sampling distributions',
    order: 5
  },
  {
    id: 'module-7',
    title: 'Module 7 - Hypothesis Testing',
    description: 'Writing hypotheses and choosing the right statistical test',
    order: 6
  },
  {
    id: 'module-8',
    title: 'Module 8 - Correlation and Linear Regression',
    description: 'Correlation coefficients, scatterplots, simple and multiple regression',
    order: 7
  }
]

// Software practice tasks ('To Do in Software') organized by module
export const statisticsExercises = [
  // ============ MODULE 2: Research Design & Measurement ============
  {
    module: 'module-2',
    topic: 'levels-of-measurement',
    title: 'Identify Variable Types in Jamovi',
    description: 'Practice identifying and setting the correct measurement level for variables',
    instructions: 'In Jamovi, you need to correctly identify the measurement level (Nominal, Ordinal, or Continuous) for each variable. Open the variable editor and set the appropriate type.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Double-click on a variable name to open the variable editor. Look for the "Measure type" dropdown.',
    expected_selections: [
      { menu: 'data', option: 'variable-editor' }
    ],
    sample_data: {
      columns: ['ParticipantID', 'Gender', 'AgeGroup', 'SatisfactionRating', 'TestScore'],
      rows: [
        { ParticipantID: 1, Gender: 'Male', AgeGroup: '18-25', SatisfactionRating: 4, TestScore: 85 },
        { ParticipantID: 2, Gender: 'Female', AgeGroup: '26-35', SatisfactionRating: 5, TestScore: 92 }
      ]
    },
    success_message: 'Correct! The variable editor lets you set measurement levels: Nominal for categories without order, Ordinal for ranked categories, and Continuous for numeric measurements.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-2',
    topic: 'reliability-validity',
    title: 'Calculate Cronbach\'s Alpha for Reliability',
    description: 'Navigate to the reliability analysis to assess internal consistency',
    instructions: 'You have a scale with multiple items measuring anxiety. Find the menu path in Jamovi to calculate Cronbach\'s alpha to assess the scale\'s reliability.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Reliability analysis is found under Analyses > Factor > Reliability Analysis',
    expected_selections: [
      { menu: 'analyses', option: 'factor', subOption: 'reliability' }
    ],
    sample_data: {
      columns: ['ID', 'Anxiety1', 'Anxiety2', 'Anxiety3', 'Anxiety4', 'Anxiety5'],
      rows: [
        { ID: 1, Anxiety1: 3, Anxiety2: 4, Anxiety3: 3, Anxiety4: 4, Anxiety5: 3 },
        { ID: 2, Anxiety1: 2, Anxiety2: 2, Anxiety3: 3, Anxiety4: 2, Anxiety5: 2 }
      ]
    },
    success_message: 'Correct! Analyses > Factor > Reliability Analysis calculates Cronbach\'s alpha. Values above .70 generally indicate acceptable reliability.',
    order: 2,
    is_active: true
  },

  // ============ MODULE 3: Jamovi and Data Handling ============
  {
    module: 'module-3',
    topic: 'jamovi-interface',
    title: 'Open a Data File in Jamovi',
    description: 'Import a CSV data file into Jamovi',
    instructions: 'You need to open a CSV data file in Jamovi. Find the correct menu to import your data.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Look in the File menu or use the hamburger menu (three lines) in the top-left corner',
    expected_selections: [
      { menu: 'file', option: 'open' }
    ],
    sample_data: null,
    success_message: 'Correct! Use File > Open (or the hamburger menu) to import CSV, Excel, SPSS, and other data formats into Jamovi.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'jamovi-interface',
    title: 'Add a New Variable',
    description: 'Add a new computed variable to your dataset',
    instructions: 'You need to create a new variable that calculates the total score from multiple items. Find where to add a new computed variable.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Look in the Data tab or right-click on the variable header area',
    expected_selections: [
      { menu: 'data', option: 'add-variable', subOption: 'computed' }
    ],
    sample_data: {
      columns: ['ID', 'Item1', 'Item2', 'Item3'],
      rows: [
        { ID: 1, Item1: 4, Item2: 5, Item3: 3 },
        { ID: 2, Item1: 3, Item2: 4, Item3: 4 }
      ]
    },
    success_message: 'Correct! Data > Add > Computed Variable lets you create new variables using formulas like SUM(Item1, Item2, Item3).',
    order: 2,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'descriptive-stats',
    title: 'Calculate Basic Descriptive Statistics',
    description: 'Calculate mean, median, and standard deviation for a variable',
    instructions: 'Calculate the mean, median, and standard deviation for exam scores. Navigate to the correct analysis.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Descriptive statistics are under Analyses > Exploration',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
    ],
    sample_data: {
      columns: ['StudentID', 'ExamScore'],
      rows: [
        { StudentID: 1, ExamScore: 78 },
        { StudentID: 2, ExamScore: 85 },
        { StudentID: 3, ExamScore: 92 }
      ]
    },
    success_message: 'Correct! Analyses > Exploration > Descriptives provides measures of central tendency (mean, median, mode) and variability (SD, variance, range).',
    order: 3,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'add-ons',
    title: 'Install Add-On Modules (scatr and GAMLj)',
    phase: 'practice',
    description: 'Install the scatr and GAMLj modules from the jamovi Modules library',
    instructions: 'Install the scatr and GAMLj modules from the jamovi Modules library.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Open the Modules library (look for the "+" or "Modules" button in jamovi). Search for each module and click Install. Verify both appear in your installed modules list.',
    submission: 'Screenshot showing scatr and GAMLj listed as installed modules.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'data-handling',
    title: 'Import CSV and Set Measurement Levels',
    phase: 'practice',
    description: 'Import a CSV file and configure measurement levels (Nominal, Ordinal, or Continuous) for at least five variables',
    instructions: 'Import a CSV file and set the correct measurement levels (Nominal, Ordinal, or Continuous) for at least five variables.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use File > Open to import your CSV. Then go to the Variables tab, click each column header to select it, and use the "Measure type" dropdown in the right panel. Nominal = unordered categories, Ordinal = ordered categories, Continuous = numeric measurements.',
    submission: 'Saved .omv file showing measurement levels set correctly.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'computation',
    title: 'Create a Computed Variable',
    phase: 'practice',
    description: 'Create a computed variable that sums multiple item variables to calculate a total score',
    instructions: 'Create a computed variable that calculates a total score by summing multiple item variables.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'In the Data tab, add a Computed Variable. Use a formula like Item1 + Item2 + Item3 or SUM(Item1, Item2, Item3). Variable names are case-sensitive.',
    submission: 'Screenshot of the formula panel and the new computed column.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'computation',
    title: 'Reverse-Score a Likert Item',
    phase: 'practice',
    description: 'Reverse-score a Likert item (1-5 scale) and verify the transformation by comparing original and reversed values',
    instructions: 'Reverse-score one Likert item (1-5 scale) and verify the transformation by comparing at least five pairs of original and reversed values.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Create a computed variable with formula: 6 - ItemName (for 1-5 scale). For other scales, use (max + 1) - original. Verify by checking that 1→5, 2→4, 3→3, 4→2, 5→1.',
    submission: 'Screenshot showing the transform and five paired original/reversed values.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'computation',
    title: 'Recode Continuous to 3-Level Category',
    phase: 'practice',
    description: 'Recode a continuous variable into three categories (Low, Medium, High) using appropriate cut points',
    instructions: 'Recode a continuous variable into three categories (Low, Medium, High) using appropriate cut points.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Create a computed variable using nested IF statements: IF(Score < 60, "Low", IF(Score < 80, "Medium", "High")). Adjust cut points to match your data distribution. Verify categories are assigned correctly.',
    submission: 'Screenshot of the transform definition.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'data-handling',
    title: 'Apply a Filter and Compare Descriptives',
    phase: 'apply',
    description: 'Create a filter to exclude cases, then run Descriptives with the filter ON and OFF to compare how statistics change',
    instructions: 'Create a filter (e.g., Age >= 18) and run Descriptives with the filter ON and OFF. Compare how the statistics change.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Data > Filters to create a filter with a logical condition. Toggle it on/off and run Descriptives each time. Note how N, mean, and other statistics differ when cases are excluded.',
    submission: 'Screenshots of outputs with filter ON and OFF.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'r-setup',
    title: 'Install R and RStudio',
    description: 'Install R and RStudio, then open RStudio and create a new R script',
    instructions: 'Install R and RStudio. Open RStudio and create a new R script (File > New File > R Script).',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'After installing, open RStudio and confirm the Console prompt appears.',
    submission: 'Screenshot showing RStudio open with a new script tab.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'r-import',
    title: 'Import a CSV in R',
    description: 'Set your working directory and import a CSV file into R using read.csv(), then verify with head()',
    instructions: 'Set your working directory and import a CSV with read.csv(). Then run head() to verify the data loaded.',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'Use data <- read.csv("data.csv") and then head(data).',
    submission: 'Screenshot or script showing read.csv() and head(data) output.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'r-computed',
    title: 'Create a Computed Variable in R',
    description: 'Create a new variable that sums multiple item variables to calculate a total score',
    instructions: 'Create a new variable Total by summing Item1, Item2, and Item3. Verify the new column with head().',
    software_type: 'r',
    exercise_type: 'instructional',
    hint: 'Use data$Total <- data$Item1 + data$Item2 + data$Item3.',
    submission: 'Screenshot or script showing the new Total column in head(data).',
    order: 3,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'spss-setup',
    title: 'Open SPSS and Create a New Dataset',
    description: 'Create a new SPSS dataset and define a variable with appropriate type and measurement level',
    instructions: 'Open SPSS and create a new dataset (File > New > Data). In Variable View, add a variable named Score with Type Numeric and Measure Scale.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'Use Variable View to define the variable, then return to Data View.',
    submission: 'Screenshot of Variable View showing Score with Type Numeric and Measure Scale.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'spss-import',
    title: 'Import a CSV in SPSS',
    description: 'Import a CSV file into SPSS and verify that numeric columns are correctly set to Type Numeric',
    instructions: 'Import a CSV file (File > Open > Data). Confirm the data appear in Data View and that numeric columns are set to Type Numeric.',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'Check Variable View to verify Type and Measure.',
    submission: 'Screenshot of Data View with imported data and Variable View showing types.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'spss-labels',
    title: 'Add Variable Labels and Value Labels',
    description: 'Add variable labels and value labels to improve dataset readability',
    instructions: 'Add a Variable Label for one variable and Value Labels for a categorical variable (e.g., 1=Control, 2=Treatment).',
    software_type: 'spss',
    exercise_type: 'instructional',
    hint: 'Use the Label and Values columns in Variable View.',
    submission: 'Screenshot showing the labels set in Variable View.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'excel-setup',
    title: 'Create a Clean Excel Dataset',
    description: 'Create a new Excel worksheet with proper headers and enter data in a rectangular format',
    instructions: 'Create a new Excel sheet with headers in row 1 (ID, Score, Group). Enter at least 5 rows of data below.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'Keep one column per variable and one row per case.',
    submission: 'Screenshot showing the dataset with headers and 5 rows of data.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'excel-import',
    title: 'Import a CSV in Excel',
    description: 'Open a CSV file in Excel and remove any blank rows or columns within the dataset',
    instructions: 'Open a CSV file in Excel and remove any blank rows or columns inside the dataset.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'Use File > Open and delete empty rows/columns that break the data block.',
    submission: 'Screenshot showing the cleaned dataset.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'excel-formula',
    title: 'Compute a Mean with AVERAGE()',
    description: 'Use the AVERAGE() function to calculate the mean of a numeric column',
    instructions: 'Use =AVERAGE() to compute the mean of the Score column.',
    software_type: 'excel',
    exercise_type: 'instructional',
    hint: 'If scores are in B2:B6, use =AVERAGE(B2:B6).',
    submission: 'Screenshot showing the AVERAGE() formula and result.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'stata-setup',
    title: 'Load a Sample Dataset in Stata',
    description: 'Load a built-in Stata dataset using sysuse and inspect variables with describe',
    instructions: 'Run sysuse auto in Stata to load the sample dataset, then run describe to list variables.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'Type sysuse auto, then describe.',
    submission: 'Screenshot of the Results window showing describe output.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'stata-import',
    title: 'Import a CSV in Stata',
    description: 'Import a CSV file using import delimited and verify variables appear in the Variables pane',
    instructions: 'Import a CSV with import delimited using "data.csv", clear. Verify variables in the Variables pane.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'Replace data.csv with your file name.',
    submission: 'Screenshot showing the Variables pane after import.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'stata-save',
    title: 'Save a Stata Dataset',
    description: 'Save your imported dataset as a Stata .dta file using the save command',
    instructions: 'After importing, save the dataset using save "data_clean.dta", replace.',
    software_type: 'stata',
    exercise_type: 'instructional',
    hint: 'The replace option overwrites if the file exists.',
    submission: 'Screenshot showing the save command in Results.',
    order: 3,
    is_active: true
  },

  // ============ MODULE 4: Descriptive Statistics ============
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    title: 'Calculate Deviation Scores',
    description: 'Create a computed variable for deviation scores (X - Mean)',
    instructions: 'Create a new computed variable that calculates how far each score deviates from the mean. You\'ll need to use a formula.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'First add a computed variable, then use the formula: Score - VMEAN(Score)',
    expected_selections: [
      { menu: 'data', option: 'add-variable', subOption: 'computed' }
    ],
    sample_data: {
      columns: ['ID', 'Score'],
      rows: [
        { ID: 1, Score: 75 },
        { ID: 2, Score: 82 },
        { ID: 3, Score: 68 }
      ]
    },
    success_message: 'Correct! Use Data > Add > Computed Variable with formula: Score - VMEAN(Score). Deviation scores show how far each value is from the mean.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'z-scores',
    title: 'Calculate Z-Scores in Jamovi',
    description: 'Standardize scores by converting them to z-scores',
    instructions: 'You need to convert raw test scores to z-scores (standardized scores). Find how to create z-scores in Jamovi.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Z-scores can be calculated using a computed variable with the Z() function, or through Exploration > Descriptives with the "Z-scores" option checked',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
    ],
    sample_data: {
      columns: ['StudentID', 'TestScore'],
      rows: [
        { StudentID: 1, TestScore: 85 },
        { StudentID: 2, TestScore: 72 },
        { StudentID: 3, TestScore: 91 }
      ]
    },
    success_message: 'Correct! In Descriptives, check "Z-scores" under the options to add a standardized version of your variable to the dataset.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'normality',
    title: 'Test for Normality',
    description: 'Check if your data is normally distributed using Shapiro-Wilk test',
    instructions: 'Before running parametric tests, you should check if your data is normally distributed. Find the normality test in Jamovi.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Normality tests are in Exploration > Descriptives, under the "Statistics" options',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
    ],
    sample_data: {
      columns: ['ID', 'ReactionTime'],
      rows: [
        { ID: 1, ReactionTime: 245 },
        { ID: 2, ReactionTime: 312 },
        { ID: 3, ReactionTime: 278 }
      ]
    },
    success_message: 'Correct! In Descriptives, expand "Statistics" and check "Shapiro-Wilk" under normality tests. p > .05 suggests normal distribution.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    title: 'Report Descriptives for One Variable',
    phase: 'practice',
    description: 'Summarize mean, median, SD, and min/max from Descriptives',
    instructions: 'Run Exploration > Descriptives for one continuous variable and write a short summary of mean, median, SD, and min/max.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use the Descriptives table and read off the required statistics.',
    submission: 'Screenshot of jamovi output and a short write-up.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    title: 'Descriptives Split by Group',
    phase: 'practice',
    description: 'Compare center and spread between two groups',
    instructions: 'Run Descriptives split by a grouping variable and identify which group has higher center and larger spread.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Split by to separate groups, then compare means/medians and SD/IQR.',
    submission: 'Output screenshot and 2-3 sentences comparing groups.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'z-scores',
    title: 'Create and Inspect Z-Scores',
    phase: 'practice',
    description: 'Create z-scores and identify extreme values',
    instructions: 'Create a z-score version of a variable and identify any cases with extreme standardized values.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Descriptives or a computed variable with Z(). Choose a cutoff such as |z| >= 2.',
    submission: 'Screenshot showing the z-score column and identified rows.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-4',
    topic: 'descriptive-stats',
    title: 'Evaluate Skew and Outliers',
    phase: 'apply',
    description: 'Use plots to justify reporting median/IQR',
    instructions: 'Use Descriptives plots (histogram/boxplot) to argue whether the distribution is skewed or outlier-prone and justify reporting median/IQR.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Look for asymmetry, long tails, and isolated points.',
    submission: 'Plot screenshot and a short justification.',
    order: 7,
    is_active: true
  },

  // ============ MODULE 5: Graphing and Visualization ============
  {
    module: 'module-5',
    topic: 'visualizations',
    title: 'Create a Histogram',
    description: 'Visualize the distribution of a continuous variable',
    instructions: 'Create a histogram to visualize the distribution of test scores. Find where to create plots in Jamovi.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Histograms can be created in Exploration > Descriptives under the "Plots" options',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
    ],
    sample_data: {
      columns: ['ID', 'TestScore'],
      rows: [
        { ID: 1, TestScore: 78 },
        { ID: 2, TestScore: 85 },
        { ID: 3, TestScore: 62 }
      ]
    },
    success_message: 'Correct! In Descriptives, expand "Plots" and check "Histogram". You can also add a density curve and Q-Q plot.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'visualizations',
    title: 'Create a Bar Chart for Frequencies',
    description: 'Visualize categorical data with a bar chart',
    instructions: 'Create a bar chart showing the frequency of responses in each category. Find the appropriate menu.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'For categorical variables, use Exploration > Descriptives and check "Bar plot" in Plots',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
    ],
    sample_data: {
      columns: ['ID', 'PreferredColor'],
      rows: [
        { ID: 1, PreferredColor: 'Blue' },
        { ID: 2, PreferredColor: 'Red' },
        { ID: 3, PreferredColor: 'Green' }
      ]
    },
    success_message: 'Correct! For categorical variables, Descriptives will show "Bar plot" option under Plots to display frequencies.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'visualizations',
    title: 'Create a Boxplot',
    description: 'Compare distributions across groups using boxplots',
    instructions: 'Create a boxplot to compare test scores between two groups (treatment vs control).',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Boxplots are in Exploration > Descriptives. Add your continuous variable and split by your grouping variable.',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
    ],
    sample_data: {
      columns: ['ID', 'Group', 'Score'],
      rows: [
        { ID: 1, Group: 'Treatment', Score: 85 },
        { ID: 2, Group: 'Control', Score: 72 }
      ]
    },
    success_message: 'Correct! In Descriptives, add your DV to Variables, your grouping variable to "Split by", then check "Box plot" in Plots.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'visualizations',
    title: 'Histogram with Two Bin Widths',
    phase: 'practice',
    description: 'Compare histogram interpretations using different bin widths',
    instructions: 'Produce a histogram for a continuous variable with two different bin widths and compare the interpretations.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'In Descriptives > Plots, adjust bin width and take two screenshots.',
    submission: 'Two histogram screenshots and 1-2 sentences on differences.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'visualizations',
    title: 'Scatterplot Matrix (Correlation Matrix Plot)',
    phase: 'practice',
    description: 'Create a scatterplot matrix for 3+ continuous variables',
    instructions: 'Use the Correlation Matrix plot option to create a scatterplot matrix and identify one visible relationship.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Analyses > Regression > Correlation Matrix and enable plots.',
    submission: 'Scatterplot matrix screenshot and one identified relationship.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'visualizations',
    title: 'scatr Scatterplot with Regression Line',
    phase: 'apply',
    description: 'Use scatr to create a scatterplot with a fitted line',
    instructions: 'Using the scatr add-on, create a scatterplot with a fitted regression line (and marginal densities if available). Interpret direction and strength.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Open scatr from the Analyses menu after installing the add-on.',
    submission: 'Plot screenshot and a brief interpretation.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'visualizations',
    title: 'scatr Grouped Scatterplots',
    phase: 'apply',
    description: 'Compare relationships by group using color or facets',
    instructions: 'Use scatr to produce grouped scatterplots (color by a categorical variable) and compare relationships by group.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use a grouping variable to color points or facet the plot.',
    submission: 'Plot screenshot and a 3-4 sentence interpretation.',
    order: 7,
    is_active: true
  },

  // ============ MODULE 5: Data Manipulation (Chapter 6) ============
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Create a Frequency Table',
    description: 'Generate frequency counts for a categorical variable',
    instructions: 'Create a frequency table showing counts and percentages for a categorical variable.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Use Exploration > Descriptives and check "Frequency tables"',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
    ],
    sample_data: {
      columns: ['ID', 'FavoriteColor'],
      rows: [
        { ID: 1, FavoriteColor: 'Blue' },
        { ID: 2, FavoriteColor: 'Red' },
        { ID: 3, FavoriteColor: 'Blue' }
      ]
    },
    success_message: 'Correct! In Descriptives, check "Frequency tables" to see counts and percentages for categorical variables.',
    order: 8,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Create a Contingency Table',
    description: 'Cross-tabulate two categorical variables',
    instructions: 'Create a contingency table (crosstab) to see the relationship between two categorical variables.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Use Frequencies > Contingency Tables > Independent Samples',
    expected_selections: [
      { menu: 'analyses', option: 'frequencies', subOption: 'contingency' }
    ],
    sample_data: {
      columns: ['ID', 'Gender', 'PreferredProduct'],
      rows: [
        { ID: 1, Gender: 'Male', PreferredProduct: 'A' },
        { ID: 2, Gender: 'Female', PreferredProduct: 'B' }
      ]
    },
    success_message: 'Correct! Frequencies > Contingency Tables creates a crosstab. Add row and column percentages under "Cells" options.',
    order: 9,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Transform Data with Logical Expressions',
    description: 'Use logical operators to create conditional variables',
    instructions: 'Create a computed variable that uses logical expressions (==, !=, <, >, and, or) to categorize data.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Use Data > Compute and formulas like: IF(Score >= 80, "Pass", "Fail")',
    expected_selections: [
      { menu: 'data', option: 'compute' }
    ],
    sample_data: {
      columns: ['ID', 'Score'],
      rows: [
        { ID: 1, Score: 85 },
        { ID: 2, Score: 72 },
        { ID: 3, Score: 91 }
      ]
    },
    success_message: 'Correct! Use computed variables with IF() statements and logical operators to create conditional transformations.',
    order: 10,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Center a Likert Scale Variable',
    description: 'Transform Likert scores to center them around zero',
    instructions: 'Transform a 1-7 Likert scale so the midpoint (4) becomes 0. This makes the scale range from -3 to +3.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Data > Compute with formula: LikertRaw - 4',
    submission: 'Screenshot showing the original and centered variables side by side.',
    order: 11,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Calculate Opinion Strength with ABS()',
    description: 'Use absolute value to measure strength regardless of direction',
    instructions: 'Create a variable that measures opinion strength using ABS() on centered Likert data.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use ABS(centered_variable) to get strength. Click fx button to find ABS function.',
    submission: 'Screenshot of the formula and resulting opinion strength column.',
    order: 12,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Collapse Continuous Variable into Categories',
    description: 'Recode age into young/adult/older categories',
    instructions: 'Use nested IF statements to collapse a continuous age variable into 3 categories (e.g., 0-20, 21-40, 41-60).',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use: IF(Age >= 0 and Age <= 20, 1, IF(Age >= 21 and Age <= 40, 2, IF(Age >= 41 and Age <= 60, 3)))',
    submission: 'Screenshot showing the nested IF formula and the frequency table of the new categorical variable.',
    order: 13,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Create a Reusable Transform',
    description: 'Use Data > Transform to create a saved transformation',
    instructions: 'Create a transformation using Data > Transform that can be applied to multiple variables. Test by applying it to at least 2 variables.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Transform with $source placeholder. E.g., ABS($source - 4) can be reused on different Likert items.',
    submission: 'Screenshot showing the transform definition and two variables it was applied to.',
    order: 14,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Use Transform with Conditional Rules',
    description: 'Create Low/Medium/High categories using Transform Add Condition',
    instructions: 'Use Data > Transform with the "Add condition" button (+) to create multiple conditional rules.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Click the + button next to the formula box. Add conditions like: if $source <= 20 use "young", if $source <= 40 use "adult", else use "older"',
    submission: 'Screenshot showing the conditional rules in the Transform panel.',
    order: 15,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Filter Data to Extract Subsets',
    description: 'Use filters to include only specific cases in analysis',
    instructions: 'Create a filter to include only cases meeting specific criteria (e.g., Age > 18, or Gender == "Female"). Run Descriptives with filter on and off.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Data > Filters and create expressions like: Age >= 18 or Gender == "Female"',
    submission: 'Screenshot showing the filter formula and descriptives output with the filter active.',
    order: 16,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Use Mathematical Functions',
    description: 'Apply LOG10(), LN(), SQRT(), or EXP() transformations',
    instructions: 'Create a computed variable using at least one mathematical function (logarithm, square root, or exponential) and explain when such transformations are useful.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use fx button to find functions. LOG10() and LN() are useful for skewed data; SQRT() can stabilize variance.',
    submission: 'Screenshot showing the function used and a 2-3 sentence explanation of when it\'s appropriate.',
    order: 17,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Contingency Table with Row and Column Percentages',
    phase: 'practice',
    description: 'Compare interpretations using row vs column percentages',
    instructions: 'Create a contingency table and display it with row percentages, then with column percentages. Explain how the interpretation differs.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Under Cells options, toggle between Row and Column percentages.',
    submission: 'Two screenshots (row % and column %) and 3-4 sentences comparing interpretations.',
    order: 18,
    is_active: true
  },
  {
    module: 'module-5',
    topic: 'data-manipulation',
    title: 'Complex Logical Expression with AND/OR',
    phase: 'apply',
    description: 'Create a filter using multiple logical operators',
    instructions: 'Create a computed variable or filter using complex logical expressions combining AND and OR operators (e.g., (Age >= 18 and Age <= 65) or Status == "Student").',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use parentheses to control order of operations. AND requires both conditions true; OR requires at least one true.',
    submission: 'Screenshot of the formula and resulting values, plus a brief explanation of the logic.',
    order: 19,
    is_active: true
  },

  // ============ MODULE 6: Probability and Sampling ============
  {
    module: 'module-6',
    topic: 'normal-distribution',
    title: 'Find Probabilities Using the Normal Distribution',
    description: 'Use Jamovi to find areas under the normal curve',
    instructions: 'You need to find the probability of scoring above a certain z-score. Use Jamovi\'s distribution functions.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Look under Analyses > Exploration > Distribution for probability calculators',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'distribution' }
    ],
    sample_data: null,
    success_message: 'Correct! Exploration > Distribution lets you calculate probabilities for normal and other distributions. Enter your z-score to find cumulative probabilities.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'sampling',
    title: 'Calculate Confidence Intervals',
    description: 'Find confidence intervals for the mean in Descriptives',
    instructions: 'Calculate a 95% confidence interval for the mean test score. Find where to request confidence intervals.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Confidence intervals are in Descriptives under the "Statistics" section',
    expected_selections: [
      { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
    ],
    sample_data: {
      columns: ['ID', 'Score'],
      rows: [
        { ID: 1, Score: 78 },
        { ID: 2, Score: 82 },
        { ID: 3, Score: 75 }
      ]
    },
    success_message: 'Correct! In Descriptives, check "Confidence interval for Mean" under Statistics. The default is 95% CI.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'random-sampling',
    title: 'Generate a Random Variable and Plot It',
    phase: 'practice',
    description: 'Use compute formulas to generate random values and graph them',
    instructions: 'Create a random variable using jamovi compute formulas (e.g., random uniform) and plot a histogram. Explain whether the shape matches expectation.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use a computed variable like RAND() or a uniform formula, then plot in Descriptives.',
    submission: 'Histogram screenshot and a short explanation.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'random-sampling',
    title: 'Compare Two Random Samples',
    phase: 'practice',
    description: 'Demonstrate sampling variability with two random columns',
    instructions: 'Create two random samples (or two random columns) of the same size and compare their means/SDs in Descriptives.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Generate two columns using the same random formula and compare summaries.',
    submission: 'Descriptives output screenshot.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'random-sampling',
    title: 'Mini Sampling Distribution',
    phase: 'apply',
    description: 'Approximate a sampling distribution of the mean',
    instructions: 'Generate many random values and summarize the distribution of the sample mean. Describe what the spread implies about uncertainty.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use computed variables to create sample means and then plot their distribution.',
    submission: 'Plot/output screenshot and a short interpretation.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'binomial-distribution',
    title: 'Calculate Binomial Probabilities',
    description: 'Compute probabilities for binary outcomes',
    instructions: 'Calculate the probability of getting exactly 7 heads in 10 coin flips using the binomial distribution.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use a calculator or jamovi compute function with binomial probability formula: P(X=k) for n trials with probability p.',
    submission: 'Screenshot showing the calculation and your answer.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'probability-concepts',
    title: 'Frequentist vs Bayesian Interpretation',
    description: 'Understand different interpretations of probability',
    instructions: 'Explain the difference between frequentist and Bayesian probability interpretations using a real-world example (e.g., weather forecasting).',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Frequentists interpret probability as long-run frequency. Bayesians interpret it as degree of belief.',
    submission: '3-4 sentences explaining both perspectives with your example.',
    order: 7,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'normal-distribution',
    title: 'Apply the Empirical Rule',
    description: 'Use the 68-95-99.7 rule for normal distributions',
    instructions: 'Given IQ scores are normally distributed with mean=100 and SD=15, calculate what percentage of people have IQs between 85 and 115.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: '85 and 115 are exactly 1 SD below and above the mean. Use the empirical rule.',
    submission: 'Your calculation and explanation.',
    order: 8,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'sampling-theory',
    title: 'Identify Sampling Methods',
    description: 'Distinguish between different sampling techniques',
    instructions: 'Describe three scenarios using different sampling methods: simple random sampling, stratified sampling, and convenience sampling. Explain which is best for generalizing to a population.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Random sampling gives every member equal chance. Stratified divides population into groups. Convenience uses readily available participants.',
    submission: '3 short scenarios (2-3 sentences each) with explanations.',
    order: 9,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'law-of-large-numbers',
    title: 'Demonstrate Law of Large Numbers',
    description: 'Show how sample size affects estimate accuracy',
    instructions: 'Generate random samples of increasing sizes (N=10, 50, 200) from a normal distribution with mean=100. Compare how close the sample means are to 100.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use = NORM(100, 15) to generate data. Create three datasets and check their means.',
    submission: 'Table showing sample sizes and their means, plus 2-3 sentences about the pattern.',
    order: 10,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'central-limit-theorem',
    title: 'Observe the Central Limit Theorem',
    description: 'See how sampling distribution becomes normal',
    instructions: 'Generate a non-normal distribution (e.g., uniform). Take multiple samples and calculate means. Plot the distribution of these means and describe its shape.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Even from non-normal populations, sampling distributions of means become approximately normal.',
    submission: 'Two histograms (original distribution and distribution of means) with explanation.',
    order: 11,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'parameter-estimation',
    title: 'Estimate Population Parameters',
    description: 'Calculate unbiased estimates of population parameters',
    instructions: 'Given a sample of test scores, calculate both the sample standard deviation (s) and the estimated population standard deviation (σ̂). Explain why they differ.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'jamovi\'s SD calculation uses N-1 (unbiased estimator). The difference relates to degrees of freedom.',
    submission: 'Both calculations and 2-3 sentence explanation of the N-1 correction.',
    order: 12,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'confidence-intervals',
    title: 'Interpret Confidence Intervals',
    description: 'Understand what confidence intervals mean',
    instructions: 'Calculate a 95% CI for a sample mean and explain what this interval tells us. Include both the correct frequentist interpretation and common misinterpretations.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'A 95% CI means: if we repeated this study many times, 95% of intervals would contain the true population mean.',
    submission: 'CI calculation, correct interpretation, and one common misinterpretation to avoid.',
    order: 13,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'other-distributions',
    title: 'Compare Distribution Shapes',
    description: 'Understand when to use t, χ², and F distributions',
    instructions: 'Describe when you would use the t-distribution vs normal distribution, and briefly explain what χ² and F distributions are used for.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 't-distribution when population SD is unknown and sample size is small. χ² for variance tests. F for comparing variances.',
    submission: '4-5 sentences explaining when to use each distribution.',
    order: 14,
    is_active: true
  },
  {
    module: 'module-6',
    topic: 'confidence-intervals',
    title: 'Effect of Sample Size on CI Width',
    phase: 'apply',
    description: 'Examine how sample size affects confidence interval width',
    instructions: 'Generate three samples of different sizes (N=10, 30, 100) from the same population. Calculate 95% CIs for each and explain the pattern in CI widths.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Larger samples produce narrower confidence intervals because standard error decreases.',
    submission: 'Three CIs with sample sizes and 3-4 sentences explaining the relationship.',
    order: 15,
    is_active: true
  },

  // ============ MODULE 7: Hypothesis Testing ============
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'Run a One-Sample T-Test',
    description: 'Test if a sample mean differs from a known population value',
    instructions: 'Test whether your sample\'s mean IQ differs from the population mean of 100. Find the one-sample t-test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'T-tests are under Analyses > T-Tests',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'onesample' }
    ],
    sample_data: {
      columns: ['ID', 'IQ'],
      rows: [
        { ID: 1, IQ: 105 },
        { ID: 2, IQ: 112 },
        { ID: 3, IQ: 98 }
      ]
    },
    success_message: 'Correct! Analyses > T-Tests > One Sample T-Test. Enter your test value (100) and add your variable.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'Identify Test Statistic and P-Value',
    phase: 'practice',
    description: 'Locate and interpret the key outputs from a one-sample t-test',
    instructions: 'Run a one-sample t-test and identify where the test statistic and p-value appear. Write 2 sentences interpreting the decision.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Look in the main results table for t and p.',
    submission: 'Output screenshot and 2 sentences interpreting the decision.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'Independent Samples T-Test Report',
    phase: 'practice',
    description: 'Report group means, mean difference, p-value, and effect size',
    instructions: 'Run an independent-samples t-test and report group means, mean difference, p-value, and an effect size if provided.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Analyses > T-Tests > Independent Samples and check effect sizes.',
    submission: 'Output screenshot and one APA-style results sentence.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'Robustness to an Outlier Filter',
    phase: 'apply',
    description: 'Compare results before and after filtering an outlier',
    instructions: 'Re-run the same test after applying a filter that removes an outlier and discuss what changed and what stayed stable.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use the Filters panel and compare outputs side by side.',
    submission: 'Two outputs and a short robustness discussion.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'Run a Binomial Test (Proportion Test)',
    phase: 'learn',
    description: 'Test if an observed proportion differs from a hypothesized value',
    instructions: 'You have data on 100 coin flips with 62 heads. Test if this differs significantly from the expected 50% using a binomial test (Proportion Test in Jamovi).',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Go to Analyses > Frequencies > Proportion Test (2 Outcomes). Set the test value to 0.5.',
    expected_selections: [
      { menu: 'analyses', option: 'frequencies', subOption: 'proportion_test' }
    ],
    sample_data: {
      columns: ['flip_id', 'outcome'],
      rows: [
        { flip_id: 1, outcome: 'heads' },
        { flip_id: 2, outcome: 'heads' },
        { flip_id: 3, outcome: 'tails' }
      ]
    },
    success_message: 'Correct! Analyses > Frequencies > Proportion Test. This tests if your observed proportion (62/100 = 0.62) differs significantly from the test value (0.5).',
    order: 5,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'State Null and Alternative Hypotheses',
    phase: 'learn',
    description: 'Write proper statistical hypotheses for a research question',
    instructions: 'A researcher wants to test if college students sleep less than the recommended 8 hours per night. Write the null hypothesis (H₀) and alternative hypothesis (H₁) in both words and symbols (using μ for population mean).',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'H₀ typically states "no effect" or "no difference". H₁ is what the researcher expects. Use μ = 8 for the null.',
    expected_answer_format: 'H₀: [in words] μ = 8\nH₁: [in words] μ < 8',
    sample_answer: 'H₀: College students sleep an average of 8 hours per night (μ = 8)\nH₁: College students sleep less than 8 hours per night on average (μ < 8)',
    submission: 'Written hypotheses in both words and symbols',
    order: 6,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'p-values',
    title: 'Interpret a P-Value Correctly',
    phase: 'practice',
    description: 'Write a correct interpretation of a p-value from your output',
    instructions: 'Run any hypothesis test in Jamovi and locate the p-value. Write one sentence correctly interpreting what the p-value means (avoid common mistakes like "probability the null is true").',
    software_type: 'jamovi',
    exercise_type: 'written_response',
    hint: 'Correct interpretation: "If the null hypothesis were true, we would observe data this extreme [p-value]% of the time by chance alone."',
    sample_answer: 'If the null hypothesis were true (no difference from 100), we would observe a sample mean this extreme or more extreme approximately 1.8% of the time by random chance alone.',
    submission: 'Screenshot of results and one sentence interpreting the p-value',
    order: 7,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'p-values',
    title: 'Make a Decision Based on Significance Level',
    phase: 'practice',
    description: 'Compare p-value to alpha and make a decision',
    instructions: 'You run a test and get p = 0.073. Using α = 0.05, state your decision (reject or fail to reject H₀) and explain why in one sentence.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Compare p to α: If p ≤ α, reject H₀. If p > α, fail to reject H₀.',
    expected_answer_format: 'Decision: [Reject/Fail to reject] H₀\nReason: [explanation]',
    sample_answer: 'Decision: Fail to reject H₀\nReason: Because p = 0.073 > α = 0.05, we do not have sufficient evidence to reject the null hypothesis at the 5% significance level.',
    submission: 'Written decision and explanation',
    order: 8,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'p-values',
    title: 'Compare Results with Different Significance Levels',
    phase: 'apply',
    description: 'Understand how changing alpha affects decisions',
    instructions: 'You get p = 0.032 from a test. Would your decision change at α = 0.05 vs α = 0.01? Explain what this tells you about the strength of evidence.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'At α = 0.05: compare 0.032 to 0.05. At α = 0.01: compare 0.032 to 0.01.',
    sample_answer: 'At α = 0.05: Reject H₀ (since 0.032 < 0.05)\nAt α = 0.01: Fail to reject H₀ (since 0.032 > 0.01)\nThis shows the evidence is moderate but not strong - significant at the 5% level but not at the 1% level.',
    submission: 'Written comparison and interpretation',
    order: 9,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'effect-size',
    title: 'Calculate and Report Cohen\'s d',
    phase: 'practice',
    description: 'Find effect size in Jamovi output and interpret its magnitude',
    instructions: 'Run a one-sample or independent samples t-test. Enable "Effect size" in the options. Report the Cohen\'s d value and classify it as small (~0.2), medium (~0.5), or large (~0.8).',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'In the t-test options panel, check "Effect size" under Additional Statistics.',
    expected_output: 'Cohen\'s d appears in the output table',
    submission: 'Screenshot showing Cohen\'s d and a sentence classifying the effect size magnitude',
    order: 10,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'effect-size',
    title: 'Distinguish Statistical vs Practical Significance',
    phase: 'apply',
    description: 'Understand that significant ≠ important',
    instructions: 'Imagine a study with N = 10,000 finds p = 0.001 but Cohen\'s d = 0.08. Explain why this is statistically significant but may not be practically important.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Large samples can detect tiny effects as "significant". Effect size tells you if the difference actually matters.',
    sample_answer: 'This result is statistically significant (p < 0.05) because the large sample size (N = 10,000) gives high power to detect even tiny effects. However, Cohen\'s d = 0.08 is very small (much smaller than the "small" benchmark of 0.2), indicating the actual difference is negligible and unlikely to be practically meaningful, even though it\'s statistically detectable.',
    submission: 'Written explanation (3-4 sentences)',
    order: 11,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'Identify Type I and Type II Errors',
    phase: 'learn',
    description: 'Understand the two types of errors in hypothesis testing',
    instructions: 'For a study testing if a new drug works: (1) Define what a Type I error would be, (2) Define what a Type II error would be, (3) Which error type is controlled by α?',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Type I = rejecting a true null (false positive). Type II = failing to reject a false null (false negative).',
    sample_answer: '(1) Type I error: Concluding the drug works when it actually doesn\'t (rejecting true H₀)\n(2) Type II error: Concluding the drug doesn\'t work when it actually does (failing to reject false H₀)\n(3) α (significance level) controls the Type I error rate',
    submission: 'Written definitions and answer to question 3',
    order: 12,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'Choose Between One-Sided and Two-Sided Test',
    phase: 'apply',
    description: 'Decide when to use directional vs non-directional hypotheses',
    instructions: 'Scenario 1: You want to test if a new teaching method improves test scores.\nScenario 2: You want to test if test scores differ between two groups.\nFor each, state whether you\'d use a one-sided or two-sided test and explain why.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'One-sided: you predict a specific direction (higher/lower). Two-sided: you just want to know if there\'s any difference.',
    sample_answer: 'Scenario 1: One-sided test (H₁: μ_new > μ_old) because we specifically predict improvement (higher scores)\nScenario 2: Two-sided test (H₁: μ₁ ≠ μ₂) because we have no specific directional prediction, just testing for any difference',
    submission: 'Written answers for both scenarios with explanations',
    order: 13,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'effect-size',
    title: 'Relationship Between Sample Size and P-Values',
    phase: 'apply',
    description: 'Understand how sample size affects hypothesis testing',
    instructions: 'Explain why the same effect size (e.g., mean difference of 3 points) might be significant with N = 200 but not significant with N = 20. What does this tell you about interpreting p-values?',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Larger samples have smaller standard errors, making it easier to detect effects. This is why effect size matters!',
    sample_answer: 'With N = 200, the standard error is much smaller than with N = 20, making the same mean difference more "statistically detectable" (smaller p-value). This shows that p-values depend heavily on sample size - large samples can make tiny, unimportant differences "significant." That\'s why we must report effect sizes: they tell us if the difference actually matters, independent of sample size.',
    submission: 'Written explanation (3-4 sentences)',
    order: 14,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'hypothesis-testing',
    title: 'Write an APA-Style Results Statement',
    phase: 'apply',
    description: 'Report hypothesis test results in proper APA format',
    instructions: 'Run a one-sample t-test and write a complete APA-style results sentence including: descriptive statistics, test statistic with df, p-value, and effect size. Example format: "Participants (M = 106.8, SD = 13.4) scored significantly higher than the population mean of 100, t(24) = 2.54, p = .018, d = 0.51."',
    software_type: 'jamovi',
    exercise_type: 'written_response',
    hint: 'Include: sample mean and SD, test name with df in parentheses, test statistic value, exact p-value, and Cohen\'s d.',
    expected_answer_format: 'Group (M = ___, SD = ___) [relationship] comparison value, t(df) = ___, p = ___, d = ___.',
    submission: 'Screenshot of Jamovi output and one properly formatted APA results sentence',
    order: 15,
    is_active: true
  },
  {
    module: 'module-7',
    topic: 'p-values',
    title: 'The Multiple Comparisons Problem',
    phase: 'apply',
    description: 'Understand why running many tests increases Type I error',
    instructions: 'If you run 20 independent hypothesis tests, each at α = 0.05, what\'s the probability of getting at least one false positive (Type I error) just by chance? Show your calculation and explain why this is a problem.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Probability of NO false positives in one test = 0.95. For 20 independent tests: (0.95)^20. Then subtract from 1.',
    sample_answer: 'Probability of at least one false positive = 1 - (0.95)^20 = 1 - 0.358 = 0.642 or 64.2%\nThis is a serious problem: even if all null hypotheses are true, we have a 64% chance of incorrectly "finding" at least one significant result just by chance. This is why researchers need to correct for multiple comparisons (e.g., Bonferroni correction) or pre-register their hypotheses.',
    submission: 'Calculation and written explanation',
    order: 16,
    is_active: true
  },

  // ============ MODULE 8: Comparing Groups/Relationships ============
  // Chapter 10: Categorical Data Analysis
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Chi-Square Goodness-of-Fit Test',
    description: 'Test if observed frequencies match expected probabilities',
    instructions: 'You surveyed 200 people asking them to pick a card suit at random. Test if all four suits (clubs, diamonds, hearts, spades) are equally likely to be chosen using a chi-square goodness-of-fit test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Goodness-of-fit test is under Analyses > Frequencies > One Sample Proportion Tests > N Outcomes',
    expected_selections: [
      { menu: 'analyses', option: 'frequencies', subOption: 'proportion-test-n' }
    ],
    sample_data: {
      columns: ['ID', 'Suit'],
      rows: [
        { ID: 1, Suit: 'hearts' },
        { ID: 2, Suit: 'clubs' },
        { ID: 3, Suit: 'hearts' },
        { ID: 4, Suit: 'diamonds' }
      ],
      description: 'Observed: clubs=35, diamonds=51, hearts=64, spades=50'
    },
    success_message: 'Correct! Analyses > Frequencies > One Sample Proportion Tests > N Outcomes. Add your categorical variable and check "Expected counts" to see if observed frequencies differ from equal proportions.',
    order: 1,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Chi-Square Test of Independence',
    description: 'Test if two categorical variables are associated',
    instructions: 'Test whether species (robot vs. human) is associated with preference (puppy, flower, or data file) using a chi-square test of independence.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Test of independence is under Analyses > Frequencies > Contingency Tables > Independent Samples',
    expected_selections: [
      { menu: 'analyses', option: 'frequencies', subOption: 'contingency-independent' }
    ],
    sample_data: {
      columns: ['ID', 'Species', 'Choice'],
      rows: [
        { ID: 1, Species: 'Robot', Choice: 'Puppy' },
        { ID: 2, Species: 'Human', Choice: 'Data' },
        { ID: 3, Species: 'Robot', Choice: 'Flower' },
        { ID: 4, Species: 'Human', Choice: 'Data' }
      ]
    },
    success_message: 'Correct! Analyses > Frequencies > Contingency Tables > Independent Samples. Add one variable to Rows and another to Columns. Check "Expected counts" and "Cramér\'s V" for effect size.',
    order: 2,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Interpreting Expected Frequencies',
    description: 'Understand how expected frequencies are calculated',
    instructions: 'Run a chi-square test of independence and display the expected counts. Verify that the expected frequency for one cell equals (Row Total × Column Total) / Grand Total.',
    software_type: 'jamovi',
    exercise_type: 'conceptual',
    hint: 'In Contingency Tables, check the "Expected counts" option under Cells',
    sample_data: {
      columns: ['Gender', 'ProductPreference'],
      rows: [
        { Gender: 'Male', ProductPreference: 'A' },
        { Gender: 'Female', ProductPreference: 'B' }
      ]
    },
    success_message: 'Expected frequencies show what we\'d expect if there was NO association. They\'re calculated as (Row Total × Column Total) / N.',
    order: 3,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Apply Continuity Correction',
    description: 'Use Yates correction for 2×2 tables',
    instructions: 'For a 2×2 contingency table (df=1), apply the continuity correction and compare results with and without the correction.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Contingency Tables > Statistics, check "χ² continuity correction"',
    expected_selections: [
      { menu: 'analyses', option: 'frequencies', subOption: 'contingency-independent' }
    ],
    sample_data: {
      columns: ['Treatment', 'Outcome'],
      rows: [
        { Treatment: 'Drug', Outcome: 'Improved' },
        { Treatment: 'Placebo', Outcome: 'Not Improved' }
      ]
    },
    success_message: 'Correct! The continuity correction (Yates correction) is applied when df = 1. It makes the test more conservative and improves the χ² approximation.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Calculate Cramér\'s V Effect Size',
    description: 'Measure the strength of association in a contingency table',
    instructions: 'After running a chi-square test of independence, report Cramér\'s V to indicate the effect size. Interpret whether the association is small (V≈0.1), medium (V≈0.3), or large (V≥0.5).',
    software_type: 'jamovi',
    exercise_type: 'conceptual',
    hint: 'In Contingency Tables > Statistics, check "Cramér\'s V"',
    sample_data: {
      columns: ['Major', 'PreferredLearningStyle'],
      rows: [
        { Major: 'Psychology', PreferredLearningStyle: 'Visual' },
        { Major: 'Mathematics', PreferredLearningStyle: 'Auditory' }
      ]
    },
    success_message: 'Cramér\'s V ranges from 0 (no association) to 1 (perfect association). It works for any size contingency table, unlike phi which can exceed 1 for tables larger than 2×2.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Fisher Exact Test for Small Samples',
    description: 'Use Fisher exact test when expected frequencies are too small',
    instructions: 'You have a 2×2 table with small expected counts (<5). Instead of the standard chi-square test, use Fisher\'s exact test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Contingency Tables > Statistics, check "Fisher\'s exact test"',
    expected_selections: [
      { menu: 'analyses', option: 'frequencies', subOption: 'contingency-independent' }
    ],
    sample_data: {
      columns: ['OnFire', 'Happy'],
      rows: [
        { OnFire: 'Yes', Happy: 'No' },
        { OnFire: 'No', Happy: 'Yes' },
        { OnFire: 'Yes', Happy: 'No' },
        { OnFire: 'No', Happy: 'Yes' }
      ],
      description: 'Small sample with low expected frequencies'
    },
    success_message: 'Correct! Fisher\'s exact test calculates the exact p-value using the hypergeometric distribution. Use it when expected cell counts are < 5.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'McNemar Test for Paired Data',
    description: 'Test categorical data from the same participants measured twice',
    instructions: 'You asked 100 people if they\'d vote for a party BEFORE and AFTER showing an ad. Test if the proportion changed using McNemar\'s test (NOT a standard chi-square, since data are paired).',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'McNemar test is under Analyses > Frequencies > Contingency Tables > Paired Samples',
    expected_selections: [
      { menu: 'analyses', option: 'frequencies', subOption: 'contingency-paired' }
    ],
    sample_data: {
      columns: ['ID', 'ResponseBefore', 'ResponseAfter'],
      rows: [
        { ID: 1, ResponseBefore: 'Yes', ResponseAfter: 'No' },
        { ID: 2, ResponseBefore: 'No', ResponseAfter: 'No' },
        { ID: 3, ResponseBefore: 'Yes', ResponseAfter: 'Yes' },
        { ID: 4, ResponseBefore: 'No', ResponseAfter: 'Yes' }
      ]
    },
    success_message: 'Correct! Analyses > Frequencies > Contingency Tables > Paired Samples. McNemar tests for "marginal homogeneity" - whether the proportion saying Yes is the same before and after.',
    order: 7,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'McNemar vs. Independence: Know the Difference',
    description: 'Understand when to use McNemar vs. chi-square independence test',
    instructions: 'Decide: If you measure the SAME participants twice, do you use (A) chi-square test of independence, or (B) McNemar test?',
    software_type: 'conceptual',
    exercise_type: 'conceptual',
    hint: 'Are the observations independent? If participants appear twice, observations are NOT independent.',
    sample_data: null,
    success_message: 'Answer: (B) McNemar test. Use independence test when observations are independent (different people in each cell). Use McNemar when the same people are measured twice (violates independence).',
    order: 8,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Check Chi-Square Assumptions',
    description: 'Verify that expected frequencies are large enough',
    instructions: 'Before accepting chi-square results, check the expected frequencies. The rule of thumb: all expected frequencies should be ≥ 5. If not, consider Fisher exact test.',
    software_type: 'jamovi',
    exercise_type: 'conceptual',
    hint: 'Check "Expected counts" in Contingency Tables to see all expected frequencies',
    sample_data: null,
    success_message: 'Assumptions: (1) Expected frequencies ≥ 5 (or 80% above 5, none below 1 for larger tables), and (2) Observations are independent.',
    order: 9,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Specify Custom Expected Proportions',
    description: 'Test against unequal expected probabilities in goodness-of-fit',
    instructions: 'Someone predicts people will choose red cards 60% of the time (30% hearts, 30% diamonds) and black cards 40% (20% clubs, 20% spades). Test this using custom expected proportions.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'In Proportion Test (N Outcomes), expand "Expected Proportions" and enter custom ratios',
    sample_data: {
      columns: ['Suit'],
      rows: [
        { Suit: 'hearts' },
        { Suit: 'diamonds' },
        { Suit: 'clubs' },
        { Suit: 'spades' }
      ],
      description: 'Test custom null hypothesis: P(hearts)=.30, P(diamonds)=.30, P(clubs)=.20, P(spades)=.20'
    },
    success_message: 'You can test any null hypothesis as long as the probabilities sum to 1. Enter the ratios (e.g., 1.5 : 1.5 : 1 : 1 for 30%:30%:20%:20%).',
    order: 10,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Write Up Chi-Square Results',
    phase: 'practice',
    description: 'Practice reporting categorical data analysis in APA format',
    instructions: 'Run a chi-square test and write a complete results section including: (1) descriptive statistics, (2) null hypothesis, (3) test statistic with df and p-value, (4) effect size (Cramér\'s V), and (5) interpretation.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Example: "A chi-square test of independence revealed a significant association between species and choice (χ²(2) = 10.7, p < .01, V = 0.24)."',
    submission: 'Full write-up in paragraph format (3-5 sentences)',
    order: 11,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Calculate Degrees of Freedom Manually',
    phase: 'practice',
    description: 'Understand how degrees of freedom are determined for chi-square tests',
    instructions: 'For a contingency table with 4 rows and 3 columns: (1) Calculate df for a test of independence, (2) Explain why df = (r-1)(c-1), not r×c, (3) What would df be for a goodness-of-fit test with 6 categories?',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'For independence: df = (rows - 1)(columns - 1). For goodness-of-fit: df = k - 1, where k is number of categories.',
    sample_answer: '(1) df = (4-1)(3-1) = 3 × 2 = 6\n(2) We subtract 1 because of constraints: once you know r-1 row totals and c-1 column totals (plus the grand total), the remaining values are determined. Not all cells are "free to vary."\n(3) For goodness-of-fit with 6 categories: df = 6 - 1 = 5, because once you know 5 of the frequencies and the total N, the 6th is determined.',
    submission: 'Written answers to all three parts (3-4 sentences total)',
    order: 12,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Calculate Chi-Square Statistic by Hand',
    phase: 'practice',
    description: 'Understand the chi-square formula by computing it manually',
    instructions: 'Given this 2×2 table:\n\nGroup A: 30 success, 20 failure\nGroup B: 15 success, 35 failure\n\n(1) Calculate expected frequencies for each cell using (Row Total × Column Total)/N\n(2) Calculate χ² = Σ[(O-E)²/E] by hand\n(3) Verify your answer matches jamovi output',
    software_type: 'jamovi',
    exercise_type: 'written_response',
    hint: 'Formula: χ² = Σ[(Observed - Expected)²/Expected]. Sum this across all 4 cells.',
    sample_answer: '(1) Expected frequencies:\n- A Success: (50×45)/100 = 22.5\n- A Failure: (50×55)/100 = 27.5\n- B Success: (50×45)/100 = 22.5\n- B Failure: (50×55)/100 = 27.5\n\n(2) χ² = (30-22.5)²/22.5 + (20-27.5)²/27.5 + (15-22.5)²/22.5 + (35-27.5)²/27.5\n     = 2.5 + 2.05 + 2.5 + 2.05 = 9.1\n\n(3) jamovi confirms χ² = 9.10',
    submission: 'Hand calculations showing all work, plus jamovi screenshot confirming the result',
    order: 13,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Interpret Standardized Residuals',
    phase: 'apply',
    description: 'Identify which cells contribute most to significant chi-square',
    instructions: 'After getting a significant χ² test of independence, examine the standardized residuals (available in jamovi under Cells > Residuals). Which cells have residuals > |2|? Explain what this means about the association.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Standardized residuals > |2| indicate cells that deviate significantly from what we\'d expect under independence.',
    sample_data: {
      columns: ['Major', 'CareerInterest'],
      rows: [
        { Major: 'Psychology', CareerInterest: 'Clinical' },
        { Major: 'Psychology', CareerInterest: 'Research' },
        { Major: 'Biology', CareerInterest: 'Clinical' },
        { Major: 'Biology', CareerInterest: 'Research' }
      ]
    },
    success_message: 'Standardized residuals show which cells drive the association. Residuals > |2| are "surprising" - they differ from expected by more than 2 standard deviations.',
    order: 14,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Decision Tree: Choose the Right Categorical Test',
    phase: 'apply',
    description: 'Master when to use each type of chi-square test',
    instructions: 'Create a decision tree to choose between: (1) Goodness-of-fit test, (2) Test of independence, (3) Fisher exact test, (4) McNemar test. Include decision points for: number of variables, independence of observations, expected cell frequencies.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Start with: "How many categorical variables?" Then consider: "Same participants measured twice?" and "Are expected frequencies ≥5?"',
    sample_answer: 'Decision Tree:\n\n1. How many categorical variables?\n   - ONE variable → Goodness-of-fit test\n   - TWO variables → Continue to #2\n\n2. Are observations independent?\n   - NO (same participants measured twice) → McNemar test\n   - YES (different participants or one measurement) → Continue to #3\n\n3. Are all expected frequencies ≥5?\n   - NO (small expected counts) → Fisher exact test\n   - YES → Chi-square test of independence\n\nSpecial cases:\n- If 2×2 table with df=1: Consider continuity correction\n- If >20% of cells have expected frequency <5: Fisher exact test or combine categories',
    submission: 'Decision tree diagram (hand-drawn/digital) OR written decision procedure with clear if-then statements',
    order: 15,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Understand Chi-Square Distribution Properties',
    phase: 'apply',
    description: 'Connect chi-square statistic to its sampling distribution',
    instructions: 'Explain: (1) Why is the χ² test always one-sided (right-tailed)? (2) Why does the χ² distribution change shape with different df? (3) Why can\'t χ² be negative?',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Think about the formula: χ² = Σ[(O-E)²/E]. The squared term is key.',
    sample_answer: '(1) The test is one-sided because LARGE χ² values indicate poor fit between observed and expected. Small χ² means good fit (we don\'t reject). We only reject when χ² is in the right tail.\n\n(2) Different df means different numbers of independent squared normal variables being summed. More df → distribution shifts right and becomes more symmetric.\n\n(3) χ² cannot be negative because it\'s a sum of squared values: (O-E)² is always ≥0, so the sum must be ≥0. The minimum possible value is 0 (perfect fit).',
    submission: 'Written explanation addressing all three questions (4-6 sentences total)',
    order: 16,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'categorical-data-analysis',
    chapter: 'chapter-10',
    title: 'Real-World Application: Analyze Survey Data',
    phase: 'apply',
    description: 'Apply chi-square tests to authentic research scenario',
    instructions: 'You surveyed 300 students about their major (Psychology, Biology, Math) and stress level (Low, Medium, High). (1) State appropriate null/alternative hypotheses, (2) Choose and run the correct test, (3) Check assumptions, (4) Calculate effect size, (5) Write complete results section with interpretation.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'This is a test of independence (two categorical variables). Check that all expected frequencies ≥5.',
    submission: 'Complete analysis including: (1) Hypotheses, (2) jamovi output screenshot, (3) Assumption check, (4) APA-formatted results paragraph (5-7 sentences)',
    order: 17,
    is_active: true
  },

  // Chapter 11: Comparing Two Means (T-Tests)
  {
    module: 'module-8',
    topic: 't-tests',
    chapter: 'chapter-11',
    title: 'Run an Independent Samples T-Test',
    description: 'Compare means between two independent groups',
    instructions: 'Compare test scores between the treatment and control groups using an independent samples t-test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Independent Samples T-Test is under Analyses > T-Tests',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['ID', 'Group', 'Score'],
      rows: [
        { ID: 1, Group: 'Treatment', Score: 85 },
        { ID: 2, Group: 'Control', Score: 72 }
      ]
    },
    success_message: 'Correct! Analyses > T-Tests > Independent Samples T-Test. Add your DV to "Dependent Variables" and your grouping variable to "Grouping Variable".',
    order: 18,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests',
    chapter: 'chapter-11',
    title: 'Run a Paired Samples T-Test',
    description: 'Compare means from the same participants at two time points',
    instructions: 'Compare pre-test and post-test scores for the same participants using a paired samples t-test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Paired Samples T-Test is under Analyses > T-Tests',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'paired' }
    ],
    sample_data: {
      columns: ['ID', 'PreTest', 'PostTest'],
      rows: [
        { ID: 1, PreTest: 72, PostTest: 85 },
        { ID: 2, PreTest: 68, PostTest: 79 }
      ]
    },
    success_message: 'Correct! Analyses > T-Tests > Paired Samples T-Test. Add both variables as a pair.',
    order: 19,
    is_active: true
  },

  // Chapter 12: Correlation and Linear Regression
  {
    module: 'module-8',
    topic: 'correlation',
    chapter: 'chapter-12',
    title: 'Calculate Pearson Correlation',
    description: 'Measure the linear relationship between two continuous variables',
    instructions: 'Calculate the correlation between study hours and exam scores.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Correlation is under Analyses > Regression',
    expected_selections: [
      { menu: 'analyses', option: 'regression', subOption: 'correlation' }
    ],
    sample_data: {
      columns: ['ID', 'StudyHours', 'ExamScore'],
      rows: [
        { ID: 1, StudyHours: 5, ExamScore: 85 },
        { ID: 2, StudyHours: 3, ExamScore: 72 }
      ]
    },
    success_message: 'Correct! Analyses > Regression > Correlation Matrix. Add both variables to see Pearson\'s r.',
    order: 20,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'regression',
    chapter: 'chapter-12',
    title: 'Run Simple Linear Regression',
    description: 'Predict one variable from another using regression',
    instructions: 'Use study hours to predict exam scores with simple linear regression.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Linear Regression is under Analyses > Regression',
    expected_selections: [
      { menu: 'analyses', option: 'regression', subOption: 'linear' }
    ],
    sample_data: {
      columns: ['ID', 'StudyHours', 'ExamScore'],
      rows: [
        { ID: 1, StudyHours: 5, ExamScore: 85 },
        { ID: 2, StudyHours: 3, ExamScore: 72 }
      ]
    },
    success_message: 'Correct! Analyses > Regression > Linear Regression. Add your DV (ExamScore) as Dependent Variable and IV (StudyHours) as Covariate.',
    order: 21,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova',
    chapter: 'chapter-11',
    title: 'Run One-Way ANOVA',
    description: 'Compare means across three or more groups',
    instructions: 'Compare test scores across three teaching methods (Traditional, Online, Hybrid) using ANOVA.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'ANOVA is under Analyses > ANOVA',
    expected_selections: [
      { menu: 'analyses', option: 'anova', subOption: 'oneway' }
    ],
    sample_data: {
      columns: ['ID', 'Method', 'Score'],
      rows: [
        { ID: 1, Method: 'Traditional', Score: 78 },
        { ID: 2, Method: 'Online', Score: 82 },
        { ID: 3, Method: 'Hybrid', Score: 85 }
      ]
    },
    success_message: 'Correct! Analyses > ANOVA > One-Way ANOVA. Add your DV to "Dependent Variable" and grouping variable to "Fixed Factors".',
    order: 22,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'correlation',
    chapter: 'chapter-12',
    title: 'Pearson Correlation with Interpretation',
    phase: 'practice',
    description: 'Run a correlation and interpret numeric and visual evidence',
    instructions: 'Run a Pearson correlation and interpret both the numeric correlation and the scatterplot evidence.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Regression > Correlation Matrix and enable plots.',
    submission: 'Output screenshot and 2-3 sentences of interpretation.',
    order: 29,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'regression',
    chapter: 'chapter-12',
    title: 'Simple Linear Regression Interpretation',
    phase: 'practice',
    description: 'Interpret slope and R-squared from output',
    instructions: 'Run a simple linear regression (DV ~ IV) and interpret the slope and R-squared from the output.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Analyses > Regression > Linear Regression.',
    submission: 'Output screenshot and a short interpretation.',
    order: 30,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova',
    chapter: 'chapter-11',
    title: 'One-Way ANOVA in GAMLj',
    phase: 'apply',
    description: 'Run an ANOVA with post-hoc comparisons using GAMLj',
    instructions: 'Using GAMLj, run a one-way ANOVA with 3+ groups and obtain omnibus results plus post-hoc comparisons if available.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Open GAMLj from the Analyses menu after installing the add-on.',
    submission: 'GAMLj output screenshot.',
    order: 31,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova',
    chapter: 'chapter-11',
    title: 'Factorial ANOVA with Interaction Plot',
    phase: 'apply',
    description: 'Run a factorial ANOVA and interpret an interaction plot',
    instructions: 'Using GAMLj, run a factorial ANOVA and create/interpret an interaction plot.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use GAMLj ANOVA and enable interaction plots.',
    submission: 'Interaction plot and a 4-5 sentence interpretation.',
    order: 32,
    is_active: true
  },

  // ============ MODULE 8: Chapter 11 - Comparing Two Means (T-Tests) ============
  {
    module: 'module-8',
    topic: 't-tests-detailed',
    chapter: 'chapter-11',
    title: 'Student\'s vs Welch\'s T-Test',
    description: 'Understand when to use Student vs Welch t-test',
    instructions: 'Run BOTH Student\'s t-test and Welch\'s t-test on the same data. Compare the results and explain when you should use each one.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Independent Samples T-Test, check both "Student\'s" and "Welch\'s" under Tests',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['ID', 'Group', 'Score'],
      rows: [
        { ID: 1, Group: 'A', Score: 75 },
        { ID: 2, Group: 'B', Score: 82 }
      ]
    },
    success_message: 'Correct! Student\'s t-test assumes equal variances; Welch\'s t-test does NOT. Welch\'s is generally safer when you\'re unsure about equal variances.',
    order: 27,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-detailed',
    chapter: 'chapter-11',
    title: 'Check Homogeneity of Variance Assumption',
    description: 'Test if two groups have equal variances using Levene\'s test',
    instructions: 'Before running an independent samples t-test, check if the groups have equal variances. Find the option for Levene\'s test of homogeneity of variance.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Independent Samples T-Test, expand Assumption Checks and select "Equality of variances"',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['Group', 'Measurement'],
      rows: [
        { Group: 'Control', Measurement: 45 },
        { Group: 'Treatment', Measurement: 52 }
      ]
    },
    success_message: 'Correct! Levene\'s test checks if variances are equal. If p < .05, variances differ significantly and you should use Welch\'s t-test instead of Student\'s.',
    order: 28,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-assumptions',
    chapter: 'chapter-11',
    title: 'Test Normality with Shapiro-Wilk',
    description: 'Check if your data meets the normality assumption',
    instructions: 'Before running a t-test, check if each group\'s data is normally distributed using the Shapiro-Wilk test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Independent Samples T-Test, expand Assumption Checks and select "Normality (Shapiro-Wilk)"',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['ID', 'Group', 'ReactionTime'],
      rows: [
        { ID: 1, Group: 'Morning', ReactionTime: 245 },
        { ID: 2, Group: 'Evening', ReactionTime: 312 }
      ]
    },
    success_message: 'Correct! Shapiro-Wilk tests normality. If p < .05, data are significantly non-normal and you may need a non-parametric test (Mann-Whitney U).',
    order: 29,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-assumptions',
    chapter: 'chapter-11',
    title: 'Create Q-Q Plot for Normality Check',
    description: 'Visually assess normality using a Q-Q plot',
    instructions: 'Create a Q-Q plot to visually check if your data follow a normal distribution. Points should fall along the diagonal line if data are normal.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Independent Samples T-Test, expand Assumption Checks and select "Q-Q plot"',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['Group', 'Score'],
      rows: [
        { Group: 'A', Score: 78 },
        { Group: 'B', Score: 85 }
      ]
    },
    success_message: 'Correct! Q-Q plots show theoretical vs. sample quantiles. If points curve away from the line, data may be skewed or have heavy tails.',
    order: 30,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-detailed',
    chapter: 'chapter-11',
    title: 'Paired vs Independent Samples: Choose Correctly',
    description: 'Understand when to use paired vs independent samples t-test',
    instructions: 'Scenario: You measure the same 20 students\' test scores BEFORE and AFTER tutoring. Which test do you use: (A) Independent Samples or (B) Paired Samples? Explain why.',
    software_type: 'conceptual',
    exercise_type: 'conceptual',
    hint: 'Are the observations independent? The SAME students measured twice means observations are NOT independent.',
    sample_data: null,
    success_message: 'Answer: (B) Paired Samples T-Test. Use paired when the same participants provide both scores. Use independent when different participants are in each group.',
    order: 31,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-detailed',
    chapter: 'chapter-11',
    title: 'Run One-Sided T-Test',
    description: 'Conduct a directional hypothesis test',
    instructions: 'You hypothesize that the treatment group will score HIGHER than the control group (not just "different"). Run a one-sided (directional) independent samples t-test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Independent Samples T-Test, under Hypothesis, select "Group 1 > Group 2" or "Group 1 < Group 2"',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['Group', 'ImprovementScore'],
      rows: [
        { Group: 'Treatment', ImprovementScore: 12 },
        { Group: 'Control', ImprovementScore: 7 }
      ]
    },
    success_message: 'Correct! One-sided tests are more powerful when you have a directional prediction, but ONLY use them if you predicted the direction before collecting data.',
    order: 32,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'effect-size-ttests',
    chapter: 'chapter-11',
    title: 'Calculate Cohen\'s d for T-Tests',
    description: 'Report standardized effect size for mean differences',
    instructions: 'Run an independent samples t-test and enable Cohen\'s d. Interpret whether the effect is small (d≈0.2), medium (d≈0.5), or large (d≈0.8).',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Independent Samples T-Test, expand Additional Statistics and check "Effect size"',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['Condition', 'AnxietyScore'],
      rows: [
        { Condition: 'Meditation', AnxietyScore: 32 },
        { Condition: 'Control', AnxietyScore: 45 }
      ]
    },
    success_message: 'Correct! Cohen\'s d standardizes the mean difference by the pooled standard deviation. It\'s independent of sample size, unlike p-values.',
    order: 33,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'effect-size-ttests',
    chapter: 'chapter-11',
    title: 'Interpret Cohen\'s d in Context',
    description: 'Understand what effect size means practically',
    instructions: 'You find d = 0.3 for the difference between two teaching methods. Write 2-3 sentences explaining what this means in practical terms (not just "small/medium/large").',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Cohen\'s d tells you how many standard deviations separate the two group means.',
    sample_answer: 'A Cohen\'s d of 0.3 means the two teaching methods differ by 0.3 standard deviations on average. This is between a "small" and "medium" effect by Cohen\'s benchmarks. In practical terms, if test scores have SD=10, the methods differ by about 3 points on average - whether this matters depends on the context and what score differences are meaningful in this domain.',
    submission: 'Written interpretation (2-3 sentences)',
    order: 34,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-detailed',
    chapter: 'chapter-11',
    title: 'Report Confidence Interval for Mean Difference',
    description: 'Understand and report confidence intervals in t-tests',
    instructions: 'Run an independent samples t-test and enable "Mean difference" confidence interval. Explain what the 95% CI tells you about the true population difference.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'In Independent Samples T-Test, check "Confidence interval" under Additional Statistics',
    sample_data: {
      columns: ['Treatment', 'BloodPressure'],
      rows: [
        { Treatment: 'Drug', BloodPressure: 118 },
        { Treatment: 'Placebo', BloodPressure: 128 }
      ]
    },
    success_message: 'The 95% CI means: if we repeated this study many times, 95% of the intervals would contain the true population mean difference. If the CI excludes 0, the difference is significant at α = .05.',
    order: 35,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'nonparametric-tests',
    chapter: 'chapter-11',
    title: 'Run Mann-Whitney U Test',
    description: 'Use non-parametric alternative when normality is violated',
    instructions: 'Your data fail the normality test. Instead of an independent samples t-test, run a Mann-Whitney U test (the non-parametric equivalent).',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Independent Samples T-Test, expand Tests and check "Mann-Whitney U"',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['ID', 'Group', 'SkewedData'],
      rows: [
        { ID: 1, Group: 'A', SkewedData: 12 },
        { ID: 2, Group: 'B', SkewedData: 156 }
      ]
    },
    success_message: 'Correct! Mann-Whitney U tests if one group tends to have higher values than the other, without assuming normality. It ranks the data instead of using raw values.',
    order: 36,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'nonparametric-tests',
    chapter: 'chapter-11',
    title: 'Run Wilcoxon Signed-Rank Test',
    description: 'Non-parametric alternative to paired samples t-test',
    instructions: 'Your paired data violate normality. Run a Wilcoxon signed-rank test instead of a paired samples t-test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In Paired Samples T-Test, expand Tests and check "Wilcoxon rank"',
    expected_selections: [
      { menu: 'analyses', option: 'ttests', subOption: 'paired' }
    ],
    sample_data: {
      columns: ['ID', 'Before', 'After'],
      rows: [
        { ID: 1, Before: 15, After: 12 },
        { ID: 2, Before: 22, After: 18 }
      ]
    },
    success_message: 'Correct! Wilcoxon signed-rank test is the non-parametric version of paired samples t-test. It tests if the median difference differs from zero.',
    order: 37,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'nonparametric-tests',
    chapter: 'chapter-11',
    title: 'When to Use Non-Parametric Tests',
    description: 'Decide between parametric and non-parametric tests',
    instructions: 'List three conditions under which you should consider using Mann-Whitney U or Wilcoxon instead of a t-test.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Think about: normality, outliers, sample size, and measurement scale.',
    sample_answer: '(1) Normality assumption is violated (Shapiro-Wilk p < .05)\n(2) Data have extreme outliers that heavily influence the mean\n(3) Data are ordinal rather than truly continuous/interval\n(4) Very small sample sizes where normality can\'t be reliably assessed',
    submission: 'List at least 3 conditions',
    order: 38,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-practice',
    chapter: 'chapter-11',
    title: 'Complete T-Test Analysis with Write-Up',
    phase: 'practice',
    description: 'Conduct full analysis from assumption checks to reporting',
    instructions: 'Choose independent or paired samples data. (1) Check assumptions, (2) Run appropriate t-test, (3) Calculate effect size, (4) Write APA-style results section.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Include: descriptive stats, assumption check results, test choice justification, t(df)=X.XX, p=.XXX, d=X.XX, and interpretation.',
    submission: 'Screenshots of: (1) assumption checks, (2) t-test output, (3) complete APA write-up (paragraph format, 4-6 sentences)',
    order: 39,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-practice',
    chapter: 'chapter-11',
    title: 'Compare Paired Data: Compute Difference Scores',
    phase: 'practice',
    description: 'Understand that paired t-test = one-sample t-test on differences',
    instructions: 'Create a computed variable for the difference (After - Before). Run a one-sample t-test on the difference scores (test value = 0). Compare to paired samples t-test results - they should be identical!',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Data > Compute to create difference scores, then run One Sample T-Test with test value 0',
    submission: 'Screenshots showing: (1) computed difference variable, (2) one-sample t-test on differences, (3) paired samples t-test, (4) 2-sentence explanation of why they match',
    order: 40,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-interpretation',
    chapter: 'chapter-11',
    title: 'Interpret Positive vs Negative T-Statistics',
    phase: 'practice',
    description: 'Understand what the sign of t tells you',
    instructions: 'You get t = -2.45 when comparing Group A to Group B. Explain: (1) Which group has the higher mean? (2) Does the sign of t affect the p-value for a two-sided test? (3) When does the sign matter?',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Negative t means the first group (Group A) has a lower mean than the second group. For two-sided tests, the sign doesn\'t affect significance.',
    sample_answer: '(1) Group B has the higher mean (negative t means Group A < Group B)\n(2) No, for two-sided tests, only the absolute value matters: t = -2.45 and t = +2.45 give the same two-sided p-value\n(3) The sign DOES matter for one-sided tests - it must match your directional prediction',
    submission: 'Written answers to all 3 questions',
    order: 41,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-assumptions',
    chapter: 'chapter-11',
    title: 'Robustness of T-Test to Assumption Violations',
    phase: 'apply',
    description: 'Understand when t-tests are robust vs fragile',
    instructions: 'Research and explain: The t-test is considered "robust" to violations of normality when sample sizes are large (N > 30). Why? What about the equal variance assumption - is the t-test robust to that?',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Think about the Central Limit Theorem. Also: Student\'s t-test is NOT robust to unequal variances, but Welch\'s is.',
    sample_answer: 'The t-test is robust to normality violations with large N because of the Central Limit Theorem: the sampling distribution of means becomes approximately normal even if the population isn\'t, especially with N > 30. However, Student\'s t-test is NOT robust to unequal variances (homogeneity violation) - this can severely affect Type I error rates. That\'s why Welch\'s t-test is generally preferred: it doesn\'t assume equal variances and is therefore more robust.',
    submission: 'Written explanation (4-6 sentences) addressing both normality and equal variance assumptions',
    order: 42,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-practice',
    chapter: 'chapter-11',
    title: 'Pooled vs Separate Variance Estimates',
    phase: 'apply',
    description: 'Understand how Student and Welch t-tests differ',
    instructions: 'Examine your data. (1) Calculate variance for each group separately in Descriptives. (2) Run both Student\'s and Welch\'s t-test. (3) Compare the degrees of freedom. (4) Explain why Welch\'s df is usually not a whole number.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Student uses pooled variance estimate (assumes equal variances). Welch uses separate variance estimates for each group, leading to adjusted df.',
    submission: 'Screenshots and 3-4 sentence explanation of the df difference',
    order: 43,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'effect-size-ttests',
    chapter: 'chapter-11',
    title: 'Statistical vs Practical Significance in T-Tests',
    phase: 'apply',
    description: 'Distinguish between significant p-values and meaningful effects',
    instructions: 'Create a scenario where: t(998) = 2.10, p = .036, d = 0.06. Explain why this is statistically significant but probably not practically important.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Large samples (N=1000) can detect tiny effects as "significant". Effect size tells you if it actually matters.',
    sample_answer: 'With N = 1000 (df = 998), the test has enormous power to detect even trivial differences as statistically significant (p < .05). Cohen\'s d = 0.06 is far below even the "small" effect benchmark (0.2), meaning the groups differ by only 0.06 standard deviations - essentially negligible. This demonstrates why we MUST report effect sizes: p-values only tell you if an effect is detectable, not if it\'s meaningful. In practical terms, such a tiny difference would likely have no real-world impact.',
    submission: 'Written explanation (4-5 sentences)',
    order: 44,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-comprehensive',
    chapter: 'chapter-11',
    title: 'Decision Tree: Choose the Right T-Test',
    phase: 'apply',
    description: 'Create a decision flowchart for selecting the appropriate test',
    instructions: 'Create a decision tree/flowchart that helps you choose between: (1) One-sample t-test, (2) Independent samples t-test (Student or Welch), (3) Paired samples t-test, (4) Mann-Whitney U, (5) Wilcoxon signed-rank. Include decision points for: number of groups, independence, normality, and equal variances.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Start with: "How many groups?" Then: "Same or different participants?" Then: "Normal data?" Then: "Equal variances?"',
    submission: 'Decision tree diagram (can be hand-drawn and photographed, or created digitally) with clear decision points and outcomes',
    order: 45,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests-comprehensive',
    chapter: 'chapter-11',
    title: 'Full T-Test Manuscript Results Section',
    phase: 'apply',
    description: 'Write publication-ready results for a t-test analysis',
    instructions: 'Using real or simulated data, write a complete Results section as it would appear in a journal article. Include: (1) Descriptive statistics table, (2) Assumption checks paragraph, (3) Test results with all statistics, (4) Effect size interpretation, (5) Conclusion. Aim for 2-3 paragraphs plus one table.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Model your write-up on published papers. Be precise, include all relevant statistics, but write in clear prose (not just numbers).',
    submission: 'Complete Results section in APA format (2-3 paragraphs + table)',
    order: 46,
    is_active: true
  },

  // Chapter 13: Comparing Several Means (One-Way ANOVA)
  {
    module: 'module-8',
    topic: 'one-way-anova',
    chapter: 'chapter-13',
    title: 'Run One-Way ANOVA in jamovi',
    description: 'Compare means across three or more independent groups',
    instructions: 'Run a one-way ANOVA comparing mood improvement across three drugs (Placebo, Anxifree, Joyzepam). Include effect size (eta-squared).',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Use Analyses > ANOVA > ANOVA. Move outcome to Dependent Variable and grouping factor to Fixed Factors.',
    expected_selections: [
      { menu: 'analyses', option: 'anova', subOption: 'anova' }
    ],
    sample_data: {
      columns: ['ID', 'Drug', 'MoodGain'],
      rows: [
        { ID: 1, Drug: 'Placebo', MoodGain: 0.5 },
        { ID: 2, Drug: 'Anxifree', MoodGain: 0.7 },
        { ID: 3, Drug: 'Joyzepam', MoodGain: 1.5 }
      ]
    },
    success_message: 'Correct! ANOVA compares group means. Check the Effect Size option to get η² (eta-squared).',
    order: 47,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'one-way-anova',
    chapter: 'chapter-13',
    title: 'Interpret ANOVA F-Statistic',
    phase: 'practice',
    description: 'Understand what the F-ratio represents',
    instructions: 'Explain what the F-ratio measures in ANOVA. What does a large F-value indicate? What happens when group means are very similar?',
    software_type: 'conceptual',
    exercise_type: 'conceptual',
    hint: 'F = Between-group variance / Within-group variance',
    sample_answer: 'The F-ratio compares between-group variance (differences among group means) to within-group variance (error). A large F indicates that differences between groups are much larger than random variation within groups, suggesting real group differences. When group means are similar, F ≈ 1 because between-group variance equals error variance.',
    submission: '3-4 sentences explaining F-ratio interpretation',
    order: 48,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'post-hoc-tests',
    chapter: 'chapter-13',
    title: 'Run Post-Hoc Tests with Holm Correction',
    description: 'Identify which specific groups differ after significant ANOVA',
    instructions: 'After running ANOVA, conduct post-hoc pairwise comparisons using the Holm correction to control for multiple testing.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'In ANOVA analysis, go to Post Hoc Tests, move your factor to the right panel, and select Holm correction.',
    expected_selections: [
      { menu: 'post_hoc', option: 'holm' }
    ],
    success_message: 'Correct! Holm correction adjusts p-values to control family-wise error rate while being less conservative than Bonferroni.',
    order: 49,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'post-hoc-tests',
    chapter: 'chapter-13',
    title: 'Understanding Multiple Comparisons Problem',
    phase: 'practice',
    description: 'Why corrections are needed for post-hoc tests',
    instructions: 'Calculate the family-wise error rate when running 3 pairwise t-tests at α = .05 without correction. Explain why this is a problem.',
    software_type: 'conceptual',
    exercise_type: 'written_response',
    hint: 'Family-wise error rate ≈ 1 - (1 - α)^m, where m = number of comparisons',
    sample_answer: 'With 3 comparisons at α = .05:\nFamily-wise error ≈ 1 - (0.95)³ = 1 - 0.857 = 0.143 (14.3%)\n\nThis means there\'s a 14% chance of at least one false positive across all three tests, well above our intended 5% rate. Multiple corrections (Bonferroni, Holm) control this inflated error rate.',
    submission: 'Calculation and 2-3 sentences explaining the problem',
    order: 50,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova-assumptions',
    chapter: 'chapter-13',
    title: 'Check Homogeneity of Variance (Levene Test)',
    description: 'Test if groups have equal variances',
    instructions: 'Run Levene\'s test to check the homogeneity of variance assumption. Interpret the result (p-value).',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Under ANOVA Assumption Checks, select Homogeneity tests. If p > .05, variances are equal.',
    success_message: 'Levene\'s test checks if group variances are significantly different. Non-significant result (p > .05) means assumption is met.',
    order: 51,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova-assumptions',
    chapter: 'chapter-13',
    title: 'Check Normality with Q-Q Plot',
    description: 'Assess normality of residuals visually',
    instructions: 'Generate a Q-Q plot for ANOVA residuals and assess whether normality assumption is met.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Under Assumption Checks, select Q-Q plot. Points should fall on the diagonal line if normality holds.',
    success_message: 'Q-Q plots show if residuals are normally distributed. Deviations from the line indicate non-normality.',
    order: 52,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova-alternatives',
    chapter: 'chapter-13',
    title: 'Run Welch\'s ANOVA (Unequal Variances)',
    description: 'Use Welch test when homogeneity of variance is violated',
    instructions: 'Run Welch\'s one-way ANOVA, which does not assume equal variances. Compare to standard ANOVA F-value.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Use Analyses > ANOVA > One-Way ANOVA, then check Welch\'s option.',
    expected_selections: [
      { menu: 'analyses', option: 'anova', subOption: 'oneway-welch' }
    ],
    success_message: 'Correct! Welch\'s ANOVA adjusts degrees of freedom to account for unequal variances, making it more robust.',
    order: 53,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova-alternatives',
    chapter: 'chapter-13',
    title: 'Run Kruskal-Wallis Test (Non-Parametric)',
    description: 'Use non-parametric alternative when normality is violated',
    instructions: 'Run a Kruskal-Wallis test as a non-parametric alternative to one-way ANOVA. This test works on ranks instead of raw scores.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Use Analyses > ANOVA > Non-Parametric > One-Way ANOVA (Kruskal-Wallis).',
    expected_selections: [
      { menu: 'analyses', option: 'non-parametric', subOption: 'kruskal-wallis' }
    ],
    success_message: 'Correct! Kruskal-Wallis is the non-parametric version of one-way ANOVA, used when normality assumption is violated.',
    order: 54,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'repeated-measures-anova',
    chapter: 'chapter-13',
    title: 'Run Repeated Measures ANOVA',
    description: 'Compare means when same participants are in all conditions',
    instructions: 'Run a repeated measures ANOVA comparing three task scores (Speech, Conceptual, Syntax) from the same 6 participants.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Use Analyses > ANOVA > Repeated Measures ANOVA. Define a within-subjects factor with 3 levels.',
    expected_selections: [
      { menu: 'analyses', option: 'anova', subOption: 'repeated-measures' }
    ],
    success_message: 'Correct! Repeated measures ANOVA accounts for the fact that same participants appear in all conditions, increasing power.',
    order: 55,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'repeated-measures-anova',
    chapter: 'chapter-13',
    title: 'Check Sphericity Assumption (Mauchly Test)',
    description: 'Test sphericity assumption for repeated measures ANOVA',
    instructions: 'Run Mauchly\'s test of sphericity. If violated (p < .05), apply Greenhouse-Geisser or Huynh-Feldt correction.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Under Assumption Checks, select Sphericity tests. If GG ε < .75, use GG correction; if > .75, use HF.',
    success_message: 'Mauchly\'s test checks if variances of differences between conditions are equal. Corrections adjust for violations.',
    order: 56,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'repeated-measures-anova',
    chapter: 'chapter-13',
    title: 'Friedman Test (Non-Parametric Repeated Measures)',
    description: 'Non-parametric alternative to repeated measures ANOVA',
    instructions: 'Run a Friedman test when repeated measures data violate normality assumption.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Use Analyses > ANOVA > Non-Parametric > Repeated Measures ANOVA (Non-parametric).',
    expected_selections: [
      { menu: 'analyses', option: 'non-parametric', subOption: 'friedman' }
    ],
    success_message: 'Correct! Friedman test is like Kruskal-Wallis but for repeated measures designs.',
    order: 57,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'one-way-anova',
    chapter: 'chapter-13',
    title: 'Complete ANOVA Write-Up',
    phase: 'apply',
    description: 'Report complete ANOVA analysis in APA format',
    instructions: 'Conduct a full one-way ANOVA analysis including: (1) Check assumptions (Levene, Q-Q plot), (2) Run ANOVA with effect size, (3) Conduct post-hoc tests with Holm correction, (4) Write complete APA-formatted results.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Report: F(df_between, df_within) = F-value, p = p-value, η² = effect size. Then describe post-hoc findings.',
    sample_answer: 'A one-way ANOVA was conducted to compare mood improvement across three drug conditions (Placebo, Anxifree, Joyzepam). Levene\'s test indicated homogeneity of variance (p = .27), and Q-Q plot suggested normally distributed residuals. The ANOVA revealed a significant effect of drug type, F(2, 15) = 18.61, p < .001, η² = 0.71. Post-hoc tests using Holm correction showed that Joyzepam produced significantly greater mood improvement than both Anxifree (p = .001) and Placebo (p < .001). No significant difference was found between Anxifree and Placebo (p = .15).',
    submission: 'Complete analysis including: (1) Assumption checks, (2) jamovi output screenshot, (3) APA-formatted results paragraph (4-6 sentences)',
    order: 58,
    is_active: true
  }
]

// Helper to get exercises by module
export function getExercisesByModule(moduleId) {
  return statisticsExercises.filter(ex => ex.module === moduleId)
}

// Helper to get all exercises for a topic
export function getExercisesByTopic(topic) {
  return statisticsExercises.filter(ex => ex.topic === topic)
}

// Export for seeding PocketBase
export function getExercisesForPocketBase(classId) {
  return statisticsExercises.map((ex, index) => ({
    class: classId,
    topic: ex.topic,
    title: ex.title,
    description: ex.description,
    instructions: ex.instructions,
    software_type: ex.software_type,
    exercise_type: ex.exercise_type,
    hint: ex.hint,
    expected_selections: ex.expected_selections,
    sample_data: ex.sample_data,
    success_message: ex.success_message,
    order: ex.order,
    is_active: ex.is_active
  }))
}

