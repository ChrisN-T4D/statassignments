<template>
  <div class="samp-lab">
    <header v-if="introText" class="samp-intro">
      <p>{{ introText }}</p>
    </header>

    <section class="samp-controls">
      <label class="field">
        <span>Campus roster (N)</span>
        <input v-model.number="popN" type="number" min="200" max="5000" step="100" :disabled="populationBuilt" />
      </label>
      <label class="field">
        <span>Sample size (n*)</span>
        <input v-model.number="sampleN" type="number" min="20" max="200" step="5" />
      </label>
      <label class="field">
        <span>Batch count</span>
        <input v-model.number="batchCount" type="number" min="1" max="500" step="1" />
      </label>
      <div class="plan-picks">
        <label class="field plan-field">
          <span>Plan A</span>
          <select v-model="planA.method" @change="onMethodChange('a')">
            <optgroup label="Probability (random)">
              <option v-for="k in randomMethods" :key="'a-' + k" :value="k">
                {{ SAMPLING_PLAN_META[k].shortTitle }}
              </option>
            </optgroup>
            <optgroup label="Non-random">
              <option v-for="k in nonRandomMethods" :key="'a-' + k" :value="k">
                {{ SAMPLING_PLAN_META[k].shortTitle }}
              </option>
            </optgroup>
          </select>
        </label>
        <span class="vs">vs</span>
        <label class="field plan-field">
          <span>Plan B</span>
          <select v-model="planB.method" @change="onMethodChange('b')">
            <optgroup label="Probability (random)">
              <option v-for="k in randomMethods" :key="'b-' + k" :value="k">
                {{ SAMPLING_PLAN_META[k].shortTitle }}
              </option>
            </optgroup>
            <optgroup label="Non-random">
              <option v-for="k in nonRandomMethods" :key="'b-' + k" :value="k">
                {{ SAMPLING_PLAN_META[k].shortTitle }}
              </option>
            </optgroup>
          </select>
        </label>
      </div>
      <div class="btn-row">
        <button type="button" class="btn-primary" @click="buildPopulation">
          {{ populationBuilt ? 'Reset population' : 'Build population' }}
        </button>
        <button type="button" class="btn-primary" :disabled="!populationBuilt || animating" @click="takeAnotherSample">
          Take another sample
        </button>
        <button type="button" class="btn-ghost" :disabled="!populationBuilt || animating" @click="runBatchFast">
          Run {{ batchCountClamped }} more (fast)
        </button>
      </div>
      <p class="hint">{{ SAMPLING_PLAN_META[planA.method].howItWorks }}</p>
    </section>

    <section v-if="populationBuilt" class="samp-section samp-pop">
      <h3>1. Population</h3>
      <p class="meta">
        <strong>N = {{ popNDisplay }}</strong> · <strong>μ = {{ popMean.toFixed(2) }}</strong> · scores
        {{ scoreMin.toFixed(0) }}–{{ scoreMax.toFixed(0) }}
      </p>
      <div class="hist-wrap">
        <div class="hist-title">Individual scores (everyone on roster)</div>
        <svg class="hist-svg" :viewBox="'0 0 ' + histW + ' ' + histH" xmlns="http://www.w3.org/2000/svg">
          <rect
            v-for="(bin, i) in histPopulation"
            :key="'pop' + i"
            :x="bin.x"
            :y="bin.y"
            :width="bin.w"
            :height="bin.h"
            class="hist-rect hist-rect-pop"
            rx="2"
          />
          <line :x1="muLineX" :x2="muLineX" y1="8" :y2="histH - 24" class="hist-vline" />
          <text :x="muLineX + 4" y="20" class="hist-vlabel">μ</text>
        </svg>
      </div>
      <details class="roster-details">
        <summary>Roster grid (compact)</summary>
        <div class="roster-grid" role="img" :aria-label="'Roster preview'">
          <div
            v-for="cell in popGridCells"
            :key="'pg' + cell.rosterIndex"
            class="roster-cell"
            :class="{
              'dorm-start': dormSize > 0 && cell.rosterIndex % dormSize === 0,
              'sex-m': cell.sex === 'M',
              'sex-f': cell.sex === 'F',
              'cell-in-a': highlightListA.includes(cell.rosterIndex),
              'cell-in-b': highlightListB.includes(cell.rosterIndex),
              'cell-skip': skipListA.includes(cell.rosterIndex) || skipListB.includes(cell.rosterIndex),
              'cell-pulse': cell.rosterIndex === pulseA || cell.rosterIndex === pulseB,
            }"
            :style="{ background: scoreColor(cell.score) }"
            :title="'#' + cell.pos + ', score ' + cell.score.toFixed(1)"
          >
            <span class="cell-age">{{ cell.age }}</span>
          </div>
        </div>
        <p v-if="popGridTruncated" class="grid-note">Showing prefix + last-draw highlights; full N used in all draws.</p>
      </details>
    </section>

    <section v-if="populationBuilt" class="samp-section samp-draw">
      <h3>2. This sample</h3>
      <p class="hint">First draw with a new method uses a slow walkthrough; repeats are faster.</p>
      <div class="plan-panels">
        <PlanDrawPanel
          label="Plan A"
          :plan="planA"
          :meta="SAMPLING_PLAN_META[planA.method]"
          :pop-mean="popMean"
          :highlight-indices="highlightListA"
          :skip-indices="skipListA"
          :animating="animatingA"
          :pulse-index="pulseA"
          :pick-label="pickLabelA"
          :walk-steps="walkStepsA"
          :grid-cells="gridCellsA"
          :grid-truncated="gridTruncatedA"
          :dorm-size="dormSize"
        />
        <PlanDrawPanel
          v-if="planB.method !== planA.method || planA.drawCount > 0 || planB.drawCount > 0"
          label="Plan B"
          :plan="planB"
          :meta="SAMPLING_PLAN_META[planB.method]"
          :pop-mean="popMean"
          :highlight-indices="highlightListB"
          :skip-indices="skipListB"
          :animating="animatingB"
          :pulse-index="pulseB"
          :pick-label="pickLabelB"
          :walk-steps="walkStepsB"
          :grid-cells="gridCellsB"
          :grid-truncated="gridTruncatedB"
          :dorm-size="dormSize"
        />
      </div>
    </section>

    <section v-if="populationBuilt && totalDraws > 0" class="samp-section samp-accum">
      <h3>3. Accumulated x̄ (sampling distribution of the mean)</h3>
      <p class="hint">Each dot is one draw’s sample mean. These numbers describe x̄ — not the score histograms below.</p>
      <div class="accum-grid">
        <AccumStats label="Plan A" :stats="statsA" :meta="SAMPLING_PLAN_META[planA.method]" />
        <AccumStats
          v-if="planB.method !== planA.method || planB.drawCount > 0"
          label="Plan B"
          :stats="statsB"
          :meta="SAMPLING_PLAN_META[planB.method]"
        />
      </div>
      <div class="xbar-strips">
        <XbarStrip title="Plan A" :means="planA.means" :pop-mean="popMean" :lo="histLo" :hi="histHi" />
        <XbarStrip
          v-if="planB.method !== planA.method || planB.drawCount > 0"
          title="Plan B"
          :means="planB.means"
          :pop-mean="popMean"
          :lo="histLo"
          :hi="histHi"
        />
      </div>
    </section>

    <section v-if="populationBuilt && totalDraws > 0" class="samp-section samp-scores">
      <h3>4. Pooled individual scores in samples</h3>
      <p class="hint">Scores of people who appeared in any draw — compare shape to population above.</p>
      <div class="hist-compare">
        <div class="hist-panel">
          <div class="hist-title">{{ SAMPLING_PLAN_META[planA.method].shortTitle }} (Plan A)</div>
          <svg class="hist-svg" :viewBox="'0 0 ' + histW + ' ' + histH" xmlns="http://www.w3.org/2000/svg">
            <rect
              v-for="(bin, i) in histPlanA"
              :key="'ha' + i"
              :x="bin.x"
              :y="bin.y"
              :width="bin.w"
              :height="bin.h"
              :class="['hist-rect', SAMPLING_PLAN_META[planA.method].rectClass]"
              rx="2"
            />
            <line :x1="muLineX" :x2="muLineX" y1="8" :y2="histH - 24" class="hist-vline" />
          </svg>
        </div>
        <div v-if="planB.method !== planA.method || planB.pooledScores.length" class="hist-panel">
          <div class="hist-title">{{ SAMPLING_PLAN_META[planB.method].shortTitle }} (Plan B)</div>
          <svg class="hist-svg" :viewBox="'0 0 ' + histW + ' ' + histH" xmlns="http://www.w3.org/2000/svg">
            <rect
              v-for="(bin, i) in histPlanB"
              :key="'hb' + i"
              :x="bin.x"
              :y="bin.y"
              :width="bin.w"
              :height="bin.h"
              :class="['hist-rect', SAMPLING_PLAN_META[planB.method].rectClass]"
              rx="2"
            />
            <line :x1="muLineX" :x2="muLineX" y1="8" :y2="histH - 24" class="hist-vline" />
          </svg>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import {
  SAMPLING_PLAN_META,
  buildCompareHistograms,
  buildSamplingPopGridForPreview,
  clusterKForSample,
  generateCampusPopulation,
  meanPeople,
  meanStatsForDraws,
  sampleDrawDetailed,
  scoreColor,
} from '../../lib/samplingSim.js'
import PlanDrawPanel from './SamplingPlanDrawPanel.vue'
import AccumStats from './SamplingAccumStats.vue'
import XbarStrip from './SamplingXbarStrip.vue'

