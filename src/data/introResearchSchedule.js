/**
 * Week-by-week schedule for PSYC 5033 Introduction to Research, Spring 2027 (Mon/Wed 5:15-6:30).
 * Mirrors the syllabus draft (workspace/plans/psyc-5033-sp27): assignments are due Sunday 11:59 PM.
 * Chapters reuse the Research Methods chapter modules (same ids as the class page).
 * Which chapters sit in which week is proposed from each week's focus; the instructor confirms.
 * Follows the Research Methods flow (reorganized 2026-10-26): read widely and draft the literature review first, then narrow the question,
 * then design the study. The study is never carried out, so the literature and methods work is deeper. No midterm or final exam.
 * Dates are the Monday of each week (NWOSU calendar: classes Jan 11, MLK Jan 18, spring break Mar 15-19, finals May 3-6).
 */
export const INTRO_RESEARCH = {
  slug: 'intro-research',
  course: 'PSYC 5033',
  name: 'Spring 2027',
  title: 'Introduction to Research',
  reading: 'rm',
  weeks: [
    {
      start: '2027-01-11',
      title: 'Welcome and orientation',
      why: 'Start here: see how your proposal will be built, then finish the four first-week tasks.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-1' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-syllabus-ack', label: 'Syllabus acknowledgement', due: '2027-01-17' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-intro-discussion', label: 'Introduction discussion', due: '2027-01-17' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-ai-quiz', label: 'AI quiz', due: '2027-01-17' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-apa-quiz', label: 'APA quiz', due: '2027-01-17' }
      ]
    },
    {
      start: '2027-01-18',
      title: 'Choose a broad topic',
      note: 'No class Mon (MLK Day)',
      why: 'Pick a topic broad enough to read widely in. Your question gets narrower later, once you know what the research says.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-2' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-interest-statement', label: 'Research interest statement', due: '2027-01-24' }
      ]
    },
    {
      start: '2027-01-25',
      title: 'Article critique',
      why: 'Critiquing one article teaches you what a strong study looks like and starts your reading.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-article-critique', label: 'Article critique', due: '2027-01-31' }
      ]
    },
    {
      start: '2027-02-01',
      title: 'Annotated bibliography and theory',
      why: 'Collect and summarize sources, and find the theory that frames your topic.',
      items: [
        { role: 'do', kind: 'study-plan', sectionId: 'article-review', label: 'Annotated bibliography worksheet', due: '2027-02-07' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-annotated-bibliography', label: 'Annotated bibliography', due: '2027-02-07' },
        { role: 'do', kind: 'study-plan', sectionId: 'theory-selection', label: 'Theory selection worksheet', due: '2027-02-07' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-theory-selection', label: 'Theory selection', due: '2027-02-07' }
      ]
    },
    {
      start: '2027-02-08',
      title: 'Literature review outline',
      why: 'Organize what you have read into an argument by idea, not article by article.',
      items: [
        { role: 'do', kind: 'study-plan', sectionId: 'study-focus', label: 'Literature review outline worksheet', due: '2027-02-14' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-lit-outline', label: 'Literature review outline', due: '2027-02-14' }
      ]
    },
    {
      start: '2027-02-15',
      title: 'Literature review draft',
      why: 'Write the first full draft. It can stay broad: the next step is to narrow.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-lit-review-draft', label: 'Literature review draft', due: '2027-02-21' }
      ]
    },
    {
      start: '2027-02-22',
      title: 'Narrow the question',
      note: 'No class Wed Feb 24 (working day)',
      why: 'Now that you know the literature, narrow your topic to a researchable question and hypotheses.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-question-hypotheses', label: 'Research question and hypotheses', due: '2027-02-28' }
      ]
    },
    {
      start: '2027-03-01',
      title: 'Literature review final',
      why: 'Revise the review around your narrowed question and your theory, and name the gap your study fills.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-lit-final', label: 'Literature review final', due: '2027-03-07' }
      ]
    },
    {
      start: '2027-03-08',
      title: 'Method choice and measures',
      note: 'No class Wed Mar 10 (working day)',
      why: 'Choose the design that fits your question, defend it, and decide how you will measure each variable.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-4' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-5' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-6' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-7' },
        { role: 'do', kind: 'study-plan', sectionId: 'phase-4', label: 'Method choice worksheet', due: '2027-03-14' },
        { role: 'do', kind: 'study-plan', sectionId: 'measures-draft', label: 'Measures worksheet', due: '2027-03-14' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-method-choice', label: 'Method choice and measures', due: '2027-03-14' }
      ]
    },
    {
      start: '2027-03-15',
      title: 'Spring break',
      note: 'Spring break Mar 15-19, campus closed',
      items: []
    },
    {
      start: '2027-03-22',
      title: 'Methods and ethics plan',
      why: 'Write the methods section and a consent and ethics plan so someone else could carry out your study.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-3' },
        { role: 'do', kind: 'study-plan', sectionId: 'recruitment-consent', label: 'Recruitment and consent', due: '2027-03-28', note: 'Write what the IRB would read: scripts, consent form, and survey checks.' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-methods-draft', label: 'Methods section', due: '2027-03-28' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-irb-ethics', label: 'Ethics and consent plan', due: '2027-03-28' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-ethics-training', label: 'Ethics training certificate', due: '2027-03-28' }
      ]
    },
    {
      start: '2027-03-29',
      title: 'Analysis plan',
      why: 'Plan how you would analyze the data so your design and your tests match your hypotheses.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-12' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-13' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-analysis-plan', label: 'Analysis plan', due: '2027-04-04' }
      ]
    },
    {
      start: '2027-04-05',
      title: 'Full draft proposal',
      note: 'No class Wed Apr 7 (working day)',
      why: 'Bring the literature review, methods, ethics plan, and analysis plan into one draft, and check that the pieces agree.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-11' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-draft-proposal', label: 'Draft proposal', due: '2027-04-11' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-irb-form-edits', label: 'IRB form edits', due: '2027-04-11' }
      ]
    },
    {
      start: '2027-04-12',
      title: 'Peer review',
      note: 'No class Wed Apr 14 (working day)',
      why: 'Peer feedback shows you where a reader gets lost before your grade does.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-peer-review', label: 'Peer review', due: '2027-04-18' }
      ]
    },
    {
      start: '2027-04-19',
      title: 'Revision and presentation preparation',
      note: 'First presentations Wed Apr 21',
      why: 'Revise using the feedback, finish the final paper, and turn the proposal into a short talk.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-final-proposal', label: 'Final proposal paper', due: '2027-04-25' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-presentation', label: 'Presentation', due: '2027-04-25' }
      ]
    },
    {
      start: '2027-04-26',
      title: 'Presentations',
      note: 'Last in-person class Wed Apr 28',
      items: []
    }
  ],
  phases: [
    { label: 'Topic', from: 0, to: 2 },
    { label: 'Literature', from: 3, to: 7 },
    { label: 'Methods and ethics', from: 8, to: 10 },
    { label: 'Analysis', from: 11, to: 11 },
    { label: 'Draft and review', from: 12, to: 13 },
    { label: 'Present', from: 14, to: 15 }
  ],
  milestones: [
    { week: 5, icon: 'doc', label: 'Literature review draft', dateLabel: 'Feb 21' },
    { week: 6, icon: 'flag', label: 'Narrowed question', dateLabel: 'Feb 28' },
    { week: 10, icon: 'doc', label: 'Methods and ethics plan', dateLabel: 'Mar 28' },
    { week: 12, icon: 'doc', label: 'Draft proposal', dateLabel: 'Apr 11' },
    { week: 14, icon: 'present', label: 'Final proposal and talk', dateLabel: 'Apr 25' }
  ],
  minorWeeks: []
}
