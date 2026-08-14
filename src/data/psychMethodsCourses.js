/** NWOSU psychology methods courses that share Pressbooks content but differ in scope. */
export const PSYCH_METHODS_COURSES = [
  {
    slug: 'research-methods',
    id: 'research-methods',
    label: 'Research Methods',
    shortLabel: 'RM',
    description: 'PSYC 4223 capstone — literature review, methods, IRB, and all methodology paths.'
  },
  {
    slug: 'experimental',
    id: 'experimental',
    label: 'Experimental Design',
    shortLabel: 'Exp',
    description: 'Experimental & quasi-experimental design, factorials, and analyzing group-comparison data.'
  }
]

export const PSYCH_METHODS_COURSE_SLUGS = PSYCH_METHODS_COURSES.map((c) => c.slug)

export function isPsychMethodsCourse (classIdOrSlug) {
  if (!classIdOrSlug) return false
  return PSYCH_METHODS_COURSE_SLUGS.includes(classIdOrSlug)
}

export function getPsychMethodsCourse (classIdOrSlug) {
  return PSYCH_METHODS_COURSES.find(
    (c) => c.slug === classIdOrSlug || c.id === classIdOrSlug
  ) ?? null
}
