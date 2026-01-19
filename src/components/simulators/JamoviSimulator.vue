<template>
  <BaseSimulator
    software="jamovi"
    :task="task"
    :can-check="hasSelection"
    :show-hint="showHint"
    :show-reset="hasSelection"
    :feedback="feedback"
    @check-answer="checkAnswer"
    @reset="resetSimulator"
    @show-hint="showHint = true"
  >
    <div class="jamovi-simulator">
      <!-- Title Bar -->
      <div class="title-bar">
        <span class="title-text">jamovi - Untitled</span>
        <div class="window-controls">
          <span class="control">−</span>
          <span class="control">□</span>
          <span class="control close">×</span>
        </div>
      </div>

      <!-- Main Ribbon Tabs -->
      <div class="ribbon-tabs">
        <button class="hamburger-menu" @click="openHamburgerMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
        <button
          v-for="tab in ribbonTabs"
          :key="tab.id"
          class="ribbon-tab"
          :class="{ active: activeTab === tab.id, highlighted: isTabHighlighted(tab.id) }"
          @click="selectTab(tab.id)"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Hamburger Menu Dropdown -->
      <div v-if="showHamburgerMenu" class="hamburger-dropdown">
        <div
          v-for="item in hamburgerMenuItems"
          :key="item.id"
          class="hamburger-item"
          :class="{ highlighted: isMenuItemHighlighted('file', item.id) }"
          @click="selectHamburgerItem(item)"
        >
          <span class="item-icon">{{ item.icon }}</span>
          <span class="item-label">{{ item.label }}</span>
        </div>
      </div>

      <!-- Data Tab Ribbon -->
      <div v-if="activeTab === 'data'" class="ribbon-toolbar">
        <div class="ribbon-group">
          <div class="ribbon-buttons">
            <button class="ribbon-btn small">
              <span class="btn-icon">📋</span>
            </button>
            <button class="ribbon-btn small">
              <span class="btn-icon">✂️</span>
            </button>
          </div>
          <div class="ribbon-buttons">
            <button class="ribbon-btn small">
              <span class="btn-icon">📄</span>
            </button>
          </div>
          <div class="ribbon-buttons row">
            <button class="ribbon-btn tiny">↩️</button>
            <button class="ribbon-btn tiny">↪️</button>
          </div>
          <span class="group-label">Clipboard</span>
        </div>

        <div class="ribbon-divider"></div>

        <div class="ribbon-group">
          <button
            class="ribbon-btn large"
            :class="{ highlighted: isMenuItemHighlighted('data', 'setup') || isMenuItemHighlighted('data', 'variable-editor') }"
            @click="handleDataAction('setup')"
          >
            <span class="btn-icon large">⚙️</span>
            <span class="btn-text">Setup</span>
          </button>
          <button
            class="ribbon-btn large"
            :class="{ highlighted: isMenuItemHighlighted('data', 'compute') }"
            @click="handleDataAction('compute')"
          >
            <span class="btn-icon large">🔢</span>
            <span class="btn-text">Compute</span>
          </button>
          <button class="ribbon-btn large" @click="handleDataAction('transform')">
            <span class="btn-icon large">🔄</span>
            <span class="btn-text">Transform</span>
          </button>
          <button class="ribbon-btn large">
            <span class="btn-icon large">⚖️</span>
            <span class="btn-text">Weights</span>
          </button>
          <span class="group-label">Variables</span>
        </div>

        <div class="ribbon-divider"></div>

        <div class="ribbon-group">
          <div class="ribbon-btn-dropdown">
            <button
              class="ribbon-btn medium with-dropdown"
              :class="{ highlighted: isMenuItemHighlighted('data', 'add-variable') }"
              @click="toggleAddVarMenu"
            >
              <span class="btn-icon">➕</span>
              <span class="btn-text">Add</span>
              <span class="dropdown-arrow">▼</span>
            </button>
            <button class="ribbon-btn medium">
              <span class="btn-icon">🗑️</span>
              <span class="btn-text">Delete</span>
            </button>
          </div>
          <span class="group-label">Variables</span>
        </div>

        <div class="ribbon-divider"></div>

        <div class="ribbon-group">
          <button
            class="ribbon-btn large"
            :class="{ highlighted: isMenuItemHighlighted('data', 'filters') }"
            @click="handleDataAction('filters')"
          >
            <span class="btn-icon large filter-icon">🔍</span>
            <span class="btn-text">Filters</span>
          </button>
          <span class="group-label">Rows</span>
        </div>

        <div class="ribbon-divider"></div>

        <div class="ribbon-group">
          <div class="ribbon-btn-dropdown">
            <button class="ribbon-btn medium with-dropdown">
              <span class="btn-icon">➕</span>
              <span class="btn-text">Add</span>
              <span class="dropdown-arrow">▼</span>
            </button>
            <button class="ribbon-btn medium">
              <span class="btn-icon">🗑️</span>
              <span class="btn-text">Delete</span>
            </button>
          </div>
          <span class="group-label">Rows</span>
        </div>
      </div>

      <!-- Add Variable Dropdown -->
      <div v-if="showAddVariableMenu" class="dropdown-menu add-var-dropdown">
        <div
          class="dropdown-item"
          :class="{ highlighted: isSubOptionHighlighted('data') }"
          @click="selectAddVariable('data')"
        >
          <span class="var-icon nominal">🔗</span>
          Data Variable
        </div>
        <div
          class="dropdown-item"
          :class="{ highlighted: isSubOptionHighlighted('computed') }"
          @click="selectAddVariable('computed')"
        >
          <span class="var-icon computed">fx</span>
          Computed Variable
        </div>
        <div
          class="dropdown-item"
          :class="{ highlighted: isSubOptionHighlighted('recoded') }"
          @click="selectAddVariable('recoded')"
        >
          <span class="var-icon">↔️</span>
          Recoded Variable
        </div>
        <div class="dropdown-item" @click="selectAddVariable('output')">
          <span class="var-icon">📊</span>
          Output Variable
        </div>
      </div>

      <!-- Variables Tab Ribbon -->
      <div v-if="activeTab === 'variables'" class="ribbon-toolbar">
        <div class="ribbon-group">
          <div class="ribbon-buttons row">
            <button class="ribbon-btn tiny">↩️</button>
            <button class="ribbon-btn tiny">↪️</button>
          </div>
          <span class="group-label">Edit</span>
        </div>

        <div class="ribbon-divider"></div>

        <div class="ribbon-group">
          <button
            class="ribbon-btn large"
            :class="{ highlighted: isMenuItemHighlighted('variables', 'edit') }"
            @click="handleVariablesAction('edit')"
          >
            <span class="btn-icon large">✏️</span>
            <span class="btn-text">Edit</span>
          </button>
          <button
            class="ribbon-btn large"
            :class="{ highlighted: isMenuItemHighlighted('data', 'compute') }"
            @click="handleDataAction('compute')"
          >
            <span class="btn-icon large">🔢</span>
            <span class="btn-text">Compute</span>
          </button>
          <button class="ribbon-btn large">
            <span class="btn-icon large">🔄</span>
            <span class="btn-text">Transform</span>
          </button>
          <span class="group-label">Variables</span>
        </div>

        <div class="ribbon-divider"></div>

        <div class="ribbon-group">
          <div class="ribbon-btn-dropdown">
            <button
              class="ribbon-btn medium with-dropdown"
              :class="{ highlighted: isMenuItemHighlighted('data', 'add-variable') }"
              @click="toggleAddVarMenu"
            >
              <span class="btn-icon">➕</span>
              <span class="btn-text">Add</span>
              <span class="dropdown-arrow">▼</span>
            </button>
            <button class="ribbon-btn medium">
              <span class="btn-icon">🗑️</span>
              <span class="btn-text">Delete</span>
            </button>
          </div>
        </div>

        <div class="ribbon-divider"></div>

        <div class="ribbon-group">
          <button class="ribbon-btn large" @click="handleDataAction('filters')">
            <span class="btn-icon large">🔍</span>
            <span class="btn-text">Filters</span>
          </button>
          <span class="group-label">Rows</span>
        </div>
      </div>

      <!-- Analysis Toolbar (when Analyses tab is active) -->
      <div v-if="activeTab === 'analyses'" class="analysis-toolbar">
        <div
          v-for="analysis in analysisTools"
          :key="analysis.id"
          class="analysis-tool"
          :class="{ active: activeAnalysis === analysis.id, highlighted: isAnalysisHighlighted(analysis.id) }"
          @click="selectAnalysis(analysis)"
        >
          <div class="tool-icon" v-html="analysis.icon"></div>
          <span class="tool-label">{{ analysis.label }}</span>
        </div>
        <div class="modules-button">
          <div class="tool-icon modules-icon">+</div>
          <span class="tool-label">Modules</span>
        </div>
      </div>

      <!-- Analysis Submenu -->
      <div v-if="activeAnalysisSubmenu" class="dropdown-menu analysis-dropdown">
        <div
          v-for="item in activeAnalysisSubmenu.items"
          :key="item.id"
          class="dropdown-item"
          :class="{ highlighted: isSubOptionHighlighted(item.id) }"
          @click="selectAnalysisOption(item)"
        >
          {{ item.label }}
        </div>
      </div>

      <!-- Edit Tab Ribbon -->
      <div v-if="activeTab === 'edit'" class="ribbon-toolbar">
        <div class="ribbon-group">
          <button class="ribbon-btn large">
            <span class="btn-icon large">↩️</span>
            <span class="btn-text">Undo</span>
          </button>
          <button class="ribbon-btn large">
            <span class="btn-icon large">↪️</span>
            <span class="btn-text">Redo</span>
          </button>
          <span class="group-label">Edit</span>
        </div>

        <div class="ribbon-divider"></div>

        <div class="ribbon-group">
          <button class="ribbon-btn large">
            <span class="btn-icon large">✂️</span>
            <span class="btn-text">Cut</span>
          </button>
          <button class="ribbon-btn large">
            <span class="btn-icon large">📋</span>
            <span class="btn-text">Copy</span>
          </button>
          <button class="ribbon-btn large">
            <span class="btn-icon large">📄</span>
            <span class="btn-text">Paste</span>
          </button>
          <span class="group-label">Clipboard</span>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="main-content">
        <!-- Variables List View (when Variables tab is active) -->
        <div v-if="activeTab === 'variables' && !showVariableEditor" class="variables-list-view">
          <div class="search-bar">
            <span class="search-icon">🔍</span>
            <input type="text" placeholder="Search variables" class="search-input" />
          </div>
          <div class="variables-header">
            <span class="col-checkbox"></span>
            <span class="col-icon"></span>
            <span class="col-name">Name</span>
            <span class="col-desc">Description</span>
          </div>
          <div class="variables-list">
            <div
              v-for="(col, index) in displayColumns"
              :key="col.name"
              class="variable-row"
              :class="{ selected: selectedVariable === index }"
              @click="selectVariableRow(index)"
              @dblclick="openVariableEditor(index)"
            >
              <span class="col-checkbox">
                <input type="checkbox" :checked="selectedVariable === index" />
              </span>
              <span class="col-icon">
                <span class="var-type-badge" :class="col.type">{{ getTypeIcon(col.type) }}</span>
              </span>
              <span class="col-name">{{ col.name }}</span>
              <span class="col-desc placeholder">Enter description</span>
            </div>
          </div>
        </div>

        <!-- Variable Editor Panel -->
        <div v-if="showVariableEditor" class="variable-editor-panel">
          <div class="editor-header">DATA VARIABLE</div>
          <div class="editor-content">
            <div class="editor-form">
              <input type="text" class="var-name-input" :value="editingVariable?.name || 'Variable'" />
              <input type="text" class="var-desc-input" placeholder="Description" />

              <div class="form-row">
                <label>Measure type</label>
                <select class="measure-select">
                  <option value="nominal" selected>Nominal</option>
                  <option value="ordinal">Ordinal</option>
                  <option value="continuous">Continuous</option>
                  <option value="id">ID</option>
                </select>
                <span class="measure-icon">🔗</span>
              </div>

              <div class="form-row">
                <label>Data type</label>
                <select class="data-type-select">
                  <option value="integer" selected>Integer</option>
                  <option value="decimal">Decimal</option>
                  <option value="text">Text</option>
                </select>
                <span class="auto-label">(auto)</span>
              </div>

              <div class="form-row">
                <label>Missing values</label>
                <input type="text" class="missing-input" />
              </div>
            </div>

            <div class="levels-panel">
              <div class="levels-header">Levels</div>
              <div class="levels-list">
                <!-- Empty levels list -->
              </div>
              <div class="levels-footer">
                <label>
                  <span>Retain unused levels in analyses</span>
                  <input type="checkbox" class="toggle" />
                </label>
              </div>
            </div>
          </div>
          <button class="close-editor" @click="closeVariableEditor">×</button>
          <div class="nav-arrows">
            <button class="nav-arrow prev">‹</button>
            <button class="nav-arrow next">›</button>
          </div>
        </div>

        <!-- Spreadsheet (default view) -->
        <div v-if="activeTab !== 'variables' || showVariableEditor" class="spreadsheet-area">
          <div class="spreadsheet-header">
            <div class="row-number-header"></div>
            <div
              v-for="(col, index) in displayColumns"
              :key="col.name"
              class="column-header"
              :class="{ selected: selectedColumn === index }"
              @click="selectColumn(index)"
              @dblclick="openVariableEditorForColumn(index)"
            >
              <span class="var-type-indicator" :class="col.type">{{ getTypeIcon(col.type) }}</span>
              <span class="column-name">{{ col.name }}</span>
            </div>
          </div>

          <div class="spreadsheet-body">
            <div
              v-for="(row, rowIndex) in displayRows"
              :key="rowIndex"
              class="spreadsheet-row"
            >
              <div class="row-number">{{ rowIndex + 1 }}</div>
              <div
                v-for="(col, colIndex) in displayColumns"
                :key="col.name"
                class="cell"
                :class="{
                  selected: selectedCell?.row === rowIndex && selectedCell?.col === colIndex,
                  'col-selected': selectedColumn === colIndex
                }"
                @click="selectCell(rowIndex, colIndex)"
              >
                {{ getCellValue(row, col.name) }}
              </div>
            </div>
            <div v-for="n in emptyRowCount" :key="'empty-' + n" class="spreadsheet-row empty">
              <div class="row-number">{{ displayRows.length + n }}</div>
              <div v-for="col in displayColumns" :key="col.name" class="cell"></div>
            </div>
          </div>
        </div>

        <!-- Results Panel -->
        <div class="results-panel" :class="{ narrow: showVariableEditor }">
          <div class="results-content">
            <div class="jamovi-logo">
              <svg viewBox="0 0 60 60" class="logo-svg">
                <path d="M10 30 L30 10 L50 30 L30 50 Z" fill="#5778a4" />
              </svg>
              <span class="version">version 2.6.44</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Status Bar -->
      <div class="status-bar">
        <span>Ready</span>
        <span class="status-item">▼ ◉ Filters 0</span>
        <span class="status-item">Row count {{ totalRows }}</span>
        <span class="status-item">Filtered 0</span>
        <span class="status-item">Deleted 0</span>
        <span class="status-item">Added 0</span>
        <span class="status-item">Cells edited 0</span>
      </div>

      <!-- Click overlay to close menus -->
      <div
        v-if="showHamburgerMenu || activeAnalysisSubmenu || showAddVariableMenu"
        class="menu-overlay"
        @click="closeAllMenus"
      ></div>

      <!-- Selection Summary -->
      <div v-if="selections.length > 0" class="selection-summary">
        <strong>Your selections:</strong>
        <ul>
          <li v-for="(sel, idx) in selections" :key="idx">
            {{ formatSelection(sel) }}
          </li>
        </ul>
      </div>
    </div>
  </BaseSimulator>
