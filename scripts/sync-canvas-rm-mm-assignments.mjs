#!/usr/bin/node
/**
 * Update PSYC 4223 Canvas assignment descriptions to match Methods Market Study Plan.
 * Prefer Playwright when no token: scripts/sync-canvas-rm-mm-assignments-playwright.mjs
 *
 * Usage:
 *   export CANVAS_TOKEN='...'
 *   node scripts/sync-canvas-rm-mm-assignments.mjs          # dry-run
 *   node scripts/sync-canvas-rm-mm-assignments.mjs --apply
 */
import { canvasApi } from './lib/canvasApi.js'
import { wantedRmMmAssignments } from './lib/canvasRmMmAssignmentCopy.mjs'
import { CANVAS_RESEARCH_METHODS_COURSE_ID } from '../src/data/researchMethodsCanvasLinks.js'

const apply = process.argv.includes('--apply')
const COURSE_ID = CANVAS_RESEARCH_METHODS_COURSE_ID

async function syncCourse () {
  console.log(`\n=== Course ${COURSE_ID} ${apply ? 'APPLY' : 'DRY-RUN'} ===`)
  for (const spec of wantedRmMmAssignments()) {
    const path = `/courses/${COURSE_ID}/assignments/${spec.id}`
    const body = {
      assignment: {
        name: spec.name,
        description: spec.description
      }
    }
    if (!apply) {
      console.log(`[dry-run] update assignment ${spec.id}: ${spec.name}`)
      console.log(`  description length: ${spec.description.length} chars`)
      continue
    }
    await canvasApi('PUT', path, body)
    console.log(`updated ${spec.id} ${spec.name}`)
  }
}

async function main () {
  await syncCourse()
  if (!apply) {
    console.log('\nDry-run complete. Re-run with --apply to push descriptions to Canvas.')
    console.log('Or use Playwright (no token): npm run sync:canvas-rm:playwright:apply')
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
