/**
 * Interactive spotlight tour for Article Review: guide only, no topic scoring.
 */

export const ARTICLE_REVIEW_TOUR_STORAGE_KEY = 'study-plan-article-tour-completed'

/** @typedef {{ id: string, target: string, title: string, body: string, narrow?: string|null, widen?: string|null, beforeShow?: string|null }} TourStep */

/** @type {TourStep[]}: Vue app (search builder not in app yet; static preview adds search steps) */
export const ARTICLE_REVIEW_TOUR_STEPS = [
  {
    id: 'intro',
    target: 'tour-intro',
    title: 'Why this assignment exists',
    body:
      'You are building a research notebook for the whole capstone, not filling blanks for a grade. Each section trains a skill you will reuse: finding sources, reading critically, evaluating quality, and deciding whether your topic is focused enough to study this semester.',
    beforeShow: null
  },
  {
    id: 'peer-review',
    target: 'tour-peer-review',
    title: 'Learn what counts as a source',
    body:
      'Before you summarize, confirm you have peer-reviewed empirical research, original studies with Method and Results sections, not news, blogs, or review-only articles. Methods Market shows examples; you open the PDF and decide for each card.',
    beforeShow: null
  },
  {
    id: 'jump-nav',
    target: 'tour-jump-nav',
    title: 'Article cards (6 minimum for Canvas)',
    body:
      'Each number is one source. Green means every required field on that card is filled. Add cards anytime, export includes all cards with content. Jump between cards to compare patterns and notice when your topic needs to narrow or widen.',
    beforeShow: null
  },
  {
    id: 'header',
    target: 'tour-header',
    title: 'Name your research focus',
    body:
      'Your proposed project title should name a focused relationship, typically one population, construct, or context. If you cannot state the focus in one clear line, your search and reading may still be too broad.',
    narrow: 'Title sounds like a whole field (“mental health”)? Add who and what relationship you study.',
    widen: 'Title locks you into one tiny sample with no literature? Broaden the construct slightly and search again.',
    beforeShow: null
  },
  {
    id: 'article-card',
    target: 'tour-article-card',
    title: 'Article cards = reusable research notes',
    body:
      'Summarize in your own words: the authors’ what and why questions, participants, method, results, strengths, weaknesses, and how the study connects to your project. You will cite and synthesize these notes again in your literature review, invest once, reuse many times.',
    narrow: 'Articles on this card feel unrelated? Narrow to a shared population or construct.',
    widen: 'Every summary sounds the same? Widen, try an adjacent construct or comparison group.',
    beforeShow: 'open-first-card'
  },
  {
    id: 'source-check',
    target: 'tour-source-check',
    title: 'Look at the PDF, then check',
    body:
      'These boxes are not graded. They remind you to verify database source, journal type, Method/Results sections, and that you saved the PDF before you write paragraphs that depend on this article.',
    beforeShow: 'open-first-card'
  },
  {
    id: 'problem',
    target: 'tour-problem',
    title: 'Synthesize into a problem statement',
    body:
      'After several cards, patterns emerge. “What we know,” “the gap,” and “what we want to know” force you to combine sources, not copy one abstract. This draft feeds your Lit Review Outline and later your elevator speech.',
    narrow: 'Gap covers “everything about” your topic? Name one IV, DV, and population for this semester.',
    widen: 'No gap after six articles? Return to search, you may need different reading, not a forced statement.',
    beforeShow: 'close-cards'
  },
  {
    id: 'rq',
    target: 'tour-rq',
    title: 'Draft a testable direction',
    body:
      'Canvas asks for an early research question and hypothesis. Expect to revise after the lit review draft; conceptual and operational variable definitions wait until Phase 4. Still, write a direction specific enough to guide your reading.',
    narrow: 'Three constructs in one RQ? Pick the one relationship that matters most now.',
    widen: 'RQ has no population or context? Pull “who” from your article cards.',
    beforeShow: 'close-cards'
  },
  {
    id: 'export',
    target: 'tour-export',
    title: 'Export when ready for Canvas',
    body:
      'Copy text or download a PDF of your draft for the Article Review assignment. Attach each article PDF separately in Canvas. Methods Market stores your notes, not the source files themselves.',
    beforeShow: 'close-cards'
  }
]

/** Static preview includes search builder steps at the top */
export const ARTICLE_REVIEW_TOUR_STEPS_STATIC = [
  {
    id: 'search-builder',
    target: 'tour-search-builder',
    title: 'Build search strings iteratively',
    body:
      'Add synonyms for IV, DV, population, and context. Copy the Boolean preview into PsycINFO or another library database. Hit counts tell you whether to add terms (too many results) or remove or broaden terms (too few).',
    narrow: 'Thousands of hits? Add population, context, or a PsycINFO index term.',
    widen: 'Zero hits? Drop the strictest term or add OR synonyms for the same concept.',
    beforeShow: null
  },
  {
    id: 'search-log',
    target: 'tour-search-log',
    title: 'Log what you tried',
    body:
      'Record database, query, and what happened (hits, dead ends, useful leads). Link rows to article numbers so you remember which search found each source. Instructors and future-you will ask.',
    beforeShow: null
  },
  ...ARTICLE_REVIEW_TOUR_STEPS.slice(1)
]
