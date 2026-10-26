<template>
  <div class="study-plan-section-page">
    <div class="container" v-if="sectionMeta">
      <div class="section-header">
        <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
        <WeekContextBar v-if="hasSchedule(classId)" :class-slug="String(classId)" :target="{ kind: 'study-plan', id: sectionId }" />
      </div>

      <div class="section-sticky">
        <div class="section-sticky-main">
          <h1 class="section-title">{{ sectionMeta.title }}</h1>
          <span v-if="dueText" class="section-due-chip" :class="{ now: due.status === 'this-week', past: due.status === 'past' }">
            {{ dueText }}
          </span>
        </div>
        <span v-if="progressText" class="section-progress">{{ progressText }}</span>
      </div>
      <p class="section-submit">
        {{ sectionMeta.submitNote }} Dates follow the course timeline; Canvas has the official due dates.
      </p>

      <component
        :is="sectionComponent"
        :project="project"
        :class-id="classId"
        @update="onSectionUpdate"
      />
    </div>

    <div v-else class="container">
      <p>Unknown section.</p>
      <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
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
import MeasuresDraftSection from '../components/study-plan/MeasuresDraftSection.vue'
import WeekContextBar from '../components/WeekContextBar.vue'
import { studyPlanSectionProgress } from '../lib/studyPlanProgress.js'
import { studyPlanDue, formatStudyPlanDue, hasSchedule } from '../data/researchMethodsSchedule.js'

const props = defineProps({
  classId: { type: String, required: true },
  sectionId: { type: String, required: true }
})

const { project, updateProject } = useCapstoneProject(props.classId)

const sectionMeta = computed(() => getStudyPlanSection(props.sectionId, props.classId))

const due = computed(() => studyPlanDue(props.sectionId, new Date(), props.classId))
const dueText = computed(() => formatStudyPlanDue(due.value))
const progressText = computed(() => studyPlanSectionProgress(project.value, props.sectionId, props.classId))

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
    case 'measures-draft':
      return MeasuresDraftSection
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

.section-sticky {
  position: sticky;
  top: 4.6rem; /* sits just under the sticky site header */
  z-index: 5;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 0.25rem 1rem;
  margin: 0 -1rem 0.75rem;
  padding: 0.625rem 1rem;
  border-bottom: 1px solid var(--border);
  background: var(--bg-main);
}

.section-sticky-main {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem 0.75rem;
}

.section-title {
  font-size: 1.25rem;
  margin: 0;
}

.section-due-chip {
  padding: 2px 8px;
  border-radius: 999px;
  border: 1px solid var(--border);
  font-size: 0.8rem;
  color: var(--text-secondary);
}

.section-due-chip.now {
  border-color: rgba(245, 158, 11, 0.6);
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
  font-weight: 600;
}

.section-due-chip.past {
  opacity: 0.75;
}

.section-progress {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-primary);
}

.section-submit {
  margin: 0 0 1.25rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}
</style>
