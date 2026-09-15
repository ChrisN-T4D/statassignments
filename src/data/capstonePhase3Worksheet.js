/**
 * PSYC 4223 Phase 3 Worksheet — field schema from Canvas assignment instructions.
 * Source: course 2406 assignment 44903 (fetched via Playwright).
 * Wiki page /pages/phase-3-worksheet is an empty shell; instructions live on the assignment.
 */

export const PHASE3_CANVAS = {
  assignmentId: '44903',
  assignmentUrl: 'https://nwosu.instructure.com/courses/2406/assignments/44903',
  wikiPageUrl: 'https://nwosu.instructure.com/courses/2406/pages/phase-3-worksheet',
  title: 'From Literature Review to Research Question (Phase 3)',
  objective:
    'To synthesize findings from your completed literature review, identify research gaps, and draft a specific, measurable research question using operational variables.'
}

export const PHASE3_PARTS = [
  {
    id: 'part-a-gap-analysis',
    title: 'Part A: Gap Analysis',
    instruction:
      'Refer back to your Phase 2 Literature Summary. Look for where the existing studies agree, disagree, or leave questions unanswered.',
    fields: [
      {
        id: 'currentConsensus',
        label: 'Current Consensus',
        exportLabel:
          'Current Consensus: What do most of the published articles say about this topic? (Summarize in one sentence)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-2'
      },
      {
        id: 'identifiedGap',
        label: 'Identified Gap / Contradiction',
        exportLabel:
          'Identified Gap/Contradiction: Based on your reading, what specific relationship or population has not been studied enough yet? Be specific.',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-2',
        helpNote: 'Is there a new variable missing? A different context not covered before?'
      }
    ]
  },
  {
    id: 'part-b-narrowing-scope',
    title: 'Part B: Narrowing the Scope',
    instruction: 'A broad question is impossible to answer in one study. Complete these constraints.',
    fields: [
      {
        id: 'targetPopulation',
        label: 'Target Population',
        exportLabel: 'Target Population',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-7',
        helpNote: 'Avoid "people"; be specific (e.g., first-year undergraduates, remote workers).'
      },
      {
        id: 'timeFrameContext',
        label: 'Time Frame / Context',
        exportLabel: 'Time Frame/Context: When and where does the data collection happen?',
        required: true,
        multiline: true,
        helpNote: 'Example: During finals week OR across a full semester.'
      }
    ]
  },
  {
    id: 'part-c-variables',
    title: 'Part C: Variable Selection & Definition',
    instruction:
      'Before asking how X affects Y, define exactly what those measurements will be based on the gap above.',
    fields: [
      {
        id: 'independentVariable',
        label: 'Independent Variable (IV)',
        exportLabel: 'Independent Variable (IV)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote: 'How are you categorizing or manipulating it? (e.g., High vs Low usage)'
      },
      {
        id: 'dependentVariable',
        label: 'Dependent Variable (DV)',
        exportLabel: 'Dependent Variable (DV)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-4',
        helpNote: 'Ensure measurable using tools found during your literature search (e.g., GAD-7, GPA).'
      }
    ]
  },
  {
    id: 'part-d-research-question',
    title: 'Part D: Drafting & Refining the Question',
    instruction: 'Draft, edit, and finalize your Research Statement.',
    fields: [
      {
        id: 'firstDraft',
        label: 'First Draft (Too Broad?)',
        exportLabel: 'First Draft: How does [IV] affect [DV] in my population?',
        required: true,
        multiline: true
      },
      {
        id: 'secondDraft',
        label: 'Second Draft (Adding Context)',
        exportLabel:
          'Second Draft: In a sample of ______________, how does [IV] level relate to changes in [DV]?',
        required: true,
        multiline: true
      },
      {
        id: 'finalResearchQuestion',
        label: 'Final Question Statement',
        exportLabel: 'Research Question:',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-2',
        helpNote: 'Ensure it answers the gap from Part A without trying to solve the whole field.'
      },
      {
        id: 'peerCheckAnswerable',
        label: 'Peer Check',
        exportLabel:
          'Peer Check (If working with others): Is this question answerable within a semester? If yes, why?',
        required: false,
        multiline: true
      }
    ]
  }
]

export function emptyPhase3 () {
  const phase3 = {}
  for (const part of PHASE3_PARTS) {
    for (const field of part.fields) {
      phase3[field.id] = ''
    }
  }
  return phase3
}
