/**
 * Research Methods in Psychology (4th ed.) — Jhangiani et al. (KPU Pressbooks).
 * Canonical 1:1 map: rm-module-N ↔ Pressbooks Chapter N ↔ rm-chapter-N topic.
 * Also maps Fall 2026 Canvas (PSYC 4223 capstone) phases to supporting chapters.
 */

export const TEXTBOOK = {
  title: 'Research Methods in Psychology',
  edition: '4th',
  authors: 'Rajiv S. Jhangiani, I-Chant A. Chiang, Carrie Cuttler, and Dana C. Leighton',
  license: 'CC BY-NC-SA 4.0',
  pressbooksBase: 'https://kpu.pressbooks.pub/psychmethods4e/'
}

/** @type {Array<{ number: number, moduleId: string, topicId: string, title: string, shortTitle: string, pressbooksUrl: string, canvasPhases?: string[] }>} */
export const PRESSBOOKS_CHAPTERS = [
  {
    number: 1,
    moduleId: 'rm-module-1',
    topicId: 'rm-chapter-1',
    title: 'Chapter 1: The Science of Psychology',
    shortTitle: 'Science of Psychology',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/the-science-of-psychology/',
    canvasPhases: ['Part 1', 'Part 1 — Phase 1: Choosing a Topic']
  },
  {
    number: 2,
    moduleId: 'rm-module-2',
    topicId: 'rm-chapter-2',
    title: 'Chapter 2: Overview of the Scientific Method',
    shortTitle: 'Scientific Method',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/overview-of-the-scientific-method/',
    canvasPhases: [
      'Part 1 — Phase 1: Choosing a Topic',
      'Part 1 — Phase 2: Literature Review',
      'Part 2 — Phase 3: Research Question Formulation'
    ]
  },
  {
    number: 3,
    moduleId: 'rm-module-3',
    topicId: 'rm-chapter-3',
    title: 'Chapter 3: Research Ethics',
    shortTitle: 'Research Ethics',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/research-ethics/',
    canvasPhases: ['Human Research Training', 'Part 3 — IRB Submission']
  },
  {
    number: 4,
    moduleId: 'rm-module-4',
    topicId: 'rm-chapter-4',
    title: 'Chapter 4: Psychological Measurement',
    shortTitle: 'Measurement',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/psychological-measurement/',
    canvasPhases: ['Part 2 — Phase 4: Choosing a Methodology Type', 'Methods Section']
  },
  {
    number: 5,
    moduleId: 'rm-module-5',
    topicId: 'rm-chapter-5',
    title: 'Chapter 5: Experimental Research',
    shortTitle: 'Experimental',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/experimental-research/',
    canvasPhases: ['Path 3 — Experimental Design', 'Methods Section']
  },
  {
    number: 6,
    moduleId: 'rm-module-6',
    topicId: 'rm-chapter-6',
    title: 'Chapter 6: Non-Experimental Research',
    shortTitle: 'Non-Experimental',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/non-experimental-research/',
    canvasPhases: ['Path 2 — Qualitative Interview', 'Path 4 — Archival Data', 'Methods Section']
  },
  {
    number: 7,
    moduleId: 'rm-module-7',
    topicId: 'rm-chapter-7',
    title: 'Chapter 7: Survey Research',
    shortTitle: 'Survey Research',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/survey-research/',
    canvasPhases: ['Path 1 — Survey Methodology', 'Methods Section']
  },
  {
    number: 8,
    moduleId: 'rm-module-8',
    topicId: 'rm-chapter-8',
    title: 'Chapter 8: Quasi-Experimental Research',
    shortTitle: 'Quasi-Experimental',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/quasi-experimental-research/',
    canvasPhases: ['Methods Section']
  },
  {
    number: 9,
    moduleId: 'rm-module-9',
    topicId: 'rm-chapter-9',
    title: 'Chapter 9: Factorial Designs',
    shortTitle: 'Factorial Designs',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/factorial-designs/',
    canvasPhases: ['Path 3 — Experimental Design']
  },
  {
    number: 10,
    moduleId: 'rm-module-10',
    topicId: 'rm-chapter-10',
    title: 'Chapter 10: Single-Subject Research',
    shortTitle: 'Single-Subject',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/single-subject-research/',
    canvasPhases: []
  },
  {
    number: 11,
    moduleId: 'rm-module-11',
    topicId: 'rm-chapter-11',
    title: 'Chapter 11: Presenting Your Research',
    shortTitle: 'Presenting Research',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/presenting-your-research/',
    canvasPhases: ['Methods Section', 'Part 3 — IRB Submission']
  },
  {
    number: 12,
    moduleId: 'rm-module-12',
    topicId: 'rm-chapter-12',
    title: 'Chapter 12: Descriptive Statistics',
    shortTitle: 'Descriptive Stats',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/descriptive-statistics/',
    canvasPhases: []
  },
  {
    number: 13,
    moduleId: 'rm-module-13',
    topicId: 'rm-chapter-13',
    title: 'Chapter 13: Inferential Statistics',
    shortTitle: 'Inferential Stats',
    pressbooksUrl: 'https://kpu.pressbooks.pub/psychmethods4e/part/inferential-statistics/',
    canvasPhases: []
  }
]

