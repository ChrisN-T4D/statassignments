/**
 * Fall 2026 PSYC 4223 — NWOSU Research Methodology capstone schedule.
 * One Pressbooks chapter per week — complete the full chapter (read + Concept Review).
 * Anchor: IRB Final Draft submitted to the IRB Nov 13.
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

/** @type {Array<{ assignmentId: string, dueDate: string, points?: number, week: number, note?: string }>} */
export const ASSIGNMENT_DEADLINES = [
  { assignmentId: 'rm-ch1-intro', dueDate: '2026-08-21', week: 1, note: 'Complete with syllabus acknowledgement' },
  { assignmentId: 'rm-syllabus-ack', dueDate: '2026-08-21', points: 5, week: 1 },
  { assignmentId: 'rm-choose-groups', dueDate: '2026-08-28', week: 2, note: 'Form groups before workshop' },
  { assignmentId: 'rm-phase-1-workshop', dueDate: '2026-08-28', points: 10, week: 2 },
  { assignmentId: 'rm-article-review', dueDate: '2026-09-11', points: 50, week: 4 },
  { assignmentId: 'rm-lit-review-draft-1', dueDate: '2026-09-25', points: 8, week: 6, note: 'Outline + partial draft for instructor feedback' },
  { assignmentId: 'rm-lit-review-final', dueDate: '2026-10-23', points: 12, week: 10, note: 'Revised literature review after Draft 1 feedback' },
  { assignmentId: 'rm-phase-3-worksheet', dueDate: '2026-10-30', points: 10, week: 11, note: 'Same due date as Phase 4 — submit both together' },
  { assignmentId: 'rm-phase-4-worksheet', dueDate: '2026-10-30', points: 50, week: 11, note: 'Same due date as Phase 3 — unlocks method path guides' },
  { assignmentId: 'rm-methods-section', dueDate: '2026-11-06', points: 20, week: 12 },
  { assignmentId: 'rm-hrt-lesson-1', dueDate: '2026-10-26', points: 10, week: 11 },
  { assignmentId: 'rm-hrt-lesson-2', dueDate: '2026-10-28', points: 10, week: 11 },
  { assignmentId: 'rm-hrt-lesson-3', dueDate: '2026-10-30', points: 10, week: 11 },
  { assignmentId: 'rm-hrt-lesson-4', dueDate: '2026-11-02', points: 10, week: 12 },
  { assignmentId: 'rm-hrt-lesson-5', dueDate: '2026-11-04', points: 10, week: 12, note: 'Complete before IRB first draft' },
  { assignmentId: 'rm-irb-first-draft', dueDate: '2026-11-06', points: 5, week: 12, note: 'Instructor feedback before final IRB packet' },
  { assignmentId: 'rm-irb-final-draft', dueDate: '2026-11-13', points: 5, week: 13, note: 'Submit to NWOSU IRB' },
  { assignmentId: 'rm-irb-status-update', dueDate: '2026-12-04', points: 150, week: 16, note: 'Status + data-collection plan before finals' }
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
