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
    topics: ['intro-to-stats'],
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
    topics: ['variables-measurement', 'scales-of-measurement', 'validity', 'research-design'],
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
    title: 'Software Basics and Data Handling',
    shortTitle: 'Software Basics',
    description: 'Get hands-on with your chosen statistical software for data entry, import, and basic manipulation.',
    icon: 'M3',
    color: '#0ea5e9',
    topics: ['software-interface', 'data-entry', 'variable-types'],
    textbookChapters: ['Chapter 3: Getting started with statistical software'],
    learningObjectives: [
      'Navigate your statistical software interface',
      'Enter and import data correctly',
      'Set appropriate variable types and measurement levels',
      'Save and export data files'
    ],
    hasSoftwarePractice: true,
    isDynamicSoftware: true  // Flag to indicate this module adapts to software preference
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
// RESEARCH METHODS CLASS MODULES
// ============================================================

const researchMethodsModuleColors = [
  '#6366f1',
  '#8b5cf6',
  '#0ea5e9',
  '#10b981',
  '#ec4899',
  '#f97316',
  '#14b8a6',
  '#dc2626',
  '#f59e0b',
  '#3b82f6',
  '#22c55e',
  '#a855f7'
]

export const researchMethodsModules = [
  {
    id: 'rm-module-1',
    classId: 'research-methods',
    number: 1,
    title: 'Module 1: Research Thinking: Biases, Theories, and Hypotheses',
    shortTitle: 'Research Thinking',
    description: 'Research Thinking: Biases, Theories, and Hypotheses',
    icon: 'M1',
    color: researchMethodsModuleColors[0],
    topics: [
      'rm-1-research-matters',
      'rm-1-limited-information-processing',
      'rm-1-heuristics-and-bias',
      'rm-1-thinking-goes-wrong',
      'rm-1-laws-theories-hypotheses'
    ]
  },
  {
    id: 'rm-module-2',
    classId: 'research-methods',
    number: 2,
    title: 'Module 2: From Ideas to Articles: Literature Search and Question Refinement',
    shortTitle: 'Ideas to Articles',
    description: 'From Ideas to Articles: Literature Search and Question Refinement',
    icon: 'M2',
    color: researchMethodsModuleColors[1],
    topics: [
      'rm-2-generating-ideas',
      'rm-2-literature-searching',
      'rm-2-evaluating-evidence',
      'rm-2-question-to-plan'
    ]
  },
  {
    id: 'rm-module-3',
    classId: 'research-methods',
    number: 3,
    title: 'Module 3: Research Design Logic: Correlation, Causation, and Validity',
    shortTitle: 'Design Logic',
    description: 'Research Design Logic: Correlation, Causation, and Validity',
    icon: 'M3',
    color: researchMethodsModuleColors[2],
    topics: [
      'rm-3-certainty-and-causation',
      'rm-3-core-design-concepts',
      'rm-3-internal-validity-threats',
      'rm-3-external-ecological-validity',
      'rm-3-statistical-decision-risks'
    ]
  },
  {
    id: 'rm-module-4',
    classId: 'research-methods',
    number: 4,
    title: 'Module 4: Ethics and Human Subjects: Consent, Risk, and IRB Basics',
    shortTitle: 'Ethics & Subjects',
    description: 'Ethics and Human Subjects: Consent, Risk, and IRB Basics',
    icon: 'M4',
    color: researchMethodsModuleColors[3],
    topics: [
      'rm-4-ethics-history',
      'rm-4-irb-purpose-structure',
      'rm-4-ethics-tools',
      'rm-4-special-ethical-issues',
      'rm-4-researcher-preparation'
    ]
  },
  {
    id: 'rm-module-5',
    classId: 'research-methods',
    number: 5,
    title: 'Module 5: Measurement Foundations: Reliability, Validity, and Scale Quality',
    shortTitle: 'Measurement',
    description: 'Measurement Foundations: Reliability, Validity, and Scale Quality',
    icon: 'M5',
    color: researchMethodsModuleColors[4],
    topics: [
      'rm-5-measurement-ideal-real',
      'rm-5-scale-types-sensitivity',
      'rm-5-finding-measures',
      'rm-5-reliability-forms',
      'rm-5-validity-selection-issues'
    ]
  },
  {
    id: 'rm-module-6',
    classId: 'research-methods',
    number: 6,
    title: 'Module 6: Survey Research: Item Writing, Formats, and Online Tools',
    shortTitle: 'Survey Research',
    description: 'Survey Research: Item Writing, Formats, and Online Tools',
    icon: 'M6',
    color: researchMethodsModuleColors[5],
    topics: [
      'rm-6-develop-your-own-measure',
      'rm-6-item-writing-formats',
      'rm-6-demographics-sensitivity',
      'rm-6-survey-structure',
      'rm-6-online-survey-administration'
    ]
  },
  {
    id: 'rm-module-7',
    classId: 'research-methods',
    number: 7,
    title: 'Module 7: Correlational and Group-Comparison Designs (Core Analytic Approaches)',
    shortTitle: 'Correlation & Group',
    description: 'Correlational and Group-Comparison Designs (Core Analytic Approaches)',
    icon: 'M7',
    color: researchMethodsModuleColors[6],
    topics: [
      'rm-7-correlational-logic',
      'rm-7-quasi-experimental-logic',
      'rm-7-choosing-analyses',
      'rm-7-validity-interpretation'
    ]
  },
  {
    id: 'rm-module-8',
    classId: 'research-methods',
    number: 8,
    title: 'Module 8: Qualitative Research: Interviews, Coding, and Trustworthiness',
    shortTitle: 'Qualitative',
    description: 'Qualitative Research: Interviews, Coding, and Trustworthiness',
    icon: 'M8',
    color: researchMethodsModuleColors[7],
    topics: [
      'rm-8-qualitative-purpose',
      'rm-8-qualitative-collection',
      'rm-8-qualitative-meaning-making',
      'rm-8-qualitative-quality-ethics'
    ]
  },
  {
    id: 'rm-module-9',
    classId: 'research-methods',
    number: 9,
    title: 'Module 9: Between-Subjects Experiments: Manipulation, Control, and Inference',
    shortTitle: 'Between-Subjects',
    description: 'Between-Subjects Experiments: Manipulation, Control, and Inference',
    icon: 'M9',
    color: researchMethodsModuleColors[8],
    topics: [
      'rm-9-between-subjects-structure',
      'rm-9-control-internal-validity',
      'rm-9-manipulation-checks',
      'rm-9-interpreting-outcomes'
    ]
  },
  {
    id: 'rm-module-10',
    classId: 'research-methods',
    number: 10,
    title: 'Module 10: Within-Subjects Designs: Counterbalancing and Repeated Measures',
    shortTitle: 'Within-Subjects',
    description: 'Within-Subjects Designs: Counterbalancing and Repeated Measures',
    icon: 'M10',
    color: researchMethodsModuleColors[9],
    topics: [
      'rm-10-within-subjects-logic',
      'rm-10-order-carryover-effects',
      'rm-10-practical-implementation',
      'rm-10-interpreting-within-subjects'
    ]
  },
  {
    id: 'rm-module-11',
    classId: 'research-methods',
    number: 11,
    title: 'Module 11: Sampling and Recruiting Participants: Field and Online Strategies',
    shortTitle: 'Sampling & Recruiting',
    description: 'Sampling and Recruiting Participants: Field and Online Strategies',
    icon: 'M11',
    color: researchMethodsModuleColors[10],
    topics: [
      'rm-11-participants-representativeness',
      'rm-11-recruitment-channels',
      'rm-11-ethics-of-recruitment',
      'rm-11-data-quality-control'
    ]
  },
  {
    id: 'rm-module-12',
    classId: 'research-methods',
    number: 12,
    title: 'Module 12: Bringing It Together: Applied Decisions and Research Integration',
    shortTitle: 'Integration',
    description: 'Bringing It Together: Applied Decisions and Research Integration',
    icon: 'M12',
    color: researchMethodsModuleColors[11],
    topics: [
      'rm-12-integrating-process',
      'rm-12-interpreting-results',
      'rm-12-research-products'
    ]
  }
]