const props = defineProps({
  intro: { type: String, default: 'stats' },
})

const INTRO = {
  stats:
    'Compare sampling plans on a fixed campus roster. μ is the population mean; see how each plan’s sample mean x̄ tracks μ across repeated draws.',
  rm: 'Compare sampling plans on a campus roster. μ is the population mean; histograms and x̄ summaries show how different rules affect your sample statistics.',
  'rm-embed':
    'Compare sampling plans on a campus roster. μ is the population mean; see how sample means track μ under different rules.',
}

const introText = computed(() => INTRO[props.intro] || INTRO.stats)

const randomMethods = ['srs', 'strat', 'clust', 'sys', 'stage']
const nonRandomMethods = ['conv', 'quota', 'purposive']

const SLOW_MS = 120
const FAST_MS = 12

const popN = ref(2000)
const sampleN = ref(40)
const batchCount = ref(20)
const batchCountClamped = computed(() =>
  Math.min(500, Math.max(1, Math.floor(Number(batchCount.value) || 1)))
)

const populationBuilt = ref(false)
const people = ref([])
const popNDisplay = ref(0)
const popMean = ref(0)
const dormSize = ref(0)
const scoreMin = ref(0)
const scoreMax = ref(0)

const histW = 380
const histH = 148
const histPopulation = ref([])
const histPlanA = ref([])
const histPlanB = ref([])
const muLineX = ref(0)
const histLo = ref(0)
const histHi = ref(100)

