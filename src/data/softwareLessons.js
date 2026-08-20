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

  // ============ STATISTICS MODULE 7: Hypothesis Testing ============
  {
    id: 'jamovi-binomial-test',
    module: 'stats-module-7',
    title: 'Running a Binomial Test in Jamovi',
    software: 'jamovi',
    objectives: [
      'Conduct a binomial test for proportions in Jamovi',
      'Interpret the p-value from a binomial test',
      'Understand when to use a binomial test',
      'Set up null hypothesis test probability values'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Learn: Binomial Test (2 Outcomes) in Jamovi',
        content: [
          {
            type: 'text',
            content: 'The binomial test asks whether the proportion of one outcome differs from a hypothesized value (often 0.5 for “fair chance”). Chapter 9 uses an ESP card-guessing story (62/100 correct vs 50%). <strong>In jamovi you need a real dataset with one row per person and a two-level (binary) column</strong> — not just the summary “62 out of 100.”'
          },
          {
            type: 'callout',
            style: 'tip',
            content: '<strong>Dataset for this lesson:</strong> Open Tools → download <strong>personality_data.csv</strong> → open it in jamovi. We will use the <strong>gender</strong> column (two levels, e.g. Female / Male). Set <strong>gender</strong> to <strong>Nominal</strong> if it is not already. Null hypothesis: the proportion of one gender level = 0.5 (equal split).'
          },
          {
            type: 'annotated_image',
            imagePath: '/lessons/hypothesis-testing/jamovi/binomial-setup.png',
            alt: 'jamovi Analyses → Frequencies menu showing 2 Outcomes (Binomial test)',
            annotations: [
              { x: 20, y: 15, label: '1. Analyses tab', description: 'Open Analyses' },
              { x: 45, y: 25, label: '2. Frequencies', description: 'Click the Frequencies icon' },
              { x: 50, y: 45, label: '3. 2 Outcomes', description: 'Choose 2 Outcomes (Binomial test) — not “Proportion Test”' }
            ]
          },
          {
            type: 'text',
            content: '<h4>After the menu opens</h4><ol><li>Move <strong>gender</strong> into the variable box.</li><li>Under Hypothesis, set the <strong>Test value</strong> to <strong>0.5</strong> (equal proportions under H₀).</li><li>Keep the alternative as ≠ Test value (two-sided) unless your instructor says otherwise.</li><li>Optional: check <strong>Confidence interval</strong> under additional statistics.</li></ol>'
          },
          {
            type: 'text',
            content: '<h4>Understanding the Setup</h4><ul><li><strong>Null Hypothesis (H₀):</strong> θ = 0.5 (equal probability of each gender level in the population)</li><li><strong>Alternative Hypothesis (H₁):</strong> θ ≠ 0.5</li><li><strong>Menu name in jamovi:</strong> <strong>Frequencies → 2 Outcomes</strong> (labeled Binomial test)</li><li><strong>Test value:</strong> 0.5 is the hypothesized proportion under H₀</li></ul>'
          },
          {
            type: 'text',
            content: '<h4>Interpreting the Results</h4><ul><li>Read the observed <strong>proportion</strong> and the <strong>p</strong>-value for your chosen level.</li><li>If <strong>p &lt; .05</strong>, reject H₀ (evidence the population proportion differs from 0.5).</li><li>If <strong>p ≥ .05</strong>, fail to reject H₀ (not enough evidence of unequal proportions).</li><li>Same logic as the Chapter 9 ESP example — but here the analysis runs on your open jamovi data file.</li></ul>'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice: Binomial test with personality gender',
        scenario: 'Using personality_data.csv, test whether the proportion of one gender level differs from 0.5.',
        data: {
          description: 'personality_data.csv from Tools (column: gender)',
          file: 'personality_data.csv'
        },
        instructions: 'Keep personality_data.csv open in jamovi. Follow each step.',
        steps: [
          {
            instruction: 'Confirm personality_data.csv is open and gender is Nominal with two levels.',
            hint: 'Tools → download personality_data.csv if needed. Click the gender column header to check measure type.',
            checkpoint: 'gender is Nominal; data grid shows Female/Male (or similar).'
          },
          {
            instruction: 'Go to Analyses → Frequencies → 2 Outcomes (Binomial test).',
            hint: 'The menu says “2 Outcomes,” with “Binomial test” underneath — not “Proportion Test.”',
            checkpoint: 'The 2 Outcomes / binomial panel opens on the right.'
          },
          {
            instruction: 'Move gender into the Variable box.',
            hint: 'Drag gender from the left list into the analysis panel.',
            checkpoint: 'gender appears in the Variable box; counts appear in Results.'
          },
          {
            instruction: 'Set Test value to 0.5 and keep the alternative ≠ Test value (two-sided).',
            hint: 'Hypothesis section in the panel.',
            checkpoint: 'Test value shows 0.5.'
          },
          {
            instruction: 'Optional: check Confidence interval. Read p for your level — decide reject or fail to reject H₀ at α = .05.',
            hint: 'Compare p to .05; do not treat “not significant” as proof of exactly 50/50.',
            checkpoint: 'You can state a decision and what p means under H₀.'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'In jamovi, where do you start a binomial test for a two-level variable?',
          options: [
            'Analyses → T-Tests → One Sample T-Test',
            'Analyses → Frequencies → 2 Outcomes',
            'Data → Compute',
            'Analyses → ANOVA'
          ],
          correctAnswer: 1,
          feedback: {
            correct: 'Correct — Frequencies → 2 Outcomes (Binomial test).',
            incorrect: 'Use Analyses → Frequencies → 2 Outcomes for the binomial / two-outcome proportion test.'
          }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Apply: Binomial thinking with your data',
        scenario: 'Still using personality_data.csv (or a binary column you create). Record your screen while you run Frequencies → 2 Outcomes.',
        task: 'Run the binomial (2 Outcomes) test on gender with test value 0.5. State H₀, the observed proportion, p, and your decision at α = .05.',
        data: {
          description: 'personality_data.csv — gender (Nominal, two levels)',
          file: 'personality_data.csv',
          variables: ['gender']
        },
        instructions: 'Record with Tools (or your phone). Open personality_data.csv in jamovi, run Analyses → Frequencies → 2 Outcomes on gender (test value 0.5), talk through the output, then upload the video to Canvas Module 7: Software Practice.',
        summary: 'Apply = You do recording. Use the real personality dataset, not a Chapter 9 summary count alone.'
      }
    }
  },

  {
    id: 'jamovi-one-sample-t-test',
    module: 'stats-module-7',
    title: 'One-Sample t-Test in Jamovi',
    software: 'jamovi',
    objectives: [
      'Conduct a one-sample t-test in Jamovi',
      'Interpret t-statistic, degrees of freedom, and p-value',
      'Calculate and interpret effect size (Cohen\'s d)',
      'Check assumptions for t-tests'
    ],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Learn: One-Sample t-Test in Jamovi',
        content: [
          {
            type: 'text',
            content: 'The one-sample t-test asks whether a sample mean differs from a hypothesized value. <strong>Dataset for this lesson:</strong> Tools → download <strong>bmi_and_exercise.csv</strong> → open in jamovi. Use continuous column <strong>bmi</strong>. Example H₀: μ = 25 (change the Test value if your instructor assigns a different number).'
          },
          {
            type: 'text',
            content: '<h4>When to Use a One-Sample t-Test</h4><ul><li>You have <strong>one group</strong> of continuous data</li><li>You want to compare the <strong>sample mean</strong> to a <strong>known value</strong></li><li>Data are approximately normal (or n is reasonably large)</li></ul>'
          },
          {
            type: 'annotated_image',
            imagePath: '/lessons/hypothesis-testing/jamovi/t-test-setup.png',
            alt: 'jamovi One Sample T-Test setup panel',
            annotations: [
              { x: 20, y: 15, label: '1. Click T-Tests', description: 'In the Analyses tab' },
              { x: 45, y: 30, label: '2. Select One Sample T-Test', description: 'Choose the one-sample option' },
              { x: 60, y: 50, label: '3. Move bmi', description: 'Place continuous bmi in Dependent Variables' },
              { x: 40, y: 70, label: '4. Set test value', description: 'Enter the hypothesized mean (e.g. 25)' }
            ]
          },
          {
            type: 'text',
            content: '<h4>Reading the output</h4><ul><li><strong>t, df, p:</strong> evidence against H₀: μ = test value</li><li><strong>Mean / SD:</strong> describe your sample</li><li><strong>Cohen\'s d</strong> (if requested): size of the difference, not just significance</li><li>If <strong>p &lt; .05</strong>, reject H₀; if <strong>p ≥ .05</strong>, fail to reject H₀</li></ul>'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Practice: One-sample t-test with BMI data',
        scenario: 'Using bmi_and_exercise.csv, test whether mean BMI differs from a hypothesized value (e.g. 25).',
        data: {
          description: 'bmi_and_exercise.csv from Tools (column: bmi)',
          file: 'bmi_and_exercise.csv'
        },
        instructions: 'Keep bmi_and_exercise.csv open in jamovi.',
        steps: [
          {
            instruction: 'Confirm bmi is Continuous.',
            hint: 'Click the bmi column header to check measure type.',
            checkpoint: 'bmi is Continuous with many numeric rows.'
          },
          {
            instruction: 'Open Analyses → T-Tests → One Sample T-Test.',
            hint: 'Analyses tab → T-Tests icon.',
            checkpoint: 'The One Sample T-Test panel appears.'
          },
          {
            instruction: 'Move bmi to Dependent Variables.',
            hint: 'Drag bmi from the left list.',
            checkpoint: 'bmi appears in Dependent Variables.'
          },
          {
            instruction: 'Set Test value to 25 (or your instructor\'s value). Keep ≠ Test value (two-sided).',
            hint: 'Hypothesis / Tests section in the panel.',
            checkpoint: 'Test value is set; results update.'
          },
          {
            instruction: 'Optional: check Effect size and Normality under Assumption Checks. Read t, df, p and decide at α = .05.',
            hint: 'Compare p to .05.',
            checkpoint: 'You can state reject or fail to reject H₀ from the jamovi output.'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'If jamovi shows p = 0.069 for mean BMI vs test value 25 at α = .05, what is the correct decision?',
          options: [
            'Reject H₀ — mean BMI differs from 25',
            'Fail to reject H₀ — not enough evidence that mean BMI differs from 25',
            'The test is invalid because BMI is continuous',
            'Accept H₀ as proven true'
          ],
          correctAnswer: 1,
          feedback: {
            correct: 'Correct — p > .05 means fail to reject H₀.',
            incorrect: 'When p > α, fail to reject H₀. That is not proof the mean equals 25.'
          }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Apply: One-sample t-test with BMI',
        scenario: 'Record yourself testing mean BMI against a hypothesized value in jamovi.',
        task: 'Using bmi_and_exercise.csv, run One Sample T-Test on bmi with Test value 25 (or your instructor\'s value). State H₀, mean, t, p, and your decision.',
        data: {
          description: 'bmi_and_exercise.csv — bmi (Continuous)',
          file: 'bmi_and_exercise.csv',
          variables: ['bmi']
        },
        instructions: 'Record with Tools (or your phone). Open bmi_and_exercise.csv, run Analyses → T-Tests → One Sample T-Test on bmi, talk through the output, then upload the video to Canvas Module 7: Software Practice.',
        summary: 'Apply = You do recording with the real BMI dataset from Tools.'
      }
    }
  },

  {
    id: 'jamovi-interpreting-pvalues',
    module: 'stats-module-7',
    title: 'Interpreting P-Values and Making Decisions',
    software: 'jamovi',
    objectives: [
      'Correctly interpret p-values in context',
      'Make appropriate decisions based on significance levels',
      'Understand the relationship between p-values and confidence intervals',
      'Avoid common p-value misconceptions'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: Understanding What P-Values Really Mean',
        content: [
          {
            type: 'text',
            content: '<h3>What is a P-Value?</h3><p>The p-value is one of the most important (and misunderstood) concepts in statistics. Let\'s clarify what it actually means. When you practice in jamovi, use the same class files from <strong>Tools</strong> (<strong>personality_data.csv</strong>, <strong>bmi_and_exercise.csv</strong>) so your p-values come from real analyses, not made-up numbers.</p>'
          },
          {
            type: 'text',
            content: '<h4>✅ CORRECT Interpretations of P-Value</h4><ul><li><strong>Fisher\'s definition:</strong> The probability of observing data as extreme as (or more extreme than) what we got, <em>assuming the null hypothesis is true</em></li><li><strong>Neyman\'s definition:</strong> The smallest Type I error rate (α) you\'d have to tolerate to reject the null hypothesis</li><li><strong>In plain English:</strong> "If there were truly no effect, how surprising would our data be?"</li></ul>'
          },
          {
            type: 'text',
            content: '<h4>❌ WRONG Interpretations (Never Say These!)</h4><ul><li>❌ "The probability that the null hypothesis is true" - NO! The null is either true or false, we don\'t assign probabilities to it in frequentist statistics</li><li>❌ "The probability that the results are due to chance" - NO! This is a Bayesian concept, not what p-value measures</li><li>❌ "The importance or size of the effect" - NO! P-values don\'t tell you effect size, only statistical significance</li><li>❌ "The probability of making a mistake" - NO! That would be the Type I error rate (α), not the p-value</li></ul>'
          },
          {
            type: 'text',
            content: '<h4>Making Decisions with P-Values</h4><p>We compare the p-value to our pre-determined significance level (α, usually 0.05):</p><ul><li><strong>If p ≤ α:</strong> Reject the null hypothesis (result is "statistically significant")</li><li><strong>If p > α:</strong> Fail to reject the null hypothesis (result is "not statistically significant")</li></ul>'
          },
          {
            type: 'table',
            headers: ['P-Value', 'At α = 0.05', 'Interpretation', 'Decision'],
            rows: [
              ['p = 0.001', '✓ Significant', 'Very strong evidence against H₀', 'Reject H₀'],
              ['p = 0.023', '✓ Significant', 'Good evidence against H₀', 'Reject H₀'],
              ['p = 0.051', '✗ Not significant', 'Insufficient evidence against H₀', 'Fail to reject H₀'],
              ['p = 0.324', '✗ Not significant', 'Little to no evidence against H₀', 'Fail to reject H₀']
            ]
          },
          {
            type: 'text',
            content: '<h4>The Difference Between Significant and Not Significant</h4><p><strong>Important:</strong> The difference between p = 0.051 and p = 0.049 is <em>not</em> meaningful! Don\'t treat α = 0.05 as a magic bright line. Instead:</p><ul><li><strong>p < 0.001:</strong> Very strong evidence</li><li><strong>p < 0.01:</strong> Strong evidence</li><li><strong>p < 0.05:</strong> Moderate evidence</li><li><strong>p > 0.05:</strong> Insufficient evidence (not "no effect"!)</li></ul>'
          },
          {
            type: 'text',
            content: '<h4>P-Values and Confidence Intervals</h4><p>There\'s an important relationship between p-values and confidence intervals:</p><ul><li>If a 95% CI <strong>excludes</strong> the null hypothesis value → p < 0.05</li><li>If a 95% CI <strong>includes</strong> the null hypothesis value → p > 0.05</li><li>Example: Testing if μ = 100, and 95% CI is [104, 112] → p < 0.05 (doesn\'t include 100)</li></ul>'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together: Interpreting Results',
        scenario: 'You\'ve run several hypothesis tests. Let\'s practice interpreting the p-values correctly.',
        steps: [
          {
            instruction: 'Look at Test 1: A study comparing test scores shows p = 0.032. What does this mean?',
            hint: 'Remember: p-value is the probability of observing data this extreme if H₀ is true',
            checkpoint: 'Understanding: If there were no true difference, we\'d see results this extreme only 3.2% of the time'
          },
          {
            instruction: 'Test 2: A drug trial shows p = 0.089. At α = 0.05, what is the decision?',
            hint: 'Compare p to α: Is 0.089 less than or greater than 0.05?',
            checkpoint: 'Decision: Fail to reject H₀ because p > α'
          },
          {
            instruction: 'Test 3: Results show p < 0.001. Is this "more significant" than p = 0.04?',
            hint: 'Smaller p-values indicate stronger evidence against the null',
            checkpoint: 'Yes! p < 0.001 provides much stronger evidence than p = 0.04'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'A researcher reports "p = 0.06". Which statement is correct?',
          options: [
            'The null hypothesis is true',
            'There is a 6% chance the results are due to random chance',
            'At α = 0.05, we fail to reject the null hypothesis',
            'The effect size is small'
          ],
          correctAnswer: 2,
          feedback: {
            correct: 'Correct! Since p = 0.06 > 0.05, we fail to reject the null hypothesis at the conventional α = 0.05 level. This doesn\'t mean the null is true, just that we don\'t have sufficient evidence to reject it.',
            incorrect: 'The p-value doesn\'t tell us the probability the null is true or that results are "due to chance." It\'s the probability of observing data this extreme IF the null were true. Since 0.06 > 0.05, we fail to reject H₀.'
          }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Your Turn: P-Value Interpretation Challenge',
        scenario: 'Test your understanding of p-values with these realistic scenarios from published research.',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'Study A: "We found that the treatment group showed improvement (t(48) = 2.15, p = 0.037)." Which interpretation is correct?',
            options: [
              'There is a 3.7% probability that the treatment doesn\'t work',
              'If the treatment had no effect, we would observe results this extreme about 3.7% of the time',
              'The treatment improves outcomes by 3.7%',
              'There is a 96.3% chance the treatment is effective'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Perfect! This is the correct interpretation. The p-value tells us how surprising our data would be if H₀ (no treatment effect) were true.',
              incorrect: 'P-values do not tell us the probability that hypotheses are true/false, or the size of effects. They tell us: "If H₀ were true, how likely would we be to see data this extreme?"'
            }
          },
          {
            type: 'multiple_choice',
            question: 'Study B reports: "Male participants (M = 24.3) did not differ significantly from female participants (M = 26.1), t(78) = 1.42, p = 0.160." What can we conclude?',
            options: [
              'Males and females are definitely the same',
              'There is no difference between males and females',
              'We do not have sufficient evidence to conclude there is a difference',
              'The study had a mistake because the means are clearly different'
            ],
            correctAnswer: 2,
            feedback: {
              correct: 'Excellent! A non-significant result (p > 0.05) means insufficient evidence to reject H₀, NOT that the null is true. The observed difference might be real but not detectable with this sample size.',
              incorrect: '"Not significant" does NOT mean "no effect" or "definitely the same." It means we don\'t have strong enough evidence to conclude there IS a difference. The true difference might exist but be small or require a larger sample to detect.'
            }
          },
          {
            type: 'multiple_choice',
            question: 'Two studies test the same hypothesis: Study 1 finds p = 0.048, Study 2 finds p = 0.052. What is the best interpretation?',
            options: [
              'Study 1 found an effect but Study 2 did not - these studies contradict each other',
              'Both studies provide similar evidence; the difference between p = 0.048 and p = 0.052 is trivial',
              'Study 1 is scientifically valid but Study 2 should be rejected',
              'Study 2 proves the null hypothesis is true'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Perfect! The dichotomy of "significant vs. not significant" creates artificial distinctions. Both p-values suggest weak-to-moderate evidence, and p = 0.048 vs p = 0.052 is not a meaningful difference.',
              incorrect: 'Don\'t treat α = 0.05 as a magical boundary! The difference between p = 0.048 and p = 0.052 is tiny and not meaningful. Both studies show similar (modest) evidence.'
            }
          },
          {
            type: 'multiple_choice',
            question: 'A researcher reports a significant effect (p = 0.001) with Cohen\'s d = 0.15. What does this suggest?',
            options: [
              'A large, important effect that is statistically significant',
              'A statistically significant effect that is small and may not be practically important',
              'An error in the analysis since small effects can\'t be significant',
              'The p-value is wrong because the effect size is small'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Excellent! This illustrates an important point: with large samples, even tiny effects can be statistically significant (p < 0.05). Always report effect sizes to assess practical importance!',
              incorrect: 'Statistical significance (p-value) and practical significance (effect size) are different! Large samples can detect tiny effects as "significant" even when they\'re too small to matter practically. d = 0.15 is a small effect.'
            }
          },
          {
            type: 'multiple_select',
            question: 'Select ALL correct statements about p-values:',
            options: [
              'P-values tell us the probability of observing data as extreme as ours if H₀ is true',
              'Smaller p-values indicate stronger evidence against the null hypothesis',
              'P-values tell us the probability that the null hypothesis is true',
              'P-values depend on sample size - larger samples produce smaller p-values for the same effect',
              'A p-value of 0.049 means the results are scientifically important'
            ],
            correctAnswers: [0, 1, 3],
            feedback: {
              correct: 'Excellent! You understand the key properties of p-values. Remember: they\'re about data extremeness given H₀, affected by sample size, and don\'t measure importance or probability of hypotheses.',
              incorrect: 'Review: P-values do NOT tell us P(H₀ is true) or measure importance. They DO depend on sample size and indicate strength of evidence against H₀.'
            }
          }
        ]
      }
    }
  },

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
