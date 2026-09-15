import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'

const PAD = 8

/**
 * @param {import('vue').Ref<HTMLElement|null>} rootRef
 * @param {import('vue').ComputedRef<Array>} steps
 * @param {{ beforeStep?: (step: object) => void|Promise<void>, onComplete?: () => void }} options
 */
export function useSpotlightTour (rootRef, steps, options = {}) {
  const active = ref(false)
  const stepIndex = ref(0)
  const highlight = ref({ top: 0, left: 0, width: 0, height: 0, visible: false })
  const popover = ref({ top: 0, left: 0, placement: 'bottom' })

  const currentStep = computed(() => {
    const list = steps.value ?? []
    return list[stepIndex.value] ?? null
  })

  const stepCount = computed(() => (steps.value ?? []).length)

  function findTarget (selector) {
    const root = rootRef.value
    if (!root) return null
    if (selector.startsWith('#')) {
      return document.querySelector(selector)
    }
    return root.querySelector(`[data-tour="${selector}"]`) ?? document.querySelector(`[data-tour="${selector}"]`)
  }

  async function layoutStep () {
    const step = currentStep.value
    if (!step) return

    if (options.beforeStep) {
      await options.beforeStep(step)
    }

    await nextTick()
    await new Promise((r) => requestAnimationFrame(r))

    const el = findTarget(step.target)
    if (!el) {
      highlight.value = { top: 0, left: 0, width: 0, height: 0, visible: false }
      popover.value = { top: 80, left: 24, placement: 'center' }
      return
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' })
    await new Promise((r) => setTimeout(r, 280))

    const rect = el.getBoundingClientRect()
    highlight.value = {
      top: rect.top - PAD,
      left: rect.left - PAD,
      width: rect.width + PAD * 2,
      height: rect.height + PAD * 2,
      visible: true
    }

    const popoverWidth = Math.min(380, window.innerWidth - 32)
    let popTop = rect.bottom + 16
    let placement = 'bottom'
    if (popTop + 280 > window.innerHeight) {
      popTop = rect.top - 16
      placement = 'top'
    }
    let popLeft = Math.max(16, Math.min(rect.left, window.innerWidth - popoverWidth - 16))
    popover.value = { top: popTop, left: popLeft, placement, width: popoverWidth }
  }

  async function start (fromIndex = 0) {
    stepIndex.value = fromIndex
    active.value = true
    document.body.classList.add('spotlight-tour-active')
    await layoutStep()
  }

  async function go (index) {
    const max = stepCount.value - 1
    stepIndex.value = Math.max(0, Math.min(index, max))
    await layoutStep()
  }

  async function next () {
    if (stepIndex.value >= stepCount.value - 1) {
      end()
      return
    }
    stepIndex.value += 1
    await layoutStep()
  }

  async function prev () {
    if (stepIndex.value <= 0) return
    stepIndex.value -= 1
    await layoutStep()
  }

  function end () {
    if (!active.value) return
    active.value = false
    highlight.value = { ...highlight.value, visible: false }
    document.body.classList.remove('spotlight-tour-active')
    options.onComplete?.()
  }

  function onResize () {
    if (active.value) layoutStep()
  }

  function onKeydown (e) {
    if (!active.value) return
    if (e.key === 'Escape') end()
    if (e.key === 'ArrowRight') next()
    if (e.key === 'ArrowLeft') prev()
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
    window.addEventListener('scroll', onResize, true)
    window.addEventListener('keydown', onKeydown)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', onResize)
    window.removeEventListener('scroll', onResize, true)
    window.removeEventListener('keydown', onKeydown)
    document.body.classList.remove('spotlight-tour-active')
  })

  watch(active, (on) => {
    if (on) layoutStep()
  })

  return {
    active,
    stepIndex,
    currentStep,
    stepCount,
    highlight,
    popover,
    start,
    next,
    prev,
    end,
    go,
    layoutStep
  }
}