const popGridCells = ref([])
const popGridTruncated = ref(false)

function emptyPlan(method) {
  return {
    method,
    means: [],
    pooledScores: [],
    drawCount: 0,
    lastXbar: null,
    needsSlowAnim: true,
    lastSkipped: new Set(),
  }
}

const planA = ref(emptyPlan('srs'))
const planB = ref(emptyPlan('conv'))

const highlightA = ref(new Set())
const highlightB = ref(new Set())
const skipA = ref(new Set())
const skipB = ref(new Set())
const animatingA = ref(false)
const animatingB = ref(false)
const animating = computed(() => animatingA.value || animatingB.value)

const pulseA = ref(null)
const pulseB = ref(null)
const pickLabelA = ref('')
const pickLabelB = ref('')
const walkStepsA = ref([])
const walkStepsB = ref([])
const highlightListA = computed(() => Array.from(highlightA.value))
const highlightListB = computed(() => Array.from(highlightB.value))
const skipListA = computed(() => Array.from(skipA.value))
const skipListB = computed(() => Array.from(skipB.value))
const gridCellsA = ref([])
const gridCellsB = ref([])
const gridTruncatedA = ref(false)
const gridTruncatedB = ref(false)

const statsA = computed(() => meanStatsForDraws(planA.value.means, popMean.value))
const statsB = computed(() => meanStatsForDraws(planB.value.means, popMean.value))
const totalDraws = computed(() => planA.value.drawCount + planB.value.drawCount)

