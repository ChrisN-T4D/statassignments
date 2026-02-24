<template>
  <div class="assignment-help">
    <div class="container">
      <!-- Back + Header -->
      <div class="help-header">
        <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
        <h1 class="help-title">Assignment Help</h1>
        <p class="help-intro">
          Stuck on an LMS assignment? Choose an assignment below to see tips, formulas, and where to get help.
        </p>
      </div>

      <!-- List of modules with links to each assignment -->
      <div class="help-modules">
        <section
          v-for="(block, idx) in helpData"
          :key="idx"
          class="help-module"
        >
          <h2 class="module-heading">
            <span v-if="block.moduleNumber" class="module-num">Module {{ block.moduleNumber }}</span>
            <span v-else class="module-num">Milestone</span>
            — {{ block.moduleTitle }}
          </h2>

          <ul class="assignment-links">
            <li v-for="a in block.assignments" :key="a.id">
              <router-link
                :to="`/class/${classId}/assignment-help/${a.id}`"
                class="assignment-link"
              >
                <span class="assignment-link-name">{{ a.name }}</span>
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
import { getAssignmentHelp } from '../data/assignmentHelp'

const props = defineProps({
  classId: { type: String, required: true }
})

const helpData = computed(() => getAssignmentHelp(props.classId))

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
