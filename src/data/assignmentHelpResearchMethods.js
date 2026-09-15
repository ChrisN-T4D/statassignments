/**
 * Assignment Help — PSYC 4223 Research Methodology (Canvas / NWOSU)
 * Maps Canvas assignments to Pressbooks chapters in Methods Market.
 * Due dates and points live in Canvas only — not in this file.
 */

/** Shared chapter bundles for Canvas methodology paths */
const CH = {
  topic: (n) => `rm-chapter-${n}`,
  litReview: ['rm-chapter-2', 'rm-chapter-11'],
  ethics: ['rm-chapter-3'],
  measurement: ['rm-chapter-4'],
  experimental: ['rm-chapter-4', 'rm-chapter-5', 'rm-chapter-9'],
  survey: ['rm-chapter-4', 'rm-chapter-7'],
  qualitative: ['rm-chapter-6'],
  archival: ['rm-chapter-6'],
  methodsWriteup: ['rm-chapter-4', 'rm-chapter-5', 'rm-chapter-6', 'rm-chapter-7', 'rm-chapter-11'],
  irb: ['rm-chapter-3', 'rm-chapter-11'],
  scientificMethod: ['rm-chapter-1', 'rm-chapter-2']
}

export const assignmentHelpResearchMethods = [
  {
    canvasPart: 'Part 1',
    moduleTitle: 'Introduction & literature review',
    phaseLabel: 'Introduction — read Ch. 1 first',
    assignments: [
      {
        id: 'rm-ch1-intro',
        name: 'Ch. 1: The Science of Psychology (course intro)',
        type: 'assignment',
        tips: [
          'Read this chapter first — it is the foundation for Part 1 and the rest of the capstone.',
          'Complete all of Ch. 1 (reading + Concept Review) when Canvas directs you to it.',
          'Focus on methods of knowing, what makes psychology a science, and goals of science (describe, predict, explain).'
        ],
        practiceLinks: ['rm-chapter-1'],
        getHelp: 'Open Module 1 in Methods Market (Part 1). Bring one question from Ch. 1 to the Phase 1 workshop or office hours.'
      },
      {
        id: 'rm-syllabus-ack',
        name: 'Syllabus Acknowledgement',
        type: 'assignment',
        tips: [
          'Read the full syllabus in Canvas before you acknowledge.',
          'Note which methodology path (Survey, Qualitative, Experimental, or Archival) you will choose in Phase 4 — it determines which Pressbooks chapters matter most later.'
        ],
        practiceLinks: ['rm-chapter-1'],
        getHelp: 'Questions about course structure? Use the Course Discussion Board in Canvas or office hours.'
      },
      {
        id: 'rm-choose-groups',
        name: 'How to Choose Groups',
        type: 'practice',
        tips: [
          'Think about complementary skills: who is strong on writing, stats, recruitment, or IRB paperwork?',
          'Your group will share one IRB protocol and methods document — agree early on a single research topic and design.'
        ],
        getHelp: 'Group issues? Contact your instructor before conflicts become hard to fix.'
      }
    ]
  },
  {
    canvasPart: 'Part 1',
    moduleTitle: 'Introduction & literature review',
    phaseLabel: 'Phase 1 — Choosing a Topic',
    assignments: [
      {
        id: 'rm-phase-1-workshop',
        name: 'Phase 1 Workshop',
        type: 'assignment',
        tips: [
          'Move from a broad interest to a narrow, researchable focus — one population, one construct, one context.',
          'Start a running list of search terms and synonyms; you will reuse them for the article review and full literature review.',
          'Skim Pressbooks Ch. 1–2 on why science beats intuition and how researchers find topics.'
        ],
        practiceLinks: ['rm-chapter-1', 'rm-chapter-2'],
        getHelp: 'Stuck narrowing your topic? Review Ch. 2 (generating ideas) in Methods Market, then bring two narrowed options to office hours.'
      },
      {
        id: 'rm-article-review',
        name: 'Article Review and Problem Statement',
        type: 'assignment',
        tips: [
          'Open Study Plan and click “Start guided tour” — it highlights each section and explains why it exists and when to narrow or widen your topic.',
          'Canvas requires at least 6 completed peer-reviewed article reviews (6–8 on the template). In Study Plan you can add unlimited cards — export includes every card with content.',
          'For each article: APA reference, the authors’ “what” and “why” questions, participants, methodology, results, strengths, weaknesses, and how it connects to your proposal.',
          'Write in complete sentences; summarize — do not copy and paste from the article.',
          'After all article cards: draft your Problem Statement (what we know, gap, what we want to know) and preliminary research question(s) and hypothesis(es).',
          'Attach a PDF for every article in Canvas; use Study Plan in Methods Market to draft and export before you submit.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-4', 'rm-chapter-11'],
        studyPlanSection: 'article-review',
        getHelp: 'Use Ch. 2 to evaluate sources and gaps; Ch. 4 for methodology vocabulary; Ch. 11 for APA references. Study Plan mirrors the worksheet field order.'
      }
    ]
  },
  {
    canvasPart: 'Part 1',
    moduleTitle: 'Introduction & literature review',
    phaseLabel: 'Phase 2 — Literature Review',
    assignments: [
      {
        id: 'rm-lit-review-draft-1',
        name: 'Literature Review Draft 1',
        type: 'assignment',
        tips: [
          'Submit an outline plus a partial draft (not bullet points) — aim for roughly half of your final length with clear section headings.',
          'While you draft, work through Ch. 6 and Ch. 7 in Methods Market when Canvas assigns them (one full chapter at a time).',
          'Include a working References list in APA 7 format; use Ch. 11 when Canvas assigns APA/style reading.',
          'When summarizing each study, name the design using vocabulary from the chapters you have completed.',
          'End Draft 1 with a preliminary gap statement — your instructor feedback should sharpen it for the Final.',
          'Open Study Plan → Lit Review Outline. Name your organizing framework, fill theme buckets, and export the compiled outline for Draft 1.'
        ],
        practiceLinks: ['rm-chapter-6', 'rm-chapter-7'],
        studyPlanSection: 'study-focus',
        getHelp: 'Check Canvas for the due date. Bring an outline to office hours before you submit. Draft 1 is for feedback, not a polished final.'
      },
      {
        id: 'rm-lit-review-final',
        name: 'Literature Review Final / References Section',
        type: 'assignment',
        tips: [
          'Revise using instructor comments from Draft 1 — see Canvas for the final due date.',
          'Complete the Pressbooks chapters Canvas assigns during revision (often Ch. 11, 8, 3, 9) — one full chapter at a time.',
          'In the lit review body, describe prior methods precisely (design, sample, measures) — not just findings.',
          'Synthesize themes across studies — do not write one paragraph per article in isolation.',
          'End with a clear gap your study will address; that gap feeds directly into the combined Phase 3 & 4 worksheets.',
          'Use the Literature Review Checklist in Canvas.'
        ],
        practiceLinks: [...CH.litReview, 'rm-chapter-8', 'rm-chapter-3', 'rm-chapter-9'],
        studyPlanSection: 'study-focus',
        getHelp: 'Due date is in Canvas. Follow the chapter links Canvas provides each week — complete each chapter fully before moving on.'
      }
    ]
  },
  {
    canvasPart: 'Part 2',
    moduleTitle: 'Research Question & Methodological Route',
    phaseLabel: 'Phase 3 & 4 — Research question & operationalization',
    assignments: [
      {
        id: 'rm-phase-3-worksheet',
        name: 'Phase 3 Worksheet',
        type: 'assignment',
        tips: [
          'Submit together with Phase 4 on the same due date (see Canvas).',
          'Phase 3 is an elevator speech: a 1–2 minute spiel about your research — what the field knows, the gap, and how your study fits.',
          'Use your Lit Review Final, Lit Review Outline, and article reviews; do not start from scratch.',
          'Draft four parts in Methods Market: what we know, the gap, my study pitch, then combine into a full script (~130–300 words).',
          'Use copy buttons to pull theme notes, gap, and transition from your Lit Review Outline — then refine into spoken prose.',
          'IV/DV definition and methodology path choice belong in Phase 4, not Phase 3.'
        ],
        practiceLinks: ['rm-chapter-2', 'rm-chapter-11'],
        studyPlanSection: 'phase-3',
        getHelp: 'Open Study Plan in Methods Market for the elevator speech template. Ch. 2 covers synthesis and gaps; Ch. 11 for clear prose. Submit with Phase 4 on the date shown in Canvas.'
      },
      {
        id: 'rm-phase-4-worksheet',
        name: 'Phase 4 Worksheet (Operationalization Exploration)',
        type: 'assignment',
        tips: [
          'Submit together with Phase 3 on the same due date.',
          'Recap your topic and research question from your lit review; define IV and DV conceptually (Part B).',
          'Explore all four pathways in Part C (survey, experimental task, observation, archival) — mark a path “not viable” if it does not fit.',
          'Complete the Part D comparison table, then choose ONE pathway in Part E.',
          'Mark pathways “not viable” when they truly do not fit — that is good thinking, not failure.',
          'Use the Helpful Table wiki page in Canvas and the Path 1–4 guides; Ch. 4 for measurement.'
        ],
        practiceLinks: ['rm-chapter-4', 'rm-chapter-5', 'rm-chapter-6', 'rm-chapter-7'],
        studyPlanSection: 'phase-4',
        getHelp: 'Same due date as Phase 3 in Canvas. Unsure which path fits? Compare Path 1–4 pages in Canvas with the matching chapter in Methods Market.'
      }
    ]
  },
  {
    canvasPart: 'Part 2',
    moduleTitle: 'Methods Section',
    assignments: [
      {
        id: 'rm-methods-section',
        name: 'Methods Section (Includes all appendices and literature review)',
        type: 'assignment',
        tips: [
          'Follow the METHODS Template in Canvas; include participants, materials/measures, procedure, and analysis plan.',
          'Match your write-up to your path: surveys → Ch. 4 + 7; experiments → Ch. 4 + 5 (+ 9 if factorial); qualitative/archival → Ch. 6.',
          'Include informed consent and any surveys/interview guides as appendices; cite published measures in APA format.'
        ],
        practiceLinks: CH.methodsWriteup,
        getHelp: 'Draft one section at a time. Use Ch. 11 for APA structure. Submit IRB First Draft for feedback before treating this as final.'
      }
    ]
  },
  {
    canvasPart: 'Method paths',
    moduleTitle: 'Path guides (Canvas → Pressbooks)',
    assignments: [
      {
        id: 'rm-path-1-survey',
        name: 'Path 1 — Survey Methodology',
        type: 'assignment',
        tips: [
          'Pressbooks Ch. 4: choose or build reliable, valid measures.',
          'Ch. 7: sampling frame, survey construction, order effects, and administration (online vs in person).',
          'Pilot your survey before data collection; report how you will handle missing data.'
        ],
        practiceLinks: CH.survey,
        getHelp: 'Survey path students: focus Concept Review on Modules 4 and 7, then open Analysis → Survey for Ch. 12–13 and software steps.'
      },
      {
        id: 'rm-path-2-qualitative',
        name: 'Path 2 — Qualitative Interview',
        type: 'assignment',
        tips: [
          'Pressbooks Ch. 6: qualitative logic, interviewing, coding, and theme development.',
          'Plan how you will establish credibility (member checking, audit trail) and protect participant privacy.',
          'Interview guides belong in an appendix; describe recruitment and saturation in Methods.'
        ],
        practiceLinks: CH.qualitative,
        getHelp: 'Qualitative path: review Ch. 6 in Methods Market and bring your interview guide for feedback.'
      },
      {
        id: 'rm-path-3-experimental',
        name: 'Path 3 — Experimental Design',
        type: 'assignment',
        tips: [
          'Ch. 4: operationalize IV and DV; Ch. 5: random assignment, control, manipulation checks, internal validity.',
          'Ch. 9 if you have more than one IV (factorial design).',
          'Use the Lab module in Methods Market (random assignment & sampling) to clarify assignment vs sampling.'
        ],
        practiceLinks: [...CH.experimental, 'rm-chapter-8'],
        getHelp: 'Experimental path: run the Lab simulations, review Ch. 5 Concept Review, then open Analysis → Experimental for inferential tests.'
      },
      {
        id: 'rm-path-4-archival',
        name: 'Path 4 — Archival Data',
        type: 'assignment',
        tips: [
          'Pressbooks Ch. 6: non-experimental and existing-data designs; be explicit about what you cannot infer causally.',
          'Document data source, inclusion criteria, and variables available vs what you wish you had.',
          'Address ethics: often exempt or expedited, but still describe confidentiality and data security.'
        ],
        practiceLinks: CH.archival,
        getHelp: 'Archival path: Ch. 6 + ethics in Ch. 3. Confirm IRB category with your instructor early.'
      }
    ],
    noDiscussion: true
  },
  {
    canvasPart: 'Part 3',
    moduleTitle: 'Human Research Training',
    assignments: [
      {
        id: 'rm-hrt-lesson-1',
        name: 'Human Research Training - Lesson 1',
        type: 'assignment',
        tips: ['Connect CITI-style training content to Pressbooks Ch. 3 (Belmont principles, respect for persons, beneficence, justice).'],
        practiceLinks: CH.ethics,
        getHelp: 'Complete the Canvas lesson first, then skim Ch. 3 in Methods Market to reinforce terms for the IRB proposal.'
      },
      {
        id: 'rm-hrt-lesson-2',
        name: 'Human Research Training - Lesson 2',
        type: 'assignment',
        tips: ['Focus on informed consent elements: purpose, risks, benefits, confidentiality, voluntary participation, contact info.'],
        practiceLinks: CH.ethics,
        getHelp: 'Use Ch. 3 when drafting your consent form for the Methods / IRB packet.'
      },
      {
        id: 'rm-hrt-lesson-3',
        name: 'Human Research Training - Lesson 3',
        type: 'assignment',
        tips: ['Note requirements for vulnerable populations and when additional safeguards apply.'],
        practiceLinks: CH.ethics,
        getHelp: 'If your study includes minors or other protected groups, flag this in office hours before IRB submission.'
      },
      {
        id: 'rm-hrt-lesson-4',
        name: 'Human Research Training - Lesson 4',
        type: 'assignment',
        tips: ['Review deception, debriefing, and when debriefing must restore informed consent.'],
        practiceLinks: CH.ethics,
        getHelp: 'Experimental designs with deception need extra IRB detail — see Ch. 3 special ethical issues.'
      },
      {
        id: 'rm-hrt-lesson-5',
        name: 'Human Research Training - Lesson 5',
        type: 'assignment',
        tips: ['Tie training completion to your IRB application: you are certifying you understand researcher responsibilities.'],
        practiceLinks: CH.ethics,
        getHelp: 'After all five lessons, start the IRB First Draft while Ch. 3 is still fresh.'
      }
    ]
  },
  {
    canvasPart: 'Part 3',
    moduleTitle: 'IRB Submission',
    assignments: [
      {
        id: 'rm-irb-first-draft',
        name: 'IRB First Draft for Feedback',
        type: 'assignment',
        tips: [
          'Use the Itemized Checklist and Research Proposal Template in Canvas.',
          'Align protocol text with your Methods Section — same participants, procedures, and risks.',
          'Ch. 3 covers IRB purpose and consent; Ch. 11 covers clear scientific writing.'
        ],
        practiceLinks: CH.irb,
        getHelp: 'Submit a complete draft, not bullet points. Office hours are for checklist questions before the final IRB packet.'
      },
      {
        id: 'rm-irb-final-draft',
        name: 'IRB Final Draft for IRB',
        type: 'assignment',
        tips: [
          'Incorporate instructor feedback from the first draft; double-check consent language matches your procedure.',
          'Attach all instruments (surveys, interview guides) and evidence of training completion if required.'
        ],
        practiceLinks: CH.irb,
        getHelp: 'This version goes to the IRB — treat it as a formal protocol, not a class essay.'
      },
      {
        id: 'rm-irb-status-update',
        name: 'IRB Status Update and Detailed Plan',
        type: 'assignment',
        tips: [
          'Report actual IRB submission status, anticipated timeline, and contingency if approval is delayed.',
          'Include a detailed data-collection plan: who recruits, when sessions run, where data are stored.',
          'If approved, note any conditions; if pending, list what you are waiting on and your backup plan.'
        ],
        practiceLinks: [...CH.irb, 'rm-chapter-5', 'rm-chapter-7'],
        getHelp: 'This is a high-stakes checkpoint — meet with your instructor if IRB status is uncertain two weeks before the deadline.'
      }
    ]
  }
]
