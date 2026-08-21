export function normalizeRosterEmail(email) {
  return String(email || '').trim().toLowerCase()
}

export function isValidRosterEmail(email) {
  return /.+@.+\..+/.test(normalizeRosterEmail(email))
}
