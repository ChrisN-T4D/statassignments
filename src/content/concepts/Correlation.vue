<template>
  <div class="concept">
    <p>
      Correlation measures the strength and direction of the relationship between
      two variables. It's one of the most common analyses in psychology research.
    </p>

    <h3>Understanding Correlation</h3>
    <p>
      A correlation coefficient (r) ranges from -1 to +1:
    </p>
    <ul>
      <li><strong>r = +1:</strong> Perfect positive relationship</li>
      <li><strong>r = 0:</strong> No linear relationship</li>
      <li><strong>r = -1:</strong> Perfect negative relationship</li>
    </ul>

    <h4>Direction</h4>
    <ul>
      <li><strong>Positive correlation:</strong> As X increases, Y increases (e.g., height and weight)</li>
      <li><strong>Negative correlation:</strong> As X increases, Y decreases (e.g., stress and immune function)</li>
    </ul>

    <h4>Strength (Cohen's Guidelines)</h4>
    <ul>
      <li><strong>|r| = .10 - .29:</strong> Small/weak</li>
      <li><strong>|r| = .30 - .49:</strong> Medium/moderate</li>
      <li><strong>|r| = .50 - 1.0:</strong> Large/strong</li>
    </ul>

    <div class="note">
      <div class="note-title">Important Reminder</div>
      <p>
        <strong>Correlation does not imply causation!</strong><br>
        Just because two variables are correlated doesn't mean one causes the other.
        There could be a third variable causing both, or the relationship could be coincidental.
      </p>
    </div>

    <h3>Pearson Correlation (r)</h3>
    <p>
      The most common correlation coefficient. Used when:
    </p>
    <ul>
      <li>Both variables are continuous</li>
      <li>The relationship is linear</li>
      <li>Data is approximately normally distributed</li>
    </ul>
    <div class="formula">r = Σ[(X - M_X)(Y - M_Y)] / [(n-1) × s_X × s_Y]</div>

    <h3>Spearman Correlation (ρ or rs)</h3>
    <p>
      A non-parametric alternative. Used when:
    </p>
    <ul>
      <li>Data is ordinal (ranked)</li>
      <li>The relationship is monotonic but not necessarily linear</li>
      <li>Data is not normally distributed</li>
      <li>There are outliers</li>
    </ul>

    <div class="tip">
      <div class="tip-title">Pearson vs. Spearman</div>
      <p>
        Use <strong>Pearson</strong> when both variables are continuous and normally distributed.<br>
        Use <strong>Spearman</strong> for ordinal data or when Pearson assumptions are violated.
      </p>
    </div>

    <h3>Coefficient of Determination (r²)</h3>
    <p>
      Squaring the correlation coefficient tells you the proportion of variance
      in one variable that can be explained by the other.
    </p>
    <ul>
      <li>r = .50 → r² = .25 → 25% of variance explained</li>
      <li>r = .70 → r² = .49 → 49% of variance explained</li>
    </ul>

    <h3>Testing Significance</h3>
    <p>
      We test whether the correlation is significantly different from zero:
    </p>
    <ul>
      <li><strong>H₀:</strong> ρ = 0 (no correlation in the population)</li>
      <li><strong>H₁:</strong> ρ ≠ 0 (there is a correlation)</li>
    </ul>
    <p>
      Significance depends on both the size of r and the sample size. Small correlations
      can be significant with large samples.
    </p>

    <h3>Assumptions of Pearson Correlation</h3>
    <ol>
      <li><strong>Linearity:</strong> The relationship should be linear (check with scatter plot)</li>
      <li><strong>Normality:</strong> Both variables should be approximately normal</li>
      <li><strong>Homoscedasticity:</strong> Variance should be consistent across the range</li>
      <li><strong>No outliers:</strong> Outliers can dramatically affect r</li>
    </ol>

    <h3>Reporting Correlations (APA Style)</h3>
    <div class="note">
      <div class="note-title">Example Write-Up</div>
      <p>
        There was a significant positive correlation between study hours and exam
        performance, r(48) = .62, p < .001. Students who studied more tended to
        score higher on the exam, with study hours explaining 38% of the variance
        in exam scores.
      </p>
    </div>

    <h3>Correlation Matrix</h3>
    <p>
      When examining relationships among multiple variables, use a correlation matrix.
      This shows all pairwise correlations in a table format, making it easy to see
      patterns of relationships.
    </p>
  </div>
</template>
