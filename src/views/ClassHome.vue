<template>
  <div class="class-home" v-if="currentClass">
    <div class="container">
      <!-- Class Header -->
      <div class="class-header" :style="{ '--class-color': currentClass.color }">
        <div class="class-icon-large">{{ currentClass.icon }}</div>
        <div class="class-info">
          <h1>{{ getClassDisplayName(currentClass) }}</h1>
          <p>{{ currentClass.description }}</p>
          <p v-if="isPsychMethodsClass" class="class-canvas-note">
            Due dates, points, and weekly reading pace live in <strong>Canvas</strong>.
            Methods Market is for Pressbooks chapters, concept review, and assignment help only.
          </p>
          <div class="header-links">
            <template v-if="isResearchMethodsClass">
              <a
                :href="CANVAS_RM_GETTING_STARTED_URL"
                target="_blank"
                rel="noopener noreferrer"
                class="assignment-help-link"
              >
                Canvas: how to use Methods Market ↗
              </a>
              <span class="header-links-sep">·</span>
              <router-link :to="`/class/${classId}/assignment-help`" class="assignment-help-link">
                Canvas assignments → chapter help
              </router-link>
              <span class="header-links-sep">·</span>
            </template>
            <template v-else-if="!isPsychMethodsClass">
              <router-link :to="`/class/${classId}/assignment-help`" class="assignment-help-link">
                Stuck on an assignment? Get help →
              </router-link>
              <span class="header-links-sep">·</span>
            </template>
            <router-link :to="`/class/${classId}/jamovi-guides`" class="assignment-help-link">Jamovi guides</router-link>
            <span class="header-links-sep">·</span>
            <router-link :to="`/class/${classId}/excel-guides`" class="assignment-help-link">Excel guides</router-link>
            <template v-if="showDataAnalysisNav">
              <span class="header-links-sep">·</span>
              <router-link
                :to="{ path: `/class/${classId}`, query: { module: RM_MODULE_DATA_BY_PATH_ID } }"
                class="assignment-help-link"
              >
                {{ isExperimentalClass ? 'Statistics &amp; analyze data' : 'Statistics &amp; analyze data by path' }}
              </router-link>
            </template>
          </div>
        </div>
      </div>

      <!-- Research Methods: student onboarding -->
      <section
        v-if="isResearchMethodsClass"
        id="getting-started"
        class="rm-getting-started"
        aria-labelledby="rm-getting-started-title"
      >
        <h2 id="rm-getting-started-title">How to use Methods Market in this course</h2>
        <p class="rm-getting-started-lead">
          <strong>Canvas</strong> has your capstone deadlines, groups, and graded work.
          <strong>Methods Market</strong> is where you read chapters and practice concepts.
        </p>
        <ol class="rm-getting-started-steps">
          <li>
            <router-link to="/auth">Create an account</router-link> or sign in, then
            <router-link to="/claim">link your student key</router-link> from your instructor (one time).
          </li>
          <li>
            Check <strong>Canvas</strong> for which chapter to read this week
            (<a :href="CANVAS_RM_GETTING_STARTED_URL" target="_blank" rel="noopener noreferrer">full walkthrough ↗</a>).
          </li>
          <li>
            Pick a <strong>part</strong> tab, then a <strong>chapter</strong> → <strong>Topics</strong> to read → <strong>Concept Review</strong> to practice.
          </li>
          <li>
            Stuck on a Canvas assignment?
            <router-link :to="`/class/${classId}/assignment-help`">Open Assignment Help</router-link>.
          </li>
        </ol>
        <div class="rm-getting-started-links">
          <a :href="PRESSBOOKS_TEXTBOOK_URL" target="_blank" rel="noopener noreferrer" class="rm-quick-link">
            Pressbooks textbook (full book) ↗
          </a>
          <a :href="CANVAS_RM_GETTING_STARTED_URL" target="_blank" rel="noopener noreferrer" class="rm-quick-link">
            Canvas setup guide ↗
          </a>
        </div>
      </section>

      <!-- Module Navigation -->
      <div class="module-nav">
        <h2 class="section-title">
          {{ isPsychMethodsClass ? 'Course content' : 'Course Modules' }}
        </h2>

        <template v-if="isPsychMethodsClass">
          <div class="part-tabs" role="tablist" :aria-label="isExperimentalClass ? 'Course sections' : 'Canvas course parts'">
            <button
              v-for="part in psychMethodsModuleGroups"
              :key="part.id"
              :id="`part-tab-${part.id}`"
              type="button"
              role="tab"
              class="part-tab"
              :class="{ active: activePartId === part.id }"
              :aria-selected="activePartId === part.id"
              @click="selectPart(part.id)"
            >
              <span class="part-tab-label">{{ part.label }}</span>
              <span class="part-tab-title">{{ part.title }}</span>
            </button>
          </div>
          <div
            v-if="activePartGroup"
            class="part-panel"
            role="tabpanel"
            :aria-labelledby="`part-tab-${activePartGroup.id}`"
          >
            <p v-if="activePartGroup.description" class="module-part-desc">{{ activePartGroup.description }}</p>
            <div class="module-list">
              <button
                v-for="mod in activePartGroup.modules"
                :key="mod.id"
                class="module-btn"
                :class="{ active: selectedModuleId === mod.id }"
                :style="{ '--module-color': mod.color }"
                @click="selectModule(mod.id)"
              >
                <span class="module-icon">{{ mod.icon }}</span>
                <span class="module-number" v-if="mod.number">{{ mod.number }}</span>
                <span class="module-title">{{ getModuleDisplayShortTitle(mod) }}</span>
              </button>
            </div>
          </div>
        </template>

        <div v-else class="module-list">
          <button
            v-for="mod in contentModules"
            :key="mod.id"
            class="module-btn"
            :class="{ active: selectedModuleId === mod.id }"
            :style="{ '--module-color': mod.color }"
            @click="selectModule(mod.id)"
          >
            <span class="module-icon">{{ mod.icon }}</span>
            <span class="module-number" v-if="mod.number">{{ mod.number }}</span>
            <span class="module-title">{{ getModuleDisplayShortTitle(mod) }}</span>
          </button>
        </div>
      </div>

      <!-- Selected Module Content -->
      <div v-if="selectedModule" class="module-content">
        <div class="module-header" :style="{ '--module-color': selectedModule.color }">
          <div class="module-header-icon">{{ selectedModule.icon }}</div>
          <div class="module-header-info">
            <h2>
              <span v-if="selectedModule.canvasPart" class="module-canvas-part-label">
                {{ selectedModule.canvasPart }} —
              </span>
              <span v-if="selectedModule.number">Module {{ selectedModule.number }}: </span>
              {{ getModuleDisplayTitle(selectedModule) }}
            </h2>
            <p>{{ getModuleDisplayDescription(selectedModule) }}</p>
            <p
              v-if="selectedModule.pressbooksUrl"
              class="module-textbook-link"
            >
              <a
                :href="selectedModule.pressbooksUrl"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read Pressbooks Ch. {{ selectedModule.textbookChapter }} (open textbook) ↗
              </a>
            </p>
          </div>
          <!-- Module 8 Customization Button -->
          <button
            v-if="selectedModuleId === 'stats-module-8' && module8Prefs.hasCompletedSelection.value"
            @click="openModule8Selector"
            class="module-settings-btn"
            title="Change topic selection"
          >
            ⚙️ Customize
          </button>
        </div>

        <!-- Learning Objectives -->
        <div v-if="selectedModule.learningObjectives?.length" class="learning-objectives">
          <h3>Learning Objectives</h3>
          <ul>
            <li v-for="(obj, idx) in selectedModule.learningObjectives" :key="idx">
              {{ replaceJamoviLabel(obj, selectedModule.id) }}
            </li>
          </ul>
        </div>

        <!-- Path data section: Ch. 12–13 + analyze tool by methodology path -->
        <div v-if="!isPathDataSectionModule && !isDataAnalysisModule && moduleProgress.total > 0" class="module-progress">
          <div class="module-progress-header">
            <span>Module progress</span>
            <span>{{ moduleProgress.completed }} / {{ moduleProgress.total }}</span>
          </div>
          <div class="module-progress-bar">
            <div class="module-progress-fill" :style="{ width: `${moduleProgress.percent}%` }"></div>
          </div>
          <div class="module-progress-meta">
            <span>Topics read: {{ moduleProgress.openedTopics }} / {{ moduleProgress.totalTopics }}</span>
            <span>Content review: {{ moduleProgress.contentReviewComplete ? 1 : 0 }} / {{ moduleProgress.totalTopics > 0 ? 1 : 0 }}</span>
            <span>Learn: {{ moduleProgress.completedLessons }} / {{ moduleProgress.totalLessons }}</span>
          </div>
        </div>

        <!-- Content Tabs -->
        <div v-if="!isDataAnalysisModule && showContentTabs" class="content-tabs">
          <button
            v-for="tab in effectiveContentTabs"
            :key="tab.id"
            class="content-tab"
            :class="{ active: activeContentTab === tab.id, disabled: tab.id === 'software' && !hasSoftwareLessons }"
            :disabled="tab.id === 'software' && !hasSoftwareLessons"
            @click="activeContentTab = tab.id"
          >
            <span class="tab-icon" v-if="!tab.iconSrc">{{ tab.icon }}</span>
            <img v-else :src="tab.iconSrc" :alt="tab.label" class="tab-icon-img" />
            <span class="tab-label">{{ tab.label }}</span>
            <span class="tab-count" v-if="getTabCount(tab.id) > 0">{{ getTabCount(tab.id) }}</span>
          </button>
        </div>

        <!-- Tab Content -->
        <div v-if="!isDataAnalysisModule" class="tab-content">
          <!-- Statistics & analysis by methodology path (Ch. 12, 13, analyze tool) -->
          <template v-if="isPathDataSectionModule">
            <div
              v-for="path in activeMethodPaths"
              v-show="showMethodPathTabs ? activeContentTab === path.id : true"
              :key="path.id"
              class="tab-panel path-data-panel"
            >
              <p class="path-data-intro">{{ path.statsIntro }}</p>

              <section class="path-chapters-section">
                <h3 class="path-section-title">Pressbooks chapters</h3>
                <div class="path-chapter-cards">
                  <article class="path-chapter-card">
                    <h4>Ch. 12 — Descriptive Statistics</h4>
                    <p>{{ path.chapterFocus[12] }}</p>
                    <div class="path-chapter-actions">
                      <router-link :to="`/topic/rm-chapter-12`" class="path-chapter-link">
                        Read chapter →
                      </router-link>
                      <router-link
                        :to="`/class/${classId}/practice?module=rm-module-12`"
                        class="path-chapter-link path-chapter-link-secondary"
                      >
                        Concept review →
                      </router-link>
                    </div>
                  </article>
                  <article class="path-chapter-card">
                    <h4>Ch. 13 — Inferential Statistics</h4>
                    <p>{{ path.chapterFocus[13] }}</p>
                    <div class="path-chapter-actions">
                      <router-link :to="`/topic/rm-chapter-13`" class="path-chapter-link">
                        Read chapter →
                      </router-link>
                      <router-link
                        :to="`/class/${classId}/practice?module=rm-module-13`"
                        class="path-chapter-link path-chapter-link-secondary"
                      >
                        Concept review →
                      </router-link>
                    </div>
                  </article>
                </div>
              </section>

              <section class="path-analyze-section">
                <h3 class="path-section-title">Analyze your data</h3>
                <DataAnalysisHelper
                  :key="path.id"
                  :class-id="classId"
                  :method-path-id="path.id"
                  embedded
                />
              </section>
            </div>
          </template>

          <template v-else>
          <!-- Lab module: Sampling / Assignment as main tabs -->
          <div
            v-if="selectedModuleId === RM_MODULE_LAB_ID && (activeContentTab === 'lab-sampling' || activeContentTab === 'lab-assignment')"
            class="tab-panel"
          >
            <ExperimentalSamplingSimulation :embed-tab="labMiniLabEmbedTab" />
          </div>

          <!-- Topics Tab -->
          <div v-else-if="activeContentTab === 'topics'" class="tab-panel">
            <div
              v-if="isPsychMethodsClass && selectedModule?.pressbooksUrl"
              class="rm-reading-cta"
            >
              <h3 class="rm-reading-cta-title">Read Chapter {{ selectedModule.textbookChapter }}</h3>
              <p class="rm-reading-cta-desc">{{ selectedModule.shortTitle || selectedModule.title }}</p>
              <div class="rm-reading-cta-actions">
                <a
                  :href="selectedModule.pressbooksUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="rm-reading-cta-primary"
                >
                  Open in Pressbooks ↗
                </a>
                <router-link
                  v-if="moduleTopics[0]"
                  :to="`/topic/${moduleTopics[0].id}`"
                  class="rm-reading-cta-secondary"
                >
                  Read in Methods Market
                </router-link>
                <router-link
                  v-if="conceptReviewQuestionCount > 0"
                  :to="`/class/${classId}/practice?module=${selectedModuleId}`"
                  class="rm-reading-cta-secondary"
                >
                  Concept Review
                </router-link>
              </div>
            </div>
            <div v-if="moduleItems.length === 0" class="empty-state">
              <p>No topics available for this module yet.</p>
            </div>
            <div v-else>
              <template v-for="item in moduleItems" :key="item.id">
                <!-- Chapter section with collapsible card -->
                <div v-if="item.type === 'chapter'" class="practice-link-card learn-card chapter-card">
                  <div class="link-card-icon">
                    <img src="/topic-icon.png" alt="Chapter" class="link-card-icon-img" />
                  </div>
                  <div class="link-card-content">
                    <h3>{{ item.title }}</h3>
                    <p>{{ item.description }}</p>
                    <div class="topics-grid">
                      <router-link
                        v-for="topic in item.topics"
                        :key="topic.id"
                        :to="`/topic/${topic.id}`"
                        class="topic-card"
                        :class="{ read: isTopicRead(topic.id) }"
                      >
                        <img src="/topic-icon.png" alt="" class="topic-icon-img" />
                        <div class="topic-info">
                          <h3>{{ replaceJamoviLabel(topic.title, selectedModuleId) }}</h3>
                          <p>{{ replaceJamoviLabel(topic.description, selectedModuleId) }}</p>
                        </div>
                        <span v-if="isTopicRead(topic.id)" class="topic-status">Read</span>
                        <span class="card-arrow">-></span>
                      </router-link>
                    </div>
                  </div>
                </div>

                <!-- Regular topic (not in a chapter) -->
                <div v-else class="topics-grid">
                  <router-link
                    :to="`/topic/${item.id}`"
                    class="topic-card"
                    :class="{ read: isTopicRead(item.id) }"
                  >
                    <img src="/topic-icon.png" alt="" class="topic-icon-img" />
                    <div class="topic-info">
                      <h3>{{ replaceJamoviLabel(item.title, selectedModuleId) }}</h3>
                      <p>{{ replaceJamoviLabel(item.description, selectedModuleId) }}</p>
                    </div>
                    <span v-if="isTopicRead(item.id)" class="topic-status">Read</span>
                    <span class="card-arrow">-></span>
                  </router-link>
                </div>
              </template>
            </div>
          </div>

          <!-- Concept Review Tab -->
          <div v-else-if="activeContentTab === 'concepts'" class="tab-panel">
            <div
              v-if="conceptReviewQuestionCount === 0 && selectedModuleId !== RM_MODULE_LAB_ID"
              class="empty-state"
            >
              <p>No concept review questions available for this module yet.</p>
            </div>
            <router-link
              v-else-if="conceptReviewQuestionCount > 0"
              :to="`/class/${classId}/practice?module=${selectedModuleId}`"
              class="practice-link-card"
            >
              <div class="link-card-icon">
                <img src="/content-review-icon.png" alt="Content review" class="link-card-icon-img" />
              </div>
              <div class="link-card-content">
                <h3>Start Concept Review</h3>
                <p>Practice questions covering {{ selectedModule.shortTitle }} concepts</p>
              </div>
              <span class="card-arrow">-></span>
            </router-link>
          </div>

          <!-- Software Practice Tab (one lesson per module, like Module 8; lesson may have multiple learn sections) -->
          <div v-else-if="activeContentTab === 'software'" class="tab-panel">
            <div v-if="moduleLesson" class="software-phases-container">
              <!-- Lesson Header -->
              <div class="lesson-header-card">
                <div class="lesson-header-icon">
                  <img
                    v-if="getSoftwareIcon(moduleLesson.software)"
                    :src="getSoftwareIcon(moduleLesson.software)"
                    :alt="`${moduleLesson.software} icon`"
                    class="software-icon-large"
                  />
                </div>
                <div class="lesson-header-info">
                  <h3>{{ moduleLesson.title }}</h3>
                  <p>{{ moduleLesson.objectives ? moduleLesson.objectives[0] : '' }}</p>
                  <div class="lesson-meta">
                    <span class="software-badge" :style="{ backgroundColor: getSoftwareColor(moduleLesson.software) }">
                      {{ moduleLesson.software }}
                    </span>
                    <span class="time-estimate" v-if="moduleLesson.estimatedTime">
                      {{ moduleLesson.estimatedTime }} min
                    </span>
                  </div>
                </div>
              </div>

              <!-- Phase Navigation Buttons -->
              <div class="phase-buttons-grid">
                <router-link
                  :to="`/class/${classId}/lesson/${moduleLesson.id}?phase=iDo`"
                  class="phase-button-card i-do"
                >
                  <div class="phase-icon">📖</div>
                  <div class="phase-info">
                    <h4>Learn</h4>
                    <p>Step-by-step demonstrations</p>
                  </div>
                  <span class="card-arrow">→</span>
                </router-link>

                <router-link
                  v-if="isAdmin || !isPhaseLocked('weDo', lessonCompletedPhases)"
                  :to="`/class/${classId}/lesson/${moduleLesson.id}?phase=weDo`"
                  class="phase-button-card we-do"
                >
                  <div class="phase-icon">🎯</div>
                  <div class="phase-info">
                    <h4>Practice</h4>
                    <p>Guided tasks</p>
                  </div>
                  <span class="card-arrow">→</span>
                </router-link>
                <span v-else class="phase-button-card we-do locked" aria-disabled="true">
                  <div class="phase-icon">🎯</div>
                  <div class="phase-info">
                    <h4>Practice</h4>
                    <p>Guided tasks</p>
                  </div>
                  <span class="card-arrow">→</span>
                </span>

                <router-link
                  v-if="isAdmin || !isPhaseLocked('selfCheck', lessonCompletedPhases)"
                  :to="`/class/${classId}/lesson/${moduleLesson.id}?phase=selfCheck`"
                  class="phase-button-card self-check"
                >
                  <div class="phase-icon">✅</div>
                  <div class="phase-info">
                    <h4>Self-Check</h4>
                    <p>Test your knowledge</p>
                  </div>
                  <span class="card-arrow">→</span>
                </router-link>
                <span v-else class="phase-button-card self-check locked" aria-disabled="true">
                  <div class="phase-icon">✅</div>
                  <div class="phase-info">
                    <h4>Self-Check</h4>
                    <p>Test your knowledge</p>
                  </div>
                  <span class="card-arrow">→</span>
                </span>

                <router-link
                  v-if="isAdmin || !isPhaseLocked('youDo', lessonCompletedPhases)"
                  :to="`/class/${classId}/lesson/${moduleLesson.id}?phase=youDo`"
                  class="phase-button-card you-do"
                >
                  <div class="phase-icon">✍️</div>
                  <div class="phase-info">
                    <h4>Apply</h4>
                    <p>Independent tasks</p>
                  </div>
                  <span class="card-arrow">→</span>
                </router-link>
                <span v-else class="phase-button-card you-do locked" aria-disabled="true">
                  <div class="phase-icon">✍️</div>
                  <div class="phase-info">
                    <h4>Apply</h4>
                    <p>Independent tasks</p>
                  </div>
                  <span class="card-arrow">→</span>
                </span>
              </div>
            </div>
            <div v-else class="empty-state">
              <p>No software lessons available for this module yet.</p>
            </div>
          </div>
          </template>
        </div>
      </div>

      <!-- Progress (if authenticated) -->
      <div v-if="isAuthenticated && hasProfile" class="progress-section">
        <h2>Your Progress</h2>
        <div class="progress-card">
          <div class="progress-stat">
            <span class="stat-value">{{ stats?.completed || 0 }}</span>
            <span class="stat-label">Topics Completed</span>
          </div>
          <div class="progress-stat">
            <span class="stat-value">{{ stats?.practiced || 0 }}</span>
            <span class="stat-label">Exercises Done</span>
          </div>
          <div class="progress-stat">
            <span class="stat-value">{{ stats?.accuracy || '--' }}%</span>
            <span class="stat-label">Accuracy</span>
          </div>
        </div>
      </div>

      <!-- Not authenticated prompt -->
      <div v-else-if="!isAuthenticated" class="auth-prompt">
        <p>
          <router-link to="/auth">Sign in</router-link> to track your progress in this course!
        </p>
      </div>
    </div>

    <!-- Module 8 Selector Modal -->
    <Teleport to="body">
      <div v-if="showModule8Selector" class="modal-overlay" @click.self="closeModule8Selector">
        <div class="modal-container">
          <Module8Selector @save="closeModule8Selector" @skip="closeModule8Selector" />
        </div>
      </div>
    </Teleport>
  </div>

  <!-- Loading state -->
  <div v-else-if="classesLoading" class="class-loading">
    <div class="container">
      <div class="spinner"></div>
      <p>Loading class...</p>
    </div>
  </div>

  <!-- Class not found -->
  <div v-else class="class-not-found">
    <div class="container">
      <h1>Class Not Found</h1>
      <p>The requested class doesn't exist or is not available.</p>
      <router-link to="/" class="btn-primary">Go Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useClasses } from '../composables/useClasses'
