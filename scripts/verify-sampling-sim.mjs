import {
  generateCampusPopulation,
  meanPeople,
  sampleDrawDetailed,
  meanStatsForDraws,
  clusterKForSample,
  buildRosterHeatmapBins,
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
const notSequential = srsIns.some((s, i) => i > 0 && s.rosterIndex <= srsIns[i - 1].rosterIndex)
assert(notSequential, 'srs roster picks are not list-order')

const hi = new Set(srsIns.map((s) => s.rosterIndex))
const heat = buildRosterHeatmapBins(people, hi, new Set(), null, 120)
assert(heat.length === 120, 'heatmap bin count')
const litBins = heat.filter((b) => b.inSample)
assert(litBins.length > 0, 'heatmap has sample bins')
const maxBin = Math.max(...litBins.map((b) => b.b))
const minBin = Math.min(...litBins.map((b) => b.b))
assert(maxBin - minBin > 10, 'SRS sample bins spread along list (not one cluster)')

const purposive = sampleDrawDetailed('purposive', people, n, k)
assert(meanPeople(purposive.selected) >= mu - 1, 'purposive tends high')
const purHeat = buildRosterHeatmapBins(people, new Set(purposive.rosterOrder), new Set())
const purLit = purHeat.filter((b) => b.inSample)
assert(purLit.length > 0, 'purposive heatmap bins')
assert(
  purLit.some((b) => b.b < 60) || purLit.some((b) => b > 60),
  'purposive bins not all in one half'
)

const conv = sampleDrawDetailed('conv', people, n, k)
assert(conv.selected.length === n, 'convenience n')
assert(conv.steps.length === n, 'convenience steps')

const quota = sampleDrawDetailed('quota', people, n, k)
assert(quota.selected.length === n, 'quota n')
assert(quota.steps.length >= n, 'quota walk has steps')
const quotaHeat = buildRosterHeatmapBins(people, new Set(quota.rosterOrder), new Set(quota.skippedIndices || []))
assert(quotaHeat.length === 120, 'quota heatmap')
const skipHeat = buildRosterHeatmapBins(people, new Set([0, 1]), new Set([50, 51, 52, 53]))
assert(skipHeat.some((b) => b.skipped), 'heatmap marks skipped segments')

const convHeat = buildRosterHeatmapBins(people, new Set(conv.rosterOrder), new Set())
const convLit = convHeat.filter((b) => b.inSample)
assert(convLit.length > 0 && convLit[0].b <= 2, 'convenience sample from start of list')

const stage = sampleDrawDetailed('stage', people, n, k)
assert(stage.selected.length === n, 'stage n')
const poolSteps = stage.steps.filter((s) => s.type === 'block' && s.action === 'stage-pool')
assert(poolSteps.length > 0, 'stage has pool blocks')
assert(poolSteps.every((s) => s.clusterId != null), 'stage blocks have clusterId')
const stage2 = stage.steps.filter((s) => s.stage === 2 && s.action === 'in')
assert(stage2.length === n, 'stage 2 SRS picks')
const poolIdx = new Set(poolSteps.flatMap((s) => s.rosterIndices))
const poolHeat = buildRosterHeatmapBins(people, new Set(), new Set(), null, 120, poolIdx)
assert(poolHeat.some((b) => b.inPool || b.poolCount > 0), 'stage pool heatmap')

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
