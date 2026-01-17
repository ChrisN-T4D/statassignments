<template>
  <div class="software-instructions">
    <h3>Creating Visualizations in Stata</h3>

    <h4>Histogram</h4>
    <div class="code-block">
      <code>* Basic histogram
histogram anxiety_score

* With normal curve overlay
histogram anxiety_score, normal

* Customize bins and appearance
histogram anxiety_score, bin(10) frequency ///
    title("Distribution of Anxiety Scores") ///
    xtitle("Anxiety Score") ytitle("Frequency")

* By group
histogram anxiety_score, by(condition) normal</code>
    </div>

    <h4>Box Plot</h4>
    <div class="code-block">
      <code>* Simple boxplot
graph box anxiety_score

* Boxplot by group
graph box anxiety_score, over(condition)

* Horizontal boxplot
graph hbox anxiety_score, over(condition)

* With titles
graph box anxiety_score, over(condition) ///
    title("Anxiety Scores by Condition") ///
    ytitle("Anxiety Score")</code>
    </div>

    <h4>Scatter Plot</h4>
    <div class="code-block">
      <code>* Basic scatter plot
scatter exam_score study_hours

* With fit line
scatter exam_score study_hours || lfit exam_score study_hours

* With confidence interval
scatter exam_score study_hours || lfitci exam_score study_hours

* Customize appearance
scatter exam_score study_hours, ///
    title("Exam Performance vs Study Hours") ///
    xtitle("Study Hours") ytitle("Exam Score") ///
    mcolor(blue) msize(medium)

* By group with different colors
scatter exam_score study_hours, by(gender)</code>
    </div>

    <h4>Bar Chart</h4>
    <div class="code-block">
      <code>* Bar chart of means
graph bar anxiety_score, over(condition)

* With error bars (standard error)
graph bar anxiety_score, over(condition) ///
    cw asyvars ///
    bar(1, fcolor(blue)) ///
    legend(off)

* Horizontal bar chart
graph hbar anxiety_score, over(condition)

* Frequency bar chart
graph bar (count), over(response_category)</code>
    </div>

    <div class="tip">
      <div class="tip-title">Adding Confidence Intervals to Bar Charts</div>
      <p>
        Use the <code>cibar</code> command from the user-written package:
      </p>
      <div class="code-block">
        <code>* Install the package
ssc install cibar

* Create bar chart with 95% CI
cibar anxiety_score, over(condition)</code>
      </div>
    </div>

    <h4>Q-Q Plot (Quantile-Normal Plot)</h4>
    <div class="code-block">
      <code>* Q-Q plot to check normality
qnorm anxiety_score

* With grid
qnorm anxiety_score, grid</code>
    </div>

    <h4>Combined Plots</h4>
    <div class="code-block">
      <code>* Combine multiple graphs
graph combine hist1 box1, rows(1)

* Or use the name option when creating graphs
histogram anxiety_score, name(hist1, replace)
graph box anxiety_score, name(box1, replace)
graph combine hist1 box1</code>
    </div>

    <h4>Saving Graphs</h4>
    <div class="code-block">
      <code>* Save as Stata format
graph save "mygraph.gph", replace

* Export as PNG
graph export "mygraph.png", replace width(800)

* Export as PDF
graph export "mygraph.pdf", replace

* Export as EPS (for publications)
graph export "mygraph.eps", replace</code>
    </div>

    <h4>Graph Schemes</h4>
    <p>Change the overall appearance with schemes:</p>
    <div class="code-block">
      <code>* List available schemes
graph query, schemes

* Apply a scheme
set scheme s2color      // default
set scheme s1mono       // black and white
set scheme economist    // Economist magazine style

* Or specify in the graph command
histogram anxiety_score, scheme(s1mono)</code>
    </div>

    <div class="note">
      <div class="note-title">Publication-Quality Graphs</div>
      <p>
        For APA-style figures, use <code>scheme(s1mono)</code> or install
        specialized schemes like <code>plotplain</code> or <code>lean2</code>
        via <code>ssc install</code>.
      </p>
    </div>
  </div>
</template>
