<template>
  <div class="software-instructions">
    <h3>Calculating Descriptive Statistics in SPSS</h3>

    <h4>Method 1: Descriptives</h4>
    <p>Best for quick mean, SD, min, max.</p>
    <ol class="steps">
      <li>Go to <strong>Analyze → Descriptive Statistics → Descriptives...</strong></li>
      <li>Move your variable(s) to the <strong>Variable(s)</strong> box</li>
      <li>Click <strong>Options...</strong> to select statistics (mean, SD, variance, range, min, max)</li>
      <li>Click <strong>Continue</strong>, then <strong>OK</strong></li>
    </ol>

    <h4>Method 2: Frequencies</h4>
    <p>Best for median, mode, percentiles, and frequency tables.</p>
    <ol class="steps">
      <li>Go to <strong>Analyze → Descriptive Statistics → Frequencies...</strong></li>
      <li>Move your variable(s) to the <strong>Variable(s)</strong> box</li>
      <li>Click <strong>Statistics...</strong></li>
      <li>Check the statistics you want:
        <ul>
          <li>Central Tendency: Mean, Median, Mode</li>
          <li>Dispersion: Std. deviation, Variance, Range</li>
          <li>Percentiles: Quartiles, or specific percentile values</li>
        </ul>
      </li>
      <li>Click <strong>Continue</strong>, then <strong>OK</strong></li>
    </ol>

    <h4>Method 3: Explore</h4>
    <p>Best for detailed descriptives plus normality tests and plots.</p>
    <ol class="steps">
      <li>Go to <strong>Analyze → Descriptive Statistics → Explore...</strong></li>
      <li>Move your dependent variable to <strong>Dependent List</strong></li>
      <li>Optionally add a grouping variable to <strong>Factor List</strong></li>
      <li>Click <strong>Statistics...</strong> and check <strong>Descriptives</strong></li>
      <li>Click <strong>Continue</strong>, then <strong>OK</strong></li>
    </ol>

    <div class="tip">
      <div class="tip-title">Pro Tip</div>
      <p>
        Use <strong>Explore</strong> when you want to check normality assumptions
        before running t-tests or ANOVA. It gives you histograms, stem-and-leaf plots,
        and Shapiro-Wilk tests all at once.
      </p>
    </div>

    <h4>Reading the Output</h4>
    <p>SPSS output will show a table with:</p>
    <ul>
      <li><strong>N:</strong> Number of valid cases</li>
      <li><strong>Mean:</strong> Arithmetic average</li>
      <li><strong>Std. Deviation:</strong> Standard deviation (uses n-1)</li>
      <li><strong>Variance:</strong> SD squared</li>
      <li><strong>Minimum/Maximum:</strong> Lowest and highest values</li>
    </ul>

    <div class="code-block">
      <code>Descriptive Statistics
                    N    Minimum  Maximum   Mean    Std. Deviation
Anxiety_Score      50      12       45     28.50        8.234
Valid N (listwise) 50</code>
    </div>
  </div>
</template>
