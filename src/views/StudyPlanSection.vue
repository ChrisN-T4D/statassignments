<template>
  <div class="study-plan-section-page">
    <div class="container" v-if="sectionMeta">
      <div class="section-header">
        <router-link :to="`/class/${classId}/study-plan`" class="back-link">← Study Plan</router-link>
        <h1 class="section-title">{{ sectionMeta.title }}</h1>
        <p class="section-due">{{ sectionMeta.dueNote }}</p>
      </div>

      <component
        :is="sectionComponent"
        :project="project"
        :class-id="classId"
        @update="onSectionUpdate"
      />
    </div>

    <div v-else class="container">
      <p>Unknown section.</p>
      <router-link :to="`/class/${classId}/study-plan`" class="back-link">← Study Plan</router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useCapstoneProject } from '../composables/useCapstoneProject'
import { getStudyPlanSection } from '../data/capstoneWorksheetSchemas.js'
import ArticleReviewSection from '../components/study-plan/ArticleReviewSection.vue'
import LitReviewOutlineSection from '../components/study-plan/LitReviewOutlineSection.vue'
import ElevatorSpeechSection from '../components/study-plan/ElevatorSpeechSection.vue'
import Phase4Section from '../components/study-plan/Phase4Section.vue'

const props = defineProps({
  classId: { type: String, required: true },
  sectionId: { type: String, required: true }
})

const { project, updateProject } = useCapstoneProject(props.classId)

const sectionMeta = computed(() => getStudyPlanSection(props.sectionId))

const sectionComponent = computed(() => {
  switch (props.sectionId) {
    case 'article-review':
      return ArticleReviewSection
    case 'study-focus':
      return LitReviewOutlineSection
    case 'phase-3':
      return ElevatorSpeechSection
    case 'phase-4':
      return Phase4Section
    default:
      return null
  }
})

function onSectionUpdate (patch) {
  updateProject(patch)
}
</script>

<style scoped>
.study-plan-section-page {
  padding: 1.5rem 0 3rem;
  min-height: 60vh;
}

.container {
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-header {
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: var(--primary);
}

.section-title {
  font-size: 1.5rem;
  margin: 0 0 0.35rem;
}

.section-due {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0;
}
</style>
