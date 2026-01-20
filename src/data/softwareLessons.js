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

  // ============ STATISTICS MODULE 3: SPSS Basics ============
  {
    id: 'spss-intro-interface',
    module: 'stats-module-3',
    title: 'Getting to Know the SPSS Interface',
    software: 'spss',
    objectives: [
      'Identify the Data View and Variable View tabs',
      'Locate the Output window and Syntax editor',
      'Run a simple command from the menus'
    ],
    estimatedTime: 15,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Tour of the SPSS Workspace',
        content: [
          {
            type: 'text',
            content: 'SPSS has three core areas: the Data Editor (Data View and Variable View), the Output window, and the Syntax editor.'
          },
          {
            type: 'annotated_image',
            image: '/images/lessons/spss-interface-overview.png',
            alt: 'SPSS Data Editor with Data View and Variable View tabs',
            annotations: [
              { x: 10, y: 5, label: 'Data View', description: 'Rows are cases, columns are variables' },
              { x: 30, y: 5, label: 'Variable View', description: 'Define type, labels, and missing values' },
              { x: 70, y: 5, label: 'Output window', description: 'Tables and charts appear here' }
            ]
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'You can paste most menu actions to Syntax (Paste) and run them later for reproducibility.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Open SPSS and follow these steps.',
        steps: [
          {
            instruction: 'Open SPSS and create a new blank dataset (File > New > Data).',
            hint: 'You should see a grid of rows and columns in Data View.',
            checkpoint: 'Data View shows variables as columns and cases as rows.'
          },
          {
            instruction: 'Click the Variable View tab.',
            hint: 'It is at the bottom of the Data Editor window.',
            checkpoint: 'You should see columns like Name, Type, Label, and Measure.'
          },
          {
            instruction: 'Return to Data View and enter a few numbers in a column.',
            hint: 'Create a column named Score and type 70, 82, 95.',
            checkpoint: 'You should see values in the Data View grid.'
          },
          {
            instruction: 'Go to Analyze > Descriptive Statistics > Frequencies and click Paste.',
            hint: 'Paste opens the Syntax editor without running the command.',
            checkpoint: 'The Syntax window should open with a FREQUENCIES command.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'Where do you define variable types and labels in SPSS?',
            options: [
              { id: 'a', text: 'Output window' },
              { id: 'b', text: 'Variable View' },
              { id: 'c', text: 'Data View' },
              { id: 'd', text: 'Chart Builder' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! Variable View is where you define name, type, labels, and measurement level.',
              incorrect: 'Use Variable View to define properties like type, label, and measurement level.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'Where do statistical output tables appear after running an analysis?',
            options: [
              { id: 'a', text: 'Data View' },
              { id: 'b', text: 'Output window' },
              { id: 'c', text: 'Variable View' },
              { id: 'd', text: 'Syntax editor' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Yes. Results appear in the Output window.',
              incorrect: 'SPSS sends results to the Output window.'
            }
          },
          {
            id: 'q3',
            type: 'fill_blank',
            question: 'The two tabs in the SPSS Data Editor are ____ and ____.',
            answer: ['Data View and Variable View', 'Variable View and Data View'],
            caseSensitive: false,
            feedback: {
              correct: 'Correct! Data View and Variable View are the two tabs.',
              incorrect: 'The tabs are Data View and Variable View.'
            }
          }
        ]
      }
    }
  },
  {
    id: 'spss-import-data',
    module: 'stats-module-3',
    title: 'Importing Data and Defining Variables in SPSS',
    software: 'spss',
    objectives: [
      'Import a CSV or Excel file',
      'Set variable types and measurement levels',
      'Apply variable and value labels'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Import and Set Up Variables',
        content: [
          {
            type: 'text',
            content: 'SPSS can import CSV and Excel files. After import, always check variable types and measurement levels in Variable View.'
          },
          {
            type: 'definition_list',
            items: [
              {
                term: 'Type',
                icon: 'T',
                definition: 'Numeric, String, or Date; controls how SPSS reads values.',
                color: '#dc2626'
              },
              {
                term: 'Label',
                icon: 'L',
                definition: 'Longer description used in output.',
                color: '#7c3aed'
              },
              {
                term: 'Measure',
                icon: 'M',
                definition: 'Nominal, Ordinal, or Scale.',
                color: '#0ea5e9'
              }
            ]
          },
          {
            type: 'callout',
            style: 'warning',
            content: 'If a numeric column imports as text, you must change Type to Numeric or analyses will fail.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Use a small CSV or Excel file and follow these steps.',
        steps: [
          {
            instruction: 'Import a CSV (File > Open > Data) and select your file.',
            hint: 'Choose Files of Type: CSV or Excel.',
            checkpoint: 'Your data should appear in Data View.'
          },
          {
            instruction: 'Go to Variable View and check Type for each variable.',
            hint: 'Click the Type cell and choose Numeric or String as needed.',
            checkpoint: 'Each variable should have the correct Type.'
          },
          {
            instruction: 'Set Measure for each variable (Nominal, Ordinal, Scale).',
            hint: 'Use Nominal for categories, Ordinal for ranked categories, Scale for numeric values.',
            checkpoint: 'The Measure column should be filled in.'
          },
          {
            instruction: 'Add a Variable Label for at least one variable.',
            hint: 'Labels appear in output tables and charts.',
            checkpoint: 'You should see your label in the Label column.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'Which Measure level should you use for test scores?',
            options: [
              { id: 'a', text: 'Nominal' },
              { id: 'b', text: 'Ordinal' },
              { id: 'c', text: 'Scale' },
              { id: 'd', text: 'String' }
            ],
            correct: 'c',
            feedback: {
              correct: 'Correct! Test scores are numeric and should be Scale.',
              incorrect: 'Use Scale for numeric variables like test scores.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_select',
            question: 'Which actions should you do after importing data? (Select all that apply)',
            options: [
              { id: 'a', text: 'Check variable Type' },
              { id: 'b', text: 'Set Measure level' },
              { id: 'c', text: 'Add variable labels' },
              { id: 'd', text: 'Delete the Output window' }
            ],
            correct: ['a', 'b', 'c'],
            feedback: {
              correct: 'Yes. Type, Measure, and labels should be reviewed after import.',
              incorrect: 'After import, verify Type, set Measure, and add labels as needed.'
            }
          }
        ]
      }
    }
  },

  // ============ STATISTICS MODULE 3: R Basics ============
  {
    id: 'r-rstudio-basics',
    module: 'stats-module-3',
    title: 'Getting Started with RStudio',
    software: 'r',
    objectives: [
      'Identify the four main RStudio panes',
      'Run commands in the Console and from a script',
      'Locate objects in the Environment'
    ],
    estimatedTime: 15,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Tour of RStudio',
        content: [
          {
            type: 'text',
            content: 'RStudio is an IDE that makes working with R easier. The interface is divided into four main panes.'
          },
          {
            type: 'annotated_image',
            image: '/images/lessons/rstudio-overview.png',
            alt: 'RStudio interface with labeled panes',
            annotations: [
              { x: 5, y: 10, label: 'Source', description: 'Where you write and save scripts' },
              { x: 55, y: 10, label: 'Environment', description: 'Objects in memory (data, variables)' },
              { x: 5, y: 60, label: 'Console', description: 'Where commands run' },
              { x: 55, y: 60, label: 'Files/Plots/Help', description: 'Outputs and file browser' }
            ]
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'Use Ctrl+Enter (Cmd+Enter on Mac) to run the current line or selection in a script.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Open RStudio and follow these steps.',
        steps: [
          {
            instruction: 'Open RStudio and locate the Console pane.',
            hint: 'The Console usually appears in the lower-left pane.',
            checkpoint: 'You should see a prompt that looks like >.'
          },
          {
            instruction: 'Type 2 + 2 in the Console and press Enter.',
            hint: 'You should see the result appear immediately in the Console.',
            checkpoint: 'You should see [1] 4.'
          },
          {
            instruction: 'Create a new R script (File > New File > R Script).',
            hint: 'A blank script tab should open in the Source pane.',
            checkpoint: 'You should see a new tab named Untitled1.'
          },
          {
            instruction: 'Type x <- 10 in the script and run it with Ctrl+Enter.',
            hint: 'This sends the line to the Console and saves x in memory.',
            checkpoint: 'Look in the Environment pane for x = 10.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'Where do objects you create (like x <- 10) appear in RStudio?',
            options: [
              { id: 'a', text: 'Console pane' },
              { id: 'b', text: 'Environment pane' },
              { id: 'c', text: 'Files pane' },
              { id: 'd', text: 'Help pane' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! The Environment pane lists objects currently in memory.',
              incorrect: 'Objects appear in the Environment pane (upper-right by default).'
            }
          },
          {
            id: 'q2',
            type: 'ordering',
            question: 'Put these RStudio panes in their usual positions (top-left to bottom-right):',
            items: [
              { id: 'a', text: 'Console' },
              { id: 'b', text: 'Environment' },
              { id: 'c', text: 'Source' },
              { id: 'd', text: 'Files/Plots/Help' }
            ],
            correctOrder: ['c', 'b', 'a', 'd'],
            feedback: {
              correct: 'Right! Source, Environment, Console, Files/Plots/Help.',
              incorrect: 'The default layout is Source (top-left), Environment (top-right), Console (bottom-left), Files/Plots/Help (bottom-right).'
            }
          },
          {
            id: 'q3',
            type: 'fill_blank',
            question: 'The shortcut to run a line from a script is ____ + Enter.',
            answer: ['Ctrl', 'Control', 'Cmd', 'Command'],
            caseSensitive: false,
            feedback: {
              correct: 'Yes! Ctrl+Enter (Windows) or Cmd+Enter (Mac).',
              incorrect: 'Use Ctrl+Enter on Windows or Cmd+Enter on Mac.'
            }
          }
        ]
      }
    }
  },
  {
    id: 'r-import-data',
    module: 'stats-module-3',
    title: 'Importing Data and Inspecting Data Frames',
    software: 'r',
    objectives: [
      'Import a CSV file with read.csv()',
      'Check data structure with str() and head()',
      'Summarize variables with summary()'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Import and Inspect Data',
        content: [
          {
            type: 'text',
            content: 'In R, data are often stored in data frames. You can import CSV files using read.csv().'
          },
          {
            type: 'definition_list',
            items: [
              {
                term: 'read.csv()',
                icon: 'R',
                definition: 'Reads a CSV file into a data frame.',
                color: '#2563eb'
              },
              {
                term: 'head()',
                icon: 'H',
                definition: 'Shows the first 6 rows of a data frame.',
                color: '#16a34a'
              },
              {
                term: 'str()',
                icon: 'S',
                definition: 'Shows the structure and data types.',
                color: '#7c3aed'
              },
              {
                term: 'summary()',
                icon: 'U',
                definition: 'Gives a quick statistical summary.',
                color: '#b45309'
              }
            ]
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'If your CSV is in your project folder, use read.csv("myfile.csv"). Otherwise, set your working directory first.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Use a small CSV file (e.g., data.csv) and follow these steps.',
        steps: [
          {
            instruction: 'Set your working directory to the folder with your CSV.',
            hint: 'Session > Set Working Directory > Choose Directory.',
            checkpoint: 'Use getwd() to confirm the path.'
          },
          {
            instruction: 'Import the file with: data <- read.csv("data.csv").',
            hint: 'Replace data.csv with your actual file name.',
            checkpoint: 'You should see data in the Environment pane.'
          },
          {
            instruction: 'Run head(data) to view the first rows.',
            hint: 'This helps confirm the file imported correctly.'
          },
          {
            instruction: 'Run str(data) to check variable types.',
            hint: 'Look for numeric vs character vs factor.'
          },
          {
            instruction: 'Run summary(data) for quick descriptives.',
            hint: 'This gives min, max, quartiles for numeric variables.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'Which function reads a CSV file into R?',
            options: [
              { id: 'a', text: 'read.table()' },
              { id: 'b', text: 'read.csv()' },
              { id: 'c', text: 'import.csv()' },
              { id: 'd', text: 'load.csv()' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! read.csv() is the standard base R function for CSVs.',
              incorrect: 'Use read.csv() to import CSV files in base R.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_select',
            question: 'Which functions help you quickly inspect a data frame? (Select all that apply)',
            options: [
              { id: 'a', text: 'head()' },
              { id: 'b', text: 'str()' },
              { id: 'c', text: 'summary()' },
              { id: 'd', text: 'sqrt()' }
            ],
            correct: ['a', 'b', 'c'],
            feedback: {
              correct: 'Correct! head(), str(), and summary() are all common inspection tools.',
              incorrect: 'head(), str(), and summary() are used for inspection. sqrt() is not.'
            }
          },
          {
            id: 'q3',
            type: 'fill_blank',
            question: 'To view the first 6 rows of a data frame named df, type ____.',
            answer: ['head(df)', 'head( df )', 'head( df)'],
            caseSensitive: false,
            feedback: {
              correct: 'Yes. head(df) shows the first rows of the data frame.',
              incorrect: 'Use head(df) to view the first rows.'
            }
          }
        ]
      }
    }
  },

  // ============ STATISTICS MODULE 3: Excel Basics ============
  {
    id: 'excel-intro-interface',
    module: 'stats-module-3',
    title: 'Getting Started with Excel for Data',
    software: 'excel',
    objectives: [
      'Identify key worksheet elements (rows, columns, cells)',
      'Enter data in a clean, rectangular format',
      'Use simple formulas to check values'
    ],
    estimatedTime: 15,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Excel Workspace Overview',
        content: [
          {
            type: 'text',
            content: 'In Excel, each dataset should be a clean rectangle: one row per case and one column per variable.'
          },
          {
            type: 'annotated_image',
            image: '/images/lessons/excel-interface-overview.png',
            alt: 'Excel worksheet with column headers and data rows',
            annotations: [
              { x: 10, y: 15, label: 'Column headers', description: 'Variable names in row 1' },
              { x: 10, y: 30, label: 'Rows', description: 'Each row is a case' },
              { x: 70, y: 10, label: 'Formula bar', description: 'View and edit cell values' }
            ]
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'Avoid merged cells and blank rows or columns inside your dataset.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Open Excel and follow these steps.',
        steps: [
          {
            instruction: 'Create a new workbook and enter column headers: ID, Score, Group.',
            hint: 'Put headers in row 1.',
            checkpoint: 'You should see three headers in row 1.'
          },
          {
            instruction: 'Enter 5 rows of data beneath the headers.',
            hint: 'Use numeric IDs and scores, and a text Group label.',
            checkpoint: 'Your data should be a solid rectangle with no blank rows.'
          },
          {
            instruction: 'Use the formula =AVERAGE(B2:B6) to compute the mean score.',
            hint: 'Place the formula below your data.',
            checkpoint: 'You should see a numeric average.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'In a clean dataset, each column should represent:',
            options: [
              { id: 'a', text: 'A case (participant)' },
              { id: 'b', text: 'A variable' },
              { id: 'c', text: 'A worksheet' },
              { id: 'd', text: 'A formula' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! Columns are variables.',
              incorrect: 'Columns should represent variables.'
            }
          },
          {
            id: 'q2',
            type: 'fill_blank',
            question: 'The Excel function to calculate a mean is ____.',
            answer: ['AVERAGE', 'average', 'Average'],
            caseSensitive: false,
            feedback: {
              correct: 'Yes. Use AVERAGE().',
              incorrect: 'Use the AVERAGE() function.'
            }
          }
        ]
      }
    }
  },
  {
    id: 'excel-import-clean',
    module: 'stats-module-3',
    title: 'Importing and Cleaning Data in Excel',
    software: 'excel',
    objectives: [
      'Import a CSV file into Excel',
      'Check for blank rows/columns',
      'Set clear, consistent variable names'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Import and Clean',
        content: [
          {
            type: 'text',
            content: 'Excel can open CSV files directly. After import, check that your dataset is tidy and variables are clearly named.'
          },
          {
            type: 'callout',
            style: 'warning',
            content: 'Avoid spaces and special characters in variable names. Use names like test_score instead of Test Score.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Use a small CSV file and follow these steps.',
        steps: [
          {
            instruction: 'Open a CSV in Excel (File > Open).',
            hint: 'Choose the CSV file and open it directly.',
            checkpoint: 'Your data should appear in rows and columns.'
          },
          {
            instruction: 'Check for blank rows or columns inside the dataset.',
            hint: 'Delete any empty rows/columns that split the data.',
            checkpoint: 'You should have one continuous data block.'
          },
          {
            instruction: 'Rename headers to short, consistent names (e.g., score, group).',
            hint: 'Use lowercase with underscores if needed.',
            checkpoint: 'Headers should be concise and consistent.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_select',
            question: 'Which are good practices for Excel datasets? (Select all that apply)',
            options: [
              { id: 'a', text: 'Use one row per case and one column per variable' },
              { id: 'b', text: 'Leave blank rows inside the data' },
              { id: 'c', text: 'Use clear variable names' },
              { id: 'd', text: 'Merge header cells across columns' }
            ],
            correct: ['a', 'c'],
            feedback: {
              correct: 'Correct! Keep data rectangular and headers clear.',
              incorrect: 'Keep data rectangular and avoid blanks or merged cells.'
            }
          }
        ]
      }
    }
  },

  // ============ STATISTICS MODULE 3: Stata Basics ============
  {
    id: 'stata-intro-interface',
    module: 'stats-module-3',
    title: 'Getting Started with Stata',
    software: 'stata',
    objectives: [
      'Identify the Command window and Results window',
      'Understand the Variables and Properties panes',
      'Run a basic command'
    ],
    estimatedTime: 15,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Stata Workspace Overview',
        content: [
          {
            type: 'text',
            content: 'Stata has a Command window for typing commands and a Results window that shows output.'
          },
          {
            type: 'annotated_image',
            image: '/images/lessons/stata-interface-overview.png',
            alt: 'Stata interface with Command and Results windows',
            annotations: [
              { x: 10, y: 60, label: 'Command', description: 'Type commands here' },
              { x: 10, y: 10, label: 'Results', description: 'Output appears here' },
              { x: 70, y: 10, label: 'Variables', description: 'List of variables in the dataset' },
              { x: 70, y: 50, label: 'Properties', description: 'Details about selected variable' }
            ]
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'Use the up arrow to recall previous commands.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Open Stata and follow these steps.',
        steps: [
          {
            instruction: 'Open Stata and type sysuse auto in the Command window, then press Enter.',
            hint: 'This loads a sample dataset.',
            checkpoint: 'You should see the auto dataset loaded in memory.'
          },
          {
            instruction: 'Type describe and press Enter.',
            hint: 'This shows variable names and types.',
            checkpoint: 'You should see a list of variables in the Results window.'
          },
          {
            instruction: 'Type summarize price mpg and press Enter.',
            hint: 'This gives basic descriptive statistics.',
            checkpoint: 'You should see N, mean, SD, min, max for price and mpg.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'Where do you type Stata commands?',
            options: [
              { id: 'a', text: 'Results window' },
              { id: 'b', text: 'Command window' },
              { id: 'c', text: 'Variables pane' },
              { id: 'd', text: 'Do-file editor only' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! Commands are typed in the Command window.',
              incorrect: 'Use the Command window to enter commands.'
            }
          },
          {
            id: 'q2',
            type: 'fill_blank',
            question: 'The command to list variable types and labels is ____.',
            answer: ['describe', 'Describe'],
            caseSensitive: false,
            feedback: {
              correct: 'Yes. describe lists variable information.',
              incorrect: 'Use describe to view variable information.'
            }
          }
        ]
      }
    }
  },
  {
    id: 'stata-import-data',
    module: 'stats-module-3',
    title: 'Importing Data in Stata',
    software: 'stata',
    objectives: [
      'Import a CSV with import delimited',
      'Inspect variables with describe and codebook',
      'Save a Stata dataset'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Import and Inspect Data',
        content: [
          {
            type: 'text',
            content: 'Use import delimited to load CSV files in Stata. Then inspect with describe or codebook.'
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'Always save your data as a .dta file after import.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Use a CSV file and follow these steps.',
        steps: [
          {
            instruction: 'Import a CSV with: import delimited using "data.csv", clear',
            hint: 'Replace data.csv with your file name.',
            checkpoint: 'You should see variables listed in the Variables pane.'
          },
          {
            instruction: 'Run describe to check variable types.',
            hint: 'Numeric variables should be int/float, strings are str.',
            checkpoint: 'Verify types look correct.'
          },
          {
            instruction: 'Run codebook on a categorical variable.',
            hint: 'Example: codebook group',
            checkpoint: 'You should see value distributions.'
          },
          {
            instruction: 'Save the dataset: save "data_clean.dta", replace',
            hint: 'This stores the cleaned Stata file.',
            checkpoint: 'Stata should confirm the file was saved.'
          }
        ]
      },
      youDo: {
        type: 'assessment',
        title: 'Check Your Understanding',
        questions: [
          {
            id: 'q1',
            type: 'multiple_choice',
            question: 'Which command imports a CSV in Stata?',
            options: [
              { id: 'a', text: 'read.csv' },
              { id: 'b', text: 'import delimited' },
              { id: 'c', text: 'use' },
              { id: 'd', text: 'open' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! import delimited reads CSV files.',
              incorrect: 'Use import delimited to read CSV files.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_select',
            question: 'Which commands help inspect variables? (Select all that apply)',
            options: [
              { id: 'a', text: 'describe' },
              { id: 'b', text: 'codebook' },
              { id: 'c', text: 'summarize' },
              { id: 'd', text: 'regress' }
            ],
            correct: ['a', 'b', 'c'],
            feedback: {
              correct: 'Correct! describe, codebook, and summarize are all inspection tools.',
              incorrect: 'Use describe, codebook, and summarize to inspect variables.'
            }
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
