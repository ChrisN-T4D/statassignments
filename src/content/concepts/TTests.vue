<template>
  <div class="concept">
    <p>
      T-tests are used to compare means. They're among the most common statistical
      tests in psychology, used when you want to know if two groups differ or if
      a group differs from a known value.
    </p>

    <h3>Types of T-Tests</h3>

    <h4>One-Sample T-Test</h4>
    <p>
      Compares a sample mean to a known or hypothesized population value.
    </p>
    <ul>
      <li><strong>Example:</strong> Does our sample of students have an IQ different from 100?</li>
      <li><strong>H₀:</strong> μ = μ₀ (the population mean equals the test value)</li>
    </ul>
    <div class="formula">t = (M - μ₀) / (s / √n)</div>

    <h4>Independent Samples T-Test</h4>
    <p>
      Compares means from two separate (independent) groups.
    </p>
    <ul>
      <li><strong>Example:</strong> Do participants in the treatment group have lower anxiety than the control group?</li>
      <li><strong>H₀:</strong> μ₁ = μ₂ (the two population means are equal)</li>
    </ul>
    <div class="formula">t = (M₁ - M₂) / SE</div>

    <h4>Paired Samples T-Test (Dependent T-Test)</h4>
    <p>
      Compares means from the same group at two different times or under two conditions.
    </p>
    <ul>
      <li><strong>Example:</strong> Did participants' depression scores decrease from pre-treatment to post-treatment?</li>
      <li><strong>H₀:</strong> μD = 0 (the mean difference equals zero)</li>
    </ul>
    <div class="formula">t = M_D / (s_D / √n)</div>

    <div class="note">
      <div class="note-title">Choosing the Right T-Test</div>
      <p>
        Ask yourself: Are the same people measured twice (or matched)? <br>
        <strong>Yes → Paired samples t-test</strong><br>
        <strong>No → Independent samples t-test</strong>
      </p>
    </div>

    <h3>Assumptions of T-Tests</h3>
    <ol>
      <li><strong>Independence:</strong> Observations are independent of each other</li>
      <li><strong>Normality:</strong> Data is approximately normally distributed (less important with n > 30)</li>
      <li><strong>Homogeneity of variance:</strong> (For independent t-test) Both groups have similar variances</li>
    </ol>

    <div class="tip">
      <div class="tip-title">Checking Assumptions</div>
      <p>
        <strong>Normality:</strong> Use histograms, Q-Q plots, or Shapiro-Wilk test<br>
        <strong>Equal variances:</strong> Use Levene's test. If violated, use Welch's t-test.
      </p>
    </div>

    <h3>Degrees of Freedom</h3>
    <p>
      Degrees of freedom (df) affect the shape of the t-distribution:
    </p>
    <ul>
      <li><strong>One-sample:</strong> df = n - 1</li>
      <li><strong>Independent samples:</strong> df = n₁ + n₂ - 2</li>
      <li><strong>Paired samples:</strong> df = n - 1 (where n = number of pairs)</li>
    </ul>

    <h3>Effect Size: Cohen's d</h3>
    <p>
      Cohen's d tells you the magnitude of the difference in standard deviation units:
    </p>
    <div class="formula">d = (M₁ - M₂) / s_pooled</div>
    <p>Interpretation guidelines:</p>
    <ul>
      <li><strong>d = 0.2:</strong> Small effect</li>
      <li><strong>d = 0.5:</strong> Medium effect</li>
      <li><strong>d = 0.8:</strong> Large effect</li>
    </ul>

    <h3>Reporting T-Test Results (APA Style)</h3>
    <p>Include: t-value, degrees of freedom, p-value, effect size, and descriptive statistics.</p>
    <div class="note">
      <div class="note-title">Example Write-Up</div>
      <p>
        An independent samples t-test revealed that the treatment group (M = 15.2, SD = 3.1)
        reported significantly lower anxiety than the control group (M = 22.8, SD = 4.2),
        t(58) = -4.52, p < .001, d = 1.17.
      </p>
    </div>

    <h3>When T-Tests Don't Work</h3>
    <p>Use alternatives when assumptions are violated:</p>
    <ul>
      <li><strong>Non-normal data:</strong> Mann-Whitney U (independent) or Wilcoxon signed-rank (paired)</li>
      <li><strong>More than 2 groups:</strong> Use ANOVA instead</li>
      <li><strong>Unequal variances:</strong> Use Welch's t-test</li>
    </ul>
  </div>
</template>
