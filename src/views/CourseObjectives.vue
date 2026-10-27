<template>
  <div class="course-objectives">
    <div class="container">
      <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
      <h1 class="page-title">Course objectives</h1>
      <p class="page-intro">
        By the end of PSYC 5033 you will be able to do the eight things below. Each assignment and each week has its own
        objectives, and each of those is linked to the course objectives it supports. Due dates, points, and rubrics are in Canvas.
      </p>

      <div v-if="objectives.length === 0" class="not-found">
        <p>This course does not have published objectives yet.</p>
      </div>

      <ol v-else class="objective-list">
        <li v-for="c in objectives" :key="c.id" :id="c.id" class="objective-card">
          <div class="objective-head">
            <span class="objective-id">{{ c.id }}</span>
            <span class="objective-slo">Program {{ c.programSLOs.join(', ') }}</span>
          </div>
          <p class="objective-text">{{ c.text }}</p>
          <div class="objective-links">
            <div v-if="assignmentsFor(c.id).length">
              <h2 class="links-title">Assignments and exams that support it</h2>
              <ul class="links-list">
                <li v-for="a in assignmentsFor(c.id)" :key="a.id">
                  <router-link :to="`/class/${classId}/assignment-help/${a.id}`">{{ a.title }}</router-link>
                </li>
              </ul>
            </div>
            <div v-if="c.chapters.length">
              <h2 class="links-title">Textbook chapters</h2>
              <ul class="links-list inline">
                <li v-for="ch in c.chapters" :key="ch">
                  <router-link :to="`/topic/rm-chapter-${ch}`">Chapter {{ ch }}</router-link>
                </li>
              </ul>
            </div>
            <div v-if="weeksFor(c.id).length">
              <h2 class="links-title">Weeks</h2>
              <p class="weeks-line">{{ weeksFor(c.id).map((w) => 'Week ' + w.number).join(', ') }}</p>
            </div>
          </div>
        </li>
      </ol>

      <section v-if="programSLOs.length" class="slo-section">
        <h2 class="slo-title">Program outcomes this course supports</h2>
        <div v-for="p in programSLOs" :key="p.key" class="slo-card">
          <h3 class="slo-label">{{ p.program }}, {{ p.label }}</h3>
          <ul class="slo-texts">
            <li v-for="(t, i) in p.texts" :key="i">
              <em v-if="t.track">{{ t.track }}: </em>{{ t.text }}
            </li>
          </ul>
        </div>
        <p class="slo-source">
          All program outcomes:
          <a href="https://www.nwosu.edu/school-of-professional-studies/psychology/" target="_blank" rel="noopener">nwosu.edu psychology program page</a>.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getCourseObjectives, getProgramOutcomes, assignmentsForObjective, weeksForObjective } from '../data/introResearchObjectives'

const props = defineProps({
  classId: { type: String, required: true }
})

const objectives = computed(() => getCourseObjectives(props.classId))
const programSLOs = computed(() => getProgramOutcomes(props.classId))
const assignmentsFor = (id) => assignmentsForObjective(id)
const weeksFor = (id) => weeksForObjective(id)
</script>

<style scoped>
.course-objectives { padding: 1.5rem 0 3rem; min-height: 60vh; }
.back-link { display: inline-block; color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; margin-bottom: 0.75rem; }
.back-link:hover { color: var(--primary-text); }
.page-title { font-size: 1.75rem; font-weight: 700; margin: 0 0 0.5rem 0; color: var(--text-primary); }
.page-intro { color: var(--text-secondary); max-width: 42rem; line-height: 1.6; margin: 0 0 1.5rem 0; }
.objective-list { list-style: none; padding: 0; margin: 0; display: grid; gap: 1rem; }
.objective-card { border: 1px solid var(--border-color, #e5e7eb); border-radius: 8px; padding: 1rem 1.25rem; background: var(--bg-card, transparent); }
.objective-head { display: flex; gap: 0.75rem; align-items: baseline; margin-bottom: 0.25rem; }
.objective-id { font-weight: 700; color: var(--primary-text); }
.objective-slo { font-size: 0.8rem; color: var(--text-muted); }
.objective-text { margin: 0 0 0.75rem 0; color: var(--text-primary); line-height: 1.55; }
.objective-links { display: grid; gap: 0.5rem; }
.links-title { font-size: 0.8rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text-muted); margin: 0 0 0.25rem 0; }
.links-list { margin: 0; padding-left: 1.1rem; }
.links-list.inline { list-style: none; padding: 0; display: flex; flex-wrap: wrap; gap: 0.75rem; }
.weeks-line { margin: 0; color: var(--text-secondary); }
.not-found { color: var(--text-secondary); }
.slo-section { margin-top: 2rem; }
.slo-title { font-size: 1.2rem; font-weight: 700; margin: 0 0 0.75rem 0; color: var(--text-primary); }
.slo-card { margin-bottom: 0.75rem; }
.slo-label { font-size: 0.95rem; font-weight: 600; margin: 0 0 0.25rem 0; color: var(--text-primary); }
.slo-texts { margin: 0; padding-left: 1.1rem; color: var(--text-secondary); line-height: 1.55; }
.slo-source { color: var(--text-muted); font-size: 0.85rem; margin-top: 0.75rem; }
</style>
