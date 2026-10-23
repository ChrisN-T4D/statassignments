/**
 * Week-by-week schedule for the Research Methods sequence.
 * research-methods (PSYC 4223, fall) -> experimental (PSYC 4233, spring).
 *
 * Fall covers Pressbooks chapters 1-8; spring covers 9-13. Dates are the Monday of each week.
 * Week item roles: read (chapter), do (the deliverable), help (assignment help page).
 * Dates marked `proposed` are placeholders to confirm with the instructor.
 */

/** @typedef {{ role: 'read'|'do'|'help', kind: 'chapter'|'study-plan'|'assignment-help'|'task'|'analysis'|'lab', label?: string, moduleId?: string, sectionId?: string, assignmentId?: string, due?: string, dueLabel?: string, note?: string }} ScheduleItem */

const FALL = {
  slug: 'research-methods',
  course: 'PSYC 4223',
  name: 'Fall 2026',
  title: 'Research Methods',
  weeks: [
    {
      start: '2026-08-17',
      title: 'Science of Psychology',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-1' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-syllabus-ack', label: 'Syllabus acknowledgment', due: '2026-08-21' }
      ]
    },
    {
      start: '2026-08-24',
      title: 'Scientific Method',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-2' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'rm-choose-groups', label: 'Choose groups', due: '2026-08-28' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-phase-1-workshop', label: 'Topic workshop' }
      ]
    },
    {
      start: '2026-08-31',
      title: 'Research ethics',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-3' },
        { role: 'do', kind: 'study-plan', sectionId: 'article-review', label: 'Article Review', due: '2026-09-04' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-article-review', label: 'Article review help' }
      ]
    },
    {
      start: '2026-09-07',
      title: 'Psychological measurement',
      note: 'No class Mon (Labor Day)',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-4' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'rm-theory-selection', label: 'Theory selection', due: '2026-09-11', note: 'A one-page paper: what you understand about your theory and why it applies to what you want to study.' }
      ]
    },
    {
      start: '2026-09-14',
      title: 'Experimental research',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-5' },
        { role: 'do', kind: 'study-plan', sectionId: 'study-focus', label: 'Lit review outline', due: '2026-09-18' }
      ]
    },
    {
      start: '2026-09-21',
      title: 'Non-experimental research',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-6' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'rm-lit-review-draft-1', label: 'Lit review draft 1', due: '2026-09-25' }
      ]
    },
    {
      start: '2026-09-28',
      title: 'Survey research',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-7' },
        { role: 'do', kind: 'task', label: 'AI peer review of draft 1 arrives', dueLabel: 'Week of Sep 28', note: 'You receive AI peer review feedback one week after turning in draft 1. Start revising.' }
      ]
    },
    {
      start: '2026-10-05',
      title: 'Quasi-experimental research',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-8' },
        { role: 'do', kind: 'lab', moduleId: 'rm-module-lab', label: 'Sampling lab (optional)', note: 'Optional: try random assignment and sampling hands-on before you choose your method next week.' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'rm-lit-review-final', label: 'Lit review final', due: '2026-10-09' }
      ]
    },
    {
      start: '2026-10-12',
      title: 'Method choice',
      note: 'Fall Break Fri',
      items: [
        { role: 'do', kind: 'study-plan', sectionId: 'phase-4', label: 'Method choice', dueLabel: 'Week of Oct 12' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-phase-4-worksheet', label: 'Method choice help' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-path-1-survey', label: 'Path 1: Survey' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-path-2-qualitative', label: 'Path 2: Qualitative' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-path-3-experimental', label: 'Path 3: Experimental' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-path-4-archival', label: 'Path 4: Archival' }
      ]
    },
    {
      start: '2026-10-19',
      title: 'Measures draft',
      items: [
        { role: 'do', kind: 'study-plan', sectionId: 'measures-draft', label: 'Measures draft', due: '2026-10-23', note: 'Build your survey or protocol from the operational definitions you chose in Method Choice.' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-measures-draft', label: 'Measures draft help' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-4', label: 'Revisit Ch. 4 Measurement' }
      ]
    },
    {
      start: '2026-10-26',
      title: 'IRB first draft',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'rm-irb-first-draft', label: 'IRB first draft', due: '2026-10-30' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-1', label: 'HRT lesson 1' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-2', label: 'HRT lesson 2' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-3', label: 'HRT lesson 3' }
      ]
    },
    {
      start: '2026-11-02',
      title: 'Methods section',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'rm-methods-section', label: 'Methods section', due: '2026-11-06' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-4', label: 'HRT lesson 4' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-5', label: 'HRT lesson 5' }
      ]
    },
    {
      start: '2026-11-09',
      title: 'IRB submission',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'rm-irb-final-draft', label: 'IRB submission', due: '2026-11-13' }
      ]
    },
    {
      start: '2026-11-16',
      title: 'IRB processing',
      items: [
        { role: 'do', kind: 'task', label: 'IRB processing log', due: '2026-11-20', note: 'Track approval status, next action, owner, and timeline.' }
      ]
    },
    {
      start: '2026-11-23',
      title: 'Thanksgiving week',
      note: 'Mon only; no class Wed or Fri',
      items: []
    },
    {
      start: '2026-11-30',
      title: 'Status update',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'rm-irb-status-update', label: 'IRB status update', due: '2026-12-04' }
      ]
    }
  ],
  phases: [
    { label: 'Topic', from: 0, to: 1 },
    { label: 'Articles', from: 2, to: 2 },
    { label: 'Theory', from: 3, to: 3 },
    { label: 'Literature review', from: 4, to: 7 },
    { label: 'Methods and measures', from: 8, to: 9 },
    { label: 'IRB', from: 10, to: 15 }
  ],
  /** `week` is the 0-based week the badge sits on; `dx` nudges it by a fraction of a week. */
  milestones: [
    { week: 2, icon: 'search', label: 'Article Review', dateLabel: 'Sep 4' },
    { week: 3, icon: 'bulb', label: 'Theory selection', dateLabel: 'Sep 11' },
    { week: 5, icon: 'doc', label: 'Lit review draft 1', dateLabel: 'Sep 25' },
    { week: 6, icon: 'ai', label: 'AI peer review back', dateLabel: 'Week of Sep 28' },
    { week: 7, icon: 'books', label: 'Lit review final', dateLabel: 'Oct 9' },
    { week: 8, icon: 'route', label: 'Method choice', dateLabel: 'Week of Oct 12' },
    { week: 9, icon: 'ruler', label: 'Measures draft', dateLabel: 'Oct 23' },
    { week: 10, icon: 'clip', label: 'IRB first draft', dateLabel: 'Oct 30' },
    { week: 12, icon: 'send', label: 'IRB submission', dateLabel: 'Nov 13' },
    { week: 15, icon: 'clock', label: 'IRB status update', dateLabel: 'Dec 4' }
  ],
  /** Weeks that carry a small amber diamond (progress reports). */
  minorWeeks: []
}

