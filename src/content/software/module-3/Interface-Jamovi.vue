<template>
  <div class="software-content">
    <h2>The Jamovi Interface</h2>

    <section class="content-section">
      <h3>Overview</h3>
      <p>
        Jamovi is a free, open-source statistical software with a clean, modern interface.
        It's designed to be user-friendly while providing powerful statistical capabilities.
      </p>
    </section>

    <section class="content-section">
      <h3>Main Components</h3>

      <h4>1. The Spreadsheet (Data View)</h4>
      <p>
        The left side of Jamovi shows your data in a spreadsheet format.
      </p>
      <ul>
        <li>Each row is a case/participant</li>
        <li>Each column is a variable</li>
        <li>Click on column headers to set variable properties</li>
        <li>Similar to Excel, but optimized for statistical analysis</li>
      </ul>

      <h4>2. The Results Panel</h4>
      <p>
        The right side displays your analysis results in real-time.
      </p>
      <ul>
        <li>Results update automatically when data changes</li>
        <li>Tables and plots appear as you run analyses</li>
        <li>Click on results to see additional options</li>
        <li>Results are organized chronologically</li>
      </ul>

      <h4>3. Variable Editor</h4>
      <p>
        Double-click any column header to open the variable editor panel.
      </p>
      <ul>
        <li><strong>Name</strong>: Variable identifier (no spaces)</li>
        <li><strong>Description</strong>: Full descriptive label</li>
        <li><strong>Data Type</strong>: Integer, Decimal, Text</li>
        <li><strong>Measure Type</strong>: Nominal, Ordinal, Continuous</li>
        <li><strong>Levels</strong>: Define value labels for categorical variables</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>The Ribbon Tabs</h3>
      <p>The top of Jamovi has three main tabs for analyses:</p>

      <h4>Analyses Tab</h4>
      <p>Contains all statistical procedures organized by category:</p>
      <ul>
        <li><strong>Exploration</strong>: Descriptive statistics, frequencies</li>
        <li><strong>T-Tests</strong>: Independent, paired, and one-sample t-tests</li>
        <li><strong>ANOVA</strong>: One-way, factorial, repeated measures</li>
        <li><strong>Regression</strong>: Linear and logistic regression</li>
        <li><strong>Frequencies</strong>: Chi-square, contingency tables</li>
      </ul>

      <h4>Edit Tab</h4>
      <p>Data manipulation and variable transformations:</p>
      <ul>
        <li>Add new variables</li>
        <li>Compute transformed variables</li>
        <li>Filter rows</li>
        <li>Sort data</li>
      </ul>

      <h4>Modules</h4>
      <p>
        Jamovi can be extended with additional modules for specialized analyses.
        Access the Jamovi library to install new statistical procedures.
      </p>
    </section>

    <section class="content-section">
      <h3>Unique Features</h3>

      <h4>Live Results</h4>
      <p>
        Unlike traditional software, Jamovi updates results automatically as you:
      </p>
      <ul>
        <li>Change analysis options</li>
        <li>Modify data values</li>
        <li>Add or remove variables</li>
      </ul>

      <h4>Integrated Help</h4>
      <p>
        Click the info icon (ⓘ) in any analysis to see:
      </p>
      <ul>
        <li>Explanation of options</li>
        <li>Statistical assumptions</li>
        <li>How to interpret results</li>
      </ul>

      <h4>Copy and Export</h4>
      <p>
        Right-click any result to:
      </p>
      <ul>
        <li>Copy as HTML (for Word)</li>
        <li>Copy as LaTeX</li>
        <li>Export images</li>
        <li>Save individual tables</li>
      </ul>
    </section>

    <section class="content-section">
      <h3>Navigation Tips</h3>
      <ul>
        <li>Use the hamburger menu (≡) for file operations</li>
        <li>Click the + button to add new variables</li>
        <li>Right-click on results for export options</li>
        <li>Use Ctrl+Z to undo data changes</li>
        <li>Double-click column headers to edit variable properties</li>
        <li>Drag the divider between data and results to resize panels</li>
      </ul>
    </section>

    <div class="key-takeaways">
      <h3>Key Takeaways</h3>
      <ul>
        <li>Spreadsheet on left, results on right</li>
        <li>Results update automatically (live analyses)</li>
        <li>Double-click column headers to edit variable properties</li>
        <li>Analyses organized in the ribbon tabs at top</li>
        <li>Free and open-source alternative to SPSS</li>
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