</template>

<script setup>
import { ref, computed } from 'vue'
import BaseSimulator from './BaseSimulator.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['correct', 'incorrect'])

// State
const activeTab = ref('data')
const showHamburgerMenu = ref(false)
const activeAnalysis = ref(null)
const activeAnalysisSubmenu = ref(null)
const showAddVariableMenu = ref(false)
const showVariableEditor = ref(false)
const editingVariable = ref(null)
const selectedColumn = ref(null)
const selectedCell = ref(null)
const selectedVariable = ref(null)
const selections = ref([])
const showHint = ref(false)
const feedback = ref(null)

// Ribbon tabs
const ribbonTabs = [
  { id: 'variables', label: 'Variables' },
  { id: 'data', label: 'Data' },
  { id: 'analyses', label: 'Analyses' },
  { id: 'edit', label: 'Edit' }
]

// Hamburger menu
const hamburgerMenuItems = [
  { id: 'new', label: 'New', icon: '📄' },
  { id: 'open', label: 'Open', icon: '📂' },
  { id: 'save', label: 'Save', icon: '💾' },
  { id: 'save-as', label: 'Save As', icon: '💾' },
  { id: 'export', label: 'Export', icon: '📤' },
  { id: 'import', label: 'Import', icon: '📥' }
]

// Analysis tools
const analysisTools = [
  {
    id: 'exploration',
    label: 'Exploration',
    icon: '<svg viewBox="0 0 24 24" width="28" height="28"><rect x="3" y="12" width="4" height="8" fill="#5778a4"/><rect x="10" y="6" width="4" height="14" fill="#5778a4"/><rect x="17" y="9" width="4" height="11" fill="#5778a4"/></svg>',
    submenu: [
      { id: 'descriptives', label: 'Descriptives' },
      { id: 'distribution', label: 'Distribution' }
    ]
  },
  {
    id: 'ttests',
    label: 'T-Tests',
    icon: '<svg viewBox="0 0 24 24" width="28" height="28"><circle cx="8" cy="12" r="4" fill="none" stroke="#e8a838" stroke-width="2"/><circle cx="16" cy="12" r="4" fill="none" stroke="#e8a838" stroke-width="2"/></svg>',
    submenu: [
      { id: 'independent', label: 'Independent Samples T-Test' },
      { id: 'paired', label: 'Paired Samples T-Test' },
      { id: 'onesample', label: 'One Sample T-Test' }
    ]
  },
  {
    id: 'anova',
    label: 'ANOVA',
    icon: '<svg viewBox="0 0 24 24" width="28" height="28"><circle cx="6" cy="12" r="3" fill="none" stroke="#e8a838" stroke-width="2"/><circle cx="12" cy="12" r="3" fill="none" stroke="#e8a838" stroke-width="2"/><circle cx="18" cy="12" r="3" fill="none" stroke="#e8a838" stroke-width="2"/></svg>',
    submenu: [
      { id: 'oneway', label: 'One-Way ANOVA' },
      { id: 'anova', label: 'ANOVA' },
      { id: 'repeated', label: 'Repeated Measures ANOVA' },
      { id: 'ancova', label: 'ANCOVA' },
      { id: 'mancova', label: 'MANCOVA' }
    ]
  },
  {
    id: 'regression',
    label: 'Regression',
    icon: '<svg viewBox="0 0 24 24" width="28" height="28"><line x1="4" y1="18" x2="20" y2="6" stroke="#6a9bc3" stroke-width="2"/><circle cx="6" cy="16" r="2" fill="#6a9bc3"/><circle cx="10" cy="13" r="2" fill="#6a9bc3"/><circle cx="14" cy="10" r="2" fill="#6a9bc3"/><circle cx="18" cy="7" r="2" fill="#6a9bc3"/></svg>',
    submenu: [
      { id: 'correlation', label: 'Correlation Matrix' },
      { id: 'linear', label: 'Linear Regression' },
      { id: 'logistic', label: 'Logistic Regression' }
    ]
  },
  {
    id: 'frequencies',
    label: 'Frequencies',
    icon: '<svg viewBox="0 0 24 24" width="28" height="28"><rect x="4" y="4" width="7" height="7" fill="#85a86e" stroke="#85a86e"/><rect x="13" y="4" width="7" height="7" fill="none" stroke="#85a86e" stroke-width="2"/><rect x="4" y="13" width="7" height="7" fill="none" stroke="#85a86e" stroke-width="2"/><rect x="13" y="13" width="7" height="7" fill="#85a86e" stroke="#85a86e"/></svg>',
    submenu: [
      { id: 'onesample_prop', label: 'One Sample Proportion Tests' },
      { id: 'independent', label: 'Independent Samples' },
      { id: 'paired', label: 'Paired Samples' },
      { id: 'contingency', label: 'Contingency Tables' }
    ]
  },
  {
    id: 'factor',
    label: 'Factor',
    icon: '<svg viewBox="0 0 24 24" width="28" height="28"><circle cx="12" cy="6" r="3" fill="none" stroke="#9b7eb3" stroke-width="2"/><circle cx="6" cy="16" r="3" fill="none" stroke="#9b7eb3" stroke-width="2"/><circle cx="18" cy="16" r="3" fill="none" stroke="#9b7eb3" stroke-width="2"/><line x1="12" y1="9" x2="6" y2="13" stroke="#9b7eb3" stroke-width="1.5"/><line x1="12" y1="9" x2="18" y2="13" stroke="#9b7eb3" stroke-width="1.5"/></svg>',
    submenu: [
      { id: 'reliability', label: 'Reliability Analysis' },
      { id: 'pca', label: 'Principal Component Analysis' },
      { id: 'efa', label: 'Exploratory Factor Analysis' },
      { id: 'cfa', label: 'Confirmatory Factor Analysis' }
    ]
  },
  {
    id: 'sem',
    label: 'SEM',
    icon: '<svg viewBox="0 0 24 24" width="28" height="28"><rect x="2" y="8" width="6" height="8" fill="none" stroke="#7a9eb8" stroke-width="1.5"/><rect x="16" y="4" width="6" height="6" fill="none" stroke="#7a9eb8" stroke-width="1.5"/><rect x="16" y="14" width="6" height="6" fill="none" stroke="#7a9eb8" stroke-width="1.5"/><line x1="8" y1="12" x2="16" y2="7" stroke="#7a9eb8" stroke-width="1.5"/><line x1="8" y1="12" x2="16" y2="17" stroke="#7a9eb8" stroke-width="1.5"/></svg>',
    submenu: [
      { id: 'sem', label: 'Structural Equation Model' },
      { id: 'mediation', label: 'Mediation Analysis' }
    ]
  }
]

