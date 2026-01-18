// Sample simulation exercises for testing
// These would typically be stored in PocketBase's simulation_exercises collection

export const sampleExercises = {
  'descriptive-stats': {
    jamovi: [
      {
        id: 'desc-jamovi-1',
        title: 'Calculate Mean and Standard Deviation',
        description: 'Navigate to the correct menu to calculate descriptive statistics',
        instructions: 'You have a dataset with exam scores. Find the menu path in jamovi to calculate the mean and standard deviation.',
        software_type: 'jamovi',
        exercise_type: 'menu_navigation',
        hint: 'Look under the Analyses menu for Exploration options',
        expectedSelections: [
          { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
        ],
        highlightPath: [
          { menu: 'analyses' },
          { menu: 'analyses', option: 'exploration' },
          { menu: 'analyses', option: 'exploration', subOption: 'descriptives' }
        ],
        sampleData: {
          columns: ['StudentID', 'ExamScore', 'StudyHours'],
          rows: [
            { StudentID: 1, ExamScore: 85, StudyHours: 4 },
            { StudentID: 2, ExamScore: 72, StudyHours: 2 },
            { StudentID: 3, ExamScore: 91, StudyHours: 5 },
            { StudentID: 4, ExamScore: 68, StudyHours: 3 },
            { StudentID: 5, ExamScore: 78, StudyHours: 4 }
          ]
        },
        successMessage: 'Correct! Analyses → Exploration → Descriptives is where you find measures of central tendency and variability.',
        failureMessage: 'Not quite. Remember, descriptive statistics are found under the Exploration submenu in Analyses.',
        order: 1
      },
      {
        id: 'desc-jamovi-2',
        title: 'Create a Histogram',
        description: 'Find the menu to create a histogram of your data',
        instructions: 'You want to visualize the distribution of test scores. Navigate to create a histogram.',
        software_type: 'jamovi',
        exercise_type: 'menu_navigation',
        hint: 'Histograms are also under Exploration',
        expectedSelections: [
          { menu: 'analyses', option: 'exploration', subOption: 'histograms' }
        ],
        sampleData: {
          columns: ['ID', 'Score'],
          rows: [
            { ID: 1, Score: 75 },
            { ID: 2, Score: 82 },
            { ID: 3, Score: 68 },
            { ID: 4, Score: 91 },
            { ID: 5, Score: 77 }
          ]
        },
        order: 2
      }
    ],
    spss: [
      {
        id: 'desc-spss-1',
        title: 'Run Descriptive Statistics',
        description: 'Find the SPSS menu for descriptive statistics',
        instructions: 'Calculate the mean, median, and standard deviation of your reaction time data using SPSS menus.',
        software_type: 'spss',
        exercise_type: 'menu_navigation',
        hint: 'Look under Analyze → Descriptive Statistics',
        expectedSelections: [
          { menu: 'analyze', option: 'descriptive', subOption: 'descriptives' }
        ],
        sampleData: {
          columns: ['ParticipantID', 'ReactionTime', 'Condition'],
          rows: [
            { ParticipantID: 1, ReactionTime: 245, Condition: 1 },
            { ParticipantID: 2, ReactionTime: 312, Condition: 2 },
            { ParticipantID: 3, ReactionTime: 198, Condition: 1 },
            { ParticipantID: 4, ReactionTime: 287, Condition: 2 },
            { ParticipantID: 5, ReactionTime: 234, Condition: 1 }
          ]
        },
        order: 1
      }
    ],
    r: [
      {
        id: 'desc-r-1',
        title: 'Calculate Mean in R',
        description: 'Write R code to calculate the mean of a variable',
        instructions: 'You have a vector called "scores" containing exam scores. Write the R code to calculate its mean.',
        software_type: 'r',
        exercise_type: 'code',
        hint: 'Use the mean() function with the variable name as the argument',
        starterCode: '# Calculate the mean of scores\n',
        expectedCode: {
          patterns: ['mean\\s*\\(\\s*scores\\s*\\)'],
          requiredFunctions: ['mean'],
          requiredArgs: { mean: ['scores'] }
        },
        placeholder: '# Write your R code here...',
        successMessage: 'Correct! mean(scores) returns the arithmetic mean of the scores vector.',
        failureMessage: 'Check your syntax. The mean() function takes a vector as its argument.',
        order: 1
      },
      {
        id: 'desc-r-2',
        title: 'Summary Statistics in R',
        description: 'Use summary() to get descriptive statistics',
        instructions: 'Get a complete summary of the "data" dataframe including min, max, median, and quartiles.',
        software_type: 'r',
        exercise_type: 'code',
        hint: 'The summary() function provides a comprehensive overview',
        starterCode: '# Get summary statistics for the data\n',
        expectedCode: {
          patterns: ['summary\\s*\\(\\s*data\\s*\\)'],
          requiredFunctions: ['summary']
        },
        order: 2
      },
      {
        id: 'desc-r-3',
        title: 'Standard Deviation in R',
        description: 'Calculate the standard deviation',
        instructions: 'Calculate the standard deviation of the "ages" vector.',
        software_type: 'r',
        exercise_type: 'code',
        hint: 'The function name is sd() in R',
        starterCode: '# Calculate standard deviation of ages\n',
        expectedCode: {
          patterns: ['sd\\s*\\(\\s*ages\\s*\\)'],
          requiredFunctions: ['sd']
        },
        order: 3
      }
    ],
    stata: [
      {
        id: 'desc-stata-1',
        title: 'Summarize Variables in Stata',
        description: 'Use the summarize command',
        instructions: 'Get descriptive statistics for the variable "income" using Stata.',
        software_type: 'stata',
        exercise_type: 'code',
        hint: 'The summarize command (or sum for short) provides descriptive stats',
        starterCode: '',
        expectedCode: {
          patterns: ['(summarize|sum)\\s+income'],
          requiredCommands: ['summarize', 'sum']
        },
        variables: [
          { name: 'id', type: 'int' },
          { name: 'income', type: 'float' },
          { name: 'age', type: 'int' },
          { name: 'education', type: 'str' }
        ],
        order: 1
      }
    ]
  },
  't-tests': {
    jamovi: [
      {
        id: 'ttest-jamovi-1',
        title: 'Independent Samples T-Test',
        description: 'Navigate to run an independent samples t-test',
        instructions: 'You want to compare test scores between two groups (Control vs Treatment). Find the correct analysis.',
        software_type: 'jamovi',
        exercise_type: 'menu_navigation',
        hint: 'T-Tests are under Analyses, and you need the Independent Samples version',
        expectedSelections: [
          { menu: 'analyses', option: 'ttests', subOption: 'independent' }
        ],
        sampleData: {
          columns: ['ID', 'Score', 'Group'],
          rows: [
            { ID: 1, Score: 78, Group: 'Control' },
            { ID: 2, Score: 85, Group: 'Treatment' },
            { ID: 3, Score: 72, Group: 'Control' },
            { ID: 4, Score: 91, Group: 'Treatment' },
            { ID: 5, Score: 69, Group: 'Control' }
          ]
        },
        order: 1
      },
      {
        id: 'ttest-jamovi-2',
        title: 'Paired Samples T-Test',
        description: 'Navigate to run a paired samples t-test',
        instructions: 'You have pre-test and post-test scores from the same participants. Find the paired t-test.',
        software_type: 'jamovi',
        exercise_type: 'menu_navigation',
        hint: 'Paired samples means the same subjects measured twice',
        expectedSelections: [
          { menu: 'analyses', option: 'ttests', subOption: 'paired' }
        ],
        sampleData: {
          columns: ['ParticipantID', 'PreTest', 'PostTest'],
          rows: [
            { ParticipantID: 1, PreTest: 65, PostTest: 78 },
            { ParticipantID: 2, PreTest: 72, PostTest: 85 },
            { ParticipantID: 3, PreTest: 58, PostTest: 71 },
            { ParticipantID: 4, PreTest: 80, PostTest: 88 },
            { ParticipantID: 5, PreTest: 69, PostTest: 82 }
          ]
        },
        order: 2
      }
    ],
    r: [
      {
        id: 'ttest-r-1',
        title: 'Two-Sample T-Test in R',
        description: 'Write R code for an independent samples t-test',
        instructions: 'Compare "treatment_scores" and "control_scores" using a two-sample t-test.',
        software_type: 'r',
        exercise_type: 'code',
        hint: 'Use t.test() with both vectors as arguments',
        starterCode: '# Compare treatment and control groups\n',
        expectedCode: {
          patterns: ['t\\.test\\s*\\('],
          requiredFunctions: ['t.test']
        },
        order: 1
      }
    ]
  },
  'correlation': {
    jamovi: [
      {
        id: 'corr-jamovi-1',
        title: 'Correlation Matrix',
        description: 'Find the correlation analysis in jamovi',
        instructions: 'You want to examine the relationship between study hours and exam scores. Find the correlation analysis.',
        software_type: 'jamovi',
        exercise_type: 'menu_navigation',
        hint: 'Correlation is under Regression in jamovi',
        expectedSelections: [
          { menu: 'analyses', option: 'regression', subOption: 'correlation' }
        ],
        sampleData: {
          columns: ['Student', 'StudyHours', 'ExamScore'],
          rows: [
            { Student: 1, StudyHours: 2, ExamScore: 65 },
            { Student: 2, StudyHours: 5, ExamScore: 88 },
            { Student: 3, StudyHours: 3, ExamScore: 72 },
            { Student: 4, StudyHours: 6, ExamScore: 95 },
            { Student: 5, StudyHours: 4, ExamScore: 81 }
          ]
        },
        order: 1
      }
    ],
    r: [
      {
        id: 'corr-r-1',
        title: 'Correlation in R',
        description: 'Calculate correlation coefficient',
        instructions: 'Calculate the Pearson correlation between vectors "x" and "y".',
        software_type: 'r',
        exercise_type: 'code',
        hint: 'Use the cor() function with both variables',
        starterCode: '# Calculate correlation between x and y\n',
        expectedCode: {
          patterns: ['cor\\s*\\(\\s*x\\s*,\\s*y\\s*\\)', 'cor\\s*\\(\\s*y\\s*,\\s*x\\s*\\)'],
          requiredFunctions: ['cor']
        },
        order: 1
      }
    ]
  }
}

// Helper to get exercises for a topic and software
export function getExercisesForTopic(topicId, softwareType = null) {
  const topicExercises = sampleExercises[topicId]
  if (!topicExercises) return []

  if (softwareType) {
    return topicExercises[softwareType] || []
  }

  // Return all exercises for the topic
  return Object.values(topicExercises).flat()
}

// Export for potential seeding to PocketBase
export function getAllExercises() {
  const all = []
  for (const [topicId, softwareGroups] of Object.entries(sampleExercises)) {
    for (const [software, exercises] of Object.entries(softwareGroups)) {
      for (const exercise of exercises) {
        all.push({
          ...exercise,
          topic: topicId
        })
      }
    }
  }
  return all
}