const SPRING = {
  slug: 'experimental',
  course: 'PSYC 4233',
  name: 'Spring 2027',
  title: 'Experimental Psychology',
  weeks: [
    {
      start: '2027-01-11',
      title: 'Descriptive statistics review',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-data-by-path', label: 'Ch. 12 Descriptive statistics' },
        { role: 'do', kind: 'task', label: 'IRB approval on file', due: '2027-01-14', note: 'Your approved IRB protocol must be on file before data collection starts.' }
      ]
    },
    {
      start: '2027-01-18',
      title: 'Inferential statistics review',
      note: 'No class Mon (MLK)',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-data-by-path', label: 'Ch. 13 Inferential statistics' },
        { role: 'do', kind: 'task', label: 'Everyone begins data collection', due: '2027-01-19', proposed: true }
      ]
    },
    {
      start: '2027-01-25',
      title: 'Factorial designs',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-9' },
        { role: 'do', kind: 'task', label: 'Progress Report 1', due: '2027-01-28' }
      ]
    },
    {
      start: '2027-02-01',
      title: 'Single-subject research',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-10' },
        { role: 'do', kind: 'task', label: 'Progress Report 2', due: '2027-02-04' }
      ]
    },
    {
      start: '2027-02-08',
      title: 'Presenting your research',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-11' },
        { role: 'do', kind: 'task', label: 'Progress Report 3', due: '2027-02-11' },
        { role: 'do', kind: 'task', label: 'Data collection ends', due: '2027-02-12', proposed: true }
      ]
    },
    {
      start: '2027-02-15',
      title: 'Poster work',
      items: [
        { role: 'do', kind: 'analysis', moduleId: 'rm-module-data-by-path', label: 'Analyze your data' },
        { role: 'do', kind: 'task', label: 'Progress Report 4: poster in progress', due: '2027-02-18' }
      ]
    },
    {
      start: '2027-02-22',
      title: 'Poster',
      items: [
        { role: 'do', kind: 'analysis', moduleId: 'rm-module-data-by-path', label: 'Analyze your data' },
        { role: 'do', kind: 'task', label: 'Poster PDF', due: '2027-02-25' }
      ]
    },
    {
      start: '2027-03-01',
      title: 'Oklahoma Research Day',
      items: [
        { role: 'do', kind: 'task', label: 'Present at Research Day', due: '2027-03-05', note: 'Salt Fork Event Center, Alva.' }
      ]
    },
    {
      start: '2027-03-08',
      title: 'Discussion and APA writing',
      items: [
        { role: 'do', kind: 'task', label: 'Manuscript writing', dueLabel: 'Ongoing', note: 'Use the discussion and APA sections of Chapter 11.' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-11', label: 'Revisit Ch. 11 Presenting your research' }
      ]
    },
    {
      start: '2027-03-15',
      title: 'Spring break',
      note: 'No class all week',
      items: []
    },
    {
      start: '2027-03-22',
      title: 'Manuscript draft',
      items: [
        { role: 'do', kind: 'task', label: 'Manuscript draft', due: '2027-03-25' }
      ]
    },
    {
      start: '2027-03-29',
      title: 'Peer-review workshop',
      items: [
        { role: 'do', kind: 'task', label: 'Peer-review workshop', due: '2027-03-30', note: 'Sample review and the reviewer form.' }
      ]
    },
    {
      start: '2027-04-05',
      title: 'Peer review',
      items: [
        { role: 'do', kind: 'task', label: 'Review your assigned manuscripts', dueLabel: 'Due next week' }
      ]
    },
    {
      start: '2027-04-12',
      title: 'Reviews due and returned',
      items: [
        { role: 'do', kind: 'task', label: 'Peer reviews due', due: '2027-04-13', note: 'Reviews are returned Thursday, Apr 15.' }
      ]
    },
    {
      start: '2027-04-19',
      title: 'Class talks',
      items: [
        { role: 'do', kind: 'task', label: 'Class talks', due: '2027-04-20', note: 'Talks Tue Apr 20 and Thu Apr 22.' }
      ]
    },
    {
      start: '2027-04-26',
      title: 'Revision',
      items: [
        { role: 'do', kind: 'task', label: 'Revision + response letter', due: '2027-04-29', note: 'Last talks Tue Apr 27.' }
      ]
    }
  ],
  phases: [
    { label: 'Approval', from: 0, to: 0 },
    { label: 'Data collection', from: 1, to: 4 },
    { label: 'Poster', from: 5, to: 7 },
    { label: 'Manuscript', from: 8, to: 10 },
    { label: 'Peer review', from: 11, to: 13 },
    { label: 'Talks, revision', from: 14, to: 15 }
  ],
  milestones: [
    { week: 0, icon: 'shield', label: 'IRB approval', dateLabel: 'Jan 14' },
    { week: 1, icon: 'flag', label: 'Everyone begins data collection', dateLabel: 'Jan 19', dx: -0.4 },
    { week: 4, icon: 'finish', label: 'Data collection ends', dateLabel: 'Feb 12', dx: 0.4 },
    { week: 6, icon: 'poster', label: 'Poster PDF', dateLabel: 'Feb 25' },
    { week: 7, icon: 'trophy', label: 'Research Day', dateLabel: 'Mar 5' },
    { week: 10, icon: 'doc', label: 'Manuscript draft', dateLabel: 'Mar 25' },
    { week: 13, icon: 'peers', label: 'Peer reviews', dateLabel: 'Apr 13' },
    { week: 14, icon: 'present', label: 'Class talks', dateLabel: 'Apr 20' },
    { week: 15, icon: 'reply', label: 'Revision + response letter', dateLabel: 'Apr 29' }
  ],
  minorWeeks: [2, 3, 4, 5]
}

