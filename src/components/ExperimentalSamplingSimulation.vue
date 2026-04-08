<template>
  <div class="exp-sim">
    <h3 class="exp-sim-title">Mini-lab: random vs non-random sampling &amp; assignment</h3>
    <p v-if="!embedTab" class="exp-sim-lead">
      Use the <strong>Sampling</strong> and <strong>Assignment</strong> tabs below. <strong>Sampling</strong>: compare plans on a campus roster; <strong>μ</strong> is the population mean and histograms show how sample means
      track μ. <strong>Assignment</strong>: sleep workshop vs control—<strong>pre</strong> score as <strong>tile color</strong> (10–100), <strong>sex</strong> as <strong>square</strong> (male) vs <strong>circle</strong> (female),
      <strong>age</strong> inside the shape, screened sleep-problem <strong>bottom stripe</strong>, and mean <strong>pre</strong> / expected <strong>post</strong> / <strong>change</strong> per rule. Open <em>More context</em> for examples.
    </p>
    <p v-else-if="embedTab === 'sampling'" class="exp-sim-lead">
      Compare <strong>sampling</strong> plans on a campus roster. <strong>μ</strong> is the population mean; histograms show how sample means track μ under different rules. Open <em>More context</em> for field
      examples.
    </p>
    <p v-else class="exp-sim-lead">
      <strong>Assignment</strong> to a sleep workshop vs waitlist control: <strong>pre</strong> sleep as <strong>tile color</strong> (10–100), <strong>sex</strong> as <strong>square</strong> / <strong>circle</strong>, <strong>age</strong> inside the tile, purple
      <strong>bottom stripe</strong> for screened sleep problems, plus mean <strong>pre</strong> / expected <strong>post</strong> / <strong>change</strong>. Open <em>More context</em> for examples.
    </p>
    <details class="exp-scenario-details">
      <summary>More context: effectiveness, examples</summary>
      <p class="exp-details-intro">
        Effectiveness is usually judged from <strong>change pre → post</strong> between groups. <strong>Assignment</strong> shows <strong>pre</strong> balance and, under a stated gain model, expected <strong>post</strong> and
        <strong>change</strong> for each rule—treatment contrast alongside whether groups matched at pre. <strong>Sampling</strong> is about drawing a sample from a roster and whether <strong>x̄</strong> tracks
        <strong>μ</strong>.
      </p>
      <ul class="exp-scenario-list">
        <li>
          <strong>Sleep intervention:</strong> pre = usual sleep quality the week before the workshop; you’d compare <strong>pre vs post</strong> to judge the program;
          random assignment puts comparable people in workshop vs control at pre.
        </li>
        <li>
          <strong>Mood or stress screen:</strong> baseline = symptom checklist score; sampling matters if you want to generalize beyond who
          happened to walk into the counseling center first.
        </li>
        <li>
          <strong>Attention / cognition lab:</strong> baseline = reaction time or accuracy; volunteer order on the signup sheet can mix cautious
          and impulsive responders unless you assign conditions randomly.
        </li>
      </ul>
    </details>

    <div v-if="embedTab == null" class="exp-concept-lab-tabs" role="tablist" aria-label="Mini-lab: sampling and assignment">
      <button
        type="button"
        class="exp-concept-lab-tab"
        role="tab"
        id="exp-lab-tab-sampling"
        :aria-selected="effectiveLabTab === 'sampling'"
        :tabindex="effectiveLabTab === 'sampling' ? 0 : -1"
        :class="{ 'is-active': effectiveLabTab === 'sampling' }"
        @click="activeConceptLabTab = 'sampling'"
      >
        Sampling
      </button>
      <button
        type="button"
        class="exp-concept-lab-tab"
        role="tab"
        id="exp-lab-tab-assignment"
        :aria-selected="effectiveLabTab === 'assignment'"
        :tabindex="effectiveLabTab === 'assignment' ? 0 : -1"
        :class="{ 'is-active': effectiveLabTab === 'assignment' }"
        @click="activeConceptLabTab = 'assignment'"
      >
        Assignment
      </button>
    </div>

    <div
      v-show="effectiveLabTab === 'sampling'"
      class="exp-concept-lab-panel"
      role="tabpanel"
      :aria-labelledby="embedTab == null ? 'exp-lab-tab-sampling' : undefined"
      :aria-label="embedTab != null ? 'Sampling mini-lab' : undefined"
    >
    <!-- —— Part 1 (sampling) —— -->
    <section class="exp-sim-section">
      <h4>1) Sampling: compare two plans side by side</h4>
      <p class="exp-sim-hint exp-sim-hint-compact">
        One fixed campus roster and true mean <strong>μ</strong>. Pick two plans, set <strong>n</strong> and repetitions, then run. Histograms show <strong>pooled scores of sampled people</strong>;
        the lines under each plan summarize <strong>x̄</strong> across draws (avg, bias vs μ, SD of x̄).
      </p>
      <details class="exp-scenario-details">
        <summary>What each sampling plan does</summary>
        <div class="exp-sampling-legend-split exp-sampling-legend-in-details" aria-label="Sampling types">
        <div class="exp-sampling-legend-col exp-sampling-legend-random">
          <div class="exp-sampling-legend-heading">Probability (random) sampling</div>
          <p class="exp-sampling-legend-note">Known selection probabilities; designs here are unbiased for μ (sample means cluster near μ over many draws).</p>
          <ul class="exp-sampling-legend-list">
            <li><strong>Simple random (SRS)</strong> — every set of n* students equally likely.</li>
            <li><strong>Stratified</strong> — sample n* with proportional allocation by class year, SRS within each year.</li>
            <li><strong>Cluster (one-stage)</strong> — random dorms; include everyone in the chosen halls (n* total).</li>
            <li><strong>Systematic</strong> — random start on the list, then every kth student (k set so n* fits the roster).</li>
            <li><strong>Multi-stage</strong> — random dorms, then SRS of n* students from those halls combined.</li>
          </ul>
        </div>
        <div class="exp-sampling-legend-col exp-sampling-legend-nonrandom">
          <div class="exp-sampling-legend-heading">Non-random sampling</div>
          <p class="exp-sampling-legend-note">Selection follows a non-chance rule; bias is possible when that rule lines up with dorms or scores.</p>
          <ul class="exp-sampling-legend-list">
            <li><strong>Convenience</strong> — take list positions 1…n* as-is; no balancing and no skipping people who “don’t fit” a quota.</li>
            <li>
              <strong>Quota (list order)</strong> — same class-year <em>targets</em> as proportional stratified sampling, but you walk the list top-down and only take someone if
              their year still needs people; otherwise you skip them. Early list order decides <em>which</em> sophomores, etc., get in—not random selection within year.
            </li>
            <li><strong>Purposive</strong> — researcher picks the n* <em>highest</em> scores (e.g. focusing on “most severe” cases).</li>
            <li><strong>Volunteer / snowball</strong> — common in practice for hard-to-reach groups; not modeled on this fixed roster (discuss in class).</li>
          </ul>
        </div>
        </div>
        <p class="exp-details-body exp-sampling-scenario-note">
          Roster = dorms (clusters). Within each hall, names are in a <strong>random shuffle</strong> (like a messy registrar printout), so class years are not perfectly
          alternating on the list. That way quota sampling can pass people over; if the list were sorted by year, quota would collapse toward “first n* names.” μ uses everyone;
          each repetition draws a new sample (for random-type plans).
        </p>
      </details>

      <div class="exp-sim-controls">
        <label>
          Campus roster (N, snapped to full dorms)
          <input v-model.number="popN" type="number" min="200" max="5000" step="100" />
        </label>
        <label>
          Target sample size (n)
          <input v-model.number="sampleN" type="number" min="20" max="200" step="5" />
        </label>
        <label>
          Number of samples (repetitions)
          <input v-model.number="samplingReps" type="number" min="1" max="500" step="1" />
        </label>
      </div>

      <div class="exp-sampling-pick-row">
        <label class="exp-sampling-pick exp-sampling-pick-inline">
          <span class="exp-sampling-pick-label">Left plan</span>
          <select v-model="samplingCompareLeft" class="exp-sampling-select">
            <optgroup label="Probability (random)">
              <option value="srs">SRS</option>
              <option value="strat">Stratified</option>
              <option value="clust">Cluster (one-stage)</option>
              <option value="sys">Systematic</option>
              <option value="stage">Multi-stage</option>
            </optgroup>
            <optgroup label="Non-random">
              <option value="conv">Convenience</option>
              <option value="quota">Quota</option>
              <option value="purposive">Purposive (highest scores)</option>
            </optgroup>
          </select>
          <p class="exp-sampling-plan-explain">{{ compareLeftPlan.howItWorks }}</p>
        </label>
        <span class="exp-sampling-pick-vs" aria-hidden="true">vs</span>
        <label class="exp-sampling-pick exp-sampling-pick-inline">
          <span class="exp-sampling-pick-label">Right plan</span>
          <select v-model="samplingCompareRight" class="exp-sampling-select">
            <optgroup label="Probability (random)">
              <option value="srs">SRS</option>
              <option value="strat">Stratified</option>
              <option value="clust">Cluster (one-stage)</option>
              <option value="sys">Systematic</option>
              <option value="stage">Multi-stage</option>
            </optgroup>
            <optgroup label="Non-random">
              <option value="conv">Convenience</option>
              <option value="quota">Quota</option>
              <option value="purposive">Purposive (highest scores)</option>
            </optgroup>
          </select>
          <p class="exp-sampling-plan-explain">{{ compareRightPlan.howItWorks }}</p>
        </label>
      </div>

      <button type="button" class="btn-primary" @click="runSamplingSim">
        Build roster &amp; run {{ samplingRepsClamped }} samples (two plans above)
      </button>

        <div v-if="samplingSimDone" class="exp-sampling-visual">
        <p v-if="samplingMeta" class="exp-sampling-meta">{{ samplingMeta }}</p>
        <div class="exp-sampling-roster-split">
          <div class="exp-pop-fixed-wrap exp-sampling-visual-box">
            <div class="exp-sampling-visual-box-title">Population (full roster)</div>
            <div class="exp-pop-label">
              <strong>Everyone</strong> on the campus list (N = {{ popNDisplay }}): <strong>fill</strong> = score (10–100), <strong>square</strong> = male / <strong>circle</strong> = female,
              <strong>number</strong> = age. <strong>μ = {{ popMean.toFixed(2) }}</strong>. Vertical rules = dorm starts. Range {{ samplingPopScoreMin.toFixed(0) }}–{{
                samplingPopScoreMax.toFixed(0)
              }}. Same people for all {{ lastSamplingReps }} draw(s) below.
            </div>
            <div class="exp-pop-grid" role="img" :aria-label="'Roster: people 1 through ' + samplingPopGrid.length">
              <div
                v-for="cell in samplingPopGrid"
                :key="'pg' + cell.pos"
                class="exp-pop-person-cell exp-cell-shape"
                :class="{
                  'exp-pop-dorm-start': samplingPopDormSize > 0 && (cell.pos - 1) % samplingPopDormSize === 0,
                  'exp-cell-shape-m': cell.sex === 'M',
                  'exp-cell-shape-f': cell.sex === 'F'
                }"
                :title="'#' + cell.pos + ', score ' + cell.score.toFixed(1) + ', ' + cell.sex + ', age ' + cell.age"
                :style="assignmentCellBgStyle({ score: cell.score, sleepIssue: false })"
              >
                <span class="exp-cell-age">{{ cell.age }}</span>
              </div>
            </div>
            <p v-if="samplingPopGridTruncated" class="exp-pop-grid-note">
              Showing {{ samplingPopGrid.length }} roster positions (list-order prefix plus anyone selected in the last run who would otherwise be missing). μ and every sample
              still use the full N = {{ popNDisplay }}.
            </p>
          </div>

          <div class="exp-pop-fixed-wrap exp-sampling-visual-box">
            <div class="exp-sampling-visual-box-title">Who is selected (last run)</div>
            <p class="exp-pop-label">
              <strong>Convenience vs quota:</strong> use the <strong>list-walk strip</strong> under each plan (if shown)—it is the clearest difference. Below that, the roster grid matches the campus layout.
              <strong>Quota</strong> may show striped pass-overs; <strong>convenience</strong> only uses rows 1…n* with nothing skipped. Final run only; histograms pool all {{ lastSamplingReps }} draw(s).
            </p>
            <div
              :class="['exp-sampling-last-draw-split', { 'exp-sampling-last-draw-split-single': samplingCompareLeft === samplingCompareRight }]"
            >
              <div class="exp-sampling-last-draw-col">
                <div class="exp-sampling-last-draw-head">
                  <span class="exp-sampling-side-badge" :class="compareLeftPlan.random ? 'exp-badge-rand' : 'exp-badge-norand'">
                    {{ compareLeftPlan.random ? 'Random' : 'Non-random' }}
                  </span>
                  <span class="exp-sampling-last-draw-plan-name">{{ compareLeftPlan.shortTitle }} · Left</span>
                </div>
                <p class="exp-sampling-selection-viz-explain">{{ compareLeftPlan.selectionVizExplain }}</p>

                <div v-if="samplingCompareLeft === 'quota' && samplingQuotaWalkMetaLeft" class="exp-quota-walk-box">
                  <div class="exp-quota-walk-heading">Quota: how the registrar list was read (this run)</div>
                  <ul class="exp-quota-walk-stats">
                    <li>
                      Read <strong>{{ samplingQuotaWalkMetaLeft.checkedSlots }}</strong> list rows in order to fill
                      <strong>n* = {{ samplingQuotaWalkMetaLeft.n }}</strong>
                    </li>
                    <li><strong>{{ samplingQuotaWalkMetaLeft.skipped }}</strong> pass-overs (year already at target)</li>
                    <li>
                      Last row examined: <strong>#{{ samplingQuotaWalkMetaLeft.lastRosterDisplay }}</strong> · Convenience would stop after row
                      <strong>#{{ samplingQuotaWalkMetaLeft.n }}</strong>
                    </li>
                  </ul>
                  <table class="exp-quota-stratum-table">
                    <thead>
                      <tr>
                        <th scope="col">Class-year bucket</th>
                        <th scope="col">Target</th>
                        <th scope="col">In sample</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="si in [0, 1, 2, 3]" :key="'qtm-l' + si">
                        <td>y{{ si + 1 }}</td>
                        <td>{{ samplingQuotaWalkMetaLeft.targetByStratum[si] }}</td>
                        <td>{{ samplingQuotaWalkMetaLeft.inSampleByStratum[si] }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="exp-walk-strip-caption">Each tile = one registrar row, <strong>left → right</strong> (first {{ Math.min(samplingQuotaWalkMetaLeft.lastRosterIndex + 1, QUOTA_WALK_STRIP_MAX) }} rows of the walk).</p>
                  <div class="exp-walk-strip exp-walk-strip-quota" role="img" aria-label="Quota list walk">
                    <div class="exp-walk-strip-row">
                      <div
                        v-for="idx in quotaWalkStripIndicesFromMeta(samplingQuotaWalkMetaLeft)"
                        :key="'qws-l' + idx"
                        :class="quotaWalkStripClassLeft(idx)"
                        :title="quotaWalkStripTitleLeft(idx)"
                      />
                    </div>
                    <div class="exp-walk-strip-legend-row">
                      <span><span class="exp-walk-leg exp-walk-tile-quota-in" aria-hidden="true" /> In sample</span>
                      <span><span class="exp-walk-leg exp-walk-tile-quota-skip" aria-hidden="true" /> Passed over</span>
                    </div>
                  </div>
                </div>

                <div v-if="samplingCompareLeft === 'conv' && samplingConvenienceWalkMetaLeft" class="exp-convenience-walk-box">
                  <div class="exp-convenience-walk-heading">Convenience: list prefix only (this run)</div>
                  <p class="exp-convenience-walk-lead">
                    Rows <strong>1–{{ samplingConvenienceWalkMetaLeft.n }}</strong> are the entire sample — <strong>0</strong> pass-overs, no class-year table.
                  </p>
                  <p class="exp-walk-strip-caption">Orange = in the sample; pale = beyond n* (shown only so you can line up with quota’s longer walk).</p>
                  <div class="exp-walk-strip exp-walk-strip-conv" role="img" aria-label="Convenience list prefix">
                    <div class="exp-walk-strip-row">
                      <div
                        v-for="idx in convenienceWalkTakenFromMeta(samplingConvenienceWalkMetaLeft)"
                        :key="'cws-l' + idx"
                        class="exp-walk-tile exp-walk-tile-conv-in"
                        :title="'List row #' + (idx + 1) + ': in sample'"
                      />
                      <div
                        v-for="j in convenienceWalkTailIndices()"
                        :key="'cwt-l' + j"
                        class="exp-walk-tile exp-walk-tile-conv-tail"
                        title="Beyond convenience sample"
                      />
                    </div>
                    <div class="exp-walk-strip-legend-row">
                      <span><span class="exp-walk-leg exp-walk-tile-conv-in" aria-hidden="true" /> In sample</span>
                      <span><span class="exp-walk-leg exp-walk-tile-conv-tail" aria-hidden="true" /> Past n*</span>
                    </div>
                  </div>
                </div>

                <div
                  class="exp-pop-grid exp-pop-grid-last-draw"
                  :class="samplingLastDrawVizClassLeft"
                  role="img"
                  aria-label="Left plan: last sample on roster subset"
                >
                  <div
                    v-for="cell in samplingPopGrid"
                    :key="'pl' + cell.pos"
                    class="exp-pop-person-cell exp-cell-shape exp-sampling-viz-cell"
                    :class="{
                      'exp-pop-dorm-start': samplingPopDormSize > 0 && (cell.pos - 1) % samplingPopDormSize === 0,
                      'exp-cell-shape-m': cell.sex === 'M',
                      'exp-cell-shape-f': cell.sex === 'F',
                      'exp-pop-not-in-sample':
                        !samplingLastDrawLeftIndices.has(cell.pos - 1) &&
                        !(samplingCompareLeft === 'quota' && samplingQuotaSkippedLeft.has(cell.pos - 1)),
                      'exp-pop-quota-skipped': samplingCompareLeft === 'quota' && samplingQuotaSkippedLeft.has(cell.pos - 1),
                      'exp-pop-in-sample-rand-left':
                        samplingLastDrawLeftIndices.has(cell.pos - 1) &&
                        samplingCompareLeft !== 'conv' &&
                        samplingCompareLeft !== 'quota' &&
                        samplingCompareLeft !== 'purposive',
                      'exp-pop-in-sample-conv-left': samplingLastDrawLeftIndices.has(cell.pos - 1) && samplingCompareLeft === 'conv',
                      'exp-pop-in-sample-quota-left': samplingLastDrawLeftIndices.has(cell.pos - 1) && samplingCompareLeft === 'quota',
                      'exp-pop-in-sample-purposive': samplingLastDrawLeftIndices.has(cell.pos - 1) && samplingCompareLeft === 'purposive'
                    }"
                    :title="'#' + cell.pos + ', score ' + cell.score.toFixed(1) + ', ' + cell.sex + ', age ' + cell.age"
                    :style="assignmentCellBgStyle({ score: cell.score, sleepIssue: false })"
                  >
                    <span
                      v-if="samplingVizChipTextLeft(cell)"
                      class="exp-sampling-viz-chip"
                      :class="samplingVizChipClassLeft()"
                    >{{ samplingVizChipTextLeft(cell) }}</span>
                    <span class="exp-cell-age">{{ cell.age }}</span>
                  </div>
                </div>
              </div>
              <div v-if="samplingCompareLeft !== samplingCompareRight" class="exp-sampling-last-draw-col">
                <div class="exp-sampling-last-draw-head">
                  <span class="exp-sampling-side-badge" :class="compareRightPlan.random ? 'exp-badge-rand' : 'exp-badge-norand'">
                    {{ compareRightPlan.random ? 'Random' : 'Non-random' }}
                  </span>
                  <span class="exp-sampling-last-draw-plan-name">{{ compareRightPlan.shortTitle }} · Right</span>
                </div>
                <p class="exp-sampling-selection-viz-explain">{{ compareRightPlan.selectionVizExplain }}</p>

                <div v-if="samplingCompareRight === 'quota' && samplingQuotaWalkMetaRight" class="exp-quota-walk-box">
                  <div class="exp-quota-walk-heading">Quota: how the registrar list was read (this run)</div>
                  <ul class="exp-quota-walk-stats">
                    <li>
                      Read <strong>{{ samplingQuotaWalkMetaRight.checkedSlots }}</strong> list rows in order to fill
                      <strong>n* = {{ samplingQuotaWalkMetaRight.n }}</strong>
                    </li>
                    <li><strong>{{ samplingQuotaWalkMetaRight.skipped }}</strong> pass-overs (year already at target)</li>
                    <li>
                      Last row examined: <strong>#{{ samplingQuotaWalkMetaRight.lastRosterDisplay }}</strong> · Convenience would stop after row
                      <strong>#{{ samplingQuotaWalkMetaRight.n }}</strong>
                    </li>
                  </ul>
                  <table class="exp-quota-stratum-table">
                    <thead>
                      <tr>
                        <th scope="col">Class-year bucket</th>
                        <th scope="col">Target</th>
                        <th scope="col">In sample</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="si in [0, 1, 2, 3]" :key="'qtm-r' + si">
                        <td>y{{ si + 1 }}</td>
                        <td>{{ samplingQuotaWalkMetaRight.targetByStratum[si] }}</td>
                        <td>{{ samplingQuotaWalkMetaRight.inSampleByStratum[si] }}</td>
                      </tr>
                    </tbody>
                  </table>
                  <p class="exp-walk-strip-caption">Each tile = one registrar row, <strong>left → right</strong>.</p>
                  <div class="exp-walk-strip exp-walk-strip-quota" role="img" aria-label="Quota list walk">
                    <div class="exp-walk-strip-row">
                      <div
                        v-for="idx in quotaWalkStripIndicesFromMeta(samplingQuotaWalkMetaRight)"
                        :key="'qws-r' + idx"
                        :class="quotaWalkStripClassRight(idx)"
                        :title="quotaWalkStripTitleRight(idx)"
                      />
                    </div>
                    <div class="exp-walk-strip-legend-row">
                      <span><span class="exp-walk-leg exp-walk-tile-quota-in" aria-hidden="true" /> In sample</span>
                      <span><span class="exp-walk-leg exp-walk-tile-quota-skip" aria-hidden="true" /> Passed over</span>
                    </div>
                  </div>
                </div>

                <div v-if="samplingCompareRight === 'conv' && samplingConvenienceWalkMetaRight" class="exp-convenience-walk-box">
                  <div class="exp-convenience-walk-heading">Convenience: list prefix only (this run)</div>
                  <p class="exp-convenience-walk-lead">
                    Rows <strong>1–{{ samplingConvenienceWalkMetaRight.n }}</strong> are the entire sample — <strong>0</strong> pass-overs, no class-year table.
                  </p>
                  <p class="exp-walk-strip-caption">Orange = in the sample; pale = beyond n* (for contrast with quota).</p>
                  <div class="exp-walk-strip exp-walk-strip-conv" role="img" aria-label="Convenience list prefix">
                    <div class="exp-walk-strip-row">
                      <div
                        v-for="idx in convenienceWalkTakenFromMeta(samplingConvenienceWalkMetaRight)"
                        :key="'cws-r' + idx"
                        class="exp-walk-tile exp-walk-tile-conv-in"
                        :title="'List row #' + (idx + 1) + ': in sample'"
                      />
                      <div
                        v-for="j in convenienceWalkTailIndices()"
                        :key="'cwt-r' + j"
                        class="exp-walk-tile exp-walk-tile-conv-tail"
                        title="Beyond convenience sample"
                      />
                    </div>
                    <div class="exp-walk-strip-legend-row">
                      <span><span class="exp-walk-leg exp-walk-tile-conv-in" aria-hidden="true" /> In sample</span>
                      <span><span class="exp-walk-leg exp-walk-tile-conv-tail" aria-hidden="true" /> Past n*</span>
                    </div>
                  </div>
                </div>

                <div
                  class="exp-pop-grid exp-pop-grid-last-draw"
                  :class="samplingLastDrawVizClassRight"
                  role="img"
                  aria-label="Right plan: last sample on roster subset"
                >
                  <div
                    v-for="cell in samplingPopGrid"
                    :key="'pr' + cell.pos"
                    class="exp-pop-person-cell exp-cell-shape exp-sampling-viz-cell"
                    :class="{
                      'exp-pop-dorm-start': samplingPopDormSize > 0 && (cell.pos - 1) % samplingPopDormSize === 0,
                      'exp-cell-shape-m': cell.sex === 'M',
                      'exp-cell-shape-f': cell.sex === 'F',
                      'exp-pop-not-in-sample':
                        !samplingLastDrawRightIndices.has(cell.pos - 1) &&
                        !(samplingCompareRight === 'quota' && samplingQuotaSkippedRight.has(cell.pos - 1)),
                      'exp-pop-quota-skipped': samplingCompareRight === 'quota' && samplingQuotaSkippedRight.has(cell.pos - 1),
                      'exp-pop-in-sample-rand-right':
                        samplingLastDrawRightIndices.has(cell.pos - 1) &&
                        samplingCompareRight !== 'conv' &&
                        samplingCompareRight !== 'quota' &&
                        samplingCompareRight !== 'purposive',
                      'exp-pop-in-sample-conv-right': samplingLastDrawRightIndices.has(cell.pos - 1) && samplingCompareRight === 'conv',
                      'exp-pop-in-sample-quota-right': samplingLastDrawRightIndices.has(cell.pos - 1) && samplingCompareRight === 'quota',
                      'exp-pop-in-sample-purposive': samplingLastDrawRightIndices.has(cell.pos - 1) && samplingCompareRight === 'purposive'
                    }"
                    :title="'#' + cell.pos + ', score ' + cell.score.toFixed(1) + ', ' + cell.sex + ', age ' + cell.age"
                    :style="assignmentCellBgStyle({ score: cell.score, sleepIssue: false })"
                  >
                    <span
                      v-if="samplingVizChipTextRight(cell)"
                      class="exp-sampling-viz-chip"
                      :class="samplingVizChipClassRight()"
                    >{{ samplingVizChipTextRight(cell) }}</span>
                    <span class="exp-cell-age">{{ cell.age }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <details class="exp-hist-readme">
          <summary>How to read these histograms</summary>
          <div class="exp-hist-readme-body">
            <p>
              The <strong>population</strong> plot is the distribution of <em>individual</em> scores (all N people). The <strong>left/right</strong> plots pool every
              <em>individual</em> score that appeared in any of your {{ lastSamplingReps }} sample(s) under that plan (if you ran multiple draws, bars count people across
              draws combined). The roster and μ are fixed; each new draw adds more scores to the pool (for random plans).
            </p>
            <ul>
              <li>
                <strong>Horizontal axis</strong> is the same score scale (about {{ samplingPopScoreMin.toFixed(0) }}–{{ samplingPopScoreMax.toFixed(0) }}) on all three
                charts so you can line them up. The dashed line marks <strong>μ</strong> (the population mean).
              </li>
              <li>
                <strong>Sample-score</strong> histograms: each bar = how many sampled people (total across repetitions) had a score in that range. Compare the shape to the
                population: good probability samples often look similar; biased rules shift mass. <strong>Vertical height</strong> is scaled per panel (don’t compare bar
                heights across panels).
              </li>
              <li>
                <strong>Means of x̄</strong> (average sample mean, bias, SD of x̄) are still shown under each plan—those summarize the <em>sampling</em> behavior of the mean,
                not the histogram bars.
              </li>
            </ul>
          </div>
        </details>

        <div class="exp-hist-wrap exp-hist-pop-section">
          <div class="exp-hist-title">Population: individual scores</div>
          <p class="exp-hist-blurb">How scores are spread across everyone on the roster (N = {{ popNDisplay }}). Line = μ = {{ popMean.toFixed(2) }}.</p>
          <svg class="exp-hist-svg" :viewBox="'0 0 ' + histW + ' ' + histH" xmlns="http://www.w3.org/2000/svg">
            <rect
              v-for="(bin, i) in histPopulation"
              :key="'hp' + i"
              :x="bin.x"
              :y="bin.y"
              :width="bin.w"
              :height="bin.h"
              class="exp-hist-rect exp-hist-rect-pop"
              rx="2"
            />
            <line
              :x1="muLineXCharts"
              :x2="muLineXCharts"
              y1="8"
              :y2="histH - 24"
              class="exp-hist-vline exp-hist-vline-mu"
            />
            <text :x="muLineXCharts + 4" y="20" class="exp-hist-vlabel exp-hist-vlabel-mu">μ</text>
          </svg>
          <p class="exp-hist-axis-caption">← person’s score →</p>
        </div>

        <p class="exp-sampling-compare-lead">
          <strong>Sampled people’s scores</strong> (same scale as population; dashed line = μ). Bars pool everyone who appeared in any draw; height scaled per panel.
        </p>

        <div class="exp-sampling-compare">
          <div
            class="exp-sampling-side"
            :class="compareLeftPlan.panelClass"
          >
            <div class="exp-sampling-side-head">
              <span class="exp-sampling-side-badge" :class="compareLeftPlan.random ? 'exp-badge-rand' : 'exp-badge-norand'">
                {{ compareLeftPlan.random ? 'Random' : 'Non-random' }}
              </span>
              <span class="exp-sampling-side-slot">Left</span>
            </div>
            <div class="exp-hist-title">{{ compareLeftPlan.shortTitle }}</div>
            <p class="exp-hist-blurb">{{ compareLeftPlan.blurb }}</p>
            <div class="exp-sampling-side-stats">
              Avg x̄ <strong>{{ compareLeftStats.meanOfMeans.toFixed(3) }}</strong>
              (bias {{ compareLeftStats.bias.toFixed(3) }}) · SD of x̄ <strong>{{ compareLeftStats.sd.toFixed(3) }}</strong>
            </div>
            <svg class="exp-hist-svg" :viewBox="'0 0 ' + histW + ' ' + histH" xmlns="http://www.w3.org/2000/svg">
              <rect
                v-for="(bin, i) in histCompareLeft"
                :key="'hl' + i"
                :x="bin.x"
                :y="bin.y"
                :width="bin.w"
                :height="bin.h"
                :class="['exp-hist-rect', compareLeftPlan.rectClass]"
                rx="2"
              />
              <line
                :x1="muLineXCharts"
                :x2="muLineXCharts"
                y1="8"
                :y2="histH - 24"
                class="exp-hist-vline exp-hist-vline-mu"
              />
              <text :x="muLineXCharts + 4" y="20" class="exp-hist-vlabel exp-hist-vlabel-mu">μ</text>
            </svg>
            <p class="exp-hist-axis-caption">← sampled person’s score →</p>
          </div>

          <div
            class="exp-sampling-side"
            :class="compareRightPlan.panelClass"
          >
            <div class="exp-sampling-side-head">
              <span class="exp-sampling-side-badge" :class="compareRightPlan.random ? 'exp-badge-rand' : 'exp-badge-norand'">
                {{ compareRightPlan.random ? 'Random' : 'Non-random' }}
              </span>
              <span class="exp-sampling-side-slot">Right</span>
            </div>
            <div class="exp-hist-title">{{ compareRightPlan.shortTitle }}</div>
            <p class="exp-hist-blurb">{{ compareRightPlan.blurb }}</p>
            <div class="exp-sampling-side-stats">
              Avg x̄ <strong>{{ compareRightStats.meanOfMeans.toFixed(3) }}</strong>
              (bias {{ compareRightStats.bias.toFixed(3) }}) · SD of x̄ <strong>{{ compareRightStats.sd.toFixed(3) }}</strong>
            </div>
            <svg class="exp-hist-svg" :viewBox="'0 0 ' + histW + ' ' + histH" xmlns="http://www.w3.org/2000/svg">
              <rect
                v-for="(bin, i) in histCompareRight"
                :key="'hr' + i"
                :x="bin.x"
                :y="bin.y"
                :width="bin.w"
                :height="bin.h"
                :class="['exp-hist-rect', compareRightPlan.rectClass]"
                rx="2"
              />
              <line
                :x1="muLineXCharts"
                :x2="muLineXCharts"
                y1="8"
                :y2="histH - 24"
                class="exp-hist-vline exp-hist-vline-mu"
              />
              <text :x="muLineXCharts + 4" y="20" class="exp-hist-vlabel exp-hist-vlabel-mu">μ</text>
            </svg>
            <p class="exp-hist-axis-caption">← sampled person’s score →</p>
          </div>
        </div>

        <details class="exp-scenario-details exp-details-tight">
          <summary>Notes on re-running and x̄ vs histograms</summary>
          <p class="exp-sim-note exp-sim-note-inner">
            Run again for a new roster. One repetition → one sample’s worth of scores in the bars; many repetitions → stack everyone sampled. Numbers under each plan (avg
            x̄, bias, SD of x̄) describe the <em>sampling distribution of the mean</em>, not the bar counts.
          </p>
        </details>
      </div>
    </section>
    </div>

    <div
      v-show="effectiveLabTab === 'assignment'"
      class="exp-concept-lab-panel"
      role="tabpanel"
      :aria-labelledby="embedTab == null ? 'exp-lab-tab-assignment' : undefined"
      :aria-label="embedTab != null ? 'Assignment mini-lab' : undefined"
    >
    <div class="exp-assign-visual-legend" aria-hidden="true">
      <div class="exp-legend exp-legend-row">
        <span>Worse sleep (lower score)</span>
        <div class="exp-legend-gradient" />
        <span>Better sleep (higher score)</span>
      </div>
      <div class="exp-assign-sleep-key">
        <span class="exp-assign-sleep-sample exp-cell exp-cell-sleep" :style="{ background: scoreColor(55) }" />
        <span>= screened <strong>sleep problems</strong> (yes)</span>
        <span class="exp-assign-sleep-sample exp-cell" :style="{ background: scoreColor(55) }" />
        <span>= no flagged sleep problems</span>
      </div>
      <div class="exp-assign-shape-key">
        <span
          class="exp-shape-ico exp-cell-shape exp-cell-shape-m"
          :style="assignmentCellBgStyle({ score: 55, sleepIssue: false })"
          aria-hidden="true"
        ><span class="exp-cell-age">20</span></span>
        <span>= male (square)</span>
        <span
          class="exp-shape-ico exp-cell-shape exp-cell-shape-f"
          :style="assignmentCellBgStyle({ score: 55, sleepIssue: false })"
          aria-hidden="true"
        ><span class="exp-cell-age">20</span></span>
        <span>= female (circle)</span>
        <span class="exp-assign-shape-key-note">Fill color = pre sleep score · number = age · purple bottom edge = screened sleep problems (yes).</span>
      </div>
    </div>

    <!-- —— Part 2 (assignment) —— -->
    <section class="exp-sim-section">
      <h4>2) Assigning conditions: who gets the sleep workshop?</h4>
      <p class="exp-sim-hint exp-sim-hint-compact">
        Same <strong>study pool</strong>, three rules: <strong>random</strong> shuffle → half workshop / half control; <strong>list-order</strong> = first half of the sign-up list vs second;
        <strong>blocked</strong> = random within screened sleep yes/no. Bottom stripe = sleep problem at <strong>pre</strong>. Use <strong>New pool</strong> to redraw the study sample.
      </p>
      <details class="exp-scenario-details">
        <summary>How does this simulation work?</summary>
        <div class="exp-details-body">
          <p>
            <strong>Study story:</strong> sleep-hygiene workshop vs waitlist. You’d compare <strong>pre vs post</strong> gains between groups; that’s clearest when groups match at
            <strong>pre</strong> on sleep score and screened problems (otherwise gains can reflect <strong>confounding</strong>). Roster order = <strong>sign-up order</strong> (early → late).
            Random assignment balances <strong>pre</strong> on average; list-order splits early vs late sign-ups (often unbalanced here); blocked assignment balances screened
            yes/no across groups.
          </p>
          <p>
            We simulate a <strong>large superpopulation</strong>, then draw your <strong>study pool</strong> as a simple random sample and sort by sign-up for the list rule. True means in
            the box are <strong>pre</strong> averages in that full superpopulation (until you click <strong>New superpopulation</strong>).
          </p>
        </div>
      </details>

      <div class="exp-sim-controls exp-assign-controls">
        <label>
          Superpopulation size N
          <input
            v-model.number="assignmentSuperPopN"
            type="number"
            min="2000"
            max="20000"
            step="500"
            @change="rebuildAssignmentSuperpopulation"
          />
        </label>
        <label>
          Study pool size (even)
          <input v-model.number="poolSize" type="number" min="8" max="80" step="2" @change="resampleAssignmentPool" />
        </label>
        <button type="button" class="btn-secondary" @click="rebuildAssignmentSuperpopulation">New superpopulation</button>
      </div>

      <div v-if="superpopTruth" class="exp-superpop-truth">
        <div class="exp-superpop-truth-title">True <strong>pre</strong> values in this superpopulation (N = {{ superpopTruth.N.toLocaleString() }})</div>
        <p class="exp-superpop-truth-body">
          Mean <strong>pre</strong> score among <strong>no</strong> screened sleep problems: <strong>{{ superpopTruth.muNo.toFixed(2) }}</strong> (n =
          {{ superpopTruth.nNo.toLocaleString() }}, SD ≈ {{ superpopTruth.sdNo.toFixed(2) }}). Among <strong>yes</strong> screened sleep problems:
          <strong>{{ superpopTruth.muYes.toFixed(2) }}</strong> (n = {{ superpopTruth.nYes.toLocaleString() }}, SD ≈ {{ superpopTruth.sdYes.toFixed(2) }}). Overall
          pre mean: {{ superpopTruth.muAll.toFixed(2) }} · {{ superpopTruth.piYes.toFixed(1) }}% with sleep problems at intake.
        </p>
        <details class="exp-scenario-details exp-superpop-details">
          <summary>Want to know how we generate this?</summary>
          <p class="exp-superpop-model exp-superpop-model-inner">
            <strong>Pre scores only:</strong> no problem ~ Normal({{ ASSIGN_MODEL_MU_NO }}, {{ ASSIGN_MODEL_SIGMA }}²); screened problem ~ Normal({{ ASSIGN_MODEL_MU_YES }},
            {{ ASSIGN_MODEL_SIGMA }}²) (lower μ when screened). P(screened) rises with later sign-up, so list-order splits confound <strong>pre</strong> groups.
          </p>
        </details>
      </div>

      <div v-if="superpopViz" class="exp-superviz-panel">
        <div class="exp-superviz-panel-head">
          <div class="exp-superviz-panel-title">First {{ superpopViz.nShown }} in this superpopulation (sign-up order)</div>
          <p class="exp-superviz-panel-lead">
            Same people left-to-right, top-to-bottom in each box. <strong>Blue ring</strong> = would go to <strong>sleep workshop</strong>; <strong>orange ring</strong> = <strong>waitlist
            control</strong>. Tile fill = pre sleep score; shape = sex; number = age; purple bottom edge = screened sleep problems.
          </p>
          <div class="exp-superviz-legend" aria-hidden="true">
            <span><span class="exp-superviz-legend-swatch exp-superviz-legend-w" /> Workshop</span>
            <span><span class="exp-superviz-legend-swatch exp-superviz-legend-c" /> Control</span>
          </div>
        </div>
        <div class="exp-superviz-boxes">
          <div class="exp-superviz-box">
            <div class="exp-superviz-box-title">Random assignment</div>
            <p class="exp-superviz-box-note">One random shuffle of these {{ superpopViz.nShown }} people, then first half → workshop (same logic as the cards below).</p>
            <div class="exp-superviz-cells" :style="{ '--cell': superpopVizCellPx + 'px' }">
              <span
                v-for="(p, i) in superpopViz.ordered"
                :key="'svr' + i"
                class="exp-cell exp-cell-shape"
                :class="[
                  superpopVizArmClass(superpopViz.maps.random, p),
                  { 'exp-cell-sleep': p.sleepIssue, 'exp-cell-shape-m': p.sex === 'M', 'exp-cell-shape-f': p.sex === 'F' }
                ]"
                :title="assignmentCellTitle(p)"
                :style="assignmentCellBgStyle(p)"
              >
                <span class="exp-cell-age">{{ p.age }}</span>
              </span>
            </div>
          </div>
          <div class="exp-superviz-box">
            <div class="exp-superviz-box-title">Non-random (list-order)</div>
            <p class="exp-superviz-box-note">Earlier sign-ups → workshop; later half → control (no shuffle).</p>
            <div class="exp-superviz-cells" :style="{ '--cell': superpopVizCellPx + 'px' }">
              <span
                v-for="(p, i) in superpopViz.ordered"
                :key="'svq' + i"
                class="exp-cell exp-cell-shape"
                :class="[
                  superpopVizArmClass(superpopViz.maps.seq, p),
                  { 'exp-cell-sleep': p.sleepIssue, 'exp-cell-shape-m': p.sex === 'M', 'exp-cell-shape-f': p.sex === 'F' }
                ]"
                :title="assignmentCellTitle(p)"
                :style="assignmentCellBgStyle(p)"
              >
                <span class="exp-cell-age">{{ p.age }}</span>
              </span>
            </div>
          </div>
          <div class="exp-superviz-box">
            <div class="exp-superviz-box-title">Stratified (blocked)</div>
            <p class="exp-superviz-box-note">Random within screened sleep yes/no so each group gets about the same mix of flags.</p>
            <div class="exp-superviz-cells" :style="{ '--cell': superpopVizCellPx + 'px' }">
              <span
                v-for="(p, i) in superpopViz.ordered"
                :key="'svb' + i"
                class="exp-cell exp-cell-shape"
                :class="[
                  superpopVizArmClass(superpopViz.maps.blocked, p),
                  { 'exp-cell-sleep': p.sleepIssue, 'exp-cell-shape-m': p.sex === 'M', 'exp-cell-shape-f': p.sex === 'F' }
                ]"
                :title="assignmentCellTitle(p)"
                :style="assignmentCellBgStyle(p)"
              >
                <span class="exp-cell-age">{{ p.age }}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <p v-if="assignmentPoolSummary" class="exp-assign-pool-summary">{{ assignmentPoolSummary }}</p>

      <div v-if="subgroupPoolStats" class="exp-subgroup-panel">
        <div class="exp-subgroup-heading">Pre-score by sleep screen (this pool)</div>
        <table class="exp-subgroup-table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Screened sleep problems</th>
              <th scope="col">No flagged problems</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Count</th>
              <td>{{ subgroupPoolStats.nYes }}</td>
              <td>{{ subgroupPoolStats.nNo }}</td>
            </tr>
            <tr>
              <th scope="row">Mean pre-score (10–100)</th>
              <td>{{ subgroupPoolStats.meanPreYes != null ? subgroupPoolStats.meanPreYes.toFixed(2) : '—' }}</td>
              <td>{{ subgroupPoolStats.meanPreNo != null ? subgroupPoolStats.meanPreNo.toFixed(2) : '—' }}</td>
            </tr>
          </tbody>
        </table>
        <p class="exp-subgroup-note">Higher pre-score = better sleep on this scale.</p>
      </div>

      <div class="exp-split-grid">
        <div class="exp-split-card exp-split-random">
          <div class="exp-split-card-head">
            <span class="exp-badge exp-badge-t">Random assignment</span>
            <span class="exp-split-sub">Shuffle the pool, then first half → workshop, second half → control.</span>
          </div>
          <div class="exp-dual-panels">
            <div class="exp-panel">
              <div class="exp-panel-label">Sleep workshop</div>
              <div class="exp-cell-grid" :style="{ '--cell': cellSize + 'px' }">
                <span
                  v-for="(p, i) in randomGroups.a"
                  :key="'ra' + i"
                  class="exp-cell exp-cell-shape"
                  :class="{
                    'exp-cell-sleep': p.sleepIssue,
                    'exp-cell-shape-m': p.sex === 'M',
                    'exp-cell-shape-f': p.sex === 'F'
                  }"
                  :title="assignmentCellTitle(p)"
                  :style="assignmentCellBgStyle(p)"
                >
                  <span class="exp-cell-age">{{ p.age }}</span>
                </span>
              </div>
              <div class="exp-panel-mean">Mean <strong>pre</strong> score: <strong>{{ personMean(randomGroups.a).toFixed(1) }}</strong></div>
              <div class="exp-panel-sleep">{{ sleepMixLine(randomGroups.a, 'Workshop') }}</div>
            </div>
            <div class="exp-panel">
              <div class="exp-panel-label">Waitlist control</div>
              <div class="exp-cell-grid" :style="{ '--cell': cellSize + 'px' }">
                <span
                  v-for="(p, i) in randomGroups.b"
                  :key="'rb' + i"
                  class="exp-cell exp-cell-shape"
                  :class="{
                    'exp-cell-sleep': p.sleepIssue,
                    'exp-cell-shape-m': p.sex === 'M',
                    'exp-cell-shape-f': p.sex === 'F'
                  }"
                  :title="assignmentCellTitle(p)"
                  :style="assignmentCellBgStyle(p)"
                >
                  <span class="exp-cell-age">{{ p.age }}</span>
                </span>
              </div>
              <div class="exp-panel-mean">Mean <strong>pre</strong> score: <strong>{{ personMean(randomGroups.b).toFixed(1) }}</strong></div>
              <div class="exp-panel-sleep">{{ sleepMixLine(randomGroups.b, 'Control') }}</div>
            </div>
          </div>
          <div class="exp-mean-bar-wrap">
            <div class="exp-mean-bar-label">Pre gap |workshop − control| on sleep score (before treatment)</div>
            <MeanCompareBar
              :a="personMean(randomGroups.a)"
              :b="personMean(randomGroups.b)"
              :max="100"
              workshop-title="Workshop mean pre score"
              control-title="Control mean pre score"
            />
            <div class="exp-mean-diff">
              <strong>{{ randomSplitAbs.toFixed(2) }}</strong> points (pre score) · screened-sleep mix gap at pre
              <strong>{{ randomSleepSplitAbs.toFixed(1) }}</strong> pp
            </div>
          </div>
          <div v-if="randomArmOutcomes" class="exp-arm-outcome">
            <div class="exp-arm-outcome-title">Group means — pre, expected post, expected change (post − pre)</div>
            <p class="exp-arm-outcome-note">
              Expected gain uses the model μ (no random draw): +{{ ASSIGN_DELTA_WORKSHOP_EXTRA }} in the workshop arm; base μ =
              {{ ASSIGN_DELTA_NO_SLEEP_MU }} (no sleep flag) or {{ ASSIGN_DELTA_SLEEP_MU }} (screened).
            </p>
            <table class="exp-arm-outcome-table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Workshop</th>
                  <th scope="col">Control</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Mean pre (10–100)</th>
                  <td>{{ randomArmOutcomes.preW.toFixed(2) }}</td>
                  <td>{{ randomArmOutcomes.preC.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th scope="row">Mean post (expected)</th>
                  <td>{{ randomArmOutcomes.postW.toFixed(2) }}</td>
                  <td>{{ randomArmOutcomes.postC.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th scope="row">Mean change (expected)</th>
                  <td>{{ randomArmOutcomes.chgW.toFixed(2) }}</td>
                  <td>{{ randomArmOutcomes.chgC.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="exp-split-card exp-split-seq">
          <div class="exp-split-card-head">
            <span class="exp-badge exp-badge-warn">Non-random (sign-up list)</span>
            <span class="exp-split-sub">First half of the sign-up list → workshop; second half → control (no shuffle).</span>
          </div>
          <div class="exp-dual-panels">
            <div class="exp-panel">
              <div class="exp-panel-label">Sleep workshop</div>
              <div class="exp-cell-grid" :style="{ '--cell': cellSize + 'px' }">
                <span
                  v-for="(p, i) in seqGroups.a"
                  :key="'sa' + i"
                  class="exp-cell exp-cell-shape"
                  :class="{
                    'exp-cell-sleep': p.sleepIssue,
                    'exp-cell-shape-m': p.sex === 'M',
                    'exp-cell-shape-f': p.sex === 'F'
                  }"
                  :title="assignmentCellTitle(p)"
                  :style="assignmentCellBgStyle(p)"
                >
                  <span class="exp-cell-age">{{ p.age }}</span>
                </span>
              </div>
              <div class="exp-panel-mean">Mean <strong>pre</strong> score: <strong>{{ personMean(seqGroups.a).toFixed(1) }}</strong></div>
              <div class="exp-panel-sleep">{{ sleepMixLine(seqGroups.a, 'Workshop') }}</div>
            </div>
            <div class="exp-panel">
              <div class="exp-panel-label">Waitlist control</div>
              <div class="exp-cell-grid" :style="{ '--cell': cellSize + 'px' }">
                <span
                  v-for="(p, i) in seqGroups.b"
                  :key="'sb' + i"
                  class="exp-cell exp-cell-shape"
                  :class="{
                    'exp-cell-sleep': p.sleepIssue,
                    'exp-cell-shape-m': p.sex === 'M',
                    'exp-cell-shape-f': p.sex === 'F'
                  }"
                  :title="assignmentCellTitle(p)"
                  :style="assignmentCellBgStyle(p)"
                >
                  <span class="exp-cell-age">{{ p.age }}</span>
                </span>
              </div>
              <div class="exp-panel-mean">Mean <strong>pre</strong> score: <strong>{{ personMean(seqGroups.b).toFixed(1) }}</strong></div>
              <div class="exp-panel-sleep">{{ sleepMixLine(seqGroups.b, 'Control') }}</div>
            </div>
          </div>
          <div class="exp-mean-bar-wrap">
            <div class="exp-mean-bar-label">Pre gap |workshop − control| on sleep score (before treatment)</div>
            <MeanCompareBar
              :a="personMean(seqGroups.a)"
              :b="personMean(seqGroups.b)"
              :max="100"
              workshop-title="Workshop mean pre score"
              control-title="Control mean pre score"
            />
            <div class="exp-mean-diff">
              <strong>{{ seqSplitAbs.toFixed(2) }}</strong> points (pre score) · screened-sleep mix gap at pre
              <strong>{{ seqSleepSplitAbs.toFixed(1) }}</strong> pp
            </div>
          </div>
          <div v-if="seqArmOutcomes" class="exp-arm-outcome">
            <div class="exp-arm-outcome-title">Group means — pre, expected post, expected change (post − pre)</div>
            <table class="exp-arm-outcome-table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Workshop</th>
                  <th scope="col">Control</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Mean pre (10–100)</th>
                  <td>{{ seqArmOutcomes.preW.toFixed(2) }}</td>
                  <td>{{ seqArmOutcomes.preC.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th scope="row">Mean post (expected)</th>
                  <td>{{ seqArmOutcomes.postW.toFixed(2) }}</td>
                  <td>{{ seqArmOutcomes.postC.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th scope="row">Mean change (expected)</th>
                  <td>{{ seqArmOutcomes.chgW.toFixed(2) }}</td>
                  <td>{{ seqArmOutcomes.chgC.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="exp-split-card exp-split-blocked">
          <div class="exp-split-card-head">
            <span class="exp-badge exp-badge-blocked">Stratified (blocked) assignment</span>
            <span class="exp-split-sub">
              Randomize separately within sleep-problem yes vs no so workshop and control get about the same share with problems.
            </span>
          </div>
          <div class="exp-dual-panels">
            <div class="exp-panel">
              <div class="exp-panel-label">Sleep workshop</div>
              <div class="exp-cell-grid" :style="{ '--cell': cellSize + 'px' }">
                <span
                  v-for="(p, i) in blockedGroups.a"
                  :key="'ba' + i"
                  class="exp-cell exp-cell-shape"
                  :class="{
                    'exp-cell-sleep': p.sleepIssue,
                    'exp-cell-shape-m': p.sex === 'M',
                    'exp-cell-shape-f': p.sex === 'F'
                  }"
                  :title="assignmentCellTitle(p)"
                  :style="assignmentCellBgStyle(p)"
                >
                  <span class="exp-cell-age">{{ p.age }}</span>
                </span>
              </div>
              <div class="exp-panel-mean">Mean <strong>pre</strong> score: <strong>{{ personMean(blockedGroups.a).toFixed(1) }}</strong></div>
              <div class="exp-panel-sleep">{{ sleepMixLine(blockedGroups.a, 'Workshop') }}</div>
            </div>
            <div class="exp-panel">
              <div class="exp-panel-label">Waitlist control</div>
              <div class="exp-cell-grid" :style="{ '--cell': cellSize + 'px' }">
                <span
                  v-for="(p, i) in blockedGroups.b"
                  :key="'bb' + i"
                  class="exp-cell exp-cell-shape"
                  :class="{
                    'exp-cell-sleep': p.sleepIssue,
                    'exp-cell-shape-m': p.sex === 'M',
                    'exp-cell-shape-f': p.sex === 'F'
                  }"
                  :title="assignmentCellTitle(p)"
                  :style="assignmentCellBgStyle(p)"
                >
                  <span class="exp-cell-age">{{ p.age }}</span>
                </span>
              </div>
              <div class="exp-panel-mean">Mean <strong>pre</strong> score: <strong>{{ personMean(blockedGroups.b).toFixed(1) }}</strong></div>
              <div class="exp-panel-sleep">{{ sleepMixLine(blockedGroups.b, 'Control') }}</div>
            </div>
          </div>
          <div class="exp-mean-bar-wrap">
            <div class="exp-mean-bar-label">Pre gap |workshop − control| on sleep score (before treatment)</div>
            <MeanCompareBar
              :a="personMean(blockedGroups.a)"
              :b="personMean(blockedGroups.b)"
              :max="100"
              workshop-title="Workshop mean pre score"
              control-title="Control mean pre score"
            />
            <div class="exp-mean-diff">
              <strong>{{ blockedSplitAbs.toFixed(2) }}</strong> points (pre score) · screened-sleep mix gap at pre
              <strong>{{ blockedSleepSplitAbs.toFixed(1) }}</strong> pp
            </div>
          </div>
          <div v-if="blockedArmOutcomes" class="exp-arm-outcome">
            <div class="exp-arm-outcome-title">Group means — pre, expected post, expected change (post − pre)</div>
            <table class="exp-arm-outcome-table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Workshop</th>
                  <th scope="col">Control</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Mean pre (10–100)</th>
                  <td>{{ blockedArmOutcomes.preW.toFixed(2) }}</td>
                  <td>{{ blockedArmOutcomes.preC.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th scope="row">Mean post (expected)</th>
                  <td>{{ blockedArmOutcomes.postW.toFixed(2) }}</td>
                  <td>{{ blockedArmOutcomes.postC.toFixed(2) }}</td>
                </tr>
                <tr>
                  <th scope="row">Mean change (expected)</th>
                  <td>{{ blockedArmOutcomes.chgW.toFixed(2) }}</td>
                  <td>{{ blockedArmOutcomes.chgC.toFixed(2) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="exp-assign-new-pool-wrap">
        <button type="button" class="btn-new-pool" @click="resampleAssignmentPool">New pool (same N)</button>
      </div>

      <details class="exp-scenario-details exp-details-tight">
        <summary>Why pre balance still matters</summary>
        <p class="exp-sim-note exp-sim-note-inner">
          The expected post/change rows use the <em>same</em> gain model for everyone with a given sleep flag and group. If workshop and control differ a lot at
          <strong>pre</strong>, a larger workshop mean change does not by itself prove the program caused it—confounding can drive both pre scores and natural recovery. Random
          and blocked rules usually bring pre means closer; list-order often does not.
        </p>
      </details>

      <div class="exp-assign-causality-box" role="region" aria-labelledby="exp-assign-causality-heading">
        <h4 id="exp-assign-causality-heading" class="exp-assign-causality-title">Sampling and assignment: both matter for causal experiments</h4>
        <p class="exp-assign-causality-lead">
          This mini-lab splits <strong>how you recruit</strong> people (sampling tab) from <strong>how you split them into conditions</strong> (assignment above). For studies that
          aim to show that a treatment <em>caused</em> better outcomes—and that the finding is not just a fluke of who showed up—you usually want both kinds of design discipline.
        </p>
        <ul class="exp-assign-causality-list">
          <li>
            <strong>Random sampling</strong> (or another probability-based design with a clear target population) addresses <strong>external validity</strong>: it ties the people in the
            study to the larger group you want to talk about. Convenience or volunteer samples can make a causal contrast hard to <em>generalize</em>, and selection into the study
            can itself confound who is compared.
          </li>
          <li>
            <strong>Random assignment</strong> addresses <strong>internal validity</strong> for the treatment effect: it tends to balance pre-treatment differences between workshop and
            control so differences in pre→post change are easier to attribute to the program rather than to who landed in which arm. It does not fix a biased or unrepresentative
            sample by itself.
          </li>
        </ul>
        <p class="exp-assign-causality-close">
          <strong>Together:</strong> defensible sampling supports “these results matter for <em>this</em> population,” and random assignment supports “the gap we see is plausibly
          due to the treatment in <em>this</em> trial.” Experimental design for causality leans on <strong>both</strong>; neither replaces the other.
        </p>
      </div>
    </section>
    </div>

    <p class="exp-sim-foot exp-sim-foot-brief">
      <strong>Takeaway:</strong> <em>Sampling</em> is how well <strong>x̄</strong> targets <strong>μ</strong>; <em>assignment</em> balances <strong>pre</strong> measures so <strong>pre→post</strong> gains are easier to interpret.
    </p>
    <details class="exp-scenario-details exp-foot-details">
      <summary>Full design takeaway</summary>
      <p class="exp-sim-foot exp-sim-foot-inner">
        Probability <em>sampling</em> makes sample means track μ over repeated draws—compare the population histogram to pooled sampled scores; the summaries under each
        sampling plan describe how x̄ behaves. Random or stratified <em>assignment</em> (separate idea) helps workshop and control match on <strong>pre</strong> measures (sleep score and
        screened problems), so <strong>pre → post change</strong> is easier to interpret as treatment effectiveness. Volunteer and snowball samples need their own frame story in the
        field.
      </p>
    </details>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import MeanCompareBar from './ExperimentalSamplingSimulationMeanBar.vue'

const props = defineProps({
  /** When set (e.g. from Class Home), hide inner tabs and lock to one panel */
  embedTab: {
    type: String,
    default: null,
    validator: (v) => v == null || v === 'sampling' || v === 'assignment'
  }
})

const poolSize = ref(40)

/** Inner sub-tabs when embedTab is not set */
const activeConceptLabTab = ref('sampling')
const effectiveLabTab = computed(() => props.embedTab ?? activeConceptLabTab.value)

/** Superpopulation for assignment mini-lab (built first; pool is an SRS sorted by sign-up). */
const assignmentSuperPopN = ref(10000)
const assignmentSuperPop = ref([])

/** First N people of superpopulation by sign-up, with W/C maps for three rules (preview below superpopulation stats). */
const SUPERPOP_VIZ_N = 200
const superpopViz = ref(null)
const superpopVizCellPx = 10

const popN = ref(2000)
const sampleN = ref(40)
const samplingReps = ref(500)
const lastSamplingReps = ref(500)

const samplingRepsClamped = computed(() =>
  Math.min(500, Math.max(1, Math.floor(Number(samplingReps.value) || 1)))
)

/** Assignment mini-lab: baseline sleep score, sleep-problem flag, sex (M/F), age; pool order = sign-up order. */
const assignmentPool = ref([])

const randomGroups = ref({ a: [], b: [] })
const seqGroups = ref({ a: [], b: [] })
const blockedGroups = ref({ a: [], b: [] })

const popMean = ref(0)
const samplingSimDone = ref(false)
const samplingMeta = ref('')

/** Fixed roster display: prefix of the roster for context in the grid preview */
const SAMPLING_POP_GRID_MAX = 200
/** Max tiles in the preview grid after merging prefix + last-draw selections (cluster can be large) */
const SAMPLING_POP_PREVIEW_HARD_CAP = 420
const samplingPopGrid = ref([])
const samplingPopGridTruncated = ref(false)
const samplingPopScoreMin = ref(0)
const samplingPopScoreMax = ref(100)
const samplingPopDormSize = ref(0)

const SAMPLING_METHOD_KEYS = ['srs', 'strat', 'clust', 'sys', 'stage', 'conv', 'quota', 'purposive']

/** Sample means x̄ per repetition — only keys from the last run are filled */
const samplingMeansByMethod = ref(
  Object.fromEntries(SAMPLING_METHOD_KEYS.map((k) => [k, []]))
)
/** All individual scores appearing in samples (pooled across repetitions) — for compare histograms */
const samplingSampleScoresByMethod = ref(
  Object.fromEntries(SAMPLING_METHOD_KEYS.map((k) => [k, []]))
)
const samplingCompareLeft = ref('srs')
const samplingCompareRight = ref('conv')

const histPopulation = ref([])
const histCompareLeft = ref([])
const histCompareRight = ref([])
const muLineXCharts = ref(0)
const samplingLastPopScores = ref([])

/** Roster indices (0-based) included in the final repetition’s draw — for “who was selected” grids */
const samplingLastDrawLeftIndices = ref(new Set())
const samplingLastDrawRightIndices = ref(new Set())

/** Roster indices in the order people entered the sample (last run)—for convenience & quota chips */
const samplingLastDrawLeftOrder = ref([])
const samplingLastDrawRightOrder = ref([])

/** Quota-only: roster indices passed over while walking the list (stratum already full)—last run */
const samplingQuotaSkippedLeft = ref(new Set())
const samplingQuotaSkippedRight = ref(new Set())

/** Last-run walk summary for dedicated quota vs convenience UI */
const samplingQuotaWalkMetaLeft = ref(null)
const samplingQuotaWalkMetaRight = ref(null)
const samplingConvenienceWalkMetaLeft = ref(null)
const samplingConvenienceWalkMetaRight = ref(null)

const QUOTA_WALK_STRIP_MAX = 120
const CONVENIENCE_WALK_STRIP_MAX = 72
const CONVENIENCE_WALK_TAIL_LEN = 28

const histW = 380
const histH = 148

const N_DORMS = 40
const N_STRATA = 4

const SAMPLING_PLAN_META = {
  srs: {
    shortTitle: 'SRS',
    random: true,
    blurb: 'Every set of n* students equally likely (simple random sample).',
    howItWorks:
      'Each student on the roster gets the same chance to be picked. The simulation draws n* distinct people at random without replacement—no dorm or list-order rule.',
    selectionVizExplain:
      'Probability sample: no fixed list or score rule—chips stay off because order is not part of the definition of SRS.',
    panelClass: 'exp-hist-srs',
    rectClass: 'exp-hist-rect-srs'
  },
  strat: {
    shortTitle: 'Stratified',
    random: true,
    blurb: 'Proportional n* from each class year, then SRS within year.',
    howItWorks:
      'The roster is grouped by class year. The sample size from each year matches its share of campus, then students are chosen randomly within each year so every stratum contributes.',
    selectionVizExplain:
      'Stratified random: counts per class year are fixed, then people are drawn at random inside each year—tiles usually do NOT form a simple “first n* on the list” block.',
    panelClass: 'exp-hist-strat',
    rectClass: 'exp-hist-rect-strat'
  },
  clust: {
    shortTitle: 'Cluster (one-stage)',
    random: true,
    blurb: 'Random dorms; everyone in chosen halls (n* students total).',
    howItWorks:
      'A random set of dorms is chosen first; everyone living in those buildings is included. Because hallmates have similar scores, each draw can look very different from the next.',
    selectionVizExplain:
      'Cluster sample: whole residence halls are taken; highlighted tiles tend to appear as long runs (everyone in a hall) rather than scattered individuals.',
    panelClass: 'exp-hist-clust',
    rectClass: 'exp-hist-rect-clust'
  },
  sys: {
    shortTitle: 'Systematic',
    random: true,
    blurb: 'Random list start, then every kth student so n* fits the roster.',
    howItWorks:
      'After a random starting row on the ordered registrar list, the simulation takes every kth student until n* people are included—fast, and unbiased if list order is not periodic with scores.',
    selectionVizExplain:
      'Systematic: after a random start, every kth person on the list—highlights fall on evenly spaced roster positions (like stripes when you read the grid left-to-right).',
    panelClass: 'exp-hist-sys',
    rectClass: 'exp-hist-rect-sys'
  },
  stage: {
    shortTitle: 'Multi-stage',
    random: true,
    blurb: 'Random dorms, then SRS of n* from students in those halls only.',
    howItWorks:
      'First a random subset of dorms is selected, then n* students are drawn at random only from people in those halls—two stages, like many real campus surveys.',
    selectionVizExplain:
      'Multi-stage: only people in randomly chosen dorms stay eligible, then n* are picked at random inside that subsample—outline “clumps” by hall plus scattered picks within.',
    panelClass: 'exp-hist-stage',
    rectClass: 'exp-hist-rect-stage'
  },
  conv: {
    shortTitle: 'Convenience',
    random: false,
    blurb: 'The first n* list positions—no skipping, no balancing across class years.',
    howItWorks:
      'Literally the first n* names on the registrar list: everyone in list positions 1…n* is in the sample, everyone after that is out. No one is “passed over” in order to hit stratum targets.',
    selectionVizExplain:
      'The **orange list-walk strip** is only the first n* positions—every slot counts, none skipped. Below, the campus roster grid uses the same highlight rule (prefix of the list).',
    panelClass: 'exp-hist-conv',
    rectClass: 'exp-hist-rect-conv'
  },
  quota: {
    shortTitle: 'Quota (list order)',
    random: false,
    blurb: 'Correct counts per class year, but who fills those slots is whoever appears first while you walk the list.',
    howItWorks:
      'Like stratified sampling you fix how many frosh, soph, … you want—but you do **not** draw randomly within each year. You read the list from the top and take the next person whose class-year quota still has room; if their year is already full, you **skip** them and keep walking. That is different from convenience, which never skips the next name.',
    selectionVizExplain:
      '**Teal list-walk strip** = read the registrar in order: teal = into the sample, striped = **passed over** (that class-year target full). The table shows targets vs achieved. You often read **past** list #n*—unlike convenience.',
    panelClass: 'exp-hist-quota',
    rectClass: 'exp-hist-rect-quota'
  },
  purposive: {
    shortTitle: 'Purposive',
    random: false,
    blurb: 'The n* students with the highest scores (judgment sample).',
    howItWorks:
      'The researcher deliberately chooses the n* highest scores on the roster. That pulls the upper tail of scores, so the sample mean is usually biased above μ.',
    selectionVizExplain:
      'Purposive (non-random): the n* highest scores on campus, wherever they sit on the list. Purple #1…#n = score rank (#1 highest)—tiles are usually scattered, not a list prefix, and fills look “hotter” (high scores).',
    panelClass: 'exp-hist-purposive',
    rectClass: 'exp-hist-rect-purposive'
  }
}

const compareLeftPlan = computed(() => SAMPLING_PLAN_META[samplingCompareLeft.value] || SAMPLING_PLAN_META.srs)
const compareRightPlan = computed(() => SAMPLING_PLAN_META[samplingCompareRight.value] || SAMPLING_PLAN_META.conv)

function meanStatsForKey(key) {
  const arr = samplingMeansByMethod.value[key] || []
  const mu = popMean.value
  if (!arr.length) return { meanOfMeans: 0, bias: 0, sd: 0 }
  const m = mean(arr)
  return { meanOfMeans: m, bias: m - mu, sd: stdev(arr) }
}

const compareLeftStats = computed(() => meanStatsForKey(samplingCompareLeft.value))
const compareRightStats = computed(() => meanStatsForKey(samplingCompareRight.value))

const pickOrderMapLeft = computed(() => {
  const m = new Map()
  samplingLastDrawLeftOrder.value.forEach((idx, seq) => m.set(idx, seq + 1))
  return m
})
const pickOrderMapRight = computed(() => {
  const m = new Map()
  samplingLastDrawRightOrder.value.forEach((idx, seq) => m.set(idx, seq + 1))
  return m
})

const purposiveRankMapLeft = computed(() => {
  if (samplingCompareLeft.value !== 'purposive') return new Map()
  const cells = samplingPopGrid.value.filter((c) => samplingLastDrawLeftIndices.value.has(c.pos - 1))
  const sorted = [...cells].sort((a, b) => b.score - a.score || a.pos - b.pos)
  const m = new Map()
  sorted.forEach((c, j) => m.set(c.pos - 1, j + 1))
  return m
})

const purposiveRankMapRight = computed(() => {
  if (samplingCompareRight.value !== 'purposive') return new Map()
  const cells = samplingPopGrid.value.filter((c) => samplingLastDrawRightIndices.value.has(c.pos - 1))
  const sorted = [...cells].sort((a, b) => b.score - a.score || a.pos - b.pos)
  const m = new Map()
  sorted.forEach((c, j) => m.set(c.pos - 1, j + 1))
  return m
})

const samplingLastDrawVizClassLeft = computed(() => {
  const k = samplingCompareLeft.value
  if (k === 'conv') return 'exp-sampling-viz-mode-conv'
  if (k === 'quota') return 'exp-sampling-viz-mode-quota'
  if (k === 'purposive') return 'exp-sampling-viz-mode-purposive'
  if (SAMPLING_PLAN_META[k]?.random) return 'exp-sampling-viz-mode-random'
  return ''
})

const samplingLastDrawVizClassRight = computed(() => {
  const k = samplingCompareRight.value
  if (k === 'conv') return 'exp-sampling-viz-mode-conv'
  if (k === 'quota') return 'exp-sampling-viz-mode-quota'
  if (k === 'purposive') return 'exp-sampling-viz-mode-purposive'
  if (SAMPLING_PLAN_META[k]?.random) return 'exp-sampling-viz-mode-random'
  return ''
})

function samplingVizChipTextLeft(cell) {
  const idx = cell.pos - 1
  if (!samplingLastDrawLeftIndices.value.has(idx)) return ''
  const method = samplingCompareLeft.value
  if (method === 'purposive') {
    const r = purposiveRankMapLeft.value.get(idx)
    return r != null ? `#${r}` : ''
  }
  if (method === 'conv') {
    const o = pickOrderMapLeft.value.get(idx)
    return o != null ? String(o) : ''
  }
  if (method === 'quota') {
    const o = pickOrderMapLeft.value.get(idx)
    if (o == null) return ''
    const y = typeof cell.stratum === 'number' ? cell.stratum + 1 : 1
    return `${o}·y${y}`
  }
  return ''
}

function samplingVizChipTextRight(cell) {
  const idx = cell.pos - 1
  if (!samplingLastDrawRightIndices.value.has(idx)) return ''
  const method = samplingCompareRight.value
  if (method === 'purposive') {
    const r = purposiveRankMapRight.value.get(idx)
    return r != null ? `#${r}` : ''
  }
  if (method === 'conv') {
    const o = pickOrderMapRight.value.get(idx)
    return o != null ? String(o) : ''
  }
  if (method === 'quota') {
    const o = pickOrderMapRight.value.get(idx)
    if (o == null) return ''
    const y = typeof cell.stratum === 'number' ? cell.stratum + 1 : 1
    return `${o}·y${y}`
  }
  return ''
}

function samplingVizChipClassLeft() {
  const m = samplingCompareLeft.value
  if (m === 'purposive') return 'exp-sampling-viz-chip-rank'
  if (m === 'conv') return 'exp-sampling-viz-chip-list'
  if (m === 'quota') return 'exp-sampling-viz-chip-quota'
  return ''
}

function samplingVizChipClassRight() {
  const m = samplingCompareRight.value
  if (m === 'purposive') return 'exp-sampling-viz-chip-rank'
  if (m === 'conv') return 'exp-sampling-viz-chip-list'
  if (m === 'quota') return 'exp-sampling-viz-chip-quota'
  return ''
}

function quotaWalkStripIndicesFromMeta(meta) {
  if (!meta || meta.lastRosterIndex < 0) return []
  const to = Math.min(meta.lastRosterIndex, QUOTA_WALK_STRIP_MAX - 1)
  return Array.from({ length: to + 1 }, (_, i) => i)
}

function quotaWalkStripClassLeft(idx) {
  if (samplingLastDrawLeftIndices.value.has(idx)) return 'exp-walk-tile exp-walk-tile-quota-in'
  if (samplingQuotaSkippedLeft.value.has(idx)) return 'exp-walk-tile exp-walk-tile-quota-skip'
  return 'exp-walk-tile exp-walk-tile-future'
}

function quotaWalkStripClassRight(idx) {
  if (samplingLastDrawRightIndices.value.has(idx)) return 'exp-walk-tile exp-walk-tile-quota-in'
  if (samplingQuotaSkippedRight.value.has(idx)) return 'exp-walk-tile exp-walk-tile-quota-skip'
  return 'exp-walk-tile exp-walk-tile-future'
}

function quotaWalkStripTitleLeft(idx) {
  const n = idx + 1
  if (samplingLastDrawLeftIndices.value.has(idx)) return `List row #${n}: included in quota sample`
  if (samplingQuotaSkippedLeft.value.has(idx)) return `List row #${n}: passed over (class-year quota already full)`
  return `List row #${n}`
}

function quotaWalkStripTitleRight(idx) {
  const n = idx + 1
  if (samplingLastDrawRightIndices.value.has(idx)) return `List row #${n}: included in quota sample`
  if (samplingQuotaSkippedRight.value.has(idx)) return `List row #${n}: passed over (class-year quota already full)`
  return `List row #${n}`
}

function convenienceWalkTakenFromMeta(meta) {
  if (!meta) return []
  return Array.from({ length: Math.min(meta.n, CONVENIENCE_WALK_STRIP_MAX) }, (_, i) => i)
}

function convenienceWalkTailIndices() {
  return Array.from({ length: CONVENIENCE_WALK_TAIL_LEN }, (_, j) => j)
}

function mean(arr) {
  if (!arr.length) return 0
  return arr.reduce((s, x) => s + x, 0) / arr.length
}

function stdev(arr) {
  if (arr.length < 2) return 0
  const m = mean(arr)
  const v = arr.reduce((s, x) => s + (x - m) ** 2, 0) / (arr.length - 1)
  return Math.sqrt(v)
}

/** Map score 10–100 to a visible color (low = blue, high = orange-red) */
function scoreColor(score) {
  const t = Math.max(0, Math.min(1, (score - 10) / 90))
  const h = 210 - t * 150
  const s = 55 + t * 25
  const l = 38 + t * 12
  return `hsl(${h} ${s}% ${l}%)`
}

/** Target Normal means (baseline sleep quality); same σ for both groups. Sleep-problem subgroup has lower μ. */
const ASSIGN_MODEL_MU_NO = 71
const ASSIGN_MODEL_MU_YES = 54
const ASSIGN_MODEL_SIGMA = 10

function clampScore(x) {
  return Math.max(10, Math.min(100, x))
}

function randn() {
  let u = 0
  let v = 0
  while (u === 0) u = Math.random()
  while (v === 0) v = Math.random()
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v)
}

/** Outcome model: expected gain (post − pre) μ; workshop adds a fixed lift. σ is not used for the displayed expected means. */
const ASSIGN_DELTA_NO_SLEEP_MU = 1.0
const ASSIGN_DELTA_SLEEP_MU = 6.0
const ASSIGN_DELTA_WORKSHOP_EXTRA = 5.0

function expectedGainMu(person, inWorkshop) {
  const baseMu = person.sleepIssue ? ASSIGN_DELTA_SLEEP_MU : ASSIGN_DELTA_NO_SLEEP_MU
  return baseMu + (inWorkshop ? ASSIGN_DELTA_WORKSHOP_EXTRA : 0)
}

function meanExpectedGain(people, inWorkshop) {
  if (!people?.length) return 0
  return mean(people.map((p) => expectedGainMu(p, inWorkshop)))
}

function meanExpectedPost(people, inWorkshop) {
  if (!people?.length) return 0
  return mean(people.map((p) => p.score + expectedGainMu(p, inWorkshop)))
}

function armOutcomeSummary(workshopPeople, controlPeople) {
  if (!workshopPeople?.length || !controlPeople?.length) return null
  return {
    preW: personMean(workshopPeople),
    preC: personMean(controlPeople),
    postW: meanExpectedPost(workshopPeople, true),
    postC: meanExpectedPost(controlPeople, false),
    chgW: meanExpectedGain(workshopPeople, true),
    chgC: meanExpectedGain(controlPeople, false)
  }
}

const randomArmOutcomes = computed(() => armOutcomeSummary(randomGroups.value.a, randomGroups.value.b))
const seqArmOutcomes = computed(() => armOutcomeSummary(seqGroups.value.a, seqGroups.value.b))
const blockedArmOutcomes = computed(() => armOutcomeSummary(blockedGroups.value.a, blockedGroups.value.b))

function assignmentCellBgStyle(p) {
  const c = scoreColor(p.score)
  if (p.sleepIssue) {
    return {
      background: `linear-gradient(to top, rgba(91, 33, 182, 0.92) 3px, transparent 3px), ${c}`
    }
  }
  return { background: c }
}

/**
 * Giant superpopulation: screened sleep issue yes/no, then baseline ~ Normal(μ, σ²) with μ lower if yes.
 * listOrder = sign-up time proxy; P(screened) increases with later sign-up (list-order confounding when assigned by list).
 */
function buildAssignmentSuperpopulation(N) {
  const out = []
  for (let i = 0; i < N; i++) {
    const listOrder = Math.random()
    const pSleep = 0.18 + listOrder * 0.52
    const sleepIssue = Math.random() < pSleep
    const mu = sleepIssue ? ASSIGN_MODEL_MU_YES : ASSIGN_MODEL_MU_NO
    const score = clampScore(mu + randn() * ASSIGN_MODEL_SIGMA)
    const sex = Math.random() < 0.5 ? 'M' : 'F'
    const age = 18 + Math.floor(Math.random() * 7)
    out.push({ score, sleepIssue, listOrder, sex, age })
  }
  return out
}

/** SRS of n from superpopulation; roster order = sign-up (sorted by listOrder). */
function samplePoolFromSuper(superArr, n) {
  const idx = sampleSRSIndices(superArr.length, n)
  const picked = idx.map((i) => ({ ...superArr[i] }))
  picked.sort((a, b) => a.listOrder - b.listOrder)
  return picked
}

/** Roster: dorm (cluster) → list order; class year (stratum) balanced within dorm but order shuffled so quota ≠ convenience. */
function campusClusterSize(N) {
  return Math.max(1, Math.floor(N / N_DORMS))
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

function generateCampusPopulation(Nraw) {
  const m = campusClusterSize(Nraw)
  const Nuse = N_DORMS * m
  const stratumMeans = [44, 50, 56, 62]
  const clusterEffect = Array.from({ length: N_DORMS }, () => (Math.random() - 0.5) * 10)
  const people = []
  for (let c = 0; c < N_DORMS; c++) {
    const dorm = []
    for (let j = 0; j < m; j++) {
      const stratum = j % N_STRATA
      const score = clampScore(
        stratumMeans[stratum] + clusterEffect[c] + (Math.random() - 0.5) * 12
      )
      const sex = Math.random() < 0.5 ? 'M' : 'F'
      const age = 18 + Math.floor(Math.random() * 7)
      dorm.push({ score, stratum, cluster: c, sex, age })
    }
    shuffleInPlace(dorm)
    for (const p of dorm) {
      p.rosterIndex = people.length
      people.push(p)
    }
  }
  return { people, Nuse, m }
}

function meanPeople(arr) {
  if (!arr.length) return 0
  return mean(arr.map((p) => p.score))
}

/** Largest-remainder proportional allocation (stratified sampling). */
function allocateProportional(counts, n) {
  const Ntot = counts.reduce((a, b) => a + b, 0)
  if (Ntot === 0) return counts.map(() => 0)
  const exact = counts.map((c) => (n * c) / Ntot)
  const base = exact.map((x) => Math.floor(x))
  let leftover = n - base.reduce((a, b) => a + b, 0)
  const rem = exact.map((x, i) => ({ i, r: x - Math.floor(x) })).sort((a, b) => b.r - a.r)
  for (let k = 0; k < leftover; k++) base[rem[k % rem.length].i]++
  return base
}

function sampleSRSFromPeople(people, n) {
  const N = people.length
  const idx = sampleSRSIndices(N, n)
  return idx.map((i) => people[i])
}

function sampleSRSIndices(N, n) {
  const idx = new Set()
  while (idx.size < n) {
    idx.add(Math.floor(Math.random() * N))
  }
  return [...idx]
}

function sampleStratified(people, n) {
  const byS = Array.from({ length: N_STRATA }, () => [])
  for (const p of people) byS[p.stratum].push(p)
  const counts = byS.map((a) => a.length)
  const alloc = allocateProportional(counts, n)
  const out = []
  for (let s = 0; s < N_STRATA; s++) {
    const pool = [...byS[s]]
    shuffle(pool)
    out.push(...pool.slice(0, alloc[s]))
  }
  return out
}

function sampleCluster(people, k) {
  const ids = [...Array(N_DORMS).keys()]
  shuffle(ids)
  const chosen = new Set(ids.slice(0, k))
  return people.filter((p) => chosen.has(p.cluster))
}

function sampleConvenience(people, n) {
  return people.slice(0, n)
}

/** Random start; every step-th index until n drawn (probability sample if list has no hidden period). */
function sampleSystematic(people, n) {
  const N = people.length
  if (n >= N) return [...people]
  const step = Math.floor(N / n)
  if (step < 1) return sampleSRSFromPeople(people, n)
  const maxStart = N - 1 - (n - 1) * step
  const start = maxStart >= 0 ? Math.floor(Math.random() * (maxStart + 1)) : 0
  const out = []
  for (let i = 0; i < n; i++) out.push(people[start + i * step])
  return out
}

/** Random clusters, then SRS of n from the union of those dorms. */
function sampleMultistage(people, k, n) {
  const ids = [...Array(N_DORMS).keys()]
  shuffle(ids)
  const chosen = new Set(ids.slice(0, k))
  const pool = people.filter((p) => chosen.has(p.cluster))
  return sampleSRSFromPeople(pool, Math.min(n, pool.length))
}

/**
 * Stratum targets met by scanning the registrar list (non-random within stratum).
 * Returns who was selected and roster indices that were **passed over** because that stratum was already full—
 * for teaching contrast with convenience (no pass-overs).
 */
function sampleQuotaDetailed(people, n) {
  const byS = Array.from({ length: N_STRATA }, () => [])
  for (const p of people) byS[p.stratum].push(p)
  const counts = byS.map((a) => a.length)
  const alloc = allocateProportional(counts, n)
  const got = Array(N_STRATA).fill(0)
  const out = []
  const skippedIndices = []
  let lastCheckedRosterIndex = -1
  for (const p of people) {
    if (out.length >= n) break
    lastCheckedRosterIndex = p.rosterIndex
    const s = p.stratum
    if (got[s] < alloc[s]) {
      out.push(p)
      got[s]++
    } else {
      skippedIndices.push(p.rosterIndex)
    }
  }
  const inSampleByStratum = [0, 0, 0, 0]
  for (const p of out) {
    if (typeof p.stratum === 'number' && p.stratum >= 0 && p.stratum < N_STRATA) inSampleByStratum[p.stratum]++
  }
  const checkedSlots = out.length + skippedIndices.length
  return {
    selected: out,
    skippedIndices,
    lastCheckedRosterIndex,
    targetByStratum: alloc,
    inSampleByStratum,
    checkedSlots
  }
}

function sampleQuota(people, n) {
  return sampleQuotaDetailed(people, n).selected
}

/** Judgment: n highest scores on the roster. */
function samplePurposiveHigh(people, n) {
  return [...people].sort((a, b) => b.score - a.score).slice(0, n)
}

/** @param nTarget exact list-sample size (SRS, convenience, quota, …); cluster uses k dorms only */
function sampleDrawForMethod(method, people, nTarget, k) {
  switch (method) {
    case 'srs':
      return sampleSRSFromPeople(people, nTarget)
    case 'strat':
      return sampleStratified(people, nTarget)
    case 'clust':
      return sampleCluster(people, k)
    case 'sys':
      return sampleSystematic(people, nTarget)
    case 'stage':
      return sampleMultistage(people, k, nTarget)
    case 'conv':
      return sampleConvenience(people, nTarget)
    case 'quota':
      return sampleQuota(people, nTarget)
    case 'purposive':
      return samplePurposiveHigh(people, nTarget)
    default:
      return sampleSRSFromPeople(people, nTarget)
  }
}

function sampleMeanForMethod(method, people, nTarget, k) {
  return meanPeople(sampleDrawForMethod(method, people, nTarget, k))
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
}

function splitRandomGroups(people) {
  const idx = people.map((_, i) => i)
  shuffle(idx)
  const half = Math.floor(people.length / 2)
  const a = idx.slice(0, half).map((i) => people[i])
  const b = idx.slice(half).map((i) => people[i])
  return { a, b }
}

function splitSequentialGroups(people) {
  const half = Math.floor(people.length / 2)
  return { a: people.slice(0, half), b: people.slice(half) }
}

/** Proportional allocation of sleep-problem yes/no so each group matches the pool rate; random within strata. */
function splitBlockedGroups(people) {
  const n = people.length
  const half = n / 2
  const yes = people.filter((p) => p.sleepIssue)
  const no = people.filter((p) => !p.sleepIssue)
  shuffle(yes)
  shuffle(no)
  const n1 = yes.length
  const n1InT = Math.round((n1 * half) / n)
  const tYes = yes.slice(0, n1InT)
  const cYes = yes.slice(n1InT)
  const needNoInT = half - tYes.length
  if (needNoInT < 0 || needNoInT > no.length) return splitRandomGroups(people)
  const tNo = no.slice(0, needNoInT)
  const cNo = no.slice(needNoInT)
  return { a: [...tYes, ...tNo], b: [...cYes, ...cNo] }
}

function armMapFromSplit(split) {
  const m = new Map()
  for (const p of split.a) m.set(p, 'W')
  for (const p of split.b) m.set(p, 'C')
  return m
}

function recomputeSuperpopViz() {
  const sp = assignmentSuperPop.value
  if (!sp.length) {
    superpopViz.value = null
    return
  }
  const sorted = [...sp].sort((a, b) => a.listOrder - b.listOrder)
  const ordered = sorted.slice(0, Math.min(SUPERPOP_VIZ_N, sorted.length))
  if (!ordered.length) {
    superpopViz.value = null
    return
  }
  const r = splitRandomGroups([...ordered])
  const q = splitSequentialGroups(ordered)
  const b = splitBlockedGroups([...ordered])
  superpopViz.value = {
    nShown: ordered.length,
    ordered,
    maps: {
      random: armMapFromSplit(r),
      seq: armMapFromSplit(q),
      blocked: armMapFromSplit(b)
    }
  }
}

function superpopVizArmClass(map, p) {
  return map.get(p) === 'W' ? 'exp-superviz-w' : 'exp-superviz-c'
}

function personMean(people) {
  if (!people?.length) return 0
  return mean(people.map((p) => p.score))
}

function pctSleepIssues(people) {
  if (!people?.length) return 0
  return (100 * people.filter((p) => p.sleepIssue).length) / people.length
}

function sleepPctDiffAbs(a, b) {
  return Math.abs(pctSleepIssues(a) - pctSleepIssues(b))
}

function assignmentCellTitle(p) {
  const shape = p.sex === 'F' ? 'female (circle)' : 'male (square)'
  const sleep = p.sleepIssue ? 'screened sleep problems yes' : 'sleep problems no'
  return `Pre ~${p.score.toFixed(1)} (fill) · age ${p.age} · ${shape} · ${sleep}`
}

function sleepMixLine(people, label) {
  if (!people?.length) return ''
  const k = people.filter((p) => p.sleepIssue).length
  const pct = pctSleepIssues(people)
  return `${label} (at pre): ${k}/${people.length} with screened sleep problems (${pct.toFixed(0)}%)`
}

function rebuildAssignmentSuperpopulation() {
  let N = Math.floor(Number(assignmentSuperPopN.value) || 10000)
  N = Math.min(20000, Math.max(2000, Math.round(N / 500) * 500))
  assignmentSuperPopN.value = N
  assignmentSuperPop.value = buildAssignmentSuperpopulation(N)
  recomputeSuperpopViz()
  samplePoolIntoAssignment()
}

function samplePoolIntoAssignment() {
  let n = Math.min(80, Math.max(8, Math.floor(poolSize.value / 2) * 2))
  poolSize.value = n
  const superArr = assignmentSuperPop.value
  if (!superArr.length || n > superArr.length) {
    assignmentPool.value = []
    updateSplits()
    return
  }
  assignmentPool.value = samplePoolFromSuper(superArr, n)
  updateSplits()
}

function resampleAssignmentPool() {
  if (!assignmentSuperPop.value.length) {
    rebuildAssignmentSuperpopulation()
    return
  }
  samplePoolIntoAssignment()
}

function updateSplits() {
  const s = assignmentPool.value
  if (!s.length) {
    randomGroups.value = { a: [], b: [] }
    seqGroups.value = { a: [], b: [] }
    blockedGroups.value = { a: [], b: [] }
    return
  }
  randomGroups.value = splitRandomGroups(s)
  seqGroups.value = splitSequentialGroups(s)
  blockedGroups.value = splitBlockedGroups(s)
}

const randomSplitAbs = computed(() => Math.abs(personMean(randomGroups.value.a) - personMean(randomGroups.value.b)))
const seqSplitAbs = computed(() => Math.abs(personMean(seqGroups.value.a) - personMean(seqGroups.value.b)))
const blockedSplitAbs = computed(() => Math.abs(personMean(blockedGroups.value.a) - personMean(blockedGroups.value.b)))

const randomSleepSplitAbs = computed(() => sleepPctDiffAbs(randomGroups.value.a, randomGroups.value.b))
const seqSleepSplitAbs = computed(() => sleepPctDiffAbs(seqGroups.value.a, seqGroups.value.b))
const blockedSleepSplitAbs = computed(() => sleepPctDiffAbs(blockedGroups.value.a, blockedGroups.value.b))

const superpopTruth = computed(() => {
  const sp = assignmentSuperPop.value
  if (!sp.length) return null
  const yes = sp.filter((p) => p.sleepIssue)
  const no = sp.filter((p) => !p.sleepIssue)
  const scoresY = yes.map((p) => p.score)
  const scoresN = no.map((p) => p.score)
  return {
    N: sp.length,
    nYes: yes.length,
    nNo: no.length,
    piYes: (100 * yes.length) / sp.length,
    muYes: mean(scoresY),
    muNo: mean(scoresN),
    muAll: mean(sp.map((p) => p.score)),
    sdYes: scoresY.length > 1 ? stdev(scoresY) : 0,
    sdNo: scoresN.length > 1 ? stdev(scoresN) : 0
  }
})

const assignmentPoolSummary = computed(() => {
  const p = assignmentPool.value
  if (!p.length) return ''
  const n1 = p.filter((x) => x.sleepIssue).length
  const pct = (100 * n1) / p.length
  const sup = assignmentSuperPop.value.length
  return `Study pool: simple random sample of ${p.length} from the superpopulation (N = ${sup.toLocaleString()}), sorted by sign-up. At pre, ${n1} of ${p.length} (${pct.toFixed(0)}%) have flagged sleep problems.`
})

const subgroupPoolStats = computed(() => {
  const s = assignmentPool.value
  if (!s.length) return null
  const yes = s.filter((p) => p.sleepIssue)
  const no = s.filter((p) => !p.sleepIssue)
  return {
    nYes: yes.length,
    nNo: no.length,
    meanPreYes: yes.length ? personMean(yes) : null,
    meanPreNo: no.length ? personMean(no) : null
  }
})

const cellSize = computed(() => {
  const n = assignmentPool.value.length
  if (n <= 24) return 26
  if (n <= 40) return 22
  return 18
})

const popNDisplay = ref(0)

/**
 * Roster grid for the UI: first {@link SAMPLING_POP_GRID_MAX} people for context, plus anyone
 * in the last-run left/right samples so cluster / multi-stage (and other designs) are not
 * only off-screen when those selections fall past the initial prefix.
 */
function buildSamplingPopGridForPreview(lastPeople, leftSet, rightSet, quotaSkipLeft, quotaSkipRight) {
  const N = lastPeople.length
  if (!N) return { cells: [], truncated: false }

  const addValid = (s, target) => {
    for (const idx of s) {
      if (typeof idx === 'number' && Number.isFinite(idx) && idx >= 0 && idx < N) target.add(idx)
    }
  }

  const prefixLen = Math.min(SAMPLING_POP_GRID_MAX, N)
  const ix = new Set()
  for (let i = 0; i < prefixLen; i++) ix.add(i)
  addValid(leftSet, ix)
  addValid(rightSet, ix)
  addValid(quotaSkipLeft, ix)
  addValid(quotaSkipRight, ix)

  let sorted = [...ix].sort((a, b) => a - b)

  if (sorted.length > SAMPLING_POP_PREVIEW_HARD_CAP) {
    const must = new Set()
    addValid(leftSet, must)
    addValid(rightSet, must)
    addValid(quotaSkipLeft, must)
    addValid(quotaSkipRight, must)
    let mustArr = [...must].sort((a, b) => a - b)
    if (mustArr.length > SAMPLING_POP_PREVIEW_HARD_CAP) {
      mustArr = mustArr.slice(0, SAMPLING_POP_PREVIEW_HARD_CAP)
    }
    sorted = [...mustArr]
    const seen = new Set(sorted)
    for (let i = 0; i < prefixLen && sorted.length < SAMPLING_POP_PREVIEW_HARD_CAP; i++) {
      if (!seen.has(i)) {
        sorted.push(i)
        seen.add(i)
      }
    }
    sorted.sort((a, b) => a - b)
  }

  const lastShownRosterIdx = sorted.length ? sorted[sorted.length - 1] : -1
  const truncated = sorted.length < N || lastShownRosterIdx < N - 1

  const cells = sorted.map((rosterIdx) => {
    const p = lastPeople[rosterIdx]
    return {
      pos: rosterIdx + 1,
      score: p.score,
      scoreRounded: Math.round(p.score),
      sex: p.sex ?? '—',
      age: p.age ?? '—',
      stratum: typeof p.stratum === 'number' ? p.stratum : 0
    }
  })
  return { cells, truncated }
}

function runSamplingSim() {
  const nTarget = Math.min(200, Math.max(20, Math.floor(sampleN.value)))
  sampleN.value = nTarget
  samplingReps.value = samplingRepsClamped.value

  const left = samplingCompareLeft.value
  const right = samplingCompareRight.value
  const keysToRun = left === right ? [left] : [left, right]

  const trials = samplingRepsClamped.value
  lastSamplingReps.value = trials
  const meanBuckets = Object.fromEntries(keysToRun.map((k) => [k, []]))
  const scoreBuckets = Object.fromEntries(keysToRun.map((k) => [k, []]))

  const Nreq = Math.max(200, Math.floor(popN.value))
  const { people, Nuse, m } = generateCampusPopulation(Nreq)
  const lastPeople = people
  const lastNuse = Nuse
  const lastM = m

  const k = Math.min(N_DORMS, Math.max(1, Math.ceil(nTarget / m)))
  /** User’s target n* for list-based designs (not forced to k× dorm size—that was inflating convenience/quota past the control). */
  const nList = Math.min(nTarget, Nuse)

  const scores = lastPeople.map((p) => p.score)
  samplingLastPopScores.value = scores
  samplingPopScoreMin.value = Math.min(...scores)
  samplingPopScoreMax.value = Math.max(...scores)
  samplingPopDormSize.value = m
  samplingQuotaSkippedLeft.value = new Set()
  samplingQuotaSkippedRight.value = new Set()
  samplingQuotaWalkMetaLeft.value = null
  samplingQuotaWalkMetaRight.value = null
  samplingConvenienceWalkMetaLeft.value = null
  samplingConvenienceWalkMetaRight.value = null

  for (let t = 0; t < trials; t++) {
    for (const key of keysToRun) {
      let draw
      let quotaDetail = null
      if (key === 'quota') {
        quotaDetail = sampleQuotaDetailed(lastPeople, nList)
        draw = quotaDetail.selected
      } else {
        draw = sampleDrawForMethod(key, lastPeople, nList, k)
      }
      meanBuckets[key].push(meanPeople(draw))
      for (const p of draw) scoreBuckets[key].push(p.score)
      if (t === trials - 1) {
        const idxOrder = draw.map((p) => p.rosterIndex).filter((i) => typeof i === 'number' && i >= 0)
        const idxSet = new Set(idxOrder)
        if (key === left) {
          samplingLastDrawLeftIndices.value = idxSet
          samplingLastDrawLeftOrder.value = idxOrder
          if (quotaDetail) {
            samplingQuotaSkippedLeft.value = new Set(quotaDetail.skippedIndices)
            samplingQuotaWalkMetaLeft.value = {
              n: nList,
              checkedSlots: quotaDetail.checkedSlots,
              skipped: quotaDetail.skippedIndices.length,
              lastRosterIndex: quotaDetail.lastCheckedRosterIndex,
              lastRosterDisplay: quotaDetail.lastCheckedRosterIndex + 1,
              targetByStratum: [...quotaDetail.targetByStratum],
              inSampleByStratum: [...quotaDetail.inSampleByStratum]
            }
            samplingConvenienceWalkMetaLeft.value = null
          } else {
            samplingQuotaSkippedLeft.value = new Set()
            samplingQuotaWalkMetaLeft.value = null
            samplingConvenienceWalkMetaLeft.value = key === 'conv' ? { n: nList } : null
          }
        }
        if (key === right) {
          samplingLastDrawRightIndices.value = idxSet
          samplingLastDrawRightOrder.value = idxOrder
          if (quotaDetail) {
            samplingQuotaSkippedRight.value = new Set(quotaDetail.skippedIndices)
            samplingQuotaWalkMetaRight.value = {
              n: nList,
              checkedSlots: quotaDetail.checkedSlots,
              skipped: quotaDetail.skippedIndices.length,
              lastRosterIndex: quotaDetail.lastCheckedRosterIndex,
              lastRosterDisplay: quotaDetail.lastCheckedRosterIndex + 1,
              targetByStratum: [...quotaDetail.targetByStratum],
              inSampleByStratum: [...quotaDetail.inSampleByStratum]
            }
            samplingConvenienceWalkMetaRight.value = null
          } else {
            samplingQuotaSkippedRight.value = new Set()
            samplingQuotaWalkMetaRight.value = null
            samplingConvenienceWalkMetaRight.value = key === 'conv' ? { n: nList } : null
          }
        }
      }
    }
  }

  const preview = buildSamplingPopGridForPreview(
    lastPeople,
    samplingLastDrawLeftIndices.value,
    samplingLastDrawRightIndices.value,
    samplingQuotaSkippedLeft.value,
    samplingQuotaSkippedRight.value
  )
  samplingPopGrid.value = preview.cells
  samplingPopGridTruncated.value = preview.truncated

  popN.value = lastNuse
  popNDisplay.value = lastNuse
  popMean.value = meanPeople(lastPeople)

  const planLabels = keysToRun.map((k) => SAMPLING_PLAN_META[k]?.shortTitle || k).join(' vs ')
  samplingMeta.value = `One fixed roster (μ = ${popMean.value.toFixed(2)}). ${trials} sample${trials === 1 ? '' : 's'} each for: ${planLabels}. Target n* = ${nList} (cluster designs can include more people when whole dorms are taken), N = ${lastNuse}.`

  const cleared = Object.fromEntries(SAMPLING_METHOD_KEYS.map((k) => [k, []]))
  samplingMeansByMethod.value = { ...cleared, ...meanBuckets }
  samplingSampleScoresByMethod.value = { ...cleared, ...scoreBuckets }
  rebuildSamplingHistograms()
  samplingSimDone.value = true
}

function histogramRectsForValues(values, lo, hi, nbins, innerW, innerH, pad) {
  const binW = (hi - lo) / nbins
  const bins = Array(nbins).fill(0)
  for (const v of values) {
    let b = Math.floor((v - lo) / binW)
    if (b >= nbins) b = nbins - 1
    if (b < 0) b = 0
    bins[b]++
  }
  const maxCount = Math.max(...bins, 1)
  const bw = innerW / nbins
  const rects = []
  for (let i = 0; i < nbins; i++) {
    const h = (bins[i] / maxCount) * innerH
    rects.push({
      x: pad + i * bw + 1,
      y: pad + innerH - h,
      w: bw - 2,
      h: Math.max(0, h)
    })
  }
  return rects
}

function numericMin(arr) {
  if (!arr?.length) return Infinity
  let m = arr[0]
  for (let i = 1; i < arr.length; i++) if (arr[i] < m) m = arr[i]
  return m
}

function numericMax(arr) {
  if (!arr?.length) return -Infinity
  let m = arr[0]
  for (let i = 1; i < arr.length; i++) if (arr[i] > m) m = arr[i]
  return m
}

function rebuildSamplingHistograms() {
  const mu = popMean.value
  const popScores = samplingLastPopScores.value
  const valsA = samplingSampleScoresByMethod.value[samplingCompareLeft.value]
  const valsB = samplingSampleScoresByMethod.value[samplingCompareRight.value]
  if (!valsA?.length || !valsB?.length || !popScores.length) return

  const minM = Math.min(numericMin(popScores), numericMin(valsA), numericMin(valsB), mu)
  const maxM = Math.max(numericMax(popScores), numericMax(valsA), numericMax(valsB), mu)
  const span = Math.max(2, maxM - minM)
  const lo = minM - span * 0.05
  const hi = maxM + span * 0.05
  const nbins = 20
  const pad = 14
  const innerW = histW - pad * 2
  const innerH = histH - 36

  histPopulation.value = histogramRectsForValues(popScores, lo, hi, nbins, innerW, innerH, pad)
  histCompareLeft.value = histogramRectsForValues(valsA, lo, hi, nbins, innerW, innerH, pad)
  histCompareRight.value = histogramRectsForValues(valsB, lo, hi, nbins, innerW, innerH, pad)

  const xMu = pad + ((mu - lo) / (hi - lo)) * innerW
  muLineXCharts.value = Math.max(pad, Math.min(histW - pad, xMu))
}

watch([samplingCompareLeft, samplingCompareRight], () => {
  samplingSimDone.value = false
})

watch(samplingReps, () => {
  samplingSimDone.value = false
})

onMounted(() => {
  rebuildAssignmentSuperpopulation()
})

</script>

<style scoped>
.exp-sim {
  margin-bottom: 1.25rem;
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.exp-concept-lab-tabs {
  display: flex;
  gap: 0.5rem;
  margin: 1rem 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.exp-concept-lab-tab {
  flex: 1;
  max-width: 14rem;
  padding: 0.65rem 1rem;
  border-radius: 0.5rem;
  border: 2px solid transparent;
  background: color-mix(in srgb, var(--bg-primary) 88%, var(--border));
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
}

.exp-concept-lab-tab:hover {
  background: color-mix(in srgb, var(--bg-primary) 75%, var(--border));
  color: var(--text-primary);
}

.exp-concept-lab-tab.is-active {
  background: var(--primary);
  color: var(--primary-fg, #fff);
  border-color: var(--primary);
}

.exp-concept-lab-tab:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}

.exp-concept-lab-panel {
  animation: exp-lab-panel-in 0.2s ease;
}

@keyframes exp-lab-panel-in {
  from {
    opacity: 0.85;
  }
  to {
    opacity: 1;
  }
}

.exp-sim-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
}

.exp-sim-lead {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0 0 0.75rem 0;
}

.exp-legend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
}

.exp-legend-gradient {
  flex: 1;
  max-width: 200px;
  height: 10px;
  border-radius: 4px;
  background: linear-gradient(90deg, hsl(210 55% 38%), hsl(60 70% 48%));
  border: 1px solid var(--border);
}

.exp-sim-section {
  margin-top: 1rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
}

.exp-sim-section h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
}

.exp-sim-hint {
  font-size: 0.88rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem 0;
  line-height: 1.45;
}

.exp-sim-hint-compact {
  margin-bottom: 0.5rem;
}

.exp-details-body {
  font-size: 0.84rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.exp-details-body p {
  margin: 0 0 0.5rem 0;
}

.exp-details-body p:last-child {
  margin-bottom: 0;
}

.exp-details-intro {
  margin: 0 0 0.5rem 0;
  font-size: 0.84rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.exp-details-tight {
  margin-top: 0.35rem;
  margin-bottom: 0.5rem;
}

.exp-superpop-details {
  margin-top: 0.45rem;
}

.exp-superpop-model-inner {
  margin: 0.35rem 0 0 0;
}

.exp-sim-note-inner {
  margin: 0;
}

.exp-sim-foot-brief {
  margin: 0 0 0.35rem 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.exp-foot-details {
  margin: 0 0 1rem 0;
}

.exp-sim-foot-inner {
  margin: 0;
  font-size: 0.82rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.exp-sampling-legend-in-details {
  margin: 0 0 0.5rem 0;
}

.exp-sampling-scenario-note {
  margin: 0;
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.exp-sim-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  margin: 0.5rem 0 1rem 0;
}

.exp-sim-controls label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.exp-sim-controls input {
  width: 6.5rem;
  padding: 0.35rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  background: var(--bg-primary);
  color: var(--text-primary);
}

.exp-assign-visual-legend {
  margin-top: 1rem;
  margin-bottom: 0.85rem;
}

.exp-legend-row {
  margin-bottom: 0.45rem;
}

.exp-assign-sleep-key {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.85rem;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.exp-assign-shape-key {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.75rem;
  margin-top: 0.4rem;
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.exp-shape-ico {
  width: 22px;
  height: 22px;
  flex-shrink: 0;
}

.exp-assign-shape-key-note {
  flex-basis: 100%;
  margin: 0;
  font-size: 0.74rem;
  color: var(--text-muted);
}

.exp-assign-sleep-sample {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.exp-assign-pool-summary {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin: 0 0 0.65rem 0;
  line-height: 1.45;
}

.exp-subgroup-panel {
  margin: 0 0 0.85rem 0;
  padding: 0.55rem 0.65rem;
  border-radius: 0.45rem;
  border: 1px solid color-mix(in srgb, var(--primary) 22%, var(--border));
  background: color-mix(in srgb, var(--bg-primary) 94%, transparent);
}

.exp-subgroup-after-bars {
  margin-top: 0.85rem;
}

.exp-subgroup-heading {
  font-size: 0.82rem;
  font-weight: 700;
  margin: 0 0 0.45rem 0;
  color: var(--text-primary);
}

.exp-subgroup-table {
  width: 100%;
  max-width: 36rem;
  border-collapse: collapse;
  font-size: 0.78rem;
  color: var(--text-secondary);
}

.exp-subgroup-table th,
.exp-subgroup-table td {
  border: 1px solid var(--border);
  padding: 0.35rem 0.5rem;
  text-align: left;
}

.exp-subgroup-table thead th {
  background: color-mix(in srgb, var(--bg-primary) 85%, transparent);
  font-weight: 600;
  color: var(--text-primary);
}

.exp-subgroup-table tbody th[scope='row'] {
  font-weight: 600;
  color: var(--text-secondary);
  white-space: nowrap;
}

.exp-subgroup-note {
  margin: 0.4rem 0 0 0;
  font-size: 0.72rem;
  color: var(--text-muted);
  line-height: 1.35;
}

.exp-subgroup-missing {
  margin: 0;
  font-size: 0.78rem;
  color: var(--text-muted);
}

.exp-superpop-truth {
  font-size: 0.8rem;
  margin: 0 0 0.75rem 0;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-primary) 92%, transparent);
}

.exp-superpop-truth-title {
  font-weight: 700;
  margin-bottom: 0.35rem;
  color: var(--text-primary);
}

.exp-superpop-truth-body {
  margin: 0 0 0.45rem 0;
  line-height: 1.45;
  color: var(--text-secondary);
}

.exp-superpop-model {
  margin: 0;
  font-size: 0.74rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.exp-superviz-panel {
  margin: 0.85rem 0 1rem 0;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-primary) 94%, var(--primary) 4%);
}

.exp-superviz-panel-head {
  margin-bottom: 0.65rem;
}

.exp-superviz-panel-title {
  font-weight: 700;
  font-size: 0.88rem;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.exp-superviz-panel-lead {
  margin: 0 0 0.45rem 0;
  font-size: 0.78rem;
  line-height: 1.45;
  color: var(--text-secondary);
}

.exp-superviz-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.25rem;
  font-size: 0.74rem;
  color: var(--text-muted);
}

.exp-superviz-legend-swatch {
  display: inline-block;
  width: 14px;
  height: 14px;
  border-radius: 3px;
  margin-right: 0.35rem;
  vertical-align: middle;
  background: color-mix(in srgb, var(--bg-primary) 70%, var(--border));
}

.exp-superviz-legend-w {
  outline: 2px solid #2563eb;
  outline-offset: -1px;
}

.exp-superviz-legend-c {
  outline: 2px solid #ea580c;
  outline-offset: -1px;
}

.exp-superviz-boxes {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

@media (min-width: 960px) {
  .exp-superviz-boxes {
    grid-template-columns: repeat(3, 1fr);
  }
}

.exp-superviz-box {
  padding: 0.5rem 0.45rem;
  border-radius: 0.4rem;
  border: 1px solid color-mix(in srgb, var(--border) 90%, transparent);
  background: var(--bg-card);
}

.exp-superviz-box-title {
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.exp-superviz-box-note {
  margin: 0 0 0.45rem 0;
  font-size: 0.7rem;
  line-height: 1.35;
  color: var(--text-muted);
}

.exp-superviz-cells {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  align-content: flex-start;
  max-height: 11rem;
  overflow: auto;
  padding: 0.2rem;
  border-radius: 0.3rem;
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
  background: color-mix(in srgb, var(--bg-primary) 96%, transparent);
}

.exp-superviz-w {
  outline: 2px solid #2563eb;
  outline-offset: -1px;
  z-index: 1;
}

.exp-superviz-c {
  outline: 2px solid #ea580c;
  outline-offset: -1px;
  z-index: 0;
}

.exp-sim-controls.exp-assign-controls input {
  width: 7.25rem;
}

.exp-split-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 720px) {
  .exp-split-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (min-width: 1180px) {
  .exp-split-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.exp-split-card {
  border: 1px solid var(--border);
  border-radius: 0.65rem;
  padding: 0.75rem;
  background: color-mix(in srgb, var(--bg-primary) 88%, transparent);
}

.exp-split-card-head {
  margin-bottom: 0.5rem;
}

.exp-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 0.35rem;
}

.exp-badge-t {
  background: color-mix(in srgb, var(--primary) 28%, transparent);
  color: var(--primary);
}

.exp-badge-warn {
  background: color-mix(in srgb, #f59e0b 35%, transparent);
  color: #b45309;
}

.exp-badge-blocked {
  background: color-mix(in srgb, #0d9488 30%, transparent);
  color: #0f766e;
}

.exp-split-blocked {
  border-color: color-mix(in srgb, #0d9488 28%, var(--border));
}

.exp-split-sub {
  display: block;
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: 0.25rem;
}

.exp-dual-panels {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
}

.exp-panel-label {
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.35rem;
}

.exp-cell-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3px;
  min-height: 3rem;
  align-content: flex-start;
}

.exp-cell {
  flex-shrink: 0;
  border: 1px solid rgba(0, 0, 0, 0.14);
}

.exp-cell-shape {
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--cell, 22px);
  height: var(--cell, 22px);
  box-sizing: border-box;
  line-height: 1;
}

.exp-cell-shape-m {
  border-radius: 3px;
}

.exp-cell-shape-f {
  border-radius: 50%;
}

.exp-cell-age {
  font-size: 0.52rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  color: rgba(15, 23, 42, 0.92);
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.95), 0 0 1px rgba(255, 255, 255, 1);
  pointer-events: none;
}

/* Legend-only sleep stripe (assignment tiles use gradient on .exp-cell-shape). */
.exp-cell-sleep:not(.exp-cell-shape) {
  box-shadow: inset 0 -3px 0 rgba(91, 33, 182, 0.92);
}

.exp-panel-mean {
  font-size: 0.78rem;
  margin-top: 0.35rem;
  color: var(--text-secondary);
}

.exp-panel-sleep {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-top: 0.2rem;
  line-height: 1.35;
}

.exp-mean-bar-wrap {
  margin-top: 0.65rem;
  padding-top: 0.5rem;
  border-top: 1px dashed var(--border);
}

.exp-mean-bar-label {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.exp-mean-diff {
  text-align: right;
  font-size: 0.8rem;
  margin-top: 0.25rem;
  color: var(--text-secondary);
}

.exp-arm-outcome {
  margin-top: 0.65rem;
  padding-top: 0.55rem;
  border-top: 1px dashed color-mix(in srgb, var(--border) 90%, transparent);
}

.exp-arm-outcome-title {
  font-size: 0.74rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.35rem;
}

.exp-arm-outcome-note {
  margin: 0 0 0.45rem 0;
  font-size: 0.72rem;
  color: var(--text-muted);
  line-height: 1.4;
}

.exp-arm-outcome-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.74rem;
}

.exp-arm-outcome-table th,
.exp-arm-outcome-table td {
  border: 1px solid var(--border);
  padding: 0.3rem 0.45rem;
  text-align: right;
}

.exp-arm-outcome-table th[scope='row'] {
  text-align: left;
  font-weight: 600;
  color: var(--text-secondary);
}

.exp-arm-outcome-table thead th {
  text-align: center;
  font-weight: 700;
  color: var(--text-primary);
}

.btn-primary,
.btn-secondary {
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  padding: 0.45rem 0.9rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
}

.btn-primary {
  border: none;
  background: var(--primary);
  color: var(--primary-fg, #fff);
}

.btn-secondary {
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-primary);
}

.exp-assign-new-pool-wrap {
  margin: 0.85rem 0 0.35rem 0;
}

.btn-new-pool {
  border: none;
  background: #dc2626;
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

.btn-new-pool:hover {
  background: #b91c1c;
}

.btn-new-pool:focus-visible {
  outline: 2px solid #dc2626;
  outline-offset: 2px;
}

.exp-assign-causality-box {
  margin: 1.15rem 0 0.25rem 0;
  padding: 0.85rem 1rem;
  border-radius: 0.55rem;
  border: 1px solid color-mix(in srgb, var(--primary) 38%, var(--border));
  background: color-mix(in srgb, var(--primary) 7%, var(--bg-primary));
}

.exp-assign-causality-title {
  margin: 0 0 0.5rem 0;
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1.35;
}

.exp-assign-causality-lead {
  margin: 0 0 0.55rem 0;
  font-size: 0.8rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.exp-assign-causality-list {
  margin: 0 0 0.55rem 1rem;
  padding: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--text-secondary);
}

.exp-assign-causality-list li {
  margin-bottom: 0.5rem;
}

.exp-assign-causality-list li:last-child {
  margin-bottom: 0;
}

.exp-assign-causality-close {
  margin: 0;
  font-size: 0.78rem;
  line-height: 1.5;
  color: var(--text-primary);
  font-weight: 500;
}

.exp-sim-note {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin: 0.5rem 0 0 0;
  line-height: 1.4;
}

.exp-sampling-visual {
  margin-top: 1rem;
}

.exp-sampling-roster-split {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.exp-sampling-visual-box {
  margin-bottom: 0;
}

.exp-sampling-visual-box-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 0.45rem 0;
  letter-spacing: 0.01em;
}

.exp-sampling-last-draw-split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.65rem;
}

@media (min-width: 520px) {
  .exp-sampling-last-draw-split:not(.exp-sampling-last-draw-split-single) {
    grid-template-columns: 1fr 1fr;
  }
}

.exp-sampling-last-draw-split-single {
  grid-template-columns: 1fr;
}

.exp-sampling-last-draw-col {
  min-width: 0;
}

.exp-sampling-last-draw-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.35rem 0.5rem;
  margin-bottom: 0.35rem;
}

.exp-sampling-last-draw-plan-name {
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--text-secondary);
}

.exp-sampling-selection-viz-explain {
  font-size: 0.72rem;
  line-height: 1.45;
  color: var(--text-secondary);
  margin: 0 0 0.45rem 0;
  padding: 0.4rem 0.5rem;
  border-radius: 0.35rem;
  background: color-mix(in srgb, var(--bg-card) 88%, transparent);
  border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
}

.exp-quota-walk-box {
  margin: 0 0 0.75rem 0;
  padding: 0.55rem 0.65rem;
  border-radius: 0.45rem;
  border: 1px solid color-mix(in srgb, #0f766e 42%, var(--border));
  background: color-mix(in srgb, #14b8a6 09%, var(--bg-primary));
}

.exp-quota-walk-heading {
  font-weight: 700;
  font-size: 0.82rem;
  margin: 0 0 0.4rem 0;
  color: #115e59;
}

.exp-quota-walk-stats {
  margin: 0 0 0.5rem 1.1rem;
  padding: 0;
  font-size: 0.74rem;
  line-height: 1.45;
  color: var(--text-secondary);
}

.exp-quota-stratum-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.72rem;
  margin: 0 0 0.5rem 0;
}

.exp-quota-stratum-table th,
.exp-quota-stratum-table td {
  border: 1px solid var(--border);
  padding: 0.28rem 0.45rem;
  text-align: left;
}

.exp-quota-stratum-table th {
  background: color-mix(in srgb, var(--bg-card) 94%, transparent);
}

.exp-convenience-walk-box {
  margin: 0 0 0.75rem 0;
  padding: 0.55rem 0.65rem;
  border-radius: 0.45rem;
  border: 1px solid color-mix(in srgb, #c2410c 42%, var(--border));
  background: color-mix(in srgb, #ea580c 07%, var(--bg-primary));
}

.exp-convenience-walk-heading {
  font-weight: 700;
  font-size: 0.82rem;
  margin: 0 0 0.35rem 0;
  color: #9a3412;
}

.exp-convenience-walk-lead {
  margin: 0 0 0.4rem 0;
  font-size: 0.74rem;
  line-height: 1.45;
  color: var(--text-secondary);
}

.exp-walk-strip-caption {
  font-size: 0.68rem;
  color: var(--text-muted);
  margin: 0 0 0.35rem 0;
  line-height: 1.35;
}

.exp-walk-strip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  max-height: 5.75rem;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 0.3rem;
  border-radius: 0.35rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.exp-walk-tile {
  width: 7px;
  height: 17px;
  flex-shrink: 0;
  border-radius: 2px;
  box-sizing: border-box;
}

.exp-walk-tile-quota-in {
  background: #0d9488;
  border: 1px solid #0f766e;
}

.exp-walk-tile-quota-skip {
  background: repeating-linear-gradient(-40deg, #fbbf24 0 2px, #fde68a 2px 5px);
  border: 1px solid #d97706;
}

.exp-walk-tile-future {
  background: color-mix(in srgb, var(--text-muted) 22%, var(--bg-card));
  border: 1px solid var(--border);
}

.exp-walk-tile-conv-in {
  background: #ea580c;
  border: 1px solid #c2410c;
}

.exp-walk-tile-conv-tail {
  background: color-mix(in srgb, var(--text-muted) 14%, var(--bg-card));
  border: 1px dashed color-mix(in srgb, var(--text-muted) 45%, var(--border));
}

.exp-walk-strip-legend-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.85rem;
  margin-top: 0.4rem;
  font-size: 0.65rem;
  color: var(--text-muted);
  align-items: center;
}

.exp-walk-leg {
  display: inline-block;
  width: 10px;
  height: 12px;
  margin-right: 0.3rem;
  vertical-align: middle;
  border-radius: 2px;
}

.exp-pop-grid-last-draw.exp-sampling-viz-mode-conv {
  border-left: 4px solid #ea580c;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, #ea580c 12%, transparent) 0%,
    transparent 48%,
    var(--bg-card) 100%
  );
}

.exp-pop-grid-last-draw.exp-sampling-viz-mode-quota {
  border-left: 4px dashed #ca8a04;
  background: linear-gradient(
    90deg,
    color-mix(in srgb, #ca8a04 10%, transparent) 0%,
    transparent 40%,
    var(--bg-card) 100%
  );
}

.exp-pop-grid-last-draw.exp-sampling-viz-mode-purposive {
  border-top: 3px solid #a21caf;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, #a21caf 22%, transparent);
}

.exp-pop-grid-last-draw.exp-sampling-viz-mode-random {
  border-left: 3px solid color-mix(in srgb, var(--primary) 55%, var(--border));
}

.exp-sampling-viz-cell {
  position: relative;
}

.exp-sampling-viz-chip {
  position: absolute;
  top: 1px;
  right: 1px;
  z-index: 1;
  min-width: 0.95rem;
  padding: 0 0.15rem;
  font-size: 0.56rem;
  font-weight: 800;
  line-height: 1.2;
  border-radius: 0.2rem;
  text-align: center;
  pointer-events: none;
}

.exp-sampling-viz-chip-list {
  background: color-mix(in srgb, #ea580c 88%, #fff);
  color: #431407;
  border: 1px solid #c2410c;
}

.exp-sampling-viz-chip-quota {
  background: color-mix(in srgb, #0d9488 75%, #fff);
  color: #134e4a;
  border: 1px solid #0f766e;
  font-size: 0.5rem;
  min-width: 1.15rem;
  padding: 0 0.1rem;
}

.exp-sampling-viz-chip-rank {
  background: color-mix(in srgb, #a21caf 82%, #fff);
  color: #3b0764;
  border: 1px solid #86198f;
}

.exp-pop-grid-last-draw {
  max-height: 11rem;
}

.exp-pop-not-in-sample {
  opacity: 0.2;
  filter: grayscale(0.9);
}

.exp-pop-in-sample-rand-left {
  opacity: 1;
  filter: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 72%, transparent);
}

.exp-pop-in-sample-rand-right {
  opacity: 1;
  filter: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, #ea580c 70%, transparent);
}

.exp-pop-in-sample-conv-left,
.exp-pop-in-sample-conv-right {
  opacity: 1;
  filter: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, #c2410c 80%, transparent);
}

.exp-pop-in-sample-quota-left,
.exp-pop-in-sample-quota-right {
  opacity: 1;
  filter: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, #0f766e 82%, transparent);
}

.exp-pop-person-cell.exp-pop-quota-skipped {
  position: relative;
}

.exp-pop-person-cell.exp-pop-quota-skipped::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: repeating-linear-gradient(
    -40deg,
    color-mix(in srgb, #ca8a04 40%, transparent) 0 2px,
    color-mix(in srgb, #fef3c7 28%, transparent) 2px 5px
  );
  pointer-events: none;
}

.exp-pop-in-sample-purposive {
  opacity: 1;
  filter: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, #a21caf 78%, transparent);
}

.exp-sampling-plan-explain {
  font-size: 0.76rem;
  line-height: 1.45;
  color: var(--text-secondary);
  margin: 0.4rem 0 0 0;
}

.exp-pop-fixed-wrap {
  margin-bottom: 1rem;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: var(--bg-primary);
}

.exp-pop-label {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  line-height: 1.45;
}

.exp-pop-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(2.85rem, 1fr));
  gap: 2px;
  max-height: 14rem;
  overflow: auto;
  padding: 0.25rem;
  border-radius: 0.35rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
}

.exp-pop-person-cell.exp-cell-shape {
  width: 100%;
  min-width: 0;
  height: 2.35rem;
  margin: 0 auto;
  border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
}

.exp-pop-dorm-start {
  border-left: 2px solid var(--text-muted);
  padding-left: 1px;
}

.exp-pop-grid-note {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin: 0.4rem 0 0 0;
  line-height: 1.35;
}

.exp-pop-mean-line {
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: var(--text-secondary);
}

.exp-scenario-details {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem 0;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px dashed var(--border);
  background: color-mix(in srgb, var(--bg-primary) 90%, transparent);
}

.exp-scenario-details summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
}

.exp-scenario-list {
  margin: 0.5rem 0 0 1rem;
  padding: 0;
  line-height: 1.45;
}

.exp-scenario-list li {
  margin-bottom: 0.35rem;
}

.exp-sampling-meta {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
}

.exp-sampling-legend-split {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin: 0 0 1rem 0;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-primary) 92%, transparent);
}

@media (min-width: 720px) {
  .exp-sampling-legend-split {
    grid-template-columns: 1fr 1fr;
  }
}

.exp-sampling-legend-heading {
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 0.35rem;
}

.exp-sampling-legend-random .exp-sampling-legend-heading {
  color: var(--primary);
}

.exp-sampling-legend-nonrandom .exp-sampling-legend-heading {
  color: #c2410c;
}

.exp-sampling-legend-note {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin: 0 0 0.4rem 0;
  line-height: 1.35;
}

.exp-sampling-legend-list {
  margin: 0;
  padding-left: 1.1rem;
  font-size: 0.78rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.exp-sampling-legend-list li {
  margin-bottom: 0.3rem;
}

.exp-hist-readme {
  font-size: 0.82rem;
  color: var(--text-secondary);
  margin: 0.5rem 0 0.65rem 0;
  padding: 0.5rem 0.65rem;
  border-radius: 0.45rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-primary) 94%, transparent);
  line-height: 1.45;
}

.exp-hist-readme summary {
  cursor: pointer;
  font-weight: 600;
  color: var(--text-primary);
}

.exp-hist-readme-body {
  margin-top: 0.45rem;
}

.exp-hist-readme-body p {
  margin: 0 0 0.4rem 0;
}

.exp-hist-readme-body ul {
  margin: 0;
  padding-left: 1.15rem;
}

.exp-hist-readme-body li {
  margin-bottom: 0.35rem;
}

.exp-hist-axis-caption {
  font-size: 0.68rem;
  color: var(--text-muted);
  text-align: center;
  margin: 0.25rem 0 0 0;
}

.exp-sampling-compare-lead {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0.75rem 0 0.5rem 0;
  line-height: 1.45;
}

.exp-sampling-compare {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-top: 0.25rem;
}

@media (min-width: 800px) {
  .exp-sampling-compare {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.exp-sampling-side {
  border: 1px solid var(--border);
  border-radius: 0.55rem;
  padding: 0.65rem 0.75rem;
  background: var(--bg-primary);
}

.exp-sampling-side-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.45rem;
}

.exp-sampling-side-badge {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.12rem 0.45rem;
  border-radius: 0.3rem;
}

.exp-badge-rand {
  background: color-mix(in srgb, var(--primary) 22%, transparent);
  color: var(--primary);
}

.exp-badge-norand {
  background: color-mix(in srgb, #ea580c 28%, transparent);
  color: #9a3412;
}

.exp-sampling-pick {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.72rem;
  color: var(--text-muted);
}

.exp-sampling-pick-label {
  font-weight: 600;
}

.exp-sampling-select {
  min-width: 11rem;
  padding: 0.35rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.8rem;
}

.exp-sampling-pick-row {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 0.65rem 1rem;
  margin: 0.5rem 0 0.75rem 0;
  padding: 0.65rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
  background: color-mix(in srgb, var(--bg-primary) 94%, transparent);
}

.exp-sampling-pick-inline {
  flex: 1 1 12rem;
}

.exp-sampling-pick-vs {
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-muted);
  padding-bottom: 0.45rem;
}

.exp-sampling-side-slot {
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.exp-sampling-side-stats {
  font-size: 0.76rem;
  color: var(--text-secondary);
  margin: 0.35rem 0 0.45rem 0;
  line-height: 1.4;
}

.exp-hist-wrap {
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 0.75rem;
  background: var(--bg-primary);
}

.exp-hist-pop-section {
  margin-bottom: 0.85rem;
  border-color: color-mix(in srgb, var(--text-muted) 28%, var(--border));
}

.exp-hist-rect-pop {
  fill: color-mix(in srgb, var(--text-secondary) 42%, transparent);
}

.exp-hist-srs {
  border-color: color-mix(in srgb, var(--primary) 35%, var(--border));
}

.exp-hist-strat {
  border-color: color-mix(in srgb, #0d9488 35%, var(--border));
}

.exp-hist-clust {
  border-color: color-mix(in srgb, #7c3aed 35%, var(--border));
}

.exp-hist-conv {
  border-color: color-mix(in srgb, #ea580c 35%, var(--border));
}

.exp-hist-sys {
  border-color: color-mix(in srgb, #0891b2 35%, var(--border));
}

.exp-hist-stage {
  border-color: color-mix(in srgb, #4f46e5 35%, var(--border));
}

.exp-hist-quota {
  border-color: color-mix(in srgb, #ca8a04 38%, var(--border));
}

.exp-hist-purposive {
  border-color: color-mix(in srgb, #db2777 35%, var(--border));
}

.exp-hist-title {
  font-size: 0.82rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.exp-hist-blurb {
  font-size: 0.72rem;
  color: var(--text-muted);
  margin: 0 0 0.35rem 0;
  line-height: 1.35;
}

.exp-hist-svg {
  width: 100%;
  max-width: 420px;
  height: auto;
  display: block;
}

.exp-hist-rect {
  stroke: none;
}

.exp-hist-rect-srs {
  fill: color-mix(in srgb, var(--primary) 58%, transparent);
}

.exp-hist-rect-strat {
  fill: color-mix(in srgb, #0d9488 52%, transparent);
}

.exp-hist-rect-clust {
  fill: color-mix(in srgb, #7c3aed 48%, transparent);
}

.exp-hist-rect-conv {
  fill: color-mix(in srgb, #ea580c 50%, transparent);
}

.exp-hist-rect-sys {
  fill: color-mix(in srgb, #0891b2 52%, transparent);
}

.exp-hist-rect-stage {
  fill: color-mix(in srgb, #4f46e5 48%, transparent);
}

.exp-hist-rect-quota {
  fill: color-mix(in srgb, #ca8a04 48%, transparent);
}

.exp-hist-rect-purposive {
  fill: color-mix(in srgb, #db2777 45%, transparent);
}

.exp-hist-vline {
  stroke-width: 2;
  stroke-dasharray: 4 3;
}

.exp-hist-vline-zero {
  stroke: var(--text-muted);
  opacity: 0.95;
}

.exp-hist-vline-mu {
  stroke: var(--primary);
  opacity: 0.92;
}

.exp-hist-vlabel {
  font-size: 12px;
  font-weight: 700;
}

.exp-hist-vlabel-zero {
  fill: var(--text-secondary);
}

.exp-hist-vlabel-mu {
  fill: var(--primary);
}

.exp-hist-caption {
  font-size: 0.78rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  line-height: 1.45;
}

.exp-hist-caption-note {
  color: var(--text-muted);
  font-size: 0.74rem;
}

.exp-sampling-footnote {
  margin-top: 0.75rem;
}

.exp-sim-foot {
  margin-top: 1rem;
  margin-bottom: 0;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
}
</style>