// Computed
const hasSelection = computed(() => selections.value.length > 0)

const displayColumns = computed(() => {
  if (props.task.sampleData?.columns) {
    return props.task.sampleData.columns.map(col => {
      let type = 'continuous'
      const name = col.toLowerCase()
      if (name.includes('id') || name.includes('gender') || name.includes('group') || name.includes('preference') || name.includes('method') || name.includes('color')) {
        type = 'nominal'
      } else if (name.includes('rating') || name.includes('level') || (name.includes('age') && name.includes('group'))) {
        type = 'ordinal'
      }
      return { name: col, type }
    })
  }
  return [
    { name: 'A', type: 'nominal' },
    { name: 'B', type: 'nominal' },
    { name: 'C', type: 'nominal' }
  ]
})

const displayRows = computed(() => {
  if (props.task.sampleData?.rows) {
    return props.task.sampleData.rows.slice(0, 10)
  }
  return []
})

const totalRows = computed(() => props.task.sampleData?.rows?.length || 0)
const emptyRowCount = computed(() => Math.max(0, 12 - displayRows.value.length))

// Methods
function getTypeIcon(type) {
  const icons = { nominal: '🔗', ordinal: '📊', continuous: '📏', id: '#' }
  return icons[type] || '🔗'
}

function getCellValue(row, colName) {
  return row[colName] ?? ''
}

