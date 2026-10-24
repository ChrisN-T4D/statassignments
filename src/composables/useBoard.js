import { ref } from 'vue'

// Shared by the launcher, the Stuck? page and the full-page board.
const isOpen = ref(false)
const prefill = ref({ search: '', tag: '', tagLabel: '' })
const unread = ref(0)

/** Open the "Ask the class" panel, optionally pre-filtered/tagged for where the student came from. */
export function openBoard({ search = '', tag = '', tagLabel = '' } = {}) {
  prefill.value = { search, tag, tagLabel }
  isOpen.value = true
}

export function closeBoard() {
  isOpen.value = false
}

export function useBoard() {
  return { isOpen, prefill, unread, openBoard, closeBoard }
}
