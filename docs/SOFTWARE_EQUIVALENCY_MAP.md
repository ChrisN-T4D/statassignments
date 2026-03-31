# Software Equivalency Map

Task-by-task source of truth keyed by `practiceObjectiveKey`.

## Coverage summary

- Objectives with key: **127**
- Software tracks expected for parity: `jamovi`, `r`, `spss`, `excel`, `stata`
- This matrix includes all rows with `practiceObjectiveKey` (including `menu_navigation` where keyed).

## `m2-cronbach-alpha`

- Module: `module-2` | Topic: `reliability-validity`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Cronbach's Alpha for Reliability | You have a scale with multiple items measuring anxiety. Find the menu path in Jamovi to calculate Cronbach's alpha to assess the scale's reliability. | Correct! Analyses > Factor > Reliability Analysis calculates Cronbach's alpha. Values above .70 generally indicate acceptable reliability. |
| R | Compute Cronbach's alpha in R | Using your scale items, run `psych::alpha(data[, c("Anxiety1","Anxiety2","Anxiety3","Anxiety4","Anxiety5")])` (or equivalent item names), then interpret alpha. | Submit output showing Cronbach's alpha plus a 1-2 sentence interpretation of reliability. |
| SPSS | Compute Cronbach's alpha in SPSS | Using your scale items, go to Analyze > Scale > Reliability Analysis. Add the 5 anxiety items and run with Model = Alpha. | Submit an SPSS output screenshot with Cronbach's alpha and a brief interpretation. |
| Excel | Estimate reliability in Excel | Using 5 item columns, compute Cronbach's alpha via the variance formula (or an approved add-in) and report the resulting coefficient. | Submit a spreadsheet screenshot showing alpha calculation steps and the final coefficient. |
| Stata | Compute Cronbach's alpha in Stata | Using your scale items, run `alpha anxiety1 anxiety2 anxiety3 anxiety4 anxiety5` (or your item names) and report the coefficient. | Submit a Stata output screenshot with alpha and a short interpretation. |

## `m2-measurement-levels`

- Module: `module-2` | Topic: `levels-of-measurement`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Identify Variable Types in Jamovi | In Jamovi, you need to correctly identify the measurement level (Nominal, Ordinal, or Continuous) for each variable. Open the variable editor and set the appropriate type. | Correct! The variable editor lets you set measurement levels: Nominal for categories without order, Ordinal for ranked categories, and Continuous for numeric measurements. |
| R | Set variable measurement levels in R | Using your dataset, run `str(data)`, then set at least 5 variables to appropriate types (factor for nominal, ordered factor for ordinal, numeric for continuous). | Submit a script snippet showing `str()` before and after conversion for at least 5 variables. |
| SPSS | Set variable measurement levels in SPSS | Using your dataset, open Variable View and set Measure for at least 5 variables to Nominal, Ordinal, or Scale as appropriate. | Submit a screenshot of Variable View showing Measure assignments for at least 5 variables. |
| Excel | Organize measurement levels in Excel | Using your worksheet, identify at least 5 variables and document each as nominal, ordinal, or continuous in a metadata row or a separate data dictionary tab. | Submit a screenshot of your worksheet plus data dictionary showing levels for at least 5 variables. |
| Stata | Define measurement levels in Stata | Using your dataset, run `describe` and `codebook`, then add value labels to at least one categorical variable and verify continuous variables remain numeric. | Submit a command log screenshot showing `describe`, `codebook`, and at least one value-label command. |

## `m3-computed-column`

- Module: `module-3` | Topic: `r-computed`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a computed column in Jamovi | Use Data > Add > Computed Variable and create `Total = Item1 + Item2 + Item3` (or your equivalent variables). Verify the new column appears in the data grid. | Submit a screenshot of the compute formula and resulting Total column. |
| R | Create a Computed Variable in R | Create a new variable Total by summing Item1, Item2, and Item3. Verify the new column with head(). | Screenshot or script showing the new Total column in head(data). |
| SPSS | Create a computed variable in SPSS | Transform > Compute Variable. Set Target Variable to `Total` and expression to `Item1 + Item2 + Item3` (or equivalent variables). Run and verify in Data View. | Screenshot of Compute Variable setup and resulting Total column. |
| Excel | Create a Computed Variable in Excel | Create a Total column using a formula such as `=B2+C2+D2` (or your item columns), then fill down for all rows. | Screenshot showing the Total formula and the filled column. |
| Stata | Create a computed variable in Stata | Run `gen total = item1 + item2 + item3` (or equivalent variable names). Use `list item1 item2 item3 total in 1/5` to verify values. | Screenshot of command history/results showing the new total variable. |

## `m3-environment-ready`

- Module: `module-3` | Topic: `r-setup`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Launch Jamovi and verify workspace setup | Launch Jamovi, create a new blank data sheet, and confirm the Data and Analyses tabs are available before starting module tasks. | Submit a screenshot of Jamovi open with a new blank sheet and visible Data/Analyses tabs. |
| R | Install R and RStudio | Install R and RStudio. Open RStudio and create a new R script (File > New File > R Script). | Screenshot showing RStudio open with a new script tab. |
| SPSS | Open SPSS and Create a New Dataset | Open SPSS and create a new dataset (File > New > Data). In Variable View, add a variable named Score with Type Numeric and Measure Scale. | Screenshot of Variable View showing Score with Type Numeric and Measure Scale. |
| Excel | Create a Clean Excel Dataset | Create a new Excel sheet with headers in row 1 (ID, Score, Group). Enter at least 5 rows of data below. | Screenshot showing the dataset with headers and 5 rows of data. |
| Stata | Load a Sample Dataset in Stata | Run sysuse auto in Stata to load the sample dataset, then run describe to list variables. | Screenshot of the Results window showing describe output. |

## `m3-extend-software`

- Module: `module-3` | Topic: `add-ons`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Install Add-On Modules (scatr and GAMLj) | Install the scatr and GAMLj modules from the jamovi Modules library. | Submit a screenshot showing scatr and GAMLj listed as installed modules. |
| R | Install key analysis packages in R | Install and load at least two core packages (e.g., `tidyverse`, `psych`, `ggplot2`), then confirm they load without errors. | Submit a console screenshot showing successful installation/loading for at least two packages. |
| SPSS | Enable SPSS extensions or syntax tools | Open Extensions > Extension Hub (or equivalent) and install or enable at least one analysis-support extension, or create a reusable syntax file template. | Submit a screenshot of the installed extension list or your saved syntax template. |
| Excel | Enable Analysis ToolPak in Excel | Enable Analysis ToolPak from Excel Add-ins, then verify that the Data Analysis button appears on the Data tab. | Submit a screenshot of the Data tab with Data Analysis visible. |
| Stata | Install a Stata package from SSC | Run an SSC install command (e.g., `ssc install estout`), then verify installation by running `which estout` (or your package). | Submit a screenshot of the SSC install command and `which` confirmation output. |

## `m3-import-csv`

- Module: `module-3` | Topic: `data-handling`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Import CSV and Set Measurement Levels | Import a CSV file and set the correct measurement levels (Nominal, Ordinal, or Continuous) for at least five variables. | Saved .omv file showing measurement levels set correctly. |
| R | Import a CSV in R | Set your working directory and import a CSV with read.csv(). Then run head() to verify the data loaded. | Screenshot or script showing read.csv() and head(data) output. |
| SPSS | Import a CSV in SPSS | Import a CSV file (File > Open > Data). Confirm the data appear in Data View and that numeric columns are set to Type Numeric. | Screenshot of Data View with imported data and Variable View showing types. |
| Excel | Import a CSV in Excel | Open a CSV file in Excel and remove any blank rows or columns inside the dataset. | Screenshot showing the cleaned dataset. |
| Stata | Import a CSV in Stata | Import a CSV with import delimited using "data.csv", clear. Verify variables in the Variables pane. | Screenshot showing the Variables pane after import. |

## `m3-open-data-file`

