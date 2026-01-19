// Course Modules - Based on "Learning Statistics with Jamovi"
// https://www.learnstatswithjamovi.com/

export const courseModules = [
  {
    id: 'module-1',
    number: 1,
    title: 'Introductions and Why Learn Stats',
    shortTitle: 'Why Stats?',
    description: 'Introduction to the course and the importance of statistics in psychology and research.',
    icon: '👋',
    color: '#6366f1',
    topics: ['intro-to-stats', 'why-stats-matter'],
    textbookChapters: ['Chapter 1: Why do we learn statistics?'],
    learningObjectives: [
      'Understand why statistics is essential for psychology',
      'Identify real-world applications of statistical thinking',
      'Overcome statistics anxiety with a growth mindset'
    ]
  },
  {
    id: 'module-2',
    number: 2,
    title: 'Research Design & Measurement',
    shortTitle: 'Research Design',
    description: 'Learn about variables, measurement levels, and research design fundamentals.',
    icon: '🔬',
    color: '#8b5cf6',
    topics: ['variables-measurement', 'research-design', 'scales-of-measurement'],
    textbookChapters: ['Chapter 2: A brief introduction to research design'],
    learningObjectives: [
      'Distinguish between independent and dependent variables',
      'Identify the four scales of measurement (NOIR)',
      'Understand experimental vs. correlational designs',
      'Recognize threats to validity'
    ]
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Jamovi and Data Handling',
    shortTitle: 'Jamovi Basics',
    description: 'Get hands-on with Jamovi software for data entry, import, and basic manipulation.',
    icon: '💻',
    color: '#0ea5e9',
    topics: ['jamovi-interface', 'data-entry', 'variable-types'],
    textbookChapters: ['Chapter 3: Getting started with Jamovi'],
    learningObjectives: [
      'Navigate the Jamovi interface',
      'Enter and import data correctly',
      'Set appropriate variable types and measurement levels',
      'Save and export Jamovi files'
    ],
    hasSoftwarePractice: true
  },
  {
    id: 'benchmark-1',
    number: null,
    title: 'Benchmark 1',
    shortTitle: 'Benchmark 1',
    description: 'Assessment covering Modules 1-3.',
    icon: '📝',
    color: '#f59e0b',
    topics: [],
    isBenchmark: true
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Descriptive Statistics',
    shortTitle: 'Descriptives',
    description: 'Calculate and interpret measures of central tendency and variability.',
    icon: '📊',
    color: '#10b981',
    topics: ['central-tendency', 'variability', 'descriptive-stats'],
    textbookChapters: ['Chapter 4: Descriptive statistics'],
    learningObjectives: [
      'Calculate mean, median, and mode',
      'Calculate range, variance, and standard deviation',
      'Choose appropriate measures for different data types',
      'Interpret descriptive statistics in context'
    ],
    hasSoftwarePractice: true
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Graphing and Visualization',
    shortTitle: 'Visualization',
    description: 'Create and interpret various types of statistical graphs and charts.',
    icon: '📈',
    color: '#ec4899',
    topics: ['histograms', 'boxplots', 'bar-charts', 'scatterplots'],
    textbookChapters: ['Chapter 5: Drawing graphs'],
    learningObjectives: [
      'Create histograms and interpret distributions',
      'Build and read box plots',
      'Construct bar charts for categorical data',
      'Use scatter plots to visualize relationships'
    ],
    hasSoftwarePractice: true
  },
  {
    id: 'benchmark-2',
    number: null,
    title: 'Benchmark 2',
    shortTitle: 'Benchmark 2',
    description: 'Assessment covering Modules 4-5.',
    icon: '📝',
    color: '#f59e0b',
    topics: [],
    isBenchmark: true
  },
  {
    id: 'module-6',
    number: 6,
    title: 'Probability and Sampling',
    shortTitle: 'Probability',
    description: 'Understand probability concepts and sampling distributions.',
    icon: '🎲',
    color: '#14b8a6',
    topics: ['probability-basics', 'normal-distribution', 'z-scores', 'sampling-distributions'],
    textbookChapters: [
      'Chapter 7: Probability',
      'Chapter 8: Estimating unknown quantities from a sample'
    ],
    learningObjectives: [
      'Calculate basic probabilities',
      'Understand the normal distribution and its properties',
      'Convert scores to z-scores and use z-tables',
      'Explain the central limit theorem'
    ],
    hasSoftwarePractice: true
  },
  {
    id: 'module-7',
    number: 7,
    title: 'Hypothesis Testing',
    shortTitle: 'Hypothesis Testing',
    description: 'Learn the logic and process of null hypothesis significance testing.',
    icon: '🔍',
    color: '#f97316',
    topics: ['hypothesis-testing', 'p-values', 'effect-size', 'confidence-intervals'],
    textbookChapters: ['Chapter 9: Hypothesis testing'],
    learningObjectives: [
      'State null and alternative hypotheses',
      'Understand Type I and Type II errors',
      'Interpret p-values correctly',
      'Calculate and interpret effect sizes'
    ],
    hasSoftwarePractice: true
  },
  {
    id: 'module-8',
    number: 8,
    title: 'Comparing Groups/Relationships',
    shortTitle: 'Comparisons',
    description: 'Apply t-tests and correlation to compare groups and examine relationships.',
    icon: '⚖️',
    color: '#dc2626',
    topics: ['t-tests', 'correlation', 'regression'],
    textbookChapters: [
      'Chapter 10: Comparing two means',
      'Chapter 11: Correlation and linear regression'
    ],
    learningObjectives: [
      'Conduct and interpret independent samples t-tests',
      'Conduct and interpret paired samples t-tests',
      'Calculate and interpret Pearson correlation',
      'Perform simple linear regression'
    ],
    hasSoftwarePractice: true
  }
]

