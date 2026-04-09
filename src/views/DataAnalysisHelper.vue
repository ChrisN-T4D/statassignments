<template>
  <div class="data-analysis-helper">
    <div class="container">
      <header class="page-header">
        <router-link v-if="!embedded" :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
        <h1 v-if="!embedded" class="page-title">Analyze your data</h1>
        <p class="page-intro" :class="{ 'page-intro-embedded': embedded }">
          Walk through a few short steps, then open
          <strong>jamovi</strong>, <strong>SPSS</strong>, or <strong>Excel</strong>
          instructions for the analysis you picked. Your preferred software is selected first when you reach the steps.
        </p>
      </header>

      <!-- Steps 1–2 -->
      <section
        v-if="wizardStep <= 2"
        class="card chooser-card readable-surface"
        aria-labelledby="chooser-heading"
      >
        <p class="wizard-progress" aria-live="polite">
          Step {{ wizardStep }} of 4
        </p>
        <h2 id="chooser-heading" class="card-title">{{ wizardCardTitle }}</h2>

        <div v-if="wizardStep === 1" class="wizard-panel">
          <div class="field">
            <span class="field-label" id="label-vm">Your outcome or main variable is mostly:</span>
            <div class="option-row" role="group" aria-labelledby="label-vm">
              <label
                v-for="opt in VARIABLE_MAIN_OPTIONS"
                :key="opt.value"
                class="option-pill"
              >
                <input
                  v-model="variableMain"
                  type="radio"
                  name="variableMain"
                  :value="opt.value"
                >
                <span>{{ opt.label }}</span>
              </label>
            </div>
          </div>
          <div class="wizard-actions">
            <button
              type="button"
              class="wizard-btn wizard-btn-primary"
              :disabled="!variableMain"
              @click="continueFromStep1"
            >
              Continue
            </button>
            <button type="button" class="wizard-btn wizard-btn-ghost" @click="browseAllAnalyses">
              Skip — show every analysis
            </button>
          </div>
        </div>

        <div v-else class="wizard-panel">
          <div class="field">
            <span class="field-label" id="label-goal">What do you want to do?</span>
            <select
              v-model="goal"
              class="goal-select"
              aria-labelledby="label-goal"
            >
              <option value="">Choose a goal…</option>
              <option
                v-for="opt in filteredGoalOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
          <div class="wizard-actions">
            <button type="button" class="wizard-btn wizard-btn-secondary" @click="backToStep1">
              Back
            </button>
            <button
              type="button"
              class="wizard-btn wizard-btn-primary"
              :disabled="!goal"
              @click="continueFromStep2"
            >
              Continue
            </button>
          </div>
        </div>
      </section>

      <!-- Step 3: pick analysis -->
      <section
        v-if="wizardStep === 3"
        class="card matches-card readable-surface"
        aria-labelledby="matches-heading"
      >
        <p class="wizard-progress" aria-live="polite">Step 3 of 4</p>
        <h2 id="matches-heading" class="card-title">Choose an analysis</h2>
        <p v-if="!showAllAnalyses" class="matches-lead">
          Based on your answers:
          <strong>{{ variableMainLabel }}</strong>
          ·
          <strong>{{ goalLabel }}</strong>
        </p>
        <p v-else class="matches-lead matches-lead-muted">
          Showing every recipe (you skipped the questions).
        </p>
        <p
          v-if="!showAllAnalyses && displayedAnalyses.length === 0 && variableMain && goal"
          class="empty-hint"
        >
          Nothing matched that combination. Use <strong>Back</strong> to change your goal, or
          <button type="button" class="inline-link" @click="browseAllAnalysesFromStep3">
            show all analyses
          </button>.
        </p>
        <ul class="analysis-pick-list">
          <li v-for="a in displayedAnalyses" :key="a.id">
            <button
              type="button"
              class="pick-btn readable-surface"
              :class="{ active: selectedId === a.id }"
              @click="selectAnalysis(a.id)"
            >
              <span class="pick-title">{{ a.title }}</span>
              <span class="pick-summary">{{ a.summary }}</span>
            </button>
          </li>
        </ul>
        <div class="wizard-actions wizard-actions-footer">
          <button type="button" class="wizard-btn wizard-btn-secondary" @click="backFromStep3">
            Back
          </button>
          <button type="button" class="wizard-btn wizard-btn-ghost" @click="startOver">
            Start over
          </button>
        </div>
      </section>

      <!-- Step 4: software steps -->
      <section
        v-if="wizardStep === 4 && selected"
        class="card detail-card readable-surface"
        :aria-label="`Steps for ${selected.title}`"
      >
        <p class="wizard-progress">Step 4 of 4 — Software steps</p>
        <button type="button" class="wizard-btn wizard-btn-ghost wizard-back-inline" @click="backFromStep4">
          ← Change analysis
        </button>
        <h2 class="detail-title">{{ selected.title }}</h2>
        <p class="detail-summary">{{ selected.summary }}</p>

        <div v-if="lessonLinksList.length" class="lesson-links">
          <span class="lesson-links-label">Optional — full lesson in the app (jamovi):</span>
          <router-link
            v-for="link in lessonLinksList"
            :key="link.lessonId"
            :to="`/class/${classId}/lesson/${link.lessonId}`"
            class="lesson-link"
          >
            {{ link.label }}
          </router-link>
        </div>

        <div class="software-tabs" role="tablist" aria-label="Software">
          <button
            v-for="sw in SOFTWARE_TABS"
            :key="sw.id"
            type="button"
            role="tab"
            class="tab-btn"
            :class="{ active: activeSoftware === sw.id }"
            :aria-selected="activeSoftware === sw.id"
            @click="activeSoftware = sw.id"
          >
            {{ sw.label }}
          </button>
        </div>

        <div
          v-if="currentRecipe"
          class="recipe-body"
          role="tabpanel"
        >
          <div v-if="currentRecipe.prerequisites?.length" class="block">
            <h3 class="block-title">Before you start</h3>
            <ul>
              <li v-for="(p, i) in currentRecipe.prerequisites" :key="i">{{ p }}</li>
            </ul>
          </div>
          <div v-if="currentRecipe.steps?.length" class="block">
            <h3 class="block-title">Steps</h3>
            <ol class="steps-list">
              <li v-for="(s, i) in currentRecipe.steps" :key="i">{{ s }}</li>
            </ol>
          </div>
          <div v-if="currentRecipe.reportingTips?.length" class="block tips-block">
            <h3 class="block-title">Reporting / write-up</h3>
            <ul>
              <li v-for="(t, i) in currentRecipe.reportingTips" :key="i">{{ t }}</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import {
  ANALYSES,
  VARIABLE_MAIN_OPTIONS,
  GOAL_OPTIONS,
  SOFTWARE_TABS,
  filterAnalyses
} from '../data/dataAnalysisRecipes'
import { preferredSoftware } from '../composables/usePreferredSoftware'

