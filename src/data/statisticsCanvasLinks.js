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
    studyGuideLabel: 'Benchmark 1 Study Guide',
    studyGuidePdf: '/study-guides/benchmark-1-study-guide.pdf',
    practiceUrl: fullUrl(benchmarkPracticePath('benchmark-1')),
    helpUrl: fullUrl(benchmarkAssignmentHelpPath('benchmark-1'))
  },
  {
    slug: 'benchmark-2',
    title: 'Benchmark 2 (Modules 4–5)',
    modulesLabel: 'Chapters 4–5',
    moduleIds: ['stats-module-4', 'stats-module-5'],
    questionCount: 30,
    studyGuideLabel: 'Benchmark 2 Study Guide',
    studyGuidePdf: '/study-guides/benchmark-2-study-guide.pdf',
    practiceUrl: fullUrl(benchmarkPracticePath('benchmark-2')),
    helpUrl: fullUrl(benchmarkAssignmentHelpPath('benchmark-2'))
  },
  {
    slug: 'final-benchmark',
    title: 'Final Benchmark (Modules 6–8)',
    modulesLabel: 'Chapters 6–8',
    moduleIds: ['stats-module-6', 'stats-module-7', 'stats-module-8'],
    questionCount: 36,
    studyGuideLabel: 'Final Benchmark Study Guide',
    studyGuidePdf: '/study-guides/final-benchmark-study-guide.pdf',
    practiceUrl: fullUrl(benchmarkPracticePath('final-benchmark')),
    helpUrl: fullUrl(benchmarkAssignmentHelpPath('final-benchmark'))
  }
]

export function getStatisticsBenchmarkLink (slug) {
  return STATISTICS_BENCHMARK_LINKS.find((b) => b.slug === slug) ?? null
}

export function getBenchmarkStudyGuide (slug) {
  const bench = getStatisticsBenchmarkLink(slug)
  if (!bench?.studyGuidePdf) return null
  return {
    label: bench.studyGuideLabel || `${bench.title} Study Guide`,
    pdfPath: bench.studyGuidePdf
  }
}

/** Shared copy for benchmark practice cards (Class Home, practice intro, Assignment Help). */
export function getBenchmarkCardGuidance (slug) {
  const gradedLabel =
    slug === 'final-benchmark'
      ? 'Final Benchmark'
      : slug === 'benchmark-2'
        ? 'Benchmark 2'
        : 'Benchmark 1'
  return {
    retakeNote:
      'You may take this practice test as many times as you want. Each attempt draws a new random sample and updates your mastery profile.',
    proctorNote: `Practice without notes, textbook, or other help. Your graded ${gradedLabel} in Canvas is proctored (LockDown Browser) with no aids allowed on the real exam.`,
    offlineNote:
      'Offline primary: download the study guide, print the practice packet, work without internet, then enter all answers at once when you are back online.'
  }
}

export function benchmarkPracticeAssignment (slug) {
  const bench = getStatisticsBenchmarkLink(slug)
  if (!bench) return null
  const guidance = getBenchmarkCardGuidance(slug)
  return {
    id: slug,
    name: `${bench.title} (Methods Market)`,
    type: 'benchmark',
    methodsMarketPath: benchmarkPracticePath(slug),
    tips: [
      guidance.retakeNote,
      guidance.proctorNote,
      guidance.offlineNote,
      `Download the ${bench.studyGuideLabel || 'study guide'} (PDF) from Class Home or Assignment Help before you practice.`,
      `Covers ${bench.modulesLabel}: complete Concept Review for those modules before the benchmark.`,
      `You will get ${bench.questionCount} questions; harder topics appear more often if practice data shows you are still learning them.`,
      'Each answer updates your mastery model. At the end you get a score, strengths/weaknesses by module, and review links.'
    ],
    getHelp:
      'Open the benchmark practice test below after finishing Concept Review for the listed modules. Sign in and link your student key so practice is tracked. The graded Canvas benchmark is separate and proctored.'
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

export function samplingMethodsLabPath (moduleNum = 6) {
  return classHomeTabPath(moduleNum, 'lab-sampling-methods')
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
    softwarePractice: moduleHasSoftwarePractice(n) ? fullUrl(softwarePracticePath(n)) : null,
    samplingMethodsLab: n === 6 ? fullUrl(samplingMethodsLabPath(6)) : null,
  }
})