import { useAuth } from '../composables/useAuth'
import { useProfile } from '../composables/useProfile'
import {
  getModulesByClassId,
  getContentModulesByClass,
  getTopicsForModule,
  getModuleItemsWithChapters,
  classHasDataAnalysisTool
} from '../data/modules'
import { groupModulesByCanvasPart, METHOD_PATHS_LIST, getMethodPathById } from '../data/researchMethodsTextbook'
import { isPsychMethodsCourse } from '../data/psychMethodsCourses'
import { software } from '../data/topics'
import { statisticsExercises } from '../data/statisticsPractices'
import { getLessonsByModule } from '../data/softwareLessons'
import { useModule8Preferences } from '../composables/useModule8Preferences'
import { useLessonPhaseProgress } from '../composables/useLessonPhaseProgress'
import { preferredSoftware } from '../composables/usePreferredSoftware.js'
import Module8Selector from '../components/Module8Selector.vue'
import ExperimentalSamplingSimulation from '../components/ExperimentalSamplingSimulation.vue'
import DataAnalysisHelper from '../views/DataAnalysisHelper.vue'
import { getClassDisplayName } from '../utils/classDisplayName'
import { getQuestionsByModule } from '../data/conceptQuestions'
import {
  CANVAS_RM_GETTING_STARTED_URL,
  PRESSBOOKS_TEXTBOOK_URL
} from '../data/researchMethodsCanvasLinks.js'

