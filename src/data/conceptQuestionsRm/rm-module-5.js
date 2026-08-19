// Research Methods — Module 5: Experimental Research
export const rmModule5Questions = [
  {
    id: 'rm-m5-q1',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question: 'Random assignment is used to:',
    options: [
      { id: 'a', text: 'Guarantee external validity' },
      { id: 'b', text: 'Balance confounding variables across groups to support causal claims' },
      { id: 'c', text: 'Increase response rates in surveys' },
      { id: 'd', text: 'Replace informed consent' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Random assignment distributes confounds, strengthening internal validity for cause.',
      incorrect: 'Random assignment targets internal validity for causation, not response rates.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m5-q2',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question: 'The independent variable is:',
    options: [
      { id: 'a', text: 'The outcome the researcher measures' },
      { id: 'b', text: 'The variable manipulated or used to form comparison groups' },
      { id: 'c', text: 'Any nuisance variable' },
      { id: 'd', text: 'Always a participant characteristic that cannot change' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The IV is manipulated or defines conditions; the DV is the outcome.',
      incorrect: 'Distinguish manipulated/predictor (IV) from measured outcome (DV).'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m5-q3',
    moduleId: 'rm-module-5',
    type: 'true_false',
    question: 'Internal validity concerns whether observed effects can be attributed to the manipulated variable rather than confounds.',
    correct: true,
    feedback: {
      correct: 'Internal validity is about causal interpretation within the study.',
      incorrect: 'Internal validity targets causal attribution, not generalization to other settings.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m5-q4',
    moduleId: 'rm-module-5',
    type: 'multiple_select',
    question: 'Which can threaten causal conclusions in an experiment? (Select all that apply)',
    options: [
      { id: 'a', text: 'A confounding variable that covaries with the independent variable' },
      { id: 'b', text: 'Random assignment of participants to conditions' },
      { id: 'c', text: 'Extraneous variables that become confounds because they differ across conditions' },
      { id: 'd', text: 'Counterbalancing order in a within-subjects design' }
    ],
    correct: ['a', 'c'],
    feedback: {
      correct: 'Confounds offer alternative explanations; random assignment and counterbalancing reduce that risk.',
      incorrect: 'Random assignment and counterbalancing are controls, not threats.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m5-q5',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question: 'A confounding variable is:',
    options: [
      { id: 'a', text: 'Systematically related to both IV and DV, offering alternative explanations' },
      { id: 'b', text: 'The dependent variable' },
      { id: 'c', text: 'Always measured perfectly' },
      { id: 'd', text: 'The same as random error' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Confounds covary with the IV and affect the DV, muddying causation.',
      incorrect: 'Confounds are systematic alternatives to the causal story, not mere noise.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m5-q6',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question: 'Between-subjects design means:',
    options: [
      { id: 'a', text: 'Each participant experiences only one level of the IV' },
      { id: 'b', text: 'Each participant experiences all levels' },
      { id: 'c', text: 'No control group exists' },
      { id: 'd', text: 'Only surveys are used' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Between-subjects: different participants in different conditions.',
      incorrect: 'Within-subjects crosses all levels per participant.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m5-q7',
    moduleId: 'rm-module-5',
    type: 'true_false',
    question: 'External validity concerns generalizing results to other people, settings, and times.',
    correct: true,
    feedback: {
      correct: 'External validity is about broader generalization beyond the study context.',
      incorrect: 'Do not confuse external validity (generalization) with internal validity (causal attribution).'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m5-q8',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question: 'A placebo control in a drug trial helps address:',
    options: [
      { id: 'a', text: 'Expectancy and demand characteristics affecting outcomes' },
      { id: 'b', text: 'Whether the journal will accept the paper' },
      { id: 'c', text: 'Inter-rater reliability' },
      { id: 'd', text: 'Nominal measurement' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Placebos separate pharmacological effects from psychological expectations.',
      incorrect: 'Placebos target expectancy, not publication or scaling type.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m5-q9',
    moduleId: 'rm-module-5',
    type: 'multiple_select',
    question: 'Which improve experimental control? (Select all that apply)',
    options: [
      { id: 'a', text: 'Holding extraneous variables constant' },
      { id: 'b', text: 'Counterbalancing order effects in within-subjects designs' },
      { id: 'c', text: 'Ignoring attrition' },
      { id: 'd', text: 'Using standardized procedures' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Standardization, holding factors constant, and counterbalancing reduce noise and bias.',
      incorrect: 'Ignoring dropout can bias results; it is not good control.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m5-q10',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question: 'During pilot testing, researchers watch for demand characteristics because these are:',
    options: [
      { id: 'a', text: 'Cues that lead participants to guess the hypothesis and change their behavior' },
      { id: 'b', text: 'Formulas for statistical power' },
      { id: 'c', text: 'IRB approval forms' },
      { id: 'd', text: 'Methods for drawing a probability sample' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Demand characteristics are hypothesis cues that can distort how participants respond.',
      incorrect: 'They concern participant expectations during the procedure, not power calculations or sampling.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m5-q11',
    moduleId: 'rm-module-5',
    type: 'true_false',
    question: 'In a true experiment, the researcher manipulates the independent variable and uses random assignment.',
    correct: true,
    feedback: {
      correct: 'Manipulation plus random assignment supports strong causal inference.',
      incorrect: 'Observation without manipulation or assignment is not a true experiment.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m5-q12',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question: 'Carryover effects in within-subjects designs are reduced by:',
    options: [
      { id: 'a', text: 'Counterbalancing the order of conditions' },
      { id: 'b', text: 'Removing the dependent variable' },
      { id: 'c', text: 'Using only one participant' },
      { id: 'd', text: 'Increasing alpha to .10' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Counterbalancing distributes order effects across participants.',
      incorrect: 'Removing the DV ends the study; order effects need design solutions.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m5-q13',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question:
      'Random assignment to conditions in an experiment is primarily used to support claims about:',
    options: [
      { id: 'a', text: 'Causal effects of the independent variable (internal validity)' },
      { id: 'b', text: 'Representative sampling from the national population' },
      { id: 'c', text: 'Whether residuals are normally distributed' },
      { id: 'd', text: 'Whether the dependent variable is nominal' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Random assignment balances individual differences across conditions so group differences are more plausibly due to the IV.',
      incorrect: 'Generalizing to a nation is about sampling, not assignment. Normality is a separate analysis assumption.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m5-q14',
    moduleId: 'rm-module-5',
    type: 'multiple_choice',
    question:
      'Strict random assignment in a between-subjects experiment requires that:',
    options: [
      { id: 'a', text: 'Each participant has an equal chance of being assigned to each condition' },
      { id: 'b', text: 'Every member of the national population has an equal chance of being surveyed' },
      { id: 'c', text: 'Outcomes are always normally distributed' },
      { id: 'd', text: 'The dependent variable must be measured on a ratio scale' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Random assignment gives each participant the same probability of landing in each condition, helping balance confounds across groups.',
      incorrect: 'Equal selection from a population describes random sampling, not assignment to conditions.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m5-q15',
    moduleId: 'rm-module-5',
    type: 'true_false',
    question:
      'Random sampling (how you recruit participants from a population) and random assignment (how you place participants into conditions) answer the same design question.',
    correct: false,
    feedback: {
      correct: 'Sampling supports external validity (to whom results generalize); assignment supports internal validity for causal claims within the study.',
      incorrect: 'They address different goals—both can be illustrated with simulations, but they are not interchangeable.'
    },
    difficulty: 'easy'
  }
]
