<template>
  <div class="rm-more">
    <details class="rm-more-box">
      <summary>All weeks</summary>
      <div class="rm-more-in">
        <button
          v-for="(week, i) in schedule.weeks"
          :key="i"
          type="button"
          class="rm-row"
          :class="{ sel: i === selectedWeek }"
          @click="$emit('select-week', i)"
        >
          <span class="rm-row-n">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="rm-row-main">
            <b>{{ week.title }}</b>
            <span v-if="dueFor(week)" class="rm-row-badge">{{ dueFor(week) }}</span>
            <span v-if="week.note" class="rm-row-badge off">{{ week.note }}</span>
            <span class="rm-row-dates">{{ formatDate(week.start) }}</span>
          </span>
          <span class="rm-row-r" :class="{ ok: statusOf(i) === 'past' }">
            {{ statusOf(i) === 'past' ? '✓' : statusOf(i) === 'cur' ? 'this week' : `${week.items.length} items` }}
          </span>
        </button>
      </div>
    </details>

    <details class="rm-more-box">
      <summary>Chapter library</summary>
      <div class="rm-more-in">
        <p class="rm-lib-note">Chapters 1–8 are fall (PSYC 4223); 9–13 are spring (PSYC 4233). Choosing one jumps to its week.</p>
        <div class="rm-lib">
          <button
            v-for="c in chapters"
            :key="`${c.slug}-${c.weekIndex}-${c.n}`"
            type="button"
            class="rm-chip"
            @click="$emit('select-chapter', c.slug, c.weekIndex)"
          >
            Ch. {{ c.n }} {{ c.title }}
            <span class="rm-chip-badge">{{ c.course }}</span>
          </button>
        </div>
      </div>
    </details>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { RESEARCH_METHODS_SCHEDULES, chapterNumber } from '../data/researchMethodsSchedule'

const props = defineProps({
  schedule: { type: Object, required: true },
  selectedWeek: { type: Number, default: 0 },
  currentWeek: { type: Number, default: 0 },
  /** 'before' | 'during' | 'after' relative to the semester */
  state: { type: String, default: 'during' }
})

defineEmits(['select-week', 'select-chapter'])

function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function statusOf(i) {
  if (props.state === 'after') return 'past'
  if (props.state === 'before') return 'future'
  if (i === props.currentWeek) return 'cur'
  return i < props.currentWeek ? 'past' : 'future'
}

function dueFor(week) {
  const item = week.items.find((it) => it.role === 'do' && it.due)
  return item ? item.label : ''
}

/** Every chapter once, in chapter order, across both semesters. */
const chapters = computed(() => {
  const out = []
  Object.values(RESEARCH_METHODS_SCHEDULES).forEach((sched) => {
    sched.weeks.forEach((w, weekIndex) => {
      w.items.forEach((it) => {
        const n = it.kind === 'chapter' ? chapterNumber(it) : null
        if (n) {
          out.push({ n, slug: sched.slug, weekIndex, course: sched.course, title: w.title })
        }
      })
    })
  })
  const seen = new Set()
  return out
    .filter((c) => (seen.has(c.n) ? false : seen.add(c.n)))
    .sort((a, b) => a.n - b.n)
})
</script>

<style scoped>
.rm-more { display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1.5rem; }
.rm-more-box { border: 1px solid var(--border); border-radius: 12px; background: var(--bg-main); }
.rm-more-box > summary {
  display: flex;
  justify-content: space-between;
  padding: 0.875rem 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  cursor: pointer;
  list-style: none;
}
.rm-more-box > summary::-webkit-details-marker { display: none; }
.rm-more-box > summary::after { content: 'Show'; font-weight: 500; font-size: 0.8rem; color: var(--text-muted); }
.rm-more-box[open] > summary::after { content: 'Hide'; }
.rm-more-in { display: flex; flex-direction: column; gap: 0.375rem; padding: 0 1.25rem 1.125rem; }

.rm-row {
  display: grid;
  grid-template-columns: 2.25rem 1fr auto;
  gap: 0.25rem 0.75rem;
  align-items: center;
  width: 100%;
  padding: 0.55rem 0.75rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--text-primary);
  font: inherit;
  text-align: left;
  cursor: pointer;
}
.rm-row:hover { border-color: var(--primary, #dc2626); }
.rm-row.sel { border-color: var(--primary, #dc2626); background: rgba(220, 38, 38, 0.08); }
.rm-row-n, .rm-row-r { font-size: 0.75rem; color: var(--text-muted); }
.rm-row-r { text-align: right; }
.rm-row-r.ok { color: #22c55e; }
.rm-row-main b { font-weight: 600; }
.rm-row-dates { display: block; font-size: 0.8rem; color: var(--text-muted); }
.rm-row-badge {
  margin-left: 0.5rem;
  padding: 1px 7px;
  border-radius: 4px;
  background: rgba(245, 158, 11, 0.12);
  color: #d97706;
  font-size: 0.7rem;
}
.rm-row-badge.off { background: var(--border); color: var(--text-muted); }
@media (max-width: 520px) {
  .rm-row { grid-template-columns: 1.75rem 1fr; }
  .rm-row-r { grid-column: 2; text-align: left; }
}

.rm-lib-note { margin: 0 0 0.5rem; font-size: 0.85rem; color: var(--text-muted); }
.rm-lib { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.rm-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border: 2px solid var(--border);
  border-radius: 8px;
  background: transparent;
  color: var(--text-primary);
  font: inherit;
  font-size: 0.875rem;
  cursor: pointer;
}
.rm-chip:hover { border-color: #60a5fa; }
.rm-chip-badge {
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(96, 165, 250, 0.15);
  color: #60a5fa;
  font-size: 0.65rem;
  font-weight: 600;
}
</style>
