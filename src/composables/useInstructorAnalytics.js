import { ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'

export function useInstructorAnalytics() {
  const { user } = useAuth()
  const loading = ref(false)

  // Check if current user is an instructor
  function isInstructor() {
    return user.value?.role === 'instructor'
  }

  async function fetchSemesters() {
    try {
      const records = await pb.collection('semesters').getFullList({
        sort: '-start_date'
      })
      return records
    } catch (err) {
      console.error('Error fetching semesters:', err)
      return []
    }
  }

  async function fetchAttempts(filters = {}) {
    if (!isInstructor()) {
      throw new Error('Instructor access required')
    }

    loading.value = true
    try {
      const filterParts = []

      if (filters.semesterId) {
        filterParts.push(`semester = "${filters.semesterId}"`)
      }
      if (filters.moduleId) {
        filterParts.push(`module = "${filters.moduleId}"`)
      }
      if (filters.itemId) {
        filterParts.push(`item = "${filters.itemId}"`)
      }
      if (filters.softwareType) {
        filterParts.push(`software_type = "${filters.softwareType}"`)
      }
      if (filters.startDate) {
        filterParts.push(`created >= "${filters.startDate}"`)
      }
      if (filters.endDate) {
        filterParts.push(`created <= "${filters.endDate}"`)
      }

      const records = await pb.collection('attempts').getFullList({
        filter: filterParts.length > 0 ? filterParts.join(' && ') : undefined,
        sort: '-created',
        expand: 'profile,module,item,semester'
      })

      return records
    } finally {
      loading.value = false
    }
  }

  // Generate attempt-level CSV export (pseudonymous)
  async function exportAttemptsCSV(filters = {}) {
    const attempts = await fetchAttempts(filters)

    const headers = [
      'semester_code',
      'student_key',
      'software_type',
      'module_id',
      'module_title',
      'item_id',
      'is_correct',
      'score',
      'time_spent_seconds',
      'attempt_no',
      'hint_used',
      'created'
    ]

    const rows = attempts.map(a => [
      a.expand?.semester?.code || '',
      a.expand?.profile?.student_key || '',
      a.software_type || '',
      a.expand?.module?.topic_id || '',
      a.expand?.module?.title || '',
      a.item || '',
      a.is_correct ? '1' : '0',
      a.score ?? '',
      a.time_spent_seconds ?? '',
      a.attempt_no ?? '',
      a.hint_used ? '1' : '0',
      a.created || ''
    ])

    return generateCSV(headers, rows)
  }

  // Generate student summary CSV (aggregated per student_key)
  async function exportStudentSummaryCSV(filters = {}) {
    const attempts = await fetchAttempts(filters)

    // Group by student_key
    const studentStats = {}

    for (const attempt of attempts) {
      const studentKey = attempt.expand?.profile?.student_key || 'unknown'

      if (!studentStats[studentKey]) {
        studentStats[studentKey] = {
          semester_code: attempt.expand?.semester?.code || '',
          student_key: studentKey,
          total_attempts: 0,
          correct_attempts: 0,
          unique_items: new Set(),
          total_time_seconds: 0,
          time_count: 0,
          by_software: {}
        }
      }

      const stats = studentStats[studentKey]
      stats.total_attempts++
      if (attempt.is_correct) stats.correct_attempts++
      stats.unique_items.add(attempt.item)

      if (attempt.time_spent_seconds) {
        stats.total_time_seconds += attempt.time_spent_seconds
        stats.time_count++
      }

      // Track by software type
      const sw = attempt.software_type || 'unknown'
      if (!stats.by_software[sw]) {
        stats.by_software[sw] = { total: 0, correct: 0 }
      }
      stats.by_software[sw].total++
      if (attempt.is_correct) stats.by_software[sw].correct++
    }

    const headers = [
      'semester_code',
      'student_key',
      'total_attempts',
      'correct_attempts',
      'accuracy_pct',
      'unique_items_attempted',
      'avg_time_seconds',
      'jamovi_attempts',
      'jamovi_accuracy',
      'r_attempts',
      'r_accuracy',
      'stata_attempts',
      'stata_accuracy',
      'spss_attempts',
      'spss_accuracy'
    ]

    const rows = Object.values(studentStats).map(s => {
      const accuracy = s.total_attempts > 0
        ? Math.round((s.correct_attempts / s.total_attempts) * 100)
        : 0
      const avgTime = s.time_count > 0
        ? Math.round(s.total_time_seconds / s.time_count)
        : ''

      const getSoftwareStats = (sw) => {
        const data = s.by_software[sw]
        if (!data) return { attempts: 0, accuracy: '' }
        return {
          attempts: data.total,
          accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : ''
        }
      }

      const jamovi = getSoftwareStats('jamovi')
      const r = getSoftwareStats('r')
      const stata = getSoftwareStats('stata')
      const spss = getSoftwareStats('spss')

      return [
        s.semester_code,
        s.student_key,
        s.total_attempts,
        s.correct_attempts,
        accuracy,
        s.unique_items.size,
        avgTime,
        jamovi.attempts,
        jamovi.accuracy,
        r.attempts,
        r.accuracy,
        stata.attempts,
        stata.accuracy,
        spss.attempts,
        spss.accuracy
      ]
    })

    return generateCSV(headers, rows)
  }

  function generateCSV(headers, rows) {
    const escapeCSV = (value) => {
      const str = String(value ?? '')
      if (str.includes(',') || str.includes('"') || str.includes('\n')) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }

    const lines = [
      headers.map(escapeCSV).join(','),
      ...rows.map(row => row.map(escapeCSV).join(','))
    ]

    return lines.join('\n')
  }

  function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
  }

  // ========== ROSTER MANAGEMENT FUNCTIONS ==========

  // Parse Blackboard CSV export format
  // Expected columns: Last Name, First Name, Username, Student ID, etc.
  function parseBlackboardCSV(csvText) {
    const lines = csvText.trim().split('\n')
    if (lines.length < 2) {
      throw new Error('CSV file is empty or has no data rows')
    }

    // Parse header row
    const headers = parseCSVLine(lines[0]).map(h => h.toLowerCase().trim())

    // Find column indices
    const usernameIdx = headers.findIndex(h => h.includes('username'))
    const studentIdIdx = headers.findIndex(h => h.includes('student id') || h === 'id')
    const lastNameIdx = headers.findIndex(h => h.includes('last name') || h === 'lastname')
    const firstNameIdx = headers.findIndex(h => h.includes('first name') || h === 'firstname')

    if (usernameIdx === -1 && studentIdIdx === -1) {
      throw new Error('CSV must contain either a Username or Student ID column')
    }

    const rows = []
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue

      const values = parseCSVLine(line)
      const row = {
        bb_username: usernameIdx !== -1 ? values[usernameIdx]?.trim() || '' : '',
        bb_id: studentIdIdx !== -1 ? values[studentIdIdx]?.trim() || '' : '',
        last_name: lastNameIdx !== -1 ? values[lastNameIdx]?.trim() || '' : '',
        first_name: firstNameIdx !== -1 ? values[firstNameIdx]?.trim() || '' : ''
      }

      // Skip rows without identifier
      if (!row.bb_username && !row.bb_id) continue

      rows.push(row)
    }

    return rows
  }

  // Helper to parse a single CSV line (handles quoted values)
  function parseCSVLine(line) {
    const values = []
    let current = ''
    let inQuotes = false

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"'
          i++
        } else {
          inQuotes = !inQuotes
        }
      } else if (char === ',' && !inQuotes) {
        values.push(current)
        current = ''
      } else {
        current += char
      }
    }
    values.push(current)

    return values
  }

  // Generate a unique student key
  // Format: SEMCODE-XXXXXX (6 alphanumeric chars)
  function generateStudentKey(semesterCode) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Avoid confusing chars: I, O, 0, 1
    let key = ''
    for (let i = 0; i < 6; i++) {
      key += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return `${semesterCode}-${key}`
  }

  // Generate a claim token (longer, more secure)
  function generateClaimToken() {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789'
    let token = ''
    for (let i = 0; i < 16; i++) {
      token += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return token
  }

  // Fetch existing roster entries for a semester
  async function fetchRoster(semesterId) {
    if (!isInstructor()) {
      throw new Error('Instructor access required')
    }

    try {
      const records = await pb.collection('roster').getFullList({
        filter: `semester = "${semesterId}"`,
        sort: 'created'
      })
      return records
    } catch (err) {
      console.error('Error fetching roster:', err)
      return []
    }
  }

  // Create roster entries from parsed CSV data
  // Returns { created: [], skipped: [], errors: [] }
  async function createRosterEntries(rows, semesterId, semesterCode, isDryRun = false) {
    if (!isInstructor()) {
      throw new Error('Instructor access required')
    }

    loading.value = true
    try {
      // Fetch existing roster for duplicate detection
      const existingRoster = await fetchRoster(semesterId)
      const existingBbIds = new Set(existingRoster.map(r => r.bb_id).filter(Boolean))
      const existingBbUsernames = new Set(existingRoster.map(r => r.bb_username).filter(Boolean))

      const results = {
        created: [],
        skipped: [],
        errors: []
      }

      for (const row of rows) {
        // Check for duplicates
        const isDuplicate =
          (row.bb_id && existingBbIds.has(row.bb_id)) ||
          (row.bb_username && existingBbUsernames.has(row.bb_username))

        if (isDuplicate) {
          results.skipped.push({
            ...row,
            reason: 'Already exists in roster'
          })
          continue
        }

        // Generate student key
        const studentKey = generateStudentKey(semesterCode)
        const claimToken = generateClaimToken()

        const rosterEntry = {
          semester: semesterId,
          student_key: studentKey,
          claim_token: claimToken,
          bb_username: row.bb_username,
          bb_id: row.bb_id,
          user: '', // Not claimed yet
          claimed_at: null
        }

        if (isDryRun) {
          results.created.push(rosterEntry)
        } else {
          try {
            const created = await pb.collection('roster').create(rosterEntry)
            results.created.push(created)
            // Add to existing sets to prevent duplicates within same batch
            if (row.bb_id) existingBbIds.add(row.bb_id)
            if (row.bb_username) existingBbUsernames.add(row.bb_username)
          } catch (err) {
            results.errors.push({
              ...row,
              reason: err.message
            })
          }
        }
      }

      return results
    } finally {
      loading.value = false
    }
  }

  // Export student keys CSV for distribution (bb_username + student_key only)
  async function exportKeysCSV(semesterId) {
    if (!isInstructor()) {
      throw new Error('Instructor access required')
    }

    const roster = await fetchRoster(semesterId)

    const headers = ['bb_username', 'bb_id', 'student_key', 'claimed']
    const rows = roster.map(r => [
      r.bb_username || '',
      r.bb_id || '',
      r.student_key || '',
      r.user ? 'Yes' : 'No'
    ])

    return generateCSV(headers, rows)
  }

  return {
    loading,
    isInstructor,
    fetchSemesters,
    fetchAttempts,
    exportAttemptsCSV,
    exportStudentSummaryCSV,
    downloadCSV,
    // Roster management
    parseBlackboardCSV,
    generateStudentKey,
    generateClaimToken,
    fetchRoster,
    createRosterEntries,
    exportKeysCSV
  }
}
