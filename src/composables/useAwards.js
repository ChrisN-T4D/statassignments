// Badges a student has earned. The server verifies the evidence before it records one (backend/api/awards.py).
import { computed, ref } from 'vue'
import { pb } from '../lib/pocketbase'
import { BADGE_SETS } from '../data/badges.js'

// Shared across pages so a badge earned anywhere shows one toast
const toast = ref('')
let syncTimer = null

const NAMES = Object.fromEntries(
  BADGE_SETS.flatMap((s) => [
    [s.moduleBadge.awardId, `${s.moduleBadge.name} (module badge)`],
    ...s.topics.map((t) => [t.awardId, t.name])
  ])
)

function announce(award) {
  const name = NAMES[award.award_id] || 'a new badge'
  toast.value = award.kind === 'module' ? `You earned the ${name}! 🏅` : `Badge earned: ${name} 🏅`
}

/**
 * Ask the server to record any objective badges the student has earned (Statistics Modules 1-8). Call it after
 * answers are saved; calls within 2 seconds collapse into one.
 */
export function scheduleBadgeSync() {
  if (!pb.authStore.isValid) return
  clearTimeout(syncTimer)
  syncTimer = setTimeout(async () => {
    try {
      const data = await pb.send('/api/awards/sync', { method: 'POST' })
      const fresh = [...(data?.new || []), ...(data?.upgraded || [])]
      // a module badge is the bigger news
      const pick = fresh.find((a) => a.kind === 'module') || fresh[0]
      if (pick) announce(pick)
    } catch (err) {
      console.warn('[awards] sync failed', err)
    }
  }, 2000)
}

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

  /** Ask the server to check everything and record what is earned; refreshes the list. */
  async function sync() {
    try {
      const data = await pb.send('/api/awards/sync', { method: 'POST' })
      if (data?.items) awards.value = data.items
      return data
    } catch (err) {
      console.warn('[awards] sync failed', err)
      return null
    }
  }

  /** Ask the server to record one badge (Math Practice). Resolves to { award, created, upgraded }, or null if it is not earned yet. */
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

  return { awards, byAwardId, loaded, load, sync, claim, toast }
}