const route = useRoute()
const { selectClass, fetchClasses, classes, loading: classesLoading } = useClasses()
const { isAuthenticated, user } = useAuth()
const isAdmin = computed(() => user.value?.role === 'admin')
const { hasProfile } = useProfile()
const module8Prefs = useModule8Preferences()

const classId = computed(() => route.params.classId)

const isResearchMethodsClass = computed(() => {
  const slug = currentClass.value?.slug || classId.value
  return slug === 'research-methods'
})

const isExperimentalClass = computed(() => {
  const slug = currentClass.value?.slug || classId.value
  return slug === 'experimental'
})

const isPsychMethodsClass = computed(() => {
  const slug = currentClass.value?.slug || classId.value
  return isPsychMethodsCourse(slug)
})

const selectedModuleId = ref(null)
const activePartId = ref(null)
const activeContentTab = ref('topics')
const preferredSoftwareName = computed(() => getSoftwareName(preferredSoftware.value))
const showModule8Selector = ref(false)

const RM_MODULE_LAB_ID = 'rm-module-lab'
const RM_MODULE_DATA_BY_PATH_ID = 'rm-module-data-by-path'
const RM_LEGACY_DATA_MODULE_IDS = ['rm-module-12', 'rm-module-13', 'rm-module-analyze-data']