export const RESEARCH_METHODS_SCHEDULES = {
  'research-methods': FALL,
  experimental: SPRING
}

export function getResearchMethodsSchedule (classSlug) {
  return RESEARCH_METHODS_SCHEDULES[classSlug] ?? null
}

/** Parse YYYY-MM-DD as local noon so DST and time zones never shift the day. */
export function parseScheduleDate (iso) {
  return new Date(`${iso}T12:00:00`)
}

export function addScheduleDays (date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

/** 0-based index of the week containing `today`, clamped to the first/last week. */
export function currentWeekIndex (schedule, today = new Date()) {
  let idx = 0
  schedule.weeks.forEach((w, i) => {
    if (today >= parseScheduleDate(w.start)) idx = i
  })
  return idx
}

/** 'before' | 'during' | 'after' relative to the semester. */
export function semesterPhase (schedule, today = new Date()) {
  const first = parseScheduleDate(schedule.weeks[0].start)
  const last = addScheduleDays(parseScheduleDate(schedule.weeks[schedule.weeks.length - 1].start), 6)
  if (today < first) return 'before'
  if (today > last) return 'after'
  return 'during'
}

/**
 * Index of the week that shows `moduleId`, or -1. Lab and analysis items win over a chapter that shares the same
 * module (Ch. 12-13 read inside the data-by-path module, but that module only opens in the analysis weeks).
 */
export function findWeekForModule (schedule, moduleId) {
  for (const kinds of [['lab', 'analysis'], ['chapter']]) {
    const idx = schedule.weeks.findIndex((w) =>
      w.items.some((it) => kinds.includes(it.kind) && it.moduleId === moduleId)
    )
    if (idx >= 0) return idx
  }
  return -1
}

/** Chapter items across the semester, each tagged with its week index (for the chapter library). */
export function chapterWeeks (schedule) {
  const out = []
  schedule.weeks.forEach((w, i) => {
    w.items.forEach((it) => {
      if (it.kind === 'chapter') out.push({ weekIndex: i, moduleId: it.moduleId, label: it.label })
    })
  })
  return out
}

/** Chapter number for a chapter item ("rm-module-9" or a "Ch. 12 ..." label), or null. */
export function chapterNumber (item) {
  const m = /^rm-module-(\d+)$/.exec(item.moduleId || '') || /^Ch\. (\d+)/.exec(item.label || '')
  return m ? Number(m[1]) : null
}

/** Week reference carried in `?from=` so reading/review pages know which week the student came from. */
export function weekRef (schedule, weekIndex) {
  return `${schedule.slug}.${weekIndex}`
}

export function parseWeekRef (ref) {
  const [slug, idx] = String(ref || '').split('.')
  const schedule = RESEARCH_METHODS_SCHEDULES[slug]
  const weekIndex = Number(idx)
  if (!schedule || !Number.isInteger(weekIndex) || !schedule.weeks[weekIndex]) return null
  return { schedule, weekIndex }
}

/** Week that lists chapter `n`: this week's if it is current, otherwise the first one. */
export function findChapterWeek (n, today = new Date()) {
  let first = null
  for (const schedule of Object.values(RESEARCH_METHODS_SCHEDULES)) {
    const current = semesterPhase(schedule, today) === 'during' ? currentWeekIndex(schedule, today) : -1
    for (let i = 0; i < schedule.weeks.length; i++) {
      if (!schedule.weeks[i].items.some((it) => it.kind === 'chapter' && chapterNumber(it) === n)) continue
      if (i === current) return { schedule, weekIndex: i }
      if (!first) first = { schedule, weekIndex: i }
    }
  }
  return first
}

/**
 * Does a schedule item represent `target`?
 * target: { kind: 'chapter', id: <chapter number> } | { kind: 'assignment-help', id } | { kind: 'study-plan', id } | { kind: 'lab' }
 */
export function itemMatches (item, target) {
  if (!target || item.kind !== target.kind) return false
  switch (target.kind) {
    case 'chapter': return chapterNumber(item) === target.id
    case 'assignment-help': return item.assignmentId === target.id
    case 'study-plan': return item.sectionId === target.id
    case 'lab': return true
    default: return false
  }
}

/**
 * Where does a page sit in the year? Prefers the week named by `from`, then the current week if it lists the
 * target, then the first week that lists it. With no target, falls back to the current week (or null).
 * @returns {{ schedule: object, weekIndex: number } | null}
 */
export function findTargetWeek (target, { from, today = new Date() } = {}) {
  const ref = parseWeekRef(from)
  if (ref && (!target || ref.schedule.weeks[ref.weekIndex].items.some((it) => itemMatches(it, target)))) return ref

  let first = null
  for (const schedule of Object.values(RESEARCH_METHODS_SCHEDULES)) {
    const current = semesterPhase(schedule, today) === 'during' ? currentWeekIndex(schedule, today) : -1
    if (!target) {
      if (current >= 0) return { schedule, weekIndex: current }
      continue
    }
    for (let i = 0; i < schedule.weeks.length; i++) {
      if (!schedule.weeks[i].items.some((it) => itemMatches(it, target))) continue
      if (i === current) return { schedule, weekIndex: i }
      if (!first) first = { schedule, weekIndex: i }
    }
  }
  return first
}

/**
 * When is a Study Plan section due, according to the schedule?
 * status: 'this-week' | 'upcoming' | 'past' | 'none' (not scheduled).
 * Dates are guidance; Canvas has the official due dates.
 * @returns {{ status: string, due: string|null, dueLabel: string|null, label: string|null, weekIndex: number|null, schedule: object|null }}
 */
export function studyPlanDue (sectionId, today = new Date()) {
  const none = { status: 'none', due: null, dueLabel: null, label: null, weekIndex: null, schedule: null }
  for (const schedule of Object.values(RESEARCH_METHODS_SCHEDULES)) {
    const weekIndex = schedule.weeks.findIndex((w) =>
      w.items.some((it) => it.kind === 'study-plan' && it.sectionId === sectionId)
    )
    if (weekIndex < 0) continue
    const item = schedule.weeks[weekIndex].items.find((it) => it.kind === 'study-plan' && it.sectionId === sectionId)
    const phase = semesterPhase(schedule, today)
    let status
    if (phase === 'after') status = 'past'
    else if (phase === 'before') status = 'upcoming'
    else {
      const current = currentWeekIndex(schedule, today)
      status = weekIndex === current ? 'this-week' : weekIndex < current ? 'past' : 'upcoming'
    }
    return { status, due: item.due ?? null, dueLabel: item.dueLabel ?? null, label: item.label ?? null, weekIndex, schedule }
  }
  return none
}

/** "Due Fri, Oct 23", "Week of Oct 12", or "" when the section is not scheduled. */
export function formatStudyPlanDue (info) {
  if (!info) return ''
  if (info.due) {
    const day = parseScheduleDate(info.due).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    return `Due ${day}`
  }
  return info.dueLabel || ''
}
