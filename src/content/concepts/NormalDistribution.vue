<template>
  <div class="concept">
    <p>
      The normal distribution (also called the Gaussian distribution or "bell curve") is
      fundamental to statistics and psychological research. Many psychological variables—such
      as IQ, personality traits, and reaction times—approximately follow this distribution.
    </p>

    <h3>Properties of the Normal Distribution</h3>
    <ul>
      <li><strong>Symmetric:</strong> The left and right halves are mirror images</li>
      <li><strong>Unimodal:</strong> There's one peak at the center</li>
      <li><strong>Mean = Median = Mode:</strong> All three are at the center</li>
      <li><strong>Asymptotic:</strong> The tails approach but never touch the x-axis</li>
    </ul>

    <h3>The Empirical Rule (68-95-99.7 Rule)</h3>
    <p>For any normal distribution:</p>
    <ul>
      <li><strong>68%</strong> of data falls within 1 standard deviation of the mean</li>
      <li><strong>95%</strong> of data falls within 2 standard deviations of the mean</li>
      <li><strong>99.7%</strong> of data falls within 3 standard deviations of the mean</li>
    </ul>

    <div class="note">
      <div class="note-title">Example: IQ Scores</div>
      <p>
        IQ has a mean of 100 and SD of 15.<br>
        <strong>68%</strong> of people score between 85-115<br>
        <strong>95%</strong> of people score between 70-130<br>
        <strong>99.7%</strong> of people score between 55-145
      </p>
    </div>

    <h3>Why Does the Normal Distribution Matter?</h3>
    <ol>
      <li>
        <strong>Central Limit Theorem:</strong> Sample means tend to be normally distributed,
        even if the original data isn't.
      </li>
      <li>
        <strong>Statistical Tests:</strong> Many tests (t-tests, ANOVA, regression) assume
        normally distributed data or residuals.
      </li>
      <li>
        <strong>Probability:</strong> We can calculate the probability of obtaining specific
        scores or ranges of scores.
      </li>
    </ol>

    <h3>Checking for Normality</h3>
    <p>Before running parametric tests, check if your data is approximately normal:</p>
    <ul>
      <li><strong>Visual inspection:</strong> Histogram, Q-Q plot</li>
      <li><strong>Skewness and kurtosis:</strong> Should be close to 0</li>
      <li><strong>Statistical tests:</strong> Shapiro-Wilk test, Kolmogorov-Smirnov test</li>
    </ul>

    <div class="tip">
      <div class="tip-title">When Data Isn't Normal</div>
      <p>
        If your data is significantly non-normal, you can:<br>
        1. Transform the data (log, square root)<br>
        2. Use non-parametric tests (Mann-Whitney, Wilcoxon)<br>
        3. Use robust statistical methods
      </p>
    </div>

    <h3>Skewness</h3>
    <p>Describes the asymmetry of a distribution:</p>
    <ul>
      <li><strong>Positive skew (right-skewed):</strong> Tail extends to the right; mean > median</li>
      <li><strong>Negative skew (left-skewed):</strong> Tail extends to the left; mean < median</li>
      <li><strong>Normal:</strong> Skewness ≈ 0</li>
    </ul>

    <h3>Kurtosis</h3>
    <p>Describes the "tailedness" of a distribution:</p>
    <ul>
      <li><strong>Leptokurtic:</strong> Heavy tails, sharp peak (kurtosis > 0)</li>
      <li><strong>Platykurtic:</strong> Light tails, flat peak (kurtosis < 0)</li>
      <li><strong>Mesokurtic:</strong> Normal distribution (kurtosis ≈ 0)</li>
    </ul>
  </div>
</template>
