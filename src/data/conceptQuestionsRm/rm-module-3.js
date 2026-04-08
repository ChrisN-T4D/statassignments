// Research Methods — Module 3: Research Ethics
export const rmModule3Questions = [
  {
    id: 'rm-m3-q1',
    moduleId: 'rm-module-3',
    type: 'multiple_choice',
    question: 'In the U.S. federal system, research involving human subjects at institutions typically requires review by:',
    options: [
      { id: 'a', text: 'Only the department chair' },
      { id: 'b', text: 'An Institutional Review Board (IRB) or equivalent ethics review' },
      { id: 'c', text: 'Social media followers' },
      { id: 'd', text: 'No one if the study is online' }
    ],
    correct: 'b',
    feedback: {
      correct: 'IRB (or equivalent) review protects participant welfare and rights.',
      incorrect: 'Human subjects research generally requires formal ethics review, not informal approval alone.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m3-q2',
    moduleId: 'rm-module-3',
    type: 'true_false',
    question: 'Informed consent means participants understand the study’s purpose, procedures, risks, and their rights before agreeing.',
    correct: true,
    feedback: {
      correct: 'Informed consent is based on disclosure, comprehension, and voluntary agreement.',
      incorrect: 'Consent is more than a signature—it requires meaningful information and voluntariness.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m3-q3',
    moduleId: 'rm-module-3',
    type: 'multiple_choice',
    question: 'Deception in research is:',
    options: [
      { id: 'a', text: 'Never permissible' },
      { id: 'b', text: 'Sometimes allowed when justified, alternatives are infeasible, and debriefing occurs' },
      { id: 'c', text: 'Required for all experiments' },
      { id: 'd', text: 'Allowed whenever results would be cooler' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Deception is tightly regulated: necessity, minimal harm, and debriefing matter.',
      incorrect: 'Deception is exceptional and must meet ethical scrutiny, not convenience.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m3-q4',
    moduleId: 'rm-module-3',
    type: 'multiple_select',
    question: 'Which are core principles in the Belmont Report framework? (Select all that apply)',
    options: [
      { id: 'a', text: 'Respect for persons' },
      { id: 'b', text: 'Beneficence' },
      { id: 'c', text: 'Maximizing publication count' },
      { id: 'd', text: 'Justice' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Belmont emphasizes respect for persons, beneficence, and justice.',
      incorrect: 'Publication quantity is not an ethical principle in Belmont.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m3-q5',
    moduleId: 'rm-module-3',
    type: 'multiple_choice',
    question: 'Confidentiality in human research primarily protects:',
    options: [
      { id: 'a', text: 'The researcher’s laptop password only' },
      { id: 'b', text: 'Participant information from inappropriate disclosure' },
      { id: 'c', text: 'Journal impact factors' },
      { id: 'd', text: 'Anonymous internet trolls' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Confidentiality limits who can access identifiable or sensitive participant data.',
      incorrect: 'Confidentiality concerns protecting participant data, not unrelated assets.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m3-q6',
    moduleId: 'rm-module-3',
    type: 'true_false',
    question: 'Risk–benefit analysis asks whether potential benefits justify risks to participants and society.',
    correct: true,
    feedback: {
      correct: 'Ethical review weighs risks to participants against scientific and social value.',
      incorrect: 'Beneficence includes assessing whether risks are justified by prospective benefits.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m3-q7',
    moduleId: 'rm-module-3',
    type: 'multiple_choice',
    question: 'Vulnerable populations (e.g., children, prisoners) often require:',
    options: [
      { id: 'a', text: 'Less oversight because they consent quickly' },
      { id: 'b', text: 'Additional safeguards because of reduced autonomy or coercion concerns' },
      { id: 'c', text: 'No parental permission ever' },
      { id: 'd', text: 'Payment that replaces consent' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Extra protections address consent capacity and coercion.',
      incorrect: 'Vulnerability usually triggers stronger protections, not weaker oversight.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m3-q8',
    moduleId: 'rm-module-3',
    type: 'multiple_choice',
    question: 'Debriefing after a study is especially important when:',
    options: [
      { id: 'a', text: 'Participants were misled about the purpose to preserve validity' },
      { id: 'b', text: 'The study was purely observational in public with no interaction' },
      { id: 'c', text: 'Results were not significant' },
      { id: 'd', text: 'The IRB waived all documentation' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Debriefing helps restore trust and explain deception when used.',
      incorrect: 'Debriefing is critical when deception occurred; public observation may not need the same debriefing.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m3-q9',
    moduleId: 'rm-module-3',
    type: 'true_false',
    question: 'Researchers can ignore ethical standards if they believe their hypothesis is important.',
    correct: false,
    feedback: {
      correct: 'Ethical obligations apply regardless of the researcher’s enthusiasm.',
      incorrect: 'Importance of a question never excuses violating ethical duties to participants.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m3-q10',
    moduleId: 'rm-module-3',
    type: 'multiple_select',
    question: 'Which practices support ethical data handling? (Select all that apply)',
    options: [
      { id: 'a', text: 'Secure storage and limited access to identifiable data' },
      { id: 'b', text: 'Sharing identifiable data publicly without restriction' },
      { id: 'c', text: 'Following data retention policies' },
      { id: 'd', text: 'Anonymizing or de-identifying data when appropriate' }
    ],
    correct: ['a', 'c', 'd'],
    feedback: {
      correct: 'Security, retention rules, and de-identification protect participants.',
      incorrect: 'Public sharing of identifiable data without safeguards is generally unethical.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m3-q11',
    moduleId: 'rm-module-3',
    type: 'multiple_choice',
    question: 'Coercion in recruitment is reduced by:',
    options: [
      { id: 'a', text: 'Making participation mandatory for course credit without alternatives' },
      { id: 'b', text: 'Offering equitable alternatives to participation and clear voluntariness' },
      { id: 'c', text: 'Threatening grade penalties' },
      { id: 'd', text: 'Withholding study purpose entirely in all cases' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Equitable alternatives and voluntary choice reduce undue pressure.',
      incorrect: 'Mandatory participation without alternatives can be coercive.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m3-q12',
    moduleId: 'rm-module-3',
    type: 'multiple_choice',
    question: 'Justice in human subjects research emphasizes:',
    options: [
      { id: 'a', text: 'Fair selection of participants—not overburdening vulnerable groups while others benefit' },
      { id: 'b', text: 'Publishing only positive results' },
      { id: 'c', text: 'Excluding minorities to simplify analysis' },
      { id: 'd', text: 'Paying participants nothing always' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Justice concerns fair distribution of research burdens and benefits.',
      incorrect: 'Justice is about equitable inclusion and burden sharing, not convenience sampling bias.'
    },
    difficulty: 'hard'
  }
]
