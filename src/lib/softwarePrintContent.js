function asArray(value) {
  return Array.isArray(value) ? value : []
}

function flattenBlocks(blocks, out = []) {
  for (const block of asArray(blocks)) {
    if (!block || typeof block !== 'object') continue
    if (block.type === 'text' || block.type === 'callout') {
      out.push({ text: block.content || '' })
    } else if (block.type === 'step_sequence') {
      out.push({ steps: asArray(block.steps) })
    } else if (block.type === 'collapsible_section') {
      if (block.title) out.push({ text: `<strong>${block.title}</strong>` })
      flattenBlocks(block.blocks, out)
    } else if (block.content) {
      out.push({ text: block.content })
    }
  }
  return out
}

export function buildLearnSections(lesson) {
  const iDo = lesson?.phases?.iDo
  if (!iDo) return []
  const sections = iDo.sections?.length
    ? iDo.sections
    : [{ id: 'learn', title: iDo.title || 'Learn', objectives: lesson.objectives, content: iDo.content }]
  return sections.map((section, index) => ({
    id: section.id || `learn-${index}`,
    title: section.title || `Section ${index + 1}`,
    objectives: section.objectives || [],
    blocks: flattenBlocks(section.content || section.blocks || [])
  }))
}

export function buildWeDoSteps(lesson) {
  return asArray(lesson?.phases?.weDo?.steps)
}

export function moduleNumberFromLesson(lesson) {
  const id = lesson?.module || ''
  const match = String(id).match(/(\d+)/)
  return match ? match[1] : 'N'
}

export function canvasSoftwareAssignmentName(lesson) {
  return `Module ${moduleNumberFromLesson(lesson)}: Software Practice`
}
