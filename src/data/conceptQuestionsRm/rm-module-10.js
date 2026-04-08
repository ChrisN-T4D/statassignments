// Research Methods — Module 10: Single-Subject Research
export const rmModule10Questions = [
  {
    id: 'rm-m10-q1',
    moduleId: 'rm-module-10',
    type: 'multiple_choice',
    question: 'Single-subject designs focus on:',
    options: [
      { id: 'a', text: 'Within-individual patterns over repeated measurements' },
      { id: 'b', text: 'Only group means with N > 1000' },
      { id: 'c', text: 'Eliminating all baseline data' },
      { id: 'd', text: 'Cross-sectional snapshots only' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Repeated measures per unit reveal individual-level change.',
      incorrect: 'Group aggregation is not the primary emphasis.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m10-q2',
    moduleId: 'rm-module-10',
    type: 'true_false',
    question: 'A stable baseline phase helps establish the individual’s typical level of behavior before intervention.',
    correct: true,
    feedback: {
      correct: 'Stable baselines strengthen demonstrations of change with treatment.',
      incorrect: 'Baseline stability is a key visual and analytic consideration.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m10-q3',
    moduleId: 'rm-module-10',
    type: 'multiple_choice',
    question: 'An ABA (reversal) design includes:',
    options: [
      { id: 'a', text: 'Baseline, intervention, and withdrawal of intervention' },
      { id: 'b', text: 'Only post-treatment measurement' },
      { id: 'c', text: 'Random assignment of schools' },
      { id: 'd', text: 'A factorial crossing of three survey items' }
    ],
    correct: 'a',
    feedback: {
      correct: 'ABA shows behavior changes with treatment and returns toward baseline when removed.',
      incorrect: 'Reversal is unethical or infeasible when effects should persist.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m10-q4',
    moduleId: 'rm-module-10',
    type: 'multiple_select',
    question: 'Limitations of reversal designs include: (Select all that apply)',
    options: [
      { id: 'a', text: 'Withdrawing an effective treatment may be unethical' },
      { id: 'b', text: 'Some behaviors do not reverse when treatment stops' },
      { id: 'c', text: 'They always prove population causation' },
      { id: 'd', text: 'Carryover can prevent clean return to baseline' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Ethics, irreversibility, and carryover limit ABA use.',
      incorrect: 'Single-subject evidence supports individual cases; generalization requires replication.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m10-q5',
    moduleId: 'rm-module-10',
    type: 'multiple_choice',
    question: 'Multiple baseline designs strengthen internal validity by:',
    options: [
      { id: 'a', text: 'Staggering intervention across behaviors, settings, or participants' },
      { id: 'b', text: 'Removing all baselines' },
      { id: 'c', text: 'Using only one observation' },
      { id: 'd', text: 'Guaranteeing random sampling from the nation' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Staggered replication reduces coincidence explanations.',
      incorrect: 'Multiple baselines are a hallmark design feature.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m10-q6',
    moduleId: 'rm-module-10',
    type: 'true_false',
    question: 'Visual analysis of graphed data (level, trend, variability) is central to evaluating single-subject evidence.',
    correct: true,
    feedback: {
      correct: 'Graphs guide judgments of change and overlap across phases.',
      incorrect: 'Visual inspection is traditional; statistical overlays may supplement.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m10-q7',
    moduleId: 'rm-module-10',
    type: 'multiple_choice',
    question: 'Changing-criterion designs demonstrate control by:',
    options: [
      { id: 'a', text: 'Showing behavior tracks stepwise changes in performance standards' },
      { id: 'b', text: 'Ignoring criteria entirely' },
      { id: 'c', text: 'Using only between-subjects factors' },
      { id: 'd', text: 'Deleting the dependent variable' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Stepwise criteria test whether behavior follows shifting goals.',
      incorrect: 'The design hinges on criterion shifts tied to phases.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m10-q8',
    moduleId: 'rm-module-10',
    type: 'multiple_select',
    question: 'Which are common dependent measures in single-subject work? (Select all that apply)',
    options: [
      { id: 'a', text: 'Frequency counts of a target behavior' },
      { id: 'b', text: 'Duration or latency' },
      { id: 'c', text: 'National census totals only' },
      { id: 'd', text: 'Percent of intervals with behavior' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Operant-style metrics are typical; census totals are unrelated.',
      incorrect: 'Choose operationally defined, repeated outcomes.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m10-q9',
    moduleId: 'rm-module-10',
    type: 'multiple_choice',
    question: 'External validity in single-subject research is strengthened by:',
    options: [
      { id: 'a', text: 'Systematic replication across participants and settings' },
      { id: 'b', text: 'Never reporting methods' },
      { id: 'c', text: 'Using a single day of data' },
      { id: 'd', text: 'Avoiding operational definitions' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Replication builds generality beyond one case.',
      incorrect: 'Single cases alone generalize weakly without replication.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m10-q10',
    moduleId: 'rm-module-10',
    type: 'true_false',
    question: 'Treatment integrity (fidelity) means the intervention was delivered as planned.',
    correct: true,
    feedback: {
      correct: 'Without fidelity, observed changes may reflect implementation drift.',
      incorrect: 'Fidelity checks are important for interpreting effects.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m10-q11',
    moduleId: 'rm-module-10',
    type: 'multiple_choice',
    question: 'Overlap between baseline and treatment data suggests:',
    options: [
      { id: 'a', text: 'A weaker demonstration that treatment produced distinct change' },
      { id: 'b', text: 'Perfect internal validity' },
      { id: 'c', text: 'No measurement occurred' },
      { id: 'd', text: 'Random assignment to country' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Less separation between phases weakens causal demonstration.',
      incorrect: 'Clear separation strengthens the case for an intervention effect.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m10-q12',
    moduleId: 'rm-module-10',
    type: 'multiple_choice',
    question: 'Compared to group experiments, single-subject designs are especially useful when:',
    options: [
      { id: 'a', text: 'Rare cases, individualized treatments, or repeated measurement is feasible' },
      { id: 'b', text: 'You need representative national surveys' },
      { id: 'c', text: 'You refuse to graph data' },
      { id: 'd', text: 'Between-subjects variance is irrelevant' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Clinical and applied settings often fit intensive individual designs.',
      incorrect: 'National representativeness is not the typical goal.'
    },
    difficulty: 'medium'
  }
]
