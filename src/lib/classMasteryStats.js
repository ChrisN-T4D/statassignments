export const MASTERY_THRESHOLD = 0.9
export const MODULE_READY_FRACTION = 0.75

/**
 * @param {object} args
 * @param {Array<{objectiveId: string, objective?: string}>} args.moduleObjectives
 * @param {string[]} args.claimedUserIds
 * @param {Array<{user?: string, user_id?: string, objective_id: string, pL: number, attempts?: number}>} args.bktRecords
 */
export function computeClassMastery({ moduleObjectives, claimedUserIds, bktRecords }) {
  const claimed = [...new Set((claimedUserIds || []).filter(Boolean))]
  const claimedCount = claimed.length
  const claimedSet = new Set(claimed)
  const objIds = (moduleObjectives || []).map(o => o.objectiveId).filter(Boolean)
  const objSet = new Set(objIds)

  const byUser = new Map()
  for (const r of bktRecords || []) {
    const uid = r.user || r.user_id
    const oid = r.objective_id
    if (!uid || !claimedSet.has(uid) || !objSet.has(oid)) continue
    if (!byUser.has(uid)) byUser.set(uid, new Map())
    byUser.get(uid).set(oid, {
      pL: Number(r.pL) || 0,
      attempts: Number(r.attempts) || 0
    })
  }

  const withDataUsers = []
  for (const uid of claimed) {
    if (byUser.has(uid) && byUser.get(uid).size > 0) withDataUsers.push(uid)
  }
  const withDataCount = withDataUsers.length

  let avgMasteryPct = null
  if (withDataCount > 0 && objIds.length > 0) {
    let sumMeans = 0
    for (const uid of withDataUsers) {
      const m = byUser.get(uid)
      let s = 0
      for (const oid of objIds) {
        s += m.has(oid) ? m.get(oid).pL : 0
      }
      sumMeans += s / objIds.length
    }
    avgMasteryPct = Math.round((sumMeans / withDataCount) * 100)
  }

  const needMastered = objIds.length === 0 ? 0 : Math.ceil(objIds.length * MODULE_READY_FRACTION)
  let moduleReadyCount = 0
  for (const uid of claimed) {
    const m = byUser.get(uid)
    let mastered = 0
    if (m) {
      for (const oid of objIds) {
        if (m.has(oid) && m.get(oid).pL >= MASTERY_THRESHOLD) mastered++
      }
    }
    if (objIds.length > 0 && mastered >= needMastered) moduleReadyCount++
  }
  const moduleReadyPct = claimedCount > 0 ? Math.round((moduleReadyCount / claimedCount) * 100) : 0

  const objectives = (moduleObjectives || []).map(o => {
    const oid = o.objectiveId
    let nWithState = 0
    let nMastered = 0
    let pLSum = 0
    for (const uid of claimed) {
      const st = byUser.get(uid)?.get(oid)
      if (!st) continue
      nWithState++
      pLSum += st.pL
      if (st.pL >= MASTERY_THRESHOLD) nMastered++
    }
    return {
      objectiveId: oid,
      objective: o.objective || '',
      pctMastered: claimedCount > 0 ? Math.round((nMastered / claimedCount) * 100) : 0,
      avgPL: nWithState > 0 ? Math.round((pLSum / nWithState) * 100) / 100 : null,
      nWithAttempts: nWithState,
      nMastered
    }
  })

  return {
    claimedCount,
    withDataCount,
    avgMasteryPct,
    moduleReadyPct,
    moduleReadyCount,
    objectives
  }
}
