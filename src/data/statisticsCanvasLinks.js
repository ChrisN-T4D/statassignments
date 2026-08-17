/**
 * Deep links for PSYC 4213 Statistics — Concept Review & Software Practice in Methods Market.
 * Paste full URLs into Canvas assignments (External Tool or URL submission).
 */

export const METHODS_MARKET_BASE = 'https://methods-market.clneu.com'
export const STATISTICS_CLASS = 'statistics'
/** Graded online section — source shell for copy. */
export const CANVAS_STATISTICS_ONLINE_COURSE_ID = 3177
/** In-person section shell — set after you create/find the course; used by copy script. */
export const CANVAS_STATISTICS_INPERSON_COURSE_ID = 2405
/** @deprecated use CANVAS_STATISTICS_ONLINE_COURSE_ID */
export const CANVAS_STATISTICS_COURSE_ID = CANVAS_STATISTICS_ONLINE_COURSE_ID
export const CANVAS_STATISTICS_ASSIGNMENT_HELP_URL =
  `${METHODS_MARKET_BASE}/class/statistics/assignment-help`

export function benchmarkPracticePath (slug) {
  return `/class/${STATISTICS_CLASS}/assignment-help/${slug}/practice`
}

export function benchmarkAssignmentHelpPath (slug) {
  return `/class/${STATISTICS_CLASS}/assignment-help/${slug}`
}

export function fullUrl (path) {
  return `${METHODS_MARKET_BASE}${path}`
}

/** Benchmark practice tests (formative; modules 1–3, 4–6, 7–8). */
export const STATISTICS_BENCHMARK_LINKS = [
  {
    slug: 'benchmark-1',
    title: 'Benchmark 1 (Modules 1–3)',
    modulesLabel: 'Chapters 1–3',
    moduleIds: ['stats-module-1', 'stats-module-2', 'stats-module-3'],
    questionCount: 15,
    practiceUrl: fullUrl(benchmarkPracticePath('benchmark-1')),
    helpUrl: fullUrl(benchmarkAssignmentHelpPath('benchmark-1'))
  },
  {
    slug: 'benchmark-2',
    title: 'Benchmark 2 (Modules 4–5)',
    modulesLabel: 'Chapters 4–5',
    moduleIds: ['stats-module-4', 'stats-module-5'],
    questionCount: 30,
    practiceUrl: fullUrl(benchmarkPracticePath('benchmark-2')),
    helpUrl: fullUrl(benchmarkAssignmentHelpPath('benchmark-2'))
  },
  {
    slug: 'final-benchmark',
    title: 'Final Benchmark (Modules 6–8)',
    modulesLabel: 'Chapters 6–8',
    moduleIds: ['stats-module-6', 'stats-module-7', 'stats-module-8'],
    questionCount: 36,
    practiceUrl: fullUrl(benchmarkPracticePath('final-benchmark')),
    helpUrl: fullUrl(benchmarkAssignmentHelpPath('final-benchmark'))
  }
]

export function getStatisticsBenchmarkLink (slug) {
  return STATISTICS_BENCHMARK_LINKS.find((b) => b.slug === slug) ?? null
}

export function benchmarkPracticeAssignment (slug) {
  const bench = getStatisticsBenchmarkLink(slug)
  if (!bench) return null
  return {
    id: slug,
    name: `${bench.title} (Methods Market)`,
    type: 'benchmark',
    methodsMarketPath: benchmarkPracticePath(slug),
    tips: [
      `Covers ${bench.modulesLabel}: complete Concept Review for those modules before the benchmark.`,
      `You will get ${bench.questionCount} questions; harder topics appear more often if practice data shows you are still learning them.`,
      'At the end you get a score and links to review topics you missed.'
    ],
    getHelp:
      'Open the benchmark below after finishing Concept Review for the listed modules. Sign in and link your student key so practice is tracked. Canvas records completion; your score is shown in Methods Market when you finish.'
  }
}

export function conceptReviewPath (moduleNum) {
  return `/class/statistics/practice?module=stats-module-${moduleNum}`
}

export function softwarePracticePath (moduleNum) {
  return `/class/statistics/software?module=stats-module-${moduleNum}`
}

export function classHomeTabPath (moduleNum, tab) {
  return `/class/statistics?module=stats-module-${moduleNum}&tab=${tab}`
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
      'Work Concept Review until each learning objective is mastered (at least two items per objective). Offline-primary students print the packet, enter answers once, then save the slip.',
      'When you finish, print or save the completion slip and upload it to this Canvas assignment for credit.'
    ],
    getHelp:
      'Open the link below, complete Concept Review for this module, then print or save the completion slip and upload it to Canvas. Use Assignment Help for other weekly work, or post in the module discussion / office hours if you are stuck on specific items.'
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
      'Complete Learn (I do) and Practice (We do). For Apply (You do), record with Tools and upload the video to Canvas.',
      'The You do recording is the Canvas deliverable. There is no slip for Software Practice.'
    ],
    getHelp:
      'Open Software Practice for this module. Finish I do and We do, record You do (Tools or phone), then upload the video to the Canvas Software Practice assignment.'
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
