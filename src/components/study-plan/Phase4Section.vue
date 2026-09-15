<template>
  <div ref="sectionRoot" class="phase4-section">
    <Phase4Walkthrough :root-el="sectionRoot" />

    <div class="arc-banner" data-tour="tour-p4-intro">
      <p class="section-intro">
        {{ PHASE4_CANVAS.intro }}
        <a :href="canvasUrl" target="_blank" rel="noopener noreferrer" class="canvas-link">Open Canvas assignment ↗</a>
        ·
        <a :href="helpfulTableUrl" target="_blank" rel="noopener noreferrer" class="canvas-link">Helpful Table ↗</a>
      </p>
      <p class="arc-flow">Phase 3 elevator speech + <strong>Phase 4 operationalization</strong> (week 11, submit together)</p>
      <p class="progress-chip">{{ progressLabel }}</p>
    </div>

    <aside v-if="hasReminders" class="sidebar-reminders" data-tour="tour-p4-reminders">
      <h2 class="sidebar-title">From Phase 3 and your outline</h2>
      <p class="reminders-note">Use your elevator speech and outline as starting points for IV/DV and pathway choices.</p>
      <div v-if="p3WhatWeKnow" class="reminder-block">
        <h3>What we know (Phase 3)</h3>
        <p class="reminder-text">{{ p3WhatWeKnow }}</p>
      </div>
      <div v-if="p3Gap" class="reminder-block">
        <h3>The gap (Phase 3)</h3>
        <p class="reminder-text">{{ p3Gap }}</p>
      </div>
      <div v-if="workingRq" class="reminder-block">
        <h3>Working research question</h3>
        <p class="reminder-text">{{ workingRq }}</p>
      </div>
      <div class="reminder-links">
        <router-link :to="phase3Link" class="reminder-link">Open Phase 3 →</router-link>
        <router-link :to="outlineLink" class="reminder-link">Open Lit Review Outline →</router-link>
      </div>
    </aside>

    <aside v-else class="sidebar-reminders sidebar-empty" data-tour="tour-p4-reminders">
      <h2 class="sidebar-title">From Phase 3 and your outline</h2>
      <p class="reminders-note">Complete Phase 3 and your Lit Review Outline first — summaries will appear here.</p>
      <router-link :to="phase3Link" class="reminder-link">Go to Phase 3 →</router-link>
    </aside>

    <section
      v-for="part in PHASE4_PARTS"
      :key="part.id"
      class="worksheet-block"
      :data-tour="part.id === 'part-a-context' ? 'tour-p4-part-a' : 'tour-p4-part-b'"
    >
      <h2 class="block-title">{{ part.title }}</h2>
      <SchemaField
        v-for="field in part.fields"
        :key="field.id"
        :field="field"
        :input-id="`p4-${field.id}`"
        :model-value="phase4[field.id]"
        @update:model-value="setTopLevel(field.id, $event)"
      />
      <div v-if="part.id === 'part-a-context'" class="prefill-row">
        <button v-if="canPrefillTopic" type="button" class="prefill-btn" @click="prefillTopic">
          Copy project topic → Broad topic area
        </button>
        <button v-if="canPrefillRq" type="button" class="prefill-btn" @click="prefillResearchQuestion">
          Copy working RQ from Lit Review Outline
        </button>
      </div>
    </section>

    <section class="worksheet-block" data-tour="tour-p4-part-c">
      <h2 class="block-title">Part C: Exploration — Four Operational Paths</h2>
      <p class="block-intro">
        Explore each pathway. Mark a path as not viable if it does not fit your question.
        Each path links to a Canvas guide and chapter.
      </p>

      <article
        v-for="pathway in PHASE4_PATHWAYS"
        :key="pathway.id"
        class="pathway-card"
      >
        <div class="pathway-header">
          <h3 class="pathway-title">{{ pathway.label }}</h3>
          <a :href="pathway.canvasGuideUrl" target="_blank" rel="noopener noreferrer" class="guide-link">
            Canvas path guide ↗
          </a>
        </div>
        <label class="not-viable-row">
          <input
            type="checkbox"
            :checked="pathwayResponses[pathway.id]?.notViable"
            @change="setPathwayNotViable(pathway.id, $event.target.checked)"
          />
          <span>Not viable for my question</span>
        </label>
        <template v-if="!pathwayResponses[pathway.id]?.notViable">
          <SchemaField
            v-for="field in pathway.fields"
            :key="field.id"
            :field="field"
            :input-id="`p4-path-${pathway.id}-${field.id}`"
            :model-value="pathwayResponses[pathway.id]?.[field.id] ?? ''"
            @update:model-value="setPathwayField(pathway.id, field.id, $event)"
          />
        </template>
      </article>
    </section>

    <section class="worksheet-block" data-tour="tour-p4-part-d">
      <h2 class="block-title">Part D: Comparative Analysis</h2>
      <p class="block-intro">
        Compare pathways on feasibility, access, measurement, and ethics. Use the
        <a :href="helpfulTableUrl" target="_blank" rel="noopener noreferrer">Helpful Table</a>
        in Canvas as a reference — you decide what fits.
      </p>
      <div class="comparison-table-wrap">
        <table class="comparison-table">
          <thead>
            <tr>
              <th>Criterion</th>
              <th v-for="pathway in PHASE4_PATHWAYS" :key="pathway.id">{{ pathwayShortLabel(pathway) }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="criterion in PHASE4_COMPARISON_CRITERIA" :key="criterion.id">
              <th scope="row">{{ criterion.label }}</th>
              <td v-for="pathway in PHASE4_PATHWAYS" :key="pathway.id">
                <textarea
                  :value="comparisonTable[criterion.id]?.[pathway.id] ?? ''"
                  rows="2"
                  class="cell-input"
                  @input="setComparisonCell(criterion.id, pathway.id, $event.target.value)"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="worksheet-block" data-tour="tour-p4-part-e">
      <h2 class="block-title">Part E: Final Decision</h2>
      <p class="block-intro">Choose one data collection strategy. This unlocks the data analysis helper for your path.</p>
      <div class="pathway-choices">
        <label
          v-for="pathway in PHASE4_PATHWAYS"
          :key="pathway.id"
          class="pathway-choice"
        >
          <input
            type="radio"
            name="chosen-pathway"
            :value="pathway.id"
            :checked="phase4.chosenPathwayId === pathway.id"
            @change="setChosenPathway(pathway.id)"
          />
          <span>{{ pathway.label }}</span>
        </label>
      </div>

      <div v-if="chosenPathway" class="embedded-helper">
        <h3 class="helper-title">Data analysis helper — {{ chosenPathway.label }}</h3>
        <DataAnalysisHelper
          :class-id="classId"
          embedded
          :method-path-id="chosenPathway.canvasMethodPathId"
        />
      </div>
    </section>

    <div data-tour="tour-p4-export">
      <StudyPlanExportPanel section-id="phase-4" :project="project" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  PHASE4_CANVAS,
  PHASE4_PARTS,
  PHASE4_PATHWAYS,
  PHASE4_COMPARISON_CRITERIA
} from '../../data/capstonePhase4Worksheet.js'
import { countPhase4Progress } from '../../lib/capstoneValidation.js'
import { CANVAS_RM_ASSIGNMENTS, CANVAS_RM_WIKI_PAGES } from '../../data/researchMethodsCanvasLinks.js'
import { getProjectValue } from '../../data/capstoneWorksheetSchemas.js'
import DataAnalysisHelper from '../../views/DataAnalysisHelper.vue'
import SchemaField from './SchemaField.vue'
import Phase4Walkthrough from './Phase4Walkthrough.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true },
  classId: { type: String, required: true }
})

