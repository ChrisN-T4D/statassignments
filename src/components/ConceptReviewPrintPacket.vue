<template>
  <div class="cr-print-packet">
    <header class="packet-header">
      <h2>Concept Review print packet</h2>
      <p>{{ moduleLabel }}</p>
      <p class="packet-note">Write your answers on this paper. Correct answers are not printed here. When you have internet, open Methods Market and use Enter answers to score the packet and print your Canvas slip.</p>
    </header>
    <ol class="packet-questions">
      <li v-for="(q, index) in questions" :key="q.id" class="packet-q">
        <p class="q-text">{{ index + 1 }}. {{ q.question }}</p>
        <ul v-if="q.options?.length" class="q-options">
          <li v-for="opt in q.options" :key="opt.id">
            {{ opt.id }}. {{ opt.text }}
          </li>
        </ul>
        <p v-for="(line, i) in extraLines(q)" :key="i" class="q-extra">{{ line }}</p>
        <p class="q-blank">Answer: ____________________________</p>
      </li>
    </ol>
  </div>
</template>

<script setup>
import { questionPromptLines } from '../lib/conceptReviewScoring.js'

defineProps({
  questions: { type: Array, default: () => [] },
  moduleLabel: { type: String, default: '' }
})

function extraLines(q) {
  return questionPromptLines(q)
}
</script>

<style scoped>
.cr-print-packet {
  color: #111;
  background: #fff;
  padding: 1rem;
}
.packet-header h2 {
  margin: 0 0 0.25rem;
}
.packet-note {
  font-size: 0.95rem;
}
.packet-questions {
  padding-left: 1.25rem;
}
.packet-q {
  margin-bottom: 1.25rem;
  break-inside: avoid;
}
.q-options {
  list-style: none;
  padding-left: 0;
}
.q-blank {
  margin-top: 0.35rem;
}
@media print {
  .cr-print-packet {
    padding: 0;
  }
}
</style>
