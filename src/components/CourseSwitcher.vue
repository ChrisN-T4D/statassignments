<template>
  <nav v-if="visible" class="course-switcher" aria-label="Psychology methods courses">
    <div class="container course-switcher-inner">
      <router-link
        v-for="course in PSYCH_METHODS_COURSES"
        :key="course.slug"
        :to="linkFor(course.slug)"
        class="course-tab"
        :class="{ active: isActive(course.slug) }"
      >
        {{ course.label }}
      </router-link>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { PSYCH_METHODS_COURSES, isPsychMethodsCourse } from '../data/psychMethodsCourses'

const route = useRoute()

const visible = computed(() => {
  const slug = route.params.classId
  return isPsychMethodsCourse(slug) && route.path.startsWith('/class/')
})

function isActive (slug) {
  return route.params.classId === slug
}

function linkFor (slug) {
  const current = route.params.classId
  if (!isPsychMethodsCourse(current)) return `/class/${slug}`

  const subpath = route.path.replace(/^\/class\/[^/]+/, '') || ''
  if (subpath.startsWith('/assignment-help') && slug !== 'research-methods') {
    return `/class/${slug}`
  }
  if (subpath && subpath !== '/') {
    return `/class/${slug}${subpath}`
  }
  return `/class/${slug}`
}
</script>

<style scoped>
.course-switcher {
  background: var(--bg-secondary, #f8fafc);
  border-bottom: 1px solid var(--border-color, #e2e8f0);
}

.course-switcher-inner {
  display: flex;
  gap: 0.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0;
}

.course-tab {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-secondary, #64748b);
  text-decoration: none;
  border-bottom: 3px solid transparent;
  margin-bottom: -1px;
  transition: color 0.15s, border-color 0.15s;
}

.course-tab:hover {
  color: var(--text-primary, #0f172a);
}

.course-tab.active {
  color: var(--primary, #3b82f6);
  border-bottom-color: var(--primary, #3b82f6);
}

@media (max-width: 768px) {
  .course-switcher-inner {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .course-tab {
    white-space: nowrap;
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
  }
}
</style>
