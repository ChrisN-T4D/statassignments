// Research Methods — Module 8: Quasi-Experimental Research
export const rmModule8Questions = [
  {
    id: 'rm-m8-q1',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'Quasi-experiments lack random assignment, so:',
    options: [
      { id: 'a', text: 'Causal claims require extra caution about pre-existing group differences' },
      { id: 'b', text: 'They always prove causation' },
      { id: 'c', text: 'They cannot be published' },
      { id: 'd', text: 'They never use control groups' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Selection and history threats are harder to rule out without randomization.',
      incorrect: 'Quasi-experiments can be informative but are weaker for strict causation.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m8-q2',
    moduleId: 'rm-module-8',
    type: 'true_false',
    question: 'A nonequivalent control group design compares a treated group to a non-randomly chosen control group.',
    correct: true,
    feedback: {
      correct: 'Groups may differ before treatment; matching or statistics help but do not equal random assignment.',
      incorrect: '“Nonequivalent” signals non-random formation of groups.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m8-q3',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'Interrupted time-series designs examine:',
    options: [
      { id: 'a', text: 'Whether an outcome’s level or slope changes at an intervention point' },
      { id: 'b', text: 'Only post-treatment snapshots with no pretest' },
      { id: 'c', text: 'Random assignment at each time point always' },
      { id: 'd', text: 'Laboratory tasks exclusively' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Many pre/post observations help separate treatment effects from steady trends.',
      incorrect: 'ITS focuses on temporal pattern change, not one-shot comparisons alone.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m8-q4',
    moduleId: 'rm-module-8',
    type: 'multiple_select',
    question: 'Threats especially salient in quasi-experiments include: (Select all that apply)',
    options: [
      { id: 'a', text: 'Selection: groups differ before treatment' },
      { id: 'b', text: 'Random assignment eliminating all confounds' },
      { id: 'c', text: 'Regression to the mean after extreme pretest scores' },
      { id: 'd', text: 'History coinciding with treatment' }
    ],
    correct: ['a', 'c', 'd'],
    feedback: {
      correct: 'Selection, regression artifacts, and history are common quasi-experimental threats.',
      incorrect: 'Random assignment is the hallmark of true experiments, not typical quasi designs.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m8-q5',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'A one-group pretest–posttest design is weak because:',
    options: [
      { id: 'a', text: 'Maturation, history, and testing can explain changes without treatment' },
      { id: 'b', text: 'It always includes random assignment' },
      { id: 'c', text: 'It never measures the DV' },
      { id: 'd', text: 'It is illegal' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Without a comparison group, many threats can mimic treatment effects.',
      incorrect: 'The main weakness is confounding temporal threats, not illegality.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m8-q6',
    moduleId: 'rm-module-8',
    type: 'true_false',
    question: 'Adding a nonequivalent comparison group can strengthen quasi-experimental evidence versus a single-group pre–post design.',
    correct: true,
    feedback: {
      correct: 'Comparison groups help attribute change beyond natural drift—if differences are modeled carefully.',
      incorrect: 'Some comparison is usually better than none, even if groups are not equivalent.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m8-q7',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'Propensity scores (conceptually) aim to:',
    options: [
      { id: 'a', text: 'Balance observed covariates between treated and untreated groups' },
      { id: 'b', text: 'Replace the need for any data' },
      { id: 'c', text: 'Guarantee unobserved confounds are removed' },
      { id: 'd', text: 'Convert experiments into surveys' }
    ],
    correct: 'a',
    feedback: {
      correct: 'They adjust for measured selection differences; hidden confounds may remain.',
      incorrect: 'No observational method removes all unmeasured confounding by assumption.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m8-q8',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'Diff-in-diff logic compares:',
    options: [
      { id: 'a', text: 'Changes over time between a treatment and a control group, assuming parallel trends' },
      { id: 'b', text: 'Only post scores in one group' },
      { id: 'c', text: 'Means without any time dimension' },
      { id: 'd', text: 'Likert labels only' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Difference-in-differences contrasts trends; parallel pre-trends are a key assumption.',
      incorrect: 'DiD is inherently about change differences across groups.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m8-q9',
    moduleId: 'rm-module-8',
    type: 'multiple_select',
    question: 'When might a quasi-experiment be ethically or practically necessary? (Select all that apply)',
    options: [
      { id: 'a', text: 'Random assignment is unethical or infeasible' },
      { id: 'b', text: 'Policy is implemented broadly and cannot be withheld randomly' },
      { id: 'c', text: 'The researcher wants zero internal validity' },
      { id: 'd', text: 'Field constraints prevent controlled randomization' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Real-world constraints often force quasi designs despite weaker causal claims.',
      incorrect: 'Researchers still seek validity; constraints force design tradeoffs.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m8-q10',
    moduleId: 'rm-module-8',
    type: 'true_false',
    question: 'In a regression discontinuity design, units just above and below a cutoff are compared, assuming smoothness of potential outcomes at the threshold.',
    correct: true,
    feedback: {
      correct: 'RD exploits a sharp cutoff while comparing units near the threshold.',
      incorrect: 'RD is a strong quasi-experimental design when assumptions hold.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m8-q11',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'Pretest sensitization refers to:',
    options: [
      { id: 'a', text: 'The pretest changing how participants respond to later measures or treatment' },
      { id: 'b', text: 'Using too few items' },
      { id: 'c', text: 'IRB approval' },
      { id: 'd', text: 'Double-blind medication' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Testing can alter subsequent behavior or responses.',
      incorrect: 'It is a validity threat related to measurement order, not ethics approval.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m8-q12',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'Which phrase best fits quasi-experimental causal language?',
    options: [
      { id: 'a', text: '“Changes coincided with the program after accounting for several alternative explanations, but unmeasured confounds remain possible.”' },
      { id: 'b', text: '“Random assignment proves the null hypothesis.”' },
      { id: 'c', text: '“Correlation necessarily implies causation.”' },
      { id: 'd', text: '“No threats ever apply.”' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Careful, qualified causal language fits quasi-experimental evidence.',
      incorrect: 'Overclaiming causation is inappropriate without strong design features.'
    },
    difficulty: 'medium'
  }
]
