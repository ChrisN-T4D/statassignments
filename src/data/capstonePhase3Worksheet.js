/**
 * PSYC 4223 Phase 3 Worksheet — elevator speech (replaces legacy gap→RQ Canvas worksheet).
 *
 * MM schema is instructor-authored. Canvas assignment 44903 may still show the old
 * gap-to-research-question text until the instructor updates it. Phase 4 remains
 * synced from Canvas assignment 44935 via Playwright.
 */

export const PHASE3_META = {
  assignmentId: '44903',
  assignmentUrl: 'https://nwosu.instructure.com/courses/2406/assignments/44903',
  title: 'Phase 3 — Elevator Speech',
  objective:
    'Prepare a 1–2 minute spiel about your research: what the field knows, what gap your study addresses, and how your proposed study fits.'
}

/** Display-only hint; not enforced as pass/fail. */
export const ELEVATOR_SPEECH_WORD_COUNT_HINT = {
  min: 130,
  max: 300,
  readAloudLabel: '1–2 minute spiel'
}

export const PHASE3_PARTS = [
  {
    id: 'elevator-speech',
    title: 'Elevator Speech',
    instruction:
      'Your goal is a 1–2 minute spiel about your research when read aloud. IV/DV tables and methodology path choice belong in Phase 4.',
    fields: [
      {
        id: 'whatWeKnow',
        label: 'What we know',
        exportLabel: 'What we know: What does prior research agree on about your topic?',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-2',
        helpNote: 'In 2–4 sentences: what does the literature agree on?'
      },
      {
        id: 'theGap',
        label: 'The gap',
        exportLabel: 'The gap: What is still unknown, untested, or contested?',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-2',
        helpNote: 'In 1–3 sentences: what has not been studied enough?'
      },
      {
        id: 'myStudyPitch',
        label: 'My study pitch',
        exportLabel: 'My study: How will your proposed study address that gap?',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-2',
        helpNote: 'In 1–3 sentences: how does your study fit?'
      },
      {
        id: 'elevatorSpeech',
        label: 'Full elevator speech',
        exportLabel: 'Elevator speech (combined script)',
        required: true,
        multiline: true,
        helpTopicId: 'rm-chapter-11',
        helpNote: `Aim for ~${ELEVATOR_SPEECH_WORD_COUNT_HINT.min}–${ELEVATOR_SPEECH_WORD_COUNT_HINT.max} words — a ${ELEVATOR_SPEECH_WORD_COUNT_HINT.readAloudLabel} about your research when read aloud.`,
        wordCountHint: true
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

export function elevatorSpeechWordCount (text) {
  if (!text || typeof text !== 'string') return 0
  return text.trim().split(/\s+/).filter(Boolean).length
}
