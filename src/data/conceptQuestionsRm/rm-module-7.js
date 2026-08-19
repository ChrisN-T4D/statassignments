// Research Methods — Module 7: Survey Research
export const rmModule7Questions = [
  {
    id: 'rm-m7-q1',
    moduleId: 'rm-module-7',
    type: 'multiple_choice',
    question: 'Sampling frame refers to:',
    options: [
      { id: 'a', text: 'The list or source from which sample members are drawn' },
      { id: 'b', text: 'The margin of error formula' },
      { id: 'c', text: 'The survey’s font size' },
      { id: 'd', text: 'Cronbach’s alpha' }
    ],
    correct: 'a',
    feedback: {
      correct: 'The frame operationalizes who could be selected.',
      incorrect: 'Coverage error arises when the frame mismatches the target population.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m7-q2',
    moduleId: 'rm-module-7',
    type: 'true_false',
    question: 'Double-barreled questions ask about two issues at once and should be avoided.',
    correct: true,
    feedback: {
      correct: 'Respondents cannot answer unambiguously if two topics are fused.',
      incorrect: 'Split double-barreled items into separate questions.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m7-q3',
    moduleId: 'rm-module-7',
    type: 'multiple_choice',
    question: 'Context effects on survey responses include:',
    options: [
      { id: 'a', text: 'Wording or scale anchors that shift how people interpret and answer items' },
      { id: 'b', text: 'Using stratified random sampling' },
      { id: 'c', text: 'Drawing a simple random sample from a frame' },
      { id: 'd', text: 'Pilot testing a questionnaire before the main study' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Response options and item order can change what people retrieve from memory and report.',
      incorrect: 'Probability sampling and pilot testing are design choices, not context effects on answers.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m7-q4',
    moduleId: 'rm-module-7',
    type: 'multiple_select',
    question: 'Which improve survey measurement quality? (Select all that apply)',
    options: [
      { id: 'a', text: 'Clear, specific wording' },
      { id: 'b', text: 'Balanced response options' },
      { id: 'c', text: 'Leading questions that hint at the “right” answer' },
      { id: 'd', text: 'Pilot testing items before the main data collection' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Clarity, balance, and pretesting reduce measurement error.',
      incorrect: 'Leading questions distort responses.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m7-q5',
    moduleId: 'rm-module-7',
    type: 'multiple_choice',
    question: 'A probability sample allows:',
    options: [
      { id: 'a', text: 'Known selection probabilities for inferring to the population' },
      { id: 'b', text: 'Guaranteed 100% response rate' },
      { id: 'c', text: 'Elimination of all nonresponse bias' },
      { id: 'd', text: 'Causal claims without controls' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Probability sampling supports statistical inference; nonresponse can still bias results.',
      incorrect: 'Probability samples do not guarantee full participation or causation.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m7-q6',
    moduleId: 'rm-module-7',
    type: 'true_false',
    question: 'Open-ended questions can yield rich detail but are harder to code and compare across respondents.',
    correct: true,
    feedback: {
      correct: 'Tradeoff: richness versus standardization and analysis cost.',
      incorrect: 'Open-ended responses need coding schemes for aggregation.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m7-q7',
    moduleId: 'rm-module-7',
    type: 'multiple_choice',
    question: 'Order effects in questionnaires can be mitigated by:',
    options: [
      { id: 'a', text: 'Counterbalancing or rotating item/section orders across respondents' },
      { id: 'b', text: 'Putting all sensitive questions first always' },
      { id: 'c', text: 'Using only one order for everyone' },
      { id: 'd', text: 'Removing informed consent' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Rotation distributes order artifacts.',
      incorrect: 'Fixed order can create priming and fatigue artifacts.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m7-q8',
    moduleId: 'rm-module-7',
    type: 'multiple_select',
    question: 'Sampling bias occurs when: (Select all that apply)',
    options: [
      { id: 'a', text: 'The sampling frame leaves out part of the target population' },
      { id: 'b', text: 'Every population member has a known probability of selection' },
      { id: 'c', text: 'A phone list omits people who use only mobile phones' },
      { id: 'd', text: 'Stratification matches key subgroup proportions in the population' }
    ],
    correct: ['a', 'c'],
    feedback: {
      correct: 'Bias arises when the frame or method systematically excludes some population members, as in classic polling mistakes.',
      incorrect: 'Known selection probabilities and planned stratification are tools to improve—not undermine—representation.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m7-q9',
    moduleId: 'rm-module-7',
    type: 'multiple_choice',
    question: 'A Likert scale item “Strongly disagree … Strongly agree” is:',
    options: [
      { id: 'a', text: 'A rating format for attitudes or agreement' },
      { id: 'b', text: 'A ratio measure of weight' },
      { id: 'c', text: 'A randomization device' },
      { id: 'd', text: 'Always nominal' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Likert-type items capture ordered agreement or intensity.',
      incorrect: 'They are not weight scales or nominal labels alone.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m7-q10',
    moduleId: 'rm-module-7',
    type: 'true_false',
    question: 'Nonresponse bias can occur even in a random sample if those who decline differ systematically from participants.',
    correct: true,
    feedback: {
      correct: 'Response rate and respondent composition matter for inference.',
      incorrect: 'Random invitation does not remove nonresponse bias.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m7-q11',
    moduleId: 'rm-module-7',
    type: 'multiple_choice',
    question: 'Branching (skip logic) helps:',
    options: [
      { id: 'a', text: 'Show relevant items only, reducing burden and irrelevant responses' },
      { id: 'b', text: 'Guarantee causal inference' },
      { id: 'c', text: 'Remove the need for ethics review' },
      { id: 'd', text: 'Eliminate the need for pretesting' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Skip logic tailors the instrument to prior answers.',
      incorrect: 'Branching improves flow; it does not replace ethics or piloting.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m7-q12',
    moduleId: 'rm-module-7',
    type: 'multiple_choice',
    question: 'Double-barreled survey items are especially problematic when asking about:',
    options: [
      { id: 'a', text: 'Two distinct topics in one question, so the answer is ambiguous' },
      { id: 'b', text: 'Favorite ice cream flavors' },
      { id: 'c', text: 'Height in centimeters' },
      { id: 'd', text: 'Zip codes' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Combining two issues in one item prevents knowing which part the respondent is answering.',
      incorrect: 'Factual, low-stakes items are less affected by the double-barreled wording problem.'
    },
    difficulty: 'easy'
  }
]
