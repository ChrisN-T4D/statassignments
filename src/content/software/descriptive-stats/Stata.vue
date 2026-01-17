<template>
  <div class="software-instructions">
    <h3>Calculating Descriptive Statistics in Stata</h3>

    <h4>The summarize Command</h4>
    <p>The most basic command for descriptive statistics:</p>

    <div class="code-block">
      <code>* Basic summary (n, mean, SD, min, max)
summarize anxiety_score

* Abbreviated version
sum anxiety_score

* Detailed summary (adds variance, skewness, kurtosis, percentiles)
summarize anxiety_score, detail

* Multiple variables
summarize anxiety_score depression_score stress_score

* All numeric variables in dataset
summarize</code>
    </div>

    <h4>Sample Output</h4>
    <div class="code-block">
      <code>. summarize anxiety_score, detail

                      Anxiety Score
-------------------------------------------------------------
      Percentiles      Smallest
 1%           12             12
 5%           15             14
10%           18             15       Obs                  50
25%           22             16       Sum of Wgt.          50

50%           28                      Mean           28.5
                        Largest       Std. Dev.      8.234
75%           34             38
90%           39             40       Variance       67.8
95%           42             43       Skewness       .156
99%           45             45       Kurtosis       2.84</code>
    </div>

    <h4>The tabstat Command</h4>
    <p>More flexible for choosing specific statistics:</p>

    <div class="code-block">
      <code>* Choose specific statistics
tabstat anxiety_score, stats(n mean sd median min max)

* Multiple variables with specific stats
tabstat anxiety depression stress, stats(n mean sd sem)

* By group
tabstat anxiety_score, by(condition) stats(n mean sd)

* Save results for later use
tabstat anxiety_score, stats(mean sd) save</code>
    </div>

    <p>Available statistics for tabstat:</p>
    <ul>
      <li><code>n</code> - count</li>
      <li><code>mean</code> - arithmetic mean</li>
      <li><code>sd</code> - standard deviation</li>
      <li><code>sem</code> - standard error of the mean</li>
      <li><code>var</code> - variance</li>
      <li><code>min, max</code> - minimum, maximum</li>
      <li><code>p25, p50, p75</code> - percentiles</li>
      <li><code>iqr</code> - interquartile range</li>
      <li><code>skewness, kurtosis</code></li>
    </ul>

    <h4>Descriptives by Group</h4>
    <div class="code-block">
      <code>* Using by prefix
by condition, sort: summarize anxiety_score

* Using bysort (same result)
bysort condition: summarize anxiety_score

* Using tabstat (often cleaner output)
tabstat anxiety_score, by(condition) stats(n mean sd)</code>
    </div>

    <div class="tip">
      <div class="tip-title">Pro Tip</div>
      <p>
        Use <code>tabstat</code> with the <code>by()</code> option for
        clean side-by-side comparisons between groups. It's easier to
        copy into reports than <code>by: summarize</code> output.
      </p>
    </div>

    <h4>The codebook Command</h4>
    <p>Get comprehensive information about variables:</p>

    <div class="code-block">
      <code>* Full codebook for one variable
codebook anxiety_score

* Compact version
codebook anxiety_score, compact

* For all variables
codebook, compact</code>
    </div>

    <h4>Checking for Missing Values</h4>
    <div class="code-block">
      <code>* Count missing values
misstable summarize

* Pattern of missing values
misstable patterns</code>
    </div>
  </div>
</template>
