<template>
  <SpotlightTour
    :root-el="rootEl"
    :steps="ARTICLE_REVIEW_TOUR_STEPS"
    :storage-key="ARTICLE_REVIEW_TOUR_STORAGE_KEY"
    aria-label="Article review guided tour"
    hint="Highlights each part of the worksheet and explains why it matters, including when to narrow or widen your topic."
    variant="primary"
    :before-step="beforeStep"
  />
</template>

<script setup>
import {
  ARTICLE_REVIEW_TOUR_STEPS,
  ARTICLE_REVIEW_TOUR_STORAGE_KEY
} from '../../data/capstoneArticleReviewWalkthrough.js'
import SpotlightTour from './SpotlightTour.vue'

defineProps({
  rootEl: { type: Object, default: null },
  beforeStep: { type: Function, default: null }
})
</script>
