// Maps assessment questions to learning objectives
// This allows BKT to update mastery probabilities based on question performance

/**
 * Question-to-Objective Mapping
 *
 * Each entry maps a question ID to one or more objective IDs
 * Multiple questions can map to the same objective
 * One question can assess multiple objectives
 */

export const questionObjectiveMap = {
  // ============================================================
  // Module 1: Why Learn Statistics
  // ============================================================
  // M1-O1: Why scientists use statistics as safeguard against biased reasoning
  'stats-m1-q1': ['M1-O1'],   // Purpose of statistics in psychology
  'stats-m1-q2': ['M1-O1'],   // Goals of science (describe, predict, explain, control)
  'stats-m1-q3': ['M1-O1'],   // Descriptive vs inferential statistics
  'stats-m1-q4': ['M1-O1'],   // Goals of science application (control)
  'stats-m1-q5': ['M1-O1'],   // When to use descriptive statistics
  'stats-m1-q6': ['M1-O1'],   // Research vs statistical hypothesis
  'stats-m1-q7': ['M1-O1'],   // Why learn statistics (reading research)
  'stats-m1-q8': ['M1-O1'],   // Population vs sample
  'stats-m1-q9': ['M1-O1'],   // Correlation vs causation (reverse causation, third variable)
  'stats-m1-q10': ['M1-O1'],  // Summarize vs infer from data
  'stats-m1-q11': ['M1-O1'],  // Statistical questions
  'stats-m1-q12': ['M1-O1'],  // Misleading graphs
  'stats-m1-q13': ['M1-O1'],  // Statistical significance vs practical importance
  'stats-m1-q14': ['M1-O1'],  // Practical vs statistical significance
  'stats-m1-q15': ['M1-O1'],  // Replication and reliability

  // Note: M1-O2 (belief bias), M1-O3 (deductive validity), M1-O4 (Simpson's paradox)
  // do not have specific questions yet - to be added in future modules

  // ============================================================
  // Module 2: Research Design & Measurement
  // ============================================================
  // M2-O1: Psychological measurement (theoretical construct vs observed value)
  // M2-O2: Operationalisation (construct, measure, operationalisation, variable)
  // M2-O3: Classify variables (nominal/ordinal/interval/ratio, continuous/discrete)
  // M2-O4: Reliability and validity

  'stats-m2-q1': ['M2-O2'],      // IV vs DV (variables)
  'stats-m2-q2': ['M2-O3'],      // Scales of measurement (NOIR matching)
  'stats-m2-q3': ['M2-O2'],      // Experimental design for causation
  'stats-m2-q4': ['M2-O3'],      // Rating scale measurement level
  'stats-m2-q5': ['M2-O4'],      // Internal vs external validity
  'stats-m2-q6': ['M2-O2'],      // Operational definition
  'stats-m2-q7': ['M2-O4'],      // Threats to internal validity
  'stats-m2-q8': ['M2-O3'],      // Classify variables (categorical vs quantitative)
  'stats-m2-q9': ['M2-O2'],      // IV and DV identification
  'stats-m2-q10': ['M2-O2'],     // Experimental vs observational design
  'stats-m2-q11': ['M2-O4'],     // Confounds and validity
  'stats-m2-q12': ['M2-O2'],     // Between vs within-subjects design
  'stats-m2-q13': ['M2-O4'],     // Measurement reliability
  'stats-m2-q14': ['M2-O3'],     // Numeric variables as categorical
  'stats-m2-q15': ['M2-O4'],     // Internal vs construct validity threats
  'stats-m2-q16': ['M2-O2'],     // Random assignment vs random sampling
  'stats-m2-q17': ['M2-O2', 'M2-O4'],  // Operational definition with reliability/validity

  // ============================================================
  // Module 3: Software Basics (Jamovi)
  // ============================================================
  // M3-O1: jamovi interface and basic workflow
  // M3-O2: Import data files, verify settings
  // M3-O3: Install add-ons, save/export work
  // M3-O4: Data structure (rows=cases, columns=variables) and variable types
  // M3-O5: Create computed variables

  'stats-m3-q1': ['M3-O4'],      // Rows represent cases
  'stats-m3-q2': ['M3-O4'],      // Variable types (Nominal for categorical)
  'stats-m3-q3': ['M3-O4'],      // Missing data effects
  'stats-m3-q4': ['M3-O2', 'M3-O4'],  // Data preparation workflow
  'stats-m3-q5': ['M3-O2', 'M3-O3'],  // .omv file format
  'stats-m3-q6': ['M3-O4'],      // Measurement level importance
  'stats-m3-q7': ['M3-O4'],      // Missing value codes
  'stats-m3-q8': ['M3-O1'],      // Data file vs analysis output
  'stats-m3-q9': ['M3-O4'],      // Outlier screening
  'stats-m3-q10': ['M3-O4'],     // Text vs numeric variables
  'stats-m3-q11': ['M3-O5'],     // Recoding variables
  'stats-m3-q12': ['M3-O4'],     // Wide vs long data formats
  'stats-m3-q13': ['M3-O4'],     // Reproducible cleaning documentation
  'stats-m3-q14': ['M3-O4'],     // Merging datasets by ID
  'stats-m3-q15': ['M3-O4']      // Documenting data handling decisions
}

/**
 * Get objectives assessed by a question
 */
export function getObjectivesForQuestion(questionId) {
  return questionObjectiveMap[questionId] || []
}

/**
 * Get all questions that assess a given objective
 */
export function getQuestionsForObjective(objectiveId) {
  return Object.entries(questionObjectiveMap)
    .filter(([_, objectives]) => objectives.includes(objectiveId))
    .map(([questionId]) => questionId)
}

/**
 * Check if a question maps to any objectives
 */
export function hasObjectiveMapping(questionId) {
  return questionId in questionObjectiveMap
}

/**
 * Add a new question-objective mapping (for dynamic additions)
 */
export function addQuestionObjectiveMapping(questionId, objectiveIds) {
  if (!Array.isArray(objectiveIds)) {
    objectiveIds = [objectiveIds]
  }
  questionObjectiveMap[questionId] = objectiveIds
}
