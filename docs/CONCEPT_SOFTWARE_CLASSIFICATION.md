# Concept Review Software Classification

Classification of concept-review items for cross-software correctness.

## Summary

- Total questions: **179**
- agnostic: **156**
- label-swap: **11**
- needs-patch: **12**

## Rules used

- `needs-patch`: existing per-software patch OR software-specific operators/functions/file formats likely change answers.
- `label-swap`: software-name mention without detected operator/function dependency.
- `agnostic`: no software-specific language detected.

## needs-patch

| ID | Module | Type | Reason | Question |
|---|---|---|---|---|
| `stats-m3-q2` | `stats-module-3` | `multiple_choice` | Already patched in conceptQuestionSoftware.js. | Which variable type in Jamovi should be used for categorical data like "Male/Female"? |
| `stats-m3-q3` | `stats-module-3` | `true_false` | Already patched in conceptQuestionSoftware.js. | Missing data in Jamovi can affect the results of statistical analyses. |
| `stats-m3-q5` | `stats-module-3` | `multiple_choice` | Already patched in conceptQuestionSoftware.js. | What file format does Jamovi use to save its native data files? |
| `stats-m3-q8` | `stats-module-3` | `multiple_choice` | Already patched in conceptQuestionSoftware.js. | Which best distinguishes a data file from an analysis output in Jamovi? |
| `stats-m3-q14` | `stats-module-3` | `multiple_choice` | Software-dependent function/operator/file-format semantics likely differ. | What is the difference between exporting changed data and saving as a jamovi (.omv) file? |
| `stats-m5-q19` | `stats-module-5` | `multiple_choice` | Already patched in conceptQuestionSoftware.js. | Which logical operator tests if two values are equal in jamovi? |
| `stats-m5-q23` | `stats-module-5` | `multiple_select` | Already patched in conceptQuestionSoftware.js. | What can you create using the Compute function in jamovi? (Select all that apply) |
| `stats-m5-q24` | `stats-module-5` | `multiple_choice` | Already patched in conceptQuestionSoftware.js. | What does the expression IF(score > 50, 'Pass', 'Fail') do? |
| `stats-m5-q25` | `stats-module-5` | `multiple_choice` | Already patched in conceptQuestionSoftware.js. | Which function computes the natural logarithm (base e) in jamovi? |
| `stats-m5-q27` | `stats-module-5` | `true_false` | Already patched in conceptQuestionSoftware.js. | The functions LOG10() and LN() produce the same results because they are both logarithms. |
| `stats-m5-q28` | `stats-module-5` | `multiple_choice` | Already patched in conceptQuestionSoftware.js. | What does applying a filter in jamovi do? |
| `stats-m5-q30` | `stats-module-5` | `multiple_select` | Already patched in conceptQuestionSoftware.js. | When might you use filters in jamovi? (Select all that apply) |

## label-swap

| ID | Module | Type | Reason | Question |
|---|---|---|---|---|
| `stats-m3-q4` | `stats-module-3` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | When importing a CSV file into jamovi, which setting checks whether the first row contains variable names rather than data values? |
| `stats-m3-q9` | `stats-module-3` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | After importing data, jamovi sometimes assigns the wrong measurement level (e.g., treating numeric ID codes as continuous). What should you do? |
| `stats-m3-q11` | `stats-module-3` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | What is a computed variable in jamovi? |
| `stats-m3-q12` | `stats-module-3` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | In a jamovi spreadsheet, each row represents _____ and each column represents _____. |
| `stats-m3-q13` | `stats-module-3` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | Before importing a CSV into jamovi, why should missing values be coded with a placeholder such as 99 or -9999? |
| `stats-m3-q15` | `stats-module-3` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | Why is recording your screen while conducting statistical analyses useful? |
| `stats-m3-q16` | `stats-module-3` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | In jamovi, what is the main purpose of creating a z-score computed variable? |
| `stats-m3-q17` | `stats-module-3` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | In jamovi's computed variables dialog, what does MEAN(var1, var2, var3) create for each row? |
| `stats-m3-q18` | `stats-module-3` | `multiple_select` | Software name mention present; likely solvable with text substitution. | Which are appropriate uses of computed variables in jamovi? (Select all that apply) |
| `stats-m5-q3` | `stats-module-5` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | When might you apply a log transform to a variable in jamovi? |
| `stats-m5-q15` | `stats-module-5` | `multiple_choice` | Software name mention present; likely solvable with text substitution. | You want to compare distributions across several groups without overwhelming the viewer. What does the module recommend? |

## agnostic