const prefersReducedMotion = computed(
  () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
)

function clampSampleN() {
  return Math.min(200, Math.max(20, Math.floor(Number(sampleN.value) || 40)))
}

function onMethodChange(slot) {
  const plan = slot === 'a' ? planA : planB
  plan.value = { ...plan.value, needsSlowAnim: true }
}

function resetPlans() {
  planA.value = emptyPlan(planA.value.method)
  planB.value = emptyPlan(planB.value.method)
  highlightA.value = new Set()
  highlightB.value = new Set()
  skipA.value = new Set()
  skipB.value = new Set()
  pulseA.value = null
  pulseB.value = null
  pickLabelA.value = ''
  pickLabelB.value = ''
  walkStepsA.value = []
  walkStepsB.value = []
}

function rebuildPlanGrid(slot) {
  const isA = slot === 'a'
  const pulse = isA ? pulseA.value : pulseB.value
  const pulseExtra =
    pulse != null && Number.isFinite(pulse) ? new Set([pulse]) : null
  const preview = buildSamplingPopGridForPreview(
    people.value,
    isA ? highlightA.value : highlightB.value,
    new Set(),
    isA ? skipA.value : skipB.value,
    new Set(),
    pulseExtra
  )
  if (isA) {
    gridCellsA.value = preview.cells
    gridTruncatedA.value = preview.truncated
  } else {
    gridCellsB.value = preview.cells
    gridTruncatedB.value = preview.truncated
  }
}

function rebuildAllPlanGrids() {
  rebuildPlanGrid('a')
  rebuildPlanGrid('b')
}

function rebuildHistograms() {
  const h = buildCompareHistograms(
    people.value.map((p) => p.score),
    planA.value.pooledScores,
    planB.value.pooledScores,
    popMean.value,
    histW,
    histH
  )
  histPopulation.value = h.population
  histPlanA.value = h.planA
  histPlanB.value = h.planB
  muLineX.value = h.muLineX
  histLo.value = h.lo
  histHi.value = h.hi
}

function rebuildPopGrid() {
  const pulseExtra = new Set()
  if (pulseA.value != null && Number.isFinite(pulseA.value)) pulseExtra.add(pulseA.value)
  if (pulseB.value != null && Number.isFinite(pulseB.value)) pulseExtra.add(pulseB.value)
  const preview = buildSamplingPopGridForPreview(
    people.value,
    highlightA.value,
    highlightB.value,
    skipA.value,
    skipB.value,
    pulseExtra.size ? pulseExtra : null
  )
  popGridCells.value = preview.cells
  popGridTruncated.value = preview.truncated
}

