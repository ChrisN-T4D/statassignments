<template>
  <BaseSimulator
    software="r"
    :task="task"
    :can-check="code.trim().length > 0"
    :show-hint="showHint"
    :show-reset="code !== task.starterCode"
    :feedback="feedback"
    @check-answer="checkAnswer"
    @reset="resetEditor"
    @show-hint="showHint = true"
  >
    <div class="r-interface">
      <!-- Code Editor -->
      <div class="editor-container">
        <div class="editor-header">
          <span class="editor-title">R Script</span>
          <span class="file-indicator">untitled.R</span>
        </div>
        <div class="editor-body">
          <div class="line-numbers">
            <div v-for="n in lineCount" :key="n" class="line-number">{{ n }}</div>
          </div>
          <textarea
            v-model="code"
            class="code-input"
            spellcheck="false"
            @keydown.tab.prevent="insertTab"
            :placeholder="task.placeholder || '# Write your R code here...'"
          ></textarea>
        </div>
      </div>

      <!-- Console Output -->
      <div class="console-container">
        <div class="console-header">
          <span>Console</span>
          <button class="run-btn" @click="runCode" :disabled="!code.trim()">
            Run Code
          </button>
        </div>
        <div class="console-output" ref="consoleEl">
          <div v-for="(output, idx) in consoleOutput" :key="idx" :class="['output-line', output.type]">
            <span v-if="output.type === 'input'" class="prompt">&gt; </span>
            <span v-if="output.type === 'error'" class="error-prefix">[Error] </span>
            {{ output.text }}
          </div>
          <div v-if="consoleOutput.length === 0" class="console-placeholder">
            Run your code to see output here
          </div>
        </div>
      </div>

      <!-- Expected Output Reference (optional) -->
      <div v-if="task.showExpectedOutput && showHint" class="expected-output">
        <strong>Expected output pattern:</strong>
        <pre>{{ task.expectedOutputHint }}</pre>
      </div>
    </div>
  </BaseSimulator>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'
import BaseSimulator from './BaseSimulator.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
    // Expected structure:
    // {
    //   title: string,
    //   instructions: string,
    //   hint: string,
    //   starterCode: string,
    //   expectedCode: { patterns: string[], requiredFunctions: string[], requiredArgs: object },
    //   placeholder: string,
    //   showExpectedOutput: boolean,
    //   expectedOutputHint: string
    // }
  }
})

const emit = defineEmits(['correct', 'incorrect'])

// State
const code = ref(props.task.starterCode || '')
const consoleOutput = ref([])
const showHint = ref(false)
const feedback = ref(null)
const consoleEl = ref(null)

// Computed
const lineCount = computed(() => {
  const lines = code.value.split('\n').length
  return Math.max(lines, 10)
})

// Methods
function insertTab(e) {
  const start = e.target.selectionStart
  const end = e.target.selectionEnd
  code.value = code.value.substring(0, start) + '  ' + code.value.substring(end)
  nextTick(() => {
    e.target.selectionStart = e.target.selectionEnd = start + 2
  })
}

function runCode() {
  // Add the code as input
  consoleOutput.value.push({
    type: 'input',
    text: code.value.split('\n').join('\n> ')
  })

  // Simulate R output based on code analysis
  const output = simulateROutput(code.value)
  consoleOutput.value.push(...output)

  // Scroll to bottom
  nextTick(() => {
    if (consoleEl.value) {
      consoleEl.value.scrollTop = consoleEl.value.scrollHeight
    }
  })
}

function simulateROutput(codeStr) {
  const outputs = []

  // Check for common R functions and simulate appropriate output
  if (codeStr.includes('mean(')) {
    const match = codeStr.match(/mean\(([^)]+)\)/)
    if (match) {
      outputs.push({ type: 'output', text: '[1] 45.2' })
    }
  }

  if (codeStr.includes('sd(')) {
    outputs.push({ type: 'output', text: '[1] 12.34' })
  }

  if (codeStr.includes('summary(')) {
    outputs.push({
      type: 'output',
      text: '   Min. 1st Qu.  Median    Mean 3rd Qu.    Max.\n  12.00   34.25   45.00   45.20   56.75   78.00'
    })
  }

  if (codeStr.includes('t.test(')) {
    outputs.push({
      type: 'output',
      text: '\n\tOne Sample t-test\n\ndata:  x\nt = 2.345, df = 29, p-value = 0.0261\nalternative hypothesis: true mean is not equal to 0\n95 percent confidence interval:\n 1.234567 8.765432\nsample estimates:\nmean of x \n    5.000'
    })
  }

  if (codeStr.includes('cor(') || codeStr.includes('cor.test(')) {
    outputs.push({
      type: 'output',
      text: '[1] 0.7234'
    })
  }

  if (codeStr.includes('lm(')) {
    outputs.push({
      type: 'output',
      text: '\nCall:\nlm(formula = y ~ x)\n\nCoefficients:\n(Intercept)            x  \n      2.345        0.789'
    })
  }

  // Check for syntax errors (simplified)
  const openParens = (codeStr.match(/\(/g) || []).length
  const closeParens = (codeStr.match(/\)/g) || []).length
  if (openParens !== closeParens) {
    outputs.push({
      type: 'error',
      text: 'unexpected end of input'
    })
    return outputs
  }

  // If no recognized output, show generic message
  if (outputs.length === 0 && codeStr.trim()) {
    outputs.push({ type: 'output', text: '# Code executed (no output)' })
  }

  return outputs
}

