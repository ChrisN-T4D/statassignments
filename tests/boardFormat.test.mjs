import test from 'node:test'
import assert from 'node:assert/strict'
import { parseServerDate, timeAgo, boardTagFor } from '../src/lib/boardFormat.js'

test('naive server timestamps are read as UTC', () => {
  assert.equal(parseServerDate('2026-10-24T12:00:00').toISOString(), '2026-10-24T12:00:00.000Z')
  assert.equal(parseServerDate('2026-10-24T12:00:00+00:00').toISOString(), '2026-10-24T12:00:00.000Z')
  assert.equal(parseServerDate('nope'), null)
})

test('timeAgo buckets', () => {
  const now = new Date('2026-10-24T12:00:00Z')
  assert.equal(timeAgo('2026-10-24T11:59:40', now), 'just now')
  assert.equal(timeAgo('2026-10-24T11:50:00', now), '10 min ago')
  assert.equal(timeAgo('2026-10-24T09:00:00', now), '3 hr ago')
  assert.equal(timeAgo('2026-10-22T12:00:00', now), '2 days ago')
  assert.equal(timeAgo('2026-10-23T12:00:00', now), '1 day ago')
})

test('boardTagFor prefers the assignment, then the week', () => {
  assert.deepEqual(boardTagFor({ topic: 'a1', topicName: 'Article Review', weekNumber: 3 }), { tag: 'assignment:a1', tagLabel: 'Article Review' })
  assert.deepEqual(boardTagFor({ weekNumber: 5 }), { tag: 'week:5', tagLabel: 'Week 5' })
  assert.deepEqual(boardTagFor({}), { tag: '', tagLabel: '' })
})
