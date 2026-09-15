/**
 * PSYC 4223 Phase 4 Worksheet — field schema from Canvas assignment instructions.
 * Source: course 2406 assignment 44935 (fetched via Playwright).
 * Wiki page /pages/phase-4-worksheet is an empty shell; instructions live on the assignment.
 * Supplementary: /pages/helpful-table (IV/DV logic table) and path-1…4 guide wiki pages.
 */

export const PHASE4_CANVAS = {
  assignmentId: '44935',
  assignmentUrl: 'https://nwosu.instructure.com/courses/2406/assignments/44935',
  wikiPageUrl: 'https://nwosu.instructure.com/courses/2406/pages/phase-4-worksheet',
  helpfulTableUrl: 'https://nwosu.instructure.com/courses/2406/pages/helpful-table',
  title: 'Operationalization Exploration',
  intro:
    'Use this sheet to compare different ways you could collect data for your one Research Question. Choose ONE pathway by the end of Phase 4.'
}

/** Part C pathways on the worksheet (labels from Canvas assignment). */
export const PHASE4_PATHWAYS = [
  {
    id: 'pathway-1-survey',
    canvasMethodPathId: 'path-1-survey',
    label: 'Pathway 1 (Self-Report / Survey)',
    canvasGuideUrl: 'https://nwosu.instructure.com/courses/2406/pages/path-1-survey-methodology',
    fields: [
      {
        id: 'validatedScales',
        label: 'What validated scales?',
        exportLabel: 'What validated scales:',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4'
      }
    ]
  },
  {
    id: 'pathway-2-experimental',
    canvasMethodPathId: 'path-3-experimental',
    label: 'Pathway 2: Performance / Experimental Task',
    canvasGuideUrl: 'https://nwosu.instructure.com/courses/2406/pages/path-3-experimental-design',
    fields: [
      {
        id: 'taskDescription',
        label: 'What task and how long?',
        exportLabel: 'What task would they complete and for how long?',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-5'
      },
      {
        id: 'comparisonGroup',
        label: 'Comparison group',
        exportLabel: 'What would be the comparison group?',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-5'
      }
    ]
  },
  {
    id: 'pathway-3-observation',
    canvasMethodPathId: 'path-2-qualitative',
    label: 'Pathway 3: Observation / Naturalistic Recording',
    canvasGuideUrl: 'https://nwosu.instructure.com/courses/2406/pages/path-2-qualitative-interview',
    fields: [
      {
        id: 'whatToObserve',
        label: 'What to observe/record',
        exportLabel: 'What would you observe/record?',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-6'
      },
      {
        id: 'observationDuration',
        label: 'For how long?',
        exportLabel: 'For how long?',
        required: true,
        multiline: true
      }
    ]
  },
  {
    id: 'pathway-4-archival',
    canvasMethodPathId: 'path-4-archival',
    label: 'Pathway 4: Archival',
    canvasGuideUrl: 'https://nwosu.instructure.com/courses/2406/pages/path-4-archival-data',
    fields: [
      {
        id: 'existingDataset',
        label: 'Existing dataset',
        exportLabel:
          'Is there a dataset that already has your independent and dependent variables in it you could use?',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-6'
      }
    ]
  }
]

/** Part D comparison table — student fills cells; MM shows Helpful Table link, does not score. */
export const PHASE4_COMPARISON_CRITERIA = [
  { id: 'feasibility', label: 'Feasibility this semester' },
  { id: 'accessToParticipants', label: 'Access to participants / data' },
  { id: 'measurementQuality', label: 'Measurement quality (validity/reliability)' },
  { id: 'ethicsIrB', label: 'Ethics / IRB considerations' },
  { id: 'notes', label: 'Notes (optional)' }
]

export const PHASE4_PARTS = [
  {
    id: 'part-a-context',
    title: 'Part A: Context & Variables (Recap from Step 3)',
    fields: [
      {
        id: 'broadTopicArea',
        label: 'Broad Topic Area',
        exportLabel: 'Broad Topic Area:',
        required: true,
        multiline: false
      },
      {
        id: 'proposedResearchQuestion',
        label: 'Proposed Research Question',
        exportLabel: 'Proposed Research Question:',
        required: true,
        multiline: true,
        prefillFrom: 'litReviewOutline.gapAndTransition.workingResearchQuestion'
      }
    ]
  },
  {
    id: 'part-b-conceptual-definitions',
    title: 'Part B: Define Your Variables using the Conceptual Definition',
    fields: [
      {
        id: 'ivConceptual',
        label: 'Independent Variable (IV)',
        exportLabel: 'Independent Variable (IV): (Define based on Lit Review)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4'
      },
      {
        id: 'dvConceptual',
        label: 'Dependent Variable (DV)',
        exportLabel: 'Dependent Variable (DV): (Define based on Lit Review)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4'
      }
    ]
  }
]

export function emptyPathwayResponses () {
  const out = {}
  for (const path of PHASE4_PATHWAYS) {
    out[path.id] = {}
    for (const field of path.fields) {
      out[path.id][field.id] = ''
    }
    out[path.id].notViable = false
  }
  return out
}

export function emptyComparisonTable () {
  const rows = {}
  for (const criterion of PHASE4_COMPARISON_CRITERIA) {
    rows[criterion.id] = {}
    for (const path of PHASE4_PATHWAYS) {
      rows[criterion.id][path.id] = ''
    }
  }
  return rows
}

export function emptyPhase4 () {
  const recap = {}
  for (const part of PHASE4_PARTS) {
    for (const field of part.fields) {
      recap[field.id] = ''
    }
  }
  return {
    ...recap,
    pathwayResponses: emptyPathwayResponses(),
    comparisonTable: emptyComparisonTable(),
    chosenPathwayId: ''
  }
}
