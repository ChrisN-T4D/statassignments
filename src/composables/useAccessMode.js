import { computed } from 'vue'
import { useAuth } from './useAuth'
import { useProfile } from './useProfile'
import {
  ACCESS_ONLINE,
  ACCESS_OFFLINE,
  canEnterPacketAnswers as packetAnswersAllowed
} from '../lib/conceptReviewAccess.js'

export { ACCESS_ONLINE, ACCESS_OFFLINE }

export function useAccessMode() {
  const { isAuthenticated, user } = useAuth()
  const { profile, loading, fetchProfile, setAccessMode, studentKey, hasProfile } = useProfile()

  const accessMode = computed(() =>
    profile.value?.access_mode === ACCESS_OFFLINE ? ACCESS_OFFLINE : ACCESS_ONLINE
  )
  const isOfflinePrimary = computed(() => accessMode.value === ACCESS_OFFLINE)
  const isOnlinePrimary = computed(() => !isOfflinePrimary.value)
  const canEnterPacketAnswers = computed(() =>
    packetAnswersAllowed({
      accessMode: accessMode.value,
      role: user.value?.role
    })
  )

  async function ensureLoaded() {
    if (isAuthenticated.value && !profile.value) {
      await fetchProfile()
    }
    return profile.value
  }

  return {
    accessMode,
    isOfflinePrimary,
    isOnlinePrimary,
    canEnterPacketAnswers,
    hasProfile,
    studentKey,
    loading,
    ensureLoaded,
    setAccessMode,
    fetchProfile
  }
}
