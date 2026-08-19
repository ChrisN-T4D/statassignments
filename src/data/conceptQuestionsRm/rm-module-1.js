// Research Methods — Module 1: The Science of Psychology
export const rmModule1Questions = [
  {
    id: 'rm-m1-q1',
    moduleId: 'rm-module-1',
    type: 'multiple_choice',
    question: 'Which approach relies on systematic, empirical observation and public procedures that others can check?',
    options: [
      { id: 'a', text: 'Authority alone' },
      { id: 'b', text: 'Intuition alone' },
      { id: 'c', text: 'The scientific method' },
      { id: 'd', text: 'Anecdotal evidence alone' }
    ],
    correct: 'c',
    feedback: {
      correct: 'Science uses systematic observation, transparency, and evidence subject to scrutiny.',
      incorrect: 'Science emphasizes empirical evidence and methods others can evaluate—not uncheckable claims.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m1-q2',
    moduleId: 'rm-module-1',
    type: 'multiple_choice',
    question: '§1 Methods of Knowing: Intuition as a way of knowing relies on:',
    options: [
      { id: 'a', text: 'Systematic observation under controlled conditions' },
      { id: 'b', text: 'Gut feelings, emotions, and instincts rather than rational analysis' },
      { id: 'c', text: 'Published methods others can verify' },
      { id: 'd', text: 'Logical rules applied to stated premises' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Chapter 1 defines intuition as relying on guts, emotions, and instincts—not systematic evidence.',
      incorrect: 'Intuition means believing what feels true rather than examining facts with rational rules.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m1-q3',
    moduleId: 'rm-module-1',
    type: 'multiple_choice',
    question: '§3 Goals of Science: The three goals of science named in Chapter 1 are to describe, predict, and:',
    options: [
      { id: 'a', text: 'Explain' },
      { id: 'b', text: 'Control' },
      { id: 'c', text: 'Legislate' },
      { id: 'd', text: 'Popularize' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Chapter 1 lists describe, predict, and explain as the three goals of science.',
      incorrect: 'The third goal in this chapter is explain—not control (though control appears elsewhere in research talk).'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m1-q4',
    moduleId: 'rm-module-1',
    type: 'multiple_select',
    question: 'Which practices help reduce biased reasoning when evaluating claims? (Select all that apply)',
    options: [
      { id: 'a', text: 'Seeking independent replication' },
      { id: 'b', text: 'Ignoring effect sizes if p < .05' },
      { id: 'c', text: 'Considering alternative explanations' },
      { id: 'd', text: 'Relying only on confirming evidence' }
    ],
    correct: ['a', 'c'],
    feedback: {
      correct: 'Replication and considering alternatives strengthen critical evaluation.',
      incorrect: 'Good practice includes replication and weighing alternatives, not only confirmatory evidence.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m1-q5',
    moduleId: 'rm-module-1',
    type: 'multiple_choice',
    question: 'Confirmation bias refers to:',
    options: [
      { id: 'a', text: 'Preferring evidence that supports what we already believe' },
      { id: 'b', text: 'Random assignment of participants' },
      { id: 'c', text: 'Using double-blind procedures' },
      { id: 'd', text: 'Reporting null results' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Confirmation bias is the tendency to favor information consistent with prior beliefs.',
      incorrect: 'Confirmation bias involves overweighting supportive evidence, not methodological controls.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m1-q6',
    moduleId: 'rm-module-1',
    type: 'true_false',
    question: 'A single study, however well designed, is usually sufficient to settle a complex scientific debate.',
    correct: false,
    feedback: {
      correct: 'Converging evidence from multiple studies and methods is typically needed.',
      incorrect: 'Science progresses through replication and converging lines of evidence, not single studies alone.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m1-q7',
    moduleId: 'rm-module-1',
    type: 'multiple_choice',
    question: 'Pseudoscience is often distinguished from science because pseudoscientific claims tend to:',
    options: [
      { id: 'a', text: 'Make vague predictions that resist falsification' },
      { id: 'b', text: 'Publish methods and data openly' },
      { id: 'c', text: 'Invite replication by independent labs' },
      { id: 'd', text: 'Revise theories when predictions fail' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Pseudoscience often avoids clear, risky predictions that could disprove the claim.',
      incorrect: 'Science favors testable claims and revision; pseudoscience often shields claims from refutation.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m1-q8',
    moduleId: 'rm-module-1',
    type: 'multiple_choice',
    question: 'A claim is most scientific when it is:',
    options: [
      { id: 'a', text: 'Framed so evidence could potentially disconfirm it' },
      { id: 'b', text: 'Protected from disproof by vague wording' },
      { id: 'c', text: 'Accepted because it feels intuitive' },
      { id: 'd', text: 'Declared true by authority' }
    ],
    correct: 'a',
    feedback: {
      correct: 'Scientific claims are testable and falsifiable: data could support or challenge them.',
      incorrect: 'Science requires claims that can, in principle, be tested and potentially disproven.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m1-q9',
    moduleId: 'rm-module-1',
    type: 'true_false',
    question: 'Common sense and personal experience are always reliable guides to how most people behave in general.',
    correct: false,
    feedback: {
      correct: 'Everyday reasoning can be biased and unrepresentative; research uses systematic methods.',
      incorrect: 'Personal experience is limited and prone to bias; science uses broader, systematic evidence.'
    },
    difficulty: 'easy'
  },
  {
    id: 'rm-m1-q10',
    moduleId: 'rm-module-1',
    type: 'multiple_choice',
    question: 'Which question is most clearly framed as empirical and falsifiable?',
    options: [
      { id: 'a', text: 'Is free will an illusion?' },
      { id: 'b', text: 'Do participants who sleep 8 hours score higher on a memory test than those who sleep 4 hours?' },
      { id: 'c', text: 'What is the meaning of life?' },
      { id: 'd', text: 'Should people be kinder?' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Empirical questions specify measurable variables and comparisons that data can address.',
      incorrect: 'Falsifiable empirical questions specify observations or comparisons that could support or refute a claim.'
    },
    difficulty: 'hard'
  },
  {
    id: 'rm-m1-q11',
    moduleId: 'rm-module-1',
    type: 'multiple_select',
    question: 'Which are hallmarks of scientific thinking? (Select all that apply)',
    options: [
      { id: 'a', text: 'Skepticism proportioned to evidence' },
      { id: 'b', text: 'Willingness to update beliefs when data warrant' },
      { id: 'c', text: 'Accepting claims because they feel intuitive' },
      { id: 'd', text: 'Transparency about methods and limitations' }
    ],
    correct: ['a', 'b', 'd'],
    feedback: {
      correct: 'Science values evidence-based skepticism, updating beliefs, and transparency.',
      incorrect: 'Science does not treat intuition alone as sufficient; it privileges evidence and openness.'
    },
    difficulty: 'medium'
  },
  {
    id: 'rm-m1-q12',
    moduleId: 'rm-module-1',
    type: 'multiple_choice',
    question: '§2 Understanding Science (Popper): A claim that psychic powers "disappear when observed too closely" is problematic because it makes the claim:',
    options: [
      { id: 'a', text: 'Too expensive to test' },
      { id: 'b', text: 'Unfalsifiable—no observation could count against it' },
      { id: 'c', text: 'Too empirical for psychology' },
      { id: 'd', text: 'Identical to a valid syllogism' }
    ],
    correct: 'b',
    feedback: {
      correct: 'Chapter 1 uses ESP-style claims to illustrate unfalsifiable pseudoscience.',
      incorrect: 'If any outcome can be explained away, the claim cannot be tested or refuted scientifically.'
    },
    difficulty: 'medium'
  }
]
