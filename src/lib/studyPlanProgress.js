/** Summarize a student's progress on a Study Plan section as short text. */
import { countArticleCards, countLitReviewOutlineProgressForProject, countPhase3Progress, countPhase4Progress } from './capstoneValidation.js'

export function studyPlanSectionProgress (project, sectionId) {
  switch (sectionId) {
    case 'article-review': {
      const { complete, total, minRequired } = countArticleCards(project)
      return `${complete}/${minRequired} complete · ${total} cards`
    }
    case 'study-focus': {
      const p = countLitReviewOutlineProgressForProject(project)
      if (!p.frameworkNamed) return 'Framework not started'
      if (p.readyHint) return 'Outline ready to export'
      return `Framework · ${p.themesStarted}/${p.themesTotal} themes`
    }
    case 'phase-3': {
      const p = countPhase3Progress(project)
      if (p.ready) return `${p.filled}/4 parts · ${p.words} words`
      return p.filled ? `${p.filled}/4 parts · ${p.words} words` : 'Elevator speech not started'
    }
    case 'phase-4': {
      const p = countPhase4Progress(project)
      if (p.chosen) return 'Pathway chosen'
      if (p.recapFilled || p.pathsExplored) {
        return `A–B ${p.recapFilled}/${p.recapTotal} · ${p.pathsExplored}/${p.pathsTotal} paths`
      }
      return 'Not started'
    }
    default:
      return ''
  }
}
