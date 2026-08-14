// Research Methods — Lab: Random assignment & sampling (between Ch. 6 and 7)
export const rmModuleLabQuestions = [
  {
    id: 'rm-mlab-q1',
    moduleId: 'rm-module-lab',
    type: 'multiple_choice',
    question: 'Random assignment of participants to conditions helps establish:',
    options: [
      { id: 'a', text: 'That groups are equivalent on average before the manipulation' },
      { id: 'b', text: 'That the sample matches the national population exactly' },
      { id: 'c', text: 'That every participant has the same score' },
      { id: 'd', text: 'That the study needs no ethics review' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Random assignment balances known and unknown confounds across groups on average.',
      incorrect: 'Random assignment addresses group equivalence, not national representativeness.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-mlab-q2',
    moduleId: 'rm-module-lab',
    type: 'true_false',
    question: 'Convenience sampling usually improves external validity compared with probability sampling.',
    correct: false,
    feedback: {
      correct: 'Convenience samples are easy to recruit but often limit generalization.',
      incorrect: 'Convenience sampling trades ease for representativeness.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-mlab-q3',
    moduleId: 'rm-module-lab',
    type: 'multiple_choice',
    question: 'Simple random sampling (SRS) means:',
    options: [
      { id: 'a', text: 'Every member of the population has an equal chance of selection' },
      { id: 'b', text: 'Researchers pick whoever is nearby' },
      { id: 'c', text: 'Only volunteers are included' },
      { id: 'd', text: 'The largest subgroup is always omitted' }
    ],
    correct: 'a',
    feedback: {
      correct: 'SRS gives each population member the same selection probability.',
      incorrect: 'Nearby or volunteer selection describes convenience sampling, not SRS.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-mlab-q4',
    moduleId: 'rm-module-lab',
    type: 'multiple_select',
    question: 'Which are probability sampling methods? (Select all that apply)',
    options: [
      { id: 'a', text: 'Simple random sampling' },
      { id: 'b', text: 'Stratified random sampling' },
      { id: 'c', text: 'Cluster sampling' },
      { id: 'd', text: 'Convenience sampling' }
    ],
    correct: ['a', 'b', 'c'],
    feedback: {
      correct: 'SRS, stratified, and cluster designs use known selection probabilities.',
      incorrect: 'Convenience sampling is non-probability because selection is not random from the population.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-mlab-q5',
    moduleId: 'rm-module-lab',
    type: 'multiple_choice',
    question: 'Stratified random sampling is especially useful when:',
    options: [
      { id: 'a', text: 'You need proportional representation from important subgroups' },
      { id: 'b', text: 'You want to avoid all randomness' },
      { id: 'c', text: 'The population has only one person' },
      { id: 'd', text: 'You cannot define any subgroups' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Stratification ensures key subgroups appear in the sample in planned proportions.',
      incorrect: 'Stratified sampling still uses random selection within strata.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-mlab-q6',
    moduleId: 'rm-module-lab',
    type: 'multiple_choice',
    question: 'In cluster sampling, the researcher:',
    options: [
      { id: 'a', text: 'Randomly selects groups (clusters) and studies all or a sample within them' },
      { id: 'b', text: 'Measures every individual in the country' },
      { id: 'c', text: 'Assigns treatments without randomization' },
      { id: 'd', text: 'Only interviews experts' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Cluster sampling randomly picks naturally occurring groups, then samples inside them.',
      incorrect: 'Cluster sampling is about how units enter the sample, not treatment assignment.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-mlab-q7',
    moduleId: 'rm-module-lab',
    type: 'true_false',
    question: 'Sampling error is the difference between a sample statistic and the population parameter due to chance.',
    correct: true,
    feedback: {
      correct: 'Even good samples vary slightly from the population because of random selection.',
      incorrect: 'Sampling error reflects chance variation, not necessarily researcher mistakes.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-mlab-q8',
    moduleId: 'rm-module-lab',
    type: 'multiple_choice',
    question: 'Non-random assignment (e.g., letting participants choose a condition) most threatens:',
    options: [
      { id: 'a', text: 'Internal validity — whether the manipulation caused the outcome' },
      { id: 'b', text: 'Whether the study used APA title page format' },
      { id: 'c', text: 'Whether descriptive statistics can be calculated' },
      { id: 'd', text: 'Whether informed consent was documented' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Self-selection into conditions creates confounds that block causal inference.',
      incorrect: 'Assignment problems threaten internal validity, not formatting or basic descriptives.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-mlab-q9',
    moduleId: 'rm-module-lab',
    type: 'multiple_select',
    question: 'A probability sample supports stronger generalization because: (Select all that apply)',
    options: [
      { id: 'a', text: 'Selection probabilities are known' },
      { id: 'b', text: 'Sampling bias from arbitrary recruitment is reduced' },
      { id: 'c', text: 'Every causal claim is automatically true' },
      { id: 'd', text: 'Inference to the population can be quantified' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Known probabilities support estimates of precision and reduce arbitrary selection.',
      incorrect: 'Good sampling aids generalization; it does not guarantee causal conclusions.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-mlab-q10',
    moduleId: 'rm-module-lab',
    type: 'multiple_choice',
    question: 'The population in a sampling plan is:',
    options: [
      { id: 'a', text: 'The entire group of individuals you want to draw conclusions about' },
      { id: 'b', text: 'Only participants who complete every survey item' },
      { id: 'c', text: 'The research team' },
      { id: 'd', text: 'Everyone who visits a single website on one day' }
    ],
    correct: 'a',
    feedback: {
      correct: 'The population is the target group for inference; the sample is the subset studied.',
      incorrect: 'Population refers to the inferential target, not respondents with complete data only.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-mlab-q11',
    moduleId: 'rm-module-lab',
    type: 'true_false',
    question: 'Larger samples generally reduce sampling error, holding sampling method constant.',
    correct: true,
    feedback: {
      correct: 'More observations typically yield estimates closer to population values on average.',
      incorrect: 'Sample size affects precision; method and bias still matter.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-mlab-q12',
    moduleId: 'rm-module-lab',
    type: 'multiple_choice',
    question: 'After running the lab simulations, you should be able to explain why:',
    options: [
      { id: 'a', text: 'Random assignment and probability sampling address different validity concerns' },
      { id: 'b', text: 'Convenience samples always match the population' },
      { id: 'c', text: 'Sampling and assignment are the same procedure' },
      { id: 'd', text: 'External validity is irrelevant in psychology' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Assignment supports causal inference within a study; sampling supports generalization to a population.',
      incorrect: 'Assignment (who gets what condition) and sampling (who is in the study) are distinct.'
    },
    difficulty: 'medium'
  }
]
