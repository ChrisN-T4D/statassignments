<template>
  <div class="tour-launcher">
    <button type="button" class="tour-start-btn" @click="startTour">
      {{ completed ? 'Replay guided tour' : 'Start guided tour' }}
    </button>
    <p class="tour-hint">Explains each elevator speech part and how to use your Lit Review Outline as a starting point.</p>

    <SpotlightTour
      :active="tour.active"
      :step-index="tour.stepIndex"
      :step-count="tour.stepCount"
      :current-step="tour.currentStep"
      :highlight="tour.highlight"
      :popover="tour.popover"
      aria-label="Phase 3 guided tour"
      @next="tour.next"
      @prev="tour.prev"
      @end="onTourEnd"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { PHASE3_TOUR_STEPS, PHASE3_TOUR_STORAGE_KEY } from '../../data/capstonePhase3Walkthrough.js'
import { useSpotlightTour } from '../../composables/useSpotlightTour.js'
import SpotlightTour from './SpotlightTour.vue'

const props = defineProps({
  rootEl: { type: Object, default: null }
})

const completed = ref(false)
const tour = useSpotlightTour(computed(() => props.rootEl), computed(() => PHASE3_TOUR_STEPS), {})

onMounted(() => {
  try {
    completed.value = localStorage.getItem(PHASE3_TOUR_STORAGE_KEY) === '1'
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
    localStorage.setItem(PHASE3_TOUR_STORAGE_KEY, '1')
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

.tour-hint {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0.55rem 0 0;
  line-height: 1.45;
}
</style>
