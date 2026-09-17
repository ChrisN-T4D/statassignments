<template>
  <div class="sel-viz">
    <p v-if="animating" class="live-label">
      {{ pickLabel || 'Selecting now… watch tiles light up' }}
    </p>
    <div v-if="showRosterMap" class="roster-map-wrap">
      <p class="walk-caption">{{ rosterMapCaption }}</p>
      <div class="roster-map" role="img" :aria-label="'Pick positions on full roster'">
        <div class="roster-map-track">
          <span class="roster-map-end">1</span>
          <span class="roster-map-end roster-map-end-right">{{ rosterSize }}</span>
          <div
            v-if="method === 'sys' && sysInterval > 0"
            v-for="tick in sysTicks"
            :key="'tick' + tick"
            class="roster-map-tick"
            :style="{ left: rosterPct(tick) }"
          />
        </div>
        <div
          v-for="mark in rosterMapMarks"
          :key="'rm' + mark.rosterIndex + mark.action"
          class="roster-map-mark"
          :class="{
            'mark-in': mark.action === 'in' || mark.action === 'pool',
            'mark-skip': mark.action === 'skip',
            'mark-retry': mark.action === 'retry',
            'mark-strat-0': mark.stratum === 0,
            'mark-strat-1': mark.stratum === 1,
            'mark-strat-2': mark.stratum === 2,
            'mark-strat-3': mark.stratum === 3,
            'mark-pulse': mark.rosterIndex === pulseIndex,
          }"
          :style="{ left: rosterPct(mark.rosterIndex) }"
          :title="mapMarkTitle(mark)"
        />
      </div>
      <div class="walk-legend">
        <span><i class="leg leg-in" /> In sample</span>
        <span v-if="method === 'quota'"><i class="leg leg-skip" /> Passed over</span>
        <span v-if="hasRetries"><i class="leg leg-retry" /> Duplicate draw (SRS)</span>
        <span v-if="method === 'sys' && sysInterval">Every {{ sysInterval }} rows after random start</span>
      </div>
    </div>
    <div v-else-if="showListWalkStrip" class="walk-strip-wrap">
      <p class="walk-caption">{{ walkCaption }}</p>
      <div class="walk-strip" role="img" :aria-label="'Selection walk'">
        <div
          v-for="(step, i) in walkSteps"
          :key="'ws' + i"
          class="walk-tile"
          :class="{
            'walk-in': step.action === 'in',
            'walk-skip': step.action === 'skip',
            'walk-pulse': step.rosterIndex === pulseIndex,
          }"
          :title="'Row #' + (step.rosterIndex + 1)"
        />
      </div>
      <div class="walk-legend">
        <span><i class="leg leg-in" /> In sample</span>
        <span v-if="method === 'quota'"><i class="leg leg-skip" /> Passed over</span>
      </div>
    </div>
    <div
      v-if="usePositionGrid"
      ref="gridEl"
      class="roster-grid roster-pos-grid"
      role="img"
      aria-label="Full roster in list order — selections at true list positions"
      :style="{ gridTemplateColumns: 'repeat(' + gridPosCols + ', 1fr)' }"
    >
      <div
        v-for="cell in cells"
        :key="'c' + cell.rosterIndex"
        :ref="(el) => setCellRef(cell.rosterIndex, el)"
        class="roster-cell pos-slot"
        :class="{
          'dorm-start': dormSize > 0 && cell.rosterIndex % dormSize === 0,
          'cell-in': highlightIndices.includes(cell.rosterIndex),
          'cell-skip': skipIndices.includes(cell.rosterIndex),
          'cell-pulse': cell.rosterIndex === pulseIndex,
          'cell-retry': cell.rosterIndex === pulseIndex && pickLabel.toLowerCase().includes('redraw'),
        }"
        :style="{ background: posSlotBg(cell) }"
        :title="'#' + cell.pos + ', score ' + cell.score.toFixed(1)"
      >
        <span v-if="rankMap.has(cell.rosterIndex)" class="rank-chip">
          #{{ rankMap.get(cell.rosterIndex) }}
        </span>
      </div>
    </div>
    <div
      v-else
      ref="gridEl"
      class="roster-grid"
      role="img"
      aria-label="Roster selection preview"
    >
      <div
        v-for="cell in cells"
        :key="'c' + cell.rosterIndex"
        :ref="(el) => setCellRef(cell.rosterIndex, el)"
        class="roster-cell"
        :class="{
          'dorm-start': dormSize > 0 && cell.rosterIndex % dormSize === 0,
          'cell-in': highlightIndices.includes(cell.rosterIndex),
          'cell-skip': skipIndices.includes(cell.rosterIndex),
          'cell-pulse': cell.rosterIndex === pulseIndex,
        }"
        :style="{ background: scoreColor(cell.score) }"
        :title="'#' + cell.pos + ', score ' + cell.score.toFixed(1)"
      />
    </div>
    <p v-if="usePositionGrid" class="grid-note">
      Full roster (list order, left→right then next row). Blue rings = in sample at that list row.
    </p>
    <p v-else-if="truncated" class="grid-note">Prefix of roster plus selected rows; full N used in draws.</p>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { isListWalkMethod, scoreColor } from '../../lib/samplingSim.js'

