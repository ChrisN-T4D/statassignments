/**
 * Picks the weakest objectives from chapters an earlier week covered, for a short refresher on the week card.
 * Only objectives the student has attempted count (a missing state means "not tried yet", not "weak").
 * Pure: pass in the states, the schedule weeks and the objective list.
 *
 * @param {Record<string, { pL: number }>} states BKT states keyed by objectiveId
 * @param {Array<{ items: Array<{ kind: string, moduleId?: string }> }>} weeks the schedule's weeks
 * @param {number} weekIndex the week being shown
 * @param {Array<{ objectiveId: string, objective: string, moduleId: string }>} objectives
 * @param {{ limit?: number, below?: number }} [opts] below is a mastery probability (0 to 1)
 */
export function pickRefresher(states, weeks, weekIndex, objectives, { limit = 3, below = 0.6 } = {}) {
  const earlier = new Set()
  weeks.slice(0, weekIndex).forEach((week) => {
    week.items.forEach((item) => {
      if (item.kind === 'chapter' && item.moduleId) earlier.add(item.moduleId)
    })
  })
  return objectives
    .filter((o) => earlier.has(o.moduleId) && states[o.objectiveId] && states[o.objectiveId].pL < below)
    .map((o) => ({ ...o, mastery: Math.round(states[o.objectiveId].pL * 100) }))
    .sort((a, b) => a.mastery - b.mastery)
    .slice(0, limit)
}
