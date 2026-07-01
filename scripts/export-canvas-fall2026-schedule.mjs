/**
 * Print Fall 2026 PSYC 4223 schedule for pasting into Canvas (syllabus / schedule page).
 * Run: node scripts/export-canvas-fall2026-schedule.mjs
 */
import {
  SCHEDULE_WEEKS,
  ASSIGNMENT_DEADLINES,
  FALL_2026_TERM,
  CANVAS_ASSIGNMENT_TITLES,
  ASSIGNMENT_POINTS_FLOOR,
  formatDueDate,
  getGradedPointsTotal,
  getPointsByCanvasGroup
} from '../src/data/fall2026ResearchMethodsSchedule.js'

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
  '<a href="https://methods-market.clneu.com/class/research-methods">Methods Market course home</a> · ' +
  '<a href="https://methods-market.clneu.com/class/research-methods/assignment-help">Assignment help</a></p>')

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

console.log('<h3>Grading (each assignment ≥ ' + ASSIGNMENT_POINTS_FLOOR + ' pts; course total ' +
  getGradedPointsTotal() + ' pts)</h3>')
console.log('<p>Every graded assignment is worth <strong>at least ' + ASSIGNMENT_POINTS_FLOOR +
  ' points</strong> in Canvas; larger milestones use higher caps. Set each value under <strong>Edit assignment → Points</strong>.</p>')
for (const group of getPointsByCanvasGroup()) {
  console.log(`<h4>${esc(group.groupName)} — ${group.points} pts</h4><ul>`)
  for (const id of group.assignmentIds) {
    const title = CANVAS_ASSIGNMENT_TITLES[id]
    const row = ASSIGNMENT_DEADLINES.find((d) => d.assignmentId === id)
    if (!title || !row?.points) continue
    console.log(`<li>${esc(title)} — <strong>${row.points} pts</strong></li>`)
  }
  console.log('</ul>')
}

console.log('<h3>Assignment due dates (Canvas)</h3><ul>')
for (const d of ASSIGNMENT_DEADLINES) {
  if (!d.points && !CANVAS_ASSIGNMENT_TITLES[d.assignmentId]) continue
  const title = CANVAS_ASSIGNMENT_TITLES[d.assignmentId]
  if (!title) continue
  const pts = d.points ? ` (${d.points} pts)` : ''
  console.log(`<li><strong>${esc(title)}</strong> — ${formatDueDate(d.dueDate)}${pts}</li>`)
}
console.log('</ul>')

console.log('<h3>Assignment groups (Canvas)</h3>')
console.log('<p>Organize graded work under <strong>Assignments → Add Assignment Group</strong> using these three groups (matches Methods Market Parts 1–3). Point subtotals sum to ' +
  getGradedPointsTotal() + '.</p>')
for (const group of getPointsByCanvasGroup()) {
  console.log(`<h4>${esc(group.groupName)} (${group.points} pts)</h4><ul>`)
  for (const id of group.assignmentIds) {
    const title = CANVAS_ASSIGNMENT_TITLES[id]
    if (!title) continue
    console.log(`<li>${esc(title)}</li>`)
  }
  console.log('</ul>')
}

console.log('\n<!-- Canvas assignment due-date checklist (instructor) -->')
for (const d of ASSIGNMENT_DEADLINES) {
  const title = CANVAS_ASSIGNMENT_TITLES[d.assignmentId]
  if (!title) continue
  const pts = d.points ? ` (${d.points} pts)` : ''
  console.log(`<!-- ${title}: ${d.dueDate}${pts} -->`)
}
