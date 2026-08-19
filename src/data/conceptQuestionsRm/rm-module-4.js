// Research Methods — Module 4: Psychological Measurement
export const rmModule4Questions = [
  {
    id: 'rm-m4-q1',
    moduleId: 'rm-module-4',
    type: 'multiple_choice',
    question: 'Reliability refers to:',
    options: [
      { id: 'a', text: 'Whether a measure assesses the intended construct' },
      { id: 'b', text: 'Consistency of measurement across time, items, or raters' },
      { id: 'c', text: 'Whether results are statistically significant' },
      { id: 'd', text: 'Sample size adequacy' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Reliability is about consistency of scores.',
      incorrect: 'Validity targets the right construct; reliability targets consistency.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m4-q2',
    moduleId: 'rm-module-4',
    type: 'multiple_choice',
    question: 'Validity refers to:',
    options: [
      { id: 'a', text: 'Whether scores support inferences about the intended construct' },
      { id: 'b', text: 'Whether participants arrived on time' },
      { id: 'c', text: 'Whether the mean equals the median' },
      { id: 'd', text: 'Whether the study was double-blind' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Validity concerns the appropriateness of interpretations and uses of scores.',
      incorrect: 'Validity is about construct meaning, not punctuality or distribution shape alone.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m4-q3',
    moduleId: 'rm-module-4',
    type: 'true_false',
    question: 'A measure can be reliable but not valid.',
    correct: true,
    feedback: {
      correct: 'Consistent scores can still measure the wrong construct.',
      incorrect: 'High reliability does not guarantee validity.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m4-q4',
    moduleId: 'rm-module-4',
    type: 'multiple_select',
    question: 'Which scales allow meaningful statements about equal intervals between values? (Select all that apply)',
    options: [
      { id: 'a', text: 'Nominal' },
      { id: 'b', text: 'Ordinal' },
      { id: 'c', text: 'Interval' },
      { id: 'd', text: 'Ratio' }
    ],
    correct: ['c', 'd'],
    feedback: {
      correct: 'Interval and ratio scales assume equal units; nominal and ordinal do not.',
      incorrect: 'Ordinal scales order categories but do not guarantee equal intervals.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m4-q5',
    moduleId: 'rm-module-4',
    type: 'multiple_choice',
    question: 'Face validity means:',
    options: [
      { id: 'a', text: 'The measure superficially appears to tap the construct' },
      { id: 'b', text: 'The measure predicts future behavior perfectly' },
      { id: 'c', text: 'Cronbach’s alpha is above .9' },
      { id: 'd', text: 'The study passed IRB' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Face validity is a superficial appearance of relevance—weak evidence alone.',
      incorrect: 'Face validity is about “looking right,” not predictive power or alpha.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m4-q6',
    moduleId: 'rm-module-4',
    type: 'multiple_choice',
    question: 'Test–retest reliability assesses:',
    options: [
      { id: 'a', text: 'Agreement across items within one administration' },
      { id: 'b', text: 'Stability of scores over time' },
      { id: 'c', text: 'Correlation with a criterion measured once' },
      { id: 'd', text: 'Inter-rater agreement only' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Test–retest examines consistency across two time points.',
      incorrect: 'Internal consistency and inter-rater reliability are different concepts.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m4-q7',
    moduleId: 'rm-module-4',
    type: 'true_false',
    question: 'A ratio scale has a true zero point, allowing statements like “twice as much.”',
    correct: true,
    feedback: {
      correct: 'Ratio scales include a meaningful zero, enabling ratio comparisons.',
      incorrect: 'Interval scales lack a true zero; ratio scales include one.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m4-q8',
    moduleId: 'rm-module-4',
    type: 'multiple_choice',
    question: 'Criterion-related validity includes:',
    options: [
      { id: 'a', text: 'How well scores relate to an external criterion (concurrent or predictive)' },
      { id: 'b', text: 'Whether the first question is easy' },
      { id: 'c', text: 'Whether the measure has many items' },
      { id: 'd', text: 'Whether data are normally distributed' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Criterion validity links test scores to meaningful external outcomes.',
      incorrect: 'Item count and normality are separate psychometric considerations.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m4-q9',
    moduleId: 'rm-module-4',
    type: 'multiple_select',
    question: 'Which can reduce the validity of participants’ self-report scores? (Select all that apply)',
    options: [
      { id: 'a', text: 'Demand characteristics that hint at the expected answer' },
      { id: 'b', text: 'Using multiple operational definitions of the same construct' },
      { id: 'c', text: 'Socially desirable responding to look good to the researcher' },
      { id: 'd', text: 'Converging operations across several measures' }
    ],
    correct: ['a', 'c'],
    feedback: {
      correct: 'Hypothesis cues and impression management can distort self-reports; converging operations strengthen validity arguments.',
      incorrect: 'Multiple operationalizations and convergence generally support—not weaken—validity evidence.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m4-q10',
    moduleId: 'rm-module-4',
    type: 'multiple_choice',
    question: 'Operationalization connects:',
    options: [
      { id: 'a', text: 'Abstract constructs to concrete procedures or items' },
      { id: 'b', text: 'Two different samples randomly' },
      { id: 'c', text: 'p-values to effect sizes automatically' },
      { id: 'd', text: 'IRB to peer review' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Operationalization specifies how a construct is represented in measurement.',
      incorrect: 'Operationalization is about measurement mapping, not sampling or NHST links.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m4-q11',
    moduleId: 'rm-module-4',
    type: 'true_false',
    question: 'Internal consistency (e.g., Cronbach’s alpha) is highest when all items measure a single latent dimension and correlate positively.',
    correct: true,
    feedback: {
      correct: 'Alpha reflects inter-item correlation under a unidimensional scale.',
      incorrect: 'Low relatedness across items lowers internal consistency estimates.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m4-q12',
    moduleId: 'rm-module-4',
    type: 'multiple_choice',
    question: 'Compared with interval and ratio scales, ordinal scales:',
    options: [
      { id: 'a', text: 'Rank categories but do not guarantee equal gaps between adjacent levels' },
      { id: 'b', text: 'Always include a true zero point' },
      { id: 'c', text: 'Use only category labels with no ordering' },
      { id: 'd', text: 'Cannot be used in psychological research' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Ordinal data show order, but differences between levels may not represent equal units.',
      incorrect: 'Nominal scales lack order; ratio scales have a meaningful zero.'
    },
    difficulty: 'medium'
  }
]
