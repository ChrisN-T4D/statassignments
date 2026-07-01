<template>
  <div class="assignment-help">
    <div class="container">
      <!-- Back + Header -->
      <div class="help-header">
        <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
        <h1 class="help-title">Assignment Help</h1>
        <p class="help-intro">{{ helpIntro }}</p>
      </div>

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
import { getAssignmentHelp, getAssignmentHelpIntro } from '../data/assignmentHelp'

const props = defineProps({
  classId: { type: String, required: true }
})

const helpData = computed(() => getAssignmentHelp(props.classId))
const helpIntro = computed(() => getAssignmentHelpIntro(props.classId))

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

.assignment-link {
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

.no-discussion-note {
  margin: 1rem 0 0 0;
  font-size: 0.875rem;
  color: var(--text-muted);
  font-style: italic;
}
</style>
