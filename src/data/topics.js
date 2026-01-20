// Topics data - organized to match course modules
// Each topic belongs to a specific module defined in modules.js

export const topics = [
  // Module 1: Introductions and Why Learn Stats
  {
    id: 'intro-to-stats',
    moduleId: 'module-1',
    title: 'Introduction to Statistics',
    description: 'What is statistics and why does it matter for psychology?',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/01-Why-do-we-learn-statistics.html',
    keyPoints: [
      'Statistics is needed because human reasoning is limited and biased; we should not rely on intuition alone.',
      'Statistics acts as a safeguard against belief-driven errors when evaluating evidence.',
      'Belief bias: conclusions that seem believable can distort judgments of logical validity.',
      'Classic syllogism studies (Evans, Barston, & Pollard, 1983) show systematic errors when belief conflicts with logic.',
      "Simpson's paradox shows aggregated data can reverse conclusions compared with disaggregated data.",
      'Real-world examples (e.g., admissions data by group) show how confounding can flip apparent effects.',
      'Psychology relies on statistics to make sense of noisy human data.',
      'Reading psychological research requires understanding statistical analyses and interpretation.',
      'Statistical literacy supports everyday decisions and critical reading of media reports.',
      'Statistics appears early in psychology curricula and supports later course performance.'
    ]
  },
  {
    id: 'why-stats-matter',
    moduleId: 'module-1',
    title: 'Why Statistics Matters',
    description: 'Real-world applications and the importance of data literacy.',
    icon: 'T',
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/02-A-brief-introduction-to-research-design.html',
    keyPoints: [
      'Research design is the overall plan that links questions, variables, sampling, data collection, and analysis.',
      'The chapter aims to give enough design logic to evaluate studies (validity and fit), not to make expert designers.',
      'Psychological measurement turns abstract constructs (e.g., anxiety, intelligence) into measurable variables.',
      'Operationalisation and measurement scales matter; poor measurement undermines later statistical analysis.',
      'Reliability is consistency across time/items/raters; low reliability limits interpretability.',
      'Validity means measuring what you intend; internal validity supports causal inference, external validity supports generalisation.',
      'Variables can be predictors or outcomes: variables that explain vs variables being explained.',
      'These roles align with independent vs dependent variables and how analyses are framed.',
      'Experimental designs involve researcher control and manipulation of predictors to test causal effects.',
      'Non-experimental designs measure variables without manipulation, limiting causal claims.'
    ]
  },

  // Module 2: Research Design & Measurement
  {
    id: 'variables-measurement',
    moduleId: 'module-2',
    title: 'Variables and Measurement',
    description: 'Independent vs dependent variables, operationalization.',
    icon: 'T'
  },
  {
    id: 'scales-of-measurement',
    moduleId: 'module-2',
    title: 'Scales of Measurement',
    description: 'Nominal, Ordinal, Interval, and Ratio (NOIR) scales.',
    icon: 'T'
  },
  {
    id: 'research-design',
    moduleId: 'module-2',
    title: 'Research Design Basics',
    description: 'Experimental, quasi-experimental, and correlational designs.',
    icon: 'T'
  },

  // Module 3: Jamovi and Data Handling
  {
    id: 'jamovi-interface',
    moduleId: 'module-3',
    title: 'The Jamovi Interface',
    description: 'Navigate the spreadsheet, results panel, and ribbon tabs.',
    icon: 'T'
  },
  {
    id: 'data-entry',
    moduleId: 'module-3',
    title: 'Entering and Importing Data',
    description: 'Manual entry, CSV import, and data validation.',
    icon: 'T'
  },
  {
    id: 'variable-types',
    moduleId: 'module-3',
    title: 'Variable Types in Jamovi',
    description: 'Setting measurement levels and data types correctly.',
    icon: 'T'
  },

  // Module 4: Descriptive Statistics
  {
    id: 'central-tendency',
    moduleId: 'module-4',
    title: 'Measures of Central Tendency',
    description: 'Mean, median, and mode - when to use each.',
    icon: 'T'
  },
  {
    id: 'variability',
    moduleId: 'module-4',
    title: 'Measures of Variability',
    description: 'Range, variance, standard deviation, and IQR.',
    icon: 'T'
  },
  {
    id: 'descriptive-stats',
    moduleId: 'module-4',
    title: 'Descriptive Statistics in Practice',
    description: 'Running and interpreting descriptives in Jamovi.',
    icon: 'T'
  },

  // Module 5: Graphing and Visualization
  {
    id: 'histograms',
    moduleId: 'module-5',
    title: 'Histograms',
    description: 'Visualize distributions and identify shape, center, spread.',
    icon: 'T'
  },
  {
    id: 'boxplots',
    moduleId: 'module-5',
    title: 'Box Plots',
    description: 'Display five-number summary and identify outliers.',
    icon: 'T'
  },
  {
    id: 'bar-charts',
    moduleId: 'module-5',
    title: 'Bar Charts',
    description: 'Visualize categorical data with bar and pie charts.',
    icon: 'T'
  },
  {
    id: 'scatterplots',
    moduleId: 'module-5',
    title: 'Scatter Plots',
    description: 'Visualize relationships between two continuous variables.',
    icon: 'T'
  },

  // Module 6: Probability and Sampling
  {
    id: 'probability-basics',
    moduleId: 'module-6',
    title: 'Probability Basics',
    description: 'Fundamental probability rules and calculations.',
    icon: 'T'
  },
  {
    id: 'normal-distribution',
    moduleId: 'module-6',
    title: 'The Normal Distribution',
    description: 'Properties of the bell curve and the empirical rule.',
    icon: 'T'
  },
  {
    id: 'z-scores',
    moduleId: 'module-6',
    title: 'Z-Scores and Standardization',
    description: 'Converting raw scores and using z-tables.',
    icon: 'T'
  },
  {
    id: 'sampling-distributions',
    moduleId: 'module-6',
    title: 'Sampling Distributions',
    description: 'The central limit theorem and standard error.',
    icon: 'T'
  },

  // Module 7: Hypothesis Testing
  {
    id: 'hypothesis-testing',
    moduleId: 'module-7',
    title: 'Hypothesis Testing Logic',
    description: 'Null and alternative hypotheses, decision making.',
    icon: 'T'
  },
  {
    id: 'p-values',
    moduleId: 'module-7',
    title: 'Understanding P-Values',
    description: 'What p-values mean and common misinterpretations.',
    icon: 'T'
  },
  {
    id: 'effect-size',
    moduleId: 'module-7',
    title: 'Effect Sizes',
    description: "Cohen's d, r, and practical significance.",
    icon: 'T'
  },
  {
    id: 'confidence-intervals',
    moduleId: 'module-7',
    title: 'Confidence Intervals',
    description: 'Estimating population parameters with uncertainty.',
    icon: 'T'
  },

  // Module 8: Comparing Groups/Relationships
  {
    id: 't-tests',
    moduleId: 'module-8',
    title: 'T-Tests',
    description: 'One-sample, independent, and paired t-tests.',
    icon: 'T'
  },
  {
    id: 'correlation',
    moduleId: 'module-8',
    title: 'Correlation',
    description: 'Pearson and Spearman correlation coefficients.',
    icon: 'T'
  },
  {
    id: 'regression',
    moduleId: 'module-8',
    title: 'Simple Linear Regression',
    description: 'Predicting outcomes with regression equations.',
    icon: 'T'
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
