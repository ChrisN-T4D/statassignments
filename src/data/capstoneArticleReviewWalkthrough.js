/**
 * Interactive spotlight tour for Article Review — guide only, no topic scoring.
 */

export const ARTICLE_REVIEW_TOUR_STORAGE_KEY = 'study-plan-article-tour-completed'

/** @typedef {{ id: string, target: string, title: string, body: string, narrow?: string|null, widen?: string|null, beforeShow?: string|null }} TourStep */

/** @type {TourStep[]} — Vue app (search builder not in app yet; static preview adds search steps) */
export const ARTICLE_REVIEW_TOUR_STEPS = [
  {
    id: 'intro',
    target: 'tour-intro',
    title: 'Why this assignment exists',
    body:
      'You are building a research notebook, not filling blanks for a grade. Each section below trains a skill: search, read critically, evaluate sources, and decide if your topic is too broad or too narrow.',
    beforeShow: null
  },
  {
    id: 'peer-review',
    target: 'tour-peer-review',
    title: 'Learn what counts as a source',
    body:
      'Before you summarize, you need the right kind of article. This reference shows what peer-reviewed empirical research looks like — you look, then you decide on each card.',
    beforeShow: null
  },
  {
    id: 'jump-nav',
    target: 'tour-jump-nav',
    title: 'Your article cards (6 minimum for Canvas)',
    body:
      'Each number is one article. Green means all required fields are filled. Add more cards anytime — export includes every card with content. Use jump buttons to compare patterns and decide whether to narrow or widen your topic.',
    beforeShow: null
  },
  {
    id: 'header',
    target: 'tour-header',
    title: 'Name your research focus',
    body:
      'Your proposed project title should reflect a narrow focus (one population, construct, or context). If you cannot state it in one clear line, your topic may still be too broad.',
    narrow: 'Title sounds like a whole field (“mental health”)? Add who and what relationship you study.',
    widen: 'Title locks you into one tiny sample with no literature? Broaden the construct slightly and search again.',
    beforeShow: null
  },
  {
    id: 'article-card',
    target: 'tour-article-card',
    title: 'Article cards = reusable research notes',
    body:
      'Summarize in your own words: the authors’ what and why questions, participants, method, results, strengths, weaknesses, and how it connects to your project. You will cite these again in your literature review.',
    narrow: 'Articles on this card feel unrelated? Narrow to a shared population or construct.',
    widen: 'Every summary sounds the same? Widen — try an adjacent construct or comparison group.',
    beforeShow: 'open-first-card'
  },
  {
    id: 'source-check',
    target: 'tour-source-check',
    title: 'Look at the PDF, then check',
    body:
      'Methods Market does not grade these boxes. They remind you to verify database source, journal type, Method/Results sections, and that you saved the PDF before you write paragraphs.',
    beforeShow: 'open-first-card'
  },
  {
    id: 'problem',
    target: 'tour-problem',
    title: 'Synthesize into a problem statement',
    body:
      'After 6–8 cards, themes emerge. “What we know,” “the gap,” and “what we want to know” force you to combine articles — not copy one abstract.',
    narrow: 'Gap covers “everything about” your topic? Name one IV, DV, and population for this semester.',
    widen: 'No gap after six articles? Return to search — you may need different reading, not a forced statement.',
    beforeShow: 'close-cards'
  },
  {
    id: 'rq',
    target: 'tour-rq',
    title: 'Draft a testable direction',
    body:
      'Canvas asks for an early research question and hypothesis. Expect to revise after Phase 2; operational details wait until Phase 4.',
    narrow: 'Three constructs in one RQ? Pick the one relationship that matters most now.',
    widen: 'RQ has no population or context? Pull “who” from your article cards.',
    beforeShow: 'close-cards'
  },
  {
    id: 'export',
    target: 'tour-export',
    title: 'Export when ready for Canvas',
    body:
      'Copy text or download a PDF of your draft. Attach each article PDF separately in Canvas — Methods Market stores your notes, not the source files.',
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
      'Add synonyms for each part of your topic (IV, DV, population). Copy the Boolean preview into PsycINFO. Hit counts teach you whether to add or remove terms.',
    narrow: 'Thousands of hits? Add population, context, or a PsycINFO index term.',
    widen: 'Zero hits? Drop the strictest term or add OR synonyms.',
    beforeShow: null
  },
  {
    id: 'search-log',
    target: 'tour-search-log',
    title: 'Log what you tried',
    body:
      'Record database, query, and what happened. Link rows to article numbers so you remember which search found each source.',
    beforeShow: null
  },
  ...ARTICLE_REVIEW_TOUR_STEPS.slice(1)
]