| ID | Module | Type | Reason | Question |
|---|---|---|---|---|
| `stats-m0-q1` | `stats-module-0` | `multiple_choice` | No software-specific wording or syntax detected. | Evaluate: 4 + 3 × 2² |
| `stats-m0-q2` | `stats-module-0` | `multiple_choice` | No software-specific wording or syntax detected. | Solve for x: 3x − 6 = 12 |
| `stats-m0-q3` | `stats-module-0` | `multiple_choice` | No software-specific wording or syntax detected. | 0.75 expressed as a fraction in lowest terms is: |
| `stats-m0-q4` | `stats-module-0` | `multiple_choice` | No software-specific wording or syntax detected. | What is √(9 + 16)? |
| `stats-m0-q5` | `stats-module-0` | `multiple_choice` | No software-specific wording or syntax detected. | Compute the sum: Σx for x = 2, 5, 8, 1 |
| `stats-m0-q6` | `stats-module-0` | `multiple_choice` | No software-specific wording or syntax detected. | In a graph of study hours (x-axis) vs. exam score (y-axis), a point sitting high and to the right represents: |
| `stats-m1-q1` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | What is the primary purpose of statistics in psychology? |
| `stats-m1-q2` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Why do scientists use statistics instead of common sense? The best answer is that statistics: |
| `stats-m1-q3` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | In Evans et al. (1983), overall, people correctly judged logical arguments about what percentage of the time? |
| `stats-m1-q4` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | When a valid argument contradicted pre-existing beliefs, what percentage of people judged it valid? |
| `stats-m1-q5` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | When an invalid argument agreed with pre-existing beliefs, what percentage of people incorrectly accepted it as valid? |
| `stats-m1-q6` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Statistics can improve evidence evaluation from about 60% accuracy to roughly: |
| `stats-m1-q7` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Which is a concrete reason psychology students learn statistics that focuses on reading research? |
| `stats-m1-q8` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Simpson's paradox occurs when: |
| `stats-m1-q9` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | In the Berkeley admissions example (overall totals), males were admitted at about ___% and females at about ___%. |
| `stats-m1-q10` | `stats-module-1` | `true_false` | No software-specific wording or syntax detected. | When Berkeley admissions were examined department by department, most departments admitted females at a slightly higher rate than males. |
| `stats-m1-q11` | `stats-module-1` | `multiple_select` | No software-specific wording or syntax detected. | Which are reasons every psychology researcher should know basic statistics? (Select all that apply) |
| `stats-m1-q12` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | In a sample of 20 news articles, what percentage discussed statistical topics? |
| `stats-m1-q13` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | A headline says, "Study proves teens are addicted to phones." Which response is best? |
| `stats-m1-q14` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Which statement best reflects why psychology students learn statistics? |
| `stats-m1-q15` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Why do introductory classes emphasize statistics? The main reason given is that undergraduate assignments most often require students to: |
| `stats-m1-q16` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | The belief bias effect is the tendency to: |
| `stats-m1-q17` | `stats-module-1` | `true_false` | No software-specific wording or syntax detected. | If a conclusion matches what we already believe, we may accept a logically invalid argument as valid. That pattern is the belief bias effect. |
| `stats-m1-q18` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Deductive validity means: |
| `stats-m1-q19` | `stats-module-1` | `true_false` | No software-specific wording or syntax detected. | An argument can be deductively valid even if its premises are false and the conclusion is not actually true. |
| `stats-m1-q20` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Why is separating data by meaningful groups often useful? |
| `stats-m1-q21` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | Berkeley's overall admission pattern reversed at the department level. Which follow-up question best reflects that lesson? |
| `stats-m1-q22` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | An argument has premises that are obviously false, yet the conclusion follows logically from them. What can we say about the argument? |
| `stats-m1-q23` | `stats-module-1` | `multiple_choice` | No software-specific wording or syntax detected. | A classmate says: "The conclusion of that study is believable, so the reasoning must be valid." What is wrong with this reasoning? |
| `stats-m2-q1` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | In an experiment, the researcher manipulates the _____ variable and measures the _____ variable. |
| `stats-m2-q2` | `stats-module-2` | `matching` | No software-specific wording or syntax detected. | Match each scale of measurement with its description: |
| `stats-m2-q3` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | Which research design allows researchers to establish cause-and-effect relationships? |
| `stats-m2-q4` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | A researcher measures anxiety on a scale of 1-10. What scale of measurement is this? |
| `stats-m2-q5` | `stats-module-2` | `true_false` | No software-specific wording or syntax detected. | Internal validity refers to how well research findings can be generalized to other populations and settings. |
| `stats-m2-q6` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | An operational definition is: |
| `stats-m2-q7` | `stats-module-2` | `multiple_select` | No software-specific wording or syntax detected. | In a study testing whether background music improves concentration, which situations describe a confound that threatens internal validity? (Select all that apply) |
| `stats-m2-q8` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | Which list correctly classifies these variables by scale of measurement: gender category, reaction time (ms), diagnosis (yes/no), number of symptoms endorsed? |
| `stats-m2-q9` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | In a study where caffeine dose is manipulated to see its effect on anxiety score, what are the IV and DV? |
| `stats-m2-q10` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | A study observes people who choose to exercise and compares their mood to non-exercisers. This is _____ because _____. |
| `stats-m2-q11` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | A study claims "social media increases depression." Which confound and fix are most appropriate? |
| `stats-m2-q12` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | Which statement best distinguishes experimental from non-experimental research? |
| `stats-m2-q13` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | You measure stress with a single 1-10 item. Which limitation and improvement are most appropriate? |
| `stats-m2-q14` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | A dataset codes gender as 1 = male and 2 = female. What scale of measurement is this variable? |
| `stats-m2-q15` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | Which pairing best matches a threat to internal validity and a threat to construct validity? |
| `stats-m2-q16` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | What is the main purpose of random assignment in an experiment? |
| `stats-m2-q17` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | Which is the best operational definition and evaluation plan for "academic motivation"? |
| `stats-m2-q18` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | In psychological measurement, which pairing correctly distinguishes the construct from the observed value? |
| `stats-m2-q19` | `stats-module-2` | `true_false` | No software-specific wording or syntax detected. | The number a researcher records (for example, a reaction time or a questionnaire total) is the construct itself, not a measurement of the construct. |
| `stats-m2-q20` | `stats-module-2` | `multiple_choice` | No software-specific wording or syntax detected. | In a study, the theoretical construct is "working memory capacity" and the researcher records a digit-span score of 7. What is the 7 an example of? |
| `stats-m2-q21` | `stats-module-2` | `true_false` | No software-specific wording or syntax detected. | Two different measures of the same psychological construct can produce different numbers for the same person, because each measure is an imperfect observation of the construct. |
| `stats-m3-q1` | `stats-module-3` | `multiple_choice` | No software-specific wording or syntax detected. | In a dataset, each row typically represents: |
| `stats-m3-q6` | `stats-module-3` | `multiple_choice` | No software-specific wording or syntax detected. | Why is setting the correct measurement level (nominal/ordinal/continuous) important? |
| `stats-m3-q7` | `stats-module-3` | `multiple_choice` | No software-specific wording or syntax detected. | A dataset uses 999 for missing values. What should you do before analysis? |
| `stats-m3-q10` | `stats-module-3` | `multiple_choice` | No software-specific wording or syntax detected. | A variable is stored as text ("1", "2", "3"). What problem can this cause and how do you fix it? |
| `stats-m4-q1` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | Which measure of central tendency is most affected by outliers? |
| `stats-m4-q2` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | If a distribution is positively skewed, which statement is true? |
| `stats-m4-q3` | `stats-module-4` | `fill_blank` | No software-specific wording or syntax detected. | The sum of all deviation scores from the mean always equals ____. |
| `stats-m4-q4` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | Standard deviation is: |
| `stats-m4-q5` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | A z-score of +2.0 means: |
| `stats-m4-q6` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | Which measure of variability uses squared deviations in its calculation? |
| `stats-m4-q7` | `stats-module-4` | `true_false` | No software-specific wording or syntax detected. | When data is measured on a nominal scale, the mode is the most appropriate measure of central tendency. |
| `stats-m4-q8` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | The formula for a z-score is: |
| `stats-m4-q9` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | Which statement correctly defines mean, median, and mode and identifies the most robust to outliers? |
| `stats-m4-q10` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | Which best defines standard deviation in plain language? |
| `stats-m4-q11` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | A positively skewed distribution has: |
| `stats-m4-q12` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | For the scores 2, 3, 3, 10, 12, what are the mean and median? |
| `stats-m4-q13` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | Why is standard deviation usually reported instead of variance? |
| `stats-m4-q14` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | How can an outlier affect mean, SD, and median? |
| `stats-m4-q15` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | How would you interpret a z-score of -1.2? |
| `stats-m4-q16` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | When data are heavily skewed, why might the mean be a poor measure of central tendency? |
| `stats-m4-q17` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | Why is the interquartile range (IQR) more robust than the range when outliers may be present? |
| `stats-m4-q18` | `stats-module-4` | `multiple_choice` | No software-specific wording or syntax detected. | How should you summarize a heavily skewed variable? |
| `stats-m5-q1` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | Which type of graph is most appropriate for displaying the distribution of a continuous variable? |
| `stats-m5-q2` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | In a boxplot, the box represents: |
| `stats-m5-q4` | `stats-module-5` | `true_false` | No software-specific wording or syntax detected. | Bar charts should have gaps between bars because the categories are discrete. |
| `stats-m5-q5` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | A scatterplot is used to visualize: |
| `stats-m5-q6` | `stats-module-5` | `multiple_select` | No software-specific wording or syntax detected. | Which of the following can be identified from a boxplot? (Select all that apply) |
| `stats-m5-q7` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | Which plot is most appropriate for: one quantitative distribution, comparing quantitative distributions across groups, two quantitative variables? |
| `stats-m5-q8` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | What does a histogram show that a bar chart does not (for continuous data)? |
| `stats-m5-q9` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | What is a scatterplot designed to reveal? |
| `stats-m5-q10` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | A histogram that is strongly right-skewed suggests the data may benefit from: |
| `stats-m5-q11` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | When is a boxplot especially useful? |
| `stats-m5-q12` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | A histogram uses only 4 bins and the distribution shape is hard to see. What does the module suggest? |
| `stats-m5-q13` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | Why are boxplots especially useful for comparing distributions across groups? |
| `stats-m5-q14` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | How can bin width in a histogram change interpretation? |
| `stats-m5-q16` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | What does a violin plot add compared with a standard boxplot? |
| `stats-m5-q17` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | What is the main difference between a frequency table and a contingency table? |
| `stats-m5-q18` | `stats-module-5` | `true_false` | No software-specific wording or syntax detected. | A contingency table shows the relationship between two categorical variables by displaying counts in each combination of categories. |
| `stats-m5-q20` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | What does the expression "age > 18 and gender == 'Female'" select? |
| `stats-m5-q21` | `stats-module-5` | `true_false` | No software-specific wording or syntax detected. | The NOT operator reverses a logical condition, making TRUE become FALSE and vice versa. |
| `stats-m5-q22` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | When centering a variable, you subtract what value from each observation? |
| `stats-m5-q26` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | What does the SQRT() function calculate? |
| `stats-m5-q29` | `stats-module-5` | `true_false` | No software-specific wording or syntax detected. | Filters permanently delete rows from your dataset that do not meet the filter criteria. |
| `stats-m5-q31` | `stats-module-5` | `multiple_choice` | No software-specific wording or syntax detected. | A researcher wants to see how many students chose each favorite color, and separately wants to check whether favorite color differs by year in school. Which display fits each question? |
| `stats-m5-q32` | `stats-module-5` | `true_false` | No software-specific wording or syntax detected. | To examine whether smoking status (yes/no) is related to coffee intake level (low/medium/high), you would build a contingency table rather than a simple frequency table of smoking alone. |
| `stats-m6-q1` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | In a normal distribution, approximately what percentage of scores fall within one standard deviation of the mean? |
| `stats-m6-q2` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | The Central Limit Theorem states that: |
| `stats-m6-q3` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | Standard error is: |
| `stats-m6-q4` | `stats-module-6` | `fill_blank` | No software-specific wording or syntax detected. | If a z-score is 0, the score equals the ____. |
| `stats-m6-q5` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | As sample size increases, what happens to the standard error? |
| `stats-m6-q6` | `stats-module-6` | `true_false` | No software-specific wording or syntax detected. | A z-score of -1.5 indicates a score below the mean. |
| `stats-m6-q7` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | The probability of an event can range from: |
| `stats-m6-q8` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | Which best defines probability using the long-run frequency idea? |
| `stats-m6-q9` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | Which example shows independent events rather than mutually exclusive events? |
| `stats-m6-q10` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | What is sampling error? |
| `stats-m6-q11` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | What is a sampling distribution and why is it important? |
| `stats-m6-q12` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | What does a confidence interval aim to convey? |
| `stats-m6-q13` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | How does standard error differ from standard deviation? |
| `stats-m6-q14` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | Compared to convenience sampling, simple random sampling tends to: |
| `stats-m6-q15` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | As sample size increases, what happens to standard error and CI width? |
| `stats-m6-q16` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | Why can a convenience sample lead to misleading conclusions even with a large sample size? |
| `stats-m6-q17` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | Why does the normal distribution often appear in sampling contexts? |
| `stats-m6-q18` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | Which characteristic is required for a binomial distribution? |
| `stats-m6-q19` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | What is the Law of Large Numbers? |
| `stats-m6-q20` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | When should you use a t-distribution instead of a normal (z) distribution? |
| `stats-m6-q21` | `stats-module-6` | `true_false` | No software-specific wording or syntax detected. | The chi-square (χ²) distribution is used for analyzing categorical data and variance estimates. |
| `stats-m6-q22` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | What is the key difference between frequentist and Bayesian interpretations of probability? |
| `stats-m6-q23` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | An unbiased estimator means: |
| `stats-m6-q24` | `stats-module-6` | `multiple_choice` | No software-specific wording or syntax detected. | The F-distribution is primarily used for: |
| `stats-m7-q1` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | The null hypothesis typically states that: |
| `stats-m7-q2` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | A Type I error occurs when: |
| `stats-m7-q3` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | If p = .03 and α = .05, you should: |
| `stats-m7-q4` | `stats-module-7` | `true_false` | No software-specific wording or syntax detected. | A p-value tells you the probability that the null hypothesis is true. |
| `stats-m7-q5` | `stats-module-7` | `matching` | No software-specific wording or syntax detected. | Match each term with its definition: |
| `stats-m7-q6` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | Effect size measures: |
| `stats-m7-q7` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | In the ESP example, which alternative hypothesis states that performance is better than chance only? |
| `stats-m7-q8` | `stats-module-7` | `multiple_select` | No software-specific wording or syntax detected. | Which factors increase statistical power according to the module? (Select all that apply) |
| `stats-m7-q9` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | For the claim "the mean anxiety change is not zero," which hypotheses are correct? |
| `stats-m7-q10` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | Which best defines Type I and Type II errors? |
| `stats-m7-q11` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | What does "statistical significance" mean in hypothesis testing? |
| `stats-m7-q12` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | Which statement is an acceptable interpretation of a p-value? |
| `stats-m7-q13` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | What is a common incorrect interpretation of a p-value? |
| `stats-m7-q14` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | Why is "fail to reject H0" not the same as "accept H0"? |
| `stats-m7-q15` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | In the ESP example, which hypotheses test whether performance differs from chance in either direction? |
| `stats-m7-q16` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | Lowering alpha from .05 to .01 will: |
| `stats-m7-q17` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | What is the logic of a critical (rejection) region? |
| `stats-m7-q18` | `stats-module-7` | `multiple_choice` | No software-specific wording or syntax detected. | Which is the best reporting template for a hypothesis test? |
| `stats-m8-q1` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | An independent samples t-test is used when: |
| `stats-m8-q2` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | A paired samples t-test is appropriate when: |
| `stats-m8-q3` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | A Pearson correlation coefficient of r = -.85 indicates: |
| `stats-m8-q4` | `stats-module-8` | `true_false` | No software-specific wording or syntax detected. | Correlation implies causation. |
| `stats-m8-q5` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | Levene's test is used to check the assumption of: |
| `stats-m8-q6` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | The coefficient of determination (r²) represents: |
| `stats-m8-q7` | `stats-module-8` | `multiple_select` | No software-specific wording or syntax detected. | Which are assumptions of the independent samples t-test? (Select all that apply) |
| `stats-m8-q8` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | When interpreting Cohen's d, a value of 0.8 is considered: |
| `stats-m8-q9` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | A chi-square test of independence is used when: |
| `stats-m8-q10` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | Which test family is most appropriate for each scenario? |
| `stats-m8-q11` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | What does the sign of a correlation coefficient indicate? |
| `stats-m8-q12` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | Why does correlation not imply causation? |
| `stats-m8-q13` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | How do statistical significance and effect size differ? |
| `stats-m8-q14` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | How should you interpret a regression slope? |
| `stats-m8-q15` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | What is ANOVA used for at a high level? |
| `stats-m8-q16` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | What is a key advantage of repeated measures ANOVA over independent ANOVA? |
| `stats-m8-q17` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | A result is significant but effect size is tiny. Which two reasons explain this? |
| `stats-m8-q18` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | What does "violating assumptions" mean in group comparisons? |
| `stats-m8-q19` | `stats-module-8` | `multiple_choice` | No software-specific wording or syntax detected. | Which analysis plan is most appropriate for a study question comparing two groups on a quantitative outcome? |

## Immediate patch backlog candidates

- Any `needs-patch` ID not already present in `CONCEPT_QUESTION_SOFTWARE_PATCHES` should receive explicit per-software overrides.
- Prioritize modules 3 and 5 first (highest software syntax density).

