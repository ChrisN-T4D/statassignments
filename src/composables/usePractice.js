import { ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'
import { allStatisticsQuestions, getQuestionsByModule } from '../data/conceptQuestions'
import { updateBKT } from './useBKT'
import { getObjectivesForQuestion } from '../data/questionObjectiveMap'

export function usePractice() {
  const { user } = useAuth()
  const problems = ref([])
  const loading = ref(false)
  const currentProblem = ref(null)
  const masteryQueue = ref([])
  const masteryIndex = ref(0)
  const masteryTotal = ref(0)

  const masteryConfig = {
    easy: 2,
    medium: 2,
    hard: 2
  }

  // Convert static question format to the format expected by Practice.vue
  function convertQuestion(q) {
    if (!q) return null

    // Map question types
    let question_type = q.type
    if (q.type === 'multiple_choice') question_type = 'multiple_choice'
    else if (q.type === 'multiple_select') question_type = 'multiple_choice' // treat as MC for now
    else if (q.type === 'true_false') question_type = 'true_false'
    else if (q.type === 'fill_blank') question_type = 'numeric' // use numeric input
    else if (q.type === 'matching') question_type = 'multiple_choice' // simplified
    else if (q.type === 'ordering') question_type = 'multiple_choice' // simplified

    // Build options array
    let options = []
    let correct_answer = ''

    if (q.type === 'multiple_choice') {
      options = q.options.map(opt => opt.text)
      const correctOpt = q.options.find(opt => opt.id === q.correct)
      correct_answer = correctOpt?.text || ''
    } else if (q.type === 'multiple_select') {
      options = q.options.map(opt => opt.text)
      correct_answer = q.options
        .filter(opt => q.correct.includes(opt.id))
        .map(opt => opt.text)
    } else if (q.type === 'true_false') {
      options = ['True', 'False']
      correct_answer = q.correct ? 'True' : 'False'
    } else if (q.type === 'fill_blank') {
      correct_answer = Array.isArray(q.answer) ? q.answer[0] : q.answer
    } else if (q.type === 'matching') {
      // For matching, show first pair as a simplified question
      options = q.pairs.map(p => p.right)
      correct_answer = q.pairs[0]?.right || ''
    } else if (q.type === 'ordering') {
      options = q.items.map(item => item.text)
      correct_answer = q.items.find(item => item.id === q.correctOrder[0])?.text || ''
    }

    return {
      id: q.id,
      topic_id: q.moduleId,
      question: q.question,
      question_type: q.type === 'multiple_select' ? 'multiple_select' : question_type,
      options,
      correct_answer,
      explanation: q.feedback?.correct || '',
      hint: q.hint || q.feedback?.incorrect || null,
      difficulty: q.difficulty || 'medium'
    }
  }

  // Try PocketBase first, fallback to static questions
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

      if (records.length > 0) {
        problems.value = records.map(p => ({
          ...p,
          options: typeof p.options === 'string' ? JSON.parse(p.options) : p.options
        }))
      } else {
        // Fallback to static questions
        let staticQuestions = topicId
          ? getQuestionsByModule(topicId)
          : allStatisticsQuestions
        problems.value = staticQuestions.map(convertQuestion).filter(Boolean)
      }
    } catch (err) {
      console.error('Error fetching problems from PocketBase:', err)
      // Fallback to static questions
      let staticQuestions = topicId
        ? getQuestionsByModule(topicId)
        : allStatisticsQuestions
      problems.value = staticQuestions.map(convertQuestion).filter(Boolean)
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
        // Fallback to static questions
        let staticQuestions = topicId
          ? getQuestionsByModule(topicId)
          : allStatisticsQuestions

        if (staticQuestions.length > 0) {
          const randomIndex = Math.floor(Math.random() * staticQuestions.length)
          currentProblem.value = convertQuestion(staticQuestions[randomIndex])
        } else {
          currentProblem.value = null
        }
      }
    } catch (err) {
      console.error('Error fetching random problem:', err)
      // Fallback to static questions
      let staticQuestions = topicId
        ? getQuestionsByModule(topicId)
        : allStatisticsQuestions

      if (staticQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * staticQuestions.length)
        currentProblem.value = convertQuestion(staticQuestions[randomIndex])
      } else {
        currentProblem.value = null
      }
    } finally {
      loading.value = false
    }
    return currentProblem.value
  }

  function shuffleList(items) {
    return [...items].sort(() => Math.random() - 0.5)
  }

  function normalizeDifficulty(problem) {
    return (problem.difficulty || 'medium').toLowerCase()
  }

  async function buildMasteryQueue(topicId = null) {
    const allProblems = await fetchProblems(topicId)
    const grouped = {
      easy: [],
      medium: [],
      hard: []
    }

    allProblems.forEach(problem => {
      const difficulty = normalizeDifficulty(problem)
      if (difficulty === 'easy') grouped.easy.push(problem)
      else if (difficulty === 'hard') grouped.hard.push(problem)
      else grouped.medium.push(problem)
    })

    const easy = shuffleList(grouped.easy)
    const medium = shuffleList(grouped.medium)
    const hard = shuffleList(grouped.hard)

    const queue = []
    queue.push(...easy.splice(0, masteryConfig.easy))
    queue.push(...medium.splice(0, masteryConfig.medium))
    queue.push(...hard.splice(0, masteryConfig.hard))

    masteryQueue.value = queue
    masteryIndex.value = 0
    masteryTotal.value = queue.length
    return queue
  }

  async function startMastery(topicId = null) {
    await buildMasteryQueue(topicId)
    currentProblem.value = masteryQueue.value[0] || null
    return currentProblem.value
  }

  async function nextMasteryProblem() {
    if (masteryQueue.value.length === 0) {
      currentProblem.value = null
      return currentProblem.value
    }

    masteryIndex.value += 1
    if (masteryIndex.value >= masteryQueue.value.length) {
      currentProblem.value = null
      return currentProblem.value
    }

    currentProblem.value = masteryQueue.value[masteryIndex.value]
    return currentProblem.value
  }

  async function submitAnswer(problemId, answer, isCorrect, difficulty = 'medium') {
    if (!user.value) return { data: null, error: 'Not authenticated' }

    try {
      // Update BKT for all objectives associated with this question
      // Use difficulty-adjusted parameters (IRT-based tuning)
      const objectives = getObjectivesForQuestion(problemId)
      for (const objectiveId of objectives) {
        const updatedState = await updateBKT(objectiveId, isCorrect, difficulty)
        console.log(`BKT updated for ${objectiveId} (${difficulty}):`, {
          mastery: Math.round(updatedState.pL * 100) + '%',
          attempts: updatedState.attempts,
          correct: updatedState.correct,
          slip: updatedState.pS,
          guess: updatedState.pG
        })
      }

      // Store attempt in PocketBase
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
    startMastery,
    nextMasteryProblem,
    masteryIndex,
    masteryTotal,
    submitAnswer,
    fetchUserStats
  }
}
