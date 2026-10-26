/**
 * Guided worksheets: Question and Hypotheses, Methods Section, Ethics and Consent Plan, Analysis Plan.
 * One engine (GuidedWorksheetSection.vue) draws them all from this file: blocks of fields, plus reference panels (templates, samples,
 * sentence frames, the ethics cases) taken from the course's Canvas guides. Students write in the fields; the export pastes into Canvas.
 *
 * A worksheet is { key, title, objective, blocks, references, prefills, links }.
 *   key       where the answers live on the project (project[key][fieldId])
 *   blocks    [{ id, title, intro?, frames?, fields: [{ id, label, exportLabel, required?, multiline?, helpNote?, helpTopicId? }] }]
 *   references [{ id, title, open?, parts: [{ heading?, text?, items?, table? }] }]  browse only: Methods Market does not write answers for the student
 *   prefills  [{ id, label, when(project) -> boolean, apply(project) -> patch of empty fields }]
 */

import { PHASE4_PATHWAYS } from './capstonePhase4Worksheet.js'

const F = (id, label, o = {}) => ({ id, label, exportLabel: o.exportLabel ?? label, required: o.required ?? false, multiline: o.multiline ?? true, helpNote: o.helpNote, helpTopicId: o.helpTopicId })

const text = (v) => (v ?? '').toString().trim()

/* ------------------------------------------------------------------ Question and Hypotheses */

const QUESTION_HYPOTHESES = {
  key: 'questionHypotheses',
  title: 'Research Question and Hypotheses',
  objective:
    'Narrow your broad topic to one researchable question, using what your first literature review draft showed. A specific question, testable hypotheses (or guiding questions), and a reason it matters are the foundation of everything after this.',
  flow: 'Literature Review Draft (week 6) → <strong>Research Question and Hypotheses</strong> (week 7) → Literature Review Final (week 8)',
  byClass: {
    'research-methods': {
      objective:
        'Narrow your topic to one researchable question, using what your literature review showed. A specific question, testable hypotheses (or guiding questions), and a reason it matters come before you choose a method, because the method has to fit the question.',
      flow: 'Lit Review Outline → <strong>Research Question and Hypotheses</strong> → Method Choice'
    }
  },
  blocks: [
    {
      id: 'problem',
      title: 'Research problem (one paragraph)',
      intro: 'State the problem you are investigating and show why it matters. Use at least one or two peer-reviewed sources for the significance, gap, or condition that needs investigating.',
      fields: [
        F('problemStatement', 'The problem', { required: true, helpTopicId: 'rm-chapter-2', helpNote: 'One paragraph. Say what is known, then what is not. Your literature review draft already found this gap.' }),
        F('problemSources', 'Sources for the problem (APA)', { helpTopicId: 'rm-chapter-11', helpNote: 'The one or two peer-reviewed sources that show the significance or the gap.' }),
        F('soWhat', 'The “so what?” test', { helpNote: 'If this question were answered, who would care and what would change? Say it plainly.' })
      ]
    },
    {
      id: 'question',
      title: 'Research question',
      intro: 'One clear, researchable question. Add two or three sub-questions only if you need them.',
      fields: [
        F('researchQuestion', 'My research question', { required: true, multiline: true, helpNote: 'Specific, feasible in principle, and grounded in psychology or counseling. A question you could answer with data.' }),
        F('subQuestions', 'Sub-questions (optional)')
      ]
    },
    {
      id: 'hypotheses',
      title: 'Hypotheses or guiding questions',
      intro: 'Quantitative: one or more testable hypotheses, directional or not. Qualitative or capstone work: guiding questions or expected themes.',
      fields: [
        F('designType', 'Quantitative, qualitative, or mixed?', { multiline: false, helpNote: 'This may change when you choose your method in week 9. Name your current best guess.' }),
        F('hypotheses', 'My hypotheses or guiding questions', { required: true, helpNote: 'Number them (H1, H2 …). Each hypothesis names the variables and the relationship or difference you expect.' })
      ]
    },
    {
      id: 'rationale',
      title: 'Rationale (one paragraph)',
      intro: 'Why this question matters to the field and to your professional goals.',
      fields: [
        F('rationale', 'Why it matters', { required: true, helpNote: 'Connect to theory, practice, or prior research. Name your theory from Theory Selection if it fits.' })
      ]
    }
  ],
  references: [
    {
      id: 'readers',
      title: 'What your reader checks (the Canvas rubric)',
      open: true,
      parts: [
        {
          items: [
            'Research problem (10): a clear statement, significance shown, supported with literature, passes the “so what?” test.',
            'Research question (5): specific, researchable, relevant, clearly connected to the problem.',
            'Hypotheses or guiding questions (5): hypotheses are testable, or guiding questions are clear and appropriate.',
            'Rationale (5): explains importance, contribution, or professional application.',
            'APA and writing quality (5).'
          ]
        }
      ]
    },
    {
      id: 'example',
      title: 'Example: from a broad topic to a narrow problem',
      parts: [
        {
          heading: 'Lead-in',
          text: 'Graduate counseling students report high levels of stress and burnout. Although mindfulness interventions have been studied in other populations, little is known about their effectiveness with graduate counseling students.'
        },
        {
          heading: 'What happened',
          items: [
            'Broad topic: stress and burnout in helping professions.',
            'What the literature showed: mindfulness reduces stress in other groups.',
            'The gap: nobody tested it with graduate counseling students.',
            'The narrow question: Does an 8-week mindfulness program reduce emotional exhaustion among graduate counseling students?'
          ]
        }
      ]
    }
  ],
  prefills: [
    {
      id: 'fromOutline',
      label: 'Copy my gap and working question from my Lit Review Outline',
      when: (p) => Boolean(text(p.litReviewOutline?.gapAndTransition?.gapStatement) || text(p.litReviewOutline?.gapAndTransition?.workingResearchQuestion)),
      apply: (p) => {
        const g = p.litReviewOutline?.gapAndTransition ?? {}
        const cur = p.questionHypotheses ?? {}
        const out = {}
        if (!text(cur.problemStatement) && text(g.gapStatement)) out.problemStatement = text(g.gapStatement)
        if (!text(cur.researchQuestion) && text(g.workingResearchQuestion)) out.researchQuestion = text(g.workingResearchQuestion)
        return out
      }
    }
  ],
  links: [{ label: 'Ch. 2: from topic to hypothesis', to: '/topic/rm-chapter-2' }]
}

