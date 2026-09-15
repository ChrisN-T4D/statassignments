<template>
  <div ref="sectionRoot" class="study-focus-section">
    <StudyFocusWalkthrough :root-el="sectionRoot" />

    <div class="arc-banner" data-tour="tour-sf-intro">
      <p class="section-intro">
        Use this section while drafting your literature review (weeks 5–10). It is
        <strong>not a Canvas submission</strong> — it is your working notebook. Notes here feed
        your Phase 3 elevator speech and Phase 4 research question.
      </p>
      <p class="arc-flow">
        Article Review (week 4) → <strong>Study Focus</strong> (lit review weeks) → Phase 3 & 4 (week 11)
      </p>
      <p class="progress-chip">{{ progressLabel }}</p>
    </div>

    <aside v-if="hasArticleReviewContext" class="reminders-panel" data-tour="tour-sf-reminders">
      <h2 class="reminders-title">From your Article Review</h2>
      <p class="reminders-note">Starting points — refine as you read more than your original article cards.</p>
      <div v-if="articleProgress" class="reminder-block">
        <h3>Article cards</h3>
        <p class="reminder-text">{{ articleProgress }}</p>
      </div>
      <div v-if="problemDraft" class="reminder-block">
        <h3>Problem statement (draft)</h3>
        <p class="reminder-text">{{ problemDraft }}</p>
      </div>
      <div v-if="earlyRq" class="reminder-block">
        <h3>Early research question</h3>
        <p class="reminder-text">{{ earlyRq }}</p>
      </div>
      <router-link :to="articleReviewLink" class="reminder-link">Open Article Review to update →</router-link>
    </aside>

    <aside v-else class="reminders-panel reminders-empty" data-tour="tour-sf-reminders">
      <h2 class="reminders-title">From your Article Review</h2>
      <p class="reminders-note">
        Complete Article Review first — your problem statement and early RQ will appear here as starting points.
      </p>
      <router-link :to="articleReviewLink" class="reminder-link">Go to Article Review →</router-link>
    </aside>

    <section
      v-for="field in STUDY_FOCUS_FIELDS"
      :key="field.id"
      class="worksheet-block"
      :data-tour="tourTargetForField(field.id)"
    >
      <SchemaField
        :field="field"
        :input-id="`sf-${field.id}`"
        :model-value="studyFocus[field.id]"
        @update:model-value="setField(field.id, $event)"
      />
    </section>

    <div class="feeds-forward" data-tour="tour-sf-feeds">
      <h2 class="feeds-title">Where these notes go next</h2>
      <ul class="feeds-list">
        <li><strong>Working gap</strong> → reminder in Phase 3 elevator speech</li>
        <li><strong>Working research question</strong> → copy button in Phase 4 Part A</li>
        <li><strong>Lit review themes</strong> → “what we know” in your elevator speech</li>
      </ul>
      <div class="feeds-links">
        <router-link :to="phase3Link" class="resource-link">Open Phase 3 →</router-link>
        <router-link :to="phase4Link" class="resource-link">Open Phase 4 →</router-link>
      </div>
    </div>

    <div class="resource-links">
      <router-link to="/topic/rm-chapter-2" class="resource-link">Ch. 2 — gaps and synthesis</router-link>
      <router-link to="/topic/rm-chapter-11" class="resource-link">Ch. 11 — APA and clear prose</router-link>
    </div>

    <div data-tour="tour-sf-export">
      <StudyPlanExportPanel section-id="study-focus" :project="project" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { STUDY_FOCUS_FIELDS } from '../../data/capstoneWorksheetSchemas.js'
import { countArticleCards, countStudyFocusFields } from '../../lib/capstoneValidation.js'
import SchemaField from './SchemaField.vue'
import StudyFocusWalkthrough from './StudyFocusWalkthrough.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true },
  classId: { type: String, default: 'research-methods' }
})

const emit = defineEmits(['update'])

const sectionRoot = ref(null)
const studyFocus = computed(() => props.project.studyFocus ?? {})

const progressLabel = computed(() => {
  const { filled, total } = countStudyFocusFields(props.project)
  return `${filled}/${total} note fields filled`
})

const problemDraft = computed(() =>
  props.project.articleReview?.problemStatement?.problemStatementDraft?.trim() || ''
)
const earlyRq = computed(() =>
  props.project.articleReview?.researchQuestions?.trim() || ''
)
const articleProgress = computed(() => {
  const { complete, minRequired, total } = countArticleCards(props.project)
  if (complete === 0 && total === 0) return ''
  return `${complete}/${minRequired} article cards complete · ${total} cards total`
})
const hasArticleReviewContext = computed(() =>
  Boolean(problemDraft.value || earlyRq.value || articleProgress.value)
)

const articleReviewLink = computed(() => `/class/${props.classId}/study-plan/article-review`)
const phase3Link = computed(() => `/class/${props.classId}/study-plan/phase-3`)
const phase4Link = computed(() => `/class/${props.classId}/study-plan/phase-4`)

function tourTargetForField (fieldId) {
  const map = {
    workingGap: 'tour-sf-gap',
    workingResearchQuestion: 'tour-sf-rq',
    litReviewThemes: 'tour-sf-themes',
    sourcesToCite: 'tour-sf-sources'
  }
  return map[fieldId] ?? null
}

function setField (id, value) {
  emit('update', { studyFocus: { ...studyFocus.value, [id]: value } })
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

.reminders-panel {
  margin-bottom: 1.5rem;
  padding: 1.15rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(59, 130, 246, 0.06);
}

.reminders-empty {
  background: rgba(255, 255, 255, 0.02);
}

.reminders-title {
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

.reminder-link:hover {
  text-decoration: underline;
}

.worksheet-block {
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
  margin-bottom: 1.25rem;
}

.feeds-forward {
  margin-bottom: 1.5rem;
  padding: 1.15rem 1.25rem;
  border: 1px dashed var(--border);
  border-radius: 0.75rem;
}

.feeds-title {
  font-size: 1rem;
  margin: 0 0 0.5rem;
}

.feeds-list {
  margin: 0 0 0.75rem;
  padding-left: 1.2rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.feeds-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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
