<template>
  <div class="software-content">
    <h2>Entering and Importing Data in SPSS</h2>

    <section class="content-section">
      <h3>Manual Data Entry</h3>
      <p>
        SPSS allows you to enter data directly into the Data View, similar to Excel.
      </p>
      <ul>
        <li>Click any cell in Data View to enter a value</li>
        <li>Press Tab or Enter to move to the next cell</li>
        <li>Ensure variable types are set correctly in Variable View first</li>
      </ul>

      <h3>Importing Data from CSV/Excel</h3>
      <p>
        To import data: <em>File → Open → Data</em>, then select your file type.
      </p>
      <ul>
        <li>SPSS can read .csv, .xlsx, .txt, and .sav files</li>
        <li>Use the import wizard to specify delimiters and variable names</li>
        <li>First row usually contains variable names</li>
      </ul>

      <h3>Data Validation</h3>
      <p>
        Check your data after import:
      </p>
      <ul>
        <li>Use <em>Analyze → Descriptive Statistics → Frequencies</em> to check for errors</li>
        <li>Look for unexpected values or missing data</li>
        <li>Verify variable types in Variable View</li>
      </ul>
    </section>

    <div class="key-takeaways">
      <h3>Key Takeaways</h3>
      <ul>
        <li>Enter data in Data View or import from external files</li>
        <li>Use File → Open → Data for imports</li>
        <li>Always validate data after import</li>
      </ul>
    </div>
  </div>
</template>

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
.key-takeaways {
  background-color: var(--color-surface-elevated);
  border-left: 4px solid var(--color-primary);
  padding: 1.5rem;
  margin: 2rem 0;
  border-radius: 4px;
}
</style>
