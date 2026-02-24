<template>
  <div class="assignment-help-detail">
    <div class="container">
      <template v-if="resolved">
        <!-- Back + Breadcrumb + Header -->
        <div class="help-header">
          <router-link :to="`/class/${classId}/assignment-help`" class="back-link">← Assignment Help</router-link>
          <p class="breadcrumb">
            <span v-if="block.moduleNumber">Module {{ block.moduleNumber }}</span>
            <span v-else>Milestone</span>
            — {{ block.moduleTitle }}
          </p>
          <h1 class="help-title">{{ assignment.name }}</h1>
          <span class="assignment-type" :class="assignment.type">{{ typeLabel(assignment.type) }}</span>
        </div>

        <!-- Benchmark / Final: Practice test link -->
        <div v-if="showPracticeTestCta" class="practice-test-cta">
          <router-link :to="practiceTestUrl" class="practice-test-link">
            {{ practiceTestLinkText }} →
          </router-link>
          <p class="practice-test-desc">Get {{ practiceTestCount }} questions. Questions will target areas we detect you might need help on. We’ll tell you which concepts continue to be a struggle so you can go back and review them.</p>
        </div>

        <!-- Single assignment card content -->
        <article class="assignment-card">
          <div v-if="assignment.tips?.length" class="section">
            <h2 class="section-title">Tips</h2>
            <ul class="tips-list">
              <li v-for="(tip, i) in assignment.tips" :key="i">{{ tip }}</li>
            </ul>
          </div>

          <div v-if="assignment.formulas?.length" class="section formulas-section">
            <h2 class="section-title">Formula reference</h2>
            <p class="section-desc">Use these when you type or compute by hand. In Jamovi Compute, replace column names (e.g. Height) with your variable name.</p>
            <div class="formula-list">
              <div v-for="(f, fi) in assignment.formulas" :key="fi" class="formula-block">
                <div v-if="f.name" class="formula-name">{{ f.name }}</div>
                <code class="formula-code">{{ f.formula }}</code>
                <div v-if="f.note" class="formula-note">{{ f.note }}</div>
              </div>
            </div>
          </div>

          <div v-if="assignment.practiceLinks?.length" class="section">
            <h2 class="section-title">Review in this site</h2>
            <p class="section-desc">Topics and lessons that match this assignment:</p>
            <div class="practice-links">
              <router-link
                v-for="topicId in assignment.practiceLinks"
                :key="topicId"
                :to="`/topic/${topicId}`"
                class="practice-link"
              >
                {{ formatTopicId(topicId) }}
              </router-link>
            </div>
          </div>

          <div class="section get-help-section">
            <h2 class="section-title">Stuck? Get help</h2>
            <p class="get-help-text">{{ assignment.getHelp }}</p>
          </div>
        </article>
      </template>

      <div v-else class="not-found">
        <router-link :to="`/class/${classId}/assignment-help`" class="back-link">← Assignment Help</router-link>
        <p>Assignment not found.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { getAssignmentById } from '../data/assignmentHelp'

const props = defineProps({
  classId: { type: String, required: true },
  assignmentId: { type: String, required: true }
})

const resolved = computed(() => getAssignmentById(props.classId, props.assignmentId))
const assignment = computed(() => resolved.value?.assignment ?? null)
const block = computed(() => resolved.value?.block ?? null)
const practiceTestCount = 15

const practiceTestSlugs = ['benchmark-1', 'benchmark-2', 'final-benchmark']
const showPracticeTestCta = computed(() => practiceTestSlugs.includes(props.assignmentId))
const practiceTestUrl = computed(() => `/class/${props.classId}/assignment-help/${props.assignmentId}/practice`)
const practiceTestLinkText = computed(() => {
  if (props.assignmentId === 'benchmark-1') return 'Take a practice test (Chapters 1–3)'
  if (props.assignmentId === 'benchmark-2') return 'Take a practice test (Chapters 4–6)'
  if (props.assignmentId === 'final-benchmark') return 'Take a practice test (Chapters 7–8)'
  return 'Take a practice test'
})

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

function formatTopicId (id) {
  return id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
</script>

<style scoped>
.assignment-help-detail {
  padding: 1.5rem 0 3rem;
  min-height: 60vh;
}

.help-header {
  margin-bottom: 1.5rem;
}

.back-link {
  display: inline-block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.back-link:hover {
  color: var(--primary);
}

.breadcrumb {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin: 0 0 0.25rem 0;
}

.help-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.5rem 0;
  color: var(--text-primary);
}

.assignment-type {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.5rem;
  border-radius: 0.25rem;
  background: var(--border-light);
  color: var(--text-secondary);
}

.assignment-type.assignment {
  background: var(--primary);
  color: white;
}

.assignment-type.discussion {
  background: var(--success-bg);
  color: var(--success);
}

.assignment-type.practice {
  background: var(--warning-bg);
  color: var(--warning);
}

.assignment-type.benchmark,
.assignment-type.final {
  background: var(--danger-bg);
  color: var(--danger);
}

.practice-test-cta {
  background: var(--tip-bg);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1.25rem;
}

.practice-test-link {
  font-weight: 600;
  color: var(--primary);
  text-decoration: none;
  display: inline-block;
  margin-bottom: 0.35rem;
}

.practice-test-link:hover {
  text-decoration: underline;
}

.practice-test-desc {
  margin: 0;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

.assignment-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.section {
  margin-top: 1.25rem;
}

.section:first-child {
  margin-top: 0;
}

.section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.section-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 0.5rem 0;
}

.tips-list {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}

.tips-list li {
  margin-bottom: 0.4rem;
}

.formulas-section {
  margin-top: 1.25rem;
}

.formula-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.formula-block {
  background: var(--formula-bg, var(--bg-main));
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  padding: 0.65rem 0.9rem;
}

.formula-name {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 0.25rem;
}

.formula-code {
  display: block;
  font-family: ui-monospace, monospace;
  font-size: 0.9rem;
  color: var(--code-text, var(--text-primary));
  background: var(--code-bg, transparent);
  padding: 0.25rem 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.formula-note {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-top: 0.35rem;
  line-height: 1.4;
}

.practice-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.practice-link {
  display: inline-block;
  padding: 0.35rem 0.65rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.35rem;
  color: var(--primary);
  text-decoration: none;
  font-size: 0.85rem;
}

.practice-link:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.get-help-section {
  background: var(--tip-bg);
  border-radius: 0.35rem;
  padding: 0.75rem 1rem;
  margin-top: 1.25rem;
}

.get-help-text {
  margin: 0;
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.55;
}

.not-found {
  padding: 2rem 0;
}

.not-found p {
  color: var(--text-secondary);
}
</style>