const methodPathList = METHOD_PATHS_LIST

const standardContentTabs = [
  { id: 'topics', label: 'Topics', iconSrc: '/topic-icon.png' },
  { id: 'concepts', label: 'Concept Review', iconSrc: '/content-review-icon.png' },
  { id: 'software', label: 'Software Practice', iconSrc: '/software-practice-icon.png' }
]

const VALID_CONTENT_TAB_IDS = new Set(['topics', 'concepts', 'software'])

const labModuleContentTabs = [
  { id: 'lab-sampling', label: 'Sampling', iconSrc: '/topic-icon.png' },
  { id: 'lab-assignment', label: 'Assignment', iconSrc: '/content-review-icon.png' }
]

const methodPathContentTabs = methodPathList.map((path) => ({
  id: path.id,
  label: path.shortLabel,
  iconSrc: '/content-review-icon.png'
}))

const effectiveContentTabs = computed(() => {
  if (selectedModuleId.value === RM_MODULE_LAB_ID) return labModuleContentTabs
  if (selectedModuleId.value === RM_MODULE_DATA_BY_PATH_ID && showMethodPathTabs.value) {
    return methodPathContentTabs
  }
  return standardContentTabs
})

const showMethodPathTabs = computed(() => !selectedModule.value?.fixedMethodPathId)

const activeMethodPaths = computed(() => {
  const fixedId = selectedModule.value?.fixedMethodPathId
  if (fixedId) {
    const path = getMethodPathById(fixedId)
    return path ? [{ ...path, id: fixedId }] : []
  }
  return methodPathList
})

const showContentTabs = computed(() => {
  if (isDataAnalysisModule.value) return false
  if (isPathDataSectionModule.value && !showMethodPathTabs.value) return false
  return true
})

const labMiniLabEmbedTab = computed(() =>
  activeContentTab.value === 'lab-assignment' ? 'assignment' : 'sampling'
)

const currentClass = computed(() => {
  const param = classId.value
  // Try to find by slug first, then by ID
  return classes.value.find(c => c.slug === param || c.id === param) || null
})

const showDataAnalysisNav = computed(() =>
  classHasDataAnalysisTool(currentClass.value?.slug || classId.value)
)

// Get modules for the current class
const classModules = computed(() => {
  const slug = currentClass.value?.slug || classId.value
  return getModulesByClassId(slug)
})

// Filter modules to content modules only
const contentModules = computed(() => {
  const slug = currentClass.value?.slug || classId.value
  return getContentModulesByClass(slug)
})

const psychMethodsModuleGroups = computed(() => {
  if (!isPsychMethodsClass.value) return []
  const slug = currentClass.value?.slug || classId.value
  return groupModulesByCanvasPart(contentModules.value, slug)
})

const activePartGroup = computed(() => {
  const groups = psychMethodsModuleGroups.value
  if (!groups.length) return null
  return groups.find((p) => p.id === activePartId.value) ?? groups[0]
})

function partIdForModule(moduleId) {
  if (!moduleId) return null
  for (const part of psychMethodsModuleGroups.value) {
    if (part.modules.some((m) => m.id === moduleId)) return part.id
  }
  return null
}

function syncActivePartFromModule() {
  if (!isPsychMethodsClass.value) return
  const partId = partIdForModule(selectedModuleId.value)
  if (partId) {
    activePartId.value = partId
  } else if (psychMethodsModuleGroups.value.length && !activePartId.value) {
    activePartId.value = psychMethodsModuleGroups.value[0].id
  }
}

function selectPart(partId) {
  activePartId.value = partId
  const part = psychMethodsModuleGroups.value.find((p) => p.id === partId)
  if (!part?.modules?.length) return
  const moduleInPart = part.modules.some((m) => m.id === selectedModuleId.value)
  if (!moduleInPart) selectModule(part.modules[0].id)
}

const selectedModule = computed(() => {
  return classModules.value.find(m => m.id === selectedModuleId.value)
})

const isDataAnalysisModule = computed(() => {
  const mod = selectedModule.value
  return !!(mod && mod.isDataAnalysisTool)
})

const isPathDataSectionModule = computed(() => {
  const mod = selectedModule.value
  return !!(mod && mod.isPathDataSection)
})

