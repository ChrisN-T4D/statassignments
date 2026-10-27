<template>
  <aside class="irb-packet" aria-labelledby="irb-packet-title">
    <h2 id="irb-packet-title" class="packet-title">Your IRB packet needs more than a survey</h2>
    <p class="packet-note">
      The IRB reads everything a participant will see before you recruit anyone: the survey, the consent form, and the wording of any
      flier, spoken ask, or social media post. These pieces have to match each other and your Methods section.
    </p>
    <ul class="packet-list">
      <li v-for="item in items" :key="item.id" :class="{ done: item.done }">
        <span class="packet-mark" aria-hidden="true">{{ item.done ? '✓' : '○' }}</span>
        <span>{{ item.label }}</span>
        <span class="sr-only">{{ item.done ? ' (done)' : ' (not done yet)' }}</span>
      </li>
    </ul>
    <router-link v-if="!hideLink" :to="`/class/${classId}/study-plan/recruitment-consent`" class="packet-link">
      {{ done === total ? 'Review' : 'Work on' }} Recruitment and Consent →
    </router-link>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { recruitmentConsentProgress } from '../../data/capstoneRecruitmentConsentWorksheet.js'

const props = defineProps({
  project: { type: Object, required: true },
  classId: { type: String, required: true },
  hideLink: { type: Boolean, default: false }
})

const progress = computed(() => recruitmentConsentProgress(props.project))
const items = computed(() => progress.value.items)
const done = computed(() => progress.value.done)
const total = computed(() => progress.value.total)
</script>

<style scoped>
.irb-packet {
  margin: 1.5rem 0;
  padding: 1.15rem 1.25rem;
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  background: rgba(245, 158, 11, 0.07);
}

.packet-title {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
}

.packet-note {
  margin: 0 0 0.75rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.packet-list {
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
  display: grid;
  gap: 0.3rem;
}

.packet-list li {
  display: flex;
  gap: 0.5rem;
  font-size: 0.92rem;
  color: var(--text-secondary);
}

.packet-list li.done {
  color: var(--text-primary);
}

.packet-mark {
  flex: none;
  width: 1.1rem;
}

.packet-link {
  color: var(--primary-text);
  font-weight: 600;
  text-decoration: none;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}
</style>
