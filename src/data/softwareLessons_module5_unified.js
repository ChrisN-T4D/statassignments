// Module 5: Graphing and Data Manipulation - Unified Lesson Structure
// One lesson with multiple learn sections (like Module 8): Histograms, Filtering, Transforming

export const module5UnifiedLessons = [
  {
    id: 'jamovi-module-5-unified',
    module: 'stats-module-5',
    title: 'Graphing and Data Manipulation in Jamovi',
    software: 'jamovi',
    objectives: [
      'Create histograms to visualize distribution shape',
      'Use filters to analyze subsets of data',
      'Transform and recode variables (e.g. recode, scale, conditional categories)',
      'Interpret histogram shape and apply logical expressions'
    ],
    estimatedTime: 75,
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn: Histograms, Filtering, and Transforming',
        sections: [
          {
            id: 'creating-histograms',
            title: 'Creating Histograms in Jamovi',
            objectives: [
              'Create a histogram to visualize distribution shape',
              'Identify skewness and modality from a histogram'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content: 'Histograms show the distribution of a continuous variable. They help you see the shape, center, and spread of your data at a glance.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Go to Exploration',
                    description: 'Navigate to Analyses → Exploration → Descriptives',
                    image: '/images/lessons/jamovi/jamovi-exploration-menu.png'
                  },
                  {
                    step: 2,
                    title: 'Add your variable',
                    description: 'Drag your continuous variable to the Variables box',
                    image: '/images/lessons/jamovi/jamovi-histogram-variable.png'
                  },
                  {
                    step: 3,
                    title: 'Enable histogram',
                    description: 'Under "Plots" section, check "Histogram"',
                    image: '/images/lessons/jamovi/jamovi-histogram-checkbox.png'
                  },
                  {
                    step: 4,
                    title: 'Interpret the histogram',
                    description: 'Look at the histogram in the Results panel. Check the shape: Is it symmetric or skewed? Unimodal or bimodal? Jamovi uses automatic bin widths by default, which are fine for checking distribution shape.'
                  }
                ]
              }
            ]
          },
          {
            id: 'filtering-data',
            title: 'Filtering Data in Jamovi',
            objectives: [
              'Create filters using logical expressions',
              'Apply filters to include or exclude cases',
              'Combine multiple conditions with AND/OR operators'
            ],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content: 'Filters let you analyze subsets of your data without deleting any rows. When a filter is active, only cases that meet your criteria are included in analyses. This section uses <strong>personality data</strong> (e.g. a dataset with variables like Extraversion, Agreeableness, Neuroticism on a 1–5 or 1–7 scale).'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open Filters',
                    description: 'Go to <strong>Data</strong> tab → <strong>Filters</strong> button. Have your personality dataset open (with at least one numeric variable such as Extraversion).',
                    image: '/images/lessons/jamovi/jamovi-open-filters.png'
                  },
                  {
                    step: 2,
                    title: 'Create filter',
                    description: 'Click <strong>New Filter</strong> and give it a descriptive name, e.g. <strong>High_Extraversion</strong>.',
                    image: '/images/lessons/jamovi/jamovi-create-filters.png'
                  },
                  {
                    step: 3,
                    title: 'Write expression (use >= for “4 or higher”)',
                    description: 'In the expression box, type: <strong>Extraversion >= 4</strong>. Use the <strong>>=</strong> (greater than or equal to) operator so only rows where Extraversion is 4 or higher are included. If your variable name is lowercase, use <strong>extraversion >= 4</strong>. Variable names in Jamovi are case-sensitive.',
                    image: '/images/lessons/jamovi/jamovi-filter-expression.png'
                  },
                  {
                    step: 4,
                    title: 'Filter off (all rows included)',
                    description: 'When the filter checkbox is <strong>unchecked</strong>, the filter is off: all rows are included in analyses. The screenshot shows the filter in the off state.',
                    image: '/images/lessons/jamovi/jamovi-filter-off.png'
                  },
                  {
                    step: 5,
                    title: 'Filter on (only matching rows)',
                    description: 'Check the filter checkbox to turn it <strong>on</strong>. Only rows that match your expression (e.g. Extraversion >= 4) are included; other rows appear faded and are excluded from analyses.',
                    image: '/images/lessons/jamovi/jamovi-filter-on.png'
                  }
                ]
              },
              {
                type: 'definition_list',
                items: [
                  { term: '>= (greater than or equal)', icon: '≥', definition: 'Include values that are 4 or higher. For personality data: Extraversion >= 4', color: '#3b82f6' },
                  { term: '== (equals)', icon: '=', definition: 'Matches exact values. Example: gender == "female"', color: '#8b5cf6' },
                  { term: '!= (not equal)', icon: '≠', definition: 'Excludes values. Example: group != "control"', color: '#ef4444' },
                  { term: '> < <=', icon: '>', definition: 'Other comparisons. Example: Neuroticism <= 2 (low neuroticism)', color: '#8b5cf6' },
                  { term: 'and / or', icon: '&', definition: 'Combine conditions. Example: Extraversion >= 4 and Agreeableness >= 4', color: '#10b981' }
                ]
              },
              {
                type: 'callout',
                style: 'warning',
                content: 'For numeric variables (e.g. Extraversion), use <strong>>=</strong>, <strong><=</strong>, <strong>></strong>, or <strong><</strong>. For text/categorical variables, use <strong>==</strong> (double equals) and put values in quotes: gender == "male".'
              }
            ]
          },
          {
            id: 'transforming-variables',
            title: 'Transforming Variables in Jamovi',
            objectives: [
              'Use the Transform tool (Data tab) to create transformed or recoded variables',
              'Add recode conditions to turn continuous scores into categories (e.g. Pass/Fail, High/Medium/Low)',
              'Create rescaled or centered variables using the Transform editor'
            ],
            estimatedTime: 30,
            content: [
              {
                type: 'text',
                content: 'With your <strong>personality data</strong> open (Extraversion, Agreeableness, etc.), use Jamovi\'s <strong>Transform</strong> tool to create new variables: recode continuous scores into categories (e.g. High/Low Extraversion), rescale or center variables, and apply transformation rules. The Transform tool keeps your source variable unchanged and adds a new transformed column.'
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Select the variable to transform',
                    description: 'Choose <strong>Extraversion</strong> as the source variable (the one you want to transform or recode). In the transform dialog you’ll select it from the variable list; or right‑click the Extraversion column and choose Transform so it’s already selected.',
                    image: '/images/lessons/jamovi/jamovi-transform-button.png'
                  },
                  {
                    step: 2,
                    title: 'Open Transform',
                    description: 'Go to the <strong>Data</strong> tab and click the <strong>Transform</strong> button (or right‑click the Extraversion column and select Transform). Have your personality dataset open.',
                    image: '/images/lessons/jamovi/jamovi-transform-button.png'
                  },
                  {
                    step: 3,
                    title: 'Name the transformed variable',
                    description: 'Give the new variable a descriptive name (e.g. <strong>Extraversion_category</strong>, <strong>Extraversion_centered</strong>). You can set a variable suffix or description in the transform editor.',
                    image: '/images/lessons/jamovi/jamovi-transform-name.png'
                  },
                  {
                    step: 4,
                    title: 'Create new transform',
                    description: 'Click <strong>Create new transform</strong> (or the equivalent option in your Transform dialog) so you can add rules. This opens the area where you will define recode conditions or other transformation rules for Extraversion.',
                    image: '/images/lessons/jamovi/jamovi-transform-create-transform.png'
                  },
                  {
                    step: 5,
                    title: 'Add recode condition',
                    description: 'Click the blue <strong>Add recode condition</strong> button. You will see two rows: (1) <strong>if</strong> row: keep <strong>$source</strong> as is and complete the condition by typing <strong>>= 4</strong> (so it reads <strong>$source >= 4</strong>). In the <strong>use</strong> field on the same row, enter the value when the condition is true, e.g. <strong>\'High\'</strong> (with quotes for text). (2) <strong>else use</strong> row: enter the value when the condition is false, e.g. <strong>\'Low\'</strong>. Result: values ≥ 4 become "High", all others become "Low".',
                    image: '/images/lessons/jamovi/jamovi-transform-recode.png'
                  },
                  {
                    step: 6,
                    title: 'Check results',
                    description: 'The new transformed column appears in the spreadsheet. For recoded categories (High/Low), set measure type to <strong>Nominal</strong>. The original Extraversion column is unchanged.',
                    image: '/images/lessons/jamovi/jamovi-transform-results.png'
                  }
                ]
              },
              {
                type: 'definition_list',
                items: [
                  { term: 'Recode conditions', icon: '→', definition: 'Add Recode Condition in Transform to map values to categories (e.g. Extraversion ≥ 4 → "High", else → "Low")', color: '#3b82f6' },
                  { term: 'Rescaling', icon: '↔', definition: 'Use transformation rules to center (X - mean) or standardize. Transform keeps the source variable intact.', color: '#8b5cf6' },
                  { term: 'Reuse', icon: '↻', definition: 'You can reuse the same transformation on other variables (e.g. Agreeableness) or edit it later.', color: '#10b981' }
                ]
              },
              {
                type: 'callout',
                style: 'tip',
                content: 'Transform is for recoding and transforming variables; Compute (Module 4) is for building formulas like deviations step‑by‑step. With personality data, use Transform to create High/Low categories or centered versions of Extraversion or Agreeableness.'
              }
            ]
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: "Let's Practice: Histograms, Filtering, and Transforming",
        instructions: 'Follow along in Jamovi. First create a histogram, then practice filters, then transform/recode variables.',
        steps: [
          {
            instruction: 'Open your personality dataset (Extraversion, Agreeableness, etc.). If needed, create a small dataset: column Extraversion with values 1–5 (e.g. 3, 4, 5, 2, 4, 3, 5) and Agreeableness with values 1–5. Set both to Continuous.',
            hint: 'You need at least Extraversion and optionally Agreeableness for this practice.',
            checkpoint: 'You should have personality data (Extraversion and optionally Agreeableness) in the spreadsheet.'
          },
          {
            instruction: 'Go to Analyses → Exploration → Descriptives, drag Extraversion to Variables, then expand Plots and check Histogram.',
            hint: 'Click the Analyses tab, then the Exploration icon.',
            checkpoint: 'A histogram of Extraversion should appear in the Results panel.'
          },
          {
            instruction: 'Create a filter named High_Extraversion. In the expression box, type: Extraversion >= 4. Toggle the filter on and note how many cases match.',
            hint: 'Data tab → Filters → New Filter. Use >= for "greater than or equal to".',
            checkpoint: 'With Extraversion >= 4, you should see only rows where Extraversion is 4 or 5; other rows appear faded.'
          },
          {
            instruction: 'Use Data → Transform. Create a transformed variable Extraversion_category from Extraversion: add a Recode Condition so Extraversion ≥ 4 → "High", else → "Low". Set the new variable\'s measure to Nominal.',
            hint: 'In the Transform editor, select Extraversion, add Recode Condition, and define the threshold.',
            checkpoint: 'You should see a new column with High or Low for each person\'s Extraversion.'
          },
          {
            instruction: 'Use Transform again: create Extraversion_centered from Extraversion using a rescale/center rule (Extraversion − mean of Extraversion). Check with Descriptives that the new column sums to zero.',
            hint: 'Add a transformation rule that centers Extraversion (e.g. Extraversion - mean of Extraversion).',
            checkpoint: 'The Extraversion_centered column should have positive and negative values that sum to zero.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [
          {
            id: 'm5-histogram-screenshot',
            question: 'Where does the histogram appear when you check "Histogram" under Plots in Descriptives?',
            image: '/images/selfcheck/jamovi/jamovi-results-panel.png',
            options: ['Data entry panel (left)', 'Results panel (right)', 'Variables tab', 'Analyses menu'],
            correct: 1,
            explanation: 'The histogram appears in the Results panel on the right.'
          },
          {
            id: 'm5-filter-screenshot',
            question: 'Where do you create and manage filters in Jamovi?',
            image: '/images/selfcheck/jamovi/jamovi-data-panel.png',
            options: ['Analyses tab', 'Data tab (Filters area)', 'Variables tab', 'Results panel'],
            correct: 1,
            explanation: 'Filters are created and toggled in the Data tab.'
          },
          {
            id: 'm5-transform-screenshot',
            question: 'Where do you open the Transform tool to recode or transform variables in Jamovi?',
            image: '/images/selfcheck/jamovi/jamovi-data-panel.png',
            options: ['Variables tab', 'Data tab (Transform button)', 'Analyses tab', 'Results panel'],
            correct: 1,
            explanation: 'The Transform button is in the Data tab; use it to create transformed or recoded variables.'
          }
        ],
        errorDiagnostic: [
          {
            id: 'm5-histogram-error',
            scenario: 'You added a variable and checked Histogram under Plots, but no histogram appears.',
            errorMessage: 'Only the Descriptives table is visible',
            options: [
              'The variable is not continuous',
              'You need to expand the Plots section and ensure Histogram is checked',
              'You need to click a "Run" button',
              'Histogram is only available in a different analysis'
            ],
            correct: 1,
            explanation: 'Expand the Plots section in the Descriptives options and ensure the Histogram checkbox is checked.'
          },
          {
            id: 'm5-filter-error',
            scenario: 'You created a filter with expression gender == "F" but the filter shows 0 cases matched.',
            errorMessage: 'No cases match the filter',
            options: [
              'The variable is named differently (e.g. "Gender" with capital G)',
              'You should use = instead of ==',
              'You need to put F in single quotes',
              'Filters only work with numeric variables'
            ],
            correct: 0,
            explanation: 'Variable names are case-sensitive. Ensure the expression matches your column name and values.'
          },
          {
            id: 'm5-transform-error',
            scenario: 'You added a recode condition in Transform but the new column is empty or wrong.',
            errorMessage: 'No values or incorrect output',
            options: [
              'Check that the source variable is selected and the condition (e.g. score ≥ 80) matches your data',
              'You need to use Compute instead of Transform',
              'Transform only works with numeric variables',
              'You must right-click the column to transform'
            ],
            correct: 0,
            explanation: 'In Transform, ensure the source variable is selected and your recode conditions (thresholds, values) match the data. You can also right‑click a column and choose Transform.'
          }
        ],
        outputInterpretation: [
          {
            id: 'm5-histogram-output',
            question: 'Look at this histogram from Jamovi. In a short answer, describe the <strong>shape</strong> of the distribution: Is it roughly symmetric or skewed? Is it unimodal (one peak) or bimodal (two peaks)? Where does the center of the distribution appear to be?',
            image: '/images/selfcheck/jamovi/jamovi-histogram-interpretation.png',
            placeholder: 'Describe the shape (symmetric or skewed), modality (unimodal or bimodal), and where the center appears (e.g. around 70)...',
            hint: 'Consider whether the left and right sides are roughly mirror images (symmetric) or if one tail is longer (skewed). Count the main peaks.',
            requiredKeywords: [
              'symmetric', 'symmetrical', 'symmetry', 'balanced', 'even', 'not skewed', 'nonskewed', 'no skew', 'bell', 'bell-shaped',
              'unimodal', 'one peak', 'single peak', 'one mode', 'one hump', '1 peak',
              'not bimodal', "n't bimodal", 'no bimodal', 'not two peak', 'not 2 peak',
              '70', 'center', 'centre', 'middle', 'around 70', 'about 70', 'approximately 70', '~70', 'roughly 70'
            ],
            minRequiredKeywords: 3,
            feedback: 'Good interpretation. This distribution is roughly symmetric, unimodal, and the center is around 70.'
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
            question: 'Put these steps in order to create a histogram in Jamovi:',
            items: [
              { id: 'a', text: 'Check "Histogram" under Plots' },
              { id: 'b', text: 'Go to Analyses → Exploration → Descriptives' },
              { id: 'c', text: 'Drag variable to Variables box' },
              { id: 'd', text: 'Examine the histogram shape' }
            ],
            correctOrder: ['b', 'c', 'a', 'd'],
            feedback: { correct: 'Perfect!', incorrect: 'The correct order is: Navigate to Descriptives → Add variable → Enable histogram → Interpret.' }
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'A histogram shows values clustered on the left with a long tail extending to the right. This distribution is:',
            options: [
              { id: 'a', text: 'Negatively skewed (left-skewed)' },
              { id: 'b', text: 'Positively skewed (right-skewed)' },
              { id: 'c', text: 'Symmetric' },
              { id: 'd', text: 'Bimodal' }
            ],
            correct: 'b',
            feedback: { correct: 'Correct!', incorrect: 'A long tail to the right indicates positive skew.' }
          },
          {
            id: 'q3',
            type: 'multiple_choice',
            question: 'To include only participants over age 21, which filter expression should you use?',
            options: [
              { id: 'a', text: 'age = 21' },
              { id: 'b', text: 'age > 21' },
              { id: 'c', text: 'age => 21' },
              { id: 'd', text: 'age > "21"' }
            ],
            correct: 'b',
            feedback: { correct: 'Correct!', incorrect: 'Use age > 21 for greater than.' }
          },
          {
            id: 'q4',
            type: 'multiple_choice',
            question: 'When a filter is active in Jamovi, what happens to filtered-out cases?',
            options: [
              { id: 'a', text: 'They are permanently deleted' },
              { id: 'b', text: 'They appear faded but remain in the data' },
              { id: 'c', text: 'They move to a separate sheet' },
              { id: 'd', text: 'They are highlighted in red' }
            ],
            correct: 'b',
            feedback: { correct: 'Right!', incorrect: 'Filtered cases appear faded but stay in the file.' }
          },
          {
            id: 'q5',
            type: 'multiple_choice',
            question: 'In Jamovi\'s Transform tool, what do you use to turn a continuous score into categories like Pass/Fail?',
            options: [
              { id: 'a', text: 'Add Recode Condition and set the threshold (e.g. ≥ 80 → "Pass")' },
              { id: 'b', text: 'Use the Compute button instead' },
              { id: 'c', text: 'Type IF(score, "Pass", "Fail") in the formula box' },
              { id: 'd', text: 'Drag the variable to the Nominal box' }
            ],
            correct: 'a',
            feedback: { correct: 'Correct!', incorrect: 'In the Transform tool, use Add Recode Condition to define thresholds and output values (e.g. score ≥ 80 → "Pass", else → "Fail").' }
          },
          {
            id: 'q6',
            type: 'fill_blank',
            question: 'In the Transform tool, to recode age so that age > 18 gives "Yes" and else gives "No", you add a Recode Condition with output values ____ and ____ for the else case.',
            answer: ['"Yes", "No"', '"yes", "no"', 'Yes, No', 'yes, no'],
            caseSensitive: false,
            feedback: { correct: 'Right!', incorrect: 'In Transform, add a Recode Condition: when age > 18 output "Yes", and set the else/otherwise output to "No".' }
          }
        ]
      }
    }
  }
]
