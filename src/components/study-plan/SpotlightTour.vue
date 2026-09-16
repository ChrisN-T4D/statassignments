<template>
  <div class="tour-launcher" :class="`variant-${variant}`">
    <button type="button" class="tour-start-btn" @click="startTour">
      {{ completed ? 'Replay guided tour' : 'Start guided tour' }}
    </button>
    <p v-if="hint" class="tour-hint">{{ hint }}</p>

    <Teleport to="body">
      <div
        v-if="active"
        class="spotlight-tour"
        role="dialog"
        aria-modal="true"
        :aria-label="ariaLabel"
      >
        <div class="spotlight-backdrop" @click="onTourEnd" />

        <div
          v-if="highlight.visible"
          class="spotlight-ring"
          :style="{
            top: `${highlight.top}px`,
            left: `${highlight.left}px`,
            width: `${highlight.width}px`,
            height: `${highlight.height}px`
          }"
        />

        <div
          v-if="currentStep"
          class="spotlight-popover"
          :class="`placement-${popover.placement}`"
          :style="popoverStyle"
        >
          <p class="popover-step">{{ stepIndex + 1 }} of {{ stepCount }}</p>
          <h3 class="popover-title">{{ currentStep.title }}</h3>
          <p class="popover-body">{{ currentStep.body }}</p>

          <div v-if="currentStep.narrow || currentStep.widen" class="popover-adjust">
            <div v-if="currentStep.narrow" class="adjust narrow">
              <span class="adjust-label">Narrow when</span>
              <p>{{ currentStep.narrow }}</p>
            </div>
            <div v-if="currentStep.widen" class="adjust widen">
              <span class="adjust-label">Widen when</span>
              <p>{{ currentStep.widen }}</p>
            </div>
          </div>

          <div class="popover-actions">
            <button type="button" class="btn-ghost" @click="onTourEnd">Skip tour</button>
            <div class="nav-buttons">
              <button type="button" class="btn-secondary" :disabled="stepIndex === 0" @click="prev">Back</button>
              <button type="button" class="btn-primary" @click="onNext">
                {{ stepIndex >= stepCount - 1 ? 'Finish' : 'Next' }}
              </button>
            </div>
          </div>
        </div>

        <div v-else class="spotlight-popover placement-center" :style="fallbackPopoverStyle">
          <h3 class="popover-title">Tour unavailable</h3>
          <p class="popover-body">This step could not be loaded. You can close the tour and try again.</p>
          <div class="popover-actions">
            <button type="button" class="btn-primary" @click="onTourEnd">Close tour</button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSpotlightTour } from '../../composables/useSpotlightTour.js'

const props = defineProps({
  rootEl: { type: Object, default: null },
  steps: { type: Array, required: true },
  storageKey: { type: String, default: '' },
  ariaLabel: { type: String, default: 'Guided tour' },
  hint: { type: String, default: '' },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'blue'].includes(value)
  },
  beforeStep: { type: Function, default: null }
})

const completed = ref(false)
const stepsRef = computed(() => props.steps)

function markTourCompleted () {
  completed.value = true
  if (!props.storageKey) return
  try {
    localStorage.setItem(props.storageKey, '1')
  } catch {
    /* ignore */
  }
}

const {
  active,
  stepIndex,
  stepCount,
  currentStep,
  highlight,
  popover,
  start,
  next,
  prev,
  end
} = useSpotlightTour(
  computed(() => props.rootEl),
  stepsRef,
  {
    beforeStep: async (step) => {
      if (props.beforeStep) await props.beforeStep(step)
    },
    onComplete: markTourCompleted
  }
)

const fallbackPopoverStyle = computed(() => ({
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: `${Math.min(400, window.innerWidth - 32)}px`
}))

