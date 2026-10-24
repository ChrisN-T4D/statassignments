<template>
  <div v-if="available" class="board-shell">
    <button
      v-if="!isOpen"
      type="button"
      class="board-launcher"
      aria-label="Ask the class"
      @click="openBoard(context)"
    >
      <span class="board-launcher-icon" aria-hidden="true">💬</span>
      <span class="board-launcher-label">Ask the class</span>
      <span v-if="unread" class="board-launcher-badge" :aria-label="`${unread} new replies`">{{ unread }}</span>
    </button>

    <transition name="board-pop">
      <div v-if="isOpen" class="board-popup" role="dialog" aria-label="Ask the class">
        <ClassBoardPanel :class-id="classSlug">
          <template #actions>
            <div class="board-popup-actions">
              <router-link class="board-popup-link" :to="`/class/${classSlug}/board`" @click="closeBoard">Open full page</router-link>
              <button type="button" class="board-popup-close" aria-label="Close" @click="closeBoard">×</button>
            </div>
          </template>
        </ClassBoardPanel>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ClassBoardPanel from './ClassBoardPanel.vue'
import { boardApi } from '../lib/boardApi'
import { boardTagFor } from '../lib/boardFormat'
import { useAuth } from '../composables/useAuth'
import { useBoard } from '../composables/useBoard'
import { useClasses } from '../composables/useClasses'
import { getAssignmentById } from '../data/assignmentHelp'
import { parseWeekRef, findTargetWeek } from '../data/researchMethodsSchedule'

const route = useRoute()
const { isAuthenticated } = useAuth()
const { isOpen, unread, openBoard, closeBoard } = useBoard()
const { selectedClass } = useClasses()

// The forum follows the class the student is looking at: the URL first, else the picked class
const classSlug = computed(() => route.params.classId || selectedClass.value?.slug || selectedClass.value?.id || '')
const denied = ref(false)
const available = computed(() => isAuthenticated.value && !!classSlug.value && !denied.value && route.name !== 'board')

// Tag a new question with where the student is: this assignment, else this week
const context = computed(() => {
  const topic = route.query.topic ? String(route.query.topic) : ''
  const found = topic ? getAssignmentById(classSlug.value, topic) : null
  const place = parseWeekRef(route.query.from) || findTargetWeek(null, { classSlug: classSlug.value })
  const tag = boardTagFor({
    topic: found ? topic : '',
    topicName: found?.assignment?.name,
    weekNumber: place ? place.weekIndex + 1 : 0
  })
  return { ...tag, search: '' }
})

let timer = null

async function checkUnread() {
  if (!available.value || document.hidden) return
  try {
    unread.value = (await boardApi.unread(classSlug.value)).unread
    denied.value = false
  } catch (e) {
    if (e.status === 403 || e.status === 404) denied.value = true
  }
}

onMounted(() => {
  checkUnread()
  timer = setInterval(checkUnread, 60000)
})
onBeforeUnmount(() => clearInterval(timer))
watch(classSlug, () => {
  denied.value = false
  unread.value = 0
  checkUnread()
})
watch(isAuthenticated, checkUnread)
// Leaving the class (or the app) closes a popup that no longer belongs to the page
watch(() => route.fullPath, () => {
  if (isOpen.value && !available.value) closeBoard()
})
</script>

<style scoped>
.board-launcher {
  position: fixed; right: 1rem; bottom: 1rem; z-index: 900;
  display: flex; align-items: center; gap: 0.4rem;
  background: var(--primary); color: #fff; border: none; border-radius: 999px;
  padding: 0.65rem 1rem; font: inherit; font-weight: 600; cursor: pointer;
  box-shadow: var(--shadow-lg);
}
.board-launcher:hover { background: var(--primary-dark); }
.board-launcher-badge {
  background: #fff; color: var(--primary-dark); border-radius: 999px;
  min-width: 1.3rem; height: 1.3rem; display: inline-flex; align-items: center; justify-content: center;
  font-size: 0.75rem; font-weight: 800; padding: 0 0.3rem;
}
.board-popup {
  position: fixed; right: 1rem; bottom: 1rem; z-index: 1002;
  width: min(440px, calc(100vw - 2rem)); height: min(640px, calc(100vh - 2rem));
  background: var(--bg-main); border: 1px solid var(--border-light); border-radius: 0.9rem;
  box-shadow: var(--shadow-lg); overflow: hidden; display: flex; flex-direction: column;
}
.board-popup-actions { display: flex; align-items: center; gap: 0.75rem; }
.board-popup-link { font-size: 0.8rem; color: var(--text-secondary); }
.board-popup-close { background: none; border: none; color: var(--text-secondary); font-size: 1rem; cursor: pointer; }
.board-popup-close:hover { color: var(--text-primary); }
.board-pop-enter-active, .board-pop-leave-active { transition: opacity 0.15s, transform 0.15s; }
.board-pop-enter-from, .board-pop-leave-to { opacity: 0; transform: translateY(0.5rem); }
@media (max-width: 600px) {
  .board-popup { right: 0; bottom: 0; width: 100vw; height: 100dvh; border-radius: 0; border: none; }
  .board-launcher-label { display: none; }
}
</style>
