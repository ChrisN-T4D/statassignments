// Software Lessons - Unified Module Structure
// Each module has ONE lesson with 4 phases: Learn (iDo), Practice (weDo), Self-Check, Apply (youDo)
// Multiple demonstrations/topics are subsections within the Learn phase

/*
New Unified Lesson Structure:
- id: module-based identifier (e.g., 'jamovi-module-3')
- module: which module this belongs to
- title: overall module lesson title
- software: 'jamovi' | 'spss' | 'r' | 'excel'
- objectives: comprehensive objectives for the entire module
- estimatedTime: total time in minutes
- phases:
  - iDo (Learn): Multiple sections/demonstrations
    - sections: Array of demonstration topics (former individual lessons)
  - weDo (Practice): Guided practice exercises (combined from all lessons)
  - selfCheck: Skill verification (combined from all lessons)
  - youDo (Apply): Independent practice (combined from all lessons)
*/

export const softwareLessons = [
  // ============ STATISTICS MODULE 3: Jamovi Basics ============
  {
    id: 'jamovi-module-3',
    module: 'stats-module-3',
    title: 'Jamovi Software Fundamentals',
    software: 'jamovi',
    objectives: [
      'Install and launch Jamovi on your device',
      'Navigate the Jamovi interface confidently',
      'Import and manage data in Jamovi',
      'Calculate descriptive statistics',
      'Create and interpret visualizations',
      'Understand variable types and data management'
    ],
    estimatedTime: 180,  // Total time for all sections
    phases: {
      // LEARN PHASE - Multiple demonstration sections
      iDo: {
        type: 'multi_section',
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
                type: 'text',
                content: '<h3>📱 Installation for Windows & Mac</h3><p>Installing Jamovi on Windows or Mac is straightforward:</p><ol><li>Visit <strong>jamovi.org</strong></li><li>Click <strong>"Download"</strong> at the top</li><li>Choose your operating system (Windows or macOS)</li><li>Run the downloaded installer and follow the prompts</li><li>Launch Jamovi from your Applications or Start Menu</li></ol>'
              }
              // ... rest of installation content
            ]
          },

          // SECTION 2: Interface Overview (from jamovi-intro-interface lesson)
          {
            id: 'interface',
            title: 'Navigating the Jamovi Interface',
            objectives: [
              'Identify and locate key components of the Jamovi interface',
              'Understand the purpose of the Data tab, Analyses tab, and Results panel',
              'Navigate between different views and panels in Jamovi'
            ],
            estimatedTime: 15,
            content: [
              {
                type: 'text',
                content: '<h2>Understanding the Jamovi Workspace</h2><p>When you first open Jamovi, you\'ll see a clean, organized interface divided into several key areas. Understanding these components will help you work efficiently.</p>'
              }
              // ... rest of interface content
            ]
          },

          // SECTION 3: Data Import (from jamovi-data-import lesson)
          {
            id: 'data-import',
            title: 'Importing and Opening Data Files',
            objectives: [
              'Import CSV, Excel, and SPSS files into Jamovi',
              'Save and open Jamovi (.omv) files',
              'Troubleshoot common data import issues'
            ],
            estimatedTime: 20,
            content: []
          }

          // ... more sections for other lessons in Module 3
        ]
      },

      // PRACTICE PHASE - Combined guided exercises from all lessons
      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: Jamovi Fundamentals',
        instructions: 'Follow along with these step-by-step exercises to practice what you\'ve learned. Click through each step and complete the checkpoint to verify your understanding.',
        steps: [
          // Combined steps from all jamovi-module-3 lessons' weDo phases
          {
            instruction: 'Open Jamovi and familiarize yourself with the interface layout',
            hint: 'Look for the Data tab, Analyses tab, and Results panel',
            checkpoint: 'Can you identify where statistical results appear?'
          },
          {
            instruction: 'Create a new Jamovi file and import sample data',
            hint: 'Use File → Open to import CSV or Excel files',
            checkpoint: 'Your data should appear in the spreadsheet view'
          }
          // ... more combined practice steps
        ]
      },

      // SELF-CHECK PHASE - Combined verification exercises
      selfCheck: {
        screenshotRecognition: [
          // Combined from all lessons in module
          {
            id: 'screenshot-1',
            question: 'What part of the Jamovi interface is highlighted in this screenshot?',
            image: '/images/selfcheck/jamovi/jamovi-results-panel.png',
            options: ['Data tab toolbar', 'Results panel', 'Variables list', 'Status bar'],
            correct: 1,
            explanation: 'The Results panel is on the right side of Jamovi and displays all statistical output.'
          }
          // ... more combined screenshot questions
        ],
        errorDiagnostic: [
          // Combined from all lessons
        ],
        outputInterpretation: [
          // Combined from all lessons with short answer grading
          {
            id: 'output-1',
            question: 'Examine this descriptive statistics output from Jamovi. Describe what the results tell you about the variability and distribution of the data.',
            image: '/images/selfcheck/jamovi/jamovi-descriptives-output1.png',
            placeholder: 'Describe what the statistics (N, Mean, SD, Min, Max) reveal about the data...',
            hint: 'Consider the range and standard deviation when discussing variability.',
            requiredKeywords: [
              'variability', 'variation', 'spread', 'range', 'standard deviation', 'sd', 'std dev',
              'mean', 'average', 'center', 'distribution', 'scores', 'data', 'moderate', 'dispersion'
            ],
            minRequiredKeywords: 3,
            feedback: 'With N=50, Mean=75, SD=10, Min=50, and Max=100: The data shows moderate variability with a 50-point range. The SD of 10 indicates scores typically vary about 10 points from the mean.'
          }
        ]
      },

      // APPLY PHASE - Combined independent practice
      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        instructions: 'Complete these exercises independently to demonstrate your mastery of Jamovi fundamentals.'
        // Exercises are pulled from statisticsPractices.js based on module and software
      }
    }
  },

  // ============ STATISTICS MODULE 4: Additional modules follow same pattern ============
  {
    id: 'jamovi-module-4',
    module: 'stats-module-4',
    title: 'Correlation and Regression in Jamovi',
    software: 'jamovi',
    phases: {
      iDo: {
        type: 'multi_section',
        sections: []  // Combined lesson sections for module 4
      },
      weDo: {},
      selfCheck: {},
      youDo: {}
    }
  }
]

// Helper function to get lesson by module
export function getLessonByModule(moduleId) {
  return softwareLessons.find(lesson => lesson.module === moduleId)
}

// Helper function to get lesson by ID
export function getLessonById(lessonId) {
  return softwareLessons.find(lesson => lesson.id === lessonId)
}

// Helper function to get lessons by software
export function getLessonsBySoftware(software) {
  return softwareLessons.filter(lesson => lesson.software === software)
}

// Helper function to get all modules with lessons
export function getModulesWithLessons(software = null) {
  const lessons = software
    ? softwareLessons.filter(l => l.software === software)
    : softwareLessons

  return [...new Set(lessons.map(l => l.module))]
}
