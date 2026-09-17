import {
  generateCampusPopulation,
  meanPeople,
  sampleDrawDetailed,
  meanStatsForDraws,
  clusterKForSample,
} from '../src/lib/samplingSim.js'

let failed = 0

function assert(cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg)
    failed++
  }
}

const { people, Nuse, m } = generateCampusPopulation(800)
const mu = meanPeople(people)
assert(Nuse >= 200, 'population size')
assert(mu > 0, 'population mean')

const n = 40
const k = clusterKForSample(n, m)

const srs = sampleDrawDetailed('srs', people, n, k)
assert(srs.selected.length === n, 'srs n')
const srsIns = srs.steps.filter((s) => s.action === 'in')
assert(srsIns.length === n, 'srs in-steps count')
assert(srsIns.every((s, i) => s.pick === i + 1), 'srs picks in order')

const conv = sampleDrawDetailed('conv', people, n, k)
assert(conv.selected.length === n, 'convenience n')
assert(conv.steps.length === n, 'convenience steps')

const quota = sampleDrawDetailed('quota', people, n, k)
assert(quota.selected.length === n, 'quota n')
assert(quota.steps.length >= n, 'quota walk has steps')

const purposive = sampleDrawDetailed('purposive', people, n, k)
assert(meanPeople(purposive.selected) >= mu - 1, 'purposive tends high')

const means = []
for (let i = 0; i < 50; i++) {
  means.push(meanPeople(sampleDrawDetailed('srs', people, n, k).selected))
}
const stats = meanStatsForDraws(means, mu)
assert(Math.abs(stats.bias) < 3, 'SRS bias modest over 50 draws')

if (failed) {
  console.error(`${failed} assertion(s) failed`)
  process.exit(1)
}
console.log('verify-sampling-sim: ok')