const props = defineProps({
  classId: { type: String, required: true },
  embedded: { type: Boolean, default: false }
})

const wizardStep = ref(1)
const variableMain = ref('')
const goal = ref('')
const showAllAnalyses = ref(false)
const selectedId = ref('')
const activeSoftware = ref('jamovi')

const wizardCardTitle = computed(() =>
  wizardStep.value === 1
    ? 'What kind of variables do you have?'
    : 'What do you want to test or summarize?'
)

const variableMainLabel = computed(() => {
  const o = VARIABLE_MAIN_OPTIONS.find((x) => x.value === variableMain.value)
  return o?.label || ''
})

const goalLabel = computed(() => {
  const o = GOAL_OPTIONS.find((x) => x.value === goal.value)
  return o?.label || ''
})

const filteredGoalOptions = computed(() => {
  const vm = variableMain.value
  if (!vm) return []
  return GOAL_OPTIONS.filter((o) => o.variableMain === 'any' || o.variableMain === vm)
})

const displayedAnalyses = computed(() => {
  if (showAllAnalyses.value) {
    return [...ANALYSES]
  }
  if (!variableMain.value || !goal.value) {
    return []
  }
  return filterAnalyses({ variableMain: variableMain.value, goal: goal.value })
})

const selected = computed(() => ANALYSES.find((a) => a.id === selectedId.value) || null)

