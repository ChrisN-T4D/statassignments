/**
 * Builds Canvas-ready HTML fragments for the Research Methods course from the shared outcomes data
 * and the Methods Market schedule, so Canvas and MM say the same thing.
 *
 *   node scripts/canvas-prep-rm.mjs [outDir]
 *
 * Writes (default docs/teaching/canvas-prep-rm-fa26/):
 *   01-course-objectives.html   course objectives + alignment table (objective x assignment)
 *   02-week-headers.html        one block per week: why this week, "By the end of this week you can"
 * Nothing here talks to Canvas. The course objectives are DRAFT until Chris approves them.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'
import { RESEARCH_METHODS_SCHEDULES } from '../src/data/researchMethodsSchedule.js'
import { objectives } from '../src/data/objectives.js'

const outDir = process.argv[2] || 'docs/teaching/canvas-prep-rm-fa26'
const dataFile = join(homedir(), 'openclaw-deploy/workspace/outcomes/courses/psyc-4223.json')
const course = JSON.parse(readFileSync(dataFile, 'utf8'))

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function courseObjectivesPage() {
  const clos = course.courseObjectives
  const rows = Object.values(course.assignments).filter((a) => a.supports.length)
  const head = clos.map((c) => `<th scope="col">${esc(c.id)}</th>`).join('')
  const body = rows
    .map((a) => `<tr><th scope="row">${esc(a.title)} (${a.points} pts)</th>${clos.map((c) => `<td>${a.supports.includes(c.id) ? 'Yes' : ''}</td>`).join('')}</tr>`)
    .join('\n')
  return `<h2>Course objectives</h2>
<p><em>Draft for instructor approval. By the end of this course you will be able to:</em></p>
<ol>
${clos.map((c) => `  <li><strong>${esc(c.id)}.</strong> ${esc(c.text)}</li>`).join('\n')}
</ol>
<h2>How the work in this course connects to the objectives</h2>
<p>Each graded assignment practices the objectives marked Yes. Weekly Concept Reviews in Methods Market practice the reading-based objectives listed for each week.</p>
<table>
  <caption>Course objectives practiced by each graded assignment</caption>
  <thead><tr><th scope="col">Assignment</th>${head}</tr></thead>
  <tbody>
${body}
  </tbody>
</table>
`
}

function weekHeadersPage() {
  const schedule = RESEARCH_METHODS_SCHEDULES['research-methods']
  const blocks = schedule.weeks.map((w, i) => {
    const mods = w.items.filter((it) => it.kind === 'chapter' && it.moduleId).map((it) => it.moduleId)
    const objs = [...new Set(mods)].flatMap((m) => objectives.filter((o) => o.moduleId === m))
    const unique = objs.filter((o, k) => objs.findIndex((x) => x.objectiveId === o.objectiveId) === k)
    return `<section>
  <h3>Week ${i + 1}: ${esc(w.title)}</h3>
${w.why ? `  <p>${esc(w.why)}</p>\n` : ''}${unique.length ? `  <p><strong>By the end of this week you can:</strong></p>\n  <ul>\n${unique.map((o) => `    <li>${esc(o.objective)}</li>`).join('\n')}\n  </ul>\n` : ''}</section>`
  })
  return `<!-- Week order follows the Methods Market schedule. Canvas currently runs chapters in a different order; decide one order first. -->\n${blocks.join('\n')}\n`
}

mkdirSync(outDir, { recursive: true })
writeFileSync(join(outDir, '01-course-objectives.html'), courseObjectivesPage())
writeFileSync(join(outDir, '02-week-headers.html'), weekHeadersPage())
console.log(`wrote 2 files to ${outDir}`)
