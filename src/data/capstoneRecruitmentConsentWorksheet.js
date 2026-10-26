/**
 * Recruitment and Consent worksheet (Research Methods IRB weeks, Intro to Research methods and ethics week).
 * Built from the NWOSU IRB Application Template (revised 8-7-2025). The IRB must see everything a participant will see:
 * the recruitment script (oral and/or written), the informed consent form (Appendix A), the instruments including the active
 * survey link, which must match the hard copy (Appendix B), a facility consent form when data are collected at a facility NWOSU
 * does not own (Appendix C), and, for social media, the post wording, platforms, distribution, and a documentation plan.
 * The template in Canvas is the official one. If it differs from this worksheet, follow the template.
 */

export const RC_META = {
  objective:
    'The IRB reviews everything a participant will see before you recruit anyone: your flier or post, your script, your consent form, and your survey. Write them here so they match each other and your Methods section.',
  source:
    'Wording follows the NWOSU IRB Application Template (revised 8-7-2025). The template in Canvas is the official version; if it differs from this worksheet, follow the template.',
  emailNote:
    'Survey solicitation by email to students, faculty, or staff is no longer allowed. If you think you need an exception, talk to the IRB chair first.'
}

/** Where you will recruit. Each channel needs wording the IRB can read. */
export const CHANNELS = [
  { id: 'oral', label: 'Spoken announcement or in-person ask (class, club, office, hallway)' },
  { id: 'flier', label: 'Printed or posted flier' },
  { id: 'social', label: 'Social media post' },
  { id: 'email', label: 'Email through Student Services (not allowed unless the IRB chair approves an exception)' },
  { id: 'other', label: 'Something else (describe in your script)' }
]

export const WHO_FIELDS = [
  {
    id: 'participantsOfInterest',
    label: 'Who are your participants?',
    exportLabel: 'Who are your participants of interest?',
    required: true,
    multiline: true,
    helpTopicId: 'rm-chapter-3',
    helpNote: 'For example: adults 18 or older who currently work in healthcare. Say how many you hope to reach.'
  },
  {
    id: 'whyAppropriate',
    label: 'Why are they the right people for your question?',
    exportLabel: 'Why are they appropriate for your study?',
    required: true,
    multiline: true,
    helpNote: 'Connect them to your research question. Recruiting “because it is easy” is not a reason.'
  },
  {
    id: 'exclusions',
    label: 'Who will you exclude, and why? (if anyone)',
    exportLabel: 'Exclusions and why they are needed',
    required: false,
    multiline: true,
    helpNote: 'If you exclude people by gender, race, location, or similar, explain why. Leave blank if you exclude no one.'
  },
  {
    id: 'facilityUse',
    label: 'Will you collect data at a facility NWOSU does not own?',
    exportLabel: 'Facility outside NWOSU (name it, or write “No”)',
    required: true,
    multiline: false,
    helpNote: 'Write No, or name the clinic, school, workplace, or other place. If you name one, you need the Facility Consent form below.'
  }
]

/** Pieces the post and the flier are built from. */
export const MESSAGE_FIELDS = [
  {
    id: 'marketingLine',
    label: 'Marketing line (a friendly hook)',
    exportLabel: 'Marketing line',
    required: false,
    multiline: false,
    helpNote: 'Students get many survey requests. A short hook helps: “Love music? Help us learn how it helps or hinders studying.”'
  },
  {
    id: 'courseName',
    label: 'Your course',
    exportLabel: 'Course',
    required: false,
    multiline: false,
    helpNote: 'For example: Research Methods (PSYC 4223).'
  },
  {
    id: 'projectDescription',
    label: 'What the study is about (one plain sentence)',
    exportLabel: 'Brief project description',
    required: true,
    multiline: false,
    helpNote: 'Write it so a stranger understands it. Do not use jargon.'
  },
  {
    id: 'eligibility',
    label: 'Who can take part',
    exportLabel: 'Eligibility',
    required: true,
    multiline: false,
    helpNote: 'Finish the sentence “If you are …”. For example: 18 or older and currently enrolled at NWOSU.'
  },
  {
    id: 'timeToComplete',
    label: 'How long it takes',
    exportLabel: 'Time to complete',
    required: true,
    multiline: false,
    helpNote: 'For example: 10-minute.'
  },
  {
    id: 'surveyLink',
    label: 'Survey link or QR code note',
    exportLabel: 'Survey link or QR code',
    required: false,
    multiline: false,
    helpNote: 'The active link must match your hard copy. Leave blank until you have it; the script will show a placeholder.'
  },
  {
    id: 'researcherEmail',
    label: 'Your NWOSU email',
    exportLabel: 'Researcher email',
    required: true,
    multiline: false
  },
  {
    id: 'advisorEmail',
    label: 'Your faculty advisor’s email',
    exportLabel: 'Faculty advisor email',
    required: true,
    multiline: false,
    helpNote: 'Posts must include contact information for both you and your advisor.'
  },
  {
    id: 'irbApprovalDate',
    label: 'IRB approval date',
    exportLabel: 'IRB approval date',
    required: false,
    multiline: false,
    helpNote: 'Fill this in when you have it. You may not post or recruit before approval; the IRB reads a draft with a placeholder.'
  }
]

