// Research Methods — Module 12: Descriptive Statistics
export const rmModule12Questions = [
  {
    id: 'rm-m12-q1',
    moduleId: 'rm-module-12',
    type: 'multiple_choice',
    question: 'The mean is most sensitive to:',
    options: [
      { id: 'a', text: 'Extreme values (outliers)' },
      { id: 'b', text: 'The mode only' },
      { id: 'c', text: 'Chart color' },
      { id: 'd', text: 'Sample size being odd vs even' }
    ],
    correct: 'a',
    feedback: {
      correct: 'The mean incorporates all values, so outliers pull it.',
      incorrect: 'Median is more robust to extremes than the mean.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m12-q2',
    moduleId: 'rm-module-12',
    type: 'true_false',
    question: 'The median is the 50th percentile of a distribution.',
    correct: true,
    feedback: {
      correct: 'Half of scores fall at or below the median in a ranked list.',
      incorrect: 'Median splits the ordered data.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m12-q3',
    moduleId: 'rm-module-12',
    type: 'multiple_choice',
    question: 'A bimodal distribution suggests:',
    options: [
      { id: 'a', text: 'Two common clusters of values' },
      { id: 'b', text: 'No variability' },
      { id: 'c', text: 'Perfect normality always' },
      { id: 'd', text: 'Only nominal variables' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Two peaks often indicate subgroups or two tendencies.',
      incorrect: 'Unimodal vs bimodal describes shape, not scale type alone.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m12-q4',
    moduleId: 'rm-module-12',
    type: 'multiple_select',
    question: 'Which are measures of variability? (Select all that apply)',
    options: [
      { id: 'a', text: 'Range' },
      { id: 'b', text: 'Standard deviation' },
      { id: 'c', text: 'Interquartile range' },
      { id: 'd', text: 'Grand mean of Likert labels as numbers without context' }
    ],
    correct: ['a', 'b', 'c'],
    feedback: {
      correct: 'Spread can be indexed by range, SD, IQR, variance, etc.',
      incorrect: 'A mean alone is central tendency, not spread.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m12-q5',
    moduleId: 'rm-module-12',
    type: 'multiple_choice',
    question: 'A scatterplot shows:',
    options: [
      { id: 'a', text: 'Relationship between two quantitative variables' },
      { id: 'b', text: 'Frequencies of a single categorical variable only' },
      { id: 'c', text: 'Cell means in a factorial without data points' },
      { id: 'd', text: 'A literal map of cities' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Each point is a case’s pair of scores.',
      incorrect: 'Bar charts and histograms serve other purposes.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m12-q6',
    moduleId: 'rm-module-12',
    type: 'true_false',
    question: 'A histogram bins a continuous (or grouped) variable to show frequency by interval.',
    correct: true,
    feedback: {
      correct: 'Histograms display distribution shape via bins.',
      incorrect: 'Unlike bar charts for categorical counts, histograms use ordered numeric bins.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m12-q7',
    moduleId: 'rm-module-12',
    type: 'multiple_choice',
    question: 'Positive skew typically means:',
    options: [
      { id: 'a', text: 'A long tail to the right; mean often exceeds median' },
      { id: 'b', text: 'A long tail to the left' },
      { id: 'c', text: 'No data were collected' },
      { id: 'd', text: 'Perfect symmetry' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Right skew pulls the mean toward extreme high values.',
      incorrect: 'Left skew has a tail to the left.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m12-q8',
    moduleId: 'rm-module-12',
    type: 'multiple_select',
    question: 'Which plots are appropriate for a single categorical variable? (Select all that apply)',
    options: [
      { id: 'a', text: 'Bar chart of category frequencies' },
      { id: 'b', text: 'Pie chart (use sparingly; compare with care)' },
      { id: 'c', text: 'Scatterplot with one axis categorical and no jittering strategy' },
      { id: 'd', text: 'Frequency table' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Counts of categories use bars, tables, or (cautiously) pie charts.',
      incorrect: 'Standard scatterplots expect two numeric axes; adaptations exist but need care.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m12-q9',
    moduleId: 'rm-module-12',
    type: 'multiple_choice',
    question: 'The interquartile range spans:',
    options: [
      { id: 'a', text: 'The middle 50% of ordered data (Q3 − Q1)' },
      { id: 'b', text: 'The full range from min to max always' },
      { id: 'c', text: 'Only the mode' },
      { id: 'd', text: 'Standard error of the mean' }
    ],
    correct: 'a',
    feedback: {
      correct: 'IQR is robust spread between quartiles.',
      incorrect: 'Range uses extremes; IQR trims the tails.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m12-q10',
    moduleId: 'rm-module-12',
    type: 'true_false',
    question: 'Reporting both central tendency and variability gives a fuller summary than either alone.',
    correct: true,
    feedback: {
      correct: 'Means without SDs (or medians without IQR) hide spread.',
      incorrect: 'Good reporting pairs location with dispersion.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m12-q11',
    moduleId: 'rm-module-12',
    type: 'multiple_choice',
    question: 'A line graph connecting separate unrelated categories can mislead because:',
    options: [
      { id: 'a', text: 'It implies order or continuity where none exists' },
      { id: 'b', text: 'Lines are never used in psychology' },
      { id: 'c', text: 'Bar charts are illegal' },
      { id: 'd', text: 'Histograms cannot show frequency' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Nominal categories should not be connected as if equally spaced.',
      incorrect: 'Line graphs are fine for meaningful sequences (e.g., time).'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m12-q12',
    moduleId: 'rm-module-12',
    type: 'multiple_choice',
    question: 'z-scores express:',
    options: [
      { id: 'a', text: 'How many standard deviations a value is from the mean' },
      { id: 'b', text: 'The p-value directly' },
      { id: 'c', text: 'Nominal category labels' },
      { id: 'd', text: 'Always causal effects' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Standardizing compares scores on a common scale.',
      incorrect: 'z is a descriptive standardization, not a p-value.'
    },
    difficulty: 'medium'
  }
]
