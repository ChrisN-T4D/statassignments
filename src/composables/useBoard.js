import { ref } from 'vue'

// Shared by the launcher, the Stuck? page and the full-page board.
const isOpen = ref(false)
const prefill = ref({ search: '', tag: '', tagLabel: '' })
const unread = ref(0)

// Docked = a side column the page makes room for, so students can keep working while it stays open
const DOCK_KEY = 'board_docked'
function readDocked() {
  try {
    return localStorage.getItem(DOCK_KEY) === '1'
  } catch {
    return false
  }
}
const docked = ref(readDocked())

export function setDocked(value) {
  docked.value = value
  try {
    localStorage.setItem(DOCK_KEY, value ? '1' : '0')
  } catch {
    // the choice just won't be remembered
  }
}

/** Open the "Ask the class" panel, optionally pre-filtered/tagged for where the student came from. */
export function openBoard({ search = '', tag = '', tagLabel = '' } = {}) {
  prefill.value = { search, tag, tagLabel }
  isOpen.value = true
}

export function closeBoard() {
  isOpen.value = false
}

export function useBoard() {
  return { isOpen, prefill, unread, docked, setDocked, openBoard, closeBoard }
}
