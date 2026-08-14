export const STATISTICS = 'statistics'
export const RESEARCH_METHODS = 'research-methods'

export function inferClassId({ objectiveId, hint, moduleId, itemId } = {}) {
  for (const value of [objectiveId, itemId, moduleId, hint]) {
    if (!value) continue
    const text = String(value)
    const lowered = text.toLowerCase()
    if (
      text.startsWith('RM') ||
      lowered.startsWith('rm-') ||
      lowered === RESEARCH_METHODS ||
      lowered.includes('research-methods')
    ) {
      return RESEARCH_METHODS
    }
    if (lowered === STATISTICS) return STATISTICS
  }
  return STATISTICS
}
