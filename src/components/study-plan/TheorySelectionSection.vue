<template>
  <div class="theory-section">
    <div class="arc-banner">
      <p class="section-intro">{{ THEORY_SELECTION_META.objective }}</p>
      <p class="arc-flow">Annotated Bibliography → <strong>Theory Selection</strong> (week 4) → Lit Review Outline (week 5)</p>
      <p class="progress-chip">{{ progressLabel }}</p>
    </div>

    <details class="reference-panel">
      <summary class="reference-summary">Theory menu: 16 common theories with example questions (browse only)</summary>
      <p class="reference-note">
        Methods Market does not recommend a theory for your topic. Use these to see how a theory turns into a question.
        {{ THEORY_SELECTION_META.reminder }}
      </p>
      <ul class="menu-list">
        <li v-for="t in THEORY_MENU" :key="t.name" class="menu-item">
          <div class="menu-head">
            <strong>{{ t.name }}</strong>
            <button
              type="button"
              class="use-btn"
              :disabled="!nextEmptySlot"
              :title="nextEmptySlot ? `Put this in candidate ${nextEmptySlot}` : 'All three candidates are filled'"
              @click="useAsCandidate(t.name)"
            >
              Use as candidate
            </button>
          </div>
          <p class="menu-question">Example question: {{ t.question }}</p>
        </li>
      </ul>
    </details>

    <section v-for="n in [1, 2, 3]" :key="n" class="worksheet-block">
      <h2 class="block-title">Candidate {{ n }}</h2>
      <SchemaField
        v-for="field in candidateFields(n)"
        :key="field.id"
        :field="field"
        :input-id="`ts-${field.id}`"
        :model-value="theory[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
    </section>

    <section class="worksheet-block">
      <h2 class="block-title">My choice</h2>
      <SchemaField
        v-for="field in CHOICE_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`ts-${field.id}`"
        :model-value="theory[field.id] ?? ''"
        @update:model-value="setField(field.id, $event)"
      />
    </section>

    <div class="resource-links">
      <router-link :to="`/class/${classId}/study-plan/study-focus`" class="resource-link">Next: Lit Review Outline →</router-link>
      <router-link to="/topic/rm-chapter-1" class="resource-link">Ch. 1: theories and hypotheses</router-link>
    </div>

    <StudyPlanExportPanel section-id="theory-selection" :project="project" :class-id="classId" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { THEORY_MENU, THEORY_SELECTION_META, CANDIDATE_FIELDS, CHOICE_FIELDS } from '../../data/capstoneTheorySelectionWorksheet.js'
import { countTheorySelectionProgress } from '../../lib/capstoneValidation.js'
import SchemaField from './SchemaField.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true },
  classId: { type: String, default: 'intro-research' }
})

const emit = defineEmits(['update'])

const theory = computed(() => props.project.theorySelection ?? {})

const progressLabel = computed(() => {
  const p = countTheorySelectionProgress(props.project)
  if (p.ready) return 'Theory chosen and justified'
  if (p.chosen) return `Chosen · ${p.named}/3 candidates named`
  return p.named ? `${p.named}/3 candidates named` : 'Not started'
})

const candidateFields = (n) => CANDIDATE_FIELDS.filter((f) => f.id.startsWith(`c${n}`))

/** The first candidate slot with no theory name yet, or null when all three are filled. */
const nextEmptySlot = computed(() => [1, 2, 3].find((n) => !(theory.value[`c${n}Theory`] ?? '').trim()) ?? null)

function setField (id, value) {
  emit('update', { theorySelection: { ...theory.value, [id]: value } })
}

function useAsCandidate (name) {
  if (nextEmptySlot.value) setField(`c${nextEmptySlot.value}Theory`, name)
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

.reference-panel {
  margin: 1.25rem 0;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.65rem;
}

.reference-summary {
  cursor: pointer;
  font-weight: 600;
}

.reference-note {
  margin: 0.6rem 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.menu-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0.75rem;
}

.menu-item {
  padding-top: 0.6rem;
  border-top: 1px solid var(--border);
}

.menu-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.75rem;
}

.menu-question {
  margin: 0.25rem 0 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.use-btn {
  flex: none;
  font-size: 0.82rem;
  padding: 0.25rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--primary-text);
  cursor: pointer;
}

.use-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
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
  color: var(--primary-text);
  text-decoration: none;
}
</style>
