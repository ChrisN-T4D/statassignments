/**
 * PSYC 4223 Research Methods — course navigation aligned with Canvas assignment groups.
 * Part → phase → items (Pressbooks chapter modules, Study Plan sections, assignment-help links).
 */

import { STUDY_PLAN_SECTIONS } from './capstoneWorksheetSchemas.js'

/** Canvas assignment group names (course 2406). */
export const RESEARCH_METHODS_PARTS = [
  {
    id: 'part-1',
    label: 'Part 1',
    title: 'Introduction & literature review',
    description:
      'Course intro, Phase 1 topic choice and article reviews, then Phase 2 literature review — same sequence as Canvas Part 1.',
    phases: [
      {
        id: 'intro',
        label: 'Introduction: read Ch. 1 first',
        items: [{ kind: 'chapter', moduleId: 'rm-module-1' }]
      },
      {
        id: 'phase-1-topic',
        label: 'Phase 1: Choosing a Topic',
        items: [{ kind: 'chapter', moduleId: 'rm-module-2' }]
      },
      {
        id: 'phase-1-articles',
        label: 'Phase 1: Article Review',
        items: [
          { kind: 'study-plan', sectionId: 'article-review' },
          { kind: 'chapter', moduleId: 'rm-module-4' },
          { kind: 'chapter', moduleId: 'rm-module-5' }
        ]
      },
      {
        id: 'phase-2-lit-review',
        label: 'Phase 2: Literature Review',
        items: [
          { kind: 'study-plan', sectionId: 'study-focus' },
          { kind: 'chapter', moduleId: 'rm-module-6' },
          { kind: 'chapter', moduleId: 'rm-module-7' },
          { kind: 'chapter', moduleId: 'rm-module-11' },
          { kind: 'chapter', moduleId: 'rm-module-8' },
          { kind: 'chapter', moduleId: 'rm-module-9' }
        ]
      }
    ]
  },
  {
    id: 'part-2',
    label: 'Part 2',
    title: 'Research question & methodological route',
    description:
      'Phase 3 elevator speech and Phase 4 operationalization, methods write-up, and methodology path guides — Canvas Part 2.',
    phases: [
      {
        id: 'phase-3-4',
        label: 'Phase 3 & 4: Research question & operationalization',
        items: [
          { kind: 'study-plan', sectionId: 'phase-3' },
          { kind: 'study-plan', sectionId: 'phase-4' },
          { kind: 'chapter', moduleId: 'rm-module-2' },
          { kind: 'chapter', moduleId: 'rm-module-4' }
        ]
      },
      {
        id: 'methods-section',
        label: 'Methods Section',
        items: [
          { kind: 'chapter', moduleId: 'rm-module-4' },
          { kind: 'chapter', moduleId: 'rm-module-5' },
          { kind: 'chapter', moduleId: 'rm-module-6' },
          { kind: 'chapter', moduleId: 'rm-module-7' },
          { kind: 'chapter', moduleId: 'rm-module-9' },
          { kind: 'chapter', moduleId: 'rm-module-11' },
          { kind: 'chapter', moduleId: 'rm-module-lab' }
        ]
      },
      {
        id: 'method-paths',
        label: 'Method paths (Path 1–4)',
        items: [
          { kind: 'assignment-help', assignmentId: 'rm-path-1-survey' },
          { kind: 'assignment-help', assignmentId: 'rm-path-2-qualitative' },
          { kind: 'assignment-help', assignmentId: 'rm-path-3-experimental' },
          { kind: 'assignment-help', assignmentId: 'rm-path-4-archival' }
        ]
      }
    ]
  },
  {
    id: 'part-3',
    label: 'Part 3',
    title: 'Ethics, training & IRB',
    description: 'Human Research Training lessons and IRB submission — Canvas Part 3.',
    phases: [
      {
        id: 'hrt',
        label: 'Human Research Training',
        items: [
          { kind: 'chapter', moduleId: 'rm-module-3' },
          { kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-1' },
          { kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-2' },
          { kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-3' },
          { kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-4' },
          { kind: 'assignment-help', assignmentId: 'rm-hrt-lesson-5' }
        ]
      },
      {
        id: 'irb',
        label: 'IRB Submission',
        items: [
          { kind: 'chapter', moduleId: 'rm-module-3' },
          { kind: 'assignment-help', assignmentId: 'rm-irb-first-draft' },
          { kind: 'assignment-help', assignmentId: 'rm-irb-final-draft' },
          { kind: 'assignment-help', assignmentId: 'rm-irb-status-update' }
        ]
      }
    ]
  },
  {
    id: 'data-by-path',
    label: 'Analysis',
    title: 'Statistics & data analysis by path',
    description:
      'After Phase 4 path choice — Ch. 12–13 reading and path-matched analysis steps.',
    phases: [
      {
        id: 'analysis',
        label: 'Analysis by methodology path',
        items: [{ kind: 'chapter', moduleId: 'rm-module-data-by-path' }]
      }
    ]
  }
]

const STUDY_PLAN_BY_ID = Object.fromEntries(STUDY_PLAN_SECTIONS.map((s) => [s.id, s]))

const ASSIGNMENT_HELP_LABELS = {
  'rm-path-1-survey': 'Path 1: Survey',
  'rm-path-2-qualitative': 'Path 2: Qualitative',
  'rm-path-3-experimental': 'Path 3: Experimental',
  'rm-path-4-archival': 'Path 4: Archival',
  'rm-hrt-lesson-1': 'HRT Lesson 1',
  'rm-hrt-lesson-2': 'HRT Lesson 2',
  'rm-hrt-lesson-3': 'HRT Lesson 3',
  'rm-hrt-lesson-4': 'HRT Lesson 4',
  'rm-hrt-lesson-5': 'HRT Lesson 5',
  'rm-irb-first-draft': 'IRB First Draft',
  'rm-irb-final-draft': 'IRB Final Draft',
  'rm-irb-status-update': 'IRB Status Update'
}

export function navItemId (item) {
  if (item.kind === 'chapter') return item.moduleId
  if (item.kind === 'study-plan') return `study-plan-${item.sectionId}`
  if (item.kind === 'assignment-help') return `assignment-help-${item.assignmentId}`
  return null
}

function resolveStudyPlanItem (item) {
  const section = STUDY_PLAN_BY_ID[item.sectionId]
  if (!section) return null
  return {
    id: navItemId(item),
    kind: 'study-plan',
    studyPlanSectionId: item.sectionId,
    classId: 'research-methods',
    isStudyPlanSection: true,
    title: section.title,
    shortTitle: section.shortTitle,
    description: section.description,
    icon: '📝',
    color: '#7c3aed',
    navBadge: 'Study Plan'
  }
}

function resolveAssignmentHelpItem (item) {
  const label = ASSIGNMENT_HELP_LABELS[item.assignmentId] || item.assignmentId
  return {
    id: navItemId(item),
    kind: 'assignment-help',
    assignmentHelpId: item.assignmentId,
    classId: 'research-methods',
    isAssignmentHelpLink: true,
    title: label,
    shortTitle: label,
    description: 'Canvas assignment tips and chapter links',
    icon: '📋',
    color: '#0ea5e9',
    navBadge: 'Assignment Help'
  }
}

function resolveChapterItem (item, modulesById) {
  const mod = modulesById[item.moduleId]
  if (!mod) return null
  return { ...mod, kind: 'chapter' }
}

function resolveNavItem (item, modulesById) {
  switch (item.kind) {
    case 'chapter':
      return resolveChapterItem(item, modulesById)
    case 'study-plan':
      return resolveStudyPlanItem(item)
    case 'assignment-help':
      return resolveAssignmentHelpItem(item)
    default:
      return null
  }
}

/**
 * Canvas-aligned parts with resolved phase menus for ClassHome (research-methods only).
 */
export function groupResearchMethodsCourseNav (modules) {
  const modulesById = Object.fromEntries(modules.map((m) => [m.id, m]))
  return RESEARCH_METHODS_PARTS.map((part) => {
    const phases = part.phases
      .map((phase) => ({
        ...phase,
        items: phase.items.map((item) => resolveNavItem(item, modulesById)).filter(Boolean)
      }))
      .filter((phase) => phase.items.length > 0)
    const modulesFlat = phases.flatMap((phase) => phase.items)
    return { ...part, phases, modules: modulesFlat }
  }).filter((part) => part.phases.length > 0)
}

export function findPartForNavItemId (itemId) {
  for (const part of RESEARCH_METHODS_PARTS) {
    for (const phase of part.phases) {
      if (phase.items.some((item) => navItemId(item) === itemId)) return part.id
    }
  }
  return null
}
