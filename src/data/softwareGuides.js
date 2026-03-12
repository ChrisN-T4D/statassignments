/**
 * Software guides index: ordered, grouped list of lessons by software (Jamovi, Excel).
 * Used by SoftwareGuidesIndex view and "Next guide" link in SoftwareLesson.
 */

import { getLessonsBySoftware } from './softwareLessons.js'
import { getModuleById } from './modules.js'

export const GUIDE_GROUP_LABELS = {
  basics: 'The Basics',
  descriptives: 'Descriptive Statistics & Plots',
  inferential: 'Inferential Tests',
  advanced: 'Advanced Analyses'
}

/**
 * Map module id to guide group key for display grouping.
 * @param {string} moduleId - e.g. 'stats-module-3'
 * @returns {string} - 'basics' | 'descriptives' | 'inferential' | 'advanced'
 */
export function getGuideGroup(moduleId) {
  if (!moduleId) return 'basics'
  if (moduleId === 'stats-module-3') return 'basics'
  if (moduleId === 'stats-module-4' || moduleId === 'stats-module-5') return 'descriptives'
  if (moduleId === 'stats-module-6' || moduleId === 'stats-module-7') return 'inferential'
  if (moduleId === 'stats-module-8') return 'advanced'
  return 'basics'
}

/**
 * Get module number for ordering (from course modules).
 * @param {string} moduleId
 * @returns {number}
 */
function getModuleNumber(moduleId) {
  const mod = getModuleById(moduleId)
  return mod?.number ?? 99
}

/**
 * Returns lessons for a given software, sorted by module order, with group info.
 * @param {'jamovi'|'excel'} softwareId
 * @returns {{ groupLabel: string, groupKey: string, lessons: Array<{ id: string, title: string, module: string, moduleNumber: number, guideGroup: string }> }[]}
 */
export function getGuidesBySoftware(softwareId) {
  const lessons = getLessonsBySoftware(softwareId)
  if (!lessons.length) return []

  const withMeta = lessons.map(lesson => ({
    ...lesson,
    moduleNumber: getModuleNumber(lesson.module),
    guideGroup: getGuideGroup(lesson.module)
  }))

  withMeta.sort((a, b) => {
    if (a.moduleNumber !== b.moduleNumber) return a.moduleNumber - b.moduleNumber
    const orderA = a.guideOrder ?? 999
    const orderB = b.guideOrder ?? 999
    if (orderA !== orderB) return orderA - orderB
    return (a.title || '').localeCompare(b.title || '')
  })

  const groups = []
  let currentGroup = null
  for (const lesson of withMeta) {
    if (currentGroup?.groupKey !== lesson.guideGroup) {
      currentGroup = {
        groupKey: lesson.guideGroup,
        groupLabel: GUIDE_GROUP_LABELS[lesson.guideGroup] || lesson.guideGroup,
        lessons: []
      }
      groups.push(currentGroup)
    }
    currentGroup.lessons.push({
      id: lesson.id,
      title: lesson.title,
      module: lesson.module,
      moduleNumber: lesson.moduleNumber,
      guideGroup: lesson.guideGroup,
      estimatedTime: lesson.estimatedTime
    })
  }
  return groups
}

/**
 * Flat list of all lesson ids for a software in display order (for "Next guide" link).
 * @param {'jamovi'|'excel'} softwareId
 * @returns {Array<{ id: string, title: string }>}
 */
export function getGuidesFlat(softwareId) {
  const groups = getGuidesBySoftware(softwareId)
  return groups.flatMap(g => g.lessons.map(l => ({ id: l.id, title: l.title })))
}
