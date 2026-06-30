/**
 * Print Fall 2026 PSYC 4223 schedule for pasting into Canvas (syllabus / schedule page).
 * Run: node scripts/export-canvas-fall2026-schedule.mjs
 */
import {
  SCHEDULE_WEEKS,
  ASSIGNMENT_DEADLINES,
  FALL_2026_TERM,
  formatDueDate
} from '../src/data/fall2026ResearchMethodsSchedule.js'

/** Canvas assignment titles as they appear in PSYC 4223 (course 2406). */
export const CANVAS_ASSIGNMENT_TITLES = {
  'rm-syllabus-ack': 'Syllabus Acknowledgement',
  'rm-phase-1-workshop': 'Phase 1 Workshop',
  'rm-article-review': 'Article Review and Problem Statement',
  'rm-lit-review-draft-1': 'Literature Review Draft 1',
  'rm-lit-review-final': 'Literature Review/References Section',
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

function esc (s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

console.log('<h2>Fall 2026 Weekly Schedule — PSYC 4223</h2>')
console.log(`<p>Classes begin ${formatDueDate(FALL_2026_TERM.classesBegin)}. ` +
  `<strong>IRB Final Draft to IRB: ${formatDueDate(FALL_2026_TERM.irbSubmissionTarget)}.</strong> ` +
  'Complete <strong>one full Pressbooks chapter per week</strong> in Methods Market (reading + Concept Review). ' +
  '<a href="https://methods-market-production.up.railway.app/class/research-methods">Methods Market course home</a> · ' +
  '<a href="https://methods-market-production.up.railway.app/class/research-methods/assignment-help">Assignment help</a></p>')

console.log('<table border="1" cellpadding="6" cellspacing="0" style="border-collapse:collapse;width:100%;max-width:900px;">')
console.log('<thead><tr><th>Week</th><th>Dates</th><th>Methods Market chapter (complete this week)</th><th>Course focus</th><th>Due in Canvas</th></tr></thead><tbody>')

for (const row of SCHEDULE_WEEKS) {
  const ch = row.chapter ? esc(row.chapter.label) : '—'
  const due = row.due.length ? row.due.map(esc).join('<br>') : '—'
  console.log(`<tr><td>${row.week}</td><td>${esc(row.dates)}</td><td><strong>${ch}</strong>` +
    (row.chapterGoal ? `<br><em>${esc(row.chapterGoal)}</em>` : '') +
    `</td><td>${esc(row.focus)}${row.note ? `<br><em>${esc(row.note)}</em>` : ''}</td><td>${due}</td></tr>`)
}

console.log('</tbody></table>')

console.log('<h3>Assignment due dates (Canvas)</h3><ul>')
for (const d of ASSIGNMENT_DEADLINES) {
  if (!d.points && !CANVAS_ASSIGNMENT_TITLES[d.assignmentId]) continue
  const title = CANVAS_ASSIGNMENT_TITLES[d.assignmentId]
  if (!title) continue
  const pts = d.points ? ` (${d.points} pts)` : ''
  console.log(`<li><strong>${esc(title)}</strong> — ${formatDueDate(d.dueDate)}${pts}</li>`)
}
console.log('</ul>')

console.log('\n<!-- Canvas assignment due-date checklist (instructor) -->')
console.log('<!-- Split Literature Review into Draft 1 and Final if not already done. -->')
for (const d of ASSIGNMENT_DEADLINES) {
  const title = CANVAS_ASSIGNMENT_TITLES[d.assignmentId]
  if (!title) continue
  console.log(`<!-- ${title}: ${d.dueDate} -->`)
}
