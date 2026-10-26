<template>
  <section class="rm-week" :aria-label="`Week ${weekNumber}: ${week.title}`">
    <div class="rm-week-head">
      <div>
        <div class="rm-week-eyebrow">{{ eyebrow }}</div>
        <h2>Week {{ weekNumber }} · {{ week.title }}</h2>
        <div class="rm-week-range">
          {{ formatDate(week.start) }}–{{ formatDate(addDays(week.start, 4)) }}<template v-if="week.note"> · {{ week.note }}</template>
        </div>
      </div>
      <div class="rm-week-steppers">
        <button type="button" class="rm-week-step" :disabled="!hasPrev" @click="$emit('step', -1)">← Prev</button>
        <button type="button" class="rm-week-step" :disabled="!hasNext" @click="$emit('step', 1)">Next →</button>
      </div>
    </div>

    <div v-if="dueNote" class="rm-week-due">{{ dueNote }}</div>

    <p v-if="week.why" class="rm-week-why">{{ week.why }}</p>

    <div class="rm-week-items">
      <template v-for="(item, i) in week.items" :key="i">
        <router-link v-if="linkFor(item)" :to="linkFor(item)" class="rm-item" :class="`rm-item-${item.role}`">
          <span class="rm-item-label">{{ itemLabel(item) }}</span>
          <span class="rm-item-badge">{{ roleName(item) }}</span>
        </router-link>
        <span v-else class="rm-item rm-item-plain" :class="`rm-item-${item.role}`" :title="item.note">
          <span class="rm-item-label">{{ itemLabel(item) }}</span>
          <span class="rm-item-badge">{{ roleName(item) }}</span>
        </span>
        <router-link
          v-if="reviewLink(item)"
          :to="reviewLink(item)"
          class="rm-item rm-item-check"
        >
          <span class="rm-item-label">{{ reviewLabel(item) }}</span>
          <span class="rm-item-badge">Review</span>
        </router-link>
      </template>
    </div>

    <div v-if="refresher.length" class="rm-week-refresher">
      <h3>Quick refresher</h3>
      <p>These earlier ideas need another look before you build on them.</p>
      <ul>
        <li v-for="o in refresher" :key="o.objectiveId">
          <router-link :to="refresherLink(o)">{{ o.objective }}</router-link>
          <small>{{ o.mastery }}% so far</small>
        </li>
      </ul>
    </div>

    <div v-if="outcomes.shown.length" class="rm-week-outcomes">
      <h3>By the end of this week you can</h3>
      <ul>
        <li v-for="o in outcomes.shown" :key="o.objectiveId">{{ o.objective }}</li>
      </ul>
      <details v-if="outcomes.rest.length">
        <summary>{{ outcomes.rest.length }} more from this week's reading</summary>
        <ul>
          <li v-for="o in outcomes.rest" :key="o.objectiveId">{{ o.objective }}</li>
        </ul>
      </details>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { chapterLinks, RESEARCH_METHODS_SCHEDULES, softwareLink, weekRef } from '../data/researchMethodsSchedule'
import { getObjectivesByModule } from '../data/objectives'
import { weekObjectives } from '../lib/weekObjectives'
import { pickRefresher } from '../lib/refresher'
import { getAllBKTStates } from '../composables/useBKT'
import { objectives } from '../data/objectives'

const props = defineProps({
  week: { type: Object, required: true },
  weekNumber: { type: Number, required: true },
  /** Schedule slug, so reading/review pages can link back to this week */
  scheduleSlug: { type: String, default: '' },
  classSlug: { type: String, required: true },
  /** 'cur' | 'past' | 'future' */
  status: { type: String, default: 'future' },
  hasPrev: { type: Boolean, default: true },
  hasNext: { type: Boolean, default: true }
})

defineEmits(['step'])

const ROLE_NAME = { read: 'Chapter', do: 'Do', help: 'Help' }

const schedule = computed(() => RESEARCH_METHODS_SCHEDULES[props.scheduleSlug])
const readName = computed(() => (schedule.value?.reading === 'stats' ? 'Module' : 'Chapter'))
function roleName(item) {
  return item.role === 'read' ? readName.value : ROLE_NAME[item.role]
}
function chapter(item) {
  return chapterLinks(schedule.value || {}, item, { classSlug: props.classSlug, from: fromQuery().from })
}

const eyebrow = computed(() => {
  if (props.status === 'cur') return 'This week'
  return props.status === 'past' ? 'Earlier week' : 'Coming up'
})

function parse(iso) {
  return new Date(`${iso}T12:00:00`)
}

function addDays(iso, n) {
  const d = parse(iso)
  d.setDate(d.getDate() + n)
  return d
}

