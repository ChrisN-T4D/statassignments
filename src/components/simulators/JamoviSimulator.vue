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
    <div class="jamovi-interface">
      <!-- Menu Bar -->
      <div class="menu-bar">
        <div
          v-for="menu in menuItems"
          :key="menu.id"
          class="menu-item"
          :class="{ active: activeMenu === menu.id, highlighted: isMenuHighlighted(menu.id) }"
          @click="openMenu(menu.id)"
        >
          {{ menu.label }}
        </div>
      </div>

      <!-- Dropdown Menu -->
      <div v-if="activeMenu" class="dropdown-menu">
        <div
          v-for="item in getMenuOptions(activeMenu)"
          :key="item.id"
          class="dropdown-item"
          :class="{
            selected: isSelected(activeMenu, item.id),
            highlighted: isOptionHighlighted(activeMenu, item.id),
            'has-submenu': item.submenu
          }"
          @click="selectOption(activeMenu, item)"
        >
          {{ item.label }}
          <span v-if="item.submenu" class="submenu-arrow">▶</span>
        </div>
      </div>

      <!-- Submenu -->
      <div v-if="activeSubmenu" class="submenu" :style="submenuPosition">
        <div
          v-for="item in activeSubmenu.items"
          :key="item.id"
          class="dropdown-item"
          :class="{
            selected: isSelected(activeSubmenu.parentMenu, item.id, activeSubmenu.parentOption),
            highlighted: isSubOptionHighlighted(item.id)
          }"
          @click="selectSubOption(item)"
        >
          {{ item.label }}
        </div>
      </div>

      <!-- Click overlay to close menus -->
      <div
        v-if="activeMenu"
        class="menu-overlay"
        @click="closeMenus"
      ></div>

      <!-- Spreadsheet Preview -->
      <div class="spreadsheet-preview">
        <div class="spreadsheet-header">
          <div class="cell header-cell" v-for="col in previewColumns" :key="col">
            {{ col }}
          </div>
        </div>
        <div class="spreadsheet-row" v-for="row in previewRows" :key="row.id">
          <div class="cell" v-for="col in previewColumns" :key="col">
            {{ row[col] }}
          </div>
        </div>
      </div>

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
    // Expected structure:
    // {
    //   title: string,
    //   instructions: string,
    //   hint: string,
    //   expectedSelections: [{ menu: string, option: string, subOption?: string }],
    //   sampleData: { columns: string[], rows: object[] },
    //   highlightPath: [{ menu: string, option?: string, subOption?: string }] // optional hints
    // }
  }
})

const emit = defineEmits(['correct', 'incorrect'])

// State
const activeMenu = ref(null)
const activeSubmenu = ref(null)
const submenuPosition = ref({})
const selections = ref([])
const showHint = ref(false)
const feedback = ref(null)

// Menu definitions for jamovi
const menuItems = [
  { id: 'file', label: 'File' },
  { id: 'edit', label: 'Edit' },
  { id: 'data', label: 'Data' },
  { id: 'analyses', label: 'Analyses' }
]

