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
  },

  // ============ STATISTICS MODULE 5: Graphing and Data Manipulation ============
  {
    id: 'jamovi-create-histogram',
    module: 'stats-module-5',
    title: 'Creating Histograms in Jamovi',
    software: 'jamovi',
    objectives: [
      'Create a histogram to visualize distribution shape',
      'Adjust bin width to improve interpretability',
      'Identify skewness and modality from a histogram'
    ],
    estimatedTime: 20,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: Building a Histogram',
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
                image: '/images/lessons/jamovi-exploration-menu.png'
              },
              {
                step: 2,
                title: 'Add your variable',
                description: 'Drag your continuous variable to the Variables box',
                image: '/images/lessons/jamovi-histogram-variable.png'
              },
              {
                step: 3,
                title: 'Enable histogram',
                description: 'Under "Plots" section, check "Histogram"',
                image: '/images/lessons/jamovi-histogram-checkbox.png'
              },
              {
                step: 4,
                title: 'Customize bins',
                description: 'Click the gear icon next to Histogram to adjust bin width',
                image: '/images/lessons/jamovi-histogram-bins.png'
              }
            ]
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'If your histogram looks too choppy or too smooth, try adjusting the bin width. Too many bins create noise; too few bins hide the distribution shape.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Create a Histogram Together',
        instructions: 'Follow along in Jamovi with practice data.',
        steps: [
          {
            instruction: 'Enter these test scores in column A (rename to "Score"): 65, 72, 78, 81, 83, 85, 87, 88, 90, 92, 94, 95, 68, 71, 76, 79, 84, 86, 91, 93',
            hint: 'Make sure Score is set to Continuous measurement level.',
            checkpoint: 'You should have 20 test scores entered.'
          },
          {
            instruction: 'Go to Analyses → Exploration → Descriptives',
            hint: 'Click the Analyses tab, then the Exploration icon.',
            checkpoint: 'The Descriptives panel should appear.'
          },
          {
            instruction: 'Drag "Score" to the Variables box',
            hint: 'You can also double-click Score to add it.',
            checkpoint: 'Descriptive statistics for Score should appear in Results.'
          },
          {
            instruction: 'Expand the "Plots" section and check "Histogram"',
            hint: 'The Plots section is below Statistics in the options panel.',
            checkpoint: 'A histogram should appear in the Results panel.'
          },
          {
            instruction: 'Look at the histogram shape. Is it symmetric or skewed? Unimodal or bimodal?',
            hint: 'This distribution should look roughly symmetric and unimodal (one peak).',
            checkpoint: 'Can you identify the approximate center of the distribution?'
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
            feedback: {
              correct: 'Perfect! You navigate to Descriptives, add your variable, enable histogram, then interpret it.',
              incorrect: 'The correct order is: Navigate to Descriptives → Add variable → Enable histogram → Interpret.'
            }
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
            feedback: {
              correct: 'Correct! A long tail to the right indicates positive skew (right skew).',
              incorrect: 'When values cluster on the left with a long tail to the right, the distribution is positively skewed (right-skewed).'
            }
          },
          {
            id: 'q3',
            type: 'multiple_choice',
            question: 'What should you do if your histogram looks too choppy with too many small spikes?',
            options: [
              { id: 'a', text: 'Delete some data points' },
              { id: 'b', text: 'Increase the bin width (fewer bins)' },
              { id: 'c', text: 'Decrease the bin width (more bins)' },
              { id: 'd', text: 'Switch to a bar chart' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Right! Increasing bin width (fewer bins) smooths out the histogram.',
              incorrect: 'When a histogram is too choppy, increase the bin width to create fewer, wider bins that better show the overall shape.'
            }
          }
        ]
      }
    }
  },

  {
    id: 'jamovi-filter-data',
    module: 'stats-module-5',
    title: 'Filtering Data in Jamovi',
    software: 'jamovi',
    objectives: [
      'Create filters using logical expressions',
      'Apply filters to include or exclude cases',
      'Combine multiple conditions with AND/OR operators'
    ],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: Using Filters',
        content: [
          {
            type: 'text',
            content: 'Filters let you analyze subsets of your data without deleting any rows. When a filter is active, only cases that meet your criteria are included in analyses.'
          },
          {
            type: 'step_sequence',
            steps: [
              {
                step: 1,
                title: 'Open Filters',
                description: 'Go to Data tab → Filters button',
                image: '/images/lessons/jamovi-filters-button.png'
              },
              {
                step: 2,
                title: 'Create filter',
                description: 'Click "New Filter" and give it a descriptive name',
                image: '/images/lessons/jamovi-new-filter.png'
              },
              {
                step: 3,
                title: 'Write expression',
                description: 'Enter a logical expression using comparison operators',
                image: '/images/lessons/jamovi-filter-expression.png'
              },
              {
                step: 4,
                title: 'Apply filter',
                description: 'Toggle the filter on/off using the checkbox',
                image: '/images/lessons/jamovi-filter-toggle.png'
              }
            ]
          },
          {
            type: 'definition_list',
            items: [
              {
                term: '== (equals)',
                icon: '=',
                definition: 'Matches exact values. Example: gender == "female"',
                color: '#3b82f6'
              },
              {
                term: '!= (not equal)',
                icon: '≠',
                definition: 'Excludes values. Example: group != "control"',
                color: '#ef4444'
              },
              {
                term: '> < >= <=',
                icon: '>',
                definition: 'Comparison operators. Example: age >= 18',
                color: '#8b5cf6'
              },
              {
                term: 'and / or',
                icon: '&',
                definition: 'Combine conditions. Example: age > 18 and age < 65',
                color: '#10b981'
              }
            ]
          },
          {
            type: 'callout',
            style: 'warning',
            content: 'Remember: use == (double equals) for comparison, not = (single equals). Also, text values must be in quotes: gender == "male"'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Filtering',
        instructions: 'Create sample data and practice different filter types.',
        steps: [
          {
            instruction: 'Create three columns: ID (1-10), Age (18, 22, 35, 45, 28, 19, 67, 30, 55, 21), Gender ("M","F","M","F","M","F","M","F","M","F")',
            hint: 'Set ID and Age to Continuous, Gender to Nominal.',
            checkpoint: 'You should have 10 rows of data.'
          },
          {
            instruction: 'Go to Data tab → Filters',
            hint: 'The Filters button is in the Data toolbar.',
            checkpoint: 'The Filters panel should open on the left.'
          },
          {
            instruction: 'Create a filter named "Adults_Under_40" with expression: age >= 18 and age < 40',
            hint: 'Type the expression exactly, using lowercase variable names.',
            checkpoint: 'The filter should show how many cases match (should be 6 cases).'
          },
          {
            instruction: 'Toggle the filter on by checking its checkbox. Look at the data - filtered rows appear faded.',
            hint: 'Active filters are indicated in the status bar at the bottom.',
            checkpoint: 'You should see 6 active cases and 4 filtered out.'
          },
          {
            instruction: 'Create another filter "Females" with: gender == "F"',
            hint: 'Text values need quotes: == "F" not == F',
            checkpoint: 'This filter should match 5 cases (half your data).'
          },
          {
            instruction: 'Try running Descriptives on Age with different filters active. Notice how results change.',
            hint: 'Turn filters on/off to see how they affect analyses.',
            checkpoint: 'The mean age should be different with each filter.'
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
            question: 'To include only participants over age 21, which filter expression should you use?',
            options: [
              { id: 'a', text: 'age = 21' },
              { id: 'b', text: 'age > 21' },
              { id: 'c', text: 'age => 21' },
              { id: 'd', text: 'age > "21"' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! Use > to mean "greater than".',
              incorrect: 'Use age > 21 (greater than operator, no quotes for numbers).'
            }
          },
          {
            id: 'q2',
            type: 'multiple_select',
            question: 'Which filter expressions are written correctly? (Select all that apply)',
            options: [
              { id: 'a', text: 'gender == "female"' },
              { id: 'b', text: 'score > 80 and score < 100' },
              { id: 'c', text: 'age = 25' },
              { id: 'd', text: 'group != control' }
            ],
            correct: ['a', 'b'],
            feedback: {
              correct: 'Right! Both use == for comparison and proper syntax.',
              incorrect: 'Correct expressions: gender == "female" and score > 80 and score < 100. Use == not =, and put text in quotes.'
            }
          },
          {
            id: 'q3',
            type: 'fill_blank',
            question: 'To include participants who are either under 18 OR over 65, you would use: age < 18 ____ age > 65',
            answer: ['or', 'OR', '|'],
            caseSensitive: false,
            feedback: {
              correct: 'Correct! Use OR when either condition can be true.',
              incorrect: 'Use OR to combine conditions where either one can be true: age < 18 or age > 65'
            }
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
            feedback: {
              correct: 'Right! Filtered cases appear faded but stay in your data file.',
              incorrect: 'Filters don\'t delete data - filtered cases appear faded/grayed out but remain in the file.'
            }
          }
        ]
      }
    }
  },

  {
    id: 'jamovi-compute-variables',
    module: 'stats-module-5',
    title: 'Computing New Variables in Jamovi',
    software: 'jamovi',
    objectives: [
      'Create new variables using formulas',
      'Use arithmetic operations and mathematical functions',
      'Apply IF() statements for conditional calculations'
    ],
    estimatedTime: 30,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: Computing Variables',
        content: [
          {
            type: 'text',
            content: 'Computed variables let you create new columns based on existing data. This is essential for calculating totals, percentages, transformations, and recoded variables.'
          },
          {
            type: 'step_sequence',
            steps: [
              {
                step: 1,
                title: 'Open Compute',
                description: 'Go to Data tab → Compute button',
                image: '/images/lessons/jamovi-compute-button.png'
              },
              {
                step: 2,
                title: 'Name your variable',
                description: 'Enter a descriptive name (e.g., "total_score")',
                image: '/images/lessons/jamovi-compute-name.png'
              },
              {
                step: 3,
                title: 'Write formula',
                description: 'Use variable names, operators, and functions',
                image: '/images/lessons/jamovi-compute-formula.png'
              },
              {
                step: 4,
                title: 'Check results',
                description: 'The new column appears immediately with calculated values',
                image: '/images/lessons/jamovi-compute-results.png'
              }
            ]
          },
          {
            type: 'definition_list',
            items: [
              {
                term: 'Basic Math',
                icon: '+',
                definition: '+ - * / for add, subtract, multiply, divide',
                color: '#3b82f6'
              },
              {
                term: 'IF()',
                icon: '?',
                definition: 'IF(condition, value_if_true, value_if_false)',
                color: '#f59e0b'
              },
              {
                term: 'Functions',
                icon: 'ƒ',
                definition: 'SQRT(), ABS(), LOG10(), ROUND(), etc.',
                color: '#8b5cf6'
              }
            ]
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'Click the fx button in the formula editor to see all available functions with examples.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Compute Variables Together',
        instructions: 'Create different types of computed variables.',
        steps: [
          {
            instruction: 'Create columns: test1 (85, 90, 78, 92, 88), test2 (82, 88, 75, 95, 90), test3 (88, 92, 80, 90, 85)',
            hint: 'Set all to Continuous measurement level.',
            checkpoint: 'You should have 5 rows with 3 test scores each.'
          },
          {
            instruction: 'Click Data → Compute. Name the variable "total" and enter formula: test1 + test2 + test3',
            hint: 'Variable names are case-sensitive.',
            checkpoint: 'A new column "total" should appear with sum of three tests.'
          },
          {
            instruction: 'Create another variable "average" with formula: (test1 + test2 + test3) / 3',
            hint: 'Use parentheses to ensure addition happens before division.',
            checkpoint: 'Average should show the mean of the three tests.'
          },
          {
            instruction: 'Create "pass_fail" using: IF(average >= 80, "Pass", "Fail")',
            hint: 'Set the variable type to Nominal after creating it.',
            checkpoint: 'You should see Pass/Fail values based on average >= 80.'
          },
          {
            instruction: 'Create "grade" using nested IFs: IF(average >= 90, "A", IF(average >= 80, "B", "C"))',
            hint: 'Nested IFs allow multiple categories.',
            checkpoint: 'Students should be assigned A, B, or C based on their average.'
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
            question: 'To calculate the sum of variables score1, score2, and score3, which formula is correct?',
            options: [
              { id: 'a', text: 'SUM(score1, score2, score3)' },
              { id: 'b', text: 'score1 + score2 + score3' },
              { id: 'c', text: 'ADD(score1, score2, score3)' },
              { id: 'd', text: 'TOTAL(score1:score3)' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! Use + to add variables together.',
              incorrect: 'In Jamovi, add variables with +: score1 + score2 + score3'
            }
          },
          {
            id: 'q2',
            type: 'fill_blank',
            question: 'To create a variable that is "Yes" if age > 18, otherwise "No", use: IF(age > 18, ____, ____)',
            answer: ['"Yes", "No"', '"yes", "no"'],
            caseSensitive: false,
            feedback: {
              correct: 'Right! IF(age > 18, "Yes", "No") returns Yes when true, No when false.',
              incorrect: 'The format is IF(condition, value_if_true, value_if_false). Text values need quotes.'
            }
          },
          {
            id: 'q3',
            type: 'multiple_choice',
            question: 'What does the formula: (pretest - posttest) / pretest calculate?',
            options: [
              { id: 'a', text: 'The total change in scores' },
              { id: 'b', text: 'The percentage change from pretest to posttest' },
              { id: 'c', text: 'The average of pretest and posttest' },
              { id: 'd', text: 'The proportional change from pretest baseline' }
            ],
            correct: 'd',
            feedback: {
              correct: 'Yes! This calculates change relative to the baseline (pretest).',
              incorrect: 'This formula calculates the proportional change: (pretest - posttest) / pretest gives the change as a proportion of the baseline.'
            }
          },
          {
            id: 'q4',
            type: 'multiple_select',
            question: 'Which of these are valid Jamovi functions? (Select all that apply)',
            options: [
              { id: 'a', text: 'SQRT()' },
              { id: 'b', text: 'ABS()' },
              { id: 'c', text: 'AVERAGE()' },
              { id: 'd', text: 'LOG10()' }
            ],
            correct: ['a', 'b', 'd'],
            feedback: {
              correct: 'Correct! SQRT, ABS, and LOG10 are all Jamovi functions.',
              incorrect: 'SQRT (square root), ABS (absolute value), and LOG10 (logarithm) are valid. There\'s no AVERAGE function - calculate the mean with formulas like (x1+x2)/2.'
            }
          }
        ]
      }
    }
  },

  // ============ STATISTICS MODULE 6: Probability and Sampling ============
  {
    id: 'jamovi-normal-distribution',
    module: 'stats-module-6',
    title: 'Working with the Normal Distribution in Jamovi',
    software: 'jamovi',
    objectives: [
      'Calculate z-scores to standardize values',
      'Find probabilities using the normal distribution',
      'Apply the empirical rule (68-95-99.7)'
    ],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: The Normal Distribution',
        content: [
          {
            type: 'text',
            content: 'The normal distribution is the foundation of many statistical methods. Understanding how to work with it - calculating z-scores, finding probabilities, and applying the empirical rule - is essential.'
          },
          {
            type: 'definition_list',
            items: [
              {
                term: 'Z-Score',
                icon: 'Z',
                definition: 'Number of standard deviations from the mean: z = (X - μ) / σ',
                color: '#3b82f6'
              },
              {
                term: 'Empirical Rule',
                icon: '68',
                definition: '68% within ±1 SD, 95% within ±2 SD, 99.7% within ±3 SD',
                color: '#10b981'
              },
              {
                term: 'Probability',
                icon: 'P',
                definition: 'Area under the curve between two values',
                color: '#f59e0b'
              }
            ]
          },
          {
            type: 'text',
            content: 'In Jamovi, you can create z-scores using Compute variables and calculate probabilities using statistical tables or online calculators.'
          },
          {
            type: 'callout',
            style: 'tip',
            content: 'Remember: A z-score tells you how unusual a value is. Z-scores beyond ±2 are noteworthy, and beyond ±3 are very rare.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice with Z-Scores',
        instructions: 'Work with IQ scores (mean=100, SD=15)',
        steps: [
          {
            instruction: 'Create a column "IQ" with values: 85, 100, 115, 130, 145, 70, 95, 110, 125',
            hint: 'Set to Continuous measurement level.',
            checkpoint: 'You should have 9 IQ scores.'
          },
          {
            instruction: 'Run Descriptives (Analyses → Exploration → Descriptives) on IQ to verify the mean and SD',
            hint: 'The mean should be around 108 and SD around 23.',
            checkpoint: 'Check that you have the correct values for mean and SD.'
          },
          {
            instruction: 'Create a z-score variable. Go to Data → Compute, name it "z_score", formula: (IQ - 100) / 15',
            hint: 'This standardizes IQ scores to the population mean=100, SD=15.',
            checkpoint: 'Z-scores should range from negative to positive values.'
          },
          {
            instruction: 'Interpret the z-scores. A z of 2.0 means the IQ is 2 standard deviations above average.',
            hint: 'Use the formula: Original IQ = 100 + (z × 15)',
            checkpoint: 'Can you identify which IQs are more than 2 SDs from the mean?'
          },
          {
            instruction: 'Use the empirical rule: About 68% of people have IQs between 85 and 115 (100 ± 15)',
            hint: 'Count how many of your 9 scores fall in this range.',
            checkpoint: 'This range represents ±1 standard deviation from the mean.'
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
            question: 'If IQ scores have mean=100 and SD=15, what is the z-score for an IQ of 130?',
            options: [
              { id: 'a', text: 'z = 1.0' },
              { id: 'b', text: 'z = 1.5' },
              { id: 'c', text: 'z = 2.0' },
              { id: 'd', text: 'z = 2.5' }
            ],
            correct: 'c',
            feedback: {
              correct: 'Correct! z = (130 - 100) / 15 = 30 / 15 = 2.0',
              incorrect: 'Use the formula z = (X - μ) / σ = (130 - 100) / 15 = 2.0'
            }
          },
          {
            id: 'q2',
            type: 'multiple_choice',
            question: 'According to the empirical rule, approximately what percentage of values fall within ±2 standard deviations of the mean?',
            options: [
              { id: 'a', text: '68%' },
              { id: 'b', text: '95%' },
              { id: 'c', text: '99.7%' },
              { id: 'd', text: '100%' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Right! About 95% of values fall within ±2 SD of the mean.',
              incorrect: 'The empirical rule: 68% within ±1 SD, 95% within ±2 SD, 99.7% within ±3 SD.'
            }
          },
          {
            id: 'q3',
            type: 'fill_blank',
            question: 'For a normal distribution with mean=50 and SD=10, the formula for computing z-scores is: (X - ____) / ____',
            answer: ['50, 10', '50) / 10'],
            caseSensitive: false,
            feedback: {
              correct: 'Correct! z = (X - 50) / 10 for this distribution.',
              incorrect: 'The z-score formula is always (X - mean) / SD, so (X - 50) / 10'
            }
          },
          {
            id: 'q4',
            type: 'multiple_choice',
            question: 'A test score has a z-score of -1.5. This means the score is:',
            options: [
              { id: 'a', text: '1.5 points below the mean' },
              { id: 'b', text: '1.5 standard deviations below the mean' },
              { id: 'c', text: '1.5 standard deviations above the mean' },
              { id: 'd', text: 'Exactly average' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! Negative z-scores are below the mean.',
              incorrect: 'Z-scores represent standard deviations. A z of -1.5 means 1.5 standard deviations below the mean.'
            }
          }
        ]
      }
    }
  },

  {
    id: 'jamovi-confidence-intervals',
    module: 'stats-module-6',
    title: 'Understanding Confidence Intervals in Jamovi',
    software: 'jamovi',
    objectives: [
      'Calculate confidence intervals for means',
      'Interpret confidence interval width and meaning',
      'Understand how sample size affects confidence intervals'
    ],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: Confidence Intervals',
        content: [
          {
            type: 'text',
            content: 'A confidence interval gives a range of plausible values for a population parameter. It quantifies our uncertainty about where the true value lies.'
          },
          {
            type: 'definition_list',
            items: [
              {
                term: '95% CI',
                icon: 'CI',
                definition: 'If we repeated the study many times, 95% of CIs would contain the true parameter',
                color: '#3b82f6'
              },
              {
                term: 'Width',
                icon: '↔',
                definition: 'Narrower CI = more precision, wider CI = more uncertainty',
                color: '#f59e0b'
              },
              {
                term: 'Factors',
                icon: '∑',
                definition: 'CI width depends on sample size, variability, and confidence level',
                color: '#8b5cf6'
              }
            ]
          },
          {
            type: 'text',
            content: 'In Jamovi, confidence intervals appear automatically in many analyses. You can also request them in Descriptives.'
          },
          {
            type: 'callout',
            style: 'warning',
            content: 'Common mistake: A 95% CI does NOT mean "95% probability the true mean is in this interval." It means the procedure produces intervals that capture the true value 95% of the time.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Calculate Confidence Intervals',
        instructions: 'Explore how CIs work with different sample sizes.',
        steps: [
          {
            instruction: 'Create "score" column with: 78, 82, 85, 88, 91, 76, 80, 84, 87, 90',
            hint: 'Set to Continuous. This is a small sample (n=10).',
            checkpoint: 'You should have 10 scores.'
          },
          {
            instruction: 'Run Descriptives on score. Under Statistics section, check "Confidence interval"',
            hint: 'Navigate to Analyses → Exploration → Descriptives.',
            checkpoint: 'You should see a 95% CI displayed in the output.'
          },
          {
            instruction: 'Note the CI width. The interval shows the lower and upper bounds.',
            hint: 'For example, if mean = 84.1, CI might be [80.2, 88.0].',
            checkpoint: 'Write down the CI values.'
          },
          {
            instruction: 'Now add 10 more scores (similar values) to increase sample size to 20.',
            hint: 'Add: 79, 83, 86, 89, 92, 77, 81, 85, 88, 91',
            checkpoint: 'Descriptives should update automatically if still open.'
          },
          {
            instruction: 'Compare the new CI to the original. It should be narrower (more precise).',
            hint: 'Larger samples produce narrower CIs because standard error decreases.',
            checkpoint: 'The CI width should have decreased with n=20 vs n=10.'
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
            question: 'You calculate a 95% CI for mean IQ as [95, 105]. What is the correct interpretation?',
            options: [
              { id: 'a', text: '95% of people have IQs between 95 and 105' },
              { id: 'b', text: 'We are 95% confident the true population mean is between 95 and 105' },
              { id: 'c', text: 'There is a 95% probability the true mean is between 95 and 105' },
              { id: 'd', text: 'The sample mean is 95 or 105' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Correct! We express confidence that the interval captures the true parameter.',
              incorrect: 'The correct interpretation: We are 95% confident the true population mean lies within this interval.'
            }
          },
          {
            id: 'q2',
            type: 'multiple_select',
            question: 'What makes a confidence interval narrower (more precise)? (Select all that apply)',
            options: [
              { id: 'a', text: 'Larger sample size' },
              { id: 'b', text: 'Smaller standard deviation' },
              { id: 'c', text: 'Lower confidence level (e.g., 90% instead of 95%)' },
              { id: 'd', text: 'Higher confidence level (e.g., 99% instead of 95%)' }
            ],
            correct: ['a', 'b', 'c'],
            feedback: {
              correct: 'Right! Larger n, less variability, and lower confidence all create narrower CIs.',
              incorrect: 'Narrower CIs result from: larger sample size, less variability, or lower confidence level. Higher confidence makes CIs wider, not narrower.'
            }
          },
          {
            id: 'q3',
            type: 'multiple_choice',
            question: 'A 95% CI for a mean is [82, 88]. A researcher claims the population mean is 90. What can you conclude?',
            options: [
              { id: 'a', text: 'The data support the claim (90 is plausible)' },
              { id: 'b', text: 'The data contradict the claim (90 is outside the CI)' },
              { id: 'c', text: 'Cannot conclude anything from a CI' },
              { id: 'd', text: 'Need a p-value to decide' }
            ],
            correct: 'b',
            feedback: {
              correct: 'Right! Since 90 falls outside the 95% CI, we can reject that claim at the 0.05 level.',
              incorrect: 'When a hypothesized value (90) falls outside the 95% CI, the data contradict that hypothesis.'
            }
          },
          {
            id: 'q4',
            type: 'fill_blank',
            question: 'If you want to be MORE confident your interval captures the true value, you would use a ____ % confidence level, which makes the interval ____.',
            answer: ['higher, wider', '99, wider', 'higher, wider', 'greater, wider'],
            caseSensitive: false,
            feedback: {
              correct: 'Correct! Higher confidence (e.g., 99%) produces wider intervals.',
              incorrect: 'To be more confident, use a higher % (e.g., 99% instead of 95%), which makes the interval wider.'
            }
          }
        ]
      }
    }
  },

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
        title: 'Watch: Testing ESP with the Binomial Test',
        content: [
          {
            type: 'text',
            content: 'The binomial test helps us determine if observed proportions differ significantly from what we\'d expect by chance. Let\'s use the ESP example from Chapter 9: 62 out of 100 people correctly guessed the card color. Is this evidence of ESP, or just chance?'
          },
          {
            type: 'annotated_image',
            imagePath: '/lessons/hypothesis-testing/binomial-setup.png',
            annotations: [
              { x: 20, y: 15, label: '1. Click Frequencies', description: 'Start in the Analyses tab' },
              { x: 45, y: 30, label: '2. Select Proportion Test', description: 'Choose the binomial test option' },
              { x: 60, y: 50, label: '3. Move outcome variable', description: 'Place your binary variable here' },
              { x: 40, y: 70, label: '4. Set test value', description: 'Enter 0.5 for 50% chance' }
            ]
          },
          {
            type: 'text',
            content: '<h4>Understanding the Setup</h4><ul><li><strong>Null Hypothesis (H₀):</strong> θ = 0.5 (people are just guessing, 50% success rate)</li><li><strong>Alternative Hypothesis (H₁):</strong> θ ≠ 0.5 (ESP exists, success rate differs from 50%)</li><li><strong>Test value:</strong> 0.5 represents our null hypothesis probability</li><li><strong>Two-sided test:</strong> We check for both higher and lower success rates</li></ul>'
          },
          {
            type: 'code',
            language: 'text',
            code: 'Results:\n  Binomial Test\n  ─────────────────────────────\n   Outcome    Level  Count  Total  Proportion    p\n  ─────────────────────────────\n   Response     1      62    100     0.620     0.021\n  ─────────────────────────────\n  Note: H₀ is proportion = 0.5'
          },
          {
            type: 'text',
            content: '<h4>Interpreting the Results</h4><ul><li><strong>Proportion = 0.620:</strong> 62% success rate in our sample</li><li><strong>p = 0.021:</strong> If the null hypothesis (50% guessing) were true, we\'d see results this extreme only 2.1% of the time</li><li><strong>Decision:</strong> Since p < 0.05, we reject the null hypothesis</li><li><strong>Conclusion:</strong> We have evidence that the success rate differs significantly from chance guessing</li></ul>'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together: Testing a Coin Flip',
        scenario: 'A student claims they have a lucky coin that comes up heads more often than tails. They flip it 80 times and get 52 heads. Let\'s test if this is evidence of a biased coin.',
        data: {
          description: 'Coin flip data: 52 heads, 28 tails out of 80 flips',
          file: 'coin_flip_data.omv'
        },
        steps: [
          {
            instruction: 'Open the Frequencies menu and select Proportion Test (2 Outcomes)',
            hint: 'Analyses → Frequencies → Proportion Test (2 Outcomes)',
            checkpoint: 'The Proportion Test panel should appear on the right'
          },
          {
            instruction: 'Move the "outcome" variable to the Variable box',
            hint: 'Drag the outcome variable from the left to the Variable box in the panel',
            checkpoint: 'You should see "outcome" listed in the Variable box'
          },
          {
            instruction: 'In the Hypothesis section, set the Test value to 0.5',
            hint: 'This represents our null hypothesis that the coin is fair (50% heads)',
            checkpoint: 'The Test value box should show 0.5'
          },
          {
            instruction: 'Check that the alternative hypothesis is set to ≠ Test value (two-sided)',
            hint: 'This tests whether the proportion differs from 0.5 in either direction',
            checkpoint: 'The hypothesis dropdown should show "≠ Test value"'
          },
          {
            instruction: 'Under Additional Statistics, check "Confidence interval"',
            hint: 'This gives us a range of plausible values for the true proportion',
            checkpoint: 'Results now include a 95% confidence interval'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'Based on the results (p = 0.264, proportion = 0.65), what should we conclude?',
          options: [
            'The coin is definitely biased',
            'The coin is definitely fair',
            'We do not have sufficient evidence to conclude the coin is biased',
            'We need more data to make any conclusion'
          ],
          correctAnswer: 2,
          feedback: {
            correct: 'Correct! With p = 0.264 > 0.05, we fail to reject the null hypothesis. While 52/80 heads is higher than 50%, this difference could easily occur by chance.',
            incorrect: 'Remember: p = 0.264 > 0.05, so we fail to reject the null hypothesis. The observed difference from 50% is not statistically significant.'
          }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Your Turn: Testing a Medical Treatment',
        scenario: 'A new treatment is being tested. Previous treatments had a 40% success rate. In a trial of 120 patients, 58 patients showed improvement. Is this new treatment significantly better?',
        task: 'Use Jamovi to conduct a binomial test and determine if the success rate differs significantly from 0.40.',
        data: {
          description: 'Treatment outcome data: 58 successes out of 120 patients',
          file: 'treatment_test.omv',
          variables: ['patient_id', 'improved']
        },
        assessment: [
          {
            type: 'multiple_choice',
            question: 'What test value should you use for this analysis?',
            options: [
              '0.50 (50%)',
              '0.40 (40%)',
              '0.58 (58%)',
              '0.48 (48%)'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Correct! The test value should be 0.40 because that\'s the success rate we\'re comparing against (the previous treatment rate).',
              incorrect: 'The test value should match the null hypothesis. We want to test if the new treatment differs from the previous 40% success rate.'
            }
          },
          {
            type: 'multiple_choice',
            question: 'The Jamovi output shows p = 0.091. At α = 0.05, what is the correct decision?',
            options: [
              'Reject the null hypothesis - the new treatment is significantly better',
              'Fail to reject the null hypothesis - insufficient evidence of improvement',
              'The test is inconclusive',
              'The p-value is invalid'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Correct! Since p = 0.091 > 0.05, we fail to reject the null hypothesis. While the sample proportion (58/120 = 48.3%) is higher than 40%, this difference is not statistically significant.',
              incorrect: 'When p > α, we fail to reject the null hypothesis. Here p = 0.091 > 0.05, so we don\'t have sufficient evidence to conclude the new treatment is better.'
            }
          },
          {
            type: 'fill_blank',
            question: 'If we observed p = 0.091, this means that if the null hypothesis were true, we would see results this extreme about ____% of the time.',
            answer: ['9.1', '9', 'nine'],
            caseSensitive: false,
            feedback: {
              correct: 'Correct! The p-value of 0.091 means 9.1% - this is the probability of observing our data (or more extreme) if the null hypothesis is true.',
              incorrect: 'The p-value is expressed as a probability. Multiply by 100 to convert to percentage: 0.091 × 100 = 9.1%'
            }
          }
        ]
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
        title: 'Watch: Testing if IQ Scores Differ from Population Average',
        content: [
          {
            type: 'text',
            content: 'The one-sample t-test helps us determine if a sample mean differs significantly from a known population value. Let\'s test if a group of students has an average IQ different from the population mean of 100.'
          },
          {
            type: 'text',
            content: '<h4>When to Use a One-Sample t-Test</h4><ul><li>You have <strong>one group</strong> of continuous data</li><li>You want to compare the <strong>sample mean</strong> to a <strong>known value</strong> (e.g., population mean, theoretical value)</li><li>Your data is approximately normally distributed (or n > 30)</li></ul>'
          },
          {
            type: 'annotated_image',
            imagePath: '/lessons/hypothesis-testing/t-test-setup.png',
            annotations: [
              { x: 20, y: 15, label: '1. Click T-Tests', description: 'In the Analyses tab' },
              { x: 45, y: 30, label: '2. Select One Sample T-Test', description: 'Choose the one-sample option' },
              { x: 60, y: 50, label: '3. Move dependent variable', description: 'Place your continuous variable here' },
              { x: 40, y: 70, label: '4. Set test value', description: 'Enter the population mean (100)' }
            ]
          },
          {
            type: 'code',
            language: 'text',
            code: 'One Sample T-Test\n────────────────────────────────────────\n                      Statistic    df      p\n────────────────────────────────────────\n  IQ_Score              2.543      24    0.018\n────────────────────────────────────────\nNote: H₀ is population mean = 100\n\nDescriptives\n────────────────────────────\n            N    Mean     SD\n────────────────────────────\n  IQ_Score  25   106.8   13.4\n────────────────────────────\n\nEffect Size (Cohen\'s d = 0.509)'
          },
          {
            type: 'text',
            content: '<h4>Interpreting the Results</h4><ul><li><strong>Mean = 106.8:</strong> Our sample average IQ</li><li><strong>t(24) = 2.543:</strong> The t-statistic measures how many standard errors the sample mean is from 100</li><li><strong>p = 0.018:</strong> If the true mean were 100, we\'d see results this extreme only 1.8% of the time</li><li><strong>Cohen\'s d = 0.509:</strong> Medium effect size - the difference is practically meaningful</li><li><strong>Decision:</strong> Since p < 0.05, we reject the null hypothesis</li><li><strong>Conclusion:</strong> This group has a significantly higher mean IQ than the population average</li></ul>'
          },
          {
            type: 'text',
            content: '<h4>Understanding Hypotheses</h4><ul><li><strong>Null Hypothesis (H₀):</strong> μ = 100 (population mean)</li><li><strong>Alternative Hypothesis (H₁):</strong> μ ≠ 100 (two-sided test)</li><li><strong>One-sided alternative:</strong> You could test H₁: μ > 100 if you specifically predicted higher IQ</li></ul>'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together: Testing Reaction Time',
        scenario: 'Research suggests the average reaction time for adults is 250 milliseconds. You test 30 college students and want to know if their reaction time differs from this value.',
        data: {
          description: 'Reaction time data for 30 students (in milliseconds)',
          file: 'reaction_time.omv'
        },
        steps: [
          {
            instruction: 'Open Analyses → T-Tests → One Sample T-Test',
            hint: 'Navigate through the menus to find the one-sample t-test',
            checkpoint: 'The One Sample T-Test panel appears'
          },
          {
            instruction: 'Move "reaction_time" to the Dependent Variables box',
            hint: 'Drag the variable from the left into the Dependent Variables box',
            checkpoint: 'reaction_time appears in the Dependent Variables box'
          },
          {
            instruction: 'Under "Tests", set the Test value to 250',
            hint: 'This is the population value we\'re testing against (250 ms)',
            checkpoint: 'The Test value shows 250'
          },
          {
            instruction: 'Under "Hypothesis", check that it\'s set to "≠ Test value"',
            hint: 'This creates a two-sided test',
            checkpoint: 'The hypothesis is two-sided'
          },
          {
            instruction: 'Under "Additional Statistics", check "Mean difference" and "Effect size"',
            hint: 'These give us the actual difference and Cohen\'s d',
            checkpoint: 'Results include mean difference and Cohen\'s d'
          },
          {
            instruction: 'Under "Assumption Checks", check "Normality test"',
            hint: 'This runs a Shapiro-Wilk test to check if data is normally distributed',
            checkpoint: 'A normality test table appears in the results'
          }
        ],
        assessment: {
          type: 'multiple_choice',
          question: 'The results show: Mean = 243.6, t(29) = -1.892, p = 0.069. What should we conclude?',
          options: [
            'College students have significantly faster reaction times than the general population',
            'We do not have sufficient evidence to conclude college students differ in reaction time',
            'College students have significantly slower reaction times',
            'The test is invalid because p > 0.05'
          ],
          correctAnswer: 1,
          feedback: {
            correct: 'Correct! With p = 0.069 > 0.05, we fail to reject the null hypothesis. While the sample mean (243.6) is lower than 250, this difference is not statistically significant at the α = 0.05 level.',
            incorrect: 'Since p = 0.069 > 0.05, we fail to reject the null hypothesis. The difference between 243.6 and 250 ms could easily be due to chance.'
          }
        }
      },
      youDo: {
        type: 'independent_practice',
        title: 'Your Turn: Testing Body Temperature',
        scenario: 'The traditional "normal" body temperature is 98.6°F (37°C). However, recent studies suggest this might be outdated. You measure the body temperature of 40 healthy adults. Test if the average differs from 98.6°F.',
        task: 'Conduct a one-sample t-test to determine if the sample mean body temperature differs significantly from 98.6°F.',
        data: {
          description: 'Body temperature data for 40 adults (in °F)',
          file: 'body_temp.omv',
          variables: ['subject_id', 'temperature']
        },
        assessment: [
          {
            type: 'multiple_choice',
            question: 'The output shows: Mean = 98.25°F, t(39) = -2.703, p = 0.010. What is the correct interpretation?',
            options: [
              'We fail to reject the null hypothesis; no evidence of a difference',
              'We reject the null hypothesis; the sample mean is significantly lower than 98.6°F',
              'The test is inconclusive',
              'The p-value indicates the probability that the null hypothesis is true'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Correct! Since p = 0.010 < 0.05, we reject H₀. The sample mean (98.25°F) is significantly lower than the traditional value of 98.6°F.',
              incorrect: 'With p = 0.010 < 0.05, we reject the null hypothesis. The negative t-value and low p-value indicate the sample mean is significantly lower than 98.6°F.'
            }
          },
          {
            type: 'multiple_choice',
            question: 'The output shows Cohen\'s d = 0.428. How would you interpret this effect size?',
            options: [
              'Small effect - the difference is not practically important',
              'Medium effect - the difference is moderate and meaningful',
              'Large effect - the difference is very substantial',
              'Effect size cannot be interpreted without more context'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Correct! Cohen\'s d = 0.428 is considered a small-to-medium effect. While statistically significant, the practical importance is moderate (about 0.35°F difference).',
              incorrect: 'Cohen\'s d guidelines: small ≈ 0.2, medium ≈ 0.5, large ≈ 0.8. A value of 0.428 falls in the small-to-medium range.'
            }
          },
          {
            type: 'multiple_choice',
            question: 'If the Shapiro-Wilk normality test shows p = 0.156, what does this tell us?',
            options: [
              'The data is definitely normally distributed',
              'We do not have evidence that the data deviates from normality; t-test is appropriate',
              'The data is not normal; we cannot use the t-test',
              'We need a larger sample size'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Correct! For the Shapiro-Wilk test, p > 0.05 means we don\'t reject the normality assumption. The data appears consistent with normality, so the t-test is appropriate.',
              incorrect: 'For normality tests, p > 0.05 is good news - it means we don\'t have evidence of non-normality. With p = 0.156, we can proceed with the t-test.'
            }
          },
          {
            type: 'fill_blank',
            question: 'In APA style, we would report this result as: t(____) = -2.703, p = .010',
            answer: ['39'],
            caseSensitive: false,
            feedback: {
              correct: 'Correct! The degrees of freedom for a one-sample t-test is n - 1. With 40 subjects, df = 40 - 1 = 39.',
              incorrect: 'Degrees of freedom = n - 1. With 40 subjects: df = 40 - 1 = 39'
            }
          }
        ]
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
            content: '<h3>What is a P-Value?</h3><p>The p-value is one of the most important (and misunderstood) concepts in statistics. Let\'s clarify what it actually means.</p>'
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

  // ============ STATISTICS MODULE 8: Categorical Data, T-Tests, Regression, & ANOVA ============
  {
    id: 'jamovi-one-way-anova',
    module: 'stats-module-8',
    title: 'Running a One-Way ANOVA in Jamovi',
    software: 'jamovi',
    objectives: [
      'Perform a one-way ANOVA to compare means across three or more groups',
      'Interpret the F-ratio, p-value, and effect size (eta-squared)',
      'Conduct post-hoc tests with appropriate corrections for multiple comparisons',
      'Check assumptions using Levene\'s test and Q-Q plots'
    ],
    estimatedTime: 25,
    phases: {
      iDo: {
        type: 'demonstration',
        title: 'Watch: One-Way ANOVA Step-by-Step',
        content: [
          {
            type: 'text',
            content: 'One-Way ANOVA (Analysis of Variance) tests whether the means of three or more independent groups are significantly different. It answers: "Is there at least one group that differs from the others?"'
          },
          {
            type: 'callout',
            style: 'info',
            content: '**Research Question Example:** Does study method (visual, auditory, or kinesthetic) affect exam scores?'
          },
          {
            type: 'text',
            content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- One **grouping variable** (categorical: which group each person is in)\n- One **dependent variable** (continuous: the outcome being measured)'
          },
          {
            type: 'annotated_image',
            image: '/images/lessons/anova-data-setup.png',
            alt: 'Jamovi data view showing study method and exam scores',
            annotations: [
              { x: 20, y: 30, label: 'Grouping Variable', description: 'Categories: Visual, Auditory, Kinesthetic' },
              { x: 50, y: 30, label: 'Dependent Variable', description: 'Continuous measure: Exam_Score' }
            ]
          },
          {
            type: 'text',
            content: '**Step 2: Run the One-Way ANOVA**\n\n1. Click **Analyses** → **ANOVA** → **One-Way ANOVA**\n2. Move your dependent variable (e.g., Exam_Score) to **Dependent Variables**\n3. Move your grouping variable (e.g., Study_Method) to **Grouping Variable**'
          },
          {
            type: 'text',
            content: '**Step 3: Check Assumptions**\n\nExpand the **Assumption Checks** section:\n- ✓ **Homogeneity of variances** (Levene\'s test)\n- ✓ **Normality** (Q-Q plot)\n\nIf Levene\'s test is significant (p < .05), variances are unequal → use Welch ANOVA instead.'
          },
          {
            type: 'text',
            content: '**Step 4: Add Post-Hoc Tests**\n\nIf the ANOVA is significant, you need post-hoc tests to see *which* groups differ.\n\nExpand **Post-Hoc Tests** and select:\n- **Tukey** (most common, balances power and error control)\n- Or **Holm** (slightly more powerful than Bonferroni)'
          },
          {
            type: 'text',
            content: '**Step 5: Request Effect Size**\n\nExpand **Effect Size** and check:\n- **η²** (eta-squared) - shows proportion of variance explained\n  - Small: .01, Medium: .06, Large: .14'
          },
          {
            type: 'callout',
            style: 'example',
            content: '**Interpreting Results:**\n\n**ANOVA Table:**\n- F(2, 57) = 8.42, p = .001\n- η² = .228 (large effect)\n\n**Post-Hoc:**\n- Kinesthetic > Visual (p = .002)\n- Kinesthetic > Auditory (p = .015)\n- Visual ≈ Auditory (p = .723)\n\n**Conclusion:** Kinesthetic learners scored significantly higher than both visual and auditory learners.'
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Let\'s Practice Together',
        instructions: 'Download the practice dataset "therapy_effectiveness.omv" and follow along.',
        steps: [
          {
            instruction: 'Open the therapy_effectiveness dataset. This study compares depression scores across three therapy types: CBT, DBT, and Psychodynamic.',
            hint: 'You should see two columns: Therapy_Type (grouping) and Depression_Score (outcome).',
            checkpoint: 'Can you identify which variable is categorical and which is continuous?'
          },
          {
            instruction: 'Navigate to Analyses → ANOVA → One-Way ANOVA.',
            hint: 'Look for the ANOVA icon in the Analyses ribbon.',
            checkpoint: 'The One-Way ANOVA options panel should appear on the left.'
          },
          {
            instruction: 'Move Depression_Score to "Dependent Variables" and Therapy_Type to "Grouping Variable".',
            hint: 'Click and drag, or use the arrow buttons.',
            checkpoint: 'Results should start appearing in the right panel showing the ANOVA table.'
          },
          {
            instruction: 'Expand "Assumption Checks" and check both Homogeneity of variances and Normality (Q-Q plot).',
            hint: 'Look for the dropdown arrow next to "Assumption Checks".',
            checkpoint: 'Levene\'s test and Q-Q plots should now appear in the results.'
          },
          {
            instruction: 'Check if assumptions are met. Is Levene\'s test p-value > .05? Do the Q-Q plot points roughly follow the diagonal line?',
            hint: 'If Levene\'s p > .05, variances are equal (assumption met). If Q-Q points are close to the line, normality is reasonable.',
            checkpoint: 'For this dataset, Levene\'s p = .342 (good) and Q-Q looks reasonable.'
          },
          {
            instruction: 'Expand "Post-Hoc Tests" and select "Tukey" correction.',
            hint: 'This will show you all pairwise comparisons between the three therapy types.',
            checkpoint: 'A new table should appear showing comparisons: CBT-DBT, CBT-Psychodynamic, DBT-Psychodynamic.'
          },
          {
            instruction: 'Expand "Effect Size" and check "η²".',
            hint: 'Look for the Effect Size dropdown.',
            checkpoint: 'Eta-squared should appear in the ANOVA table.'
          },
          {
            instruction: 'Interpret: Is the overall ANOVA significant (p < .05)? Which therapy type works best based on post-hoc tests?',
            hint: 'Look at the ANOVA p-value first. If significant, examine post-hoc comparisons to see which groups differ.',
            checkpoint: 'F(2, 72) = 12.8, p < .001, η² = .26. Post-hoc shows CBT significantly better than both DBT and Psychodynamic.'
          }
        ]
      },
      youDo: {
        type: 'independent_practice',
        title: 'Now You Try',
        scenario: 'You\'re analyzing data from a nutrition study examining the effect of diet type (Mediterranean, Keto, Vegan) on cholesterol levels after 6 months. The dataset "cholesterol_diet.omv" contains Diet_Type and Cholesterol_Level.',
        task: 'Run a complete one-way ANOVA with assumption checks, post-hoc tests, and effect size. Then answer the questions below.',
        assessment: [
          {
            type: 'multiple_choice',
            question: 'What is the p-value for Levene\'s test of homogeneity of variances?',
            options: [
              'p = .023',
              'p = .156',
              'p = .001',
              'p = .489'
            ],
            correctAnswer: 3,
            feedback: {
              correct: 'Correct! p = .489 means we fail to reject the null hypothesis of equal variances. The homogeneity assumption is met.',
              incorrect: 'Check the Homogeneity of variances test in your output. You want p > .05 to satisfy the assumption.'
            }
          },
          {
            type: 'multiple_choice',
            question: 'Is the overall ANOVA statistically significant at α = .05?',
            options: [
              'Yes, F(2, 87) = 9.34, p < .001',
              'No, F(2, 87) = 1.23, p = .298',
              'Yes, F(2, 87) = 3.45, p = .036',
              'No, F(2, 87) = 2.01, p = .141'
            ],
            correctAnswer: 0,
            feedback: {
              correct: 'Excellent! The ANOVA is significant (p < .001), meaning at least one diet type has a different mean cholesterol level.',
              incorrect: 'Look at the ANOVA table. Find the F-statistic and its associated p-value. Compare p to .05.'
            }
          },
          {
            type: 'multiple_choice',
            question: 'Based on Tukey post-hoc tests, which diet resulted in the LOWEST cholesterol levels?',
            options: [
              'Mediterranean diet',
              'Keto diet',
              'Vegan diet',
              'All three diets had similar cholesterol levels'
            ],
            correctAnswer: 2,
            feedback: {
              correct: 'Correct! The Vegan diet group had significantly lower cholesterol than both Mediterranean (p = .002) and Keto (p < .001).',
              incorrect: 'Review the Post-Hoc Comparisons table. Look for which group has significantly lower means compared to the others.'
            }
          },
          {
            type: 'multiple_choice',
            question: 'What is the eta-squared (η²) effect size, and how would you interpret it?',
            options: [
              'η² = .03 (small effect)',
              'η² = .18 (large effect)',
              'η² = .08 (medium effect)',
              'η² = .42 (very large effect)'
            ],
            correctAnswer: 1,
            feedback: {
              correct: 'Right! η² = .18 indicates a large effect (> .14). About 18% of the variance in cholesterol is explained by diet type.',
              incorrect: 'Find eta-squared in the ANOVA table. Cohen\'s benchmarks: small = .01, medium = .06, large = .14.'
            }
          },
          {
            type: 'multiple_select',
            question: 'Select ALL correct conclusions based on this analysis:',
            options: [
              'Diet type has a statistically significant effect on cholesterol levels',
              'The Vegan diet is significantly different from both other diets',
              'Mediterranean and Keto diets do not differ significantly from each other',
              'We should use Welch ANOVA instead because Levene\'s test was violated',
              'About 18% of cholesterol variation is explained by diet type'
            ],
            correctAnswers: [0, 1, 2, 4],
            feedback: {
              correct: 'Perfect! You\'ve correctly interpreted all aspects of the ANOVA: overall significance, post-hoc comparisons, assumptions, and effect size.',
              incorrect: 'Review: Levene\'s p = .489 (assumption met, no need for Welch). Check which post-hoc comparisons are significant (p < .05).'
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
  { id: 'stats-module-8', title: 'Advanced Analysis Methods', description: 'Chi-square, t-tests, regression, and ANOVA' }
]