const emit = defineEmits(['update'])

const sectionRoot = ref(null)
const canvasUrl = CANVAS_RM_ASSIGNMENTS.phase4
const helpfulTableUrl = CANVAS_RM_WIKI_PAGES.helpfulTable

const phase4 = computed(() => props.project.phase4 ?? {})
const pathwayResponses = computed(() => phase4.value.pathwayResponses ?? {})
const comparisonTable = computed(() => phase4.value.comparisonTable ?? {})

const progressLabel = computed(() => {
  const p = countPhase4Progress(props.project)
  if (p.chosen) return 'Pathway chosen · ready to export'
  if (p.recapFilled >= 2 || p.pathsExplored) {
    return `Parts A–B: ${p.recapFilled}/${p.recapTotal} · ${p.pathsExplored}/${p.pathsTotal} paths explored`
  }
  return 'Not started'
})

const p3WhatWeKnow = computed(() => props.project.phase3?.whatWeKnow?.trim() || '')
const p3Gap = computed(() => props.project.phase3?.theGap?.trim() || '')
const workingRq = computed(() =>
  props.project.litReviewOutline?.gapAndTransition?.workingResearchQuestion?.trim() || ''
)
const hasReminders = computed(() => Boolean(p3WhatWeKnow.value || p3Gap.value || workingRq.value))