/**
 * Learning objectives keyed by Pressbooks chapter (rm-module-N).
 * Realigned from an older 12-module syllabus block that did not match chapter numbers.
 */
export const LEARNING_OBJECTIVES_BY_MODULE = {
  'rm-module-1': [
    'Why research matters: evaluating credibility and claims.',
    'Humans as limited information processors: schemas, categorization, and stereotyping.',
    'Heuristics and bias in judgment: representativeness, availability, and confirmation bias.',
    'How thinking goes wrong (Shermer\'s four categories) and implications for research skepticism.',
    'Laws, theories, and hypotheses; what makes a good research question.'
  ],
  'rm-module-2': [
    'Generating research ideas and moving from broad interests to researchable questions.',
    'Literature searching and working backward through citations to map a topic area.',
    'Evaluating evidence and building the rationale (gaps; third-variable thinking).',
    'From question to plan: aligning question, design, measures, and feasibility.'
  ],
  'rm-module-3': [
    'Why ethical review exists: history and cases motivating oversight (Belmont principles).',
    'IRB purpose, structure, and review types; what counts as research and human subjects.',
    'Informed consent and debriefing; confidentiality and risk/benefit logic.',
    'Deception, incentives, participant pools, and research with children.',
    'IRB proposal components and required training (e.g., CITI-style modules).'
  ],
  'rm-module-4': [
    'Measurement as ideal vs real: constructs, operationalization, and measurement limits.',
    'Scale types: nominal, ordinal, interval, ratio; anchors and what you can conclude.',
    'Finding measures: literature mining and databases (e.g., PsycTESTS, HaPI).',
    'Reliability: forms of reliability; internal consistency and Cronbach\'s alpha.',
    'Validity and practical selection: content, criterion, construct; scoring and social desirability.'
  ],
  'rm-module-5': [
    'What research can tell you: certainty, correlation vs causation, language that matches design.',
    'Experimental vs quasi-experimental vs correlational; IV/DV and quasi-IV.',
    'Internal validity threats and remedies (demand characteristics, blinding, manipulation checks).',
    'External and ecological validity; lab, field, survey, and online settings.',
    'Between-subjects structure: random assignment, manipulated IVs, and DV selection.',
    'Control and internal validity: standardized procedures and cover stories.',
    'Who are the participants? Sampling, representativeness, and recruitment channels.',
    'Ethics of recruitment and incentives; data quality in field and online contexts.'
  ],
  'rm-module-6': [
    'Correlational logic: predicting relationships and using association language correctly.',
    'Quasi-experimental and group-difference logic: preexisting groups and causal limits.',
    'Validity and interpretation in non-randomized comparisons (confounds).',
    'What qualitative research is for and how it differs from quantitative approaches.',
    'Qualitative collection: interviews, focus groups, and case-based approaches.',
    'Coding, theme development, and transparency of interpretation.',
    'Credibility, reflexivity, and protections when data are personal or sensitive.'
  ],
  'rm-module-7': [
    'When and why to develop your own measure (and when to avoid it).',
    'Item writing and response formats: stems, anchors, open vs closed-ended.',
    'Demographics and socially sensitive wording; self-identification approaches.',
    'Survey structure: question order, sensitive items, and pilot testing.',
    'Online survey tools, exporting data, and internal-validity concerns of remote completion.'
  ],
  'rm-module-8': [
    'Quasi-experimental logic in practice: preexisting groups and quasi-IVs.',
    'Choosing analyses conceptually by question and design.',
    'Validity and interpretation issues in non-randomized group comparisons.'
  ],
  'rm-module-9': [
    'Within-subjects logic: why use it and what it changes about inference.',
    'Order and carryover effects; counterbalancing strategies.',
    'Fatigue, learning, and participant experience as threats to validity.',
    'Interpreting within-subjects findings and reporting caveats.'
  ],
  'rm-module-10': [
    'Single-subject design logic, variants, and when they are appropriate.',
    'Baseline, intervention, and reversal logic in single-case designs.',
    'Interpreting single-subject data and limits to generalization.'
  ],
  'rm-module-11': [
    'Integrating the research process: question, design, measures, sampling, and ethics.',
    'Interpreting results responsibly: alternative explanations and accurate language.',
    'Preparing research products: documentation, replication, and reporting workflow.',
    'APA style and communicating findings in papers and presentations.'
  ],
  'rm-module-12': [
    'Describing variables and distributions for research reports.',
    'Expressing relationships between variables with appropriate descriptive statistics.',
    'Presenting statistical results clearly in tables and text.'
  ],
  'rm-module-13': [
    'Null hypothesis testing logic and decision rules.',
    'Common inferential tests and when each applies.',
    'Effect size, power, and replicability concerns.'
  ],
  'rm-module-lab': [
    'Distinguish random vs non-random assignment to conditions.',
    'Compare simple random, stratified, cluster, and convenience sampling.',
    'Connect sampling and assignment choices to internal and external validity.'
  ]
}