function formatDate(value) {
  const d = typeof value === 'string' ? parse(value) : value
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const dueNote = computed(() => {
  const item = props.week.items.find((it) => it.role === 'do' && it.due)
  if (!item) return ''
  const day = parse(item.due).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
  return `Due ${day}: ${item.label}`
})

// Only the current week, and only for students who have practiced something
const refresher = ref([])
watch(
  () => [props.status, props.weekNumber, props.scheduleSlug],
  async () => {
    refresher.value = []
    const sched = schedule.value
    if (props.status !== 'cur' || !sched) return
    try {
      const states = await getAllBKTStates()
      refresher.value = pickRefresher(states || {}, sched.weeks, props.weekNumber - 1, objectives)
    } catch {
      refresher.value = []
    }
  },
  { immediate: true }
)

function refresherLink(o) {
  return { path: `/class/${props.classSlug}/practice`, query: { module: o.moduleId, ...fromQuery() } }
}

const outcomes = computed(() => weekObjectives(props.week, (id) => getObjectivesByModule(id)))

function itemLabel(item) {
  if (item.kind === 'chapter' && !item.label) return chapter(item).name
  return item.label || ''
}

function fromQuery() {
  const sched = schedule.value
  return sched ? { from: weekRef(sched, props.weekNumber - 1) } : {}
}

/** Chapter items link to the chapter's reading page (Research Methods) or the module on the class page (Statistics). */
function linkFor(item) {
  if (item.kind === 'chapter') return chapter(item).read
  if (item.kind === 'software') return softwareLink(item, { classSlug: props.classSlug, from: fromQuery().from })
  if (item.kind === 'analysis' || item.kind === 'lab') return { path: `/class/${props.classSlug}`, query: { module: item.moduleId } }
  if (item.kind === 'assignment-help') return { path: `/class/${props.classSlug}/assignment-help/${item.assignmentId}`, query: fromQuery() }
  if (item.kind === 'study-plan') return { path: `/class/${props.classSlug}/study-plan/${item.sectionId}`, query: fromQuery() }
  return null
}

function reviewLabel(item) {
  return chapter(item).reviewLabel || 'Concept Review'
}

function reviewLink(item) {
  if (item.kind !== 'chapter') return null
  return chapter(item).review
}
</script>

<style scoped>
.rm-week {
  padding: 1.25rem 1.5rem;
  border: 1px solid var(--border);
  border-radius: 16px;
  background: var(--bg-main);
}
.rm-week-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 0.6rem 1rem; margin-bottom: 0.875rem; }
.rm-week-eyebrow { font-size: 0.8rem; font-weight: 600; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); }
.rm-week-head h2 { margin: 0.1rem 0 0; font-size: 1.25rem; color: var(--text-primary); }
.rm-week-range { margin-top: 0.25rem; font-size: 0.8rem; color: var(--text-muted); }
.rm-week-steppers { display: flex; gap: 0.375rem; }
.rm-week-why { margin: 0 0 0.875rem; color: var(--text-secondary); font-size: 0.95rem; line-height: 1.5; }
.rm-week-refresher { margin: 1rem 0 0; padding: 0.75rem 1rem; border-left: 3px solid var(--border); border-radius: 0 8px 8px 0; }
.rm-week-refresher h3 { margin: 0 0 0.25rem; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.rm-week-refresher p { margin: 0 0 0.4rem; font-size: 0.85rem; color: var(--text-muted); }
.rm-week-refresher ul { margin: 0; padding-left: 1.2rem; font-size: 0.9rem; line-height: 1.5; }
.rm-week-refresher a { color: var(--text-primary); text-decoration: underline; }
.rm-week-refresher small { margin-left: 0.5rem; color: var(--text-muted); }
.rm-week-outcomes { margin: 1rem 0 0; padding: 0.75rem 1rem; border-left: 3px solid var(--border); background: var(--bg-secondary, transparent); border-radius: 0 8px 8px 0; }
.rm-week-outcomes h3 { margin: 0 0 0.4rem; font-size: 0.85rem; font-weight: 600; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.04em; }
.rm-week-outcomes ul { margin: 0; padding-left: 1.2rem; font-size: 0.9rem; line-height: 1.5; color: var(--text-primary); }
.rm-week-outcomes details { margin-top: 0.4rem; font-size: 0.85rem; }
.rm-week-outcomes summary { cursor: pointer; color: var(--text-muted); }
.rm-week-step {
  padding: 0.3rem 0.75rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--text-primary);
  font: inherit;
  cursor: pointer;
}
.rm-week-step:hover:not(:disabled) { border-color: var(--primary, #dc2626); }
.rm-week-step:disabled { opacity: 0.4; cursor: default; }
.rm-week-due {
  margin-bottom: 0.875rem;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
  font-weight: 500;
  font-size: 0.9rem;
}
.rm-week-items { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.rm-item {
  --c: var(--text-muted);
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 0.875rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: var(--bg-card, var(--bg-main));
  color: var(--text-primary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: border-color 0.15s, background 0.15s;
}
a.rm-item:hover { border-color: var(--c); background: color-mix(in srgb, var(--c) 8%, transparent); }
.rm-item-plain { border-style: dashed; }
.rm-item-read { --c: #60a5fa; }
.rm-item-check { --c: #22c55e; }
.rm-item-do { --c: #f59e0b; }
.rm-item-help { --c: var(--text-muted); }
.rm-item-badge {
  padding: 2px 6px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--c) 18%, transparent);
  color: var(--c);
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  white-space: nowrap;
}
</style>
