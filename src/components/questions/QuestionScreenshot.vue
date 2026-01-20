<template>
  <div class="question-screenshot">
    <p class="question-text">{{ question.question }}</p>

    <div class="instructions" v-if="question.instructions">
      <p>{{ question.instructions }}</p>
    </div>

    <div class="upload-area" :class="{ 'has-image': previewUrl, submitted }">
      <!-- Image preview -->
      <div v-if="previewUrl" class="preview-container">
        <img :src="previewUrl" alt="Screenshot preview" class="preview-image" />
        <button
          v-if="!submitted"
          type="button"
          class="remove-btn"
          @click="removeImage"
          aria-label="Remove image"
        >
          Ã¢Å“â€¢
        </button>
      </div>

      <!-- Upload prompt -->
      <div v-else class="upload-prompt">
        <div class="upload-icon">Ã°Å¸â€œÂ·</div>
        <p>Drag and drop a screenshot here, or click to browse</p>
        <p class="upload-hint">PNG, JPG, or GIF up to 10MB</p>
      </div>

      <!-- Hidden file input -->
      <input
        type="file"
        ref="fileInput"
        accept="image/*"
        class="file-input"
        :disabled="submitted"
        @change="handleFileSelect"
      />

      <!-- Clickable overlay -->
      <div
        v-if="!previewUrl && !submitted"
        class="click-overlay"
        @click="triggerFileInput"
        @dragover.prevent="onDragOver"
        @dragleave.prevent="onDragLeave"
        @drop.prevent="onDrop"
        :class="{ 'drag-over': isDragging }"
      ></div>
    </div>

    <!-- Manual grading notice -->
    <div class="grading-notice" v-if="!submitted">
      <span class="notice-icon">Ã¢â€žÂ¹Ã¯Â¸Â</span>
      <span>This question will be reviewed {{ question.autoGrade ? 'automatically' : 'manually' }}</span>
    </div>

    <!-- Submitted state -->
    <div v-if="submitted" class="feedback pending">
      <p v-if="question.autoGrade && evaluationResult">
        {{ evaluationResult.correct ? question.feedback.correct : question.feedback.incorrect }}
      </p>
      <p v-else>
        Your screenshot has been submitted and will be reviewed.
      </p>
      <p v-if="question.criteria" class="criteria-note">
        <strong>Evaluation criteria:</strong> {{ question.criteria }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'

const props = defineProps({
  question: { type: Object, required: true },
  answer: { type: [String, Object], default: null },
  submitted: { type: Boolean, default: false },
  evaluationResult: { type: Object, default: null }
})

const emit = defineEmits(['answer', 'submit'])

const fileInput = ref(null)
const previewUrl = ref(null)
const isDragging = ref(false)
const imageData = ref(null)

onMounted(() => {
  // If there's an existing answer (base64 or URL), show it
  if (props.answer) {
    if (typeof props.answer === 'string') {
      previewUrl.value = props.answer
    } else if (props.answer.dataUrl) {
      previewUrl.value = props.answer.dataUrl
    }
  }
})

watch(() => props.answer, (newVal) => {
  if (newVal) {
    if (typeof newVal === 'string') {
      previewUrl.value = newVal
    } else if (newVal.dataUrl) {
      previewUrl.value = newVal.dataUrl
    }
  } else {
    previewUrl.value = null
  }
})

function triggerFileInput() {
  fileInput.value?.click()
}

function handleFileSelect(event) {
  const file = event.target.files?.[0]
  if (file) {
    processFile(file)
  }
}

function processFile(file) {
  // Validate file type
  if (!file.type.startsWith('image/')) {
    alert('Please upload an image file')
    return
  }

  // Validate file size (10MB)
  if (file.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB')
    return
  }

  // Read file and create preview
  const reader = new FileReader()
  reader.onload = (e) => {
    previewUrl.value = e.target.result
    imageData.value = {
      dataUrl: e.target.result,
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size
    }
    emit('answer', imageData.value)
  }
  reader.readAsDataURL(file)
}

function removeImage() {
  previewUrl.value = null
  imageData.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('answer', null)
}

function onDragOver(event) {
  isDragging.value = true
}

function onDragLeave(event) {
  isDragging.value = false
}

function onDrop(event) {
  isDragging.value = false
  const file = event.dataTransfer?.files?.[0]
  if (file) {
    processFile(file)
  }
}
</script>

<style scoped>
.question-text {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.instructions {
  padding: 0.75rem 1rem;
  background: var(--note-bg);
  border-left: 3px solid var(--primary);
  border-radius: 0.25rem;
  margin-bottom: 1rem;
}

.instructions p {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--text-secondary);
}

.upload-area {
  position: relative;
  border: 2px dashed var(--border);
  border-radius: 0.75rem;
  background: var(--bg-elevated);
  min-height: 200px;
  transition: all 0.2s;
}

.upload-area:not(.has-image):not(.submitted):hover {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 5%, var(--bg-elevated));
}

.upload-area.has-image {
  border-style: solid;
}

.upload-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  min-height: 200px;
}

.upload-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.upload-prompt p {
  margin: 0;
  color: var(--text-secondary);
}

.upload-hint {
  font-size: 0.8125rem !important;
  margin-top: 0.5rem !important;
  color: var(--text-muted) !important;
}

.file-input {
  display: none;
}

.click-overlay {
  position: absolute;
  inset: 0;
  cursor: pointer;
  border-radius: 0.75rem;
}

.click-overlay.drag-over {
  background: color-mix(in srgb, var(--primary) 10%, transparent);
}

.preview-container {
  position: relative;
  padding: 1rem;
}

.preview-image {
  width: 100%;
  max-height: 400px;
  object-fit: contain;
  border-radius: 0.5rem;
}

.remove-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 50%;
  background: var(--danger);
  color: white;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.15s;
}

.remove-btn:hover {
  transform: scale(1.1);
}

.grading-notice {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
}

.notice-icon {
  font-size: 1rem;
}

.feedback {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
}

.feedback.pending {
  background: color-mix(in srgb, var(--primary) 10%, var(--bg-card));
  border: 1px solid var(--primary);
}

.feedback p {
  color: #111827;
  margin: 0;
  font-size: 0.9375rem;
}

.criteria-note {
  margin-top: 0.75rem !important;
  font-size: 0.875rem !important;
  color: var(--text-secondary);
}
</style>