/** Canvas methodology paths → primary chapter modules + stats/analysis guidance */
export const CANVAS_METHOD_PATHS = {
  'path-1-survey': {
    label: 'Path 1 — Survey Methodology',
    shortLabel: 'Survey',
    moduleIds: ['rm-module-4', 'rm-module-7'],
    topicIds: ['rm-chapter-4', 'rm-chapter-7'],
    analysisIds: ['descriptives', 'correlation', 'simple_regression', 'chi_square_independence', 'independent_t'],
    statsIntro:
      'Survey designs emphasize describing scale scores, correlations between constructs, and regression when predicting outcomes. Read Ch. 12–13 with survey data in mind, then use the analysis tool below.',
    chapterFocus: {
      12: 'Describe scale distributions, sample characteristics, and reliability summaries.',
      13: 'Correlation, regression, and group comparisons on survey responses.'
    }
  },
  'path-2-qualitative': {
    label: 'Path 2 — Qualitative Interview',
    shortLabel: 'Qualitative',
    moduleIds: ['rm-module-6'],
    topicIds: ['rm-chapter-6'],
    analysisIds: ['descriptives'],
    statsIntro:
      'Qualitative paths center on themes, coding, and quotes. Use Ch. 12 if you report demographic counts or simple summaries; inferential tests are usually secondary.',
    chapterFocus: {
      12: 'Summarize participant counts, demographics, or simple descriptive tables if your report includes them.',
      13: 'Skim inferential logic for context — most qualitative write-ups do not rely on NHST.'
    }
  },
  'path-3-experimental': {
    label: 'Path 3 — Experimental Design',
    shortLabel: 'Experimental',
    moduleIds: ['rm-module-4', 'rm-module-5', 'rm-module-9'],
    topicIds: ['rm-chapter-4', 'rm-chapter-5', 'rm-chapter-9'],
    analysisIds: ['descriptives', 'independent_t', 'paired_t', 'one_way_anova', 'one_sample_t'],
    statsIntro:
      'Experimental paths rely on comparing conditions. Ch. 12 for descriptives by group; Ch. 13 for t-tests, ANOVA, and related inferential tests.',
    chapterFocus: {
      12: 'Descriptive statistics by condition (means, SDs, Ns) before inferential tests.',
      13: 'Independent-samples t, paired t, and one-way ANOVA — match the test to your design.'
    }
  },
  'path-4-archival': {
    label: 'Path 4 — Archival Data',
    shortLabel: 'Archival',
    moduleIds: ['rm-module-6'],
    topicIds: ['rm-chapter-6'],
    analysisIds: ['descriptives', 'correlation', 'chi_square_independence', 'simple_regression', 'independent_t'],
    statsIntro:
      'Archival work uses existing datasets. Ch. 12–13 support describing variables, testing associations, and comparing groups in secondary data.',
    chapterFocus: {
      12: 'Describe variables available in the dataset and missing-data patterns.',
      13: 'Correlation, chi-square, and group comparisons appropriate to non-experimental archival designs.'
    }
  }
}

