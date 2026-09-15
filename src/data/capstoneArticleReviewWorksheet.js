/**
 * PSYC 4223 Article Review worksheet field schema (Canvas template).
 * Source: article_review worksheet PDF (Fall 2026).
 * Used by Study Plan article-review section and buildExportText().
 */

/** Worksheet header (top of submission). */
export const ARTICLE_REVIEW_HEADER_FIELDS = [
  {
    id: 'studentName',
    label: 'Name',
    exportLabel: 'Name:',
    required: false,
    helpTopicId: null
  },
  {
    id: 'proposedProjectTitle',
    label: 'Proposed title for your project',
    exportLabel: 'Proposed title for your project (this should reflect a research focus and be clear to your reader):',
    required: true,
    helpTopicId: 'rm-chapter-2',
    helpNote: 'Reflect a narrow research focus. See Ch. 2 on moving from topic to researchable question.'
  }
]

/**
 * One card per article. Canvas expects 6–8 completed reviews (minimum 6).
 * Methods Market starts with 8 cards; students may add unlimited cards — export includes every card with content.
 * @type {Array<{ id: string, label: string, exportLabel: string, required: boolean, multiline?: boolean, helpTopicId?: string, helpNote?: string }>}
 */
export const ARTICLE_CARD_FIELDS = [
  {
    id: 'apaReference',
    label: 'Complete reference (APA)',
    exportLabel: 'Complete reference (in APA)',
    required: true,
    helpTopicId: 'rm-chapter-11',
    helpNote: 'Use Ch. 11 for APA 7. Verify the source in your library database before you cite it.'
  },
  {
    id: 'researcherWhatQuestion',
    label: 'Researchers’ “what” question',
    exportLabel:
      'What was the answer to the researchers’ “what” question (what is their research question and focus)?',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-2',
    helpNote: 'Summarize in your own words. Do not copy from the article abstract.'
  },
  {
    id: 'researcherWhyQuestion',
    label: 'Researchers’ “why” question',
    exportLabel:
      'What was the answer to the researchers’ “why” question (what was the gap they found or reason they stated for conducting their research)?',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-2',
    helpNote: 'What gap or rationale did the authors give in the introduction?'
  },
  {
    id: 'participantsSummary',
    label: 'Participants / subjects',
    exportLabel:
      'Give a brief summary of the subjects/participants in their study to include general demographics and sampling procedures. Include their sample size and any rationale for this. (You should not include excessive or irrelevant details here).',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-7',
    helpNote: 'Ch. 7 (survey sampling) and Ch. 5 (experimental samples) describe sampling vocabulary.'
  },
  {
    id: 'methodologyOverview',
    label: 'Methodology overview',
    exportLabel:
      'Give a general overview of their methodology. This should include their measures and instruments used, and any helpful details you might need to understand their research. (Give sufficient details but do not repeat entire methods section.)',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-4',
    helpNote: 'Name design type in plain language. Ch. 4 covers measures; Ch. 5–7 cover design families.'
  },
  {
    id: 'resultsSummary',
    label: 'Results / discussion / conclusion',
    exportLabel:
      'Give a brief summary of results/discussion/conclusion from the article. (Summarize what the research indicated, and other important details from the article.)',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-2',
    helpNote: 'Focus on what they found and how they interpreted it.'
  },
  {
    id: 'strengths',
    label: 'Strengths',
    exportLabel: 'What strengths of the research and design did you notice?',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-4',
    helpNote: 'Consider reliability, validity, sampling, and design fit.'
  },
  {
    id: 'weaknesses',
    label: 'Weaknesses',
    exportLabel: 'What weaknesses of the research and design did you notice?',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-4',
    helpNote: 'Thoughtful critique strengthens your own proposal later.'
  },
  {
    id: 'connectionToProposal',
    label: 'Connection to your proposal',
    exportLabel:
      'How does this article help in the development of your proposal? How might you use this in the background to you study? (Be sure to specifically connect the article to your project here.)',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-2',
    helpNote: 'Tie this study to your proposed project title and emerging problem.'
  },
  {
    id: 'otherComments',
    label: 'Other comments (optional)',
    exportLabel: 'Other comments or important notations (optional – for your benefit)',
    required: false,
    multiline: true,
    helpTopicId: null,
    helpNote: null
  }
]

