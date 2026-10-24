/** Server timestamps are naive UTC; parse them as UTC. */
export function parseServerDate(iso) {
  if (!iso) return null
  const hasZone = /[zZ]|[+-]\d\d:?\d\d$/.test(iso)
  const d = new Date(hasZone ? iso : `${iso}Z`)
  return Number.isNaN(d.getTime()) ? null : d
}

export function timeAgo(iso, now = new Date()) {
  const d = parseServerDate(iso)
  if (!d) return ''
  const secs = Math.max(0, Math.round((now - d) / 1000))
  if (secs < 60) return 'just now'
  const mins = Math.round(secs / 60)
  if (mins < 60) return `${mins} min ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours} hr ago`
  const days = Math.round(hours / 24)
  if (days < 14) return `${days} day${days === 1 ? '' : 's'} ago`
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}

/** Where a student is right now, as a forum tag: an assignment if known, else the week. */
export function boardTagFor({ topic, topicName, weekNumber } = {}) {
  if (topic) return { tag: `assignment:${topic}`, tagLabel: topicName || topic }
  if (weekNumber) return { tag: `week:${weekNumber}`, tagLabel: `Week ${weekNumber}` }
  return { tag: '', tagLabel: '' }
}
