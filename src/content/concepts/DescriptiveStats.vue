<template>
  <div class="concept">
    <p>
      Descriptive statistics help us summarize and describe the main features of a dataset.
      In psychology research, we use these measures to understand our participants' scores,
      responses, and behaviors.
    </p>

    <h3>Measures of Central Tendency</h3>
    <p>These tell us about the "typical" or "average" value in our data:</p>

    <ul>
      <li>
        <strong>Mean (M or x̄):</strong> The arithmetic average. Add all scores and divide by the number of scores.
        <div class="formula">M = Σx / n</div>
      </li>
      <li>
        <strong>Median (Mdn):</strong> The middle value when scores are arranged in order.
        Best used when data has outliers.
      </li>
      <li>
        <strong>Mode:</strong> The most frequently occurring value. Useful for categorical data.
      </li>
    </ul>

    <div class="tip">
      <div class="tip-title">When to use which?</div>
      <p>
        Use the <strong>mean</strong> when data is normally distributed without extreme outliers.<br>
        Use the <strong>median</strong> when data is skewed or has outliers (e.g., income, reaction times).<br>
        Use the <strong>mode</strong> for categorical variables (e.g., favorite color, diagnosis type).
      </p>
    </div>

    <h3>Measures of Variability</h3>
    <p>These tell us how spread out our data is:</p>

    <ul>
      <li>
        <strong>Range:</strong> The difference between the highest and lowest scores.
        <div class="formula">Range = Maximum - Minimum</div>
      </li>
      <li>
        <strong>Variance (s² or σ²):</strong> The average of the squared deviations from the mean.
        <div class="formula">s² = Σ(x - M)² / (n - 1)</div>
      </li>
      <li>
        <strong>Standard Deviation (SD or s):</strong> The square root of the variance.
        This is in the same units as your original data.
        <div class="formula">s = √[Σ(x - M)² / (n - 1)]</div>
      </li>
    </ul>

    <div class="note">
      <div class="note-title">Why n-1?</div>
      <p>
        When calculating variance and SD for a sample (not a population), we divide by n-1
        instead of n. This is called <strong>Bessel's correction</strong> and gives us a
        better estimate of the population variance.
      </p>
    </div>

    <h3>Example: Anxiety Scores</h3>
    <p>
      Suppose we collected anxiety scores from 5 participants: <strong>12, 15, 18, 22, 23</strong>
    </p>
    <ul>
      <li><strong>Mean:</strong> (12 + 15 + 18 + 22 + 23) / 5 = 90 / 5 = <strong>18</strong></li>
      <li><strong>Median:</strong> Middle value = <strong>18</strong></li>
      <li><strong>Range:</strong> 23 - 12 = <strong>11</strong></li>
      <li><strong>Variance:</strong> [(12-18)² + (15-18)² + (18-18)² + (22-18)² + (23-18)²] / 4 = [36 + 9 + 0 + 16 + 25] / 4 = <strong>21.5</strong></li>
      <li><strong>SD:</strong> √21.5 = <strong>4.64</strong></li>
    </ul>
  </div>
</template>
