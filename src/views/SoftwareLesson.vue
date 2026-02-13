<template>
  <div class="lesson-page" v-if="lesson">
    <div class="container">
      <!-- Lesson Header -->
      <div class="lesson-header">
        <router-link :to="backLink" class="back-link">Back</router-link>
        <div class="lesson-meta">
          <span class="software-badge" :class="lesson.software">{{ lesson.software }}</span>
          <span class="time-estimate">{{ lesson.estimatedTime }} min</span>
        </div>
        <h1>{{ lesson.title }}</h1>
        <div class="objectives">
          <h3>Learning Objectives</h3>
          <ul>
            <li v-for="(obj, i) in lesson.objectives" :key="i">{{ obj }}</li>
          </ul>
        </div>
      </div>

      <!-- Phase Navigation -->
      <div class="phase-nav">
        <button
          v-for="(phase, key) in phases"
          :key="key"
          class="phase-btn"
          :class="{
            active: currentPhase === key,
            completed: completedPhases.includes(key),
            locked: isPhaseLocked(key)
          }"
          :disabled="isPhaseLocked(key)"
          @click="!isPhaseLocked(key) && goToPhase(key)"
        >
          <span class="phase-icon">{{ phase.icon }}</span>
          <span class="phase-label">{{ phase.label }}</span>
          <span v-if="completedPhases.includes(key)" class="check">✓</span>
        </button>
      </div>

      <!-- Phase Content -->
      <div class="phase-content">
        <!-- Learn Phase -->
        <div v-if="currentPhase === 'iDo'" class="phase i-do">
          <div class="phase-header">
            <span class="phase-badge i-do">Learn</span>
            <h2>{{ lesson.phases.iDo.title || 'Learn' }}</h2>
          </div>

          <!-- Multi-Section Navigation (if applicable) -->
          <div v-if="isMultiSectionLesson" class="section-navigation">
            <div class="section-tabs">
              <button
                v-for="(section, index) in sections"
                :key="section.id"
                class="section-tab"
                :class="{ active: currentSectionIndex === index }"
                @click="goToSection(index)"
              >
                <span class="tab-number">{{ index + 1 }}</span>
                <span class="tab-title">{{ section.title }}</span>
              </button>
            </div>

            <!-- Current Section Content -->
            <div v-if="currentSection" class="section-content">
              <div class="section-header">
                <h3>{{ currentSection.title }}</h3>
                <span v-if="currentSection.estimatedTime" class="section-time">
                  {{ currentSection.estimatedTime }} min
                </span>
              </div>

              <!-- Section Objectives -->
              <div v-if="currentSection.objectives" class="section-objectives">
                <h4>Learning Objectives</h4>
                <ul>
                  <li v-for="(obj, i) in currentSection.objectives" :key="i">{{ obj }}</li>
                </ul>
              </div>

              <!-- Section Content Blocks -->
              <div class="content-blocks">
                <template v-for="(block, i) in currentSection.content" :key="i">
                  <!-- Text Block -->
                  <div v-if="block.type === 'text'" class="content-block text-block" v-html="formatText(block.content)"></div>

                  <!-- Section Divider (no box, clear visual break) -->
                  <div v-if="block.type === 'section_divider'" class="section-divider-block" v-html="block.content"></div>

                  <!-- Callout Block -->
                  <div v-if="block.type === 'callout'" class="content-block callout" :class="block.style">
                    <span class="callout-icon">{{ getCalloutIcon(block.style) }}</span>
                    <p v-html="formatText(block.content)"></p>
                  </div>

                  <!-- Definition List -->
                  <div v-if="block.type === 'definition_list'" class="content-block definition-list">
                    <div v-for="(item, j) in block.items" :key="j" class="definition-item" :style="{ '--item-color': item.color }">
                      <div class="def-icon">{{ item.icon }}</div>
                      <div class="def-content">
                        <dt>{{ item.term }}</dt>
                        <dd v-html="item.definition"></dd>
                      </div>
                    </div>
                  </div>

                  <!-- Annotated Image -->
                  <div v-if="block.type === 'annotated_image'" class="content-block annotated-image">
                    <div class="image-container">
                      <img
                        v-if="block.image && !imageLoadFailed.has(block.image)"
                        :src="imageSrc(block.image)"
                        :alt="block.alt"
                        class="annotated-image-img"
                        loading="lazy"
                        @error="onImageError(block.image)"
                      >
                      <div v-else class="image-placeholder">
                        <span class="placeholder-icon">🖼️</span>
                        <span class="placeholder-text">{{ block.alt }}</span>
                        <span class="placeholder-note">
                          {{ imageLoadFailed.has(block.image) ? 'Image not found at ' + imageSrc(block.image) : '(Image: ' + (block.image || '') + ')' }}
                        </span>
                      </div>
                      <!-- Annotations shown as list for now -->
                      <div v-if="block.annotations" class="annotations-list">
                        <div v-for="(ann, j) in block.annotations" :key="j" class="annotation">
                          <span class="ann-label">{{ ann.label }}</span>
                          <span class="ann-desc">{{ ann.description }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Video Block -->
                  <div v-if="block.type === 'video'" class="content-block video-block">
                    <div class="video-box">
                      <div v-if="block.title" class="video-title">{{ block.title }}</div>
                      <div class="video-wrapper">
                        <iframe
                          v-if="block.youtubeId"
                          :src="`https://www.youtube.com/embed/${block.youtubeId}?rel=0&modestbranding=1`"
                          :title="block.title || 'Video tutorial'"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                        <video v-else-if="block.videoSrc" controls playsinline>
                          <source :src="block.videoSrc" type="video/mp4">
                          Your browser does not support the video tag.
                        </video>
                      </div>
                      <p v-if="block.description" class="video-description">{{ block.description }}</p>
                    </div>
                  </div>

                  <!-- Step Sequence -->
                  <div v-if="block.type === 'step_sequence'" class="content-block step-sequence">
                    <div v-for="step in block.steps" :key="step.step" class="sequence-step">
                      <div class="step-number">{{ step.step }}</div>
                      <div class="step-content">
                        <h4>{{ step.title }}</h4>
                        <div v-html="step.description"></div>
                        <img v-if="step.image" :src="step.image" :alt="step.title" class="step-image" />
                      </div>
                    </div>
                  </div>

                  <!-- Collapsible Section (e.g. Chromebook installation) -->
                  <div v-if="block.type === 'collapsible_section'" class="collapsible-section-block">
                    <details class="collapsible-section">
                      <summary>{{ block.title }}</summary>
                      <div class="collapsible-content">
                        <template v-for="(inner, j) in block.blocks" :key="j">
                          <div v-if="inner.type === 'text'" class="content-block text-block" v-html="formatText(inner.content)"></div>
                          <div v-if="inner.type === 'callout'" class="content-block callout" :class="inner.style">
                            <span class="callout-icon">{{ getCalloutIcon(inner.style) }}</span>
                            <p v-html="formatText(inner.content)"></p>
                          </div>
                          <div v-if="inner.type === 'definition_list'" class="content-block definition-list">
                            <div v-for="(item, k) in inner.items" :key="k" class="definition-item" :style="{ '--item-color': item.color }">
                              <div class="def-icon">{{ item.icon }}</div>
                              <div class="def-content">
                                <dt>{{ item.term }}</dt>
                                <dd v-html="item.definition"></dd>
                              </div>
                            </div>
                          </div>
                          <div v-if="inner.type === 'step_sequence'" class="content-block step-sequence">
                            <div v-for="step in inner.steps" :key="step.step" class="sequence-step">
                              <div class="step-number">{{ step.step }}</div>
                              <div class="step-content">
                                <h4>{{ step.title }}</h4>
                                <div v-html="step.description"></div>
                                <img v-if="step.image" :src="step.image" :alt="step.title" class="step-image" />
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </details>
                  </div>
                </template>
              </div>

              <!-- Section Navigation Buttons -->
              <div class="section-nav-buttons">
                <button
                  v-if="hasPrevSection"
                  class="btn-secondary"
                  @click="prevSection"
                >
                  ← Previous Section
                </button>
                <div class="section-progress">
                  Section {{ currentSectionIndex + 1 }} of {{ sections.length }}
                </div>
                <button
                  v-if="hasNextSection"
                  class="btn-secondary"
                  @click="nextSection"
                >
                  Next Section →
                </button>
                <button
                  v-if="!hasNextSection"
                  class="btn-primary"
                  @click="completePhase('iDo')"
                >
                  Continue to Practice →
                </button>
              </div>
            </div>
          </div>

          <!-- Single Section Content (legacy/fallback) -->
          <div v-else class="content-blocks">
            <template v-for="(block, i) in lesson.phases.iDo.content" :key="i">
              <!-- Text Block -->
              <div v-if="block.type === 'text'" class="content-block text-block" v-html="formatText(block.content)"></div>

              <!-- Section Divider (no box, clear visual break) -->
              <div v-if="block.type === 'section_divider'" class="section-divider-block" v-html="block.content"></div>

              <!-- Callout Block -->
              <div v-if="block.type === 'callout'" class="content-block callout" :class="block.style">
                <span class="callout-icon">{{ getCalloutIcon(block.style) }}</span>
                <p v-html="formatText(block.content)"></p>
              </div>

              <!-- Definition List -->
              <div v-if="block.type === 'definition_list'" class="content-block definition-list">
                <div v-for="(item, j) in block.items" :key="j" class="definition-item" :style="{ '--item-color': item.color }">
                  <div class="def-icon">{{ item.icon }}</div>
                  <div class="def-content">
                    <dt>{{ item.term }}</dt>
                    <dd v-html="item.definition"></dd>
                  </div>
                </div>
              </div>

              <!-- Annotated Image -->
              <div v-if="block.type === 'annotated_image'" class="content-block annotated-image">
                <div class="image-container">
                  <img
                    v-if="block.image && !imageLoadFailed.has(block.image)"
                    :src="imageSrc(block.image)"
                    :alt="block.alt"
                    class="annotated-image-img"
                    loading="lazy"
                    @error="onImageError(block.image)"
                  >
                  <div v-else class="image-placeholder">
                    <span class="placeholder-icon">🖼️</span>
                    <span class="placeholder-text">{{ block.alt }}</span>
                    <span class="placeholder-note">
                      {{ imageLoadFailed.has(block.image) ? 'Image not found at ' + imageSrc(block.image) : '(Image: ' + (block.image || '') + ')' }}
                    </span>
                  </div>
                  <!-- Annotations shown as list for now -->
                  <div v-if="block.annotations" class="annotations-list">
                    <div v-for="(ann, j) in block.annotations" :key="j" class="annotation">
                      <span class="ann-label">{{ ann.label }}</span>
                      <span class="ann-desc">{{ ann.description }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Video Block -->
              <div v-if="block.type === 'video'" class="content-block video-block">
                <div class="video-box">
                  <div v-if="block.title" class="video-title">{{ block.title }}</div>
                  <div class="video-wrapper">
                    <iframe
                      v-if="block.youtubeId"
                      :src="`https://www.youtube.com/embed/${block.youtubeId}?rel=0&modestbranding=1`"
                      :title="block.title || 'Video tutorial'"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                    ></iframe>
                    <video v-else-if="block.videoSrc" controls playsinline>
                      <source :src="block.videoSrc" type="video/mp4">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p v-if="block.description" class="video-description">{{ block.description }}</p>
                </div>
              </div>

              <!-- Step Sequence -->
              <div v-if="block.type === 'step_sequence'" class="content-block step-sequence">
                <div v-for="step in block.steps" :key="step.step" class="sequence-step">
                  <div class="step-number">{{ step.step }}</div>
                  <div class="step-content">
                    <h4>{{ step.title }}</h4>
                    <div v-html="step.description"></div>
                    <img v-if="step.image" :src="step.image" :alt="step.title" class="step-image" />
                  </div>
                </div>
              </div>

              <!-- Collapsible Section (e.g. Chromebook installation) -->
              <div v-if="block.type === 'collapsible_section'" class="collapsible-section-block">
                <details class="collapsible-section">
                  <summary>{{ block.title }}</summary>
                  <div class="collapsible-content">
                    <template v-for="(inner, j) in block.blocks" :key="j">
                      <div v-if="inner.type === 'text'" class="content-block text-block" v-html="formatText(inner.content)"></div>
                      <div v-if="inner.type === 'callout'" class="content-block callout" :class="inner.style">
                        <span class="callout-icon">{{ getCalloutIcon(inner.style) }}</span>
                        <p v-html="formatText(inner.content)"></p>
                      </div>
                      <div v-if="inner.type === 'definition_list'" class="content-block definition-list">
                        <div v-for="(item, k) in inner.items" :key="k" class="definition-item" :style="{ '--item-color': item.color }">
                          <div class="def-icon">{{ item.icon }}</div>
                          <div class="def-content">
                            <dt>{{ item.term }}</dt>
                            <dd v-html="item.definition"></dd>
                          </div>
                        </div>
                      </div>
                      <div v-if="inner.type === 'step_sequence'" class="content-block step-sequence">
                        <div v-for="step in inner.steps" :key="step.step" class="sequence-step">
                          <div class="step-number">{{ step.step }}</div>
                          <div class="step-content">
                            <h4>{{ step.title }}</h4>
                            <div v-html="step.description"></div>
                            <img v-if="step.image" :src="step.image" :alt="step.title" class="step-image" />
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </details>
              </div>
            </template>

            <div class="phase-actions">
              <button class="btn-primary" @click="completePhase('iDo')">
                Continue to Practice →
              </button>
            </div>
          </div>
        </div>

        <!-- Practice Phase (Guided Walkthrough) -->
        <div v-if="currentPhase === 'weDo'" class="phase we-do">
          <div class="phase-header">
            <span class="phase-badge we-do">Practice</span>
            <h2>{{ lesson.phases.weDo.title }}</h2>
          </div>

          <p class="phase-instructions">{{ lesson.phases.weDo.instructions }}</p>

          <div class="guided-steps">
            <div
              v-for="(step, i) in lesson.phases.weDo.steps"
              :key="i"
              class="guided-step"
              :class="{ current: currentStep === i, completed: i < currentStep, upcoming: i > currentStep }"
            >
              <div class="step-marker">
                <span v-if="i < currentStep" class="marker-check">✓</span>
                <span v-else>{{ i + 1 }}</span>
              </div>
              <div class="step-body">
                <p class="step-instruction">{{ step.instruction }}</p>

                <div v-if="currentStep === i" class="step-active-content">
                  <div v-if="step.hint && showHint" class="hint-box">
                    <span class="hint-icon">💡</span>
                    <p>{{ step.hint }}</p>
                  </div>
                  <button v-if="step.hint && !showHint" class="btn-hint" @click="showHint = true">
                    Show Hint
                  </button>

                  <div v-if="step.checkpoint" class="checkpoint">
                    <p class="checkpoint-text">✓ {{ step.checkpoint }}</p>
                    <button class="btn-done" @click="completeStep">Done - Next Step</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-if="currentStep >= lesson.phases.weDo.steps.length" class="phase-complete">
            <div class="complete-message">
              <span class="complete-icon">🎉</span>
              <h3>Great job!</h3>
              <p>You've completed the guided practice.</p>
            </div>
            <button class="btn-primary" @click="completePhase('weDo')">
              Continue to Self-Check →
            </button>
          </div>
        </div>

        <!-- Self-Check Phase (Skill Verification) -->
        <div v-if="currentPhase === 'selfCheck'" class="phase self-check">
          <div class="phase-header">
            <span class="phase-badge self-check">Self-Check</span>
            <h2>Skill Verification</h2>
          </div>

          <p class="phase-instructions">
            Test your skills with these practical exercises: screenshot recognition, error diagnosis, and output interpretation.
          </p>

          <!-- Self-Check Exercise Types -->
          <div class="selfcheck-exercises">
            <!-- Screenshot Recognition -->
            <div v-if="lesson.phases.selfCheck?.screenshotRecognition" class="selfcheck-section">
              <h3 class="selfcheck-title">📸 Screenshot Recognition</h3>
              <p class="selfcheck-description">Identify what's shown in these software screenshots</p>

              <div
                v-for="(exercise, i) in lesson.phases.selfCheck.screenshotRecognition"
                :key="exercise.id"
                class="selfcheck-exercise"
              >
                <div class="exercise-number">{{ i + 1 }}</div>
                <div class="exercise-content">
                  <p class="exercise-question">{{ exercise.question }}</p>

                  <div v-if="exercise.image" class="exercise-image">
                    <img :src="exercise.image" :alt="`Screenshot ${i + 1}`" />
                  </div>

                  <div class="exercise-options">
                    <label
                      v-for="(option, optIndex) in exercise.options"
                      :key="optIndex"
                      class="option-label"
                      :class="{
                        selected: selfCheckAnswers[exercise.id] === optIndex,
                        correct: selfCheckSubmitted && exercise.correct === optIndex,
                        incorrect: selfCheckSubmitted && selfCheckAnswers[exercise.id] === optIndex && exercise.correct !== optIndex
                      }"
                    >
                      <input
                        type="radio"
                        :name="exercise.id"
                        :value="optIndex"
                        v-model="selfCheckAnswers[exercise.id]"
                        :disabled="selfCheckSubmitted"
                      />
                      <span>{{ option }}</span>
                    </label>
                  </div>

                  <div v-if="selfCheckSubmitted && selfCheckAnswers[exercise.id] !== undefined" class="exercise-feedback">
                    <p v-if="selfCheckAnswers[exercise.id] === exercise.correct" class="feedback-correct">
                      ✓ Correct! {{ exercise.explanation }}
                    </p>
                    <p v-else class="feedback-incorrect">
                      ✗ Incorrect. {{ exercise.explanation }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Error Diagnostic -->
            <div v-if="lesson.phases.selfCheck?.errorDiagnostic" class="selfcheck-section">
              <h3 class="selfcheck-title">🔍 Error Diagnostic</h3>
              <p class="selfcheck-description">Identify and explain the errors in these scenarios</p>

              <div
                v-for="(exercise, i) in lesson.phases.selfCheck.errorDiagnostic"
                :key="exercise.id"
                class="selfcheck-exercise"
              >
                <div class="exercise-number">{{ i + 1 }}</div>
                <div class="exercise-content">
                  <p class="exercise-question">{{ exercise.scenario }}</p>

                  <div v-if="exercise.errorMessage" class="error-display">
                    <code>{{ exercise.errorMessage }}</code>
                  </div>

                  <div class="exercise-options">
                    <label
                      v-for="(option, optIndex) in exercise.options"
                      :key="optIndex"
                      class="option-label"
                      :class="{
                        selected: selfCheckAnswers[exercise.id] === optIndex,
                        correct: selfCheckSubmitted && exercise.correct === optIndex,
                        incorrect: selfCheckSubmitted && selfCheckAnswers[exercise.id] === optIndex && exercise.correct !== optIndex
                      }"
                    >
                      <input
                        type="radio"
                        :name="exercise.id"
                        :value="optIndex"
                        v-model="selfCheckAnswers[exercise.id]"
                        :disabled="selfCheckSubmitted"
                      />
                      <span>{{ option }}</span>
                    </label>
                  </div>

                  <div v-if="selfCheckSubmitted && selfCheckAnswers[exercise.id] !== undefined" class="exercise-feedback">
                    <p v-if="selfCheckAnswers[exercise.id] === exercise.correct" class="feedback-correct">
                      ✓ Correct! {{ exercise.explanation }}
                    </p>
                    <p v-else class="feedback-incorrect">
                      ✗ Incorrect. {{ exercise.explanation }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Output Interpretation -->
            <div v-if="lesson.phases.selfCheck?.outputInterpretation" class="selfcheck-section">
              <h3 class="selfcheck-title">📊 Output Interpretation</h3>
              <p class="selfcheck-description">Analyze these statistical results and write your interpretation</p>

              <div
                v-for="(exercise, i) in lesson.phases.selfCheck.outputInterpretation"
                :key="exercise.id"
                class="selfcheck-exercise"
              >
                <div class="exercise-number">{{ i + 1 }}</div>
                <div class="exercise-content">
                  <p class="exercise-question" v-html="exercise.question"></p>

                  <!-- Screenshot of analysis results -->
                  <div v-if="exercise.image" class="exercise-image">
                    <img :src="exercise.image" :alt="`Analysis output ${i + 1}`" />
                  </div>

                  <!-- Short answer text area -->
                  <div class="short-answer-container">
                    <label :for="`answer-${exercise.id}`" class="answer-label">Your interpretation:</label>
                    <textarea
                      :id="`answer-${exercise.id}`"
                      v-model="selfCheckAnswers[exercise.id]"
                      :disabled="selfCheckSubmitted"
                      class="short-answer-input"
                      :placeholder="exercise.placeholder || 'Write your interpretation here...'"
                      rows="4"
                    ></textarea>
                    <p class="answer-hint" v-if="!selfCheckSubmitted && exercise.hint">
                      💡 {{ exercise.hint }}
                    </p>
                  </div>

                  <!-- Feedback after submission -->
                  <div v-if="selfCheckSubmitted && selfCheckAnswers[exercise.id]" class="exercise-feedback">
                    <div v-if="gradeShortAnswer(exercise, selfCheckAnswers[exercise.id]).isCorrect" class="feedback-correct">
                      <p><strong>✓ Good interpretation!</strong></p>
                      <p>{{ exercise.feedback }}</p>
                      <p v-if="gradeShortAnswer(exercise, selfCheckAnswers[exercise.id]).matchedKeywords.length > 0" class="keywords-matched">
                        Key concepts identified: {{ gradeShortAnswer(exercise, selfCheckAnswers[exercise.id]).matchedKeywords.join(', ') }}
                      </p>
                    </div>
                    <div v-else class="feedback-incorrect">
                      <p><strong>✗ Needs improvement</strong></p>
                      <p>{{ exercise.feedback }}</p>
                      <p class="missing-keywords">
                        Make sure to mention: {{ gradeShortAnswer(exercise, selfCheckAnswers[exercise.id]).missingKeywords.join(', ') }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button and Results -->
          <div class="selfcheck-actions">
            <button
              v-if="!selfCheckSubmitted"
              class="btn-primary"
              :disabled="!allSelfCheckAnswered"
              @click="submitSelfCheck"
            >
              Submit Answers
            </button>

            <div v-if="selfCheckSubmitted" class="results-summary" :class="{ 'is-perfect': selfCheckScore === totalSelfCheckQuestions }">
              <div class="score-display">
                <span class="score">{{ selfCheckScore }}/{{ totalSelfCheckQuestions }}</span>
                <span class="percentage">({{ Math.round(selfCheckScore / totalSelfCheckQuestions * 100) }}%)</span>
              </div>

              <!-- Perfect score - can continue -->
              <template v-if="selfCheckScore === totalSelfCheckQuestions">
                <p class="perfect">Perfect! You've mastered these skills! 🎉</p>
                <div class="result-actions">
                  <button class="btn-primary" @click="completePhase('selfCheck')">Continue to Apply →</button>
                </div>
              </template>

              <!-- Not perfect - must retry -->
              <template v-else>
                <p class="needs-work">Review the feedback and try again.</p>
                <div class="result-actions">
                  <button class="btn-primary" @click="resetSelfCheck">Try Again</button>
                </div>
              </template>
            </div>
          </div>
        </div>

        <!-- Apply Phase (Software Exercises) -->
        <div v-if="currentPhase === 'youDo'" class="phase you-do">
          <div class="phase-header">
            <span class="phase-badge you-do">Apply</span>
            <h2>Software Practice Exercises</h2>
          </div>

          <p class="phase-instructions">
            {{ lesson.phases.youDo.instructions || `Complete these hands-on exercises in ${lesson.software} to apply what you've learned.` }}
          </p>

          <!-- Apply Phase Summary -->
          <div v-if="lesson.phases.youDo.summary" class="apply-summary">
            <h3>Overview</h3>
            <p>{{ lesson.phases.youDo.summary }}</p>
          </div>

          <!-- Recording Instructions -->
          <div class="recording-instructions">
            <div class="instruction-header">
              <span class="instruction-icon">🎥</span>
              <h3>Before You Begin</h3>
            </div>
            <ol class="instruction-steps">
              <li><strong>Start Recording:</strong> Click "Start Recording" below to capture your work. This helps document your process and is useful for getting feedback.</li>
              <li><strong>Open Dataset:</strong> If the exercise requires data, download and open one of the provided dataset files in {{ lesson.software }}.</li>
              <li><strong>Complete Exercises:</strong> Work through each objective while your screen is being recorded.</li>
              <li><strong>Stop When Done:</strong> Stop the recording after completing all exercises and download your video.</li>
            </ol>
          </div>

          <!-- Assignment Tools are now in the global ResourcesDrawer -->
          <div v-if="lessonExercises.length > 0" class="practice-exercises-info">
            <p class="info-text">Use the 🛠️ Tools button on the right to access recording tools, datasets, and instructions.</p>
          </div>

          <!-- Exercises List as Objectives -->
          <div v-if="lessonExercises.length > 0" class="exercises-objectives">
            <h3>Practice Objectives</h3>
            <div class="objectives-list">
              <div
                v-for="(exercise, index) in lessonExercises"
                :key="exercise.title"
                class="objective-item"
                :class="{ completed: completedExercises.has(exercise.title) }"
              >
                <div class="objective-header">
                  <div class="objective-number">{{ index + 1 }}</div>
                  <div class="objective-content">
                    <h4>{{ exercise.title }}</h4>
                    <p class="objective-description">{{ exercise.description }}</p>
                    <div v-if="exercise.hint" class="objective-hint-section">
                      <button 
                        class="btn-hint" 
                        @click="toggleHint(exercise.title)"
                        :aria-expanded="showHints[exercise.title] || false"
                      >
                        💡 {{ showHints[exercise.title] ? 'Hide Hint' : 'Show Hint' }}
                      </button>
                      <div v-if="showHints[exercise.title]" class="hint-content">
                        {{ exercise.hint }}
                      </div>
                    </div>
                  </div>
                  <button
                    v-if="!completedExercises.has(exercise.title)"
                    class="btn-check"
                    @click="markExerciseComplete(exercise.title)"
                    title="Mark as complete"
                  >
                    ✓
                  </button>
                  <button
                    v-else
                    class="btn-check completed"
                    @click="markExerciseIncomplete(exercise.title)"
                    title="Unmark"
                  >
                    ✓
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="no-exercises">
            <p>No practice exercises available for this lesson yet.</p>
          </div>

          <div class="phase-actions">
            <button class="btn-primary" @click="completeLesson">
              Complete Lesson →
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- Completion Summary -->
    <div v-if="showSummary" class="summary-overlay">
      <div class="summary-card">
        <h3>Lesson Completion Summary</h3>
        <p class="summary-status">Status: Completed</p>
        <div class="summary-details">
          <div><strong>User:</strong> {{ completionSummary.username }}</div>
          <div><strong>Lesson:</strong> {{ completionSummary.title }}</div>
          <div v-if="completionSummary.moduleTitle"><strong>Module:</strong> {{ completionSummary.moduleTitle }}</div>
          <div><strong>Completed:</strong> {{ completionSummary.completedAt }}</div>
        </div>
        <div class="summary-actions print-hide">
          <button class="btn-primary" @click="printSummary">Print / Save PDF</button>
          <button class="btn-secondary" @click="copySummary">Copy Summary</button>
          <button class="btn-secondary" @click="closeSummary">Back to Software Practice</button>
        </div>
      </div>
    </div>
  </div>
  <!-- Lesson Not Found -->
  <div v-else class="not-found">
    <div class="container">
      <h1>Lesson Not Found</h1>
      <p>The requested lesson doesn't exist.</p>
      <router-link to="/" class="btn-primary">Go Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { getLessonById } from '../data/softwareLessons'
import { getModuleById } from '../data/modules'
import { statisticsExercises } from '../data/statisticsPractices'
import { useSoftwareLessonMetrics } from '../composables/useSoftwareLessonMetrics'
import { getCompletedPhases, setCompletedPhases } from '../composables/useLessonPhaseProgress'

// Question Components
import QuestionMultipleChoice from '../components/questions/QuestionMultipleChoice.vue'
import QuestionMultipleSelect from '../components/questions/QuestionMultipleSelect.vue'
import QuestionOrdering from '../components/questions/QuestionOrdering.vue'
import QuestionFillBlank from '../components/questions/QuestionFillBlank.vue'
import QuestionMatching from '../components/questions/QuestionMatching.vue'
import QuestionScreenshot from '../components/questions/QuestionScreenshot.vue'

// Assignment Tools Component
// import ScreenRecorder from '../components/ScreenRecorder.vue' // Now using global ResourcesDrawer

const route = useRoute()
const router = useRouter()
const { user } = useAuth()
const isAdmin = computed(() => user.value?.role === 'admin')

// State
const lesson = ref(null)
const currentPhase = ref('iDo')
const completedPhases = ref([])
const currentStep = ref(0)
const showHint = ref(false)
const answers = ref({})
const submitted = ref(false)
const score = ref(0)
const showSummary = ref(false)
const completedExercises = ref(new Set())
const showHints = ref({})
const completionSummary = ref({
  title: '',
  moduleTitle: '',
  username: '',
  completedAt: ''
})

// SelfCheck state
const selfCheckAnswers = ref({})
const selfCheckSubmitted = ref(false)

// Section navigation state (for multi-section iDo phase)
const currentSectionIndex = ref(0)

// Track image load failures (annotated_image) so we can show placeholder
const imageLoadFailed = ref(new Set())
function onImageError(src) {
  imageLoadFailed.value.add(src)
  imageLoadFailed.value = new Set(imageLoadFailed.value)
}
function imageSrc(path) {
  if (!path) return ''
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  return path.startsWith('http') ? path : base + (path.startsWith('/') ? path : '/' + path)
}

// Phase configuration and order (Practice, Self-Check, Apply are locked until previous is completed)
const phases = {
  iDo: { label: 'Learn', icon: '📖' },
  weDo: { label: 'Practice', icon: '🎯' },
  selfCheck: { label: 'Self-Check', icon: '✅' },
  youDo: { label: 'Apply', icon: '✍️' }
}
const phaseOrder = ['iDo', 'weDo', 'selfCheck', 'youDo']

const { trackHintUsed, trackPhaseCompleted, trackSelfCheckSubmitted, trackApplyExerciseCompleted, trackLessonCompleted } = useSoftwareLessonMetrics()

/** Practice, Self-Check, and Apply are greyed out until the previous section is completed. Admins can access all sections. */
function isPhaseLocked(phaseKey) {
  if (isAdmin.value) return false
  const idx = phaseOrder.indexOf(phaseKey)
  if (idx <= 0) return false
  const prevPhase = phaseOrder[idx - 1]
  return !completedPhases.value.includes(prevPhase)
}

// Computed
const backLink = computed(() => {
  const classId = route.params.classId || 'statistics'
  const moduleId = lesson.value?.module || ''
  if (moduleId) {
    return `/class/${classId}?module=${moduleId}`
  }
  return `/class/${classId}`
})

const totalQuestions = computed(() => {
  return lesson.value?.phases?.youDo?.questions?.filter(q => q.type !== 'screenshot' || !q.placeholder)?.length || 0
})

const allQuestionsAnswered = computed(() => {
  if (!lesson.value?.phases?.youDo?.questions) return false
  const questions = lesson.value.phases.youDo.questions.filter(q => q.type !== 'screenshot' || !q.placeholder)
  return questions.every(q => {
    const answer = answers.value[q.id]
    if (answer === undefined || answer === null) return false

    switch (q.type) {
      case 'multiple_choice':
        return answer !== ''
      case 'multiple_select':
        return Array.isArray(answer) && answer.length > 0
      case 'ordering':
        return Array.isArray(answer) && answer.length > 0
      case 'matching':
        return Array.isArray(answer) && answer.length > 0 && answer.every(a => a !== '')
      case 'fill_blank':
        return typeof answer === 'string' && answer.trim() !== ''
      case 'screenshot':
        return answer !== null
      default:
        return true
    }
  })
})

// Get exercises for current lesson's module and software
const lessonExercises = computed(() => {
  if (!lesson.value?.module || !lesson.value?.software) return []

  // Convert stats-module-X to module-X for matching
  const moduleId = lesson.value.module.replace('stats-module-', 'module-')

  // Get exercises for this module that match the lesson's software
  const moduleExercises = statisticsExercises.filter(ex =>
    ex.module === moduleId &&
    ex.is_active &&
    ex.software_type === lesson.value.software
  )

  // Sort by order
  return moduleExercises.sort((a, b) => (a.order || 0) - (b.order || 0))
})

// Section navigation computed properties
const isMultiSectionLesson = computed(() => {
  return lesson.value?.phases?.iDo?.type === 'multi_section' &&
         Array.isArray(lesson.value.phases.iDo.sections) &&
         lesson.value.phases.iDo.sections.length > 0
})

const sections = computed(() => {
  if (!isMultiSectionLesson.value) return []
  return lesson.value.phases.iDo.sections
})

const currentSection = computed(() => {
  if (!isMultiSectionLesson.value) return null
  return sections.value[currentSectionIndex.value] || null
})

const hasPrevSection = computed(() => currentSectionIndex.value > 0)
const hasNextSection = computed(() => currentSectionIndex.value < sections.value.length - 1)

// SelfCheck computed properties
const totalSelfCheckQuestions = computed(() => {
  if (!lesson.value?.phases?.selfCheck) return 0

  let count = 0
  if (lesson.value.phases.selfCheck.screenshotRecognition) {
    count += lesson.value.phases.selfCheck.screenshotRecognition.length
  }
  if (lesson.value.phases.selfCheck.errorDiagnostic) {
    count += lesson.value.phases.selfCheck.errorDiagnostic.length
  }
  if (lesson.value.phases.selfCheck.outputInterpretation) {
    count += lesson.value.phases.selfCheck.outputInterpretation.length
  }
  return count
})

const allSelfCheckAnswered = computed(() => {
  if (!lesson.value?.phases?.selfCheck) return false

  let allAnswered = true

  // Check multiple choice questions (screenshot recognition and error diagnostic)
  if (lesson.value.phases.selfCheck.screenshotRecognition) {
    const answered = lesson.value.phases.selfCheck.screenshotRecognition.every(
      q => selfCheckAnswers.value[q.id] !== undefined
    )
    if (!answered) allAnswered = false
  }

  if (lesson.value.phases.selfCheck.errorDiagnostic) {
    const answered = lesson.value.phases.selfCheck.errorDiagnostic.every(
      q => selfCheckAnswers.value[q.id] !== undefined
    )
    if (!answered) allAnswered = false
  }

  // Check short answer questions (output interpretation) - must have text
  if (lesson.value.phases.selfCheck.outputInterpretation) {
    const answered = lesson.value.phases.selfCheck.outputInterpretation.every(
      q => {
        const answer = selfCheckAnswers.value[q.id]
        return answer && typeof answer === 'string' && answer.trim().length > 0
      }
    )
    if (!answered) allAnswered = false
  }

  return allAnswered
})

const selfCheckScore = computed(() => {
  if (!selfCheckSubmitted.value || !lesson.value?.phases?.selfCheck) return 0

  let correct = 0

  // Grade multiple choice questions (screenshot recognition and error diagnostic)
  if (lesson.value.phases.selfCheck.screenshotRecognition) {
    lesson.value.phases.selfCheck.screenshotRecognition.forEach(q => {
      if (selfCheckAnswers.value[q.id] === q.correct) {
        correct++
      }
    })
  }

  if (lesson.value.phases.selfCheck.errorDiagnostic) {
    lesson.value.phases.selfCheck.errorDiagnostic.forEach(q => {
      if (selfCheckAnswers.value[q.id] === q.correct) {
        correct++
      }
    })
  }

  // Grade short answer questions (output interpretation)
  if (lesson.value.phases.selfCheck.outputInterpretation) {
    lesson.value.phases.selfCheck.outputInterpretation.forEach(q => {
      const result = gradeShortAnswer(q, selfCheckAnswers.value[q.id])
      if (result.isCorrect) {
        correct++
      }
    })
  }

  return correct
})

// Methods
function loadLesson() {
  const lessonId = route.params.lessonId
  lesson.value = getLessonById(lessonId)
  imageLoadFailed.value = new Set()
}

function goToPhase(phase) {
  if (isPhaseLocked(phase)) return
  currentPhase.value = phase
  if (phase === 'weDo') {
    currentStep.value = 0
    showHint.value = false
  }
  if (phase === 'selfCheck') {
    selfCheckSubmitted.value = false
  }
  if (phase === 'youDo') {
    submitted.value = false
  }
  if (phase === 'iDo') {
    currentSectionIndex.value = 0
  }
}

// Section navigation methods
function goToSection(index) {
  if (index >= 0 && index < sections.value.length) {
    currentSectionIndex.value = index
  }
}

function prevSection() {
  if (hasPrevSection.value) {
    currentSectionIndex.value--
  }
}

function nextSection() {
  if (hasNextSection.value) {
    currentSectionIndex.value++
  }
}

function completePhase(phase) {
  if (!completedPhases.value.includes(phase)) {
    completedPhases.value.push(phase)
  }
  if (lesson.value?.id) setCompletedPhases(lesson.value.id, completedPhases.value)
  trackPhaseCompleted(lesson.value, phase)

  // Move to next phase: iDo → weDo → selfCheck → youDo
  if (phase === 'iDo') {
    currentPhase.value = 'weDo'
  } else if (phase === 'weDo') {
    currentPhase.value = 'selfCheck'
  } else if (phase === 'selfCheck') {
    currentPhase.value = 'youDo'
  }
}

function completeStep() {
  currentStep.value++
  showHint.value = false
}

function setAnswer(questionId, value) {
  answers.value = { ...answers.value, [questionId]: value }
}

function submitAssessment() {
  submitted.value = true

  // Calculate score
  let correct = 0
  const questions = lesson.value.phases.youDo.questions.filter(q => q.type !== 'screenshot' || !q.placeholder)

  questions.forEach(q => {
    const answer = answers.value[q.id]
    if (checkAnswer(q, answer)) {
      correct++
    }
  })

  score.value = correct
}

function checkAnswer(question, answer) {
  if (!answer) return false

  switch (question.type) {
    case 'multiple_choice':
      return answer === question.correct
    case 'multiple_select':
      if (!Array.isArray(answer)) return false
      return JSON.stringify([...answer].sort()) === JSON.stringify([...question.correct].sort())
    case 'ordering':
      return JSON.stringify(answer) === JSON.stringify(question.correctOrder)
    case 'fill_blank':
      const normalizedAnswer = answer.trim().toLowerCase()
      return question.answer.some(a => a.toLowerCase() === normalizedAnswer)
    case 'matching':
      // For matching, check if all pairs are correct
      if (!Array.isArray(answer)) return false
      return question.pairs.every((pair, index) => answer[index] === pair.right)
    default:
      return false
  }
}

function resetAssessment() {
  answers.value = {}
  submitted.value = false
  score.value = 0
}

// SelfCheck methods
function submitSelfCheck() {
  selfCheckSubmitted.value = true
  trackSelfCheckSubmitted(lesson.value, selfCheckScore.value, totalSelfCheckQuestions.value)
}

function resetSelfCheck() {
  selfCheckAnswers.value = {}
  selfCheckSubmitted.value = false
}

/**
 * Grade short answer question using keyword matching
 * @param {Object} question - Question object with requiredKeywords array
 * @param {string} answer - Student's answer
 * @returns {Object} - Grading result with isCorrect, matchedKeywords, missingKeywords
 */
function gradeShortAnswer(question, answer) {
  if (!answer || typeof answer !== 'string') {
    return {
      isCorrect: false,
      matchedKeywords: [],
      missingKeywords: question.requiredKeywords || []
    }
  }

  const answerLower = answer.toLowerCase().trim()
  const requiredKeywords = question.requiredKeywords || []

  // Check which keywords/phrases are present
  const matchedKeywords = []
  const missingKeywords = []

  requiredKeywords.forEach(keyword => {
    const keywordLower = keyword.toLowerCase()

    // Check if the keyword or phrase is in the answer
    if (answerLower.includes(keywordLower)) {
      matchedKeywords.push(keyword)
    } else {
      missingKeywords.push(keyword)
    }
  })

  // Consider correct if at least the minimum required keywords are present
  const minRequired = question.minRequiredKeywords || Math.ceil(requiredKeywords.length * 0.7)
  const isCorrect = matchedKeywords.length >= minRequired

  return {
    isCorrect,
    matchedKeywords,
    missingKeywords,
    score: requiredKeywords.length > 0 ? (matchedKeywords.length / requiredKeywords.length) : 0
  }
}

function getModuleTitle(moduleId) {
  if (!moduleId) return ''
  const module = getModuleById(moduleId)
  return module?.title || moduleId
}

function formatCompletionTime(date) {
  return date.toLocaleString()
}

function buildSummaryText() {
  return [
    'Lesson Completion Summary',
    'Status: Completed',
    `User: ${completionSummary.value.username}`,
    `Lesson: ${completionSummary.value.title}`,
    completionSummary.value.moduleTitle ? `Module: ${completionSummary.value.moduleTitle}` : null,
    `Completed: ${completionSummary.value.completedAt}`
  ].filter(Boolean).join('\n')
}

function recordLessonCompletion() {
  if (!lesson.value?.id) return
  try {
    const raw = localStorage.getItem('completedSoftwareLessons')
    const parsed = raw ? JSON.parse(raw) : []
    const ids = Array.isArray(parsed) ? parsed : []
    if (!ids.includes(lesson.value.id)) {
      ids.push(lesson.value.id)
      localStorage.setItem('completedSoftwareLessons', JSON.stringify(ids))
    }
  } catch (err) {
    console.warn('Unable to save lesson completion:', err)
  }
}

function completeLesson() {
  completionSummary.value = {
    title: lesson.value?.title || 'Lesson',
    moduleTitle: getModuleTitle(lesson.value?.module),
    username: user.value?.name || user.value?.email || 'Unknown',
    completedAt: formatCompletionTime(new Date())
  }
  recordLessonCompletion()
  trackLessonCompleted(lesson.value)
  showSummary.value = true
}

async function copySummary() {
  try {
    await navigator.clipboard.writeText(buildSummaryText())
  } catch (err) {
    console.warn('Unable to copy summary:', err)
  }
}

function printSummary() {
  window.print()
}

function closeSummary() {
  showSummary.value = false
  router.push(backLink.value)
}

function formatText(text) {
  // Simple markdown-like formatting
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
}

function getCalloutIcon(style) {
  const icons = { tip: '💡', warning: '⚠️', info: 'ℹ️', note: '📝' }
  return icons[style] || 'ℹ️'
}

/**
 * Handle recording complete event
 */
function handleRecordingComplete(data) {
  console.log('Recording complete:', data)
  // Could save recording info to localStorage or show a success message
}

/**
 * Generate HTML content for pop-out exercise instructions
 */
function getExerciseInstructions(exercise, exerciseNumber) {
  let html = `
    <h1>Exercise ${exerciseNumber}: ${exercise.title}</h1>
    <div class="content-box">
      <h3>Description</h3>
      <p>${exercise.description}</p>
    </div>
    <div class="content-box">
      <h3>Instructions</h3>
      <p>${exercise.instructions}</p>
    </div>
  `

  if (exercise.hint) {
    html += `
      <div class="tip-box">
        <strong>💡 Hint:</strong> ${exercise.hint}
      </div>
    `
  }

  if (exercise.sample_data) {
    html += `
      <div class="content-box">
        <h3>Sample Data</h3>
        <p><strong>Columns:</strong> ${exercise.sample_data.columns.join(', ')}</p>
      </div>
    `
  }

  if (exercise.success_message) {
    html += `
      <div class="tip-box">
        <strong>✓ Success:</strong> ${exercise.success_message}
      </div>
    `
  }

  return html
}

/**
 * Generate combined HTML content for all exercises
 * Used in the single ScreenRecorder pop-out instructions
 */
function getAllExercisesInstructions() {
  if (lessonExercises.value.length === 0) {
    return '<p>No practice exercises available yet.</p>'
  }

  let html = `<h1>${lesson.value?.title || 'Practice Exercises'}</h1>`

  // Add recording instruction at the top
  html += `
    <div class="tip-box">
      <h3>🎥 Before You Begin</h3>
      <ol>
        <li><strong>Start Recording:</strong> Click "Start Recording" to capture your screen while working</li>
        <li><strong>Download Dataset:</strong> Use one of the datasets below for your exercises</li>
        <li><strong>Open in ${lesson.value?.software || 'Software'}:</strong> Load the dataset file</li>
        <li><strong>Complete Exercises:</strong> Follow each exercise step-by-step</li>
      </ol>
    </div>
  `

  // Add available datasets section
  html += `
    <div class="content-box">
      <h3>📊 Available Datasets</h3>
      <p>Download and use these datasets for the exercises below:</p>
      <ul>
        <li><a href="/bmi_and_exercise.csv" download>BMI and Exercise Data</a> - Body mass index and exercise habits</li>
        <li><a href="/personality_data.csv" download>Personality Data</a> - Personality traits and demographics</li>
        <li><a href="/Normality data.csv" download>Normality Data</a> - Dataset for testing statistical assumptions</li>
      </ul>
      <p><em>Right-click any link above and select "Save Link As..." to download</em></p>
    </div>
  `

  lessonExercises.value.forEach((exercise, index) => {
    const exerciseNumber = index + 1

    html += `
      <div class="content-box">
        <h2>Exercise ${exerciseNumber}: ${exercise.title}</h2>
        <p><strong>Description:</strong> ${exercise.description}</p>
        <p><strong>Instructions:</strong> ${exercise.instructions}</p>
    `

    if (exercise.hint) {
      html += `<p><strong>💡 Hint:</strong> ${exercise.hint}</p>`
    }

    if (exercise.sample_data) {
      html += `
        <div class="example-box">
          <p><strong>📁 Dataset Required:</strong></p>
          <p>For this exercise, download and open one of the datasets listed above. Look for columns such as: ${exercise.sample_data.columns.join(', ')}</p>
        </div>
      `
    }

    if (exercise.success_message) {
      html += `<p><strong>✓ Success:</strong> ${exercise.success_message}</p>`
    }

    html += `</div>`
  })

  return html
}

/**
 * Mark an exercise as complete
 */
function markExerciseComplete(exerciseTitle) {
  completedExercises.value.add(exerciseTitle)
  saveCompletedExercises()
  trackApplyExerciseCompleted(lesson.value, exerciseTitle)
}

/**
 * Mark an exercise as incomplete
 */
function markExerciseIncomplete(exerciseTitle) {
  completedExercises.value.delete(exerciseTitle)
  saveCompletedExercises()
}

/**
 * Toggle hint visibility for an exercise
 */
function toggleHint(exerciseTitle) {
  const next = !showHints.value[exerciseTitle]
  showHints.value[exerciseTitle] = next
  if (next) trackHintUsed(lesson.value, exerciseTitle)
}

/**
 * Save completed exercises to localStorage
 */
function saveCompletedExercises() {
  try {
    const lessonId = lesson.value?.id
    if (!lessonId) return

    const key = `lesson-exercises-${lessonId}`
    const data = Array.from(completedExercises.value)
    localStorage.setItem(key, JSON.stringify(data))
  } catch (err) {
    console.warn('Unable to save completed exercises:', err)
  }
}

/**
 * Load completed exercises from localStorage
 */
function loadCompletedExercises() {
  try {
    const lessonId = lesson.value?.id
    if (!lessonId) return

    const key = `lesson-exercises-${lessonId}`
    const raw = localStorage.getItem(key)
    if (raw) {
      const parsed = JSON.parse(raw)
      completedExercises.value = new Set(Array.isArray(parsed) ? parsed : [])
    }
  } catch (err) {
    console.warn('Unable to load completed exercises:', err)
  }
}

/**
 * Attach copy buttons to all terminal command boxes
 * Runs after content is rendered via v-html
 */
function attachCopyButtons() {
  nextTick(() => {
    const commandBoxes = document.querySelectorAll('.terminal-command:not(.has-copy-btn)')

    commandBoxes.forEach(box => {
      // Mark as processed
      box.classList.add('has-copy-btn')

      // Create copy button
      const copyBtn = document.createElement('button')
      copyBtn.className = 'copy-command-btn'
      copyBtn.innerHTML = '📋'
      copyBtn.title = 'Copy command'

      // Get the command text
      const command = box.getAttribute('data-command') || box.textContent.trim()

      // Copy functionality
      copyBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {
          await navigator.clipboard.writeText(command)

          // Visual feedback
          copyBtn.innerHTML = '✓'
          copyBtn.classList.add('copied')

          setTimeout(() => {
            copyBtn.innerHTML = '📋'
            copyBtn.classList.remove('copied')
          }, 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
          copyBtn.innerHTML = '✗'
          setTimeout(() => {
            copyBtn.innerHTML = '📋'
          }, 2000)
        }
      })

      // Add button to box
      box.appendChild(copyBtn)
    })
  })
}

// Lifecycle
onMounted(() => {
  loadLesson()
  loadCompletedExercises()
  attachCopyButtons()
  const lessonId = lesson.value?.id
  if (lessonId) {
    const saved = getCompletedPhases(lessonId)
    if (saved.length) completedPhases.value = saved
  }
  // Check for phase query parameter and navigate to that phase
  const phaseParam = route.query.phase
  if (phaseParam && ['iDo', 'weDo', 'selfCheck', 'youDo'].includes(phaseParam)) {
    currentPhase.value = phaseParam
  }
})

watch(() => route.params.lessonId, () => {
  loadLesson()
  loadCompletedExercises()
  currentPhase.value = 'iDo'
  const lessonId = lesson.value?.id
  completedPhases.value = lessonId ? getCompletedPhases(lessonId) : []
  currentStep.value = 0
  currentSectionIndex.value = 0
  showHint.value = false
  answers.value = {}
  submitted.value = false
  completedExercises.value = new Set()
  attachCopyButtons()
})

// Attach copy buttons when phase changes (content is re-rendered)
watch(currentPhase, () => {
  attachCopyButtons()
})
</script>

<style scoped>
.lesson-page {
  min-height: 100vh;
  padding: 2rem 0;
  background: var(--bg-main);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.back-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.875rem;
}

.back-link:hover {
  color: var(--primary);
}

/* Header */
.lesson-header {
  margin-bottom: 2rem;
}

.lesson-meta {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin: 1rem 0;
}

.software-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.software-badge.jamovi { background: #f3e8ff; color: #7c3aed; }
.software-badge.spss { background: #fee2e2; color: #dc2626; }
.software-badge.r { background: #dbeafe; color: #2563eb; }

.time-estimate {
  color: var(--text-secondary);
  font-size: 0.875rem;
}

.lesson-header h1 {
  margin: 0 0 1rem 0;
  font-size: 1.75rem;
}

.objectives {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem 1.25rem;
}

.objectives h3 {
  margin: 0 0 0.5rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.objectives ul {
  margin: 0;
  padding-left: 1.25rem;
}

.objectives li {
  margin: 0.25rem 0;
  font-size: 0.9375rem;
}

/* Phase Navigation */
.phase-nav {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 0.5rem;
}

.phase-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  color: var(--text-secondary);
  transition: all 0.2s;
  font-weight: 500;
}

.phase-btn:hover {
  background: var(--bg-elevated);
}

.phase-btn.active {
  background: var(--primary);
  color: white;
}

.phase-btn.completed {
  color: var(--success);
}

.phase-btn.locked,
.phase-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  color: var(--text-muted);
}

.phase-btn.locked:hover,
.phase-btn:disabled:hover {
  background: transparent;
}

.phase-icon {
  font-size: 1.25rem;
}

.check {
  color: var(--success);
}

/* Phase Content */

.phase-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.phase-badge {
  padding: 0.375rem 0.875rem;
  border-radius: 1rem;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.phase-badge.i-do { background: #dbeafe; color: #1d4ed8; }
.phase-badge.we-do { background: #fef3c7; color: #b45309; }
.phase-badge.you-do { background: #dcfce7; color: #16a34a; }

.phase-header h2 {
  margin: 0;
  font-size: 1.25rem;
}

/* Content Blocks */
.content-blocks {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.content-block {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
}

.text-block {
  font-size: 1rem;
  line-height: 1.7;
}

/* List spacing: numbers/markers well clear of the left edge (:deep for v-html content) */
.content-block.text-block :deep(ol),
.content-block.text-block :deep(ul) {
  padding-left: 3rem;
  margin-left: 0;
  margin-right: 0;
}
.content-block.text-block :deep(li) {
  margin-bottom: 0.35rem;
}

/* Section divider: no box, full-width break between topics */
.section-divider-block {
  margin: 2.5rem 0;
  padding: 0;
  background: transparent;
  border: none;
  width: 100%;
}
.section-divider-block hr {
  border: none;
  border-top: 3px solid var(--border-light);
  margin: 0 0 1rem 0;
}
.section-divider-block .divider-label {
  margin: 0;
  font-size: 0.9375rem;
  color: var(--text-secondary);
  text-align: center;
}

/* Collapsible section block (Windows & Mac, Chromebook) */
.collapsible-section-block {
  margin: 0;
}
.collapsible-section-block .collapsible-section {
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  overflow: hidden;
  background: var(--bg-card);
}
.collapsible-section-block .collapsible-section summary {
  padding: 1rem 1.25rem;
  font-weight: 600;
  font-size: 1.0625rem;
  cursor: pointer;
  list-style: none;
  user-select: none;
}
.collapsible-section-block .collapsible-section summary::-webkit-details-marker {
  display: none;
}
.collapsible-section-block .collapsible-section summary::before {
  content: '▶';
  display: inline-block;
  margin-right: 0.5rem;
  transition: transform 0.2s;
}
.collapsible-section-block .collapsible-section[open] summary::before {
  transform: rotate(90deg);
}
.collapsible-section-block .collapsible-content {
  padding: 0 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.video-block {
  padding: 0;
  background: transparent;
  border: none;
}

.video-block .video-description {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-muted);
  text-align: center;
}

.callout {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.callout.tip { background: #f0fdf4; border-color: #86efac; color: #166534; }
.callout.warning { background: #fffbeb; border-color: #fcd34d; color: #92400e; }
.callout.info { background: #eff6ff; border-color: #93c5fd; color: #1e40af; }

.callout-icon {
  font-size: 1.5rem;
}

.callout p {
  margin: 0;
  flex: 1;
}

/* Definition List */
.definition-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0;
  background: transparent;
  border: none;
}

.definition-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--item-color, var(--primary));
  border-radius: 0.5rem;
}

.def-icon {
  font-size: 1.5rem;
}

.def-content dt {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.def-content dd {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

/* Annotated Image */
.annotated-image .image-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.annotated-image-img {
  width: 100%;
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  display: block;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  background: var(--bg-elevated);
  border-radius: 0.5rem;
  text-align: center;
}

.placeholder-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.placeholder-text {
  font-weight: 500;
  margin-bottom: 0.25rem;
}

.placeholder-note {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.annotations-list {
  margin-top: 1rem;
  display: grid;
  gap: 0.5rem;
}

.annotation {
  display: flex;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background: var(--bg-elevated);
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.ann-label {
  font-weight: 600;
  white-space: nowrap;
}

.ann-desc {
  color: var(--text-secondary);
}

/* Step Sequence */
.step-sequence {
  background: transparent;
  border: none;
  padding: 0;
}

.sequence-step {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.step-content p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.step-image {
  margin-top: 1rem;
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--border-color);
}

/* Guided Steps (We Do) */
.phase-instructions {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
}

/* Recording Instructions */
.recording-instructions {
  background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
  border: 2px solid #fbbf24;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}

:root.dark .recording-instructions {
  background: linear-gradient(135deg, #422006 0%, #78350f 100%);
  border-color: #f59e0b;
}

.instruction-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.instruction-icon {
  font-size: 1.5rem;
}

.instruction-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #92400e;
}

:root.dark .instruction-header h3 {
  color: #fbbf24;
}

.instruction-steps {
  margin: 0;
  padding-left: 1.5rem;
  color: #78350f;
}

:root.dark .instruction-steps {
  color: #fde68a;
}

.instruction-steps li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.instruction-steps li:last-child {
  margin-bottom: 0;
}

.instruction-steps strong {
  color: #92400e;
  font-weight: 600;
}

:root.dark .instruction-steps strong {
  color: #fbbf24;
}

.guided-steps {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.guided-step {
  display: flex;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  transition: all 0.2s;
}

.guided-step.current {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
}

.guided-step.completed {
  opacity: 0.7;
}

.guided-step.upcoming {
  opacity: 0.75;
}

.step-marker {
  width: 32px;
  height: 32px;
  background: var(--bg-elevated);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
  color: var(--text-primary);
}

.guided-step.current .step-marker {
  background: var(--primary);
  color: white;
}

.guided-step.completed .step-marker {
  background: var(--success);
  color: white;
}

.marker-check {
  font-size: 1rem;
}

.step-body {
  flex: 1;
}

.step-instruction {
  margin: 0;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-primary);
}

.step-active-content {
  margin-top: 1rem;
}

.hint-box {
  display: flex;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: #fef3c7;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  color: #92400e;
}

.hint-icon {
  font-size: 1.25rem;
}

.hint-box p {
  margin: 0;
  color: inherit;
  font-size: 0.9375rem;
}

.btn-hint {
  background: transparent;
  border: 1px solid var(--border);
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  color: var(--text-secondary);
}

.btn-hint:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.checkpoint {
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 0.5rem;
  padding: 1rem;
  color: #166534;
}

.checkpoint-text {
  margin: 0 0 0.75rem 0;
  color: inherit;
  font-size: 0.9375rem;
}

.btn-done {
  background: var(--success);
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-done:hover {
  filter: brightness(1.1);
}

/* Phase Complete */
.phase-complete {
  text-align: center;
  padding: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  margin-top: 1rem;
}

.complete-message {
  margin-bottom: 1.5rem;
}

.complete-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 0.5rem;
}

.complete-message h3 {
  margin: 0 0 0.5rem 0;
}

.complete-message p {
  margin: 0;
  color: var(--text-secondary);
}

/* Self-Check Sections */
.selfcheck-exercises {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.selfcheck-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 3px solid var(--primary);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.selfcheck-section:nth-child(1) {
  border-left-color: #3b82f6; /* Blue for Screenshot Recognition */
}

.selfcheck-section:nth-child(2) {
  border-left-color: #f59e0b; /* Amber for Error Diagnostic */
}

.selfcheck-section:nth-child(3) {
  border-left-color: #10b981; /* Green for Output Interpretation */
}

.selfcheck-title {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--text-primary);
}

.selfcheck-description {
  margin: 0 0 1.25rem 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
}

.selfcheck-exercise {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1.25rem;
  margin-bottom: 1rem;
}

.selfcheck-exercise:last-child {
  margin-bottom: 0;
}

.selfcheck-exercise h4 {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--text-primary);
}

/* Exercise Content */
.exercise-number {
  position: absolute;
  top: 1rem;
  left: 1rem;
  width: 28px;
  height: 28px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.875rem;
  flex-shrink: 0;
}

.selfcheck-exercise {
  position: relative;
}

.exercise-content {
  padding-left: 2.5rem;
}

.exercise-question {
  font-size: 1rem;
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Exercise Images and Displays */
.exercise-image {
  margin: 1rem 0;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid var(--border);
}

.exercise-image img {
  width: 100%;
  height: auto;
  display: block;
}

.error-display,
.output-display {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-left: 3px solid #f59e0b;
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9375rem;
}

.error-display code,
.output-display code {
  color: var(--text-primary);
  background: transparent;
}

.output-display pre {
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
}

.output-display pre code {
  font-size: 0.875rem;
  line-height: 1.5;
}

/* Exercise Options */
.exercise-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin: 1rem 0;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.option-label:hover {
  border-color: var(--primary);
  background: var(--bg-card);
}

.option-label.selected {
  border-color: var(--primary);
  background: color-mix(in srgb, var(--primary) 8%, var(--bg-card));
}

.option-label.correct {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 8%, var(--bg-card));
}

.option-label.incorrect {
  border-color: #ef4444;
  background: color-mix(in srgb, #ef4444 8%, var(--bg-card));
}

.option-label input[type="radio"] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--primary);
  flex-shrink: 0;
}

.option-label span {
  flex: 1;
  color: var(--text-primary);
}

/* Short Answer Input */
.short-answer-container {
  margin: 1rem 0;
}

.answer-label {
  display: block;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-size: 0.9375rem;
}

.short-answer-input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid var(--border);
  border-radius: 0.5rem;
  background: var(--bg-elevated);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.9375rem;
  line-height: 1.6;
  resize: vertical;
  transition: border-color 0.2s;
}

.short-answer-input:focus {
  outline: none;
  border-color: var(--primary);
}

.short-answer-input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.answer-hint {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-style: italic;
}

/* Exercise Feedback */
.exercise-feedback {
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  line-height: 1.6;
}

.feedback-correct {
  background: color-mix(in srgb, var(--success) 10%, var(--bg-card));
  border: 1px solid var(--success);
  color: var(--text-primary);
  margin: 0;
}

.feedback-correct p {
  margin: 0 0 0.5rem 0;
}

.feedback-correct p:last-child {
  margin-bottom: 0;
}

.feedback-incorrect {
  background: color-mix(in srgb, #ef4444 10%, var(--bg-card));
  border: 1px solid #ef4444;
  color: var(--text-primary);
  margin: 0;
}

.feedback-incorrect p {
  margin: 0 0 0.5rem 0;
}

.feedback-incorrect p:last-child {
  margin-bottom: 0;
}

.keywords-matched {
  font-size: 0.875rem;
  color: var(--success);
  font-weight: 500;
}

.missing-keywords {
  font-size: 0.875rem;
  color: #ef4444;
  font-weight: 500;
}

.selfcheck-actions {
  margin-top: 2rem;
  text-align: center;
}

/* Assessment */
.assessment-questions {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.question-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.question-number {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

.assessment-actions {
  text-align: center;
}

.results-summary {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
}

.score-display {
  margin-bottom: 0.5rem;
}

.score {
  font-size: 2rem;
  font-weight: 700;
}

.percentage {
  color: var(--text-secondary);
  margin-left: 0.5rem;
}

.perfect { color: var(--success); font-weight: 600; }
.needs-work { color: var(--danger); font-weight: 600; }

.completion-note {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin-top: 0.25rem;
}

.retry-hint {
  color: var(--text-secondary);
  font-size: 0.9375rem;
  margin-top: 0.25rem;
}

.results-summary.is-perfect {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 5%, var(--bg-card));
}

.result-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
}

/* Buttons */
.phase-actions {
  margin-top: 2rem;
  text-align: center;
}

.btn-primary {
  background: var(--primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
}

.btn-primary:hover:not(:disabled) {
  filter: brightness(1.1);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  cursor: pointer;
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.summary-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 120;
}

.summary-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: var(--text-primary);
}

.summary-card h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.25rem;
}

.summary-status {
  margin: 0 0 1rem 0;
  font-weight: 600;
  color: var(--text-primary);
}

.summary-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.summary-details strong {
  color: var(--text-primary);
}

.summary-actions {
  color: var(--text-primary);
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

@media print {
  .lesson-page .container > :not(.summary-overlay) {
    display: none !important;
  }

  .summary-overlay {
    position: static;
    background: transparent;
    padding: 0;
  }

  .summary-card {
  background: var(--bg-card);
  padding: 2rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 520px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  color: var(--text-primary);
}

  .print-hide {
    display: none !important;
  }
}
\/\* Not Found \*\/
.not-found {
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.summary-actions .btn-secondary {
  color: var(--text-primary);
}

/* Exercises Phase */
.exercises-phase .phase-badge.exercises {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
}

.exercises-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.exercise-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.2s;
}

.exercise-card.completed {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 5%, var(--bg-card));
}

.exercise-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  position: relative;
}

.exercise-number {
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.exercise-card.completed .exercise-number {
  background: var(--success);
}

.exercise-header h3 {
  margin: 0;
  font-size: 1.25rem;
  color: var(--text-primary);
  flex: 1;
}

.completed-badge {
  background: var(--success);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.exercise-description {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.exercise-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.detail-section {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem;
}

.detail-section h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: var(--text-primary);
}

.detail-section p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.detail-section.hint {
  border-left: 3px solid #f59e0b;
  background: color-mix(in srgb, #f59e0b 10%, var(--bg-elevated));
}

.sample-data-table {
  background: var(--bg-card);
  padding: 0.75rem;
  border-radius: 0.375rem;
  font-family: monospace;
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-top: 0.5rem;
}

.exercise-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.no-exercises {
  background: var(--bg-card);
  border: 1px dashed var(--border);
  border-radius: 0.75rem;
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .exercise-header {
    flex-wrap: wrap;
  }

  .exercise-header h3 {
    width: 100%;
  }

  .exercise-actions {
    flex-direction: column;
  }

  .exercise-actions button {
    width: 100%;
  }
}

/* Terminal Command Boxes */
.terminal-command {
  position: relative;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-left: 3px solid var(--primary);
  border-radius: 0.5rem;
  padding: 1rem 3rem 1rem 1rem;
  margin: 1rem 0;
  font-family: 'Courier New', 'Consolas', monospace;
  font-size: 0.9375rem;
  color: var(--text-primary);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.terminal-command code {
  background: none;
  padding: 0;
  color: inherit;
}

.copy-command-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.375rem;
  color: var(--text-secondary);
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.copy-command-btn:hover {
  background: var(--primary);
  color: white;
  border-color: var(--primary);
}

.copy-command-btn.copied {
  background: var(--success);
  color: white;
  border-color: var(--success);
}

/* Datasets Section */
.datasets-section {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.datasets-section h3 {
  font-size: 1.125rem;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
}

.datasets-instructions {
  color: var(--text-secondary);
  margin-bottom: 1rem;
  font-size: 0.9375rem;
}

.dataset-links {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dataset-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  text-decoration: none;
  transition: all 0.2s;
}

.dataset-link:hover {
  border-color: var(--primary);
  background: var(--bg-card);
  transform: translateX(4px);
}

.dataset-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
}

.dataset-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  flex: 1;
}

.dataset-info strong {
  color: var(--text-primary);
  font-size: 1rem;
}

.dataset-description {
  color: var(--text-muted);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .dataset-link {
    padding: 0.875rem;
  }

  .dataset-icon {
    font-size: 1.25rem;
  }
}

/* Exercises Objectives List */
.exercises-objectives {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.exercises-objectives h3 {
  font-size: 1.125rem;
  color: var(--text-primary);
  margin-bottom: 1rem;
}

.objectives-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.objective-item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1.25rem;
  transition: all 0.2s;
}

.objective-item.completed {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 5%, var(--bg-card));
}

.objective-header {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.objective-number {
  width: 40px;
  height: 40px;
  background: var(--primary);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 1.125rem;
  flex-shrink: 0;
}

.objective-item.completed .objective-number {
  background: var(--success);
}

.objective-content {
  flex: 1;
}

.objective-content h4 {
  margin: 0 0 0.5rem 0;
  font-size: 1.125rem;
  color: var(--text-primary);
}

.objective-description {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9375rem;
  line-height: 1.5;
}

.objective-hint-section {
  margin-top: 0.75rem;
}

.btn-hint {
  padding: 0.5rem 1rem;
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: 6px;
  color: var(--text-primary);
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-hint:hover {
  background: var(--bg-hover);
  border-color: var(--primary);
}

.hint-content {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: var(--bg-elevated);
  border-left: 3px solid var(--warning);
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 0.9375rem;
  line-height: 1.5;
}


.apply-summary {
  margin: 1.5rem 0;
  padding: 1.25rem;
  background: var(--success-bg);
  border: 2px solid var(--success);
  border-left: 6px solid var(--success);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(34, 197, 94, 0.2);
}

.apply-summary h3 {
  margin: 0 0 0.75rem 0;
  font-size: 1.125rem;
  color: var(--success);
  font-weight: 600;
}

.apply-summary p {
  margin: 0;
  color: var(--text-primary);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.btn-check {
  width: 36px;
  height: 36px;
  background: transparent;
  border: 2px solid var(--border);
  border-radius: 50%;
  color: transparent;
  font-size: 1.125rem;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.btn-check:hover {
  border-color: var(--success);
  background: color-mix(in srgb, var(--success) 10%, transparent);
}

.btn-check.completed {
  background: var(--success);
  border-color: var(--success);
  color: white;
}

@media (max-width: 768px) {
  .objective-header {
    flex-wrap: wrap;
  }

  .objective-content {
    width: 100%;
  }

  .btn-check {
    margin-left: auto;
  }
}

/* Section Navigation (Multi-Section iDo Phase) */
.section-navigation {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-tabs {
  display: flex;
  gap: 0.25rem;
  padding-bottom: 0;
  border-bottom: 2px solid var(--border);
  align-items: flex-end;
}

.section-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--bg);
  border: 1px solid var(--border);
  border-bottom: none;
  border-radius: 0.5rem 0.5rem 0 0;
  cursor: pointer;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  white-space: nowrap;
  flex: 0.8;
  min-width: 0;
  position: relative;
  margin-bottom: -2px;
}

.section-tab:hover {
  color: var(--primary);
  background: var(--bg-elevated);
  transform: translateY(-2px);
}

.section-tab.active {
  color: var(--primary);
  background: var(--bg-elevated);
  border-color: var(--border);
  border-bottom: 2px solid var(--bg-elevated);
  font-weight: 600;
  z-index: 1;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.05);
  flex: 2.5;
  padding: 0.75rem 1.25rem;
}

.tab-number {
  width: 24px;
  height: 24px;
  background: var(--bg-elevated);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8125rem;
  flex-shrink: 0;
}

.section-tab.active .tab-number {
  background: var(--primary);
  color: white;
}

.tab-title {
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  min-width: 0;
}

.section-tab.active .tab-title {
  overflow: visible;
  text-overflow: clip;
  white-space: normal;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
}

.section-header h3 {
  margin: 0;
  font-size: 1.375rem;
  color: var(--text-primary);
}

.section-time {
  padding: 0.375rem 0.75rem;
  background: var(--bg-elevated);
  border-radius: 1rem;
  font-size: 0.8125rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.section-objectives {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 0.5rem;
  padding: 1rem 1.25rem;
}

.section-objectives h4 {
  margin: 0 0 0.75rem 0;
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.section-objectives ul {
  margin: 0;
  padding-left: 1.25rem;
}

.section-objectives li {
  margin: 0.375rem 0;
  font-size: 0.9375rem;
  line-height: 1.5;
}

.section-nav-buttons {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.section-progress {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .section-tab {
    font-size: 0.8125rem;
    padding: 0.625rem 0.75rem;
  }

  .tab-number {
    width: 20px;
    height: 20px;
    font-size: 0.75rem;
  }

  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .section-nav-buttons {
    flex-wrap: wrap;
    justify-content: center;
  }

  .section-nav-buttons .btn-secondary,
  .section-nav-buttons .btn-primary {
    flex: 1;
    min-width: 140px;
  }

  .section-progress {
    width: 100%;
    text-align: center;
    order: -1;
  }
}
</style>


