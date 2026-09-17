#!/usr/bin/node
/**
 * List PSYC 4213 Statistics Canvas assignments for online (3177) and in-person (2405).
 * Highlights Methods Market rows vs legacy jamovi / "Turn In" titles.
 *
 * Usage:
 *   CANVAS_TOKEN=... node scripts/list-canvas-statistics-assignments.mjs
 *   CANVAS_TOKEN=... node scripts/list-canvas-statistics-assignments.mjs --course=3177
 */
import { canvasListAll } from './lib/canvasApi.js'
import {
  CANVAS_STATISTICS_ONLINE_COURSE_ID,
  CANVAS_STATISTICS_INPERSON_COURSE_ID
} from '../src/data/statisticsCanvasLinks.js'
import {
  conceptReviewAssignmentName,
  softwarePracticeAssignmentName,
  isLegacySoftwareAssignment,
  findModuleForNumber
} from './lib/canvasStatisticsCleanup.mjs'

const courseArg = process.argv.find((a) => a.startsWith('--course='))
const courseFilter = courseArg ? Number(courseArg.split('=')[1]) : null

const COURSE_IDS = [
  CANVAS_STATISTICS_ONLINE_COURSE_ID,
  CANVAS_STATISTICS_INPERSON_COURSE_ID
].filter(Boolean).filter((id) => !courseFilter || id === courseFilter)

async function listCourse (courseId) {
  console.log(`\n=== Course ${courseId} ===`)
  const assignments = await canvasListAll(`/courses/${courseId}/assignments`, {
    include: ['submission']
  })
  const modules = await canvasListAll(`/courses/${courseId}/modules`)

  const mm = assignments.filter((a) => /methods market/i.test(a.name || ''))
  const legacy = assignments.filter((a) => isLegacySoftwareAssignment(a.name))
  const publishedLegacy = legacy.filter((a) => a.published !== false)

  console.log(`\nMethods Market assignments (${mm.length}):`)
  for (const a of mm.sort((x, y) => (x.name || '').localeCompare(y.name || ''))) {
    console.log(`  [${a.published === false ? 'UNPUBLISHED' : 'published'}] ${a.id}  ${a.name}`)
  }

  console.log(`\nLegacy software / turn-in (${legacy.length}, ${publishedLegacy.length} still published):`)
  for (const a of legacy.sort((x, y) => (x.name || '').localeCompare(y.name || ''))) {
    console.log(`  [${a.published === false ? 'UNPUBLISHED' : 'PUBLISHED'}] ${a.id}  ${a.name}`)
  }

  console.log('\nModule 3 module-item check:')
  const mod3 = findModuleForNumber(modules, 3)
  if (!mod3) {
    console.log('  No Canvas module matching "Module 3"')
    return
  }
  const items = await canvasListAll(`/courses/${courseId}/modules/${mod3.id}/items`)
  console.log(`  Module: ${mod3.name} (${mod3.id})`)
  for (const item of items) {
    const linked = assignments.find((a) => String(a.id) === String(item.content_id))
    console.log(`    - ${item.title} [${item.type}]${linked ? ` -> assignment ${linked.id} (${linked.published === false ? 'unpublished' : 'published'})` : ''}`)
  }

  const wantCr = conceptReviewAssignmentName(3)
  const wantSp = softwarePracticeAssignmentName(3)
  const cr = assignments.find((a) => a.name === wantCr)
  const sp = assignments.find((a) => a.name === wantSp)
  const crInMod = cr && items.some((i) => String(i.content_id) === String(cr.id))
  const spInMod = sp && items.some((i) => String(i.content_id) === String(sp.id))
  console.log(`\n  Expected "${wantCr}": ${cr ? `id ${cr.id}` : 'MISSING'}${crInMod ? ' (in module)' : cr ? ' (NOT in module)' : ''}`)
  console.log(`  Expected "${wantSp}": ${sp ? `id ${sp.id}` : 'MISSING'}${spInMod ? ' (in module)' : sp ? ' (NOT in module)' : ''}`)
}

async function main () {
  if (!process.env.CANVAS_TOKEN) {
    console.error('CANVAS_TOKEN is not set')
    process.exit(1)
  }
  if (!COURSE_IDS.length) {
    console.error('No course IDs configured')
    process.exit(1)
  }
  for (const id of COURSE_IDS) {
    await listCourse(id)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
