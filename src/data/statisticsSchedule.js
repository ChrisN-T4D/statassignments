/**
 * Week-by-week schedule for PSYC 4213 Statistics, Spring 2027.
 * One sequence serves both the online section and the in-person sections: the modules and weeks are the same,
 * but each section has its own due dates in Canvas, so items here carry no `due`.
 * Dates are the Monday of each week (NWOSU calendar: classes Jan 11, MLK Jan 18, spring break Mar 15-19, finals May 3-6).
 * `proposed` marks placement the instructor has not confirmed.
 */
export const STATISTICS = {
  slug: 'statistics',
  course: 'PSYC 4213',
  name: 'Spring 2027',
  title: 'Statistics',
  reading: 'stats',
  blurb: 'Online and in-person sections follow the same modules. Your own due dates are in Canvas.',
  weeks: [
    {
      start: '2027-01-11',
      title: 'Why learn statistics',
      why: 'Start here: see why psychologists need statistics, set up Methods Market, and introduce yourself.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'stats-module-1' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'm1-discussion', label: 'Module 1 discussion' }
      ]
    },
    {
      start: '2027-01-18',
      title: 'Research design and measurement',
      note: 'No class Mon (MLK Day)',
      why: 'Variables and measurement come first because every later statistic depends on what was measured and how.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'stats-module-2' },
        { role: 'help', kind: 'assignment-help', assignmentId: 'm2-levels-quiz', label: 'Levels of measurement quiz' }
      ]
    },
    {
      start: '2027-01-25',
      title: 'Evaluate a measure',
      why: 'Apply reliability and validity to a real measure before you start working with data.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'm2-pss-reliability-validity', label: 'Reliability and validity assignment' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'm2-discussion', label: 'Module 2 discussion' }
      ]
    },
    {
      start: '2027-02-01',
      title: 'Software basics',
      why: 'Learn the software now so the next modules can focus on statistics instead of menus.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'stats-module-3' },
        { role: 'do', kind: 'software', moduleId: 'stats-module-3', label: 'Module 3 software practice' }
      ]
    },
    {
      start: '2027-02-08',
      title: 'Data handling',
      why: 'Practice entering, importing, and saving data so you can show your work on your own file.',
      items: [
        { role: 'do', kind: 'software', moduleId: 'stats-module-3', label: 'Module 3 software practice' }
      ]
    },
    {
      start: '2027-02-15',
      title: 'Benchmark 1',
      why: 'Benchmark 1 checks Modules 1 to 3. Use the practice test to find what to review first.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'benchmark-1', label: 'Benchmark 1' }
      ]
    },
    {
      start: '2027-02-22',
      title: 'Descriptive statistics',
      why: 'Describing a data set (center, spread, shape) is the first step of every analysis you will run.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'stats-module-4' },
        { role: 'do', kind: 'software', moduleId: 'stats-module-4', label: 'Module 4 software practice' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'm4-descriptives', label: 'Descriptive statistics assignment' }
      ]
    },
    {
      start: '2027-03-01',
      title: 'Check normality',
      note: 'First 8 weeks end Mar 6',
      why: 'Check whether a data set looks normal, because many later tests assume it does.',
      items: [
        { role: 'help', kind: 'assignment-help', assignmentId: 'm4-normality-quiz', label: 'Normality practice' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'm4-discussion', label: 'Module 4 discussion' }
      ]
    },
    {
      start: '2027-03-08',
      title: 'Graphing and visualization',
      why: 'Graphs show what the numbers hide, and you will need both to explain results later.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'stats-module-5' },
        { role: 'do', kind: 'software', moduleId: 'stats-module-5', label: 'Module 5 software practice' }
      ]
    },
    {
      start: '2027-03-15',
      title: 'Spring break',
      note: 'Spring break Mar 15-19, no classes',
      items: [
        { role: 'do', kind: 'software', moduleId: 'stats-module-5', label: 'Module 5 software practice' }
      ]
    },
    {
      start: '2027-03-22',
      title: 'Benchmark 2',
      why: 'Benchmark 2 checks Modules 4 and 5. Use the practice test to find what to review first.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'benchmark-2', label: 'Benchmark 2' }
      ]
    },
    {
      start: '2027-03-29',
      title: 'Probability and sampling',
      why: 'Probability is the bridge from describing a sample to making claims about a population.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'stats-module-6' },
        { role: 'do', kind: 'software', moduleId: 'stats-module-6', label: 'Module 6 software practice' }
      ]
    },
    {
      start: '2027-04-05',
      title: 'The normal distribution and sampling',
      why: 'Work with the normal curve and sampling distributions that hypothesis testing relies on.',
      items: [
        { role: 'do', kind: 'software', moduleId: 'stats-module-6', label: 'Module 6 software practice' }
      ]
    },
    {
      start: '2027-04-12',
      title: 'Hypothesis testing',
      why: 'Hypothesis testing puts everything so far to use: state a claim, then test it against the data.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'stats-module-7' },
        { role: 'do', kind: 'software', moduleId: 'stats-module-7', label: 'Module 7 software practice' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'm7-hypothesis-scenarios', label: 'Hypotheses and choosing the test' }
      ]
    },
    {
      start: '2027-04-19',
      title: 'Apply hypothesis tests',
      why: 'Practice choosing the right test for a question and explaining the result.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'm7-discussion', label: 'Module 7 discussion' }
      ]
    },
    {
      start: '2027-04-26',
      title: 'Comparing groups and relationships',
      why: 'The last module compares groups and relationships (t-tests, ANOVA, regression, chi-square), the tests you will meet in research.',
      items: [
        { role: 'read', kind: 'chapter', moduleId: 'stats-module-8' },
        { role: 'do', kind: 'software', moduleId: 'stats-module-8', label: 'Module 8 software practice' },
        { role: 'do', kind: 'assignment-help', assignmentId: 'm8-discussion', label: 'Module 8 discussion' }
      ]
    },
    {
      start: '2027-05-03',
      title: 'Final benchmark',
      note: 'Finals week May 3-6',
      why: 'The final benchmark covers Modules 6 to 8. Review those first.',
      items: [
        { role: 'do', kind: 'assignment-help', assignmentId: 'final-benchmark', label: 'Final benchmark' }
      ]
    }
  ],
  phases: [
    { label: 'Foundations', from: 0, to: 2 },
    { label: 'Software', from: 3, to: 4 },
    { label: 'Descriptives', from: 6, to: 9 },
    { label: 'Inference', from: 11, to: 15 },
    { label: 'Final', from: 16, to: 16 }
  ],
  milestones: [
    { week: 5, icon: 'doc', label: 'Benchmark 1', dateLabel: 'Feb 15' },
    { week: 10, icon: 'doc', label: 'Benchmark 2', dateLabel: 'Mar 22' },
    { week: 16, icon: 'trophy', label: 'Final benchmark', dateLabel: 'May 3' }
  ],
  minorWeeks: []
}
