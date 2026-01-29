<template>
  <div class="software-content">
    <h2>Entering and Importing Data in R</h2>
    <section class="content-section">
      <h3>Importing Data</h3>
      <p>Use <code>read.csv()</code> or <code>read.xlsx()</code> to import data files.</p>
      <pre><code># Import CSV
data <- read.csv("mydata.csv")

# Import Excel
library(readxl)
data <- read_excel("mydata.xlsx")</code></pre>
      <h3>Manual Data Entry</h3>
      <p>Create data frames directly in R:</p>
      <pre><code>data <- data.frame(
  age = c(25, 30, 35),
  score = c(85, 90, 88)
)</code></pre>
    </section>
  </div>
</template>
<style scoped>
.software-content { max-width: 800px; margin: 0 auto; }
code { background-color: var(--color-surface); padding: 2px 6px; border-radius: 3px; }
pre { background-color: var(--color-surface); padding: 1rem; border-radius: 4px; overflow-x: auto; }
</style>