const phase3Link = computed(() => `/class/${props.classId}/study-plan/phase-3`)
const outlineLink = computed(() => `/class/${props.classId}/study-plan/study-focus`)

const chosenPathway = computed(() =>
  PHASE4_PATHWAYS.find((p) => p.id === phase4.value.chosenPathwayId) ?? null
)

const canPrefillRq = computed(() => {
  const working = workingRq.value
  const current = phase4.value.proposedResearchQuestion?.trim()
  return working && !current
})

const canPrefillTopic = computed(() => {
  const topic = props.project.topic?.trim()
  const current = phase4.value.broadTopicArea?.trim()
  return topic && !current
})

function emitPhase4 (patch) {
  emit('update', { phase4: { ...phase4.value, ...patch } })
}

function setTopLevel (id, value) {
  emitPhase4({ [id]: value })
}

function setPathwayField (pathwayId, fieldId, value) {
  emitPhase4({
    pathwayResponses: {
      ...pathwayResponses.value,
      [pathwayId]: { ...pathwayResponses.value[pathwayId], [fieldId]: value }
    }
  })
}

function setPathwayNotViable (pathwayId, notViable) {
  emitPhase4({
    pathwayResponses: {
      ...pathwayResponses.value,
      [pathwayId]: { ...pathwayResponses.value[pathwayId], notViable }
    }
  })
}

function setComparisonCell (criterionId, pathwayId, value) {
  emitPhase4({
    comparisonTable: {
      ...comparisonTable.value,
      [criterionId]: {
        ...comparisonTable.value[criterionId],
        [pathwayId]: value
      }
    }
  })
}

function setChosenPathway (pathwayId) {
  emitPhase4({ chosenPathwayId: pathwayId })
}

function prefillResearchQuestion () {
  const value = getProjectValue(props.project, 'litReviewOutline.gapAndTransition.workingResearchQuestion')
  if (value) emitPhase4({ proposedResearchQuestion: value })
}

function prefillTopic () {
  const topic = props.project.topic?.trim()
  if (topic) emitPhase4({ broadTopicArea: topic })
}

function pathwayShortLabel (pathway) {
  if (pathway.id.includes('survey')) return 'Survey'
  if (pathway.id.includes('experimental')) return 'Experimental'
  if (pathway.id.includes('observation')) return 'Observation'
  return 'Archival'
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

.canvas-link {
  color: var(--primary);
  text-decoration: none;
}

.sidebar-reminders {
  margin-bottom: 1.5rem;
  padding: 1.15rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(59, 130, 246, 0.06);
}

.sidebar-empty {
  background: rgba(255, 255, 255, 0.02);
}

.sidebar-title {
  font-size: 1.05rem;
  margin: 0 0 0.35rem;
}

.reminders-note {
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin: 0 0 0.85rem;
  line-height: 1.45;
}

.reminder-block {
  margin-bottom: 0.85rem;
}

.reminder-block h3 {
  font-size: 0.85rem;
  margin: 0 0 0.25rem;
  color: var(--primary);
}

.reminder-text {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.45;
  margin: 0;
  white-space: pre-wrap;
}

.reminder-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.reminder-link {
  font-size: 0.88rem;
  color: var(--primary);
  text-decoration: none;
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

.block-intro a {
  color: var(--primary);
}

.prefill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.prefill-btn {
  font-size: 0.85rem;
  padding: 0.4rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.4rem;
  background: transparent;
  color: var(--primary);
  cursor: pointer;
}

.pathway-card {
  margin-bottom: 1.25rem;
  padding: 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.02);
}

.pathway-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
}

.pathway-title {
  font-size: 1rem;
  margin: 0;
}

.guide-link {
  font-size: 0.85rem;
  color: var(--primary);
  text-decoration: none;
}

.not-viable-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  cursor: pointer;
}

.comparison-table-wrap {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
}

.comparison-table th,
.comparison-table td {
  border: 1px solid var(--border);
  padding: 0.5rem;
  vertical-align: top;
}

.comparison-table th {
  background: rgba(255, 255, 255, 0.04);
  text-align: left;
  font-weight: 600;
}

.cell-input {
  width: 100%;
  min-width: 8rem;
  padding: 0.4rem;
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  background: var(--bg-input, var(--bg-card));
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.85rem;
  resize: vertical;
}

.pathway-choices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.pathway-choice {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  cursor: pointer;
  font-size: 0.95rem;
}

.embedded-helper {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

.helper-title {
  font-size: 0.95rem;
  margin: 0 0 1rem;
  color: var(--text-secondary);
}
</style>