const currentRecipe = computed(() => {
  if (!selected.value) return null
  return selected.value.bySoftware[activeSoftware.value] || null
})

const lessonLinksList = computed(() => selected.value?.relatedLessonLinks || [])

function continueFromStep1 () {
  if (!variableMain.value) return
  goal.value = ''
  showAllAnalyses.value = false
  wizardStep.value = 2
}

function backToStep1 () {
  wizardStep.value = 1
}

function continueFromStep2 () {
  if (!goal.value) return
  wizardStep.value = 3
}

function browseAllAnalyses () {
  showAllAnalyses.value = true
  variableMain.value = ''
  goal.value = ''
  wizardStep.value = 3
}

function browseAllAnalysesFromStep3 () {
  showAllAnalyses.value = true
  variableMain.value = ''
  goal.value = ''
}

function backFromStep3 () {
  selectedId.value = ''
  if (showAllAnalyses.value) {
    showAllAnalyses.value = false
    wizardStep.value = 1
  } else {
    wizardStep.value = 2
  }
}

function startOver () {
  wizardStep.value = 1
  variableMain.value = ''
  goal.value = ''
  showAllAnalyses.value = false
  selectedId.value = ''
}

function selectAnalysis (id) {
  selectedId.value = id
  wizardStep.value = 4
}

function backFromStep4 () {
  selectedId.value = ''
  wizardStep.value = 3
}

function defaultSoftwareTab () {
  const p = preferredSoftware.value
  if (p === 'excel' || p === 'spss' || p === 'jamovi') {
    activeSoftware.value = p
  } else {
    activeSoftware.value = 'jamovi'
  }
}

watch(selectedId, () => {
  defaultSoftwareTab()
})

watch(variableMain, () => {
  goal.value = ''
})
</script>

<style scoped>
/* Panels follow global theme: dark surfaces + light text in dark mode, no white cards */
.data-analysis-helper {
  padding: 1.5rem 0 3rem;
  min-height: 60vh;
  --dah-surface: var(--bg-elevated);
  --dah-surface-nested: var(--bg-card);
  --dah-ink: var(--text-primary);
  --dah-muted: var(--text-secondary);
  --dah-border: var(--border);
  --dah-accent: var(--bg-card);
}

.container {
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.readable-surface {
  background: var(--dah-surface) !important;
  color: var(--dah-ink);
  border-color: var(--dah-border) !important;
}

.wizard-progress {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin: 0 0 0.5rem;
  color: var(--dah-muted);
}

.wizard-panel {
  margin-top: 0.25rem;
}

.wizard-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--dah-border);
}

.wizard-actions-footer {
  margin-top: 1.25rem;
}

.wizard-btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  border: 1px solid transparent;
}

.wizard-btn-primary {
  background: var(--primary);
  color: var(--bg-main) !important;
  border-color: var(--primary);
}

.wizard-btn-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.wizard-btn-secondary {
  background: var(--dah-surface-nested);
  color: var(--dah-ink) !important;
  border-color: var(--dah-border);
}