/* ------------------------------------------------------------------ Methods Section */

const METHODS_SECTION = {
  key: 'methodsSection',
  title: 'Methods Section',
  objective:
    'Write your Methods section so another researcher could carry out your study. Design, participants, recruitment, instruments, and procedures each get a part, and every part has to fit your question, hypotheses, measures, and consent materials.',
  flow: 'Method Choice and Measures → Recruitment and Consent → <strong>Methods Section</strong>',
  blocks: [
    {
      id: 'design',
      title: 'Research design',
      intro: 'Quantitative, qualitative, or mixed methods, and why that fits your question. Be specific: survey, interviews, experiment, archival data.',
      fields: [
        F('design', 'Design and rationale', { required: true, helpTopicId: 'rm-chapter-5', helpNote: 'Name the design in the first sentence, then explain why it fits your question better than the alternatives.' })
      ]
    },
    {
      id: 'participants',
      title: 'Participants',
      intro: 'Who, how many, what they are like, and who is included or excluded.',
      fields: [
        F('participants', 'Participants', { required: true, helpNote: 'Include number, demographics, and inclusion and exclusion criteria. Connect them to feasibility and ethics.' })
      ]
    },
    {
      id: 'recruitment',
      title: 'Recruitment',
      intro: 'How you would find participants. Address informed consent and voluntary participation.',
      fields: [
        F('recruitment', 'Recruitment procedures', { required: true, helpTopicId: 'rm-chapter-3', helpNote: 'How, when, and where you would recruit. Say which channels (spoken ask, flier, social media) and that consent comes before the survey.' })
      ]
    },
    {
      id: 'instruments',
      title: 'Instruments',
      intro: 'Each measure, with its reliability and validity evidence and its citation.',
      fields: [
        F('instruments', 'Instruments and evidence', { required: true, helpTopicId: 'rm-chapter-4', helpNote: 'Name each instrument, who made it, what it measures, and the reliability and validity evidence. Use peer-reviewed support. Say if you changed any item, and why.' })
      ]
    },
    {
      id: 'procedures',
      title: 'Procedures',
      intro: 'The step-by-step process, in enough detail to replicate. It must also be ethically sound.',
      fields: [
        F('procedures', 'Procedures', { required: true, helpNote: 'From the first contact to the last response: consent, survey order, time, where data are stored.' })
      ]
    }
  ],
  references: [
    {
      id: 'template',
      title: 'Methods Section Template',
      open: true,
      parts: [
        {
          table: {
            head: ['Section', 'What to include', 'Notes'],
            rows: [
              ['Research design', 'Quantitative, qualitative, or mixed; rationale for why it fits your study', 'Be specific (for example, survey, interviews, experiment)'],
              ['Participants', 'Who, how many, demographics, inclusion and exclusion criteria', 'Connect to feasibility and ethics'],
              ['Recruitment', 'How you will find participants', 'Address informed consent and voluntary participation'],
              ['Instruments', 'Each tool or measure, reliability, validity, citations', 'Use peer-reviewed support'],
              ['Procedures', 'Step-by-step process of the study', 'Must be replicable and ethically sound']
            ]
          }
        }
      ]
    },
    {
      id: 'samples',
      title: 'Sample Methods paragraphs',
      parts: [
        {
          heading: 'Research design (quantitative)',
          text: 'This study will use a cross-sectional survey design to examine the relationship between stress levels and sleep quality among college students. A quantitative approach is appropriate because it allows measurement of variables (stress and sleep quality) using standardized instruments and enables statistical analysis of relationships between them.'
        },
        {
          heading: 'Participants and recruitment (qualitative)',
          text: 'Participants will be 12 adults who have recently completed a substance use treatment program. They will be recruited through flyers posted at local counseling centers. Inclusion criteria include being over 18 and having completed a program within the past six months; exclusion criteria include current inpatient treatment. Recruitment will be voluntary, with informed consent required prior to participation.'
        },
        {
          heading: 'Instruments and reliability',
          text: 'Stress will be measured using the Perceived Stress Scale (PSS-10; Cohen et al., 1983), a widely used instrument with strong internal consistency (α = .84) and construct validity across diverse populations. Sleep quality will be assessed with the Pittsburgh Sleep Quality Index (PSQI; Buysse et al., 1989), which demonstrates high test-retest reliability (r = .85) and predictive validity for clinical outcomes.'
        },
        {
          heading: 'Procedures',
          text: 'After providing consent, participants will complete the survey packet online through Qualtrics. They will first respond to demographic items, followed by the PSS-10 and PSQI. Average completion time is 15 minutes. Data will be stored in password-protected files, with identifiers removed to maintain confidentiality.'
        }
      ]
    },
    {
      id: 'check',
      title: 'Before you submit: does it all fit?',
      parts: [
        {
          items: [
            'Could another researcher carry out your study from this section alone?',
            'Do the participants, recruitment, instruments, and procedures all match your hypotheses and your method choice?',
            'Does the recruitment text match your scripts and consent form in the Recruitment and Consent worksheet?',
            'Is every instrument cited, and is every change to an instrument explained?'
          ]
        }
      ]
    }
  ],
  prefills: [
    {
      id: 'fromRecruitment',
      label: 'Copy participants and recruitment from Recruitment and Consent',
      when: (p) => Boolean(text(p.recruitmentConsent?.participantsOfInterest)),
      apply: (p) => {
        const rc = p.recruitmentConsent ?? {}
        const cur = p.methodsSection ?? {}
        const out = {}
        if (!text(cur.participants)) {
          const parts = [text(rc.participantsOfInterest), text(rc.whyAppropriate)].filter(Boolean)
          const ex = text(rc.exclusions)
          out.participants = parts.join(' ') + (ex ? ` Exclusions: ${ex}` : '')
        }
        if (!text(cur.recruitment)) {
          const ch = Object.entries(rc.channels ?? {}).filter(([, on]) => on).map(([id]) => ({ oral: 'a spoken announcement', flier: 'printed fliers', social: 'social media posts', email: 'email', other: 'other channels' }[id])).filter(Boolean)
          if (ch.length) out.recruitment = `Participants will be recruited through ${ch.join(', ')}. Recruitment is voluntary, and the full informed consent form is presented before any survey question.`
        }
        return out
      }
    },
    {
      id: 'fromMethodChoice',
      label: 'Copy my chosen pathway from Method Choice',
      when: (p) => Boolean(p.phase4?.chosenPathwayId),
      apply: (p) => {
        const cur = p.methodsSection ?? {}
        if (text(cur.design)) return {}
        const path = PHASE4_PATHWAYS.find((x) => x.id === p.phase4?.chosenPathwayId)
        return path ? { design: `The study will use ${path.label.toLowerCase()}. ` } : {}
      }
    }
  ],
  links: [
    { label: 'Ch. 4: measurement', to: '/topic/rm-chapter-4' },
    { label: 'Ch. 5: experimental research', to: '/topic/rm-chapter-5' },
    { label: 'Ch. 7: survey research', to: '/topic/rm-chapter-7' }
  ]
}