- Module: `module-3` | Topic: `jamovi-interface`
- Present: `jamovi`
- Missing: `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Open a Data File in Jamovi | Open a different CSV data file than the one you used in the Learn section. Use File > Open (or the hamburger menu) to import it so you practice importing on your own. | Correct! Use File > Open (or the hamburger menu) to import CSV, Excel, SPSS, and other data formats into Jamovi. |

## `m3-save-or-export`

- Module: `module-3` | Topic: `data-handling`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Save and export in Jamovi | Save your working file as `.omv`, then export the data as `.csv` to a known folder. Confirm both files are created. | Submit a screenshot showing file names/locations for both `.omv` and `.csv`. |
| R | Save and export data in R | After importing your data, save an R-native copy with `saveRDS(data, "data_clean.rds")` and export CSV with `write.csv(data, "data_clean.csv", row.names = FALSE)`. | Script snippet or screenshot showing both saveRDS and write.csv commands. |
| SPSS | Save and export data in SPSS | Save your dataset as `.sav` (File > Save As). Then export to `.csv` (File > Save As and choose CSV) and confirm both files were written. | Screenshot or file list showing `.sav` and `.csv` outputs. |
| Excel | Save workbook and export CSV in Excel | Save the workbook as `.xlsx`. Then Save As a `.csv` copy for the active data sheet. Confirm both files are present in your chosen folder. | Screenshot showing both `.xlsx` and `.csv` files. |
| Stata | Save a Stata Dataset | After importing, save the dataset using save "data_clean.dta", replace. | Screenshot showing the save command in Results. |

## `m3-variable-metadata`

- Module: `module-3` | Topic: `spss-labels`
- Present: `spss`
- Missing: `jamovi`, `r`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| SPSS | Add Variable Labels and Value Labels | Add a Variable Label for one variable and Value Labels for a categorical variable (e.g., 1=Control, 2=Treatment). | Screenshot showing the labels set in Variable View. |

## `m4-deviation-scores`

- Module: `module-4` | Topic: `descriptive-stats`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Deviation Scores | Open your personality dataset (Extraversion, Agreeableness, etc.). Create a computed variable that calculates how far each person's Extraversion score deviates from the mean: Extraversion - VMEAN(Extraversion). | Correct! Deviation scores for Extraversion show how far each value is from the mean. The sum of this column is zero. |
| R | Deviation scores (Extraversion − mean) | With your personality data loaded, add a variable `dev_ex` = Extraversion minus its mean. Example: `data <- data %>% dplyr::mutate(dev_ex = Extraversion - mean(Extraversion, na.rm = TRUE))` or base R: `data$dev_ex <- data$Extraversion - mean(data$Extraversion, na.rm = TRUE)`. Run `head()` and confirm the new column. | Script snippet or screenshot showing the new column and head(data). |
| SPSS | Deviation scores in SPSS (Compute) | Transform > Compute Variable. Target: DEV_EX. Numeric expression: Extraversion - MEAN(Extraversion). (If your variable name differs, substitute it.) Run Descriptives on DEV_EX and note the mean is ~0. | Screenshot of Compute dialog or output showing DEV_EX. |
| Excel | Deviation scores in Excel | Suppose Extraversion is in column B (B2:B101). In C2 use =B2-AVERAGE($B$2:$B$101) and fill down. Verify the average of column C is ~0. | Screenshot showing formula and a few rows. |
| Stata | Deviation scores in Stata | After loading data: `summarize Extraversion` then `gen dev_ex = Extraversion - r(mean)` (replace variable name if needed). `summarize dev_ex` — mean should be ~0. | Screenshot of commands and summarize dev_ex. |

## `m4-normality`

- Module: `module-4` | Topic: `normality`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Test for Normality | Using your personality dataset, check whether Extraversion (or Neuroticism) is normally distributed. Find the Shapiro-Wilk normality test in Jamovi (Exploration > Descriptives > Statistics). | Correct! p > .05 suggests the distribution is not significantly different from normal. |
| R | Normality check in R (Shapiro–Wilk) | `shapiro.test(data$Extraversion)` on a reasonable N (Shapiro is often used for n roughly 3–5000). Interpret the p-value. | Output of shapiro.test. |
| SPSS | Normality check in SPSS | Analyze > Descriptive Statistics > Explore. Add Extraversion. Under Plots check Normality plots with tests, or use Shapiro–Wilk from Descriptives if available in your version. | Screenshot of tests output. |
| Excel | Normality assessment in Excel | Build a histogram for Extraversion. If available, use Descriptive Statistics with skewness/kurtosis. Note: Excel has no built-in Shapiro–Wilk; focus on visual + skewness for this task. | Screenshot of histogram or descriptive stats. |
| Stata | Normality check in Stata | `histogram Extraversion, normal` then `swilk Extraversion`. Interpret p-value. | Screenshot of swilk output. |

## `m4-report-descriptives`

- Module: `module-4` | Topic: `descriptive-stats`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Report Descriptives for One Variable | Using your personality dataset, run Exploration > Descriptives for Extraversion (or Agreeableness). Write a short summary of mean, median, SD, and min/max. | Screenshot of Descriptives output for the personality variable and a short write-up. |
| R | Report descriptives in R | `summary()` plus `sd(..., na.rm=TRUE)` or `psych::describe()` / `skimr::skim()` for a compact table. Write 1–2 sentences. | Output + short write-up. |
| SPSS | Report descriptives in SPSS | Analyze > Descriptive Statistics > Descriptives. Request mean, median, std deviation, min, max. Summarize in prose. | Table screenshot + 1–2 sentences. |
| Excel | Report descriptives in Excel | Below your data (or in a summary block), compute all five statistics for the Extraversion column. | Screenshot of cells with formulas/results + brief interpretation. |
| Stata | Report descriptives in Stata | `summarize Extraversion, detail` reports mean, median, SD-ish spread, min, max. Summarize in prose. | Output screenshot + sentences. |

## `m4-skew-justify`

- Module: `module-4` | Topic: `descriptive-stats`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Evaluate Skew and Outliers | Using your personality dataset, run Descriptives for Extraversion (or another scale). Use skewness and kurtosis (and an optional plot) to assess whether the distribution is skewed or has outliers. Justify when reporting median and IQR would be more appropriate than mean and SD. | Descriptives output screenshot and a short justification (2-3 sentences). |
| R | Skew and reporting in R | `moments::skewness` or `e1071::skewness` on Extraversion; optional ggplot histogram. Write 2–3 sentences on whether mean/SD or median/IQR is more appropriate. | Plot/stat + short justification. |
| SPSS | Skew and reporting in SPSS | Request skewness and histogram. Argue for mean/SD vs median/IQR in 2–3 sentences. | Output + justification. |
| Excel | Skew and reporting in Excel | =SKEW(range) for Extraversion. Build histogram. Justify mean/SD vs median/IQR. | Screenshot + short paragraph. |
| Stata | Skew and reporting in Stata | `summarize Extraversion, detail` and `histogram Extraversion, normal`. Justify reporting choice. | Output + justification. |

## `m4-split-by-group`

- Module: `module-4` | Topic: `descriptive-stats`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Descriptives Split by Group | Using your personality dataset, run Descriptives for Extraversion (or Agreeableness) and use Split by with a grouping variable (e.g. gender, or a recoded category). Identify which group has higher center and larger spread. | Output screenshot and 2-3 sentences comparing groups. |
| R | Descriptives by group in R | `aggregate(Extraversion ~ Group, data, FUN = mean)` or `dplyr::group_by(Group) %>% summarize(...)` for mean and SD by group. | Output table + 2–3 sentence comparison. |
| SPSS | Descriptives by group in SPSS | Use Data > Split File > Compare groups, then Descriptives for Extraversion; or Explore with factor list for groups. | Output screenshot + comparison sentences. |
| Excel | Descriptives by group in Excel | For each group code, compute mean (and optionally SD) of Extraversion. PivotTable: rows = group, values = Average of Extraversion. | Screenshot + brief comparison. |
| Stata | Descriptives by group in Stata | `bysort gender: summarize Extraversion` (replace gender with your grouping variable). Compare means across groups. | Output + short write-up. |

## `m4-z-inspect`

- Module: `module-4` | Topic: `z-scores`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create and Inspect Z-Scores | Using your personality dataset, create a z-score version of Extraversion (via Descriptives or Compute). Identify any cases with \|z\| >= 2 (or your chosen cutoff). | Screenshot showing the z-score column and any identified extreme rows. |
| R | Inspect z-scores in R | After creating z scores, `which(abs(z_ex) >= 2)` or filter rows. Note case numbers or row ids. | Code/output listing flagged cases. |
| SPSS | Inspect z-scores in SPSS | Create z-scores (prior task). In Data View, sort descending on Z column or use Select Cases IF abs(ZExtraversion) >= 2. | Screenshot showing extreme z rows. |
| Excel | Inspect z-scores in Excel | Highlight cells where ABS(z_column) >= 2. | Screenshot with highlighted rows. |
| Stata | Inspect z-scores in Stata | `egen z_ex = std(Extraversion)` then `list if abs(z_ex) >= 2`. | Output listing. |

## `m4-z-scores`

- Module: `module-4` | Topic: `z-scores`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Z-Scores in Jamovi | Using your personality dataset, convert Extraversion (or another scale variable) to z-scores. Find how to create z-scores in Jamovi (Exploration > Descriptives). | Correct! In Descriptives, check "Z-scores" to add a standardized version of Extraversion to the dataset. |
| R | Z-scores in R | Create `z_ex <- scale(data$Extraversion)` or add to tibble with mutate(z_ex = as.numeric(scale(Extraversion))). Inspect with head(). | Screenshot or output showing z-scores. |
| SPSS | Z-scores in SPSS | Analyze > Descriptive Statistics > Descriptives. Add Extraversion. Check “Save standardized values as variables.” Run and find ZExtraversion (or similar) in Data View. | Screenshot of Descriptives dialog or Data View with z column. |
| Excel | Z-scores in Excel | If Extraversion is in B2:B101, in C2 enter =STANDARDIZE(B2,AVERAGE($B$2:$B$101),STDEV.S($B$2:$B$101)) and fill down. | Screenshot with formula and values. |
| Stata | Z-scores in Stata | `egen z_ex = std(Extraversion)` then `summarize z_ex` (mean ~0, sd ~1). | Screenshot of commands and summarize. |

## `m5-abs-deviation-bmi`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Absolute Deviation from Mean BMI | Using your BMI dataset, create a variable for absolute deviation from mean BMI: ABS(BMI - VMEAN(BMI)). This measures how far each person is from the average, regardless of direction. | Screenshot of the formula and the resulting column. |
| R | Absolute deviation (R) | `mutate(ad = abs(BMI - mean(BMI, na.rm=TRUE)))`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Absolute deviation (SPSS) | Compute AD = ABS(BMI - MEAN(BMI)). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Absolute deviation (Excel) | =ABS(B2-$C$1) where C1 holds mean, or inline AVERAGE. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Absolute deviation (Stata) | `summarize BMI` then `gen ad = abs(BMI - r(mean))`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-add-computed-variable`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Add a New Variable | Using your BMI dataset, find where in Jamovi to add a new computed variable (e.g. for a transformation of BMI or exercise). | Correct! Data > Add > Computed Variable lets you create new variables. For one column use VMEAN, VSTDEV, VSUM; for several variables per row use MEAN(A,B,C) or SUM(A,B,C). |
| R | Add a computed column in R | With your BMI (or class) data: `data$newcol <- rowMeans(cbind(Item1, Item2, Item3), na.rm = TRUE)` or dplyr::mutate. Show head(). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Compute a new variable in SPSS | Transform > Compute Variable. Target: NEWCOL. Numeric expression: mean of items (e.g. (Item1+Item2+Item3)/3). Run and verify in Data View. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Add a formula column in Excel | If items are in D2:F2, in G2 use =AVERAGE(D2:F2) and fill down. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Generate a new variable in Stata | `egen rowmean = rowmean(item1 item2 item3)` or `gen total = item1 + item2 + item3`. list in 1/5. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-bar-chart-menu`

- Module: `module-5` | Topic: `visualizations`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a Bar Chart for Frequencies | Using your BMI dataset, create a bar chart for a categorical variable (e.g. gender if you have it, or a BMI category you create). Find the appropriate menu. | Correct! Add your categorical variable to Descriptives and check "Bar plot" under Plots. |
| R | Bar chart of counts (R) | `barplot(table(data$Gender))` or ggplot2 geom_bar(). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Bar chart (SPSS) | Analyze > Descriptive Statistics > Frequencies > Charts > Bar charts. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Column chart (Excel) | Insert bar chart from category counts (PivotTable: rows = category, values = Count). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Bar chart (Stata) | `graph bar (count), over(gender)` or `catplot` if installed. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-boxplot-menu`

