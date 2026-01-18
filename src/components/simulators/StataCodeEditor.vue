<template>
  <BaseSimulator
    software="stata"
    :task="task"
    :can-check="code.trim().length > 0"
    :show-hint="showHint"
    :show-reset="code !== task.starterCode"
    :feedback="feedback"
    @check-answer="checkAnswer"
    @reset="resetEditor"
    @show-hint="showHint = true"
  >
    <div class="stata-interface">
      <!-- Command Window -->
      <div class="command-window">
        <div class="window-header">
          <span>Command</span>
        </div>
        <div class="command-body">
          <textarea
            v-model="code"
            class="command-input"
            spellcheck="false"
            :placeholder="task.placeholder || 'Enter Stata commands here...'"
            @keydown.enter.ctrl="runCode"
          ></textarea>
          <button class="execute-btn" @click="runCode" :disabled="!code.trim()">
            Execute (do)
          </button>
        </div>
      </div>

      <!-- Results Window -->
      <div class="results-window">
        <div class="window-header">
          <span>Results</span>
          <button class="clear-btn" @click="clearResults" v-if="results.length > 0">
            Clear
          </button>
        </div>
        <div class="results-body" ref="resultsEl">
          <div v-for="(result, idx) in results" :key="idx" :class="['result-block', result.type]">
            <div v-if="result.type === 'command'" class="command-echo">
              . {{ result.text }}
            </div>
            <pre v-else-if="result.type === 'output'">{{ result.text }}</pre>
            <div v-else-if="result.type === 'error'" class="error-output">
              {{ result.text }}
            </div>
          </div>
          <div v-if="results.length === 0" class="results-placeholder">
            Results will appear here after executing commands
          </div>
        </div>
      </div>

      <!-- Variables Panel (simplified) -->
      <div class="variables-panel">
        <div class="window-header">
          <span>Variables</span>
        </div>
        <div class="variables-list">
          <div v-for="variable in displayVariables" :key="variable.name" class="variable-item">
            <span class="var-name">{{ variable.name }}</span>
            <span class="var-type">{{ variable.type }}</span>
          </div>
        </div>
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
    //   expectedCode: { patterns: string[], requiredCommands: string[] },
    //   variables: [{ name: string, type: string }],
    //   placeholder: string
    // }
  }
})

const emit = defineEmits(['correct', 'incorrect'])

// State
const code = ref(props.task.starterCode || '')
const results = ref([])
const showHint = ref(false)
const feedback = ref(null)
const resultsEl = ref(null)

// Computed
const displayVariables = computed(() => {
  return props.task.variables || [
    { name: 'age', type: 'int' },
    { name: 'score', type: 'float' },
    { name: 'group', type: 'str' },
    { name: 'pretest', type: 'float' },
    { name: 'posttest', type: 'float' }
  ]
})

// Methods
function runCode() {
  const commands = code.value.split('\n').filter(cmd => cmd.trim())

  for (const cmd of commands) {
    results.value.push({ type: 'command', text: cmd.trim() })
    const output = simulateStataOutput(cmd.trim())
    results.value.push(...output)
  }

  nextTick(() => {
    if (resultsEl.value) {
      resultsEl.value.scrollTop = resultsEl.value.scrollHeight
    }
  })
}

