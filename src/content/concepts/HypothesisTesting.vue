<template>
  <div class="concept">
    <p>
      Hypothesis testing is a formal procedure for using sample data to evaluate
      claims about a population. It's the backbone of quantitative research in psychology.
    </p>

    <h3>The Logic of Hypothesis Testing</h3>
    <ol class="steps">
      <li>Assume the null hypothesis is true (nothing is happening)</li>
      <li>Collect data from your sample</li>
      <li>Calculate the probability of getting your results if the null is true</li>
      <li>If that probability is very low, reject the null hypothesis</li>
    </ol>

    <h3>The Two Hypotheses</h3>
    <ul>
      <li>
        <strong>Null Hypothesis (H₀):</strong> The "nothing special" hypothesis.
        States there's no effect, no difference, or no relationship.
        <br><em>Example: There is no difference in anxiety between the treatment and control groups.</em>
      </li>
      <li>
        <strong>Alternative Hypothesis (H₁ or Hₐ):</strong> What you're trying to support.
        States there IS an effect, difference, or relationship.
        <br><em>Example: The treatment group has lower anxiety than the control group.</em>
      </li>
    </ul>

    <h3>One-Tailed vs. Two-Tailed Tests</h3>
    <ul>
      <li>
        <strong>Two-tailed:</strong> Tests for any difference (greater OR less than)
        <br>H₁: μ₁ ≠ μ₂
      </li>
      <li>
        <strong>One-tailed:</strong> Tests for a specific direction
        <br>H₁: μ₁ > μ₂ or H₁: μ₁ < μ₂
      </li>
    </ul>

    <div class="note">
      <div class="note-title">When to Use Each</div>
      <p>
        Use <strong>two-tailed</strong> tests unless you have a strong theoretical
        reason to predict a specific direction BEFORE collecting data.
        Two-tailed is more conservative and more commonly accepted.
      </p>
    </div>

    <h3>Key Terms</h3>

    <h4>Alpha Level (α)</h4>
    <p>
      The threshold for statistical significance. Conventionally set at .05 (5%).
      This means we're willing to accept a 5% chance of incorrectly rejecting the null.
    </p>

    <h4>P-Value</h4>
    <p>
      The probability of obtaining results at least as extreme as yours, assuming
      the null hypothesis is true.
    </p>
    <ul>
      <li>If p ≤ α (usually .05): Reject H₀, result is "statistically significant"</li>
      <li>If p > α: Fail to reject H₀, result is "not statistically significant"</li>
    </ul>

    <div class="tip">
      <div class="tip-title">Interpreting P-Values</div>
      <p>
        A p-value is NOT the probability that the null hypothesis is true.<br>
        A p-value is NOT the probability that your results are due to chance.<br>
        A p-value IS the probability of your data (or more extreme) given H₀ is true.
      </p>
    </div>

    <h3>Types of Errors</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
      <tr>
        <th style="border: 1px solid var(--border); padding: 0.5rem;"></th>
        <th style="border: 1px solid var(--border); padding: 0.5rem;">H₀ is True</th>
        <th style="border: 1px solid var(--border); padding: 0.5rem;">H₀ is False</th>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;"><strong>Reject H₀</strong></td>
        <td style="border: 1px solid var(--border); padding: 0.5rem; background: #fef2f2;">Type I Error (α)<br>False Positive</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem; background: #ecfdf5;">Correct Decision<br>(Power = 1 - β)</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;"><strong>Fail to Reject H₀</strong></td>
        <td style="border: 1px solid var(--border); padding: 0.5rem; background: #ecfdf5;">Correct Decision</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem; background: #fef2f2;">Type II Error (β)<br>False Negative</td>
      </tr>
    </table>

    <h3>Statistical Power</h3>
    <p>
      <strong>Power</strong> is the probability of correctly rejecting a false null hypothesis.
      Power = 1 - β. Ideally, power should be at least .80 (80%).
    </p>
    <p>Power is affected by:</p>
    <ul>
      <li><strong>Sample size:</strong> Larger n → more power</li>
      <li><strong>Effect size:</strong> Larger effects are easier to detect</li>
      <li><strong>Alpha level:</strong> Larger α → more power (but more Type I errors)</li>
      <li><strong>Variability:</strong> Less variability → more power</li>
    </ul>

    <h3>Effect Size</h3>
    <p>
      While p-values tell you IF an effect exists, <strong>effect size</strong>
      tells you HOW BIG the effect is. Common measures include:
    </p>
    <ul>
      <li><strong>Cohen's d:</strong> For comparing two means</li>
      <li><strong>r:</strong> For correlations</li>
      <li><strong>η² (eta-squared):</strong> For ANOVA</li>
    </ul>
  </div>
</template>
