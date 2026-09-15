<template>
  <div class="article-review-section">
    <ArticleReviewWalkthrough />

    <p class="section-intro">
      Capture notes for each article in your own words. Canvas expects
      <strong>{{ ARTICLE_REVIEW_CANVAS_RANGE_LABEL }}</strong> peer-reviewed reviews; this workspace has
      {{ ARTICLE_REVIEW_TEMPLATE_ARTICLE_COUNT }} numbered slots — complete at least
      {{ ARTICLE_REVIEW_MIN_ARTICLES }} before you submit.
      <a :href="canvasUrl" target="_blank" rel="noopener noreferrer" class="canvas-link">Open Canvas assignment ↗</a>
    </p>
    <p class="progress-chip">{{ progressLabel }}</p>
    <p v-if="activeArticleNumber != null" class="editing-banner">
      Editing Article {{ activeArticleNumber }} of {{ ARTICLE_REVIEW_TEMPLATE_ARTICLE_COUNT }}
    </p>
    <nav class="article-jump" aria-label="Jump to article card">
      <button
        v-for="(card, index) in articleReview.articleCards"
        :key="card.id"
        type="button"
        class="jump-btn"
        :class="{ active: openCards[index], complete: cardStatus(card) === 'Fields complete' }"
        @click="openCard(index)"
      >
        {{ index + 1 }}
      </button>
    </nav>

    <PeerReviewReference />

    <section class="worksheet-block">
      <h2 class="block-title">Header</h2>
      <SchemaField
        v-for="field in ARTICLE_REVIEW_HEADER_FIELDS"
        :key="field.id"
        :field="field"
        :input-id="`ar-header-${field.id}`"
        :model-value="articleReview[field.id]"
        @update:model-value="setHeader(field.id, $event)"
      />
    </section>

    <section
      v-for="(card, index) in articleReview.articleCards"
      :key="card.id"
      class="worksheet-block article-card"
    >
      <button
        type="button"
        class="card-toggle"
        :aria-expanded="openCards[index]"
        @click="toggleCard(index)"
      >
        <span class="card-heading">
          <span class="card-number">Article {{ index + 1 }}</span>
          <span v-if="cardReferenceSnippet(card)" class="card-ref-snippet">{{ cardReferenceSnippet(card) }}</span>
        </span>
        <span class="card-status">{{ cardStatus(card) }}</span>
      </button>
      <div v-show="openCards[index]" class="card-body">
        <SchemaField
          v-for="field in ARTICLE_CARD_FIELDS"
          :key="field.id"
          :field="field"
          :input-id="`ar-card-${index}-${field.id}`"
          :model-value="card[field.id]"
          @update:model-value="setCardField(index, field.id, $event)"
        />
        <SourceSelfCheckPanel
          :model-value="card.sourceSelfCheck ?? {}"
          @update:model-value="setSelfCheckObject(index, $event)"
        />
      </div>
    </section>

    <section class="worksheet-block">
      <h2 class="block-title">{{ ARTICLE_REVIEW_PROBLEM_STATEMENT.sectionTitle }}</h2>
      <p class="block-intro">{{ ARTICLE_REVIEW_PROBLEM_STATEMENT.intro }}</p>
      <SchemaField
        v-for="field in ARTICLE_REVIEW_PROBLEM_STATEMENT.promptFields"
        :key="field.id"
        :field="field"
        :input-id="`ar-ps-${field.id}`"
        :model-value="articleReview.problemStatement[field.id]"
        @update:model-value="setProblemStatement(field.id, $event)"
      />
    </section>

    <section class="worksheet-block">
      <h2 class="block-title">{{ ARTICLE_REVIEW_RQ_HYPOTHESIS.sectionTitle }}</h2>
      <SchemaField
        v-for="field in ARTICLE_REVIEW_RQ_HYPOTHESIS.fields"
        :key="field.id"
        :field="field"
        :input-id="`ar-rq-${field.id}`"
        :model-value="articleReview[field.id]"
        @update:model-value="setRqField(field.id, $event)"
      />
    </section>

    <StudyPlanExportPanel section-id="article-review" :project="project" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {
  ARTICLE_REVIEW_HEADER_FIELDS,
  ARTICLE_CARD_FIELDS,
  ARTICLE_REVIEW_PROBLEM_STATEMENT,
  ARTICLE_REVIEW_RQ_HYPOTHESIS,
  ARTICLE_REVIEW_TEMPLATE_ARTICLE_COUNT,
  ARTICLE_REVIEW_MIN_ARTICLES,
  ARTICLE_REVIEW_CANVAS_RANGE_LABEL
} from '../../data/capstoneArticleReviewWorksheet.js'
import { CANVAS_RM_ASSIGNMENTS } from '../../data/researchMethodsCanvasLinks.js'
import { countArticleCards } from '../../lib/capstoneValidation.js'
import SchemaField from './SchemaField.vue'
import ArticleReviewWalkthrough from './ArticleReviewWalkthrough.vue'
import PeerReviewReference from './PeerReviewReference.vue'
import SourceSelfCheckPanel from './SourceSelfCheckPanel.vue'
import StudyPlanExportPanel from './StudyPlanExportPanel.vue'

