<template>
  <aside v-if="loc" class="wcb" aria-label="Where you are in the course">
    <div class="wcb-top">
      <router-link :to="weekLink" class="wcb-week">← Week {{ loc.weekIndex + 1 }} · {{ week.title }}</router-link>
      <router-link :to="help" class="wcb-help">Need help?</router-link>
    </div>

    <ol class="wcb-steps">
      <li
        v-for="(s, i) in steps"
        :key="s.key"
        :class="{ current: i === currentIndex, done: isDone(i) }"
      >
        <span class="wcb-n">{{ isDone(i) ? '✓' : i + 1 }}</span>
        <router-link v-if="s.to" :to="s.to">{{ s.label }}</router-link>
        <span v-else>{{ s.label }}</span>
        <small v-if="s.due">Due {{ formatDate(s.due) }}</small>
      </li>
    </ol>

    <div class="wcb-next">
      <template v-if="next">
        <span>Next up:</span>
        <router-link v-if="next.to" :to="next.to" class="wcb-go">{{ next.label }} →</router-link>
        <span v-else class="wcb-go plain">{{ next.label }}<template v-if="next.due"> (due {{ formatDate(next.due) }})</template></span>
      </template>
      <template v-else>
        <span>{{ currentIndex >= 0 ? "That's everything planned for this week." : 'Here is this week.' }}</span>
        <router-link :to="weekLink" class="wcb-go">Back to your week →</router-link>
      </template>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { chapterLinks, classSlugForSchedule, findTargetWeek, itemMatches, semesterQuery, softwareLink, weekRef } from '../data/researchMethodsSchedule'

const props = defineProps({
  /**
   * What this page is, so the bar can find its week and mark the current step:
   * { kind: 'chapter', id: <number> } | { kind: 'assignment-help', id } | { kind: 'study-plan', id } | { kind: 'lab' }.
   * Omit on hub pages; they use the week named by ?from= or this week.
   */
  target: { type: Object, default: null },
  /** For chapter pages: 'read' or 'review' */
  step: { type: String, default: 'read' },
  classSlug: { type: String, default: 'research-methods' }
})

const route = useRoute()

const loc = computed(() => findTargetWeek(props.target, { from: route.query.from, classSlug: props.classSlug }))
const week = computed(() => loc.value.schedule.weeks[loc.value.weekIndex])
/** The class this week belongs to, whatever page the student is on (an Intro student reading a shared chapter stays in Intro). */
const klass = computed(() => classSlugForSchedule(loc.value.schedule))
const ref = computed(() => weekRef(loc.value.schedule, loc.value.weekIndex))

const weekLink = computed(() => ({
  path: `/class/${klass.value}`,
  query: {
    semester: semesterQuery(loc.value.schedule),
    week: loc.value.weekIndex + 1
  }
}))

function itemLink(item) {
  const from = { from: ref.value }
  if (item.kind === 'assignment-help') return { path: `/class/${klass.value}/assignment-help/${item.assignmentId}`, query: from }
  if (item.kind === 'study-plan') return { path: `/class/${klass.value}/study-plan/${item.sectionId}`, query: from }
  if (item.kind === 'software') return softwareLink(item, { classSlug: klass.value, from: ref.value })
  if (item.kind === 'lab' || item.kind === 'analysis') return { path: `/class/${klass.value}`, query: { module: item.moduleId } }
  return null
}

/**
 * Reading and review first, then the deliverables, then a help page you are already on.
 * Each step has a `role` so "done" and "next up" can follow the student's flow.
 */
