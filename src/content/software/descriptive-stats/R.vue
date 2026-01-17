<template>
  <div class="software-instructions">
    <h3>Calculating Descriptive Statistics in R</h3>

    <h4>Basic Functions</h4>
    <p>R has built-in functions for individual statistics:</p>

    <div class="code-block">
      <code># Assuming your data is in a vector called 'scores'
scores <- c(12, 15, 18, 22, 23, 25, 28, 30, 32, 35)

# Central Tendency
mean(scores)           # Mean
median(scores)         # Median
# Mode (no built-in function, use this)
names(sort(table(scores), decreasing = TRUE))[1]

# Variability
sd(scores)            # Standard deviation
var(scores)           # Variance
range(scores)         # Returns min and max
max(scores) - min(scores)  # Range as single value
IQR(scores)           # Interquartile range</code>
    </div>

    <h4>The summary() Function</h4>
    <p>Get a quick overview of your data:</p>

    <div class="code-block">
      <code># For a single variable
summary(scores)

# Output:
#    Min. 1st Qu.  Median    Mean 3rd Qu.    Max.
#   12.00   18.25   24.00   24.00   29.50   35.00</code>
    </div>

    <h4>Using the psych Package</h4>
    <p>The <code>psych</code> package provides comprehensive descriptive statistics:</p>

    <div class="code-block">
      <code># Install if needed (only once)
install.packages("psych")

# Load the package
library(psych)

# For a single variable
describe(scores)

# For multiple variables in a data frame
describe(my_data)

# For descriptives by group
describeBy(my_data$score, group = my_data$condition)</code>
    </div>

    <p>Output includes: n, mean, sd, median, trimmed mean, mad, min, max, range, skew, kurtosis, and SE</p>

    <div class="tip">
      <div class="tip-title">psych::describe() is Your Friend</div>
      <p>
        The <code>describe()</code> function gives you skewness and kurtosis,
        which are essential for checking normality assumptions.
      </p>
    </div>

    <h4>Working with Data Frames</h4>
    <p>When your data is in a data frame:</p>

    <div class="code-block">
      <code># Load your data
data <- read.csv("my_data.csv")

# Descriptives for one variable
mean(data$anxiety_score)
sd(data$anxiety_score)

# Descriptives for all numeric variables
summary(data)
describe(data)  # from psych package

# Descriptives by group
tapply(data$score, data$group, mean)
tapply(data$score, data$group, sd)

# Or using dplyr
library(dplyr)
data %>%
  group_by(condition) %>%
  summarise(
    n = n(),
    mean = mean(score),
    sd = sd(score),
    median = median(score)
  )</code>
    </div>

    <h4>Handling Missing Data</h4>
    <p>R returns NA if there are missing values. Use <code>na.rm = TRUE</code>:</p>

    <div class="code-block">
      <code># Remove NAs from calculations
mean(scores, na.rm = TRUE)
sd(scores, na.rm = TRUE)

# Check for missing values
sum(is.na(scores))
complete.cases(data)</code>
    </div>
  </div>
</template>
