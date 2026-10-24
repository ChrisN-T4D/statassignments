/**
 * Objectives for the chapters read in one schedule week, so the week card can say
 * what a student will be able to do. Pure: pass in the lookup so tests need no data files.
 *
 * @param {{ items: Array<{ kind: string, moduleId?: string }> }} week
 * @param {(moduleId: string) => Array<{ objectiveId: string, objective: string }>} getByModule
 * @param {number} [limit] how many to show before the rest fold away
 * @returns {{ shown: Array, rest: Array }}
 */
export function weekObjectives(week, getByModule, limit = 3) {
  const seen = new Set()
  const all = []
  for (const item of week.items || []) {
    if (item.kind !== 'chapter' || !item.moduleId) continue
    for (const obj of getByModule(item.moduleId)) {
      if (seen.has(obj.objectiveId)) continue
      seen.add(obj.objectiveId)
      all.push(obj)
    }
  }
  return { shown: all.slice(0, limit), rest: all.slice(limit) }
}