const steps = computed(() => {
  const out = []
  week.value.items.forEach((item) => {
    if (item.kind !== 'chapter') return
    const links = chapterLinks(loc.value.schedule, item, { classSlug: klass.value, from: ref.value })
    const n = links.n
    if (!n) return
    const onChapter = props.target?.kind === 'chapter' && props.target.id === n
    out.push({
      key: `read-${n}`,
      role: 'read',
      label: `Read ${links.name}`,
      to: links.read,
      current: onChapter && props.step === 'read'
    })
    out.push({
      key: `review-${n}`,
      role: 'review',
      label: 'Concept Review',
      to: links.review,
      current: onChapter && props.step === 'review'
    })
  })
  week.value.items.forEach((item, i) => {
    if (item.kind === 'chapter') return
    const here = itemMatches(item, props.target)
    if (item.role === 'do' || here) {
      out.push({
        key: `item-${i}`,
        role: item.role === 'help' ? 'help' : 'do',
        label: item.label,
        due: item.due,
        to: itemLink(item),
        current: here
      })
    }
  })
  return out
})

const currentIndex = computed(() => steps.value.findIndex((s) => s.current))
/** A check mark means "you just came through this" and only makes sense in the Read, then Review flow. */
const inReadingFlow = computed(() => ['read', 'review'].includes(steps.value[currentIndex.value]?.role))
const isDone = (i) => inReadingFlow.value && i < currentIndex.value

const next = computed(() => {
  const all = steps.value
  const firstDeliverable = all.find((s) => s.role === 'do' && !s.current)
  if (currentIndex.value < 0) return firstDeliverable || all[0] || null
  if (all[currentIndex.value].role === 'help') return firstDeliverable || null
  return all[currentIndex.value + 1] || null
})

/** The Stuck? page, opened on this page's assignment (or this week's help page) with the week and where the student was. */
const help = computed(() => {
  const own = props.target?.kind === 'assignment-help' ? props.target.id : null
  const item = week.value.items.find((it) => it.kind === 'assignment-help')
  const topic = own || item?.assignmentId
  return {
    path: `/class/${klass.value}/stuck`,
    query: { ...(topic ? { topic } : {}), from: ref.value, page: route.fullPath }
  }
})

function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
</script>

<style scoped>
.wcb {
  margin: 1rem 0 1.25rem;
  padding: 0.875rem 1.125rem;
  border: 1px solid var(--border);
  border-left: 4px solid var(--primary, #dc2626);
  border-radius: 12px;
  background: var(--bg-main);
}
.wcb-top { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.375rem 1rem; font-size: 0.875rem; }
.wcb-week { color: var(--text-primary); font-weight: 600; text-decoration: none; }
.wcb-week:hover, .wcb-help:hover { text-decoration: underline; }
.wcb-help { color: #60a5fa; text-decoration: none; }
.wcb-steps { display: flex; flex-wrap: wrap; gap: 0.375rem 1.25rem; margin: 0.75rem 0; padding: 0; list-style: none; font-size: 0.9rem; }
.wcb-steps li { display: inline-flex; align-items: center; gap: 0.4rem; color: var(--text-muted); }
.wcb-steps a { color: inherit; text-decoration: none; }
.wcb-steps a:hover { text-decoration: underline; }
.wcb-steps li.current { color: var(--text-primary); font-weight: 600; }
.wcb-steps li.done { color: #22c55e; }
.wcb-steps small { color: var(--text-muted); font-weight: 400; }
.wcb-n {
  display: inline-grid;
  place-items: center;
  width: 1.35rem;
  height: 1.35rem;
  border: 2px solid currentColor;
  border-radius: 50%;
  font-size: 0.7rem;
  font-weight: 700;
}
.wcb-steps li.current .wcb-n { background: var(--primary, #dc2626); border-color: var(--primary, #dc2626); color: #fff; }
.wcb-next { display: flex; flex-wrap: wrap; align-items: center; gap: 0.5rem 0.75rem; font-size: 0.9rem; color: var(--text-secondary); }
.wcb-go {
  padding: 0.35rem 0.875rem;
  border-radius: 8px;
  background: var(--primary, #dc2626);
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}
.wcb-go.plain { background: transparent; border: 2px dashed var(--border); color: var(--text-primary); }
@media print { .wcb { display: none; } }
</style>
