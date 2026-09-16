<template>
  <div class="study-plan-hub">
    <div class="container">
      <div class="hub-header">
        <router-link :to="`/class/${classId}`" class="back-link">← Back to course</router-link>
        <h1 class="hub-title">Study Plan</h1>
        <p class="hub-intro">
          Your capstone draft workspace for PSYC 4223. Methods Market holds your notes and links to
          chapters; Canvas is where you submit for a grade.
        </p>
        <p v-if="isGuestDraft" class="draft-note">
          Draft saved in this browser. Sign in to sync across devices when server storage is available.
        </p>
        <p v-else-if="lastSavedAt" class="draft-note">Last saved {{ formatSaved(lastSavedAt) }}</p>
      </div>

      <div class="topic-row">
        <label for="project-topic" class="topic-label">Project topic</label>
        <input
          id="project-topic"
          type="text"
          class="topic-input"
          :value="project.topic"
          placeholder="e.g., Social media use and sleep quality in undergraduates"
          @input="updateProject({ topic: $event.target.value })"
        />
      </div>

      <div class="section-grid">
        <router-link
          v-for="section in STUDY_PLAN_SECTIONS"
          :key="section.id"
          :to="`/class/${classId}/study-plan/${section.id}`"
          class="section-card"
        >
          <h2 class="section-card-title">{{ section.shortTitle }}</h2>
          <p class="section-card-desc">{{ section.description }}</p>
          <p class="section-card-due">{{ section.dueNote }}</p>
          <span class="section-card-progress">{{ sectionProgress(section.id) }}</span>
          <span class="section-card-cta">Open section →</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCapstoneProject } from '../composables/useCapstoneProject'
import { STUDY_PLAN_SECTIONS } from '../data/capstoneWorksheetSchemas.js'
import {
  countArticleCards,
  countLitReviewOutlineProgressForProject,
  countPhase3Progress,
  countPhase4Progress
} from '../lib/capstoneValidation.js'

const props = defineProps({
  classId: { type: String, required: true }
})

const { project, updateProject, lastSavedAt, isGuestDraft } = useCapstoneProject(props.classId)

function sectionProgress (sectionId) {
  switch (sectionId) {
    case 'article-review': {
      const { complete, total, minRequired } = countArticleCards(project.value)
      return `${complete}/${minRequired} complete · ${total} cards`
    }
    case 'study-focus': {
      const p = countLitReviewOutlineProgressForProject(project.value)
      if (!p.frameworkNamed) return 'Framework not started'
      if (p.readyHint) return 'Outline ready to export'
      return `Framework · ${p.themesStarted}/${p.themesTotal} themes`
    }
    case 'phase-3': {
      const p = countPhase3Progress(project.value)
      if (p.ready) return `${p.filled}/4 parts · ${p.words} words`
      return p.filled ? `${p.filled}/4 parts · ${p.words} words` : 'Elevator speech not started'
    }
    case 'phase-4': {
      const p = countPhase4Progress(project.value)
      if (p.chosen) return 'Pathway chosen'
      if (p.recapFilled || p.pathsExplored) {
        return `A–B ${p.recapFilled}/${p.recapTotal} · ${p.pathsExplored}/${p.pathsTotal} paths`
      }
      return 'Not started'
    }
    default:
      return ''
  }
}

function formatSaved (iso) {
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return ''
  }
}
</script>

<style scoped>
.study-plan-hub {
  padding: 1.5rem 0 3rem;
  min-height: 60vh;
}

.container {
  max-width: 52rem;
  margin: 0 auto;
  padding: 0 1rem;
}

.hub-header {
  margin-bottom: 2rem;
}

.back-link {
  display: inline-block;
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.back-link:hover {
  color: var(--primary);
}

.hub-title {
  font-size: 1.75rem;
  margin: 0 0 0.5rem;
}

.hub-intro {
  color: var(--text-secondary);
  line-height: 1.55;
  margin: 0 0 0.5rem;
}

.draft-note {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin: 0;
}

.topic-row {
  margin-bottom: 2rem;
}

.topic-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.35rem;
}

.topic-input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-card);
  color: var(--text-primary);
  font-size: 0.95rem;
}

.section-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 640px) {
  .section-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.section-card {
  display: block;
  padding: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: var(--bg-card);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

.section-card:hover {
  border-color: var(--primary);
}

.section-card-title {
  font-size: 1.1rem;
  margin: 0 0 0.5rem;
  color: var(--text-primary);
}

.section-card-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.45;
  margin: 0 0 0.5rem;
}

.section-card-due {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin: 0 0 0.75rem;
}

.section-card-progress {
  display: block;
  font-size: 0.8rem;
  padding: 0.2rem 0.5rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  margin-bottom: 0.75rem;
  width: fit-content;
}

.section-card-cta {
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 600;
}
</style>
