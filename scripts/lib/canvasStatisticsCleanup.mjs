/**
 * Shared helpers for PSYC 4213 Statistics Canvas cleanup (3177 online, 2405 in-person).
 */

/** Legacy jamovi screen-record assignments replaced by Software Practice. */
export const LEGACY_JAMOVI_NAME_RE =
  /jamovi|screen record|video of jamovi|week 8\s*&\s*9|week 11 part|week 12:|week 15 assignment/i

/** Legacy turn-in titles students still search for (e.g. "Module 3 Software Practice Turn In"). */
export const LEGACY_TURNIN_NAME_RE =
  /software practice turn[- ]?in|turn[- ]?in.*software practice|module\s+\d+.*turn[- ]?in/i

export function isLegacySoftwareAssignment (name = '') {
  const n = String(name)
  if (/benchmark|discussion|quiz|concept review|software practice \(methods market\)/i.test(n)) {
    return false
  }
  return LEGACY_JAMOVI_NAME_RE.test(n) || LEGACY_TURNIN_NAME_RE.test(n)
}

export function conceptReviewAssignmentName (moduleNum) {
  return `Module ${moduleNum}: Concept Review (Methods Market)`
}

export function softwarePracticeAssignmentName (moduleNum) {
  return `Module ${moduleNum}: Software Practice (Methods Market)`
}

/** Match Canvas module titles like "Module 3", "Week 5 — Module 3", etc. */
export function findModuleForNumber (modules, moduleNum) {
  const re = new RegExp(`\\bmodule\\s*${moduleNum}\\b`, 'i')
  return modules.find((m) => re.test(m.name || '')) ?? null
}

export function moduleItemLinksAssignment (item, assignmentId) {
  return (
    item.type === 'Assignment' &&
    String(item.content_id) === String(assignmentId)
  )
}
