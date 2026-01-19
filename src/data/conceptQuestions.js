// Concept Review Questions - Organized by Module
// These are practice questions for testing understanding of statistical concepts

/*
Question Types:
- multiple_choice: Single correct answer
- multiple_select: Multiple correct answers (select all that apply)
- true_false: True or False
- fill_blank: Fill in the blank
- matching: Match items from two columns
- ordering: Put items in correct order
*/

// ============================================================
// STATISTICS CLASS - MODULE 1: Why Learn Stats?
// ============================================================

export const statsModule1Questions = [
  {
    id: 'stats-m1-q1',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'What is the primary purpose of statistics in psychology?',
    options: [
      { id: 'a', text: 'To make research more complicated' },
      { id: 'b', text: 'To help researchers draw valid conclusions from data' },
      { id: 'c', text: 'To prove that hypotheses are always correct' },
      { id: 'd', text: 'To eliminate the need for theory' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Statistics helps researchers analyze data and draw valid, evidence-based conclusions.',
      incorrect: 'Statistics is a tool that helps researchers make sense of data and draw valid conclusions about their research questions.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m1-q2',
    moduleId: 'stats-module-1',
    type: 'multiple_select',
    question: 'Which of the following are goals of science? (Select all that apply)',
    options: [
      { id: 'a', text: 'Describe phenomena' },
      { id: 'b', text: 'Predict outcomes' },
      { id: 'c', text: 'Explain relationships' },
      { id: 'd', text: 'Control variables' },
      { id: 'e', text: 'Prove absolute truths' }
    ],
    correct: ['a', 'b', 'c', 'd'],
    feedback: {
      correct: 'The four goals of science are to describe, predict, explain, and control.',
      incorrect: 'Science aims to describe, predict, explain, and control phenomena. It does not prove absolute truths—scientific knowledge is always subject to revision.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m1-q3',
    moduleId: 'stats-module-1',
    type: 'true_false',
    question: 'Descriptive statistics help us summarize and describe data, while inferential statistics help us make generalizations about populations.',
    correct: true,
    feedback: {
      correct: 'Descriptive statistics summarize data; inferential statistics allow generalizations from samples to populations.',
      incorrect: 'This statement is true. Descriptive statistics summarize data, and inferential statistics allow us to make generalizations from samples to populations.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m1-q4',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'A researcher wants to know if a new therapy reduces anxiety. This is an example of which goal of science?',
    options: [
      { id: 'a', text: 'Description' },
      { id: 'b', text: 'Prediction' },
      { id: 'c', text: 'Explanation' },
      { id: 'd', text: 'Control' }
    ],
    correct: 'd',
    feedback: {
      correct: 'Testing whether a therapy can reduce anxiety is about controlling or influencing an outcome.',
      incorrect: 'When researchers test interventions to change outcomes, they are pursuing the goal of control.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m1-q5',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Which type of statistic would you use to determine the average test score in a class?',
    options: [
      { id: 'a', text: 'Inferential statistics' },
      { id: 'b', text: 'Descriptive statistics' },
      { id: 'c', text: 'Predictive statistics' },
      { id: 'd', text: 'Correlational statistics' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Calculating an average is a descriptive statistic—it summarizes the data you have.',
      incorrect: 'Descriptive statistics summarize data, like calculating averages. Inferential statistics are used to make conclusions about populations from samples.'
    },
    difficulty: 'easy'
  }
]

// ============================================================
// STATISTICS CLASS - MODULE 2: Research Design & Measurement
// ============================================================

export const statsModule2Questions = [
  {
    id: 'stats-m2-q1',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'In an experiment, the researcher manipulates the _____ variable and measures the _____ variable.',
    options: [
      { id: 'a', text: 'dependent; independent' },
      { id: 'b', text: 'independent; dependent' },
      { id: 'c', text: 'confounding; extraneous' },
      { id: 'd', text: 'control; experimental' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The independent variable (IV) is manipulated by the researcher; the dependent variable (DV) is measured as the outcome.',
      incorrect: 'In experiments, researchers manipulate the independent variable (IV) and measure its effect on the dependent variable (DV).'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m2-q2',
    moduleId: 'stats-module-2',
    type: 'matching',
    question: 'Match each scale of measurement with its description:',
    pairs: [
      { left: 'Nominal', right: 'Categories with no inherent order (e.g., eye color)' },
      { left: 'Ordinal', right: 'Ranked categories with unequal intervals (e.g., race placement)' },
      { left: 'Interval', right: 'Equal intervals but no true zero (e.g., temperature in Celsius)' },
      { left: 'Ratio', right: 'Equal intervals with a true zero (e.g., weight, height)' }
    ],
    feedback: {
      correct: 'NOIR: Nominal, Ordinal, Interval, Ratio—from least to most precise measurement.',
      incorrect: 'Remember NOIR: Nominal (names/categories), Ordinal (ordered), Interval (equal intervals, no true zero), Ratio (equal intervals, true zero).'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m2-q3',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'Which research design allows researchers to establish cause-and-effect relationships?',
    options: [
      { id: 'a', text: 'Correlational design' },
      { id: 'b', text: 'Observational design' },
      { id: 'c', text: 'Experimental design' },
      { id: 'd', text: 'Survey design' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Only experiments with random assignment and manipulation of variables can establish causation.',
      incorrect: 'Experimental designs with random assignment and manipulation are required to establish cause-and-effect relationships.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m2-q4',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'A researcher measures anxiety on a scale of 1-10. What scale of measurement is this?',
    options: [
      { id: 'a', text: 'Nominal' },
      { id: 'b', text: 'Ordinal' },
      { id: 'c', text: 'Interval' },
      { id: 'd', text: 'Ratio' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Rating scales like 1-10 are ordinal because the intervals between points may not be equal.',
      incorrect: 'Rating scales (like 1-10) are typically ordinal—we know the order, but we cannot assume equal intervals between points.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m2-q5',
    moduleId: 'stats-module-2',
    type: 'true_false',
    question: 'Internal validity refers to how well research findings can be generalized to other populations and settings.',
    correct: false,
    feedback: {
      correct: 'That describes external validity. Internal validity refers to whether the IV truly caused changes in the DV.',
      incorrect: 'This describes external validity, not internal validity. Internal validity is about whether the independent variable truly caused the observed changes in the dependent variable.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m2-q6',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'An operational definition is:',
    options: [
      { id: 'a', text: 'A theoretical explanation of a construct' },
      { id: 'b', text: 'A precise specification of how a variable will be measured' },
      { id: 'c', text: 'A hypothesis about relationships between variables' },
      { id: 'd', text: 'A summary of research findings' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Operational definitions specify exactly how variables will be measured or manipulated in a study.',
      incorrect: 'An operational definition precisely specifies how a variable will be measured or manipulated, making abstract concepts concrete and measurable.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m2-q7',
    moduleId: 'stats-module-2',
    type: 'multiple_select',
    question: 'Which of the following are threats to internal validity? (Select all that apply)',
    options: [
      { id: 'a', text: 'History effects' },
      { id: 'b', text: 'Maturation' },
      { id: 'c', text: 'Sample size' },
      { id: 'd', text: 'Selection bias' },
      { id: 'e', text: 'Attrition' }
    ],
    correct: ['a', 'b', 'd', 'e'],
    feedback: {
      correct: 'History, maturation, selection bias, and attrition are all threats to internal validity.',
      incorrect: 'Threats to internal validity include history (external events), maturation (natural changes), selection bias (non-equivalent groups), and attrition (participant dropout). Sample size affects statistical power, not internal validity directly.'
    },
    difficulty: 'hard'
  }
]

// ============================================================
// STATISTICS CLASS - MODULE 3: Jamovi and Data Handling
// ============================================================

export const statsModule3Questions = [
  {
    id: 'stats-m3-q1',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'In a dataset, each row typically represents:',
    options: [
      { id: 'a', text: 'A variable' },
      { id: 'b', text: 'A participant or case' },
      { id: 'c', text: 'A statistical test' },
      { id: 'd', text: 'A research question' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Rows represent individual cases (participants), and columns represent variables.',
      incorrect: 'In rectangular data format, rows represent individual participants or cases, while columns represent variables.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m3-q2',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'Which variable type in Jamovi should be used for categorical data like "Male/Female"?',
    options: [
      { id: 'a', text: 'Continuous' },
      { id: 'b', text: 'Ordinal' },
      { id: 'c', text: 'Nominal' },
      { id: 'd', text: 'ID' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Nominal is used for categorical variables with no inherent order, like gender categories.',
      incorrect: 'Nominal is the correct type for unordered categories. Ordinal is for ordered categories, and Continuous is for numeric measurements.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m3-q3',
    moduleId: 'stats-module-3',
    type: 'true_false',
    question: 'Missing data in Jamovi can affect the results of statistical analyses.',
    correct: true,
    feedback: {
      correct: 'Missing data can bias results and reduce statistical power. How you handle missing data matters.',
      incorrect: 'This is true. Missing data can significantly affect statistical results, potentially biasing findings and reducing the power of your analyses.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m3-q4',
    moduleId: 'stats-module-3',
    type: 'ordering',
    question: 'Put these data preparation steps in the correct order:',
    items: [
      { id: 'a', text: 'Run statistical analyses' },
      { id: 'b', text: 'Import or enter data' },
      { id: 'c', text: 'Check for errors and missing data' },
      { id: 'd', text: 'Set variable types and measurement levels' }
    ],
    correctOrder: ['b', 'd', 'c', 'a'],
    feedback: {
      correct: 'Import data → Set variable types → Check for errors → Run analyses.',
      incorrect: 'The correct order is: Import/enter data → Set variable types → Check for errors → Run analyses.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m3-q5',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'What file format does Jamovi use to save its native data files?',
    options: [
      { id: 'a', text: '.xlsx' },
      { id: 'b', text: '.csv' },
      { id: 'c', text: '.omv' },
      { id: 'd', text: '.sav' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Jamovi uses the .omv (Open Metadata + Values) format for its native files.',
      incorrect: 'Jamovi\'s native format is .omv. It can import .xlsx, .csv, and .sav files but saves in .omv format.'
    },
    difficulty: 'easy'
  }
]

// ============================================================
// STATISTICS CLASS - MODULE 4: Descriptive Statistics
// ============================================================

export const statsModule4Questions = [
  {
    id: 'stats-m4-q1',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'Which measure of central tendency is most affected by outliers?',
    options: [
      { id: 'a', text: 'Mean' },
      { id: 'b', text: 'Median' },
      { id: 'c', text: 'Mode' },
      { id: 'd', text: 'All are equally affected' }
    ],
    correct: 'a',
    feedback: {
      correct: 'The mean is pulled toward extreme values (outliers), while the median is resistant to them.',
      incorrect: 'The mean is most affected by outliers because it uses all values in its calculation. The median only considers position, making it resistant to extreme values.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m4-q2',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'If a distribution is positively skewed, which statement is true?',
    options: [
      { id: 'a', text: 'Mean < Median < Mode' },
      { id: 'b', text: 'Mean > Median > Mode' },
      { id: 'c', text: 'Mean = Median = Mode' },
      { id: 'd', text: 'Mode > Mean > Median' }
    ],
    correct: 'b',
    feedback: {
      correct: 'In a positively skewed distribution, the tail extends to the right, pulling the mean higher than the median.',
      incorrect: 'In a positively (right) skewed distribution, the mean is pulled toward the tail: Mean > Median > Mode.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m4-q3',
    moduleId: 'stats-module-4',
    type: 'fill_blank',
    question: 'The sum of all deviation scores from the mean always equals ____.',
    answer: ['0', 'zero'],
    caseSensitive: false,
    feedback: {
      correct: 'The sum of deviations from the mean always equals zero—this is a mathematical property of the mean.',
      incorrect: 'The sum of deviation scores (X - M) always equals zero. This is because the mean is the balance point of the distribution.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m4-q4',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'Standard deviation is:',
    options: [
      { id: 'a', text: 'The square of the variance' },
      { id: 'b', text: 'The square root of the variance' },
      { id: 'c', text: 'The same as the range' },
      { id: 'd', text: 'Always equal to 1' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Standard deviation is the square root of variance, putting it back in the original units of measurement.',
      incorrect: 'SD = √variance. Taking the square root converts variance back to the original units of measurement.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m4-q5',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'A z-score of +2.0 means:',
    options: [
      { id: 'a', text: 'The score is 2 points above the mean' },
      { id: 'b', text: 'The score is 2 standard deviations above the mean' },
      { id: 'c', text: 'The score is in the 2nd percentile' },
      { id: 'd', text: 'The score equals 2' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Z-scores indicate how many standard deviations a score is from the mean.',
      incorrect: 'A z-score represents the number of standard deviations from the mean. z = +2 means 2 SDs above the mean.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m4-q6',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'Which measure of variability uses squared deviations in its calculation?',
    options: [
      { id: 'a', text: 'Range' },
      { id: 'b', text: 'Interquartile range' },
      { id: 'c', text: 'Variance' },
      { id: 'd', text: 'Mean' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Variance is calculated using squared deviations: SS/(n-1) for samples.',
      incorrect: 'Variance uses squared deviations from the mean (sum of squares divided by n-1 for samples).'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m4-q7',
    moduleId: 'stats-module-4',
    type: 'true_false',
    question: 'When data is measured on a nominal scale, the mode is the most appropriate measure of central tendency.',
    correct: true,
    feedback: {
      correct: 'For nominal data, only the mode makes sense—you cannot calculate a mean or median for categories.',
      incorrect: 'This is true. For nominal (categorical) data, the mode (most frequent category) is the only appropriate measure of central tendency.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m4-q8',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'The formula for a z-score is:',
    options: [
      { id: 'a', text: 'z = (X + M) / SD' },
      { id: 'b', text: 'z = (X - M) / SD' },
      { id: 'c', text: 'z = (M - X) / SD' },
      { id: 'd', text: 'z = SD / (X - M)' }
    ],
    correct: 'b',
    feedback: {
      correct: 'z = (X - M) / SD. Subtract the mean, then divide by standard deviation.',
      incorrect: 'The z-score formula is z = (X - M) / SD, where X is the raw score, M is the mean, and SD is the standard deviation.'
    },
    difficulty: 'easy'
  }
]

// ============================================================
// STATISTICS CLASS - MODULE 5: Graphing and Visualization
// ============================================================

export const statsModule5Questions = [
  {
    id: 'stats-m5-q1',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'Which type of graph is most appropriate for displaying the distribution of a continuous variable?',
    options: [
      { id: 'a', text: 'Bar chart' },
      { id: 'b', text: 'Pie chart' },
      { id: 'c', text: 'Histogram' },
      { id: 'd', text: 'Line graph' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Histograms show distributions of continuous variables with connected bars representing frequency ranges.',
      incorrect: 'Histograms are best for continuous variables. Bar charts are for categorical data. The bars in histograms touch because the data is continuous.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m5-q2',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'In a boxplot, the box represents:',
    options: [
      { id: 'a', text: 'The range of all data' },
      { id: 'b', text: 'The middle 50% of the data (IQR)' },
      { id: 'c', text: 'One standard deviation from the mean' },
      { id: 'd', text: 'The mean and median' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The box spans from Q1 to Q3, containing the middle 50% of observations (the interquartile range).',
      incorrect: 'The box in a boxplot shows the interquartile range (IQR)—from the 25th to 75th percentile, containing the middle 50% of data.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m5-q3',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'A distribution with a long tail extending to the left is called:',
    options: [
      { id: 'a', text: 'Positively skewed' },
      { id: 'b', text: 'Negatively skewed' },
      { id: 'c', text: 'Bimodal' },
      { id: 'd', text: 'Normal' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Negative skew means the tail extends to the left (toward negative values).',
      incorrect: 'A left tail indicates negative skew. Remember: the skew is named for the direction of the tail, not the bulk of the data.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m5-q4',
    moduleId: 'stats-module-5',
    type: 'true_false',
    question: 'Bar charts should have gaps between bars because the categories are discrete.',
    correct: true,
    feedback: {
      correct: 'Gaps between bars indicate that the categories are separate and discrete, unlike histogram bins.',
      incorrect: 'This is true. Bar charts have gaps to show that categories are discrete (separate). Histograms have touching bars because the variable is continuous.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m5-q5',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'A scatterplot is used to visualize:',
    options: [
      { id: 'a', text: 'The distribution of one variable' },
      { id: 'b', text: 'The relationship between two continuous variables' },
      { id: 'c', text: 'Frequencies of categorical variables' },
      { id: 'd', text: 'Changes over time only' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Scatterplots show the relationship (correlation) between two continuous variables.',
      incorrect: 'Scatterplots display the relationship between two continuous variables, with each point representing one case.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m5-q6',
    moduleId: 'stats-module-5',
    type: 'multiple_select',
    question: 'Which of the following can be identified from a boxplot? (Select all that apply)',
    options: [
      { id: 'a', text: 'Median' },
      { id: 'b', text: 'Mean' },
      { id: 'c', text: 'Outliers' },
      { id: 'd', text: 'Interquartile range' },
      { id: 'e', text: 'Standard deviation' }
    ],
    correct: ['a', 'c', 'd'],
    feedback: {
      correct: 'Boxplots show the median (line in box), IQR (box size), and outliers (individual points).',
      incorrect: 'Boxplots display the median, IQR, and outliers. The mean and standard deviation are not directly shown in a standard boxplot.'
    },
    difficulty: 'medium'
  }
]

// ============================================================
// STATISTICS CLASS - MODULE 6: Probability and Sampling
// ============================================================

export const statsModule6Questions = [
  {
    id: 'stats-m6-q1',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'In a normal distribution, approximately what percentage of scores fall within one standard deviation of the mean?',
    options: [
      { id: 'a', text: '50%' },
      { id: 'b', text: '68%' },
      { id: 'c', text: '95%' },
      { id: 'd', text: '99%' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The 68-95-99.7 rule: about 68% of scores fall within ±1 SD of the mean.',
      incorrect: 'The empirical rule states that approximately 68% of data falls within ±1 SD, 95% within ±2 SD, and 99.7% within ±3 SD.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m6-q2',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'The Central Limit Theorem states that:',
    options: [
      { id: 'a', text: 'All populations are normally distributed' },
      { id: 'b', text: 'The sampling distribution of means approaches normal as sample size increases' },
      { id: 'c', text: 'Larger samples always have larger means' },
      { id: 'd', text: 'The standard deviation decreases with larger samples' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The CLT says sampling distributions of means become normal as n increases, regardless of population shape.',
      incorrect: 'The Central Limit Theorem states that sampling distributions of means approach normality as sample size increases, even if the population is not normal.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m6-q3',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'Standard error is:',
    options: [
      { id: 'a', text: 'The same as standard deviation' },
      { id: 'b', text: 'The standard deviation of the sampling distribution' },
      { id: 'c', text: 'Always larger than the population standard deviation' },
      { id: 'd', text: 'A type of measurement error' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Standard error (SE) is the standard deviation of the sampling distribution of a statistic.',
      incorrect: 'Standard error is the standard deviation of the sampling distribution. It represents how much sample statistics vary from sample to sample.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m6-q4',
    moduleId: 'stats-module-6',
    type: 'fill_blank',
    question: 'If a z-score is 0, the score equals the ____.',
    answer: ['mean', 'average'],
    caseSensitive: false,
    feedback: {
      correct: 'A z-score of 0 means the raw score equals the mean (zero standard deviations away).',
      incorrect: 'When z = 0, the raw score equals the mean because z = (X - M)/SD, so X must equal M.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m6-q5',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'As sample size increases, what happens to the standard error?',
    options: [
      { id: 'a', text: 'It increases' },
      { id: 'b', text: 'It decreases' },
      { id: 'c', text: 'It stays the same' },
      { id: 'd', text: 'It becomes negative' }
    ],
    correct: 'b',
    feedback: {
      correct: 'SE = SD/√n, so as n increases, SE decreases. Larger samples give more precise estimates.',
      incorrect: 'Standard error decreases as sample size increases (SE = SD/√n). Larger samples provide more precise estimates of population parameters.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m6-q6',
    moduleId: 'stats-module-6',
    type: 'true_false',
    question: 'A z-score of -1.5 indicates a score below the mean.',
    correct: true,
    feedback: {
      correct: 'Negative z-scores are below the mean; positive z-scores are above the mean.',
      incorrect: 'This is true. Negative z-scores indicate values below the mean, while positive z-scores indicate values above.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m6-q7',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'The probability of an event can range from:',
    options: [
      { id: 'a', text: '-1 to +1' },
      { id: 'b', text: '0 to 1' },
      { id: 'c', text: '0 to 100' },
      { id: 'd', text: '-∞ to +∞' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Probabilities range from 0 (impossible) to 1 (certain).',
      incorrect: 'Probability values range from 0 (impossible event) to 1 (certain event). Sometimes expressed as percentages (0-100%).'
    },
    difficulty: 'easy'
  }
]

// ============================================================
// STATISTICS CLASS - MODULE 7: Hypothesis Testing
// ============================================================

export const statsModule7Questions = [
  {
    id: 'stats-m7-q1',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'The null hypothesis typically states that:',
    options: [
      { id: 'a', text: 'There is a significant effect or difference' },
      { id: 'b', text: 'There is no effect or difference' },
      { id: 'c', text: 'The research hypothesis is true' },
      { id: 'd', text: 'The sample is representative' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The null hypothesis (H₀) proposes no effect, no difference, or no relationship.',
      incorrect: 'The null hypothesis (H₀) states there is no effect or difference. It is the hypothesis we test against.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m7-q2',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'A Type I error occurs when:',
    options: [
      { id: 'a', text: 'We fail to reject a false null hypothesis' },
      { id: 'b', text: 'We reject a true null hypothesis' },
      { id: 'c', text: 'The sample size is too small' },
      { id: 'd', text: 'The effect size is too large' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Type I error = false positive = rejecting H₀ when it is actually true.',
      incorrect: 'Type I error (α, false positive) occurs when we reject the null hypothesis but it was actually true—we claim an effect exists when it does not.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m7-q3',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'If p = .03 and α = .05, you should:',
    options: [
      { id: 'a', text: 'Fail to reject the null hypothesis' },
      { id: 'b', text: 'Reject the null hypothesis' },
      { id: 'c', text: 'Increase the sample size' },
      { id: 'd', text: 'Change the alpha level' }
    ],
    correct: 'b',
    feedback: {
      correct: 'When p < α, we reject the null hypothesis. .03 < .05, so we reject H₀.',
      incorrect: 'Since p (.03) is less than α (.05), we reject the null hypothesis. The result is statistically significant.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m7-q4',
    moduleId: 'stats-module-7',
    type: 'true_false',
    question: 'A p-value tells you the probability that the null hypothesis is true.',
    correct: false,
    feedback: {
      correct: 'Common misconception! The p-value is the probability of the data (or more extreme) given that H₀ is true.',
      incorrect: 'This is false. The p-value is the probability of obtaining results as extreme as those observed, assuming H₀ is true. It is NOT the probability that H₀ is true.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m7-q5',
    moduleId: 'stats-module-7',
    type: 'matching',
    question: 'Match each term with its definition:',
    pairs: [
      { left: 'Alpha (α)', right: 'The probability of Type I error we are willing to accept' },
      { left: 'Beta (β)', right: 'The probability of Type II error' },
      { left: 'Power', right: 'The probability of correctly rejecting a false null' },
      { left: 'Effect size', right: 'The magnitude of the difference or relationship' }
    ],
    feedback: {
      correct: 'Alpha controls Type I error, beta is Type II error probability, power = 1 - β, and effect size measures magnitude.',
      incorrect: 'Alpha (α) is our Type I error rate; beta (β) is Type II error probability; power is the ability to detect real effects; effect size measures how large an effect is.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m7-q6',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'Cohen\'s d is a measure of:',
    options: [
      { id: 'a', text: 'Statistical significance' },
      { id: 'b', text: 'Effect size for comparing means' },
      { id: 'c', text: 'Correlation strength' },
      { id: 'd', text: 'Sample size adequacy' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Cohen\'s d measures the standardized difference between two means.',
      incorrect: 'Cohen\'s d is an effect size measure for the difference between two means, expressed in standard deviation units.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m7-q7',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'A one-tailed test is appropriate when:',
    options: [
      { id: 'a', text: 'You want to be more conservative' },
      { id: 'b', text: 'You predict a specific direction of the effect' },
      { id: 'c', text: 'Your sample size is small' },
      { id: 'd', text: 'You are unsure of the direction of the effect' }
    ],
    correct: 'b',
    feedback: {
      correct: 'One-tailed tests are used when you have a directional hypothesis (e.g., Group A > Group B).',
      incorrect: 'One-tailed tests are appropriate when you predict the direction of the effect before data collection. Two-tailed tests are used when you just predict a difference, not its direction.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m7-q8',
    moduleId: 'stats-module-7',
    type: 'multiple_select',
    question: 'Which factors increase statistical power? (Select all that apply)',
    options: [
      { id: 'a', text: 'Larger sample size' },
      { id: 'b', text: 'Larger effect size' },
      { id: 'c', text: 'Lower alpha level' },
      { id: 'd', text: 'Less variability in the data' },
      { id: 'e', text: 'Using a one-tailed instead of two-tailed test' }
    ],
    correct: ['a', 'b', 'd', 'e'],
    feedback: {
      correct: 'Power increases with larger n, larger effects, less noise (variability), and one-tailed tests. Lower alpha actually decreases power.',
      incorrect: 'Power is increased by: larger samples, larger effect sizes, less variability, and one-tailed tests. Decreasing alpha makes it harder to reject H₀, reducing power.'
    },
    difficulty: 'hard'
  }
]

// ============================================================
// STATISTICS CLASS - MODULE 8: Comparing Groups/Relationships
// ============================================================

export const statsModule8Questions = [
  {
    id: 'stats-m8-q1',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'An independent samples t-test is used when:',
    options: [
      { id: 'a', text: 'The same participants are measured twice' },
      { id: 'b', text: 'Two different groups are compared' },
      { id: 'c', text: 'There are more than two groups' },
      { id: 'd', text: 'The data is categorical' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Independent samples t-tests compare means between two separate, unrelated groups.',
      incorrect: 'Independent samples t-tests compare means from two separate groups of different participants. Paired t-tests are for repeated measures on the same participants.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m8-q2',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'A paired samples t-test is appropriate when:',
    options: [
      { id: 'a', text: 'Comparing two independent groups' },
      { id: 'b', text: 'Each participant is measured twice (before/after)' },
      { id: 'c', text: 'There are more than two conditions' },
      { id: 'd', text: 'The dependent variable is categorical' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Paired t-tests compare two related measurements (same participants measured twice).',
      incorrect: 'Paired (dependent) samples t-tests are used when the same participants are measured twice, such as pre-test/post-test designs.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m8-q3',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'A Pearson correlation coefficient of r = -.85 indicates:',
    options: [
      { id: 'a', text: 'A weak positive relationship' },
      { id: 'b', text: 'A strong negative relationship' },
      { id: 'c', text: 'No relationship' },
      { id: 'd', text: 'A perfect relationship' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The negative sign indicates an inverse relationship; .85 is close to -1, indicating strong strength.',
      incorrect: 'r = -.85 shows a strong negative (inverse) relationship. As one variable increases, the other tends to decrease.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m8-q4',
    moduleId: 'stats-module-8',
    type: 'true_false',
    question: 'Correlation implies causation.',
    correct: false,
    feedback: {
      correct: 'Correlation shows association but cannot prove that one variable causes changes in another.',
      incorrect: 'This is false. Correlation only shows that two variables are related—it does not prove that one causes the other. There may be confounding variables or the relationship may be coincidental.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m8-q5',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'Levene\'s test is used to check the assumption of:',
    options: [
      { id: 'a', text: 'Normality' },
      { id: 'b', text: 'Independence' },
      { id: 'c', text: 'Homogeneity of variance' },
      { id: 'd', text: 'Linearity' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Levene\'s test checks whether groups have equal variances (homogeneity of variance).',
      incorrect: 'Levene\'s test assesses homogeneity of variance—whether different groups have similar variability. This is an assumption of independent samples t-tests.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m8-q6',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'The coefficient of determination (r²) represents:',
    options: [
      { id: 'a', text: 'The strength of the correlation' },
      { id: 'b', text: 'The proportion of variance explained' },
      { id: 'c', text: 'The slope of the regression line' },
      { id: 'd', text: 'The probability of the relationship' }
    ],
    correct: 'b',
    feedback: {
      correct: 'r² tells you what proportion of variance in Y is explained by X.',
      incorrect: 'R-squared (r²) represents the proportion of variance in one variable that is explained by the other. For example, r = .70 means r² = .49, so 49% of variance is shared.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m8-q7',
    moduleId: 'stats-module-8',
    type: 'multiple_select',
    question: 'Which are assumptions of the independent samples t-test? (Select all that apply)',
    options: [
      { id: 'a', text: 'Normal distribution of the DV in each group' },
      { id: 'b', text: 'Homogeneity of variance' },
      { id: 'c', text: 'Independent observations' },
      { id: 'd', text: 'Equal sample sizes' },
      { id: 'e', text: 'Linear relationship between variables' }
    ],
    correct: ['a', 'b', 'c'],
    feedback: {
      correct: 'Assumptions include normality, homogeneity of variance, and independence. Equal n is preferred but not required.',
      incorrect: 'Key assumptions are: (1) normally distributed DV in each group, (2) equal variances (homogeneity), and (3) independent observations. Equal sample sizes help but are not required.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m8-q8',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'When interpreting Cohen\'s d, a value of 0.8 is considered:',
    options: [
      { id: 'a', text: 'Small effect' },
      { id: 'b', text: 'Medium effect' },
      { id: 'c', text: 'Large effect' },
      { id: 'd', text: 'No effect' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Cohen\'s conventions: d = 0.2 (small), d = 0.5 (medium), d = 0.8 (large).',
      incorrect: 'Cohen\'s guidelines for d: 0.2 = small, 0.5 = medium, 0.8 = large. So d = 0.8 represents a large effect.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m8-q9',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'A chi-square test of independence is used when:',
    options: [
      { id: 'a', text: 'Both variables are continuous' },
      { id: 'b', text: 'Both variables are categorical' },
      { id: 'c', text: 'One variable is continuous, one is categorical' },
      { id: 'd', text: 'You want to compare three or more means' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Chi-square tests examine relationships between two categorical variables.',
      incorrect: 'Chi-square test of independence is used when both variables are categorical, to determine if there is an association between them.'
    },
    difficulty: 'easy'
  }
]

// ============================================================
// COMBINED EXPORTS
// ============================================================

// All statistics questions combined
export const allStatisticsQuestions = [
  ...statsModule1Questions,
  ...statsModule2Questions,
  ...statsModule3Questions,
  ...statsModule4Questions,
  ...statsModule5Questions,
  ...statsModule6Questions,
  ...statsModule7Questions,
  ...statsModule8Questions
]

// Questions organized by module
export const questionsByModule = {
  'stats-module-1': statsModule1Questions,
  'stats-module-2': statsModule2Questions,
  'stats-module-3': statsModule3Questions,
  'stats-module-4': statsModule4Questions,
  'stats-module-5': statsModule5Questions,
  'stats-module-6': statsModule6Questions,
  'stats-module-7': statsModule7Questions,
  'stats-module-8': statsModule8Questions
}

// Helper functions
export function getQuestionsByModule(moduleId) {
  return questionsByModule[moduleId] || []
}

export function getQuestionById(questionId) {
  return allStatisticsQuestions.find(q => q.id === questionId)
}

export function getQuestionsByDifficulty(difficulty) {
  return allStatisticsQuestions.filter(q => q.difficulty === difficulty)
}

export function getQuestionsByType(type) {
  return allStatisticsQuestions.filter(q => q.type === type)
}

export function getRandomQuestions(moduleId, count = 10) {
  const questions = getQuestionsByModule(moduleId)
  const shuffled = [...questions].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length))
}