function simulateStataOutput(command) {
  const outputs = []
  const cmd = command.toLowerCase()

  // Summarize command
  if (cmd.startsWith('summarize') || cmd.startsWith('sum ')) {
    outputs.push({
      type: 'output',
      text: `    Variable |        Obs        Mean    Std. dev.       Min        Max
-------------+---------------------------------------------------------
       score |         50       72.34       12.45         45         98
         age |         50       28.64        5.23         21         42`
    })
  }

  // Tabulate command
  else if (cmd.startsWith('tabulate') || cmd.startsWith('tab ')) {
    outputs.push({
      type: 'output',
      text: `      group |      Freq.     Percent        Cum.
------------+-----------------------------------
    Control |         25       50.00       50.00
  Treatment |         25       50.00      100.00
------------+-----------------------------------
      Total |         50      100.00`
    })
  }

  // T-test command
  else if (cmd.startsWith('ttest')) {
    outputs.push({
      type: 'output',
      text: `Two-sample t test with equal variances
------------------------------------------------------------------------------
   Group |     Obs        Mean    Std. err.   Std. dev.   [95% conf. interval]
---------+--------------------------------------------------------------------
 Control |      25       68.24       2.345      11.725       63.41       73.07
Treatmnt |      25       76.44       2.156      10.780       71.99       80.89
---------+--------------------------------------------------------------------
Combined |      50       72.34       1.761      12.451       68.80       75.88
---------+--------------------------------------------------------------------
    diff |              -8.200       3.185                  -14.60       -1.80
------------------------------------------------------------------------------
    diff = mean(Control) - mean(Treatmnt)                         t =  -2.5745
H0: diff = 0                                     Degrees of freedom =       48

    Ha: diff < 0                 Ha: diff != 0                 Ha: diff > 0
 Pr(T < t) = 0.0066         Pr(|T| > |t|) = 0.0132          Pr(T > t) = 0.9934`
    })
  }

  // Correlation
  else if (cmd.startsWith('correlate') || cmd.startsWith('corr ') || cmd.startsWith('pwcorr')) {
    outputs.push({
      type: 'output',
      text: `             |    score      age  pretest
-------------+---------------------------
       score |   1.0000
         age |   0.2341   1.0000
     pretest |   0.7823   0.1245   1.0000`
    })
  }

  // Regression
  else if (cmd.startsWith('regress') || cmd.startsWith('reg ')) {
    outputs.push({
      type: 'output',
      text: `      Source |       SS           df       MS      Number of obs   =        50
-------------+----------------------------------   F(1, 48)        =     45.23
       Model |  2345.67890         1  2345.67890   Prob > F        =    0.0000
    Residual |  2489.12345        48    51.85674   R-squared       =    0.4852
-------------+----------------------------------   Adj R-squared   =    0.4745
       Total |  4834.80235        49    98.66943   Root MSE        =    7.2012

------------------------------------------------------------------------------
       score | Coefficient  Std. err.      t    P>|t|     [95% conf. interval]
-------------+----------------------------------------------------------------
     pretest |   .7823456   .1163456     6.73   0.000     .5483456    1.016346
       _cons |   23.45678   8.234567     2.85   0.006     6.897654    40.01591
------------------------------------------------------------------------------`
    })
  }

  // Describe
  else if (cmd.startsWith('describe') || cmd.startsWith('desc')) {
    outputs.push({
      type: 'output',
      text: `Contains data
  Observations:            50
    Variables:             5

Variable      Storage   Display    Value
    name         type    format    label
-------------------------------------------------------------------------------
age             int     %8.0g
score           float   %9.0g
group           str10   %10s
pretest         float   %9.0g
posttest        float   %9.0g`
    })
  }

  // ANOVA
  else if (cmd.startsWith('anova') || cmd.startsWith('oneway')) {
    outputs.push({
      type: 'output',
      text: `                           Analysis of variance
    Source              SS         df      MS            F     Prob > F
------------------------------------------------------------------------
Between groups      1234.5678      2     617.2839      8.45     0.0007
 Within groups      3432.1098     47      73.0236
------------------------------------------------------------------------
    Total           4666.6776     49      95.2383`
    })
  }

  // Histogram
  else if (cmd.startsWith('histogram') || cmd.startsWith('hist ')) {
    outputs.push({
      type: 'output',
      text: `(bin=7, start=45, width=7.5714286)

[Histogram displayed in Graph window]`
    })
  }

  // Check for common errors
  else if (cmd && !cmd.startsWith('*') && !cmd.startsWith('//')) {
    // Check for undefined variable
    const words = cmd.split(/\s+/)
    if (words.length > 1) {
      outputs.push({
        type: 'output',
        text: '(output omitted for brevity)'
      })
    } else {
      outputs.push({
        type: 'error',
        text: `unrecognized command: ${words[0]}\nr(199);`
      })
    }
  }

  return outputs
}

