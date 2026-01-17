<template>
  <div class="software-instructions">
    <h3>Creating Visualizations in Excel</h3>

    <h4>Histogram</h4>
    <p><strong>Method 1: Using the Histogram Chart Type (Excel 2016+)</strong></p>
    <ol class="steps">
      <li>Select your data (e.g., A1:A50)</li>
      <li>Go to <strong>Insert → Charts → Insert Statistic Chart → Histogram</strong></li>
      <li>Excel automatically creates bins</li>
      <li>To adjust bins: right-click the x-axis → <strong>Format Axis</strong> → adjust bin width or number</li>
    </ol>

    <p><strong>Method 2: Using the Analysis ToolPak</strong></p>
    <ol class="steps">
      <li>Create bin ranges in a column (e.g., 10, 20, 30, 40, 50)</li>
      <li>Go to <strong>Data → Data Analysis → Histogram</strong></li>
      <li>Select your Input Range (data)</li>
      <li>Select your Bin Range</li>
      <li>Check <strong>Chart Output</strong></li>
      <li>Click <strong>OK</strong></li>
    </ol>

    <div class="note">
      <div class="note-title">Note</div>
      <p>The ToolPak creates a column chart, not a true histogram. You may need to adjust the gap width to 0% for bars to touch.</p>
    </div>

    <h4>Box Plot (Box and Whisker)</h4>
    <p>Available in Excel 2016 and later:</p>
    <ol class="steps">
      <li>Select your data</li>
      <li>Go to <strong>Insert → Charts → Insert Statistic Chart → Box and Whisker</strong></li>
      <li>Excel creates a box plot showing median, quartiles, and outliers</li>
    </ol>

    <p><strong>Comparing groups:</strong></p>
    <ol class="steps">
      <li>Arrange data with group labels in one column and values in another</li>
      <li>Select both columns</li>
      <li>Insert Box and Whisker chart</li>
      <li>Excel will create separate boxes for each group</li>
    </ol>

    <h4>Scatter Plot</h4>
    <ol class="steps">
      <li>Arrange data with X variable in one column, Y variable in the next</li>
      <li>Select both columns</li>
      <li>Go to <strong>Insert → Charts → Scatter → Scatter (first option)</strong></li>
    </ol>

    <p><strong>Adding a trendline (regression line):</strong></p>
    <ol class="steps">
      <li>Click on a data point in the scatter plot</li>
      <li>Go to <strong>Chart Design → Add Chart Element → Trendline → Linear</strong></li>
      <li>Or right-click a data point → <strong>Add Trendline</strong></li>
      <li>In Format Trendline, check <strong>Display Equation on chart</strong> and <strong>Display R-squared value</strong></li>
    </ol>

    <div class="tip">
      <div class="tip-title">Getting Correlation from Scatter Plot</div>
      <p>
        The R² shown on the trendline is the coefficient of determination.
        Take the square root (√R²) to get r, the correlation coefficient.
      </p>
    </div>

    <h4>Bar Chart</h4>
    <p><strong>For frequencies/counts:</strong></p>
    <ol class="steps">
      <li>Create a frequency table using COUNTIF or a PivotTable</li>
      <li>Select the category labels and counts</li>
      <li>Go to <strong>Insert → Charts → Column → Clustered Column</strong></li>
    </ol>

    <p><strong>For means:</strong></p>
    <ol class="steps">
      <li>Calculate means for each group using AVERAGEIF</li>
      <li>Select group labels and means</li>
      <li>Insert a Column chart</li>
    </ol>

    <h4>Adding Error Bars</h4>
    <ol class="steps">
      <li>Click on your chart</li>
      <li>Go to <strong>Chart Design → Add Chart Element → Error Bars → More Error Bar Options</strong></li>
      <li>Choose <strong>Custom</strong> and <strong>Specify Value</strong></li>
      <li>Select cells containing your standard error values</li>
    </ol>

    <h4>Formatting Tips</h4>
    <ul>
      <li><strong>Add titles:</strong> Chart Design → Add Chart Element → Chart Title</li>
      <li><strong>Add axis labels:</strong> Chart Design → Add Chart Element → Axis Titles</li>
      <li><strong>Change colors:</strong> Click on chart element → Format tab</li>
      <li><strong>Remove gridlines:</strong> Click gridlines → Delete</li>
    </ul>

    <div class="note">
      <div class="note-title">APA Style Tips</div>
      <p>
        • Remove unnecessary gridlines and chart borders<br>
        • Use clear, descriptive axis labels with units<br>
        • Avoid 3D effects<br>
        • Use grayscale or simple colors for print
      </p>
    </div>
  </div>
</template>
