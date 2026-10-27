<template>
  <div class="rm-tl" role="group" :aria-label="`${schedule.course} timeline`">
    <div class="rm-tl-scroll" ref="scrollEl">
      <div class="rm-tl-inner">
        <div class="rm-tl-bands">
          <div
            v-for="phase in schedule.phases"
            :key="phase.label"
            class="rm-tl-band"
            :class="{ current: currentWeek >= phase.from && currentWeek <= phase.to }"
            :style="{
              left: `${(phase.from / weekCount) * 100}%`,
              width: `calc(${((phase.to - phase.from + 1) / weekCount) * 100}% - 3px)`
            }"
            :title="phase.label"
          >
            {{ phase.label }}
          </div>
        </div>

        <div class="rm-tl-line">
          <div class="rm-tl-rail" />
          <div class="rm-tl-progress" :style="{ width: `${progress}%` }" />
          <button
            v-for="(week, i) in schedule.weeks"
            :key="`w${i}`"
            type="button"
            class="rm-tl-week"
            :class="{
              past: i < currentWeek || state === 'after',
              minor: schedule.minorWeeks.includes(i),
              now: state === 'during' && i === currentWeek,
              selected: i === selectedWeek
            }"
            :style="{ left: `${xPct(i)}%` }"
            :aria-label="`Week ${i + 1}, ${week.title}, ${formatDate(week.start)}`"
            :aria-current="i === selectedWeek ? 'true' : undefined"
            :title="`Week ${i + 1} · ${formatDate(week.start)}${schedule.minorWeeks.includes(i) ? ' · progress report' : ''}`"
            @click="$emit('select-week', i)"
          />
          <button
            v-for="(m, k) in schedule.milestones"
            :key="`m${k}`"
            type="button"
            class="rm-tl-badge"
            :class="{
              past: m.week < currentWeek || state === 'after',
              selected: m.week === selectedWeek
            }"
            :style="{ left: `${xPct(m.week, m.dx)}%` }"
            :aria-label="`${m.label}, ${m.dateLabel}`"
            @click="$emit('select-week', m.week)"
          >
            <MilestoneIcon :name="m.icon" />
          </button>
          <div
            v-if="state === 'during'"
            class="rm-tl-today"
            :style="{ left: `${xPct(currentWeek)}%` }"
          />
        </div>

        <div class="rm-tl-labels">
          <template v-for="(m, k) in schedule.milestones" :key="`l${k}`">
            <div class="rm-tl-stem" :style="{ left: `${xPct(m.week, m.dx)}%`, height: `${(k % 3) * 34 + 4}px` }" />
            <div class="rm-tl-label" :style="{ left: `${xPct(m.week, m.dx)}%`, top: `${(k % 3) * 34 + 4}px` }">
              {{ m.label }}
              <small>{{ m.dateLabel }}</small>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="rm-tl-legend">
      <span><i class="rm-tl-key" />Class week</span>
      <span v-if="schedule.minorWeeks.length"><i class="rm-tl-key amber" />Progress report</span>
      <span>Badge = graded milestone (green when done)</span>
    </div>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import MilestoneIcon from './MilestoneIcon.vue'

const props = defineProps({
  schedule: { type: Object, required: true },
  selectedWeek: { type: Number, default: 0 },
  currentWeek: { type: Number, default: 0 },
  /** 'before' | 'during' | 'after' relative to the semester */
  state: { type: String, default: 'during' }
})

defineEmits(['select-week'])

const scrollEl = ref(null)
const weekCount = computed(() => props.schedule.weeks.length)

function xPct(week, dx = 0) {
  return (((week + 0.5 + dx) / weekCount.value) * 100).toFixed(3)
}

const progress = computed(() => {
  if (props.state === 'before') return 0
  if (props.state === 'after') return 100
  return ((props.currentWeek + 0.5) / weekCount.value) * 100
})

function formatDate(iso) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** Centre on this week while the semester is running, otherwise start at the left edge. */
function positionScroll() {
  const el = scrollEl.value
  if (!el) return
  el.scrollLeft = props.state === 'during'
    ? Math.max(0, el.scrollWidth * (props.currentWeek / weekCount.value) - el.clientWidth / 2)
    : 0
}

