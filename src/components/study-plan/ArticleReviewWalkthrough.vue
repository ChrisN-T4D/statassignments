<template>
  <div class="tour-launcher">
    <button type="button" class="tour-start-btn" @click="startTour">
      {{ completed ? 'Replay guided tour' : 'Start guided tour' }}
    </button>
    <p class="tour-hint">Highlights each part of the worksheet and explains why it matters, including when to narrow or widen your topic.</p>

    <SpotlightTour
      :active="tour.active"
      :step-index="tour.stepIndex"
      :step-count="tour.stepCount"
      :current-step="tour.currentStep"
      :highlight="tour.highlight"
      :popover="tour.popover"
      aria-label="Article review guided tour"
      @next="tour.next"
      @prev="tour.prev"
      @end="onTourEnd"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import {
  ARTICLE_REVIEW_TOUR_STEPS,
  ARTICLE_REVIEW_TOUR_STORAGE_KEY
} from '../../data/capstoneArticleReviewWalkthrough.js'
import { useSpotlightTour } from '../../composables/useSpotlightTour.js'
import SpotlightTour from './SpotlightTour.vue'

const props = defineProps({
  rootEl: { type: Object, default: null },
  beforeStep: { type: Function, default: null }
})

const completed = ref(false)
const steps = computed(() => ARTICLE_REVIEW_TOUR_STEPS)

const tour = useSpotlightTour(
  computed(() => props.rootEl),
  steps,
  {
    beforeStep: async (step) => {
      if (props.beforeStep) await props.beforeStep(step)
    }
  }
)

onMounted(() => {
  try {
    completed.value = localStorage.getItem(ARTICLE_REVIEW_TOUR_STORAGE_KEY) === '1'
  } catch {
    completed.value = false
  }
})

function startTour () {
  tour.start(0)
}

function onTourEnd () {
  tour.end()
  completed.value = true
  try {
    localStorage.setItem(ARTICLE_REVIEW_TOUR_STORAGE_KEY, '1')
  } catch {
    /* ignore */
  }
}
</script>

<style scoped>
.tour-launcher {
  margin-bottom: 1.25rem;
  padding: 1rem 1.15rem;
  border: 1px dashed var(--border);
  border-radius: 0.75rem;
  background: rgba(230, 57, 70, 0.05);
}

.tour-start-btn {
  display: inline-block;
  padding: 0.55rem 1rem;
  border: 1px solid var(--primary);
  border-radius: 0.5rem;
  background: var(--primary);
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