const props = defineProps({
  cells: { type: Array, default: () => [] },
  dormSize: { type: Number, default: 0 },
  highlightIndices: { type: Array, default: () => [] },
  skipIndices: { type: Array, default: () => [] },
  pulseIndex: { type: Number, default: null },
  pickLabel: { type: String, default: '' },
  animating: { type: Boolean, default: false },
  method: { type: String, default: 'srs' },
  walkSteps: { type: Array, default: () => [] },
  rankMap: { type: Map, default: () => new Map() },
  truncated: { type: Boolean, default: false },
  gridLayout: { type: String, default: 'list' },
  gridPosCols: { type: Number, default: 80 },
  sysInterval: { type: Number, default: null },
  rosterSize: { type: Number, default: 0 },
})

const walkSteps = computed(() => props.walkSteps.slice(-72))
const usePositionGrid = computed(() => props.gridLayout === 'position')

const cellByIndex = computed(() => {
  const m = new Map()
  for (const c of props.cells) m.set(c.rosterIndex, c)
  return m
})

const rosterMapMarks = computed(() => {
  if (isListWalkMethod(props.method)) return []
  const byIdx = new Map()
  for (const step of props.walkSteps) {
    if (step.action === 'retry') {
      byIdx.set(step.rosterIndex, {
        rosterIndex: step.rosterIndex,
        action: 'retry',
        stratum: cellByIndex.value.get(step.rosterIndex)?.stratum,
      })
    }
  }
  for (const idx of props.skipIndices) {
    if (!byIdx.has(idx)) {
      byIdx.set(idx, {
        rosterIndex: idx,
        action: 'skip',
        stratum: cellByIndex.value.get(idx)?.stratum,
      })
    }
  }
  for (const idx of props.highlightIndices) {
    byIdx.set(idx, {
      rosterIndex: idx,
      action: 'in',
      stratum: cellByIndex.value.get(idx)?.stratum,
    })
  }
  return [...byIdx.values()].sort((a, b) => a.rosterIndex - b.rosterIndex)
})

const showListWalkStrip = computed(
  () => isListWalkMethod(props.method) && walkSteps.value.length > 0
)
const showRosterMap = computed(
  () =>
    !isListWalkMethod(props.method) &&
    props.rosterSize > 1 &&
    (rosterMapMarks.value.length > 0 || props.animating)
)
const hasRetries = computed(() => rosterMapMarks.value.some((s) => s.action === 'retry'))

const sysTicks = computed(() => {
  if (props.method !== 'sys' || !props.sysInterval || !props.highlightIndices.length) return []
  const sorted = [...props.highlightIndices].sort((a, b) => a - b)
  const start = sorted[0]
  const ticks = []
  for (let i = start; i < props.rosterSize; i += props.sysInterval) ticks.push(i)
  return ticks.slice(0, 120)
})

const walkCaption = computed(() => {
  if (props.method === 'quota') return 'List walk (in vs passed over)'
  return 'First n* list positions'
})

const rosterMapCaption = computed(() => {
  if (props.method === 'sys') return 'Systematic: evenly spaced rows on the registrar list (after random start)'
  if (props.method === 'strat') return 'Stratified: random rows within each class year (colored by year)'
  if (props.method === 'clust' || props.method === 'stage') return 'Cluster: whole dorms / stage-2 picks spread on list'
  if (props.method === 'purposive') return 'Purposive: highest scorers — can sit anywhere on the list'
  return 'SRS: each dot is one randomly chosen roster row (scattered on the list)'
})

function rosterPct(idx) {
  if (props.rosterSize <= 1) return '0%'
  return `${(idx / (props.rosterSize - 1)) * 100}%`
}

function posSlotBg(cell) {
  if (props.highlightIndices.includes(cell.rosterIndex)) return scoreColor(cell.score)
  return `color-mix(in srgb, ${scoreColor(cell.score)} 22%, #eef2f7)`
}

function mapMarkTitle(mark) {
  const row = mark.rosterIndex + 1
  if (mark.action === 'retry') return `Row #${row} — duplicate draw, not in sample`
  if (mark.action === 'skip') return `Row #${row} — passed over`
  if (mark.action === 'pool') return `Row #${row} — in stage-1 pool`
  if (mark.stratum != null && props.method === 'strat') {
    return `Row #${row} — in sample (class year ${mark.stratum + 1})`
  }
  return `Row #${row} — in sample`
}

const gridEl = ref(null)
const cellRefs = ref({})

function setCellRef(rosterIndex, el) {
  if (el) cellRefs.value[rosterIndex] = el
}

watch(
  () => props.pulseIndex,
  async (idx) => {
    if (idx == null || !props.animating) return
    await nextTick()
    const el = cellRefs.value[idx]
    el?.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }
)
</script>

