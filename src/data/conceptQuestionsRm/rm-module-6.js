// Research Methods — Module 6: Non-Experimental Research
export const rmModule6Questions = [
  {
    id: 'rm-m6-q1',
    moduleId: 'rm-module-6',
    type: 'multiple_choice',
    question: 'Correlational research is best for:',
    options: [
      { id: 'a', text: 'Establishing causation with high internal validity' },
      { id: 'b', text: 'Describing relationships between variables as they naturally occur' },
      { id: 'c', text: 'Manipulating treatments randomly' },
      { id: 'd', text: 'Eliminating third variables' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Correlation assesses association; causation requires stronger designs.',
      incorrect: 'Correlation does not imply causation because of directionality and third variables.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m6-q2',
    moduleId: 'rm-module-6',
    type: 'true_false',
    question: 'A positive correlation means that as one variable increases, the other tends to increase.',
    correct: true,
    feedback: {
      correct: 'Positive association means co-increasing (on average).',
      incorrect: 'That is the definition of a positive correlation.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m6-q3',
    moduleId: 'rm-module-6',
    type: 'multiple_choice',
    question: 'Naturalistic observation emphasizes:',
    options: [
      { id: 'a', text: 'Behavior in everyday contexts with minimal interference' },
      { id: 'b', text: 'Random assignment to stress conditions' },
      { id: 'c', text: 'Guaranteed causal conclusions' },
      { id: 'd', text: 'Double-blind medication administration' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Naturalistic observation studies behavior in context with limited researcher intrusion.',
      incorrect: 'Observation is non-experimental; causation is not established by observation alone.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m6-q4',
    moduleId: 'rm-module-6',
    type: 'multiple_select',
    question: 'Qualitative research often involves: (Select all that apply)',
    options: [
      { id: 'a', text: 'Rich descriptions and themes from texts or interviews' },
      { id: 'b', text: 'Open-ended exploration of meaning' },
      { id: 'c', text: 'Random assignment to conditions' },
      { id: 'd', text: 'Interpretation grounded in participant perspectives' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Qualitative work emphasizes depth, meaning, and interpretation.',
      incorrect: 'Random assignment is experimental; many qualitative designs are non-experimental.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m6-q5',
    moduleId: 'rm-module-6',
    type: 'multiple_choice',
    question: 'A case study is:',
    options: [
      { id: 'a', text: 'An in-depth examination of an individual, group, or instance' },
      { id: 'b', text: 'A study with N = 10,000 always' },
      { id: 'c', text: 'Synonymous with meta-analysis' },
      { id: 'd', text: 'Only used in medicine' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Case studies provide detailed insight, often generating hypotheses.',
      incorrect: 'Case studies are defined by depth, not a fixed N or field.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m6-q6',
    moduleId: 'rm-module-6',
    type: 'true_false',
    question: 'Archival research uses existing records (e.g., documents, databases) rather than newly collected responses.',
    correct: true,
    feedback: {
      correct: 'Archival designs analyze pre-existing data with attention to completeness and bias.',
      incorrect: 'Archival work leverages stored records, not only fresh surveys.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m6-q7',
    moduleId: 'rm-module-6',
    type: 'multiple_choice',
    question: 'Participant observation may threaten validity because:',
    options: [
      { id: 'a', text: 'The observer can influence the setting or be biased in notes' },
      { id: 'b', text: 'It always uses double-blind procedures' },
      { id: 'c', text: 'It cannot produce any data' },
      { id: 'd', text: 'It requires p < .001' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Reactivity and researcher subjectivity are key concerns.',
      incorrect: 'Participant observation is interactive; blinding is often partial or absent.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m6-q8',
    moduleId: 'rm-module-6',
    type: 'multiple_select',
    question: 'Why can’t we infer X causes Y from a correlation alone? (Select all that apply)',
    options: [
      { id: 'a', text: 'Y might cause X (directionality)' },
      { id: 'b', text: 'A third variable might cause both' },
      { id: 'c', text: 'Correlation always means no relationship' },
      { id: 'd', text: 'The relationship might be non-causal or spurious' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Direction, third variables, and non-causal links block simple causal claims.',
      incorrect: 'Correlation indicates association, not its absence.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m6-q9',
    moduleId: 'rm-module-6',
    type: 'multiple_choice',
    question: 'Content analysis is:',
    options: [
      { id: 'a', text: 'A systematic coding of communication content into categories' },
      { id: 'b', text: 'A synonym for random sampling' },
      { id: 'c', text: 'Only used for blood samples' },
      { id: 'd', text: 'Illegal without court order' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Content analysis quantifies patterns in text, media, or messages with rules.',
      incorrect: 'It is a research method for symbolic material, not biological assays.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m6-q10',
    moduleId: 'rm-module-6',
    type: 'true_false',
    question: 'Non-experimental designs can have strong external validity for how variables co-occur in the real world.',
    correct: true,
    feedback: {
      correct: 'Field correlational studies sometimes generalize well to natural covariation.',
      incorrect: 'Tradeoffs exist: external realism can be high even when internal causal validity is limited.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m6-q11',
    moduleId: 'rm-module-6',
    type: 'multiple_choice',
    question: 'Ethnography typically involves:',
    options: [
      { id: 'a', text: 'Extended engagement in a cultural context to understand meanings and practices' },
      { id: 'b', text: 'One-shot online polls only' },
      { id: 'c', text: 'Guaranteed representative sampling of a nation' },
      { id: 'd', text: 'Exclusively laboratory trials' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Ethnography emphasizes immersion and contextual interpretation.',
      incorrect: 'Ethnography is not defined by quick polls or lab-only designs.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m6-q12',
    moduleId: 'rm-module-6',
    type: 'multiple_choice',
    question: 'Cross-sectional designs measure variables:',
    options: [
      { id: 'a', text: 'At one point in time' },
      { id: 'b', text: 'Repeatedly across years for the same cohort always' },
      { id: 'c', text: 'Only after an intervention' },
      { id: 'd', text: 'Only in animals' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Cross-sectional = snapshot; longitudinal tracks over time.',
      incorrect: 'Longitudinal and cross-sectional differ in timing of measurement.'
    },
    difficulty: 'easy'
  }
]
