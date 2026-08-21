import { computeClassMastery } from '../src/lib/classMasteryStats.js'

function assert(cond, msg) {
  if (!cond) {
    console.error(msg)
    process.exit(1)
  }
}

const result = computeClassMastery({
  moduleObjectives: [
    { objectiveId: 'M1-O1' },
    { objectiveId: 'M1-O2' }
  ],
  claimedUserIds: ['userA', 'userB'],
  bktRecords: [
    { user_id: 'userA', objective_id: 'M1-O1', pL: 0.95 },
    { user_id: 'userA', objective_id: 'M1-O2', pL: 0.95 },
    { user_id: 'userB', objective_id: 'M1-O1', pL: 0.5 }
  ]
})

assert(result.claimedCount === 2, `claimedCount ${result.claimedCount}`)
assert(result.withDataCount === 2, `withDataCount ${result.withDataCount}`)
assert(result.avgMasteryPct === 60, `avgMasteryPct ${result.avgMasteryPct}`)
assert(result.moduleReadyPct === 50, `moduleReadyPct ${result.moduleReadyPct}`)
assert(result.moduleReadyCount === 1, `moduleReadyCount ${result.moduleReadyCount}`)

const o1 = result.objectives.find(o => o.objectiveId === 'M1-O1')
const o2 = result.objectives.find(o => o.objectiveId === 'M1-O2')
assert(o1 && o1.pctMastered === 50 && o1.nWithAttempts === 2 && o1.nMastered === 1, `O1 ${JSON.stringify(o1)}`)
assert(o2 && o2.pctMastered === 50 && o2.nWithAttempts === 1 && o2.nMastered === 1, `O2 ${JSON.stringify(o2)}`)
assert(o2.avgPL === 0.95, `O2 avgPL ${o2.avgPL}`)
assert(o1.avgPL === 0.73, `O1 avgPL ${o1.avgPL}`)

console.log('ok')
process.exit(0)
