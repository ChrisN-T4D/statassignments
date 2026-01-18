<template>
  <BaseSimulator
    software="spss"
    :task="task"
    :can-check="hasSelection"
    :show-hint="showHint"
    :show-reset="hasSelection"
    :feedback="feedback"
    @check-answer="checkAnswer"
    @reset="resetSimulator"
    @show-hint="showHint = true"
  >
    <div class="spss-interface">
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
      <div v-if="activeMenu" class="dropdown-menu" :style="menuPosition">
        <div
          v-for="item in getMenuOptions(activeMenu)"
          :key="item.id"
          class="dropdown-item"
          :class="{
            selected: isSelected(activeMenu, item.id),
            highlighted: isOptionHighlighted(activeMenu, item.id),
            'has-submenu': item.submenu,
            disabled: item.disabled
          }"
          @click="!item.disabled && selectOption(activeMenu, item)"
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

      <!-- Click overlay -->
      <div v-if="activeMenu" class="menu-overlay" @click="closeMenus"></div>

      <!-- Data View -->
      <div class="data-view">
        <div class="view-tabs">
          <button class="view-tab active">Data View</button>
          <button class="view-tab">Variable View</button>
        </div>
        <div class="spreadsheet">
          <div class="spreadsheet-header">
            <div class="cell row-number-header"></div>
            <div class="cell header-cell" v-for="col in previewColumns" :key="col">
              {{ col }}
            </div>
          </div>
          <div class="spreadsheet-row" v-for="(row, idx) in previewRows" :key="idx">
            <div class="cell row-number">{{ idx + 1 }}</div>
            <div class="cell" v-for="col in previewColumns" :key="col">
              {{ row[col] }}
            </div>
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
  }
})

const emit = defineEmits(['correct', 'incorrect'])

// State
const activeMenu = ref(null)
const activeSubmenu = ref(null)
const menuPosition = ref({})
const submenuPosition = ref({})
const selections = ref([])
const showHint = ref(false)
const feedback = ref(null)

// SPSS Menu structure
const menuItems = [
  { id: 'file', label: 'File' },
  { id: 'edit', label: 'Edit' },
  { id: 'view', label: 'View' },
  { id: 'data', label: 'Data' },
  { id: 'transform', label: 'Transform' },
  { id: 'analyze', label: 'Analyze' },
  { id: 'graphs', label: 'Graphs' }
]

const menuOptions = {
  file: [
    { id: 'new', label: 'New' },
    { id: 'open', label: 'Open Data...' },
    { id: 'save', label: 'Save' },
    { id: 'export', label: 'Export', disabled: true }
  ],
  edit: [
    { id: 'undo', label: 'Undo' },
    { id: 'cut', label: 'Cut' },
    { id: 'copy', label: 'Copy' },
    { id: 'paste', label: 'Paste' }
  ],
  view: [
    { id: 'status', label: 'Status Bar' },
    { id: 'toolbars', label: 'Toolbars' }
  ],
  data: [
    { id: 'define', label: 'Define Variable Properties...' },
    { id: 'sort', label: 'Sort Cases...' },
    { id: 'merge', label: 'Merge Files' },
    { id: 'select', label: 'Select Cases...' }
  ],
  transform: [
    { id: 'compute', label: 'Compute Variable...' },
    { id: 'recode', label: 'Recode into Different Variables...' },
    { id: 'count', label: 'Count Values within Cases...' }
  ],
  analyze: [
    {
      id: 'descriptive',
      label: 'Descriptive Statistics',
      submenu: [
        { id: 'frequencies', label: 'Frequencies...' },
        { id: 'descriptives', label: 'Descriptives...' },
        { id: 'explore', label: 'Explore...' },
        { id: 'crosstabs', label: 'Crosstabs...' }
      ]
    },
    {
      id: 'compare',
      label: 'Compare Means',
      submenu: [
        { id: 'means', label: 'Means...' },
        { id: 'onesample_t', label: 'One-Sample T Test...' },
        { id: 'independent_t', label: 'Independent-Samples T Test...' },
        { id: 'paired_t', label: 'Paired-Samples T Test...' },
        { id: 'oneway', label: 'One-Way ANOVA...' }
      ]
    },
    {
      id: 'correlate',
      label: 'Correlate',
      submenu: [
        { id: 'bivariate', label: 'Bivariate...' },
        { id: 'partial', label: 'Partial...' }
      ]
    },
    {
      id: 'regression',
      label: 'Regression',
      submenu: [
        { id: 'linear', label: 'Linear...' },
        { id: 'logistic', label: 'Binary Logistic...' }
      ]
    },
    {
      id: 'nonparametric',
      label: 'Nonparametric Tests',
      submenu: [
        { id: 'onesample_np', label: 'One Sample...' },
        { id: 'independent_np', label: 'Independent Samples...' },
        { id: 'related_np', label: 'Related Samples...' }
      ]
    }
  ],
  graphs: [
    { id: 'chartbuilder', label: 'Chart Builder...' },
    { id: 'histogram', label: 'Legacy Dialogs', submenu: [
      { id: 'bar', label: 'Bar...' },
      { id: 'hist', label: 'Histogram...' },
      { id: 'scatter', label: 'Scatter/Dot...' },
      { id: 'boxplot', label: 'Boxplot...' }
    ]}
  ]
}