/** Scripts the student edits after the builders write a first version. */
export const SCRIPT_FIELDS = [
  {
    id: 'oralScript',
    label: 'Spoken script',
    exportLabel: 'Oral recruitment script',
    required: false,
    multiline: true,
    helpNote: 'Say who you are, what the study is, who is eligible, that taking part is voluntary, and that consent comes before the survey.'
  },
  {
    id: 'flierScript',
    label: 'Flier wording',
    exportLabel: 'Flier wording',
    required: false,
    multiline: true,
    helpNote: 'Use the builder for a first draft, then edit. Fliers carry the same required facts as a post.'
  },
  {
    id: 'socialPost',
    label: 'Social media post',
    exportLabel: 'Social media post',
    required: false,
    multiline: true,
    helpNote: 'Use the builder for a first draft, then edit.'
  },
  {
    id: 'emailStatement',
    label: 'Email solicitation statement (only if the IRB chair approved an exception)',
    exportLabel: 'Email solicitation statement (exception only)',
    required: false,
    multiline: true
  }
]

/** What the IRB checks a social post for, and where the answer comes from. */
export const POST_REQUIREMENTS = [
  { id: 'description', label: 'Project description', field: 'projectDescription' },
  { id: 'irbDate', label: 'IRB approval date', field: 'irbApprovalDate' },
  { id: 'nwosu', label: 'States it is a study by an NWOSU student researcher', field: null, alwaysTrue: true },
  { id: 'link', label: 'Survey link or QR code', field: 'surveyLink' },
  { id: 'contacts', label: 'Your email and your advisor’s email', field: ['researcherEmail', 'advisorEmail'] },
  { id: 'eligibility', label: 'Who is eligible', field: 'eligibility' }
]

export const SOCIAL_PROTOCOL_FIELDS = [
  {
    id: 'socialPlatforms',
    label: 'Which platforms, exactly?',
    exportLabel: 'Platforms used for recruitment',
    required: false,
    multiline: false,
    helpNote: 'Name each one (Facebook, Instagram, LinkedIn, X). Each platform you use must be named in the application.'
  },
  {
    id: 'socialDistribution',
    label: 'How will you share it?',
    exportLabel: 'How the post will be shared',
    required: false,
    multiline: true,
    helpNote: 'Allowed: your own accounts; groups, with the administrator’s permission; your advisor’s accounts. Direct messages are not allowed unless the person told you they are interested first.'
  },
  {
    id: 'socialLogPlan',
    label: 'How will you document it?',
    exportLabel: 'Documentation plan (screenshots and log)',
    required: false,
    multiline: true,
    helpNote: 'Keep screenshots of every recruitment post. Keep a log of platforms, dates posted, and approximate reach. Changes to the post need your advisor’s approval before posting.'
  }
]

/** Commitments the template lists under ethical considerations. */
export const SOCIAL_COMMITMENTS = [
  { id: 'noCoercion', label: 'No coercive language, and no incentives beyond those approved in the application' },
  { id: 'platformRules', label: 'I will follow each platform’s rules about research recruitment' },
  { id: 'boundaries', label: 'I will keep my personal and research activity separate, and protect confidentiality while recruiting' },
  { id: 'noVulnerable', label: 'I will not target vulnerable groups that the application does not name' },
  { id: 'trackSource', label: 'I will track which responses came from which recruitment method' }
]

