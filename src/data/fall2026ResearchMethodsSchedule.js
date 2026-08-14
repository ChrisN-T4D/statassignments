/**
 * Instructor / Canvas tooling — term-specific due dates, points, and syllabus HTML.
 * NOT shown in Methods Market UI. Students see dates in Canvas; Canvas links here for reading.
 */

import { PRESSBOOKS_CHAPTERS } from './researchMethodsTextbook.js'

export const FALL_2026_TERM = {
  label: 'Fall 2026',
  course: 'PSYC 4223 Research Methodology',
  classesBegin: '2026-08-17',
  laborDay: '2026-09-07',
  fallBreak: ['2026-10-15', '2026-10-16'],
  classesResumeAfterBreak: '2026-10-19',
  thanksgivingBreak: ['2026-11-25', '2026-11-27'],
  finalsWeek: '2026-12-08',
  semesterEnds: '2026-12-11',
  irbSubmissionTarget: '2026-11-13'
}

/**
 * @param {number | null} chapterNumber
 */
export function getPressbooksChapterMeta (chapterNumber) {
  if (chapterNumber == null) return null
  const ch = PRESSBOOKS_CHAPTERS.find((c) => c.number === chapterNumber)
  if (!ch) {
    return {
      number: chapterNumber,
      label: `Ch. ${chapterNumber}`,
      shortTitle: `Chapter ${chapterNumber}`,
      topicId: `rm-chapter-${chapterNumber}`,
      moduleId: `rm-module-${chapterNumber}`,
      pressbooksUrl: null
    }
  }
  return {
    number: ch.number,
    label: `Ch. ${ch.number}: ${ch.shortTitle}`,
    shortTitle: ch.shortTitle,
    title: ch.title,
    topicId: ch.topicId,
    moduleId: ch.moduleId,
    pressbooksUrl: ch.pressbooksUrl
  }
}

/**
 * Source of truth: one chapter per week (full chapter, not split across weeks).
 * @type {Array<{ week: number, dates: string, focus: string, chapterNumber: number | null, chapterGoal?: string, due: string[], note?: string }>}
 */
const WEEKLY_SCHEDULE_RAW = [
  {
    week: 1,
    dates: 'Aug 17–21',
    focus: 'Course intro & syllabus',
    chapterNumber: 1,
    chapterGoal: 'Why psychology is a science and how this course is organized.',
    due: ['Syllabus acknowledgement (Aug 21)', 'Ch. 1 intro reading (Aug 21)']
  },
  {
    week: 2,
    dates: 'Aug 24–28',
    focus: 'Phase 1 — choosing a topic',
    chapterNumber: 2,
    chapterGoal: 'Scientific method, generating ideas, and narrowing a research topic.',
    due: ['Phase 1 Workshop (Aug 28)', 'Groups formed (Aug 28)']
  },
  {
    week: 3,
    dates: 'Aug 31 – Sep 4',
    focus: 'Article reviews (in progress)',
    chapterNumber: 4,
    chapterGoal: 'Measurement — use this vocabulary when you read each article’s Method section.',
    due: []
  },
  {
    week: 4,
    dates: 'Sep 7–11',
    focus: 'Finish article reviews',
    chapterNumber: 5,
    chapterGoal: 'Experimental research — identify experimental vs non-experimental papers in your stack.',
    due: ['Article Review & Problem Statement (Sep 11)'],
    note: 'Labor Day Sep 7'
  },
  {
    week: 5,
    dates: 'Sep 14–18',
    focus: 'Literature review Draft 1 — week 1 of 2',
    chapterNumber: 6,
    chapterGoal: 'Non-experimental designs — describe qualitative and observational studies in your draft.',
    due: []
  },
  {
    week: 6,
    dates: 'Sep 21–25',
    focus: 'Literature review Draft 1 — week 2 of 2',
    chapterNumber: 7,
    chapterGoal: 'Survey research — describe survey and sampling choices in the literature you cite.',
    due: ['Literature Review Draft 1 (Sep 25)']
  },
  {
    week: 7,
    dates: 'Sep 28 – Oct 2',
    focus: 'Literature review Final — revision week 1',
    chapterNumber: 11,
    chapterGoal: 'APA style and presenting research — fix references and section structure in your draft.',
    due: []
  },
  {
    week: 8,
    dates: 'Oct 5–9',
    focus: 'Literature review Final — revision week 2',
    chapterNumber: 8,
    chapterGoal: 'Quasi-experimental designs — label quasi-experimental studies in your synthesis.',
    due: []
  },
  {
    week: 9,
    dates: 'Oct 12–16',
    focus: 'Literature review Final — revision week 3',
    chapterNumber: 3,
    chapterGoal: 'Research ethics — note ethical issues in prior studies you cite.',
    due: [],
    note: 'Fall break Oct 15–16'
  },
  {
    week: 10,
    dates: 'Oct 19–23',
    focus: 'Literature review Final due',
    chapterNumber: 9,
    chapterGoal: 'Factorial designs — compare multi-factor studies in your literature.',
    due: ['Literature Review Final (Oct 23)']
  },
  {
    week: 11,
    dates: 'Oct 26–30',
    focus: 'Phase 3 & 4 — question, hypothesis & methodology path',
    chapterNumber: 10,
    chapterGoal: 'Single-subject designs — choose and justify your group’s methodology path.',
    due: ['Phase 3 & 4 Worksheets (Oct 30)', 'HRT Lessons 1–3 (Oct 26–30)']
  },
  {
    week: 12,
    dates: 'Nov 2–6',
    focus: 'Methods section + IRB first draft',
    chapterNumber: 12,
    chapterGoal: 'Descriptive statistics — plan how you will summarize data in your Methods section.',
    due: ['Methods Section (Nov 6)', 'HRT Lessons 4–5 (Nov 2–4)', 'IRB First Draft (Nov 6)']
  },
  {
    week: 13,
    dates: 'Nov 9–13',
    focus: 'Submit to IRB',
    chapterNumber: 13,
    chapterGoal: 'Inferential statistics — state your analysis plan before IRB submission.',
    due: ['IRB Final Draft for IRB (Nov 13)']
  },
  {
    week: 14,
    dates: 'Nov 16–20',
    focus: 'IRB processing; plan data collection',
    chapterNumber: null,
    chapterGoal: 'No new chapter — revisit your path chapters (5–7) and Ch. 3 as needed.',
    due: []
  },
  {
    week: 15,
    dates: 'Nov 23–27',
    focus: 'Thanksgiving',
    chapterNumber: null,
    chapterGoal: 'No new chapter.',
    due: [],
    note: 'Thanksgiving break Nov 25–27'
  },
  {
    week: 16,
    dates: 'Nov 30 – Dec 4',
    focus: 'Capstone checkpoint',
    chapterNumber: null,
    chapterGoal: 'No new chapter — finalize IRB status and data-collection plan.',
    due: ['IRB Status Update & Detailed Plan (Dec 4)']
  }
]