const menuOptions = {
  file: [
    { id: 'new', label: 'New' },
    { id: 'open', label: 'Open...' },
    { id: 'save', label: 'Save' },
    { id: 'export', label: 'Export' }
  ],
  edit: [
    { id: 'undo', label: 'Undo' },
    { id: 'redo', label: 'Redo' },
    { id: 'cut', label: 'Cut' },
    { id: 'copy', label: 'Copy' },
    { id: 'paste', label: 'Paste' }
  ],
  data: [
    { id: 'setup', label: 'Setup...' },
    { id: 'compute', label: 'Compute Variable' },
    { id: 'transform', label: 'Transform' },
    { id: 'filters', label: 'Filters' }
  ],
  analyses: [
    {
      id: 'exploration',
      label: 'Exploration',
      submenu: [
        { id: 'descriptives', label: 'Descriptives' },
        { id: 'histograms', label: 'Histograms' },
        { id: 'scatterplot', label: 'Scatterplot' }
      ]
    },
    {
      id: 'ttests',
      label: 'T-Tests',
      submenu: [
        { id: 'independent', label: 'Independent Samples T-Test' },
        { id: 'paired', label: 'Paired Samples T-Test' },
        { id: 'onesample', label: 'One Sample T-Test' }
      ]
    },
    {
      id: 'anova',
      label: 'ANOVA',
      submenu: [
        { id: 'oneway', label: 'One-Way ANOVA' },
        { id: 'factorial', label: 'Factorial ANOVA' },
        { id: 'repeated', label: 'Repeated Measures ANOVA' }
      ]
    },
    {
      id: 'regression',
      label: 'Regression',
      submenu: [
        { id: 'correlation', label: 'Correlation Matrix' },
        { id: 'linear', label: 'Linear Regression' }
      ]
    },
    {
      id: 'frequencies',
      label: 'Frequencies',
      submenu: [
        { id: 'onesample_prop', label: 'One Sample Proportion Tests' },
        { id: 'contingency', label: 'Contingency Tables' },
        { id: 'loglinear', label: 'Log-Linear Regression' }
      ]
    }
  ]
}

// Computed
const hasSelection = computed(() => selections.value.length > 0)

const previewColumns = computed(() => {
  return props.task.sampleData?.columns || ['Variable1', 'Variable2', 'Variable3']
})

const previewRows = computed(() => {
  if (props.task.sampleData?.rows) {
    return props.task.sampleData.rows.slice(0, 5)
  }
  return [
    { id: 1, Variable1: 23, Variable2: 45, Variable3: 'A' },
    { id: 2, Variable1: 31, Variable2: 52, Variable3: 'B' },
    { id: 3, Variable1: 27, Variable2: 48, Variable3: 'A' },
    { id: 4, Variable1: 35, Variable2: 61, Variable3: 'B' },
    { id: 5, Variable1: 29, Variable2: 55, Variable3: 'A' }
  ]
})

// Methods
function getMenuOptions(menuId) {
  return menuOptions[menuId] || []
}

function openMenu(menuId) {
  if (activeMenu.value === menuId) {
    closeMenus()
  } else {
    activeMenu.value = menuId
    activeSubmenu.value = null
  }
}

function closeMenus() {
  activeMenu.value = null
  activeSubmenu.value = null
}

function selectOption(menuId, item) {
  if (item.submenu) {
    activeSubmenu.value = {
      parentMenu: menuId,
      parentOption: item.id,
      items: item.submenu
    }
    submenuPosition.value = { left: '200px', top: '0' }
  } else {
    addSelection({ menu: menuId, option: item.id })
    closeMenus()
  }
}

function selectSubOption(item) {
  addSelection({
    menu: activeSubmenu.value.parentMenu,
    option: activeSubmenu.value.parentOption,
    subOption: item.id
  })
  closeMenus()
}

function addSelection(selection) {
  // Check if this exact selection already exists
  const exists = selections.value.some(
    s => s.menu === selection.menu &&
         s.option === selection.option &&
         s.subOption === selection.subOption
  )

  if (!exists) {
    selections.value.push(selection)
  }
}

function isSelected(menuId, optionId, parentOption = null) {
  return selections.value.some(s => {
    if (parentOption) {
      return s.menu === menuId && s.option === parentOption && s.subOption === optionId
    }
    return s.menu === menuId && s.option === optionId
  })
}

function isMenuHighlighted(menuId) {
  if (!showHint.value || !props.task.highlightPath) return false
  return props.task.highlightPath.some(h => h.menu === menuId)
}

function isOptionHighlighted(menuId, optionId) {
  if (!showHint.value || !props.task.highlightPath) return false
  return props.task.highlightPath.some(h => h.menu === menuId && h.option === optionId)
}

