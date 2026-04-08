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
    question: 'Which are examples of threats to internal validity? (Select all that apply)',
    options: [
      { id: 'a', text: 'History: outside events co-occur with treatment' },
      { id: 'b', text: 'Random assignment to conditions' },
      { id: 'c', text: 'Maturation: participants change naturally over time' },
      { id: 'd', text: 'Double-blind procedure' }
    ],
    correct: ['a', 'c'],
    feedback: {
      correct: 'History and maturation are classic threats; randomization and blinding reduce threats.',
      incorrect: 'Randomization and blinding are safeguards, not threats.'
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
    question: 'Demand characteristics refer to:',
    options: [
      { id: 'a', text: 'Cues that reveal the hypothesis and change participant behavior' },
      { id: 'b', text: 'Statistical power calculations' },
      { id: 'c', text: 'IRB requirements' },
      { id: 'd', text: 'Random sampling methods' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Demand characteristics are hypothesis cues that distort behavior.',
      incorrect: 'They concern participant expectations, not power or ethics paperwork alone.'
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
      'A computer simulation that repeatedly splits the same volunteer pool into two groups can demonstrate why random assignment helps without assuming:',
    options: [
      { id: 'a', text: 'Normally distributed outcomes' },
      { id: 'b', text: 'A placebo control' },
      { id: 'c', text: 'Double-blinding' },
      { id: 'd', text: 'A pretest' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Simulations can show balance and variability from random splits using any plausible baseline scores—no normality lecture required.',
      incorrect: 'Placebo, blinding, and pretests are other design tools; they are not what a simple balance simulation demonstrates.'
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