// Get topics for the selected module
const moduleTopics = computed(() => {
  return getTopicsForModule(selectedModuleId.value)
})

const conceptReviewQuestionCount = computed(() =>
  selectedModuleId.value ? getQuestionsByModule(selectedModuleId.value).length : 0
)

// Get module items with chapters preserved (for UI rendering)
const moduleItemsRaw = computed(() => {
  return getModuleItemsWithChapters(selectedModuleId.value)
})

// Filter module items for Module 8 based on user selections
const moduleItems = computed(() => {
  const items = moduleItemsRaw.value

  // Only filter for Module 8
  if (selectedModuleId.value !== 'stats-module-8') {
    return items
  }

  // If no selection made yet, show all items
  if (module8Prefs.selectedTopics.value.size === 0) {
    return items
  }

  // Filter items based on selection
  return items.map(item => {
    if (item.type === 'chapter') {
      // Filter chapter topics
      const filteredTopics = item.topics.filter(topic =>
        module8Prefs.isTopicSelected(topic.id)
      )

      // Only include chapter if it has selected topics
      if (filteredTopics.length === 0) return null

      return {
        ...item,
        topics: filteredTopics
      }
    } else {
      // Regular topic - check if selected
      return module8Prefs.isTopicSelected(item.id) ? item : null
    }
  }).filter(item => item !== null)
})

// Get software lessons for the selected module
const moduleLessons = computed(() => {
  return getLessonsByModule(selectedModuleId.value)
})

const filteredModuleLessons = computed(() => {
  if (!preferredSoftware.value) return moduleLessons.value
  return moduleLessons.value.filter(lesson => lesson.software === preferredSoftware.value)
})

// Get the unified lesson for the current module (new structure: one lesson per module)
const moduleLesson = computed(() => {
  const lessons = getLessonsByModule(selectedModuleId.value)
  if (lessons.length === 0) return null

  // Filter by preferred software if specified
  if (preferredSoftware.value) {
    const filtered = lessons.filter(lesson => lesson.software === preferredSoftware.value)
    return filtered[0] || null
  }

  return lessons[0] || null
})

const hasSoftwareLessons = computed(() => {
  return moduleLesson.value !== null || todoExercises.value.length > 0
})

const { getCompletedPhases, isPhaseLocked, phaseProgressVersion } = useLessonPhaseProgress()
// Completed phases for current module lesson (reactive to phaseProgressVersion when SoftwareLesson saves)
const lessonCompletedPhases = computed(() => {
  phaseProgressVersion.value
  return getCompletedPhases(moduleLesson.value?.id)
})

function toPracticeModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value.replace('stats-module-', 'module-')
  return value
}

const todoExercises = computed(() => {
  if (!selectedModuleId.value) return []
  const practiceModuleId = toPracticeModuleId(selectedModuleId.value)
  const list = statisticsExercises.filter(
    ex =>
      (ex.software_type === preferredSoftware.value || ex.software_type === 'conceptual') &&
      ex.module === practiceModuleId &&
      ex.exercise_type !== 'menu_navigation'
  )
  // Group parallel tasks (same practiceObjectiveKey) for each software track
  return [...list].sort((a, b) => {
    const ka = a.practiceObjectiveKey || ''
    const kb = b.practiceObjectiveKey || ''
    if (ka && kb && ka !== kb) return ka.localeCompare(kb)
    if (ka && !kb) return -1
    if (!ka && kb) return 1
    return (a.order || 0) - (b.order || 0)
  })
})

const todoExercisesByChapter = computed(() => {
  const exercises = todoExercises.value
  if (exercises.length === 0) return []

  // Group exercises by chapter
  const chapters = {}
  exercises.forEach(ex => {
    const chapterId = ex.chapter || 'no-chapter'
    if (!chapters[chapterId]) {
      chapters[chapterId] = []
    }
    chapters[chapterId].push(ex)
  })

  // Convert to array format with chapter metadata
  const chapterOrder = ['chapter-10', 'chapter-11', 'chapter-12', 'chapter-13']
  const chapterTitles = {
    'chapter-10': 'Chapter 10: Categorical Data Analysis',
    'chapter-11': 'Chapter 11: Comparing Two Means',
    'chapter-12': 'Chapter 12: Correlation and Linear Regression',
    'chapter-13': 'Chapter 13: Comparing Several Means (One-Way ANOVA)'
  }

  return chapterOrder
    .filter(chapterId => chapters[chapterId])
    .map(chapterId => ({
      id: chapterId,
      title: chapterTitles[chapterId],
      exercises: chapters[chapterId]
    }))
})

function getCompletedSoftwareExerciseIds() {
  try {
    const raw = localStorage.getItem('completedSoftwareExercises')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read completed software exercises:', err)
    return new Set()
  }
}

const todoCompleted = computed(() => {
  if (todoExercises.value.length === 0) return false
  const completedSet = getCompletedSoftwareExerciseIds()
  return todoExercises.value.every((ex, index) => {
    const order = ex.order ?? index
    const id = [ex.software_type, ex.module, ex.topic, order, ex.title].join('|')
    return completedSet.has(id)
  })
})

const readTopicIds = ref(new Set())

function getReadTopicIds() {
  try {
    const raw = localStorage.getItem('readTopics')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read opened topics:', err)
    return new Set()
  }
}

function refreshReadTopics() {
  readTopicIds.value = getReadTopicIds()
}

function isTopicRead(topicId) {
  return readTopicIds.value.has(topicId)
}

function getCompletedConceptReviewIds() {
  try {
    const raw = localStorage.getItem('completedConceptReviewsV2')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read concept reviews:', err)
    return new Set()
  }
}