function checkAnswer() {
  const expected = props.task.expectedCode || {}
  let isCorrect = true
  let errorMessage = ''

  // Check for required patterns (regex)
  if (expected.patterns) {
    for (const pattern of expected.patterns) {
      const regex = new RegExp(pattern, 'i')
      if (!regex.test(code.value)) {
        isCorrect = false
        errorMessage = 'Your code is missing some required elements.'
        break
      }
    }
  }

  // Check for required functions
  if (expected.requiredFunctions && isCorrect) {
    for (const func of expected.requiredFunctions) {
      const funcPattern = new RegExp(`\\b${func}\\s*\\(`, 'i')
      if (!funcPattern.test(code.value)) {
        isCorrect = false
        errorMessage = `Your code should use the ${func}() function.`
        break
      }
    }
  }

  // Check for required arguments (e.g., specific variable names)
  if (expected.requiredArgs && isCorrect) {
    for (const [funcName, args] of Object.entries(expected.requiredArgs)) {
      const funcMatch = code.value.match(new RegExp(`${funcName}\\s*\\(([^)]+)\\)`, 'i'))
      if (funcMatch) {
        const providedArgs = funcMatch[1]
        for (const arg of args) {
          if (!providedArgs.includes(arg)) {
            isCorrect = false
            errorMessage = `Check the arguments you're passing to ${funcName}().`
            break
          }
        }
      }
    }
  }

  if (isCorrect) {
    feedback.value = {
      type: 'correct',
      message: props.task.successMessage || 'Your R code is correct!'
    }
    emit('correct')
  } else {
    feedback.value = {
      type: 'incorrect',
      message: errorMessage || props.task.failureMessage || 'Your code needs some adjustments. Try again!'
    }
    emit('incorrect')
  }
}

function resetEditor() {
  code.value = props.task.starterCode || ''
  consoleOutput.value = []
  feedback.value = null
  showHint.value = false
}

defineExpose({ reset: resetEditor })
</script>

<style scoped>
.r-interface {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: 'Fira Code', 'Monaco', 'Consolas', monospace;
}

.editor-container {
  background: #1e1e1e;
  border-radius: 0.5rem;
  overflow: hidden;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #404040;
}

.editor-title {
  color: #9ca3af;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.file-indicator {
  color: #60a5fa;
  font-size: 0.75rem;
}

.editor-body {
  display: flex;
  min-height: 200px;
}

.line-numbers {
  background: #252526;
  padding: 0.75rem 0;
  text-align: right;
  user-select: none;
  min-width: 40px;
}

.line-number {
  color: #6b7280;
  font-size: 0.8125rem;
  padding: 0 0.5rem;
  line-height: 1.5;
}

.code-input {
  flex: 1;
  background: #1e1e1e;
  color: #d4d4d4;
  border: none;
  padding: 0.75rem;
  font-family: inherit;
  font-size: 0.875rem;
  line-height: 1.5;
  resize: vertical;
  min-height: 200px;
}

.code-input:focus {
  outline: none;
}

.code-input::placeholder {
  color: #6b7280;
}

.console-container {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
  font-size: 0.875rem;
  font-weight: 500;
}

.run-btn {
  background: #2563eb;
  color: white;
  border: none;
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s;
}

.run-btn:hover:not(:disabled) {
  background: #1d4ed8;
}

.run-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.console-output {
  padding: 0.75rem 1rem;
  min-height: 100px;
  max-height: 200px;
  overflow-y: auto;
  font-size: 0.8125rem;
  background: #fafafa;
}

.output-line {
  margin: 0.25rem 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-line.input {
  color: #2563eb;
}

.output-line.output {
  color: #1f2937;
}

.output-line.error {
  color: #dc2626;
}

.prompt {
  color: #2563eb;
  font-weight: 600;
}

.error-prefix {
  font-weight: 600;
}

.console-placeholder {
  color: #9ca3af;
  font-style: italic;
}

.expected-output {
  background: #fef3c7;
  border: 1px solid #fcd34d;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}

.expected-output pre {
  margin: 0.5rem 0 0 0;
  background: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.8125rem;
  overflow-x: auto;
}
</style>
