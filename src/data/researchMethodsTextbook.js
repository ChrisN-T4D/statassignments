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
 * Module-level learning objectives keyed by Pressbooks chapter (rm-module-N).
 * Written as measurable, learner-centered outcomes (QM 7th Ed. SRS 2.2 / 2.3): each begins with an
 * observable verb and is rendered under "By the end of this module, you will be able to:" (ClassHome.vue).
 * Keep these consistent with the finer-grained RM*-O* items in objectives.js and with the
 * assessments (concept review, assignment help, capstone worksheets) that measure them.
 */
export const LEARNING_OBJECTIVES_BY_MODULE = {
  'rm-module-1': [
    'Distinguish scientific, empirical, and falsifiable claims from common-sense and pseudoscientific claims.',
    'Explain how schemas, heuristics (representativeness, availability), and confirmation bias distort everyday judgment.',
    'Define law, theory, and hypothesis, and explain how theories are revised in light of evidence.',
    'Evaluate whether a research question is empirical, falsifiable, and worth asking.'
  ],
  'rm-module-2': [
    'Move from a broad topic of interest to a researchable question and a testable hypothesis.',
    'Search the literature and trace citations backward and forward to map a topic area.',
    'Build a rationale that identifies a gap in the literature and a plausible third-variable explanation.',
    'Align question, design, measures, and feasibility in a draft research plan.'
  ],
  'rm-module-3': [
    'Apply the Belmont principles (respect, beneficence, justice) to a proposed human-subjects study.',
    'Classify a study by IRB review type and identify what counts as research with human subjects.',
    'Draft informed-consent, debriefing, and confidentiality procedures that fit a study\'s risks and benefits.',
    'Evaluate deception, incentives, and recruitment practices for coercion and for protections of vulnerable populations.',
    'Assemble the required components of an IRB proposal and complete the required human-research training.'
  ],
  'rm-module-4': [
    'Write conceptual and operational definitions for a construct.',
    'Classify variables by scale of measurement (nominal, ordinal, interval, ratio) and state which conclusions each scale supports.',
    'Locate published measures in the literature and databases (e.g., PsycTESTS, HaPI).',
    'Distinguish forms of reliability (test-retest, internal consistency) and validity (face, content, criterion, construct), and explain how a measure can be reliable but not valid.',
    'Select a measure for a study and justify the choice using its reliability, validity, and susceptibility to social desirability.'
  ],
  'rm-module-5': [
    'Identify the independent and dependent variables in a study and distinguish random assignment from random sampling.',
    'Match the strength of a causal claim to the design that produced the evidence (experimental, quasi-experimental, correlational).',
    'Identify threats to internal validity (confounds, demand characteristics, experimenter effects) and propose controls such as blinding, placebo conditions, and manipulation checks.',
    'Compare between-subjects and within-subjects designs, including counterbalancing and carryover effects.',
    'Evaluate external and ecological validity across lab, field, and online settings.',
    'Describe an ethical, representative recruitment and sampling plan for an experiment.'
  ],
  'rm-module-6': [
    'Interpret a correlation without inferring causation, naming directionality and third-variable alternatives.',
    'Describe non-experimental methods (naturalistic and participant observation, case study, archival, content analysis) and choose one that fits a question.',
    'Explain how cross-sectional comparisons of pre-existing groups limit causal conclusions.',
    'Contrast qualitative and quantitative approaches in purpose, data collection (interviews, focus groups), and analysis.',
    'Outline a transparent coding and theme-development process and the protections needed for sensitive qualitative data.'
  ],
  'rm-module-7': [
    'Decide whether to adopt an existing measure or write a new survey, and justify the decision.',
    'Write and revise survey items (stems, anchors, open vs. closed formats), avoiding double-barreled and leading wording.',
    'Word demographic and sensitive items respectfully.',
    'Sequence survey items and pilot-test a survey to reduce order effects and response bias.',
    'Define sampling frame, coverage error, and nonresponse bias, and administer an online survey while managing its internal-validity concerns.'
  ],
  'rm-module-8': [
    'Explain why quasi-experiments lack random assignment and compare one-group and nonequivalent-control-group designs.',
    'Describe conceptually how interrupted time-series, regression-discontinuity, and difference-in-differences designs address non-equivalence.',
    'Identify threats to validity in quasi-experiments (including pretest sensitization) and phrase causal conclusions with appropriate caution.'
  ],
  'rm-module-9': [
    'Count the conditions in a factorial design and distinguish main effects from interactions.',
    'Interpret cell means, simple effects, and crossover (disordinal) interactions from a table or graph.',
    'Justify adding a second factor and explain how random assignment and interaction plots support interpretation.'
  ],
  'rm-module-10': [
    'Describe single-subject designs (stable baseline, reversal/ABA, multiple baseline, changing criterion) and their limitations.',
    'Evaluate single-subject data using visual analysis of level, trend, variability, and overlap, and check treatment integrity.',
    'State when a single-subject design is appropriate and how replication strengthens its external validity.'
  ],
  'rm-module-11': [
    'Format a student research paper in APA style (title page, citations, methods, tables, figures, references with DOIs).',
    'Write a discussion section that links results to hypotheses and prior literature, reports effect sizes, and acknowledges limitations.',
    'Plan a conference poster and a short oral presentation for a research audience.',
    'Describe open-science practices (preregistration, data and materials sharing) that support replication.'
  ],
  'rm-module-12': [
    'Calculate and interpret measures of central tendency and variability, including the effects of outliers and skew.',
    'Select an appropriate graph or table for categorical versus quantitative variables.',
    'Describe a relationship between two variables using an appropriate descriptive statistic and report it in APA format.'
  ],
  'rm-module-13': [
    'State a null hypothesis and explain Type I error and what a p-value does and does not mean.',
    'Choose a common inferential test (e.g., t-test, ANOVA, correlation, chi-square) that fits a design and variable types.',
    'Interpret effect size, confidence intervals, and power, and avoid treating "fail to reject" as proof of the null.',
    'Explain why replication, familywise error, and practical (vs. statistical) significance matter when interpreting results.'
  ],
  'rm-module-lab': [
    'Distinguish random from non-random assignment to conditions by running the simulation.',
    'Compare simple random, stratified, cluster, and convenience sampling and predict how each affects representativeness.',
    'Explain how sampling and assignment choices affect external and internal validity.'
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
      'Course intro, Phase 1 topic choice and article reviews, then Phase 2 literature review — same sequence as Canvas Part 1.',
    moduleIds: ['rm-module-1', 'rm-module-2']
  },
  {
    id: 'part-2',
    label: 'Part 2',
    title: 'Research question & methodological route',
    description:
      'Phase 3 elevator speech and Phase 4 operationalization, methods write-up, and methodology path guides — Canvas Part 2.',
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
    description: 'Human Research Training lessons and IRB submission — Canvas Part 3.',
    moduleIds: ['rm-module-3']
  },
  {
    id: 'data-by-path',
    label: 'Analysis',
    title: 'Statistics & data analysis by path',
    description:
      'After Phase 4 path choice — Ch. 12–13 reading and path-matched analysis steps.',
    moduleIds: ['rm-module-data-by-path']
  }
]

