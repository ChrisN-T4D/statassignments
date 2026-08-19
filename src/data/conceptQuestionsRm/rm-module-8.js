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
    question: 'A pretest-posttest design with switching replication introduces the treatment to one nonequivalent group before the other mainly to:',
    options: [
      { id: 'a', text: 'Help control history and maturation through staggered treatment introduction' },
      { id: 'b', text: 'Replace the need for any pretest measurement' },
      { id: 'c', text: 'Guarantee that groups are randomly assigned' },
      { id: 'd', text: 'Eliminate all demand characteristics automatically' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Staggered introduction makes it unlikely that one outside event explains changes in both groups.',
      incorrect: 'Switching replication adds a built-in replication and helps control history and maturation.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m8-q8',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'Adding a nonequivalent control group to an interrupted time-series design strengthens evidence because:',
    options: [
      { id: 'a', text: 'It shows whether the pattern changes in the treatment group but not in a similar untreated group' },
      { id: 'b', text: 'It removes the need for any pre-intervention observations' },
      { id: 'c', text: 'It guarantees the groups were equivalent before the study began' },
      { id: 'd', text: 'It converts the study into a true experiment' }
    ],
    correct: 'a',
    feedback: {
      correct: 'A control series helps rule out events that would affect both groups similarly.',
      incorrect: 'The nonequivalent control group provides a comparison for the time-series pattern.'
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
    question: 'In a switching replication with treatment removal design, the treatment is withdrawn from the first group when it is added to the second group.',
    correct: true,
    feedback: {
      correct: 'Removing treatment from the first group while adding it to the second can show reversal and replication of effects.',
      incorrect: 'Unlike basic switching replication, this design removes treatment from the first group when the second receives it.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m8-q11',
    moduleId: 'rm-module-8',
    type: 'multiple_choice',
    question: 'The testing threat in a one-group pretest-posttest design refers to:',
    options: [
      { id: 'a', text: 'The pretest changing how participants respond on later measures' },
      { id: 'b', text: 'Using too few survey items' },
      { id: 'c', text: 'Failing to obtain IRB approval' },
      { id: 'd', text: 'Administering medication in a double-blind study' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Completing a pretest can change later responses by prompting thinking or conversation about the topic.',
      incorrect: 'Testing is a validity threat related to measurement order, not ethics approval.'
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