export const CONSENT_FIELDS = [
  {
    id: 'researcherName',
    label: 'Your name',
    exportLabel: 'Researcher name',
    required: true,
    multiline: false
  },
  {
    id: 'advisorName',
    label: 'Your faculty advisor’s name',
    exportLabel: 'Faculty advisor name',
    required: true,
    multiline: false
  },
  {
    id: 'consentTopic',
    label: 'What participants will be asked about',
    exportLabel: 'What participants will be asked about',
    required: true,
    multiline: true,
    helpNote: 'Write it as if the reader knows nothing about the project. If the subject could be sensitive, say so here. If it is not sensitive, say that.'
  },
  {
    id: 'consentBenefit',
    label: 'What the results could help us understand',
    exportLabel: 'What the results may help us understand',
    required: true,
    multiline: false,
    helpNote: 'Participants get no direct material benefit. They may benefit from knowing the results could help us understand something.'
  },
  {
    id: 'consentRisks',
    label: 'Risks (change the template sentence if it does not fit)',
    exportLabel: 'Risks',
    required: false,
    multiline: true,
    helpNote: 'Leave blank to use: “There are no known risks associated with this project greater than those ordinarily encountered in daily life.” Change it if your study has more.'
  },
  {
    id: 'consentIdentifying',
    label: 'Will you collect any identifying information?',
    exportLabel: 'Identifying information',
    required: false,
    multiline: true,
    helpNote: 'Leave blank if you will collect none. If you will collect names, emails, or anything that identifies someone, say what and why.'
  }
]

export const FACILITY_FIELDS = [
  {
    id: 'facilityName',
    label: 'Facility name',
    exportLabel: 'Facility',
    required: false,
    multiline: false
  },
  {
    id: 'facilityOfficial',
    label: 'Who signs (name and title)',
    exportLabel: 'Authorizing official (name and title)',
    required: false,
    multiline: false,
    helpNote: 'The CEO, director, or other authorized agent. The IRB needs the form, not the signature.'
  },
  {
    id: 'facilityPurpose',
    label: 'Purpose of the study, for the facility',
    exportLabel: 'Purpose of the study',
    required: false,
    multiline: true
  },
  {
    id: 'facilityParticipants',
    label: 'Who you will interview or survey there',
    exportLabel: 'Who will be interviewed or surveyed (clients, staff, students)',
    required: false,
    multiline: false
  }
]

/** Survey and instrument checks the IRB looks for. */
export const SURVEY_CHECKS = [
  { id: 'toolChosen', label: 'I chose the survey tool (Google Forms, Qualtrics, paper) and can say how data are stored' },
  { id: 'consentFirst', label: 'The full informed consent is the first thing participants see, and they cannot reach a question until they agree' },
  { id: 'hardCopyMatch', label: 'The hard copy I include in the packet matches the online survey word for word' },
  { id: 'linkIncluded', label: 'The active survey link (or QR code) is in the packet' },
  { id: 'instrumentsCited', label: 'Every published instrument names its authors and citation' },
  { id: 'modificationsExplained', label: 'If I changed an instrument, I say how and why' },
  { id: 'jargonFree', label: 'A stranger could read every item and understand it (no jargon or acronyms)' },
  { id: 'pilotTested', label: 'Someone else tried the survey from start to finish, and I timed it' }
]

export const SURVEY_FIELDS = [
  {
    id: 'surveyTool',
    label: 'Survey tool and how data are stored',
    exportLabel: 'Survey tool and data storage',
    required: false,
    multiline: true,
    helpNote: 'For example: Google Forms, saved in my password-protected Google Drive; no identifying information collected.'
  }
]

export function emptyRecruitmentConsent () {
  const out = {
    channels: {},
    socialCommitments: {},
    surveyChecks: {}
  }
  for (const group of [WHO_FIELDS, MESSAGE_FIELDS, SCRIPT_FIELDS, SOCIAL_PROTOCOL_FIELDS, CONSENT_FIELDS, FACILITY_FIELDS, SURVEY_FIELDS]) {
    for (const f of group) out[f.id] = ''
  }
  out.consentMode = 'online'
  return out
}

