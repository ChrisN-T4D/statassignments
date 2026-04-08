// Research Methods — Module 13: Inferential Statistics
export const rmModule13Questions = [
  {
    id: 'rm-m13-q1',
    moduleId: 'rm-module-13',
    type: 'multiple_choice',
    question: 'The null hypothesis typically states:',
    options: [
      { id: 'a', text: 'No effect, no difference, or no relationship in the population (as specified)' },
      { id: 'b', text: 'The researcher’s predicted effect' },
      { id: 'c', text: 'The sample mean equals the population mean with certainty' },
      { id: 'd', text: 'Replication is unnecessary' }
    ],
    correct: 'a',
    feedback: {
      correct: 'NHST contrasts a null (often “no effect”) to an alternative.',
      incorrect: 'The alternative hypothesis carries the predicted effect.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m13-q2',
    moduleId: 'rm-module-13',
    type: 'true_false',
    question: 'A p-value is the probability that the null hypothesis is true.',
    correct: false,
    feedback: {
      correct: 'p is the probability (under a model) of data at least this extreme if the null holds—not P(H0 true).',
      incorrect: 'Misinterpreting p as P(H0) is a common error.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m13-q3',
    moduleId: 'rm-module-13',
    type: 'multiple_choice',
    question: 'Type I error means:',
    options: [
      { id: 'a', text: 'Rejecting a true null hypothesis (false positive)' },
      { id: 'b', text: 'Failing to reject a false null (false negative)' },
      { id: 'c', text: 'Using descriptive statistics only' },
      { id: 'd', text: 'Collecting too much data' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Type I is a false alarm; alpha controls its long-run rate under the null model.',
      incorrect: 'Type II is failing to detect a real effect.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m13-q4',
    moduleId: 'rm-module-13',
    type: 'multiple_select',
    question: 'Which are limitations of relying only on p-values? (Select all that apply)',
    options: [
      { id: 'a', text: 'They do not convey effect size' },
      { id: 'b', text: 'They depend on sample size' },
      { id: 'c', text: 'They prove the alternative hypothesis with certainty' },
      { id: 'd', text: 'They do not measure practical importance' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Add effect sizes, CIs, and context; p alone is incomplete.',
      incorrect: 'Significance tests do not prove hypotheses in a strict logical sense.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m13-q5',
    moduleId: 'rm-module-13',
    type: 'multiple_choice',
    question: 'Statistical power is:',
    options: [
      { id: 'a', text: 'The probability of detecting an effect of a given size if it exists' },
      { id: 'b', text: 'Always equal to alpha' },
      { id: 'c', text: 'The same as p-value' },
      { id: 'd', text: 'Irrelevant if p < .05' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Power increases with effect size, N, and alpha (among other factors).',
      incorrect: 'A significant result in one study does not address power directly.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m13-q6',
    moduleId: 'rm-module-13',
    type: 'true_false',
    question: 'Failing to reject the null does not prove the null is true.',
    correct: true,
    feedback: {
      correct: 'Absence of evidence is not evidence of absence; consider power and CIs.',
      incorrect: '“Not significant” is not confirmation of no effect.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m13-q7',
    moduleId: 'rm-module-13',
    type: 'multiple_choice',
    question: 'A confidence interval for a mean communicates:',
    options: [
      { id: 'a', text: 'A range plausible for the parameter under repeated sampling interpretation' },
      { id: 'b', text: 'The probability the sample mean equals the population mean' },
      { id: 'c', text: 'Certainty that 95% of individual scores lie in the interval' },
      { id: 'd', text: 'Causal effect size without design' }
    ],
    correct: 'a',
    feedback: {
      correct: 'CIs estimate parameter uncertainty; interpret carefully (frequentist vs Bayesian differ).',
      incorrect: 'CI is not usually about individual scores or causal claims alone.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m13-q8',
    moduleId: 'rm-module-13',
    type: 'multiple_select',
    question: 'Why is replication important? (Select all that apply)',
    options: [
      { id: 'a', text: 'Single studies can be lucky, p-hacked, or context-bound' },
      { id: 'b', text: 'It helps estimate reliability of findings' },
      { id: 'c', text: 'One significant p-value ends all scientific debate' },
      { id: 'd', text: 'It supports cumulative science' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Science builds through repeated, converging evidence.',
      incorrect: 'No single p-value is definitive.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m13-q9',
    moduleId: 'rm-module-13',
    type: 'multiple_choice',
    question: 'Familywise error inflates when:',
    options: [
      { id: 'a', text: 'Many hypothesis tests are conducted without adjustment' },
      { id: 'b', text: 'Only one comparison is made' },
      { id: 'c', text: 'Effect sizes are reported' },
      { id: 'd', text: 'Bonferroni correction is applied' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Multiple testing increases the chance of at least one false positive.',
      incorrect: 'Corrections (Bonferroni, FDR, preregistration) address multiplicity.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m13-q10',
    moduleId: 'rm-module-13',
    type: 'true_false',
    question: 'Bayesian and frequentist approaches differ in how they quantify uncertainty about hypotheses and parameters.',
    correct: true,
    feedback: {
      correct: 'Interpretations of probability and evidence differ across frameworks.',
      incorrect: 'They are not merely cosmetic relabelings of p-values.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m13-q11',
    moduleId: 'rm-module-13',
    type: 'multiple_choice',
    question: 'Practical significance refers to:',
    options: [
      { id: 'a', text: 'Whether an effect is large or important in real-world terms' },
      { id: 'b', text: 'Whether p < .05' },
      { id: 'c', text: 'Whether the study passed peer review' },
      { id: 'd', text: 'Whether descriptive stats were used' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Small effects can be “significant” with huge N yet trivial in practice.',
      incorrect: 'Statistical significance does not equal practical importance.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m13-q12',
    moduleId: 'rm-module-13',
    type: 'multiple_choice',
    question: 'A one-tailed test is appropriate only when:',
    options: [
      { id: 'a', text: 'Direction is predicted a priori and you would treat opposite-direction results the same as null' },
      { id: 'b', text: 'You peek at data then choose the tail' },
      { id: 'c', text: 'You want a smaller sample always' },
      { id: 'd', text: 'You have no hypothesis' }
    ],
    correct: 'a',
    feedback: {
      correct: 'One-tailed tests require principled directional prediction; post hoc tail choice is invalid.',
      incorrect: 'Choosing tails after seeing the direction inflates error rates.'
    },
    difficulty: 'hard'
  }
]
