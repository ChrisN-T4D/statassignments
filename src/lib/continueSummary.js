import { currentWeekIndex, semesterPhase, weekRef, chapterNumber } from '../data/researchMethodsSchedule.js'

/** Router location for a schedule item, or null when the item has no page (plain tasks). */
export function itemLink(item, classSlug, from) {
  switch (item.kind) {
    case 'chapter': {
      const n = chapterNumber(item)
      return n ? { path: `/topic/rm-chapter-${n}`, query: { from } } : null
    }
    case 'analysis':
    case 'lab':
      return { path: `/class/${classSlug}`, query: { module: item.moduleId } }
    case 'assignment-help':
      return { path: `/class/${classSlug}/assignment-help/${item.assignmentId}`, query: { from } }
    case 'study-plan':
      return { path: `/class/${classSlug}/study-plan/${item.sectionId}`, query: { from } }
    default:
      return null
  }
}

function itemLabel(item) {
  if (item.label) return item.label
  return item.kind === 'chapter' ? `Ch. ${chapterNumber(item)}` : ''
}

/**
 * What a student should do this week: the deliverable and its due date, plus one "next up" link.
 * Returns null outside the semester.
 */
export function continueSummary(schedule, classSlug, today = new Date()) {
  if (semesterPhase(schedule, today) !== 'during') return null
  const weekIndex = currentWeekIndex(schedule, today)
  const week = schedule.weeks[weekIndex]
  const from = weekRef(schedule, weekIndex)
  const dueItem = week.items.find((it) => it.role === 'do' && typeof it.due === 'string')
  const linked = (role) => week.items.find((it) => it.role === role && itemLink(it, classSlug, from))
  const nextItem = linked('do') || linked('read')
  return {
    weekIndex,
    weekNumber: weekIndex + 1,
    title: week.title,
    from,
    due: dueItem ? { label: dueItem.label, due: dueItem.due } : null,
    next: nextItem ? { label: itemLabel(nextItem), to: itemLink(nextItem, classSlug, from) } : null
  }
}
