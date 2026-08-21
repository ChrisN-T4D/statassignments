import { pb } from '../lib/pocketbase'
import { computeClassMastery } from '../lib/classMasteryStats.js'
import { getObjectivesByModule } from '../data/objectives.js'

function generateCSV(headers, rows) {
  const escape = (v) => {
    const s = v == null ? '' : String(v)
    if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
    return s
  }
  return [headers.join(','), ...rows.map(r => headers.map((_, i) => escape(r[i])).join(','))].join('\n')
}

async function rosterUserMap(semesterId) {
  const filter = semesterId ? `semester = "${semesterId}"` : undefined
  const roster = await pb.collection('roster').getFullList({
    filter,
    expand: 'class'
  })
  const userToKey = {}
  const rosterUserIds = []
  for (const r of roster) {
    if (!r.user) continue
    userToKey[r.user] = r.student_key || ''
    rosterUserIds.push(r.user)
  }
  return { userToKey, rosterSet: new Set(rosterUserIds), roster }
}

export function useClassMasteryAnalytics() {
  async function fetchClassMastery({ semesterId, classId, moduleId }) {
    if (!semesterId || !classId || !moduleId) {
      throw new Error('All parameters (semesterId, classId, moduleId) are required')
    }

    const { roster } = await rosterUserMap(semesterId)
    const claimedUserIds = roster
      .filter(r => {
        if (!r.user) return false
        const slug = r.expand?.class?.slug || ''
        return !classId || slug === classId || slug === '' || r.class === classId
      })
      .map(r => r.user)

    // Prefer slug match; if expand missing, keep all claimed for the semester
    const slugMatched = roster.filter(
      r => r.user && r.expand?.class?.slug === classId
    )
    const userIds =
      slugMatched.length > 0 ? slugMatched.map(r => r.user) : claimedUserIds.filter(Boolean)

    const bktRecords = await pb.collection('bkt_states').getFullList()
    const moduleObjectives = getObjectivesByModule(moduleId, classId)

    return {
      ...computeClassMastery({
        moduleObjectives,
        claimedUserIds: userIds,
        bktRecords
      }),
      semesterId,
      classId,
      moduleId
    }
  }

  function exportClassMasteryModuleCSV(result) {
    const headers = [
      'objective_id',
      'objective',
      'pct_mastered',
      'avg_pL',
      'n_with_attempts',
      'n_mastered',
      'claimed_count',
      'with_data_count',
      'avg_mastery_pct',
      'module_ready_pct'
    ]
    const rows = (result.objectives || []).map(obj => [
      obj.objectiveId,
      obj.objective,
      obj.pctMastered,
      obj.avgPL ?? '',
      obj.nWithAttempts,
      obj.nMastered,
      result.claimedCount,
      result.withDataCount,
      result.avgMasteryPct ?? '',
      result.moduleReadyPct
    ])
    return generateCSV(headers, rows)
  }

  async function exportPracticeAttemptsCSV(semesterId) {
    const { userToKey, rosterSet } = await rosterUserMap(semesterId)
    const practiceAttempts = await pb.collection('practice_attempts').getFullList({
      sort: '-created'
    })
    const headers = [
      'student_key',
      'problem',
      'is_correct',
      'difficulty',
      'active_time_seconds',
      'total_time_seconds',
      'created'
    ]
    const rows = practiceAttempts
      .filter(a => rosterSet.has(a.user))
      .map(a => [
        userToKey[a.user] || '',
        a.problem || '',
        a.is_correct ? '1' : '0',
        a.difficulty || '',
        a.active_time_seconds ?? '',
        a.total_time_seconds ?? '',
        a.created || ''
      ])
    return generateCSV(headers, rows)
  }

  async function exportSoftwareLessonMetricsCSV(semesterId) {
    const { userToKey, rosterSet } = await rosterUserMap(semesterId)
    const records = await pb.collection('software_lesson_metrics').getFullList({
      sort: '-created'
    })
    const headers = [
      'student_key',
      'lesson_id',
      'lesson_title',
      'module',
      'software',
      'event_type',
      'created'
    ]
    const rows = records
      .filter(r => !r.user || rosterSet.has(r.user))
      .map(r => [
        r.user ? userToKey[r.user] || '' : '',
        r.lesson_id || '',
        r.lesson_title || '',
        r.module || '',
        r.software || '',
        r.event_type || '',
        r.created || ''
      ])
    return generateCSV(headers, rows)
  }

  function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = filename
    link.click()
    URL.revokeObjectURL(link.href)
  }

  async function exportAllResearchData(semesterId, extras = {}) {
    const jobs = [
      {
        name: 'learning_events.csv',
        run: () => extras.exportLearningEventsCSV?.(semesterId)
      },
      {
        name: 'objective_mastery.csv',
        run: () => extras.exportObjectiveMasteryCSV?.(semesterId)
      },
      {
        name: 'practice_attempts.csv',
        run: () => exportPracticeAttemptsCSV(semesterId)
      },
      {
        name: 'software_lesson_metrics.csv',
        run: () => exportSoftwareLessonMetricsCSV(semesterId)
      },
      {
        name: 'bkt_prototypes.csv',
        run: () => extras.exportPrototypesCSV?.(semesterId)
      },
      {
        name: 'roster_keys.csv',
        run: () => extras.exportKeysCSV?.(semesterId)
      }
    ]
    for (const job of jobs) {
      try {
        const content = await job.run()
        if (content == null) continue
        downloadCSV(content, job.name)
        await new Promise(r => setTimeout(r, 400))
      } catch (err) {
        console.error(`Export failed for ${job.name}:`, err)
      }
    }
  }

  return {
    generateCSV,
    fetchClassMastery,
    exportClassMasteryModuleCSV,
    exportPracticeAttemptsCSV,
    exportSoftwareLessonMetricsCSV,
    downloadCSV,
    exportAllResearchData
  }
}
