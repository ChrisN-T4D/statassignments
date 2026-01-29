// Learning Objectives organized by module
// Each objective can be tracked for mastery assessment

export const objectives = [
  // Module 1: Why Learn Statistics
  {
    module: 1,
    objectiveType: 'content',
    objectiveId: 'M1-O1',
    objective: 'Explain why scientists use statistics as a safeguard against biased/limited human reasoning rather than relying on intuition alone.'
  },
  {
    module: 1,
    objectiveType: 'content',
    objectiveId: 'M1-O2',
    objective: 'Define the belief bias effect in logical reasoning.'
  },
  {
    module: 1,
    objectiveType: 'content',
    objectiveId: 'M1-O3',
    objective: 'Differentiate deductive validity from the truth or believability of a conclusion (i.e., validity does not require true premises).'
  },
  {
    module: 1,
    objectiveType: 'content',
    objectiveId: 'M1-O4',
    objective: 'Describe Simpson\'s paradox as a case where an aggregated association can differ from or reverse relative to disaggregated (subgroup) associations.'
  },

  // Module 2: Research Design & Measurement
  {
    module: 2,
    objectiveType: 'content',
    objectiveId: 'M2-O1',
    objective: 'Define psychological measurement and distinguish the thing being measured (theoretical construct) from the measurement/observed value.'
  },
  {
    module: 2,
    objectiveType: 'content',
    objectiveId: 'M2-O2',
    objective: 'Define operationalisation and distinguish among theoretical construct, measure, operationalisation, and variable.'
  },
  {
    module: 2,
    objectiveType: 'content',
    objectiveId: 'M2-O3',
    objective: 'Classify variables by scale of measurement (nominal, ordinal, interval, ratio) and distinguish continuous versus discrete variables.'
  },
  {
    module: 2,
    objectiveType: 'content',
    objectiveId: 'M2-O4',
    objective: 'Define reliability and validity, differentiate them, and identify major forms of reliability (test–retest, inter-rater, parallel forms, internal consistency).'
  },

  // Module 3: Software Basics and Data Handling
  {
    module: 3,
    objectiveType: 'software',
    objectiveId: 'M3-O1',
    objective: 'Identify the main parts of the jamovi interface and use the basic analysis workflow (select an analysis, set options, view results, remove an analysis).'
  },
  {
    module: 3,
    objectiveType: 'software',
    objectiveId: 'M3-O2',
    objective: 'Import/open data files in jamovi (e.g., .omv, .csv, and other common formats) and verify key import settings (header row, decimal/separator, quoting, missing values).'
  },
  {
    module: 3,
    objectiveType: 'software',
    objectiveId: 'M3-O3',
    objective: 'Install jamovi add-on modules and save/export work appropriately (export data vs save a jamovi file that includes analyses).'
  },
  {
    module: 3,
    objectiveType: 'hybrid',
    objectiveId: 'M3-O4',
    objective: 'Describe how jamovi represents data (rows as cases, columns as variables) and set an appropriate variable level/type (ID, nominal, ordinal, continuous; text/integer/decimal) based on the data and intended analysis.'
  },
  {
    module: 3,
    objectiveType: 'hybrid',
    objectiveId: 'M3-O5',
    objective: 'Create computed variables in jamovi (e.g., transformations, z-scores, sum-scores, means) and state an appropriate use-case for each in preparing data for analysis.'
  }
]

// Helper functions
export function getObjectivesByModule(moduleNumber) {
  return objectives.filter(obj => obj.module === moduleNumber)
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
  const match = moduleId.match(/module-(\d+)/)
  return match ? parseInt(match[1]) : null
}
