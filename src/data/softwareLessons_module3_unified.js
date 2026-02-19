// Module 3: Software Basics - Unified Lesson Structure
// One lesson per software, with multiple sections in iDo phase

export const module3UnifiedLessons = [
  // ============ JAMOVI - Module 3 Unified Lesson ============
  {
    id: 'jamovi-module-3-unified',
    module: 'stats-module-3',
    title: 'Jamovi Software Fundamentals',
    software: 'jamovi',
    objectives: [
      'Successfully install Jamovi on Windows, Mac, or Chromebook',
      'Navigate the Jamovi interface confidently',
      'Set and manage variable types in datasets',
      'Import and organize data effectively'
    ],
    estimatedTime: 60, // Total time for all sections (25+15+20)
    phases: {
      // LEARN PHASE - Multiple demonstration sections
      iDo: {
        type: 'multi_section',
        title: 'Learn Jamovi Basics',
        sections: [
          // SECTION 1: Installation (from jamovi-installation lesson)
          {
            id: 'installation',
            title: 'Installing Jamovi on Your Device',
            objectives: [
              'Successfully install Jamovi on Windows, Mac, or Chromebook',
              'Enable Linux support on Chromebook for Jamovi installation',
              'Troubleshoot common installation issues',
              'Verify Jamovi installation and launch the application'
            ],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content: 'Jamovi is free, open-source statistical software that runs on Windows, Mac, Linux, and Chromebook. This guide will help you install Jamovi on your device.'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Before you begin:** Jamovi requires about 500MB of disk space and works best with at least 4GB of RAM. Most modern computers and Chromebooks meet these requirements.'
              },
              {
                type: 'section_divider',
                content: '<hr /><p class="divider-label"><strong>Using Windows or Mac?</strong> Follow the section below. Chromebook users can skip to "Installation for Chromebook" or "Verifying Your Installation."</p>'
              },
              {
                type: 'collapsible_section',
                title: '📱 Installation for Windows & Mac',
                blocks: [
                  {
                    type: 'text',
                    content: '<p>Installing Jamovi on Windows or Mac is straightforward:</p><ol><li>Visit <strong>jamovi.org</strong></li><li>Click <strong>"Download"</strong> at the top</li><li>Choose your operating system (Windows or macOS)</li><li>Run the downloaded installer and follow the prompts</li><li>Launch Jamovi from your Applications or Start Menu</li></ol>'
                  },
                  {
                    type: 'callout',
                    style: 'tip',
                    content: '**Mac users:** You may need to allow the app in System Preferences → Security & Privacy if you see a message that Jamovi "cannot be opened because it is from an unidentified developer."'
                  }
                ]
              },
              {
                type: 'section_divider',
                content: '<hr /><p class="divider-label"><strong>Using a Chromebook?</strong> Follow the section below. Windows and Mac users can skip to "Verifying Your Installation."</p>'
              },
              {
                type: 'collapsible_section',
                title: '💻 Installation for Chromebook (Detailed Guide)',
                blocks: [
                  {
                    type: 'text',
                    content: '<p>Chromebooks require a few extra steps because Jamovi runs through Linux (Beta) support. Follow this comprehensive guide:</p>'
                  },
                  {
                    type: 'step_sequence',
                    title: 'Chromebook Installation Steps',
                    steps: [
                  {
                    step: 1,
                    title: 'Check Chromebook Compatibility',
                    description: 'Not all Chromebooks support Linux apps. Your Chromebook must:<ul><li>Be running Chrome OS version 69 or later (check in Settings → About Chrome OS)</li><li>Have at least 4GB of RAM (8GB recommended)</li><li>Have at least 10GB of free storage space</li></ul><strong>To check:</strong> Go to Settings → About Chrome OS → Check for updates'
                  },
                  {
                    step: 2,
                    title: 'Enable Linux (Beta)',
                    description: '<ol><li>Open <strong>Settings</strong> (click time in bottom-right, then gear icon)</li><li>Scroll down to <strong>"Advanced"</strong> and click it</li><li>Find <strong>"Developers"</strong> section</li><li>Click <strong>"Turn On"</strong> next to "Linux development environment (Beta)"</li><li>Click <strong>"Next"</strong> in the dialog box</li><li>Choose disk size (10GB recommended) and click <strong>"Install"</strong></li><li>Wait 5-10 minutes for Linux to download and set up</li></ol>'
                  },
                  {
                    step: 3,
                    title: 'Open Linux Terminal',
                    description: 'Once Linux (Beta) is installed:<ol><li>Look for the <strong>"Terminal"</strong> app in your app launcher</li><li>Click to open it (you should see a black terminal window)</li><li>You\'re now ready to install Jamovi!</li></ol>'
                  },
                  {
                    step: 4,
                    title: 'Install Flatpak and Flathub',
                    description: 'Flathub is an app store for Linux that makes installing Jamovi much easier. Install it with these commands:<div class="terminal-command" data-command="sudo apt update">sudo apt update</div><div class="terminal-command" data-command="sudo apt install flatpak -y">sudo apt install flatpak -y</div><div class="terminal-command" data-command="flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo">flatpak remote-add --if-not-exists flathub https://flathub.org/repo/flathub.flatpakrepo</div>Copy and paste each command into Terminal, then press Enter. Wait for each command to complete before running the next one.'
                  },
                  {
                    step: 5,
                    title: 'Install Jamovi from Flathub',
                    description: 'Now install Jamovi with a single command:<div class="terminal-command" data-command="flatpak install flathub org.jamovi.jamovi -y">flatpak install flathub org.jamovi.jamovi -y</div>This will download and install Jamovi along with all required dependencies automatically. The download may take 5-10 minutes depending on your internet speed.'
                  },
                  {
                    step: 6,
                    title: 'Launch Jamovi',
                    description: 'You can now launch Jamovi in two ways:<ul><li><strong>From App Launcher:</strong> Find "jamovi" in the Linux apps folder and click it</li><li><strong>From Terminal:</strong> Copy and run this command:</li></ul><div class="terminal-command" data-command="flatpak run org.jamovi.jamovi">flatpak run org.jamovi.jamovi</div>The first launch may take 30-60 seconds as Jamovi initializes.'
                  }
                ]
                  },
                  {
                    type: 'callout',
                    style: 'warning',
                    content: '**Chromebook Performance Note:** Jamovi on Chromebook may run slower than on Windows/Mac, especially on older models with less RAM. Close other tabs and apps while using Jamovi for best performance.'
                  },
                  {
                    type: 'text',
                    content: '<h3>🔧 Troubleshooting Common Issues</h3>'
                  },
                  {
                    type: 'definition_list',
                    items: [
                      {
                        icon: '❌',
                        term: 'Linux (Beta) option not available',
                        color: '#ef4444',
                        definition: 'Your Chromebook may not support Linux apps. Check if your model is on the supported list at chromium.org/chromium-os/chrome-os-systems-supporting-linux'
                      },
                      {
                        icon: '⚠️',
                        term: 'Flatpak installation fails or shows errors',
                        color: '#f59e0b',
                        definition: 'Make sure you ran the commands in order. Try restarting Terminal and running: <div class="terminal-command" data-command="sudo apt update && sudo apt install flatpak -y">sudo apt update && sudo apt install flatpak -y</div>'
                      },
                      {
                        icon: '🐌',
                        term: 'Jamovi is very slow or crashes',
                        color: '#f59e0b',
                        definition: 'Close all Chrome tabs except one. Chromebooks share resources between Chrome OS and Linux. You may also need to allocate more disk space to Linux (Settings → Developers → Linux → Disk Size)'
                      },
                      {
                        icon: '🖥️',
                        term: 'Window appears but is blank/black',
                        color: '#f59e0b',
                        definition: 'This is a graphics rendering issue. Try restarting your Chromebook. If it persists, your Chromebook may not have sufficient graphics support for Jamovi'
                      }
                    ]
                  },
                  {
                    type: 'callout',
                    style: 'tip',
                    content: '**Alternative for Chromebook:** If installation fails, you can use **Jamovi Online** at cloud.jamovi.org. It runs in your browser with no installation needed, though you\'ll need internet access.'
                  }
                ]
              },
              {
                type: 'section_divider',
                content: '<hr /><p class="divider-label"><strong>All users:</strong> Verify your installation below.</p>'
              },
              {
                type: 'text',
                content: '<h3>✅ Verifying Your Installation</h3><p>After installation, verify Jamovi works correctly:</p><ol><li>Launch Jamovi</li><li>You should see a blank spreadsheet with columns A, B, C</li><li>Click on different ribbon tabs (Variables, Data, Analyses)</li><li>If you see the interface and can navigate tabs, you\'re ready to go!</li></ol>'
              }
            ]
          },

          // SECTION 2: Interface (from jamovi-intro-interface lesson)
          {
            id: 'interface',
            title: 'Getting to Know the Jamovi Interface',
            objectives: [
              'Identify the main areas of the Jamovi interface',
              'Understand the difference between the Data view and Results view',
              'Navigate between the Variables, Data, Analyses, and Edit tabs'
            ],
            estimatedTime: 15,
            content: [
              {
                type: 'text',
                content: '<h2>Understanding the Jamovi Workspace</h2><p>When you first open Jamovi, you\'ll see a clean, organized interface divided into two main areas. Understanding these components will help you work efficiently.</p>'
              },
              {
                type: 'annotated_image',
                image: '/images/lessons/jamovi/jamovi-interface-overview.png',
                alt: 'Jamovi interface with Data panel, Results panel, and ribbon tabs',
                annotations: [
                  { x: 15, y: 15, label: 'Data panel', description: 'Enter and view data; use Variables, Data, Analyses, and Edit tabs' },
                  { x: 75, y: 15, label: 'Results panel', description: 'Statistical output and visualizations appear here' },
                  { x: 15, y: 8, label: 'Ribbon tabs', description: 'Variables · Data · Analyses · Edit' }
                ]
              },
              {
                type: 'text',
                content: '<h3>🖥️ The Two-Panel Layout</h3><p>Jamovi uses a split-screen design:</p><ul><li><strong>Left Panel: Data Entry</strong> - This is where you enter and view your data in spreadsheet format</li><li><strong>Right Panel: Results Output</strong> - Statistical results and visualizations appear here after running analyses</li></ul>'
              },
              {
                type: 'callout',
                style: 'tip',
                content: '**Pro tip:** You can adjust the width of each panel by dragging the vertical divider between them. Make the data panel wider when entering data, and the results panel wider when reviewing output.'
              },
              {
                type: 'text',
                content: '<h3>📊 Ribbon Tabs Overview</h3><p>At the top of the data panel, you\'ll find four main tabs:</p>'
              },
              {
                type: 'definition_list',
                items: [
                  {
                    icon: '🔢',
                    term: 'Variables Tab',
                    color: '#3b82f6',
                    definition: 'Set up and configure your variables (columns). Define variable names, measurement types (nominal, ordinal, continuous), and data formats.'
                  },
                  {
                    icon: '📝',
                    term: 'Data Tab',
                    color: '#10b981',
                    definition: 'Enter and edit your data values. This is where you\'ll spend most time during data entry. Copy-paste from Excel works here too!'
                  },
                  {
                    icon: '📈',
                    term: 'Analyses Tab',
                    color: '#8b5cf6',
                    definition: 'Access all statistical analyses organized by category (Exploration, T-Tests, ANOVA, Regression, Frequencies, Factor). Click to run analyses on your data.'
                  },
                  {
                    icon: '✏️',
                    term: 'Edit Tab',
                    color: '#f59e0b',
                    definition: 'Modify settings for analyses you\'ve already run. Useful for tweaking options without re-running from scratch.'
                  }
                ]
              },
              {
                type: 'text',
                content: '<h3>☰ The Hamburger Menu</h3><p>In the top-left corner, the three horizontal lines (☰) open the main menu for file operations:</p><ul><li><strong>New:</strong> Start a new blank data file</li><li><strong>Open:</strong> Load existing Jamovi (.omv) files, CSV, Excel, SPSS data</li><li><strong>Special import:</strong> Import from SPSS, SAS, Stata, or other formats with custom options</li><li><strong>Save/Save As:</strong> Save your work as a .omv file (includes data + analyses)</li><li><strong>Export:</strong> Export results to PDF, HTML, or data to CSV/Excel</li></ul>'
              },
              {
                type: 'annotated_image',
                image: '/images/lessons/jamovi/jamovi-hamburger-menu.png',
                alt: 'Jamovi hamburger menu open with New, Open, Save, Special import, Export options',
                annotations: [
                  { x: 10, y: 20, label: 'Menu icon (☰)', description: 'Click to open file and view options' },
                  { x: 25, y: 35, label: 'File options', description: 'New, Open, Special import, Save, Save As, Export' }
                ]
              },
              {
                type: 'callout',
                style: 'info',
                content: '**File tip:** Jamovi files (.omv) are special because they save BOTH your data AND all the analyses you\'ve run. When you reopen a .omv file, all your graphs and results reappear instantly!'
              }
            ]
          },

          // SECTION 3: Variable Types (from jamovi-variable-types lesson)
          {
            id: 'variable-types',
            title: 'Setting Variable Types in Jamovi',
            objectives: [
              'Understand the three measurement levels in Jamovi',
              'Set variable types correctly for different data',
              'Change variable properties after data entry'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content: '<h2>Understanding Variable Types</h2><p>Correctly defining variable types is crucial for accurate statistical analysis. Jamovi uses three main measurement levels based on Stevens\' levels of measurement.</p>'
              },
              {
                type: 'definition_list',
                items: [
                  {
                    icon: '🏷️',
                    term: 'Nominal (Categorical)',
                    color: '#3b82f6',
                    definition: '<strong>Categories with no inherent order.</strong> Examples: Gender (Male/Female), Eye Color (Blue/Brown/Green), Country. Use this when categories are just labels or names.'
                  },
                  {
                    icon: '📊',
                    term: 'Ordinal (Ordered Categories)',
                    color: '#8b5cf6',
                    definition: '<strong>Categories with a meaningful order, but intervals between categories aren\'t equal.</strong> Examples: Education Level (High School/Bachelor/Master/PhD), Likert Scales (Strongly Disagree to Strongly Agree), T-shirt Size (S/M/L/XL).'
                  },
                  {
                    icon: '🔢',
                    term: 'Continuous (Scale/Interval/Ratio)',
                    color: '#10b981',
                    definition: '<strong>Numeric values where differences and ratios are meaningful.</strong> Examples: Age, Height, Weight, Test Scores, Income. These can be measured and compared mathematically.'
                  }
                ]
              },
              {
                type: 'callout',
                style: 'warning',
                content: '**Common mistake:** Just because data is stored as numbers doesn\'t mean it\'s continuous! For example, if you code Gender as 1=Male, 2=Female, the variable is still **Nominal**, not continuous. The numbers are just labels.'
              },
              {
                type: 'text',
                content: '<h3>🔧 How to Set Variable Types</h3><p>You can open the variable setup in two ways: from the <strong>Variables</strong> tab (double-click a variable row) or from the <strong>Data</strong> tab (click <strong>Setup</strong>). The setup panel appears as a dropdown, not in the right panel. Follow these steps to configure variables correctly:</p>'
              },
              {
                type: 'annotated_image',
                image: '/images/lessons/jamovi/jamovi-measure-type.png',
                alt: 'Jamovi variable setup dropdown showing Measure type (Nominal, Ordinal, Continuous)',
                annotations: [
                  { x: 50, y: 25, label: 'Measure type', description: 'Choose Nominal, Ordinal, or Continuous' },
                  { x: 50, y: 45, label: 'Data type', description: 'Text, Integer, or Decimal' }
                ]
              },
              {
                type: 'step_sequence',
                steps: [
                  {
                    step: 1,
                    title: 'Open the Variable Setup',
                    description: 'Use either method:<ul><li><strong>Variables tab:</strong> Click the <strong>Variables</strong> tab, then <strong>double-click</strong> the variable (row) you want to configure. The setup panel opens as a dropdown.</li><li><strong>Data tab:</strong> Click the <strong>Data</strong> tab, then click <strong>Setup</strong>. The variable setup dropdown appears so you can choose the variable and set Measure type, Data type, and more.</li></ul>'
                  },
                  {
                    step: 2,
                    title: 'Choose Measurement Type',
                    description: 'In the setup dropdown, under "Measure type," select:<ul><li><strong>Nominal</strong> for unordered categories</li><li><strong>Ordinal</strong> for ordered categories</li><li><strong>Continuous</strong> for numeric measurements</li></ul>'
                  },
                  {
                    step: 3,
                    title: 'Set Data Type',
                    description: 'Under "Data type," choose:<ul><li><strong>Text</strong> for names or text labels</li><li><strong>Integer</strong> for whole numbers (age, count)</li><li><strong>Decimal</strong> for numbers with decimal points (GPA, height)</li></ul>'
                  }
                ]
              },
              {
                type: 'callout',
                style: 'tip',
                content: '**Quick tip:** For categorical variables with numeric codes (1=Male, 2=Female), set the measurement type to **Nominal** but keep data type as **Integer**. Then add value labels so Jamovi displays "Male" and "Female" instead of numbers in your results!'
              }
            ]
          }
        ]
      },

      // PRACTICE PHASE - Combined from all three lessons
      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: Jamovi Fundamentals',
        instructions: 'Follow along with these step-by-step exercises to practice what you\'ve learned. Each step has an instruction, a hint if you get stuck, and a checkpoint so you know when you\'ve done it correctly.',
        steps: [
          // From Installation lesson
          {
            instruction: 'Launch Jamovi on your device. Use the method that matches your operating system: on Windows open the Start menu and search for Jamovi; on Mac open Applications and find Jamovi; on Chromebook open the app launcher and look in the Linux apps folder (or open Terminal and run: flatpak run org.jamovi.jamovi).',
            hint: 'If you haven\'t installed Jamovi yet, go back to the Learn section and follow the "Installing Jamovi on Your Device" steps first. Once launched, the main window should show a blank grid with columns labeled A, B, C.',
            checkpoint: 'You have successfully opened Jamovi. You should see a blank spreadsheet with empty columns (A, B, C, …) and no data. The window title may say "jamovi" or "Untitled".'
          },
          {
            instruction: 'Find the hamburger menu (☰) in Jamovi. It is the icon with three horizontal lines, usually in the top-left corner of the window. This menu gives you access to New, Open, Special import, Save, and Export. Click it once to confirm it opens a dropdown menu.',
            hint: 'Look at the very top-left of the Jamovi window, above the data area. The icon looks like three stacked horizontal lines. Clicking it opens file-related options (New, Open, Special import, Save, Export).',
            checkpoint: 'When you click the hamburger menu, a dropdown appears with options like New, Open, Special import, Save, and Export. You have confirmed where the main file menu is.'
          },
          {
            instruction: 'Identify the two main panels in the Jamovi window. The left panel is where you enter and view your data in a spreadsheet. The right panel is where results (tables, graphs) appear after you run analyses. Notice the vertical divider between them. You can drag it to make one panel wider.',
            hint: 'The left side of the window shows your data in rows and columns. The right side is often empty until you run an analysis; then output appears there. If you\'re not sure, try resizing the window. The two areas stay distinct.',
            checkpoint: 'You can point to and describe each panel: "Left = data entry/spreadsheet" and "Right = results output." You understand that analyses you run will show up on the right.'
          },
          {
            instruction: 'Click on each of the four ribbon tabs at the top of the data (left) panel: Variables, Data, Analyses, and Edit. Variables lets you set names and measurement types for columns. Data is where you type or paste values. Analyses is where you choose statistical procedures. Edit is for changing options on analyses you\'ve already run. Click each tab and briefly look at what appears.',
            hint: 'The tabs are in a horizontal strip at the top of the left panel, above the spreadsheet. Click "Variables" to see variable setup options on the right. Click "Data" to focus on the grid. Click "Analyses" to see analysis icons (Exploration, T-Tests, etc.). Click "Edit" to see options for editing existing output.',
            checkpoint: 'You have clicked all four tabs (Variables, Data, Analyses, Edit) and seen how the content changes. You know that Analyses is where you will go later to run procedures like Descriptives.'
          },
          {
            instruction: 'Open the variable setup using either method: (1) Click the Variables tab and double-click the first variable row (e.g. column A), or (2) Click the Data tab and click Setup. The variable setup appears as a dropdown with Name, Measure type, Data type, and other settings.',
            hint: 'Variables tab: double-click a variable row to open the setup dropdown. Data tab: click the Setup button to open the same dropdown. You can use whichever tab you prefer.',
            checkpoint: 'The variable setup dropdown is open, showing options for Name, Measure type, Data type, etc. You are ready to rename the variable and set its measurement level.'
          },
          {
            instruction: 'Rename the variable and set its measurement type. In the variable setup dropdown, type "Gender" in the Name field. Then open the "Measure type" dropdown and choose "Nominal". Nominal is correct for categories like Male/Female that have no order. Leave Data type as needed (e.g., Integer if you will use 1 and 2 for Male/Female).',
            hint: 'In the setup dropdown, find the "Name" box and replace "A" (or whatever is there) with "Gender". Find "Measure type" and change it from "Continuous" or "Ordinal" to "Nominal". This tells Jamovi that this column holds unordered categories.',
            checkpoint: 'Column A is now named "Gender" and its Measure type is set to Nominal. You have practiced setting up a categorical variable the way you would for real data.'
          }
        ]
      },

      // SELF-CHECK PHASE - Combined from all lessons
      selfCheck: {
        screenshotRecognition: [
          {
            id: 'screenshot-interface-1',
            question: 'What part of the Jamovi interface is highlighted in this screenshot?',
            image: '/images/selfcheck/jamovi/jamovi-data-panel.png',
            options: ['Results panel', 'Data entry panel', 'Variables tab', 'Analyses menu'],
            correct: 1,
            explanation: 'The data entry panel is on the left side where you input and view your dataset in spreadsheet format.'
          }
        ],
        errorDiagnostic: [
          {
            id: 'error-variable-type',
            scenario: 'You coded satisfaction levels as 1=Very Unsatisfied through 5=Very Satisfied, but Jamovi is treating it as continuous and calculating a mean of 3.2.',
            errorMessage: 'Warning: Computing mean for numeric variable may not be appropriate',
            options: [
              'Keep it as continuous - the mean is correct',
              'Change to Nominal - these are categories',
              'Change to Ordinal - these are ordered categories',
              'Delete the variable and start over'
            ],
            correct: 2,
            explanation: 'Satisfaction ratings are Ordinal variables - they have a meaningful order but the intervals aren\'t necessarily equal. While you can compute means on Likert scales, it\'s more appropriate to treat them as ordinal for most analyses.'
          }
        ],
        outputInterpretation: [
          {
            id: 'output-variable-setup',
            question: 'Look at this variable setup in Jamovi. The variable is Height. Is the measurement level set correctly? What should it be?',
            image: '/images/selfcheck/jamovi/jamovi-variable-setup.png',
            placeholder: 'Describe whether the setting is correct and what it should be (e.g. nominal is incorrect, should be continuous)...',
            hint: 'Height is a numeric measure with meaningful differences and ratios. What measurement level fits that?',
            requiredKeywords: [
              'continuous', 'scale', 'interval', 'ratio', 'numeric',
              'height',
              'nominal', 'incorrect', 'wrong', 'should be', 'should not', 'shouldn\'t', 'not correct', 'not nominal', 'mistake'
            ],
            minRequiredKeywords: 2,
            feedback: 'Nominal is incorrect for Height. Height is a continuous (scale) variable because it has meaningful numeric differences and ratios. The measurement level should be set to Continuous.'
          }
        ]
      },

      // APPLY PHASE - References exercises from statisticsPractices.js
      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        summary: 'In this Apply phase, you will independently complete hands-on exercises that reinforce the fundamentals you learned. You\'ll practice installing Jamovi (if needed), navigating the interface confidently, importing data files, setting variable types correctly, creating computed variables, and using filters. These exercises build on the Learn and Practice phases and help you become comfortable working with Jamovi on your own. Each exercise has detailed instructions and a hint button if you get stuck.',
        instructions: 'Complete these hands-on exercises independently. Each exercise has step-by-step instructions and a hint button if you need help. Work through them in order, and mark each as complete when you\'ve finished. You can use the recording tools to document your work if needed.'
        // Exercises are pulled from statisticsPractices.js based on module='module-3' and software='jamovi'
      }
    }
  },

  // ============ SPSS - Module 3 Unified Lesson ============
  {
    id: 'spss-module-3-unified',
    module: 'stats-module-3',
    title: 'SPSS Software Fundamentals',
    software: 'spss',
    objectives: [
      'Identify the Data View and Variable View tabs',
      'Locate the Output window and Syntax editor',
      'Import CSV and Excel files into SPSS',
      'Set variable types and measurement levels',
      'Apply variable and value labels'
    ],
    estimatedTime: 35, // Total: 15+20
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn SPSS Basics',
        sections: [
          {
            id: 'interface',
            title: 'Getting to Know the SPSS Interface',
            objectives: [
              'Identify the Data View and Variable View tabs',
              'Locate the Output window and Syntax editor',
              'Run a simple command from the menus'
            ],
            estimatedTime: 15,
            content: [
              {
                type: 'text',
                content: 'SPSS has three core areas: the Data Editor (Data View and Variable View), the Output window, and the Syntax editor.'
              },
              {
                type: 'annotated_image',
                image: '/images/lessons/spss/spss-interface-overview.png',
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
          {
            id: 'import-data',
            title: 'Importing Data and Defining Variables in SPSS',
            objectives: [
              'Import a CSV or Excel file',
              'Set variable types and measurement levels',
              'Apply variable and value labels'
            ],
            estimatedTime: 20,
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
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: SPSS Fundamentals',
        instructions: 'Follow these step-by-step exercises in SPSS. Each step has an instruction, a hint if you get stuck, and a checkpoint so you know when you\'ve done it correctly.',
        steps: [
          {
            instruction: 'Open SPSS and create a new blank dataset. Go to the menu bar and choose File > New > Data. This opens a blank Data Editor so you can define variables and enter data.',
            hint: 'If SPSS is already open with a previous dataset, use File > New > Data to start fresh. You should see a grid with rows and columns; the columns are initially named var00001, var00002, and so on.',
            checkpoint: 'The Data Editor is open in Data View. You see a grid where each column is a variable and each row will be a case (e.g., one person). The left side shows row numbers; the top shows column headers.'
          },
          {
            instruction: 'Switch to Variable View. At the bottom of the Data Editor window you will see two tabs: "Data View" and "Variable View". Click the "Variable View" tab. Here you define variable names, types, labels, and measurement levels instead of typing data.',
            hint: 'The Variable View tab is in the same window as the data grid, at the bottom. In Variable View, each row is one variable (one column from Data View). You will see columns like Name, Type, Width, Decimals, Label, Values, Missing, and Measure.',
            checkpoint: 'You are now in Variable View. Each row corresponds to a variable. You can see columns for Name, Type, Label, and Measure. This is where you will set variable types and measurement levels.'
          },
          {
            instruction: 'Return to Data View and enter a few numbers. Click the "Data View" tab. In the first column (under var00001), type 70 in the first row, 82 in the second, and 95 in the third. You can double-click the column header in Variable View first to rename this variable to "Score" if you like.',
            hint: 'In Data View, click the first cell of the first column and type 70, then press Enter and type 82, then 95. To name the column "Score", switch to Variable View, click the Name cell for the first variable, and type Score.',
            checkpoint: 'You have at least three numbers (e.g., 70, 82, 95) in one column. The column may be named var00001 or Score. You have practiced entering numeric data in Data View.'
          },
          {
            instruction: 'Open the Frequencies dialog and paste to Syntax. Go to the menu: Analyze > Descriptive Statistics > Frequencies. In the dialog, you can move a variable into the Variable(s) box, then click "Paste" (not OK). This writes the command to a Syntax window so you can run or edit it later.',
            hint: 'Paste sends the command to the Syntax Editor instead of running it immediately. After clicking Paste, a Syntax window opens with a line like FREQUENCIES VARIABLES=Score. You can run it from the Syntax window with Run > All.',
            checkpoint: 'A Syntax window is open and contains a FREQUENCIES (or similar) command. You have seen how menu actions can be pasted to Syntax for reproducibility.'
          },
          {
            instruction: 'Import a CSV file. Use File > Open > Data. In the file dialog, set "Files of type" to CSV (*.csv) or "All Files" so your CSV appears. Select your file and click Open. Follow any import wizard steps (e.g., delimiter, encoding) if they appear.',
            hint: 'If your CSV does not show up, change the file type dropdown to "CSV (*.csv)" or "All Files (*.*)". After opening, check Data View to confirm your variables and values loaded correctly.',
            checkpoint: 'Your CSV data appears in the Data Editor. Variables appear as columns and cases as rows. You can switch to Variable View to see or edit variable names and types.'
          },
          {
            instruction: 'In Variable View, check the Type for each variable. Click each cell in the "Type" column. Numeric is for numbers; String is for text. If a column that should be numeric was read as string (e.g., because of a header), change it to Numeric and ensure decimal places are set as needed.',
            hint: 'Click the Type cell for a variable; a dialog opens. Choose "Numeric" for quantitative data and "String" for text (e.g., IDs or labels). Set width and decimals as appropriate for numeric variables.',
            checkpoint: 'Every variable has a Type set (Numeric or String). Variables that hold numbers are Numeric; variables that hold text only are String.'
          },
          {
            instruction: 'Set the Measure (measurement level) for each variable. In Variable View, click the "Measure" column for each variable. Choose Scale for continuous numeric variables (e.g., score, age), Ordinal for ordered categories (e.g., Likert scale), and Nominal for unordered categories (e.g., group name, gender).',
            hint: 'Scale = interval/ratio (numeric with meaningful differences). Ordinal = ordered categories (e.g., 1=Low, 2=Medium, 3=High). Nominal = unordered categories (e.g., group A, B, C). This affects which analyses SPSS will allow and how results are labeled.',
            checkpoint: 'The Measure column is filled in for all variables. Scale is used for continuous measures, Ordinal for ordered categories, and Nominal for unordered categories.'
          },
          {
            instruction: 'Add a Variable Label for at least one variable. In Variable View, click the "Label" cell for a variable and type a longer description (e.g., "Total score on the quiz"). Labels appear in output tables and charts and help others understand your variables.',
            hint: 'The Label column is for a human-readable description. For example, for a variable named "totscore" you might add the label "Total quiz score (0–100)".',
            checkpoint: 'At least one variable has a label in the Label column. When you run analyses, this label can appear in the output instead of (or in addition to) the short variable name.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [],
        outputInterpretation: []
      },
      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        summary: 'In this Apply phase, you will independently complete exercises that reinforce SPSS fundamentals. You\'ll practice creating new datasets, navigating between Data View and Variable View, importing CSV files, setting variable types (Numeric vs String) and measurement levels (Nominal, Ordinal, Scale), adding variable labels, and using the Syntax editor. These exercises help you become comfortable with SPSS data management on your own. Each exercise has detailed instructions and a hint button if you get stuck.',
        instructions: 'Complete these hands-on exercises independently. Each exercise has step-by-step instructions and a hint button if you need help. Work through them in order, and mark each as complete when you\'ve finished. You can use the recording tools to document your work if needed.'
      }
    }
  },

  // ============ R - Module 3 Unified Lesson ============
  {
    id: 'r-module-3-unified',
    module: 'stats-module-3',
    title: 'R and RStudio Fundamentals',
    software: 'r',
    objectives: [
      'Identify the four main RStudio panes',
      'Run commands in the Console and from a script',
      'Locate objects in the Environment',
      'Import CSV files with read.csv()',
      'Check data structure with str() and head()',
      'Summarize variables with summary()'
    ],
    estimatedTime: 35, // Total: 15+20
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn R Basics',
        sections: [
          {
            id: 'rstudio-basics',
            title: 'Getting Started with RStudio',
            objectives: [
              'Identify the four main RStudio panes',
              'Run commands in the Console and from a script',
              'Locate objects in the Environment'
            ],
            estimatedTime: 15,
            content: [
              {
                type: 'text',
                content: 'RStudio is an IDE that makes working with R easier. The interface is divided into four main panes.'
              },
              {
                type: 'annotated_image',
                image: '/images/lessons/r/rstudio-overview.png',
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
          {
            id: 'import-data',
            title: 'Importing Data and Inspecting Data Frames',
            objectives: [
              'Import a CSV file with read.csv()',
              'Check data structure with str() and head()',
              'Summarize variables with summary()'
            ],
            estimatedTime: 20,
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
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: R Fundamentals',
        instructions: 'Follow these step-by-step exercises in RStudio. Each step has an instruction, a hint if you get stuck, and a checkpoint so you know when you\'ve done it correctly.',
        steps: [
          {
            instruction: 'Open RStudio and locate the Console pane. The Console is where you type R commands and see results. It is usually in the lower-left corner and shows a prompt like > where you type.',
            hint: 'If you have a default layout, the Console is at the bottom-left. You may also see panes for Environment/History, Files, Plots, and a Source (script) editor. The Console is where you run commands interactively.',
            checkpoint: 'You can see the Console and a prompt (>) at which you can type. Anything you type and run will execute in R.'
          },
          {
            instruction: 'Type 2 + 2 in the Console and press Enter. R will evaluate the expression and print the result. This confirms that R is working and shows you how output appears (e.g., [1] 4).',
            hint: 'Click in the Console, type 2 + 2 (no quotes), and press Enter. The result [1] 4 should appear on the next line. [1] means "first element"; for a single number it\'s just 4.',
            checkpoint: 'After pressing Enter, you see the result [1] 4 (or 4). You have run your first R command successfully.'
          },
          {
            instruction: 'Create a new R script so you can save and re-run commands. Go to File > New File > R Script. A new tab opens in the Source pane (usually top-left) where you can type multiple lines of code.',
            hint: 'The script editor lets you write code in a file instead of only in the Console. You can save the file (e.g., as script.R) and run lines with Ctrl+Enter (Windows/Linux) or Cmd+Enter (Mac).',
            checkpoint: 'A new script tab is open (often named Untitled1). You can type code there and run it by placing the cursor on a line and pressing Ctrl+Enter (or Cmd+Enter on Mac).'
          },
          {
            instruction: 'In the script, type x <- 10 and run that line (Ctrl+Enter or Cmd+Enter). This assigns the value 10 to the object x. The command runs in the Console, and x appears in the Environment pane (usually top-right) showing that R has stored it.',
            hint: 'The arrow <- is the assignment operator. After running x <- 10, type x in the Console and press Enter to see 10. In the Environment pane you should see x with value 10.',
            checkpoint: 'After running x <- 10, the Environment pane lists x = 10 (or similar). You have created and stored an object in R.'
          },
          {
            instruction: 'Set your working directory to the folder that contains your CSV file. Use the menu: Session > Set Working Directory > Choose Directory, then select the folder. You can confirm the path by typing getwd() in the Console and pressing Enter.',
            hint: 'The working directory is where R looks for files when you use a file name without a full path. After choosing the directory, getwd() prints the path so you can verify it.',
            checkpoint: 'getwd() prints the path to your current working directory, and it matches the folder where your data file (e.g., data.csv) is located.'
          },
          {
            instruction: 'Import your CSV file into R. In the Console or your script, type: data <- read.csv("data.csv") (replace "data.csv" with your actual file name). Press Enter. The data are stored in the object "data" and should appear in the Environment pane as a data frame.',
            hint: 'If the file is in your working directory, use read.csv("filename.csv"). If you get "cannot open file", check the file name and that you set the working directory correctly. Use quotes around the file name.',
            checkpoint: 'The Environment pane shows an object named data (or whatever you called it) with dimensions like 50 obs. of 5 variables. You have successfully imported a CSV into R.'
          },
          {
            instruction: 'Run head(data) to view the first few rows of the dataset. Type head(data) in the Console (or script) and press Enter. This prints the first 6 rows so you can confirm the import and column names.',
            hint: 'head() is useful for a quick look at the structure and values. You can also use head(data, 10) to see the first 10 rows. This helps you verify that columns and values look correct.',
            checkpoint: 'head(data) prints the first 6 rows (and column names) of your dataset. You can see that the file imported correctly and recognize the variables.'
          },
          {
            instruction: 'Run str(data) to check the structure and variable types of your dataset. Type str(data) and press Enter. The output shows each variable (column) and its type: num (numeric), chr (character), Factor (categorical), etc.',
            hint: 'str() stands for "structure". It lists variable names and types. Numeric variables show as num; text as chr; categorical variables may show as Factor with levels. Use this to confirm types before analysis.',
            checkpoint: 'str(data) has run and you can see the type of each variable (e.g., num, chr, Factor). You know which columns are numeric and which are character or factor.'
          },
          {
            instruction: 'Run summary(data) to get quick descriptive statistics. Type summary(data) and press Enter. For numeric variables you will see Min, 1st Qu, Median, Mean, 3rd Qu, and Max; for factors you will see counts per level.',
            hint: 'summary() gives a quick overview: min/max/quartiles for numbers and counts for categories. Use it to spot missing values (NA) and to confirm that numeric ranges look reasonable.',
            checkpoint: 'summary(data) has run. You see summary statistics for numeric variables and (if any) counts for factor variables. You have used R to get a quick overview of your data.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [],
        outputInterpretation: []
      },
      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        summary: 'In this Apply phase, you will independently complete exercises that reinforce R and RStudio fundamentals. You\'ll practice installing R and RStudio (if needed), using the Console and script editor, setting your working directory, importing CSV files with read.csv(), creating computed variables, and using functions like head(), str(), and summary() to inspect data. These exercises help you become comfortable with R data management on your own. Each exercise has detailed instructions and a hint button if you get stuck.',
        instructions: 'Complete these hands-on exercises independently. Each exercise has step-by-step instructions and a hint button if you need help. Work through them in order, and mark each as complete when you\'ve finished. You can use the recording tools to document your work if needed.'
      }
    }
  },

  // ============ Excel - Module 3 Unified Lesson ============
  {
    id: 'excel-module-3-unified',
    module: 'stats-module-3',
    title: 'Excel Software Fundamentals',
    software: 'excel',
    objectives: [
      'Identify key worksheet elements (rows, columns, cells)',
      'Enter data in a clean, rectangular format',
      'Use simple formulas to check values',
      'Import CSV files into Excel',
      'Check for blank rows/columns',
      'Set clear, consistent variable names'
    ],
    estimatedTime: 35, // Total: 15+20
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn Excel Basics',
        sections: [
          {
            id: 'interface',
            title: 'Getting Started with Excel for Data',
            objectives: [
              'Identify key worksheet elements (rows, columns, cells)',
              'Enter data in a clean, rectangular format',
              'Use simple formulas to check values'
            ],
            estimatedTime: 15,
            content: [
              {
                type: 'text',
                content: 'In Excel, each dataset should be a clean rectangle: one row per case and one column per variable.'
              },
              {
                type: 'annotated_image',
                image: '/images/lessons/excel/excel-interface-overview.png',
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
          {
            id: 'import-clean',
            title: 'Importing and Cleaning Data in Excel',
            objectives: [
              'Import a CSV file into Excel',
              'Check for blank rows/columns',
              'Set clear, consistent variable names'
            ],
            estimatedTime: 20,
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
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: Excel Fundamentals',
        instructions: 'Follow these step-by-step exercises in Excel. Each step has an instruction, a hint if you get stuck, and a checkpoint so you know when you\'ve done it correctly.',
        steps: [
          {
            instruction: 'Create a new workbook and enter column headers in row 1. In cell A1 type ID, in B1 type Score, and in C1 type Group. These headers describe what each column contains and help you and others understand the data.',
            hint: 'Click cell A1, type ID, press Tab to move to B1, type Score, press Tab, type Group. Row 1 should now contain your three variable names. You can bold the header row (Home > Bold) to distinguish it from data.',
            checkpoint: 'Row 1 contains the three headers: ID in A1, Score in B1, and Group in C1. The first row clearly labels your columns.'
          },
          {
            instruction: 'Enter 5 rows of data beneath the headers. In column A (ID) enter 1, 2, 3, 4, 5. In column B (Score) enter five numbers (e.g., 70, 82, 95, 88, 76). In column C (Group) enter a label for each row (e.g., A, A, B, B, B). Keep the data in a solid block with no blank rows or columns in the middle.',
            hint: 'Start in A2 and type 1, then 2, 3, 4, 5 down the column. In B2–B6 enter your scores. In C2–C6 enter group labels. Avoid leaving empty rows or columns inside this block so the data stay rectangular.',
            checkpoint: 'You have five rows of data (rows 2–6) under the headers. There are no blank rows or columns within the data block. The dataset is a clean rectangle.'
          },
          {
            instruction: 'Use a formula to compute the mean of the Score column. In an empty cell below your data (e.g., B7), type =AVERAGE(B2:B6) and press Enter. Excel will calculate the average of the five scores. This is a quick way to check that your data and formula work.',
            hint: 'The formula =AVERAGE(B2:B6) adds the values in cells B2 through B6 and divides by 5. If your scores are in different cells, adjust the range (e.g., B2:B10 for 9 scores). Always start with =.',
            checkpoint: 'You see a single number (the mean of your scores) in the cell where you entered the formula. The formula bar shows =AVERAGE(B2:B6) (or your range).'
          },
          {
            instruction: 'Open a CSV file in Excel. Use File > Open (or File > Open > Browse) and navigate to your CSV file. Select it and click Open. If a dialog appears (e.g., delimiter, encoding), choose the options that make the data line up correctly in columns.',
            hint: 'CSV files are "Comma delimited." If the import wizard appears, you can leave defaults or choose "Delimited" and "Comma." Your data should appear with one variable per column and one case per row.',
            checkpoint: 'The CSV data are now in the workbook. Each column is a variable and each row is a case. Column boundaries and values look correct (no merged or split columns).'
          },
          {
            instruction: 'Check for blank rows or columns inside the dataset. Scroll through the data and look for any completely empty row or column between your header and the last row of data. If you find any, delete those rows or columns so the data form one continuous block. This avoids errors when sorting, filtering, or analyzing the data.',
            hint: 'Select an empty row (click the row number), right-click, and choose Delete. Do the same for empty columns. The goal is a rectangle of data from the top-left cell to the bottom-right, with no gaps.',
            checkpoint: 'There are no blank rows or columns within the data. From the first data row to the last, and from the first to the last column, the block is continuous.'
          },
          {
            instruction: 'Rename headers to short, consistent names if needed. Use names that are easy to type and remember: lowercase is fine (e.g., score, group), and you can use underscores for multi-word names (e.g., total_score). Avoid spaces or special characters in headers if you might use the data in other software later.',
            hint: 'Click the header cell and type the new name. Good habits: short names, consistent style (all lowercase or all Title Case), no spaces (use underscore instead). For example: id, score, group.',
            checkpoint: 'All column headers are short, consistent, and easy to read (e.g., id, score, group). They clearly identify each variable.'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [],
        outputInterpretation: []
      },
      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        summary: 'In this Apply phase, you will independently complete exercises that reinforce Excel fundamentals. You\'ll practice creating clean datasets with proper headers, entering data in a rectangular format, using formulas like =AVERAGE() to verify data, importing CSV files, checking for and removing blank rows/columns, and ensuring consistent naming conventions. These exercises help you become comfortable managing data in Excel on your own. Each exercise has detailed instructions and a hint button if you get stuck.',
        instructions: 'Complete these hands-on exercises independently. Each exercise has step-by-step instructions and a hint button if you need help. Work through them in order, and mark each as complete when you\'ve finished. You can use the recording tools to document your work if needed.'
      }
    }
  },

  // ============ Stata - Module 3 Unified Lesson ============
  {
    id: 'stata-module-3-unified',
    module: 'stats-module-3',
    title: 'Stata Software Fundamentals',
    software: 'stata',
    objectives: [
      'Identify the Command window and Results window',
      'Understand the Variables and Properties panes',
      'Run basic commands',
      'Import CSV files with import delimited',
      'Inspect variables with describe and codebook',
      'Save Stata datasets'
    ],
    estimatedTime: 35, // Total: 15+20
    phases: {
      iDo: {
        type: 'multi_section',
        title: 'Learn Stata Basics',
        sections: [
          {
            id: 'interface',
            title: 'Getting Started with Stata',
            objectives: [
              'Identify the Command window and Results window',
              'Understand the Variables and Properties panes',
              'Run a basic command'
            ],
            estimatedTime: 15,
            content: [
              {
                type: 'text',
                content: 'Stata has a Command window for typing commands and a Results window that shows output.'
              },
              {
                type: 'annotated_image',
                image: '/images/lessons/stata/stata-interface-overview.png',
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
          {
            id: 'import-data',
            title: 'Importing Data in Stata',
            objectives: [
              'Import a CSV with import delimited',
              'Inspect variables with describe and codebook',
              'Save a Stata dataset'
            ],
            estimatedTime: 20,
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
          }
        ]
      },
      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: Stata Fundamentals',
        instructions: 'Follow these step-by-step exercises in Stata. Each step has an instruction, a hint if you get stuck, and a checkpoint so you know when you\'ve done it correctly.',
        steps: [
          {
            instruction: 'Open Stata and load the sample "auto" dataset. In the Command window at the bottom, type: sysuse auto and press Enter. This loads Stata\'s built-in auto dataset into memory so you can practice commands without your own file.',
            hint: 'The Command window is where you type Stata commands. sysuse loads a dataset that comes with Stata. After running it, the Results window shows a message that the data were loaded, and the Variables pane lists the variables (e.g., make, price, mpg).',
            checkpoint: 'The auto dataset is loaded. The Variables pane (often on the left) lists variables such as make, price, mpg, and weight. The Data Editor (if opened) shows the rows of the dataset.'
          },
          {
            instruction: 'Run the describe command to see variable names and types. In the Command window type: describe and press Enter. The Results window will list every variable in the dataset, its storage type (e.g., int, float, str), and optionally labels. This is how you check what is in the dataset.',
            hint: 'describe (or abbreviate as des) gives a compact overview of all variables. You see name, type (int/float for numbers, str for text), and format. Use this before running analyses to confirm variable names and types.',
            checkpoint: 'The Results window shows a table of all variables with their names and types. You can see which variables are numeric (int, float) and which are string (str).'
          },
          {
            instruction: 'Run summarize for two variables: price and mpg. Type: summarize price mpg and press Enter. Stata will report the number of observations, mean, standard deviation, and min/max for each variable. This is the basic way to get descriptive statistics in Stata.',
            hint: 'summarize (or sum) can be followed by variable names. If you type summarize without names, Stata summarizes all variables. For price and mpg you should see N, mean, SD, min, and max for each.',
            checkpoint: 'The Results window shows summary statistics for price and mpg: N (e.g., 74), mean, SD, min, max. You have run your first descriptive command in Stata.'
          },
          {
            instruction: 'Import your own CSV file. Type: import delimited using "data.csv", clear (replace "data.csv" with your file name and path if needed). The "clear" option replaces the current data in memory. After the command runs, the Variables pane and Data Editor reflect your imported data.',
            hint: 'If the file is not in Stata\'s working directory, use the full path in quotes, e.g. "C:/Users/You/data.csv". import delimited is for CSV and other delimited text files. After import, run describe to see variable names and types.',
            checkpoint: 'Your CSV has been imported. The Variables pane lists the variables from your file, and the Data Editor (Data > Data Editor) shows the rows. describe confirms the variable list.'
          },
          {
            instruction: 'Run describe again to check variable types for your imported data. Type: describe and press Enter. Check that numeric variables show as int or float and text variables as str. If a variable that should be numeric is str (e.g., because of headers or commas), you may need to destring or use import options.',
            hint: 'Numeric variables should be int or float; string variables are str. If you see str where you expect numbers, check for non-numeric characters (e.g., commas in numbers, or a header row imported as data) and fix the import or use destring.',
            checkpoint: 'describe output shows that each variable has the expected type (numeric variables as int/float, text as str). You are ready to run analyses on correctly typed variables.'
          },
          {
            instruction: 'Run codebook on one categorical (or any) variable to see value labels and distribution. Type: codebook group (replace "group" with a variable name in your dataset) and press Enter. Codebook shows the variable\'s type, labels, and a summary of values, useful for categorical or coded variables.',
            hint: 'codebook is especially helpful for variables with value labels (e.g., 1 = "Male", 2 = "Female"). It shows how many times each value occurs. Use it to verify that categorical variables are coded and labeled as you expect.',
            checkpoint: 'codebook has run and the Results window shows details for that variable (type, unique values, and possibly value labels and frequencies). You have inspected a variable in detail.'
          },
          {
            instruction: 'Save the dataset in Stata format so you can reopen it later. Type: save "data_clean.dta", replace (use a path and filename that make sense for you). The "replace" option overwrites the file if it already exists. Stata will confirm that the file was saved.',
            hint: 'Stata datasets use the .dta extension. Saving in .dta format keeps variable names, types, and labels. Use a name that indicates the cleaned version (e.g., data_clean.dta). You can open it later with use "data_clean.dta".',
            checkpoint: 'Stata has printed a message that the file was saved (e.g., "file data_clean.dta saved"). You can close Stata and reopen this file later with use "data_clean.dta".'
          }
        ]
      },
      selfCheck: {
        screenshotRecognition: [],
        errorDiagnostic: [],
        outputInterpretation: []
      },
      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        summary: 'In this Apply phase, you will independently complete exercises that reinforce Stata fundamentals. You\'ll practice using the Command window to run commands, loading sample datasets with sysuse, inspecting variables with describe and codebook, getting descriptive statistics with summarize, importing CSV files with import delimited, checking variable types, and saving datasets as .dta files. These exercises help you become comfortable with Stata data management on your own. Each exercise has detailed instructions and a hint button if you get stuck.',
        instructions: 'Complete these hands-on exercises independently. Each exercise has step-by-step instructions and a hint button if you need help. Work through them in order, and mark each as complete when you\'ve finished. You can use the recording tools to document your work if needed.'
      }
    }
  }
]
