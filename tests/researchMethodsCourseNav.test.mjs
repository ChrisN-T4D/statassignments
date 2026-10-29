import test from 'node:test'
import assert from 'node:assert/strict'
import { RESEARCH_METHODS_PARTS, navItemId, findPartForNavItemId } from '../src/data/researchMethodsCourseNav.js'

test('every nav item id appears exactly once across the whole nav', () => {
  const counts = {}
  for (const part of RESEARCH_METHODS_PARTS) {
    for (const phase of part.phases) {
      for (const item of phase.items) {
        const id = navItemId(item)
        counts[id] = (counts[id] || 0) + 1
      }
    }
  }
  const dupes = Object.keys(counts).filter((id) => counts[id] > 1)
  assert.deepEqual(dupes, [], `duplicate nav item ids: ${dupes.join(', ')}`)
})

test('findPartForNavItemId resolves module ids to their part', () => {
  assert.equal(findPartForNavItemId('rm-module-3'), 'part-3')
  assert.equal(findPartForNavItemId('rm-module-4'), 'part-1')
})

test('the methods-section phase contains the study-plan item', () => {
  const phase = RESEARCH_METHODS_PARTS.flatMap((part) => part.phases).find((p) => p.id === 'methods-section')
  assert.ok(phase, 'methods-section phase not found')
  const item = phase.items.find((i) => navItemId(i) === 'study-plan-methods-section')
  assert.ok(item, 'study-plan-methods-section item not found in phase')
})

test('every related reading resolves to a chapter and is not also a nav item of the same phase', async () => {
  const { groupResearchMethodsCourseNav } = await import('../src/data/researchMethodsCourseNav.js')
  const { researchMethodsModules } = await import('../src/data/modules.js')
  const resolved = groupResearchMethodsCourseNav(researchMethodsModules)
  for (const part of RESEARCH_METHODS_PARTS) {
    for (const phase of part.phases) {
      const wanted = phase.related || []
      const got = resolved.flatMap((p) => p.phases).find((p) => p.id === phase.id)?.relatedItems.map((r) => r.id) || []
      assert.deepEqual(got, wanted, `related readings for ${phase.id} did not all resolve`)
      const own = phase.items.map(navItemId)
      assert.deepEqual(wanted.filter((id) => own.includes(id)), [], `${phase.id} lists its own item as related`)
    }
  }
})