/* ------------------------------------------------------------------ Ethics and Consent Plan */

const ETHICS_PLAN = {
  key: 'ethicsPlan',
  title: 'Ethics and Consent Plan',
  objective:
    'Write the risks, confidentiality, and informed consent sections of your study in IRB-style language, as if you were preparing text for a real IRB submission. Do not just say “data will be safe”: explain exactly how.',
  flow: 'Recruitment and Consent → <strong>Ethics and Consent Plan</strong> → IRB application',
  blocks: [
    {
      id: 'risks',
      title: '1. Risks (half a page to a page)',
      intro: 'Say whether the study is minimal risk (no greater than everyday life) or more, name any risks, and explain how you would reduce them.',
      frames: [
        '“This study involves [minimal / more-than-minimal] risk because …”',
        '“Potential risks include [type of risk]. To minimize these risks, I will …”',
        '“Participants may choose to skip any questions that make them uncomfortable.”',
        '“If extra credit is offered, students will also have the option to [describe alternative].”'
      ],
      fields: [
        F('riskLevel', 'Minimal risk or more?', { required: true, helpTopicId: 'rm-chapter-3', helpNote: 'Minimal risk means no greater than daily life or routine exams. Explain your answer.' }),
        F('riskTypes', 'Possible risks (psychological, social, physical, legal)', { helpNote: 'Name each one you can think of, or write that you see none and why.' }),
        F('riskReduction', 'How you would reduce or manage them', { helpNote: 'Skipping questions, stopping at any time, resources for someone who becomes upset.' }),
        F('sensitive', 'Will you ask for personal or sensitive information?', { helpNote: 'If yes, describe what and why. If no, say so.' }),
        F('inducements', 'Will participants get anything for taking part? (extra credit, gift cards)', { helpNote: 'If you offer extra credit, name the other way to earn the same credit. Otherwise it can look like pressure.' })
      ]
    },
    {
      id: 'confidentiality',
      title: '2. Confidentiality (half a page to a page)',
      intro: 'Say whether data are anonymous (no names or IDs) or confidential (names collected but protected), where they are stored, who can see them, and how long you keep them.',
      frames: [
        '“To protect confidentiality, the study will [not collect names / assign ID codes / keep data separate from consent forms].”',
        '“Data will be stored [describe: password-protected file, locked cabinet] and only [researcher / advisor] will have access.”',
        '“Data will be kept for [time period] and then destroyed by [shredding paper surveys / deleting digital files].”'
      ],
      fields: [
        F('anonymity', 'Anonymous or confidential, and how', { required: true, helpNote: 'If you collect no identifying information, say so. If you do, say what and why.' }),
        F('storage', 'Where the data are stored and who can see them', { required: true, helpNote: 'Online surveys: name the tool and the account (for example, Google Forms in a password-protected Drive). Paper: where it is locked.' }),
        F('retention', 'How long you keep them, and how they are destroyed', { required: true, helpNote: 'For paper: how long, how secured, where, how destroyed. For online: how long and how deleted.' })
      ]
    },
    {
      id: 'consent',
      title: '3. Informed consent (half a page to a page)',
      intro: 'Describe how participants are told what they are agreeing to. Include purpose, what they will do, risks, confidentiality, voluntary participation, the right to withdraw, and contact information.',
      frames: [
        '“Before participating, individuals will read an informed consent form that explains …”',
        '“The consent form will describe the purpose of the study as …”',
        '“Participants will be told that their participation is voluntary and that they may withdraw at any time without penalty.”',
        '“The form will also state that responses will be kept [anonymous / confidential] and that only [researcher / advisor] will have access to the data.”',
        '“Contact information for the researcher, faculty advisor, and IRB chair will be provided.”'
      ],
      fields: [
        F('consentProcess', 'How participants will be informed before they take part', { required: true, helpNote: 'Online: the full consent is the first page, and nobody sees a question until they agree. Paper: a signature line.' }),
        F('consentElements', 'What the consent form tells them', { required: true, helpNote: 'Purpose, what they will do, risks, confidentiality, voluntary participation, right to withdraw, contacts. Your form is in the Recruitment and Consent worksheet.' })
      ]
    },
    {
      id: 'fairness',
      title: 'Who is asked, and is it fair?',
      intro: 'The cases below show why this question exists. Who bears the burden of your study, and who benefits?',
      fields: [
        F('fairness', 'Fairness of who you recruit', { helpNote: 'Why are these participants the right ones, and is anyone pressured, excluded without reason, or in a vulnerable position?' })
      ]
    }
  ],
  references: [
    {
      id: 'mapping',
      title: 'From past failures to today’s safeguards',
      open: true,
      parts: [
        {
          items: [
            'Respect for persons → informed consent (plain language, voluntariness, right to withdraw), assent for minors, debriefing after deception.',
            'Beneficence → systematic risk–benefit analysis, the minimal-risk standard, monitoring, stopping rules, referral resources.',
            'Justice → equitable recruitment; avoid exploiting convenience or vulnerable groups; fair distribution of burdens and benefits.',
            'Confidentiality and data security → de-identification, limited access, locked storage or encryption, clear retention and destruction timelines.',
            'Oversight and accountability → IRB review and continuing review, reportable events, role separation, conflict-of-interest management.'
          ]
        }
      ]
    },
    {
      id: 'tuskegee',
      title: 'Case: Tuskegee Syphilis Study (1932–1972)',
      parts: [
        { heading: 'What happened', text: 'Black men with syphilis were misled and denied proven treatment so researchers could observe the natural course of the disease. Consent was not informed, and justice was violated by exploiting a vulnerable population.' },
        { heading: 'Key violations', items: ['Respect for persons: no informed consent, and deception.', 'Beneficence: effective treatment withheld, high risk, no benefit.', 'Justice: the burden fell on a marginalized group.'] },
        { heading: 'How it is prevented today', items: ['IRB review with an explicit risk–benefit analysis; proven therapy cannot be withheld without compelling reason.', 'Informed consent must disclose purpose, risks, alternatives, and the right to withdraw.', 'Added protections for vulnerable populations; recruitment plans must show equitable selection.', 'Ongoing monitoring and adverse-event reporting; protocols are halted if harm emerges.'] },
        { heading: 'What to look for in proposals', text: 'Are recruitment and inclusion equitable? Is any standard of care being withheld? Is consent clear about risks and alternatives?' }
      ]
    },
    {
      id: 'willowbrook',
      title: 'Case: Willowbrook Hepatitis Study (1956–1970)',
      parts: [
        { heading: 'What happened', text: 'Children with intellectual disabilities at an institution were exposed to hepatitis to study disease progression. Consent from parents occurred under conditions many argue were coercive.' },
        { heading: 'Key violations', items: ['Beneficence: intentional exposure to harm.', 'Respect for persons: questionable voluntariness and limited understanding.', 'Justice: a captive, vulnerable population targeted for convenience.'] },
        { heading: 'How it is prevented today', items: ['Added protections for children and other vulnerable groups, with extra IRB scrutiny and permission and assent rules.', 'No intentional exposure to pathogens without a stringent, ethically defensible rationale and safeguards.', 'Equitable selection: no recruiting “because it’s easy.”'] },
        { heading: 'What to look for', text: 'A justification for the population, non-coercive recruitment, and risk in proportion to potential benefit.' }
      ]
    },
    {
      id: 'facebook',
      title: 'Case: Facebook “Emotional Contagion” Study (2014)',
      parts: [
        { heading: 'What happened', text: 'News feeds of users were experimentally manipulated to test emotional effects. Users were not clearly consented as research participants.' },
        { heading: 'Key concerns', items: ['No clear informed consent in a digital platform study; unclear oversight or IRB review.', 'Privacy and data-use transparency deficits.'] },
        { heading: 'How it is prevented today', items: ['IRB review of secondary data and platform experiments that count as research.', 'Transparent consent or notice, data minimization, and privacy by design (de-identification, limited retention).', 'Clear data governance: access controls and sharing limits.'] },
        { heading: 'What to look for', text: 'Whether a study using platforms or apps is truly program evaluation or human-subjects research that needs consent and IRB review, and whether privacy protections and user notice are in place.' }
      ]
    },
    {
      id: 'irbquestions',
      title: 'Questions the NWOSU IRB application asks',
      parts: [
        {
          items: [
            'Could participants meet stress or psychological, social, physical, or legal risks greater than those ordinarily met in daily life?',
            'Does the study need medical clearance? (For most psychology surveys: no.)',
            'Will the fact that a person did or did not take part be part of a record a supervisor, teacher, guardian, or employer can see?',
            'Will you ask for information participants might consider personal or sensitive?',
            'Will any inducements be offered? If extra credit is offered, what other way is there to earn it? Without one, it can look like coercion.',
            'How will you maintain confidentiality during the study and beyond? Will any data be part of a record that can be identified with the participant?',
            'How will consent forms and data be collected and stored, whether paper or online? For paper: how long, how secured, where, how destroyed.'
          ]
        },
        { text: 'Source: NWOSU IRB Application Template (revised 8-7-2025). Do not leave questions unanswered: write N/A where a question does not apply.' }
      ]
    }
  ],
  prefills: [
    {
      id: 'fromRecruitment',
      label: 'Copy my survey tool and storage from Recruitment and Consent',
      when: (p) => Boolean(text(p.recruitmentConsent?.surveyTool)),
      apply: (p) => (text(p.ethicsPlan?.storage) ? {} : { storage: text(p.recruitmentConsent.surveyTool) })
    }
  ],
  links: [{ label: 'Ch. 3: research ethics', to: '/topic/rm-chapter-3' }]
}

