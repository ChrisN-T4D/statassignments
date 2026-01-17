import { ref, computed } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'

const progress = ref([])
const loading = ref(false)

export function useProgress() {
  const { user } = useAuth()

  async function fetchProgress() {
    if (!user.value) return

    loading.value = true
    try {
      const records = await pb.collection('user_progress').getFullList({
        filter: `user = "${user.value.id}"`
      })
      progress.value = records
    } catch (err) {
      console.error('Error fetching progress:', err)
    } finally {
      loading.value = false
    }
  }

  async function markTopicComplete(topicId) {
    if (!user.value) return

    const existing = progress.value.find(p => p.topic_id === topicId)

    try {
      if (existing) {
        const updated = await pb.collection('user_progress').update(existing.id, {
          completed: true,
          completed_at: new Date().toISOString()
        })
        const index = progress.value.findIndex(p => p.id === existing.id)
        progress.value[index] = updated
      } else {
        const created = await pb.collection('user_progress').create({
          user: user.value.id,
          topic_id: topicId,
          completed: true,
          completed_at: new Date().toISOString()
        })
        progress.value.push(created)
      }
    } catch (err) {
      console.error('Error marking complete:', err)
    }
  }

  async function markTopicIncomplete(topicId) {
    if (!user.value) return

    const existing = progress.value.find(p => p.topic_id === topicId)

    if (existing) {
      try {
        const updated = await pb.collection('user_progress').update(existing.id, {
          completed: false,
          completed_at: null
        })
        const index = progress.value.findIndex(p => p.id === existing.id)
        progress.value[index] = updated
      } catch (err) {
        console.error('Error marking incomplete:', err)
      }
    }
  }

  function isTopicComplete(topicId) {
    const record = progress.value.find(p => p.topic_id === topicId)
    return record?.completed ?? false
  }

  const completedCount = computed(() => {
    return progress.value.filter(p => p.completed).length
  })

  return {
    progress,
    loading,
    fetchProgress,
    markTopicComplete,
    markTopicIncomplete,
    isTopicComplete,
    completedCount
  }
}