const popoverStyle = computed(() => {
  const p = popover.value
  if (p.placement === 'center') {
    return {
      top: `${p.top}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      width: `${Math.min(400, window.innerWidth - 32)}px`
    }
  }
  if (p.placement === 'top') {
    return {
      bottom: `${window.innerHeight - p.top}px`,
      left: `${p.left}px`,
      width: `${p.width}px`
    }
  }
  return {
    top: `${p.top}px`,
    left: `${p.left}px`,
    width: `${p.width}px`
  }
})

onMounted(() => {
  if (!props.storageKey) return
  try {
    completed.value = localStorage.getItem(props.storageKey) === '1'
  } catch {
    completed.value = false
  }
})

function startTour () {
  start(0)
}

function onTourEnd () {
  end()
}

function onNext () {
  if (stepIndex.value >= stepCount.value - 1) {
    onTourEnd()
    return
  }
  next()
}
</script>

<style>
body.spotlight-tour-active {
  overflow: hidden;
}
</style>

<style scoped>
.tour-launcher {
  margin-bottom: 1.25rem;
  padding: 1rem 1.15rem;
  border: 1px dashed var(--border);
  border-radius: 0.75rem;
}

.tour-launcher.variant-primary {
  background: rgba(230, 57, 70, 0.05);
}

.tour-launcher.variant-blue {
  background: rgba(59, 130, 246, 0.06);
}

.tour-start-btn {
  display: inline-block;
  padding: 0.55rem 1rem;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
}

.variant-primary .tour-start-btn {
  border: 1px solid var(--primary);
  background: var(--primary);
}

.variant-blue .tour-start-btn {
  border: 1px solid #3b82f6;
  background: #3b82f6;
}

.tour-start-btn:hover {
  filter: brightness(1.08);
}

.tour-hint {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0.55rem 0 0;
  line-height: 1.45;
}

.spotlight-tour {
  position: fixed;
  inset: 0;
  z-index: 10000;
  pointer-events: none;
}

.spotlight-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.62);
  pointer-events: auto;
}

.spotlight-ring {
  position: fixed;
  z-index: 10001;
  border: 2px solid var(--primary, #e63946);
  border-radius: 0.65rem;
  box-shadow: 0 0 0 2px rgba(230, 57, 70, 0.35), 0 0 24px rgba(230, 57, 70, 0.25);
  pointer-events: none;
  transition: top 0.25s ease, left 0.25s ease, width 0.25s ease, height 0.25s ease;
}

.spotlight-popover {
  position: fixed;
  z-index: 10002;
  pointer-events: auto;
  background: var(--bg-card, #141414);
  border: 1px solid var(--border, #2a2a2a);
  border-radius: 0.75rem;
  padding: 1.15rem 1.25rem;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.45);
  max-height: min(70vh, 420px);
  overflow-y: auto;
}

.popover-step {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--primary, #e63946);
  margin: 0 0 0.35rem;
}

.popover-title {
  font-size: 1.05rem;
  margin: 0 0 0.5rem;
  line-height: 1.35;
}

.popover-body {
  font-size: 0.9rem;
  color: var(--text-secondary, #9ca3af);
  line-height: 1.5;
  margin: 0 0 0.75rem;
}

.popover-adjust {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 0.85rem;
}

@media (min-width: 480px) {
  .popover-adjust {
    grid-template-columns: 1fr 1fr;
  }
}

.adjust {
  padding: 0.65rem;
  border-radius: 0.45rem;
  font-size: 0.82rem;
  line-height: 1.45;
}

.adjust.narrow {
  background: rgba(230, 57, 70, 0.1);
  border: 1px solid rgba(230, 57, 70, 0.28);
}

.adjust.widen {
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.28);
}

.adjust-label {
  display: block;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin-bottom: 0.25rem;
}

.adjust.narrow .adjust-label { color: #fca5a5; }
.adjust.widen .adjust-label { color: #93c5fd; }

.adjust p {
  margin: 0;
  color: var(--text-secondary, #9ca3af);
}

.popover-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.nav-buttons {
  display: flex;
  gap: 0.5rem;
}

.btn-primary,
.btn-secondary,
.btn-ghost {
  padding: 0.45rem 0.85rem;
  border-radius: 0.45rem;
  font-size: 0.88rem;
  cursor: pointer;
}

.btn-primary {
  border: 1px solid var(--primary, #e63946);
  background: var(--primary, #e63946);
  color: #fff;
}

.btn-secondary {
  border: 1px solid var(--border, #2a2a2a);
  background: transparent;
  color: var(--text-primary, #f0f0f0);
}

.btn-secondary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.btn-ghost {
  border: none;
  background: transparent;
  color: var(--text-secondary, #9ca3af);
}
</style>
