<template>
  <div class="software-instructions">
    <h3>Creating Visualizations in R</h3>

    <p>We'll cover both base R and ggplot2 (the most popular plotting package).</p>

    <h4>Base R Plots</h4>

    <div class="code-block">
      <code># Sample data
scores <- c(12, 15, 18, 22, 23, 25, 28, 30, 32, 35)
groups <- c("A", "A", "A", "A", "A", "B", "B", "B", "B", "B")

# Histogram
hist(scores, main = "Distribution of Scores",
     xlab = "Score", col = "lightblue")

# Box plot
boxplot(scores, main = "Score Distribution",
        ylab = "Score")

# Box plot by group
boxplot(scores ~ groups, main = "Scores by Group",
        xlab = "Group", ylab = "Score")

# Scatter plot
plot(x_variable, y_variable, main = "Scatter Plot",
     xlab = "X Variable", ylab = "Y Variable")

# Add regression line
abline(lm(y_variable ~ x_variable), col = "red")</code>
    </div>

    <h4>Using ggplot2</h4>
    <p>ggplot2 creates publication-quality graphics:</p>

    <div class="code-block">
      <code># Install and load ggplot2
install.packages("ggplot2")  # only once
library(ggplot2)

# Sample data frame
data <- data.frame(
  score = c(12, 15, 18, 22, 23, 25, 28, 30, 32, 35),
  group = c("A", "A", "A", "A", "A", "B", "B", "B", "B", "B"),
  hours = c(2, 3, 4, 5, 5, 6, 7, 8, 9, 10)
)</code>
    </div>

    <h4>Histogram (ggplot2)</h4>
    <div class="code-block">
      <code>ggplot(data, aes(x = score)) +
  geom_histogram(binwidth = 5, fill = "steelblue", color = "white") +
  labs(title = "Distribution of Scores",
       x = "Score",
       y = "Frequency") +
  theme_minimal()</code>
    </div>

    <h4>Box Plot (ggplot2)</h4>
    <div class="code-block">
      <code># Simple boxplot
ggplot(data, aes(y = score)) +
  geom_boxplot(fill = "steelblue") +
  labs(title = "Score Distribution", y = "Score") +
  theme_minimal()

# Boxplot by group
ggplot(data, aes(x = group, y = score, fill = group)) +
  geom_boxplot() +
  labs(title = "Scores by Group",
       x = "Group",
       y = "Score") +
  theme_minimal()</code>
    </div>

    <h4>Scatter Plot (ggplot2)</h4>
    <div class="code-block">
      <code># Basic scatter plot
ggplot(data, aes(x = hours, y = score)) +
  geom_point(size = 3, color = "steelblue") +
  labs(title = "Score vs Study Hours",
       x = "Study Hours",
       y = "Score") +
  theme_minimal()

# With regression line
ggplot(data, aes(x = hours, y = score)) +
  geom_point(size = 3) +
  geom_smooth(method = "lm", se = TRUE) +
  labs(title = "Score vs Study Hours",
       x = "Study Hours",
       y = "Score") +
  theme_minimal()</code>
    </div>

    <h4>Bar Chart (ggplot2)</h4>
    <div class="code-block">
      <code># Counts
ggplot(data, aes(x = group)) +
  geom_bar(fill = "steelblue") +
  labs(title = "Participants per Group", x = "Group", y = "Count") +
  theme_minimal()

# Means with error bars
library(dplyr)
summary_data <- data %>%
  group_by(group) %>%
  summarise(mean = mean(score), se = sd(score)/sqrt(n()))

ggplot(summary_data, aes(x = group, y = mean, fill = group)) +
  geom_col() +
  geom_errorbar(aes(ymin = mean - se, ymax = mean + se), width = 0.2) +
  labs(title = "Mean Scores by Group", x = "Group", y = "Mean Score") +
  theme_minimal()</code>
    </div>

    <div class="tip">
      <div class="tip-title">Q-Q Plot for Normality</div>
      <div class="code-block">
        <code># Base R
qqnorm(scores)
qqline(scores, col = "red")

# ggplot2
ggplot(data, aes(sample = score)) +
  stat_qq() +
  stat_qq_line() +
  theme_minimal()</code>
      </div>
    </div>

    <h4>Saving Plots</h4>
    <div class="code-block">
      <code># Save the last ggplot
ggsave("my_plot.png", width = 8, height = 6, dpi = 300)

# Base R
png("my_plot.png", width = 800, height = 600)
hist(scores)
dev.off()</code>
    </div>
  </div>
</template>
