<template>
  <div class="tour-launcher">
    <button type="button" class="tour-start-btn" @click="startTour">
      {{ completed ? 'Replay guided tour' : 'Start guided tour' }}
    </button>
    <p class="tour-hint">Framework first, then theme buckets, gap, and compiled outline for Draft 1.</p>

    <SpotlightTour
      :active="active"
      :step-index="stepIndex"
      :step-count="stepCount"
      :current-step="currentStep"
      :highlight="highlight"
      :popover="popover"
      aria-label="Lit Review Outline guided tour"
      @next="next"
      @prev="prev"
      @end="onTourEnd"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  LIT_REVIEW_OUTLINE_TOUR_STEPS,
  LIT_REVIEW_OUTLINE_TOUR_STORAGE_KEY
} from '../../data/capstoneLitReviewOutlineWalkthrough.js'
import { useSpotlightTour } from '../../composables/useSpotlightTour.js'
import SpotlightTour from './SpotlightTour.vue'

const props = defineProps({
  rootEl: { type: Object, default: null }
})

const completed = ref(false)
const steps = computed(() => LIT_REVIEW_OUTLINE_TOUR_STEPS)

function markTourCompleted () {
  completed.value = true
  try {
    localStorage.setItem(LIT_REVIEW_OUTLINE_TOUR_STORAGE_KEY, '1')
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
  steps,
  { onComplete: markTourCompleted }
)

onMounted(() => {
  try {
    completed.value = localStorage.getItem(LIT_REVIEW_OUTLINE_TOUR_STORAGE_KEY) === '1'
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
</script>

<style scoped>
.tour-launcher {
  margin-bottom: 1.25rem;
  padding: 1rem 1.15rem;
  border: 1px dashed var(--border);
  border-radius: 0.75rem;
  background: rgba(59, 130, 246, 0.06);
}

.tour-start-btn {
  display: inline-block;
  padding: 0.55rem 1rem;
  border: 1px solid #3b82f6;
  border-radius: 0.5rem;
  background: #3b82f6;
  color: #fff;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
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
</style>
