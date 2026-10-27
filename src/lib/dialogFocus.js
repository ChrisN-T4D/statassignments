// v-dialog-focus="close": for a modal overlay element. On open, remembers the
// previously focused element and moves focus into the dialog; Tab stays inside
// it, Escape calls close, and focus returns to the opener when it goes away.
const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

function focusables(el) {
  return [...el.querySelectorAll(FOCUSABLE)].filter((n) => n.offsetParent !== null)
}

export const dialogFocus = {
  mounted(el, binding) {
    el.__dialogOpener = document.activeElement
    el.__dialogClose = binding.value
    el.__dialogKey = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation()
        if (typeof el.__dialogClose === 'function') el.__dialogClose()
        return
      }
      if (e.key !== 'Tab') return
      const items = focusables(el)
      if (!items.length) {
        e.preventDefault()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && (document.activeElement === first || !el.contains(document.activeElement))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (document.activeElement === last || !el.contains(document.activeElement))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', el.__dialogKey, true)
    requestAnimationFrame(() => {
      if (el.contains(document.activeElement)) return
      const items = focusables(el)
      if (items.length) items[0].focus()
    })
  },
  updated(el, binding) {
    el.__dialogClose = binding.value
  },
  unmounted(el) {
    document.removeEventListener('keydown', el.__dialogKey, true)
    const opener = el.__dialogOpener
    if (opener && typeof opener.focus === 'function' && document.contains(opener)) opener.focus()
  },
}