// Computed
const hasSelection = computed(() => selections.value.length > 0)

const previewColumns = computed(() => {
  return props.task.sampleData?.columns || ['Age', 'Score', 'Group']
})

const previewRows = computed(() => {
  if (props.task.sampleData?.rows) {
    return props.task.sampleData.rows.slice(0, 6)
  }
  return [
    { Age: 25, Score: 78, Group: 1 },
    { Age: 32, Score: 85, Group: 1 },
    { Age: 28, Score: 72, Group: 2 },
    { Age: 35, Score: 91, Group: 2 },
    { Age: 29, Score: 80, Group: 1 },
    { Age: 31, Score: 88, Group: 2 }
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
    // Position menu under the clicked item
    const menuIndex = menuItems.findIndex(m => m.id === menuId)
    menuPosition.value = { left: `${menuIndex * 60}px` }
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
    submenuPosition.value = { left: '180px', top: '0' }
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

  const allCorrect = expected.every(exp => {
    return selections.value.some(sel =>
      sel.menu === exp.menu &&
      sel.option === exp.option &&
      (exp.subOption ? sel.subOption === exp.subOption : true)
    )
  })

  const noExtras = selections.value.length === expected.length

  if (allCorrect && noExtras) {
    feedback.value = {
      type: 'correct',
      message: props.task.successMessage || 'Correct! You found the right menu path in SPSS.'
    }
    emit('correct')
  } else {
    feedback.value = {
      type: 'incorrect',
      message: props.task.failureMessage || 'Not quite. Think about which statistical test matches this scenario.'
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

defineExpose({ reset: resetSimulator })
</script>

<style scoped>
.spss-interface {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  background: #f0f0f0;
  border-radius: 0.5rem;
  overflow: hidden;
  position: relative;
}

.menu-bar {
  display: flex;
  background: #f5f5f5;
  border-bottom: 1px solid #d0d0d0;
  padding: 0;
}

.menu-item {
  padding: 0.5rem 0.875rem;
  color: #333;
  cursor: pointer;
  font-size: 0.8125rem;
  transition: background 0.1s;
}

.menu-item:hover,
.menu-item.active {
  background: #e0e0e0;
}

.menu-item.highlighted {
  background: #fbbf24;
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
  top: 32px;
  background: white;
  border: 1px solid #c0c0c0;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 180px;
  z-index: 10;
}

.dropdown-item {
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8125rem;
}

.dropdown-item:hover:not(.disabled) {
  background: #0078d7;
  color: white;
}

.dropdown-item.disabled {
  color: #999;
  cursor: not-allowed;
}

.dropdown-item.selected {
  background: #cce5ff;
}

.dropdown-item.highlighted {
  background: #fef3c7;
}

.submenu-arrow {
  font-size: 0.5rem;
  color: #666;
}

.dropdown-item:hover .submenu-arrow {
  color: white;
}

.submenu {
  position: absolute;
  top: 32px;
  left: 180px;
  background: white;
  border: 1px solid #c0c0c0;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 11;
}

.data-view {
  margin-top: 0.5rem;
}

.view-tabs {
  display: flex;
  background: #e8e8e8;
  padding: 0 0.5rem;
  border-bottom: 1px solid #d0d0d0;
}

.view-tab {
  padding: 0.375rem 1rem;
  border: none;
  background: transparent;
  font-size: 0.75rem;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
}

.view-tab.active {
  background: white;
  border-bottom-color: #0078d7;
}

.spreadsheet {
  background: white;
  font-size: 0.75rem;
}

.spreadsheet-header {
  display: flex;
  background: #f5f5f5;
  border-bottom: 1px solid #d0d0d0;
  font-weight: 600;
}

.spreadsheet-row {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
}

.cell {
  min-width: 80px;
  padding: 0.375rem 0.5rem;
  border-right: 1px solid #e8e8e8;
  text-align: right;
}

.row-number-header {
  min-width: 40px;
  background: #f0f0f0;
}

.row-number {
  min-width: 40px;
  background: #f5f5f5;
  color: #666;
  text-align: center;
}

.header-cell {
  text-align: center;
  background: #f0f0f0;
}

.selection-summary {
  margin: 1rem;
  padding: 0.75rem 1rem;
  background: #e8f4fc;
  border-radius: 0.375rem;
  font-size: 0.875rem;
}

.selection-summary ul {
  margin: 0.5rem 0 0 1.25rem;
  padding: 0;
}

.selection-summary li {
  margin: 0.25rem 0;
  color: #0078d7;
}
</style>