<style scoped>
.sel-viz {
  margin-top: 0.75rem;
}
.live-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #2563eb;
  margin: 0 0 0.5rem;
  animation: pulse-text 1s ease-in-out infinite;
}
@keyframes pulse-text {
  50% { opacity: 0.65; }
}
.roster-map-wrap,
.walk-strip-wrap {
  margin-bottom: 0.65rem;
}
.walk-caption {
  font-size: 0.78rem;
  color: var(--text-muted, #64748b);
  margin: 0 0 0.35rem;
}
.roster-map {
  position: relative;
  height: 32px;
  margin: 0 2px 14px;
}
.roster-map-track {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  height: 8px;
  transform: translateY(-50%);
  background: linear-gradient(90deg, #e2e8f0, #cbd5e1);
  border-radius: 4px;
}
.roster-map-tick {
  position: absolute;
  top: -4px;
  width: 1px;
  height: 16px;
  background: rgba(100, 116, 139, 0.45);
  transform: translateX(-50%);
}
.roster-map-end {
  position: absolute;
  top: 100%;
  font-size: 0.65rem;
  color: var(--text-muted, #64748b);
  margin-top: 2px;
}
.roster-map-end-right {
  right: 0;
}
.roster-map-mark {
  position: absolute;
  top: 50%;
  width: 9px;
  height: 9px;
  margin-left: -4.5px;
  transform: translateY(-50%);
  border-radius: 50%;
  background: #2563eb;
  opacity: 0.9;
  z-index: 1;
}
.roster-map-mark.mark-skip {
  background: #94a3b8;
  opacity: 0.55;
}
.roster-map-mark.mark-retry {
  background: #ef4444;
  width: 7px;
  height: 7px;
  margin-left: -3.5px;
}
.roster-map-mark.mark-strat-0 { background: #3b82f6; }
.roster-map-mark.mark-strat-1 { background: #6366f1; }
.roster-map-mark.mark-strat-2 { background: #8b5cf6; }
.roster-map-mark.mark-strat-3 { background: #a855f7; }
.roster-map-mark.mark-pulse {
  width: 13px;
  height: 13px;
  margin-left: -6.5px;
  box-shadow: 0 0 0 2px #f59e0b;
  z-index: 2;
  opacity: 1;
}
.walk-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 48px;
  overflow: auto;
  padding: 4px;
  background: var(--bg-subtle, #f1f5f9);
  border-radius: 4px;
}
.walk-tile {
  width: 10px;
  height: 10px;
  border-radius: 1px;
  background: #cbd5e1;
}
.walk-tile.walk-in { background: #2563eb; }
.walk-tile.walk-skip {
  background: repeating-linear-gradient(
    -45deg,
    #94a3b8,
    #94a3b8 1px,
    #e2e8f0 1px,
    #e2e8f0 2px
  );
}
.walk-tile.walk-pulse {
  box-shadow: 0 0 0 2px #f59e0b;
  transform: scale(1.15);
}
.walk-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  font-size: 0.72rem;
  margin-top: 0.25rem;
  color: var(--text-muted, #64748b);
}
.leg {
  display: inline-block;
  width: 10px;
  height: 10px;
  vertical-align: middle;
  margin-right: 3px;
  border-radius: 1px;
}
.leg-in { background: #2563eb; }
.leg-retry { background: #ef4444; border-radius: 50%; }
.leg-skip {
  background: repeating-linear-gradient(-45deg, #94a3b8, #94a3b8 1px, #e2e8f0 1px, #e2e8f0 2px);
}
.roster-grid {
  padding: 4px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  background: #fff;
}
.roster-pos-grid {
  display: grid;
  gap: 1px;
  max-height: 200px;
  overflow: auto;
}
.roster-grid:not(.roster-pos-grid) {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 140px;
  overflow: auto;
}
.pos-slot {
  width: 100%;
  aspect-ratio: 1;
  min-width: 0;
  min-height: 0;
}
.roster-cell {
  border-radius: 1px;
  position: relative;
}
.roster-grid:not(.roster-pos-grid) .roster-cell {
  width: 16px;
  height: 16px;
  border-radius: 2px;
}
.roster-cell.dorm-start {
  outline: 1px solid rgba(0, 0, 0, 0.2);
}
.roster-cell.cell-in {
  box-shadow: 0 0 0 1.5px #2563eb;
  z-index: 1;
}
.roster-cell.cell-skip {
  opacity: 0.45;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.35) 2px,
    rgba(0, 0, 0, 0.35) 4px
  ) !important;
}
.roster-cell.cell-pulse {
  box-shadow: 0 0 0 2px #f59e0b;
  z-index: 2;
  transform: scale(1.35);
}
.roster-cell.cell-retry {
  box-shadow: 0 0 0 2px #ef4444;
}
.rank-chip {
  position: absolute;
  inset: 0;
  font-size: 6px;
  font-weight: 700;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: 0 0 2px #000;
}
.grid-note {
  font-size: 0.75rem;
  color: var(--text-muted, #64748b);
  margin: 0.35rem 0 0;
}
</style>
