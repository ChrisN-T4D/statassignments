/**
 * Interactive spotlight tour for Lit Review Outline Compiler — guide only.
 */

export const LIT_REVIEW_OUTLINE_TOUR_STORAGE_KEY = 'study-plan-lit-review-outline-tour-completed'

export const LIT_REVIEW_OUTLINE_TOUR_STEPS = [
  {
    id: 'intro',
    target: 'tour-lro-intro',
    title: 'Root your lit review in a framework',
    body:
      'This compiler helps you organize weeks 5–10 around one organizing theory — not a list of article summaries. It is not graded in Canvas; export feeds Draft 1 and Phase 3/4.',
    beforeShow: null
  },
  {
    id: 'reminders',
    target: 'tour-lro-reminders',
    title: 'Start from Article Review',
    body:
      'Your problem statement and early RQ from week 4 are starting points. Refine them as you read beyond your original article cards.',
    beforeShow: null
  },
  {
    id: 'framework',
    target: 'tour-lro-framework',
    title: 'Name your organizing framework',
    body:
      'What big theory or model routes your review? Explain the mechanism connecting your IV and DV. Browse framework ideas below — MM never picks one for you.',
    narrow: 'Multiple theories listed? Pick one primary lens for this paper.',
    widen: 'Mechanism too vague? Name the pathway (e.g., arousal → sleep disruption).',
    beforeShow: null
  },
  {
    id: 'reference',
    target: 'tour-lro-reference',
    title: 'Framework ideas (browse only)',
    body:
      'Common frameworks grouped by construct area. Copy a name if it fits — or ignore and use your own from class or your sources.',
    beforeShow: null
  },
  {
    id: 'themes',
    target: 'tour-lro-themes',
    title: 'Theme buckets — synthesis, not lists',
    body:
      'Each bucket is a section of your outline. Bullet what studies agree on, where they disagree, and link article card numbers manually.',
    narrow: 'One paragraph per article? Group by finding or method under each theme.',
    widen: 'Only one theme? You may need more diverse sources or a broader construct.',
    beforeShow: null
  },
  {
    id: 'gap',
    target: 'tour-lro-gap',
    title: 'Gap and transition',
    body:
      'State what is still unknown, then bridge to your proposed study. Working RQ copies into Phase 4.',
    narrow: 'Gap covers everything? Name one testable IV–DV relationship and population.',
    widen: 'No gap after more reading? Return to search or reconsider your framework.',
    beforeShow: null
  },
  {
    id: 'preview',
    target: 'tour-lro-preview',
    title: 'Compiled outline preview',
    body:
      'Live assembly of your framework, themes, and gap — your words only. Use this for Lit Review Draft 1 outline sections.',
    beforeShow: null
  },
  {
    id: 'export',
    target: 'tour-lro-export',
    title: 'Export for Draft 1',
    body:
      'Copy or download PDF. Paste into Word and expand bullets into prose. Gap and themes feed your Phase 3 elevator speech.',
    beforeShow: null
  }
]
