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

  return {
    loading,
    isInstructor,
    fetchSemesters,
    fetchAttempts,
    exportAttemptsCSV,
    exportStudentSummaryCSV,
    downloadCSV
  }
}