function selectTab(tabId) {
  activeTab.value = tabId
  closeAllMenus()
  showVariableEditor.value = false
}

function openHamburgerMenu() {
  showHamburgerMenu.value = !showHamburgerMenu.value
  activeAnalysisSubmenu.value = null
  showAddVariableMenu.value = false
}

function selectHamburgerItem(item) {
  addSelection({ menu: 'file', option: item.id })
  closeAllMenus()
}

function selectAnalysis(analysis) {
  if (analysis.submenu) {
    activeAnalysis.value = analysis.id
    activeAnalysisSubmenu.value = { parentId: analysis.id, items: analysis.submenu }
    showHamburgerMenu.value = false
    showAddVariableMenu.value = false
  }
}

function selectAnalysisOption(item) {
  addSelection({ menu: 'analyses', option: activeAnalysis.value, subOption: item.id })
  closeAllMenus()
}

function handleDataAction(action) {
  if (action === 'setup' || action === 'variable-editor') {
    addSelection({ menu: 'data', option: 'variable-editor' })
    // Open variable editor for first variable
    if (displayColumns.value.length > 0) {
      editingVariable.value = displayColumns.value[0]
      showVariableEditor.value = true
    }
  } else if (action === 'compute') {
    addSelection({ menu: 'data', option: 'add-variable', subOption: 'computed' })
  } else {
    addSelection({ menu: 'data', option: action })
  }
}

