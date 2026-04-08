// Research Methods — Module 9: Factorial Designs
export const rmModule9Questions = [
  {
    id: 'rm-m9-q1',
    moduleId: 'rm-module-9',
    type: 'multiple_choice',
    question: 'In a 2×2 factorial design, how many conditions are there?',
    options: [
      { id: 'a', text: '2' },
      { id: 'b', text: '3' },
      { id: 'c', text: '4' },
      { id: 'd', text: '8' }
    ],
    correct: 'c',
    feedback: {
      correct: '2 levels × 2 factors = 4 cells.',
      incorrect: 'Multiply levels across factors to count cells.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m9-q2',
    moduleId: 'rm-module-9',
    type: 'true_false',
    question: 'A main effect is the overall effect of one independent variable averaged across levels of the other factor(s).',
    correct: true,
    feedback: {
      correct: 'Main effects average over the other factor(s).',
      incorrect: 'Interactions are separate from main effects.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m9-q3',
    moduleId: 'rm-module-9',
    type: 'multiple_choice',
    question: 'An interaction means:',
    options: [
      { id: 'a', text: 'The effect of one factor depends on the level of another factor' },
      { id: 'b', text: 'There is no variability' },
      { id: 'c', text: 'Only one factor was manipulated' },
      { id: 'd', text: 'Results are always additive' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Interaction = dependency of effects between factors.',
      incorrect: 'Additive models assume no interaction.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m9-q4',
    moduleId: 'rm-module-9',
    type: 'multiple_select',
    question: 'Factorial designs allow researchers to test: (Select all that apply)',
    options: [
      { id: 'a', text: 'Main effects of each factor' },
      { id: 'b', text: 'Interactions between factors' },
      { id: 'c', text: 'Whether manipulating multiple factors is impossible' },
      { id: 'd', text: 'Whether simple effects differ at factor levels' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Factorials estimate main effects, interactions, and simple effects.',
      incorrect: 'They are used precisely to study multiple factors together.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m9-q5',
    moduleId: 'rm-module-9',
    type: 'multiple_choice',
    question: 'Cell means in a factorial are:',
    options: [
      { id: 'a', text: 'Means for each combination of factor levels' },
      { id: 'b', text: 'Always grand means' },
      { id: 'c', text: 'Standard deviations only' },
      { id: 'd', text: 'The same as main effect F-ratios' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Each cell corresponds to one treatment combination.',
      incorrect: 'Cell means are condition-specific averages.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m9-q6',
    moduleId: 'rm-module-9',
    type: 'true_false',
    question: 'A significant interaction can make interpreting main effects misleading without examining simple effects.',
    correct: true,
    feedback: {
      correct: 'When interaction is present, “overall” main effects may poorly describe patterns at each level.',
      incorrect: 'Plotting and simple effects clarify interaction patterns.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m9-q7',
    moduleId: 'rm-module-9',
    type: 'multiple_choice',
    question: 'Higher-order factorials (e.g., 2×2×2) require:',
    options: [
      { id: 'a', text: 'More participants for adequate power per cell' },
      { id: 'b', text: 'Fewer participants always' },
      { id: 'c', text: 'No interpretation of interactions' },
      { id: 'd', text: 'Removing all main effects' }
    ],
    correct: 'a',
    feedback: {
      correct: 'More cells spread N thinner, often increasing sample needs.',
      incorrect: 'Complex designs usually demand more resources, not fewer.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m9-q8',
    moduleId: 'rm-module-9',
    type: 'multiple_select',
    question: 'Which plots help interpret factorial results? (Select all that apply)',
    options: [
      { id: 'a', text: 'Line graph of means with factor levels on x-axis and separate lines per second factor' },
      { id: 'b', text: 'Bar chart of cell means' },
      { id: 'c', text: 'A single number with no conditions shown' },
      { id: 'd', text: 'Interaction plots showing non-parallel lines when interaction exists' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Visualizing cell means reveals interactions (non-parallelism).',
      incorrect: 'A lone scalar hides factorial structure.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m9-q9',
    moduleId: 'rm-module-9',
    type: 'multiple_choice',
    question: 'In a factorial experiment, random assignment typically occurs:',
    options: [
      { id: 'a', text: 'To cells (condition combinations), if feasible' },
      { id: 'b', text: 'Only after the study ends' },
      { id: 'c', text: 'Never' },
      { id: 'd', text: 'Only to the control cell' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Participants are assigned to factorial conditions, often randomly.',
      incorrect: 'Random assignment applies across experimental cells.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m9-q10',
    moduleId: 'rm-module-9',
    type: 'true_false',
    question: 'A disordinal (crossover) interaction means one factor’s ordering of means flips across levels of the other factor.',
    correct: true,
    feedback: {
      correct: 'Crossover interactions show rank reversals across levels.',
      incorrect: 'Ordinal interactions preserve rank order with non-parallel lines.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m9-q11',
    moduleId: 'rm-module-9',
    type: 'multiple_choice',
    question: 'Why include multiple factors in one study?',
    options: [
      { id: 'a', text: 'To test whether effects generalize across contexts and to detect interactions' },
      { id: 'b', text: 'To guarantee no main effects' },
      { id: 'c', text: 'To avoid measuring the DV' },
      { id: 'd', text: 'To remove the need for statistics' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Factorials test moderation and boundary conditions efficiently.',
      incorrect: 'Statistics are still required to evaluate evidence.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m9-q12',
    moduleId: 'rm-module-9',
    type: 'multiple_choice',
    question: 'Simple effects are:',
    options: [
      { id: 'a', text: 'Tests of one factor at a fixed level of another factor' },
      { id: 'b', text: 'Always the same as main effects' },
      { id: 'c', text: 'Only used in surveys' },
      { id: 'd', text: 'Synonymous with error variance' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Simple effects unpack interactions by fixing a factor level.',
      incorrect: 'Main effects average across the other factor; simple effects do not.'
    },
    difficulty: 'hard'
  }
]
