<template>
  <div class="software-guides-index">
    <div class="container">
      <div class="guides-header">
        <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
        <h1 class="guides-title">{{ pageTitle }}</h1>
        <p class="guides-intro">{{ pageSubtitle }}</p>
      </div>

      <template v-if="groups.length">
        <div class="guides-groups">
          <section
            v-for="group in groups"
            :key="group.groupKey"
            class="guides-group"
          >
            <h2 class="group-heading">{{ group.groupLabel }}</h2>
            <ul class="guide-links">
              <li v-for="(lesson, idx) in group.lessons" :key="lesson.id">
                <router-link
                  :to="lessonLink(lesson)"
                  class="guide-link"
                >
                  <span class="guide-number">{{ globalIndex(group, idx) }}.</span>
                  <span class="guide-title">{{ lesson.title }}</span>
                  <span class="guide-meta">
                    <span class="guide-module-pill">Module {{ lesson.moduleNumber }}</span>
                    <span v-if="lesson.estimatedTime" class="guide-time">{{ lesson.estimatedTime }} min</span>
                  </span>
                </router-link>
              </li>
            </ul>
          </section>
        </div>
      </template>

      <div v-else class="guides-empty">
        <p>No {{ softwareName }} guides available for this course yet.</p>
        <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getGuidesBySoftware } from '../data/softwareGuides'

const props = defineProps({
  classId: { type: String, required: true },
  /** 'jamovi' | 'excel' - from route path (jamovi-guides vs excel-guides) */
  software: { type: String, required: true }
})

const groups = computed(() => getGuidesBySoftware(props.software))

const pageTitle = computed(() => {
  const name = props.software === 'jamovi' ? 'Jamovi' : 'Excel'
  return `${name} Guides`
})

const pageSubtitle = computed(() => {
  return `Step-by-step tutorials for ${props.software === 'jamovi' ? 'Jamovi' : 'Excel'}. Click a guide to open it.`
})

const softwareName = computed(() => props.software === 'jamovi' ? 'Jamovi' : 'Excel')

/** Global 1-based index across all groups (for "1. Title", "2. Title", ...) */
function globalIndex(group, idxInGroup) {
  let n = 0
  for (const g of groups.value) {
    if (g === group) return n + idxInGroup + 1
    n += g.lessons.length
  }
  return idxInGroup + 1
}

function lessonLink(lesson) {
  return {
    path: `/class/${props.classId}/lesson/${lesson.id}`,
    query: { from: props.software === 'jamovi' ? 'jamovi-guides' : 'excel-guides' }
  }
}
</script>

<style scoped>
.software-guides-index {
  padding: 1.5rem 0 3rem;
  min-height: 60vh;
}

.guides-header {
  margin-bottom: 2rem;
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

.guides-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.guides-intro {
  color: var(--text-secondary);
  margin: 0;
  max-width: 42rem;
  line-height: 1.6;
}

.guides-groups {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.guides-group {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
  padding: 1.25rem 1.5rem;
}

.group-heading {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.guide-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.guide-links li {
  margin: 0;
  padding: 0;
}

.guide-link {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  padding: 0.6rem 0;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: color 0.15s, background 0.15s;
}

.guide-link:last-child {
  border-bottom: none;
}

.guide-link:hover {
  color: var(--primary);
}

.guide-number {
  font-weight: 600;
  color: var(--primary);
  min-width: 1.5rem;
}

.guide-title {
  flex: 1;
  font-weight: 500;
}

.guide-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.guide-module-pill {
  padding: 0.2rem 0.45rem;
  border-radius: 0.25rem;
  background: var(--border-light);
  color: var(--text-muted);
}

.guide-time {
  color: var(--text-secondary);
}

.guides-empty {
  padding: 2rem;
  text-align: center;
  color: var(--text-secondary);
}

.guides-empty .back-link {
  margin-top: 1rem;
}
</style>
