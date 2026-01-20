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
  ,
  {
    id: 'stats-m1-q6',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Which statement best distinguishes a research hypothesis from a statistical hypothesis?',
    options: [
      { id: 'a', text: 'A research hypothesis predicts a population parameter value, while a statistical hypothesis describes a theory.' },
      { id: 'b', text: 'A research hypothesis is a conceptual claim, while a statistical hypothesis is the testable form using variables/parameters.' },
      { id: 'c', text: 'A research hypothesis is always null, while a statistical hypothesis is always alternative.' },
      { id: 'd', text: 'There is no difference; they are the same.' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Research hypotheses are conceptual; statistical hypotheses translate them into testable statements about variables or parameters.',
      incorrect: 'A research hypothesis is conceptual, while a statistical hypothesis expresses it in testable statistical terms.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m1-q7',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Which is a concrete reason psychology students learn statistics that focuses on reading research?',
    options: [
      { id: 'a', text: 'To build software for data analysis' },
      { id: 'b', text: 'To evaluate whether study conclusions match the data and methods' },
      { id: 'c', text: 'To avoid writing research papers' },
      { id: 'd', text: 'To replace theory with numbers' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Statistics helps readers judge whether study conclusions are supported by data and methods.',
      incorrect: 'The key reading-focused reason is being able to evaluate research claims critically.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m1-q8',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'In behavioral research, a population is _____ and a sample is _____.',
    options: [
      { id: 'a', text: 'a statistic; a parameter' },
      { id: 'b', text: 'the full group of interest; the subset studied' },
      { id: 'c', text: 'the subset studied; the full group of interest' },
      { id: 'd', text: 'the study results; the study design' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The population is the full group you want to generalize to; the sample is the subset you observed.',
      incorrect: 'Population is the full group of interest; the sample is the subset actually studied.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m1-q9',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'A post says "X causes Y" based on a correlation. Which two issues make the claim unwarranted?',
    options: [
      { id: 'a', text: 'Random assignment and measurement error' },
      { id: 'b', text: 'Reverse causation and third-variable confounding' },
      { id: 'c', text: 'Low sample size and p-hacking' },
      { id: 'd', text: 'Nonresponse bias and instrumentation changes' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Correlation cannot establish direction or rule out a third variable.',
      incorrect: 'The key problems are reverse causation and third-variable confounds.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m1-q10',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Which best captures "summarize data" versus "make inferences from data"?',
    options: [
      { id: 'a', text: 'Summarize uses samples; inference uses populations.' },
      { id: 'b', text: 'Summarize describes observed data; inference generalizes from sample to population.' },
      { id: 'c', text: 'Summarize is always causal; inference is always descriptive.' },
      { id: 'd', text: 'Summarize uses graphs; inference uses tables.' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Summaries describe what you observed; inference generalizes beyond the sample.',
      incorrect: 'Summarize describes observed data; inference generalizes to a population.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m1-q11',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Which is a statistical question for the claim "Students who sleep more have better exam scores"?',
    options: [
      { id: 'a', text: 'Do students like sleeping?' },
      { id: 'b', text: 'Is the correlation between sleep hours and exam score positive?' },
      { id: 'c', text: 'Why do students sleep?' },
      { id: 'd', text: 'Should exams be shorter?' }
    ],
    correct: 'b',
    feedback: {
      correct: 'This asks about a measurable relationship between two variables.',
      incorrect: 'A statistical question should be measurable, such as a correlation between sleep and scores.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m1-q12',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Which example shows how graphs can mislead and a simple fix?',
    options: [
      { id: 'a', text: 'Using a legend; fix by removing it' },
      { id: 'b', text: 'Truncating the y-axis; fix by starting at zero or clearly indicating the scale break' },
      { id: 'c', text: 'Using color; fix by making everything gray' },
      { id: 'd', text: 'Adding a title; fix by removing it' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Truncated axes exaggerate differences; starting at zero or showing a break reduces misinterpretation.',
      incorrect: 'Axis truncation is a common way graphs mislead; the fix is proper scaling or clear breaks.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m1-q13',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Why does "statistically significant" not necessarily mean "important"?',
    options: [
      { id: 'a', text: 'Significance guarantees a large effect' },
      { id: 'b', text: 'Significance only says the data are unlikely under H0, not that the effect is large or meaningful' },
      { id: 'c', text: 'Significance only applies to qualitative data' },
      { id: 'd', text: 'Significance means the result is always wrong' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Statistical significance reflects evidence against H0, not effect size or practical impact.',
      incorrect: 'Significance is about evidence, not size or importance of an effect.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m1-q14',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Which scenario shows a result that is practically important but not statistically significant?',
    options: [
      { id: 'a', text: 'A tiny effect with a huge sample is significant and meaningful' },
      { id: 'b', text: 'A moderate effect in a small sample misses significance due to low power' },
      { id: 'c', text: 'A null effect with a large sample is significant' },
      { id: 'd', text: 'A large effect always becomes significant' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Small samples can miss significance even when the effect would matter in practice.',
      incorrect: 'Low power can hide meaningful effects, leading to nonsignificant results.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m1-q15',
    moduleId: 'stats-module-1',
    type: 'multiple_choice',
    question: 'Which best defines replication and why it matters?',
    options: [
      { id: 'a', text: 'Repeating a study to see if results hold; it checks reliability beyond one sample' },
      { id: 'b', text: 'Changing the hypothesis; it ensures novelty' },
      { id: 'c', text: 'Collecting data once; it saves time' },
      { id: 'd', text: 'Using only large samples; it guarantees significance' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Replication tests whether findings are reliable and not a one-time fluke.',
      incorrect: 'Replication means repeating a study to see if the result holds up across samples.'
    },
    difficulty: 'hard'
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
  ,
  {
    id: 'stats-m2-q8',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'Which list correctly classifies these variables: gender category, reaction time (ms), diagnosis (yes/no), number of symptoms endorsed?',
    options: [
      { id: 'a', text: 'categorical, quantitative, categorical, quantitative' },
      { id: 'b', text: 'quantitative, categorical, quantitative, categorical' },
      { id: 'c', text: 'categorical, categorical, quantitative, quantitative' },
      { id: 'd', text: 'quantitative, quantitative, categorical, categorical' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Gender and diagnosis are categorical; reaction time and symptom count are quantitative.',
      incorrect: 'Gender/diagnosis are categorical; reaction time and number of symptoms are quantitative.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m2-q9',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'In a study where caffeine dose is manipulated to see its effect on anxiety score, what are the IV and DV?',
    options: [
      { id: 'a', text: 'IV: anxiety score; DV: caffeine dose' },
      { id: 'b', text: 'IV: caffeine dose; DV: anxiety score' },
      { id: 'c', text: 'IV: participant age; DV: anxiety score' },
      { id: 'd', text: 'IV: anxiety score; DV: participant age' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The independent variable is what you manipulate (dose); the dependent variable is what you measure (anxiety).',
      incorrect: 'Dose is the IV; anxiety score is the DV.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m2-q10',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'A study observes people who choose to exercise and compares their mood to non-exercisers. This is _____ because _____.',
    options: [
      { id: 'a', text: 'experimental, because the researcher assigned exercise' },
      { id: 'b', text: 'observational, because participants self-selected the activity' },
      { id: 'c', text: 'experimental, because mood was measured' },
      { id: 'd', text: 'observational, because there was random assignment' }
    ],
    correct: 'b',
    feedback: {
      correct: 'It is observational because there is no random assignment or manipulation by the researcher.',
      incorrect: 'Observational studies do not manipulate variables or randomly assign participants.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m2-q11',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'A study claims "social media increases depression." Which confound and fix are most appropriate?',
    options: [
      { id: 'a', text: 'Confound: age; fix: use a larger sample' },
      { id: 'b', text: 'Confound: baseline mental health; fix: measure and control for baseline depression' },
      { id: 'c', text: 'Confound: time of day; fix: collect data online' },
      { id: 'd', text: 'Confound: gender; fix: remove all women' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Baseline mental health could drive both social media use and depression; measuring/controlling helps.',
      incorrect: 'A plausible confound is baseline depression; controlling for it reduces bias.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m2-q12',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'Which statement best distinguishes between-subjects and within-subjects designs?',
    options: [
      { id: 'a', text: 'Between-subjects uses the same participants in all conditions; within-subjects uses different participants.' },
      { id: 'b', text: 'Between-subjects uses different participants in each condition; within-subjects uses the same participants across conditions.' },
      { id: 'c', text: 'Between-subjects always has higher power.' },
      { id: 'd', text: 'Within-subjects cannot include control groups.' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Between-subjects uses different participants; within-subjects uses the same participants across conditions.',
      incorrect: 'Between-subjects: different participants per condition; within-subjects: same participants across conditions.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m2-q13',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'You measure stress with a single 1-10 item. Which limitation and improvement are most appropriate?',
    options: [
      { id: 'a', text: 'Limitation: too many items; improvement: remove items' },
      { id: 'b', text: 'Limitation: low reliability; improvement: use a multi-item scale' },
      { id: 'c', text: 'Limitation: too objective; improvement: make it subjective' },
      { id: 'd', text: 'Limitation: too many response options; improvement: use fewer colors' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Single-item measures can be unreliable; a validated multi-item scale improves reliability.',
      incorrect: 'A multi-item scale typically improves measurement reliability.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m2-q14',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'Which variable is numeric but should often be treated as categorical?',
    options: [
      { id: 'a', text: 'Reaction time in ms' },
      { id: 'b', text: 'Zip code' },
      { id: 'c', text: 'Hours of sleep' },
      { id: 'd', text: 'Number of symptoms' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Zip codes are numeric labels, not meaningful quantities.',
      incorrect: 'Zip codes are identifiers and should be treated as categorical.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m2-q15',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'Which pairing best matches a threat to internal validity and a threat to construct validity?',
    options: [
      { id: 'a', text: 'Internal: maturation; Construct: poorly defined measure' },
      { id: 'b', text: 'Internal: poor wording; Construct: random assignment' },
      { id: 'c', text: 'Internal: sample bias; Construct: history effects' },
      { id: 'd', text: 'Internal: instrumentation; Construct: statistical power' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Maturation threatens internal validity; poor measurement threatens construct validity.',
      incorrect: 'Internal validity threats include maturation; construct validity threats include weak measures.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m2-q16',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'How do random assignment and random sampling differ?',
    options: [
      { id: 'a', text: 'Assignment improves generalizability; sampling improves causal inference' },
      { id: 'b', text: 'Assignment reduces confounds; sampling improves representativeness' },
      { id: 'c', text: 'Both are the same and guarantee causation' },
      { id: 'd', text: 'Assignment is about recruiting; sampling is about measuring' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Random assignment supports causal inference; random sampling supports generalizability.',
      incorrect: 'Assignment helps with causality; sampling helps with representativeness.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m2-q17',
    moduleId: 'stats-module-2',
    type: 'multiple_choice',
    question: 'Which is the best operational definition and evaluation plan for "academic motivation"?',
    options: [
      { id: 'a', text: 'Definition: student attitude; Evaluation: none needed' },
      { id: 'b', text: 'Definition: scores on a validated motivation scale; Evaluation: check reliability and validity evidence' },
      { id: 'c', text: 'Definition: GPA; Evaluation: ask the instructor' },
      { id: 'd', text: 'Definition: number of friends; Evaluation: do not document' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Operational definitions should specify measurable indicators and be evaluated for reliability/validity.',
      incorrect: 'Use a clear measurable definition and evaluate reliability/validity.'
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
  ,
  {
    id: 'stats-m3-q6',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'Why is setting the correct measurement level (nominal/ordinal/continuous) important?',
    options: [
      { id: 'a', text: 'It only affects how data are colored' },
      { id: 'b', text: 'It determines which analyses and summaries are appropriate' },
      { id: 'c', text: 'It changes the sample size' },
      { id: 'd', text: 'It has no effect on results' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Measurement level affects which analyses and summaries are appropriate.',
      incorrect: 'Correct measurement levels ensure you use valid analyses and summaries.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m3-q7',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'A dataset uses 999 for missing values. What should you do before analysis?',
    options: [
      { id: 'a', text: 'Leave 999 as a real value' },
      { id: 'b', text: 'Recode 999 to missing so it is excluded from computations' },
      { id: 'c', text: 'Delete the variable entirely' },
      { id: 'd', text: 'Replace 999 with the mean' }
    ],
    correct: 'b',
    feedback: {
      correct: 'You should mark 999 as missing so it is not treated as data.',
      incorrect: 'Recode the placeholder to missing before computing stats or graphs.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m3-q8',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'Which best distinguishes a data file from an analysis output in Jamovi?',
    options: [
      { id: 'a', text: 'Data files contain raw values; output contains results/figures based on analyses' },
      { id: 'b', text: 'Data files are always charts; output is always tables' },
      { id: 'c', text: 'Data files only store p-values; output only stores variables' },
      { id: 'd', text: 'They are the same thing' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Data files store values; output stores analysis results derived from those values.',
      incorrect: 'Data files store raw values; output shows analysis results.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m3-q9',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'Which sequence best matches screening for outliers?',
    options: [
      { id: 'a', text: 'Run t-tests, then check plots, then decide' },
      { id: 'b', text: 'Check plots/summary, verify data entry, decide on keep/transform/flag' },
      { id: 'c', text: 'Delete all extreme values immediately' },
      { id: 'd', text: 'Ignore outliers because they are rare' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Screen outliers by checking plots/summaries, verifying values, then deciding how to handle them.',
      incorrect: 'Start with plots/summaries, verify, then decide on handling.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m3-q10',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'A variable is stored as text ("1", "2", "3"). What problem can this cause and how do you fix it?',
    options: [
      { id: 'a', text: 'No problem; text is preferred' },
      { id: 'b', text: 'Analyses treat it as categorical; convert to numeric and set measurement level' },
      { id: 'c', text: 'It will inflate sample size; delete half the cases' },
      { id: 'd', text: 'It will create missing values; replace with zeros' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Text values may be treated as categories; convert to numeric and set the correct level.',
      incorrect: 'Convert text numbers to numeric so analyses treat them correctly.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m3-q11',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'What does it mean to recode a variable?',
    options: [
      { id: 'a', text: 'Delete the variable' },
      { id: 'b', text: 'Change values to new values based on a rule (e.g., reverse scoring)' },
      { id: 'c', text: 'Change the column name only' },
      { id: 'd', text: 'Recalculate the sample size' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Recoding changes values based on a rule, such as reversing item scores.',
      incorrect: 'Recoding applies a rule to change values (e.g., reverse scoring).'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m3-q12',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'Which statement best distinguishes wide versus long data?',
    options: [
      { id: 'a', text: 'Wide: one row per observation per time; Long: one row per participant with multiple time columns' },
      { id: 'b', text: 'Wide: multiple columns for repeated measures; Long: multiple rows per participant' },
      { id: 'c', text: 'Wide: only categorical variables; Long: only numeric variables' },
      { id: 'd', text: 'Wide and long are identical' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Wide uses separate columns for repeated measures; long uses multiple rows per participant.',
      incorrect: 'Wide: multiple columns for repeated measures; long: multiple rows per participant.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m3-q13',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'Which is a good reproducible cleaning checklist item?',
    options: [
      { id: 'a', text: 'Delete any rows that look odd without notes' },
      { id: 'b', text: 'Document missing-value codes, data type fixes, and recodes' },
      { id: 'c', text: 'Only check one variable' },
      { id: 'd', text: 'Skip documentation to save time' }
    ],
    correct: 'b',
    feedback: {
      correct: 'A reproducible checklist includes documenting missing codes, data types, and recoding steps.',
      incorrect: 'Good practice is to document each cleaning step and decision.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m3-q14',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'After merging two datasets by participant ID, the sample size drops. Which is a likely cause and check?',
    options: [
      { id: 'a', text: 'IDs do not match; check for mismatched or duplicate IDs' },
      { id: 'b', text: 'Too many variables; delete columns' },
      { id: 'c', text: 'Too many rows; sort by name' },
      { id: 'd', text: 'Outliers; remove all extreme values' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Mismatched or duplicate IDs can drop cases; check ID consistency.',
      incorrect: 'Check whether IDs match across files and for duplicates.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m3-q15',
    moduleId: 'stats-module-3',
    type: 'multiple_choice',
    question: 'Why is documenting data handling decisions important?',
    options: [
      { id: 'a', text: 'It is optional and only for large studies' },
      { id: 'b', text: 'It supports transparency, reproducibility, and interpretation' },
      { id: 'c', text: 'It replaces statistical analysis' },
      { id: 'd', text: 'It guarantees significance' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Documentation improves transparency, reproducibility, and interpretability.',
      incorrect: 'Documenting decisions supports transparency and reproducibility.'
    },
    difficulty: 'hard'
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
  ,
  {
    id: 'stats-m4-q9',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'Which statement correctly defines mean, median, and mode and identifies the most robust to outliers?',
    options: [
      { id: 'a', text: 'Mean is the middle, median is the average, mode is the most common; mean is most robust' },
      { id: 'b', text: 'Mean is the average, median is the middle, mode is the most common; median is most robust' },
      { id: 'c', text: 'Mean is the most common, median is the average, mode is the middle; mode is most robust' },
      { id: 'd', text: 'Mean, median, and mode are identical in all distributions' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Mean = average, median = middle, mode = most common; median is most robust to outliers.',
      incorrect: 'Median is most robust; mean is sensitive to outliers.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m4-q10',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'Which best defines standard deviation in plain language?',
    options: [
      { id: 'a', text: 'The number of scores in the dataset' },
      { id: 'b', text: 'A typical distance of scores from the mean' },
      { id: 'c', text: 'The highest score minus the lowest score' },
      { id: 'd', text: 'The most common score' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Standard deviation describes typical distance from the mean.',
      incorrect: 'SD is a typical distance of scores from the mean.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m4-q11',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'A positively skewed distribution has:',
    options: [
      { id: 'a', text: 'A long tail to the right with mean greater than median' },
      { id: 'b', text: 'A long tail to the left with mean less than median' },
      { id: 'c', text: 'No tail and perfectly symmetric shape' },
      { id: 'd', text: 'Mean equal to mode with negative values only' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Positive skew has a right tail and mean typically greater than median.',
      incorrect: 'Positive skew means a right tail; mean is often above the median.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m4-q12',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'For the scores 2, 3, 3, 10, 12, what are the mean and median?',
    options: [
      { id: 'a', text: 'Mean = 6, Median = 3' },
      { id: 'b', text: 'Mean = 3, Median = 6' },
      { id: 'c', text: 'Mean = 6, Median = 6' },
      { id: 'd', text: 'Mean = 5, Median = 3' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Mean is 30/5 = 6; median is the middle value, 3.',
      incorrect: 'Add the values to get 30; mean is 6 and median is 3.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m4-q13',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'Why is standard deviation usually reported instead of variance?',
    options: [
      { id: 'a', text: 'SD is in the original units, variance is squared units' },
      { id: 'b', text: 'Variance is always zero' },
      { id: 'c', text: 'SD is always larger than variance' },
      { id: 'd', text: 'Variance cannot be computed for samples' }
    ],
    correct: 'a',
    feedback: {
      correct: 'SD is in the original units, making it easier to interpret than variance.',
      incorrect: 'Variance is in squared units; SD puts the variability back in original units.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m4-q14',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'How can an outlier affect mean, SD, and median?',
    options: [
      { id: 'a', text: 'It can pull the mean and SD, while the median changes little' },
      { id: 'b', text: 'It never affects the mean' },
      { id: 'c', text: 'It affects only the median' },
      { id: 'd', text: 'It makes SD smaller and mean unchanged' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Outliers often pull the mean and inflate SD, but the median is more robust.',
      incorrect: 'Outliers affect mean/SD much more than the median.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m4-q15',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'How would you interpret a z-score of -1.2?',
    options: [
      { id: 'a', text: '1.2 SD above the mean' },
      { id: 'b', text: '1.2 SD below the mean' },
      { id: 'c', text: '1.2 points above the mean' },
      { id: 'd', text: '1.2 percent below the mean' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Negative z means below the mean; magnitude is 1.2 SD.',
      incorrect: 'A z of -1.2 is 1.2 SD below the mean.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m4-q16',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'Why can mean and SD be misleading for a bimodal distribution?',
    options: [
      { id: 'a', text: 'They summarize two clusters into a single center and spread' },
      { id: 'b', text: 'They are always undefined for bimodal data' },
      { id: 'c', text: 'They depend only on the median' },
      { id: 'd', text: 'They ignore sample size' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Bimodal data may have two clusters; a single mean/SD can hide that structure.',
      incorrect: 'Mean/SD can obscure multiple peaks; report modes and plots too.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m4-q17',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'What is restriction of range and how does it affect variability?',
    options: [
      { id: 'a', text: 'Using a narrow subset of values; it reduces observed variability' },
      { id: 'b', text: 'Using a wide range; it increases measurement error' },
      { id: 'c', text: 'A plotting choice; it changes the mean' },
      { id: 'd', text: 'A data entry error; it creates outliers' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Restriction of range limits values and makes variability appear smaller.',
      incorrect: 'It limits the range of values and reduces observed variability.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m4-q18',
    moduleId: 'stats-module-4',
    type: 'multiple_choice',
    question: 'How should you summarize a heavily skewed variable?',
    options: [
      { id: 'a', text: 'Use mean and SD only' },
      { id: 'b', text: 'Use median and IQR, and consider a transformation' },
      { id: 'c', text: 'Use mode only' },
      { id: 'd', text: 'Avoid summarizing it' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Median/IQR are robust to skew; transformations can improve interpretability.',
      incorrect: 'Use robust summaries like median/IQR and consider transforming.'
    },
    difficulty: 'hard'
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
  ,
  {
    id: 'stats-m5-q7',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'Which plot is most appropriate for: one quantitative distribution, group comparison, two quantitative variables?',
    options: [
      { id: 'a', text: 'Histogram, bar chart, scatterplot' },
      { id: 'b', text: 'Scatterplot, histogram, bar chart' },
      { id: 'c', text: 'Boxplot, line plot, pie chart' },
      { id: 'd', text: 'Pie chart, histogram, bar chart' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Histogram for a distribution, bar/box plot for group comparison, scatterplot for two quantitative variables.',
      incorrect: 'Histogram, bar/box plot, and scatterplot are the standard choices for those tasks.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m5-q8',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'What does a histogram show that a bar chart does not (for continuous data)?',
    options: [
      { id: 'a', text: 'Category labels only' },
      { id: 'b', text: 'The distribution shape across bins of a continuous variable' },
      { id: 'c', text: 'Exact individual data points' },
      { id: 'd', text: 'Only the mean and SD' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Histograms show the distribution shape across continuous bins.',
      incorrect: 'Histograms show how continuous values are distributed across bins.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m5-q9',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'What is a scatterplot designed to reveal?',
    options: [
      { id: 'a', text: 'Frequencies of categories' },
      { id: 'b', text: 'The relationship between two quantitative variables' },
      { id: 'c', text: 'The distribution of one variable only' },
      { id: 'd', text: 'The ordering of categories' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Scatterplots display the relationship between two quantitative variables.',
      incorrect: 'Scatterplots show how two quantitative variables move together.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m5-q10',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'A histogram with a long right tail indicates:',
    options: [
      { id: 'a', text: 'Negative skew' },
      { id: 'b', text: 'Positive skew' },
      { id: 'c', text: 'No skew and no outliers' },
      { id: 'd', text: 'Bimodality' }
    ],
    correct: 'b',
    feedback: {
      correct: 'A long right tail indicates positive skew.',
      incorrect: 'Right tail = positive skew.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m5-q11',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'When is a boxplot especially useful?',
    options: [
      { id: 'a', text: 'Comparing distributions across groups and showing median/IQR/outliers' },
      { id: 'b', text: 'Showing exact values for every observation' },
      { id: 'c', text: 'Displaying a single proportion' },
      { id: 'd', text: 'Showing time series trends' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Boxplots summarize center, spread, and outliers across groups.',
      incorrect: 'Boxplots are great for comparing distributions across groups.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m5-q12',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'A plot truncates the y-axis to exaggerate differences. Why is this misleading and how should it be fixed?',
    options: [
      { id: 'a', text: 'It changes the data; fix by changing colors' },
      { id: 'b', text: 'It exaggerates visual differences; fix by using a full scale or clearly showing the break' },
      { id: 'c', text: 'It reduces sample size; fix by adding more points' },
      { id: 'd', text: 'It makes the plot too large; fix by shrinking it' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Truncation exaggerates differences; use a full axis or show a clear break.',
      incorrect: 'Use a full scale or clearly mark the break to avoid exaggeration.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m5-q13',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'Why can showing raw data points be better than bars alone for group comparisons?',
    options: [
      { id: 'a', text: 'It hides variability' },
      { id: 'b', text: 'It reveals distribution and sample size, not just averages' },
      { id: 'c', text: 'It makes the graph simpler by removing data' },
      { id: 'd', text: 'It prevents outliers from showing' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Raw points show distribution, spread, and sample size that bars alone hide.',
      incorrect: 'Bars hide variability; raw points reveal the data structure.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m5-q14',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'How can bin width in a histogram change interpretation?',
    options: [
      { id: 'a', text: 'Bin width has no effect' },
      { id: 'b', text: 'Too-wide bins can hide structure; too-narrow bins can exaggerate noise' },
      { id: 'c', text: 'It only affects the axis labels' },
      { id: 'd', text: 'It changes the mean' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Bin width affects the visible shape; check robustness with multiple widths.',
      incorrect: 'Bin width can hide or exaggerate structure; try multiple widths.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m5-q15',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'For 3 groups measured at 2 time points, what is a good visualization plan?',
    options: [
      { id: 'a', text: 'One bar chart of all values combined' },
      { id: 'b', text: 'Line plot of means over time by group, plus raw/jittered points or boxplots' },
      { id: 'c', text: 'Only a pie chart for each group' },
      { id: 'd', text: 'Only a histogram of all observations' }
    ],
    correct: 'b',
    feedback: {
      correct: 'A grouped line plot over time plus raw points/boxplots shows trends and variability.',
      incorrect: 'Use group-by-time plots and include variability information.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m5-q16',
    moduleId: 'stats-module-5',
    type: 'multiple_choice',
    question: 'When might a mean +/- SE plot be misleading, and what is a better alternative?',
    options: [
      { id: 'a', text: 'When distributions are skewed; use boxplots or violin plots with raw points' },
      { id: 'b', text: 'When sample size is large; use no plots' },
      { id: 'c', text: 'When the mean is accurate; use fewer colors' },
      { id: 'd', text: 'When there are categories; use a pie chart' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Mean +/- SE can hide distribution shape; box/violin plots with points show more.',
      incorrect: 'Use plots that show distribution shape, like box/violin with points.'
    },
    difficulty: 'hard'
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
  ,
  {
    id: 'stats-m6-q8',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'Which best defines probability using the long-run frequency idea?',
    options: [
      { id: 'a', text: 'A personal belief that never changes' },
      { id: 'b', text: 'The proportion of times an event occurs in many repeated trials' },
      { id: 'c', text: 'The average value of a dataset' },
      { id: 'd', text: 'The number of possible outcomes only' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Probability is the long-run relative frequency across many trials.',
      incorrect: 'Use the long-run frequency interpretation.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m6-q9',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'Which example shows independent events rather than mutually exclusive events?',
    options: [
      { id: 'a', text: 'Rolling a 6 and rolling an odd number on the same die roll' },
      { id: 'b', text: 'Flipping heads and flipping tails on the same coin toss' },
      { id: 'c', text: 'Flipping heads on one coin toss and heads on a second toss' },
      { id: 'd', text: 'Drawing a heart and a spade on the same single card draw' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Separate coin tosses are independent events.',
      incorrect: 'Independent events do not affect each other, like separate coin tosses.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m6-q10',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'What is sampling error?',
    options: [
      { id: 'a', text: 'A mistake in data entry' },
      { id: 'b', text: 'Natural difference between a sample statistic and the population parameter' },
      { id: 'c', text: 'A biased sample only' },
      { id: 'd', text: 'A type of software bug' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Sampling error is the natural fluctuation of sample statistics around the population value.',
      incorrect: 'Sampling error is normal variability between a sample statistic and the population parameter.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m6-q11',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'What is a sampling distribution and why is it important?',
    options: [
      { id: 'a', text: 'The distribution of raw scores; it shows individual variability' },
      { id: 'b', text: 'The distribution of a statistic across many samples; it enables inference' },
      { id: 'c', text: 'A list of sample sizes; it controls bias' },
      { id: 'd', text: 'A histogram of categories; it shows frequencies' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Sampling distributions describe how a statistic varies across samples and underpin inference.',
      incorrect: 'It is the distribution of a statistic across samples, central to inference.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m6-q12',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'What does a confidence interval aim to convey?',
    options: [
      { id: 'a', text: 'The probability that H0 is true' },
      { id: 'b', text: 'A range of plausible values for a population parameter' },
      { id: 'c', text: 'The exact value of the parameter' },
      { id: 'd', text: 'The distribution of raw data' }
    ],
    correct: 'b',
    feedback: {
      correct: 'A CI provides a plausible range of values for the parameter.',
      incorrect: 'CIs summarize a plausible range for the population parameter.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m6-q13',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'How does standard error differ from standard deviation?',
    options: [
      { id: 'a', text: 'SE describes variability of a statistic across samples; SD describes variability among individual scores' },
      { id: 'b', text: 'SE and SD are the same' },
      { id: 'c', text: 'SE is always larger than SD' },
      { id: 'd', text: 'SE describes outliers; SD describes the mean' }
    ],
    correct: 'a',
    feedback: {
      correct: 'SD is variability among scores; SE is variability of a statistic across samples.',
      incorrect: 'SE is the spread of a statistic; SD is the spread of individual scores.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m6-q14',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'Compared to convenience sampling, simple random sampling tends to:',
    options: [
      { id: 'a', text: 'Increase bias risk' },
      { id: 'b', text: 'Reduce bias risk and improve representativeness' },
      { id: 'c', text: 'Eliminate all sampling error' },
      { id: 'd', text: 'Guarantee significance' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Random sampling lowers bias risk and improves representativeness.',
      incorrect: 'Simple random sampling reduces bias risk relative to convenience sampling.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m6-q15',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'As sample size increases, what happens to standard error and CI width?',
    options: [
      { id: 'a', text: 'SE increases and CI widens' },
      { id: 'b', text: 'SE decreases and CI narrows' },
      { id: 'c', text: 'SE stays the same and CI widens' },
      { id: 'd', text: 'SE decreases and CI widens' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Larger samples reduce SE and typically narrow CIs.',
      incorrect: 'SE decreases with n, leading to narrower CIs.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m6-q16',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'How can biased sampling yield a precise but wrong estimate?',
    options: [
      { id: 'a', text: 'Bias shifts the estimate away from the truth even with small SE' },
      { id: 'b', text: 'Bias always increases SE' },
      { id: 'c', text: 'Bias only affects large samples' },
      { id: 'd', text: 'Bias makes estimates unbiased by definition' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Bias can systematically shift estimates; precision does not guarantee accuracy.',
      incorrect: 'A biased sample can be precise yet consistently wrong.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m6-q17',
    moduleId: 'stats-module-6',
    type: 'multiple_choice',
    question: 'Why does the normal distribution often appear in sampling contexts?',
    options: [
      { id: 'a', text: 'Because most populations are exactly normal' },
      { id: 'b', text: 'Because averages of many random influences tend toward normality' },
      { id: 'c', text: 'Because samples are always large' },
      { id: 'd', text: 'Because software forces normality' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Many small random influences add up to a normal shape (CLT idea).',
      incorrect: 'Averages of many influences tend toward normality.'
    },
    difficulty: 'hard'
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
  ,
  {
    id: 'stats-m7-q9',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'For the claim "the mean anxiety change is not zero," which hypotheses are correct?',
    options: [
      { id: 'a', text: 'H0: mu != 0; H1: mu = 0' },
      { id: 'b', text: 'H0: mu = 0; H1: mu != 0' },
      { id: 'c', text: 'H0: mu > 0; H1: mu < 0' },
      { id: 'd', text: 'H0: mu = 0; H1: mu > 0 only' }
    ],
    correct: 'b',
    feedback: {
      correct: 'A two-sided claim uses H0: mu = 0 and H1: mu != 0.',
      incorrect: 'For "not zero," H0 is equality and H1 is not equal.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m7-q10',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'Which best defines Type I and Type II errors?',
    options: [
      { id: 'a', text: 'Type I: false positive; Type II: false negative' },
      { id: 'b', text: 'Type I: false negative; Type II: false positive' },
      { id: 'c', text: 'Type I: correct rejection; Type II: correct retention' },
      { id: 'd', text: 'Type I: sampling error; Type II: measurement error' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Type I is a false positive; Type II is a false negative.',
      incorrect: 'Type I error is rejecting a true H0; Type II is failing to reject a false H0.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m7-q11',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'What does "statistical significance" mean in hypothesis testing?',
    options: [
      { id: 'a', text: 'The result is important in the real world' },
      { id: 'b', text: 'The data are unlikely under H0 given the test assumptions' },
      { id: 'c', text: 'The effect size is large' },
      { id: 'd', text: 'The sample is representative' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Significance means the observed data are unlikely if H0 were true, given assumptions.',
      incorrect: 'Significance is about evidence against H0, not importance.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m7-q12',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'Which statement is an acceptable interpretation of a p-value?',
    options: [
      { id: 'a', text: 'The probability that H0 is true' },
      { id: 'b', text: 'The probability of data as extreme as observed, assuming H0 is true' },
      { id: 'c', text: 'The probability the result is important' },
      { id: 'd', text: 'The probability the sample is biased' }
    ],
    correct: 'b',
    feedback: {
      correct: 'A p-value is the probability of the observed data (or more extreme) under H0.',
      incorrect: 'P-values are computed assuming H0 is true.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m7-q13',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'What is a common incorrect interpretation of a p-value?',
    options: [
      { id: 'a', text: 'It is the probability of the data given H0' },
      { id: 'b', text: 'It is the probability that H0 is true' },
      { id: 'c', text: 'Smaller p-values indicate more evidence against H0' },
      { id: 'd', text: 'It depends on the test statistic' }
    ],
    correct: 'b',
    feedback: {
      correct: 'A p-value is not the probability that H0 is true.',
      incorrect: 'P-values do not give P(H0 is true).'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m7-q14',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'Why is "fail to reject H0" not the same as "accept H0"?',
    options: [
      { id: 'a', text: 'Because H0 is never tested' },
      { id: 'b', text: 'Because insufficient evidence does not prove H0 is true' },
      { id: 'c', text: 'Because p-values cannot be computed' },
      { id: 'd', text: 'Because H0 is always false' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Failing to reject means evidence is insufficient, not that H0 is true.',
      incorrect: 'Lack of evidence is not evidence of no effect.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m7-q15',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'When is a one-sided test most justified?',
    options: [
      { id: 'a', text: 'When any difference is interesting' },
      { id: 'b', text: 'When a directional hypothesis was specified in advance' },
      { id: 'c', text: 'When sample size is small' },
      { id: 'd', text: 'When p is large' }
    ],
    correct: 'b',
    feedback: {
      correct: 'One-sided tests are justified for pre-specified directional hypotheses.',
      incorrect: 'Use one-sided tests only when direction is justified a priori.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m7-q16',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'Lowering alpha from .05 to .01 will:',
    options: [
      { id: 'a', text: 'Increase Type I risk and increase power' },
      { id: 'b', text: 'Decrease Type I risk and usually decrease power' },
      { id: 'c', text: 'Increase Type II risk and increase power' },
      { id: 'd', text: 'Have no effect on errors' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Lower alpha reduces Type I risk but usually reduces power, increasing Type II risk.',
      incorrect: 'Lower alpha reduces false positives but typically lowers power.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m7-q17',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'What is the logic of a critical (rejection) region?',
    options: [
      { id: 'a', text: 'Reject H0 only for outcomes very likely under H0' },
      { id: 'b', text: 'Reject H0 when the test statistic falls in an extreme region unlikely under H0' },
      { id: 'c', text: 'Reject H0 whenever the sample mean is positive' },
      { id: 'd', text: 'Reject H0 only if the sample size is large' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The rejection region contains extreme outcomes that are unlikely under H0.',
      incorrect: 'We reject H0 when results are extreme under the null distribution.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m7-q18',
    moduleId: 'stats-module-7',
    type: 'multiple_choice',
    question: 'Which is the best reporting template for a hypothesis test?',
    options: [
      { id: 'a', text: 'Report p only and state the result is important' },
      { id: 'b', text: 'Report test, estimate, CI or SE, p-value, and note effect size/importance' },
      { id: 'c', text: 'Report the sample size only' },
      { id: 'd', text: 'Report significance and omit details' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Good reporting includes the test, estimate, uncertainty, p-value, and importance/effect size.',
      incorrect: 'A complete report includes estimate, uncertainty, p-value, and practical importance.'
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
  ,
  {
    id: 'stats-m8-q10',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'Which test family is most appropriate for each scenario?',
    options: [
      { id: 'a', text: 'Two independent groups: independent t-test; same people pre/post: paired t-test; two quantitative variables: correlation' },
      { id: 'b', text: 'Two independent groups: paired t-test; same people pre/post: independent t-test; two quantitative variables: ANOVA' },
      { id: 'c', text: 'Two independent groups: correlation; same people pre/post: ANOVA; two quantitative variables: chi-square' },
      { id: 'd', text: 'Two independent groups: chi-square; same people pre/post: correlation; two quantitative variables: t-test' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Independent t-test for two groups, paired t-test for repeated measures, correlation for two quantitative variables.',
      incorrect: 'Match the test to design: independent, paired, or correlation.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m8-q11',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'What does the sign of a correlation coefficient indicate?',
    options: [
      { id: 'a', text: 'Strength only' },
      { id: 'b', text: 'Direction of the relationship' },
      { id: 'c', text: 'Sample size' },
      { id: 'd', text: 'Whether the result is significant' }
    ],
    correct: 'b',
    feedback: {
      correct: 'The sign shows direction (positive or negative).',
      incorrect: 'The sign indicates the direction of the relationship.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m8-q12',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'Why does correlation not imply causation?',
    options: [
      { id: 'a', text: 'Because correlations are always zero' },
      { id: 'b', text: 'Because third variables or reverse causation may explain the association' },
      { id: 'c', text: 'Because correlations are only for categorical data' },
      { id: 'd', text: 'Because correlation guarantees random assignment' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Correlation alone cannot rule out third variables or reverse causation.',
      incorrect: 'Correlation does not establish causality because of confounds and direction issues.'
    },
    difficulty: 'easy'
  },
  {
    id: 'stats-m8-q13',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'How do statistical significance and effect size differ?',
    options: [
      { id: 'a', text: 'They are the same thing' },
      { id: 'b', text: 'Significance is evidence against H0; effect size describes magnitude' },
      { id: 'c', text: 'Effect size is a p-value' },
      { id: 'd', text: 'Significance measures practical importance directly' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Significance is about evidence; effect size is about magnitude.',
      incorrect: 'Effect size describes magnitude, not evidence.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m8-q14',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'How should you interpret a regression slope?',
    options: [
      { id: 'a', text: 'A 1-unit increase in X is associated with a slope-unit change in Y' },
      { id: 'b', text: 'Y causes X' },
      { id: 'c', text: 'The correlation is zero' },
      { id: 'd', text: 'The mean of X equals the mean of Y' }
    ],
    correct: 'a',
    feedback: {
      correct: 'The slope is the expected change in Y for a 1-unit increase in X.',
      incorrect: 'Slope describes expected change in Y per unit change in X.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m8-q15',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'What is ANOVA used for at a high level?',
    options: [
      { id: 'a', text: 'Comparing means across three or more groups/conditions' },
      { id: 'b', text: 'Testing correlation between two variables only' },
      { id: 'c', text: 'Analyzing categorical outcomes only' },
      { id: 'd', text: 'Testing a single mean against zero only' }
    ],
    correct: 'a',
    feedback: {
      correct: 'ANOVA compares means across multiple groups or conditions.',
      incorrect: 'Use ANOVA for comparing means across 3+ groups or conditions.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m8-q16',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'What is an interaction in a factorial design?',
    options: [
      { id: 'a', text: 'The effect of one factor depends on the level of another factor' },
      { id: 'b', text: 'The main effect of each factor averaged across others' },
      { id: 'c', text: 'A correlation between two outcomes' },
      { id: 'd', text: 'A violation of independence' }
    ],
    correct: 'a',
    feedback: {
      correct: 'An interaction means the effect of one factor changes across levels of another.',
      incorrect: 'Interaction = effect of one factor depends on the other.'
    },
    difficulty: 'medium'
  },
  {
    id: 'stats-m8-q17',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'A result is significant but effect size is tiny. Which two reasons explain this?',
    options: [
      { id: 'a', text: 'Large sample size and low variability' },
      { id: 'b', text: 'Small sample size and high variability' },
      { id: 'c', text: 'Random assignment and measurement error' },
      { id: 'd', text: 'High alpha and perfect measurement' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Large samples and low variability can make tiny effects statistically significant.',
      incorrect: 'Big n and low noise can yield significant but tiny effects.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m8-q18',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'What does "violating assumptions" mean in group comparisons?',
    options: [
      { id: 'a', text: 'The data do not meet the requirements of the test (e.g., non-normality, unequal variances)' },
      { id: 'b', text: 'The sample size is too large' },
      { id: 'c', text: 'The effect size is too big' },
      { id: 'd', text: 'The p-value is small' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Assumption violations mean the data do not meet test requirements.',
      incorrect: 'Assumptions include normality, equal variances, and independence.'
    },
    difficulty: 'hard'
  },
  {
    id: 'stats-m8-q19',
    moduleId: 'stats-module-8',
    type: 'multiple_choice',
    question: 'Which analysis plan is most appropriate for a study question comparing two groups on a quantitative outcome?',
    options: [
      { id: 'a', text: 'Independent t-test; report mean difference, CI, effect size, and p-value' },
      { id: 'b', text: 'Correlation; report only p-value' },
      { id: 'c', text: 'Chi-square; report only counts' },
      { id: 'd', text: 'Paired t-test; no need for effect size' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Use the test that matches design and report estimate, CI, effect size, and p.',
      incorrect: 'A complete plan includes test choice and key outputs.'
    },
    difficulty: 'hard'
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
