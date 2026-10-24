/**
 * Week-by-week schedule for PSYC 5033 Introduction to Research, Spring 2027 (Mon/Wed 5:15-6:30).
 * Mirrors the syllabus draft (workspace/plans/psyc-5033-sp27): assignments are due Sunday 11:59 PM.
 * Chapters reuse the Research Methods chapter modules (same ids as the class page).
 * Which chapters sit in which week is proposed from each week's focus; the instructor confirms.
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
      title: 'Article critique and interest',
      note: 'No class Mon (MLK Day)',
      why: 'Critiquing one article teaches you what a strong study looks like, and your interest statement names the topic you will propose.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-2' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-article-critique', label: 'Article critique', due: '2027-01-24' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-interest-statement', label: 'Research interest statement', due: '2027-01-24' }
      ]
    },
    {
      start: '2027-01-25',
      title: 'Research questions',
      why: 'A researchable question and hypothesis steer every later choice in your proposal.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-question-hypotheses', label: 'Research question and hypotheses', due: '2027-01-31' }
      ]
    },
    {
      start: '2027-02-01',
      title: 'Annotated bibliography',
      why: 'Collecting and summarizing sources now gives you the evidence base for your literature review.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-annotated-bibliography', label: 'Annotated bibliography', due: '2027-02-07' }
      ]
    },
    {
      start: '2027-02-08',
      title: 'Literature review',
      why: 'Synthesize your sources into an argument for why your question needs answering.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-lit-review-draft', label: 'Literature review draft', due: '2027-02-14' }
      ]
    },
    {
      start: '2027-02-15',
      title: 'Choosing a method',
      why: 'Compare designs so you can pick the one that fits your question, then draft your methods.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-5' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-6' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-methods-draft', label: 'Methods draft', due: '2027-02-21' }
      ]
    },
    {
      start: '2027-02-22',
      title: 'Ethics and the IRB',
      note: 'No class Wed Feb 24 (working day)',
      why: 'Your proposal needs an ethics plan, so learn the IRB expectations before you finalize instruments.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-3' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-irb-ethics', label: 'IRB and ethics summary', due: '2027-02-28' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-ethics-training', label: 'Ethics training certificate', due: '2027-02-28' }
      ]
    },
    {
      start: '2027-03-01',
      title: 'Recruitment, consent, instruments',
      why: 'Decide how you will recruit, get consent, and measure your variables.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-4' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-7' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-instruments', label: 'Instruments and appendices draft', due: '2027-03-07' }
      ]
    },
    {
      start: '2027-03-08',
      title: 'Midterm',
      note: 'No class Wed Mar 10 (working day)',
      why: 'The online midterm checks the concepts behind your proposal so far.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-midterm', label: 'Midterm exam', due: '2027-03-14' }
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
      title: 'Analysis plan',
      why: 'Plan how you will analyze your data so your design and your tests match your hypotheses.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-12' },
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-13' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-analysis-plan', label: 'Analysis plan', due: '2027-03-28' }
      ]
    },
    {
      start: '2027-03-29',
      title: 'Full draft proposal',
      why: 'Bring the literature review, methods, and analysis plan together into one draft proposal.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'rm-module-11' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-draft-proposal', label: 'Draft proposal', due: '2027-04-04' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-irb-form-edits', label: 'IRB form edits', due: '2027-04-04' }
      ]
    },
    {
      start: '2027-04-05',
      title: 'Writing clinic',
      note: 'No class Wed Apr 7 (working day)',
      why: 'Use the clinic and your working day to revise the weakest section of your draft.',
      items: []
    },
    {
      start: '2027-04-12',
      title: 'Peer review roundtable',
      note: 'No class Wed Apr 14 (working day)',
      why: 'Peer feedback shows you where a reader gets lost before your grade does.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-presentation', label: 'Presentation draft', due: '2027-04-18' }
      ]
    },
    {
      start: '2027-04-19',
      title: 'Presentation preparation',
      note: 'First presentations Wed Apr 21',
      why: 'Turn your proposal into a short talk and finish the final paper.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-final-proposal', label: 'Final proposal paper', due: '2027-04-25' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-presentation', label: 'Final presentation', due: '2027-04-25' }
      ]
    },
    {
      start: '2027-04-26',
      title: 'Presentations',
      note: 'Last in-person class Wed Apr 28',
      items: []
    },
    {
      start: '2027-05-03',
      title: 'Final exam',
      note: 'Finals week May 3-6',
      why: 'The online final is cumulative and applies research principles to case scenarios.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'ir-final-exam', label: 'Final exam (Wed May 5, 5:00 PM)', due: '2027-05-05' }
      ]
    }
  ],
  phases: [
    { label: 'Topic', from: 0, to: 2 },
    { label: 'Literature', from: 3, to: 4 },
    { label: 'Methods and ethics', from: 5, to: 8 },
    { label: 'Analysis', from: 10, to: 10 },
    { label: 'Draft and review', from: 11, to: 13 },
    { label: 'Present', from: 14, to: 16 }
  ],
  milestones: [
    { week: 4, icon: 'doc', label: 'Literature review draft', dateLabel: 'Feb 14' },
    { week: 8, icon: 'doc', label: 'Midterm', dateLabel: 'Mar 14' },
    { week: 11, icon: 'doc', label: 'Draft proposal', dateLabel: 'Apr 4' },
    { week: 14, icon: 'present', label: 'Final proposal and talk', dateLabel: 'Apr 25' },
    { week: 16, icon: 'trophy', label: 'Final exam', dateLabel: 'May 5' }
  ],
  minorWeeks: []
}
