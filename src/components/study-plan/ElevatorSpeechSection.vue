<template>
  <div ref="sectionRoot" class="elevator-speech-section">
    <Phase3Walkthrough :root-el="sectionRoot" />

    <div class="arc-banner" data-tour="tour-p3-intro">
      <p class="section-intro">
        {{ PHASE3_META.objective }}
        <a :href="canvasUrl" target="_blank" rel="noopener noreferrer" class="canvas-link">Open Canvas assignment ↗</a>
      </p>
      <p class="arc-flow">Lit Review Outline → <strong>Phase 3 elevator speech</strong> + Phase 4 (week 11, submit together)</p>
      <p class="progress-chip">{{ progressLabel }}</p>
    </div>

    <aside v-if="hasReminders" class="sidebar-reminders" data-tour="tour-p3-reminders">
      <h2 class="sidebar-title">From your Lit Review Outline</h2>
      <p class="reminders-note">Starting points — refine into spoken prose for Canvas.</p>
      <div v-if="frameworkName" class="reminder-block">
        <h3>Organizing framework</h3>
        <p class="reminder-text">{{ frameworkName }}</p>
      </div>
      <div v-if="themeSummary" class="reminder-block">
        <h3>Theme synthesis notes</h3>
        <p class="reminder-text">{{ themeSummary }}</p>
      </div>
      <div v-if="outlineGap" class="reminder-block">
        <h3>Working gap</h3>
        <p class="reminder-text">{{ outlineGap }}</p>
      </div>
      <div v-if="outlineTransition" class="reminder-block">
        <h3>Transition to your study</h3>
        <p class="reminder-text">{{ outlineTransition }}</p>
      </div>
      <router-link :to="outlineLink" class="reminder-link">Open Lit Review Outline →</router-link>
    </aside>

    <aside v-else class="sidebar-reminders sidebar-empty" data-tour="tour-p3-reminders">
      <h2 class="sidebar-title">From your Lit Review Outline</h2>
      <p class="reminders-note">Fill your Lit Review Outline first — framework, themes, and gap will appear here.</p>
      <router-link :to="outlineLink" class="reminder-link">Go to Lit Review Outline →</router-link>
    </aside>

    <section
      v-for="part in PHASE3_PARTS"
      :key="part.id"
      class="worksheet-block"
    >
      <h2 class="block-title">{{ part.title }}</h2>
      <p v-if="part.instruction" class="block-intro">{{ part.instruction }}</p>

      <div class="prefill-row" v-if="part.fields.some((f) => prefillForField(f.id))">
        <button
          v-for="action in prefillActionsForPart(part)"
          :key="action.id"
          type="button"
          class="prefill-btn"
          @click="action.run"
        >
          {{ action.label }}
        </button>
      </div>

      <div
        v-for="field in part.fields"
        :key="field.id"
        :data-tour="tourTargetForField(field.id)"
      >
        <SchemaField
          :field="field"
          :input-id="`p3-${field.id}`"
          :model-value="phase3[field.id]"
          :word-count="field.wordCountHint ? wordCount(phase3[field.id]) : null"
          :word-count-hint="field.wordCountHint ? ELEVATOR_SPEECH_WORD_COUNT_HINT : null"
          @update:model-value="setField(field.id, $event)"
        />
      </div>
    </section>

    <div class="resource-links">
      <router-link to="/topic/rm-chapter-2" class="resource-link">Ch. 2 — synthesis and gaps</router-link>
      <router-link to="/topic/rm-chapter-11" class="resource-link">Ch. 11 — clear prose</router-link>
    </div>

    <div data-tour="tour-p3-export">
      <StudyPlanExportPanel section-id="phase-3" :project="project" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  PHASE3_META,
  PHASE3_PARTS,
  ELEVATOR_SPEECH_WORD_COUNT_HINT,
  elevatorSpeechWordCount
} from '../../data/capstonePhase3Worksheet.js'
import { countPhase3Progress } from '../../lib/capstoneValidation.js'
import { CANVAS_RM_ASSIGNMENTS } from '../../data/researchMethodsCanvasLinks.js'
import SchemaField from './SchemaField.vue'
import Phase3Walkthrough from './Phase3Walkthrough.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true },
  classId: { type: String, default: 'research-methods' }
})

const emit = defineEmits(['update'])

const sectionRoot = ref(null)
const canvasUrl = CANVAS_RM_ASSIGNMENTS.phase3
const phase3 = computed(() => props.project.phase3 ?? {})
const outline = computed(() => props.project.litReviewOutline ?? {})

const progressLabel = computed(() => {
  const { filled, total, words, ready } = countPhase3Progress(props.project)
  if (ready) return `${filled}/${total} parts · ${words} words — ready to export`
  if (filled) return `${filled}/${total} parts · ${words} words in speech`
  return 'Elevator speech not started'
})

const frameworkName = computed(() => outline.value.organizingFramework?.theoryName?.trim() || '')
const outlineGap = computed(() => outline.value.gapAndTransition?.gapStatement?.trim() || '')
const outlineTransition = computed(() => outline.value.gapAndTransition?.transitionToStudy?.trim() || '')
const themeSummary = computed(() => {
  const buckets = outline.value.themeBuckets ?? []
  const notes = buckets.map((b) => (b.synthesisNotes ?? '').trim()).filter(Boolean)
  if (!notes.length) return ''
  const combined = notes.join('\n\n')
  return combined.length > 400 ? combined.slice(0, 397) + '…' : combined
})
const hasReminders = computed(() =>
  Boolean(frameworkName.value || themeSummary.value || outlineGap.value || outlineTransition.value)
)
const outlineLink = computed(() => `/class/${props.classId}/study-plan/study-focus`)

function tourTargetForField (fieldId) {
  const map = {
    whatWeKnow: 'tour-p3-what-we-know',
    theGap: 'tour-p3-gap',
    myStudyPitch: 'tour-p3-pitch',
    elevatorSpeech: 'tour-p3-speech'
  }
  return map[fieldId] ?? null
}

function prefillForField (fieldId) {
  if (fieldId === 'whatWeKnow') return themeSummary.value && !(phase3.value.whatWeKnow ?? '').trim()
  if (fieldId === 'theGap') return outlineGap.value && !(phase3.value.theGap ?? '').trim()
  if (fieldId === 'myStudyPitch') return outlineTransition.value && !(phase3.value.myStudyPitch ?? '').trim()
  return false
}

function prefillActionsForPart (part) {
  const actions = []
  if (part.fields.some((f) => f.id === 'whatWeKnow') && prefillForField('whatWeKnow')) {
    actions.push({ id: 'themes', label: 'Copy theme notes → What we know', run: () => setField('whatWeKnow', themeSummary.value) })
  }
  if (part.fields.some((f) => f.id === 'theGap') && prefillForField('theGap')) {
    actions.push({ id: 'gap', label: 'Copy outline gap → The gap', run: () => setField('theGap', outlineGap.value) })
  }
  if (part.fields.some((f) => f.id === 'myStudyPitch') && prefillForField('myStudyPitch')) {
    actions.push({ id: 'transition', label: 'Copy transition → My study pitch', run: () => setField('myStudyPitch', outlineTransition.value) })
  }
  return actions
}

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
  margin-left: 0.35rem;
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

.prefill-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
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
</style>
