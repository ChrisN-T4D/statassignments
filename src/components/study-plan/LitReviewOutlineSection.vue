<template>
  <div ref="sectionRoot" class="lit-review-outline-section">
    <LitReviewOutlineWalkthrough :root-el="sectionRoot" />

    <div class="arc-banner" data-tour="tour-lro-intro">
      <p class="section-intro">
        Use this <strong>literature review outline compiler</strong> while drafting (weeks 5–10).
        It is <strong>not a Canvas submission</strong> — root your review in one organizing framework,
        sort evidence into theme buckets, and export for Draft 1.
      </p>
      <p class="arc-flow">
        Article Review (week 4) → <strong>Lit Review Outline</strong> (lit review weeks) → Phase 3 &amp; 4 (week 11)
      </p>
      <p class="progress-chip">{{ progressLabel }}</p>
    </div>

    <aside v-if="hasArticleReviewContext" class="reminders-panel" data-tour="tour-lro-reminders">
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

    <aside v-else class="reminders-panel reminders-empty" data-tour="tour-lro-reminders">
      <h2 class="reminders-title">From your Article Review</h2>
      <p class="reminders-note">
        Complete Article Review first — your problem statement and early RQ will appear here as starting points.
      </p>
      <router-link :to="articleReviewLink" class="reminder-link">Go to Article Review →</router-link>
    </aside>

    <section class="worksheet-block" data-tour="tour-lro-framework">
      <h2 class="block-title">Organizing framework</h2>
      <p class="block-intro">Name the theory or model that routes your literature review — not just your topic keywords.</p>
      <SchemaField
        v-for="field in ORGANIZING_FRAMEWORK_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`lro-fw-${field.id}`"
        :model-value="outline.organizingFramework[field.id]"
        @update:model-value="setFrameworkField(field.id, $event)"
      />
    </section>

    <details class="reference-panel" data-tour="tour-lro-reference">
      <summary class="reference-summary">Framework ideas (browse only)</summary>
      <p class="reference-note">Methods Market does not recommend a framework for your topic. Copy a name if helpful, or use your own.</p>
      <div v-for="area in FRAMEWORK_REFERENCE_AREAS" :key="area.id" class="reference-area">
        <h3 class="reference-area-title">{{ area.label }}</h3>
        <ul class="reference-list">
          <li v-for="entry in area.entries" :key="entry.name">
            <strong>{{ entry.name }}</strong> — {{ entry.summary }}
            <router-link :to="`/topic/${entry.helpTopicId}`" class="reference-link">Ch. help →</router-link>
          </li>
        </ul>
      </div>
    </details>

    <section class="worksheet-block" data-tour="tour-lro-themes">
      <h2 class="block-title">Theme buckets</h2>
      <p class="block-intro">Synthesis sections under your framework. Link article card numbers manually — MM does not copy card text into notes.</p>

      <article
        v-for="(bucket, index) in outline.themeBuckets"
        :key="bucket.id"
        class="theme-bucket"
      >
        <div class="bucket-header">
          <label :for="`bucket-title-${bucket.id}`" class="bucket-label">Section {{ index + 1 }}</label>
          <div class="bucket-actions">
            <button type="button" class="icon-btn" :disabled="index === 0" title="Move up" @click="moveBucket(index, -1)">↑</button>
            <button type="button" class="icon-btn" :disabled="index >= outline.themeBuckets.length - 1" title="Move down" @click="moveBucket(index, 1)">↓</button>
            <button
              v-if="outline.themeBuckets.length > 1"
              type="button"
              class="icon-btn danger"
              title="Remove theme"
              @click="removeBucket(index)"
            >
              ×
            </button>
          </div>
        </div>
        <input
          :id="`bucket-title-${bucket.id}`"
          type="text"
          class="bucket-title-input"
          :value="bucket.title"
          @input="setBucketField(index, 'title', $event.target.value)"
        />
        <SchemaField
          :field="{ id: 'synthesis', label: 'Synthesis notes', helpNote: 'Bullet consensus, disagreements, or patterns across studies.', multiline: true }"
          :input-id="`bucket-notes-${bucket.id}`"
          :model-value="bucket.synthesisNotes"
          @update:model-value="setBucketField(index, 'synthesisNotes', $event)"
        />
        <SchemaField
          :field="{ id: 'connection', label: 'How does this theme support your framework?', multiline: true }"
          :input-id="`bucket-fw-${bucket.id}`"
          :model-value="bucket.connectionToFramework"
          @update:model-value="setBucketField(index, 'connectionToFramework', $event)"
        />
        <SchemaField
          :field="{ id: 'linked', label: 'Linked article numbers', helpNote: 'Comma-separated, e.g. 1, 3, 5', multiline: false }"
          :input-id="`bucket-articles-${bucket.id}`"
          :model-value="bucket.linkedArticleNumbers"
          @update:model-value="setBucketField(index, 'linkedArticleNumbers', $event)"
        />
        <ul v-if="articlePeeksForBucket(bucket).length" class="article-peeks">
          <li v-for="peek in articlePeeksForBucket(bucket)" :key="peek.num">
            <span v-if="peek.missing" class="peek-missing">No card for Article {{ peek.num }} yet.</span>
            <span v-else>Article {{ peek.num }}: {{ peek.snippet }}</span>
          </li>
        </ul>
      </article>

      <button type="button" class="add-theme-btn" @click="addBucket">+ Add theme</button>
    </section>

    <section class="worksheet-block" data-tour="tour-lro-gap">
      <h2 class="block-title">Gap &amp; transition</h2>
      <SchemaField
        v-for="field in GAP_TRANSITION_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`lro-gap-${field.id}`"
        :model-value="outline.gapAndTransition[field.id]"
        @update:model-value="setGapField(field.id, $event)"
      />
    </section>

    <section class="compiled-preview" data-tour="tour-lro-preview">
      <h2 class="block-title">Compiled outline preview</h2>
      <p class="block-intro">Live assembly of your framework, themes, and gap — your words only.</p>
      <pre class="preview-text">{{ compiledPreview }}</pre>
    </section>

    <div class="resource-links">
      <router-link to="/topic/rm-chapter-2" class="resource-link">Ch. 2 — gaps and synthesis</router-link>
      <router-link to="/topic/rm-chapter-11" class="resource-link">Ch. 11 — APA and clear prose</router-link>
    </div>

    <div class="feeds-forward">
      <h2 class="feeds-title">Where this outline goes next</h2>
      <ul class="feeds-list">
        <li><strong>Gap</strong> → reminder in Phase 3 elevator speech</li>
        <li><strong>Working RQ</strong> → copy button in Phase 4 Part A</li>
        <li><strong>Themes</strong> → “what we know” in your elevator speech</li>
      </ul>
      <div class="feeds-links">
        <router-link :to="phase3Link" class="resource-link">Open Phase 3 →</router-link>
        <router-link :to="phase4Link" class="resource-link">Open Phase 4 →</router-link>
      </div>
    </div>

    <div data-tour="tour-lro-export">
      <StudyPlanExportPanel section-id="study-focus" :project="project" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  ORGANIZING_FRAMEWORK_FIELDS,
  GAP_TRANSITION_FIELDS,
  compileLitReviewOutline,
  countLitReviewOutlineProgress,
  emptyThemeBucket,
  parseLinkedArticleNumbers
} from '../../data/capstoneLitReviewOutlineWorksheet.js'
import { FRAMEWORK_REFERENCE_AREAS } from '../../data/capstoneLitReviewFrameworkReference.js'
import { countArticleCards } from '../../lib/capstoneValidation.js'
import SchemaField from './SchemaField.vue'
import LitReviewOutlineWalkthrough from './LitReviewOutlineWalkthrough.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true },
  classId: { type: String, default: 'research-methods' }
})

