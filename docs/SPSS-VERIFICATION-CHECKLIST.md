# SPSS verification checklist (Statistics SP27)

Everything in the SPSS chapters, lessons and Apply exercises was written without a live copy of SPSS. Someone with SPSS should walk these and fix any menu name, checkbox or number that differs. Note the SPSS version you use at the top of your results. Several items need **SPSS 27 or later**.

How to report: for each line write OK, or what you actually saw (exact menu or label). Send the list back and the text gets corrected in one pass.

Data files are in `public/` (`bmi_and_exercise.csv`, `personality_data.csv`, `module4sampledata.csv`, `Normality data.csv`).

## Module 3: the SPSS window and data
Files: `softwareLessons_module3_unified.js`, `data-entry__module-3/spss.html`, `variable-types__module-3/spss.html`, software-interface chapter.
- [ ] Data View and Variable View tabs; Output Viewer opens automatically.
- [ ] Variable View columns: Name, Type, Width, Decimals, Label, Values, Missing, Columns, Align, Measure, Role.
- [ ] Measure options: Scale, Ordinal, Nominal.
- [ ] File > Open > Data, "Files of type" for CSV; **Text Import Wizard** steps and names (delimited, first row names, data types).
- [ ] File > Save As (.sav). File > Export (output to PDF/Word/HTML).

## Module 4: descriptives (file: `bmi_and_exercise.csv`)
Expected: N = 250, mean 29.81, SD 8.24 for BMI.
- [ ] Analyze > Descriptive Statistics > Descriptives: Options list has mean, SD, variance, range, min, max, skew, kurtosis (and **no median or mode**).
- [ ] Descriptives > "Save standardized values as variables" creates Z-variables.
- [ ] Analyze > Descriptive Statistics > Frequencies > Statistics: median, mode, quartiles, percentiles.
- [ ] Analyze > Descriptive Statistics > Explore: Statistics shows interquartile range (IQR); Plots gives boxplot.
- [ ] Data > Split File ("Compare groups" / "Organize output by groups").
- [ ] Analyze > Descriptive Statistics > Crosstabs.
- [ ] Transform > Compute Variable (the MAD example: `ABS(x - mean)` then Descriptives mean).

## Module 5: graphs and data prep
- [ ] Graphs > Chart Builder: bar, histogram, boxplot, scatter; Element Properties panel.
- [ ] Data > Select Cases (If condition; "Filter out unselected cases", not delete).
- [ ] Transform > Recode into Different Variables (Old and New Values).
- [ ] Compute function names: `LG10`, `SQRT`, `ABS`; `=` for equality in conditions, `~=` not equal, `AND`/`OR`/`NOT`.

## Module 6: distributions and estimation
- [ ] Compute Variable function groups: `CDF.NORMAL`, `PDF.NORMAL`, `IDF.NORMAL`, `RV.NORMAL`, `PDF.BINOM`, `CDF.BINOM`, `CDF.T`, `IDF.T` (check spelling and argument order).
- [ ] Explore > Statistics: "Descriptives" with confidence interval for the mean (default 95%).
- [ ] Explore > Plots: "Normality plots with tests" (Shapiro-Wilk); Analyze > Descriptive Statistics > **Q-Q Plots**.

## Module 7: tests and p-values
Expected: gender 430 of 734 = .586, binomial p < .001. BMI vs 25: t(249) = 9.23, d = 0.58.
- [ ] Transform > Automatic Recode (text gender to numbers).
- [ ] Analyze > Nonparametric Tests > Legacy Dialogs > **Binomial**: "Test Proportion" box; which group SPSS treats as Group 1 (first value in the data).
- [ ] Analyze > Compare Means > One-Sample T Test: Test Value; **SPSS 27+ "Estimate effect sizes"** gives Cohen's d in the table.
- [ ] **SPSS 27+ "One-Sided p"** column in t-test output (older versions: halve the two-sided p).

## Module 8: comparing groups and relationships
- [ ] Compare Means > Independent-Samples T Test: Levene's test; two rows (Equal variances assumed / not assumed = Welch).
- [ ] Paired-Samples T Test; Estimate effect sizes.
- [ ] Analyze > Compare Means > One-Way ANOVA: Post Hoc (Tukey, Bonferroni, Games-Howell), Options (Homogeneity, Welch).
- [ ] Analyze > General Linear Model > Univariate and > Repeated Measures.
- [ ] Analyze > Correlate > Bivariate (Pearson, Spearman).
- [ ] Analyze > Regression > Linear: Statistics (confidence intervals, collinearity diagnostics), Plots, Save.
- [ ] Crosstabs: Statistics > Chi-square, Cramer's V; McNemar; Fisher's exact appears automatically for 2x2.
- [ ] Legacy Dialogs: Chi-Square, 2 Independent Samples (Mann-Whitney U), 2 Related Samples (Wilcoxon), K Independent Samples (Kruskal-Wallis), K Related Samples (Friedman).
- [ ] Wilcoxon output shows Z and Asymptotic Sig (not W); Exact button available.

## Also check
- [ ] Any chapter step that names a button or checkbox that you could not find.
- [ ] Anything that says SPSS 27+ but your version differs.