- Module: `module-5` | Topic: `visualizations`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a Boxplot | Using your BMI dataset, create a boxplot for BMI. If you have a grouping variable (e.g. gender), add it to Split by; otherwise create a boxplot for BMI only. | Correct! Add BMI to Variables, optionally Split by a grouping variable, then check "Box plot" in Plots. |
| R | Boxplot in R | `boxplot(BMI ~ Gender, data=data)` or ggplot geom_boxplot(). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Boxplot in SPSS | Graphs > Chart Builder > Boxplot; drag DV and optional grouping variable. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Boxplot in Excel | Select numeric column (and category if grouped) > Insert > Box and Whisker. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Boxplot in Stata | `graph box BMI, over(gender)` or `graph box BMI` for one group. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-center-bmi-computed`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a Computed Variable (Centered BMI) | Using your BMI dataset, create a computed variable that centers BMI: BMI - VMEAN(BMI). VMEAN = mean of one column; MEAN(A, B, C) = mean of several variables per row. | Screenshot of the formula and the new centered BMI column. |
| R | Center BMI in R | `mutate(bmi_c = BMI - mean(BMI, na.rm=TRUE))` or `data$bmi_c <- data$BMI - mean(data$BMI, na.rm=TRUE)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Center BMI in SPSS | Transform > Compute: BMICENT = BMI - MEAN(BMI). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Center BMI in Excel | If BMI is column B: C2 = B2 - AVERAGE($B$2:$B$101). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Center BMI in Stata | `summarize BMI` then `gen bmi_c = BMI - r(mean)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-center-bmi-instructional`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Center BMI (or Exercise) Around the Mean | Using your BMI dataset, create a computed variable that centers BMI around its mean: BMI - VMEAN(BMI). Optionally do the same for exercise hours. | Screenshot showing the formula and the centered variable next to BMI. |
| R | Center BMI (R) | Create bmi_c = BMI - mean(BMI); verify mean(bmi_c)≈0. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Center BMI (SPSS) | Compute BMICENT = BMI - MEAN(BMI). Descriptives: mean ~0. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Center BMI (Excel) | New column = BMI cell - AVERAGE($B$2:$B$n). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Center BMI (Stata) | `egen bmi_c = center(BMI)` or manual gen as in m5-center-bmi-computed. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-contingency-row-column-pct`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Contingency Table with Row and Column Percentages | Using your BMI dataset, create a contingency table (e.g. gender by BMI category). Display it with row percentages, then with column percentages. Explain how the interpretation differs. | Two screenshots (row % and column %) and 3-4 sentences comparing interpretations. |
| R | Prop.table (R) | `prop.table(table(a,b), margin=1)` vs margin=2; interpret difference. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Crosstabs % (SPSS) | Crosstabs > Cells > Row and Column percentages; screenshot both. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Pivot % (Excel) | PivotTable > Show Values As > % of Row Parent / % of Column. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | tab, row col (Stata) | `tab gender bmicat, row col` compare interpretations. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-contingency-table-menu`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a Contingency Table | Using your BMI dataset, create a contingency table (e.g. gender by BMI category, or two other categorical variables). Use Frequencies > Contingency Tables. | Correct! Frequencies > Contingency Tables creates a crosstab. Add row and column percentages under "Cells" options. |
| R | Two-way table (R) | `table(data$rowvar, data$colvar)` or tidyr::pivot_wider after count(). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Crosstabs (SPSS) | Analyze > Descriptive Statistics > Crosstabs. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Pivot crosstab (Excel) | PivotTable with two categoricals in Rows/Columns, Values = Count. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | twoway tab (Stata) | `tabulate gender bmicat, chi2` optional. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-filter-compare-descriptives`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Apply a Filter and Compare Descriptives | Using your BMI dataset, create a filter (e.g. BMI >= 25, or exercise > 0). Run Descriptives for BMI with the filter ON and OFF and compare how N, mean, and SD change. | Screenshots of outputs with filter ON and OFF. |
| R | Subset and summarize in R | `dplyr::filter(BMI >= 25) \|> summarize(m=mean(BMI), s=sd(BMI))` vs full data. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Select cases and descriptives (SPSS) | Data > Select Cases > If (e.g. BMI >= 25). Run Analyze > Descriptives. Repeat with all cases. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Filter and SUBTOTAL in Excel | Turn on Filter; use SUBTOTAL or copy visible cells; compare to full column AVERAGE/STDEV.S. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | if condition and summarize in Stata | `summarize BMI if BMI>=25` vs `summarize BMI`. Note N and mean/SD change. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-filter-complex-and-or`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Complex Logical Expression with AND/OR | Using your BMI dataset, create a filter using AND and/or OR (e.g. BMI >= 25 and exercise < 2, or BMI < 18.5). Run Descriptives with the filter on and briefly explain who is included. | Screenshot of the filter formula and output, plus a brief explanation of the logic. |
| R | Complex filter (R) | filter((BMI>=25 & exercise<2) \| BMI<18.5); summarize who remains. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Complex select (SPSS) | Select Cases: (BMI >= 25 AND exercise < 2) OR (BMI < 18.5). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Advanced filter (Excel) | Helper column with TRUE/FALSE from AND/OR; filter TRUE. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | compound if (Stata) | `count if (BMI>=25 & exercise<2) \| BMI<18.5` and describe subset. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-filter-subset-descriptives`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Filter Data to Extract Subsets | Using your BMI dataset, create a filter (e.g. BMI >= 25, or exercise > 0) and run Descriptives for BMI with the filter on. Compare to when the filter is off. | Screenshot showing the filter and descriptives output with the filter active. |
| R | Filter + summarize (R) | filter(BMI>=25) \|> summarize(mean(BMI), sd(BMI), n=n()). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Select cases + descriptives (SPSS) | Select Cases If BMI>=25; Descriptives on BMI; reset All cases. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Filter + stats (Excel) | Filter rows; AVERAGE visible or helper column. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | if + summarize (Stata) | `summarize BMI if BMI>=25`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-frequency-table-menu`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a Frequency Table | Using your BMI dataset, create a frequency table for a categorical variable (e.g. gender if present, or the BMI category variable you created). Use Descriptives and check "Frequency tables". | Correct! In Descriptives, check "Frequency tables" to see counts and percentages for categorical variables. |
| R | Frequency table (R) | `table(data$gender)` or `dplyr::count(data, gender)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Frequencies (SPSS) | Analyze > Descriptive Statistics > Frequencies. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Pivot counts (Excel) | PivotTable: category in Rows, Count of ID in Values. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | tabulate (Stata) | `tabulate gender, missing` or `tab1 gender`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-histogram-interpret`

