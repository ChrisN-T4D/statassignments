/**
 * Pedagogical walkthrough for Article Review — guide only, no topic scoring.
 * Explains why each worksheet section exists and when to narrow vs widen focus.
 */

export const ARTICLE_REVIEW_WALKTHROUGH = {
  title: 'How this worksheet helps you think',
  intro:
    'The article review is not busywork. Each section trains a skill researchers use every week: finding literature, reading critically, and deciding whether your topic is too broad, too narrow, or ready for a problem statement. Methods Market does not pick your topic for you — it shows you what to look at.',
  steps: [
    {
      id: 'search',
      title: '1. Search terms & search log',
      why:
        'Researchers rarely find six good articles on the first try. You build a search string, run it, learn from the hit count, and adjust. The log keeps you from repeating dead ends.',
      narrow:
        'Too many hits (hundreds or thousands)? Add a population, a specific construct, or a PsycINFO index term. Combine a broad term with a narrower one.',
      widen:
        'Too few hits (zero or single digits)? Drop the strictest term, add synonyms (OR), or follow a citation from one good article’s reference list.',
      tiesTo: 'Search term builder and search log at the top of this section.'
    },
    {
      id: 'cards',
      title: '2. Article cards (what, why, how, so what)',
      why:
        'Each card is a reusable note — like an annotated bibliography entry. The authors’ “what” and “why” train you to spot their research question and gap. Method and results build vocabulary for your own design later. Strengths and weaknesses teach you to critique, not just summarize.',
      narrow:
        'Articles feel unrelated to each other? Your topic may still be too broad. Look for a shared population, construct, or context across cards before you write the problem statement.',
      widen:
        'Every article is almost identical? You may be too narrow — try one article on a neighboring construct or a different population to see what the field compares.',
      tiesTo: 'One numbered card per article (6–8 completed for Canvas).'
    },
    {
      id: 'source-check',
      title: '3. Source self-check',
      why:
        'Not everything in a database is peer-reviewed original research. This checklist asks you to look at the PDF — journal name, Method section, Results — before you invest time summarizing. That habit protects your literature review and your grade.',
      narrow: null,
      widen: null,
      tiesTo: 'Peer-review reference and checkboxes on each article card (Methods Market only — not graded separately).'
    },
    {
      id: 'problem',
      title: '4. Problem statement',
      why:
        'After several cards, patterns appear: what the field agrees on, what is still unknown, and what your study might address. Writing “what we know / gap / what we want to know” forces you to synthesize — not copy one abstract.',
      narrow:
        'Your gap sounds like “everything about social media”? Name one IV, one DV, and one population you could actually study this semester.',
      widen:
        'You cannot find a gap after six articles? You may need more reading, a different angle, or a construct adjacent to your first search — return to the search log instead of forcing a problem statement.',
      tiesTo: 'Problem statement fields after your article cards.'
    },
    {
      id: 'rq',
      title: '5. Early research question & hypothesis',
      why:
        'Canvas asks for a preliminary RQ and hypothesis now so you practice stating a testable direction before the full literature review. Expect to revise wording after Phase 2 — design details belong in Phase 4.',
      narrow:
        'If your RQ lists three constructs at once, pick the relationship you care about most for this project.',
      widen:
        'If your RQ is vague (“Does X affect Y?” with no population), add who and in what context from your article cards.',
      tiesTo: 'Research question and hypothesis fields at the end of this assignment.'
    }
  ],
  closing:
    'Export or download your draft when you are ready to paste into Canvas. Keep your article PDFs — Methods Market stores your notes, not the source files.'
}
