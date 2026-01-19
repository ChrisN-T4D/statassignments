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

export const softwareLessons = [
  // ============ STATISTICS MODULE 3: Jamovi Basics ============
  {
    id: 'jamovi-intro-interface',
    module: 'stats-module-3',
    title: 'Getting to Know the Jamovi Interface',
    software: 'jamovi',
    objectives: [
      'Identify the main areas of the Jamovi interface',
      'Understand the difference between the Data view and Results view',
      'Navigate between the Variables, Data, Analyses, and Edit tabs'
    ],
    estimatedTime: 15,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: Exploring the Jamovi Interface',
        content: [
          {
            type: 'text',
            content: 'Jamovi has a clean, modern interface divided into key areas. Let\'s explore each one.'
          },
          {
            type: 'annotated_image',
            image: '/images/lessons/jamovi-interface-overview.png',
            alt: 'Jamovi interface with labeled areas',
            annotations: [
              { x: 5, y: 5, label: 'Menu (hamburger icon)', description: 'Open, save, and export files' },
              { x: 20, y: 5, label: 'Ribbon tabs', description: 'Variables, Data, Analyses, Edit' },
              { x: 30, y: 50, label: 'Spreadsheet', description: 'Your data lives here' },
              { x: 70, y: 50, label: 'Results panel', description: 'Output appears here' },
              { x: 50, y: 95, label: 'Status bar', description: 'Row counts and filter info' }
            ]
          },
          {
            type: 'text',
            content: 'The **Data tab** shows tools for working with your data: Setup, Compute, Transform, Filters, and Add/Delete variables.'
          },
          {
            type: 'text',
            content: 'The **Analyses tab** is where you\'ll run statistical tests. Each icon represents a category of analyses.'
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'Double-click any column header to open the Variable Editor, where you can change variable properties.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Open Jamovi on your computer and follow along with these steps.',
        steps: [
          {
            instruction: 'Open Jamovi. You should see a blank spreadsheet with columns A, B, C.',
            hint: 'If Jamovi opens with a previous file, go to the hamburger menu (☰) and select "New".',
            checkpoint: 'Can you see the blank spreadsheet with the Results panel on the right?'
          },
          {
            instruction: 'Click on the "Variables" tab in the ribbon.',
            hint: 'It\'s the first tab after the hamburger menu.',
            checkpoint: 'You should now see a list view of your variables (A, B, C) instead of the spreadsheet.'
          },
          {
            instruction: 'Click on the "Analyses" tab.',
            hint: 'Look for it between Data and Edit.',
            checkpoint: 'You should see icons for Exploration, T-Tests, ANOVA, Regression, etc.'
          },
          {
            instruction: 'Click back on the "Data" tab to return to the spreadsheet view.',
            hint: 'This is where you\'ll spend most of your time entering and viewing data.',
            checkpoint: 'You should see the spreadsheet again with the toolbar showing Setup, Compute, etc.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        instructions: 'Answer these questions to test your knowledge of the Jamovi interface.',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'Where do statistical output and results appear in Jamovi?',
            options: [
              { id: 'a', text: 'In a separate pop-up window' },
              { id: 'b', text: 'In the left panel (spreadsheet area)' },
              { id: 'c', text: 'In the right panel (Results panel)' },
              { id: 'd', text: 'In the status bar at the bottom' }
            ],
            correct: 'c',
            feedback: {
              correct: 'Right! The Results panel on the right side displays all your statistical output.',
              incorrect: 'Not quite. In Jamovi, results appear in the Results panel on the right side of the screen.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'Which tab contains the icons for running t-tests, ANOVA, and regression?',
            options: [
              { id: 'a', text: 'Variables' },
              { id: 'b', text: 'Data' },
              { id: 'c', text: 'Analyses' },
              { id: 'd', text: 'Edit' }
            ],
            correct: 'c',
            feedback: {
              correct: 'Correct! The Analyses tab contains all the statistical analysis tools.',
              incorrect: 'The Analyses tab is where you\'ll find all statistical tests like t-tests, ANOVA, and regression.'
            }
          },
          {
            id: 'q3',
            type: 'matching',
            question: 'Match each Jamovi area to its purpose:',
            pairs: [
              { left: 'Hamburger menu (☰)', right: 'Open, save, and export files' },
              { left: 'Data tab', right: 'Setup variables, compute, transform, filter' },
              { left: 'Analyses tab', right: 'Run statistical tests' },
              { left: 'Results panel', right: 'View statistical output' }
            ],
            feedback: {
              correct: 'Great job matching the interface areas!',
              incorrect: 'Review the interface areas and their functions.'
            }
          },
          {
            id: 'q4',
            type: 'ordering',
            question: 'Put these tabs in order as they appear left-to-right in Jamovi:',
            items: [
              { id: 'a', text: 'Edit' },
              { id: 'b', text: 'Data' },
              { id: 'c', text: 'Variables' },
              { id: 'd', text: 'Analyses' }
            ],
            correctOrder: ['c', 'b', 'd', 'a'],
            feedback: {
              correct: 'Perfect! The tabs go: Variables, Data, Analyses, Edit.',
              incorrect: 'The correct order is: Variables, Data, Analyses, Edit.'
            }
          }
        ]
      }
    }
  },

  {
    id: 'jamovi-variable-types',
    module: 'stats-module-3',
    title: 'Setting Variable Types in Jamovi',
    software: 'jamovi',
    objectives: [
      'Distinguish between Nominal, Ordinal, and Continuous measurement levels',
      'Change a variable\'s measurement level in Jamovi',
      'Understand why correct variable types matter for analysis'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: Understanding Variable Types',
        content: [
          {
            type: 'text',
            content: 'In Jamovi, every variable has a **measurement level** that tells the software how to treat it in analyses. Getting this right is crucial!'
          },
          {
            type: 'definition_list',
            items: [
              {
                term: 'Nominal',
                icon: '🔗',
                definition: 'Categories with no natural order. Examples: Gender, Eye Color, Treatment Group',
                color: '#e8a838'
              },
              {
                term: 'Ordinal',
                icon: '📊',
                definition: 'Categories with a meaningful order, but unequal intervals. Examples: Education Level, Likert scales (Agree/Neutral/Disagree)',
                color: '#e8a838'
              },
              {
                term: 'Continuous',
                icon: '📏',
                definition: 'Numeric values where differences are meaningful. Examples: Age, Height, Test Scores',
                color: '#5778a4'
              },
              {
                term: 'ID',
                icon: '#',
                definition: 'Unique identifiers that shouldn\'t be analyzed. Examples: Participant ID, Student Number',
                color: '#888888'
              }
            ]
          },
          {
            type: 'annotated_image',
            image: '/images/lessons/jamovi-variable-editor.png',
            alt: 'Variable Editor in Jamovi showing measure type dropdown',
            annotations: [
              { x: 50, y: 30, label: 'Variable name', description: 'The name of your variable' },
              { x: 30, y: 50, label: 'Measure type', description: 'Click this dropdown to change the measurement level' },
              { x: 70, y: 50, label: 'Type indicator', description: 'The icon shows the current type' }
            ]
          },
          {
            type: 'callout',
            style: 'warning',
            content: 'If you run an analysis with the wrong variable type, you may get incorrect or misleading results! For example, treating a categorical variable as continuous could give you a meaningless "average."'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Change Variable Types Together',
        instructions: 'Follow these steps in Jamovi to practice changing variable types.',
        steps: [
          {
            instruction: 'Create a new Jamovi file (☰ → New) or use your existing blank file.',
            hint: 'Make sure you have a fresh file to work with.'
          },
          {
            instruction: 'Double-click on the column header "A" to open the Variable Editor.',
            hint: 'Click directly on the letter "A" at the top of the first column.',
            checkpoint: 'You should see a panel appear with "DATA VARIABLE" at the top.'
          },
          {
            instruction: 'Change the variable name from "A" to "Gender" by typing in the name field.',
            hint: 'Click in the text box at the top where it says "A" and type "Gender".'
          },
          {
            instruction: 'Click the "Measure type" dropdown and select "Nominal".',
            hint: 'Nominal is correct because gender categories (Male, Female, etc.) have no inherent order.',
            checkpoint: 'The icon next to the variable name should now show a chain link (🔗).'
          },
          {
            instruction: 'Close the Variable Editor by clicking the X or clicking elsewhere.',
            hint: 'Your changes are saved automatically.'
          },
          {
            instruction: 'Now double-click column B and rename it to "Age". Set its type to "Continuous".',
            hint: 'Age is a numeric measurement where differences are meaningful (30-20=10 years).',
            checkpoint: 'The Age variable should show a ruler icon (📏).'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        instructions: 'Test your knowledge of variable types.',
        questions: [
          {
            id: 'q1',
            type: 'multiple_select',
            question: 'Which of the following would be classified as NOMINAL variables? (Select all that apply)',
            options: [
              { id: 'a', text: 'Blood Type (A, B, AB, O)' },
              { id: 'b', text: 'Temperature in Fahrenheit' },
              { id: 'c', text: 'Favorite Color' },
              { id: 'd', text: 'Pain Rating (1-10)' },
              { id: 'e', text: 'Country of Birth' }
            ],
            correct: ['a', 'c', 'e'],
            feedback: {
              correct: 'Correct! Blood Type, Favorite Color, and Country of Birth are all categories without inherent order.',
              incorrect: 'Nominal variables are categories with no natural order. Temperature is continuous, and Pain Rating (1-10) is ordinal because the numbers have meaningful order.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'A researcher records education level as: "High School", "Some College", "Bachelor\'s", "Master\'s", "Doctorate". What measurement level should this be?',
            options: [
              { id: 'a', text: 'Nominal - they are just categories' },
              { id: 'b', text: 'Ordinal - they have a meaningful order' },
              { id: 'c', text: 'Continuous - there are 5 levels' },
              { id: 'd', text: 'ID - each person has one' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Right! Education levels have a clear order (Doctorate > Master\'s > Bachelor\'s, etc.) but the "distance" between levels isn\'t equal or measurable.',
              incorrect: 'Think about whether these categories can be ranked. They can! Doctorate is "higher" than High School, so this is Ordinal.'
            }
          },
          {
            id: 'q3',
            type: 'multiple_choice',
            question: 'How do you open the Variable Editor in Jamovi?',
            options: [
              { id: 'a', text: 'Click Analyses → Variable Editor' },
              { id: 'b', text: 'Double-click on the column header' },
              { id: 'c', text: 'Right-click and select Properties' },
              { id: 'd', text: 'Press Ctrl+V' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! Double-clicking the column header opens the Variable Editor.',
              incorrect: 'In Jamovi, you double-click on the column header (the variable name at the top of the column) to open the Variable Editor.'
            }
          },
          {
            id: 'q4',
            type: 'fill_blank',
            question: 'In Jamovi, the icon for a Nominal variable looks like a ____.',
            answer: ['chain', 'chain link', 'link', 'links'],
            caseSensitive: false,
            feedback: {
              correct: 'Yes! The chain link icon (🔗) indicates a Nominal variable.',
              incorrect: 'The Nominal icon looks like a chain link (🔗). It might help to think of it as "linked categories."'
            }
          },
          {
            id: 'q5',
            type: 'screenshot',
            question: 'In Jamovi, create a variable called "Condition" and set it to Nominal. Take a screenshot showing the Variable Editor with these settings.',
            rubric: [
              'Variable name is "Condition"',
              'Measure type is set to "Nominal"',
              'Variable Editor panel is visible'
            ],
            placeholder: true // Will be enabled when API is configured
          }
        ]
      }
    }
  },

  {
    id: 'jamovi-descriptive-stats',
    module: 'stats-module-4',
    title: 'Running Descriptive Statistics in Jamovi',
    software: 'jamovi',
    objectives: [
      'Navigate to Descriptives in the Analyses menu',
      'Select variables for analysis',
      'Interpret basic descriptive statistics output'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: Running Descriptives',
        content: [
          {
            type: 'text',
            content: 'Descriptive statistics summarize your data. In Jamovi, you\'ll find them under **Analyses → Exploration → Descriptives**.'
          },
          {
            type: 'step_sequence',
            steps: [
              {
                step: 1,
                title: 'Go to Analyses tab',
                description: 'Click the Analyses tab to see the analysis icons.',
                image: '/images/lessons/jamovi-analyses-tab.png'
              },
              {
                step: 2,
                title: 'Click Exploration',
                description: 'Click the bar chart icon labeled "Exploration".',
                image: '/images/lessons/jamovi-exploration-icon.png'
              },
              {
                step: 3,
                title: 'Select Descriptives',
                description: 'From the dropdown, select "Descriptives".',
                image: '/images/lessons/jamovi-descriptives-menu.png'
              },
              {
                step: 4,
                title: 'Add variables',
                description: 'Drag your variable(s) to the "Variables" box.',
                image: '/images/lessons/jamovi-descriptives-variables.png'
              }
            ]
          },
          {
            type: 'text',
            content: 'The output will show N (count), Mean, Median, Standard Deviation, Minimum, and Maximum by default.'
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'You can request additional statistics like Skewness, Kurtosis, or Percentiles by expanding the "Statistics" section in the options panel.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Run Descriptives Together',
        instructions: 'Follow along in Jamovi with some practice data.',
        steps: [
          {
            instruction: 'First, let\'s enter some data. In column A (rename it "Score"), enter these values: 78, 85, 92, 68, 74, 88, 95, 71, 83, 79',
            hint: 'Click in cell A1 and type each number, pressing Enter after each.',
            checkpoint: 'You should have 10 values in the Score column.'
          },
          {
            instruction: 'Make sure Score is set to Continuous (double-click the header to check).',
            hint: 'Since these are test scores (numbers with meaningful differences), Continuous is correct.'
          },
          {
            instruction: 'Click the Analyses tab, then click the Exploration icon (looks like a bar chart).',
            hint: 'It\'s the first icon in the Analyses toolbar.',
            checkpoint: 'You should see a dropdown menu appear.'
          },
          {
            instruction: 'Select "Descriptives" from the menu.',
            hint: 'It should be the first option.',
            checkpoint: 'A panel should appear on the left with options, and the Results panel should show a table starting to form.'
          },
          {
            instruction: 'Drag "Score" from the variable list to the "Variables" box.',
            hint: 'You can also double-click Score to add it.',
            checkpoint: 'The Results panel should now show descriptive statistics for Score.'
          },
          {
            instruction: 'Look at the output. Find the Mean and Standard Deviation.',
            hint: 'The Mean should be around 81.3 and SD around 8.7.',
            checkpoint: 'Can you identify N, Mean, Median, SD, Min, and Max in the output?'
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
  }
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
  { id: 'stats-module-3', title: 'Jamovi Basics', description: 'Getting started with the Jamovi interface' },
  { id: 'stats-module-4', title: 'Descriptive Statistics', description: 'Summarizing your data' },
  { id: 'stats-module-5', title: 'Data Visualization', description: 'Creating charts and graphs' },
  { id: 'stats-module-6', title: 'Probability & Distributions', description: 'Working with the normal distribution' },
  { id: 'stats-module-7', title: 'Hypothesis Testing', description: 'T-tests and significance testing' },
  { id: 'stats-module-8', title: 'Correlation & Regression', description: 'Analyzing relationships' }
]