- Module: `module-5` | Topic: `visualizations`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a Histogram and Interpret Shape | Using your BMI dataset, produce a histogram for BMI in Descriptives > Plots. Describe the shape: symmetric or skewed? Unimodal or bimodal? Note any obvious outliers. | Histogram screenshot and 2-3 sentences describing the distribution shape. |
| R | Histogram + interpretation (R) | Plot BMI histogram; write 2–3 sentences: skew, modality, outliers. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Histogram + interpretation (SPSS) | Create histogram via Explore or Chart Builder; attach written interpretation. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Histogram + interpretation (Excel) | Create histogram; comment on shape in 2–3 sentences. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Histogram + interpretation (Stata) | `histogram BMI`; describe symmetry/skew and any extreme tails. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-histogram-menu`

- Module: `module-5` | Topic: `visualizations`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a Histogram | Using your BMI and exercise dataset, create a histogram for BMI. Find where to create plots in Jamovi (Exploration > Descriptives > Plots). | Correct! In Descriptives, add BMI to Variables, expand "Plots" and check "Histogram". |
| R | Histogram in R | `hist(data$BMI, main="BMI", col="steelblue")` or ggplot2::geom_histogram(). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Histogram in SPSS | Graphs > Chart Builder > Histogram, or Analyze > Descriptive Statistics > Explore > Plots. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Histogram in Excel | Select BMI data > Insert > Statistic Chart > Histogram (Excel 2016+), or build bins with FREQUENCY. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Histogram in Stata | `histogram BMI, frequency normal` or `twoway histogram BMI`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-logical-category-menu`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Transform Data with Logical Expressions | Using your BMI dataset, create a computed variable or use Transform with a logical expression to categorize BMI (e.g. BMI >= 25 → "Overweight", else "Not overweight"). | Correct! Use IF() and logical operators, or Transform with recode conditions, to create categories from BMI. |
| R | Logical recode (R) | `ifelse(BMI >= 25, "Over", "Not")` or dplyr::case_when. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | IF compute (SPSS) | Transform > Compute: overwt = (BMI >= 1)*1 or use IF(BMI >= 25, 1, 0). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | IF/IFS (Excel) | =IF(B2>=25,"Over","Not over") | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | cond/replace (Stata) | `gen over = BMI>=25` or `gen cat = cond(BMI>=25,1,0)` with labels. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-math-transform-bmi`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Use Mathematical Functions on BMI | Using your BMI dataset, create a computed variable using a mathematical function (e.g. LOG(BMI), SQRT(BMI), or LN(BMI)) and write 2-3 sentences on when such a transformation is useful (e.g. for skewed distributions). | Screenshot of the formula and a short explanation of when the transformation is appropriate. |
| R | LOG/SQRT transform (R) | Create log_bmi = log(BMI) (natural log); note zeros/negatives invalid. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | LG10/SQRT (SPSS) | Compute with LG10 or SQRT as appropriate; handle zeros. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | LN/SQRT (Excel) | Use LN, LOG, SQRT functions; document skew rationale in 2–3 sentences. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | log/sqrt (Stata) | `gen lb = log(BMI)` or sqrt; explain when transform helps right skew. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-recode-bmi-categories`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Recode BMI into Weight Categories | Using your BMI dataset, use Data > Transform (Add recode condition) to recode BMI into three categories. Use standard cut points (e.g. under 18.5, 18.5 to 25, 25+) or Low/Normal/High. | Screenshot of the transform rules and the new categorical column. |
| R | Recode BMI into categories (R) | `dplyr::case_when(BMI < 18.5 ~ "Under", BMI < 25 ~ "Normal", TRUE ~ "Over")` into a factor column. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Recode BMI (SPSS) | Transform > Recode into Different Variables, or Compute with ranges and string labels. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Recode BMI (Excel) | =IFS(B2<18.5,"Under",B2<25,"Normal",TRUE,"Over") in a new column. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Recode BMI (Stata) | `gen bcat = cond(BMI<18.5,0, cond(BMI<25,1,2))` then add value labels, or `egen bcat = cut(BMI), at(0,18.5,25,40)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-recode-exercise-categories`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Recode Exercise (or BMI) into Categories | Using your BMI dataset, recode exercise hours (or BMI if you prefer) into 3 categories (e.g. Low/Medium/High) using Data > Transform with Add recode condition or nested IF. | Screenshot of the transform or formula and the new categorical column. |
| R | Cut exercise into 3 levels (R) | Use case_when on exercise hours with your cutpoints (e.g. <2, <5, else High). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Recode exercise (SPSS) | Transform > Recode into Different Variables with ranges. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Exercise bands (Excel) | IFS for three bands. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Exercise categories (Stata) | `gen exg = 1 if exercise<2; replace exg=2 if exercise<5 & mi(exg); replace exg=3 if mi(exg)` (adjust logic). | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-reusable-transform`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create a Reusable Transform | Using your BMI dataset, create a transformation in Data > Transform (e.g. center with $source - VMEAN($source)) that can be applied to both BMI and exercise. Apply it to at least two variables. | Screenshot showing the transform definition and both variables it was applied to. |
| R | Center two columns (R) | `mutate(across(c(BMI, exercise), ~ .x - mean(.x, na.rm=TRUE), .names = "{.col}_c"))`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Compute centered copy (SPSS) | Compute BMIC, EXERC with each minus its MEAN(). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Reuse formula pattern (Excel) | Two columns: each minus AVERAGE of that column. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Loop or egen (Stata) | `foreach v of varlist bmi exercise { egen c_`v' = center(`v') }` or two gen lines. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m5-transform-bmi-categories`

- Module: `module-5` | Topic: `data-manipulation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Use Transform with Conditional Rules (BMI) | Using your BMI dataset, use Data > Transform with Add recode condition to create BMI categories (e.g. if $source < 18.5 use "Underweight", if $source < 25 use "Normal", else use "Overweight"). | Screenshot showing the conditional rules in the Transform panel and the new column. |
| R | WHO BMI bands (R) | case_when(BMI<18.5 ~ "Underweight", BMI<25 ~ "Normal", TRUE ~ "Overweight"). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | WHO BMI bands (SPSS) | Recode or Compute string labels with nested conditions. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | WHO BMI bands (Excel) | =IFS(B2<18.5,"Under",B2<25,"Normal",TRUE,"Over") | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | WHO BMI bands (Stata) | Same multi-branch cond as recode BMI task. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-binomial-probabilities`

- Module: `module-6` | Topic: `binomial-distribution`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Binomial Probabilities | Calculate the probability of getting exactly 7 heads in 10 coin flips using the binomial distribution. | Screenshot showing the calculation and your answer. |
| R | dbinom (R) | `dbinom(7,10,0.5)` for P(X=7) with n=10,p=0.5. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | PDF.BINOM (SPSS) | Transform > Compute: PDF.BINOM(k,n,p) or CDF as needed. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | BINOM.DIST (Excel) | =BINOM.DIST(7,10,0.5,FALSE) for exact; TRUE for cumulative. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | binomialp (Stata) | `display Binomial(7,10,0.5)` if supported; or `bitesti` / `binomialp` per version. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-central-limit-theorem`

- Module: `module-6` | Topic: `central-limit-theorem`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Observe the Central Limit Theorem | Generate a non-normal distribution (e.g., uniform). Take multiple samples and calculate means. Plot the distribution of these means and describe its shape. | Two histograms (original distribution and distribution of means) with explanation. |
| R | CLT sim (R) | Sample from runif, replicate 1000 means of n=30; `hist(means)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | CLT (SPSS) | Approximate with repeated sampling syntax or export to R. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | CLT (Excel) | Approximate with many AVERAGE of RAND() blocks. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | CLT (Stata) | Program: draw samples, save r(mean); histogram of means. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-ci-mean-menu`

- Module: `module-6` | Topic: `sampling`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Confidence Intervals | Calculate a 95% confidence interval for the mean test score. Find where to request confidence intervals. | Correct! In Descriptives, check "Confidence interval for Mean" under Statistics. The default is 95% CI. |
| R | CI for mean (R) | `t.test(x)$conf.int` or `mean_cl_boot` in ggplot2; or manual mean ± t*SE. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | CI for mean (SPSS) | Analyze > Descriptive Statistics > Explore or Descriptives; check CI for mean. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | CONFIDENCE (Excel) | Use Descriptive Statistics tool or =AVERAGE±T.INV.2T(0.05,n-1)*STDEV.S/SQRT(n). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | ci means (Stata) | `ci means score` or `ttest score` for one-sample CI. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-ci-width-sample-size`

- Module: `module-6` | Topic: `confidence-intervals`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Effect of Sample Size on CI Width | Generate three samples of different sizes (N=10, 30, 100) from the same population. Calculate 95% CIs for each and explain the pattern in CI widths. | Three CIs with sample sizes and 3-4 sentences explaining the relationship. |
| R | CI width vs N (R) | Draw three samples; `t.test` each; compare conf.int width. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | CI width vs N (SPSS) | Three datasets or subsets; compare CI lengths in output. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | CI width vs N (Excel) | Three different n; compute margin = t*SE; compare. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | CI width vs N (Stata) | Run `ci means` on subsamples of sizes 10,30,100; compare widths. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-compare-random-samples`

- Module: `module-6` | Topic: `random-sampling`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Compare Two Random Samples | Create two random samples (or two random columns) of the same size and compare their means/SDs in Descriptives. | Descriptives output screenshot. |
| R | Two random columns (R) | Draw u1, u2 ~ Uniform; `summary(u1); summary(u2)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Two RV columns (SPSS) | Create two uniform RV columns; Descriptives on both. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Two RAND columns (Excel) | Two columns of RAND(); AVERAGE/STDEV each. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Two uniforms (Stata) | `gen u1=runiform(); gen u2=runiform(); summarize u1 u2`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-distribution-shapes`

- Module: `module-6` | Topic: `other-distributions`
- Present: `jamovi`
- Missing: `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Compare Distribution Shapes | Describe when you would use the t-distribution vs normal distribution, and briefly explain what χ² and F distributions are used for. | 4-5 sentences explaining when to use each distribution. |

## `m6-empirical-rule`

- Module: `module-6` | Topic: `normal-distribution`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Apply the Empirical Rule | Given IQ scores are normally distributed with mean=100 and SD=15, calculate what percentage of people have IQs between 85 and 115. | Your calculation and explanation. |
| R | Empirical rule check (R) | For N(100,15): `pnorm(115)-pnorm(85)` ≈ 0.68. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Empirical rule (SPSS) | Compute difference of CDF.NORMAL at 115 and 85 with mean 100 sd 15. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | NORM rules (Excel) | =NORM.DIST(115,100,15,TRUE)-NORM.DIST(85,100,15,TRUE). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | normal calc (Stata) | `display normal((115-100)/15) - normal((85-100)/15)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-frequentist-vs-bayesian`

- Module: `module-6` | Topic: `probability-concepts`
- Present: `jamovi`
- Missing: `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Frequentist vs Bayesian Interpretation | Explain the difference between frequentist and Bayesian probability interpretations using a real-world example (e.g., weather forecasting). | 3-4 sentences explaining both perspectives with your example. |

## `m6-interpret-ci`

- Module: `module-6` | Topic: `confidence-intervals`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Interpret Confidence Intervals | Calculate a 95% CI for a sample mean and explain what this interval tells us. Include both the correct frequentist interpretation and common misinterpretations. | CI calculation, correct interpretation, and one common misinterpretation to avoid. |
| R | CI interpretation + calc (R) | Compute 95% CI for a mean; write correct interpretation (repeated sampling). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | CI output (SPSS) | Get CI from t-test or descriptives; write 2–3 sentences avoiding P(μ in interval). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | CI (Excel) | Build CI with T.INV; interpret in writing. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | CI (Stata) | `ci means x`; interpret in words. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-law-large-numbers`

- Module: `module-6` | Topic: `law-of-large-numbers`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Demonstrate Law of Large Numbers | Generate random samples of increasing sizes (N=10, 50, 200) from a normal distribution with mean=100. Compare how close the sample means are to 100. | Table showing sample sizes and their means, plus 2-3 sentences about the pattern. |
| R | LLN demo (R) | Draw N=10,50,200 from N(100,15); print `mean()` each. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | LLN (SPSS) | Sample subsets or use different case selections; compare means. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | LLN (Excel) | Use different row counts from simulated N(100,15) via NORM.INV(RAND(),100,15). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | LLN (Stata) | `set obs` 10/50/200; gen x=rnormal(100,15); tabstat x, s(mean). | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-normal-probabilities`

- Module: `module-6` | Topic: `normal-distribution`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Find Probabilities Using the Normal Distribution | You need to find the probability of scoring above a certain z-score. Use Jamovi's distribution functions. | Correct! Exploration > Distribution lets you calculate probabilities for normal and other distributions. Enter your z-score to find cumulative probabilities. |
| R | Normal tail probs (R) | `pnorm(1.5)` for Φ(1.5); `1-pnorm(z)` for upper tail; match your z from the exercise. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Normal CDF (SPSS) | Transform > Compute Variable: use CDF.NORMAL(q, mean, sd) for cumulative probability. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | NORM.DIST (Excel) | =NORM.DIST(z,0,1,TRUE) for Φ(z); upper tail = 1 - that. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | normal() (Stata) | `display normal(1.5)`; `display 1-normal(1.5)` for upper tail. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-random-variable-histogram`

- Module: `module-6` | Topic: `random-sampling`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Generate a Random Variable and Plot It | Create a random variable using jamovi compute formulas (e.g., random uniform) and plot a histogram. Explain whether the shape matches expectation. | Histogram screenshot and a short explanation. |
| R | Random draws + hist (R) | `x <- runif(500); hist(x, main="Uniform")` or `rnorm`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | RV + chart (SPSS) | Use Simulation or Compute with RV.UNIFORM / similar; graph histogram. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | RAND + histogram (Excel) | Fill =RAND() in 500 cells; insert histogram. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | runiform + hist (Stata) | `clear; set obs 500; gen u=runiform(); histogram u`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-sample-vs-population-sd`

- Module: `module-6` | Topic: `parameter-estimation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Estimate Population Parameters | Given a sample of test scores, calculate both the sample standard deviation (s) and the estimated population standard deviation (σ̂). Explain why they differ. | Both calculations and 2-3 sentence explanation of the N-1 correction. |
| R | sd vs σ̂ (R) | `sd(x)` uses n-1; compare to `sqrt(mean((x-mean(x))^2))` (population style on sample). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | SD options (SPSS) | Descriptives: SD is sample (n-1). Discuss bias correction. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | STDEV.S vs P (Excel) | Compare STDEV.S and STDEV.P on same column. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | sd vs sd with n-1 (Stata) | `summarize x`; explain divide-by N vs N-1; `egen popsd = ...` optional. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-sampling-distribution-mean`

- Module: `module-6` | Topic: `random-sampling`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Mini Sampling Distribution | Generate many random values and summarize the distribution of the sample mean. Describe what the spread implies about uncertainty. | Plot/output screenshot and a short interpretation. |
| R | Simulate x̄ (R) | For loop: many samples of size n, store `mean()`; `hist(means)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Simulate means (SPSS) | Use OMS / syntax loop if available, or smaller classroom approximation with few batches. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Sample means (Excel) | Use many rows of AVERAGE(RANDBETWEEN...) or Data Table to approximate. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | simulate in Stata | `simulate mean=r(mean), rep(1000): summarize x` style one-liner after defining program, or manual batches. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m6-sampling-methods`

- Module: `module-6` | Topic: `sampling-theory`
- Present: `jamovi`
- Missing: `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Identify Sampling Methods | Describe three scenarios using different sampling methods: simple random sampling, stratified sampling, and convenience sampling. Explain which is best for generalizing to a population. | 3 short scenarios (2-3 sentences each) with explanations. |

## `m7-apa-results-onesample`

- Module: `module-7` | Topic: `hypothesis-testing`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Write an APA-Style Results Statement | Run a one-sample t-test and write a complete APA-style results sentence including: descriptive statistics, test statistic with df, p-value, and effect size. Example format: "Participants (M = 106.8, SD = 13.4) scored significantly higher than the population mean of 100, t(24) = 2.54, p = .018, d = 0.51." | Screenshot of Jamovi output and one properly formatted APA results sentence |
| R | APA one-sample t (R) | Run t.test; write APA: M, SD, t(df), p, d. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | APA one-sample t (SPSS) | Copy SPSS tables; one APA sentence. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | APA one-sample t (Excel) | Compute stats; one APA sentence. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | APA one-sample t (Stata) | `ttest x==μ`; write APA sentence with values. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m7-binomial-proportion-test`

- Module: `module-7` | Topic: `hypothesis-testing`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run a Binomial Test (Proportion Test) | You have data on 100 coin flips with 62 heads. Test if this differs significantly from the expected 50% using a binomial test (Proportion Test in Jamovi). | Correct! Analyses > Frequencies > Proportion Test. This tests if your observed proportion (62/100 = 0.62) differs significantly from the test value (0.5). |
| R | binom.test (R) | `binom.test(62,100,p=0.5)` for 62 heads in 100. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Binomial test (SPSS) | Use One-Sample Proportions / Binomial per your SPSS version. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | BINOM.DIST manual (Excel) | Use BINOM.DIST for exact two-tailed p or describe limitation. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | bitesti (Stata) | `bitesti 100 62 0.5` or `prtesti 100 62 0.5`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m7-cohens-d-onesample`

- Module: `module-7` | Topic: `effect-size`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate and Report Cohen's d | Run a one-sample t-test. Enable "Effect size" in the options. Report the Cohen's d value and classify it as small (~0.2), medium (~0.5), or large (~0.8). | Screenshot showing Cohen's d and a sentence classifying the effect size magnitude |
| R | Cohen's d one-sample (R) | Use `effectsize::cohens_d(x, mu=100)` or manual (mean(x)-mu)/sd(x). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Cohen's d (SPSS) | One-Sample T Test: Options > Effect sizes (Cohen d). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Cohen's d (Excel) | Compute d = (AVERAGE-MU)/STDEV.S(range). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Cohen's d (Stata) | `esize onewell iq, mu(100)` or manual. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m7-compare-alpha-levels`

- Module: `module-7` | Topic: `p-values`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Compare Results with Different Significance Levels | You get p = 0.032 from a test. Would your decision change at α = 0.05 vs α = 0.01? Explain what this tells you about the strength of evidence. | Written comparison and interpretation |

## `m7-interpret-p-value-output`

- Module: `module-7` | Topic: `p-values`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Interpret a P-Value Correctly | Run any hypothesis test in Jamovi and locate the p-value. Write one sentence correctly interpreting what the p-value means (avoid common mistakes like "probability the null is true"). | Screenshot of results and one sentence interpreting the p-value |
| R | p-value sentence (R) | Run a test; one sentence: if H0 true, chance of this extreme data. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | p-value sentence (SPSS) | Paste output; write interpretation avoiding P(H0 true). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | p-value sentence (Excel) | From test output; write frequentist interpretation. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | p-value sentence (Stata) | From `ttest`/`prtest`; write one correct sentence. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m7-multiple-comparisons`

- Module: `module-7` | Topic: `p-values`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | The Multiple Comparisons Problem | If you run 20 independent hypothesis tests, each at α = 0.05, what's the probability of getting at least one false positive (Type I error) just by chance? Show your calculation and explain why this is a problem. | Calculation and written explanation |

## `m7-n-and-p-values`

- Module: `module-7` | Topic: `effect-size`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Relationship Between Sample Size and P-Values | Explain why the same effect size (e.g., mean difference of 3 points) might be significant with N = 200 but not significant with N = 20. What does this tell you about interpreting p-values? | Written explanation (3-4 sentences) |

## `m7-one-sample-t-menu`

- Module: `module-7` | Topic: `hypothesis-testing`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run a One-Sample T-Test | Test whether your sample's mean IQ differs from the population mean of 100. Find the one-sample t-test. | Correct! Analyses > T-Tests > One Sample T-Test. Enter your test value (100) and add your variable. |
| R | One-sample t (R) | `t.test(iq, mu=100)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | One-sample t (SPSS) | Analyze > Compare Means > One-Sample T Test; test value 100. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | T.TEST one-sample (Excel) | =T.TEST(A2:A26,100,1,1) one-tailed example—adjust tails to match exercise. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | ttest one-sample (Stata) | `ttest iq == 100`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m7-one-vs-two-sided`

- Module: `module-7` | Topic: `hypothesis-testing`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Choose Between One-Sided and Two-Sided Test | Scenario 1: You want to test if a new teaching method improves test scores. Scenario 2: You want to test if test scores differ between two groups. For each, state whether you'd use a one-sided or two-sided test and explain why. | Written answers for both scenarios with explanations |

## `m7-stat-vs-practical`

- Module: `module-7` | Topic: `effect-size`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Distinguish Statistical vs Practical Significance | Imagine a study with N = 10,000 finds p = 0.001 but Cohen's d = 0.08. Explain why this is statistically significant but may not be practically important. | Written explanation (3-4 sentences) |

## `m7-state-hypotheses`

- Module: `module-7` | Topic: `hypothesis-testing`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | State Null and Alternative Hypotheses | A researcher wants to test if college students sleep less than the recommended 8 hours per night. Write the null hypothesis (H₀) and alternative hypothesis (H₁) in both words and symbols (using μ for population mean). | Written hypotheses in both words and symbols |

## `m7-t-test-outlier-robustness`

- Module: `module-7` | Topic: `hypothesis-testing`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Robustness to an Outlier Filter | Run a one-sample t-test, then re-run it after applying a filter that removes an outlier. Discuss what changed and what stayed stable. | Two outputs and a short robustness discussion. |
| R | t before/after filter (R) | Run t.test full data; remove extreme row; re-run; compare t and p. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Select cases t (SPSS) | Identify outlier; Select Cases; re-run t-test; reset all cases. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Exclude outlier (Excel) | Re-run T.TEST excluding outlier row. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | drop if + ttest (Stata) | `ttest x==100`; `drop if x==...`; `ttest x==100` again. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m7-t-test-read-output`

- Module: `module-7` | Topic: `hypothesis-testing`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Identify Test Statistic and P-Value | Run a one-sample t-test and identify where the test statistic and p-value appear. Write 2 sentences interpreting the decision. | Output screenshot and 2 sentences interpreting the decision. |
| R | Read t output (R) | Run one-sample t; screenshot t, df, p; 2 sentences decision at α=.05. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Read t output (SPSS) | Run One-Sample T Test; identify t and Sig. (two-tailed). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Read t output (Excel) | Run T.TEST; document statistic and p if available or from Data Analysis. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Read t output (Stata) | `ttest var==μ0`; report t, p, decision. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m7-type1-type2-errors`

- Module: `module-7` | Topic: `hypothesis-testing`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Identify Type I and Type II Errors | For a study testing if a new drug works: (1) Define what a Type I error would be, (2) Define what a Type II error would be, (3) Which error type is controlled by α? | Written definitions and answer to question 3 |

## `m8-anova-f-interpret`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `one-way-anova`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Interpret ANOVA F-Statistic | Explain what the F-ratio measures in ANOVA. What does a large F-value indicate? What happens when group means are very similar? | 3-4 sentences explaining F-ratio interpretation |

## `m8-anova-factorial-gamlj`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `anova`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Factorial ANOVA with Interaction Plot | Using GAMLj, run a factorial ANOVA and create/interpret an interaction plot. | Interaction plot and a 4-5 sentence interpretation. |
| R | Factorial ANOVA + interaction plot (R) | `aov(y ~ A*B)` + `interaction.plot` or `emmip`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Factorial ANOVA + interaction plot (SPSS) | GLM Univariate: two factors, profile plots. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Factorial ANOVA + interaction plot (Excel) | Excel not ideal—describe limitation; use R for plot. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Factorial ANOVA + interaction plot (Stata) | `anova y A##B` or `regress` with i.A##i.B; marginsplot. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-friedman`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `repeated-measures-anova`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Friedman Test (Non-Parametric Repeated Measures) | Run a Friedman test when repeated measures data violate normality assumption. | Correct! Friedman test is like Kruskal-Wallis but for repeated measures designs. |
| R | Friedman test (R) | `friedman.test(cbind(t1,t2,t3))`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Friedman test (SPSS) | Nonparametric related samples. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Friedman test (Excel) | R recommended. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Friedman test (Stata) | `friedman v1 v2 v3`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-full-writeup`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `one-way-anova`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Complete ANOVA Write-Up | Conduct a full one-way ANOVA analysis including: (1) Check assumptions (Levene, Q-Q plot), (2) Run ANOVA with effect size, (3) Conduct post-hoc tests with Holm correction, (4) Write complete APA-formatted results. | Complete analysis including: (1) Assumption checks, (2) jamovi output screenshot, (3) APA-formatted results paragraph (4-6 sentences) |
| R | Full ANOVA write-up (R) | R: aov + car tests + Tukey + effectsize + narrative. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Full ANOVA write-up (SPSS) | SPSS full GLM output + APA. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Full ANOVA write-up (Excel) | Describe limits; lean on R/Stata screenshots. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Full ANOVA write-up (Stata) | Stata oneway + tests + pwmean + APA. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-gamlj-oneway`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `anova`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | One-Way ANOVA in GAMLj | Using GAMLj, run a one-way ANOVA with 3+ groups and obtain omnibus results plus post-hoc comparisons if available. | GAMLj output screenshot. |
| R | One-way ANOVA + post-hoc (R) | `aov` + `TukeyHSD()` or `emmeans`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | One-way ANOVA + post-hoc (SPSS) | One-Way ANOVA > Post Hoc (Tukey/Bonferroni). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | One-way ANOVA + post-hoc (Excel) | Limited post-hoc in Excel—use R note. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | One-way ANOVA + post-hoc (Stata) | `oneway y g, bonferroni` / `pwmean y, over(g) mcompare(bonf)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-kruskal`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `anova-alternatives`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run Kruskal-Wallis Test (Non-Parametric) | Run a Kruskal-Wallis test as a non-parametric alternative to one-way ANOVA. This test works on ranks instead of raw scores. | Correct! Kruskal-Wallis is the non-parametric version of one-way ANOVA, used when normality assumption is violated. |
| R | Kruskal–Wallis (R) | `kruskal.test(y ~ g)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Kruskal–Wallis (SPSS) | Nonparametric > K Independent Samples. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Kruskal–Wallis (Excel) | Rank-based workaround or R. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Kruskal–Wallis (Stata) | `kwallis y, by(g)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-levene`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `anova-assumptions`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Check Homogeneity of Variance (Levene Test) | Run Levene's test to check the homogeneity of variance assumption. Interpret the result (p-value). | Levene's test checks if group variances are significantly different. Non-significant result (p > .05) means assumption is met. |
| R | Levene (ANOVA) (R) | `car::leveneTest(y ~ g)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Levene (ANOVA) (SPSS) | One-Way ANOVA > Options > Homogeneity tests. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Levene (ANOVA) (Excel) | Manual or R. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Levene (ANOVA) (Stata) | `robvar y, by(g)` or `oneway y g, tabulate`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-mauchly`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `repeated-measures-anova`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Check Sphericity Assumption (Mauchly Test) | Run Mauchly's test of sphericity. If violated (p < .05), apply Greenhouse-Geisser or Huynh-Feldt correction. | Mauchly's test checks if variances of differences between conditions are equal. Corrections adjust for violations. |
| R | Mauchly sphericity (R) | `summary` of repeated aov shows Mauchly; use GG correction packages. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Mauchly sphericity (SPSS) | GLM Repeated > Estimates > Sphericity tests and corrections. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Mauchly sphericity (Excel) | Document from software output. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Mauchly sphericity (Stata) | `manova` / `anova` repeated options for epsilon. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-multiple-comp-written`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `post-hoc-tests`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Understanding Multiple Comparisons Problem | Calculate the family-wise error rate when running 3 pairwise t-tests at α = .05 without correction. Explain why this is a problem. | Calculation and 2-3 sentences explaining the problem |

## `m8-anova-oneway-ch13`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `one-way-anova`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run One-Way ANOVA in jamovi | Run a one-way ANOVA comparing mood improvement across three drugs (Placebo, Anxifree, Joyzepam). Include effect size (eta-squared). | Correct! ANOVA compares group means. Check the Effect Size option to get η² (eta-squared). |
| R | One-way ANOVA + η² (R) | `summary(aov(y~g)); library(effectsize); eta_squared`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | One-way ANOVA + η² (SPSS) | One-Way ANOVA > Options effect size. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | One-way ANOVA + η² (Excel) | Limited—use R for η². | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | One-way ANOVA + η² (Stata) | `oneway y g`; `estat esize` if available. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-oneway-nav`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `anova`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run One-Way ANOVA | Compare test scores across three teaching methods (Traditional, Online, Hybrid) using ANOVA. | Correct! Analyses > ANOVA > One-Way ANOVA. Add your DV to "Dependent Variable" and grouping variable to "Fixed Factors". |
| R | One-way ANOVA (R) | `aov(y ~ group)` or `oneway.test` (Welch). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | One-way ANOVA (SPSS) | Analyze > Compare Means > One-Way ANOVA or GLM Univariate. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | One-way ANOVA (Excel) | Single factor ANOVA tool (limited). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | One-way ANOVA (Stata) | `oneway y group` or `anova y group`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-posthoc-holm`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `post-hoc-tests`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run Post-Hoc Tests with Holm Correction | After running ANOVA, conduct post-hoc pairwise comparisons using the Holm correction to control for multiple testing. | Correct! Holm correction adjusts p-values to control family-wise error rate while being less conservative than Bonferroni. |
| R | Post-hoc Holm (R) | `pairwise.t.test(y,g,p.adjust.method="holm")` or `emmeans` + `pairs(adjust="holm")`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Post-hoc Holm (SPSS) | ANOVA > Post Hoc > Holm. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Post-hoc Holm (Excel) | Manual Bonferroni/Holm adjust p in sheet. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Post-hoc Holm (Stata) | `pwmean y, over(g) mcompare(holm)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-qq-residuals`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `anova-assumptions`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Check Normality with Q-Q Plot | Generate a Q-Q plot for ANOVA residuals and assess whether normality assumption is met. | Q-Q plots show if residuals are normally distributed. Deviations from the line indicate non-normality. |
| R | Residual Q–Q (ANOVA) (R) | `plot(aov, which=2)` or `qqPlot(resid(lm(y~g)))`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Residual Q–Q (ANOVA) (SPSS) | GLM > Plots > Q-Q. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Residual Q–Q (ANOVA) (Excel) | Residuals from regression tool. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Residual Q–Q (ANOVA) (Stata) | `predict` residuals; `qnorm res`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-repeated-measures`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `repeated-measures-anova`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run Repeated Measures ANOVA | Run a repeated measures ANOVA comparing three task scores (Speech, Conceptual, Syntax) from the same 6 participants. | Correct! Repeated measures ANOVA accounts for the fact that same participants appear in all conditions, increasing power. |
| R | Repeated measures ANOVA (R) | `aov(y ~ time + Error(id/time))` or `ezANOVA`; better: `afex::aov_ez`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Repeated measures ANOVA (SPSS) | GLM Repeated Measures. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Repeated measures ANOVA (Excel) | Excel not recommended—use long format in R. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Repeated measures ANOVA (Stata) | `anova y id time` wide or `anova` with repeated; `manova` patterns. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-anova-welch`

- Module: `module-8` | Chapter: `chapter-13` | Topic: `anova-alternatives`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run Welch's ANOVA (Unequal Variances) | Run Welch's one-way ANOVA, which does not assume equal variances. Compare to standard ANOVA F-value. | Correct! Welch's ANOVA adjusts degrees of freedom to account for unequal variances, making it more robust. |
| R | Welch's ANOVA (R) | `oneway.test(y ~ g, var.equal = FALSE)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Welch's ANOVA (SPSS) | One-Way ANOVA Welch option if available. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Welch's ANOVA (Excel) | Note limitation; use R. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Welch's ANOVA (Stata) | `oneway y g, welch`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-apa-writeup`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Write Up Chi-Square Results | Run a chi-square test and write a complete results section including: (1) descriptive statistics, (2) null hypothesis, (3) test statistic with df and p-value, (4) effect size (Cramér's V), and (5) interpretation. | Full write-up in paragraph format (3-5 sentences) |
| R | APA chi-square write-up (R) | Run test in R; write APA results with values from output. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | APA chi-square write-up (SPSS) | Paste SPSS output; write APA paragraph. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | APA chi-square write-up (Excel) | Assemble stats from sheet; write APA. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | APA chi-square write-up (Stata) | Stata output → APA paragraph. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-assumptions`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Check Chi-Square Assumptions | Before accepting chi-square results, check the expected frequencies. The rule of thumb: all expected frequencies should be ≥ 5. If not, consider Fisher exact test. | Assumptions: (1) Expected frequencies ≥ 5 (or 80% above 5, none below 1 for larger tables), and (2) Observations are independent. |
| R | Chi-square assumptions (R) | Print `chisq.test(...)$expected`; flag cells <5. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Chi-square assumptions (SPSS) | Crosstabs expected counts. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Chi-square assumptions (Excel) | Compute expected grid in Excel. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Chi-square assumptions (Stata) | `tabulate ... , chi2` + expected via `predict` or manual. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-by-hand`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Chi-Square Statistic by Hand | Given this 2×2 table: Group A: 30 success, 20 failure Group B: 15 success, 35 failure (1) Calculate expected frequencies for each cell using (Row Total × Column Total)/N (2) Calculate χ² = Σ[(O-E)²/E] by hand (3) Verify your answer matches jamovi output | Hand calculations showing all work, plus jamovi screenshot confirming the result |
| R | Hand χ² + software check (R) | Hand calc then `chisq.test` on same table. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Hand χ² + software check (SPSS) | Verify with Crosstabs output. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Hand χ² + software check (Excel) | Excel formula check vs package. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Hand χ² + software check (Stata) | `tabi` / `csi` to confirm. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-continuity`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Apply Continuity Correction | For a 2×2 contingency table (df=1), apply the continuity correction and compare results with and without the correction. | Correct! The continuity correction (Yates correction) is applied when df = 1. It makes the test more conservative and improves the χ² approximation. |
| R | 2×2 continuity correction (R) | `chisq.test(t, correct=TRUE)` vs `correct=FALSE`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | 2×2 continuity correction (SPSS) | Crosstabs: check continuity correction if offered. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | 2×2 continuity correction (Excel) | Manual Yates: (\|O−E\|−0.5)²/E per cell. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | 2×2 continuity correction (Stata) | `tabi` / `csi` or manual correction; document both. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-cramers-v`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Cramér's V Effect Size | After running a chi-square test of independence, report Cramér's V to indicate the effect size. Interpret whether the association is small (V≈0.1), medium (V≈0.3), or large (V≥0.5). | Cramér's V ranges from 0 (no association) to 1 (perfect association). It works for any size contingency table, unlike phi which can exceed 1 for tables larger than 2×2. |
| R | Cramér's V (R) | `rcompanion::cramerV(t)` or hand formula from χ², n, min(dim)-1. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Cramér's V (SPSS) | Crosstabs > Statistics > Phi and Cramer V. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Cramér's V (Excel) | Compute V from χ² output manually. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Cramér's V (Stata) | `tabulate ... , chi2 V` if available or `assoc` measures. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-custom-proportions`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Specify Custom Expected Proportions | Someone predicts people will choose red cards 60% of the time (30% hearts, 30% diamonds) and black cards 40% (20% clubs, 20% spades). Test this using custom expected proportions. | You can test any null hypothesis as long as the probabilities sum to 1. Enter the ratios (e.g., 1.5 : 1.5 : 1 : 1 for 30%:30%:20%:20%). |
| R | GOF custom probabilities (R) | `chisq.test(counts, p=c(...))` normalized to sum 1. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | GOF custom probabilities (SPSS) | Weight cases or custom expected in SPSS chi-square. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | GOF custom probabilities (Excel) | Manual E = N×p per category. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | GOF custom probabilities (Stata) | Manual or matrix approach with expected vector. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-decision-tree`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Decision Tree: Choose the Right Categorical Test | Create a decision tree to choose between: (1) Goodness-of-fit test, (2) Test of independence, (3) Fisher exact test, (4) McNemar test. Include decision points for: number of variables, independence of observations, expected cell frequencies. | Decision tree diagram (hand-drawn/digital) OR written decision procedure with clear if-then statements |

## `m8-chisq-df-written`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Calculate Degrees of Freedom Manually | For a contingency table with 4 rows and 3 columns: (1) Calculate df for a test of independence, (2) Explain why df = (r-1)(c-1), not r×c, (3) What would df be for a goodness-of-fit test with 6 categories? | Written answers to all three parts (3-4 sentences total) |

## `m8-chisq-dist-properties`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Understand Chi-Square Distribution Properties | Explain: (1) Why is the χ² test always one-sided (right-tailed)? (2) Why does the χ² distribution change shape with different df? (3) Why can't χ² be negative? | Written explanation addressing all three questions (4-6 sentences total) |

## `m8-chisq-expected-freq`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Interpreting Expected Frequencies | Run a chi-square test of independence and display the expected counts. Verify that the expected frequency for one cell equals (Row Total × Column Total) / Grand Total. | Expected frequencies show what we'd expect if there was NO association. They're calculated as (Row Total × Column Total) / N. |
| R | Expected frequencies check (R) | `chisq.test(t)$expected` to view expected matrix. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Expected frequencies check (SPSS) | Crosstabs > Cells > Expected. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Expected frequencies check (Excel) | Compute one cell expected from margin totals in sheet. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Expected frequencies check (Stata) | `tabulate a b, chi2` then `predict` or manual from saved margins. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-fisher`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Fisher Exact Test for Small Samples | You have a 2×2 table with small expected counts (<5). Instead of the standard chi-square test, use Fisher's exact test. | Correct! Fisher's exact test calculates the exact p-value using the hypergeometric distribution. Use it when expected cell counts are < 5. |
| R | Fisher exact test (R) | `fisher.test(t)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Fisher exact test (SPSS) | Crosstabs > Exact > Fisher (or Statistics > Fisher). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Fisher exact test (Excel) | Fisher not native; note jamovi vs Excel limitation. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Fisher exact test (Stata) | `tabulate a b, exact` or `cc a b, exact`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-gof`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Chi-Square Goodness-of-Fit Test | You surveyed 200 people asking them to pick a card suit at random. Test if all four suits (clubs, diamonds, hearts, spades) are equally likely to be chosen using a chi-square goodness-of-fit test. | Correct! Analyses > Frequencies > One Sample Proportion Tests > N Outcomes. Add your categorical variable and check "Expected counts" to see if observed frequencies differ from equal proportions. |
| R | Chi-square goodness-of-fit (R) | `chisq.test(observed, p=expected_probs)` with p summing to 1. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Chi-square goodness-of-fit (SPSS) | Analyze > Nonparametric Tests > One Sample (legacy or new UI) for chi-square GOF. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Chi-square goodness-of-fit (Excel) | Compute (O−E)²/E manually or with helper columns; sum to χ²; compare to CHISQ.INV.RT. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Chi-square goodness-of-fit (Stata) | `csgof` user packages or manual expected counts; `tabulate` + matrix if needed. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-independence`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Chi-Square Test of Independence | Test whether species (robot vs. human) is associated with preference (puppy, flower, or data file) using a chi-square test of independence. | Correct! Analyses > Frequencies > Contingency Tables > Independent Samples. Add one variable to Rows and another to Columns. Check "Expected counts" and "Cramér's V" for effect size. |
| R | Chi-square independence (R) | `chisq.test(table(rowvar,colvar))` or `xtabs`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Chi-square independence (SPSS) | Descriptive Statistics > Crosstabs > Statistics > Chi-square. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Chi-square independence (Excel) | Contingency table + CHISQ.TEST(range) on observed counts. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Chi-square independence (Stata) | `tabulate row col, chi2`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-mcnemar`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | McNemar Test for Paired Data | You asked 100 people if they'd vote for a party BEFORE and AFTER showing an ad. Test if the proportion changed using McNemar's test (NOT a standard chi-square, since data are paired). | Correct! Analyses > Frequencies > Contingency Tables > Paired Samples. McNemar tests for "marginal homogeneity" - whether the proportion saying Yes is the same before and after. |
| R | McNemar paired binary (R) | `mcnemar.test(matrix_2x2)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | McNemar paired binary (SPSS) | Analyze > Nonparametric > Related Samples for McNemar (binary paired). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | McNemar paired binary (Excel) | Manual McNemar on 2×2 paired table. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | McNemar paired binary (Stata) | `mcc` or `symmetry` for paired binary; check Stata help. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-mcnemar-vs-independence`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | McNemar vs. Independence: Know the Difference | Decide: If you measure the SAME participants twice, do you use (A) chi-square test of independence, or (B) McNemar test? | Answer: (B) McNemar test. Use independence test when observations are independent (different people in each cell). Use McNemar when the same people are measured twice (violates independence). |

## `m8-chisq-standardized-residuals`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Interpret Standardized Residuals | After getting a significant χ² test of independence, examine the standardized residuals (available in jamovi under Cells > Residuals). Which cells have residuals > \|2\|? Explain what this means about the association. | Standardized residuals show which cells drive the association. Residuals > \|2\| are "surprising" - they differ from expected by more than 2 standard deviations. |
| R | Standardized residuals (R) | `chisq.test(t)$stdres` if available or compute (O−E)/√E. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Standardized residuals (SPSS) | Crosstabs > Cells > Standardized residuals. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Standardized residuals (Excel) | Compute standardized residual grid. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Standardized residuals (Stata) | `tabulate ... , chi2` + community tools or manual z. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-chisq-survey-analysis`

- Module: `module-8` | Chapter: `chapter-10` | Topic: `categorical-data-analysis`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Real-World Application: Analyze Survey Data | You surveyed 300 students about their major (Psychology, Biology, Math) and stress level (Low, Medium, High). (1) State appropriate null/alternative hypotheses, (2) Choose and run the correct test, (3) Check assumptions, (4) Calculate effect size, (5) Write complete results section with interpretation. | Complete analysis including: (1) Hypotheses, (2) jamovi output screenshot, (3) Assumption check, (4) APA-formatted results paragraph (5-7 sentences) |
| R | Full categorical analysis (R) | Run independence χ²; check expected; Cramér V; write-up. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Full categorical analysis (SPSS) | SPSS Crosstabs pipeline with full options. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Full categorical analysis (Excel) | Excel hybrid workflow with written assumptions. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Full categorical analysis (Stata) | Stata tabulate + assoc measures + write-up. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-correlation-interpret`

- Module: `module-8` | Chapter: `chapter-12` | Topic: `correlation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Pearson Correlation with Interpretation | Run a Pearson correlation and interpret both the numeric correlation and the scatterplot evidence. | Output screenshot and 2-3 sentences of interpretation. |
| R | Correlation + plot interpretation (R) | `cor.test` + `ggplot` scatter. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Correlation + plot interpretation (SPSS) | Bivariate correlation with scatter from Chart Builder. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Correlation + plot interpretation (Excel) | Scatter + CORREL. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Correlation + plot interpretation (Stata) | `pwcorr` + `twoway scatter y x`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-correlation-pearson-nav`

- Module: `module-8` | Chapter: `chapter-12` | Topic: `correlation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Pearson Correlation | Calculate the correlation between study hours and exam scores. | Correct! Analyses > Regression > Correlation Matrix. Add both variables to see Pearson's r. |
| R | Pearson correlation (R) | `cor.test(x, y, method="pearson")` or `cor()`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Pearson correlation (SPSS) | Analyze > Correlate > Bivariate (Pearson). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Pearson correlation (Excel) | CORREL function or Data Analysis > Correlation. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Pearson correlation (Stata) | `pwcorr x y, sig` or `correlate`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-independent-t-report`

- Module: `module-8` | Topic: `t-tests-practice`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Independent Samples T-Test Report | Run an independent-samples t-test and report group means, mean difference, p-value, and an effect size if provided. | Output screenshot and one APA-style results sentence. |
| R | Independent t APA sentence (R) | `t.test` output → one APA sentence + d. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Independent t APA sentence (SPSS) | SPSS Independent T tables → APA. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Independent t APA sentence (Excel) | Assemble means and p manually. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Independent t APA sentence (Stata) | `ttest` output → APA sentence. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-regression-simple-interpret`

- Module: `module-8` | Chapter: `chapter-12` | Topic: `regression`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Simple Linear Regression Interpretation | Run a simple linear regression (DV ~ IV) and interpret the slope and R-squared from the output. | Output screenshot and a short interpretation. |
| R | Regression slope & R² (R) | `summary(lm(y~x))` for coef and R². | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Regression slope & R² (SPSS) | Coefficients table in SPSS regression. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Regression slope & R² (Excel) | Regression output LINEST/Data Analysis. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Regression slope & R² (Stata) | `regress y x`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-regression-simple-nav`

- Module: `module-8` | Chapter: `chapter-12` | Topic: `regression`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run Simple Linear Regression | Use study hours to predict exam scores with simple linear regression. | Correct! Analyses > Regression > Linear Regression. Add your DV (ExamScore) as Dependent Variable and IV (StudyHours) as Covariate. |
| R | Simple linear regression (R) | `lm(y ~ x, data=df)`; `summary()`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Simple linear regression (SPSS) | Analyze > Regression > Linear. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Simple linear regression (Excel) | LINEST or Data Analysis > Regression. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Simple linear regression (Stata) | `regress y x`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-scatterplot-grouped`

- Module: `module-8` | Topic: `regression`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | scatr Grouped Scatterplots | Use scatr to produce grouped scatterplots (color by a categorical variable) and compare relationships by group. | Plot screenshot and a 3-4 sentence interpretation. |
| R | Color by group (R) | aes(color=group) or facet_wrap(~group). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Grouped scatter (SPSS) | Chart Builder: set color/panel with grouping variable. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Series by group (Excel) | Select data with category column for Legend/Series. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | by() facets (Stata) | `twoway scatter y x, by(group)` or separate scatters. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-scatterplot-matrix`

- Module: `module-8` | Topic: `correlation`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Scatterplot Matrix (Correlation Matrix Plot) | Use the Correlation Matrix plot option to create a scatterplot matrix and identify one visible relationship. | Scatterplot matrix screenshot and one identified relationship. |
| R | Pairs plot (R) | `pairs(df[c("x","y","z")])` or GGally::ggpairs(). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Scatterplot matrix (SPSS) | Graphs > Legacy Dialogs > Scatter/Dot > Matrix scatter (if available) or correlate variables then individual plots. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Scatter matrix (Excel) | Build multiple XY scatter mini-charts or use Statistic charts; note Excel limits. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | scatter matrix (Stata) | `graph matrix var1 var2 var3`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-scatterplot-regression-line`

- Module: `module-8` | Topic: `regression`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | scatr Scatterplot with Regression Line | Using the scatr add-on, create a scatterplot with a fitted regression line (and marginal densities if available). Interpret direction and strength. | Plot screenshot and a brief interpretation. |
| R | Scatter + LM line (R) | `ggplot(df, aes(x,y)) + geom_point() + geom_smooth(method="lm", se=TRUE)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Scatter with fit line (SPSS) | Scatterplot > double-click chart > Add Fit Line > Linear. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Trendline (Excel) | Insert Scatter > Chart Design > Add chart element > Trendline > Linear. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | twoway scatter lfit (Stata) | `twoway (scatter y x) (lfit y x)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-ci-mean-diff`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-detailed`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Report Confidence Interval for Mean Difference | Run an independent samples t-test and enable "Mean difference" confidence interval. Explain what the 95% CI tells you about the true population difference. | The 95% CI means: if we repeated this study many times, 95% of the intervals would contain the true population mean difference. If the CI excludes 0, the difference is significant at α = .05. |
| R | CI for mean difference (R) | `t.test(y~g)` conf.int for difference. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | CI for mean difference (SPSS) | Independent T Test table: mean difference CI. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | CI for mean difference (Excel) | From manual SE and t critical. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | CI for mean difference (Stata) | `ttest y, by(g)` displays CI. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-cohens-d-interpret`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `effect-size-ttests`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Interpret Cohen's d in Context | You find d = 0.3 for the difference between two teaching methods. Write 2-3 sentences explaining what this means in practical terms (not just "small/medium/large"). | Written interpretation (2-3 sentences) |

## `m8-ttest-cohens-d-nav`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `effect-size-ttests`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Calculate Cohen's d for T-Tests | Run an independent samples t-test and enable Cohen's d. Interpret whether the effect is small (d≈0.2), medium (d≈0.5), or large (d≈0.8). | Correct! Cohen's d standardizes the mean difference by the pooled standard deviation. It's independent of sample size, unlike p-values. |
| R | Cohen's d (two-sample) (R) | `effectsize::cohens_d(y~g)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Cohen's d (two-sample) (SPSS) | Independent T Test > Options > Effect sizes. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Cohen's d (two-sample) (Excel) | Manual from means and pooled SD. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Cohen's d (two-sample) (Stata) | `esize twosample y, by(g)` or manual. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-decision-tree`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-comprehensive`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Decision Tree: Choose the Right T-Test | Create a decision tree/flowchart that helps you choose between: (1) One-sample t-test, (2) Independent samples t-test (Student or Welch), (3) Paired samples t-test, (4) Mann-Whitney U, (5) Wilcoxon signed-rank. Include decision points for: number of groups, independence, normality, and equal variances. | Decision tree diagram (can be hand-drawn and photographed, or created digitally) with clear decision points and outcomes |

## `m8-ttest-difference-scores`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-practice`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Compare Paired Data: Compute Difference Scores | Create a computed variable for the difference (After - Before). Run a one-sample t-test on the difference scores (test value = 0). Compare to paired samples t-test results - they should be identical! | Screenshots showing: (1) computed difference variable, (2) one-sample t-test on differences, (3) paired samples t-test, (4) 2-sentence explanation of why they match |
| R | Difference scores = paired t (R) | `d <- post-pre`; `t.test(d, mu=0)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Difference scores = paired t (SPSS) | Compute D; One-Sample T on D. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Difference scores = paired t (Excel) | Column D then one-sample T.TEST to 0. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Difference scores = paired t (Stata) | `gen d=post-pre`; `ttest d==0`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-full-writeup`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-practice`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Complete T-Test Analysis with Write-Up | Choose independent or paired samples data. (1) Check assumptions, (2) Run appropriate t-test, (3) Calculate effect size, (4) Write APA-style results section. | Screenshots of: (1) assumption checks, (2) t-test output, (3) complete APA write-up (paragraph format, 4-6 sentences) |
| R | Full t-test analysis (R) | Complete workflow in R with plots and `t.test`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Full t-test analysis (SPSS) | SPSS output pack + write-up. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Full t-test analysis (Excel) | Excel partial + acknowledge limits. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Full t-test analysis (Stata) | Stata full pipeline + APA. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-independent-nav`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run an Independent Samples T-Test | Compare test scores between the treatment and control groups using an independent samples t-test. | Correct! Analyses > T-Tests > Independent Samples T-Test. Add your DV to "Dependent Variables" and your grouping variable to "Grouping Variable". |
| R | Independent samples t-test (R) | `t.test(y ~ group, data=df, var.equal=FALSE)` (Welch default in R). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Independent samples t-test (SPSS) | Analyze > Compare Means > Independent-Samples T Test. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Independent samples t-test (Excel) | Data Analysis > t-Test Two-Sample Assuming Unequal Variances. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Independent samples t-test (Stata) | `ttest y, by(group)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-levene`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-detailed`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Check Homogeneity of Variance Assumption | Before running an independent samples t-test, check if the groups have equal variances. Find the option for Levene's test of homogeneity of variance. | Correct! Levene's test checks if variances are equal. If p < .05, variances differ significantly and you should use Welch's t-test instead of Student's. |
| R | Levene's test (R) | `car::leveneTest(y ~ group)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Levene's test (SPSS) | Independent T Test > Options > Levene (or One-Way ANOVA for test). | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Levene's test (Excel) | Manual Levene cumbersome—use add-in or R. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Levene's test (Stata) | `robvar y, by(group)` or `oneway y group, tabulate`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-mann-whitney`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `nonparametric-tests`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run Mann-Whitney U Test | Your data fail the normality test. Instead of an independent samples t-test, run a Mann-Whitney U test (the non-parametric equivalent). | Correct! Mann-Whitney U tests if one group tends to have higher values than the other, without assuming normality. It ranks the data instead of using raw values. |
| R | Mann–Whitney U (R) | `wilcox.test(y ~ g)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Mann–Whitney U (SPSS) | Nonparametric Tests > 2 Independent Samples. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Mann–Whitney U (Excel) | Real Statistics add-in or R note. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Mann–Whitney U (Stata) | `ranksum y, by(group)`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-manuscript-results`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-comprehensive`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Full T-Test Manuscript Results Section | Using real or simulated data, write a complete Results section as it would appear in a journal article. Include: (1) Descriptive statistics table, (2) Assumption checks paragraph, (3) Test results with all statistics, (4) Effect size interpretation, (5) Conclusion. Aim for 2-3 paragraphs plus one table. | Complete Results section in APA format (2-3 paragraphs + table) |
| R | Journal-style Results (R) | Knit mini results from R outputs. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Journal-style Results (SPSS) | SPSS tables + prose. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Journal-style Results (Excel) | Hybrid write-up. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Journal-style Results (Stata) | Stata esttab/inline values + prose. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-one-sided`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-detailed`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run One-Sided T-Test | You hypothesize that the treatment group will score HIGHER than the control group (not just "different"). Run a one-sided (directional) independent samples t-test. | Correct! One-sided tests are more powerful when you have a directional prediction, but ONLY use them if you predicted the direction before collecting data. |
| R | One-sided independent t (R) | `t.test(y~g, alternative="greater")` (adjust side). | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | One-sided independent t (SPSS) | Define one-tailed test in dialog if available. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | One-sided independent t (Excel) | T.TEST with tails=1. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | One-sided independent t (Stata) | `ttest y, by(g)` one-sided via `pr` option patterns. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-paired-nav`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run a Paired Samples T-Test | Compare pre-test and post-test scores for the same participants using a paired samples t-test. | Correct! Analyses > T-Tests > Paired Samples T-Test. Add both variables as a pair. |
| R | Paired samples t-test (R) | `t.test(pre, post, paired=TRUE)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Paired samples t-test (SPSS) | Analyze > Compare Means > Paired-Samples T Test. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Paired samples t-test (Excel) | t-Test: Paired Two Sample for Means. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Paired samples t-test (Stata) | `ttest pre==post`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-paired-vs-independent-concept`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-detailed`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Paired vs Independent Samples: Choose Correctly | Scenario: You measure the same 20 students' test scores BEFORE and AFTER tutoring. Which test do you use: (A) Independent Samples or (B) Paired Samples? Explain why. | Answer: (B) Paired Samples T-Test. Use paired when the same participants provide both scores. Use independent when different participants are in each group. |

## `m8-ttest-pooled-vs-welch`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-practice`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Pooled vs Separate Variance Estimates | Examine your data. (1) Calculate variance for each group separately in Descriptives. (2) Run both Student's and Welch's t-test. (3) Compare the degrees of freedom. (4) Explain why Welch's df is usually not a whole number. | Screenshots and 3-4 sentence explanation of the df difference |
| R | Pooled vs Welch df (R) | Run `t.test` var.equal T/F; compare df. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Pooled vs Welch df (SPSS) | SPSS equal vs unequal rows. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Pooled vs Welch df (Excel) | Document from two analyses. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Pooled vs Welch df (Stata) | `ttest, welch` vs default Stata behavior. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-qq-plot`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-assumptions`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Create Q-Q Plot for Normality Check | Create a Q-Q plot to visually check if your data follow a normal distribution. Points should fall along the diagonal line if data are normal. | Correct! Q-Q plots show theoretical vs. sample quantiles. If points curve away from the line, data may be skewed or have heavy tails. |
| R | Q–Q plot (R) | `qqnorm(y); qqline(y)` by group with facet. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Q–Q plot (SPSS) | Graphs > Q-Q; or Explore plots. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Q–Q plot (Excel) | QQ plot add-in or manual quantiles. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Q–Q plot (Stata) | `qnorm y` or `qqplot`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-robustness-written`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-assumptions`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Robustness of T-Test to Assumption Violations | Research and explain: The t-test is considered "robust" to violations of normality when sample sizes are large (N > 30). Why? What about the equal variance assumption - is the t-test robust to that? | Written explanation (4-6 sentences) addressing both normality and equal variance assumptions |

## `m8-ttest-shapiro`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-assumptions`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Test Normality with Shapiro-Wilk | Before running a t-test, check if each group's data is normally distributed using the Shapiro-Wilk test. | Correct! Shapiro-Wilk tests normality. If p < .05, data are significantly non-normal and you may need a non-parametric test (Mann-Whitney U). |
| R | Shapiro-Wilk by group (R) | `by(df, df$g, function(z) shapiro.test(z$y))`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Shapiro-Wilk by group (SPSS) | Explore or Split File + Shapiro. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Shapiro-Wilk by group (Excel) | Limited—note sample size; use QQ manually. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Shapiro-Wilk by group (Stata) | `swilk y if g==1` for each group. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-stat-practical`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `effect-size-ttests`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Statistical vs Practical Significance in T-Tests | Create a scenario where: t(998) = 2.10, p = .036, d = 0.06. Explain why this is statistically significant but probably not practically important. | Written explanation (4-5 sentences) |

## `m8-ttest-student-welch`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-detailed`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Student's vs Welch's T-Test | Run BOTH Student's t-test and Welch's t-test on the same data. Compare the results and explain when you should use each one. | Correct! Student's t-test assumes equal variances; Welch's t-test does NOT. Welch's is generally safer when you're unsure about equal variances. |
| R | Student vs Welch t (R) | `t.test(..., var.equal=TRUE)` vs `FALSE`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Student vs Welch t (SPSS) | Independent t-test: equal variances assumed vs not assumed rows. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Student vs Welch t (Excel) | Two Data Analysis runs if both available. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Student vs Welch t (Stata) | `ttest y, by(g)` Welch default; `ttest y, by(g) unequal` etc. | Screenshot, console output, or brief write-up as appropriate for your package. |

## `m8-ttest-t-sign-interpret`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `t-tests-interpretation`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | Interpret Positive vs Negative T-Statistics | You get t = -2.45 when comparing Group A to Group B. Explain: (1) Which group has the higher mean? (2) Does the sign of t affect the p-value for a two-sided test? (3) When does the sign matter? | Written answers to all 3 questions |

## `m8-ttest-when-nonparametric`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `nonparametric-tests`
- Present: none
- Missing: `jamovi`, `r`, `spss`, `excel`, `stata`

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Conceptual | When to Use Non-Parametric Tests | List three conditions under which you should consider using Mann-Whitney U or Wilcoxon instead of a t-test. | List at least 3 conditions |

## `m8-ttest-wilcoxon`

- Module: `module-8` | Chapter: `chapter-11` | Topic: `nonparametric-tests`
- Present: `jamovi`, `r`, `spss`, `excel`, `stata`
- Missing: none

| Software | Title | Canonical method/instruction | Verification checkpoint |
|---|---|---|---|
| Jamovi | Run Wilcoxon Signed-Rank Test | Your paired data violate normality. Run a Wilcoxon signed-rank test instead of a paired samples t-test. | Correct! Wilcoxon signed-rank test is the non-parametric version of paired samples t-test. It tests if the median difference differs from zero. |
| R | Wilcoxon signed-rank (R) | `wilcox.test(pre, post, paired=TRUE)`. | Screenshot, console output, or brief write-up as appropriate for your package. |
| SPSS | Wilcoxon signed-rank (SPSS) | 2 Related Samples nonparametric. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Excel | Wilcoxon signed-rank (Excel) | Paired add-in or R. | Screenshot, console output, or brief write-up as appropriate for your package. |
| Stata | Wilcoxon signed-rank (Stata) | `signrank pre=post`. | Screenshot, console output, or brief write-up as appropriate for your package. |

## Canonical tutorial sources

- Jamovi: [User Guide](https://www.jamovi.org/user-manual.html), [Analyses Overview](https://docs.jamovi.org/_pages/jg_00_analyses-overview.html)
- R: [R4DS Import](http://r4ds.hadley.nz/data-import.html), [R4DS Visualization](https://r4ds.had.co.nz/data-visualisation.html), [UCLA OARC R](https://stats.oarc.ucla.edu/r/whatstat/what-statistical-analysis-should-i-usestatistical-analyses-using-r), [R `t.test` docs](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/t.test.html)
- SPSS: [IBM SPSS docs](https://www.ibm.com/docs/en/spss-statistics), [Independent t test](https://www.ibm.com/docs/en/spss-statistics/29.0.0?topic=test-independent-samples-t), [Crosstabs significance](https://www.ibm.com/docs/en/spss-statistics/30.0.0?topic=tables-significance-testing-crosstabulations), [UCLA OARC SPSS](https://stats.oarc.ucla.edu/spss/seminars/notes-pac/spss-class-notesanalyzing-data)
- Excel: [Analysis ToolPak](https://support.office.microsoft.com/en-us/article/use-the-analysis-toolpak-to-perform-complex-data-analysis-6c67ccf0-f4a9-487c-8dec-bdb5a2cefab6), [Load ToolPak](https://support.microsoft.com/en-us/office/load-the-analysis-toolpak-in-excel-6a63e598-cd6d-42e3-9317-6b40ba1a66b4?CorrelationId=c), [Stat functions reference](https://support.microsoft.com/en-us/office/statistical-functions-reference-624dac86-a375-4435-bc25-76d659719ffd)
- Stata: [Data management manual](https://stata.com/manuals/ddatamanagement.pdf), [Histogram reference](https://stata.com/manuals/rhistogram.pdf), [UCLA OARC Stata notes](https://stats.oarc.ucla.edu/stata/seminars/stata-16-class-notes/stata-class-notes-analyzing-data/), [UCLA code fragments](https://stats.oarc.ucla.edu/stata/code/descriptives-ttests-anova-and-regression/)

