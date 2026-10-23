<template>
  <div class="stuck-page">
    <div class="container">
      <router-link :to="backTo" class="back-link">← {{ backLabel }}</router-link>
      <h1 class="stuck-title">Stuck?</h1>
      <p class="stuck-intro">
        <template v-if="topicName">You are asking about <strong>{{ topicName }}</strong><template v-if="weekLabel"> ({{ weekLabel }})</template>.</template>
        <template v-else>Try these first. If they do not answer it, email your professor from the bottom of this page.</template>
      </p>

      <section class="stuck-step">
        <h2><span class="step-num">1</span> Try these first</h2>
        <template v-if="assignment">
          <p v-if="assignment.getHelp" class="stuck-lead">{{ assignment.getHelp }}</p>
          <ul v-if="tips.length" class="stuck-tips">
            <li v-for="(tip, i) in tips" :key="i">{{ tip }}</li>
          </ul>
          <router-link :to="detailTo" class="stuck-link">Full help for {{ assignment.name }} →</router-link>
        </template>
        <ul v-else class="stuck-links">
          <li v-for="l in weekLinks" :key="l.key"><router-link :to="l.to">{{ l.label }}</router-link></li>
          <li><router-link :to="`/class/${classId}/assignment-help`">All assignment help</router-link></li>
          <li v-if="classId === 'research-methods'"><router-link :to="`/class/${classId}/study-plan`">Study Plan</router-link></li>
          <li><router-link to="/about#faq">Frequently asked questions</router-link></li>
        </ul>
      </section>

      <section class="stuck-step">
        <h2><span class="step-num">2</span> Still stuck? Email your professor</h2>
        <p class="stuck-lead">
          This opens your email app with the course, week and assignment filled in. Add what you tried and where it stopped working.
        </p>
        <a :href="mailto" class="stuck-email-btn">Email about this</a>
        <p class="stuck-fallback">
          Nothing opened? Write to <strong>{{ PROFESSOR_EMAIL }}</strong> and mention the assignment and week.
        </p>
      </section>

      <p class="stuck-broken">
        Something on the website not working?
        <router-link to="/report-issue">Report a problem</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { getAssignmentById } from '../data/assignmentHelp'
import { getResearchMethodsSchedule, parseWeekRef, findTargetWeek, weekRef } from '../data/researchMethodsSchedule'
import { itemLink } from '../lib/continueSummary'
import { buildHelpMailto, PROFESSOR_EMAIL } from '../lib/helpEmail'

const props = defineProps({
  classId: { type: String, required: true }
})

const route = useRoute()
const { user } = useAuth()

const topic = computed(() => String(route.query.topic || ''))
const found = computed(() => (topic.value ? getAssignmentById(props.classId, topic.value) : null))
const assignment = computed(() => found.value?.assignment || null)
const topicName = computed(() => assignment.value?.name || '')
const tips = computed(() => (Array.isArray(assignment.value?.tips) ? assignment.value.tips.filter((t) => typeof t === 'string').slice(0, 4) : []))

// Which week the student was in: the ?from= they came with, else this week
const place = computed(() => {
  const schedule = getResearchMethodsSchedule(props.classId)
  if (!schedule) return null
  const ref = parseWeekRef(route.query.from)
  if (ref) return ref
  const current = findTargetWeek(null)
  return current && current.schedule.slug === schedule.slug ? current : null
})

const weekLabel = computed(() => (place.value ? `Week ${place.value.weekIndex + 1}` : ''))
const courseLabel = computed(() => place.value?.schedule.course || '')
const fromRef = computed(() => (place.value ? weekRef(place.value.schedule, place.value.weekIndex) : undefined))

const detailTo = computed(() => ({
  path: `/class/${props.classId}/assignment-help/${topic.value}`,
  query: fromRef.value ? { from: fromRef.value } : {}
}))

const weekLinks = computed(() => {
  if (!place.value) return []
  const from = fromRef.value
  const week = place.value.schedule.weeks[place.value.weekIndex]
  return week.items
    .filter((it) => it.kind === 'assignment-help' || it.kind === 'study-plan')
    .map((it) => ({ key: `${it.kind}-${it.assignmentId || it.sectionId}`, label: it.label, to: itemLink(it, props.classId, from) }))
    .filter((l) => l.to)
})

const backTo = computed(() => {
  if (assignment.value) return detailTo.value
  return { path: `/class/${props.classId}`, query: place.value ? { week: place.value.weekIndex + 1 } : {} }
})
const backLabel = computed(() => (assignment.value ? topicName.value : 'Back to your week'))

const mailto = computed(() => buildHelpMailto({
  course: courseLabel.value,
  week: weekLabel.value,
  topic: topicName.value,
  pageUrl: typeof window !== 'undefined' ? window.location.origin + (route.query.page || route.fullPath) : '',
  student: { name: user.value?.name, email: user.value?.email }
}))
</script>

<style scoped>
.stuck-page { padding: 1.5rem 0 3rem; min-height: 60vh; }
.back-link { display: inline-block; margin-bottom: 0.75rem; color: var(--text-secondary); text-decoration: none; font-size: 0.9rem; }
.back-link:hover { color: var(--primary); }
.stuck-title { margin: 0 0 0.5rem; font-size: 1.75rem; font-weight: 700; color: var(--text-primary); }
.stuck-intro { max-width: 42rem; margin: 0 0 1.5rem; color: var(--text-secondary); line-height: 1.6; }
.stuck-step { max-width: 42rem; margin-bottom: 1.5rem; padding: 1.25rem 1.5rem; border: 1px solid var(--border); border-radius: 1rem; background: var(--bg-card); }
.stuck-step h2 { display: flex; align-items: center; gap: 0.6rem; margin: 0 0 0.75rem; font-size: 1.15rem; color: var(--text-primary); }
.step-num { display: inline-flex; align-items: center; justify-content: center; width: 1.6rem; height: 1.6rem; border-radius: 50%; background: var(--primary); color: #fff; font-size: 0.85rem; }
.stuck-lead { margin: 0 0 0.75rem; color: var(--text-secondary); line-height: 1.6; }
.stuck-tips, .stuck-links { margin: 0 0 0.75rem; padding-left: 1.25rem; color: var(--text-secondary); line-height: 1.6; }
.stuck-links a, .stuck-link { color: var(--primary); font-weight: 600; text-decoration: none; }
.stuck-links a:hover, .stuck-link:hover { text-decoration: underline; }
.stuck-email-btn { display: inline-block; padding: 0.7rem 1.4rem; border-radius: 0.5rem; background: var(--primary); color: #fff; font-weight: 600; text-decoration: none; }
.stuck-fallback { margin: 0.75rem 0 0; font-size: 0.85rem; color: var(--text-muted); }
.stuck-broken { max-width: 42rem; font-size: 0.9rem; color: var(--text-muted); }
.stuck-broken a { color: var(--primary); }
</style>
