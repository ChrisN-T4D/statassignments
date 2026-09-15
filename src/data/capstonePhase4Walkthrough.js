/**
 * Interactive spotlight tour for Phase 4 operationalization — guide only.
 */

export const PHASE4_TOUR_STORAGE_KEY = 'study-plan-phase4-tour-completed'

export const PHASE4_TOUR_STEPS = [
  {
    id: 'intro',
    target: 'tour-p4-intro',
    title: 'Compare four ways to collect data',
    body:
      'Phase 4 explores survey, experimental, observation, and archival paths for your one research question. You choose ONE by the end. Submit with Phase 3 in Canvas.',
    beforeShow: null
  },
  {
    id: 'reminders',
    target: 'tour-p4-reminders',
    title: 'From Phase 3 and your outline',
    body:
      'Your elevator speech and Lit Review Outline RQ are starting points. Conceptual IV/DV definitions come from your lit review — not invented here.',
    beforeShow: null
  },
  {
    id: 'part-a',
    target: 'tour-p4-part-a',
    title: 'Part A — Context recap',
    body:
      'Broad topic area and proposed research question. Copy your working RQ from the Lit Review Outline if you have not already.',
    beforeShow: null
  },
  {
    id: 'part-b',
    target: 'tour-p4-part-b',
    title: 'Part B — Conceptual IV and DV',
    body:
      'Define variables conceptually based on how the literature describes them — before you pick measures or tasks.',
    narrow: 'Operational details here? Save scales and tasks for Part C.',
    widen: 'One sentence each? Add how your sources define the construct.',
    beforeShow: null
  },
  {
    id: 'part-c',
    target: 'tour-p4-part-c',
    title: 'Part C — Explore all four pathways',
    body:
      'Fill each path that could work. Mark “not viable” honestly if it does not fit — that is good thinking, not failure.',
    beforeShow: null
  },
  {
    id: 'part-d',
    target: 'tour-p4-part-d',
    title: 'Part D — Comparison table',
    body:
      'Compare feasibility, access, measurement, and ethics across paths. Use the Canvas Helpful Table as reference — you decide.',
    beforeShow: null
  },
  {
    id: 'part-e',
    target: 'tour-p4-part-e',
    title: 'Part E — Choose one pathway',
    body:
      'Pick the single data-collection strategy you will pursue. This unlocks the data analysis helper for your path.',
    beforeShow: null
  },
  {
    id: 'export',
    target: 'tour-p4-export',
    title: 'Export for Canvas',
    body:
      'Copy the full worksheet text for Parts A–E. Attach or paste per Canvas instructions.',
    beforeShow: null
  }
]