const v = (rc, id, placeholder) => {
  const t = (rc?.[id] ?? '').trim()
  return t || placeholder
}

/** First draft of the social media post, from the IRB sample. */
export function buildSocialPost (rc) {
  const hook = (rc?.marketingLine ?? '').trim()
  const course = v(rc, 'courseName', '[course]')
  const email = v(rc, 'researcherEmail', '[your email]')
  const advisor = v(rc, 'advisorEmail', '[advisor email]')
  const parts = [
    hook ? `${hook} ` : '[Marketing line] ',
    `I am conducting research for my ${course} class at Northwestern Oklahoma State University to study ${v(rc, 'projectDescription', '[brief description]')}. `,
    `This study was approved by the NWOSU IRB on ${v(rc, 'irbApprovalDate', '[approval date]')}. `,
    `If you are ${v(rc, 'eligibility', '[eligibility criteria]')} and willing to take a brief ${v(rc, 'timeToComplete', '[length]')} survey, please click the link: ${v(rc, 'surveyLink', '[survey link]')}. `,
    `Contact ${email} or my faculty advisor at ${advisor} with questions. Thank you for considering participation!`
  ]
  return parts.join('').trim()
}

/** First draft of flier wording, with the same required facts as the post. */
export function buildFlierScript (rc) {
  const hook = (rc?.marketingLine ?? '').trim() || '[Marketing line]'
  return [
    hook,
    '',
    `NWOSU student research study for my ${v(rc, 'courseName', '[course]')} class.`,
    `We are studying ${v(rc, 'projectDescription', '[brief description]')}.`,
    '',
    `Who can take part: people who are ${v(rc, 'eligibility', '[eligibility criteria]')}.`,
    `What it takes: a ${v(rc, 'timeToComplete', '[length]')} survey. Taking part is voluntary.`,
    `To take part: scan the QR code or visit ${v(rc, 'surveyLink', '[survey link]')}.`,
    '',
    `Questions? Contact ${v(rc, 'researcherEmail', '[your email]')} or my faculty advisor, ${v(rc, 'advisorEmail', '[advisor email]')}.`,
    `Approved by the NWOSU Institutional Review Board on ${v(rc, 'irbApprovalDate', '[approval date]')}.`
  ].join('\n')
}

/** Which of the post's required elements the student's inputs cover. */
export function postRequirementStatus (rc) {
  return POST_REQUIREMENTS.map((r) => {
    let done
    if (r.alwaysTrue) done = true
    else if (Array.isArray(r.field)) done = r.field.every((f) => (rc?.[f] ?? '').trim())
    else done = Boolean((rc?.[r.field] ?? '').trim())
    return { id: r.id, label: r.label, done }
  })
}

