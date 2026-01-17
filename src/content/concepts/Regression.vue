<template>
  <div class="concept">
    <p>
      Simple linear regression allows you to predict one variable from another.
      While correlation tells you IF and HOW STRONGLY two variables are related,
      regression tells you HOW to predict one from the other.
    </p>

    <h3>The Regression Equation</h3>
    <div class="formula">Ŷ = a + bX</div>
    <p>Where:</p>
    <ul>
      <li><strong>Ŷ (Y-hat):</strong> The predicted value of Y</li>
      <li><strong>a (intercept):</strong> The value of Y when X = 0</li>
      <li><strong>b (slope):</strong> How much Y changes for each 1-unit increase in X</li>
      <li><strong>X:</strong> The predictor variable</li>
    </ul>

    <div class="note">
      <div class="note-title">Example</div>
      <p>
        Predicting exam scores from study hours:<br>
        <strong>Ŷ = 50 + 5X</strong><br><br>
        Interpretation:<br>
        • A student who studies 0 hours is predicted to score 50<br>
        • Each additional hour of studying predicts a 5-point increase<br>
        • A student who studies 10 hours: Ŷ = 50 + 5(10) = 100 points
      </p>
    </div>

    <h3>Key Concepts</h3>

    <h4>Predictor and Outcome Variables</h4>
    <ul>
      <li><strong>X (Predictor/Independent variable):</strong> The variable you use to make predictions</li>
      <li><strong>Y (Outcome/Dependent variable):</strong> The variable you're trying to predict</li>
    </ul>

    <h4>Residuals</h4>
    <p>
      The difference between the actual Y and the predicted Ŷ:
    </p>
    <div class="formula">Residual = Y - Ŷ</div>
    <p>
      Regression finds the line that minimizes the sum of squared residuals (least squares method).
    </p>

    <h3>R² (Coefficient of Determination)</h3>
    <p>
      R² tells you the proportion of variance in Y that is explained by X.
    </p>
    <ul>
      <li>R² = .25 → X explains 25% of the variance in Y</li>
      <li>R² = .64 → X explains 64% of the variance in Y</li>
    </ul>
    <p>
      In simple regression, R² = r² (the squared correlation coefficient).
    </p>

    <h3>Testing Significance</h3>
    <p>We test two things:</p>
    <ol>
      <li>
        <strong>Overall model:</strong> Does X significantly predict Y?
        <br>Uses an F-test
      </li>
      <li>
        <strong>Slope (b):</strong> Is the slope significantly different from zero?
        <br>Uses a t-test
      </li>
    </ol>

    <div class="tip">
      <div class="tip-title">In Simple Regression</div>
      <p>
        The t-test for the slope and the F-test for the overall model will give
        you the same p-value. This is because with only one predictor, testing
        the model IS testing that predictor.
      </p>
    </div>

    <h3>Assumptions of Regression</h3>
    <ol>
      <li><strong>Linearity:</strong> The relationship between X and Y is linear</li>
      <li><strong>Independence:</strong> Observations are independent</li>
      <li><strong>Normality:</strong> Residuals are normally distributed</li>
      <li><strong>Homoscedasticity:</strong> Residuals have constant variance across all levels of X</li>
    </ol>

    <h3>Checking Assumptions</h3>
    <ul>
      <li><strong>Scatter plot:</strong> Check for linearity and outliers</li>
      <li><strong>Residual plot:</strong> Check for patterns (should be random)</li>
      <li><strong>Histogram of residuals:</strong> Check for normality</li>
    </ul>

    <h3>Standardized Regression Coefficient (β)</h3>
    <p>
      The standardized coefficient (beta, β) is measured in standard deviation units.
      In simple regression, β = r (the correlation coefficient).
    </p>

    <h3>Reporting Regression Results (APA Style)</h3>
    <div class="note">
      <div class="note-title">Example Write-Up</div>
      <p>
        A simple linear regression was conducted to predict exam performance from
        study hours. The regression model was significant, F(1, 48) = 28.34, p < .001,
        R² = .37. Study hours significantly predicted exam scores, b = 4.82, t(48) = 5.32,
        p < .001. For each additional hour of studying, exam scores increased by
        approximately 5 points.
      </p>
    </div>

    <h3>Regression vs. Correlation</h3>
    <table style="width: 100%; border-collapse: collapse; margin: 1rem 0;">
      <tr>
        <th style="border: 1px solid var(--border); padding: 0.5rem;">Correlation</th>
        <th style="border: 1px solid var(--border); padding: 0.5rem;">Regression</th>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Measures strength of relationship</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Predicts one variable from another</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">No distinction between X and Y</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">X predicts Y (direction matters)</td>
      </tr>
      <tr>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Gives r</td>
        <td style="border: 1px solid var(--border); padding: 0.5rem;">Gives equation (Ŷ = a + bX)</td>
      </tr>
    </table>
  </div>
</template>