// Topics organized by module
export const topicsByModule = {
  'module-1': [
    {
      id: 'intro-to-stats',
      title: 'Introduction to Statistics',
      description: 'What is statistics and why does it matter for psychology?',
      icon: '📖'
    },
    {
      id: 'why-stats-matter',
      title: 'Why Statistics Matters',
      description: 'Real-world applications and the importance of data literacy.',
      icon: '💡'
    }
  ],
  'module-2': [
    {
      id: 'variables-measurement',
      title: 'Variables and Measurement',
      description: 'Independent vs dependent variables, operationalization.',
      icon: '📏'
    },
    {
      id: 'scales-of-measurement',
      title: 'Scales of Measurement',
      description: 'Nominal, Ordinal, Interval, and Ratio (NOIR) scales.',
      icon: '📐'
    },
    {
      id: 'research-design',
      title: 'Research Design Basics',
      description: 'Experimental, quasi-experimental, and correlational designs.',
      icon: '🔬'
    }
  ],
  'module-3': [
    {
      id: 'jamovi-interface',
      title: 'The Jamovi Interface',
      description: 'Navigate the spreadsheet, results panel, and ribbon tabs.',
      icon: '💻'
    },
    {
      id: 'data-entry',
      title: 'Entering and Importing Data',
      description: 'Manual entry, CSV import, and data validation.',
      icon: '📥'
    },
    {
      id: 'variable-types',
      title: 'Variable Types in Jamovi',
      description: 'Setting measurement levels and data types correctly.',
      icon: '🏷️'
    }
  ],
  'module-4': [
    {
      id: 'central-tendency',
      title: 'Measures of Central Tendency',
      description: 'Mean, median, and mode - when to use each.',
      icon: '🎯'
    },
    {
      id: 'variability',
      title: 'Measures of Variability',
      description: 'Range, variance, standard deviation, and IQR.',
      icon: '📊'
    },
    {
      id: 'descriptive-stats',
      title: 'Descriptive Statistics in Practice',
      description: 'Running and interpreting descriptives in Jamovi.',
      icon: '📋'
    }
  ],
  'module-5': [
    {
      id: 'histograms',
      title: 'Histograms',
      description: 'Visualize distributions and identify shape, center, spread.',
      icon: '📊'
    },
    {
      id: 'boxplots',
      title: 'Box Plots',
      description: 'Display five-number summary and identify outliers.',
      icon: '📦'
    },
    {
      id: 'bar-charts',
      title: 'Bar Charts',
      description: 'Visualize categorical data with bar and pie charts.',
      icon: '📶'
    },
    {
      id: 'scatterplots',
      title: 'Scatter Plots',
      description: 'Visualize relationships between two continuous variables.',
      icon: '📈'
    }
  ],
  'module-6': [
    {
      id: 'probability-basics',
      title: 'Probability Basics',
      description: 'Fundamental probability rules and calculations.',
      icon: '🎲'
    },
    {
      id: 'normal-distribution',
      title: 'The Normal Distribution',
      description: 'Properties of the bell curve and the empirical rule.',
      icon: '🔔'
    },
    {
      id: 'z-scores',
      title: 'Z-Scores and Standardization',
      description: 'Converting raw scores and using z-tables.',
      icon: '📐'
    },
    {
      id: 'sampling-distributions',
      title: 'Sampling Distributions',
      description: 'The central limit theorem and standard error.',
      icon: '🎯'
    }
  ],
  'module-7': [
    {
      id: 'hypothesis-testing',
      title: 'Hypothesis Testing Logic',
      description: 'Null and alternative hypotheses, decision making.',
      icon: '🔍'
    },
    {
      id: 'p-values',
      title: 'Understanding P-Values',
      description: 'What p-values mean and common misinterpretations.',
      icon: '📊'
    },
    {
      id: 'effect-size',
      title: 'Effect Sizes',
      description: "Cohen's d, r, and practical significance.",
      icon: '📏'
    },
    {
      id: 'confidence-intervals',
      title: 'Confidence Intervals',
      description: 'Estimating population parameters with uncertainty.',
      icon: '🎯'
    }
  ],
  'module-8': [
    {
      id: 't-tests',
      title: 'T-Tests',
      description: 'One-sample, independent, and paired t-tests.',
      icon: '⚖️'
    },
    {
      id: 'correlation',
      title: 'Correlation',
      description: 'Pearson and Spearman correlation coefficients.',
      icon: '🔗'
    },
    {
      id: 'regression',
      title: 'Simple Linear Regression',
      description: 'Predicting outcomes with regression equations.',
      icon: '📉'
    }
  ]
}

// Helper functions
export function getModuleById(moduleId) {
  return courseModules.find(m => m.id === moduleId)
}

export function getTopicsForModule(moduleId) {
  return topicsByModule[moduleId] || []
}

export function getModulesWithContent() {
  return courseModules.filter(m => !m.isBenchmark)
}

export function getBenchmarks() {
  return courseModules.filter(m => m.isBenchmark)
}

export function getAllTopics() {
  return Object.values(topicsByModule).flat()
}

export function getTopicById(topicId) {
  for (const topics of Object.values(topicsByModule)) {
    const topic = topics.find(t => t.id === topicId)
    if (topic) return topic
  }
  return null
}

export function getModuleForTopic(topicId) {
  for (const [moduleId, topics] of Object.entries(topicsByModule)) {
    if (topics.some(t => t.id === topicId)) {
      return getModuleById(moduleId)
    }
  }
  return null
}
