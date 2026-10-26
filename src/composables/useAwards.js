// Badges a student has earned. The server verifies the evidence before it records one (backend/api/awards.py).
import { computed, ref } from 'vue'
import { pb } from '../lib/pocketbase'

export function useAwards() {
  const awards = ref([])
  const loaded = ref(false)

  const byAwardId = computed(() => Object.fromEntries(awards.value.map((a) => [a.award_id, a])))

  async function load() {
    if (!pb.authStore.isValid) {
      awards.value = []
      loaded.value = true
      return awards.value
    }
    try {
      const data = await pb.send('/api/awards/mine')
      awards.value = data?.items || []
    } catch (err) {
      console.warn('[awards] could not load badges', err)
    }
    loaded.value = true
    return awards.value
  }

  /** Ask the server to record a badge. Resolves to { award, created, upgraded }, or null if it is not earned yet. */
  async function claim(awardId) {
    try {
      const data = await pb.send('/api/awards/claim', { method: 'POST', body: { award_id: awardId } })
      if (data?.award) {
        const rest = awards.value.filter((a) => a.award_id !== awardId)
        awards.value = [...rest, data.award]
      }
      return data
    } catch {
      return null // 409: not earned yet (or offline)
    }
  }

  return { awards, byAwardId, loaded, load, claim }
}
