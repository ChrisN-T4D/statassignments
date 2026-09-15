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
    'Use this sheet to compare different ways you could collect data for your one Research Question. Define IV and DV conceptually and operationally, then choose ONE pathway by the end of Phase 4.'
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
    title: 'Part B: Conceptual Definitions',
    instruction:
      'Conceptual definitions describe what your IV and DV mean in theory — the abstract constructs as your literature defines them.',
    fields: [
      {
        id: 'ivConceptual',
        label: 'Independent Variable (IV) — conceptual',
        exportLabel: 'Independent Variable (IV): (Define based on Lit Review)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote:
          'In plain language: what construct or factor do you think causes or predicts change in the outcome? Ground this in how your sources define the IV.'
      },
      {
        id: 'dvConceptual',
        label: 'Dependent Variable (DV) — conceptual',
        exportLabel: 'Dependent Variable (DV): (Define based on Lit Review)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote:
          'What outcome or behavior are you trying to explain? Describe the construct — not the survey item or task score yet.'
      }
    ]
  },
  {
    id: 'part-b-operational-definitions',
    title: 'Part B (continued): Operational Definitions',
    instruction:
      'Operational definitions specify how you would measure or manipulate each variable in a real study — concrete enough that another researcher could replicate your procedure.',
    fields: [
      {
        id: 'ivOperational',
        label: 'Independent Variable (IV) — operational',
        exportLabel: 'Independent Variable (IV): (Operational definition)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote:
          'How would you manipulate or categorize the IV? Name conditions, exposure levels, grouping rules, or the survey/score that represents the IV in your study.'
      },
      {
        id: 'dvOperational',
        label: 'Dependent Variable (DV) — operational',
        exportLabel: 'Dependent Variable (DV): (Operational definition)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote:
          'How would you score or record the DV? Name the scale, task outcome, observation code, or dataset variable — including units or scoring rules when you know them.'
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
