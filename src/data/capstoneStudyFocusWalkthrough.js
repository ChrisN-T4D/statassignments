/**
 * Interactive spotlight tour for Study Focus — guide only.
 */

export const STUDY_FOCUS_TOUR_STORAGE_KEY = 'study-plan-study-focus-tour-completed'

export const STUDY_FOCUS_TOUR_STEPS = [
  {
    id: 'intro',
    target: 'tour-sf-intro',
    title: 'Your lit-review notebook (weeks 5–10)',
    body:
      'Study Focus is not graded in Canvas. It is where you capture thinking while you draft your literature review — so you do not start from zero at Phase 3. Update these notes as you read and revise.',
    beforeShow: null
  },
  {
    id: 'reminders',
    target: 'tour-sf-reminders',
    title: 'Start from your Article Review',
    body:
      'Your problem statement and early research question from week 4 are starting points — not final answers. Refine them here as you read more sources than your original six article cards.',
    beforeShow: null
  },
  {
    id: 'gap',
    target: 'tour-sf-gap',
    title: 'Working gap — update as you read',
    body:
      'The gap is what the literature still has not answered. It should get sharper (narrower) as you synthesize — or you may discover you need more reading (widen).',
    narrow: 'Gap still sounds like a whole topic area? Name one relationship, population, and outcome you could test.',
    widen: 'Gap disappeared after more reading? You may need a different angle or more sources before claiming a problem.',
    beforeShow: null
  },
  {
    id: 'rq',
    target: 'tour-sf-rq',
    title: 'Working research question',
    body:
      'Plain-language draft of what you might study. Your lit review prose will refine wording; Phase 4 will add design detail. This field prefills Phase 4’s proposed research question.',
    narrow: 'Multiple constructs in one sentence? Pick the core IV–DV relationship for this project.',
    widen: 'Too vague to guide reading? Add who you study and in what context.',
    beforeShow: null
  },
  {
    id: 'themes',
    target: 'tour-sf-themes',
    title: 'Lit review themes — synthesis, not lists',
    body:
      'Bullet what the field agrees on, where studies disagree, and patterns across methods. This trains you to write theme paragraphs instead of one paragraph per article.',
    narrow: 'Themes are just article titles restated? Group studies by finding or method.',
    widen: 'Only one theme so far? You may need more diverse sources or a broader construct.',
    beforeShow: null
  },
  {
    id: 'sources',
    target: 'tour-sf-sources',
    title: 'Sources to cite',
    body:
      'A running reminder list while you draft — not a duplicate of article cards. Jot authors you must not forget when you assemble your References section.',
    beforeShow: null
  },
  {
    id: 'export',
    target: 'tour-sf-export',
    title: 'Feeds Phase 3 & Phase 4',
    body:
      'Working gap appears in Phase 3 elevator speech reminders. Working RQ can copy into Phase 4. Export anytime to keep an offline copy while you write in Word or Canvas.',
    beforeShow: null
  }
]
