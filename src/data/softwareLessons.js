// Software Lessons - I Do, We Do, You Do Format
// Each lesson follows scaffolded instruction with varied assessments

/*
Lesson Structure:
- id: unique identifier
- module: which module this belongs to
- title: lesson title
- software: 'jamovi' | 'spss' | 'r' | 'excel'
- objectives: what students will learn
- estimatedTime: in minutes
- phases:
  - iDo: Instructor demonstration (video/annotated screenshots)
  - weDo: Guided practice with hints
  - youDo: Independent practice with assessment

Assessment Types:
- multiple_choice: Standard MC question
- multiple_select: Select all that apply
- ordering: Put steps in correct order
- fill_blank: Fill in the blank (numeric or text)
- hotspot: Click on correct area of image (future)
- screenshot: Upload screenshot for AI evaluation (future)
- matching: Match items from two columns
*/

import { module3UnifiedLessons } from './softwareLessons_module3_unified.js'
import { module4DescriptiveLessonsOther } from './softwareLessons_module4_descriptives_other.js'
import { module5UnifiedLessons } from './softwareLessons_module5_unified.js'
import { module5UnifiedLessonsOther } from './softwareLessons_module5_unified_other.js'
import { module6UnifiedLessons } from './softwareLessons_module6_unified.js'
import { module6LessonsOther } from './softwareLessons_module6_other.js'
import { module7LessonsOther } from './softwareLessons_module7_other.js'
import { module7UnifiedLessons } from './softwareLessons_module7_unified.js'
import { module8UnifiedLessons } from './softwareLessons_module8_unified.js'
import { module8UnifiedLessonsOther } from './softwareLessons_module8_unified_other.js'
import { excelGuidesLessons } from './softwareLessons_excel_guides.js'

