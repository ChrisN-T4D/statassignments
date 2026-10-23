import { test } from 'node:test'
import assert from 'node:assert/strict'
import { buildHelpMailto, PROFESSOR_EMAIL } from '../src/lib/helpEmail.js'

function parts(url) {
  const [head, query] = url.split('?')
  const params = new URLSearchParams(query)
  return { to: head.replace('mailto:', ''), subject: params.get('subject'), body: params.get('body') }
}

test('addresses the professor and names the assignment in the subject', () => {
  const m = parts(buildHelpMailto({ course: 'PSYC 4223', week: 'Week 10', topic: 'Measures draft' }))
  assert.equal(m.to, PROFESSOR_EMAIL)
  assert.equal(m.subject, 'Stuck: Measures draft (PSYC 4223, Week 10)')
})

test('body carries context and the student account', () => {
  const m = parts(buildHelpMailto({
    course: 'PSYC 4223', week: 'Week 10', topic: 'Measures draft',
    pageUrl: 'https://x.test/p?a=1&b=2', student: { name: 'Pat Q', email: 'pat@x.edu' }
  }))
  assert.match(m.body, /Course: PSYC 4223/)
  assert.match(m.body, /Page: https:\/\/x\.test\/p\?a=1&b=2/)
  assert.match(m.body, /Account: pat@x\.edu/)
})

test('works with no context at all and survives special characters', () => {
  assert.equal(parts(buildHelpMailto()).subject, 'Stuck')
  const m = parts(buildHelpMailto({ topic: 'Q&A: 50% + more' }))
  assert.equal(m.subject, 'Stuck: Q&A: 50% + more')
})
