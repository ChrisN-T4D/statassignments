<template>
  <div class="elevator-speech-section">
    <p class="section-intro">
      {{ PHASE3_META.objective }}
      <a :href="canvasUrl" target="_blank" rel="noopener noreferrer" class="canvas-link">Open Canvas assignment ↗</a>
    </p>

    <aside v-if="hasSidebarReminders" class="sidebar-reminders">
      <h2 class="sidebar-title">From your earlier work</h2>
      <div v-if="problemDraft" class="reminder-block">
        <h3>Problem statement (Article Review)</h3>
        <p class="reminder-text">{{ problemDraft }}</p>
      </div>
      <div v-if="workingGap" class="reminder-block">
        <h3>Working gap (Study Focus)</h3>
        <p class="reminder-text">{{ workingGap }}</p>
      </div>
    </aside>

    <section
      v-for="part in PHASE3_PARTS"
      :key="part.id"
      class="worksheet-block"
    >
      <h2 class="block-title">{{ part.title }}</h2>
      <p v-if="part.instruction" class="block-intro">{{ part.instruction }}</p>
      <SchemaField
        v-for="field in part.fields"
        :key="field.id"
        :field="field"
        :input-id="`p3-${field.id}`"
        :model-value="phase3[field.id]"
        :word-count="field.wordCountHint ? wordCount(phase3[field.id]) : null"
        :word-count-hint="field.wordCountHint ? ELEVATOR_SPEECH_WORD_COUNT_HINT : null"
        @update:model-value="setField(field.id, $event)"
      />
    </section>

    <StudyPlanExportPanel section-id="phase-3" :project="project" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  PHASE3_META,
  PHASE3_PARTS,
  ELEVATOR_SPEECH_WORD_COUNT_HINT,
  elevatorSpeechWordCount
} from '../../data/capstonePhase3Worksheet.js'
import { CANVAS_RM_ASSIGNMENTS } from '../../data/researchMethodsCanvasLinks.js'
import SchemaField from './SchemaField.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true }
})

const emit = defineEmits(['update'])

const canvasUrl = CANVAS_RM_ASSIGNMENTS.phase3
const phase3 = computed(() => props.project.phase3 ?? {})

const problemDraft = computed(() =>
  props.project.articleReview?.problemStatement?.problemStatementDraft?.trim() || ''
)
const workingGap = computed(() => props.project.studyFocus?.workingGap?.trim() || '')
const hasSidebarReminders = computed(() => problemDraft.value || workingGap.value)

function wordCount (text) {
  return elevatorSpeechWordCount(text)
}

function setField (id, value) {
  emit('update', { phase3: { ...phase3.value, [id]: value } })
}
</script>

<style scoped>
.section-intro {
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.25rem;
}

.canvas-link {
  color: var(--primary);
  margin-left: 0.35rem;
}

.sidebar-reminders {
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  border-left: 3px solid var(--primary);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0 0.5rem 0.5rem 0;
}

.sidebar-title {
  font-size: 0.95rem;
  margin: 0 0 0.75rem;
  color: var(--text-secondary);
}

.reminder-block {
  margin-bottom: 0.75rem;
}

.reminder-block h3 {
  font-size: 0.85rem;
  margin: 0 0 0.25rem;
  color: var(--text-secondary);
}

.reminder-text {
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.45;
  white-space: pre-wrap;
}

.worksheet-block {
  margin-bottom: 1.5rem;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
}

.block-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.block-intro {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.5;
}
</style>
