/**
 * Canvas assignment names + HTML descriptions aligned with Methods Market Study Plan.
 */
import {
  CANVAS_RM_ASSIGNMENT_IDS,
  CANVAS_RM_WIKI_PAGES,
  assignmentHelpPath,
  fullUrl,
  studyPlanHubPath,
  studyPlanPath
} from '../../src/data/researchMethodsCanvasLinks.js'

function articleReviewDescription () {
  const url = fullUrl(studyPlanPath('article-review'))
  const hub = fullUrl(studyPlanHubPath())
  const help = fullUrl(assignmentHelpPath())
  return (
    `<p>Draft your article reviews and problem statement in <strong>Methods Market Study Plan</strong>, then export and submit here with a PDF attachment for every article.</p>` +
    `<p><a href="${url}">Open Article Review (Study Plan)</a> · <a href="${hub}">Study Plan hub</a> · <a href="${help}">Assignment Help</a></p>` +
    `<p><strong>Requirements:</strong> Complete at least <strong>6 peer-reviewed, original research article reviews</strong> (6–8 on the template). For each article include APA reference, the authors' research questions, participants, methodology, results, strengths, weaknesses, and how it connects to your proposal. Write in complete sentences; summarize, do not copy from the article.</p>` +
    `<p>After all article cards, draft your <strong>Problem Statement</strong> (what we know, gap, what we want to know) and preliminary research question(s) and hypothesis(es).</p>` +
    `<p>Click <strong>Start guided tour</strong> in Study Plan for field-by-field guidance. Due dates and points are only in Canvas.</p>`
  )
}

function phase3Description () {
  const url = fullUrl(studyPlanPath('phase-3'))
  const outline = fullUrl(studyPlanPath('study-focus'))
  const phase4 = fullUrl(studyPlanPath('phase-4'))
  return (
    `<p><strong>Phase 3: Elevator Speech</strong> — prepare a <strong>1–2 minute spiel</strong> about your research: what the field knows, what gap your study addresses, and how your proposed study fits. Submit together with Phase 4 on the same due date.</p>` +
    `<p><a href="${url}">Open Phase 3 in Study Plan</a> · <a href="${outline}">Lit Review Outline</a> · <a href="${phase4}">Phase 4</a></p>` +
    `<p><strong>Objective:</strong> Synthesize your lit review into spoken prose. IV/DV definitions and methodology path choice belong in Phase 4, not Phase 3.</p>` +
    `<p><strong>Draft four parts in Study Plan:</strong></p>` +
    `<ol>` +
    `<li><strong>What we know</strong> — 2–4 sentences on what prior research agrees on</li>` +
    `<li><strong>The gap</strong> — 1–3 sentences on what is still unknown or contested</li>` +
    `<li><strong>My study pitch</strong> — 1–3 sentences on how your study fits the gap</li>` +
    `<li><strong>Full elevator speech</strong> — combined script (~130–300 words, about 1–2 minutes read aloud)</li>` +
    `</ol>` +
    `<p>Use copy buttons to pull theme notes, gap, and transition from your Lit Review Outline, then refine into spoken prose. Export from Study Plan and submit with Phase 4.</p>`
  )
}

function phase4Description () {
  const url = fullUrl(studyPlanPath('phase-4'))
  const phase3 = fullUrl(studyPlanPath('phase-3'))
  const helpful = CANVAS_RM_WIKI_PAGES.helpfulTable
  return (
    `<p><strong>Phase 4: Operationalization Exploration</strong> — compare four data-collection pathways and choose <strong>one</strong> by the end of Phase 4. Submit together with Phase 3 on the same due date.</p>` +
    `<p><a href="${url}">Open Phase 4 in Study Plan</a> · <a href="${phase3}">Phase 3</a> · <a href="${helpful}">Helpful Table (IV/DV logic)</a></p>` +
    `<p><strong>Part A:</strong> Recap broad topic area and proposed research question from your lit review.</p>` +
    `<p><strong>Part B — Conceptual definitions:</strong> Define IV and DV in theory (constructs as your literature defines them).</p>` +
    `<p><strong>Part B (continued) — Operational definitions:</strong> Specify how you would measure or manipulate each variable in a real study (conditions, scales, tasks, dataset variables).</p>` +
    `<p><strong>Part C:</strong> Explore all four pathways (survey, experimental task, observation, archival). Mark a path <em>not viable</em> when it truly does not fit.</p>` +
    `<p><strong>Part D:</strong> Complete the comparison table (feasibility, access, measurement quality, ethics/IRB).</p>` +
    `<p><strong>Part E:</strong> Choose <strong>one</strong> pathway. That choice unlocks the matching method-path guide in Canvas.</p>` +
    `<p>See Path 1–4 wiki pages and Ch. 4 (Measurement) in Methods Market. Export from Study Plan and submit with Phase 3.</p>`
  )
}

export function wantedRmMmAssignments () {
  return [
    {
      id: CANVAS_RM_ASSIGNMENT_IDS.articleReview,
      name: 'Article Review and Problem Statement',
      description: articleReviewDescription()
    },
    {
      id: CANVAS_RM_ASSIGNMENT_IDS.phase3,
      name: 'Phase 3: Elevator Speech',
      description: phase3Description()
    },
    {
      id: CANVAS_RM_ASSIGNMENT_IDS.phase4,
      name: 'Phase 4 Worksheet (Operationalization Exploration)',
      description: phase4Description()
    }
  ]
}
