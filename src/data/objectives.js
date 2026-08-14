// Learning Objectives organized by module
// Each objective can be tracked for mastery assessment.
// classId + moduleId keep Statistics M1 and Research Methods M1 from colliding.

export const objectives = [
  // Module 1: Why Learn Statistics
  {
    classId: 'statistics',
    moduleId: 'stats-module-1',
    module: 1,
    objectiveType: 'content',
    objectiveId: 'M1-O1',
    objective: 'Explain why scientists use statistics as a safeguard against biased/limited human reasoning rather than relying on intuition alone.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-1',
    module: 1,
    objectiveType: 'content',
    objectiveId: 'M1-O2',
    objective: 'Define the belief bias effect in logical reasoning.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-1',
    module: 1,
    objectiveType: 'content',
    objectiveId: 'M1-O3',
    objective: 'Differentiate deductive validity from the truth or believability of a conclusion (i.e., validity does not require true premises).'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-1',
    module: 1,
    objectiveType: 'content',
    objectiveId: 'M1-O4',
    objective: 'Describe Simpson\'s paradox as a case where an aggregated association can differ from or reverse relative to disaggregated (subgroup) associations.'
  },

  // Module 2: Research Design & Measurement
  {
    classId: 'statistics',
    moduleId: 'stats-module-2',
    module: 2,
    objectiveType: 'content',
    objectiveId: 'M2-O1',
    objective: 'Define psychological measurement and distinguish the thing being measured (theoretical construct) from the measurement/observed value.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-2',
    module: 2,
    objectiveType: 'content',
    objectiveId: 'M2-O2',
    objective: 'Define operationalisation and distinguish among theoretical construct, measure, operationalisation, and variable.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-2',
    module: 2,
    objectiveType: 'content',
    objectiveId: 'M2-O3',
    objective: 'Classify variables by scale of measurement (nominal, ordinal, interval, ratio) and distinguish continuous versus discrete variables.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-2',
    module: 2,
    objectiveType: 'content',
    objectiveId: 'M2-O4',
    objective: 'Define reliability and validity, differentiate them, and identify major forms of reliability (test–retest, inter-rater, parallel forms, internal consistency).'
  },

  // Module 3: Software Basics and Data Handling
  {
    classId: 'statistics',
    moduleId: 'stats-module-3',
    module: 3,
    objectiveType: 'software',
    objectiveId: 'M3-O1',
    objective: 'Identify the main parts of the jamovi interface and use the basic analysis workflow (select an analysis, set options, view results, remove an analysis).'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-3',
    module: 3,
    objectiveType: 'software',
    objectiveId: 'M3-O2',
    objective: 'Import/open data files in jamovi (e.g., .omv, .csv, and other common formats) and verify key import settings (header row, decimal/separator, quoting, missing values).'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-3',
    module: 3,
    objectiveType: 'software',
    objectiveId: 'M3-O3',
    objective: 'Install jamovi add-on modules and save/export work appropriately (export data vs save a jamovi file that includes analyses).'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-3',
    module: 3,
    objectiveType: 'hybrid',
    objectiveId: 'M3-O4',
    objective: 'Describe how jamovi represents data (rows as cases, columns as variables) and set an appropriate variable level/type (ID, nominal, ordinal, continuous; text/integer/decimal) based on the data and intended analysis.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-3',
    module: 3,
    objectiveType: 'hybrid',
    objectiveId: 'M3-O5',
    objective: 'Create computed variables in jamovi (e.g., transformations, z-scores, sum-scores, means) and state an appropriate use-case for each in preparing data for analysis.'
  },

  // Module 4: Descriptive Statistics
  {
    classId: 'statistics',
    moduleId: 'stats-module-4',
    module: 4,
    objectiveType: 'content',
    objectiveId: 'M4-O1',
    objective: 'Calculate and interpret mean, median, and mode, and choose a measure of central tendency that fits the scale and shape of the data (including outliers).'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-4',
    module: 4,
    objectiveType: 'content',
    objectiveId: 'M4-O2',
    objective: 'Calculate and interpret measures of variability (deviation scores, variance, standard deviation, restriction of range) and explain why SD is usually reported instead of variance.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-4',
    module: 4,
    objectiveType: 'content',
    objectiveId: 'M4-O3',
    objective: 'Describe skewness and other distribution shapes, and explain when mean and SD can mislead (e.g., skew, bimodality).'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-4',
    module: 4,
    objectiveType: 'content',
    objectiveId: 'M4-O4',
    objective: 'Compute and interpret z-scores as standardized distances from the mean.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-4',
    module: 4,
    objectiveType: 'software',
    objectiveId: 'M4-S1',
    objective: 'Run descriptives in jamovi and use Compute to create deviation, squared-deviation, or z-score variables.'
  },

  // Module 5: Graphing and Visualization
  {
    classId: 'statistics',
    moduleId: 'stats-module-5',
    module: 5,
    objectiveType: 'content',
    objectiveId: 'M5-O1',
    objective: 'Choose and interpret graphs for one or two variables (histogram, bar chart, boxplot, scatterplot), including shape, skew, and IQR.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-5',
    module: 5,
    objectiveType: 'content',
    objectiveId: 'M5-O2',
    objective: 'Identify misleading visualization choices (truncated axes, bin width, mean±SE vs raw data) and pick a better display.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-5',
    module: 5,
    objectiveType: 'content',
    objectiveId: 'M5-O3',
    objective: 'Distinguish frequency tables from contingency tables and say what each is for.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-5',
    module: 5,
    objectiveType: 'hybrid',
    objectiveId: 'M5-O4',
    objective: 'Use jamovi logical expressions, Compute/Transform, mathematical functions, and filters to recode, subset, and prepare data.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-5',
    module: 5,
    objectiveType: 'software',
    objectiveId: 'M5-S1',
    objective: 'Create histograms, apply filters, and transform or recode variables in jamovi.'
  },

  // Module 6: Probability and Sampling
  {
    classId: 'statistics',
    moduleId: 'stats-module-6',
    module: 6,
    objectiveType: 'content',
    objectiveId: 'M6-O1',
    objective: 'Use the normal distribution and z-scores (e.g., the 68% rule) to describe where scores fall.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-6',
    module: 6,
    objectiveType: 'content',
    objectiveId: 'M6-O2',
    objective: 'Apply basic probability ideas (range, long-run frequency, independence vs mutual exclusivity, binomial, frequentist vs Bayesian).'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-6',
    module: 6,
    objectiveType: 'content',
    objectiveId: 'M6-O3',
    objective: 'Explain sampling error, sampling distributions, standard error vs SD, the law of large numbers, and the central limit theorem.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-6',
    module: 6,
    objectiveType: 'content',
    objectiveId: 'M6-O4',
    objective: 'Interpret confidence intervals and choose among z, t, χ², and F as the situation requires.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-6',
    module: 6,
    objectiveType: 'software',
    objectiveId: 'M6-S1',
    objective: 'Compute and interpret normal-distribution probabilities in jamovi.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-6',
    module: 6,
    objectiveType: 'software',
    objectiveId: 'M6-S2',
    objective: 'Compute and interpret confidence intervals in jamovi.'
  },

  // Module 7: Hypothesis Testing
  {
    classId: 'statistics',
    moduleId: 'stats-module-7',
    module: 7,
    objectiveType: 'content',
    objectiveId: 'M7-O1',
    objective: 'State null and alternative hypotheses and choose one- vs two-sided tests with appropriate critical regions.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-7',
    module: 7,
    objectiveType: 'content',
    objectiveId: 'M7-O2',
    objective: 'Define Type I and Type II errors, alpha, and statistical power, and explain how changing alpha or n affects them.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-7',
    module: 7,
    objectiveType: 'content',
    objectiveId: 'M7-O3',
    objective: 'Interpret p-values and “statistical significance” correctly, including what a p-value is not.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-7',
    module: 7,
    objectiveType: 'content',
    objectiveId: 'M7-O4',
    objective: 'Interpret effect sizes (e.g., Cohen\'s d) and report a hypothesis test with the needed pieces.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-7',
    module: 7,
    objectiveType: 'software',
    objectiveId: 'M7-S1',
    objective: 'Run and interpret a binomial test in jamovi.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-7',
    module: 7,
    objectiveType: 'software',
    objectiveId: 'M7-S2',
    objective: 'Run and interpret a one-sample t-test in jamovi.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-7',
    module: 7,
    objectiveType: 'software',
    objectiveId: 'M7-S3',
    objective: 'Read jamovi hypothesis-test output and interpret the p-value in context.'
  },

  // Module 8: Analysis Methods
  {
    classId: 'statistics',
    moduleId: 'stats-module-8',
    module: 8,
    objectiveType: 'content',
    objectiveId: 'M8-O1',
    objective: 'Choose and interpret independent vs paired t-tests, state their assumptions, and use Levene\'s test when relevant.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-8',
    module: 8,
    objectiveType: 'content',
    objectiveId: 'M8-O2',
    objective: 'Interpret Pearson r, r², and the sign of a correlation, and explain why correlation does not imply causation.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-8',
    module: 8,
    objectiveType: 'content',
    objectiveId: 'M8-O3',
    objective: 'Match a research question to an appropriate test family (t-tests, chi-square, ANOVA, regression).'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-8',
    module: 8,
    objectiveType: 'content',
    objectiveId: 'M8-O4',
    objective: 'Interpret regression slopes, ANOVA, interactions, and the difference between statistical significance and effect size.'
  },
  {
    classId: 'statistics',
    moduleId: 'stats-module-8',
    module: 8,
    objectiveType: 'software',
    objectiveId: 'M8-S1',
    objective: 'Run and interpret t-tests, chi-square, correlation, regression, or ANOVA in jamovi.'
  },

  // Research Methods Ch 1
  {
    classId: 'research-methods',
    moduleId: 'rm-module-1',
    module: 1,
    objectiveType: 'content',
    objectiveId: 'RM1-O1',
    objective: 'Distinguish scientific, empirical, and falsifiable claims from common sense and pseudoscience.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-1',
    module: 1,
    objectiveType: 'content',
    objectiveId: 'RM1-O2',
    objective: 'Define theory and hypothesis and explain how theories are revised with evidence.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-1',
    module: 1,
    objectiveType: 'content',
    objectiveId: 'RM1-O3',
    objective: 'Identify confirmation bias and other practices that reduce biased reasoning.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-1',
    module: 1,
    objectiveType: 'content',
    objectiveId: 'RM1-O4',
    objective: 'Explain operationalization and the third-variable problem when interpreting associations.'
  },

  // RM Ch 2
  {
    classId: 'research-methods',
    moduleId: 'rm-module-2',
    module: 2,
    objectiveType: 'content',
    objectiveId: 'RM2-O1',
    objective: 'Outline the research process from topic to literature gap and rationale.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-2',
    module: 2,
    objectiveType: 'content',
    objectiveId: 'RM2-O2',
    objective: 'Use peer-reviewed literature (including Discussion sections and reference lists) to develop a project.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-2',
    module: 2,
    objectiveType: 'content',
    objectiveId: 'RM2-O3',
    objective: 'Align a proposal (question, design, measures, feasibility) and distinguish exploratory vs confirmatory work, including preregistration and secondary analysis.'
  },

  // RM Ch 3 Ethics
  {
    classId: 'research-methods',
    moduleId: 'rm-module-3',
    module: 3,
    objectiveType: 'content',
    objectiveId: 'RM3-O1',
    objective: 'Apply Belmont principles (respect, beneficence, justice) and IRB review to human-subjects research.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-3',
    module: 3,
    objectiveType: 'content',
    objectiveId: 'RM3-O2',
    objective: 'Explain informed consent, deception, debriefing, and extra protections for vulnerable populations.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-3',
    module: 3,
    objectiveType: 'content',
    objectiveId: 'RM3-O3',
    objective: 'Describe confidentiality, ethical data handling, and how to reduce coercion in recruitment.'
  },

  // RM Ch 4 Measurement
  {
    classId: 'research-methods',
    moduleId: 'rm-module-4',
    module: 4,
    objectiveType: 'content',
    objectiveId: 'RM4-O1',
    objective: 'Define reliability and validity and explain how a measure can be reliable but not valid.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-4',
    module: 4,
    objectiveType: 'content',
    objectiveId: 'RM4-O2',
    objective: 'Classify scales of measurement (nominal, ordinal, interval, ratio) and how Likert-type items are often treated.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-4',
    module: 4,
    objectiveType: 'content',
    objectiveId: 'RM4-O3',
    objective: 'Identify forms of reliability and validity (test–retest, internal consistency, face, criterion, construct) and threats to construct validity.'
  },

  // RM Ch 5 Experimental
  {
    classId: 'research-methods',
    moduleId: 'rm-module-5',
    module: 5,
    objectiveType: 'content',
    objectiveId: 'RM5-O1',
    objective: 'Identify IVs and DVs and distinguish random assignment from random sampling.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-5',
    module: 5,
    objectiveType: 'content',
    objectiveId: 'RM5-O2',
    objective: 'Define internal and external validity, confounds, and common threats to internal validity.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-5',
    module: 5,
    objectiveType: 'content',
    objectiveId: 'RM5-O3',
    objective: 'Compare between- vs within-subjects designs and controls (placebo, demand characteristics, carryover/counterbalancing).'
  },

  // RM Ch 6 Non-experimental
  {
    classId: 'research-methods',
    moduleId: 'rm-module-6',
    module: 6,
    objectiveType: 'content',
    objectiveId: 'RM6-O1',
    objective: 'Interpret correlations without inferring causation (directionality and third variables).'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-6',
    module: 6,
    objectiveType: 'content',
    objectiveId: 'RM6-O2',
    objective: 'Describe non-experimental methods (naturalistic and participant observation, qualitative, case study, archival, ethnography, content analysis).'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-6',
    module: 6,
    objectiveType: 'content',
    objectiveId: 'RM6-O3',
    objective: 'Explain cross-sectional designs and when non-experimental work can still have strong external validity.'
  },

  // RM Ch 7 Survey
  {
    classId: 'research-methods',
    moduleId: 'rm-module-7',
    module: 7,
    objectiveType: 'content',
    objectiveId: 'RM7-O1',
    objective: 'Define sampling frame, probability sampling, coverage error, and nonresponse bias.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-7',
    module: 7,
    objectiveType: 'content',
    objectiveId: 'RM7-O2',
    objective: 'Write and evaluate survey items (double-barreled, open-ended, Likert, branching, order effects).'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-7',
    module: 7,
    objectiveType: 'content',
    objectiveId: 'RM7-O3',
    objective: 'Identify response biases such as social desirability and practices that improve survey measurement quality.'
  },

  // RM Ch 8 Quasi
  {
    classId: 'research-methods',
    moduleId: 'rm-module-8',
    module: 8,
    objectiveType: 'content',
    objectiveId: 'RM8-O1',
    objective: 'Explain why quasi-experiments lack random assignment and compare one-group vs nonequivalent-control designs.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-8',
    module: 8,
    objectiveType: 'content',
    objectiveId: 'RM8-O2',
    objective: 'Describe interrupted time-series, regression discontinuity, difference-in-differences, and propensity-score logic at a conceptual level.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-8',
    module: 8,
    objectiveType: 'content',
    objectiveId: 'RM8-O3',
    objective: 'Identify quasi-experimental threats (including pretest sensitization) and use appropriately cautious causal language.'
  },

  // RM Ch 9 Factorial
  {
    classId: 'research-methods',
    moduleId: 'rm-module-9',
    module: 9,
    objectiveType: 'content',
    objectiveId: 'RM9-O1',
    objective: 'Count factorial conditions and define main effects versus interactions.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-9',
    module: 9,
    objectiveType: 'content',
    objectiveId: 'RM9-O2',
    objective: 'Interpret cell means, simple effects, and disordinal (crossover) interactions.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-9',
    module: 9,
    objectiveType: 'content',
    objectiveId: 'RM9-O3',
    objective: 'Explain why researchers include multiple factors and how random assignment and interaction plots support interpretation.'
  },

  // RM Ch 10 Single-subject
  {
    classId: 'research-methods',
    moduleId: 'rm-module-10',
    module: 10,
    objectiveType: 'content',
    objectiveId: 'RM10-O1',
    objective: 'Describe single-subject designs (stable baseline, ABA/reversal, multiple baseline, changing-criterion) and their limitations.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-10',
    module: 10,
    objectiveType: 'content',
    objectiveId: 'RM10-O2',
    objective: 'Use visual analysis (level, trend, variability, overlap) and treatment integrity to evaluate single-subject evidence.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-10',
    module: 10,
    objectiveType: 'content',
    objectiveId: 'RM10-O3',
    objective: 'State when single-subject designs are especially useful and how replication strengthens external validity.'
  },

  // RM Ch 11 Presenting
  {
    classId: 'research-methods',
    moduleId: 'rm-module-11',
    module: 11,
    objectiveType: 'content',
    objectiveId: 'RM11-O1',
    objective: 'Apply APA student-paper conventions for title page, paraphrase/citation, methods, tables, and figures.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-11',
    module: 11,
    objectiveType: 'content',
    objectiveId: 'RM11-O2',
    objective: 'Write a discussion that connects results to hypotheses and literature, reports effect sizes, notes limitations, and uses open-science practices.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-11',
    module: 11,
    objectiveType: 'content',
    objectiveId: 'RM11-O3',
    objective: 'Plan posters and talks and include stable identifiers (DOI/URL) in references.'
  },

  // RM Ch 12 Descriptive stats
  {
    classId: 'research-methods',
    moduleId: 'rm-module-12',
    module: 12,
    objectiveType: 'content',
    objectiveId: 'RM12-O1',
    objective: 'Interpret mean, median, and modality (including bimodality and outlier sensitivity).'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-12',
    module: 12,
    objectiveType: 'content',
    objectiveId: 'RM12-O2',
    objective: 'Interpret variability (range, IQR, SD) and z-scores as standardized scores.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-12',
    module: 12,
    objectiveType: 'content',
    objectiveId: 'RM12-O3',
    objective: 'Choose graphs for categorical vs quantitative data and describe skew without connecting unrelated categories with a line.'
  },

  // RM Ch 13 Inferential
  {
    classId: 'research-methods',
    moduleId: 'rm-module-13',
    module: 13,
    objectiveType: 'content',
    objectiveId: 'RM13-O1',
    objective: 'State the null hypothesis, Type I error, and what a p-value does and does not mean.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-13',
    module: 13,
    objectiveType: 'content',
    objectiveId: 'RM13-O2',
    objective: 'Interpret power, confidence intervals, one-tailed tests, and “fail to reject” vs proving the null.'
  },
  {
    classId: 'research-methods',
    moduleId: 'rm-module-13',
    module: 13,
    objectiveType: 'content',
    objectiveId: 'RM13-O3',
    objective: 'Explain replication, familywise error, practical vs statistical significance, and frequentist vs Bayesian uncertainty.'
  }
]

