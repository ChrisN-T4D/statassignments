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
  'stats-m1-q1': ['M1-O1'],
  'stats-m1-q2': ['M1-O1'],
  'stats-m1-q3': ['M1-O2'],
  'stats-m1-q4': ['M1-O2'],
  'stats-m1-q5': ['M1-O2'],
  'stats-m1-q6': ['M1-O2'],
  'stats-m1-q7': ['M1-O1'],
  'stats-m1-q8': ['M1-O4'],
  'stats-m1-q9': ['M1-O4'],
  'stats-m1-q10': ['M1-O4'],
  'stats-m1-q11': ['M1-O1'],
  'stats-m1-q12': ['M1-O1'],
  'stats-m1-q13': ['M1-O1'],
  'stats-m1-q14': ['M1-O1'],
  'stats-m1-q15': ['M1-O1'],
  'stats-m1-q16': ['M1-O2'],
  'stats-m1-q17': ['M1-O2'],
  'stats-m1-q18': ['M1-O3'],
  'stats-m1-q19': ['M1-O3'],
  'stats-m1-q20': ['M1-O4'],
  'stats-m1-q21': ['M1-O4'],

  // ============================================================
  // Module 2: Research Design & Measurement
  // ============================================================
  'stats-m2-q1': ['M2-O2'],
  'stats-m2-q2': ['M2-O3'],
  'stats-m2-q3': ['M2-O2'],
  'stats-m2-q4': ['M2-O3'],
  'stats-m2-q5': ['M2-O4'],
  'stats-m2-q6': ['M2-O2'],
  'stats-m2-q7': ['M2-O4'],
  'stats-m2-q8': ['M2-O3'],
  'stats-m2-q9': ['M2-O2'],
  'stats-m2-q10': ['M2-O2'],
  'stats-m2-q11': ['M2-O4'],
  'stats-m2-q12': ['M2-O2'],
  'stats-m2-q13': ['M2-O4'],
  'stats-m2-q14': ['M2-O3'],
  'stats-m2-q15': ['M2-O4'],
  'stats-m2-q16': ['M2-O2'],
  'stats-m2-q17': ['M2-O2', 'M2-O4'],
  'stats-m2-q18': ['M2-O1'],
  'stats-m2-q19': ['M2-O1'],

  // ============================================================
  // Module 3: Software Basics (Jamovi)
  // ============================================================
  'stats-m3-q1': ['M3-O4'],
  'stats-m3-q2': ['M3-O4'],
  'stats-m3-q3': ['M3-O4'],
  'stats-m3-q4': ['M3-O2'],
  'stats-m3-q5': ['M3-O2', 'M3-O3'],
  'stats-m3-q6': ['M3-O4'],
  'stats-m3-q7': ['M3-O4', 'M3-O5'],
  'stats-m3-q8': ['M3-O4'],
  'stats-m3-q9': ['M3-O4'],
  'stats-m3-q10': ['M3-O4'],
  'stats-m3-q11': ['M3-O5'],
  'stats-m3-q12': ['M3-O4'],
  'stats-m3-q13': ['M3-O2'],
  'stats-m3-q14': ['M3-O3'],
  'stats-m3-q15': ['M3-O1'],

  // ============================================================
  // Module 4: Descriptive Statistics
  // ============================================================
  'stats-m4-q1': ['M4-O1'],
  'stats-m4-q2': ['M4-O1', 'M4-O3'],
  'stats-m4-q3': ['M4-O1', 'M4-O2'],
  'stats-m4-q4': ['M4-O2'],
  'stats-m4-q5': ['M4-O4'],
  'stats-m4-q6': ['M4-O2'],
  'stats-m4-q7': ['M4-O1'],
  'stats-m4-q8': ['M4-O4'],
  'stats-m4-q9': ['M4-O1'],
  'stats-m4-q10': ['M4-O2'],
  'stats-m4-q11': ['M4-O3'],
  'stats-m4-q12': ['M4-O1'],
  'stats-m4-q13': ['M4-O2'],
  'stats-m4-q14': ['M4-O1', 'M4-O2'],
  'stats-m4-q15': ['M4-O4'],
  'stats-m4-q16': ['M4-O3'],
  'stats-m4-q17': ['M4-O2'],
  'stats-m4-q18': ['M4-O1', 'M4-O3'],

  // ============================================================
  // Module 5: Graphing and Visualization
  // ============================================================
  'stats-m5-q1': ['M5-O1'],
  'stats-m5-q2': ['M5-O1'],
  'stats-m5-q3': ['M5-O1'],
  'stats-m5-q4': ['M5-O1'],
  'stats-m5-q5': ['M5-O1'],
  'stats-m5-q6': ['M5-O1'],
  'stats-m5-q7': ['M5-O1'],
  'stats-m5-q8': ['M5-O1'],
  'stats-m5-q9': ['M5-O1'],
  'stats-m5-q10': ['M5-O1'],
  'stats-m5-q11': ['M5-O1'],
  'stats-m5-q12': ['M5-O2'],
  'stats-m5-q13': ['M5-O2'],
  'stats-m5-q14': ['M5-O2'],
  'stats-m5-q15': ['M5-O1'],
  'stats-m5-q16': ['M5-O2'],
  'stats-m5-q17': ['M5-O3'],
  'stats-m5-q18': ['M5-O3'],
  'stats-m5-q19': ['M5-O4'],
  'stats-m5-q20': ['M5-O4'],
  'stats-m5-q21': ['M5-O4'],
  'stats-m5-q22': ['M5-O4'],
  'stats-m5-q23': ['M5-O4'],
  'stats-m5-q24': ['M5-O4'],
  'stats-m5-q25': ['M5-O4'],
  'stats-m5-q26': ['M5-O4'],
  'stats-m5-q27': ['M5-O4'],
  'stats-m5-q28': ['M5-O4'],
  'stats-m5-q29': ['M5-O4'],
  'stats-m5-q30': ['M5-O4'],

  // ============================================================
  // Module 6: Probability and Sampling
  // ============================================================
  'stats-m6-q1': ['M6-O1'],
  'stats-m6-q2': ['M6-O3'],
  'stats-m6-q3': ['M6-O3'],
  'stats-m6-q4': ['M6-O1'],
  'stats-m6-q5': ['M6-O3'],
  'stats-m6-q6': ['M6-O1'],
  'stats-m6-q7': ['M6-O2'],
  'stats-m6-q8': ['M6-O2'],
  'stats-m6-q9': ['M6-O2'],
  'stats-m6-q10': ['M6-O3'],
  'stats-m6-q11': ['M6-O3'],
  'stats-m6-q12': ['M6-O4'],
  'stats-m6-q13': ['M6-O3'],
  'stats-m6-q14': ['M6-O3'],
  'stats-m6-q15': ['M6-O3', 'M6-O4'],
  'stats-m6-q16': ['M6-O3'],
  'stats-m6-q17': ['M6-O3'],
  'stats-m6-q18': ['M6-O2'],
  'stats-m6-q19': ['M6-O3'],
  'stats-m6-q20': ['M6-O4'],
  'stats-m6-q21': ['M6-O4'],
  'stats-m6-q22': ['M6-O2'],
  'stats-m6-q23': ['M6-O3'],
  'stats-m6-q24': ['M6-O4'],

  // ============================================================
  // Module 7: Hypothesis Testing
  // ============================================================
  'stats-m7-q1': ['M7-O1'],
  'stats-m7-q2': ['M7-O2'],
  'stats-m7-q3': ['M7-O3'],
  'stats-m7-q4': ['M7-O3'],
  'stats-m7-q5': ['M7-O2', 'M7-O4'],
  'stats-m7-q6': ['M7-O4'],
  'stats-m7-q7': ['M7-O1'],
  'stats-m7-q8': ['M7-O2'],
  'stats-m7-q9': ['M7-O1'],
  'stats-m7-q10': ['M7-O2'],
  'stats-m7-q11': ['M7-O3'],
  'stats-m7-q12': ['M7-O3'],
  'stats-m7-q13': ['M7-O3'],
  'stats-m7-q14': ['M7-O1', 'M7-O3'],
  'stats-m7-q15': ['M7-O1'],
  'stats-m7-q16': ['M7-O2'],
  'stats-m7-q17': ['M7-O1'],
  'stats-m7-q18': ['M7-O4'],

  // ============================================================
  // Module 8: Analysis Methods
  // ============================================================
  'stats-m8-q1': ['M8-O1'],
  'stats-m8-q2': ['M8-O1'],
  'stats-m8-q3': ['M8-O2'],
  'stats-m8-q4': ['M8-O2'],
  'stats-m8-q5': ['M8-O1'],
  'stats-m8-q6': ['M8-O2'],
  'stats-m8-q7': ['M8-O1'],
  'stats-m8-q8': ['M8-O4'],
  'stats-m8-q9': ['M8-O3'],
  'stats-m8-q10': ['M8-O3'],
  'stats-m8-q11': ['M8-O2'],
  'stats-m8-q12': ['M8-O2'],
  'stats-m8-q13': ['M8-O4'],
  'stats-m8-q14': ['M8-O4'],
  'stats-m8-q15': ['M8-O3', 'M8-O4'],
  'stats-m8-q16': ['M8-O4'],
  'stats-m8-q17': ['M8-O4'],
  'stats-m8-q18': ['M8-O1'],
  'stats-m8-q19': ['M8-O1', 'M8-O3'],

  // ============================================================
  // Research Methods
  // ============================================================
  'rm-m1-q1': ['RM1-O1'],
  'rm-m1-q2': ['RM1-O1'],
  'rm-m1-q3': ['RM1-O1'],
  'rm-m1-q4': ['RM1-O3'],
  'rm-m1-q5': ['RM1-O3'],
  'rm-m1-q6': ['RM1-O1'],
  'rm-m1-q7': ['RM1-O1'],
  'rm-m1-q8': ['RM1-O4'],
  'rm-m1-q9': ['RM1-O1'],
  'rm-m1-q10': ['RM1-O1'],
  'rm-m1-q11': ['RM1-O1'],
  'rm-m1-q12': ['RM1-O4'],

  'rm-m2-q1': ['RM2-O1'],
  'rm-m2-q2': ['RM2-O2'],
  'rm-m2-q3': ['RM2-O2'],
  'rm-m2-q4': ['RM2-O2'],
  'rm-m2-q5': ['RM2-O2'],
  'rm-m2-q6': ['RM2-O3'],
  'rm-m2-q7': ['RM2-O2'],
  'rm-m2-q8': ['RM2-O1'],
  'rm-m2-q9': ['RM2-O1'],
  'rm-m2-q10': ['RM2-O1'],
  'rm-m2-q11': ['RM2-O2'],
  'rm-m2-q12': ['RM2-O1'],

  'rm-m3-q1': ['RM3-O1'],
  'rm-m3-q2': ['RM3-O2'],
  'rm-m3-q3': ['RM3-O2'],
  'rm-m3-q4': ['RM3-O1'],
  'rm-m3-q5': ['RM3-O3'],
  'rm-m3-q6': ['RM3-O1'],
  'rm-m3-q7': ['RM3-O2'],
  'rm-m3-q8': ['RM3-O2'],
  'rm-m3-q9': ['RM3-O1'],
  'rm-m3-q10': ['RM3-O3'],
  'rm-m3-q11': ['RM3-O3'],
  'rm-m3-q12': ['RM3-O1'],

  'rm-m4-q1': ['RM4-O1'],
  'rm-m4-q2': ['RM4-O1'],
  'rm-m4-q3': ['RM4-O1'],
  'rm-m4-q4': ['RM4-O2'],
  'rm-m4-q5': ['RM4-O3'],
  'rm-m4-q6': ['RM4-O3'],
  'rm-m4-q7': ['RM4-O2'],
  'rm-m4-q8': ['RM4-O3'],
  'rm-m4-q9': ['RM4-O3'],
  'rm-m4-q10': ['RM4-O3'],
  'rm-m4-q11': ['RM4-O3'],
  'rm-m4-q12': ['RM4-O2'],

  'rm-m5-q1': ['RM5-O1'],
  'rm-m5-q2': ['RM5-O1'],
  'rm-m5-q3': ['RM5-O2'],
  'rm-m5-q4': ['RM5-O2'],
  'rm-m5-q5': ['RM5-O2'],
  'rm-m5-q6': ['RM5-O3'],
  'rm-m5-q7': ['RM5-O2'],
  'rm-m5-q8': ['RM5-O3'],
  'rm-m5-q9': ['RM5-O3'],
  'rm-m5-q10': ['RM5-O3'],
  'rm-m5-q11': ['RM5-O1'],
  'rm-m5-q12': ['RM5-O3'],
  'rm-m5-q13': ['RM5-O1'],
  'rm-m5-q14': ['RM5-O1'],
  'rm-m5-q15': ['RM5-O1'],

  'rm-m6-q1': ['RM6-O1'],
  'rm-m6-q2': ['RM6-O1'],
  'rm-m6-q3': ['RM6-O2'],
  'rm-m6-q4': ['RM6-O2'],
  'rm-m6-q5': ['RM6-O2'],
  'rm-m6-q6': ['RM6-O2'],
  'rm-m6-q7': ['RM6-O2'],
  'rm-m6-q8': ['RM6-O1'],
  'rm-m6-q9': ['RM6-O2'],
  'rm-m6-q10': ['RM6-O3'],
  'rm-m6-q11': ['RM6-O2'],
  'rm-m6-q12': ['RM6-O3'],

  'rm-m7-q1': ['RM7-O1'],
  'rm-m7-q2': ['RM7-O2'],
  'rm-m7-q3': ['RM7-O3'],
  'rm-m7-q4': ['RM7-O3'],
  'rm-m7-q5': ['RM7-O1'],
  'rm-m7-q6': ['RM7-O2'],
  'rm-m7-q7': ['RM7-O2'],
  'rm-m7-q8': ['RM7-O1'],
  'rm-m7-q9': ['RM7-O2'],
  'rm-m7-q10': ['RM7-O1'],
  'rm-m7-q11': ['RM7-O2'],
  'rm-m7-q12': ['RM7-O2'],

  'rm-m8-q1': ['RM8-O1'],
  'rm-m8-q2': ['RM8-O1'],
  'rm-m8-q3': ['RM8-O2'],
  'rm-m8-q4': ['RM8-O3'],
  'rm-m8-q5': ['RM8-O1'],
  'rm-m8-q6': ['RM8-O1'],
  'rm-m8-q7': ['RM8-O1'],
  'rm-m8-q8': ['RM8-O2'],
  'rm-m8-q9': ['RM8-O3'],
  'rm-m8-q10': ['RM8-O1'],
  'rm-m8-q11': ['RM8-O3'],
  'rm-m8-q12': ['RM8-O3'],

  'rm-m9-q1': ['RM9-O1'],
  'rm-m9-q2': ['RM9-O1'],
  'rm-m9-q3': ['RM9-O1'],
  'rm-m9-q4': ['RM9-O3'],
  'rm-m9-q5': ['RM9-O2'],
  'rm-m9-q6': ['RM9-O2'],
  'rm-m9-q7': ['RM9-O3'],
  'rm-m9-q8': ['RM9-O3'],
  'rm-m9-q9': ['RM9-O3'],
  'rm-m9-q10': ['RM9-O2'],
  'rm-m9-q11': ['RM9-O3'],
  'rm-m9-q12': ['RM9-O2'],

  'rm-m10-q1': ['RM10-O1'],
  'rm-m10-q2': ['RM10-O1'],
  'rm-m10-q3': ['RM10-O1'],
  'rm-m10-q4': ['RM10-O1'],
  'rm-m10-q5': ['RM10-O1'],
  'rm-m10-q6': ['RM10-O2'],
  'rm-m10-q7': ['RM10-O1'],
  'rm-m10-q8': ['RM10-O1'],
  'rm-m10-q9': ['RM10-O3'],
  'rm-m10-q10': ['RM10-O3'],
  'rm-m10-q11': ['RM10-O2'],
  'rm-m10-q12': ['RM10-O3'],

  'rm-m11-q1': ['RM11-O1'],
  'rm-m11-q2': ['RM11-O1'],
  'rm-m11-q3': ['RM11-O1'],
  'rm-m11-q4': ['RM11-O1'],
  'rm-m11-q5': ['RM11-O3'],
  'rm-m11-q6': ['RM11-O2'],
  'rm-m11-q7': ['RM11-O1'],
  'rm-m11-q8': ['RM11-O1'],
  'rm-m11-q9': ['RM11-O3'],
  'rm-m11-q10': ['RM11-O1'],
  'rm-m11-q11': ['RM11-O2'],
  'rm-m11-q12': ['RM11-O3'],

  'rm-m12-q1': ['RM12-O1'],
  'rm-m12-q2': ['RM12-O1'],
  'rm-m12-q3': ['RM12-O1'],
  'rm-m12-q4': ['RM12-O2'],
  'rm-m12-q5': ['RM12-O3'],
  'rm-m12-q6': ['RM12-O3'],
  'rm-m12-q7': ['RM12-O3'],
  'rm-m12-q8': ['RM12-O3'],
  'rm-m12-q9': ['RM12-O2'],
  'rm-m12-q10': ['RM12-O1', 'RM12-O2'],
  'rm-m12-q11': ['RM12-O3'],
  'rm-m12-q12': ['RM12-O2'],

  'rm-m13-q1': ['RM13-O1'],
  'rm-m13-q2': ['RM13-O1'],
  'rm-m13-q3': ['RM13-O1'],
  'rm-m13-q4': ['RM13-O3'],
  'rm-m13-q5': ['RM13-O2'],
  'rm-m13-q6': ['RM13-O2'],
  'rm-m13-q7': ['RM13-O2'],
  'rm-m13-q8': ['RM13-O3'],
  'rm-m13-q9': ['RM13-O3'],
  'rm-m13-q10': ['RM13-O3'],
  'rm-m13-q11': ['RM13-O3'],
  'rm-m13-q12': ['RM13-O2']
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