function enrichWeek (row) {
  const chapter = getPressbooksChapterMeta(row.chapterNumber)
  return {
    ...row,
    chapter,
    readings: chapter
      ? `Complete ${chapter.label} (entire chapter this week)`
      : row.chapterGoal
  }
}

/** Enriched week-by-week schedule for UI and syllabus. */
export const SCHEDULE_WEEKS = WEEKLY_SCHEDULE_RAW.map(enrichWeek)

export const WEEKLY_CHAPTER_FOCUS = SCHEDULE_WEEKS

/** Each graded Canvas assignment is worth at least this many points. */
export const ASSIGNMENT_POINTS_FLOOR = 100

/**
 * Fall 2026 point values — every graded assignment is ≥ 100 pts; major milestones weighted higher.
 * Course total is the sum (~2,300 pts); Canvas shows percent correct per assignment.
 */
/** @type {Array<{ assignmentId: string, dueDate: string, points?: number, week: number, note?: string }>} */
export const ASSIGNMENT_DEADLINES = [
  { assignmentId: 'rm-ch1-intro', dueDate: '2026-08-21', week: 1, note: 'Complete with syllabus acknowledgement' },
  { assignmentId: 'rm-syllabus-ack', dueDate: '2026-08-21', points: 100, week: 1 },
  { assignmentId: 'rm-choose-groups', dueDate: '2026-08-28', week: 2, note: 'Form groups before workshop' },
  { assignmentId: 'rm-phase-1-workshop', dueDate: '2026-08-28', points: 100, week: 2 },
  { assignmentId: 'rm-article-review', dueDate: '2026-09-11', points: 200, week: 4 },
  { assignmentId: 'rm-lit-review-draft-1', dueDate: '2026-09-25', points: 100, week: 6, note: 'Outline + partial draft for instructor feedback' },
  { assignmentId: 'rm-lit-review-final', dueDate: '2026-10-23', points: 150, week: 10, note: 'Revised literature review after Draft 1 feedback' },
  { assignmentId: 'rm-phase-3-worksheet', dueDate: '2026-10-30', points: 100, week: 11, note: 'Same due date as Phase 4 — submit both together' },
  { assignmentId: 'rm-phase-4-worksheet', dueDate: '2026-10-30', points: 200, week: 11, note: 'Same due date as Phase 3 — unlocks method path guides' },
  { assignmentId: 'rm-methods-section', dueDate: '2026-11-06', points: 250, week: 12 },
  { assignmentId: 'rm-hrt-lesson-1', dueDate: '2026-10-26', points: 100, week: 11 },
  { assignmentId: 'rm-hrt-lesson-2', dueDate: '2026-10-28', points: 100, week: 11 },
  { assignmentId: 'rm-hrt-lesson-3', dueDate: '2026-10-30', points: 100, week: 11 },
  { assignmentId: 'rm-hrt-lesson-4', dueDate: '2026-11-02', points: 100, week: 12 },
  { assignmentId: 'rm-hrt-lesson-5', dueDate: '2026-11-04', points: 100, week: 12, note: 'Complete before IRB first draft' },
  { assignmentId: 'rm-irb-first-draft', dueDate: '2026-11-06', points: 100, week: 12, note: 'Instructor feedback before final IRB packet' },
  { assignmentId: 'rm-irb-final-draft', dueDate: '2026-11-13', points: 100, week: 13, note: 'Submit to NWOSU IRB' },
  { assignmentId: 'rm-irb-status-update', dueDate: '2026-12-04', points: 400, week: 16, note: 'Status + data-collection plan before finals' }
]

