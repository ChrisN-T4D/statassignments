import { computed } from 'vue'
import { useAuth } from './useAuth'
import { useProfile } from './useProfile'

export const ACCESS_ONLINE = 'online_primary'
export const ACCESS_OFFLINE = 'offline_primary'

export function useAccessMode() {
  const { isAuthenticated } = useAuth()
  const { profile, loading, fetchProfile, setAccessMode, studentKey, hasProfile } = useProfile()

  const accessMode = computed(() =>
    profile.value?.access_mode === ACCESS_OFFLINE ? ACCESS_OFFLINE : ACCESS_ONLINE
  )
  const isOfflinePrimary = computed(() => accessMode.value === ACCESS_OFFLINE)
  const isOnlinePrimary = computed(() => !isOfflinePrimary.value)

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
    hasProfile,
    studentKey,
    loading,
    ensureLoaded,
    setAccessMode,
    fetchProfile
  }
}
