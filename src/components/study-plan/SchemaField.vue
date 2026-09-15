<template>
  <div class="form-group">
    <label :for="inputId" class="field-label">
      {{ field.label }}
      <span v-if="field.required" class="required-mark" aria-hidden="true">*</span>
    </label>
    <p v-if="field.helpNote" class="field-hint">{{ field.helpNote }}</p>
    <router-link
      v-if="field.helpTopicId"
      :to="`/topic/${field.helpTopicId}`"
      class="chapter-link"
    >
      Open chapter help →
    </router-link>
    <textarea
      v-if="field.multiline !== false"
      :id="inputId"
      :value="modelValue"
      class="field-input"
      rows="4"
      :placeholder="placeholder"
      @input="onInput"
    />
    <input
      v-else
      :id="inputId"
      :value="modelValue"
      type="text"
      class="field-input"
      :placeholder="placeholder"
      @input="onInput"
    />
    <p v-if="wordCount != null" class="word-count-hint">
      {{ wordCount }} words
      <span v-if="wordCountHint"> (aim for ~{{ wordCountHint.min }}–{{ wordCountHint.max }})</span>
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  field: { type: Object, required: true },
  modelValue: { type: String, default: '' },
  inputId: { type: String, required: true },
  placeholder: { type: String, default: '' },
  wordCount: { type: Number, default: null },
  wordCountHint: { type: Object, default: null }
})

const emit = defineEmits(['update:modelValue'])

function onInput (e) {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
.form-group {
  margin-bottom: 1.25rem;
}

.field-label {
  display: block;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: var(--text-primary);
}

.required-mark {
  color: var(--primary);
  margin-left: 0.15rem;
}

.field-hint {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin: 0 0 0.5rem;
  line-height: 1.45;
}

.chapter-link {
  display: inline-block;
  font-size: 0.85rem;
  color: var(--primary);
  margin-bottom: 0.5rem;
  text-decoration: none;
}

.chapter-link:hover {
  text-decoration: underline;
}

.field-input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-input, var(--bg-card));
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  line-height: 1.5;
  resize: vertical;
}

.field-input:focus {
  outline: 2px solid var(--primary);
  outline-offset: 1px;
}

.word-count-hint {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.35rem;
}
</style>