/** Lesson id → software/hybrid objective IDs updated from Self-Check and You-Do (not We-Do). */
export const softwareLessonObjectiveMap = {
  'jamovi-module-3-unified': ['M3-O1', 'M3-O2', 'M3-O4'],
  'jamovi-descriptive-stats': ['M4-S1'],
  'jamovi-module-4': ['M4-S1'],
  'jamovi-module-5-unified': ['M5-S1'],
  'jamovi-normal-distribution': ['M6-S1'],
  'jamovi-confidence-intervals': ['M6-S2'],
  'jamovi-binomial-test': ['M7-S1'],
  'jamovi-one-sample-t-test': ['M7-S2'],
  'jamovi-interpreting-pvalues': ['M7-S3'],
  'jamovi-module-8-unified': ['M8-S1']
}

export function getSoftwareObjectivesForLesson(lesson) {
  if (!lesson) return []
  const mapped = softwareLessonObjectiveMap[lesson.id]
  if (mapped?.length) return mapped
  return objectives
    .filter(obj => obj.moduleId === lesson.module && (obj.objectiveType === 'software' || obj.objectiveType === 'hybrid'))
    .map(obj => obj.objectiveId)
}

/**
 * @param {number|string|{id?: string, classId?: string}|null} moduleOrNumber
 * @param {string} [classId]
 */
export function getObjectivesByModule(moduleOrNumber, classId) {
  if (moduleOrNumber == null) return []
  if (typeof moduleOrNumber === 'object') {
    if (moduleOrNumber.id) {
      return objectives.filter(obj => obj.moduleId === moduleOrNumber.id)
    }
    return getObjectivesByModule(moduleOrNumber.number, moduleOrNumber.classId || classId)
  }
  if (typeof moduleOrNumber === 'string' && /module-/.test(moduleOrNumber)) {
    return objectives.filter(obj => obj.moduleId === moduleOrNumber)
  }
  const n = Number(moduleOrNumber)
  if (!Number.isFinite(n)) return []
  const cid = classId || 'statistics'
  return objectives.filter(obj => obj.module === n && obj.classId === cid)
}

export function getObjectiveById(objectiveId) {
  return objectives.find(obj => obj.objectiveId === objectiveId)
}

export function getObjectivesByType(objectiveType) {
  return objectives.filter(obj => obj.objectiveType === objectiveType)
}

// Map module ID strings (e.g., 'stats-module-1') to module numbers
export function getModuleNumber(moduleId) {
  if (!moduleId) return null
  const match = String(moduleId).match(/module-(\d+)/)
  return match ? parseInt(match[1], 10) : null
}
