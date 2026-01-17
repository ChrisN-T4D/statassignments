<template>
  <div class="concept">
    <p>
      A z-score (also called a standard score) tells you how many standard deviations
      a raw score is from the mean. Z-scores allow you to compare scores from different
      distributions and calculate probabilities.
    </p>

    <h3>The Z-Score Formula</h3>
    <div class="formula">z = (X - μ) / σ</div>
    <p>Where:</p>
    <ul>
      <li><strong>X</strong> = the raw score</li>
      <li><strong>μ (mu)</strong> = the population mean</li>
      <li><strong>σ (sigma)</strong> = the population standard deviation</li>
    </ul>

    <p>For samples, we use:</p>
    <div class="formula">z = (X - M) / s</div>

    <h3>Interpreting Z-Scores</h3>
    <ul>
      <li><strong>z = 0:</strong> Score is exactly at the mean</li>
      <li><strong>z = +1:</strong> Score is 1 SD above the mean</li>
      <li><strong>z = -1:</strong> Score is 1 SD below the mean</li>
      <li><strong>z = +2:</strong> Score is 2 SD above the mean (unusual)</li>
      <li><strong>z = -2:</strong> Score is 2 SD below the mean (unusual)</li>
    </ul>

    <div class="note">
      <div class="note-title">Rule of Thumb</div>
      <p>
        Z-scores beyond ±2 are considered unusual (only ~5% of data).<br>
        Z-scores beyond ±3 are considered very rare (only ~0.3% of data).
      </p>
    </div>

    <h3>Example: Exam Scores</h3>
    <p>
      A psychology exam has M = 75 and s = 10. A student scored 90.
    </p>
    <div class="formula">z = (90 - 75) / 10 = 15 / 10 = +1.5</div>
    <p>
      This student scored 1.5 standard deviations above the mean.
    </p>

    <h3>Using Z-Scores to Compare Across Tests</h3>
    <p>
      Z-scores let you compare performance on different tests. For example:
    </p>
    <ul>
      <li>Statistics exam: Score = 82, M = 75, s = 10 → z = +0.70</li>
      <li>Research Methods exam: Score = 88, M = 80, s = 5 → z = +1.60</li>
    </ul>
    <p>
      Even though 88 > 82, the Research Methods performance (z = +1.60) was
      relatively better than Statistics (z = +0.70).
    </p>

    <h3>Z-Scores and Probability</h3>
    <p>
      For normally distributed data, z-scores correspond to specific percentiles.
      Using a z-table or software, you can find:
    </p>
    <ul>
      <li>What percentage of scores fall below a given score</li>
      <li>What percentage of scores fall above a given score</li>
      <li>What percentage of scores fall between two values</li>
    </ul>

    <div class="tip">
      <div class="tip-title">Common Z-Score to Percentile Conversions</div>
      <p>
        z = -2.00 → 2.28th percentile<br>
        z = -1.00 → 15.87th percentile<br>
        z = 0.00 → 50th percentile<br>
        z = +1.00 → 84.13th percentile<br>
        z = +2.00 → 97.72nd percentile
      </p>
    </div>

    <h3>The Standard Normal Distribution</h3>
    <p>
      When we convert all scores to z-scores, we get the <strong>standard normal distribution</strong>:
    </p>
    <ul>
      <li>Mean = 0</li>
      <li>Standard deviation = 1</li>
    </ul>
    <p>
      This allows us to use standardized tables and compare any normal distribution
      to a single reference distribution.
    </p>
  </div>
</template>
