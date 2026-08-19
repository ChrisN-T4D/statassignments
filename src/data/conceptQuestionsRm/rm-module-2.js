// Research Methods — Module 2: Overview of the Scientific Method
export const rmModule2Questions = [
  {
    id: 'rm-m2-q1',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'Which step typically comes first when developing a research project?',
    options: [
      { id: 'a', text: 'Choosing statistical tests before a question exists' },
      { id: 'b', text: 'Refining a research question from interests and prior literature' },
      { id: 'c', text: 'Publishing results' },
      { id: 'd', text: 'Ignoring previous studies' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Questions are sharpened using interests and the literature before design choices.',
      incorrect: 'A focused question grounded in literature usually precedes design and analysis choices.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m2-q2',
    moduleId: 'rm-module-2',
    type: 'true_false',
    question: 'A literature review mainly serves to show that no one has ever studied the topic before.',
    correct: false,
    feedback: {
      correct: 'Reviews synthesize evidence, identify gaps, and justify the new study’s contribution.',
      incorrect: 'Prior work almost always exists; the review maps it and motivates your study.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m2-q3',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'Peer review is intended to:',
    options: [
      { id: 'a', text: 'Guarantee that published findings are true' },
      { id: 'b', text: 'Provide expert evaluation of rigor, clarity, and contribution before publication' },
      { id: 'c', text: 'Replace the need for replication' },
      { id: 'd', text: 'Eliminate all errors in manuscripts' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Peer review is quality control, not a guarantee of truth.',
      incorrect: 'Peer review improves rigor and clarity but does not certify correctness.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m2-q4',
    moduleId: 'rm-module-2',
    type: 'multiple_select',
    question: 'Good reasons to read the “Discussion” section of an article include: (Select all that apply)',
    options: [
      { id: 'a', text: 'Seeing how authors interpret findings and relate them to theory' },
      { id: 'b', text: 'Finding limitations and future directions' },
      { id: 'c', text: 'Obtaining raw participant IDs' },
      { id: 'd', text: 'Understanding practical implications' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Discussions interpret results, note limits, and discuss implications.',
      incorrect: 'Discussions typically do not list raw identifiers; they synthesize meaning and limits.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m2-q5',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'Working backward through reference lists helps a researcher to:',
    options: [
      { id: 'a', text: 'Trace foundational and related studies on a topic' },
      { id: 'b', text: 'Avoid reading primary sources' },
      { id: 'c', text: 'Guarantee a significant result' },
      { id: 'd', text: 'Skip defining variables' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Citation chaining locates influential and related prior work.',
      incorrect: 'Following references builds context; it does not replace careful design.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m2-q6',
    moduleId: 'rm-module-2',
    type: 'true_false',
    question: 'Before collecting data, researchers should check that their question, methods, and available resources fit together realistically.',
    correct: true,
    feedback: {
      correct: 'Feasibility—time, money, access to participants, and technical skill—is a core criterion when evaluating whether to pursue a question.',
      incorrect: 'Strong plans match the question to workable methods and what the researcher can actually carry out.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m2-q7',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'Double-blind peer review in psychology journals is intended to:',
    options: [
      { id: 'a', text: 'Guarantee that published findings are true' },
      { id: 'b', text: 'Provide expert evaluation of rigor and contribution before publication while reviewers remain anonymous to authors' },
      { id: 'c', text: 'Replace the need for replication' },
      { id: 'd', text: 'Eliminate all errors in manuscripts' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Peer review is quality control, not a guarantee of truth; double-blind review limits bias from knowing authors’ identities.',
      incorrect: 'Peer review improves rigor and clarity but does not certify correctness or remove the need for replication.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m2-q8',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'A “gap” in the literature refers to:',
    options: [
      { id: 'a', text: 'An unanswered question or missing evidence that your study can address' },
      { id: 'b', text: 'A missing page in a PDF' },
      { id: 'c', text: 'Any study with a small sample' },
      { id: 'd', text: 'Replication of a classic finding' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Gaps are substantive unanswered questions or unmet evidence needs.',
      incorrect: 'Literature gaps are about knowledge, not file formatting.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m2-q9',
    moduleId: 'rm-module-2',
    type: 'true_false',
    question: 'Empirical results can support a theory, but researchers generally avoid saying a theory has been proved.',
    correct: true,
    feedback: {
      correct: 'Statistics are probabilistic, and alternative explanations may remain—so theories are revised, not proven once and for all.',
      incorrect: 'Even strong, statistically significant results leave room for error and future disconfirmation.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m2-q10',
    moduleId: 'rm-module-2',
    type: 'multiple_select',
    question: 'Which items belong in a clear research rationale? (Select all that apply)',
    options: [
      { id: 'a', text: 'Why the question matters' },
      { id: 'b', text: 'What is already known and what remains unclear' },
      { id: 'c', text: 'The exact p-value you expect' },
      { id: 'd', text: 'How the study extends or tests prior work' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Rationale covers importance, prior knowledge, and contribution.',
      incorrect: 'Expected p-values are not part of a scientific rationale.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m2-q11',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'Reviewing the research literature early in a project helps researchers to:',
    options: [
      { id: 'a', text: 'See whether a question has already been answered and refine it based on prior work' },
      { id: 'b', text: 'Avoid reading any primary sources' },
      { id: 'c', text: 'Guarantee a significant result' },
      { id: 'd', text: 'Skip defining variables' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Literature reviews map existing evidence, identify gaps, and sharpen new questions.',
      incorrect: 'Early review builds on prior work; it does not replace careful design or variable definition.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m2-q12',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'A typical empirical research report in a journal describes:',
    options: [
      { id: 'a', text: 'The research question, method, results, and conclusions drawn from the data' },
      { id: 'b', text: 'Only raw participant identifiers' },
      { id: 'c', text: 'Methods before any research question is stated' },
      { id: 'd', text: 'Appendix materials with no summary of findings' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Empirical reports introduce the question, explain methods, present results, and interpret conclusions.',
      incorrect: 'Published reports summarize methods and findings; they do not list private identifiers.'
    },
    difficulty: 'easy'
  }
]