// ============================================================
// STATISTICS FOR ASSESSMENT CLASS MODULES
// ============================================================

const statsAssessmentModuleColors = [
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#8b5cf6',
  '#14b8a6',
  '#dc2626',
  '#3b82f6',
  '#22c55e'
]

export const statsAssessmentModules = Array.from({ length: 8 }, (_, index) => {
  const number = index + 1
  return {
    id: `s4a-module-${number}`,
    classId: 'stats-assessment',
    number,
    title: `Module ${number}`,
    shortTitle: `M${number}`,
    description: `Module ${number}`,
    icon: `M${number}`,
    color: statsAssessmentModuleColors[index % statsAssessmentModuleColors.length],
    topics: []
  }
})

// ============================================================
// ALL MODULES BY CLASS
// ============================================================

export const modulesByClass = {
  'statistics': statisticsModules,
  'intro-research': introResearchModules,
  'research-methods': researchMethodsModules,
  'stats-assessment': statsAssessmentModules
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
      title: 'Why Do We Learn Statistics?',
      description: 'What is statistics and why does it matter for psychology?',
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
      id: 'validity',
      title: 'Validity',
      description: 'Threats to internal, external, construct, face, and ecological validity.',
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
      id: 'software-interface',
      title: 'The Software Interface',
      description: 'Navigate the workspace, menus, and key features of your statistical software.',
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
      title: 'Variable Types and Measurement Levels',
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
  ],
  // Research Methods topics
  'rm-module-1': [
    {
      id: 'rm-1-research-matters',
      title: 'Why research matters: evaluating credibility/claims.',
      description: 'Why research matters: evaluating credibility/claims.',
      icon: 'T'
    },
    {
      id: 'rm-1-limited-information-processing',
      title: 'Humans as limited information processors: schemas, categorization, and stereotyping.',
      description: 'Humans as limited information processors: schemas, categorization, and stereotyping.',
      icon: 'T'
    },
    {
      id: 'rm-1-heuristics-and-bias',
      title: 'Heuristics and bias in judgment: representativeness, availability, and confirmation bias (e.g., Wason task).',
      description: 'Heuristics and bias in judgment: representativeness, availability, and confirmation bias (e.g., Wason task).',
      icon: 'T'
    },
    {
      id: 'rm-1-thinking-goes-wrong',
      title: 'How thinking goes wrong (Shermer\'s four categories) and implications for research skepticism.',
      description: 'How thinking goes wrong (Shermer\'s four categories) and implications for research skepticism.',
      icon: 'T'
    },
    {
      id: 'rm-1-laws-theories-hypotheses',
      title: 'Laws, theories, and hypotheses; what makes a good research question (and why theory matters).',
      description: 'Laws, theories, and hypotheses; what makes a good research question (and why theory matters).',
      icon: 'T'
    }
  ],
  'rm-module-2': [
    {
      id: 'rm-2-generating-ideas',
      title: 'Generating research ideas and moving from broad interests to researchable questions.',
      description: 'Generating research ideas and moving from broad interests to researchable questions.',
      icon: 'T'
    },
    {
      id: 'rm-2-literature-searching',
      title: 'Literature searching and "working backward" through citations to map a topic area.',
      description: 'Literature searching and "working backward" through citations to map a topic area.',
      icon: 'T'
    },
    {
      id: 'rm-2-evaluating-evidence',
      title: 'Evaluating evidence and building the rationale (identifying gaps; third-variable thinking).',
      description: 'Evaluating evidence and building the rationale (identifying gaps; third-variable thinking).',
      icon: 'T'
    },
    {
      id: 'rm-2-question-to-plan',
      title: 'From question to plan: aligning question to design to measures to feasibility/timeline.',
      description: 'From question to plan: aligning question to design to measures to feasibility/timeline.',
      icon: 'T'
    }
  ],
  'rm-module-3': [
    {
      id: 'rm-3-certainty-and-causation',
      title: 'What research can tell you: continuum of certainty; correlation versus causation; language that matches design.',
      description: 'What research can tell you: continuum of certainty; correlation versus causation; language that matches design.',
      icon: 'T'
    },
    {
      id: 'rm-3-core-design-concepts',
      title: 'Core design concepts: experimental vs quasi-experimental vs correlational; IV/DV and quasi-IV; reframing a study.',
      description: 'Core design concepts: experimental vs quasi-experimental vs correlational; IV/DV and quasi-IV; reframing a study.',
      icon: 'T'
    },
    {
      id: 'rm-3-internal-validity-threats',
      title: 'Internal validity threats and remedies (e.g., demand characteristics; blinding; pilot studies; manipulation checks).',
      description: 'Internal validity threats and remedies (e.g., demand characteristics; blinding; pilot studies; manipulation checks).',
      icon: 'T'
    },
    {
      id: 'rm-3-external-ecological-validity',
      title: 'External/ecological validity and research settings (lab, field study/experiment, survey, VR).',
      description: 'External/ecological validity and research settings (lab, field study/experiment, survey, VR).',
      icon: 'T'
    },
    {
      id: 'rm-3-statistical-decision-risks',
      title: 'Statistical decision risks: Type I/Type II error, power, effect size, sample size, multiple testing logic.',
      description: 'Statistical decision risks: Type I/Type II error, power, effect size, sample size, multiple testing logic.',
      icon: 'T'
    }
  ],
  'rm-module-4': [
    {
      id: 'rm-4-ethics-history',
      title: 'Why ethical review exists: history and cases motivating oversight (e.g., Belmont principles).',
      description: 'Why ethical review exists: history and cases motivating oversight (e.g., Belmont principles).',
      icon: 'T'
    },
    {
      id: 'rm-4-irb-purpose-structure',
      title: 'IRB purpose, structure, and review types; what counts as "research" and "human subject" (revised Common Rule framing).',
      description: 'IRB purpose, structure, and review types; what counts as "research" and "human subject" (revised Common Rule framing).',
      icon: 'T'
    },
    {
      id: 'rm-4-ethics-tools',
      title: 'Core ethics tools: informed consent and debriefing; confidentiality and risk/benefit logic.',
      description: 'Core ethics tools: informed consent and debriefing; confidentiality and risk/benefit logic.',
      icon: 'T'
    },
    {
      id: 'rm-4-special-ethical-issues',
      title: 'Special ethical issues: deception, incentives, participant pools/alternatives, and research with children.',
      description: 'Special ethical issues: deception, incentives, participant pools/alternatives, and research with children.',
      icon: 'T'
    },
    {
      id: 'rm-4-researcher-preparation',
      title: 'Researcher preparation: IRB proposal components and required training (e.g., CITI-type modules).',
      description: 'Researcher preparation: IRB proposal components and required training (e.g., CITI-type modules).',
      icon: 'T'
    }
  ],
  'rm-module-5': [
    {
      id: 'rm-5-measurement-ideal-real',
      title: 'Measurement as "ideal vs real": constructs, operationalization, and why measures never fully capture concepts.',
      description: 'Measurement as "ideal vs real": constructs, operationalization, and why measures never fully capture concepts.',
      icon: 'T'
    },
    {
      id: 'rm-5-scale-types-sensitivity',
      title: 'Scale types and sensitivity: nominal/ordinal/interval/ratio; anchors and what they allow you to conclude.',
      description: 'Scale types and sensitivity: nominal/ordinal/interval/ratio; anchors and what they allow you to conclude.',
      icon: 'T'
    },
    {
      id: 'rm-5-finding-measures',
      title: 'Finding measures: literature mining + databases/resources (e.g., PsycTESTS; HaPI; books/department resources).',
      description: 'Finding measures: literature mining + databases/resources (e.g., PsycTESTS; HaPI; books/department resources).',
      icon: 'T'
    },
    {
      id: 'rm-5-reliability-forms',
      title: 'Reliability: forms of reliability; internal consistency and Cronbach\'s alpha (including calculation concept).',
      description: 'Reliability: forms of reliability; internal consistency and Cronbach\'s alpha (including calculation concept).',
      icon: 'T'
    },
    {
      id: 'rm-5-validity-selection-issues',
      title: 'Validity and practical selection issues: content/criterion/construct validity; scoring, length, qualifications, cost/copyright, social desirability.',
      description: 'Validity and practical selection issues: content/criterion/construct validity; scoring, length, qualifications, cost/copyright, social desirability.',
      icon: 'T'
    }
  ],
  'rm-module-6': [
    {
      id: 'rm-6-develop-your-own-measure',
      title: 'When/why to develop your own measure (and when to avoid it).',
      description: 'When/why to develop your own measure (and when to avoid it).',
      icon: 'T'
    },
    {
      id: 'rm-6-item-writing-formats',
      title: 'Item writing and response format choices: stems, anchors (odd vs even), open vs closed-ended, scale flexibility.',
      description: 'Item writing and response format choices: stems, anchors (odd vs even), open vs closed-ended, scale flexibility.',
      icon: 'T'
    },
    {
      id: 'rm-6-demographics-sensitivity',
      title: 'Demographics and social sensitivity: gender/race/ethnicity/income item approaches; self-identification and bias-aware wording.',
      description: 'Demographics and social sensitivity: gender/race/ethnicity/income item approaches; self-identification and bias-aware wording.',
      icon: 'T'
    },
    {
      id: 'rm-6-survey-structure',
      title: 'Survey design structure: question order, sensitive questions placement, pilot testing to reduce misunderstanding/bias.',
      description: 'Survey design structure: question order, sensitive questions placement, pilot testing to reduce misunderstanding/bias.',
      icon: 'T'
    },
    {
      id: 'rm-6-online-survey-administration',
      title: 'Online survey administration: tools/features tradeoffs (e.g., SurveyMonkey vs Qualtrics), exporting data, and internal-validity concerns of remote completion.',
      description: 'Online survey administration: tools/features tradeoffs (e.g., SurveyMonkey vs Qualtrics), exporting data, and internal-validity concerns of remote completion.',
      icon: 'T'
    }
  ],
  'rm-module-7': [
    {
      id: 'rm-7-correlational-logic',
      title: 'Correlational logic in practice: predicting/estimating relationships and using appropriate "association" language.',
      description: 'Correlational logic in practice: predicting/estimating relationships and using appropriate "association" language.',
      icon: 'T'
    },
    {
      id: 'rm-7-quasi-experimental-logic',
      title: 'Quasi-experimental/group-difference logic: preexisting groups, quasi-IVs, and limits on causal inference.',
      description: 'Quasi-experimental/group-difference logic: preexisting groups, quasi-IVs, and limits on causal inference.',
      icon: 'T'
    },
    {
      id: 'rm-7-choosing-analyses',
      title: 'Choosing analyses conceptually by question/design (the chapter sequence builds toward Ch. 7-10 as design-specific detail).',
      description: 'Choosing analyses conceptually by question/design (the chapter sequence builds toward Ch. 7-10 as design-specific detail).',
      icon: 'T'
    },
    {
      id: 'rm-7-validity-interpretation',
      title: 'Validity and interpretation issues specific to non-randomized/group comparisons (confounds; alternative explanations).',
      description: 'Validity and interpretation issues specific to non-randomized/group comparisons (confounds; alternative explanations).',
      icon: 'T'
    }
  ],
  'rm-module-8': [
    {
      id: 'rm-8-qualitative-purpose',
      title: 'What qualitative research is for: kinds of questions it answers and how it differs from quantitative approaches.',
      description: 'What qualitative research is for: kinds of questions it answers and how it differs from quantitative approaches.',
      icon: 'T'
    },
    {
      id: 'rm-8-qualitative-collection',
      title: 'Qualitative data collection strategies (e.g., interviews/focus groups/case-based approaches as framed in the text\'s qualitative discussion).',
      description: 'Qualitative data collection strategies (e.g., interviews/focus groups/case-based approaches as framed in the text\'s qualitative discussion).',
      icon: 'T'
    },
    {
      id: 'rm-8-qualitative-meaning-making',
      title: 'Making meaning from qualitative data: organizing, coding, theme development, and transparency of interpretation.',
      description: 'Making meaning from qualitative data: organizing, coding, theme development, and transparency of interpretation.',
      icon: 'T'
    },
    {
      id: 'rm-8-qualitative-quality-ethics',
      title: 'Quality/ethics in qualitative work: credibility, reflexivity, and protections for participants when data are personal/sensitive.',
      description: 'Quality/ethics in qualitative work: credibility, reflexivity, and protections for participants when data are personal/sensitive.',
      icon: 'T'
    }
  ],
  'rm-module-9': [
    {
      id: 'rm-9-between-subjects-structure',
      title: 'Between-subjects experimental structure: random assignment, manipulated IVs, and DV selection.',
      description: 'Between-subjects experimental structure: random assignment, manipulated IVs, and DV selection.',
      icon: 'T'
    },
    {
      id: 'rm-9-control-internal-validity',
      title: 'Control and internal validity in experiments: preventing demand characteristics; blinding; standardized procedures.',
      description: 'Control and internal validity in experiments: preventing demand characteristics; blinding; standardized procedures.',
      icon: 'T'
    },
    {
      id: 'rm-9-manipulation-checks',
      title: 'Manipulation checks, pilot testing, and cover stories as design tools.',
      description: 'Manipulation checks, pilot testing, and cover stories as design tools.',
      icon: 'T'
    },
    {
      id: 'rm-9-interpreting-outcomes',
      title: 'Interpreting outcomes: causal language, effect size/power thinking, and limits to generalization.',
      description: 'Interpreting outcomes: causal language, effect size/power thinking, and limits to generalization.',
      icon: 'T'
    }
  ],
  'rm-module-10': [
    {
      id: 'rm-10-within-subjects-logic',
      title: 'Within-subjects logic: why use it and what it changes about inference and procedure.',
      description: 'Within-subjects logic: why use it and what it changes about inference and procedure.',
      icon: 'T'
    },
    {
      id: 'rm-10-order-carryover-effects',
      title: 'Order/carryover effects and counterbalancing strategies.',
      description: 'Order/carryover effects and counterbalancing strategies.',
      icon: 'T'
    },
    {
      id: 'rm-10-practical-implementation',
      title: 'Practical implementation: fatigue, learning, and participant experience as threats to validity.',
      description: 'Practical implementation: fatigue, learning, and participant experience as threats to validity.',
      icon: 'T'
    },
    {
      id: 'rm-10-interpreting-within-subjects',
      title: 'Interpreting within-subjects findings: what conclusions are warranted and what caveats to report.',
      description: 'Interpreting within-subjects findings: what conclusions are warranted and what caveats to report.',
      icon: 'T'
    }
  ],
  'rm-module-11': [
    {
      id: 'rm-11-participants-representativeness',
      title: 'Who are the participants? Representativeness, sampling decisions, and generalizability.',
      description: 'Who are the participants? Representativeness, sampling decisions, and generalizability.',
      icon: 'T'
    },
    {
      id: 'rm-11-recruitment-channels',
      title: 'Recruitment channels and constraints (participant pools, community samples, and online options such as MTurk-style recruitment).',
      description: 'Recruitment channels and constraints (participant pools, community samples, and online options such as MTurk-style recruitment).',
      icon: 'T'
    },
    {
      id: 'rm-11-ethics-of-recruitment',
      title: 'Ethics of recruitment and incentives: voluntariness, coercion risk, and justice/fairness concerns.',
      description: 'Ethics of recruitment and incentives: voluntariness, coercion risk, and justice/fairness concerns.',
      icon: 'T'
    },
    {
      id: 'rm-11-data-quality-control',
      title: 'Data quality and procedure control in field/online contexts as internal validity issues.',
      description: 'Data quality and procedure control in field/online contexts as internal validity issues.',
      icon: 'T'
    }
  ],
  'rm-module-12': [
    {
      id: 'rm-12-integrating-process',
      title: 'Integrating the research process: aligning question, design, measures, sampling, and ethics into a coherent plan.',
      description: 'Integrating the research process: aligning question, design, measures, sampling, and ethics into a coherent plan.',
      icon: 'T'
    },
    {
      id: 'rm-12-interpreting-results',
      title: 'Interpreting results responsibly: alternative explanations, limits, and accurate research language (correlation vs causation).',
      description: 'Interpreting results responsibly: alternative explanations, limits, and accurate research language (correlation vs causation).',
      icon: 'T'
    },
    {
      id: 'rm-12-research-products',
      title: 'Preparing research products: documentation needed for replication/credibility and clean reporting workflow expectations.',
      description: 'Preparing research products: documentation needed for replication/credibility and clean reporting workflow expectations.',
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
