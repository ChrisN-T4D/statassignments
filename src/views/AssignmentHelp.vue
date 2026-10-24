<template>
  <div class="assignment-help">
    <div class="container">
      <!-- Back + Header -->
      <div class="help-header">
        <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
        <WeekContextBar v-if="hasSchedule(classId)" :class-slug="String(classId)" />
        <h1 class="help-title">Assignment Help</h1>
        <p class="help-intro">{{ helpIntro }}</p>
        <p v-if="classId === 'intro-research'" class="help-intro objectives-link">
          <router-link :to="`/class/${classId}/objectives`">See the course objectives and how each assignment supports them →</router-link>
        </p>
        <div v-if="classId === 'research-methods'" class="study-plan-banner">
          <div>
            <h2 class="study-plan-banner-title">Capstone worksheets → Study Plan</h2>
            <p class="study-plan-banner-desc">
              Article review, lit review outline, method choice, and measures draft are drafted in Study Plan, then exported to Canvas.
            </p>
          </div>
          <router-link :to="`/class/${classId}/study-plan`" class="study-plan-banner-btn">
            Open Study Plan →
          </router-link>
        </div>
        <details v-if="classId === 'research-methods'" class="research-aid-panel">
          <summary>Reference self-check before you submit</summary>
          <p>Use this quick audit for article reviews, literature reviews, and methods papers:</p>
          <ul>
            <li>Every paraphrase, quotation, or borrowed idea has an author–year citation.</li>
            <li>Every in-text citation appears in References, and every reference is cited in the paper.</li>
            <li>Each reference has enough information for a reader to find the source, preferably a DOI or stable URL.</li>
            <li>Authors, year, title, journal/book, volume, issue, pages, and italics follow APA 7 conventions.</li>
            <li>Claims describe what the source found; they do not overstate correlation as causation.</li>
          </ul>
          <router-link to="/topic/rm-chapter-11" class="research-aid-link">Review Chapter 11: APA and clear prose →</router-link>
        </details>
      </div>

      <section v-for="panel in weekPanels" :key="panel.weekNumber" class="week-panel" :class="{ 'week-panel-now': panel.isNow }">
        <h2 class="week-panel-title">
          {{ panel.isNow ? 'This week' : 'Next week' }}
          <span class="week-panel-sub">Week {{ panel.weekNumber }} · {{ panel.title }}</span>
        </h2>
        <ul class="assignment-links">
          <li v-for="it in panel.items" :key="it.key" class="assignment-row">
            <router-link :to="it.to" class="assignment-link">
              <span class="assignment-link-name">{{ it.label }}</span>
              <span v-if="it.due" class="week-panel-due">Due {{ it.due }}</span>
              <span class="assignment-link-type" :class="it.kind === 'study-plan' ? 'assignment' : 'practice'">
                {{ it.kind === 'study-plan' ? 'Study Plan' : 'Help' }}
              </span>
            </router-link>
          </li>
        </ul>
      </section>

      <div class="help-modules">
        <section
          v-for="(block, idx) in helpData"
          :key="idx"
          class="help-module"
        >
          <h2 class="module-heading">
            <span v-if="block.canvasPart" class="module-num">{{ block.canvasPart }}</span>
            <span v-else-if="block.moduleNumber" class="module-num">Module {{ block.moduleNumber }}</span>
            <span v-else class="module-num">Milestone</span>
            — {{ block.moduleTitle }}
            <span v-if="block.phaseLabel" class="phase-label">({{ block.phaseLabel }})</span>
          </h2>

          <component :is="isReviewBlock(block) ? 'details' : 'div'" class="block-body">
          <summary v-if="isReviewBlock(block)" class="reviews-summary">
            Show all {{ block.assignments.length }} Concept Reviews
          </summary>
          <ul class="assignment-links">
            <li v-for="a in block.assignments.filter((item) => !item.retired)" :key="a.id" class="assignment-row">
              <router-link
                :to="`/class/${classId}/assignment-help/${a.id}`"
                class="assignment-link"
              >
                <span class="assignment-link-name">{{ a.name }}</span>
                <span class="assignment-link-type" :class="a.type">{{ typeLabel(a.type) }}</span>
              </router-link>
              <router-link
                v-if="a.studyPlanSection"
                :to="`/class/${classId}/study-plan/${a.studyPlanSection}`"
                class="study-plan-inline-link"
              >
                Open Study Plan →
              </router-link>
            </li>
          </ul>
          </component>

          <p v-if="block.noDiscussion" class="no-discussion-note">
            This module has no discussion activity; use tips and office hours if you need help.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getAssignmentHelp, getAssignmentHelpIntro } from '../data/assignmentHelp'
import WeekContextBar from '../components/WeekContextBar.vue'
import { getResearchMethodsSchedule, hasSchedule, currentWeekIndex, semesterPhase, weekRef, parseScheduleDate } from '../data/researchMethodsSchedule'
import { itemLink } from '../lib/continueSummary'

const props = defineProps({
  classId: { type: String, required: true }
})

const helpData = computed(() => getAssignmentHelp(props.classId))
const helpIntro = computed(() => getAssignmentHelpIntro(props.classId))