/**
 * Self-check only — not on Canvas template; guides searching and peer-review evaluation.
 * MM shows lookFor prompts; student checks boxes after looking — no pass/fail.
 */
export const SOURCE_SELF_CHECK_ITEMS = [
  {
    id: 'foundInLibraryDatabase',
    label: 'I found this article through a library database (e.g., PsycINFO).',
    helpTopicId: 'rm-chapter-2',
    helpNote: 'Start in your university library databases, not the open web alone.',
    lookFor: [
      'I searched PsycINFO, Academic Search Complete, or another library database',
      'I can name which database I used',
      'I did not rely on Google or a random .com page as my only source'
    ]
  },
  {
    id: 'scholarlyJournal',
    label: 'It appears in a scholarly, peer-reviewed journal (not a magazine, blog, or textbook chapter).',
    helpTopicId: 'rm-chapter-2',
    helpNote:
      'Peer review means experts evaluated the manuscript before publication. It does not mean the study is correct.',
    lookFor: [
      'The PDF shows a journal name (not a news site, magazine, or blog)',
      'Volume and issue numbers appear (e.g., Vol. 42, No. 3)',
      'Authors list university or research affiliations',
      'A DOI or stable journal URL is present',
      'If unsure whether the journal is peer-reviewed, I checked with a librarian or instructor'
    ]
  },
  {
    id: 'originalEmpiricalStudy',
    label: 'It reports an original empirical study (Method and Results with data — not only a review or meta-analysis).',
    helpTopicId: 'rm-chapter-2',
    helpNote: 'Your article cards should be primary studies you read, not summaries of other people\'s work.',
    lookFor: [
      'The PDF has a Method (or Methods) section describing participants and procedure',
      'The PDF has a Results section with data (not just opinions)',
      'It is not a literature review, meta-analysis, book chapter, or editorial',
      'I can describe what the researchers actually did in my own words'
    ]
  },
  {
    id: 'pdfSaved',
    label: 'I saved the PDF and have the complete APA reference ready.',
    helpTopicId: 'rm-chapter-11',
    helpNote: 'You will attach PDFs in Canvas and reuse references in your literature review.',
    lookFor: [
      'I downloaded the full-text PDF (not just the abstract page)',
      'My APA reference includes authors, year, title, journal, volume, issue, and pages or DOI',
      'I can attach this PDF when I submit the Canvas assignment'
    ]
  }
]

/** Always-visible reference — guide only, not graded. */
export const PEER_REVIEW_REFERENCE = {
  title: 'What counts as peer-reviewed?',
  intro:
    'Use this while you evaluate each source. Methods Market does not decide for you — you look, then you check the boxes below on each article card.',
  usuallyPeerReviewed: [
    'Journal of ___ Psychology (or similar scholarly journal)',
    'Volume + issue + page range or DOI',
    'Method and Results sections with original data',
    'Authors with university affiliations'
  ],
  usuallyNot: [
    'News sites, blogs, Wikipedia, or general .com pages',
    'Magazine or newspaper articles (Psychology Today, etc.)',
    'Textbook chapters or encyclopedia entries',
    'Opinion pieces with no Method section'
  ],
  reminder:
    'Predatory journals exist. When in doubt, ask a librarian or your instructor before you spend time on the article.'
}

/** Where to look inside the PDF — shown on each article card. */
export const PDF_SNIFF_TEST = {
  title: 'Where to look in the PDF',
  items: [
    'Title page or header → journal name?',
    'First pages → abstract describes original data collection?',
    'Method section → participants, measures, design?',
    'Results section → statistics or data findings?',
    'Reference list → one citation you could follow next (citation chaining)'
  ]
}