function getCompletedSoftwareLessonIds() {
  try {
    const raw = localStorage.getItem('completedSoftwareLessons')
    const parsed = raw ? JSON.parse(raw) : []
    return new Set(Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    console.warn('Unable to read completed software lessons:', err)
    return new Set()
  }
}

const moduleProgress = computed(() => {
  if (selectedModuleId.value === RM_MODULE_LAB_ID) {
    return {
      total: 0,
      completed: 0,
      percent: 0,
      totalTopics: 0,
      openedTopics: 0,
      contentReviewComplete: false,
      totalLessons: 0,
      completedLessons: 0,
      totalTodo: 0,
      completedTodo: 0
    }
  }

  // For Module 8, use selected topics if customization is active
  let topicsToCount = moduleTopics.value
  if (selectedModuleId.value === 'stats-module-8' && module8Prefs.selectedTopics.value.size > 0) {
    topicsToCount = moduleTopics.value.filter(topic =>
      module8Prefs.isTopicSelected(topic.id)
    )
  }

  const totalTopics = topicsToCount.length
  const openedTopics = topicsToCount.filter(topic => readTopicIds.value.has(topic.id)).length
  const completedSet = getCompletedConceptReviewIds()
  const contentReviewComplete = selectedModuleId.value
    ? completedSet.has(selectedModuleId.value)
    : false
  const completedLessonsSet = getCompletedSoftwareLessonIds()
  const totalLessons = filteredModuleLessons.value.length
  const completedLessons = filteredModuleLessons.value.filter(lesson => completedLessonsSet.has(lesson.id)).length
  const totalTodo = todoExercises.value.length
  const completedTodo = todoExercises.value.filter((ex, index) => {
    const order = ex.order ?? index
    const id = [ex.software_type, ex.module, ex.topic, order, ex.title].join('|')
    return completedSet.has(id)
  }).length
  const hasConceptReviewContent = conceptReviewQuestionCount.value > 0
  const total = totalTopics + (hasConceptReviewContent ? 1 : 0) + totalLessons + totalTodo
  const completed = openedTopics + (contentReviewComplete ? 1 : 0) + completedLessons + completedTodo
  const percent = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0

  return {
    total,
    completed,
    percent,
    totalTopics,
    openedTopics,
    contentReviewComplete,
    totalLessons,
    completedLessons,
    totalTodo,
    completedTodo
  }
})

// Get count for each tab
function getTabCount(tabId) {
  // For Module 8, use selected topics count if customization is active
  let topicsCount = moduleTopics.value.length
  if (selectedModuleId.value === 'stats-module-8' && module8Prefs.selectedTopics.value.size > 0) {
    topicsCount = moduleTopics.value.filter(topic =>
      module8Prefs.isTopicSelected(topic.id)
    ).length
  }

  switch (tabId) {
    case 'topics':
      return topicsCount
    case 'concepts':
      return conceptReviewQuestionCount.value > 0 ? 1 : 0
    case 'software':
      return filteredModuleLessons.value.length + todoExercises.value.length
    default:
      return 0
  }
}

function selectModule(moduleId) {
  if (RM_LEGACY_DATA_MODULE_IDS.includes(moduleId)) {
    moduleId = RM_MODULE_DATA_BY_PATH_ID
  }
  selectedModuleId.value = moduleId
  if (moduleId === RM_MODULE_LAB_ID) {
    activeContentTab.value = 'lab-sampling'
  } else if (moduleId === RM_MODULE_DATA_BY_PATH_ID) {
    const mod = contentModules.value.find(m => m.id === moduleId)
    activeContentTab.value =
      mod?.fixedMethodPathId || methodPathList[0]?.id || 'path-1-survey'
  } else {
    activeContentTab.value = 'topics'
  }

  // Show Module 8 selector if customization not completed
  if (moduleId === 'stats-module-8' && !module8Prefs.hasCompletedSelection.value) {
    showModule8Selector.value = true
  }
  syncActivePartFromModule()
}

function openModule8Selector() {
  showModule8Selector.value = true
}

function closeModule8Selector() {
  showModule8Selector.value = false
}

function normalizeRouteValue(value) {
  if (Array.isArray(value)) return value[0] || null
  return value || null
}

function toStatsModuleId(value) {
  if (!value) return null
  if (value.startsWith('stats-module-')) return value
  if (value.startsWith('module-')) return value.replace('module-', 'stats-module-')
  return value
}

function syncSelectedModuleFromQuery() {
  const queryModule = normalizeRouteValue(route.query.module)
  if (!queryModule) return
  let moduleId = toStatsModuleId(queryModule)
  if (RM_LEGACY_DATA_MODULE_IDS.includes(moduleId)) {
    moduleId = RM_MODULE_DATA_BY_PATH_ID
  }
  if (contentModules.value.find(mod => mod.id === moduleId)) {
    selectedModuleId.value = moduleId
    syncActivePartFromModule()
  }
}

function syncContentTabFromQuery() {
  const tab = normalizeRouteValue(route.query.tab)
  if (!tab || !VALID_CONTENT_TAB_IDS.has(tab)) return
  if (tab === 'software' && !hasSoftwareLessons.value) return
  activeContentTab.value = tab
}

function getSoftwareColor(softwareId) {
  const sw = software.find(s => s.id === softwareId)
  return sw?.color || '#6366f1'
}

function getSoftwareName(softwareId) {
  return software.find(s => s.id === softwareId)?.name || softwareId
}

function getSoftwareIcon(softwareId) {
  if (softwareId === 'jamovi') return '/jamovi-icon.png'
  if (softwareId === 'r') return '/r-icon.png'
  if (softwareId === 'spss') return '/SPSS-icon.png'
  if (softwareId === 'excel') return '/excel-icon.png'
  if (softwareId === 'stata') return '/stata-icon.png'
  return ''
}

function replaceJamoviLabel(text, moduleId) {
  if (!text || !moduleId || !moduleId.includes('module-3')) return text
  return text.replace(/Jamovi/gi, preferredSoftwareName.value)
}

function getModuleDisplayTitle(module) {
  return replaceJamoviLabel(module?.title, module?.id)
}

function getModuleDisplayShortTitle(module) {
  return replaceJamoviLabel(module?.shortTitle, module?.id)
}

function getModuleDisplayDescription(module) {
  return replaceJamoviLabel(module?.description, module?.id)
}

function getSectionCount(lesson, phase) {
  if (!lesson || !lesson.phases || !lesson.phases[phase]) return ''

  // For multi-section iDo phase
  if (phase === 'iDo' && lesson.phases.iDo.type === 'multi_section') {
    const sections = lesson.phases.iDo.sections || []
    return sections.length > 1 ? `${sections.length} sections` : '1 section'
  }

  // For weDo (practice) phase
  if (phase === 'weDo' && lesson.phases.weDo.steps) {
    const steps = lesson.phases.weDo.steps.length
    return `${steps} steps`
  }

  // For selfCheck phase
  if (phase === 'selfCheck') {
    let totalQuestions = 0
    if (lesson.phases.selfCheck.screenshotRecognition) {
      totalQuestions += lesson.phases.selfCheck.screenshotRecognition.length
    }
    if (lesson.phases.selfCheck.errorDiagnostic) {
      totalQuestions += lesson.phases.selfCheck.errorDiagnostic.length
    }
    if (lesson.phases.selfCheck.outputInterpretation) {
      totalQuestions += lesson.phases.selfCheck.outputInterpretation.length
    }
    return totalQuestions > 0 ? `${totalQuestions} exercises` : 'Skill verification'
  }

  // For youDo (apply) phase
  if (phase === 'youDo') {
    return 'Hands-on practice'
  }

  return ''
}

// Set default module when class modules load
function defaultModuleIdForClass(slug) {
  if (slug === 'research-methods') return 'rm-module-1'
  if (slug === 'experimental') return 'rm-module-4'
  return contentModules.value[0]?.id ?? null
}

function setDefaultModule() {
  const slug = currentClass.value?.slug || classId.value
  if (contentModules.value.length > 0 && !selectedModuleId.value) {
    const firstId = defaultModuleIdForClass(slug) || contentModules.value[0].id
    selectedModuleId.value = firstId
    activeContentTab.value = firstId === RM_MODULE_LAB_ID ? 'lab-sampling' : 'topics'
    syncActivePartFromModule()
  }
}

// Placeholder stats (would come from useAttempts in real implementation)
const stats = computed(() => ({
  completed: 3,
  practiced: 15,
  accuracy: 78
}))

// Sync class selection with URL
onMounted(async () => {
  await fetchClasses()
  if (classId.value) {
    selectClass(classId.value)
    setDefaultModule()
    syncSelectedModuleFromQuery()
    syncContentTabFromQuery()
  }
  refreshReadTopics()
})

watch(classId, (newId) => {
  if (newId) {
    selectClass(newId)
    selectedModuleId.value = null
    activePartId.value = null
    setDefaultModule()
    syncSelectedModuleFromQuery()
    syncContentTabFromQuery()
  }
  refreshReadTopics()
})

// Watch for modules loading
watch(contentModules, () => {
  setDefaultModule()
  syncSelectedModuleFromQuery()
  syncContentTabFromQuery()
  refreshReadTopics()
})

watch(() => route.query.module, () => {
  syncSelectedModuleFromQuery()
  refreshReadTopics()
})

watch(() => route.query.tab, () => {
  syncContentTabFromQuery()
})

watch(() => route.fullPath, () => {
  refreshReadTopics()
})

watch(selectedModuleId, id => {
  if (!id) return
  if (id === RM_MODULE_LAB_ID) {
    if (activeContentTab.value !== 'lab-sampling' && activeContentTab.value !== 'lab-assignment') {
      activeContentTab.value = 'lab-sampling'
    }
  } else if (id === RM_MODULE_DATA_BY_PATH_ID) {
    const mod = contentModules.value.find(m => m.id === id)
    const defaultPath = mod?.fixedMethodPathId || methodPathList[0]?.id || 'path-1-survey'
    if (activeContentTab.value !== defaultPath && showMethodPathTabs.value) {
      const pathTabIds = methodPathList.map((p) => p.id)
      if (!pathTabIds.includes(activeContentTab.value)) {
        activeContentTab.value = defaultPath
      }
    } else if (!showMethodPathTabs.value) {
      activeContentTab.value = defaultPath
    }
  } else if (
    activeContentTab.value === 'lab-sampling' ||
    activeContentTab.value === 'lab-assignment' ||
    methodPathList.some((p) => p.id === activeContentTab.value)
  ) {
    activeContentTab.value = 'topics'
  }
})
</script>

<style scoped>
.class-home {
  padding: 2rem 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.class-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  margin-bottom: 2rem;
  border-left: 4px solid var(--class-color, var(--primary));
}

.class-icon-large {
  width: 64px;
  height: 64px;
  background: color-mix(in srgb, var(--class-color, var(--primary)) 15%, transparent);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  flex-shrink: 0;
}

.class-info h1 {
  margin: 0 0 0.5rem 0;
  font-size: 1.75rem;
}

.class-info p {
  margin: 0;
  color: var(--text-secondary);
}

.header-links {
  margin-top: 0.75rem;
  font-size: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25rem;
}

.assignment-help-link {
  display: inline-block;
  color: var(--class-color, var(--primary));
  text-decoration: none;
  font-weight: 500;
}

.assignment-help-link:hover {
  text-decoration: underline;
}

.header-links-sep {
  color: var(--text-muted);
  margin: 0 0.15rem;
}

.class-canvas-note {
  margin: 0.35rem 0 0.75rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  max-width: 42rem;
  line-height: 1.5;
}

/* Path-based statistics & analysis section */
.path-data-panel {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.path-data-intro {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.55;
  max-width: 46rem;
}

.path-section-title {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.path-chapter-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
}

.path-chapter-card {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem 1.125rem;
  background: var(--bg-card);
}

.path-chapter-card h4 {
  margin: 0 0 0.5rem 0;
  font-size: 0.9375rem;
}

.path-chapter-card p {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  line-height: 1.45;
}

.path-chapter-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.path-chapter-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--primary);
  text-decoration: none;
}

