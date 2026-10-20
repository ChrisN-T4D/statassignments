/**
 * Assignment Help: PSYC 5033 Introduction to Research (Canvas / NWOSU)
 * Individual research-proposal sequence. Chapters come from the shared Pressbooks text
 * (Research Methods in Psychology, 4th ed.) used by Research Methods.
 * Due dates and points live in Canvas only, not in this file.
 */

const OFFICE = 'Office hours are by appointment: email your instructor to set a time (in person, phone, or online).'

export const assignmentHelpIntroResearch = [
  {
    canvasPart: 'Part 1',
    moduleTitle: 'Getting started',
    phaseLabel: 'Course onboarding',
    assignments: [
      {
        id: 'ir-syllabus-ack',
        name: 'Syllabus Acknowledgement',
        type: 'assignment',
        tips: [
          'Complete this first: no other work is graded until it is on file.',
          'Note which track you are on (Thesis, Capstone, or Counseling Project); it sets your final proposal length.'
        ],
        practiceLinks: ['rm-chapter-1'],
        getHelp: OFFICE
      },
      {
        id: 'ir-intro-discussion',
        name: 'Introduction Discussion',
        type: 'assignment',
        tips: [
          'Cover your academic and professional goals, relevant research or clinical experience, and what you want from this course as you prepare for thesis or capstone.',
          'Reply to classmates: it is how you find people with overlapping interests.'
        ],
        getHelp: OFFICE
      },
      {
        id: 'ir-ai-quiz',
        name: 'AI Quiz',
        type: 'assignment',
        tips: [
          'Read the AI policy in the syllabus first: brainstorming, organizing, and basic proofreading are allowed; generating whole assignments is not.',
          'When unsure whether a use is acceptable, ask before you submit.'
        ],
        getHelp: OFFICE
      },
      {
        id: 'ir-apa-quiz',
        name: 'APA Quiz',
        type: 'assignment',
        tips: [
          'Review citation format, paraphrasing, and how to avoid plagiarism.',
          'Chapter 11 covers presenting research in APA style.'
        ],
        practiceLinks: ['rm-chapter-11'],
        getHelp: OFFICE
      }
    ]
  },
  {
    canvasPart: 'Part 2',
    moduleTitle: 'Topic, question, and literature',
    phaseLabel: 'Choose and ground your project',
    assignments: [
      {
        id: 'ir-article-critique',
        name: 'Article Critique',
        type: 'assignment',
        tips: [
          'Pick a peer-reviewed article close to your interest area; 2-3 pages in APA format.',
          'Evaluate purpose, methodology, results, and implications, not just what the authors found.',
          'Chapter 2 walks through the parts of a study; use it as your checklist.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-11'],
        getHelp: OFFICE
      },
      {
        id: 'ir-interest-statement',
        name: 'Research Interest Statement',
        type: 'assignment',
        tips: [
          '1-2 pages: your goals, the areas that interest you, and possible directions for your project.',
          'It is a starting point, not a commitment, but it should connect to a topic you can actually find literature on.'
        ],
        practiceLinks: ['rm-chapter-2'],
        getHelp: OFFICE
      },
      {
        id: 'ir-question-hypotheses',
        name: 'Research Question and Hypotheses',
        type: 'assignment',
        tips: [
          '1-2 pages: one or more research questions and the hypotheses that go with them.',
          'Justify each choice with the literature, not intuition.',
          'A good question is specific and testable; Chapter 2 covers moving from topic to hypothesis.'
        ],
        practiceLinks: ['rm-chapter-2'],
        getHelp: OFFICE
      },
      {
        id: 'ir-annotated-bibliography',
        name: 'Annotated Bibliography',
        type: 'assignment',
        tips: [
          '5-7 scholarly sources. Each annotation summarizes the content, assesses quality, and explains relevance to your project.',
          'Keep your reference list in APA 7 as you go: it becomes your literature review reference list.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-11'],
        getHelp: OFFICE
      },
      {
        id: 'ir-lit-review-draft',
        name: 'Literature Review Draft',
        type: 'assignment',
        tips: [
          '5-7 pages synthesizing at least 10 sources.',
          'Integrate rather than summarize: organize by idea, show where findings agree or conflict, and name the gap your project fills.',
          'This draft becomes the literature review section of your final proposal.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-11'],
        getHelp: OFFICE
      }
    ]
  },
  {
    canvasPart: 'Part 3',
    moduleTitle: 'Methods, ethics, and instruments',
    phaseLabel: 'Design your study',
    assignments: [
      {
        id: 'ir-methods-draft',
        name: 'Methods Draft',
        type: 'assignment',
        tips: [
          '3-5 pages: design, participants, recruitment, instruments, and procedures.',
          'Write it so someone else could carry out your study; the IRB reads it this way.',
          'Match your design to your question: Chapters 4-7 cover measurement, experimental, non-experimental, and survey designs.'
        ],
        practiceLinks: ['rm-chapter-4', 'rm-chapter-5', 'rm-chapter-6', 'rm-chapter-7'],
        getHelp: OFFICE
      },
      {
        id: 'ir-irb-ethics',
        name: 'IRB/Ethics Summary',
        type: 'assignment',
        tips: [
          '2-3 pages on risks, confidentiality, and informed consent in IRB-style language.',
          'You will not submit to the IRB in this course, but write as if you will.',
          'Chapter 3 covers the ethical principles and consent.'
        ],
        practiceLinks: ['rm-chapter-3'],
        getHelp: OFFICE
      },
      {
        id: 'ir-ethics-training',
        name: 'Research Ethics Training and Certificate',
        type: 'assignment',
        tips: [
          'Complete the WHO Research Ethics Online Training (free, self-paced).',
          'Upload the certificate of completion to Canvas; keep a copy for your later thesis or capstone IRB.'
        ],
        practiceLinks: ['rm-chapter-3'],
        getHelp: OFFICE
      },
      {
        id: 'ir-irb-form-edits',
        name: 'IRB Form Edits',
        type: 'assignment',
        tips: [
          'Edit the NWOSU IRB application template so it describes your proposed study, using your methods, ethics, and instruments work.',
          'Use the NWOSU IRB template provided in Canvas; keep its headings and answer every section that applies to your project.',
          'You will not submit to the IRB in this course, but write as if you will: the same text carries into your thesis or capstone application.'
        ],
        practiceLinks: ['rm-chapter-3'],
        getHelp: OFFICE
      },
      {
        id: 'ir-instruments',
        name: 'Instruments/Appendices Draft',
        type: 'assignment',
        tips: [
          'Include sample instruments (survey, interview guide, consent form) and justify why each fits your question.',
          'Chapter 4 covers what makes a measure reliable and valid; Chapter 7 covers survey items.'
        ],
        practiceLinks: ['rm-chapter-4', 'rm-chapter-7'],
        getHelp: OFFICE
      },
      {
        id: 'ir-analysis-plan',
        name: 'Analysis Plan',
        type: 'assignment',
        tips: [
          '2-3 pages plus mock APA-style tables or figures.',
          'Quantitative: name the statistical test for each hypothesis. Qualitative: explain your coding and analysis strategy.',
          'Chapters 12-13 cover descriptive and inferential statistics; the Analyze your data tool shows software steps.'
        ],
        practiceLinks: ['rm-chapter-12', 'rm-chapter-13'],
        getHelp: OFFICE
      }
    ]
  },
  {
    canvasPart: 'Part 4',
    moduleTitle: 'Proposal, presentation, and exams',
    phaseLabel: 'Put it together',
    assignments: [
      {
        id: 'ir-midterm',
        name: 'Midterm Exam',
        type: 'assignment',
        tips: [
          'Online, timed (90 minutes), proctored: use the Testing Center by appointment or Respondus LockDown Browser with Monitor.',
          'Covers research design, ethics, APA writing, and applying course concepts.',
          'Concept Review on the chapters so far is the best practice.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-3', 'rm-chapter-4', 'rm-chapter-5'],
        getHelp: OFFICE
      },
      {
        id: 'ir-draft-proposal',
        name: 'Draft Proposal',
        type: 'assignment',
        tips: [
          '12-20 pages integrating literature review, methods, ethics, and appendices.',
          'Revise the earlier drafts using the feedback you got instead of pasting them in unchanged.',
          'Check that your question, hypotheses, design, and analysis plan all point at each other.'
        ],
        practiceLinks: ['rm-chapter-11'],
        getHelp: OFFICE
      },
      {
        id: 'ir-presentation',
        name: 'Proposal Presentation',
        type: 'assignment',
        tips: [
          'A professional 10-15 minute talk with slides: rationale, literature, methods, and analysis plan.',
          'Practice out loud and time it; the peer review roundtable is a chance to rehearse.'
        ],
        practiceLinks: ['rm-chapter-11'],
        getHelp: OFFICE
      },
      {
        id: 'ir-final-proposal',
        name: 'Final Proposal',
        type: 'assignment',
        tips: [
          'A polished APA manuscript. Length depends on your track: Thesis about 25-30 pages, Capstone about 18-25, Counseling Project about 12-15.',
          'Thesis and Capstone tracks add a draft IRB application (not submitted) if the project is experimental.',
          'Proofread against the final-paper rubric before you submit.'
        ],
        practiceLinks: ['rm-chapter-11'],
        getHelp: OFFICE
      },
      {
        id: 'ir-final-exam',
        name: 'Final Exam',
        type: 'assignment',
        tips: [
          'Online, timed (90 minutes), cumulative, proctored the same way as the midterm.',
          'Expect case scenarios that ask you to apply research principles.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-3', 'rm-chapter-4', 'rm-chapter-5'],
        getHelp: OFFICE
      }
    ]
  }
]
