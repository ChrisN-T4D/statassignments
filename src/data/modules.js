// Course Modules - Organized by Class
// Each class has its own set of modules

import {
  getPressbooksChapterByModuleId,
  getLearningObjectivesForModule,
  getCanvasPartForModule,
  TEXTBOOK
} from './researchMethodsTextbook.js'

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
    topics: ['variables-measurement', 'scales-of-measurement', 'validity', 'reliability', 'research-design'],
    textbookChapters: ['Chapter 2: A brief introduction to research design'],
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/02-A-brief-introduction-to-research-design.html',
    learningObjectives: [
      'Distinguish between independent and dependent variables',
      'Identify the four scales of measurement (NOIR)',
      'Understand experimental vs. correlational designs',
      'Recognize threats to validity',
      'Assess reliability of measurements'
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
    topics: ['software-interface', 'data-entry', 'variable-types', 'screen-recording-tutorial'],
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
    topics: ['central-tendency', 'variability', 'skew-kurtosis', 'grouped-descriptives', 'standard-scores'],
    textbookChapters: ['Chapter 4: Descriptive statistics'],
    textbookUrl: 'https://davidfoxcroft.github.io/lsj-book/04-Descriptive-statistics.html',
    learningObjectives: [
      'Calculate and interpret mean, median, and mode',
      'Calculate and interpret range, IQR, variance, and standard deviation',
      'Assess skewness and kurtosis of distributions',
      'Generate and compare descriptive statistics across groups',
      'Compute and interpret z-scores for standardizing data',
      'Choose appropriate measures for different data types and distributions'
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
    topics: [
      'histograms',
      'boxplots',
      'bar-charts',
      'scatterplots',
      'tabulating-data',
      'logical-expressions',
      'transforming-variables',
      'mathematical-functions',
      'filtering-data'
    ],
    textbookChapters: ['Chapter 5: Drawing graphs', 'Chapter 6: Pragmatic matters'],
    learningObjectives: [
      'Create histograms and interpret distributions',
      'Build and read box plots',
      'Construct bar charts for categorical data',
      'Use scatter plots to visualize relationships',
      'Create frequency tables and contingency tables',
      'Use logical expressions for data filtering and transformations',
      'Transform and recode variables using computed formulas',
      'Apply mathematical functions like logarithms and absolute values',
      'Extract subsets of data using filters'
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
    topics: [
      'probability-concepts',
      'probability-rules',
      'binomial-distribution',
      'normal-distribution',
      'other-distributions',
      'sampling-theory',
      'law-of-large-numbers',
      'central-limit-theorem',
      'parameter-estimation',
      'confidence-intervals'
    ],
    textbookChapters: [
      'Chapter 7: Introduction to probability',
      'Chapter 8: Estimating unknown quantities from a sample'
    ],
    learningObjectives: [
      'Distinguish between frequentist and Bayesian interpretations of probability',
      'Calculate probabilities using basic probability rules',
      'Work with binomial and normal distributions',
      'Understand the t, χ², and F distributions',
      'Explain sampling theory and different sampling methods',
      'Apply the law of large numbers and central limit theorem',
      'Estimate population parameters from sample statistics',
      'Construct and interpret confidence intervals'
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
    topics: ['hypothesis-testing', 'p-values', 'effect-size'],
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
    title: 'Categorical Data Analysis, T-Tests, Regression, & ANOVA',
    shortTitle: 'Analysis Methods',
    description: 'Analyze categorical data with chi-square tests, compare means with t-tests and ANOVA, and explore relationships with correlation and regression.',
    icon: 'M8',
    color: '#dc2626',
    topics: [
      'chi-square-goodness-of-fit',
      'chi-square-independence',
      'chi-square-corrections-effect-size',
      'chi-square-assumptions-fisher',
      'mcnemar-test',
      'one-sample-z-test',
      'one-sample-t-test',
      'independent-t-test',
      'welch-t-test',
      'paired-t-test',
      'correlation',
      'scatterplots',
      'simple-regression',
      'multiple-regression',
      'regression-inference',
      'regression-assumptions',
      'model-selection',
      'one-way-anova-basics',
      'post-hoc-tests-anova',
      'anova-assumptions',
      'repeated-measures-anova'
    ],
    textbookChapters: [
      'Chapter 10: Categorical data analysis',
      'Chapter 11: Comparing two means',
      'Chapter 12: Correlation and linear regression',
      'Chapter 13: Comparing several means (one-way ANOVA)'
    ],
    learningObjectives: [
      'Conduct chi-square goodness-of-fit and independence tests',
      'Apply Fisher exact test and McNemar test when appropriate',
      'Calculate and interpret Cramér\'s V and other effect sizes',
      'Perform one-sample, independent, and paired t-tests',
      'Check assumptions and use non-parametric alternatives',
      'Calculate and interpret Pearson and Spearman correlations',
      'Perform simple and multiple linear regression',
      'Assess model fit using R² and adjusted R²',
      'Check regression assumptions and identify influential observations',
      'Compare and select models using AIC',
      'Run one-way ANOVA to compare three or more groups',
      'Conduct post-hoc tests with Bonferroni and Holm corrections',
      'Check ANOVA assumptions using Levene test and Q-Q plots',
      'Apply Welch ANOVA and Kruskal-Wallis when assumptions are violated',
      'Perform repeated measures ANOVA for within-subjects designs',
      'Calculate and interpret effect sizes (η² and ω²)'
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
  },
  {
    id: 'intro-module-analyze-data',
    classId: 'intro-research',
    number: null,
    title: 'Analyze your data',
    shortTitle: 'Analyze data',
    description: 'Choose an analysis and follow step-by-step instructions in jamovi, SPSS, or Excel.',
    icon: '📊',
    color: '#6366f1',
    topics: [],
    isDataAnalysisTool: true,
    learningObjectives: [
      'Match your research question to an appropriate analysis',
      'Run the analysis in your chosen software with clear menu paths',
      'Know what to report in your write-up'
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

export const researchMethodsModulesBase = [
  {
    id: 'rm-module-1',
    classId: 'research-methods',
    number: 1,
    title: 'Chapter 1: The Science of Psychology',
    shortTitle: 'Science of Psychology',
    description:
      'Part 1 introduction — methods of knowing, scientific goals, and why science outperforms common sense.',
    icon: 'M1',
    color: researchMethodsModuleColors[0],
    topics: ['rm-chapter-1']
  },
  {
    id: 'rm-module-2',
    classId: 'research-methods',
    number: 2,
    title: 'Chapter 2: Overview of the Scientific Method',
    shortTitle: 'Scientific Method',
    description: 'From research topic to hypothesis, design, analysis, and reporting.',
    icon: 'M2',
    color: researchMethodsModuleColors[1],
    topics: ['rm-chapter-2']
  },
  {
    id: 'rm-module-4',
    classId: 'research-methods',
    number: 4,
    title: 'Chapter 4: Psychological Measurement',
    shortTitle: 'Measurement',
    description: 'Operationalization, scales of measurement, reliability, and validity.',
    icon: 'M4',
    color: researchMethodsModuleColors[3],
    topics: ['rm-chapter-4']
  },
  {
    id: 'rm-module-5',
    classId: 'research-methods',
    number: 5,
    title: 'Chapter 5: Experimental Research',
    shortTitle: 'Experimental',
    description:
      'Experimental design, controls, validity, and practical implementation. (Interactive assignment & sampling mini-lab lives in the Lab module after Chapter 6.)',
    icon: 'M5',
    color: researchMethodsModuleColors[4],
    topics: ['rm-chapter-5']
  },
  {
    id: 'rm-module-6',
    classId: 'research-methods',
    number: 6,
    title: 'Chapter 6: Non-Experimental Research',
    shortTitle: 'Non-Experimental',
    description: 'Correlational, qualitative, and observational approaches.',
    icon: 'M6',
    color: researchMethodsModuleColors[5],
    topics: ['rm-chapter-6']
  },
  {
    id: 'rm-module-lab',
    classId: 'research-methods',
    number: 'Lab',
    title: 'Lab: Random assignment & sampling',
    shortTitle: 'Lab (Simulation)',
    description:
      'Hands-on mini-lab (no textbook chapter): random vs non-random assignment to conditions, and SRS vs stratified vs cluster vs convenience sampling. Open Concept Review to run the simulations.',
    icon: 'LB',
    color: '#0ea5e9',
    topics: ['rm-lab-sampling']
  },
  {
    id: 'rm-module-7',
    classId: 'research-methods',
    number: 7,
    title: 'Chapter 7: Survey Research',
    shortTitle: 'Survey Research',
    description: 'Designing, constructing, and administering high-quality surveys.',
    icon: 'M7',
    color: researchMethodsModuleColors[6],
    topics: ['rm-chapter-7']
  },
  {
    id: 'rm-module-8',
    classId: 'research-methods',
    number: 8,
    title: 'Chapter 8: Quasi-Experimental Research',
    shortTitle: 'Quasi-Experimental',
    description: 'One-group and non-equivalent group design strategies.',
    icon: 'M8',
    color: researchMethodsModuleColors[7],
    topics: ['rm-chapter-8']
  },
  {
    id: 'rm-module-9',
    classId: 'research-methods',
    number: 9,
    title: 'Chapter 9: Factorial Designs',
    shortTitle: 'Factorial Designs',
    description: 'Setting up and interpreting factorial experiments.',
    icon: 'M9',
    color: researchMethodsModuleColors[8],
    topics: ['rm-chapter-9']
  },
  {
    id: 'rm-module-10',
    classId: 'research-methods',
    number: 10,
    title: 'Chapter 10: Single-Subject Research',
    shortTitle: 'Single-Subject',
    description: 'Single-subject logic, designs, and interpretation.',
    icon: 'M10',
    color: researchMethodsModuleColors[9],
    topics: ['rm-chapter-10']
  },
  {
    id: 'rm-module-11',
    classId: 'research-methods',
    number: 11,
    title: 'Chapter 11: Presenting Your Research',
    shortTitle: 'Presenting Research',
    description: 'APA style and communicating findings in multiple formats.',
    icon: 'M11',
    color: researchMethodsModuleColors[10],
    topics: ['rm-chapter-11']
  },
  {
    id: 'rm-module-3',
    classId: 'research-methods',
    number: 3,
    title: 'Chapter 3: Research Ethics',
    shortTitle: 'Research Ethics',
    description:
      'Part 3 — ethical principles, human subjects training, informed consent, and IRB submission.',
    icon: 'M3',
    color: researchMethodsModuleColors[2],
    topics: ['rm-chapter-3']
  },
  {
    id: 'rm-module-12',
    classId: 'research-methods',
    number: 12,
    title: 'Chapter 12: Descriptive Statistics',
    shortTitle: 'Descriptive Stats',
    description: 'Describing variables, relationships, and presenting statistical results.',
    icon: 'M12',
    color: researchMethodsModuleColors[11],
    topics: ['rm-chapter-12']
  },
  {
    id: 'rm-module-13',
    classId: 'research-methods',
    number: 13,
    title: 'Chapter 13: Inferential Statistics',
    shortTitle: 'Inferential Stats',
    description: 'Null hypothesis testing, common tests, and replicability.',
    icon: 'M13',
    color: researchMethodsModuleColors[0],
    topics: ['rm-chapter-13']
  },
  {
    id: 'rm-module-analyze-data',
    classId: 'research-methods',
    number: null,
    title: 'Analyze your data',
    shortTitle: 'Analyze data',
    description: 'Choose an analysis and follow step-by-step instructions in jamovi, SPSS, or Excel.',
    icon: '📊',
    color: '#6366f1',
    topics: [],
    isDataAnalysisTool: true,
    learningObjectives: [
      'Match your research question to an appropriate analysis',
      'Run the analysis in your chosen software with clear menu paths',
      'Know what to report in your write-up'
    ]
  }
]

function enrichResearchMethodsModule (mod) {
  if (mod.isDataAnalysisTool) return mod
  const chapter = getPressbooksChapterByModuleId(mod.id)
  const part = getCanvasPartForModule(mod.id)
  const objectives = getLearningObjectivesForModule(mod.id)
  return {
    ...mod,
    ...(chapter
      ? {
          textbookChapter: chapter.number,
          pressbooksUrl: chapter.pressbooksUrl,
          textbookTitle: TEXTBOOK.title
        }
      : {}),
    ...(part
      ? {
          canvasPart: part.label,
          canvasPartTitle: part.title,
          canvasPartId: part.id
        }
      : {}),
    ...(objectives.length ? { learningObjectives: objectives } : {})
  }
}

export const researchMethodsModules = researchMethodsModulesBase.map(enrichResearchMethodsModule)

const researchMethodsChapterTopics = {
  'rm-module-1': [
    { id: 'rm-chapter-1', title: 'Chapter 1: The Science of Psychology', description: 'Methods of knowing, science, and common sense.', icon: 'T' }
  ],
  'rm-module-2': [
    { id: 'rm-chapter-2', title: 'Chapter 2: Overview of the Scientific Method', description: 'From topic selection through reporting findings.', icon: 'T' }
  ],
  'rm-module-3': [
    { id: 'rm-chapter-3', title: 'Chapter 3: Research Ethics', description: 'Ethical principles, review, and responsible conduct.', icon: 'T' }
  ],
  'rm-module-4': [
    { id: 'rm-chapter-4', title: 'Chapter 4: Psychological Measurement', description: 'Constructs, scales, reliability, and validity.', icon: 'T' }
  ],
  'rm-module-5': [
    { id: 'rm-chapter-5', title: 'Chapter 5: Experimental Research', description: 'Design structures, control, and validity in experiments.', icon: 'T' }
  ],
  'rm-module-6': [
    { id: 'rm-chapter-6', title: 'Chapter 6: Non-Experimental Research', description: 'Correlational, qualitative, and observational methods.', icon: 'T' }
  ],
  'rm-module-lab': [
    {
      id: 'rm-lab-sampling',
      title: 'Lab: Random assignment & sampling',
      description: 'Interactive mini-lab on assignment vs sampling and probability sampling plans.',
      icon: 'T'
    }
  ],
  'rm-module-7': [
    { id: 'rm-chapter-7', title: 'Chapter 7: Survey Research', description: 'Survey construction and administration strategies.', icon: 'T' }
  ],
  'rm-module-8': [
    { id: 'rm-chapter-8', title: 'Chapter 8: Quasi-Experimental Research', description: 'Alternatives to randomized experiments.', icon: 'T' }
  ],
  'rm-module-9': [
    { id: 'rm-chapter-9', title: 'Chapter 9: Factorial Designs', description: 'Multi-factor experiments and interpretation.', icon: 'T' }
  ],
  'rm-module-10': [
    { id: 'rm-chapter-10', title: 'Chapter 10: Single-Subject Research', description: 'Single-case design logic and applications.', icon: 'T' }
  ],
  'rm-module-11': [
    { id: 'rm-chapter-11', title: 'Chapter 11: Presenting Your Research', description: 'APA style and scientific communication.', icon: 'T' }
  ],
  'rm-module-12': [
    { id: 'rm-chapter-12', title: 'Chapter 12: Descriptive Statistics', description: 'Describing distributions and statistical relationships.', icon: 'T' }
  ],
  'rm-module-13': [
    { id: 'rm-chapter-13', title: 'Chapter 13: Inferential Statistics', description: 'Hypothesis testing and statistical inference.', icon: 'T' }
  ]
}

export const researchMethodsTopicsByModule = researchMethodsChapterTopics

function getModuleItemsForId(moduleId) {
  if (researchMethodsTopicsByModule[moduleId]) {
    return researchMethodsTopicsByModule[moduleId]
  }
  return topicsByModule[moduleId] || []
}

// ============================================================
// ALL MODULES BY CLASS
// ============================================================

export const modulesByClass = {
  'statistics': statisticsModules,
  'intro-research': introResearchModules,
  'research-methods': researchMethodsModules
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

/** True when this class includes the Analyze your data tool (Intro + Research Methods only). */
export function classHasDataAnalysisTool(classId) {
  const modules = modulesByClass[classId] || []
  return modules.some(m => m.isDataAnalysisTool)
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
      id: 'reliability',
      title: 'Reliability',
      description: 'Consistency and repeatability of measurements.',
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
      description: 'Range, IQR, variance, and standard deviation.',
      icon: 'T'
    },
    {
      id: 'skew-kurtosis',
      title: 'Skewness and Kurtosis',
      description: 'Measuring the shape of distributions.',
      icon: 'T'
    },
    {
      id: 'grouped-descriptives',
      title: 'Grouped Descriptive Statistics',
      description: 'Computing and comparing statistics across groups.',
      icon: 'T'
    },
    {
      id: 'standard-scores',
      title: 'Standard Scores (Z-scores)',
      description: 'Standardizing scores for comparison across scales.',
      icon: 'T'
    }
  ],
  'stats-module-5': [
    {
      type: 'chapter',
      id: 'chapter-5',
      title: 'Chapter 5: Drawing Graphs',
      description: 'Create and interpret various types of statistical graphs',
      topics: [
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
          icon: '📊'
        },
        {
          id: 'scatterplots',
          title: 'Scatter Plots',
          description: 'Visualize relationships between two continuous variables.',
          icon: '⋅⋅'
        }
      ]
    },
    {
      type: 'chapter',
      id: 'chapter-6',
      title: 'Chapter 6: Pragmatic Matters',
      description: 'Data manipulation, transformation, and filtering techniques',
      topics: [
        {
          id: 'tabulating-data',
          title: 'Tabulating and Cross-Tabulating Data',
          description: 'Create frequency tables and contingency tables to summarize categorical data.',
          icon: '⊞'
        },
        {
          id: 'logical-expressions',
          title: 'Logical Expressions',
          description: 'Use logical operators to create conditional statements and filter data.',
          icon: '∧∨'
        },
        {
          id: 'transforming-variables',
          title: 'Transforming and Recoding Variables',
          description: 'Create new variables by transforming or recoding existing ones.',
          icon: '↻'
        },
        {
          id: 'mathematical-functions',
          title: 'Mathematical Functions',
          description: 'Use mathematical functions like logarithms, square roots, and exponentials.',
          icon: 'ƒ(x)'
        },
        {
          id: 'filtering-data',
          title: 'Extracting Subsets with Filters',
          description: 'Use filters to include only specific cases in your analysis.',
          icon: '⊂'
        }
      ]
    }
  ],
  'stats-module-6': [
    {
      type: 'chapter',
      id: 'chapter-7',
      title: 'Chapter 7: Introduction to Probability',
      description: 'Fundamentals of probability theory and distributions',
      topics: [
        {
          id: 'probability-concepts',
          title: 'Probability Concepts',
          description: 'Probability vs statistics, frequentist vs Bayesian interpretations.',
          icon: 'P'
        },
        {
          id: 'probability-rules',
          title: 'Basic Probability Theory',
          description: 'Fundamental probability rules, sample spaces, and elementary events.',
          icon: '∩∪'
        },
        {
          id: 'binomial-distribution',
          title: 'The Binomial Distribution',
          description: 'Understanding and working with the binomial distribution.',
          icon: 'B'
        },
        {
          id: 'normal-distribution',
          title: 'The Normal Distribution',
          description: 'Properties of the bell curve, probability density, and the empirical rule.',
          icon: '𝒩'
        },
        {
          id: 'other-distributions',
          title: 'Other Important Distributions',
          description: 'The t, χ², and F distributions.',
          icon: 't,χ²,F'
        }
      ]
    },
    {
      type: 'chapter',
      id: 'chapter-8',
      title: 'Chapter 8: Estimating Unknown Quantities from a Sample',
      description: 'Sampling theory, estimation, and confidence intervals',
      topics: [
        {
          id: 'sampling-theory',
          title: 'Sampling Theory',
          description: 'Samples, populations, and sampling methods.',
          icon: '⊃'
        },
        {
          id: 'law-of-large-numbers',
          title: 'Law of Large Numbers',
          description: 'How larger samples provide more accurate estimates.',
          icon: '→∞'
        },
        {
          id: 'central-limit-theorem',
          title: 'Central Limit Theorem',
          description: 'Sampling distributions and the central limit theorem.',
          icon: 'CLT'
        },
        {
          id: 'parameter-estimation',
          title: 'Estimating Parameters',
          description: 'Estimating population means and standard deviations from samples.',
          icon: 'θ̂'
        },
        {
          id: 'confidence-intervals',
          title: 'Confidence Intervals',
          description: 'Constructing and interpreting confidence intervals.',
          icon: 'CI'
        }
      ]
    }
  ],
  'stats-module-7': [
    // Chapter 9: Hypothesis Testing (original Module 7 content)
    {
      id: 'hypothesis-testing',
      title: 'Hypothesis Testing',
      description: 'The logic of null hypothesis significance testing.',
      icon: 'T'
    },
    {
      id: 'p-values',
      title: 'P-Values',
      description: 'Understanding and interpreting p-values correctly.',
      icon: 'T'
    },
    {
      id: 'effect-size',
      title: 'Effect Size',
      description: 'Measuring practical significance beyond p-values.',
      icon: 'T'
    }
  ],
  'stats-module-8': [
    {
      type: 'chapter',
      id: 'chapter-10',
      title: 'Chapter 10: Categorical Data Analysis',
      description: 'Chi-square tests and related procedures for categorical data',
      topics: [
        {
          id: 'chi-square-goodness-of-fit',
          title: 'Chi-Square Goodness-of-Fit Test',
          description: 'Testing if observed frequencies match expected probabilities.',
          icon: 'χ²'
        },
        {
          id: 'chi-square-independence',
          title: 'Chi-Square Test of Independence',
          description: 'Testing association between two categorical variables.',
          icon: 'χ²'
        },
        {
          id: 'chi-square-corrections-effect-size',
          title: 'Continuity Correction and Effect Size',
          description: 'Yates correction and measures of association strength.',
          icon: 'V'
        },
        {
          id: 'chi-square-assumptions-fisher',
          title: 'Assumptions and Fisher Exact Test',
          description: 'When chi-square fails and alternatives for small samples.',
          icon: 'F'
        },
        {
          id: 'mcnemar-test',
          title: "McNemar's Test",
          description: 'Chi-square test for paired categorical data.',
          icon: 'M'
        }
      ]
    },
    {
      type: 'chapter',
      id: 'chapter-11',
      title: 'Chapter 11: Comparing Two Means',
      description: 'T-tests and related procedures for comparing means',
      topics: [
        {
          id: 'one-sample-z-test',
          title: 'One-Sample Z-Test',
          description: 'Testing a sample mean against a known population (σ known).',
          icon: 'z'
        },
        {
          id: 'one-sample-t-test',
          title: 'One-Sample T-Test',
          description: 'Testing a sample mean when population SD is unknown.',
          icon: 't'
        },
        {
          id: 'independent-t-test',
          title: "Independent Samples T-Test (Student's)",
          description: 'Comparing two independent groups with equal variances.',
          icon: 't₁₂'
        },
        {
          id: 'welch-t-test',
          title: "Independent Samples T-Test (Welch's)",
          description: 'Comparing two independent groups without assuming equal variances.',
          icon: 'tʷ'
        },
        {
          id: 'paired-t-test',
          title: 'Paired-Samples T-Test',
          description: 'Comparing two related measurements from the same participants.',
          icon: 't_D'
        },
        {
          id: 'one-sided-tests',
          title: 'One-Sided Tests',
          description: 'Directional hypothesis testing.',
          icon: '→'
        },
        {
          id: 'effect-size-cohens-d',
          title: "Effect Size: Cohen's d",
          description: 'Standardized measure of mean differences.',
          icon: 'd'
        },
        {
          id: 'checking-normality',
          title: 'Checking Normality',
          description: 'QQ plots and Shapiro-Wilk test for assessing normality.',
          icon: 'Q-Q'
        },
        {
          id: 'wilcoxon-tests',
          title: 'Wilcoxon Tests',
          description: 'Nonparametric alternatives to t-tests.',
          icon: 'W'
        }
      ]
    },
    {
      type: 'chapter',
      id: 'chapter-12',
      title: 'Chapter 12: Correlation and Linear Regression',
      description: 'Analyzing relationships between continuous variables',
      topics: [
        {
          id: 'correlation',
          title: 'Correlation',
          description: 'Pearson and Spearman correlation coefficients.',
          icon: 'r'
        },
        {
          id: 'scatterplots',
          title: 'Scatterplots',
          description: 'Visualizing relationships between variables.',
          icon: '📊'
        },
        {
          id: 'simple-regression',
          title: 'Simple Linear Regression',
          description: 'Building regression models with one predictor.',
          icon: 'ŷ'
        },
        {
          id: 'multiple-regression',
          title: 'Multiple Regression',
          description: 'Extending to multiple predictors.',
          icon: 'Ŷ'
        },
        {
          id: 'regression-inference',
          title: 'Hypothesis Tests',
          description: 'Testing coefficients and model fit.',
          icon: 'F'
        },
        {
          id: 'regression-assumptions',
          title: 'Diagnostics & Assumptions',
          description: 'Checking model assumptions.',
          icon: '✓'
        },
        {
          id: 'model-selection',
          title: 'Model Selection',
          description: 'Comparing and choosing models.',
          icon: 'Δ'
        }
      ]
    },
    {
      type: 'chapter',
      id: 'chapter-13',
      title: 'Chapter 13: Comparing Several Means (One-Way ANOVA)',
      description: 'ANOVA and related procedures for comparing three or more groups',
      topics: [
        {
          id: 'one-way-anova-basics',
          title: 'One-Way ANOVA Basics',
          description: 'Comparing means across three or more groups.',
          icon: 'F'
        },
        {
          id: 'post-hoc-tests-anova',
          title: 'Post-Hoc Tests & Multiple Comparisons',
          description: 'Identifying which specific groups differ after a significant ANOVA.',
          icon: 'pH'
        },
        {
          id: 'anova-assumptions',
          title: 'ANOVA Assumptions',
          description: 'Checking normality, homogeneity of variance, and independence.',
          icon: '✓'
        },
        {
          id: 'repeated-measures-anova',
          title: 'Repeated Measures ANOVA',
          description: 'Comparing means when the same participants are in all groups.',
          icon: 'RM'
        }
      ]
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

// Get module items with chapter structure preserved (for UI rendering)
export function getModuleItemsWithChapters(moduleId) {
  return getModuleItemsForId(moduleId)
}

export function getTopicsForModule(moduleId) {
  const items = getModuleItemsForId(moduleId)
  // Flatten chapter structure to return actual topics
  const topics = []
  for (const item of items) {
    if (item.type === 'chapter' && item.topics) {
      // If it's a chapter, add all its topics
      topics.push(...item.topics)
    } else {
      // Otherwise, it's a regular topic
      topics.push(item)
    }
  }
  return topics
}

export function getAllTopics() {
  const allTopics = []
  for (const moduleId of Object.keys(topicsByModule)) {
    const items = getModuleItemsForId(moduleId)
    for (const item of items) {
      if (item.type === 'chapter' && item.topics) {
        allTopics.push(...item.topics)
      } else {
        allTopics.push(item)
      }
    }
  }
  for (const moduleId of Object.keys(researchMethodsTopicsByModule)) {
    if (topicsByModule[moduleId]) continue
    allTopics.push(...researchMethodsTopicsByModule[moduleId])
  }
  return allTopics
}

export function getTopicById(topicId) {
  const moduleIds = Array.from(
    new Set([...Object.keys(topicsByModule), ...Object.keys(researchMethodsTopicsByModule)])
  )
  for (const moduleId of moduleIds) {
    const items = getModuleItemsForId(moduleId)
    for (const item of items) {
      if (item.type === 'chapter' && item.topics) {
        // Search within chapter topics
        const topic = item.topics.find(t => t.id === topicId)
        if (topic) return topic
      } else if (item.id === topicId) {
        // Regular topic
        return item
      }
    }
  }
  return null
}

export function getModuleForTopic(topicId) {
  const moduleIds = Array.from(
    new Set([...Object.keys(topicsByModule), ...Object.keys(researchMethodsTopicsByModule)])
  )
  for (const moduleId of moduleIds) {
    const items = getModuleItemsForId(moduleId)
    for (const item of items) {
      if (item.type === 'chapter' && item.topics) {
        // Check if topic is in this chapter
        if (item.topics.some(t => t.id === topicId)) {
          return getModuleById(moduleId)
        }
      } else if (item.id === topicId) {
        // Regular topic found
        return getModuleById(moduleId)
      }
    }
  }
  return null
}
