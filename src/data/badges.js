/**
 * Badge sets. Each set is one module's worth of topic badges plus a larger module badge.
 * The server (backend/lib/awards_catalog.py) decides what is earned; this file only describes how to show it.
 * Award states: practice (practice mastered), unverified and confirmed (Mastery Check passed). Students see
 * unverified and confirmed the same way; only instructors can tell them apart.
 */
export const BADGE_SETS = [
  {
    id: 'math-refresher',
    moduleId: 'stats-module-0',
    classId: 'statistics',
    title: 'Math Refresher',
    practicePath: '/class/statistics/math-practice',
    moduleBadge: { awardId: 'math-module:stats-module-0', name: 'Math Ready', glyph: '★' },
    topics: [
      { awardId: 'math-topic:M0-O1', objectiveId: 'M0-O1', name: 'Order of operations', glyph: '( )' },
      { awardId: 'math-topic:M0-O2', objectiveId: 'M0-O2', name: 'Solving for a variable', glyph: 'x=' },
      { awardId: 'math-topic:M0-O3', objectiveId: 'M0-O3', name: 'Fractions, decimals, percents', glyph: '%' },
      { awardId: 'math-topic:M0-O4', objectiveId: 'M0-O4', name: 'Exponents and roots', glyph: '√' },
      { awardId: 'math-topic:M0-O5', objectiveId: 'M0-O5', name: 'Summation', glyph: 'Σ' },
      { awardId: 'math-topic:M0-O6', objectiveId: 'M0-O6', name: 'Reading graphs', glyph: '↗' },
      { awardId: 'math-topic:M0-O7', objectiveId: 'M0-O7', name: 'Algebra symbols', glyph: '±' }
    ]
  }
]

export function badgeSetForModule(moduleId) {
  return BADGE_SETS.find((s) => s.moduleId === moduleId) || null
}

/** What a student sees for an award state. */
export function studentTier(state) {
  if (state === 'confirmed' || state === 'unverified') return 'mastered'
  if (state === 'practice') return 'practice'
  return 'locked'
}

export function tierLabel(tier) {
  return tier === 'mastered' ? 'Mastered' : tier === 'practice' ? 'Practice mastered' : 'Locked'
}
