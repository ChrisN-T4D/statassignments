<template>
  <SpotlightTour
    :root-el="rootEl"
    :steps="PHASE3_TOUR_STEPS"
    :storage-key="PHASE3_TOUR_STORAGE_KEY"
    aria-label="Phase 3 guided tour"
    hint="Explains each elevator speech part and how to use your Lit Review Outline as a starting point."
    variant="blue"
  />
</template>

<script setup>
import { PHASE3_TOUR_STEPS, PHASE3_TOUR_STORAGE_KEY } from '../../data/capstonePhase3Walkthrough.js'
import SpotlightTour from './SpotlightTour.vue'

defineProps({
  rootEl: { type: Object, default: null }
})
</script>