function clearResults() {
  results.value = []
}

function checkAnswer() {
  const expected = props.task.expectedCode || {}
  let isCorrect = true
  let errorMessage = ''

  // Check for required patterns
  if (expected.patterns) {
    for (const pattern of expected.patterns) {
      const regex = new RegExp(pattern, 'i')
      if (!regex.test(code.value)) {
        isCorrect = false
        errorMessage = 'Your command is missing some required elements.'
        break
      }
    }
  }

  // Check for required commands
  if (expected.requiredCommands && isCorrect) {
    for (const cmd of expected.requiredCommands) {
      const cmdPattern = new RegExp(`^\\s*${cmd}\\b`, 'im')
      if (!cmdPattern.test(code.value)) {
        isCorrect = false
        errorMessage = `Your code should include the "${cmd}" command.`
        break
      }
    }
  }

  if (isCorrect) {
    feedback.value = {
      type: 'correct',
      message: props.task.successMessage || 'Your Stata command is correct!'
    }
    emit('correct')
  } else {
    feedback.value = {
      type: 'incorrect',
      message: errorMessage || props.task.failureMessage || 'Check your Stata syntax and try again.'
    }
    emit('incorrect')
  }
}

function resetEditor() {
  code.value = props.task.starterCode || ''
  results.value = []
  feedback.value = null
  showHint.value = false
}

defineExpose({ reset: resetEditor })
</script>

<style scoped>
.stata-interface {
  display: grid;
  grid-template-columns: 1fr 200px;
  grid-template-rows: auto 1fr;
  gap: 0.5rem;
  font-family: 'Lucida Console', 'Consolas', monospace;
  background: #1a476f;
  padding: 0.5rem;
  border-radius: 0.5rem;
  min-height: 400px;
}

.command-window {
  grid-column: 1;
  grid-row: 1;
  background: white;
  border-radius: 0.25rem;
  overflow: hidden;
}

.results-window {
  grid-column: 1;
  grid-row: 2;
  background: white;
  border-radius: 0.25rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.variables-panel {
  grid-column: 2;
  grid-row: 1 / 3;
  background: white;
  border-radius: 0.25rem;
  overflow: hidden;
}

.window-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.375rem 0.75rem;
  background: #e8e8e8;
  border-bottom: 1px solid #ccc;
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
}

.command-body {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.command-input {
  width: 100%;
  min-height: 80px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-family: inherit;
  font-size: 0.8125rem;
  resize: vertical;
}

.command-input:focus {
  outline: none;
  border-color: #1a476f;
}

.execute-btn {
  align-self: flex-start;
  background: #1a476f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
}

.execute-btn:hover:not(:disabled) {
  background: #0d2840;
}

.execute-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.clear-btn {
  background: transparent;
  border: none;
  color: #666;
  font-size: 0.6875rem;
  cursor: pointer;
  padding: 0.125rem 0.5rem;
}

.clear-btn:hover {
  color: #333;
}

.results-body {
  flex: 1;
  padding: 0.5rem;
  overflow-y: auto;
  background: #fffff0;
  font-size: 0.75rem;
  min-height: 150px;
}

.result-block {
  margin-bottom: 0.5rem;
}

.command-echo {
  color: #1a476f;
  font-weight: 500;
}

.result-block pre {
  margin: 0.25rem 0;
  white-space: pre-wrap;
  font-family: inherit;
  font-size: 0.6875rem;
  line-height: 1.4;
}

.error-output {
  color: #cc0000;
}

.results-placeholder {
  color: #999;
  font-style: italic;
  text-align: center;
  padding: 2rem;
}

.variables-list {
  padding: 0.5rem;
}

.variable-item {
  display: flex;
  justify-content: space-between;
  padding: 0.25rem 0.5rem;
  font-size: 0.6875rem;
  border-bottom: 1px solid #f0f0f0;
}

.var-name {
  color: #1a476f;
  font-weight: 500;
}

.var-type {
  color: #666;
}
</style>