.path-chapter-link:hover {
  text-decoration: underline;
}

.path-chapter-link-secondary {
  color: var(--text-secondary);
}

.path-analyze-section {
  border-top: 1px solid var(--border);
  padding-top: 1.25rem;
}

/* Section Title */
.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-primary);
}

/* Module Navigation */
.module-nav {
  margin-bottom: 2rem;
}

.part-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--border);
}

.part-tab {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.125rem;
  padding: 0.625rem 1rem;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  min-width: 8.5rem;
  flex: 1 1 auto;
  max-width: 14rem;
}

.part-tab:hover {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 5%, var(--bg-card));
}

.part-tab.active {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 12%, var(--bg-card));
}

.part-tab-label {
  font-size: 0.8125rem;
  font-weight: 700;
  color: var(--primary);
}

.part-tab-title {
  font-size: 0.75rem;
  line-height: 1.3;
  color: var(--text-secondary);
}

.part-tab.active .part-tab-title {
  color: var(--text-primary);
}

.part-panel {
  margin-top: 0.25rem;
}

.module-part-group {
  margin-bottom: 1.5rem;
}

.module-part-heading {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.35rem 0;
  color: var(--text-primary);
}

.module-part-desc {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  max-width: 42rem;
  line-height: 1.5;
}

.module-canvas-part-label {
  color: var(--primary);
  font-weight: 600;
}

.module-list {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.module-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  background: var(--bg-card);
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.module-btn:hover {
  border-color: var(--module-color, var(--primary));
  background: color-mix(in srgb, var(--module-color, var(--primary)) 5%, var(--bg-card));
}

.module-btn.active {
  border-color: var(--module-color, var(--primary));
  background: color-mix(in srgb, var(--module-color, var(--primary)) 15%, var(--bg-card));
}

.module-icon {
  font-size: 1.25rem;
}

.module-number {
  font-weight: 700;
  color: var(--module-color, var(--primary));
}

.module-title {
  color: var(--text-primary);
}

/* Module Content */
.module-content {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.data-analysis-module-panel {
  margin-top: 0.25rem;
}

.data-analysis-module-panel :deep(.data-analysis-helper) {
  padding-top: 0;
}

.data-analysis-module-panel :deep(.data-analysis-helper .container) {
  max-width: none;
  padding-left: 0;
  padding-right: 0;
}

.module-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
  margin-bottom: 1rem;
  position: relative;
}

.module-header-icon {
  width: 48px;
  height: 48px;
  background: color-mix(in srgb, var(--module-color, var(--primary)) 15%, transparent);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.module-header-info h2 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
}

.module-header-info p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.module-textbook-link {
  margin-top: 0.5rem !important;
}

.module-textbook-link a {
  color: var(--primary);
  font-size: 0.875rem;
  text-decoration: none;
}

.module-textbook-link a:hover {
  text-decoration: underline;
}

.rm-getting-started {
  background: color-mix(in srgb, var(--primary) 8%, var(--bg-elevated));
  border: 1px solid color-mix(in srgb, var(--primary) 25%, var(--border));
  border-radius: 0.75rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
}

.rm-getting-started h2 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
}

