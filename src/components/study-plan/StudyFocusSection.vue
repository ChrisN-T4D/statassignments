<template>
  <div class="study-focus-section">
    <p class="section-intro">
      Use this section while drafting your literature review (weeks 5–10). It is not a Canvas submission.
      Your notes feed into the Phase 3 elevator speech and Phase 4 operationalization.
    </p>

    <section class="worksheet-block">
      <SchemaField
        v-for="field in STUDY_FOCUS_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`sf-${field.id}`"
        :model-value="studyFocus[field.id]"
        @update:model-value="setField(field.id, $event)"
      />
    </section>

    <div class="resource-links">
      <router-link to="/topic/rm-chapter-2" class="resource-link">Ch. 2 — gaps and synthesis</router-link>
      <router-link to="/topic/rm-chapter-11" class="resource-link">Ch. 11 — APA and clear prose</router-link>
    </div>

    <StudyPlanExportPanel section-id="study-focus" :project="project" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { STUDY_FOCUS_FIELDS } from '../../data/capstoneWorksheetSchemas.js'
import SchemaField from './SchemaField.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true }
})

const emit = defineEmits(['update'])

const studyFocus = computed(() => props.project.studyFocus ?? {})

function setField (id, value) {
  emit('update', { studyFocus: { ...studyFocus.value, [id]: value } })
}
</script>

<style scoped>
.section-intro {
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 1.5rem;
}

.worksheet-block {
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
  margin-bottom: 1.5rem;
}

.resource-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.resource-link {
  font-size: 0.9rem;
  color: var(--primary);
  text-decoration: none;
}

.resource-link:hover {
  text-decoration: underline;
}
</style>