/** Appendix A: the informed consent form, from the NWOSU template wording, filled with the student's answers. */
export function buildConsentForm (rc) {
  const online = (rc?.consentMode ?? 'online') !== 'paper'
  const name = v(rc, 'researcherName', '[your name]')
  const email = v(rc, 'researcherEmail', '[your email]')
  const advisor = v(rc, 'advisorName', '[faculty advisor]')
  const advisorEmail = v(rc, 'advisorEmail', '[advisor email]')
  const ident = (rc?.consentIdentifying ?? '').trim()
  const confidentiality = ident
    ? `All information obtained in the proposed study will be kept strictly confidential. ${ident} The results of the present study will be presented in aggregate as a group.`
    : 'All information obtained in the proposed study will be kept strictly confidential and anonymous. No identifying information will be collected. The results of the present study will be presented in aggregate as a group.'
  const medium = online
    ? ' There is always the possibility of tampering from an outside source when using the internet to collect information. While the confidentiality of your responses will be protected once the data are downloaded from the internet, there is always a possibility of hacking or other security breaches that could threaten the confidentiality of your response.'
    : ''
  const length = v(rc, 'timeToComplete', '[length]').replace(/^a\s+/i, '')
  const lines = [
    'Informed Consent',
    '',
    `Please read this consent form for the present study being conducted at Northwestern Oklahoma State University. If you have any questions, you can contact the researcher, ${name}, student researcher in psychology, by email at ${email}. You may also contact the research supervisor, ${advisor}, by email at ${advisorEmail}. You can also contact Ms. Tandy Keenan, Institutional Review Board Chair, at 580-327-8110 or trkeenan@nwosu.edu.`,
    '',
    'The following information is provided so that you can decide whether you wish to participate in the present study. You should be aware that even if you agree to participate, you are free to withdraw at any time, and that if you do withdraw from the study, you will not be subjected to reprimand or any other form of reproach.',
    '',
    confidentiality + medium,
    '',
    `You must be 18 years old or older to participate in this study. During the present study you will be asked to answer questions about ${v(rc, 'consentTopic', '[what participants will be asked about, and whether it could be sensitive]')}. The ${online ? 'survey' : 'study'} should take about ${length} to complete.`,
    '',
    `Participation in the study is voluntary, and participants will receive no direct material benefit for participation. Participants may benefit from knowing that the study’s results may contribute to a better understanding of ${v(rc, 'consentBenefit', '[what the results could help us understand]')}.`,
    '',
    `Risks: ${v(rc, 'consentRisks', 'There are no known risks associated with this project greater than those ordinarily encountered in daily life.')}`,
    '',
    `${online ? 'By continuing with this survey' : 'By signing below'}, you confirm that “I have read the above statement and have been fully advised of the procedures to be used in this project. I have been given sufficient opportunity to ask any questions I had concerning the procedures and possible risks involved. I understand the procedures will be confidential, and I assume them voluntarily. I likewise understand that I can withdraw from the study at any time without concern of reprisal.”`,
    ''
  ]
  lines.push(online
    ? 'By continuing with this survey, I confirm that I have read and understood this Informed Consent.'
    : 'Signature: ______________________________    Date: ______________')
  return lines.join('\n')
}

/** Appendix C: facility consent, only when data are collected somewhere NWOSU does not own. */
export function buildFacilityConsent (rc) {
  const fac = v(rc, 'facilityName', '[facility name]')
  const who = v(rc, 'facilityParticipants', 'clients')
  const name = v(rc, 'researcherName', '[your name]')
  return [
    'Facility Consent Document',
    '',
    `Researcher: ${name}`,
    'Study Title: [your study title]',
    '',
    'Please read this consent form. If you have any questions, please ask the researcher.',
    '',
    `The following information is provided so that you can decide whether you wish to allow ${name} to interview or survey ${who} at your facility.`,
    '',
    `The purpose of the study is ${v(rc, 'facilityPurpose', '[purpose of the study]')}. All information obtained in this study will be kept strictly confidential and anonymous. Participants will be asked not to put any identifying information on any of the forms except the consent forms, if applicable. To further protect individual identities, consent forms will be stored separately. Furthermore, the results of this study will be presented as a group and no individual participants will be identified.`,
    '',
    'Participants can choose, at any time, to stop participation and/or withdraw any data collected. The data collected will be used for this study and may be used in the future as a baseline for additional studies. Participants will not be identifiable to anyone in future studies, and the researcher will maintain strict confidentiality of participants in the current study.',
    '',
    `“I have read the above statement and grant ${name} permission to interview or survey participants at ${fac}. I have had the opportunity to ask any questions concerning the procedures and possible risks involved. I understand the procedures will be completely confidential and participants assume them voluntarily. I likewise understand that I as well as individual participants can withdraw from the study at any time without being subjected to reproach.”`,
    '',
    'Signature: ______________________________    Date: ______________',
    `Printed Name/Title of Authorizing Official: ${v(rc, 'facilityOfficial', '______________________________')}`
  ].join('\n')
}

export function usesFacility (rc) {
  const t = (rc?.facilityUse ?? '').trim().toLowerCase()
  return Boolean(t) && !/^(no|n\/a|na|none|not applicable)\b/.test(t)
}

export function channelsChosen (rc) {
  return CHANNELS.filter((c) => rc?.channels?.[c.id]).map((c) => c.id)
}

