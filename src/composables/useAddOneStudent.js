import { ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'
import { normalizeRosterEmail, isValidRosterEmail } from '../utils/rosterEmail'

export { normalizeRosterEmail, isValidRosterEmail }

function generateStudentKey(semesterCode) {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let key = ''
  for (let i = 0; i < 6; i++) {
    key += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return `${semesterCode}-${key}`
}

function generateClaimToken() {
  const charset = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
  let token = ''
  for (let i = 0; i < 16; i++) {
    token += charset.charAt(Math.floor(Math.random() * charset.length))
  }
  return token
}

export function useAddOneStudent() {
  const { user } = useAuth()
  const loading = ref(false)

  function isInstructor() {
    const role = user.value?.role
    return role === 'instructor' || role === 'admin'
  }

  async function fetchClasses() {
    try {
      return await pb.collection('classes').getFullList({
        filter: 'is_active = true',
        sort: 'order'
      })
    } catch {
      return []
    }
  }

  async function findRosterByEmail(email) {
    try {
      const rosterList = await pb.collection('roster').getFullList({
        expand: 'semester,class',
        sort: 'created'
      })
      const normalizedEmail = normalizeRosterEmail(email)
      return rosterList.filter(r => normalizeRosterEmail(r.bb_username) === normalizedEmail)
    } catch {
      return []
    }
  }

  async function createOneRosterEntry({ semesterId, semesterCode, classId, email }) {
    if (!isInstructor()) {
      throw new Error('Instructor access required')
    }

    const normalizedEmail = normalizeRosterEmail(email)
    if (!isValidRosterEmail(normalizedEmail)) {
      throw new Error('Enter a valid email.')
    }

    if (!semesterId || !classId || !semesterCode) {
      throw new Error('Select a semester and class.')
    }

    loading.value = true
    try {
      const existingRosters = await pb.collection('roster').getFullList({
        filter: `semester = "${semesterId}"`
      })
      const existingKeys = new Set(existingRosters.map(r => r.student_key).filter(Boolean))

      let studentKey = null
      for (let i = 0; i < 20; i++) {
        const candidate = generateStudentKey(semesterCode)
        if (!existingKeys.has(candidate)) {
          studentKey = candidate
          break
        }
      }

      if (!studentKey) {
        throw new Error('Could not generate a unique student key')
      }

      // Match Railway roster create payload (class_id + access_mode from alembic 002/003)
      return await pb.collection('roster').create({
        semester: semesterId,
        class: classId,
        student_key: studentKey,
        claim_token: generateClaimToken(),
        bb_username: normalizedEmail,
        bb_id: '',
        user: '',
        claimed_at: null,
        access_mode: 'online_primary'
      })
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    fetchClasses,
    findRosterByEmail,
    createOneRosterEntry
  }
}
