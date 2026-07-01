<template>
  <div class="assignment-help">
    <div class="container">
      <!-- Back + Header -->
      <div class="help-header">
        <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
        <h1 class="help-title">Assignment Help</h1>
        <p class="help-intro">{{ helpIntro }}</p>
      </div>

      <!-- List of modules with links to each assignment -->
      <section v-if="schedule" class="schedule-overview">
        <h2 class="schedule-title">Fall 2026 schedule</h2>
        <p class="schedule-anchor">
          Classes begin {{ formatTermDate(schedule.term.classesBegin) }}.
          <strong>IRB Final Draft to IRB: {{ formatTermDate(schedule.term.irbSubmissionTarget) }}</strong>
          · Complete <strong>one full chapter per week</strong> (reading + Concept Review).
        </p>
        <div class="schedule-table-wrap">
          <table class="schedule-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Dates</th>
                <th>Course focus</th>
                <th>This week's chapter</th>
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in schedule.weeks" :key="row.week">
                <td>{{ row.week }}</td>
                <td>{{ row.dates }}</td>
                <td>
                  {{ row.focus }}
                  <span v-if="row.note" class="schedule-note">{{ row.note }}</span>
                </td>
                <td class="schedule-chapter-cell">
                  <template v-if="row.chapter">
                    <router-link
                      :to="`/topic/${row.chapter.topicId}`"
                      class="schedule-chapter-link"
                    >
                      {{ row.chapter.label }}
                    </router-link>
                    <span v-if="row.chapterGoal" class="schedule-chapter-goal">{{ row.chapterGoal }}</span>
                  </template>
                  <span v-else class="schedule-muted">{{ row.chapterGoal || '—' }}</span>
                </td>
                <td>
                  <span v-if="row.due.length">{{ row.due.join('; ') }}</span>
                  <span v-else class="schedule-muted">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section v-if="schedule?.assignmentGroups?.length" class="canvas-grading-overview">
        <h2 class="schedule-title">Canvas assignments — dates &amp; points</h2>
        <p class="schedule-anchor">
          Matches your Canvas gradebook ({{ schedule.pointsTotal }} points total).
          Each assignment is worth at least {{ schedule.pointsFloor }} points.
        </p>
        <div
          v-for="group in schedule.assignmentGroups"
          :key="group.id"
          class="canvas-grading-group"
        >
          <h3 class="canvas-grading-group-title">
            {{ group.groupName }}
            <span class="canvas-grading-subtotal">{{ group.points }} pts</span>
          </h3>
          <div class="schedule-table-wrap">
            <table class="schedule-table canvas-grading-table">
              <thead>
                <tr>
                  <th>Assignment</th>
                  <th>Due</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="a in group.assignments" :key="a.id">
                  <td>
                    <router-link
                      :to="`/class/${classId}/assignment-help/${a.id}`"
                      class="canvas-grading-link"
                    >
                      {{ a.name }}
                    </router-link>
                  </td>
                  <td>{{ a.dueDateLabel }}</td>
                  <td>{{ a.points }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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

          <ul class="assignment-links">
            <li v-for="a in block.assignments" :key="a.id">
              <router-link
                :to="`/class/${classId}/assignment-help/${a.id}`"
                class="assignment-link"
              >
                <span class="assignment-link-name">{{ a.name }}</span>
                <span v-if="a.dueDateLabel" class="assignment-due">{{ a.dueDateLabel }}</span>
                <span v-if="a.points" class="assignment-points">{{ a.points }} pts</span>
                <span class="assignment-link-type" :class="a.type">{{ typeLabel(a.type) }}</span>
              </router-link>
            </li>
          </ul>

          <p v-if="block.noDiscussion" class="no-discussion-note">
            This module has no discussion board in the LMS; use tips and office hours if you need help.
          </p>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getAssignmentHelp, getAssignmentHelpIntro, getResearchMethodsSchedule } from '../data/assignmentHelp'

const props = defineProps({
  classId: { type: String, required: true }
})

const helpData = computed(() => getAssignmentHelp(props.classId))
const helpIntro = computed(() => getAssignmentHelpIntro(props.classId))
const schedule = computed(() =>
  props.classId === 'research-methods' ? getResearchMethodsSchedule() : null
)

function formatTermDate (isoDate) {
  const d = new Date(`${isoDate}T12:00:00`)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function typeLabel (type) {
  const labels = {
    assignment: 'Assignment',
    discussion: 'Discussion',
    practice: 'Practice / Quiz',
    benchmark: 'Benchmark',
    final: 'Final'
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

.schedule-overview {
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
  padding: 1.25rem 1.5rem;
}

.schedule-title {
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.schedule-anchor {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.schedule-table-wrap {
  overflow-x: auto;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
}

.schedule-table th,
.schedule-table td {
  padding: 0.5rem 0.75rem;
  text-align: left;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

.schedule-table th {
  font-weight: 600;
  color: var(--text-secondary);
}

.schedule-note {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  color: var(--text-muted);
  font-style: italic;
}

.schedule-muted {
  color: var(--text-muted);
}

.schedule-chapter-cell {
  min-width: 11rem;
}

.schedule-chapter-link {
  display: block;
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
}

.schedule-chapter-link:hover {
  text-decoration: underline;
}

.schedule-chapter-goal {
  display: block;
  margin-top: 0.25rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.canvas-grading-overview {
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
  padding: 1.25rem 1.5rem;
}

.canvas-grading-group {
  margin-bottom: 1.25rem;
}

.canvas-grading-group:last-child {
  margin-bottom: 0;
}

.canvas-grading-group-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0.5rem;
}

.canvas-grading-subtotal {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-secondary);
}

.canvas-grading-link {
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.canvas-grading-link:hover {
  text-decoration: underline;
}

.canvas-grading-table td:last-child,
.canvas-grading-table th:last-child {
  white-space: nowrap;
  text-align: right;
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
  font-size: 1.15rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

.module-num {
  color: var(--primary);
}

.phase-label {
  font-weight: 500;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.assignment-links {
  list-style: none;
  margin: 0;
  padding: 0;
}

.assignment-links li {
  margin: 0;
  padding: 0;
}

.assignment-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0;
  color: var(--text-primary);
  text-decoration: none;
  border-bottom: 1px solid var(--border);
  transition: color 0.15s, background 0.15s;
}

.assignment-link:last-child {
  border-bottom: none;
}

.assignment-link:hover {
  color: var(--primary);
}

.assignment-link-name {
  flex: 1;
  font-weight: 500;
  min-width: 0;
}

.assignment-due {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  white-space: nowrap;
}

.assignment-points {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
}

.assignment-link-type {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.45rem;
  border-radius: 0.25rem;
  background: var(--border-light);
  color: var(--text-muted);
}

.assignment-link-type.assignment {
  background: var(--primary);
  color: white;
}

.assignment-link-type.discussion {
  background: var(--success-bg);
  color: var(--success);
}

.assignment-link-type.practice {
  background: var(--warning-bg);
  color: var(--warning);
}

.assignment-link-type.benchmark,
.assignment-link-type.final {
  background: var(--danger-bg);
  color: var(--danger);
}

.no-discussion-note {
  margin: 1rem 0 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
  font-style: italic;
}
</style>
