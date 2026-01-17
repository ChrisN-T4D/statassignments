<template>
  <div class="software-instructions">
    <h3>Creating Visualizations in jamovi</h3>

    <p>
      jamovi makes creating plots easy—most are generated automatically
      alongside your analyses. You can also create standalone plots.
    </p>

    <h4>Plots in Descriptives</h4>
    <p>The easiest way to get basic plots:</p>
    <ol class="steps">
      <li>Go to <strong>Analyses → Exploration → Descriptives</strong></li>
      <li>Add your variable(s) to the Variables box</li>
      <li>Expand the <strong>Plots</strong> section</li>
      <li>Check the plots you want:
        <ul>
          <li><strong>Histogram</strong> - distribution shape</li>
          <li><strong>Density</strong> - smooth curve overlay</li>
          <li><strong>Box plot</strong> - shows median, quartiles, outliers</li>
          <li><strong>Violin</strong> - box plot + density combined</li>
          <li><strong>Q-Q</strong> - for checking normality</li>
        </ul>
      </li>
    </ol>

    <div class="tip">
      <div class="tip-title">Plots by Group</div>
      <p>
        Add a grouping variable to the <strong>Split by</strong> box to
        automatically get separate plots for each group.
      </p>
    </div>

    <h4>Histogram</h4>
    <ol class="steps">
      <li>Go to <strong>Analyses → Exploration → Descriptives</strong></li>
      <li>Move your continuous variable to Variables</li>
      <li>In Plots section, check <strong>Histogram</strong></li>
      <li>Optionally check <strong>Density</strong> to add a smooth curve</li>
    </ol>

    <h4>Box Plot</h4>
    <p><strong>Single variable:</strong></p>
    <ol class="steps">
      <li>Go to <strong>Analyses → Exploration → Descriptives</strong></li>
      <li>Move your variable to Variables</li>
      <li>In Plots, check <strong>Box plot</strong></li>
    </ol>

    <p><strong>Comparing groups:</strong></p>
    <ol class="steps">
      <li>Move your continuous variable to Variables</li>
      <li>Move your grouping variable to <strong>Split by</strong></li>
      <li>Check <strong>Box plot</strong></li>
    </ol>

    <h4>Scatter Plot</h4>
    <p>Scatter plots are created through correlation or regression:</p>

    <p><strong>Via Correlation:</strong></p>
    <ol class="steps">
      <li>Go to <strong>Analyses → Regression → Correlation Matrix</strong></li>
      <li>Move your two variables to the Variables box</li>
      <li>In Plot section, check <strong>Correlation matrix</strong></li>
      <li>The scatter plot matrix will include your two variables</li>
    </ol>

    <p><strong>Via Regression:</strong></p>
    <ol class="steps">
      <li>Go to <strong>Analyses → Regression → Linear Regression</strong></li>
      <li>Set your Dependent Variable and Covariates</li>
      <li>Expand <strong>Assumption Checks</strong></li>
      <li>This provides residual plots rather than scatter plots</li>
    </ol>

    <div class="note">
      <div class="note-title">The scatr Module</div>
      <p>
        For dedicated scatter plots with more options, install the
        <strong>scatr</strong> module: jamovi menu → Modules → jamovi library → scatr
      </p>
    </div>

    <h4>Bar Chart</h4>
    <p>For frequencies of categorical variables:</p>
    <ol class="steps">
      <li>Go to <strong>Analyses → Exploration → Descriptives</strong></li>
      <li>Move your categorical variable to Variables</li>
      <li>In Plots, check <strong>Bar plot</strong></li>
    </ol>

    <p>For comparing means across groups:</p>
    <ol class="steps">
      <li>Run your analysis (t-test, ANOVA)</li>
      <li>Check the <strong>Descriptives plots</strong> option</li>
      <li>jamovi will create bar charts with error bars</li>
    </ol>

    <h4>Q-Q Plot</h4>
    <ol class="steps">
      <li>Go to <strong>Analyses → Exploration → Descriptives</strong></li>
      <li>Move your variable to Variables</li>
      <li>In Plots, check <strong>Q-Q</strong></li>
    </ol>
    <p>Points close to the diagonal line indicate normality.</p>

    <h4>Plots from T-Tests and ANOVA</h4>
    <p>jamovi can automatically create plots for group comparisons:</p>
    <ol class="steps">
      <li>Run your t-test or ANOVA analysis</li>
      <li>Look for <strong>Descriptives Plots</strong> option</li>
      <li>Check it to get bar charts with error bars</li>
    </ol>

    <h4>Copying and Saving Plots</h4>
    <ul>
      <li><strong>Copy:</strong> Right-click on any plot → Copy</li>
      <li><strong>Save as image:</strong> Right-click → Save as...</li>
      <li>Plots can be saved as PNG or PDF</li>
    </ul>

    <h4>Customizing Plots</h4>
    <p>
      jamovi's plots have limited customization compared to other software.
      For publication-quality figures, you may want to export data to R or
      use a dedicated graphing tool.
    </p>

    <div class="tip">
      <div class="tip-title">Additional Plot Modules</div>
      <p>
        Check the jamovi library (Modules menu) for additional plotting modules
        like <strong>jmv</strong>, <strong>scatr</strong>, and others that
        provide more visualization options.
      </p>
    </div>
  </div>
</template>