function handleVariablesAction(action) {
  if (action === 'edit') {
    if (selectedVariable.value !== null && displayColumns.value[selectedVariable.value]) {
      editingVariable.value = displayColumns.value[selectedVariable.value]
      showVariableEditor.value = true
      addSelection({ menu: 'data', option: 'variable-editor' })
    }
  }
}

function toggleAddVarMenu() {
  showAddVariableMenu.value = !showAddVariableMenu.value
  activeAnalysisSubmenu.value = null
  showHamburgerMenu.value = false
}

function selectAddVariable(varType) {
  addSelection({ menu: 'data', option: 'add-variable', subOption: varType })
  closeAllMenus()
}

function selectColumn(index) {
  selectedColumn.value = index
  selectedCell.value = null
}

function selectCell(row, col) {
  selectedCell.value = { row, col }
  selectedColumn.value = null
}

function selectVariableRow(index) {
  selectedVariable.value = index
}

function openVariableEditor(index) {
  editingVariable.value = displayColumns.value[index]
  showVariableEditor.value = true
  addSelection({ menu: 'data', option: 'variable-editor' })
}

function openVariableEditorForColumn(index) {
  editingVariable.value = displayColumns.value[index]
  showVariableEditor.value = true
  addSelection({ menu: 'data', option: 'variable-editor' })
}