.rm-getting-started-lead {
  margin: 0 0 0.75rem 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.rm-getting-started-steps {
  margin: 0 0 1rem 0;
  padding-left: 1.25rem;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.rm-getting-started-steps li + li {
  margin-top: 0.35rem;
}

.rm-getting-started-links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.rm-quick-link {
  font-size: 0.875rem;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
}

.rm-quick-link:hover {
  text-decoration: underline;
}

.rm-reading-cta {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  margin-bottom: 1.25rem;
}

.rm-reading-cta-title {
  margin: 0 0 0.25rem 0;
  font-size: 1.0625rem;
}

.rm-reading-cta-desc {
  margin: 0 0 1rem 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.rm-reading-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.rm-reading-cta-primary,
.rm-reading-cta-secondary {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-decoration: none;
}

.rm-reading-cta-primary {
  background: var(--primary);
  color: var(--bg, #fff);
}

.rm-reading-cta-primary:hover {
  filter: brightness(1.05);
}

.rm-reading-cta-secondary {
  background: var(--bg);
  border: 1px solid var(--border);
  color: var(--text);
}

.rm-reading-cta-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

/* Learning Objectives */
.learning-objectives {
  background: var(--bg-elevated);
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
}

.learning-objectives h3 {
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-secondary);
  margin: 0 0 0.75rem 0;
}

.learning-objectives ul {
  margin: 0;
  padding-left: 1.25rem;
}

.learning-objectives li {
  font-size: 0.9375rem;
  margin-bottom: 0.25rem;
  color: var(--text-primary);
}

/* Module Progress */
.module-progress {
  background: var(--bg-elevated);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
}

.module-progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.module-progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.module-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary) 0%, #10b981 100%);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.module-progress-meta {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.75rem;
  color: var(--text-secondary);
  flex-wrap: wrap;
}

/* Content Tabs */
.content-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.content-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--bg-elevated);
  border: 2px solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9375rem;
  color: var(--text-secondary);
  transition: all 0.2s;
}

.content-tab:hover {
  background: var(--bg-main);
  color: var(--text-primary);
}

.content-tab:disabled,
.content-tab.disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.content-tab:disabled:hover {
  background: var(--bg-elevated);
  color: var(--text-secondary);
}

.content-tab.active {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.tab-icon {
  font-size: 1.125rem;
}

.tab-icon-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.tab-count {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.content-tab:not(.active) .tab-count {
  background: var(--bg-main);
  color: var(--text-secondary);
}

/* Tab Content */
.tab-panel {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: var(--text-secondary);
}

/* Topics Grid */
.topics-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.topic-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.topic-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.topic-card.read {
  border-color: #10b981;
}

.topic-status {
  font-size: 0.75rem;
  font-weight: 600;
  color: #10b981;
  background: #ecfdf5;
  border-radius: 999px;
  padding: 0.25rem 0.5rem;
}

.topic-icon {
  font-size: 1.5rem;
  line-height: 1;
}

.topic-icon-img {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.topic-info {
  flex: 1;
}

.topic-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.topic-info p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-arrow {
  color: var(--text-muted);
  font-size: 1.25rem;
  transition: transform 0.2s, color 0.2s;
}

.topic-card:hover .card-arrow,
.practice-link-card:hover .card-arrow,
.lesson-card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--primary);
}

/* Practice Link Card */
.practice-link-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.practice-link-card:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.link-card-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #dbeafe, #ede9fe);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
}

.link-card-icon-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
}

.link-card-content {
  flex: 1;
}

.link-card-content h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
}

.link-card-content p {
  margin: 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

/* Chapter Sections */
.chapter-section {
  margin-top: 1.5rem;
}

.chapter-section:first-of-type {
  margin-top: 1rem;
}

.chapter-header {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.75rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}

/* Lessons Grid */
.lessons-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.learn-card {
  align-items: flex-start;
}

.learn-card:hover {
  transform: none;
  box-shadow: none;
  border-color: var(--border);
}

.learn-card .link-card-content {
  flex: 1;
}

.chapter-card {
  margin-bottom: 1.5rem;
}

.lesson-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
}

.lesson-card:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow);
  transform: translateY(-2px);
}

.lesson-software {
  padding: 0.25rem 0.625rem;
  border-radius: 0.25rem;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
}

.lesson-software-icon {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.lesson-info {
  flex: 1;
}

.lesson-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.lesson-info p {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Benchmarks Section */
/* Progress Section */
.progress-section {
  margin-top: 2rem;
}

.progress-section h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.progress-card {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
}

.progress-stat {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
}

.stat-label {
  font-size: 0.8125rem;
  color: var(--text-secondary);
  margin-top: 0.25rem;
}

.auth-prompt {
  padding: 1.5rem;
  background: var(--note-bg);
  border: 1px solid var(--primary);
  border-radius: 0.75rem;
  text-align: center;
  margin-top: 2rem;
}

.class-loading {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.class-loading .spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--border);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 1rem;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.class-loading p {
  color: var(--text-secondary);
}

.class-not-found {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.class-not-found h1 {
  margin-bottom: 0.5rem;
}

.class-not-found p {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

.btn-primary {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
}

.btn-primary:hover {
  background: var(--primary-dark);
}

/* Module 8 Customization Button */
.module-settings-btn {
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.5rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.module-settings-btn:hover {
  border-color: var(--primary);
  background: var(--bg-card);
  color: var(--primary);
}

/* Modal Overlay and Container */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--bg-card);
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Software Phases Container */
.software-phases-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lesson-header-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
}

.lesson-header-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #dbeafe, #ede9fe);
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.software-icon-large {
  width: 48px;
  height: 48px;
  object-fit: contain;
}

.lesson-header-info {
  flex: 1;
}

.lesson-header-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.lesson-header-info p {
  margin: 0 0 0.75rem 0;
  font-size: 0.9375rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.lesson-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.software-badge {
  padding: 0.25rem 0.625rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  text-transform: uppercase;
}

.time-estimate {
  font-size: 0.8125rem;
  color: var(--text-muted);
}

/* Phase Buttons Grid */
.phase-buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.phase-button-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem;
  background: var(--bg-elevated);
  border: 2px solid var(--border);
  border-radius: 0.75rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  position: relative;
  overflow: hidden;
}

.phase-button-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  transition: width 0.2s;
}

.phase-button-card.i-do::before {
  background: #3b82f6;
}

.phase-button-card.we-do::before {
  background: #f59e0b;
}

.phase-button-card.self-check::before {
  background: #10b981;
}

.phase-button-card.you-do::before {
  background: #8b5cf6;
}

.phase-button-card:hover {
  border-color: var(--primary);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.phase-button-card:hover::before {
  width: 100%;
  opacity: 0.08;
}

.phase-button-card.locked {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--text-muted);
  pointer-events: none;
}

.phase-button-card.locked:hover {
  border-color: var(--border);
  box-shadow: none;
  transform: none;
}

.phase-button-card.locked:hover::before {
  width: 4px;
  opacity: 1;
}

.phase-icon {
  width: 36px;
  height: 36px;
  background: var(--bg-card);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.phase-info {
  flex: 1;
}

.phase-info h4 {
  margin: 0 0 0.125rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--text-primary);
}

.phase-info p {
  margin: 0;
  font-size: 0.75rem;
  color: var(--text-secondary);
}

.phase-button-card .card-arrow {
  color: var(--text-muted);
  font-size: 1.25rem;
  transition: transform 0.2s, color 0.2s;
}

.phase-button-card:hover .card-arrow {
  transform: translateX(4px);
  color: var(--primary);
}

@media (max-width: 768px) {
  .class-header {
    flex-direction: column;
    text-align: center;
  }

  .module-list {
    overflow-x: auto;
    flex-wrap: nowrap;
    padding-bottom: 0.5rem;
  }

  .module-btn {
    flex-shrink: 0;
  }

  .content-tabs {
    flex-direction: column;
  }

  .content-tab {
    justify-content: flex-start;
  }

  .progress-card {
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>