/** The recruitment and consent pieces the IRB packet needs, with whether each is started or done. */
export function irbPacketStatus (project) {
  const rc = project?.recruitmentConsent ?? {}
  const ch = channelsChosen(rc)
  const has = (id) => Boolean((rc[id] ?? '').trim())
  const items = []
  items.push({
    id: 'who',
    label: 'Participants and why they fit',
    done: has('participantsOfInterest') && has('whyAppropriate') && has('facilityUse')
  })
  const scriptField = { oral: 'oralScript', flier: 'flierScript', social: 'socialPost', email: 'emailStatement' }
  const needScripts = ch.filter((c) => scriptField[c])
  items.push({
    id: 'scripts',
    label: needScripts.length
      ? `Recruitment script for each channel (${needScripts.map((c) => c === 'oral' ? 'spoken' : c === 'flier' ? 'flier' : c === 'social' ? 'social post' : 'email').join(', ')})`
      : 'Recruitment script (choose your channels)',
    done: needScripts.length > 0 && needScripts.every((c) => has(scriptField[c]))
  })
  if (ch.includes('social')) {
    const req = postRequirementStatus(rc)
    items.push({
      id: 'social',
      label: 'Social media protocol (platforms, sharing, documentation) and the post’s required facts',
      done: has('socialPlatforms') && has('socialDistribution') && has('socialLogPlan') && req.every((r) => r.done || r.id === 'irbDate' || r.id === 'link')
    })
  }
  items.push({
    id: 'consent',
    label: 'Informed consent form (Appendix A)',
    done: has('researcherName') && has('advisorName') && has('consentTopic') && has('consentBenefit') && has('researcherEmail') && has('advisorEmail')
  })
  if (usesFacility(rc)) {
    items.push({ id: 'facility', label: 'Facility consent form (Appendix C)', done: has('facilityName') && has('facilityPurpose') })
  }
  const checks = rc.surveyChecks ?? {}
  const checked = SURVEY_CHECKS.filter((c) => checks[c.id]).length
  items.push({ id: 'survey', label: `Survey checks (${checked}/${SURVEY_CHECKS.length})`, done: checked === SURVEY_CHECKS.length })
  return items
}

export function recruitmentConsentProgress (project) {
  const items = irbPacketStatus(project)
  const done = items.filter((i) => i.done).length
  return { done, total: items.length, items, ready: done === items.length }
}

export function buildRecruitmentConsentExport (project) {
  const rc = project?.recruitmentConsent ?? {}
  const ch = channelsChosen(rc)
  const line = (label, value) => `${label}\n${(value ?? '').toString().trim() || '(not filled in)'}\n`
  const head = (t) => `\n${t}\n${'='.repeat(t.length)}\n`
  const out = [head('Participant Recruitment Procedures').trim() + '\n']
  for (const f of WHO_FIELDS) out.push(line(f.exportLabel, rc[f.id]))
  out.push(line('Recruitment channels', CHANNELS.filter((c) => ch.includes(c.id)).map((c) => c.label).join('; ')))
  if (ch.includes('oral')) out.push(line('Oral recruitment script', rc.oralScript))
  if (ch.includes('flier')) out.push(line('Flier wording', rc.flierScript))
  if (ch.includes('social')) {
    out.push(line('Social media post', rc.socialPost))
    out.push(head('Social Media Recruitment Protocol'))
    for (const f of SOCIAL_PROTOCOL_FIELDS) out.push(line(f.exportLabel, rc[f.id]))
    const commitments = SOCIAL_COMMITMENTS.filter((c) => rc.socialCommitments?.[c.id]).map((c) => `- ${c.label}`).join('\n')
    out.push(line('Ethical commitments', commitments))
  }
  if (ch.includes('email')) out.push(line('Email solicitation statement (exception only)', rc.emailStatement))
  out.push(head('Appendix A: Informed Consent'))
  out.push(buildConsentForm(rc) + '\n')
  if (usesFacility(rc)) {
    out.push(head('Appendix C: Facility Consent'))
    out.push(buildFacilityConsent(rc) + '\n')
  }
  out.push(head('Survey and Instruments'))
  out.push(line('Survey tool and data storage', rc.surveyTool))
  const checks = rc.surveyChecks ?? {}
  out.push(line('Survey checks done', SURVEY_CHECKS.filter((c) => checks[c.id]).map((c) => `- ${c.label}`).join('\n')))
  return out.join('\n').trim()
}