.wizard-btn-ghost {
  background: transparent;
  color: var(--primary-light) !important;
  border-color: transparent;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.wizard-back-inline {
  margin-bottom: 0.75rem;
}

.matches-card {
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  border-width: 1px;
  border-style: solid;
}

.matches-lead {
  font-size: 0.9rem;
  line-height: 1.45;
  margin: 0 0 1rem;
  color: var(--dah-ink);
}

.matches-lead-muted {
  color: var(--dah-muted);
}

.inline-link {
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  color: var(--primary-light);
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.readable-surface .card-title,
.readable-surface .field-label,
.readable-surface .option-pill,
.readable-surface .option-pill span,
.readable-surface .detail-title,
.readable-surface .block-title,
.readable-surface .block li,
.readable-surface .steps-list li {
  color: var(--dah-ink) !important;
}

.readable-surface .empty-hint {
  color: var(--dah-muted) !important;
}

.readable-surface .goal-select {
  background-color: var(--bg-input);
  color: var(--dah-ink);
  border-color: var(--dah-border);
}

.readable-surface .goal-select option {
  background-color: var(--bg-input);
  color: var(--dah-ink);
}

/* Nested list rows: slightly different layer from outer panel */
.readable-surface .pick-btn.readable-surface {
  background: var(--dah-surface-nested) !important;
}

.readable-surface .pick-title {
  color: var(--dah-ink) !important;
}

.readable-surface .pick-summary {
  color: var(--dah-muted) !important;
}

.readable-surface .detail-summary {
  color: var(--dah-muted) !important;
}

.readable-surface .lesson-links {
  background: var(--dah-accent) !important;
  border: 1px solid var(--dah-border);
}

.readable-surface .lesson-links-label {
  color: var(--dah-muted) !important;
}

.readable-surface .lesson-link {
  color: var(--primary-light) !important;
}

.readable-surface .software-tabs {
  border-bottom-color: var(--dah-border) !important;
}

.readable-surface .tab-btn {
  color: var(--dah-muted) !important;
}

.readable-surface .tab-btn:hover {
  color: var(--dah-ink) !important;
  background: var(--dah-surface-nested) !important;
}

.readable-surface .tab-btn.active {
  color: var(--primary-light) !important;
  background: color-mix(in srgb, var(--primary) 14%, transparent) !important;
}

.readable-surface .tips-block {
  border-top-color: var(--border-light) !important;
}

.back-link {
  display: inline-block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.back-link:hover {
  color: var(--primary);
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.page-intro {
  color: var(--text-secondary);
  margin: 0 0 1.5rem;
  line-height: 1.5;
}

.page-intro-embedded {
  margin-top: 0;
  margin-bottom: 1rem;
}

.card {
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  border-width: 1px;
  border-style: solid;
}

.card-title {
  font-size: 1.15rem;
  margin: 0 0 1rem;
}

.field {
  margin-bottom: 1rem;
}

.field-label {
  display: block;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.option-row {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .option-row {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

.option-pill {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  line-height: 1.4;
}

.option-pill input {
  margin-top: 0.2rem;
}

.goal-select {
  width: 100%;
  max-width: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  font-size: 0.95rem;
}

.analysis-pick-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pick-btn {
  width: 100%;
  text-align: left;
  padding: 0.85rem 1rem;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  cursor: pointer;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.pick-btn:hover {
  border-color: var(--primary);
}

.pick-btn.active {
  border-color: var(--primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 30%, transparent);
}

.pick-title {
  display: block;
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.pick-summary {
  display: block;
  font-size: 0.85rem;
  line-height: 1.4;
}

.detail-title {
  font-size: 1.35rem;
  margin: 0 0 0.5rem;
}

.detail-summary {
  line-height: 1.5;
  margin: 0 0 1rem;
}

.lesson-links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
  padding: 0.75rem;
  border-radius: 8px;
}

.lesson-links-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.lesson-link {
  font-size: 0.9rem;
  text-decoration: none;
}

.lesson-link:hover {
  text-decoration: underline;
}

.software-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--dah-border);
  padding-bottom: 0.5rem;
}

.tab-btn {
  padding: 0.45rem 0.9rem;
  border: none;
  border-radius: 8px 8px 0 0;
  background: transparent;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
}

.block {
  margin-bottom: 1.25rem;
}

.block-title {
  font-size: 1rem;
  margin: 0 0 0.5rem;
}

.block ul,
.steps-list {
  margin: 0;
  padding-left: 1.25rem;
  line-height: 1.55;
  font-size: 0.95rem;
}

.steps-list {
  list-style-type: decimal;
}

.tips-block {
  padding-top: 0.5rem;
  border-top: 1px dashed var(--border-light);
}
</style>

<!-- Embedded in ClassHome: ensure themed panel text wins over any inherited shell color -->
<style>
.module-content .data-analysis-helper .readable-surface {
  color: var(--text-primary);
}
</style>