onMounted(positionScroll)
watch(() => props.schedule, () => nextTick(positionScroll))
</script>

<style scoped>
.rm-tl { --rm-amber: #f59e0b; }
.rm-tl-scroll { overflow-x: auto; padding: 0 28px 0.4rem; }
.rm-tl-inner { position: relative; min-width: 840px; }

.rm-tl-bands { position: relative; height: 38px; }
.rm-tl-band {
  position: absolute;
  top: 0;
  height: 100%;
  padding: 3px 5px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--bg-main);
  color: var(--text-secondary);
  font-size: 0.65rem;
  line-height: 1.15;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
}
.rm-tl-band.current {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 12%, var(--bg-main));
  color: var(--text-primary);
}

.rm-tl-line { position: relative; height: 54px; }
.rm-tl-rail, .rm-tl-progress {
  position: absolute;
  left: 0;
  top: 26px;
  height: 3px;
  border-radius: 2px;
}
.rm-tl-rail { right: 0; background: var(--border); }
.rm-tl-progress { background: var(--primary); }

.rm-tl-week {
  position: absolute;
  top: 22px;
  width: 11px;
  height: 11px;
  margin-left: -5.5px;
  padding: 0;
  transform: rotate(45deg);
  background: var(--bg-card);
  border: 2px solid var(--text-muted);
  border-radius: 2px;
  opacity: 0.8;
  cursor: pointer;
}
.rm-tl-week.past { background: var(--text-muted); }
.rm-tl-week.minor { background: var(--rm-amber); border-color: var(--rm-amber); opacity: 1; }
.rm-tl-week.now { border-color: var(--primary); opacity: 1; }
.rm-tl-week:hover { opacity: 1; outline: 2px solid var(--text-primary); }
.rm-tl-week.selected {
  background: var(--primary);
  border-color: var(--primary);
  opacity: 1;
  outline: 3px solid color-mix(in srgb, var(--primary) 25%, transparent);
}

.rm-tl-badge {
  position: absolute;
  top: 8px;
  z-index: 2;
  width: 38px;
  height: 38px;
  margin-left: -19px;
  padding: 0;
  display: grid;
  place-items: center;
  border: 3px solid var(--rm-amber);
  border-radius: 50%;
  background: var(--bg-card);
  color: var(--rm-amber);
  box-shadow: 0 0 0 4px var(--bg-card);
  cursor: pointer;
  transition: transform 0.15s;
}
.rm-tl-badge:hover { transform: scale(1.1); }
.rm-tl-badge.past { border-color: var(--success); color: var(--success); }
.rm-tl-badge.selected {
  border-color: var(--primary);
  color: var(--primary-text);
  background: color-mix(in srgb, var(--primary) 12%, var(--bg-card));
}

.rm-tl-today {
  position: absolute;
  top: -6px;
  height: 66px;
  width: 2px;
  margin-left: -1px;
  background: var(--primary);
  pointer-events: none;
}
.rm-tl-today::after {
  content: 'today';
  position: absolute;
  top: -2px;
  left: 4px;
  font-size: 0.625rem;
  color: var(--primary-light);
}

.rm-tl-labels { position: relative; height: 112px; }
.rm-tl-stem { position: absolute; top: 0; width: 1px; background: var(--border); }
.rm-tl-label {
  position: absolute;
  width: 84px;
  margin-left: -42px;
  text-align: center;
  font-size: 0.6875rem;
  line-height: 1.2;
  color: var(--text-primary);
  pointer-events: none;
}
.rm-tl-label small {
  display: block;
  color: var(--text-muted);
  font-size: 0.625rem;
}

.rm-tl-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1.125rem;
  margin-top: 0.625rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
}
.rm-tl-key {
  display: inline-block;
  width: 9px;
  height: 9px;
  margin-right: 7px;
  transform: rotate(45deg);
  border: 2px solid var(--text-muted);
  border-radius: 2px;
}
.rm-tl-key.amber { background: var(--rm-amber); border-color: var(--rm-amber); }
</style>
