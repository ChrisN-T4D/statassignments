#!/usr/bin/env node
/**
 * Consolidate PSYC 4213 in-person (2405) assignment groups WITHOUT Canvas group weights.
 * Keeps Benchmarks / Assignments / Discussions for organization only.
 * Always leaves apply_assignment_group_weights = false.
 *
 * Usage:
 *   $env:CANVAS_TOKEN = 'your-token'
 *   node scripts/weight-canvas-statistics-inperson.mjs          # dry-run
 *   node scripts/weight-canvas-statistics-inperson.mjs --apply
 */
import { canvasApi, canvasListAll, sleep } from './lib/canvasApi.js'
import { CANVAS_STATISTICS_INPERSON_COURSE_ID } from '../src/data/statisticsCanvasLinks.js'

const COURSE_ID = CANVAS_STATISTICS_INPERSON_COURSE_ID
const apply = process.argv.includes('--apply')

/** Group names to keep (organizational only; weights stay 0). */
const GROUP_NAMES = ['Benchmarks', 'Assignments', 'Discussions']

function classify (assignment) {
  const name = (assignment.name || '').toLowerCase()
  const types = assignment.submission_types || []
  if (
    name.includes('benchmark') ||
    name.includes('week 7 practice') ||
    (assignment.is_quiz_assignment && name.includes('practice'))
  ) {
    if (name.includes('week 7 practice')) return 'Assignments'
    return 'Benchmarks'
  }
  if (types.includes('discussion_topic') || name.includes('discussion')) {
    return 'Discussions'
  }
  if (name.includes('introduction')) return 'Discussions'
  return 'Assignments'
}

async function ensureGroup (existingByName, name) {
  if (existingByName.has(name)) {
    const g = existingByName.get(name)
    if (apply) {
      await canvasApi('PUT', `/courses/${COURSE_ID}/assignment_groups/${g.id}`, {
        name,
        group_weight: 0
      })
    }
    console.log(`group ${g.id}  ${name}  weight -> 0 (unweighted)`)
    return g.id
  }
  if (!apply) {
    console.log(`[dry-run] create group ${name} weight 0`)
    return null
  }
  const created = await canvasApi('POST', `/courses/${COURSE_ID}/assignment_groups`, {
    name,
    group_weight: 0
  })
  console.log(`created group ${created.id}  ${name}  weight 0`)
  existingByName.set(name, created)
  return created.id
}

async function main () {
  if (!COURSE_ID) {
    console.error('CANVAS_STATISTICS_INPERSON_COURSE_ID is not set')
    process.exit(1)
  }

  const groups = await canvasListAll(`/courses/${COURSE_ID}/assignment_groups`)
  const byName = new Map(groups.map((g) => [g.name, g]))
  const assignments = await canvasListAll(`/courses/${COURSE_ID}/assignments`)

  console.log(
    apply
      ? `APPLY unweighted groups — course ${COURSE_ID}\n`
      : `DRY-RUN unweighted groups — course ${COURSE_ID}\n`
  )

  const ids = {}
  for (const name of GROUP_NAMES) {
    ids[name] = await ensureGroup(byName, name)
    await sleep(100)
  }

  const moves = { Benchmarks: 0, Assignments: 0, Discussions: 0 }
  for (const a of assignments) {
    if (a.points_possible == null || Number(a.points_possible) <= 0) continue
    const cat = classify(a)
    const targetId = ids[cat]
    moves[cat]++
    if (!apply || !targetId) {
      console.log(`  ${a.id} -> ${cat}: ${a.name}`)
      continue
    }
    if (a.assignment_group_id === targetId) continue
    await canvasApi('PUT', `/courses/${COURSE_ID}/assignments/${a.id}`, {
      assignment: { assignment_group_id: targetId }
    })
    console.log(`moved ${a.id} -> ${cat}: ${a.name}`)
    await sleep(120)
  }

  console.log('\nCounts by category:', moves)

  if (apply) {
    await canvasApi('PUT', `/courses/${COURSE_ID}`, {
      course: { apply_assignment_group_weights: false }
    })
    console.log('Ensured apply_assignment_group_weights = false')

    const after = await canvasListAll(`/courses/${COURSE_ID}/assignments`)
    const used = new Set(after.map((a) => a.assignment_group_id))
    const keep = new Set(Object.values(ids))
    const allGroups = await canvasListAll(
      `/courses/${COURSE_ID}/assignment_groups`
    )
    for (const g of allGroups) {
      if (keep.has(g.id)) continue
      if (used.has(g.id)) {
        console.log('keep non-empty leftover group', g.id, g.name)
        continue
      }
      try {
        await canvasApi(
          'DELETE',
          `/courses/${COURSE_ID}/assignment_groups/${g.id}`
        )
        console.log('deleted empty group', g.id, g.name)
      } catch (err) {
        console.log('skip delete group', g.id, err.message)
      }
      await sleep(80)
    }
  } else {
    console.log('\nRe-run with --apply to mutate.')
  }
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
