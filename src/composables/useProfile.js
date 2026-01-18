import { ref, computed } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'

const profile = ref(null)
const loading = ref(false)

export function useProfile() {
  const { user } = useAuth()

  const hasProfile = computed(() => !!profile.value)
  const studentKey = computed(() => profile.value?.student_key || null)
  const semesterId = computed(() => profile.value?.semester || null)

  async function fetchProfile() {
    if (!user.value) {
      profile.value = null
      return null
    }

    loading.value = true
    try {
      // Find roster entry linked to this user
      const records = await pb.collection('roster').getList(1, 1, {
        filter: `user = "${user.value.id}"`,
        expand: 'semester'
      })

      if (records.items.length > 0) {
        profile.value = records.items[0]
      } else {
        profile.value = null
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      profile.value = null
    } finally {
      loading.value = false
    }
    return profile.value
  }

  async function claimProfile(claimToken) {
    if (!user.value) {
      throw new Error('Must be logged in to claim a profile')
    }

    loading.value = true
    try {
      // Find unclaimed roster entry with this token
      const records = await pb.collection('roster').getList(1, 1, {
        filter: `claim_token = "${claimToken}" && user = ""`
      })

      if (records.items.length === 0) {
        throw new Error('Invalid or already claimed token')
      }

      const rosterEntry = records.items[0]

      // Update roster entry to link to current user
      const updated = await pb.collection('roster').update(rosterEntry.id, {
        user: user.value.id,
        claimed_at: new Date().toISOString(),
        claim_token: '' // Clear token after claiming
      })

      profile.value = updated
      return updated
    } finally {
      loading.value = false
    }
  }

  // Alternative: claim by student key (if instructor distributes keys directly)
  async function claimByStudentKey(studentKey, semesterCode) {
    if (!user.value) {
      throw new Error('Must be logged in to claim a profile')
    }

    loading.value = true
    try {
      // First get the semester
      const semesters = await pb.collection('semesters').getList(1, 1, {
        filter: `code = "${semesterCode}"`
      })

      if (semesters.items.length === 0) {
        throw new Error('Semester not found. Please check the semester selection.')
      }

      const semester = semesters.items[0]

      // Verify semester is active
      if (!semester.is_active) {
        throw new Error('This semester is no longer active. Please contact your instructor.')
      }

      // Find roster entry with this student key for this semester
      const records = await pb.collection('roster').getList(1, 1, {
        filter: `student_key = "${studentKey}" && semester = "${semester.id}"`
      })

      if (records.items.length === 0) {
        throw new Error('Student key not found. Please check your key and try again.')
      }

      const rosterEntry = records.items[0]

      // Check if already claimed
      if (rosterEntry.user) {
        throw new Error('This student key has already been claimed. If this is your key, please contact your instructor.')
      }

      // Update roster entry to link to current user
      const updated = await pb.collection('roster').update(rosterEntry.id, {
        user: user.value.id,
        claimed_at: new Date().toISOString()
      })

      profile.value = updated
      return updated
    } finally {
      loading.value = false
    }
  }

  function clearProfile() {
    profile.value = null
  }

  return {
    profile,
    loading,
    hasProfile,
    studentKey,
    semesterId,
    fetchProfile,
    claimProfile,
    claimByStudentKey,
    clearProfile
  }
}