function isSubOptionHighlighted(subOptionId) {
  if (!showHint.value || !props.task.highlightPath) return false
  return props.task.highlightPath.some(h => h.subOption === subOptionId)
}

function formatSelection(sel) {
  const menuLabel = menuItems.find(m => m.id === sel.menu)?.label || sel.menu
  const options = menuOptions[sel.menu] || []
  const optionItem = options.find(o => o.id === sel.option)
  const optionLabel = optionItem?.label || sel.option

  if (sel.subOption && optionItem?.submenu) {
    const subLabel = optionItem.submenu.find(s => s.id === sel.subOption)?.label || sel.subOption
    return `${menuLabel} → ${optionLabel} → ${subLabel}`
  }
  return `${menuLabel} → ${optionLabel}`
}

function checkAnswer() {
  const expected = props.task.expectedSelections || []

  // Check if all expected selections are present
  const allCorrect = expected.every(exp => {
    return selections.value.some(sel =>
      sel.menu === exp.menu &&
      sel.option === exp.option &&
      (exp.subOption ? sel.subOption === exp.subOption : true)
    )
  })

  // Check if there are no extra selections
  const noExtras = selections.value.length === expected.length

  if (allCorrect && noExtras) {
    feedback.value = {
      type: 'correct',
      message: props.task.successMessage || 'You selected the correct analysis path!'
    }
    emit('correct')
  } else {
    feedback.value = {
      type: 'incorrect',
      message: props.task.failureMessage || 'Try again. Think about what type of analysis this scenario requires.'
    }
    emit('incorrect')
  }
}

function resetSimulator() {
  selections.value = []
  feedback.value = null
  showHint.value = false
  closeMenus()
}

// Expose reset for parent components
defineExpose({ reset: resetSimulator })
</script>

<style scoped>
.jamovi-interface {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f5f5;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.menu-bar {
  display: flex;
  background: #7c3aed;
  padding: 0;
}

.menu-item {
  padding: 0.625rem 1rem;
  color: white;
  cursor: pointer;
  transition: background 0.15s;
  font-size: 0.875rem;
}

.menu-item:hover,
.menu-item.active {
  background: rgba(255, 255, 255, 0.15);
}

.menu-item.highlighted {
  background: #fbbf24;
  color: #1f2937;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 5;
}

.dropdown-menu {
  position: absolute;
  top: 38px;
  left: 0;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 10;
}

.dropdown-item {
  padding: 0.625rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  transition: background 0.1s;
}

.dropdown-item:hover {
  background: #f3f4f6;
}

.dropdown-item.selected {
  background: #ede9fe;
  color: #7c3aed;
}

.dropdown-item.highlighted {
  background: #fef3c7;
}

.submenu-arrow {
  font-size: 0.625rem;
  color: #9ca3af;
}

.submenu {
  position: absolute;
  top: 38px;
  left: 200px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 220px;
  z-index: 11;
}

.spreadsheet-preview {
  margin-top: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  overflow: hidden;
}

.spreadsheet-header {
  display: flex;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
}

.spreadsheet-row {
  display: flex;
  border-bottom: 1px solid #f3f4f6;
}

.spreadsheet-row:last-child {
  border-bottom: none;
}

.cell {
  flex: 1;
  padding: 0.5rem 0.75rem;
  font-size: 0.8125rem;
  border-right: 1px solid #f3f4f6;
  min-width: 80px;
}

.cell:last-child {
  border-right: none;
}

.header-cell {
  font-weight: 600;
  color: #374151;
  background: #f3f4f6;
}

.selection-summary {
  margin-top: 1rem;
  padding: 1rem;
  background: #ede9fe;
  border-radius: 0.5rem;
  font-size: 0.875rem;
}

.selection-summary ul {
  margin: 0.5rem 0 0 1.25rem;
  padding: 0;
}

.selection-summary li {
  margin: 0.25rem 0;
  color: #5b21b6;
}
</style>
