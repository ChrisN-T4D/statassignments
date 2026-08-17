export const ACCESS_ONLINE = 'online_primary'
export const ACCESS_OFFLINE = 'offline_primary'

export function isStaffRole(role) {
  return role === 'admin' || role === 'instructor'
}

export function canEnterPacketAnswers({ accessMode, role } = {}) {
  if (accessMode === ACCESS_OFFLINE) return true
  return isStaffRole(role)
}