function buildPopulation() {
  const Nreq = Math.max(200, Math.floor(popN.value))
  const gen = generateCampusPopulation(Nreq)
  people.value = gen.people
  popNDisplay.value = gen.Nuse
  popN.value = gen.Nuse
  dormSize.value = gen.m
  popMean.value = meanPeople(gen.people)
  const scores = gen.people.map((p) => p.score)
  scoreMin.value = Math.min(...scores)
  scoreMax.value = Math.max(...scores)
  populationBuilt.value = true
  resetPlans()
  rebuildHistograms()
  rebuildPopGrid()
  rebuildAllPlanGrids()
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function animateDraw(slot, drawResult, slow) {
  const isA = slot === 'a'
  const highlightRef = isA ? highlightA : highlightB
  const skipRef = isA ? skipA : skipB
  const animRef = isA ? animatingA : animatingB
  const pulseRef = isA ? pulseA : pulseB
  const walkRef = isA ? walkStepsA : walkStepsB
  const pickLabelRef = isA ? pickLabelA : pickLabelB
  const method = isA ? planA.value.method : planB.value.method
  const nTarget = Math.min(clampSampleN(), people.value.length)

  highlightRef.value = new Set()
  skipRef.value = new Set()
  pulseRef.value = null
  pickLabelRef.value = ''
  walkRef.value = []
  animRef.value = true
  rebuildPlanGrid(slot)
  rebuildPopGrid()

  const delay = slow && !prefersReducedMotion.value ? SLOW_MS : FAST_MS

  for (const step of drawResult.steps || []) {
    if (step.type === 'block') {
      pickLabelRef.value =
        step.action === 'stage-pool' ? 'Stage 1: dorm(s) in pool' : 'Whole cluster(s) selected'
      for (const idx of step.rosterIndices) {
        pulseRef.value = idx
        if (step.action !== 'stage-pool') {
          highlightRef.value = new Set([...highlightRef.value, idx])
        }
        walkRef.value = [
          ...walkRef.value,
          { rosterIndex: idx, action: step.action === 'stage-pool' ? 'pool' : 'in' },
        ]
        rebuildPlanGrid(slot)
        rebuildPopGrid()
        if (!prefersReducedMotion.value) {
          await sleep(slow ? delay * 2 : FAST_MS)
        }
      }
      continue
    }
    pulseRef.value = step.rosterIndex
    if (step.action === 'retry') {
      if (!slow) continue
      pickLabelRef.value = 'Already in sample — drawing again…'
      rebuildPlanGrid(slot)
      rebuildPopGrid()
      await nextTick()
      if (!prefersReducedMotion.value) await sleep(Math.max(40, delay * 0.6))
      continue
    }
    if (step.action === 'skip') {
      skipRef.value = new Set([...skipRef.value, step.rosterIndex])
      if (method === 'quota') {
        walkRef.value = [...walkRef.value, { rosterIndex: step.rosterIndex, action: 'skip' }]
      }
    } else {
      highlightRef.value = new Set([...highlightRef.value, step.rosterIndex])
      walkRef.value = [...walkRef.value, { rosterIndex: step.rosterIndex, action: 'in' }]
      if (step.pick != null) {
        let label = `Pick ${step.pick} of ${nTarget}`
        if (step.sysStart && step.sysInterval) {
          label += ` · random start, then every ${step.sysInterval}th person`
        } else if (step.stratum != null) {
          label += ` · stratum ${step.stratum + 1}`
        }
        pickLabelRef.value = label
      }
    }
    rebuildPlanGrid(slot)
    rebuildPopGrid()
    await nextTick()
    if (!prefersReducedMotion.value) await sleep(delay)
  }

  pulseRef.value = null
  pickLabelRef.value = ''
  animRef.value = false
  rebuildPopGrid()
}

function applyDraw(slot, drawResult) {
  const plan = slot === 'a' ? planA : planB
  const xbar = meanPeople(drawResult.selected)
  plan.value = {
    ...plan.value,
    means: [...plan.value.means, xbar],
    pooledScores: [
      ...plan.value.pooledScores,
      ...drawResult.selected.map((p) => p.score),
    ],
    drawCount: plan.value.drawCount + 1,
    lastXbar: xbar,
    lastSkipped: new Set(drawResult.skippedIndices || []),
    needsSlowAnim: false,
  }
}

async function drawForPlan(slot) {
  const plan = slot === 'a' ? planA.value : planB.value
  const nList = Math.min(clampSampleN(), people.value.length)
  const k = clusterKForSample(nList, dormSize.value)
  const slow = plan.needsSlowAnim
  const drawResult = sampleDrawDetailed(plan.method, people.value, nList, k)
  await animateDraw(slot, drawResult, slow)
  applyDraw(slot, drawResult)
  if (slot === 'a') {
    highlightA.value = new Set(drawResult.rosterOrder)
    skipA.value = new Set(drawResult.skippedIndices || [])
  } else {
    highlightB.value = new Set(drawResult.rosterOrder)
    skipB.value = new Set(drawResult.skippedIndices || [])
  }
  rebuildPlanGrid(slot)
  rebuildHistograms()
}

async function takeAnotherSample() {
  if (!populationBuilt.value || animating.value) return
  await drawForPlan('a')
  await drawForPlan('b')
}

async function runBatchFast() {
  if (!populationBuilt.value || animating.value) return
  const n = batchCountClamped.value
  for (let i = 0; i < n; i++) {
    planA.value.needsSlowAnim = false
    planB.value.needsSlowAnim = false
    const nList = Math.min(clampSampleN(), people.value.length)
    const k = clusterKForSample(nList, dormSize.value)
    const drawA = sampleDrawDetailed(planA.value.method, people.value, nList, k)
    const drawB = sampleDrawDetailed(planB.value.method, people.value, nList, k)
    applyDraw('a', drawA)
    applyDraw('b', drawB)
    if (i === n - 1) {
      highlightA.value = new Set(drawA.rosterOrder)
      highlightB.value = new Set(drawB.rosterOrder)
      skipA.value = new Set(drawA.skippedIndices || [])
      skipB.value = new Set(drawB.skippedIndices || [])
    }
  }
  rebuildHistograms()
  rebuildPopGrid()
  rebuildAllPlanGrids()
}

watch([() => planA.value.method, () => planB.value.method], () => {
  if (populationBuilt.value) rebuildHistograms()
})
</script>

<style scoped>
.samp-lab {
  margin-bottom: 1rem;
}
.samp-intro p {
  margin: 0 0 1rem;
  color: var(--text-muted, #64748b);
  line-height: 1.5;
}
.samp-controls {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
}
.field input,
.field select {
  max-width: 12rem;
  padding: 0.35rem 0.5rem;
}
.plan-picks {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.75rem;
}
.plan-field select {
  max-width: 14rem;
}
.vs {
  font-weight: 600;
  color: var(--text-muted, #64748b);
  padding-bottom: 0.35rem;
}
.btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.btn-primary,
.btn-ghost {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-weight: 600;
}
.btn-primary {
  background: var(--accent, #2563eb);
  color: #fff;
  border: none;
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-ghost {
  background: transparent;
  border: 1px solid var(--border, #cbd5e1);
}
.hint {
  font-size: 0.85rem;
  color: var(--text-muted, #64748b);
  margin: 0;
  line-height: 1.45;
}
.samp-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  border: 1px solid var(--border, #e2e8f0);
  border-radius: 0.75rem;
  background: var(--bg-card, #fff);
}
.samp-section h3 {
  margin: 0 0 0.5rem;
  font-size: 1.05rem;
}
.meta {
  margin: 0 0 0.75rem;
}
.hist-wrap,
.hist-panel {
  margin-top: 0.5rem;
}
.hist-title {
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}
.hist-svg {
  width: 100%;
  max-width: 400px;
  height: auto;
}
.hist-rect {
  opacity: 0.85;
}
.hist-rect-pop {
  fill: #94a3b8;
}
.hist-rect-srs { fill: #3b82f6; }
.hist-rect-strat { fill: #6366f1; }
.hist-rect-clust { fill: #0ea5e9; }
.hist-rect-sys { fill: #06b6d4; }
.hist-rect-stage { fill: #0891b2; }
.hist-rect-conv { fill: #f97316; }
.hist-rect-quota { fill: #14b8a6; }
.hist-rect-purposive { fill: #a855f7; }
.hist-vline {
  stroke: #dc2626;
  stroke-width: 2;
  stroke-dasharray: 4 3;
}
.hist-vlabel {
  fill: #dc2626;
  font-size: 12px;
  font-weight: 700;
}
.roster-details {
  margin-top: 0.75rem;
}
.roster-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 160px;
  overflow: auto;
  margin-top: 0.5rem;
}
.roster-cell {
  width: 14px;
  height: 14px;
  border-radius: 2px;
  position: relative;
  font-size: 6px;
  color: rgba(255, 255, 255, 0.9);
}
.roster-cell.dorm-start {
  outline: 1px solid rgba(0, 0, 0, 0.35);
}
.roster-cell.cell-in-a,
.roster-cell.cell-in-b {
  box-shadow: 0 0 0 2px #2563eb;
  z-index: 1;
}
.roster-cell.cell-skip {
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
  transform: scale(1.15);
}
.cell-age {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.grid-note {
  font-size: 0.8rem;
  color: var(--text-muted, #64748b);
}
.plan-panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
}
.accum-grid,
.hist-compare,
.xbar-strips {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1rem;
  margin-top: 0.75rem;
}
</style>
