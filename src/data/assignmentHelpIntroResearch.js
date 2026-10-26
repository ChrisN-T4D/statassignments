/**
 * Assignment Help: PSYC 5033 Introduction to Research (Canvas / NWOSU)
 * Individual research-proposal sequence, in the Research Methods order: read widely and build the literature review first, then
 * narrow the question, then design the study. The study is never carried out, so the literature and methods work goes deeper.
 * No midterm or final exam. Chapters come from the shared Pressbooks text
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
    moduleTitle: 'Topic and literature',
    phaseLabel: 'Read widely, then narrow',
    assignments: [
      {
        id: 'ir-interest-statement',
        name: 'Research Interest Statement',
        type: 'assignment',
        tips: [
          '1-2 pages: your goals, the areas that interest you, and possible directions for your project.',
          'Pick a topic broad enough to read widely in. You narrow it later, after you have seen the literature.',
          'It should connect to a topic you can actually find literature on.'
        ],
        practiceLinks: ['rm-chapter-2'],
        getHelp: OFFICE
      },
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
        id: 'ir-annotated-bibliography',
        name: 'Annotated Bibliography',
        type: 'assignment',
        tips: [
          '5-7 scholarly sources. Each annotation summarizes the content, assesses quality, and explains relevance to your topic.',
          'Keep your reference list in APA 7 as you go: it becomes your literature review reference list.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-11'],
        getHelp: OFFICE
      },
      {
        id: 'ir-theory-selection',
        name: 'Theory Selection',
        type: 'assignment',
        tips: [
          'Name the theories that could frame your topic, based on what you have read so far.',
          'Choose one and say why it fits better than the alternatives.',
          'The theory you choose shapes your question and your measures later, so give it real thought.'
        ],
        practiceLinks: ['rm-chapter-1', 'rm-chapter-2'],
        getHelp: OFFICE
      },
      {
        id: 'ir-lit-outline',
        name: 'Literature Review Outline',
        type: 'assignment',
        tips: [
          'Organize your sources by idea, not article by article.',
          'Under each idea, note where findings agree, where they conflict, and what is missing.',
          'Use the outline to find the gap before you write the draft.'
        ],
        practiceLinks: ['rm-chapter-2'],
        getHelp: OFFICE
      },
      {
        id: 'ir-lit-review-draft',
        name: 'Literature Review Draft',
        type: 'assignment',
        tips: [
          '5-7 pages synthesizing at least 10 sources.',
          'Integrate rather than summarize: organize by idea, show where findings agree or conflict, and name the gap.',
          'This draft can stay broad. Writing it is how you find out what your question should be.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-11'],
        getHelp: OFFICE
      },
      {
        id: 'ir-question-hypotheses',
        name: 'Research Question and Hypotheses',
        type: 'assignment',
        tips: [
          '1-2 pages: one or more research questions and the hypotheses that go with them.',
          'Write them after your literature review draft: use what you found to narrow a broad topic to a specific, testable question.',
          'Justify each choice with the literature, not intuition. Chapter 2 covers moving from topic to hypothesis.'
        ],
        practiceLinks: ['rm-chapter-2'],
        getHelp: OFFICE
      },
      {
        id: 'ir-lit-final',
        name: 'Literature Review Final',
        type: 'assignment',
        tips: [
          'Revise the review around your narrowed question and your chosen theory.',
          'Cut or shorten what no longer serves the question, and add what it now needs.',
          'End by stating the gap your study fills and why it matters.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-11'],
        getHelp: OFFICE
      }
    ]
  },
  {
    canvasPart: 'Part 3',
    moduleTitle: 'Methods, ethics, and analysis',
    phaseLabel: 'Design the study you will not run',
    assignments: [
      {
        id: 'ir-method-choice',
        name: 'Method Choice and Measures',
        type: 'assignment',
        tips: [
          'Choose a quantitative, qualitative, or mixed-methods design and defend it against at least one alternative.',
          'Name a measure or data source for every variable in your hypotheses, and justify its reliability and validity.',
          'Chapters 4-7 cover measurement and the main designs. Because the study will not be carried out, the reasoning is what counts.'
        ],
        practiceLinks: ['rm-chapter-4', 'rm-chapter-5', 'rm-chapter-6', 'rm-chapter-7'],
        getHelp: OFFICE
      },
      {
        id: 'ir-methods-draft',
        name: 'Methods Section',
        type: 'assignment',
        tips: [
          'Describe design, participants, recruitment, and procedures so someone else could carry out your study.',
          'Keep every part consistent with your method choice, measures, and hypotheses.',
          'Include sample instruments and consent materials in the appendices and say why each fits your question.'
        ],
        practiceLinks: ['rm-chapter-3', 'rm-chapter-4', 'rm-chapter-7'],
        getHelp: OFFICE
      },
      {
        id: 'ir-irb-ethics',
        name: 'Ethics and Consent Plan',
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
    moduleTitle: 'Proposal, peer review, and presentation',
    phaseLabel: 'Put it together',
    assignments: [
      {
        id: 'ir-draft-proposal',
        name: 'Draft Proposal',
        type: 'assignment',
        tips: [
          '12-20 pages integrating literature review, methods, ethics, and appendices.',
          'Revise the earlier drafts using the feedback you got instead of pasting them in unchanged.',
          'Check that your question, hypotheses, design, measures, and analysis plan all point at each other, and fix any that do not.'
        ],
        practiceLinks: ['rm-chapter-11'],
        getHelp: OFFICE
      },
      {
        id: 'ir-irb-form-edits',
        name: 'IRB Form Edits',
        type: 'assignment',
        tips: [
          'Edit the NWOSU IRB application template so it describes your proposed study, using your methods and ethics work.',
          'Use the NWOSU IRB template provided in Canvas; keep its headings and answer every section that applies to your project.',
          'You will not submit to the IRB in this course, but write as if you will: the same text carries into your thesis or capstone application.'
        ],
        practiceLinks: ['rm-chapter-3'],
        getHelp: OFFICE
      },
      {
        id: 'ir-peer-review',
        name: 'Peer Review',
        type: 'assignment',
        tips: [
          'Read a classmate\'s draft proposal and give specific, kind, and useful comments.',
          'Check the parts against each other: does the design answer the question, and do the measures fit the hypotheses?',
          'Then use the feedback you receive to mark the weakest sections of your own draft.'
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
        id: 'ir-presentation',
        name: 'Proposal Presentation',
        type: 'assignment',
        tips: [
          'A professional 10-15 minute talk with slides: rationale, literature, methods, and analysis plan.',
          'Practice out loud and time it; presentations start Wed Apr 21.'
        ],
        practiceLinks: ['rm-chapter-11'],
        getHelp: OFFICE
      }
    ]
  }
]
