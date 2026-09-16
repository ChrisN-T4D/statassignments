/**
 * Interactive spotlight tour for Lit Review Outline Compiler: guide only.
 */

export const LIT_REVIEW_OUTLINE_TOUR_STORAGE_KEY = 'study-plan-lit-review-outline-tour-completed'

export const LIT_REVIEW_OUTLINE_TOUR_STEPS = [
  {
    id: 'intro',
    target: 'tour-lro-intro',
    title: 'Organize the lit review you are writing',
    body:
      'This tool helps you structure weeks 5–10 around one organizing framework, not a stack of article summaries. Methods Market does not grade this section; the export feeds Lit Review Draft 1, your Phase 3 speech, and Phase 4 variables.',
    beforeShow: null
  },
  {
    id: 'reminders',
    target: 'tour-lro-reminders',
    title: 'Carry forward from Article Review',
    body:
      'Your week-4 problem statement and early research question show up here as reminders. They are starting points, expect to refine them as you read beyond your original six article cards.',
    beforeShow: null
  },
  {
    id: 'framework',
    target: 'tour-lro-framework',
    title: 'Name your organizing framework',
    body:
      'Choose one theory or model that routes your review. Explain the mechanism: how does your IV relate to your DV according to this framework? Browse the reference list for ideas. Methods Market never picks a framework for you.',
    narrow: 'Three theories listed equally? Pick one primary lens for this paper.',
    widen: 'Mechanism is one vague sentence? Name the pathway (e.g., stress → sleep disruption → mood).',
    beforeShow: null
  },
  {
    id: 'reference',
    target: 'tour-lro-reference',
    title: 'Framework ideas (browse only)',
    body:
      'Common frameworks grouped by construct area. Use a name here only if it genuinely fits your topic, or ignore the list and use a framework from class or your sources.',
    beforeShow: null
  },
  {
    id: 'themes',
    target: 'tour-lro-themes',
    title: 'Theme buckets: synthesis sections',
    body:
      'Each bucket becomes a section of your outline. Bullet what studies agree on, where they disagree, and link article card numbers so you know which sources support each theme. Group by finding or method, not one paragraph per article.',
    narrow: 'One paragraph per article? Merge cards that share a finding under one theme.',
    widen: 'Only one theme with content? You may need more sources or a broader construct.',
    beforeShow: null
  },
  {
    id: 'gap',
    target: 'tour-lro-gap',
    title: 'Gap, transition, and working RQ',
    body:
      'State what the literature still has not established, then bridge to your proposed study. The working research question copies forward to Phase 4: write it specific enough to guide IV/DV definitions later.',
    narrow: 'Gap covers “everything about” your topic? Name one testable IV–DV link and population.',
    widen: 'No gap after more reading? Revisit search strategy or framework choice.',
    beforeShow: null
  },
  {
    id: 'preview',
    target: 'tour-lro-preview',
    title: 'Compiled outline preview',
    body:
      'Live preview of your framework, themes, and gap, your words only, no auto-generated prose. Use this as the skeleton for Lit Review Draft 1 before you expand bullets into paragraphs in Word.',
    beforeShow: null
  },
  {
    id: 'export',
    target: 'tour-lro-export',
    title: 'Export for Draft 1',
    body:
      'Copy or download PDF, paste into your draft document, and expand each section into prose. Themes and gap also feed your Phase 3 elevator speech, refine again when you speak, do not paste bullets verbatim.',
    beforeShow: null
  }
]
