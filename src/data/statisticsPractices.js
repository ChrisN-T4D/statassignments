// Statistics Class - Jamovi Practice Exercises
// These are simulation exercises for practicing Jamovi software skills
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

// Jamovi simulation exercises organized by module
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