function closeVariableEditor() {
  showVariableEditor.value = false
  editingVariable.value = null
}

function closeAllMenus() {
  showHamburgerMenu.value = false
  activeAnalysis.value = null
  activeAnalysisSubmenu.value = null
  showAddVariableMenu.value = false
}

function addSelection(selection) {
  const exists = selections.value.some(
    s => s.menu === selection.menu && s.option === selection.option && s.subOption === selection.subOption
  )
  if (!exists) {
    selections.value.push(selection)
  }
}

// Highlighting
function isTabHighlighted(tabId) {
  if (!showHint.value) return false
  const expected = props.task.expectedSelections || []
  if (tabId === 'analyses') return expected.some(e => e.menu === 'analyses')
  if (tabId === 'data') return expected.some(e => e.menu === 'data')
  if (tabId === 'variables') return expected.some(e => e.menu === 'data' && e.option === 'variable-editor')
  return false
}

function isMenuItemHighlighted(menu, option) {
  if (!showHint.value) return false
  const expected = props.task.expectedSelections || []
  return expected.some(e => e.menu === menu && e.option === option)
}

function isAnalysisHighlighted(analysisId) {
  if (!showHint.value) return false
  const expected = props.task.expectedSelections || []
  return expected.some(e => e.menu === 'analyses' && e.option === analysisId)
}

function isSubOptionHighlighted(subOptionId) {
  if (!showHint.value) return false
  const expected = props.task.expectedSelections || []
  return expected.some(e => e.subOption === subOptionId)
}

function formatSelection(sel) {
  let path = []
  if (sel.menu === 'file') {
    path.push('☰ Menu')
    const item = hamburgerMenuItems.find(i => i.id === sel.option)
    path.push(item?.label || sel.option)
  } else if (sel.menu === 'analyses') {
    path.push('Analyses')
    const tool = analysisTools.find(t => t.id === sel.option)
    path.push(tool?.label || sel.option)
    if (sel.subOption && tool?.submenu) {
      const sub = tool.submenu.find(s => s.id === sel.subOption)
      path.push(sub?.label || sel.subOption)
    }
  } else if (sel.menu === 'data') {
    path.push('Data')
    if (sel.option === 'add-variable') {
      path.push('Add')
      if (sel.subOption === 'computed') path.push('Computed Variable')
      else if (sel.subOption === 'data') path.push('Data Variable')
      else if (sel.subOption === 'recoded') path.push('Recoded Variable')
      else path.push(sel.subOption)
    } else if (sel.option === 'variable-editor') {
      path.push('Setup (Variable Editor)')
    } else {
      path.push(sel.option)
    }
  }
  return path.join(' → ')
}

function checkAnswer() {
  const expected = props.task.expectedSelections || []
  const allCorrect = expected.every(exp =>
    selections.value.some(sel =>
      sel.menu === exp.menu && sel.option === exp.option && (exp.subOption ? sel.subOption === exp.subOption : true)
    )
  )
  const noExtras = selections.value.length === expected.length

  if (allCorrect && noExtras) {
    feedback.value = { type: 'correct', message: props.task.successMessage || 'Correct! You found the right menu path.' }
    emit('correct')
  } else {
    feedback.value = { type: 'incorrect', message: props.task.failureMessage || 'Not quite. Try again.' }
    emit('incorrect')
  }
}

function resetSimulator() {
  selections.value = []
  feedback.value = null
  showHint.value = false
  closeAllMenus()
  showVariableEditor.value = false
  editingVariable.value = null
  selectedColumn.value = null
  selectedCell.value = null
  selectedVariable.value = null
}

defineExpose({ reset: resetSimulator })
</script>

<style scoped>
.jamovi-simulator {
  font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  border: 1px solid #ccc;
}

/* Title Bar */
.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f0f0f0;
  padding: 4px 8px;
  border-bottom: 1px solid #ddd;
  font-size: 12px;
  color: #333;
}

.window-controls {
  display: flex;
  gap: 8px;
}

.control {
  cursor: pointer;
  padding: 0 4px;
  color: #666;
}

.control.close:hover {
  color: #e81123;
}

/* Ribbon Tabs */
.ribbon-tabs {
  display: flex;
  align-items: center;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
}

