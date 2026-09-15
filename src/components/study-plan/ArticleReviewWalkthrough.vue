<template>
  <section class="walkthrough" aria-labelledby="walkthrough-title">
    <button
      type="button"
      class="walkthrough-toggle"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      <span id="walkthrough-title" class="walkthrough-title">{{ ARTICLE_REVIEW_WALKTHROUGH.title }}</span>
      <span class="toggle-hint">{{ expanded ? 'Hide guide' : 'Show guide' }}</span>
    </button>

    <div v-show="expanded" class="walkthrough-body">
      <p class="walkthrough-intro">{{ ARTICLE_REVIEW_WALKTHROUGH.intro }}</p>

      <article
        v-for="step in ARTICLE_REVIEW_WALKTHROUGH.steps"
        :key="step.id"
        class="walkthrough-step"
      >
        <h3 class="step-title">{{ step.title }}</h3>
        <p class="step-why"><strong>Why it matters:</strong> {{ step.why }}</p>
        <p class="step-ties"><strong>In this workspace:</strong> {{ step.tiesTo }}</p>

        <div v-if="step.narrow || step.widen" class="adjust-grid">
          <div v-if="step.narrow" class="adjust-box narrow">
            <h4 class="adjust-label">When to narrow</h4>
            <p>{{ step.narrow }}</p>
          </div>
          <div v-if="step.widen" class="adjust-box widen">
            <h4 class="adjust-label">When to widen</h4>
            <p>{{ step.widen }}</p>
          </div>
        </div>
      </article>

      <p class="walkthrough-closing">{{ ARTICLE_REVIEW_WALKTHROUGH.closing }}</p>

      <div class="walkthrough-links">
        <router-link to="/topic/rm-chapter-2" class="resource-link">Ch. 2 — finding and evaluating sources</router-link>
        <router-link
          to="/class/research-methods/assignment-help/rm-article-review"
          class="resource-link"
        >
          Assignment Help — article review tips
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { ARTICLE_REVIEW_WALKTHROUGH } from '../../data/capstoneArticleReviewWalkthrough.js'

const STORAGE_KEY = 'study-plan-article-walkthrough-open'
const expanded = ref(true)

onMounted(() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === '0') expanded.value = false
    if (saved === '1') expanded.value = true
  } catch {
    /* ignore */
  }
})

watch(expanded, (val) => {
  try {
    localStorage.setItem(STORAGE_KEY, val ? '1' : '0')
  } catch {
    /* ignore */
  }
})
</script>

<style scoped>
.walkthrough {
  margin-bottom: 1.5rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  overflow: hidden;
}

.walkthrough-toggle {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  border: none;
  background: transparent;
  color: var(--text-primary);
  cursor: pointer;
  text-align: left;
}

.walkthrough-title {
  font-size: 1.05rem;
  font-weight: 600;
}

.toggle-hint {
  font-size: 0.85rem;
  color: var(--primary);
  flex-shrink: 0;
}

.walkthrough-body {
  padding: 0 1.25rem 1.25rem;
  border-top: 1px solid var(--border);
}

.walkthrough-intro {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 1rem 0 1.25rem;
}

.walkthrough-step {
  margin-bottom: 1.25rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid var(--border);
}

.walkthrough-step:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.step-title {
  font-size: 0.95rem;
  margin: 0 0 0.5rem;
  color: var(--primary);
}

.step-why,
.step-ties {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 0.5rem;
}

.adjust-grid {
  display: grid;
  gap: 0.65rem;
  margin-top: 0.65rem;
}

@media (min-width: 640px) {
  .adjust-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.adjust-box {
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  line-height: 1.45;
  color: var(--text-secondary);
}

.adjust-box.narrow {
  background: rgba(230, 57, 70, 0.08);
  border: 1px solid rgba(230, 57, 70, 0.25);
}

.adjust-box.widen {
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.25);
}

.adjust-label {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  margin: 0 0 0.35rem;
}

.narrow .adjust-label {
  color: #fca5a5;
}

.widen .adjust-label {
  color: #93c5fd;
}

.adjust-box p {
  margin: 0;
}

.walkthrough-closing {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 1rem 0;
  font-style: italic;
}

.walkthrough-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.resource-link {
  font-size: 0.88rem;
  color: var(--primary);
  text-decoration: none;
}

.resource-link:hover {
  text-decoration: underline;
}
</style>
