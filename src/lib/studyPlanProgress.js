/** Summarize a student's progress on a Study Plan section as short text. */
import { studyPlanClass } from '../data/studyPlanClasses.js'
import { countTheorySelectionProgress, countArticleCards, countLitReviewOutlineProgressForProject, countPhase3Progress, countPhase4Progress, countMeasuresDraftProgress } from './capstoneValidation.js'

export function studyPlanSectionProgress (project, sectionId, classId = 'research-methods') {
  switch (sectionId) {
    case 'article-review': {
      const { complete, total, minRequired } = countArticleCards(project, studyPlanClass(classId)?.articleMin)
      return `${complete}/${minRequired} complete · ${total} cards`
    }
    case 'theory-selection': {
      const p = countTheorySelectionProgress(project)
      if (p.ready) return 'Theory chosen and justified'
      if (p.chosen) return `Chosen · ${p.named}/3 candidates`
      return p.named ? `${p.named}/3 candidates named` : 'Not started'
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
    case 'measures-draft': {
      const p = countMeasuresDraftProgress(project)
      if (!p.chosen) return 'Choose a pathway in Method Choice first'
      if (p.ready) return `${p.filled}/${p.total} parts · ready to export`
      return p.filled ? `${p.filled}/${p.total} parts` : 'Not started'
    }
    default:
      return ''
  }
}
