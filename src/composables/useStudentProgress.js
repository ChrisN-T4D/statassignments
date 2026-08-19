import { ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { getQuestionById } from '../data/conceptQuestions'
import { getLessonById } from '../data/softwareLessons'
import { RESEARCH_METHODS, STATISTICS } from '../data/classIds'

export function inferCourseFromQuestionId(questionId) {
  const id = String(questionId || '').toLowerCase()
  if (id.startsWith('rm-') || id.startsWith('rm-module-')) return RESEARCH_METHODS
  if (id.startsWith('stats-') || id.startsWith('stats-module-')) return STATISTICS
  const q = getQuestionById(questionId)
  const moduleId = String(q?.moduleId || '').toLowerCase()
  if (moduleId.startsWith('rm-')) return RESEARCH_METHODS
  if (moduleId.startsWith('stats-')) return STATISTICS
  return ''
}

export function useStudentProgress() {
  const loading = ref(false)

  async function fetchSemesters() {
    try {
      return await pb.collection('semesters').getFullList({ sort: '-start_date' })
    } catch (err) {
      console.error('Error fetching semesters:', err)
      return []
    }
  }

  async function fetchRosterStudents(semesterId) {
    if (!semesterId) return []
    try {
      const roster = await pb.collection('roster').getFullList({
        filter: `semester = "${semesterId}"`,
        sort: 'student_key',
        expand: 'user,class'
      })
      return roster.map(r => ({
        id: r.id,
        student_key: r.student_key,
        user_id: r.user || null,
        claimed: !!r.user,
        bb_username: r.bb_username || '',
        class_slug: r.expand?.class?.slug || r.class || '',
        email: r.expand?.user?.email || ''
      }))
    } catch (err) {
      console.error('Error fetching roster:', err)
      return []
    }
  }

  async function fetchStudentUsers() {
    try {
      const users = await pb.collection('users').getFullList({
        filter: 'role = "student"',
        sort: 'email'
      })
      return users.map(u => ({
        user_id: u.id,
        email: u.email || '',
        username: u.username || ''
      }))
    } catch (err) {
      console.error('Error fetching student users:', err)
      return []
    }
  }

  async function fetchProgressForUser(userId) {
    if (!userId) {
      return {
        practiceAttempts: [],
        learningEvents: [],
        bktStates: [],
        softwareMetrics: []
      }
    }

    loading.value = true
    try {
      const filter = `user = "${userId}"`
      const [practiceAttempts, learningEvents, bktStates, softwareMetrics] = await Promise.all([
        pb.collection('practice_attempts').getFullList({ filter, sort: '-created' }),
        pb.collection('learning_events').getFullList({ filter, sort: '-created' }),
        pb.collection('bkt_states').getFullList({ filter, sort: 'objective_id' }),
        pb.collection('software_lesson_metrics').getFullList({ filter, sort: '-created' })
      ])
      return { practiceAttempts, learningEvents, bktStates, softwareMetrics }
    } catch (err) {
      console.error('Error fetching student progress:', err)
      return {
        practiceAttempts: [],
        learningEvents: [],
        bktStates: [],
        softwareMetrics: []
      }
    } finally {
      loading.value = false
    }
  }

  function formatAnswerValue(value) {
    if (value == null || value === '') return '—'
    if (typeof value === 'boolean') return value ? 'True' : 'False'
    if (typeof value === 'object') return JSON.stringify(value)
    return String(value)
  }

  function formatConceptAnswer(questionId, rawAnswer) {
    const q = getQuestionById(questionId)
    if (!q) return formatAnswerValue(rawAnswer)

    const answerStr = formatAnswerValue(rawAnswer)

    if (q.type === 'multiple_choice' && q.options) {
      const byId = q.options.find(o => o.id === rawAnswer || o.id === answerStr)
      if (byId) return byId.text
      const byText = q.options.find(o => o.text === answerStr)
      if (byText) return byText.text
    }

    if (q.type === 'multiple_select' && q.options) {
      let ids = rawAnswer
      if (typeof rawAnswer === 'string') {
        try { ids = JSON.parse(rawAnswer) } catch { ids = [rawAnswer] }
      }
      if (!Array.isArray(ids)) ids = [ids]
      return ids
        .map(id => q.options.find(o => o.id === id)?.text || id)
        .join('; ')
    }

    if (q.type === 'true_false') {
      if (rawAnswer === true || rawAnswer === 'true') return 'True'
      if (rawAnswer === false || rawAnswer === 'false') return 'False'
    }

    return answerStr
  }

  function enrichConceptAttempts(attempts) {
    return attempts.map(a => {
      const q = getQuestionById(a.problem)
      const courseId = inferCourseFromQuestionId(a.problem) || inferCourseFromQuestionId(q?.moduleId)
      return {
        ...a,
        question_id: a.problem,
        question_text: q?.question || q?.prompt || '',
        module_id: q?.moduleId || '',
        course_id: courseId,
        question_type: q?.type || '',
        formatted_answer: formatConceptAnswer(a.problem, a.answer)
      }
    })
  }

  const SOFTWARE_ANSWER_SOURCES = new Set([
    'software_selfcheck',
    'software_youdo',
    'software_wedo',
    'software_apply'
  ])

  const SOFTWARE_ACTIVITY_SOURCES = new Set([
    'software_phase',
    'software_hint',
    'software_lesson_complete',
    ...SOFTWARE_ANSWER_SOURCES
  ])

  function parseSoftwareItemId(itemId) {
    if (!itemId) return { phase: '', lessonId: '', itemId: '' }
    const parts = String(itemId).split(':')
    if (parts.length >= 3) {
      return { phase: parts[0], lessonId: parts[1], itemId: parts.slice(2).join(':') }
    }
    return { phase: '', lessonId: '', itemId: itemId }
  }

  function enrichSoftwareEvents(events) {
    return events
      .filter(e => SOFTWARE_ACTIVITY_SOURCES.has(e.source))
      .map(e => {
        const parsed = parseSoftwareItemId(e.item_id)
        const lesson = getLessonById(e.lesson_id || parsed.lessonId)
        const phaseLabel = {
          software_selfcheck: 'Self-Check',
          software_youdo: 'You Do',
          software_wedo: 'We Do',
          software_apply: 'Apply',
          software_phase: 'Phase',
          software_hint: 'Hint',
          software_lesson_complete: 'Lesson Complete'
        }[e.source] || e.source

        return {
          ...e,
          phase_label: phaseLabel,
          lesson_title: lesson?.title || e.lesson_id || parsed.lessonId || '—',
          formatted_answer: formatAnswerValue(e.answer),
          software: lesson?.software || '',
          course_id: e.class_id
            || (String(lesson?.module || e.module_id || '').startsWith('rm-') ? RESEARCH_METHODS : '')
            || (String(lesson?.module || e.module_id || '').startsWith('stats-') ? STATISTICS : '')
        }
      })
  }

  function groupSoftwareByLesson(events) {
    const grouped = {}
    for (const e of events) {
      const key = e.lesson_id || e.lesson_title || 'unknown'
      if (!grouped[key]) {
        grouped[key] = {
          lesson_id: e.lesson_id,
          lesson_title: e.lesson_title,
          module_id: e.module_id,
          software: e.software,
          events: []
        }
      }
      grouped[key].events.push(e)
    }
    return Object.values(grouped).sort((a, b) =>
      (a.lesson_title || '').localeCompare(b.lesson_title || '')
    )
  }

  function enrichSoftwareMetrics(metrics) {
    return metrics.map(m => {
      const lesson = getLessonById(m.lesson_id)
      const phase = m.event_payload?.phase || ''
      return {
        ...m,
        lesson_title: lesson?.title || m.lesson_title || m.lesson_id,
        phase_label: phase ? phase.replace(/([A-Z])/g, ' $1').trim() : m.event_type,
        module_id: m.module || lesson?.module || ''
      }
    })
  }

  return {
    loading,
    fetchSemesters,
    fetchRosterStudents,
    fetchStudentUsers,
    fetchProgressForUser,
    enrichConceptAttempts,
    enrichSoftwareEvents,
    groupSoftwareByLesson,
    enrichSoftwareMetrics,
    formatConceptAnswer,
    formatAnswerValue,
    inferCourseFromQuestionId
  }
}
