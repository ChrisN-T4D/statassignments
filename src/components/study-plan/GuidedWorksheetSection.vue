<template>
  <div v-if="ws" class="guided-section">
    <div class="arc-banner">
      <p class="section-intro">{{ ws.objective }}</p>
      <p v-if="ws.flow" class="arc-flow" v-html="ws.flow"></p>
      <p class="progress-chip">{{ progressLabel }}</p>
    </div>

    <div v-if="visiblePrefills.length" class="prefill-row">
      <button v-for="pf in visiblePrefills" :key="pf.id" type="button" class="prefill-btn" @click="applyPrefill(pf)">{{ pf.label }}</button>
    </div>

    <details v-for="ref in ws.references" :key="ref.id" class="reference-panel" :open="ref.open">
      <summary class="reference-summary">{{ ref.title }}</summary>
      <div v-for="(part, i) in ref.parts" :key="i" class="ref-part">
        <h3 v-if="part.heading" class="ref-heading">{{ part.heading }}</h3>
        <p v-if="part.text" class="ref-text">{{ part.text }}</p>
        <ul v-if="part.items" class="ref-list">
          <li v-for="(item, j) in part.items" :key="j">{{ item }}</li>
        </ul>
        <div v-if="part.table" class="table-wrap">
          <table class="ref-table">
            <thead><tr><th v-for="h in part.table.head" :key="h">{{ h }}</th></tr></thead>
            <tbody>
              <tr v-for="(row, r) in part.table.rows" :key="r"><td v-for="(cell, c) in row" :key="c">{{ cell }}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <p class="ref-note">Browse only. Methods Market does not write your answers.</p>
    </details>

    <section v-for="block in ws.blocks" :key="block.id" class="worksheet-block">
      <h2 class="block-title">{{ block.title }}</h2>
      <p v-if="block.intro" class="block-intro">{{ block.intro }}</p>
      <details v-if="block.frames?.length" class="frames">
        <summary class="frames-summary">Sentence frames to get started</summary>
        <ul class="ref-list">
          <li v-for="(fr, i) in block.frames" :key="i">{{ fr }}</li>
        </ul>
      </details>
      <SchemaField
        v-for="field in block.fields"
        :key="field.id"
        :field="field"
        :input-id="`gw-${ws.key}-${field.id}`"
        :model-value="answers[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
    </section>

    <div class="resource-links">
      <router-link v-for="l in ws.links" :key="l.to" :to="l.to" class="resource-link">{{ l.label }}</router-link>
      <router-link v-for="l in ws.classLinks || []" :key="l.path" :to="`/class/${classId}${l.path}`" class="resource-link">{{ l.label }}</router-link>
    </div>

    <StudyPlanExportPanel :section-id="sectionId" :project="project" :class-id="classId" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { guidedWorksheet, guidedProgressLabel } from '../../data/guidedWorksheets.js'
import SchemaField from './SchemaField.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  sectionId: { type: String, required: true },
  project: { type: Object, required: true },
  classId: { type: String, default: 'research-methods' }
})

const emit = defineEmits(['update'])

const ws = computed(() => guidedWorksheet(props.sectionId, props.classId))
const answers = computed(() => (ws.value ? props.project[ws.value.key] ?? {} : {}))
const progressLabel = computed(() => guidedProgressLabel(props.project, props.sectionId))

/** A copy-from button shows only when there is something to copy and something still empty to fill. */
const visiblePrefills = computed(() =>
  (ws.value?.prefills ?? []).filter((pf) => pf.when(props.project) && Object.keys(pf.apply(props.project)).length > 0)
)

function setField (id, value) {
  emit('update', { [ws.value.key]: { ...answers.value, [id]: value } })
}

function applyPrefill (pf) {
  emit('update', { [ws.value.key]: { ...answers.value, ...pf.apply(props.project) } })
}
</script>

<style scoped>
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

.prefill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0 0;
}

.prefill-btn {
  font-size: 0.88rem;
  padding: 0.35rem 0.8rem;
  border-radius: 0.4rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--primary-text);
  cursor: pointer;
}

.reference-panel {
  margin: 1rem 0;
  padding: 0.7rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.65rem;
}

.reference-summary {
  cursor: pointer;
  font-weight: 600;
}

.ref-part {
  margin: 0.7rem 0 0;
}

.ref-heading {
  margin: 0 0 0.2rem;
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.ref-text {
  margin: 0;
  line-height: 1.55;
}

.ref-list {
  margin: 0.2rem 0 0;
  padding-left: 1.2rem;
  line-height: 1.5;
}

.ref-note {
  margin: 0.8rem 0 0;
  font-size: 0.82rem;
  color: var(--text-muted);
}

.table-wrap {
  overflow-x: auto;
}

.ref-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}

.ref-table th,
.ref-table td {
  text-align: left;
  vertical-align: top;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--border);
}

.worksheet-block {
  margin: 2rem 0 1.5rem;
}

.block-title {
  margin: 0 0 0.75rem;
  font-size: 1.2rem;
}

.block-intro {
  margin: 0 0 0.75rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.frames {
  margin: 0 0 1rem;
  padding: 0.5rem 0.9rem;
  border: 1px dashed var(--border);
  border-radius: 0.55rem;
}

.frames-summary {
  cursor: pointer;
  font-size: 0.92rem;
  font-weight: 600;
}

.resource-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1rem;
  margin: 1.5rem 0;
}

.resource-link {
  color: var(--primary-text);
  text-decoration: none;
}
</style>
