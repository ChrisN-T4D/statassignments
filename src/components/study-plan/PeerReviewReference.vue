<template>
  <section class="peer-review-reference" aria-labelledby="peer-review-ref-title">
    <h2 id="peer-review-ref-title" class="ref-title">{{ PEER_REVIEW_REFERENCE.title }}</h2>
    <p class="ref-intro">{{ PEER_REVIEW_REFERENCE.intro }}</p>

    <div class="ref-columns">
      <div class="ref-col">
        <h3 class="col-title">Usually peer-reviewed</h3>
        <ul>
          <li v-for="(line, i) in PEER_REVIEW_REFERENCE.usuallyPeerReviewed" :key="i">{{ line }}</li>
        </ul>
      </div>
      <div class="ref-col">
        <h3 class="col-title">Usually not acceptable for this assignment</h3>
        <ul>
          <li v-for="(line, i) in PEER_REVIEW_REFERENCE.usuallyNot" :key="i">{{ line }}</li>
        </ul>
      </div>
    </div>

    <p class="ref-reminder">{{ PEER_REVIEW_REFERENCE.reminder }}</p>

    <div class="ref-links">
      <router-link to="/topic/rm-chapter-2" class="resource-link">Read Ch. 2 — evaluating sources</router-link>
      <router-link
        to="/class/research-methods/practice?module=rm-module-2"
        class="resource-link"
      >
        Ch. 2 Concept Review (peer review questions)
      </router-link>
    </div>
  </section>
</template>

<script setup>
import { PEER_REVIEW_REFERENCE } from '../../data/capstoneArticleReviewWorksheet.js'
</script>

<style scoped>
.peer-review-reference {
  margin-bottom: 2rem;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
}

.ref-title {
  font-size: 1.15rem;
  margin: 0 0 0.5rem;
}

.ref-intro {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 1rem;
  line-height: 1.5;
}

.ref-columns {
  display: grid;
  gap: 1rem;
  margin-bottom: 1rem;
}

@media (min-width: 640px) {
  .ref-columns {
    grid-template-columns: 1fr 1fr;
  }
}

.col-title {
  font-size: 0.9rem;
  margin: 0 0 0.5rem;
  color: var(--primary);
}

.ref-col ul {
  margin: 0;
  padding-left: 1.2rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.ref-col li {
  margin-bottom: 0.35rem;
}

.ref-reminder {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-style: italic;
  margin: 0 0 1rem;
  line-height: 1.45;
}

.ref-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
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
