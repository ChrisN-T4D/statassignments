<template>
  <div class="under-construction">
    <img
      class="construction-gif"
      src="/under-construction.gif"
      alt="Animated under-construction sign with a worker digging"
      width="200"
      height="150"
    />
    <h3>{{ heading }}</h3>
    <p>
      Hands-on software practice for <strong>{{ softwareLabel }}</strong> is still being built.
      For now, work through the Jamovi track — the same analyses, with screenshots and
      step-by-step practice.
    </p>
    <button type="button" class="btn-primary" @click="switchToJamovi">
      Switch to Jamovi practice
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { software } from '../data/topics.js'
import { preferredSoftware, setPreferredSoftware } from '../composables/usePreferredSoftware.js'

const emit = defineEmits(['switch-to-jamovi'])

const props = defineProps({
  softwareId: {
    type: String,
    default: ''
  }
})

const resolvedSoftwareId = computed(
  () => props.softwareId || preferredSoftware.value || 'your software'
)

const softwareLabel = computed(() => {
  const id = resolvedSoftwareId.value
  return software.find(sw => sw.id === id)?.name || id
})

const heading = computed(() => `${softwareLabel.value} practice is under construction`)

function switchToJamovi() {
  setPreferredSoftware('jamovi')
  emit('switch-to-jamovi')
}
</script>

<style scoped>
.under-construction {
  text-align: center;
  padding: 2rem 1.25rem 2.25rem;
  background: var(--bg-elevated);
  border: 1px dashed var(--border);
  border-radius: 0.75rem;
}

.construction-gif {
  display: block;
  margin: 0 auto 1.25rem;
  image-rendering: pixelated;
}

.under-construction h3 {
  margin: 0 0 0.75rem;
  font-size: 1.25rem;
  color: var(--text-primary);
}

.under-construction p {
  margin: 0 auto 1.5rem;
  max-width: 36rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.btn-primary {
  display: inline-block;
  background: var(--primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
}

.btn-primary:hover {
  background: var(--primary-dark);
}
</style>
