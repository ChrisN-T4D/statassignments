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
        <template v-if="q.type === 'matching'">
          <ul class="q-match-blanks">
            <li v-for="(line, i) in matchingParts(q)?.blanks || []" :key="'b-' + i">{{ line }}</li>
          </ul>
          <p class="q-match-bank-label">Descriptions (write the letter next to each term; use each once):</p>
          <ul class="q-match-bank">
            <li v-for="(line, i) in matchingParts(q)?.bank || []" :key="'k-' + i">{{ line }}</li>
          </ul>
        </template>
        <p v-for="(line, i) in nonMatchingExtra(q)" :key="i" class="q-extra">{{ line }}</p>
        <p v-if="showAnswerBlank(q)" class="q-blank">Answer: ____________________________</p>
      </li>
    </ol>
  </div>
</template>

<script setup>
import {
  matchingPrintParts,
  questionPromptLines,
  usesWrittenAnswerBlank
} from '../lib/conceptReviewScoring.js'

defineProps({
  questions: { type: Array, default: () => [] },
  moduleLabel: { type: String, default: '' }
})

function matchingParts(q) {
  return matchingPrintParts(q)
}

function nonMatchingExtra(q) {
  if (q?.type === 'matching') return []
  return questionPromptLines(q)
}

function showAnswerBlank(q) {
  return usesWrittenAnswerBlank(q)
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
.q-options,
.q-match-blanks,
.q-match-bank {
  list-style: none;
  padding-left: 0;
  margin: 0.35rem 0;
}
.q-match-blanks li,
.q-match-bank li {
  margin: 0.2rem 0;
}
.q-match-bank-label {
  margin: 0.5rem 0 0.15rem;
  font-weight: 600;
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