/** After all article cards — still part of Article Review assignment. */
export const ARTICLE_REVIEW_PROBLEM_STATEMENT = {
  id: 'problemStatement',
  sectionTitle: 'Problem Statement',
  intro:
    'Based on your literature review, write a condensed version of what would be considered an appropriate problem statement for your project. Keep in mind the three important components: What we know (what the literature review has shown us), what we don’t know (the gap), and what we want to know (how your research might fill that gap).',
  promptFields: [
    {
      id: 'whatWeKnow',
      label: 'What we know',
      exportLabel: 'What we know (from your article reviews)',
      required: true,
      multiline: true
    },
    {
      id: 'whatWeDontKnow',
      label: 'What we don’t know (the gap)',
      exportLabel: 'What we don’t know (the gap)',
      required: true,
      multiline: true
    },
    {
      id: 'whatWeWantToKnow',
      label: 'What we want to know',
      exportLabel: 'What we want to know (how your research might fill that gap)',
      required: true,
      multiline: true
    },
    {
      id: 'problemStatementDraft',
      label: 'Problem statement (combined)',
      exportLabel: 'Problem Statement',
      required: true,
      multiline: true,
      helpNote:
        'Example structure (write your own): Although [what we know], [gap], which is concerning because [why it matters]. This study addresses this problem by [brief preview].'
    }
  ],
  helpTopicId: 'rm-chapter-2'
}

/** End of Article Review worksheet — early draft; refined in lit review and Phase 3. */
export const ARTICLE_REVIEW_RQ_HYPOTHESIS = {
  sectionTitle: 'Research Question(s) and Hypothesis(es)',
  fields: [
    {
      id: 'researchQuestions',
      label: 'Research question(s)',
      exportLabel: 'Research Question(s):',
      required: true,
      multiline: true,
      helpTopicId: 'rm-chapter-2'
    },
    {
      id: 'hypotheses',
      label: 'Hypothesis(es)',
      exportLabel: 'Hypothesis(es):',
      required: true,
      multiline: true,
      helpTopicId: 'rm-chapter-2',
      helpNote: 'You will refine these after your full literature review. Match wording to your eventual design path.'
    }
  ]
}

/** Blocks on the Canvas Word/PDF template (not a Methods Market limit). */
export const ARTICLE_REVIEW_TEMPLATE_ARTICLE_COUNT = 8
/** Default empty cards when a project is first created. */
export const ARTICLE_REVIEW_INITIAL_CARD_COUNT = 8
/** Minimum complete cards for Canvas submission. */
export const ARTICLE_REVIEW_MIN_ARTICLES = 6
/** Canvas assignment wording for submit range. */
export const ARTICLE_REVIEW_CANVAS_RANGE_LABEL = '6–8'

export function emptyArticleCard () {
  return {
    id: crypto.randomUUID(),
    apaReference: '',
    researcherWhatQuestion: '',
    researcherWhyQuestion: '',
    participantsSummary: '',
    methodologyOverview: '',
    resultsSummary: '',
    strengths: '',
    weaknesses: '',
    connectionToProposal: '',
    otherComments: '',
    sourceSelfCheck: {
      foundInLibraryDatabase: false,
      scholarlyJournal: false,
      originalEmpiricalStudy: false,
      pdfSaved: false
    }
  }
}

export function emptyArticleReviewSection () {
  return {
    studentName: '',
    proposedProjectTitle: '',
    articleCards: Array.from({ length: ARTICLE_REVIEW_INITIAL_CARD_COUNT }, () => emptyArticleCard()),
    problemStatement: {
      whatWeKnow: '',
      whatWeDontKnow: '',
      whatWeWantToKnow: '',
      problemStatementDraft: ''
    },
    researchQuestions: '',
    hypotheses: ''
  }
}
