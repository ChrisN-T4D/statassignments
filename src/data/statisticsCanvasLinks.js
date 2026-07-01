/**
 * Deep links for PSYC 4213 Statistics — Concept Review & Software Practice in Methods Market.
 * Paste full URLs into Canvas assignments (External Tool or URL submission).
 */

export const METHODS_MARKET_BASE = 'https://methods-market.clneu.com'

export function conceptReviewPath (moduleNum) {
  return `/class/statistics/practice?module=stats-module-${moduleNum}`
}

export function softwarePracticePath (moduleNum) {
  return `/class/statistics/software?module=stats-module-${moduleNum}`
}

export function classHomeTabPath (moduleNum, tab) {
  return `/class/statistics?module=stats-module-${moduleNum}&tab=${tab}`
}

export function fullUrl (path) {
  return `${METHODS_MARKET_BASE}${path}`
}

/** Modules 3–8 include software practice lessons; 1–2 are concept review only. */
export function moduleHasSoftwarePractice (moduleNum) {
  return moduleNum >= 3 && moduleNum <= 8
}

export function conceptReviewAssignment (moduleNum) {
  return {
    id: `m${moduleNum}-concept-review`,
    name: `Module ${moduleNum}: Concept Review (Methods Market)`,
    type: 'concept-review',
    methodsMarketPath: conceptReviewPath(moduleNum),
    tips: [
      'Sign in to Methods Market with your course profile so practice attempts are tracked.',
      'Answer every concept review question for this module — work until you understand each learning objective.',
      'Read the module Topics first if a question references vocabulary you have not seen yet.'
    ],
    getHelp:
      'Open the link below, complete Concept Review for this module, then mark the Canvas assignment complete. Use Assignment Help for other weekly work, or post in the module discussion / office hours if you are stuck on specific items.'
  }
}

export function softwarePracticeAssignment (moduleNum) {
  return {
    id: `m${moduleNum}-software-practice`,
    name: `Module ${moduleNum}: Software Practice (Methods Market)`,
    type: 'software-practice',
    methodsMarketPath: softwarePracticePath(moduleNum),
    tips: [
      'Set your preferred statistical software in Methods Market (Jamovi, SPSS, R, Excel, or Stata) before you start.',
      'For each lesson: complete Learn, then Practice, then Apply (finish all steps in the module).',
      'Your Canvas Jamovi assignments use the same datasets and skills — use Software Practice to prepare.'
    ],
    getHelp:
      'Open the link below and finish the Software Practice lessons for this module. If a step does not match your software, switch software in your profile or ask in office hours.'
  }
}

/** @returns {object[]} Canvas-aligned Methods Market practice rows for one stats module */
export function methodsMarketPracticeAssignments (moduleNum) {
  const rows = [conceptReviewAssignment(moduleNum)]
  if (moduleHasSoftwarePractice(moduleNum)) {
    rows.push(softwarePracticeAssignment(moduleNum))
  }
  return rows
}

/** All stats modules (1–8) with concept + software links for instructor Canvas setup. */
export const STATISTICS_MODULE_PRACTICE_LINKS = Array.from({ length: 8 }, (_, i) => {
  const n = i + 1
  return {
    moduleNumber: n,
    conceptReview: fullUrl(conceptReviewPath(n)),
    softwarePractice: moduleHasSoftwarePractice(n) ? fullUrl(softwarePracticePath(n)) : null
  }
})
