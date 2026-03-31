import { ref } from 'vue'
import { software } from '../data/topics.js'

const STORAGE_KEY = 'preferredSoftware'

function readFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return 'jamovi'
    return software.find(sw => sw.id === raw)?.id || 'jamovi'
  } catch {
    return 'jamovi'
  }
}

export const preferredSoftware = ref(
  typeof window !== 'undefined' ? readFromStorage() : 'jamovi'
)

if (typeof window !== 'undefined') {
  window.addEventListener('storage', e => {
    if (e.key === STORAGE_KEY) {
      preferredSoftware.value = readFromStorage()
    }
  })
}

export function setPreferredSoftware(swId) {
  preferredSoftware.value = swId
  try {
    localStorage.setItem(STORAGE_KEY, swId)
  } catch (err) {
    console.warn('Unable to save preferred software:', err)
  }
}

export function getSoftwareIcon(softwareId) {
  if (softwareId === 'jamovi') return '/jamovi-icon.png'
  if (softwareId === 'r') return '/r-icon.png'
  if (softwareId === 'spss') return '/SPSS-icon.png'
  if (softwareId === 'excel') return '/excel-icon.png'
  if (softwareId === 'stata') return '/stata-icon.png'
  return ''
}

export const softwareOptions = software

export function usePreferredSoftware() {
  return {
    preferredSoftware,
    softwareOptions,
    setPreferredSoftware,
    getSoftwareIcon
  }
}