/** Ordered list for UI tabs (Survey → Qualitative → Experimental → Archival). */
export const METHOD_PATHS_LIST = Object.entries(CANVAS_METHOD_PATHS).map(([id, path]) => ({
  id,
  ...path
}))

/**
 * Canvas course structure (PSYC 4223) — groups Pressbooks chapter modules.
 * Ch. 1 opens Part 1 as the course introduction.
 */
export const CANVAS_COURSE_PARTS = [
  {
    id: 'part-1',
    label: 'Part 1',
    title: 'Introduction & literature review',
    description:
      'Start with Ch. 1 (why we do science), then Ch. 2 for topic choice, article reviews, and the literature review.',
    moduleIds: ['rm-module-1', 'rm-module-2']
  },
  {
    id: 'part-2',
    label: 'Part 2',
    title: 'Question, design & methods',
    description:
      'Research question, methodology path, and methods write-up — use the chapters that match your design.',
    moduleIds: [
      'rm-module-4',
      'rm-module-5',
      'rm-module-6',
      'rm-module-lab',
      'rm-module-7',
      'rm-module-8',
      'rm-module-9',
      'rm-module-10',
      'rm-module-11'
    ]
  },
  {
    id: 'part-3',
    label: 'Part 3',
    title: 'Ethics, training & IRB',
    description: 'Human Research Training and IRB submission (Pressbooks Ch. 3).',
    moduleIds: ['rm-module-3']
  },
  {
    id: 'data-by-path',
    label: 'Analysis',
    title: 'Statistics & data analysis by path',
    description:
      'Choose your methodology path (Survey, Qualitative, Experimental, or Archival) — then read Ch. 12–13 and use the analysis tool matched to your design.',
    moduleIds: ['rm-module-data-by-path']
  }
]

const moduleToCanvasPart = Object.fromEntries(
  CANVAS_COURSE_PARTS.flatMap(part =>
    part.moduleIds.map(moduleId => [moduleId, part])
  )
)

export function getCanvasPartForModule (moduleId) {
  return moduleToCanvasPart[moduleId] ?? null
}

/** Module list grouped for ClassHome navigation (research-methods only). */
export function groupModulesByCanvasPart (modules) {
  const byId = Object.fromEntries(modules.map(m => [m.id, m]))
  return CANVAS_COURSE_PARTS.map(part => ({
    ...part,
    modules: part.moduleIds.map(id => byId[id]).filter(Boolean)
  })).filter(part => part.modules.length > 0)
}

const chapterByModuleId = Object.fromEntries(
  PRESSBOOKS_CHAPTERS.map(ch => [ch.moduleId, ch])
)

export function getPressbooksChapterByModuleId (moduleId) {
  return chapterByModuleId[moduleId] ?? null
}

export function getPressbooksChapterByTopicId (topicId) {
  return PRESSBOOKS_CHAPTERS.find(ch => ch.topicId === topicId) ?? null
}

export function getLearningObjectivesForModule (moduleId) {
  return LEARNING_OBJECTIVES_BY_MODULE[moduleId] ?? []
}

export function getChaptersForCanvasPhase (phaseLabel) {
  return PRESSBOOKS_CHAPTERS.filter(ch =>
    ch.canvasPhases?.some(p => p.toLowerCase().includes(phaseLabel.toLowerCase()))
  )
}

export function getMethodPathById (pathId) {
  return CANVAS_METHOD_PATHS[pathId] ?? null
}

/** Human-readable label for assignment-help topic links (rm-chapter-N). */
export function formatResearchMethodsTopicLabel (topicId) {
  const ch = getPressbooksChapterByTopicId(topicId)
  if (ch) return `Ch. ${ch.number}: ${ch.shortTitle}`
  if (topicId === 'rm-lab-sampling') return 'Lab: Random assignment & sampling'
  return null
}
