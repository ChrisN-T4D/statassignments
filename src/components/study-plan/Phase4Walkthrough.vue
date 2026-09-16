<template>
  <SpotlightTour
    :root-el="rootEl"
    :steps="PHASE4_TOUR_STEPS"
    :storage-key="PHASE4_TOUR_STORAGE_KEY"
    aria-label="Phase 4 guided tour"
    hint="Walks through Parts A–E: recap, IV/DV, four pathways, comparison table, and final choice."
    variant="blue"
  />
</template>

<script setup>
import { PHASE4_TOUR_STEPS, PHASE4_TOUR_STORAGE_KEY } from '../../data/capstonePhase4Walkthrough.js'
import SpotlightTour from './SpotlightTour.vue'

defineProps({
  rootEl: { type: Object, default: null }
})
</script>