.hamburger-menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
  width: 40px;
  height: 36px;
  background: #f5f5f5;
  border: none;
  cursor: pointer;
  border-right: 1px solid #e0e0e0;
}

.hamburger-menu span {
  display: block;
  width: 16px;
  height: 2px;
  background: #666;
}

.hamburger-menu:hover {
  background: #e8e8e8;
}

.ribbon-tab {
  padding: 10px 20px;
  background: transparent;
  border: none;
  font-size: 13px;
  color: #333;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
}

.ribbon-tab:hover {
  background: #f5f5f5;
}

.ribbon-tab.active {
  color: #5778a4;
  border-bottom-color: #5778a4;
  font-weight: 500;
}

.ribbon-tab.highlighted {
  background: #fff3cd;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Hamburger Dropdown */
.hamburger-dropdown {
  position: absolute;
  top: 60px;
  left: 0;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 200px;
}

.hamburger-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 13px;
}

.hamburger-item:hover {
  background: #f5f5f5;
}

.hamburger-item.highlighted {
  background: #fff3cd;
}

.item-icon {
  font-size: 16px;
}

/* Ribbon Toolbar */
.ribbon-toolbar {
  display: flex;
  align-items: flex-end;
  padding: 4px 8px 8px;
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  gap: 2px;
  min-height: 70px;
}

.ribbon-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 8px;
  position: relative;
}

.ribbon-buttons {
  display: flex;
  gap: 2px;
}

.ribbon-buttons.row {
  flex-direction: row;
}

.ribbon-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 3px;
  cursor: pointer;
  padding: 4px 8px;
  transition: all 0.15s;
}

.ribbon-btn:hover {
  background: #e8e8e8;
  border-color: #ccc;
}

.ribbon-btn.highlighted {
  background: #fff3cd;
  border-color: #ffc107;
  animation: pulse 1.5s infinite;
}

.ribbon-btn.large {
  min-width: 50px;
  padding: 6px 10px;
}

.ribbon-btn.medium {
  flex-direction: row;
  gap: 4px;
  padding: 4px 8px;
}

.ribbon-btn.small {
  padding: 4px;
}

.ribbon-btn.tiny {
  padding: 2px 6px;
  font-size: 12px;
}

.ribbon-btn.with-dropdown {
  padding-right: 4px;
}

.btn-icon {
  font-size: 16px;
}

.btn-icon.large {
  font-size: 24px;
}

.btn-text {
  font-size: 11px;
  color: #333;
}

.dropdown-arrow {
  font-size: 8px;
  color: #666;
  margin-left: 2px;
}

.ribbon-btn-dropdown {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.group-label {
  font-size: 10px;
  color: #888;
  margin-top: 4px;
  text-align: center;
}

.ribbon-divider {
  width: 1px;
  height: 60px;
  background: #e0e0e0;
  margin: 0 4px;
}

/* Dropdown Menus */
.dropdown-menu {
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  min-width: 180px;
  border-radius: 4px;
}

.add-var-dropdown {
  top: 140px;
  left: 280px;
}

.analysis-dropdown {
  top: 140px;
  left: 12px;
  min-width: 220px;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 14px;
  cursor: pointer;
  font-size: 13px;
}

.dropdown-item:hover {
  background: #f5f5f5;
}

.dropdown-item.highlighted {
  background: #fff3cd;
}

.var-icon {
  font-size: 14px;
}

.var-icon.nominal {
  color: #e8a838;
}

.var-icon.computed {
  background: #e3f2fd;
  color: #1976d2;
  font-weight: bold;
  font-size: 10px;
  padding: 2px 4px;
  border-radius: 2px;
}

/* Analysis Toolbar */
.analysis-toolbar {
  display: flex;
  align-items: flex-start;
  padding: 8px 12px;
  background: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  gap: 4px;
  flex-wrap: wrap;
}

.analysis-tool {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  min-width: 64px;
  transition: background 0.15s;
}

.analysis-tool:hover {
  background: #e8e8e8;
}

.analysis-tool.active {
  background: #d4e5f7;
}

.analysis-tool.highlighted {
  background: #fff3cd;
  animation: pulse 1.5s infinite;
}

.tool-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-label {
  font-size: 11px;
  color: #333;
  margin-top: 4px;
  text-align: center;
}

.modules-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 12px;
  margin-left: auto;
  cursor: pointer;
  border-radius: 4px;
}

.modules-icon {
  font-size: 24px;
  color: #5778a4;
  font-weight: bold;
}

/* Main Content */
.main-content {
  display: flex;
  height: 320px;
  position: relative;
}

/* Variables List View */
.variables-list-view {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-right: 3px solid #e0e0e0;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
  gap: 8px;
}

.search-icon {
  color: #999;
}

.search-input {
  flex: 1;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 6px 10px;
  font-size: 13px;
}

.variables-header {
  display: flex;
  padding: 8px 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  font-size: 12px;
  font-weight: 500;
  color: #666;
}

.col-checkbox {
  width: 30px;
}

.col-icon {
  width: 30px;
}

.col-name {
  width: 100px;
}

.col-desc {
  flex: 1;
}

.variables-list {
  flex: 1;
  overflow-y: auto;
}

.variable-row {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  font-size: 13px;
}

.variable-row:hover {
  background: #f5f5f5;
}