/** Experimental Design course — design chapters + experimental-focused analysis (no capstone paths). */
export const EXPERIMENTAL_COURSE_PARTS = [
  {
    id: 'proposal',
    label: 'Proposal',
    title: 'Proposal, ethics & dissemination',
    description:
      'Develop a testable research proposal, plan IRB-ready ethics procedures, and prepare the APA paper, class presentation, and research-day poster.',
    moduleIds: ['rm-module-2', 'rm-module-3', 'rm-module-11']
  },
  {
    id: 'design',
    label: 'Design',
    title: 'Experimental & quasi-experimental methods',
    description:
      'Measurement, true experiments, quasi-experiments, factorial designs, and the random-assignment lab.',
    moduleIds: ['rm-module-4', 'rm-module-5', 'rm-module-8', 'rm-module-9', 'rm-module-lab']
  },
  {
    id: 'analysis',
    label: 'Analysis',
    title: 'Statistics & analyze your data',
    description:
      'Ch. 12–13 and software steps for experimental designs (descriptives, t-tests, ANOVA). Due dates are in Canvas.',
    moduleIds: ['rm-module-data-by-path']
  }
]

const moduleToCanvasPart = Object.fromEntries(
  CANVAS_COURSE_PARTS.flatMap(part =>
    part.moduleIds.map(moduleId => [moduleId, part])
  )
)

const moduleToExperimentalPart = Object.fromEntries(
  EXPERIMENTAL_COURSE_PARTS.flatMap(part =>
    part.moduleIds.map(moduleId => [moduleId, part])
  )
)

export function getCoursePartsForClass (classIdOrSlug) {
  if (classIdOrSlug === 'experimental') return EXPERIMENTAL_COURSE_PARTS
  if (classIdOrSlug === 'research-methods') return CANVAS_COURSE_PARTS
  return []
}

export function getCanvasPartForModule (moduleId, classIdOrSlug = 'research-methods') {
  if (classIdOrSlug === 'experimental') {
    return moduleToExperimentalPart[moduleId] ?? null
  }
  return moduleToCanvasPart[moduleId] ?? null
}

/** Module list grouped for ClassHome navigation (research-methods or experimental). */
export function groupModulesByCanvasPart (modules, classIdOrSlug = 'research-methods') {
  const parts = getCoursePartsForClass(classIdOrSlug)
  const byId = Object.fromEntries(modules.map(m => [m.id, m]))
  return parts.map(part => ({
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
