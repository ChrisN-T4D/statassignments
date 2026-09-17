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
    <div v-if="useHeatmap" ref="heatmapEl" class="roster-heatmap-wrap">
      <p class="heatmap-caption">{{ heatmapCaption }}</p>
      <div class="roster-heatmap" role="img" aria-label="Full roster segments in list order">
        <div
          v-for="bin in heatmapBins"
          :key="'hb' + bin.b"
          class="heatmap-bin"
          :class="{
            'bin-in': bin.inSample,
            'bin-skip': bin.skipped,
            'bin-pulse': bin.isPulse,
          }"
          :style="{ background: scoreColor(bin.avgScore) }"
          :title="bin.title"
        />
      </div>
      <p class="grid-note">Left = list row 1, right = row {{ rosterSize }}. Blue top = sample includes someone in that segment.</p>
    </div>
    <div
      v-else-if="cells.length"
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
  truncated: { type: Boolean, default: false },
  heatmapBins: { type: Array, default: () => [] },
  sysInterval: { type: Number, default: null },
  rosterSize: { type: Number, default: 0 },
})

const walkSteps = computed(() => props.walkSteps.slice(-72))
const useHeatmap = computed(() => !isListWalkMethod(props.method) && props.heatmapBins.length > 0)

const rosterMapMarks = computed(() => {
  if (isListWalkMethod(props.method)) return []
  const byIdx = new Map()
  for (const step of props.walkSteps) {
    if (step.action === 'retry') {
      byIdx.set(step.rosterIndex, { rosterIndex: step.rosterIndex, action: 'retry' })
    }
  }
  for (const idx of props.skipIndices) {
    if (!byIdx.has(idx)) byIdx.set(idx, { rosterIndex: idx, action: 'skip' })
  }
  for (const idx of props.highlightIndices) {
    byIdx.set(idx, { rosterIndex: idx, action: 'in' })
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
  if (props.method === 'strat') return 'Stratified: random rows within each class year'
  if (props.method === 'clust' || props.method === 'stage') return 'Cluster: selected halls / stage-2 picks on the list'
  if (props.method === 'purposive') return 'Purposive: highest scorers — spread wherever they sit on the list'
  return 'SRS: each dot is one randomly chosen roster row'
})

const heatmapCaption = computed(() => {
  if (props.method === 'sys') return 'Systematic sample segments (even spacing along the list)'
  if (props.method === 'strat') return 'Stratified sample — picks scattered within each class-year slice'
  if (props.method === 'purposive') return 'Purposive sample — high-score students at their list positions'
  if (props.method === 'clust' || props.method === 'stage') return 'Cluster sample — whole dorm blocks on the list'
  return 'Simple random sample — picks scattered along the full registrar list'
})

function rosterPct(idx) {
  if (props.rosterSize <= 1) return '0%'
  return `${(idx / (props.rosterSize - 1)) * 100}%`
}

function mapMarkTitle(mark) {
  const row = mark.rosterIndex + 1
  if (mark.action === 'retry') return `Row #${row} — duplicate draw, not in sample`
  if (mark.action === 'skip') return `Row #${row} — passed over`
  return `Row #${row} — in sample`
}

const heatmapEl = ref(null)
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
    if (useHeatmap.value && heatmapEl.value) {
      const binIdx = props.heatmapBins.findIndex((b) => idx >= b.lo && idx <= b.hi)
      if (binIdx >= 0) {
        const el = heatmapEl.value.querySelectorAll('.heatmap-bin')[binIdx]
        el?.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
      }
      return
    }
    const el = cellRefs.value[idx]
    el?.scrollIntoView?.({ block: 'nearest', inline: 'nearest', behavior: 'smooth' })
  }
)

watch(
  () => props.animating,
  async (on) => {
    if (on) return
    await nextTick()
    if (heatmapEl.value) heatmapEl.value.scrollLeft = 0
    if (gridEl.value) gridEl.value.scrollTop = 0
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
.walk-strip-wrap,
.roster-heatmap-wrap {
  margin-bottom: 0.65rem;
}
.walk-caption,
.heatmap-caption {
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
.roster-map-mark.mark-skip { background: #94a3b8; opacity: 0.55; }
.roster-map-mark.mark-retry { background: #ef4444; width: 7px; height: 7px; margin-left: -3.5px; }
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
}
.roster-heatmap {
  display: flex;
  width: 100%;
  height: 52px;
  gap: 1px;
  overflow-x: auto;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  padding: 2px;
  background: #fff;
}
.heatmap-bin {
  flex: 1 1 0;
  min-width: 3px;
  border-radius: 1px;
  opacity: 0.88;
  box-sizing: border-box;
}
.heatmap-bin.bin-in {
  box-shadow: inset 0 -4px 0 #2563eb;
  opacity: 1;
}
.heatmap-bin.bin-skip {
  box-shadow: inset 0 -4px 0 #94a3b8;
}
.heatmap-bin.bin-pulse {
  outline: 2px solid #f59e0b;
  outline-offset: -1px;
  z-index: 1;
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
  background: repeating-linear-gradient(-45deg, #94a3b8, #94a3b8 1px, #e2e8f0 1px, #e2e8f0 2px);
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
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 140px;
  overflow: auto;
  padding: 4px;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 6px;
  background: #fff;
}
.roster-cell {
  width: 16px;
  height: 16px;
  border-radius: 2px;
  position: relative;
}
.roster-cell.dorm-start { outline: 1px solid rgba(0, 0, 0, 0.25); }
.roster-cell.cell-in { box-shadow: 0 0 0 2px #2563eb; z-index: 1; }
.roster-cell.cell-skip { opacity: 0.45; }
.roster-cell.cell-pulse { box-shadow: 0 0 0 3px #f59e0b; z-index: 2; transform: scale(1.2); }
.grid-note {
  font-size: 0.75rem;
  color: var(--text-muted, #64748b);
  margin: 0.35rem 0 0;
}
</style>
