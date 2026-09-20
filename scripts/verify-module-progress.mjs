import { getContentModulesByClass } from '../src/data/modules.js'
import { computeModuleProgress } from '../src/lib/moduleProgress.js'

function assert (cond, msg) {
  if (!cond) {
    console.error('FAIL:', msg)
    process.exit(1)
  }
}

const expectedByModule = {
  // topics + CR (+ software lesson when present); legacy You-Dos excluded when unified lesson exists
  'stats-module-1': { jamovi: 2 }, // 1 topic + CR
  'stats-module-2': { jamovi: 6 }, // 5 topics + CR
  'stats-module-3': { jamovi: 6, excel: 6 }, // 4 topics (incl screen recording) + CR + 1 lesson
  'stats-module-4': { jamovi: 7 },
  'stats-module-5': { jamovi: 11 },
  'stats-module-6': { jamovi: 12 },
  'stats-module-7': { jamovi: 5 },
  // Module 8 full bank only when selection is skipped (null scope); see tests below for selection
  'stats-module-8': { jamovi: 27 }
}

const mods = (getContentModulesByClass('statistics') || []).filter(
  (m) => m.id?.startsWith('stats-module-') && !m.id.includes('benchmark')
)

for (const mod of mods) {
  const exp = expectedByModule[mod.id]
  assert(exp, `missing expected total for ${mod.id}`)
  for (const [sw, expectedTotal] of Object.entries(exp)) {
    const p = computeModuleProgress({
      moduleId: mod.id,
      preferredSoftware: sw,
      readTopicIds: [],
      completedConceptReviewIds: [],
      completedSoftwareLessonIds: [],
      completedSoftwareExerciseIds: []
    })
    assert(
      p.total === expectedTotal,
      `${mod.id} (${sw}) expected total ${expectedTotal}, got ${p.total} (topics=${p.totalTopics}, cr=${p.hasConceptReview ? 1 : 0}, lessons=${p.totalLessons}, todo=${p.totalTodo})`
    )
    assert(p.completed === 0, `${mod.id} empty completion should be 0`)
  }
}

// Completing all visible pieces of Module 3 should reach 100%, not stick at 5/10.
const m3Topics = ['software-interface', 'data-entry', 'variable-types', 'screen-recording-tutorial']
const m3Done = computeModuleProgress({
  moduleId: 'stats-module-3',
  preferredSoftware: 'jamovi',
  readTopicIds: m3Topics,
  completedConceptReviewIds: ['stats-module-3'],
  completedSoftwareLessonIds: ['jamovi-module-3-unified'],
  completedSoftwareExerciseIds: []
})
assert(m3Done.total === 6, `m3 done total ${m3Done.total}`)
assert(m3Done.completed === 6, `m3 done completed ${m3Done.completed}`)
assert(m3Done.percent === 100, `m3 done percent ${m3Done.percent}`)

// Legacy You-Do padding must not apply when a unified lesson exists.
assert(m3Done.totalTodo === 0, 'm3 should not count legacy todos in denominator')

// Module 8: before selection → 0 topics (CR + software only = 2)
const m8Before = computeModuleProgress({
  moduleId: 'stats-module-8',
  preferredSoftware: 'jamovi',
  selectedTopicIds: new Set()
})
assert(m8Before.totalTopics === 0, `m8 before selection topics ${m8Before.totalTopics}`)
assert(m8Before.total === 2, `m8 before selection total ${m8Before.total}`)

// Module 8: three selected topics → 3 + CR + lesson = 5
const m8Pick = ['chi-square-independence', 'independent-t-test', 'correlation']
const m8Selected = computeModuleProgress({
  moduleId: 'stats-module-8',
  preferredSoftware: 'jamovi',
  selectedTopicIds: new Set(m8Pick),
  readTopicIds: m8Pick,
  completedConceptReviewIds: ['stats-module-8'],
  completedSoftwareLessonIds: ['jamovi-module-8-unified']
})
assert(m8Selected.totalTopics === 3, `m8 selected topics ${m8Selected.totalTopics}`)
assert(m8Selected.total === 5, `m8 selected total ${m8Selected.total}`)
assert(m8Selected.completed === 5, `m8 selected completed ${m8Selected.completed}`)

console.log('verify-module-progress: ok')
