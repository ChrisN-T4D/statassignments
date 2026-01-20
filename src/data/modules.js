// Course Modules - Organized by Class
// Each class has its own set of modules

// ============================================================
// STATISTICS CLASS MODULES
// Based on "Learning Statistics with Jamovi"
// https://www.learnstatswithjamovi.com/
// ============================================================

export const statisticsModules = [
  {
    id: 'stats-module-1',
    classId: 'statistics',
    number: 1,
    title: 'Introductions and Why Learn Stats',
    shortTitle: 'Why Stats?',
    description: 'Introduction to the course and the importance of statistics in psychology and research.',
    icon: 'M1',
    color: '#6366f1',
    topics: ['intro-to-stats', 'why-stats-matter'],
    textbookChapters: ['Chapter 1: Why do we learn statistics?'],
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/01-Why-do-we-learn-statistics.html',
    learningObjectives: [
      'Understand why statistics is essential for psychology',
      'Identify real-world applications of statistical thinking',
      'Overcome statistics anxiety with a growth mindset'
    ]
  },
  {
    id: 'stats-module-2',
    classId: 'statistics',
    number: 2,
    title: 'Research Design & Measurement',
    shortTitle: 'Research Design',
    description: 'Learn about variables, measurement levels, and research design fundamentals.',
    icon: 'M2',
    color: '#8b5cf6',
    topics: ['variables-measurement', 'research-design', 'scales-of-measurement'],
    textbookChapters: ['Chapter 2: A brief introduction to research design'],
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/02-A-brief-introduction-to-research-design.html',
    learningObjectives: [
      'Distinguish between independent and dependent variables',
      'Identify the four scales of measurement (NOIR)',
      'Understand experimental vs. correlational designs',
      'Recognize threats to validity'
    ]
  },
  {
    id: 'stats-module-3',
    classId: 'statistics',
    number: 3,
    title: 'Jamovi and Data Handling',
    shortTitle: 'Jamovi Basics',
    description: 'Get hands-on with Jamovi software for data entry, import, and basic manipulation.',
    icon: 'M3',
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
    id: 'stats-module-4',
    classId: 'statistics',
    number: 4,
    title: 'Descriptive Statistics',
    shortTitle: 'Descriptives',
    description: 'Calculate and interpret measures of central tendency and variability.',
    icon: 'M4',
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
    id: 'stats-module-5',
    classId: 'statistics',
    number: 5,
    title: 'Graphing and Visualization',
    shortTitle: 'Visualization',
    description: 'Create and interpret various types of statistical graphs and charts.',
    icon: 'M5',
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
    id: 'stats-module-6',
    classId: 'statistics',
    number: 6,
    title: 'Probability and Sampling',
    shortTitle: 'Probability',
    description: 'Understand probability concepts and sampling distributions.',
    icon: 'M6',
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
    id: 'stats-module-7',
    classId: 'statistics',
    number: 7,
    title: 'Hypothesis Testing',
    shortTitle: 'Hypothesis Testing',
    description: 'Learn the logic and process of null hypothesis significance testing.',
    icon: 'M7',
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
    id: 'stats-module-8',
    classId: 'statistics',
    number: 8,
    title: 'Comparing Groups/Relationships',
    shortTitle: 'Comparisons',
    description: 'Apply t-tests and correlation to compare groups and examine relationships.',
    icon: 'M8',
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

// ============================================================
// INTRO TO RESEARCH CLASS MODULES
// PSYC 5033: Introduction to Research
// ============================================================

export const introResearchModules = [
  {
    id: 'intro-week-1',
    classId: 'intro-research',
    number: 1,
    title: 'Course Introduction & Expectations',
    shortTitle: 'Introduction',
    description: 'Get oriented to the course, review essential materials, policies, and expectations.',
    icon: 'W1',
    color: '#6366f1',
    topics: ['course-overview', 'expectations'],
    learningObjectives: [
      'Review essential course materials and policies',
      'Understand course expectations',
      'Introduce yourself to classmates'
    ]
  },
  {
    id: 'intro-week-2',
    classId: 'intro-research',
    number: 2,
    title: 'Article Critique & Research Interest',
    shortTitle: 'Article Critique',
    description: 'Build foundational skills for reading scholarly work and clarifying research interests.',
    icon: 'W2',
    color: '#8b5cf6',
    topics: ['article-critique', 'research-interest'],
    learningObjectives: [
      'Read and critique peer-reviewed journal articles',
      'Evaluate article strengths and weaknesses',
      'Identify topics and populations of interest',
      'Practice APA writing and critical analysis'
    ],
    assignments: [
      'Article Critique (2ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ3 pages)',
      'Research Interest Statement (1ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ2 pages)'
    ]
  },
  {
    id: 'intro-week-3',
    classId: 'intro-research',
    number: 3,
    title: 'Research Problems, Questions, & Hypotheses',
    shortTitle: 'Research Questions',
    description: 'Formulate clear, researchable problems and questions from broad topics of interest.',
    icon: 'W3',
    color: '#0ea5e9',
    topics: ['research-problems', 'research-questions', 'hypotheses'],
    learningObjectives: [
      'Apply the "So What?" test to research problems',
      'Distinguish between topics, problems, and questions',
      'Draft hypotheses or guiding questions',
      'Support problems with current literature (within 3 years)'
    ],
    assignments: [
      'Research Problem, Question & Hypotheses (1ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ2 pages)'
    ]
  },
  {
    id: 'intro-week-4',
    classId: 'intro-research',
    number: 4,
    title: 'Annotated Bibliography & Theoretical Frameworks',
    shortTitle: 'Annotated Bib',
    description: 'Conduct systematic reviews of scholarly literature and connect work to theoretical frameworks.',
    icon: 'W4',
    color: '#10b981',
    topics: ['annotated-bibliography', 'theoretical-frameworks'],
    learningObjectives: [
      'Identify, summarize, and evaluate peer-reviewed sources',
      'Think critically about how theories shape research',
      'Write 150-200 word annotations for each source',
      'Connect evidence to theoretical frameworks'
    ],
    assignments: [
      'Annotated Bibliography (5ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ7 sources)'
    ]
  },
  {
    id: 'intro-week-5',
    classId: 'intro-research',
    number: 5,
    title: 'Partial Literature Review',
    shortTitle: 'Lit Review',
    description: 'Move from summarizing articles to synthesizing scholarly literature.',
    icon: 'W5',
    color: '#ec4899',
    topics: ['literature-review', 'synthesis'],
    learningObjectives: [
      'Distinguish between summary and synthesis',
      'Organize research into thematic categories',
      'Identify gaps and contradictions in literature',
      'Apply APA 7th edition formatting'
    ],
    assignments: [
      'Partial Literature Review (5ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ7 pages, 10+ sources)'
    ]
  },
  {
    id: 'intro-week-6',
    classId: 'intro-research',
    number: 6,
    title: 'Methods Section Draft',
    shortTitle: 'Methods',
    description: 'Design the methodology of your proposed study with IRB-style formatting.',
    icon: 'W6',
    color: '#14b8a6',
    topics: ['research-design', 'methods-section', 'participants'],
    learningObjectives: [
      'Explain research design choices',
      'Describe participants and recruitment',
      'Detail instruments and procedures',
      'Demonstrate feasibility and ethical considerations'
    ],
    assignments: [
      'Methods Section Draft (3ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ5 pages)'
    ]
  },
  {
    id: 'intro-week-7',
    classId: 'intro-research',
    number: 7,
    title: 'Ethics in Research',
    shortTitle: 'Ethics',
    description: 'Explore research ethics as the foundation of all human-subject research.',
    icon: 'W7',
    color: '#f97316',
    topics: ['research-ethics', 'irb', 'informed-consent'],
    learningObjectives: [
      'Address participant risks and confidentiality',
      'Understand informed consent requirements',
      'Complete formal ethics training',
      'Anticipate and navigate ethical dilemmas'
    ],
    assignments: [
      'IRB/Ethics Summary (2ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ3 pages)',
      'Research Ethics Training & Certificate'
    ]
  },
  {
    id: 'intro-week-8',
    classId: 'intro-research',
    number: 8,
    title: 'Recruitment, Consent, and Instruments',
    shortTitle: 'IRB Materials',
    description: 'Build IRB-ready materials including instruments and informed consent forms.',
    icon: 'W8',
    color: '#dc2626',
    topics: ['instruments', 'consent-forms', 'appendices'],
    learningObjectives: [
      'Develop and justify research instruments',
      'Create professional informed consent forms',
      'Organize appendices following IRB template',
      'Demonstrate reliability and validity of measures'
    ],
    assignments: [
      'Instruments, Consent, and Appendices Draft (3ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ5 pages)'
    ]
  },
  {
    id: 'intro-week-9',
    classId: 'intro-research',
    number: 9,
    title: 'Mid-Term & Proposal Integration',
    shortTitle: 'Mid-Term',
    description: 'Assess understanding of Modules 1ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã…â€œ8 and integrate proposal sections.',
    icon: 'W9',
    color: '#f59e0b',
    topics: ['proposal-integration', 'revision'],
    learningObjectives: [
      'Demonstrate understanding of research concepts',
      'Merge proposal sections into cohesive study',
      'Revise each component for consistency',
      'Prepare unified IRB-style proposal draft'
    ],
    assignments: [
      'Mid-Term Exam',
      'Proposal Integration & Revisions'
    ],
    isMidterm: true
  },
  {
    id: 'intro-week-11',
    classId: 'intro-research',
    number: 11,
    title: 'Data Analysis Planning',
    shortTitle: 'Data Analysis',
    description: 'Plan data analysis approaches for quantitative and qualitative research.',
    icon: 'W11',
    color: '#6366f1',
    topics: ['quantitative-analysis', 'qualitative-analysis', 'data-planning'],
    learningObjectives: [
      'Distinguish quantitative vs qualitative approaches',
      'Plan appropriate analysis methods',
      'Align analysis with research questions',
      'Prepare for data collection'
    ]
  }
]

// ============================================================
// ALL MODULES BY CLASS
// ============================================================

export const modulesByClass = {
  'statistics': statisticsModules,
  'intro-research': introResearchModules
}

// Legacy export for backwards compatibility
export const courseModules = statisticsModules

// ============================================================
// HELPER FUNCTIONS
// ============================================================

export function getModulesByClassId(classId) {
  return modulesByClass[classId] || []
}

export function getModuleById(moduleId) {
  for (const modules of Object.values(modulesByClass)) {
    const module = modules.find(m => m.id === moduleId)
    if (module) return module
  }
  return null
}

export function getContentModulesByClass(classId) {
  const modules = modulesByClass[classId] || []
  return modules.filter(m => !m.isBenchmark && !m.isMidterm)
}

export function getBenchmarksByClass(classId) {
  const modules = modulesByClass[classId] || []
  return modules.filter(m => m.isBenchmark || m.isMidterm)
}

export function getModulesWithContent() {
  return statisticsModules.filter(m => !m.isBenchmark)
}

export function getBenchmarks() {
  return statisticsModules.filter(m => m.isBenchmark)
}

// Topics organized by module (for Statistics class - backwards compatible)
export const topicsByModule = {
  'stats-module-1': [
    {
      id: 'intro-to-stats',
      title: 'Introduction to Statistics',
      description: 'What is statistics and why does it matter for psychology?',
      icon: 'T'
    },
    {
      id: 'why-stats-matter',
      title: 'Why Statistics Matters',
      description: 'Real-world applications and the importance of data literacy.',
      icon: 'T'
    }
  ],
  'stats-module-2': [
    {
      id: 'variables-measurement',
      title: 'Variables and Measurement',
      description: 'Independent vs dependent variables, operationalization.',
      icon: 'T'
    },
    {
      id: 'scales-of-measurement',
      title: 'Scales of Measurement',
      description: 'Nominal, Ordinal, Interval, and Ratio (NOIR) scales.',
      icon: 'T'
    },
    {
      id: 'research-design',
      title: 'Research Design Basics',
      description: 'Experimental, quasi-experimental, and correlational designs.',
      icon: 'T'
    }
  ],
  'stats-module-3': [
    {
      id: 'jamovi-interface',
      title: 'The Jamovi Interface',
      description: 'Navigate the spreadsheet, results panel, and ribbon tabs.',
      icon: 'T'
    },
    {
      id: 'data-entry',
      title: 'Entering and Importing Data',
      description: 'Manual entry, CSV import, and data validation.',
      icon: 'T'
    },
    {
      id: 'variable-types',
      title: 'Variable Types in Jamovi',
      description: 'Setting measurement levels and data types correctly.',
      icon: 'T'
    }
  ],
  'stats-module-4': [
    {
      id: 'central-tendency',
      title: 'Measures of Central Tendency',
      description: 'Mean, median, and mode - when to use each.',
      icon: 'T'
    },
    {
      id: 'variability',
      title: 'Measures of Variability',
      description: 'Range, variance, standard deviation, and IQR.',
      icon: 'T'
    },
    {
      id: 'descriptive-stats',
      title: 'Descriptive Statistics in Practice',
      description: 'Running and interpreting descriptives in Jamovi.',
      icon: 'T'
    }
  ],
  'stats-module-5': [
    {
      id: 'histograms',
      title: 'Histograms',
      description: 'Visualize distributions and identify shape, center, spread.',
      icon: 'T'
    },
    {
      id: 'boxplots',
      title: 'Box Plots',
      description: 'Display five-number summary and identify outliers.',
      icon: 'T'
    },
    {
      id: 'bar-charts',
      title: 'Bar Charts',
      description: 'Visualize categorical data with bar and pie charts.',
      icon: 'T'
    },
    {
      id: 'scatterplots',
      title: 'Scatter Plots',
      description: 'Visualize relationships between two continuous variables.',
      icon: 'T'
    }
  ],
  'stats-module-6': [
    {
      id: 'probability-basics',
      title: 'Probability Basics',
      description: 'Fundamental probability rules and calculations.',
      icon: 'T'
    },
    {
      id: 'normal-distribution',
      title: 'The Normal Distribution',
      description: 'Properties of the bell curve and the empirical rule.',
      icon: 'T'
    },
    {
      id: 'z-scores',
      title: 'Z-Scores and Standardization',
      description: 'Converting raw scores and using z-tables.',
      icon: 'T'
    },
    {
      id: 'sampling-distributions',
      title: 'Sampling Distributions',
      description: 'The central limit theorem and standard error.',
      icon: 'T'
    }
  ],
  'stats-module-7': [
    {
      id: 'hypothesis-testing',
      title: 'Hypothesis Testing Logic',
      description: 'Null and alternative hypotheses, decision making.',
      icon: 'T'
    },
    {
      id: 'p-values',
      title: 'Understanding P-Values',
      description: 'What p-values mean and common misinterpretations.',
      icon: 'T'
    },
    {
      id: 'effect-size',
      title: 'Effect Sizes',
      description: "Cohen's d, r, and practical significance.",
      icon: 'T'
    },
    {
      id: 'confidence-intervals',
      title: 'Confidence Intervals',
      description: 'Estimating population parameters with uncertainty.',
      icon: 'T'
    }
  ],
  'stats-module-8': [
    {
      id: 't-tests',
      title: 'T-Tests',
      description: 'One-sample, independent, and paired t-tests.',
      icon: 'T'
    },
    {
      id: 'correlation',
      title: 'Correlation',
      description: 'Pearson and Spearman correlation coefficients.',
      icon: 'T'
    },
    {
      id: 'regression',
      title: 'Simple Linear Regression',
      description: 'Predicting outcomes with regression equations.',
      icon: 'T'
    }
  ],
  // Intro to Research topics
  'intro-week-1': [
    {
      id: 'course-overview',
      title: 'Course Overview',
      description: 'Introduction to PSYC 5033 and course structure.',
      icon: 'T'
    },
    {
      id: 'expectations',
      title: 'Course Expectations',
      description: 'Policies, requirements, and academic expectations.',
      icon: 'T'
    }
  ],
  'intro-week-2': [
    {
      id: 'article-critique',
      title: 'Writing Article Critiques',
      description: 'How to read, evaluate, and critique peer-reviewed articles.',
      icon: 'T'
    },
    {
      id: 'research-interest',
      title: 'Identifying Research Interests',
      description: 'Reflecting on professional goals and research directions.',
      icon: 'T'
    }
  ],
  'intro-week-3': [
    {
      id: 'research-problems',
      title: 'Research Problems',
      description: 'Identifying meaningful, researchable problems.',
      icon: 'T'
    },
    {
      id: 'research-questions',
      title: 'Research Questions',
      description: 'Formulating clear, focused research questions.',
      icon: 'T'
    },
    {
      id: 'hypotheses',
      title: 'Hypotheses & Guiding Questions',
      description: 'Developing testable hypotheses or qualitative questions.',
      icon: 'T'
    }
  ],
  'intro-week-4': [
    {
      id: 'annotated-bibliography',
      title: 'Annotated Bibliographies',
      description: 'Summarizing and evaluating sources systematically.',
      icon: 'T'
    },
    {
      id: 'theoretical-frameworks',
      title: 'Theoretical Frameworks',
      description: 'Connecting research to established theories.',
      icon: 'T'
    }
  ],
  'intro-week-5': [
    {
      id: 'literature-review',
      title: 'Writing Literature Reviews',
      description: 'Synthesizing sources into thematic narratives.',
      icon: 'T'
    },
    {
      id: 'synthesis',
      title: 'Synthesis vs Summary',
      description: 'Moving beyond summary to analytical synthesis.',
      icon: 'T'
    }
  ],
  'intro-week-6': [
    {
      id: 'research-design',
      title: 'Research Design',
      description: 'Choosing appropriate research methodologies.',
      icon: 'T'
    },
    {
      id: 'methods-section',
      title: 'Writing Methods Sections',
      description: 'Documenting procedures for replication.',
      icon: 'T'
    },
    {
      id: 'participants',
      title: 'Participants & Sampling',
      description: 'Describing and recruiting study participants.',
      icon: 'T'
    }
  ],
  'intro-week-7': [
    {
      id: 'research-ethics',
      title: 'Research Ethics Principles',
      description: 'Core ethical principles in human subjects research.',
      icon: 'T'
    },
    {
      id: 'irb',
      title: 'IRB Process',
      description: 'Understanding Institutional Review Board requirements.',
      icon: 'T'
    },
    {
      id: 'informed-consent',
      title: 'Informed Consent',
      description: 'Creating ethical consent procedures.',
      icon: 'T'
    }
  ],
  'intro-week-8': [
    {
      id: 'instruments',
      title: 'Research Instruments',
      description: 'Selecting and justifying measurement tools.',
      icon: 'T'
    },
    {
      id: 'consent-forms',
      title: 'Consent Form Writing',
      description: 'Creating IRB-compliant consent documents.',
      icon: 'T'
    },
    {
      id: 'appendices',
      title: 'Organizing Appendices',
      description: 'Structuring supplementary materials.',
      icon: 'T'
    }
  ],
  'intro-week-9': [
    {
      id: 'proposal-integration',
      title: 'Proposal Integration',
      description: 'Combining sections into a cohesive proposal.',
      icon: 'T'
    },
    {
      id: 'revision',
      title: 'Revision Strategies',
      description: 'Techniques for improving academic writing.',
      icon: 'T'
    }
  ],
  'intro-week-11': [
    {
      id: 'quantitative-analysis',
      title: 'Quantitative Analysis Planning',
      description: 'Planning statistical analyses for quantitative studies.',
      icon: 'T'
    },
    {
      id: 'qualitative-analysis',
      title: 'Qualitative Analysis Planning',
      description: 'Planning thematic or content analysis.',
      icon: 'T'
    },
    {
      id: 'data-planning',
      title: 'Data Collection Planning',
      description: 'Preparing for ethical data collection.',
      icon: 'T'
    }
  ]
}

export function getTopicsForModule(moduleId) {
  return topicsByModule[moduleId] || []
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
