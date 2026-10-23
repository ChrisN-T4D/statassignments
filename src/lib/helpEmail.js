export const PROFESSOR_EMAIL = 'clneu@nwosu.edu'

/**
 * A mailto: link that tells the professor where the student is stuck.
 * context: { course, week, topic, pageUrl, student: { name, email } }, every field optional.
 */
export function buildHelpMailto(context = {}) {
  const { course, week, topic, pageUrl, student } = context
  const where = [course, week].filter(Boolean).join(', ')
  const subject = ['Stuck', topic].filter(Boolean).join(': ') + (where ? ` (${where})` : '')
  const details = [
    course && `Course: ${course}`,
    week && `Week: ${week}`,
    topic && `Assignment: ${topic}`,
    pageUrl && `Page: ${pageUrl}`,
    student?.name && `Name: ${student.name}`,
    student?.email && `Account: ${student.email}`
  ].filter(Boolean)
  const body = [
    'Hello,',
    '',
    'I am stuck on this and could use some help:',
    '',
    '[What I was trying to do, what I tried, and where it stopped working]',
    '',
    '---',
    ...details
  ].join('\n')
  return `mailto:${PROFESSOR_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