.variable-row.selected {
  background: #e3f2fd;
}

.var-type-badge {
  font-size: 12px;
}

.var-type-badge.nominal {
  color: #e8a838;
}

.var-type-badge.continuous {
  color: #5778a4;
}

.placeholder {
  color: #bbb;
  font-style: italic;
}

/* Variable Editor Panel */
.variable-editor-panel {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 500px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 50;
  border-radius: 4px;
}

.editor-header {
  padding: 12px 16px;
  font-size: 12px;
  color: #5778a4;
  letter-spacing: 1px;
  border-bottom: 1px solid #eee;
}

.editor-content {
  display: flex;
  padding: 16px;
  gap: 20px;
}

.editor-form {
  flex: 1;
}

.var-name-input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
}

.var-desc-input {
  width: 100%;
  padding: 8px 10px;
  font-size: 13px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 16px;
  color: #999;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  font-size: 13px;
}

.form-row label {
  width: 100px;
  color: #666;
}

.measure-select,
.data-type-select {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 13px;
  min-width: 100px;
}

.measure-icon {
  font-size: 16px;
  color: #e8a838;
}

.auto-label {
  color: #999;
  font-size: 12px;
}

.missing-input {
  padding: 6px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 120px;
}

.levels-panel {
  width: 180px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
}

.levels-header {
  padding: 8px 12px;
  background: #f8f9fa;
  font-size: 12px;
  color: #666;
  border-bottom: 1px solid #ddd;
}

.levels-list {
  flex: 1;
  min-height: 100px;
}

.levels-footer {
  padding: 8px 12px;
  border-top: 1px solid #ddd;
  font-size: 11px;
  color: #666;
}

.levels-footer label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.toggle {
  margin-left: auto;
}

.close-editor {
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  font-size: 20px;
  color: #999;
  cursor: pointer;
  padding: 4px 8px;
}

.close-editor:hover {
  color: #333;
}

.nav-arrows {
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-arrow {
  width: 24px;
  height: 24px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 50%;
  cursor: pointer;
  font-size: 14px;
  color: #666;
}

.nav-arrow:hover {
  background: #e8e8e8;
}

/* Spreadsheet */
.spreadsheet-area {
  flex: 1;
  overflow: auto;
  border-right: 3px solid #e0e0e0;
  background: #fff;
}

.spreadsheet-header {
  display: flex;
  position: sticky;
  top: 0;
  background: #f8f9fa;
  border-bottom: 2px solid #dee2e6;
  z-index: 10;
}

.row-number-header {
  width: 36px;
  min-width: 36px;
  background: #f0f0f0;
  border-right: 1px solid #ddd;
}

.column-header {
  min-width: 100px;
  padding: 8px 10px;
  display: flex;
  align-items: center;
  gap: 6px;
  border-right: 1px solid #e0e0e0;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #333;
}

.column-header:hover {
  background: #e8e8e8;
}

.column-header.selected {
  background: #cce5ff;
}

.var-type-indicator {
  font-size: 12px;
}

.var-type-indicator.nominal {
  color: #e8a838;
}

.var-type-indicator.ordinal {
  color: #e8a838;
}

.var-type-indicator.continuous {
  color: #5778a4;
}

.column-name {
  font-weight: 500;
}

.spreadsheet-body {
  font-size: 13px;
}

.spreadsheet-row {
  display: flex;
  border-bottom: 1px solid #f0f0f0;
}

.spreadsheet-row.empty {
  opacity: 0.5;
}

.row-number {
  width: 36px;
  min-width: 36px;
  padding: 6px 8px;
  text-align: center;
  background: #f8f9fa;
  border-right: 1px solid #e0e0e0;
  color: #666;
  font-size: 12px;
}

.cell {
  min-width: 100px;
  padding: 6px 10px;
  border-right: 1px solid #f0f0f0;
  cursor: cell;
}

.cell:hover {
  background: #f5f5f5;
}

.cell.selected {
  background: #cce5ff;
  outline: 2px solid #0d6efd;
}

.cell.col-selected {
  background: #e7f1ff;
}

/* Results Panel */
.results-panel {
  width: 40%;
  min-width: 250px;
  background: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.2s;
}

.results-panel.narrow {
  width: 20%;
  min-width: 150px;
}

.results-content {
  text-align: center;
}

.jamovi-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.logo-svg {
  width: 50px;
  height: 50px;
}

.version {
  color: #999;
  font-size: 13px;
}

/* Status Bar */
.status-bar {
  display: flex;
  gap: 12px;
  padding: 4px 12px;
  background: #f0f0f0;
  border-top: 1px solid #ddd;
  font-size: 11px;
  color: #666;
}

.status-item {
  white-space: nowrap;
}

/* Menu Overlay */
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
}

/* Selection Summary */
.selection-summary {
  margin: 12px;
  padding: 12px;
  background: #e8f4fd;
  border-radius: 6px;
  font-size: 13px;
  border: 1px solid #b8daff;
}

.selection-summary strong {
  color: #004085;
}

.selection-summary ul {
  margin: 8px 0 0 20px;
  padding: 0;
}

.selection-summary li {
  margin: 4px 0;
  color: #004085;
}
</style>
