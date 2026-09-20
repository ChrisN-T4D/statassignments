import { getQuestionsByModule } from '../src/data/conceptQuestions.js'
import {
  sampleBenchmarkQuestions,
  classifyAttemptSeen
} from '../src/lib/benchmarkPracticeSample.js'
import { shuffleMcOptions } from '../src/lib/shuffleQuestionOptions.js'

function assert (cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg)
    process.exit(1)
  }
}

assert(
  classifyAttemptSeen(
    { source: 'benchmark_practice', benchmark_slug: 'benchmark-1' },
    'benchmark-1'
  ) === 'practice',
  'classify practice'
)
assert(
  classifyAttemptSeen({ source: null }, 'benchmark-1') === 'concept_review',
  'classify null as CR'
)
assert(
  classifyAttemptSeen({ source: 'concept_review' }, 'benchmark-1') === 'concept_review',
  'classify CR'
)

const modules = ['stats-module-1', 'stats-module-2', 'stats-module-3']
const bank = modules.flatMap((mid) => getQuestionsByModule(mid) || [])
const masteryByModule = {
  'stats-module-1': 0.5,
  'stats-module-2': 0.5,
  'stats-module-3': 0.5
}

const draw1 = sampleBenchmarkQuestions({
  modules,
  bankQuestions: bank,
  masteryByModule,
  totalCount: 15
})
assert(draw1.length === 15, `draw1 length ${draw1.length}`)
assert(new Set(draw1.map((q) => q.id)).size === 15, 'draw1 unique ids')

const practiceSeen = draw1.map((q) => q.id)
const eligibleCount = bank.filter((q) =>
  ['multiple_choice', 'true_false', 'multiple_select'].includes(q.type)
).length
const draw2 = sampleBenchmarkQuestions({
  modules,
  bankQuestions: bank,
  masteryByModule,
  totalCount: 15,
  practiceSeenIds: practiceSeen
})
assert(draw2.length === 15, `draw2 length ${draw2.length}`)
assert(new Set(draw2.map((q) => q.id)).size === 15, 'draw2 unique ids')
const overlap = draw2.filter((q) => practiceSeen.includes(q.id)).length
if (eligibleCount > 30) {
  assert(overlap < 15, `expected some unseen items, overlap=${overlap}`)
}

const crSeen = practiceSeen.slice(0, 10)
const draw3 = sampleBenchmarkQuestions({
  modules,
  bankQuestions: bank,
  masteryByModule,
  totalCount: 15,
  practiceSeenIds: [],
  conceptReviewSeenIds: crSeen
})
const crHits = draw3.filter((q) => crSeen.includes(q.id)).length
assert(crHits < 15, `CR-seen should be deferred when possible, crHits=${crHits}`)

const opts = ['a', 'b', 'c', 'd']
const shuffled = shuffleMcOptions(opts)
assert(opts[0] === 'a', 'shuffle must not mutate input')
assert(
  [...shuffled].sort().join() === [...opts].sort().join(),
  'shuffle preserves members'
)

console.log('verify-benchmark-practice-sample: ok')