/* ------------------------------------------------------------------ Analysis Plan */

const ANALYSIS_PLAN = {
  key: 'analysisPlan',
  title: 'Analysis Plan',
  objective:
    'Plan how you would analyze the data your study would collect, so your design and your tests match your hypotheses. Quantitative students name the test for each hypothesis and say why it fits. Qualitative students explain how they would code and build themes.',
  flow: 'Methods Section → <strong>Analysis Plan</strong> → Full Draft Proposal',
  byClass: {
    'research-methods': {
      objective:
        'Plan how you will analyze the data you are about to collect, so your tests match your hypotheses before the first participant responds. For each hypothesis, name the test and why it fits, how you will check its assumptions, and what a result that supports it would look like. You will run these analyses for your poster.',
      flow: 'Your approved IRB protocol → <strong>Analysis Plan</strong> → Data collection → Progress Report 4 and poster'
    }
  },
  blocks: [
    {
      id: 'recap',
      title: 'Your hypotheses and variables',
      intro: 'Start from what you are testing. Every hypothesis needs a variable list the test can use.',
      fields: [
        F('hypothesisRecap', 'My hypotheses or guiding questions', { required: true, helpNote: 'Copy them from your Research Question and Hypotheses worksheet.' }),
        F('variables', 'Each variable, its role, and its level of measurement', { required: true, helpTopicId: 'rm-chapter-4', helpNote: 'For each: independent, dependent, or other; nominal, ordinal, interval, or ratio. The level of measurement narrows which tests fit.' })
      ]
    },
    {
      id: 'tests',
      title: 'A test for each hypothesis',
      intro: 'Quantitative: name the statistical test and why it fits the design and the measures. Qualitative: write your coding and analysis strategy.',
      fields: [
        F('descriptives', 'First, how will you describe your data?', { helpTopicId: 'rm-chapter-12', helpNote: 'Which descriptive statistics and graphs for each variable.' }),
        F('testPerHypothesis', 'The test for each hypothesis and why it fits', { required: true, helpTopicId: 'rm-chapter-13', helpNote: 'For each hypothesis: the test, the variables it uses, and why it fits the design and the level of measurement. Chapter 13 covers inferential tests.' }),
        F('assumptions', 'Assumptions you would check', { helpNote: 'For example, normality, equal variances, independence, sample size. Say how you would check each.' }),
        F('codingStrategy', 'Qualitative or mixed: coding and analysis strategy', { helpNote: 'Who codes, what coding method, how codes become themes, and how you would check your coding.' })
      ]
    },
    {
      id: 'mock',
      title: 'What your results would look like',
      intro: 'A mock table or figure shows the layout of your real results with placeholder values. It proves your plan produces the answer to your hypothesis.',
      fields: [
        F('mockTable', 'Mock table (describe the rows, columns, and placeholders)', { required: true, helpNote: 'For example: Table 1, Means and standard deviations of stress by group (M = __, SD = __). Say what each column holds.' }),
        F('mockFigure', 'Mock figure (optional)', { helpNote: 'The type of graph, what is on each axis, and what pattern would support your hypothesis.' }),
        F('interpretation', 'What result would support each hypothesis, and what would not', { helpNote: 'For example: a significant difference with the control group lower than the treatment group would support H1.' })
      ]
    }
  ],
  references: [
    {
      id: 'mocktips',
      title: 'Building a mock APA table',
      open: true,
      parts: [
        {
          items: [
            'Number the table and give it a short title in italics above it. APA 7 puts the number in bold and the title in italic title case on the next line.',
            'Put a row for each variable or group, and a column for each statistic you would report (for example, M, SD, n).',
            'Use placeholders (M = __) so nobody reads them as real results. Keep the layout exactly as real results would appear.',
            'Add a note under the table that says what the placeholders stand for and which test the p values would come from.'
          ]
        }
      ]
    },
    {
      id: 'choose',
      title: 'Choosing the test',
      parts: [
        {
          text: 'Start with your question and the levels of measurement, not with the test. Two groups on an interval outcome, three or more groups, a relationship between two continuous variables, and two categorical variables each point to a different family of tests. Methods Market’s Analyze your data tool walks through the choice and shows the SPSS steps.'
        }
      ]
    }
  ],
  prefills: [
    {
      id: 'fromQuestions',
      label: 'Copy my hypotheses from Research Question and Hypotheses',
      when: (p) => Boolean(text(p.questionHypotheses?.hypotheses)),
      apply: (p) => (text(p.analysisPlan?.hypothesisRecap) ? {} : { hypothesisRecap: text(p.questionHypotheses.hypotheses) })
    }
  ],
  links: [
    { label: 'Ch. 12: descriptive statistics', to: '/topic/rm-chapter-12' },
    { label: 'Ch. 13: inferential statistics', to: '/topic/rm-chapter-13' }
  ],
  classLinks: [{ label: 'Analyze your data (SPSS steps)', path: '/data-analysis' }]
}

