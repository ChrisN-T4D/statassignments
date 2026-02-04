import { ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'
import { useProfile } from './useProfile'

export function useAttempts() {
  const { user } = useAuth()
  const { profile } = useProfile()
  const loading = ref(false)

  async function submitAttempt({
    itemId,
    moduleId,
    softwareType,
    response,
    isCorrect,
    score = null,
    timeSpentSeconds = null,
    activeTimeSeconds = null,
    totalTimeSeconds = null,
    timeMaxedOut = false,
    idleDetected = false,
    hintUsed = false
  }) {
    if (!user.value || !profile.value) {
      return { data: null, error: 'Not authenticated or no profile linked' }
    }

    loading.value = true
    try {
      // Get attempt count for this item
      const existingAttempts = await pb.collection('attempts').getList(1, 1, {
        filter: `profile = "${profile.value.id}" && item = "${itemId}"`,
        sort: '-attempt_no'
      })

      const attemptNo = existingAttempts.items.length > 0
        ? (existingAttempts.items[0].attempt_no || 0) + 1
        : 1

      const data = await pb.collection('attempts').create({
        semester: profile.value.semester,
        profile: profile.value.id,
        module: moduleId,
        item: itemId,
        software_type: softwareType,
        response: response,
        is_correct: isCorrect,
        score: score,
        time_spent_seconds: timeSpentSeconds || activeTimeSeconds, // Backwards compatible
        active_time_seconds: activeTimeSeconds,
        total_time_seconds: totalTimeSeconds,
        time_maxed_out: timeMaxedOut,
        idle_detected: idleDetected,
        attempt_no: attemptNo,
        hint_used: hintUsed
      })

      return { data, error: null }
    } catch (err) {
      console.error('Error submitting attempt:', err)
      return { data: null, error: err }
    } finally {
      loading.value = false
    }
  }

  async function fetchUserAttempts(filters = {}) {
    if (!user.value || !profile.value) {
      return []
    }

    loading.value = true
    try {
      const filterParts = [`profile = "${profile.value.id}"`]

      if (filters.moduleId) {
        filterParts.push(`module = "${filters.moduleId}"`)
      }
      if (filters.itemId) {
        filterParts.push(`item = "${filters.itemId}"`)
      }
      if (filters.softwareType) {
        filterParts.push(`software_type = "${filters.softwareType}"`)
      }

      const records = await pb.collection('attempts').getFullList({
        filter: filterParts.join(' && '),
        sort: '-created',
        expand: 'item,module'
      })

      return records
    } catch (err) {
      console.error('Error fetching attempts:', err)
      return []
    } finally {
      loading.value = false
    }
  }

  async function fetchUserStats(filters = {}) {
    if (!user.value || !profile.value) {
      return null
    }

    try {
      const attempts = await fetchUserAttempts(filters)

      const total = attempts.length
      const correct = attempts.filter(a => a.is_correct).length
      const accuracy = total > 0 ? Math.round((correct / total) * 100) : 0

      // Get unique items attempted
      const uniqueItems = new Set(attempts.map(a => a.item))

      // Calculate average time spent (excluding nulls)
      const timesSpent = attempts.filter(a => a.time_spent_seconds).map(a => a.time_spent_seconds)
      const avgTimeSpent = timesSpent.length > 0
        ? Math.round(timesSpent.reduce((a, b) => a + b, 0) / timesSpent.length)
        : null

      return {
        total,
        correct,
        incorrect: total - correct,
        accuracy,
        uniqueItemsAttempted: uniqueItems.size,
        avgTimeSpentSeconds: avgTimeSpent
      }
    } catch (err) {
      console.error('Error fetching stats:', err)
      return null
    }
  }

  // Check if user has attempted an item before
  async function hasAttempted(itemId) {
    if (!profile.value) return false

    try {
      const records = await pb.collection('attempts').getList(1, 1, {
        filter: `profile = "${profile.value.id}" && item = "${itemId}"`
      })
      return records.items.length > 0
    } catch {
      return false
    }
  }

  // Get best attempt for an item
  async function getBestAttempt(itemId) {
    if (!profile.value) return null

    try {
      const records = await pb.collection('attempts').getList(1, 1, {
        filter: `profile = "${profile.value.id}" && item = "${itemId}" && is_correct = true`,
        sort: '-created'
      })
      return records.items.length > 0 ? records.items[0] : null
    } catch {
      return null
    }
  }

  // Get module progress for sequential unlock logic
  // Returns { completed: number, total: number, completedItemIds: Set, nextItemId: string | null }
  async function getModuleProgress(moduleId, items) {
    if (!profile.value) {
      return {
        completed: 0,
        total: items.length,
        completedItemIds: new Set(),
        nextItemId: items.length > 0 ? items[0].id : null
      }
    }

    try {
      // Get all correct attempts for this module
      const attempts = await pb.collection('attempts').getFullList({
        filter: `profile = "${profile.value.id}" && module = "${moduleId}" && is_correct = true`
      })

      // Build set of completed item IDs
      const completedItemIds = new Set(attempts.map(a => a.item))

      // Items should be sorted by order already
      // Find the first incomplete item
      let nextItemId = null
      for (const item of items) {
        if (!completedItemIds.has(item.id)) {
          nextItemId = item.id
          break
        }
      }

      return {
        completed: completedItemIds.size,
        total: items.length,
        completedItemIds,
        nextItemId
      }
    } catch (err) {
      console.error('Error getting module progress:', err)
      return {
        completed: 0,
        total: items.length,
        completedItemIds: new Set(),
        nextItemId: items.length > 0 ? items[0].id : null
      }
    }
  }

  // Check if an item is unlocked (either completed or is the next item)
  function isItemUnlocked(itemId, items, completedItemIds) {
    // If already completed, it's unlocked
    if (completedItemIds.has(itemId)) return true

    // Find the item's position
    const itemIndex = items.findIndex(i => i.id === itemId)
    if (itemIndex === -1) return false

    // First item is always unlocked
    if (itemIndex === 0) return true

    // Item is unlocked if the previous item is completed
    const prevItem = items[itemIndex - 1]
    return completedItemIds.has(prevItem.id)
  }

  return {
    loading,
    submitAttempt,
    fetchUserAttempts,
    fetchUserStats,
    hasAttempted,
    getBestAttempt,
    getModuleProgress,
    isItemUnlocked
  }
}
