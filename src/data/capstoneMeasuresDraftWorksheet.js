/**
 * Measures Draft: turn the operational definitions chosen in Method Choice (the Phase 4 data) into the survey,
 * protocol, observation plan, or data plan the study will use. Fields depend on the chosen pathway.
 */

export const MEASURES_META = {
  title: 'Measures Draft',
  objective:
    'Build the survey or protocol for your study from the operational definitions you chose in Method Choice. Another researcher should be able to run your study from what you write here.'
}

/** Keyed by the pathway ids used in capstonePhase4Worksheet.js (PHASE4_PATHWAYS). */
export const MEASURES_PATHWAYS = {
  'pathway-1-survey': {
    id: 'pathway-1-survey',
    label: 'Survey',
    heading: 'Build your survey',
    chapters: [
      { id: 'rm-chapter-4', label: 'Ch. 4: measurement and scales' },
      { id: 'rm-chapter-7', label: 'Ch. 7: survey research' }
    ],
    fields: [
      {
        id: 'surveyIntro',
        label: 'Introduction and instructions for participants',
        exportLabel: 'Introduction and instructions for participants:',
        required: true,
        multiline: true,
        helpNote: 'What will participants read first? Say what the survey is about, how long it takes, and how to respond.'
      },
      {
        id: 'surveyIvItems',
        label: 'Your IV: scale or items',
        exportLabel: 'IV measure (scale name or the items themselves):',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote: 'Match your operational definition of the IV. Name the validated scale, or list every item you will use.'
      },
      {
        id: 'surveyDvItems',
        label: 'Your DV: scale or items',
        exportLabel: 'DV measure (scale name or the items themselves):',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote: 'Match your operational definition of the DV. Name the validated scale, or list every item you will use.'
      },
      {
        id: 'surveyScoring',
        label: 'Response format and scoring',
        exportLabel: 'Response format and how each scale is scored:',
        required: true,
        multiline: true,
        helpNote: 'Response options (for example 1 to 5), reverse-scored items, and how items combine into a score.'
      },
      {
        id: 'surveyOther',
        label: 'Other items (optional)',
        exportLabel: 'Other items (demographics, controls, attention checks):',
        required: false,
        multiline: true
      }
    ]
  },
  'pathway-2-experimental': {
    id: 'pathway-2-experimental',
    label: 'Experimental task',
    heading: 'Build your protocol',
    chapters: [
      { id: 'rm-chapter-4', label: 'Ch. 4: measurement and scales' },
      { id: 'rm-chapter-5', label: 'Ch. 5: experimental research' }
    ],
    fields: [
      {
        id: 'expMaterials',
        label: 'Materials and setting',
        exportLabel: 'Materials and setting:',
        required: true,
        multiline: true,
        helpNote: 'Everything a researcher needs to run a session: stimuli, equipment, software, location.'
      },
      {
        id: 'expConditions',
        label: 'Conditions: how the IV is manipulated',
        exportLabel: 'Conditions and how the IV is manipulated:',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-5',
        helpNote: 'Match your operational definition of the IV. Name each condition and exactly what differs between them.'
      },
      {
        id: 'expProcedure',
        label: 'Procedure, step by step',
        exportLabel: 'Procedure (step by step, with timing):',
        required: true,
        multiline: true,
        helpNote: 'From the moment a participant arrives to the moment they leave, including instructions and how long each step takes.'
      },
      {
        id: 'expDvRecording',
        label: 'How the DV is measured and recorded',
        exportLabel: 'How the DV is measured and recorded:',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote: 'Match your operational definition of the DV: the score, units, and who or what records it.'
      }
    ]
  },
  'pathway-3-observation': {
    id: 'pathway-3-observation',
    label: 'Observation',
    heading: 'Build your observation protocol',
    chapters: [
      { id: 'rm-chapter-4', label: 'Ch. 4: measurement and scales' },
      { id: 'rm-chapter-6', label: 'Ch. 6: non-experimental research' }
    ],
    fields: [
      {
        id: 'obsBehaviors',
        label: 'Behaviors and coding scheme',
        exportLabel: 'Behaviors to record and the coding scheme:',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote: 'Define each behavior so two observers would code it the same way. Tie it to your operational definitions of the IV and DV.'
      },
      {
        id: 'obsSetting',
        label: 'Setting and sampling of time and place',
        exportLabel: 'Setting, and when and where you will observe:',
        required: true,
        multiline: true,
        helpNote: 'Where, at what times, and for how long. Say how you decide who or what gets observed.'
      },
      {
        id: 'obsRecording',
        label: 'How you record',
        exportLabel: 'How observations are recorded (tally, timed intervals, notes, video):',
        required: true,
        multiline: true
      },
      {
        id: 'obsReliability',
        label: 'Observer training and reliability',
        exportLabel: 'Observer training and how agreement between observers is checked:',
        required: false,
        multiline: true
      }
    ]
  },
  'pathway-4-archival': {
    id: 'pathway-4-archival',
    label: 'Archival data',
    heading: 'Build your data plan',
    chapters: [
      { id: 'rm-chapter-4', label: 'Ch. 4: measurement and scales' },
      { id: 'rm-chapter-6', label: 'Ch. 6: non-experimental research' }
    ],
    fields: [
      {
        id: 'archDataset',
        label: 'Dataset and source',
        exportLabel: 'Dataset, its source, and how you will access it:',
        required: true,
        multiline: true
      },
      {
        id: 'archVariables',
        label: 'Which variables are your IV and DV',
        exportLabel: 'Variables in the dataset that represent your IV and DV (names, codes, units):',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote: 'Match your operational definitions: name the exact columns and how they are coded.'
      },
      {
        id: 'archInclusion',
        label: 'Which cases you will use',
        exportLabel: 'Inclusion and exclusion rules, and how you will clean the data:',
        required: true,
        multiline: true
      }
    ]
  }
}

export function measuresFieldsForPathway (pathwayId) {
  return MEASURES_PATHWAYS[pathwayId]?.fields ?? []
}

export function emptyMeasuresDraft () {
  const out = {}
  for (const path of Object.values(MEASURES_PATHWAYS)) {
    for (const field of path.fields) out[field.id] = ''
  }
  return out
}