const props = defineProps({
  project: { type: Object, required: true }
})

const emit = defineEmits(['update'])

const canvasUrl = CANVAS_RM_ASSIGNMENTS.articleReview
const openCards = ref([true, false, false, false, false, false, false, false])

const articleReview = computed(() => props.project.articleReview ?? {})

const progressLabel = computed(() => {
  const { started, complete, total, rangeLabel } = countArticleCards(props.project)
  return `${complete} complete · ${started}/${total} started · Canvas expects ${rangeLabel}`
})

const activeArticleNumber = computed(() => {
  const idx = openCards.value.findIndex(Boolean)
  return idx >= 0 ? idx + 1 : null
})

function emitUpdate (articleReview) {
  emit('update', { articleReview })
}

function setHeader (id, value) {
  emitUpdate({ ...articleReview.value, [id]: value })
}

function setCardField (index, fieldId, value) {
  const cards = [...articleReview.value.articleCards]
  cards[index] = { ...cards[index], [fieldId]: value }
  emitUpdate({ ...articleReview.value, articleCards: cards })
}

function setSelfCheckObject (index, sourceSelfCheck) {
  const cards = [...articleReview.value.articleCards]
  cards[index] = { ...cards[index], sourceSelfCheck }
  emitUpdate({ ...articleReview.value, articleCards: cards })
}

function setProblemStatement (id, value) {
  emitUpdate({
    ...articleReview.value,
    problemStatement: { ...articleReview.value.problemStatement, [id]: value }
  })
}

function setRqField (id, value) {
  emitUpdate({ ...articleReview.value, [id]: value })
}

function openCard (index) {
  openCards.value = openCards.value.map((_, i) => i === index)
}

function toggleCard (index) {
  openCards.value[index] = !openCards.value[index]
}

function cardReferenceSnippet (card) {
  const ref = (card.apaReference ?? '').trim()
  if (!ref) return ''
  const firstLine = ref.split('\n')[0].trim()
  return firstLine.length > 72 ? `${firstLine.slice(0, 69)}…` : firstLine
}

function cardStatus (card) {
  const filled = ARTICLE_CARD_FIELDS.filter((f) => f.required && (card[f.id] ?? '').trim()).length
  const required = ARTICLE_CARD_FIELDS.filter((f) => f.required).length
  if (filled === 0) return 'Not started'
  if (filled < required) return 'In progress'
  return 'Fields complete'
}
</script>

<style scoped>
.section-intro {
  color: var(--text-secondary);
  line-height: 1.55;
  margin-bottom: 0.75rem;
}

.canvas-link {
  color: var(--primary);
  margin-left: 0.35rem;
}

.progress-chip {
  display: inline-block;
  font-size: 0.85rem;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--border);
  margin-bottom: 0.75rem;
}

.editing-banner {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--primary);
  margin: 0 0 0.75rem;
}

.article-jump {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1.25rem;
}

.jump-btn {
  width: 2rem;
  height: 2rem;
  border-radius: 0.45rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
}

.jump-btn.active {
  border-color: var(--primary);
  color: var(--primary);
}

.jump-btn.complete {
  background: rgba(34, 197, 94, 0.12);
  border-color: rgba(34, 197, 94, 0.4);
}

.worksheet-block {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
}

.block-title {
  font-size: 1.15rem;
  margin: 0 0 1rem;
}

.block-intro {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 1rem;
}

.card-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0;
  border: none;
  background: none;
  color: var(--text-primary);
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}

.card-heading {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  min-width: 0;
}

.card-ref-snippet {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-secondary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 36rem;
}

.card-status {
  font-size: 0.8rem;
  font-weight: 400;
  color: var(--text-secondary);
}

.card-body {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
}

</style>
