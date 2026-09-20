/**
 * Benchmark practice-test sampling: mastery-weighted draws with prefer-unseen tiers.
 * Tier order: not seen on this practice-test slug → not seen in Concept Review → reuse.
 */

const ELIGIBLE_TYPES = new Set(['multiple_choice', 'true_false', 'multiple_select'])

export function classifyAttemptSeen (attempt, slug) {
  const source = attempt?.source
  const benchmarkSlug = attempt?.benchmark_slug
  if (source === 'benchmark_practice' && benchmarkSlug === slug) {
    return 'practice'
  }
  if (source == null || source === '' || source === 'concept_review') {
    return 'concept_review'
  }
  return 'other'
}

function fisherYates (items) {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function pickFromTiers (pool, chosenIds, practiceSeen, crSeen) {
  if (!pool?.length) return null
  const remaining = pool.filter((q) => q?.id && !chosenIds.has(q.id))
  if (remaining.length === 0) return null

  const tiers = [
    remaining.filter((q) => !practiceSeen.has(q.id)),
    remaining.filter((q) => !crSeen.has(q.id)),
    remaining
  ]
  for (const tier of tiers) {
    if (tier.length === 0) continue
    return tier[Math.floor(Math.random() * tier.length)]
  }
  return null
}

/**
 * @param {object} opts
 * @param {string[]} opts.modules
 * @param {Array<{id:string,moduleId:string,type:string}>} opts.bankQuestions
 * @param {Record<string, number>} [opts.masteryByModule]
 * @param {number} [opts.totalCount]
 * @param {string[]} [opts.practiceSeenIds]
 * @param {string[]} [opts.conceptReviewSeenIds]
 */
export function sampleBenchmarkQuestions ({
  modules = [],
  bankQuestions = [],
  masteryByModule = {},
  totalCount = 15,
  practiceSeenIds = [],
  conceptReviewSeenIds = []
} = {}) {
  if (!modules.length || !bankQuestions.length || totalCount <= 0) return []

  const eligible = bankQuestions.filter(
    (q) => q && q.id && modules.includes(q.moduleId) && ELIGIBLE_TYPES.has(q.type)
  )
  if (eligible.length === 0) return []

  const poolByModule = {}
  for (const moduleId of modules) {
    const pool = eligible.filter((q) => q.moduleId === moduleId)
    if (pool.length > 0) poolByModule[moduleId] = pool
  }

  const weights = {}
  let totalWeight = 0
  for (const moduleId of modules) {
    const mastery =
      typeof masteryByModule[moduleId] === 'number' ? masteryByModule[moduleId] : 0.5
    const w = 1 + (1 - mastery)
    weights[moduleId] = w
    totalWeight += w
  }
  const probs = {}
  for (const mid of modules) {
    probs[mid] = totalWeight > 0 ? weights[mid] / totalWeight : 1 / modules.length
  }

  const practiceSeen = new Set(practiceSeenIds)
  const crSeen = new Set(conceptReviewSeenIds)
  const chosenIds = new Set()
  const chosen = []

  const tryPick = (moduleId) =>
    pickFromTiers(poolByModule[moduleId], chosenIds, practiceSeen, crSeen)

  for (let i = 0; i < totalCount; i++) {
    let r = Math.random()
    let moduleId = modules[0]
    for (const mid of modules) {
      r -= probs[mid]
      if (r <= 0) {
        moduleId = mid
        break
      }
    }

    let pick = tryPick(moduleId)
    if (!pick) {
      for (const mid of modules) {
        if (mid === moduleId) continue
        pick = tryPick(mid)
        if (pick) break
      }
    }
    if (!pick) break

    chosen.push(pick)
    chosenIds.add(pick.id)
  }

  return fisherYates(chosen)
}
