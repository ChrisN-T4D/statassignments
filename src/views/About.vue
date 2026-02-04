<template>
  <div class="about-page">
    <div class="about-container">
      <div class="about-hero">
        <img src="/logo_gif.gif" alt="Methods Market" class="about-logo" />
        <h1>About This Learning Platform</h1>
      </div>

      <section class="intro">
        <p class="lead">
          This platform uses advanced educational psychology and machine learning algorithms to create a
          personalized, adaptive learning experience for statistics and research methods.
        </p>
      </section>

      <!-- Core Educational Theory -->
      <section class="theory-section">
        <h2>Educational Theory Foundation</h2>

        <div class="theory-card">
          <h3>Mastery-Based Learning</h3>
          <p>
            Rather than moving through content at a fixed pace, this platform adapts to your individual
            learning progress. You demonstrate mastery by successfully answering questions at varying
            difficulty levels, ensuring deep understanding before moving forward.
          </p>
        </div>

        <div class="theory-card">
          <h3>Bayesian Knowledge Tracing (BKT)</h3>
          <p>
            At the core of our system is <strong>Bayesian Knowledge Tracing</strong>, a probabilistic
            cognitive model originally developed at Carnegie Mellon University for intelligent tutoring systems.
          </p>
          <p>
            BKT models your knowledge state as a probability: for each learning objective, the system
            maintains a probability estimate of whether you have mastered that skill.
          </p>

          <h4>How BKT Works</h4>
          <p>The model uses four key parameters:</p>
          <ul>
            <li>
              <strong>P(L₀) - Prior Knowledge:</strong> Your starting knowledge probability (typically 10-20%).
              The system adapts this based on your overall performance—high achievers start with higher
              priors on new topics.
            </li>
            <li>
              <strong>P(T) - Learning Rate:</strong> The probability you learn the skill after each
              practice opportunity (typically 15%). This measures how quickly you acquire new knowledge.
            </li>
            <li>
              <strong>P(S) - Slip Probability:</strong> The chance you answer incorrectly despite knowing
              the material (careless mistakes, misreading, etc.). This adjusts based on question difficulty.
            </li>
            <li>
              <strong>P(G) - Guess Probability:</strong> The chance you answer correctly through guessing
              without truly understanding. Also difficulty-adjusted.
            </li>
          </ul>

          <p>
            After each question, the system updates your mastery probability using <strong>Bayes' theorem</strong>,
            combining your performance evidence with prior knowledge to produce increasingly accurate estimates
            of your true understanding.
          </p>

          <h4>Example: Your Learning Analytics Dashboard</h4>
          <p>On your profile page, you'll see visualizations like these showing your learning progress:</p>

          <!-- Example Mastery Distribution -->
          <div class="example-viz">
            <h5>Mastery Distribution</h5>
            <p class="viz-caption">Shows how many learning objectives you've mastered at different levels</p>
            <div class="mastery-distribution-example">
              <div class="mastery-bucket-example">
                <div class="mastery-bar-container-example">
                  <div class="mastery-bar-example not-mastered" style="height: 45%">
                    <span class="mastery-count-example">3</span>
                  </div>
                </div>
                <div class="mastery-label-example">0-20%</div>
              </div>
              <div class="mastery-bucket-example">
                <div class="mastery-bar-container-example">
                  <div class="mastery-bar-example developing" style="height: 60%">
                    <span class="mastery-count-example">4</span>
                  </div>
                </div>
                <div class="mastery-label-example">20-40%</div>
              </div>
              <div class="mastery-bucket-example">
                <div class="mastery-bar-container-example">
                  <div class="mastery-bar-example developing" style="height: 75%">
                    <span class="mastery-count-example">5</span>
                  </div>
                </div>
                <div class="mastery-label-example">40-60%</div>
              </div>
              <div class="mastery-bucket-example">
                <div class="mastery-bar-container-example">
                  <div class="mastery-bar-example proficient" style="height: 90%">
                    <span class="mastery-count-example">6</span>
                  </div>
                </div>
                <div class="mastery-label-example">60-80%</div>
              </div>
              <div class="mastery-bucket-example">
                <div class="mastery-bar-container-example">
                  <div class="mastery-bar-example mastered" style="height: 100%">
                    <span class="mastery-count-example">7</span>
                  </div>
                </div>
                <div class="mastery-label-example">80-100%</div>
              </div>
            </div>
          </div>

          <!-- Example Learning Parameters -->
          <div class="example-viz">
            <h5>Learning Parameters</h5>
            <p class="viz-caption">Average BKT parameters across all your learning objectives</p>
            <div class="parameters-example">
              <div class="parameter-item-example">
                <div class="parameter-label-example">
                  <span class="parameter-name-example">P(L)</span>
                  <span class="parameter-desc-example">Current Mastery</span>
                </div>
                <div class="parameter-bar-bg-example">
                  <div class="parameter-bar-example" style="width: 68%"></div>
                </div>
                <div class="parameter-value-example">68%</div>
              </div>
              <div class="parameter-item-example">
                <div class="parameter-label-example">
                  <span class="parameter-name-example">P(T)</span>
                  <span class="parameter-desc-example">Learning Rate</span>
                </div>
                <div class="parameter-bar-bg-example">
                  <div class="parameter-bar-example learning-rate" style="width: 15%"></div>
                </div>
                <div class="parameter-value-example">15%</div>
              </div>
              <div class="parameter-item-example">
                <div class="parameter-label-example">
                  <span class="parameter-name-example">P(G)</span>
                  <span class="parameter-desc-example">Guess Probability</span>
                </div>
                <div class="parameter-bar-bg-example">
                  <div class="parameter-bar-example guess" style="width: 23%"></div>
                </div>
                <div class="parameter-value-example">23%</div>
              </div>
              <div class="parameter-item-example">
                <div class="parameter-label-example">
                  <span class="parameter-name-example">P(S)</span>
                  <span class="parameter-desc-example">Slip Probability</span>
                </div>
                <div class="parameter-bar-bg-example">
                  <div class="parameter-bar-example slip" style="width: 9%"></div>
                </div>
                <div class="parameter-value-example">9%</div>
              </div>
            </div>
          </div>
        </div>

        <div class="theory-card">
          <h3>Additional Metrics Tracked</h3>
          <p>
            Beyond BKT parameters, the system tracks several behavioral and contextual metrics to provide
            a more complete picture of your learning:
          </p>

          <h4>Time Tracking</h4>
          <ul>
            <li>
              <strong>Active Time:</strong> Time spent actively engaged with the question (mouse movement, typing)
            </li>
            <li>
              <strong>Total Time:</strong> Total elapsed time from question display to submission
            </li>
            <li>
              <strong>Reading Time:</strong> Time before first interaction, indicating careful reading
            </li>
          </ul>

          <h4>Confidence Indicators</h4>
          <ul>
            <li>
              <strong>Time to First Selection:</strong> How quickly you make your initial choice
              (faster often indicates higher confidence)
            </li>
            <li>
              <strong>Answer Changes:</strong> Number of times you change your answer before submitting
              (more changes may indicate hesitation or uncertainty)
            </li>
            <li>
              <strong>Deliberation Time:</strong> Total active thinking time spent on the question
            </li>
          </ul>

          <h4>Spacing & Sequence Context</h4>
          <ul>
            <li>
              <strong>Time Since Reading:</strong> How long since you last read the related topic content
              (spacing effect research shows distributed practice improves retention)
            </li>
            <li>
              <strong>Time Since Last Attempt:</strong> Gap since your previous practice attempt on this topic
            </li>
            <li>
              <strong>Prior Exposure:</strong> Whether you've encountered this topic before
            </li>
            <li>
              <strong>Return Visits:</strong> Tracks if you're returning to review topics after errors
              (spaced repetition pattern)
            </li>
          </ul>

          <p>
            These metrics help the Neural BKT system understand not just <em>what</em> you answered, but
            <em>how</em> you approached the question—providing insights into your confidence, engagement,
            and study patterns.
          </p>
        </div>

        <div class="theory-card">
          <h3>Item Response Theory (IRT)</h3>
          <p>
            <strong>Item Response Theory</strong> is integrated to adjust BKT parameters based on question
            difficulty. This psychometric framework recognizes that:
          </p>
          <ul>
            <li><strong>Easy questions</strong> have higher guess rates and lower slip rates</li>
            <li><strong>Hard questions</strong> have lower guess rates and higher slip rates (even experts make mistakes)</li>
            <li><strong>Medium questions</strong> provide the most diagnostic information about your true ability</li>
          </ul>
          <p>
            By dynamically adjusting these parameters, the system provides more accurate mastery estimates
            regardless of which questions you encounter.
          </p>
        </div>
      </section>

      <!-- Advanced Neural BKT -->
      <section class="neural-section">
        <h2>Advanced Neural BKT System</h2>

        <div class="theory-card highlight">
          <h3>Multidimensional Student Modeling</h3>
          <p>
            Beyond traditional BKT, this platform employs an advanced <strong>Neural BKT engine</strong>
            that models students across multiple dimensions, recognizing that learners differ in:
          </p>
          <ul>
            <li><strong>Learning Rate:</strong> How quickly you acquire new skills</li>
            <li><strong>Retention:</strong> How well you maintain knowledge over time</li>
            <li><strong>Guessing Tendency:</strong> Your approach to uncertain questions</li>
            <li><strong>Slip Resistance:</strong> Consistency in demonstrating known skills</li>
          </ul>
        </div>

        <div class="theory-card">
          <h3>Student Prototypes</h3>
          <p>
            The system automatically classifies students into one of five learning profiles through
            <strong>sequential Bayesian updating</strong>. As you answer questions, the system refines
            its understanding of which profile best matches your learning patterns:
          </p>

          <div class="prototypes-table">
            <table>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Learning Rate</th>
                  <th>Retention</th>
                  <th>Guess Rate</th>
                  <th>Slip Resistance</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Fast Learner</strong></td>
                  <td>25%</td>
                  <td>95%</td>
                  <td>30%</td>
                  <td>80%</td>
                </tr>
                <tr>
                  <td><strong>Careful Student</strong></td>
                  <td>15%</td>
                  <td>85%</td>
                  <td>15%</td>
                  <td>90%</td>
                </tr>
                <tr>
                  <td><strong>Average Student</strong></td>
                  <td>15%</td>
                  <td>80%</td>
                  <td>25%</td>
                  <td>70%</td>
                </tr>
                <tr>
                  <td><strong>Inconsistent Student</strong></td>
                  <td>12%</td>
                  <td>75%</td>
                  <td>25%</td>
                  <td>60%</td>
                </tr>
                <tr>
                  <td><strong>Struggling Student</strong></td>
                  <td>10%</td>
                  <td>70%</td>
                  <td>35%</td>
                  <td>50%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p class="note">
            <strong>Note:</strong> These profiles are not fixed labels—they're probabilistic models that
            help the system make better predictions about your future performance and recommend appropriate
            difficulty levels.
          </p>
        </div>

        <div class="theory-card">
          <h3>Adaptive Prior Adjustment</h3>
          <p>
            The system learns from your overall performance across all topics. Students with strong
            mastery across multiple objectives receive higher initial probabilities (priors) for new topics,
            recognizing the transfer of meta-learning skills and general statistical reasoning.
          </p>
        </div>
      </section>

      <!-- Technical Implementation -->
      <section class="technical-section">
        <h2>Technical Architecture</h2>

        <div class="theory-card">
          <h3>Hybrid Local + Neural BKT</h3>
          <p>The system operates using a two-tier architecture:</p>

          <div class="architecture-diagram">
            <div class="arch-box">
              <strong>Tier 1: Local BKT</strong>
              <p>
                Fast, browser-based Bayesian updating with IRT-adjusted parameters.
                Provides instant feedback with ~1-2ms response time.
              </p>
            </div>
            <div class="arch-arrow">↓ If available ↓</div>
            <div class="arch-box">
              <strong>Tier 2: Neural BKT</strong>
              <p>
                Advanced multidimensional modeling via FastAPI backend.
                Provides personalized student profiles and predictions with ~10-50ms response time.
              </p>
            </div>
          </div>

          <p>
            If the Neural BKT backend is unavailable, the system automatically falls back to Local BKT,
            ensuring you always have accurate mastery tracking.
          </p>
        </div>

        <div class="theory-card">
          <h3>Real-time Performance Prediction</h3>
          <p>
            Beyond just tracking mastery, the Neural BKT system can predict your probability of answering
            future questions correctly and recommend optimal difficulty levels—ensuring you're always
            challenged without being overwhelmed.
          </p>
        </div>

        <div class="theory-card">
          <h3>Data Privacy</h3>
          <p>
            Your learning data is stored securely and used only to improve your personal learning experience.
            Aggregate, anonymized data may inform system improvements, but individual performance is never
            shared without consent.
          </p>
        </div>
      </section>

      <!-- How It Helps You Learn -->
      <section class="benefits-section">
        <h2>How This Helps You Learn</h2>

        <div class="benefit-card">
          <h3>Personalized Learning Paths</h3>
          <p>
            No two students learn exactly the same way. By modeling your unique learning profile, the
            system can recommend which topics need more practice and which you've truly mastered.
          </p>
        </div>

        <div class="benefit-card">
          <h3>Evidence-Based Mastery</h3>
          <p>
            Your progress isn't based on arbitrary point thresholds. The BKT model requires consistent
            demonstration of knowledge across multiple questions at varying difficulty levels, ensuring
            genuine understanding rather than lucky guessing.
          </p>
        </div>

        <div class="benefit-card">
          <h3>Adaptive Difficulty</h3>
          <p>
            Questions are difficulty-rated (easy, medium, hard), and the system adjusts its interpretation
            based on what you answer. This means you get credit for harder questions and aren't penalized
            excessively for minor slips on easy ones.
          </p>
        </div>

        <div class="benefit-card">
          <h3>Transparent Progress Tracking</h3>
          <p>
            You can see your mastery percentage for each learning objective in real-time. This clarity
            helps you focus your study time on areas that need attention and builds confidence as you
            watch your knowledge grow.
          </p>
        </div>
      </section>

      <!-- References -->
      <section class="references-section">
        <h2>Academic References</h2>

        <div class="references">
          <h4>Bayesian Knowledge Tracing</h4>
          <ul class="reference-list">
            <li>
              Corbett, A. T., & Anderson, J. R. (1995). Knowledge tracing: Modeling the acquisition of
              procedural knowledge. <em>User Modeling and User-Adapted Interaction, 4</em>(4), 253-278.
            </li>
            <li>
              Yudelson, M. V., Koedinger, K. R., & Gordon, G. J. (2013). Individualized Bayesian knowledge
              tracing models. In <em>International Conference on Artificial Intelligence in Education</em>
              (pp. 171-180). Springer.
            </li>
          </ul>

          <h4>Item Response Theory</h4>
          <ul class="reference-list">
            <li>
              Embretson, S. E., & Reise, S. P. (2000). <em>Item response theory for psychologists</em>.
              Lawrence Erlbaum Associates.
            </li>
            <li>
              Baker, F. B., & Kim, S. H. (2004). <em>Item response theory: Parameter estimation techniques</em>.
              CRC Press.
            </li>
          </ul>

          <h4>Adaptive Learning Systems</h4>
          <ul class="reference-list">
            <li>
              VanLehn, K. (2011). The relative effectiveness of human tutoring, intelligent tutoring systems,
              and other tutoring systems. <em>Educational Psychologist, 46</em>(4), 197-221.
            </li>
            <li>
              Khajah, M., Lindsey, R. V., & Mozer, M. C. (2016). How deep is knowledge tracing?.
              In <em>Proceedings of the 9th International Conference on Educational Data Mining</em> (pp. 94-101).
            </li>
          </ul>
        </div>
      </section>

      <!-- Tech Stack -->
      <section class="tech-section">
        <h2>Technology Stack</h2>

        <div class="tech-grid">
          <div class="tech-item">
            <strong>Frontend</strong>
            <p>Vue.js 3 with Vite</p>
          </div>
          <div class="tech-item">
            <strong>Backend</strong>
            <p>PocketBase + FastAPI</p>
          </div>
          <div class="tech-item">
            <strong>BKT Engine</strong>
            <p>Local JS + Python Neural Network</p>
          </div>
          <div class="tech-item">
            <strong>Deployment</strong>
            <p>Docker containerization</p>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <section class="footer-section">
        <p>
          This platform represents the intersection of cognitive science, educational psychology,
          and modern web technology—all aimed at helping you master statistics and research methods
          through evidence-based, personalized learning.
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
// No reactive state needed for static about page
</script>

