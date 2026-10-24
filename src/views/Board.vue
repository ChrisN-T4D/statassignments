<template>
  <div class="board-page-wrap">
    <div class="container">
      <router-link :to="`/class/${classId}`" class="back-link">← Back to your class</router-link>
      <div class="board-page-card">
        <ClassBoardPanel :class-id="classId" page />
      </div>
    </div>
  </div>
</template>

<script setup>
import ClassBoardPanel from '../components/ClassBoardPanel.vue'

defineProps({
  classId: { type: String, required: true }
})
</script>

<style scoped>
.board-page-wrap { padding: 1rem 0 3rem; }
.back-link { display: inline-block; margin-bottom: 0.75rem; color: var(--text-secondary); }
.board-page-card { background: var(--bg-card); border: 1px solid var(--border); border-radius: 0.9rem; max-width: 780px; min-height: 60vh; }
</style>
