import { test } from 'node:test'
import { ok, strictEqual, deepStrictEqual } from 'node:assert'
import fs from 'node:fs'
import { buildCatalog, catalogJs } from '../scripts/build-badge-catalog.mjs'
import { BADGE_SETS, badgeSetForModule, setProgress, studentTier } from '../src/data/badges.js'
import { statisticsModules } from '../src/data/modules.js'
import { getObjectivesByModule } from '../src/data/objectives.js'

test('the committed badge catalog matches the course data (run node scripts/build-badge-catalog.mjs if this fails)', () => {
  const committed = JSON.parse(fs.readFileSync(new URL('../backend/lib/badge_catalog.json', import.meta.url), 'utf8'))
  deepStrictEqual(committed, buildCatalog())
  strictEqual(fs.readFileSync(new URL('../src/data/badgeCatalog.generated.js', import.meta.url), 'utf8'), catalogJs(buildCatalog()))
})

test('every Statistics objective has exactly one badge, with a name', () => {
  for (const mod of statisticsModules) {
    if (mod.isBenchmark || !(mod.number >= 0)) continue
    const set = badgeSetForModule(mod.id)
    const objectives = getObjectivesByModule(mod.id).map((o) => o.objectiveId)
    ok(set, `${mod.id} has a badge set`)
    deepStrictEqual(set.topics.map((t) => t.objectiveId), objectives, `${mod.id} badges follow its objectives`)
    ok(set.topics.every((t) => t.name && t.name.length <= 40), `${mod.id} names are short`)
  }
})

test('award ids are unique and a module badge needs a sensible number of topics', () => {
  const ids = BADGE_SETS.flatMap((s) => [s.moduleBadge.awardId, ...s.topics.map((t) => t.awardId)])
  strictEqual(new Set(ids).size, ids.length)
  for (const s of BADGE_SETS) ok(s.moduleBadge.minCount >= 1 && s.moduleBadge.minCount <= s.topics.length, s.id)
})

test('students see earned, confirmed and unverified the same way', () => {
  strictEqual(studentTier('earned'), 'mastered')
  strictEqual(studentTier('confirmed'), 'mastered')
  strictEqual(studentTier('unverified'), 'mastered')
  strictEqual(studentTier('practice'), 'practice')
  strictEqual(studentTier(undefined), 'locked')
})

test('set progress counts earned topics and the module badge', () => {
  const set = badgeSetForModule('stats-module-4')
  const awards = set.topics.slice(0, 2).map((t) => ({ award_id: t.awardId, state: 'earned' })).concat([{ award_id: set.moduleBadge.awardId, state: 'earned' }])
  deepStrictEqual(setProgress(set, awards), { earned: 2, total: set.topics.length, moduleEarned: true })
  deepStrictEqual(setProgress(set, []), { earned: 0, total: set.topics.length, moduleEarned: false })
})
