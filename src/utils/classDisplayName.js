/**
 * Student-facing class title. Canonical `name` in PocketBase may stay short (e.g. "Research Methods")
 * while the app shows a fuller label for specific courses.
 */
export function getClassDisplayName(cls) {
  if (!cls) return ''
  return cls.name || ''
}
