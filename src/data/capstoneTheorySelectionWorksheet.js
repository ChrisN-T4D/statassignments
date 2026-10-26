/**
 * Theory Selection worksheet (PSYC 5033 Intro to Research, week 4).
 * Adapted from the course's "16 Common Psychology Theories for Graduate Research" Canvas page, whose menu and example
 * questions are kept. The student names three candidate theories, chooses one, and justifies the choice, so the theory frames the
 * literature review (the next worksheet, Lit Review Outline, starts from it).
 */

/** The menu: browse only. Methods Market does not recommend a theory for a topic. */
export const THEORY_MENU = [
  { name: 'Maslach’s Burnout Theory', question: 'How does participation in mindfulness-based stress reduction influence levels of emotional exhaustion and depersonalization among counseling graduate students?' },
  { name: 'Social Comparison Theory (Festinger)', question: 'What is the relationship between upward social comparison on Instagram and body dissatisfaction in female undergraduates?' },
  { name: 'Cognitive-Behavioral Model (Beck)', question: 'Does cognitive restructuring reduce negative automatic thoughts in clients with generalized anxiety disorder compared to supportive counseling?' },
  { name: 'Theory of Planned Behavior (Ajzen)', question: 'How do attitudes, perceived norms, and self-efficacy predict college students’ intentions to seek counseling services?' },
  { name: 'Self-Determination Theory (Deci & Ryan)', question: 'Does autonomy support in counseling predict higher intrinsic motivation among clients in substance use treatment?' },
  { name: 'Attachment Theory (Bowlby & Ainsworth)', question: 'How do adult attachment styles relate to relationship satisfaction among couples seeking counseling?' },
  { name: 'Social Learning Theory (Bandura)', question: 'Does observing peer coping strategies in group counseling increase self-efficacy for stress management in high school students?' },
  { name: 'Stress and Coping Model (Lazarus & Folkman)', question: 'How do emotion-focused versus problem-focused coping strategies relate to depression symptoms in first-year college students?' },
  { name: 'Transtheoretical Model of Change (Prochaska & DiClemente)', question: 'What stage of change are clients in when they begin substance abuse counseling, and how does this stage predict treatment retention?' },
  { name: 'Mindfulness-Based Stress Reduction (Kabat-Zinn)', question: 'Does participation in an 8-week MBSR program reduce perceived stress scores in healthcare workers compared to a control group?' },
  { name: 'Ecological Systems Theory (Bronfenbrenner)', question: 'How do school, family, and peer factors interact to predict resilience in adolescents exposed to community violence?' },
  { name: 'Positive Psychology / PERMA Model (Seligman)', question: 'Does participation in a gratitude journaling intervention increase overall life satisfaction scores among college students?' },
  { name: 'Motivational Interviewing (Miller & Rollnick)', question: 'Does motivational interviewing increase treatment adherence in clients enrolled in outpatient addiction programs compared to standard psychoeducation?' },
  { name: 'Cognitive Dissonance Theory (Festinger)', question: 'Does inducing cognitive dissonance reduce binge drinking behavior among college students?' },
  { name: 'Trauma-Informed Care Framework', question: 'How do teachers perceive the effectiveness of trauma-informed practices in improving classroom management?' },
  { name: 'Biopsychosocial Model (Engel)', question: 'How do biological (family history), psychological (coping style), and social (peer support) factors predict relapse in clients with major depressive disorder?' }
]

export const THEORY_SELECTION_META = {
  objective:
    'Choose the theory that will frame your project. Your choice has to be grounded in published research and connect clearly to your topic. A strong framework shows your project is part of a scholarly conversation, not just a personal interest.',
  reminder:
    'You are not limited to the 16 on the menu. Any evidence-based framework that fits your topic works, if you can justify it with scholarly sources.'
}

/** Three candidate cards. Each has the theory, what it says, and how it could frame the topic. */
export const CANDIDATE_FIELDS = [1, 2, 3].flatMap((n) => [
  {
    id: `c${n}Theory`,
    label: `Candidate ${n}: theory or model`,
    exportLabel: `Candidate ${n}: theory or model`,
    required: true,
    multiline: false,
    helpNote: n === 1 ? 'Name it as the authors do (for example, Self-Determination Theory, Deci & Ryan).' : null
  },
  {
    id: `c${n}Says`,
    label: `Candidate ${n}: what it says, in your words`,
    exportLabel: `Candidate ${n}: what the theory says, in your own words`,
    required: false,
    multiline: true,
    helpNote: n === 1 ? 'Two or three sentences. Do not copy from a source.' : null
  },
  {
    id: `c${n}Frames`,
    label: `Candidate ${n}: how it could frame your topic`,
    exportLabel: `Candidate ${n}: how it could frame your topic`,
    required: false,
    multiline: true,
    helpNote: n === 1 ? 'What would your topic look like through this lens?' : null
  }
])

/** The decision. */
export const CHOICE_FIELDS = [
  {
    id: 'chosenTheory',
    label: 'The theory I choose',
    exportLabel: 'The theory I choose',
    required: true,
    multiline: false,
    helpTopicId: 'rm-chapter-1',
    helpNote: 'Chapter 1 covers what a theory is and how theories are tested.'
  },
  {
    id: 'whyItFits',
    label: 'Why it fits better than the others',
    exportLabel: 'Why this theory fits my topic and the literature better than the others',
    required: true,
    multiline: true,
    helpNote: 'Connect it to your topic and to what you have read. Say why the others fit less well.'
  },
  {
    id: 'sourcesApplied',
    label: 'Peer-reviewed sources that applied it',
    exportLabel: 'Peer-reviewed sources that applied this theory (APA references)',
    required: false,
    multiline: true,
    helpTopicId: 'rm-chapter-11',
    helpNote: 'Your choice must be grounded in existing research. List at least two sources from your annotated bibliography or your searches.'
  },
  {
    id: 'prediction',
    label: 'What the theory predicts that your project could test',
    exportLabel: 'What the theory predicts that my project could test',
    required: false,
    multiline: true,
    helpNote: 'One or two sentences. This is where your hypotheses will come from later.'
  }
]

export const THEORY_SELECTION_FIELDS = [...CANDIDATE_FIELDS, ...CHOICE_FIELDS]

export function emptyTheorySelection () {
  const out = {}
  for (const f of THEORY_SELECTION_FIELDS) out[f.id] = ''
  return out
}