// This week's and next week's help pages and Study Plan sections, straight from the schedule
const weekPanels = computed(() => {
  const schedule = getResearchMethodsSchedule(props.classId)
  if (!schedule || semesterPhase(schedule) !== 'during') return []
  const now = currentWeekIndex(schedule)
  return [now, now + 1].flatMap((i) => {
    const week = schedule.weeks[i]
    if (!week) return []
    const from = weekRef(schedule, i)
    const items = week.items
      .filter((it) => it.kind === 'assignment-help' || it.kind === 'study-plan')
      .map((it) => ({
        key: `${it.kind}-${it.assignmentId || it.sectionId}`,
        kind: it.kind,
        label: it.label,
        due: it.due ? parseScheduleDate(it.due).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }) : '',
        to: itemLink(it, props.classId, from)
      }))
    return items.length ? [{ weekNumber: i + 1, title: week.title, isNow: i === now, items }] : []
  })
})

// The 14 chapter Concept Reviews are reached from each week; keep them folded here
function isReviewBlock (block) {
  return props.classId === 'research-methods' && block.assignments.every((a) => a.type === 'concept-review')
}

function typeLabel (type) {
  const labels = {
    assignment: 'Assignment',
    discussion: 'Discussion',
    practice: 'Practice / Quiz',
    benchmark: 'Benchmark',
    final: 'Final',
    'concept-review': 'Concept Review',
    'software-practice': 'Software Practice'
  }
  return labels[type] || type
}
</script>

<style scoped>
.assignment-help {
  padding: 1.5rem 0 3rem;
  min-height: 60vh;
}

.help-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
}

.back-link:hover {
  color: var(--primary);
}

.week-panel {
  margin-bottom: 1.5rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--bg-card);
}

.week-panel-now {
  border: 2px solid var(--primary);
}

.week-panel-title {
  margin: 0 0 0.5rem;
  font-size: 1.15rem;
  color: var(--text-primary);
}

.week-panel-sub {
  margin-left: 0.5rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--text-muted);
}

.week-panel-due {
  margin-left: auto;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.reviews-summary {
  cursor: pointer;
  margin-bottom: 0.5rem;
  color: var(--primary);
  font-weight: 600;
}

.help-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.help-intro {
  color: var(--text-secondary);
  margin: 0;
  max-width: 42rem;
  line-height: 1.6;
}

.study-plan-banner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  border: 1px solid var(--primary);
  border-radius: 0.75rem;
  background: color-mix(in srgb, var(--primary) 8%, var(--bg-card));
}

.study-plan-banner-title {
  margin: 0 0 0.35rem;
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
}

.study-plan-banner-desc {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  max-width: 36rem;
  line-height: 1.5;
}

.study-plan-banner-btn {
  display: inline-block;
  padding: 0.55rem 1rem;
  border-radius: 0.5rem;
  background: var(--primary);
  color: #fff;
  text-decoration: none;
  font-weight: 600;
  white-space: nowrap;
}

.study-plan-banner-btn:hover {
  filter: brightness(1.08);
}

.research-aid-panel {
  margin-top: 0.75rem;
  padding: 0.85rem 1.1rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
  color: var(--text-secondary);
  line-height: 1.5;
}

.research-aid-panel summary {
  cursor: pointer;
  color: var(--text-primary);
  font-weight: 700;
}

.research-aid-panel p {
  margin: 0.75rem 0 0.35rem;
}

.research-aid-panel ul {
  margin: 0.35rem 0 0.75rem 1.2rem;
  padding: 0;
}

.research-aid-link {
  color: var(--primary);
  font-weight: 600;
}

.help-modules {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.help-module {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
  padding: 1.25rem 1.5rem;
}

.module-heading {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

.module-num {
  color: var(--primary);
}

.phase-label {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.assignment-links {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.assignment-row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  gap: 0.5rem;
}

.assignment-link {
  flex: 1 1 28rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  padding: 0.75rem 1rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s, background 0.15s;
}

.assignment-link:hover {
  border-color: var(--primary);
  background: var(--bg-hover, rgba(0, 0, 0, 0.02));
}

.study-plan-inline-link {
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border: 1px solid var(--primary);
  border-radius: 0.5rem;
  color: var(--primary);
  text-decoration: none;
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}

.study-plan-inline-link:hover {
  background: color-mix(in srgb, var(--primary) 8%, var(--bg-card));
}

.assignment-link-name {
  font-weight: 500;
  color: var(--text-primary);
  flex: 1;
  min-width: 12rem;
}

.assignment-link-type {
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: var(--bg-secondary);
  color: var(--text-secondary);
  text-transform: capitalize;
}

.assignment-link-type.assignment {
  background: rgba(59, 130, 246, 0.1);
  color: #2563eb;
}

.assignment-link-type.final {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

.assignment-link-type.concept-review {
  background: rgba(16, 185, 129, 0.12);
  color: #059669;
}

.assignment-link-type.software-practice {
  background: rgba(14, 165, 233, 0.12);
  color: #0284c7;
}

.no-discussion-note {
  margin: 1rem 0 0 0;
  font-size: 0.875rem;
  color: var(--text-muted);
  font-style: italic;
}
</style>