const emit = defineEmits(['update'])

const sectionRoot = ref(null)
const outline = computed(() => props.project.litReviewOutline ?? {})

const progressLabel = computed(() => {
  const p = countLitReviewOutlineProgress(outline.value)
  if (!p.frameworkNamed) return 'Framework not started'
  if (p.readyHint) return 'Outline ready to export'
  return `Framework named · ${p.themesStarted}/${p.themesTotal} themes started`
})

const compiledPreview = computed(() =>
  compileLitReviewOutline(outline.value, { forExport: false })
)

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

function emitOutline (patch) {
  emit('update', { litReviewOutline: { ...outline.value, ...patch } })
}

function setFrameworkField (id, value) {
  emitOutline({
    organizingFramework: { ...outline.value.organizingFramework, [id]: value }
  })
}

function setGapField (id, value) {
  emitOutline({
    gapAndTransition: { ...outline.value.gapAndTransition, [id]: value }
  })
}

function setBucketField (index, key, value) {
  const buckets = [...(outline.value.themeBuckets ?? [])]
  buckets[index] = { ...buckets[index], [key]: value }
  emitOutline({ themeBuckets: buckets })
}

function addBucket () {
  const buckets = [...(outline.value.themeBuckets ?? []), emptyThemeBucket({ title: 'New theme' })]
  emitOutline({ themeBuckets: buckets })
}

