<template>
  <div class="concept">
    <p>
      Probability forms the foundation of statistical inference. Understanding probability
      helps you interpret p-values, confidence intervals, and make informed decisions
      about research hypotheses.
    </p>

    <h3>Basic Probability Concepts</h3>
    <p>
      <strong>Probability (P)</strong> is a number between 0 and 1 that represents
      the likelihood of an event occurring:
    </p>
    <ul>
      <li><strong>P = 0:</strong> Event is impossible</li>
      <li><strong>P = 1:</strong> Event is certain</li>
      <li><strong>P = 0.5:</strong> Event has a 50% chance (like a coin flip)</li>
    </ul>

    <div class="formula">P(A) = Number of favorable outcomes / Total number of possible outcomes</div>

    <h3>Types of Probability</h3>
    <ul>
      <li>
        <strong>Theoretical probability:</strong> Based on known possible outcomes
        (e.g., probability of rolling a 6 on a fair die = 1/6)
      </li>
      <li>
        <strong>Empirical probability:</strong> Based on observed data
        (e.g., 30 out of 100 participants chose option A → P = 0.30)
      </li>
      <li>
        <strong>Subjective probability:</strong> Based on personal judgment or expertise
      </li>
    </ul>

    <h3>Probability Rules</h3>

    <h4>Addition Rule (OR)</h4>
    <p>For mutually exclusive events (can't both happen):</p>
    <div class="formula">P(A or B) = P(A) + P(B)</div>

    <p>For non-mutually exclusive events:</p>
    <div class="formula">P(A or B) = P(A) + P(B) - P(A and B)</div>

    <h4>Multiplication Rule (AND)</h4>
    <p>For independent events:</p>
    <div class="formula">P(A and B) = P(A) × P(B)</div>

    <div class="note">
      <div class="note-title">Example</div>
      <p>
        If you flip two coins, what's the probability of getting two heads?<br>
        P(H on first) = 0.5<br>
        P(H on second) = 0.5<br>
        P(two heads) = 0.5 × 0.5 = 0.25
      </p>
    </div>

    <h3>Conditional Probability</h3>
    <p>
      The probability of A given that B has occurred:
    </p>
    <div class="formula">P(A | B) = P(A and B) / P(B)</div>

    <h3>Probability Distributions</h3>
    <p>
      A probability distribution describes all possible values and their probabilities:
    </p>
    <ul>
      <li>
        <strong>Discrete distributions:</strong> For countable outcomes
        (binomial, Poisson)
      </li>
      <li>
        <strong>Continuous distributions:</strong> For measurable outcomes
        (normal, t, F, chi-square)
      </li>
    </ul>

    <h3>Probability and the Normal Distribution</h3>
    <p>
      For a normal distribution, we can find probabilities using z-scores:
    </p>
    <ul>
      <li>P(z < 1.96) = 0.975 (97.5% of scores are below z = 1.96)</li>
      <li>P(z > 1.96) = 0.025 (2.5% of scores are above z = 1.96)</li>
      <li>P(-1.96 < z < 1.96) = 0.95 (95% of scores fall within ±1.96 SD)</li>
    </ul>

    <div class="tip">
      <div class="tip-title">Why 1.96?</div>
      <p>
        The value 1.96 is critical because it defines the boundaries for the middle
        95% of a normal distribution. This is why we use it for 95% confidence
        intervals and α = .05 significance testing.
      </p>
    </div>

    <h3>Connection to Statistics</h3>
    <p>
      Understanding probability helps you interpret:
    </p>
    <ul>
      <li><strong>P-values:</strong> The probability of getting your result (or more extreme) if the null hypothesis is true</li>
      <li><strong>Confidence intervals:</strong> A range that has a specified probability of containing the true parameter</li>
      <li><strong>Statistical power:</strong> The probability of correctly rejecting a false null hypothesis</li>
    </ul>
  </div>
</template>
