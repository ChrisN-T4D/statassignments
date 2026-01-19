// Topics data - organized to match course modules
// Each topic belongs to a specific module defined in modules.js

export const topics = [
  // Module 1: Introductions and Why Learn Stats
  {
    id: 'intro-to-stats',
    moduleId: 'module-1',
    title: 'Introduction to Statistics',
    description: 'What is statistics and why does it matter for psychology?',
    icon: '📖'
  },
  {
    id: 'why-stats-matter',
    moduleId: 'module-1',
    title: 'Why Statistics Matters',
    description: 'Real-world applications and the importance of data literacy.',
    icon: '💡'
  },

  // Module 2: Research Design & Measurement
  {
    id: 'variables-measurement',
    moduleId: 'module-2',
    title: 'Variables and Measurement',
    description: 'Independent vs dependent variables, operationalization.',
    icon: '📏'
  },
  {
    id: 'scales-of-measurement',
    moduleId: 'module-2',
    title: 'Scales of Measurement',
    description: 'Nominal, Ordinal, Interval, and Ratio (NOIR) scales.',
    icon: '📐'
  },
  {
    id: 'research-design',
    moduleId: 'module-2',
    title: 'Research Design Basics',
    description: 'Experimental, quasi-experimental, and correlational designs.',
    icon: '🔬'
  },

  // Module 3: Jamovi and Data Handling
  {
    id: 'jamovi-interface',
    moduleId: 'module-3',
    title: 'The Jamovi Interface',
    description: 'Navigate the spreadsheet, results panel, and ribbon tabs.',
    icon: '💻'
  },
  {
    id: 'data-entry',
    moduleId: 'module-3',
    title: 'Entering and Importing Data',
    description: 'Manual entry, CSV import, and data validation.',
    icon: '📥'
  },
  {
    id: 'variable-types',
    moduleId: 'module-3',
    title: 'Variable Types in Jamovi',
    description: 'Setting measurement levels and data types correctly.',
    icon: '🏷️'
  },

  // Module 4: Descriptive Statistics
  {
    id: 'central-tendency',
    moduleId: 'module-4',
    title: 'Measures of Central Tendency',
    description: 'Mean, median, and mode - when to use each.',
    icon: '🎯'
  },
  {
    id: 'variability',
    moduleId: 'module-4',
    title: 'Measures of Variability',
    description: 'Range, variance, standard deviation, and IQR.',
    icon: '📊'
  },
  {
    id: 'descriptive-stats',
    moduleId: 'module-4',
    title: 'Descriptive Statistics in Practice',
    description: 'Running and interpreting descriptives in Jamovi.',
    icon: '📋'
  },

  // Module 5: Graphing and Visualization
  {
    id: 'histograms',
    moduleId: 'module-5',
    title: 'Histograms',
    description: 'Visualize distributions and identify shape, center, spread.',
    icon: '📊'
  },
  {
    id: 'boxplots',
    moduleId: 'module-5',
    title: 'Box Plots',
    description: 'Display five-number summary and identify outliers.',
    icon: '📦'
  },
  {
    id: 'bar-charts',
    moduleId: 'module-5',
    title: 'Bar Charts',
    description: 'Visualize categorical data with bar and pie charts.',
    icon: '📶'
  },
  {
    id: 'scatterplots',
    moduleId: 'module-5',
    title: 'Scatter Plots',
    description: 'Visualize relationships between two continuous variables.',
    icon: '📈'
  },

  // Module 6: Probability and Sampling
  {
    id: 'probability-basics',
    moduleId: 'module-6',
    title: 'Probability Basics',
    description: 'Fundamental probability rules and calculations.',
    icon: '🎲'
  },
  {
    id: 'normal-distribution',
    moduleId: 'module-6',
    title: 'The Normal Distribution',
    description: 'Properties of the bell curve and the empirical rule.',
    icon: '🔔'
  },
  {
    id: 'z-scores',
    moduleId: 'module-6',
    title: 'Z-Scores and Standardization',
    description: 'Converting raw scores and using z-tables.',
    icon: '📐'
  },
  {
    id: 'sampling-distributions',
    moduleId: 'module-6',
    title: 'Sampling Distributions',
    description: 'The central limit theorem and standard error.',
    icon: '🎯'
  },

  // Module 7: Hypothesis Testing
  {
    id: 'hypothesis-testing',
    moduleId: 'module-7',
    title: 'Hypothesis Testing Logic',
    description: 'Null and alternative hypotheses, decision making.',
    icon: '🔍'
  },
  {
    id: 'p-values',
    moduleId: 'module-7',
    title: 'Understanding P-Values',
    description: 'What p-values mean and common misinterpretations.',
    icon: '📊'
  },
  {
    id: 'effect-size',
    moduleId: 'module-7',
    title: 'Effect Sizes',
    description: "Cohen's d, r, and practical significance.",
    icon: '📏'
  },
  {
    id: 'confidence-intervals',
    moduleId: 'module-7',
    title: 'Confidence Intervals',
    description: 'Estimating population parameters with uncertainty.',
    icon: '🎯'
  },

  // Module 8: Comparing Groups/Relationships
  {
    id: 't-tests',
    moduleId: 'module-8',
    title: 'T-Tests',
    description: 'One-sample, independent, and paired t-tests.',
    icon: '⚖️'
  },
  {
    id: 'correlation',
    moduleId: 'module-8',
    title: 'Correlation',
    description: 'Pearson and Spearman correlation coefficients.',
    icon: '🔗'
  },
  {
    id: 'regression',
    moduleId: 'module-8',
    title: 'Simple Linear Regression',
    description: 'Predicting outcomes with regression equations.',
    icon: '📉'
  }
]

export const software = [
  { id: 'spss', name: 'SPSS', color: '#cc0000' },
  { id: 'r', name: 'R', color: '#276dc3' },
  { id: 'excel', name: 'Excel', color: '#217346' },
  { id: 'stata', name: 'Stata', color: '#1a476f' },
  { id: 'jamovi', name: 'jamovi', color: '#8b5cf6' }
]

// Helper functions
export function getTopicById(topicId) {
  return topics.find(t => t.id === topicId)
}

export function getTopicsByModule(moduleId) {
  return topics.filter(t => t.moduleId === moduleId)
}

export function getAllTopics() {
  return topics
}
