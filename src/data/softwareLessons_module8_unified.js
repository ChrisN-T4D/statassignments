// Module 8: Advanced Statistical Analysis - Unified Lesson Structure
// One lesson combining all 9 analysis types in a multi-section format

export const module8UnifiedLessons = [
  // ============ JAMOVI - Module 8 Unified Lesson ============
  {
    id: 'jamovi-module-8-unified',
    module: 'stats-module-8',
    title: 'Advanced Statistical Analysis in Jamovi',
    software: 'jamovi',
    objectives: [
      'Perform a chi-square goodness-of-fit test to compare observed frequencies to expected frequencies',
      'Perform a chi-square test of independence to examine relationships between two categorical variables',
      'Perform an independent samples t-test to compare means between two groups',
      'Perform a paired samples t-test for repeated measures or matched pairs',
      'Perform a one-sample t-test to compare a sample mean to a known value',
      'Calculate and interpret Pearson and Spearman correlation coefficients',
      'Perform simple linear regression with one predictor',
      'Perform multiple regression with several predictors',
      'Perform a one-way ANOVA to compare means across three or more groups',
      'Check assumptions for all statistical tests',
      'Calculate and interpret effect sizes for all analyses',
      'Report results in APA format'
    ],
    estimatedTime: 215, // Total: 20+25+25+20+15+20+30+35+25
    phases: {
      // LEARN PHASE - Multiple demonstration sections
      iDo: {
        type: 'multi_section',
        title: 'Learn Advanced Analyses',
        sections: [
          // SECTION 1: Chi-Square Goodness-of-Fit (20 min)
          {
            id: 'chi-square-goodness-of-fit',
            title: 'Chi-Square Goodness-of-Fit Test in Jamovi',
            objectives: [
              'Perform a chi-square goodness-of-fit test to compare observed frequencies to expected frequencies',
              'Interpret the chi-square statistic and p-value',
              'Calculate and interpret effect size (Cramér\'s V)',
              'Check assumptions for chi-square tests'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content: 'The chi-square goodness-of-fit test determines whether observed frequencies in categories match an expected distribution. It answers: "Do my observed data fit the pattern I expected?"'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** A die is rolled 60 times. Does it produce equal frequencies for all six sides (fair die), or is it biased?'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- One **categorical variable** (the categories being counted)\n- **Observed frequencies** (how many times each category occurred)\n- **Expected frequencies** (what you\'d expect if the null hypothesis is true)'
              },
              {
                type: 'text',
                content: '**Step 2: Run the Test**\n\n1. Click **Analyses** → **Frequencies** → **N Outcomes (χ² Goodness of Fit)**\n2. Move your categorical variable to **Variable**\n3. Under **Expected Proportions**, enter what you expect for each category'
              },
              {
                type: 'text',
                content: '**Step 3: Interpret Results**\n\n- **χ² statistic**: Measures how far observed frequencies deviate from expected\n- **p-value**: Is the difference significant?\n  - p < .05: Observed distribution differs significantly from expected\n  - p > .05: Observed fits the expected distribution\n- **Effect size (Cramér\'s V)**: Strength of deviation from expected pattern'
              },
              {
                type: 'callout',
                style: 'warning',
                content: '**Assumptions:**\n- Independence: Each observation counted once\n- Expected frequencies: All expected counts ≥ 5\n- Random sampling'
              }
            ]
          },

          // SECTION 2: Chi-Square Independence (25 min)
          {
            id: 'chi-square-independence',
            title: 'Chi-Square Test of Independence in Jamovi',
            objectives: [
              'Perform a chi-square test of independence to examine relationships between two categorical variables',
              'Create and interpret contingency tables',
              'Calculate and interpret effect size (Cramér\'s V)',
              'Check assumptions and report results'
            ],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content: 'The chi-square test of independence determines whether two categorical variables are related. It answers: "Are these two variables independent, or is there an association between them?"'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** Is there a relationship between gender (Male/Female) and voting preference (Democrat/Republican/Independent)?'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- **Two categorical variables** (e.g., Gender and Voting_Preference)\n- Each row represents one person with their category on both variables'
              },
              {
                type: 'text',
                content: '**Step 2: Create a Contingency Table**\n\n1. Click **Analyses** → **Frequencies** → **Independent Samples (χ² test of association)**\n2. Move one variable to **Rows** (e.g., Gender)\n3. Move the other to **Columns** (e.g., Voting_Preference)\n\nJamovi will create a contingency table showing observed frequencies in each cell.'
              },
              {
                type: 'text',
                content: '**Step 3: Add Statistics**\n\nExpand the **Statistics** section and check:\n- **χ²**: The chi-square test statistic\n- **Cramér\'s V**: Effect size measure\n  - Small: .10, Medium: .30, Large: .50'
              },
              {
                type: 'text',
                content: '**Step 4: Add Cells Display Options**\n\nExpand **Cells** and check:\n- **Expected counts**: What you\'d see if variables were independent\n- **Row percentages** or **Column percentages**: Shows patterns more clearly than raw counts'
              },
              {
                type: 'text',
                content: '**Step 5: Interpret Results**\n\n- **χ² statistic and p-value**: Is the relationship significant?\n  - p < .05: Variables are associated (not independent)\n  - p > .05: No significant association (variables appear independent)\n- **Cramér\'s V**: How strong is the association?\n- **Cell comparisons**: Which combinations occur more/less than expected?'
              },
              {
                type: 'callout',
                style: 'example',
                content: '**Interpreting Results:**\n\n**Voting Example:**\n- χ²(2) = 15.8, p < .001, V = .18\n\n**Pattern:** Males more likely Republican (45% vs 28%), Females more likely Democrat (52% vs 35%).\n\n**Conclusion:** Gender and voting preference are significantly associated, though the effect is small.'
              },
              {
                type: 'callout',
                style: 'warning',
                content: '**Assumptions:**\n- Independence: Each person counted once\n- Expected frequencies: All expected counts ≥ 5 (if violated, consider Fisher\'s exact test)\n- Random sampling'
              }
            ]
          },

          // SECTION 3: Independent T-Test (25 min)
          {
            id: 'independent-t-test',
            title: 'Independent Samples T-Test in Jamovi',
            objectives: [
              'Perform an independent samples t-test to compare means between two groups',
              'Check assumptions (normality, homogeneity of variance)',
              'Calculate and interpret effect size (Cohen\'s d)',
              'Report results in APA format'
            ],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content: 'An independent samples t-test compares the means of two separate groups. It answers: "Do these two groups have significantly different average scores?"'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** Do men and women differ in average test anxiety scores?'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- One **grouping variable** (categorical: which group each person is in, e.g., Gender with levels Male/Female)\n- One **dependent variable** (continuous: the measurement being compared, e.g., Anxiety_Score)'
              },
              {
                type: 'text',
                content: '**Step 2: Run the Test**\n\n1. Click **Analyses** → **T-Tests** → **Independent Samples T-Test**\n2. Move your dependent variable (e.g., Anxiety_Score) to **Dependent Variables**\n3. Move your grouping variable (e.g., Gender) to **Grouping Variable**'
              },
              {
                type: 'text',
                content: '**Step 3: Check Assumptions**\n\nExpand **Assumptions**:\n- ✓ **Homogeneity test** (Levene\'s test): Tests if variances are equal\n  - If p > .05: variances are equal (assumption met) → use Student\'s t\n  - If p < .05: variances are unequal → use Welch\'s t (automatically provided)\n- ✓ **Normality test** (Shapiro-Wilk): Tests if data is normally distributed\n  - If both groups p > .05: normality assumption met'
              },
              {
                type: 'text',
                content: '**Step 4: Request Effect Size**\n\nExpand **Effect Size** and check:\n- **Cohen\'s d**: Standardized difference between means\n  - Small: 0.2, Medium: 0.5, Large: 0.8'
              },
              {
                type: 'text',
                content: '**Step 5: Add Descriptives**\n\nExpand **Additional Statistics** and check:\n- **Mean, SD, SE**: Shows descriptive stats for each group\n- Helps you understand the direction and magnitude of difference'
              },
              {
                type: 'callout',
                style: 'example',
                content: '**Interpreting Results:**\n\n**Anxiety Example:**\n- Levene\'s p = .342 → equal variances assumed\n- t(118) = 3.45, p = .001, d = 0.63\n- Women: M = 68.2, SD = 12.4\n- Men: M = 58.7, SD = 11.8\n\n**Conclusion:** Women reported significantly higher test anxiety than men, t(118) = 3.45, p = .001, with a medium effect size (d = 0.63).'
              }
            ]
          },

          // SECTION 4: Paired T-Test (20 min)
          {
            id: 'paired-t-test',
            title: 'Paired Samples T-Test in Jamovi',
            objectives: [
              'Perform a paired samples t-test for repeated measures or matched pairs',
              'Check normality of difference scores',
              'Calculate and interpret effect size (Cohen\'s d)',
              'Understand when to use paired vs independent t-tests'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content: 'A paired samples t-test compares two related measurements from the same participants (e.g., before vs after) or matched pairs. It answers: "Did scores change significantly from time 1 to time 2?"'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** Does a weight loss program reduce weight? We measure each person before and after the 12-week program.'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- **Two columns** containing the paired measurements (e.g., Weight_Before and Weight_After)\n- Each row represents one participant with both measurements'
              },
              {
                type: 'text',
                content: '**Step 2: Run the Test**\n\n1. Click **Analyses** → **T-Tests** → **Paired Samples T-Test**\n2. Select BOTH variables (e.g., Weight_Before and Weight_After) and move them to **Paired Variables** as a pair'
              },
              {
                type: 'text',
                content: '**Step 3: Check Assumptions**\n\nExpand **Assumptions**:\n- ✓ **Normality**: Check if the *difference scores* (After - Before) are normally distributed\n  - If Shapiro-Wilk p > .05: assumption met\n  - With large samples (n > 30), t-test is robust to violations'
              },
              {
                type: 'text',
                content: '**Step 4: Request Effect Size and Descriptives**\n\nExpand **Effect Size**: ✓ Cohen\'s d\nExpand **Additional Statistics**: ✓ Mean difference, ✓ Descriptives\n\nThis shows:\n- Mean change from before to after\n- Effect size of the change\n- Descriptives for both time points'
              },
              {
                type: 'callout',
                style: 'example',
                content: '**Interpreting Results:**\n\n**Weight Loss Example:**\n- t(49) = 6.82, p < .001, d = 0.96\n- Before: M = 185.4 lbs, SD = 18.2\n- After: M = 176.8 lbs, SD = 17.6\n- Mean difference = -8.6 lbs (95% CI: -11.1 to -6.1)\n\n**Conclusion:** Participants lost an average of 8.6 pounds, t(49) = 6.82, p < .001, with a large effect size (d = 0.96).'
              },
              {
                type: 'callout',
                style: 'warning',
                content: '**When to use paired vs independent t-test:**\n\n**Paired t-test:** Same people measured twice, OR matched pairs\n**Independent t-test:** Different people in each group\n\nUsing the wrong test reduces power and can give incorrect results!'
              }
            ]
          },

          // SECTION 5: One-Sample T-Test (15 min)
          {
            id: 'one-sample-t-test',
            title: 'One-Sample T-Test in Jamovi',
            objectives: [
              'Perform a one-sample t-test to compare a sample mean to a known value',
              'Check normality assumption',
              'Calculate and interpret effect size (Cohen\'s d)',
              'Understand when to use a one-sample t-test'
            ],
            estimatedTime: 15,
            content: [
              {
                type: 'text',
                content: 'A one-sample t-test compares your sample mean to a known or hypothesized population value. It answers: "Is my sample mean significantly different from a specific value?"'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** The average IQ is 100. Does a sample of 50 gifted students have a mean IQ significantly higher than 100?'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- One **continuous variable** (the measurement, e.g., IQ_Score)\n- A **test value** (the population mean you\'re comparing to, e.g., 100)'
              },
              {
                type: 'text',
                content: '**Step 2: Run the Test**\n\n1. Click **Analyses** → **T-Tests** → **One Sample T-Test**\n2. Move your variable (e.g., IQ_Score) to **Dependent Variables**\n3. Enter your **Hypothesis** test value (e.g., 100) in the box'
              },
              {
                type: 'text',
                content: '**Step 3: Check Assumptions**\n\nExpand **Assumptions**:\n- ✓ **Normality**: Shapiro-Wilk test\n  - If p > .05: data is normally distributed\n  - With n > 30, t-test is robust to moderate violations'
              },
              {
                type: 'text',
                content: '**Step 4: Request Effect Size and Descriptives**\n\nExpand **Effect Size**: ✓ Cohen\'s d\nExpand **Additional Statistics**: ✓ Mean difference, ✓ Descriptives\n\nShows how far your sample mean is from the test value.'
              },
              {
                type: 'callout',
                style: 'example',
                content: '**Interpreting Results:**\n\n**IQ Example (Test value = 100):**\n- Sample: M = 118.4, SD = 12.6\n- t(49) = 10.34, p < .001, d = 1.46\n- Mean difference = 18.4 (95% CI: 14.8 to 22.0)\n\n**Conclusion:** The gifted students\' mean IQ (M = 118.4) is significantly higher than the population average of 100, t(49) = 10.34, p < .001, d = 1.46.'
              }
            ]
          },

          // SECTION 6: Correlation (20 min)
          {
            id: 'correlation',
            title: 'Correlation Analysis in Jamovi',
            objectives: [
              'Calculate and interpret Pearson and Spearman correlation coefficients',
              'Create correlation matrices for multiple variables',
              'Test significance of correlations',
              'Create and interpret scatterplots'
            ],
            estimatedTime: 20,
            content: [
              {
                type: 'text',
                content: 'Correlation measures the strength and direction of the linear relationship between two continuous variables. It answers: "As one variable increases, does the other tend to increase (positive), decrease (negative), or show no pattern (zero)?"'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** Is there a relationship between hours studied and exam scores?'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- **Two or more continuous variables** (e.g., Hours_Studied, Exam_Score)\n- Each row represents one participant with measurements on all variables'
              },
              {
                type: 'text',
                content: '**Step 2: Create a Scatterplot First**\n\n1. Click **Exploration** → **Scatterplot**\n2. Choose your X and Y variables\n3. Check for:\n   - Linear pattern (correlation assumes linearity)\n   - Outliers (can distort correlations)\n   - Homoscedasticity (consistent spread)'
              },
              {
                type: 'text',
                content: '**Step 3: Run the Correlation**\n\n1. Click **Analyses** → **Regression** → **Correlation Matrix**\n2. Move your variables to the right panel\n3. Jamovi creates a correlation matrix showing all pairwise correlations'
              },
              {
                type: 'text',
                content: '**Step 4: Choose Correlation Type**\n\nUnder **Correlation Coefficients**:\n- **Pearson**: For linear relationships with normally distributed continuous variables (most common)\n- **Spearman**: For monotonic relationships, ordinal data, or when normality is violated'
              },
              {
                type: 'text',
                content: '**Step 5: Interpretation**\n\n**Correlation strength:**\n- |r| = .10 to .30: Small/weak\n- |r| = .30 to .50: Medium/moderate\n- |r| = .50 to 1.0: Large/strong\n\n**Direction:**\n- Positive r: Both variables increase together\n- Negative r: One increases as the other decreases\n\n**Significance:**\n- p < .05: Correlation is statistically significant (not likely due to chance)'
              },
              {
                type: 'callout',
                style: 'example',
                content: '**Interpreting Results:**\n\n**Study Hours & Exam Scores:**\n- r = .68, p < .001\n\n**Conclusion:** There is a strong positive correlation between study hours and exam scores, r = .68, p < .001. Students who study more tend to score higher.'
              },
              {
                type: 'callout',
                style: 'warning',
                content: '**Important:** Correlation does NOT imply causation!\n\nA significant correlation means variables are related, but doesn\'t tell you if X causes Y, Y causes X, or a third variable causes both.'
              }
            ]
          },

          // SECTION 7: Simple Regression (30 min)
          {
            id: 'simple-regression',
            title: 'Simple Linear Regression in Jamovi',
            objectives: [
              'Perform simple linear regression with one predictor',
              'Interpret regression coefficients (intercept and slope)',
              'Evaluate model fit (R², adjusted R²)',
              'Check regression assumptions using diagnostic plots'
            ],
            estimatedTime: 30,
            content: [
              {
                type: 'text',
                content: 'Simple linear regression predicts a continuous outcome variable (Y) from one predictor variable (X). It answers: "Can we predict Y from X, and how well?" Unlike correlation, regression is directional and allows prediction.'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** Can we predict exam scores from hours studied?\n\n**Regression equation:** Exam_Score = b₀ + b₁ × Hours_Studied'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- One **predictor variable** (X, independent variable, e.g., Hours_Studied)\n- One **outcome variable** (Y, dependent variable, e.g., Exam_Score)'
              },
              {
                type: 'text',
                content: '**Step 2: Run the Regression**\n\n1. Click **Analyses** → **Regression** → **Linear Regression**\n2. Move your outcome variable (e.g., Exam_Score) to **Dependent Variable**\n3. Move your predictor (e.g., Hours_Studied) to **Covariates** (for continuous predictors)'
              },
              {
                type: 'text',
                content: '**Step 3: Request Model Fit Statistics**\n\nExpand **Model Fit**:\n- ✓ **R**: Correlation between predicted and observed Y\n- ✓ **R²**: Proportion of variance in Y explained by X (e.g., .64 = 64%)\n- ✓ **Adjusted R²**: R² adjusted for number of predictors (more conservative)\n- ✓ **AIC, BIC**: For comparing models (lower = better)'
              },
              {
                type: 'text',
                content: '**Step 4: Check Assumptions**\n\nExpand **Assumption Checks**:\n- ✓ **Q-Q plot of residuals**: Tests normality of residuals\n- ✓ **Residuals plots**: Checks linearity and homoscedasticity\n\n**What to look for:**\n- Q-Q plot: Points should follow the diagonal line\n- Residual plot: Points should be randomly scattered (no pattern, equal spread)'
              },
              {
                type: 'text',
                content: '**Step 5: Interpret Coefficients**\n\nThe **Model Coefficients** table shows:\n- **Intercept (b₀)**: Predicted Y when X = 0\n- **Slope (b₁)**: Change in Y for each 1-unit increase in X\n- **p-value**: Is the predictor significant?\n\n**Example:** b₁ = 5.2 means each additional study hour increases exam score by 5.2 points.'
              },
              {
                type: 'callout',
                style: 'example',
                content: '**Interpreting Results:**\n\n**Model:** Exam_Score = 42.8 + 5.2 × Hours_Studied\n- R² = .46, F(1, 98) = 83.4, p < .001\n- Hours_Studied: b = 5.2, SE = 0.57, t = 9.14, p < .001\n\n**Conclusion:** Hours studied significantly predicts exam scores, b = 5.2, t = 9.14, p < .001. The model explains 46% of variance in exam scores (R² = .46). For each additional hour studied, exam scores increase by 5.2 points on average.'
              }
            ]
          },

          // SECTION 8: Multiple Regression (35 min)
          {
            id: 'multiple-regression',
            title: 'Multiple Regression in Jamovi',
            objectives: [
              'Perform multiple regression with several predictors',
              'Interpret standardized and unstandardized coefficients',
              'Compare nested models and assess individual predictor contributions',
              'Understand multicollinearity and VIF'
            ],
            estimatedTime: 35,
            content: [
              {
                type: 'text',
                content: 'Multiple regression predicts an outcome from TWO OR MORE predictors simultaneously. It answers: "Which predictors are uniquely important? How much variance do they explain together?"'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** Can we predict salary from years of experience, education level, and age?\n\n**Equation:** Salary = b₀ + b₁(Experience) + b₂(Education) + b₃(Age)'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- One **outcome variable** (continuous, e.g., Salary)\n- **Multiple predictor variables** (e.g., Experience, Education, Age)'
              },
              {
                type: 'text',
                content: '**Step 2: Run the Regression**\n\n1. Click **Analyses** → **Regression** → **Linear Regression**\n2. Move outcome to **Dependent Variable**\n3. Move ALL predictors to **Covariates** (for continuous) or **Factors** (for categorical)'
              },
              {
                type: 'text',
                content: '**Step 3: Request Additional Statistics**\n\nExpand **Model Coefficients**:\n- ✓ **Standardized estimates**: Allows comparing importance of predictors (beta weights)\n- ✓ **Collinearity statistics (VIF)**: Checks for multicollinearity\n  - VIF > 10: Severe multicollinearity (predictors too highly correlated)\n  - VIF > 5: Moderate concern'
              },
              {
                type: 'text',
                content: '**Step 4: Model Fit**\n\nExpand **Model Fit**: ✓ R², ✓ Adjusted R², ✓ AIC\n\n**R² vs Adjusted R²:**\n- R² always increases when you add predictors\n- Adjusted R² penalizes for extra predictors (use this to compare models)\n\n**R² change:** How much variance does each predictor add?'
              },
              {
                type: 'text',
                content: '**Step 5: Interpret Coefficients**\n\n**Unstandardized b:**\n- Change in Y for 1-unit increase in X (holding other predictors constant)\n- Use for prediction\n\n**Standardized β (beta):**\n- Change in Y (in SDs) for 1-SD increase in X\n- Use to compare importance of predictors (all on same scale)\n\n**p-value:**\n- Is this predictor uniquely important after controlling for others?'
              },
              {
                type: 'callout',
                style: 'example',
                content: '**Interpreting Results:**\n\n**Model:** Salary = 28.5 + 2.8(Experience) + 5.2(Education) + 0.4(Age)\n- R² = .68, Adjusted R² = .66, F(3, 146) = 104.2, p < .001\n\n**Coefficients:**\n- Experience: b = 2.8, β = .52, t = 7.2, p < .001\n- Education: b = 5.2, β = .38, t = 5.1, p < .001\n- Age: b = 0.4, β = .08, t = 1.1, p = .268\n\n**Conclusion:** Experience and education are significant unique predictors, but age is not (p = .268). Experience is the strongest predictor (β = .52). Together, the three predictors explain 68% of salary variance.'
              },
              {
                type: 'callout',
                style: 'warning',
                content: '**Multicollinearity Warning:**\n\nIf predictors are highly correlated with each other (VIF > 5-10):\n- Individual coefficients become unstable and hard to interpret\n- Model fit (R²) is fine, but you can\'t trust which specific predictor is important\n\n**Solution:** Remove or combine highly correlated predictors'
              }
            ]
          },

          // SECTION 9: One-Way ANOVA (25 min)
          {
            id: 'one-way-anova',
            title: 'Running a One-Way ANOVA in Jamovi',
            objectives: [
              'Perform a one-way ANOVA to compare means across three or more groups',
              'Interpret the F-ratio, p-value, and effect size (eta-squared)',
              'Conduct post-hoc tests with appropriate corrections for multiple comparisons',
              'Check assumptions using Levene\'s test and Q-Q plots'
            ],
            estimatedTime: 25,
            content: [
              {
                type: 'text',
                content: 'One-Way ANOVA (Analysis of Variance) tests whether the means of three or more independent groups are significantly different. It answers: "Is there at least one group that differs from the others?"'
              },
              {
                type: 'callout',
                style: 'info',
                content: '**Research Question Example:** Does study method (visual, auditory, or kinesthetic) affect exam scores?'
              },
              {
                type: 'text',
                content: '**Step 1: Prepare Your Data**\n\nYour data should have:\n- One **grouping variable** (categorical: which group each person is in)\n- One **dependent variable** (continuous: the outcome being measured)'
              },
              {
                type: 'annotated_image',
                image: '/images/lessons/jamovi/anova-data-setup.png',
                alt: 'Jamovi data view showing study method and exam scores',
                annotations: [
                  { x: 20, y: 30, label: 'Grouping Variable', description: 'Categories: Visual, Auditory, Kinesthetic' },
                  { x: 50, y: 30, label: 'Dependent Variable', description: 'Continuous measure: Exam_Score' }
                ]
              },
              {
                type: 'text',
                content: '**Step 2: Run the One-Way ANOVA**\n\n1. Click **Analyses** → **ANOVA** → **One-Way ANOVA**\n2. Move your dependent variable (e.g., Exam_Score) to **Dependent Variables**\n3. Move your grouping variable (e.g., Study_Method) to **Grouping Variable**'
              },
              {
                type: 'text',
                content: '**Step 3: Check Assumptions**\n\nExpand the **Assumption Checks** section:\n- ✓ **Homogeneity of variances** (Levene\'s test)\n- ✓ **Normality** (Q-Q plot)\n\nIf Levene\'s test is significant (p < .05), variances are unequal → use Welch ANOVA instead.'
              },
              {
                type: 'text',
                content: '**Step 4: Add Post-Hoc Tests**\n\nIf the ANOVA is significant, you need post-hoc tests to see *which* groups differ.\n\nExpand **Post-Hoc Tests** and select:\n- **Tukey** (most common, balances power and error control)\n- Or **Holm** (slightly more powerful than Bonferroni)'
              },
              {
                type: 'text',
                content: '**Step 5: Request Effect Size**\n\nExpand **Effect Size** and check:\n- **η²** (eta-squared) - shows proportion of variance explained\n  - Small: .01, Medium: .06, Large: .14'
              },
              {
                type: 'callout',
                style: 'example',
                content: '**Interpreting Results:**\n\n**ANOVA Table:**\n- F(2, 57) = 8.42, p = .001\n- η² = .228 (large effect)\n\n**Post-Hoc:**\n- Kinesthetic > Visual (p = .002)\n- Kinesthetic > Auditory (p = .015)\n- Visual ≈ Auditory (p = .723)\n\n**Conclusion:** Kinesthetic learners scored significantly higher than both visual and auditory learners.'
              }
            ]
          }
        ]
      },

      // PRACTICE PHASE - Combined from all nine lessons
      weDo: {
        type: 'guided_practice',
        title: 'Guided Practice: Advanced Statistical Analyses',
        instructions: 'Follow along with these step-by-step exercises covering all nine analysis types. Work through each section to practice what you\'ve learned.',
        steps: [
          // Chi-Square Goodness-of-Fit practice steps would go here
          {
            instruction: 'Practice running chi-square goodness-of-fit tests with the provided datasets.',
            hint: 'Use Analyses → Frequencies → N Outcomes (χ² Goodness of Fit)',
            checkpoint: 'You should be able to interpret χ² statistics and determine if observed frequencies match expected distributions.'
          },
          // Chi-Square Independence practice steps
          {
            instruction: 'Practice creating contingency tables and running chi-square tests of independence.',
            hint: 'Use Analyses → Frequencies → Independent Samples (χ² test of association)',
            checkpoint: 'You should be able to create contingency tables, add expected counts and percentages, and interpret association results.'
          },
          // Independent t-test practice steps
          {
            instruction: 'Practice running independent samples t-tests with assumption checks.',
            hint: 'Use Analyses → T-Tests → Independent Samples T-Test. Check assumptions first!',
            checkpoint: 'You should be able to compare two independent groups, check Levene\'s test, and interpret Cohen\'s d.'
          },
          // Paired t-test practice steps
          {
            instruction: 'Practice running paired samples t-tests for before/after comparisons.',
            hint: 'Use Analyses → T-Tests → Paired Samples T-Test. Select both variables as a pair.',
            checkpoint: 'You should be able to analyze repeated measures data and interpret mean differences.'
          },
          // One-sample t-test practice steps
          {
            instruction: 'Practice comparing sample means to known population values.',
            hint: 'Use Analyses → T-Tests → One Sample T-Test. Enter the test value carefully.',
            checkpoint: 'You should be able to test if a sample mean differs significantly from a hypothesized value.'
          },
          // Correlation practice steps
          {
            instruction: 'Practice creating correlation matrices and interpreting correlation coefficients.',
            hint: 'Use Analyses → Regression → Correlation Matrix. Always create scatterplots first!',
            checkpoint: 'You should be able to assess the strength, direction, and significance of relationships between variables.'
          },
          // Simple regression practice steps
          {
            instruction: 'Practice running simple linear regression and interpreting regression equations.',
            hint: 'Use Analyses → Regression → Linear Regression. Check assumption plots!',
            checkpoint: 'You should be able to predict outcomes from a single predictor and interpret R² and regression coefficients.'
          },
          // Multiple regression practice steps
          {
            instruction: 'Practice running multiple regression with several predictors.',
            hint: 'Use Linear Regression with multiple covariates. Check VIF for multicollinearity!',
            checkpoint: 'You should be able to compare the importance of multiple predictors using standardized coefficients.'
          },
          // One-way ANOVA practice steps
          {
            instruction: 'Practice running one-way ANOVA with post-hoc tests.',
            hint: 'Use Analyses → ANOVA → One-Way ANOVA. Always add post-hoc tests if ANOVA is significant!',
            checkpoint: 'You should be able to compare three or more groups and determine which groups differ significantly.'
          }
        ]
      },

      // SELF-CHECK PHASE - Combined from all lessons
      selfCheck: {
        screenshotRecognition: [
          {
            id: 'screenshot-anova-output',
            question: 'What statistical test was run and what is the conclusion?',
            image: '/images/selfcheck/jamovi/jamovi-anova-output.png',
            options: [
              'Independent t-test: significant difference between two groups',
              'One-way ANOVA: significant difference among three or more groups',
              'Chi-square: significant association between variables',
              'Correlation: significant relationship between variables'
            ],
            correct: 1,
            explanation: 'The F-statistic with degrees of freedom indicates a one-way ANOVA was performed to compare multiple group means.'
          }
        ],
        errorDiagnostic: [
          {
            id: 'error-wrong-test',
            scenario: 'You want to compare exam scores across four different teaching methods, but you ran four separate independent t-tests instead.',
            errorMessage: 'Multiple t-tests inflate Type I error rate',
            options: [
              'Continue with t-tests - they give more detailed information',
              'Use one-way ANOVA instead to control family-wise error rate',
              'Use correlation to see which method is best',
              'Use chi-square test instead'
            ],
            correct: 1,
            explanation: 'When comparing more than two groups, use ANOVA to maintain the appropriate alpha level. Multiple t-tests inflate the chance of finding a false positive.'
          }
        ],
        outputInterpretation: [
          {
            id: 'output-regression',
            question: 'Interpret this regression output. What does the R² value tell you? Is the predictor significant?',
            image: '/images/selfcheck/jamovi/jamovi-regression-output.png',
            placeholder: 'Describe what R² means and whether the predictor is statistically significant...',
            hint: 'Consider both the model fit and the p-value for the predictor.',
            requiredKeywords: [
              'variance', 'explained', 'R²', 'R-squared', 'r-squared', 'model fit', 'fit',
              'significant', 'significance', 'p-value', 'p value', 'p-value', 'predict',
              'predictor', 'independent', 'variable', 'relationship', 'outcome'
            ],
            minRequiredKeywords: 3,
            feedback: 'R² indicates the proportion of variance in the outcome explained by the predictor. Check the p-value to determine if the relationship is statistically significant (p < .05).'
          }
        ]
      },

      // APPLY PHASE - References exercises from statisticsPractices.js
      youDo: {
        type: 'independent_practice',
        title: 'Apply Your Skills',
        instructions: 'Now it\'s your turn! Complete hands-on exercises for all nine analysis types. These exercises will help you build confidence with advanced statistical analyses. Work through each analysis type independently and apply what you\'ve learned.'
        // Exercises are pulled from statisticsPractices.js based on module='stats-module-8' and software='jamovi'
      }
    }
  }
]
