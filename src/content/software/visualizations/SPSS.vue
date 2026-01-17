<template>
  <div class="software-instructions">
    <h3>Creating Visualizations in SPSS</h3>

    <h4>Histograms</h4>
    <ol class="steps">
      <li>Go to <strong>Graphs → Legacy Dialogs → Histogram...</strong></li>
      <li>Move your variable to the <strong>Variable</strong> box</li>
      <li>Check <strong>Display normal curve</strong> to overlay a normal distribution</li>
      <li>Click <strong>OK</strong></li>
    </ol>
    <p><em>Alternative:</em> Go to <strong>Analyze → Descriptive Statistics → Frequencies</strong>, click Charts, and select Histograms.</p>

    <h4>Box Plots</h4>
    <p><strong>Simple boxplot (one variable):</strong></p>
    <ol class="steps">
      <li>Go to <strong>Graphs → Legacy Dialogs → Boxplot...</strong></li>
      <li>Select <strong>Simple</strong> and <strong>Summaries of separate variables</strong></li>
      <li>Click <strong>Define</strong></li>
      <li>Move your variable(s) to the <strong>Boxes Represent</strong> box</li>
      <li>Click <strong>OK</strong></li>
    </ol>

    <p><strong>Boxplot comparing groups:</strong></p>
    <ol class="steps">
      <li>Go to <strong>Graphs → Legacy Dialogs → Boxplot...</strong></li>
      <li>Select <strong>Simple</strong> and <strong>Summaries for groups of cases</strong></li>
      <li>Click <strong>Define</strong></li>
      <li>Move your outcome variable to <strong>Variable</strong></li>
      <li>Move your grouping variable to <strong>Category Axis</strong></li>
      <li>Click <strong>OK</strong></li>
    </ol>

    <h4>Scatter Plots</h4>
    <ol class="steps">
      <li>Go to <strong>Graphs → Legacy Dialogs → Scatter/Dot...</strong></li>
      <li>Select <strong>Simple Scatter</strong> and click <strong>Define</strong></li>
      <li>Move your variables:
        <ul>
          <li>Y-Axis: outcome/dependent variable</li>
          <li>X-Axis: predictor/independent variable</li>
        </ul>
      </li>
      <li>Click <strong>OK</strong></li>
    </ol>

    <div class="tip">
      <div class="tip-title">Adding a Fit Line</div>
      <p>
        Double-click the scatter plot to open the Chart Editor.
        Then go to <strong>Elements → Fit Line at Total</strong> to add
        a regression line.
      </p>
    </div>

    <h4>Bar Charts</h4>
    <p><strong>For frequencies/counts:</strong></p>
    <ol class="steps">
      <li>Go to <strong>Graphs → Legacy Dialogs → Bar...</strong></li>
      <li>Select <strong>Simple</strong> and click <strong>Define</strong></li>
      <li>Keep <strong>N of cases</strong> selected</li>
      <li>Move your categorical variable to <strong>Category Axis</strong></li>
      <li>Click <strong>OK</strong></li>
    </ol>

    <p><strong>For means:</strong></p>
    <ol class="steps">
      <li>Go to <strong>Graphs → Legacy Dialogs → Bar...</strong></li>
      <li>Select <strong>Simple</strong> and click <strong>Define</strong></li>
      <li>Select <strong>Other statistic</strong> and move your continuous variable there</li>
      <li>Move your grouping variable to <strong>Category Axis</strong></li>
      <li>Click <strong>OK</strong></li>
    </ol>

    <h4>Q-Q Plots (for checking normality)</h4>
    <ol class="steps">
      <li>Go to <strong>Analyze → Descriptive Statistics → Q-Q Plots...</strong></li>
      <li>Move your variable to the <strong>Variables</strong> box</li>
      <li>Keep <strong>Normal</strong> selected for Test Distribution</li>
      <li>Click <strong>OK</strong></li>
    </ol>
    <p>If points follow the diagonal line, data is approximately normal.</p>

    <div class="note">
      <div class="note-title">Using Chart Builder (Modern Method)</div>
      <p>
        <strong>Graphs → Chart Builder</strong> provides a drag-and-drop interface.
        Drag a chart type from the gallery, then drag variables to the axes.
        This is more flexible but has a steeper learning curve.
      </p>
    </div>

    <h4>Editing Charts</h4>
    <p>Double-click any chart to open the <strong>Chart Editor</strong> where you can:</p>
    <ul>
      <li>Change colors, fonts, and labels</li>
      <li>Add titles and axis labels</li>
      <li>Modify scales and ranges</li>
      <li>Add reference lines or annotations</li>
    </ul>
  </div>
</template>