export const softwareLessons = [
  // ============ STATISTICS MODULE 3: Software Basics (Unified Lessons) ============
  ...module3UnifiedLessons,

  // ============ Excel Guides (Stats Made Easy style) ============
  ...excelGuidesLessons,

  {
    id: 'jamovi-descriptive-stats',
    module: 'stats-module-4',
    title: 'Running Descriptive Statistics in Jamovi',
    software: 'jamovi',
    objectives: [
      'Navigate to Descriptives in the Analyses menu',
      'Select variables for analysis',
      'Interpret basic descriptive statistics output',
      'Use Compute to create deviation and squared deviation variables',
      'Relate sum of squared deviations to variance and standard deviation'
    ],
    estimatedTime: 35,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Descriptives and Computing Variability',
        sections: [
          {
            id: 'running-descriptives',
            title: 'Watch: Running Descriptives',
            objectives: [
              'Navigate to Descriptives in the Analyses menu',
              'Select variables for analysis',
              'Interpret basic descriptive statistics output'
            ],
            estimatedTime: 10,
            content: [
              {
                type: 'callout',
                style: 'tip',
                content: '<strong>Dataset (Tools bar):</strong> In Methods Market, open <strong>Tools</strong> (right side) → download <strong>bmi_and_exercise.csv</strong> → in jamovi use <strong>☰ → Open</strong>. Columns include <strong>bmi</strong> and <strong>exercise_per_week</strong> (names are lowercase — match casing in Compute). You will reuse Tools datasets in every later Software Practice module.'
              },
              {
                type: 'text',
                content: 'Descriptive statistics summarize your data. In Jamovi, you\'ll find them under **Analyses → Exploration → Descriptives**. With <strong>bmi_and_exercise.csv</strong> open, use continuous variables such as <strong>bmi</strong> and <strong>exercise_per_week</strong>.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Go to Analyses tab',
                    description: 'Click the Analyses tab to see the analysis icons. Have bmi_and_exercise.csv open from Tools.',
                    image: '/images/lessons/jamovi/jamovi-analyses-tab.png'
                  },
                  {
                    step: 2,
                    title: 'Click Exploration',
                    description: 'Click the bar chart icon labeled "Exploration".',
                    image: '/images/lessons/jamovi/jamovi-exploration-icon.png'
                  },
                  {
                    step: 3,
                    title: 'Select Descriptives',
                    description: 'From the dropdown, select "Descriptives".',
                    image: '/images/lessons/jamovi/jamovi-descriptives-menu.png'
                  },
                  {
                    step: 4,
                    title: 'Add variables',
                    description: 'Drag <strong>bmi</strong> and/or <strong>exercise_per_week</strong> to the "Variables" box. You can add multiple variables at once. Match the exact column names in your file.',
                    image: '/images/lessons/jamovi/jamovi-descriptives-variables.png'
                  }
                ]
              },
              {
                type: 'text',
                content: 'The output will show N (count), Mean, Median, Standard Deviation, Minimum, and Maximum for each variable (e.g. bmi, exercise_per_week).'
              },
              {
                type: 'callout',
                style: 'tip',
                content: 'You can request additional statistics like Skewness, Kurtosis, or Percentiles by expanding the "Statistics" section in the options panel.'
              }
            ]
          },
          {
            id: 'computing-deviations',
            title: 'Computing Deviations from the Mean',
            objectives: [
              'Use the Compute button to create a new variable',
              'Create a deviation score variable (X − mean)',
              'Understand why deviations sum to zero'
            ],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content: 'The <strong>deviation</strong> of a value from the mean is how far that value is from the average: <em>deviation = X − mean</em>. With <strong>bmi_and_exercise.csv</strong> from Tools open, run Descriptives on <strong>bmi</strong>, then use <strong>Data → Compute</strong> to create deviations: <strong>bmi − VMEAN(bmi)</strong>. (Match lowercase <strong>bmi</strong> to your column name. VMEAN = mean of one column.)'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open Compute',
                    description: 'Go to the <strong>Data</strong> tab and click <strong>Compute</strong> (or the formula/fx button). Have <strong>bmi_and_exercise.csv</strong> open (from Tools).',
                    image: '/images/lessons/jamovi/jamovi-compute-button.png'
                  },
                  {
                    step: 2,
                    title: 'Name the variable',
                    description: 'Give the new variable a name, e.g. <strong>bmi_deviation</strong> or <strong>dev_bmi</strong>.',
                    image: '/images/lessons/jamovi/jamovi-compute-name.png'
                  },
                  {
                    step: 3,
                    title: 'Enter the deviation formula',
                    description: 'In the formula box, type: <strong>bmi − VMEAN(bmi)</strong>. <strong>Check the casing of your variable name first</strong> — the Tools file uses lowercase <strong>bmi</strong>. If your column were <strong>BMI</strong>, you would type <strong>BMI</strong>. Jamovi is case-sensitive, so a mismatch will break the formula. VMEAN gives the mean of that single column; each row will show that person\'s BMI minus the overall mean BMI.',
                    image: '/images/lessons/jamovi/jamovi-compute-formula.png'
                  },
                  {
                    step: 4,
                    title: 'Check the result',
                    description: 'The new column shows each person\'s BMI deviation from the mean. Some values are positive (above average BMI), some negative (below). Run <strong>Analyses → Exploration → Descriptives</strong> on your deviation variable and request <strong>Sum</strong>. The sum should be zero.',
                    image: '/images/lessons/jamovi/jamovi-compute-results.png'
                  }
                ]
              },
              {
                type: 'callout',
                style: 'tip',
                content: '<strong>Reading scientific notation (e−something):</strong> Jamovi may show the Sum as <strong>4.00e−13</strong> (or similar) instead of exactly 0. The <strong>e−13</strong> means “times 10 to the power of −13” — a tiny number from computer rounding. <strong>Rule of thumb:</strong> when you see <strong>e</strong> followed by a <em>negative</em> number (e−10, e−13, e−15, …), treat it as <strong>zero</strong> for practical purposes. A real leftover sum would look like an ordinary number (e.g. 12.4), not scientific notation with a negative exponent.'
              },
              {
                type: 'callout',
                style: 'info',
                content: '<strong>Why deviations sum to zero:</strong> The mean is the balance point. The sum of positive deviations equals the sum of negative deviations, so the total is always zero. That\'s why we square deviations next: to get a measure of spread that doesn\'t cancel out.'
              }
            ]
          },
          {
            id: 'squared-deviations-and-ss',
            title: 'Computing Squared Deviations and Sum of Squared Deviations',
            objectives: [
              'Create a squared deviation variable (X − mean)²',
              'Obtain the sum of squared deviations (SS)',
              'Connect SS to variance and standard deviation'
            ],
            estimatedTime: 10,
            content: [
              {
                type: 'text',
                content: 'Because deviations sum to zero, we <strong>square</strong> them to measure spread. <strong>Squared deviation = (X − mean)²</strong>. With <strong>bmi</strong> from Tools file <strong>bmi_and_exercise.csv</strong>, use Compute to create <strong>(bmi − VMEAN(bmi))^2</strong>. The <strong>sum of squared deviations (SS)</strong> is the numerator in the variance formula. Variance = SS/(N−1) and standard deviation = √variance.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Create a squared deviation variable',
                    description: 'Use <strong>Data → Compute</strong> again. Name the new variable (e.g. <strong>squared_deviation</strong> or <strong>bmi_sq_dev</strong>). In the formula box, type: <strong>(bmi − VMEAN(bmi))^2</strong>. Match the <strong>exact casing</strong> of your column name from Tools (usually lowercase <strong>bmi</strong>) — Jamovi is case-sensitive.',
                    image: '/images/lessons/jamovi/jamovi-compute-sq-formula.png'
                  },
                  {
                    step: 2,
                    title: 'Look at the new column in the spreadsheet',
                    description: 'Close or collapse the Compute panel so you can see the data grid. Find the new column (e.g. <strong>squared_deviation</strong>). Every value should be <strong>zero or positive</strong> — never negative — because you squared the deviations. Bigger BMI deviations from the mean produce bigger numbers in this column.',
                    image: '/images/lessons/jamovi/jamovi-compute-sq-column.png'
                  },
                  {
                    step: 3,
                    title: 'Get the sum of squared deviations (SS)',
                    description: 'Run <strong>Analyses → Exploration → Descriptives</strong> on your squared deviation variable. Add it to the Variables box, then in Statistics request <strong>Sum</strong>. The <strong>Sum</strong> is the sum of squared deviations (SS) for BMI. This should be a normal-looking number (not e−something near zero).',
                    image: '/images/lessons/jamovi/jamovi-descriptives-variables.png'
                  },
                  {
                    step: 4,
                    title: 'Relate SS to variance and SD',
                    description: 'Variance = SS ÷ (N − 1). Standard deviation = √variance. Run Descriptives on **BMI** itself: the SD there matches √(SS/(N−1)). Computing SS from BMI shows where that SD comes from.',
                    image: '/images/lessons/jamovi/jamovi-descriptives-variables.png'
                  }
                ]
              },
              {
                type: 'callout',
                style: 'tip',
                content: '<strong>Sample vs population:</strong> We use N−1 (not N) in the denominator for the <em>sample</em> variance so the estimate is unbiased. Jamovi uses N−1 by default for SD when you run Descriptives.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Run Descriptives and Compute with BMI and Exercise Data',
        instructions: 'Follow along in Jamovi. Reminder: download <strong>bmi_and_exercise.csv</strong> from the Methods Market <strong>Tools</strong> bar (right side), then ☰ → Open in jamovi.',
        steps: [
          {
            instruction: 'From Tools, download bmi_and_exercise.csv and open it in jamovi (☰ → Open). Confirm columns include bmi and exercise_per_week; set both to Continuous if needed.',
            hint: 'Tools is on the right in Software Practice. Column names in this file are lowercase.',
            checkpoint: 'You should have bmi and exercise_per_week visible in the spreadsheet.'
          },
          {
            instruction: 'Click Analyses → Exploration → Descriptives. Drag bmi and exercise_per_week to the Variables box.',
            hint: 'Exploration is the bar chart icon; Descriptives is in the dropdown.',
            checkpoint: 'The Results panel should show N, Mean, Median, SD, Min, Max for each variable.'
          },
          {
            instruction: 'Note the mean of bmi from the output. Then use Data → Compute. Name the new variable bmi_deviation. In the formula box type: bmi − VMEAN(bmi) (exact casing).',
            hint: 'Compute is in the Data tab. The formula gives each person\'s BMI minus the mean BMI.',
            checkpoint: 'The new column should have positive and negative values that sum to zero (check with Descriptives → Sum).'
          },
          {
            instruction: 'Use Compute again. Name the variable bmi_sq_dev (or squared_deviation). Formula: (bmi − VMEAN(bmi))^2. Then run Descriptives on that column and request Sum. That Sum is SS for bmi.',
            hint: 'Squared deviations are all positive. Sum them in Descriptives to get SS.',
            checkpoint: 'You have SS for bmi. Variance = SS/(N−1); SD = √variance. Compare with the SD for bmi in Descriptives.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [
          {
            id: 'descriptives-screenshot-1',
            question: 'Where does the Descriptives output appear in Jamovi?',
            image: '/images/selfcheck/jamovi/jamovi-results-panel.png',
            options: ['Data entry panel', 'Results panel', 'Variables tab', 'Analyses menu'],
            correct: 1,
            explanation: 'The Results panel (right side) shows all analysis output, including Descriptives tables.'
          }
        ],
        errorDiagnostic: [
          {
            id: 'descriptives-error-1',
            scenario: 'You added a variable to Descriptives but the output shows "N = 0" and no statistics.',
            errorMessage: 'No valid cases',
            options: [
              'The variable is in the wrong panel',
              'The variable has only missing values or wrong measure type',
              'You need to click Run again',
              'Jamovi does not support this variable'
            ],
            correct: 1,
            explanation: 'When N = 0, Jamovi found no valid cases; often because the variable is set to a text/nominal type with no values, or all values are missing. Check Variable View and that you have data in the column.'
          }
        ],
        outputInterpretation: [
          {
            id: 'descriptives-output-1',
            question: 'Look at this Descriptives output. Two variables are listed. For the variable <strong>Height</strong> only: what is the sample size (N), the mean (or average), and the standard deviation?',
            image: '/images/selfcheck/jamovi/jamovi-descriptives-output1.png',
            placeholder: 'For Height: state the sample size (N), the mean, and the standard deviation (e.g. N is 49, mean is 70, SD is 1.17)...',
            hint: 'Find the row for Height in the Descriptives table. N is the sample size; Mean is the average; SD is the standard deviation.',
            requiredKeywords: [
              '49', '70', '1.17',
              'height', 'mean', 'average', 'avg',
              'standard deviation', 'sd', 'std dev', 'std deviation', 'spread',
              'sample size', 'n=', 'n =', 'n is', 'cases', 'participants', 'observations'
            ],
            minRequiredKeywords: 3,
            feedback: 'For Height: sample size (N) is 49, mean (average) is 70, and standard deviation is 1.17. N tells you how many cases were analyzed; the mean is the average height; SD tells you how spread out the values are from the mean.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'ordering',
            question: 'Put these steps in the correct order to run Descriptive Statistics in Jamovi:',
            items: [
              { id: 'a', text: 'Drag variable(s) to the Variables box' },
              { id: 'b', text: 'Click the Analyses tab' },
              { id: 'c', text: 'Select Descriptives from the menu' },
              { id: 'd', text: 'Click the Exploration icon' }
            ],
            correctOrder: ['b', 'd', 'c', 'a'],
            feedback: {
              correct: 'Perfect! Analyses → Exploration → Descriptives → Add variables.',
              incorrect: 'The correct order is: Analyses tab → Exploration icon → Descriptives → Add variables.'
            }
          },
          {
            id: 'q2',
            type: 'fill_blank',
            question: 'In Jamovi, Descriptives is found under Analyses → ________ → Descriptives.',
            answer: ['Exploration', 'exploration'],
            caseSensitive: false,
            feedback: {
              correct: 'Correct! Descriptives is under the Exploration menu.',
              incorrect: 'Descriptives is found under the Exploration menu (the bar chart icon).'
            }
          },
          {
            id: 'q3',
            type: 'multiple_choice',
            question: 'You run descriptives on a variable and get: N=50, Mean=75.4, SD=12.3. What does SD tell you?',
            options: [
              { id: 'a', text: 'The most common score is 12.3' },
              { id: 'b', text: 'Scores typically vary about 12.3 points from the mean' },
              { id: 'c', text: 'There are 12.3 outliers in the data' },
              { id: 'd', text: 'The difference between highest and lowest is 12.3' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Right! Standard Deviation measures how spread out scores are from the mean.',
              incorrect: 'SD (Standard Deviation) tells you the average distance of scores from the mean. An SD of 12.3 means scores typically vary about 12.3 points from the mean of 75.4.'
            }
          },
          {
            id: 'q4',
            type: 'multiple_choice',
            question: 'Which statistic would you look at to find the "middle" score when data is arranged in order?',
            options: [
              { id: 'a', text: 'Mean' },
              { id: 'b', text: 'Median' },
              { id: 'c', text: 'Mode' },
              { id: 'd', text: 'Standard Deviation' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! The Median is the middle value when data is ordered.',
              incorrect: 'The Median is the middle score. Mean is the average, Mode is the most frequent, and SD measures spread.'
            }
          }
        ]
      }
    }
  },

  ...module4DescriptiveLessonsOther,

  // ============ STATISTICS MODULE 5: Graphing and Data Manipulation (Unified - one lesson, multiple learn sections) ============
  ...module5UnifiedLessons,
  ...module5UnifiedLessonsOther,

  // ============ STATISTICS MODULE 6: Probability and Sampling ============
  ...module6UnifiedLessons,

  ...module6LessonsOther,

  // ============ STATISTICS MODULE 7: Hypothesis Testing (Unified - one lesson, multiple learn sections) ============
  ...module7UnifiedLessons,

  ...module7LessonsOther,

  ...module8UnifiedLessons,
  ...module8UnifiedLessonsOther,
]

// Helper to get lessons by module
export function getLessonsByModule(moduleId) {
  return softwareLessons.filter(lesson => lesson.module === moduleId)
}

// Helper to get lessons by software
export function getLessonsBySoftware(software) {
  return softwareLessons.filter(lesson => lesson.software === software)
}

// Get a single lesson by ID
export function getLessonById(lessonId) {
  return softwareLessons.find(lesson => lesson.id === lessonId)
}

// Export modules metadata (Statistics class)
export const softwareModules = [
  { id: 'stats-module-3', title: 'Software basics', description: 'Import data, variable types, and interface for your chosen package' },
  { id: 'stats-module-4', title: 'Descriptive Statistics', description: 'Summarizing your data' },
  { id: 'stats-module-5', title: 'Data Visualization', description: 'Creating charts and graphs' },
  { id: 'stats-module-6', title: 'Probability & Distributions', description: 'Working with the normal distribution' },
  { id: 'stats-module-7', title: 'Hypothesis Testing', description: 'T-tests and significance testing' },
  { id: 'stats-module-8', title: 'Advanced Analysis Methods', description: 'Chi-square, t-tests, regression, and ANOVA' }
]