const deadlineByAssignmentId = Object.fromEntries(
  ASSIGNMENT_DEADLINES.map((d) => [d.assignmentId, d])
)

export function getDeadlineForAssignment (assignmentId) {
  return deadlineByAssignmentId[assignmentId] ?? null
}

export function getWeeklyFocusByWeek (weekNumber) {
  return SCHEDULE_WEEKS.find((w) => w.week === weekNumber) ?? null
}

export function formatDueDate (isoDate) {
  const d = new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
}

/**
 * Canvas assignment groups (PSYC 4223 course 2406) — mirror Methods Market canvasPart blocks.
 * Use these names when creating groups under Assignments → Add Assignment Group.
 */
export const CANVAS_ASSIGNMENT_GROUPS = [
  {
    id: 'part-1',
    groupName: 'Part 1 — Introduction & literature review',
    assignmentIds: [
      'rm-syllabus-ack',
      'rm-phase-1-workshop',
      'rm-article-review',
      'rm-lit-review-draft-1',
      'rm-lit-review-final'
    ]
  },
  {
    id: 'part-2',
    groupName: 'Part 2 — Question, design & methods',
    assignmentIds: [
      'rm-phase-3-worksheet',
      'rm-phase-4-worksheet',
      'rm-methods-section'
    ]
  },
  {
    id: 'part-3',
    groupName: 'Part 3 — Ethics, training & IRB',
    assignmentIds: [
      'rm-hrt-lesson-1',
      'rm-hrt-lesson-2',
      'rm-hrt-lesson-3',
      'rm-hrt-lesson-4',
      'rm-hrt-lesson-5',
      'rm-irb-first-draft',
      'rm-irb-final-draft',
      'rm-irb-status-update'
    ]
  }
]

/** Canvas assignment title by Methods Market assignment id (course 2406). */
export const CANVAS_ASSIGNMENT_TITLES = {
  'rm-syllabus-ack': 'Syllabus Acknowledgement',
  'rm-phase-1-workshop': 'Phase 1 Workshop',
  'rm-article-review': 'Article Review and Problem Statement',
  'rm-lit-review-draft-1': 'Literature Review Draft 1',
  'rm-lit-review-final': 'Literature Review Final / References Section',
  'rm-phase-3-worksheet': 'Phase 3 Worksheet',
  'rm-phase-4-worksheet': 'Phase 4 Worksheet',
  'rm-methods-section': 'Methods Section (Includes all appendices and literature review)',
  'rm-hrt-lesson-1': 'Human Research Training - Lesson 1',
  'rm-hrt-lesson-2': 'Human Research Training - Lesson 2',
  'rm-hrt-lesson-3': 'Human Research Training - Lesson 3',
  'rm-hrt-lesson-4': 'Human Research Training - Lesson 4',
  'rm-hrt-lesson-5': 'Human Research Training - Lesson 5',
  'rm-irb-first-draft': 'IRB First Draft for Feedback',
  'rm-irb-final-draft': 'IRB Final Draft for IRB',
  'rm-irb-status-update': 'IRB Status Update and Detailed Plan'
}

export function getCanvasGroupForAssignment (assignmentId) {
  return CANVAS_ASSIGNMENT_GROUPS.find((g) => g.assignmentIds.includes(assignmentId)) ?? null
}

export function getGradedPointsTotal () {
  return ASSIGNMENT_DEADLINES.reduce((sum, d) => sum + (d.points ?? 0), 0)
}

/** Points subtotal per Canvas assignment group (part-1, part-2, part-3). */
export function getPointsByCanvasGroup () {
  return CANVAS_ASSIGNMENT_GROUPS.map((group) => {
    const points = group.assignmentIds.reduce((sum, id) => {
      const row = deadlineByAssignmentId[id]
      return sum + (row?.points ?? 0)
    }, 0)
    return { ...group, points }
  })
}

/** Graded Canvas assignments grouped for Methods Market UI (matches Canvas assignment groups). */
export function getGradedCanvasAssignmentsByGroup () {
  return getPointsByCanvasGroup().map((group) => ({
    id: group.id,
    groupName: group.groupName,
    points: group.points,
    assignments: group.assignmentIds
      .map((id) => {
        const row = deadlineByAssignmentId[id]
        if (!row?.points) return null
        return {
          id,
          name: CANVAS_ASSIGNMENT_TITLES[id] ?? id,
          dueDate: row.dueDate,
          dueDateLabel: formatDueDate(row.dueDate),
          points: row.points,
          note: row.note
        }
      })
      .filter(Boolean)
  }))
}