function removeBucket (index) {
  const bucket = outline.value.themeBuckets[index]
  const hasContent =
    (bucket.title ?? '').trim() !== 'New theme' &&
    ((bucket.synthesisNotes ?? '').trim() ||
      (bucket.connectionToFramework ?? '').trim() ||
      (bucket.linkedArticleNumbers ?? '').trim())
  if (hasContent && !window.confirm('Remove this theme bucket? Content will be lost.')) return
  const buckets = outline.value.themeBuckets.filter((_, i) => i !== index)
  emitOutline({ themeBuckets: buckets.length ? buckets : [emptyThemeBucket({ title: 'Theme 1' })] })
}

function moveBucket (index, delta) {
  const buckets = [...outline.value.themeBuckets]
  const target = index + delta
  if (target < 0 || target >= buckets.length) return
  ;[buckets[index], buckets[target]] = [buckets[target], buckets[index]]
  emitOutline({ themeBuckets: buckets })
}

function cardRefSnippet (card) {
  const ref = (card?.apaReference ?? '').trim()
  if (!ref) return '(no reference yet)'
  const line = ref.split('\n')[0].trim()
  return line.length > 72 ? line.slice(0, 69) + '…' : line
}

function articlePeeksForBucket (bucket) {
  const cards = props.project.articleReview?.articleCards ?? []
  return parseLinkedArticleNumbers(bucket.linkedArticleNumbers).map((num) => {
    const card = cards[num - 1]
    if (!card) return { num, missing: true }
    return { num, missing: false, snippet: cardRefSnippet(card) }
  })
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

.block-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
}

.block-intro {
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.45;
}

.reference-panel {
  margin-bottom: 1.25rem;
  padding: 1rem 1.15rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
}

.reference-summary {
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
}

.reference-note {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0.75rem 0;
  line-height: 1.45;
}

.reference-area {
  margin-bottom: 1rem;
}

.reference-area-title {
  font-size: 0.9rem;
  margin: 0 0 0.35rem;
  color: var(--primary);
}

.reference-list {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.reference-list li {
  margin-bottom: 0.45rem;
}

.reference-link {
  margin-left: 0.35rem;
  color: var(--primary);
  text-decoration: none;
  font-size: 0.8rem;
}

.theme-bucket {
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px dashed var(--border);
}

.theme-bucket:last-of-type {
  border-bottom: none;
  margin-bottom: 0.75rem;
  padding-bottom: 0;
}

.bucket-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.35rem;
}

.bucket-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.bucket-actions {
  display: flex;
  gap: 0.25rem;
}

.icon-btn {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  font-size: 0.85rem;
}

.icon-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.icon-btn.danger {
  color: #f87171;
}

.bucket-title-input {
  width: 100%;
  padding: 0.55rem 0.65rem;
  border: 1px solid var(--border);
  border-radius: 0.45rem;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.article-peeks {
  margin: 0.35rem 0 0;
  padding-left: 1.1rem;
  font-size: 0.82rem;
  color: var(--text-secondary);
}

.peek-missing {
  color: #fbbf24;
}

.add-theme-btn {
  padding: 0.5rem 0.85rem;
  border: 1px dashed var(--border);
  border-radius: 0.45rem;
  background: transparent;
  color: var(--primary);
  cursor: pointer;
  font-size: 0.88rem;
}

.compiled-preview {
  margin-bottom: 1.25rem;
  padding: 1.15rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
}

.preview-text {
  margin: 0;
  padding: 1rem;
  border-radius: 0.5rem;
  background: rgba(0, 0, 0, 0.2);
  font-family: ui-monospace, monospace;
  font-size: 0.78rem;
  line-height: 1.55;
  white-space: pre-wrap;
  color: var(--text-secondary);
  max-height: 24rem;
  overflow-y: auto;
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
