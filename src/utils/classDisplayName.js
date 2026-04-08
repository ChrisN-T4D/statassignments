/**
 * Student-facing class title. Canonical `name` in PocketBase may stay short (e.g. "Research Methods")
 * while the app shows a fuller label for specific courses.
 */
export function getClassDisplayName(cls) {
  if (!cls) return ''
  const slug = cls.slug || ''
  const id = cls.id || ''
  if (slug === 'research-methods' || id === 'research-methods') {
    return 'Research and Experimental Design'
  }
  return cls.name || ''
}
