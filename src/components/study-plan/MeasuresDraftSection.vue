<template>
  <div class="measures-draft-section">
    <div class="arc-banner">
      <p class="section-intro">{{ MEASURES_META.objective }}</p>
      <p v-if="isIntro" class="arc-flow">Method Choice → <strong>Measures</strong> → Methods Section (week 11)</p>
      <p v-else class="arc-flow">Method Choice → <strong>Measures Draft</strong> → IRB first draft</p>
      <p class="progress-chip">{{ progressLabel }}</p>
    </div>

    <aside v-if="pathway" class="sidebar-reminders">
      <h2 class="sidebar-title">From your Method Choice worksheet</h2>
      <p class="reminders-note">Your chosen pathway and operational definitions. Build your measures to match them.</p>
      <div class="reminder-block">
        <h3>Pathway</h3>
        <p class="reminder-text">{{ pathway.label }}</p>
      </div>
      <div v-if="ivOperational" class="reminder-block">
        <h3>IV, operational definition</h3>
        <p class="reminder-text">{{ ivOperational }}</p>
      </div>
      <div v-if="dvOperational" class="reminder-block">
        <h3>DV, operational definition</h3>
        <p class="reminder-text">{{ dvOperational }}</p>
      </div>
      <router-link :to="methodChoiceLink" class="reminder-link">Open Method Choice →</router-link>
    </aside>

    <aside v-else class="sidebar-reminders sidebar-empty">
      <h2 class="sidebar-title">Choose your pathway first</h2>
      <p class="reminders-note">
        This draft builds on the pathway and the IV and DV definitions you choose in Method Choice. Finish that worksheet,
        then come back.
      </p>
      <router-link :to="methodChoiceLink" class="reminder-link">Go to Method Choice →</router-link>
    </aside>

    <aside class="survey-callout">
      <h2 class="callout-title">Building a survey? The IRB reads it, and everything around it.</h2>
      <ul class="callout-list">
        <li>Build it in a tool you can share by link (Google Forms, Qualtrics) and keep a hard copy: the IRB needs both, and they must match word for word.</li>
        <li>The full informed consent comes first. Participants must agree before they can see a question.</li>
        <li>Cite every published instrument, and say how and why you changed any item.</li>
        <li>You will also need scripts for any flier or social media post, and a facility consent form if you collect data outside NWOSU.</li>
      </ul>
      <router-link :to="`/class/${classId}/study-plan/recruitment-consent`" class="callout-link">Open Recruitment and Consent →</router-link>
    </aside>

    <section v-if="pathway" class="worksheet-block">
      <h2 class="block-title">{{ pathway.heading }}</h2>
      <SchemaField
        v-for="field in pathway.fields"
        :key="field.id"
        :field="field"
        :input-id="`md-${field.id}`"
        :model-value="draft[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
    </section>

    <div v-if="pathway" class="resource-links">
      <router-link v-for="chapter in pathway.chapters" :key="chapter.id" :to="`/topic/${chapter.id}`" class="resource-link">
        {{ chapter.label }}
      </router-link>
    </div>

    <StudyPlanExportPanel section-id="measures-draft" :project="project" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { studyPlanClass } from '../../data/studyPlanClasses.js'
import { MEASURES_META, MEASURES_PATHWAYS } from '../../data/capstoneMeasuresDraftWorksheet.js'
import { countMeasuresDraftProgress } from '../../lib/capstoneValidation.js'
import SchemaField from './SchemaField.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true },
  classId: { type: String, default: 'research-methods' }
})

const emit = defineEmits(['update'])

const isIntro = computed(() => studyPlanClass(props.classId)?.flow === 'intro')
const phase4 = computed(() => props.project.phase4 ?? {})
const draft = computed(() => props.project.measuresDraft ?? {})
const pathway = computed(() => MEASURES_PATHWAYS[phase4.value.chosenPathwayId] ?? null)
const ivOperational = computed(() => (phase4.value.ivOperational ?? '').trim())
const dvOperational = computed(() => (phase4.value.dvOperational ?? '').trim())
const methodChoiceLink = computed(() => `/class/${props.classId}/study-plan/phase-4`)

const progressLabel = computed(() => {
  const p = countMeasuresDraftProgress(props.project)
  if (!p.chosen) return 'Choose a pathway in Method Choice first'
  if (p.ready) return `${p.filled}/${p.total} parts, ready to export`
  return p.filled ? `${p.filled}/${p.total} parts` : 'Not started'
})

function setField (id, value) {
  emit('update', { measuresDraft: { ...draft.value, [id]: value } })
}
</script>

<style scoped>
.survey-callout {
  margin: 1.5rem 0;
  padding: 1.1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(245, 158, 11, 0.07);
}

.callout-title {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
}

.callout-list {
  margin: 0 0 0.6rem;
  padding-left: 1.2rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.callout-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.section-intro {
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0 0 0.75rem;
}

.arc-flow {
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.45rem;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
}

.progress-chip {
  display: inline-block;
  font-size: 0.85rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  margin: 0;
}

.sidebar-reminders {
  margin: 1.5rem 0;
  padding: 1.15rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(59, 130, 246, 0.06);
}

.sidebar-empty {
  background: rgba(245, 158, 11, 0.08);
}

.sidebar-title {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
}

.reminders-note {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.reminder-block {
  margin-bottom: 0.75rem;
}

.reminder-block h3 {
  margin: 0 0 0.15rem;
  font-size: 0.8rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.reminder-text {
  margin: 0;
  white-space: pre-wrap;
}

.reminder-link {
  color: var(--primary);
  font-weight: 600;
  text-decoration: none;
}

.worksheet-block {
  margin-bottom: 1.5rem;
}

.block-title {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
}

.resource-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin-bottom: 1.5rem;
}

.resource-link {
  color: var(--primary);
  text-decoration: none;
}
</style>
