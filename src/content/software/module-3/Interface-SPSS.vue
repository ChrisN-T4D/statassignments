<template>
  <div class="software-content">
    <h2>The SPSS Interface</h2>

    <section class="content-section">
      <h3>Overview</h3>
      <p>
        IBM SPSS Statistics has a user-friendly interface designed for statistical analysis.
        Understanding the main components will help you navigate the software efficiently.
      </p>
    </section>

    <section class="content-section">
      <h3>Main Windows and Views</h3>

      <h4>1. Data View</h4>
      <p>
        The <strong>Data View</strong> is where you see your actual data in a spreadsheet format.
        Each row represents a case (participant), and each column represents a variable.
      </p>
      <ul>
        <li>Rows are numbered sequentially (1, 2, 3...)</li>
        <li>Columns have variable names at the top</li>
        <li>You can enter, edit, and view data directly here</li>
        <li>Similar to Excel, but with statistical capabilities</li>
      </ul>

      <h4>2. Variable View</h4>
      <p>
        The <strong>Variable View</strong> lets you define the properties of your variables.
        Click the "Variable View" tab at the bottom left to switch to this view.
      </p>
      <p>Key columns in Variable View:</p>
      <ul>
        <li><strong>Name</strong>: Short variable name (no spaces, must start with a letter)</li>
        <li><strong>Type</strong>: Numeric, String, Date, etc.</li>
        <li><strong>Width</strong>: Number of digits displayed</li>
        <li><strong>Decimals</strong>: Number of decimal places</li>
        <li><strong>Label</strong>: Descriptive label for the variable</li>
        <li><strong>Values</strong>: Define value labels (e.g., 1 = Male, 2 = Female)</li>
        <li><strong>Missing</strong>: Specify missing value codes</li>
        <li><strong>Measure</strong>: Scale (continuous), Ordinal, or Nominal</li>
      </ul>

      <h4>3. Output Viewer</h4>
      <p>
        When you run an analysis, results appear in the <strong>Output Viewer</strong> window.
        This shows tables, charts, and statistical results.
      </p>
      <ul>
        <li>Left panel shows an outline/navigation tree</li>
        <li>Right panel displays the actual output</li>
        <li>You can export output to Word, PDF, or Excel</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Menu Bar</h3>
      <p>The top menu provides access to all SPSS functions:</p>
      <ul>
        <li><strong>File</strong>: Open, save, import/export data</li>
        <li><strong>Edit</strong>: Undo, redo, copy, paste</li>
        <li><strong>View</strong>: Customize display options</li>
        <li><strong>Data</strong>: Sort, merge, select cases, transform variables</li>
        <li><strong>Transform</strong>: Compute new variables, recode values</li>
        <li><strong>Analyze</strong>: Run statistical procedures</li>
        <li><strong>Graphs</strong>: Create charts and visualizations</li>
        <li><strong>Utilities</strong>: Additional tools and options</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Key Features</h3>

      <h4>Dialog Boxes</h4>
      <p>
        Most analyses use dialog boxes to select variables and options. They follow a consistent pattern:
      </p>
      <ul>
        <li>Variables list on the left</li>
        <li>Arrow buttons to move variables to analysis boxes</li>
        <li>OK, Paste, Reset, Cancel, and Help buttons at the bottom</li>
        <li>Additional options accessible via buttons (Statistics, Plots, etc.)</li>
      </ul>

      <h4>Syntax Editor</h4>
      <p>
        Advanced users can write <strong>SPSS Syntax</strong> (programming commands) to automate analyses.
        Access it via <em>File → New → Syntax</em>.
      </p>
    </section>

    <section class="content-section">
      <h3>Tips for Navigation</h3>
      <ul>
        <li>Use <kbd>Ctrl+Tab</kbd> to switch between open windows</li>
        <li>Double-click a variable name in Data View to jump to Variable View</li>
        <li>Right-click on variables for quick access to common operations</li>
        <li>The status bar at the bottom shows helpful information</li>
        <li>Save your data file frequently (<kbd>Ctrl+S</kbd>)</li>
      </ul>
    </section>

    <div class="key-takeaways">
      <h3>Key Takeaways</h3>
      <ul>
        <li>Data View shows your actual data (like a spreadsheet)</li>
        <li>Variable View defines variable properties and measurement levels</li>
        <li>Output Viewer displays analysis results</li>
        <li>Dialog boxes provide point-and-click access to analyses</li>
        <li>Switch between views using tabs at the bottom</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// No special logic needed for static content
</script>

<style scoped>
.software-content {
  max-width: 800px;
  margin: 0 auto;
}

.content-section {
  margin: 2rem 0;
}

.content-section h3 {
  color: var(--color-primary);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.content-section h4 {
  color: var(--color-text);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.content-section ul {
  margin: 1rem 0;
  padding-left: 2rem;
}

.content-section li {
  margin: 0.5rem 0;
  line-height: 1.6;
}

kbd {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 3px;
  padding: 2px 6px;
  font-family: monospace;
  font-size: 0.9em;
}

.key-takeaways {
  background-color: var(--color-surface-elevated);
  border-left: 4px solid var(--color-primary);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 4px;
}

.key-takeaways h3 {
  margin-top: 0;
  color: var(--color-primary);
}

strong {
  color: var(--color-text-strong);
  font-weight: 600;
}
</style>
