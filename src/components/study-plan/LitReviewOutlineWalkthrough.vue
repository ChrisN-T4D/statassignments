<template>
  <SpotlightTour
    :root-el="rootEl"
    :steps="LIT_REVIEW_OUTLINE_TOUR_STEPS"
    :storage-key="LIT_REVIEW_OUTLINE_TOUR_STORAGE_KEY"
    aria-label="Lit Review Outline guided tour"
    hint="Framework first, then theme buckets, gap, and compiled outline for Draft 1."
    variant="blue"
  />
</template>

<script setup>
import {
  LIT_REVIEW_OUTLINE_TOUR_STEPS,
  LIT_REVIEW_OUTLINE_TOUR_STORAGE_KEY
} from '../../data/capstoneLitReviewOutlineWalkthrough.js'
import SpotlightTour from './SpotlightTour.vue'

defineProps({
  rootEl: { type: Object, default: null }
})
</script>
