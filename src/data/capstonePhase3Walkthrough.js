/**
 * Interactive spotlight tour for Phase 3 elevator speech — guide only.
 */

export const PHASE3_TOUR_STORAGE_KEY = 'study-plan-phase3-tour-completed'

export const PHASE3_TOUR_STEPS = [
  {
    id: 'intro',
    target: 'tour-p3-intro',
    title: 'Distill your lit review into a speech',
    body:
      'Phase 3 is a 1–2 minute spiel about your research: what the field knows, what gap your study addresses, and how your proposed study fits. You are not designing methods here — that is Phase 4. Submit Phase 3 and Phase 4 together in Canvas.',
    beforeShow: null
  },
  {
    id: 'reminders',
    target: 'tour-p3-reminders',
    title: 'Start from your Lit Review Outline',
    body:
      'Your framework, theme synthesis notes, gap, and transition appear here as reminders. Treat them as raw material — rewrite into spoken sentences a listener could follow without seeing your outline.',
    beforeShow: null
  },
  {
    id: 'what-we-know',
    target: 'tour-p3-what-we-know',
    title: 'What we know',
    body:
      'In 2–4 sentences, summarize what prior research agrees on about your topic. This should sound like synthesis across several studies — patterns and findings — not “Article 3 found X.” Use copy-from-outline if helpful, then edit for speech.',
    narrow: 'Sounds like one study? Name a pattern several sources support.',
    widen: 'Covers your whole field? Keep only findings that set up your gap.',
    beforeShow: null
  },
  {
    id: 'gap',
    target: 'tour-p3-gap',
    title: 'The gap',
    body:
      'In 1–3 sentences, state what is still unknown, untested, or contested. This should match your Lit Review Outline gap, but sharper: a listener should hear exactly what your study will address that the literature has not.',
    narrow: 'Gap is a whole topic area? Name one IV, DV, and population.',
    widen: 'No clear gap yet? Return to your outline or read more before drafting.',
    beforeShow: null
  },
  {
    id: 'pitch',
    target: 'tour-p3-pitch',
    title: 'My study pitch',
    body:
      'In 1–3 sentences, explain how your proposed study fits the gap — what you would investigate and why it matters. Do not describe surveys, tasks, or stats yet; save operational details for Phase 4.',
    beforeShow: null
  },
  {
    id: 'speech',
    target: 'tour-p3-speech',
    title: 'Full elevator speech',
    body:
      'Combine the three parts into one continuous script (~130–300 words). Read it aloud and time yourself — aim for 1–2 minutes. The goal is a clear spoken summary of your research, not a written lit review.',
    narrow: 'Over 350 words or over 2 minutes? Cut repetition between sections.',
    widen: 'Under 130 words? Add one concrete example from the literature.',
    beforeShow: null
  },
  {
    id: 'export',
    target: 'tour-p3-export',
    title: 'Export for Canvas',
    body:
      'Copy or download the formatted text and paste into the Phase 3 worksheet in Canvas. Submit together with Phase 4 on the same due date.',
    beforeShow: null
  }
]
