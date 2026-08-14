#!/usr/bin/node
/**
 * Create/update PSYC 4213 Methods Market Canvas assignments (Concept Review slip,
 * Software Practice You do recording) on 3177 and 2405.
 *
 * Usage:
 *   $env:CANVAS_TOKEN = '...'
 *   node scripts/sync-canvas-statistics-mm-assignments.mjs          # dry-run
 *   node scripts/sync-canvas-statistics-mm-assignments.mjs --apply
 */
import { canvasApi, canvasListAll } from './lib/canvasApi.js'
import {
  CANVAS_STATISTICS_ONLINE_COURSE_ID,
  CANVAS_STATISTICS_INPERSON_COURSE_ID,
  fullUrl,
  conceptReviewPath,
  softwarePracticePath
} from '../src/data/statisticsCanvasLinks.js'

const apply = process.argv.includes('--apply')
const COURSE_IDS = [
  CANVAS_STATISTICS_ONLINE_COURSE_ID,
  CANVAS_STATISTICS_INPERSON_COURSE_ID
].filter(Boolean)

const JAMOVI_NAME_RE =
  /jamovi|screen record|video of jamovi|week 8\s*&\s*9|week 11 part|week 12:|week 15 assignment/i

function conceptDescription(n) {
  const url = fullUrl(conceptReviewPath(n))
  return (
    `<p>Complete <strong>Concept Review</strong> in Methods Market, then upload the <strong>completion slip</strong> here for credit.</p>` +
    `<p><a href="${url}">Open Module ${n} Concept Review</a></p>` +
    `<p>Online primary: answer the questions in Methods Market. Offline primary: print the packet, then use Enter answers. Print / Save PDF the slip (student key, module, score) and upload that file.</p>` +
    `<p>Due dates and points are only in Canvas.</p>`
  )
}

function softwareDescription(n) {
  const url = fullUrl(softwarePracticePath(n))
  return (
    `<p>Complete Software Practice <strong>I do</strong> and <strong>We do</strong> in Methods Market (or the print packet). Record <strong>You do</strong> with Tools (or your phone) and upload the <strong>video</strong> here. You do does not use a slip.</p>` +
    `<p><a href="${url}">Open Module ${n} Software Practice</a></p>` +
    `<p>Canvas accepts the Tools .webm download or a phone .mp4.</p>`
  )
}

function wantedAssignments() {
  const rows = []
  for (let n = 1; n <= 8; n++) {
    rows.push({
      name: `Module ${n}: Concept Review (Methods Market)`,
      description: conceptDescription(n),
      points: 10
    })
  }
  for (let n = 3; n <= 8; n++) {
    rows.push({
      name: `Module ${n}: Software Practice (Methods Market)`,
      description: softwareDescription(n),
      points: 20
    })
  }
  return rows
}

async function ensureGroup(courseId, groups, name) {
  const existing = groups.find((g) => g.name === name)
  if (existing) return existing.id
  if (!apply) {
    console.log(`[dry-run] course ${courseId} create group ${name}`)
    return null
  }
  const created = await canvasApi('POST', `/courses/${courseId}/assignment_groups`, { name })
  console.log(`course ${courseId} created group ${created.id} ${name}`)
  groups.push(created)
  return created.id
}

async function syncCourse(courseId) {
  console.log(`\n=== Course ${courseId} ${apply ? 'APPLY' : 'DRY-RUN'} ===`)
  const groups = await canvasListAll(`/courses/${courseId}/assignment_groups`)
  const assignments = await canvasListAll(`/courses/${courseId}/assignments`)
  const byName = new Map(assignments.map((a) => [a.name, a]))
  const groupId = await ensureGroup(courseId, groups, 'Assignments')

  for (const spec of wantedAssignments()) {
    const existing = byName.get(spec.name)
    const body = {
      assignment: {
        name: spec.name,
        description: spec.description,
        submission_types: ['online_upload'],
        points_possible: spec.points,
        published: true,
        ...(groupId ? { assignment_group_id: groupId } : {})
      }
    }
    if (!existing) {
      if (!apply) {
        console.log(`[dry-run] create ${spec.name}`)
        continue
      }
      const created = await canvasApi('POST', `/courses/${courseId}/assignments`, body)
      console.log(`created ${created.id} ${created.name}`)
      continue
    }
    if (!apply) {
      console.log(`[dry-run] update ${existing.id} ${spec.name}`)
      continue
    }
    await canvasApi('PUT', `/courses/${courseId}/assignments/${existing.id}`, body)
    console.log(`updated ${existing.id} ${spec.name}`)
  }

  for (const a of assignments) {
    if (!JAMOVI_NAME_RE.test(a.name || '')) continue
    if (/benchmark|discussion|quiz|concept review|software practice/i.test(a.name || '')) continue
    if (a.published === false) {
      console.log(`already unpublished ${a.id} ${a.name}`)
      continue
    }
    if (!apply) {
      console.log(`[dry-run] unpublish ${a.id} ${a.name}`)
      continue
    }
    await canvasApi('PUT', `/courses/${courseId}/assignments/${a.id}`, {
      assignment: { published: false }
    })
    console.log(`unpublished ${a.id} ${a.name}`)
  }
}

async function main() {
  for (const id of COURSE_IDS) {
    await syncCourse(id)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
