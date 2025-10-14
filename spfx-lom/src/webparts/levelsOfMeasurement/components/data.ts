import { IMeasurementLevelDescriptor, IMeasurementQuestion } from './models';

export const measurementLevels: IMeasurementLevelDescriptor[] = [
  {
    value: 'Nominal',
    label: 'Nominal',
    definition: 'Values act as labels only; categories are mutually exclusive and have no natural order.',
    example: 'Favorite student study snack (fruit, popcorn, candy, chips).',
    guidingQuestion: 'Do the values simply name groups?'
  },
  {
    value: 'Ordinal',
    label: 'Ordinal',
    definition: 'Values can be ordered or ranked, but the distance between ranks is not guaranteed to be equal.',
    example: 'Pain severity categories: minimal, mild, moderate, severe.',
    guidingQuestion: 'Do the values indicate order without consistent spacing?'
  },
  {
    value: 'Interval',
    label: 'Interval',
    definition: 'Numeric scale with equal intervals but no meaningful absolute zero.',
    example: 'Temperature measured in degrees Celsius.',
    guidingQuestion: 'Can you add and subtract meaningfully, but not say “twice as much”?'
  },
  {
    value: 'Ratio',
    label: 'Ratio',
    definition: 'Numeric scale with equal intervals and a true zero that represents the absence of what is measured.',
    example: 'Time to complete a task measured in minutes.',
    guidingQuestion: 'Does a value of zero mean “none,” making ratios meaningful?'
  }
];

export const questions: IMeasurementQuestion[] = [
  {
    id: 1,
    prompt: 'A campus survey asks students to choose the primary device they use for coursework: laptop, tablet, desktop, or phone.',
    answer: 'Nominal',
    explanation: 'Device types are category labels with no inherent order, so this scenario is nominal.',
    context: 'Technology preference',
    insight: 'If you can only count how many fall in each bucket, it is likely nominal.'
  },
  {
    id: 2,
    prompt: 'A counseling clinic triages clients using folders labeled minimal, mild, moderate, or severe risk.',
    answer: 'Ordinal',
    explanation: 'The categories communicate rank order but gaps between them are not equal, matching the ordinal level.',
    context: 'Risk categorization',
    insight: 'Ranks tell you “who is higher,” not how much higher.'
  },
  {
    id: 3,
    prompt: 'Climate sensors log the classroom temperature every 10 minutes in degrees Celsius during a relaxation exercise.',
    answer: 'Interval',
    explanation: 'Celsius temperatures have consistent intervals, yet a value of zero does not mean an absence of temperature, so the scale is interval.',
    context: 'Environmental monitoring',
    insight: 'If zero is arbitrary, you cannot make ratio statements such as “twice as warm.”'
  },
  {
    id: 4,
    prompt: 'Graduate students record the number of minutes they spend practicing motivational interviewing each week.',
    answer: 'Ratio',
    explanation: 'Minutes include a true zero and ratios are meaningful (20 minutes is twice 10 minutes), so the data are ratio.',
    context: 'Practice time tracking',
    insight: 'Ask whether the measurement can be totally absent; if yes and spacing is equal, it is ratio.'
  },
  {
    id: 5,
    prompt: 'Participants rate their agreement with the statement “I feel prepared for supervision” on a 1–5 Likert scale.',
    answer: 'Ordinal',
    explanation: 'Likert responses provide ordered categories, but equal distance between choices is not guaranteed, making them ordinal.',
    context: 'Self-assessment check-in',
    insight: 'Treat individual Likert items as ordinal even when the numeric labels tempt you to think otherwise.'
  },
  {
    id: 6,
    prompt: 'Researchers tally the number of crisis hotline calls resolved without an external referral during each shift.',
    answer: 'Ratio',
    explanation: 'Call counts are numeric with a true zero (no calls) and you can form ratios, so they are ratio level.',
    context: 'Service delivery outcomes',
    insight: 'Counts that can be zero and allow “twice as many” comparisons indicate ratio data.'
  },
  {
    id: 7,
    prompt: 'Students are ranked 1st through 5th after a skills demonstration in class.',
    answer: 'Ordinal',
    explanation: 'Ranks show relative standing without equal distance between placements, aligning with the ordinal level.',
    context: 'Performance ranking',
    insight: 'If you only know the order of finishers, the data are ordinal.'
  },
  {
    id: 8,
    prompt: 'A health promotion team records resting heart rate in beats per minute for each participant.',
    answer: 'Ratio',
    explanation: 'Heart rate has equal units and an absolute zero (no beats), so ratios such as “twice as fast” are meaningful—this is ratio.',
    context: 'Physiological assessment',
    insight: 'Time-based or count-based rates with a zero point are ratio by definition.'
  },
  {
    id: 9,
    prompt: 'A data set stores ZIP codes for alumni to map where graduates now live.',
    answer: 'Nominal',
    explanation: 'ZIP codes simply label regions without order or consistent spacing, so they represent nominal-level data.',
    context: 'Geographic grouping',
    insight: 'If arithmetic on the numbers would be nonsense, treat them as nominal regardless of their numeric look.'
  },
  {
    id: 10,
    prompt: 'Mood check-ins record the temperature of tea served to participants using the Kelvin scale.',
    answer: 'Ratio',
    explanation: 'Kelvin has equal intervals and an absolute zero representing no thermal energy, so these measurements are ratio.',
    context: 'Laboratory comfort setting',
    insight: 'Temperature is interval in Celsius or Fahrenheit but ratio in Kelvin because zero represents the absence of heat.'
  }
];