<style scoped>
.about-page {
  min-height: 100vh;
  padding: 2rem 1rem;
}

.about-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem;
  position: relative;
  z-index: 1;
}

.about-hero {
  text-align: center;
  margin-bottom: 2rem;
}

.about-logo {
  max-width: 300px;
  width: 100%;
  height: auto;
  margin-bottom: 1rem;
  border-radius: 12px;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  text-align: center;
}

h2 {
  font-size: 2rem;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
  border-bottom: 3px solid var(--primary);
  padding-bottom: 0.5rem;
}

h3 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

h4 {
  font-size: 1.2rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
}

section {
  margin-bottom: 2rem;
}

.intro {
  text-align: center;
  margin-bottom: 3rem;
}

.lead {
  font-size: 1.25rem;
  line-height: 1.7;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
}

.theory-card, .benefit-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--primary);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  border-radius: 0.75rem;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
}

.theory-card:hover, .benefit-card:hover {
  transform: translateX(5px);
  box-shadow: var(--shadow-lg);
  border-left-color: var(--primary-light);
}

.theory-card.highlight {
  background: var(--bg-elevated);
  border-left-width: 5px;
  border-left-color: var(--primary-light);
}

.theory-card p, .benefit-card p {
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.theory-card ul, .benefit-card ul {
  margin-left: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.8;
}

.theory-card li, .benefit-card li {
  margin-bottom: 0.75rem;
  color: var(--text-secondary);
}

.prototypes-table {
  overflow-x: auto;
  margin: 1.5rem 0;
  border-radius: 0.5rem;
  border: 1px solid var(--border);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: var(--bg-card);
}

thead {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: white;
}

th {
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

td {
  padding: 1rem;
  border-bottom: 1px solid var(--border);
  color: var(--text-secondary);
}

tbody tr:hover {
  background: var(--bg-elevated);
}

tbody tr:last-child td {
  border-bottom: none;
}

.note {
  background: var(--warning-bg);
  border-left: 4px solid var(--warning);
  padding: 1rem;
  margin-top: 1.5rem;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.architecture-diagram {
  margin: 1.5rem 0;
  text-align: center;
}

.arch-box {
  background: var(--bg-card);
  border: 2px solid var(--primary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 1rem 0;
}

/* Subtle enhancement for architecture boxes in dark mode */
:root:not([data-theme="light"]) .arch-box {
  box-shadow: 0 0 20px rgba(220, 38, 38, 0.05);
}

.arch-box strong {
  display: block;
  color: var(--primary);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.arch-box p {
  color: var(--text-secondary);
}

.arch-arrow {
  font-size: 1.2rem;
  color: var(--primary-light);
  font-weight: 600;
  margin: 0.5rem 0;
}

.references {
  background: var(--bg-card);
  border: 1px solid var(--border);
  padding: 1.5rem;
  border-radius: 0.75rem;
}

.reference-list {
  list-style: none;
  margin-left: 0;
  padding-left: 0;
}

.reference-list li {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
  color: var(--text-secondary);
}

.reference-list li:before {
  content: "📄";
  position: absolute;
  left: 0;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.tech-item {
  background: var(--bg-card);
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  border: 2px solid var(--border);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.tech-item:hover {
  border-color: var(--primary);
  box-shadow: var(--shadow-lg);
}

.tech-item strong {
  display: block;
  color: var(--primary);
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.tech-item p {
  color: var(--text-secondary);
  margin: 0;
}

.footer-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 2px solid var(--border);
  text-align: center;
}

.footer-section p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-secondary);
  font-style: italic;
}

/* Example Visualizations */
.example-viz {
  background: var(--bg-elevated);
  border: 2px dashed var(--border);
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
}

.example-viz h5 {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 0.5rem;
}

.viz-caption {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-style: italic;
}

/* Example Mastery Distribution */
.mastery-distribution-example {
  display: flex;
  gap: 0.75rem;
  align-items: flex-end;
  height: 180px;
  padding: 1rem 0;
  background: var(--bg-card);
  border-radius: 0.5rem;
  padding: 1rem;
}

.mastery-bucket-example {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.mastery-bar-container-example {
  width: 100%;
  height: 140px;
  display: flex;
  align-items: flex-end;
}

.mastery-bar-example {
  width: 100%;
  min-height: 30px;
  border-radius: 0.375rem 0.375rem 0 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 0.5rem;
}

.mastery-bar-example.not-mastered {
  background: linear-gradient(180deg, #fca5a5 0%, #ef4444 100%);
}

.mastery-bar-example.developing {
  background: linear-gradient(180deg, #fde047 0%, #eab308 100%);
}

.mastery-bar-example.proficient {
  background: linear-gradient(180deg, #93c5fd 0%, #3b82f6 100%);
}

.mastery-bar-example.mastered {
  background: linear-gradient(180deg, #86efac 0%, #10b981 100%);
}

.mastery-count-example {
  font-weight: 700;
  font-size: 1rem;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.mastery-label-example {
  font-size: 0.7rem;
  color: var(--text-secondary);
  font-weight: 500;
  text-align: center;
}

/* Example Learning Parameters */
.parameters-example {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: var(--bg-card);
  border-radius: 0.5rem;
  padding: 1rem;
}

.parameter-item-example {
  display: grid;
  grid-template-columns: 120px 1fr 50px;
  gap: 0.75rem;
  align-items: center;
}

.parameter-label-example {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.parameter-name-example {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--text-primary);
}

.parameter-desc-example {
  font-size: 0.65rem;
  color: var(--text-secondary);
}

.parameter-bar-bg-example {
  height: 20px;
  background: #e5e7eb;
  border-radius: 999px;
  overflow: hidden;
}

.parameter-bar-example {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 999px;
  transition: width 0.5s ease;
}

.parameter-bar-example.learning-rate {
  background: linear-gradient(90deg, #8b5cf6 0%, #7c3aed 100%);
}

.parameter-bar-example.guess {
  background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%);
}

.parameter-bar-example.slip {
  background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%);
}

.parameter-value-example {
  font-weight: 600;
  font-size: 0.8rem;
  color: var(--text-primary);
  text-align: right;
}

/* Responsive design */
@media (max-width: 768px) {
  .about-container {
    padding: 2rem 1.5rem;
  }

  .about-logo {
    max-width: 220px;
  }

  h1 {
    font-size: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  .lead {
    font-size: 1.1rem;
  }

  table {
    font-size: 0.9rem;
  }

  th, td {
    padding: 0.75rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .about-container {
    padding: 1.5rem 1rem;
  }

  h1 {
    font-size: 1.75rem;
  }

  .tech-grid {
    grid-template-columns: 1fr;
  }
}
</style>
