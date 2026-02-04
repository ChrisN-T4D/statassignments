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
    title: 'Module 8 - Comparing Groups/Relationships',
    description: 'Chi-square, t-tests, correlation, regression, and ANOVA',
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
    description: 'Learn how to import data into Jamovi',
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
    description: 'Practice adding a new computed variable to your dataset',
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
    description: 'Find the menu to calculate mean, median, and standard deviation',
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
    description: 'Install required modules from the jamovi Library',
    instructions: 'Use the + / Modules interface in jamovi to install scatr and GAMLj. Confirm they appear as installed.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Open the Modules library, search for scatr and GAMLj, and click Install for each.',
    submission: 'Screenshot showing scatr and GAMLj listed as installed modules.',
    order: 4,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'data-handling',
    title: 'Import CSV and Set Measurement Levels',
    phase: 'practice',
    description: 'Import a CSV and set measurement levels for at least 5 variables',
    instructions: 'Import a CSV file into jamovi and set the correct measurement levels (nominal/ordinal/continuous) for at least five variables.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use File > Open to import, then edit variable types in the variable editor.',
    submission: 'Saved .omv file showing measurement levels set correctly.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'computation',
    title: 'Create a Computed Variable',
    phase: 'practice',
    description: 'Use jamovi formulas to create a total score variable',
    instructions: 'Create a computed variable using jamovi formula syntax (e.g., total score from multiple items).',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Data > Add > Computed Variable, then use a formula like SUM(Item1, Item2, Item3).',
    submission: 'Screenshot of the formula panel and the new computed column.',
    order: 6,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'computation',
    title: 'Reverse-Score a Likert Item',
    phase: 'practice',
    description: 'Reverse-score an item and verify with paired values',
    instructions: 'Reverse-score one Likert item using Compute or Transform, then show five paired original/reversed values.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'For a 1-5 scale, a common transform is 6 - original.',
    submission: 'Screenshot showing the transform and five paired original/reversed values.',
    order: 7,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'computation',
    title: 'Recode Continuous to 3-Level Category',
    phase: 'practice',
    description: 'Create Low/Medium/High categories using a recode rule',
    instructions: 'Recode a continuous variable into three categories (Low/Medium/High) using a Transform or recode rules.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use a Transform with conditional rules based on cut points.',
    submission: 'Screenshot of the transform definition.',
    order: 8,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'data-handling',
    title: 'Apply a Filter and Compare Descriptives',
    phase: 'apply',
    description: 'Use a filter to exclude cases and compare outputs',
    instructions: 'Create and apply a filter (e.g., Age < 18). Run Descriptives with the filter ON and OFF to show the impact.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use the Filters panel and toggle the filter while running Descriptives.',
    submission: 'Screenshots of outputs with filter ON and OFF.',
    order: 9,
    is_active: true
  },
  {
    module: 'module-3',
    topic: 'r-setup',
    title: 'Install R and RStudio',
    description: 'Install R and RStudio and open a new script',
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
    description: 'Read a CSV file into a data frame',
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
    description: 'Create a total score column from multiple items',
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
    description: 'Start a new SPSS data file and name a variable',
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
    description: 'Load a CSV file into SPSS and verify the data',
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
    description: 'Improve readability of your dataset',
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
    description: 'Set up headers and enter data in rows',
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
    description: 'Open a CSV file and check for blanks',
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
    description: 'Use a formula to compute the mean score',
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
    description: 'Use sysuse to load a built-in dataset',
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
    description: 'Import CSV data with import delimited',
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
    description: 'Save your data as a .dta file',
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

  // ============ MODULE 8: Comparing Groups/Relationships ============
  {
    module: 'module-8',
    topic: 't-tests',
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
    order: 1,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 't-tests',
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
    order: 2,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'correlation',
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
    order: 3,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'regression',
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
    order: 4,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'chi-square',
    title: 'Run Chi-Square Test of Independence',
    description: 'Test if two categorical variables are related',
    instructions: 'Test whether gender is related to product preference (A vs B) using a chi-square test.',
    software_type: 'jamovi',
    exercise_type: 'menu_navigation',
    hint: 'Chi-square is under Analyses > Frequencies',
    expected_selections: [
      { menu: 'analyses', option: 'frequencies', subOption: 'independent' }
    ],
    sample_data: {
      columns: ['ID', 'Gender', 'Preference'],
      rows: [
        { ID: 1, Gender: 'Male', Preference: 'A' },
        { ID: 2, Gender: 'Female', Preference: 'B' }
      ]
    },
    success_message: 'Correct! Analyses > Frequencies > Independent Samples (Chi-square test of association). Add both categorical variables.',
    order: 5,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova',
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
    order: 6,
    is_active: true
  }
  ,
  {
    module: 'module-8',
    topic: 'correlation',
    title: 'Pearson Correlation with Interpretation',
    phase: 'practice',
    description: 'Run a correlation and interpret numeric and visual evidence',
    instructions: 'Run a Pearson correlation and interpret both the numeric correlation and the scatterplot evidence.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Regression > Correlation Matrix and enable plots.',
    submission: 'Output screenshot and 2-3 sentences of interpretation.',
    order: 7,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'regression',
    title: 'Simple Linear Regression Interpretation',
    phase: 'practice',
    description: 'Interpret slope and R-squared from output',
    instructions: 'Run a simple linear regression (DV ~ IV) and interpret the slope and R-squared from the output.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use Analyses > Regression > Linear Regression.',
    submission: 'Output screenshot and a short interpretation.',
    order: 8,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova',
    title: 'One-Way ANOVA in GAMLj',
    phase: 'apply',
    description: 'Run an ANOVA with post-hoc comparisons using GAMLj',
    instructions: 'Using GAMLj, run a one-way ANOVA with 3+ groups and obtain omnibus results plus post-hoc comparisons if available.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Open GAMLj from the Analyses menu after installing the add-on.',
    submission: 'GAMLj output screenshot.',
    order: 9,
    is_active: true
  },
  {
    module: 'module-8',
    topic: 'anova',
    title: 'Factorial ANOVA with Interaction Plot',
    phase: 'apply',
    description: 'Run a factorial ANOVA and interpret an interaction plot',
    instructions: 'Using GAMLj, run a factorial ANOVA and create/interpret an interaction plot.',
    software_type: 'jamovi',
    exercise_type: 'instructional',
    hint: 'Use GAMLj ANOVA and enable interaction plots.',
    submission: 'Interaction plot and a 4-5 sentence interpretation.',
    order: 10,
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