export const GUIDED_WORKSHEETS = {
  'question-hypotheses': QUESTION_HYPOTHESES,
  'methods-section': METHODS_SECTION,
  'ethics-plan': ETHICS_PLAN,
  'analysis-plan': ANALYSIS_PLAN
}

/** A worksheet, with the wording for a class laid over it (objective and flow differ between Intro to Research and Research Methods). */
export function guidedWorksheet (sectionId, classId = null) {
  const ws = GUIDED_WORKSHEETS[sectionId]
  if (!ws) return null
  const over = classId ? ws.byClass?.[classId] : null
  return over ? { ...ws, ...over } : ws
}

/** Every worksheet's saved answers, empty. Added to the project so old drafts load cleanly. */
export function emptyGuidedAnswers () {
  const out = {}
  for (const ws of Object.values(GUIDED_WORKSHEETS)) {
    const o = {}
    for (const b of ws.blocks) for (const f of b.fields) o[f.id] = ''
    out[ws.key] = o
  }
  return out
}

function fieldsOf (ws) {
  return ws.blocks.flatMap((b) => b.fields)
}

/** How many required fields are filled. ready means every required field has text. */
export function guidedProgress (project, sectionId) {
  const ws = GUIDED_WORKSHEETS[sectionId]
  if (!ws) return { filled: 0, total: 0, ready: false }
  const answers = project?.[ws.key] ?? {}
  const req = fieldsOf(ws).filter((f) => f.required)
  const filled = req.filter((f) => text(answers[f.id])).length
  const started = fieldsOf(ws).filter((f) => text(answers[f.id])).length
  return { filled, total: req.length, started, ready: req.length > 0 && filled === req.length }
}

export function guidedProgressLabel (project, sectionId) {
  const p = guidedProgress(project, sectionId)
  if (p.ready) return 'Required parts done'
  if (!p.started) return 'Not started'
  return `${p.filled}/${p.total} required parts`
}

export function buildGuidedExport (sectionId, project) {
  const ws = GUIDED_WORKSHEETS[sectionId]
  if (!ws) return ''
  const answers = project?.[ws.key] ?? {}
  const out = [`${ws.title}\n${'='.repeat(ws.title.length)}\n`]
  for (const b of ws.blocks) {
    out.push(`\n${b.title}\n${'-'.repeat(b.title.length)}\n`)
    for (const f of b.fields) {
      out.push(`${f.exportLabel}\n${text(answers[f.id]) || '(not filled in)'}\n`)
    }
  }
  return out.join('\n').trim()
}
