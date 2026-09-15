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
      'Phase 3 is a 1–2 minute spiel (at most) about your research: what the field knows, the gap, and how your study fits. Submit with Phase 4 in Canvas. IV/DV and methods belong in Phase 4.',
    beforeShow: null
  },
  {
    id: 'reminders',
    target: 'tour-p3-reminders',
    title: 'Start from your outline',
    body:
      'Your Lit Review Outline framework, gap, and themes are starting points — refine into spoken prose, do not paste bullets verbatim.',
    beforeShow: null
  },
  {
    id: 'what-we-know',
    target: 'tour-p3-what-we-know',
    title: 'What we know',
    body:
      'In 2–4 sentences: what does prior research agree on? This comes from your theme buckets — synthesis, not a list of articles.',
    narrow: 'Sounds like one study? Name a pattern across several sources.',
    widen: 'Covers everything? Pick the findings most relevant to your gap.',
    beforeShow: null
  },
  {
    id: 'gap',
    target: 'tour-p3-gap',
    title: 'The gap',
    body:
      'In 1–3 sentences: what is still unknown or contested? Should match your Lit Review Outline gap — sharper than your first draft.',
    narrow: 'Gap is a whole topic? Name one IV, DV, and population.',
    widen: 'No clear gap? Return to your outline or read more sources.',
    beforeShow: null
  },
  {
    id: 'pitch',
    target: 'tour-p3-pitch',
    title: 'My study pitch',
    body:
      'In 1–3 sentences: how will your proposed study address the gap? No methods detail yet — that is Phase 4.',
    beforeShow: null
  },
  {
    id: 'speech',
    target: 'tour-p3-speech',
    title: 'Full elevator speech',
    body:
      'Combine the three parts into one script (~130–300 words). Practice as a 1–2 minute spiel about your research when read aloud.',
    narrow: 'Over 350 words? Cut repetition — keep it under 2 minutes.',
    widen: 'Under 130 words? Add one concrete example from the literature.',
    beforeShow: null
  },
  {
    id: 'export',
    target: 'tour-p3-export',
    title: 'Export for Canvas',
    body:
      'Copy or download PDF and paste into the Phase 3 worksheet. Submit together with Phase 4.',
    beforeShow: null
  }
]
