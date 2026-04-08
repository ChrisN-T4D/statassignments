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
    question: 'A research proposal should align the question, design, measures, and feasibility (timeline, resources).',
    correct: true,
    feedback: {
      correct: 'Alignment across question, methods, and feasibility is central to a strong proposal.',
      incorrect: 'Proposals should show coherent fit among question, design, measures, and what is doable.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m2-q7',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'Preregistering an analysis plan, when feasible, mainly aims to:',
    options: [
      { id: 'a', text: 'Prevent any exploratory analyses' },
      { id: 'b', text: 'Document planned hypotheses and analyses before seeing results, reducing selective reporting' },
      { id: 'c', text: 'Replace peer review' },
      { id: 'd', text: 'Ensure p-values are always below .05' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Preregistration clarifies what was planned versus exploratory.',
      incorrect: 'Preregistration reduces selective reporting bias; exploration can still be disclosed.'
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
    question: 'Exploratory data analysis can be valuable as long as it is reported transparently and not sold as confirmatory.',
    correct: true,
    feedback: {
      correct: 'Exploration is fine when clearly labeled and interpreted with appropriate caution.',
      incorrect: 'The issue is conflating exploration with confirmatory claims, not exploration itself.'
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
    question: 'Secondary analysis uses:',
    options: [
      { id: 'a', text: 'Data collected by others, analyzed to address new questions' },
      { id: 'b', text: 'Only data you personally collected yesterday' },
      { id: 'c', text: 'Interviews without consent' },
      { id: 'd', text: 'Fabricated datasets' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Secondary analysis reuses existing data for new analyses (with appropriate permissions).',
      incorrect: 'Secondary analysis works with existing datasets, ethically obtained.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m2-q12',
    moduleId: 'rm-module-2',
    type: 'multiple_choice',
    question: 'A strong introduction in an empirical paper typically moves from:',
    options: [
      { id: 'a', text: 'Broad context → specific gap → purpose/hypotheses' },
      { id: 'b', text: 'Statistical tables → broad context' },
      { id: 'c', text: 'Methods → references' },
      { id: 'd', text: 'Appendix → title' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Introductions funnel from general importance to the study’s specific aims.',
      incorrect: 'Classic structure narrows from context and gap to the study’s purpose.'
    },
    difficulty: 'easy'
  }
]
