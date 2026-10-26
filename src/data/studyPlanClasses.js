/**
 * Which classes have a Study Plan, which sections each one shows, and what changes by class.
 * Research Methods (PSYC 4223) is the original; Intro to Research (PSYC 5033) reuses the same worksheets for its
 * annotated bibliography, literature outline, method choice and measures (reorganized 2026-10-26 on the Research Methods flow).
 * Section ids stay the same across classes so saved drafts, walkthroughs and export code are shared.
 */

export const STUDY_PLAN_CLASSES = {
  'research-methods': {
    course: 'PSYC 4223',
    intro: 'Your capstone draft workspace for PSYC 4223. Methods Market holds your notes and links to chapters; Canvas is where you submit for a grade.',
    sectionIds: null, // every section that is not retired
    articleMin: 6,
    articleRange: '6 to 8',
    canvasLinks: true, // the RM Canvas assignment and wiki-page links exist
    flow: 'rm', // Phase 3 elevator speech and the four-path Phase 4 hand-offs
    overrides: {}
  },
  'intro-research': {
    course: 'PSYC 5033',
    intro: 'Your proposal workspace for PSYC 5033. Methods Market holds your notes and links to chapters; Canvas is where you submit for a grade. The pieces build on each other, so work through them in order.',
    sectionIds: ['article-review', 'theory-selection', 'study-focus', 'phase-4', 'measures-draft'],
    articleMin: 5,
    articleRange: '5 to 7',
    canvasLinks: false, // no Canvas assignment URLs for this course yet
    flow: 'intro', // no elevator speech: outline -> narrowed question -> method choice -> measures
    overrides: {
      'article-review': {
        title: 'Annotated Bibliography',
        shortTitle: 'Annotated Bibliography',
        description: 'One card per source: reference, what the study asked and why, how it was done, what it found, its quality, and how it relates to your topic. 5 to 7 sources.',
        submitNote: 'Submit your annotated bibliography in Canvas.'
      },
      'study-focus': {
        title: 'Literature Review Outline',
        shortTitle: 'Lit Review Outline',
        description: 'Organizing framework, theme buckets, and compiled outline for your literature review.',
        submitNote: 'Submit your outline in Canvas; it feeds your Literature Review Draft.'
      },
      'phase-4': {
        title: 'Method Choice and Measures: Method Choice',
        shortTitle: 'Method Choice',
        description: 'Compare four data-collection pathways for your narrowed question and choose one. The study will not be carried out, so the reasoning counts.',
        submitNote: 'Part of Method Choice and Measures in Canvas.'
      },
      'measures-draft': {
        title: 'Method Choice and Measures: Measures',
        shortTitle: 'Measures',
        description: 'Name the measure or data source for every variable and justify its reliability and validity.',
        submitNote: 'Part of Method Choice and Measures in Canvas.'
      }
    }
  }
}

export function studyPlanClass (classId) {
  return STUDY_PLAN_CLASSES[classId] ?? null
}

export function hasStudyPlan (classId) {
  return Boolean(STUDY_PLAN_CLASSES[classId])
}
