import { ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'

export function usePractice() {
  const { user } = useAuth()
  const problems = ref([])
  const loading = ref(false)
  const currentProblem = ref(null)

  async function fetchProblems(topicId = null) {
    loading.value = true
    try {
      let filter = ''
      if (topicId) {
        filter = `topic_id = "${topicId}"`
      }

      const records = await pb.collection('practice_problems').getFullList({
        filter,
        sort: 'created'
      })
      problems.value = records

      // Parse options JSON if stored as string
      problems.value = records.map(p => ({
        ...p,
        options: typeof p.options === 'string' ? JSON.parse(p.options) : p.options
      }))
    } catch (err) {
      console.error('Error fetching problems:', err)
    } finally {
      loading.value = false
    }
    return problems.value
  }

  async function fetchRandomProblem(topicId = null) {
    loading.value = true
    try {
      let filter = ''
      if (topicId) {
        filter = `topic_id = "${topicId}"`
      }

      const records = await pb.collection('practice_problems').getFullList({
        filter
      })

      if (records.length > 0) {
        const randomIndex = Math.floor(Math.random() * records.length)
        const problem = records[randomIndex]
        currentProblem.value = {
          ...problem,
          options: typeof problem.options === 'string' ? JSON.parse(problem.options) : problem.options
        }
      } else {
        currentProblem.value = null
      }
    } catch (err) {
      console.error('Error fetching random problem:', err)
      currentProblem.value = null
    } finally {
      loading.value = false
    }
    return currentProblem.value
  }

  async function submitAnswer(problemId, answer, isCorrect) {
    if (!user.value) return { data: null, error: 'Not authenticated' }

    try {
      const data = await pb.collection('practice_attempts').create({
        user: user.value.id,
        problem: problemId,
        answer: answer,
        is_correct: isCorrect
      })
      return { data, error: null }
    } catch (err) {
      return { data: null, error: err }
    }
  }

  async function fetchUserStats(topicId = null) {
    if (!user.value) return null

    try {
      const attempts = await pb.collection('practice_attempts').getFullList({
        filter: `user = "${user.value.id}"`,
        expand: 'problem'
      })

      let filteredAttempts = attempts
      if (topicId) {
        filteredAttempts = attempts.filter(a => a.expand?.problem?.topic_id === topicId)
      }

      const total = filteredAttempts.length
      const correct = filteredAttempts.filter(a => a.is_correct).length
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

      return {
        total,
        correct,
        incorrect: total - correct,
        accuracy
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
      return null
    }
  }

  return {
    problems,
    loading,
    currentProblem,
    fetchProblems,
    fetchRandomProblem,
    submitAnswer,
    fetchUserStats
  }
}
