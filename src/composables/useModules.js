import { ref } from 'vue'
import { pb } from '../lib/pocketbase'

const modules = ref([])
const items = ref([])
const loading = ref(false)

export function useModules() {
  async function fetchModules(classId = null, softwareType = null, semesterId = null) {
    loading.value = true
    try {
      let filter = ''
      const filters = []

      if (classId) {
        filters.push(`class = "${classId}"`)
      }
      if (softwareType) {
        filters.push(`(software_type = "${softwareType}" || software_type = "all")`)
      }
      if (semesterId) {
        filters.push(`(semester = "${semesterId}" || semester = "")`)
      }

      if (filters.length > 0) {
        filter = filters.join(' && ')
      }

      const records = await pb.collection('modules').getFullList({
        filter,
        sort: 'order,title',
        expand: 'class'
      })

      modules.value = records
    } catch (err) {
      console.error('Error fetching modules:', err)
    } finally {
      loading.value = false
    }
    return modules.value
  }

  async function fetchItems(moduleId) {
    loading.value = true
    try {
      const records = await pb.collection('items').getFullList({
        filter: `module = "${moduleId}"`,
        sort: 'order,created'
      })

      // Parse options JSON if stored as string
      items.value = records.map(item => ({
        ...item,
        options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options,
        tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags
      }))
    } catch (err) {
      console.error('Error fetching items:', err)
    } finally {
      loading.value = false
    }
    return items.value
  }

  async function fetchItemsByTopic(topicId, softwareType = null) {
    loading.value = true
    try {
      // First get modules for this topic
      let moduleFilter = `topic_id = "${topicId}"`
      if (softwareType) {
        moduleFilter += ` && (software_type = "${softwareType}" || software_type = "all")`
      }

      const moduleRecords = await pb.collection('modules').getFullList({
        filter: moduleFilter
      })

      if (moduleRecords.length === 0) {
        items.value = []
        return []
      }

      // Get items for these modules
      const moduleIds = moduleRecords.map(m => `"${m.id}"`).join(',')
      const records = await pb.collection('items').getFullList({
        filter: `module ?~ ${moduleIds}`,
        sort: 'order,created',
        expand: 'module'
      })

      items.value = records.map(item => ({
        ...item,
        options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options,
        tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags
      }))
    } catch (err) {
      console.error('Error fetching items by topic:', err)
      items.value = []
    } finally {
      loading.value = false
    }
    return items.value
  }

  async function fetchRandomItem(topicId = null, softwareType = null) {
    loading.value = true
    try {
      let filter = ''
      const filters = []

      if (topicId) {
        // Need to filter through module relation
        const moduleRecords = await pb.collection('modules').getFullList({
          filter: `topic_id = "${topicId}"${softwareType ? ` && (software_type = "${softwareType}" || software_type = "all")` : ''}`
        })

        if (moduleRecords.length === 0) {
          return null
        }

        const moduleIds = moduleRecords.map(m => m.id)
        filters.push(`(${moduleIds.map(id => `module = "${id}"`).join(' || ')})`)
      }

      const allItems = await pb.collection('items').getFullList({
        filter: filters.join(' && ') || undefined,
        expand: 'module'
      })

      if (allItems.length === 0) {
        return null
      }

      const randomIndex = Math.floor(Math.random() * allItems.length)
      const item = allItems[randomIndex]

      return {
        ...item,
        options: typeof item.options === 'string' ? JSON.parse(item.options) : item.options,
        tags: typeof item.tags === 'string' ? JSON.parse(item.tags) : item.tags
      }
    } catch (err) {
      console.error('Error fetching random item:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Fetch the next unlocked item for a module (for sequential progression)
  // Requires completedItemIds from useAttempts.getModuleProgress()
  async function fetchNextItem(moduleId, completedItemIds = new Set()) {
    loading.value = true
    try {
      const moduleItems = await fetchItems(moduleId)

      // Find the first item that hasn't been completed correctly
      for (const item of moduleItems) {
        if (!completedItemIds.has(item.id)) {
          return item
        }
      }

      // All items completed, return null
      return null
    } catch (err) {
      console.error('Error fetching next item:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // Get items with unlock status for display
  // Useful for showing a list of items with locked/unlocked states
  function getItemsWithUnlockStatus(itemsList, completedItemIds = new Set()) {
    return itemsList.map((item, index) => {
      const isCompleted = completedItemIds.has(item.id)
      // Item is unlocked if: it's the first item, it's completed, or the previous item is completed
      const isUnlocked = index === 0 || isCompleted || completedItemIds.has(itemsList[index - 1]?.id)

      return {
        ...item,
        isCompleted,
        isUnlocked,
        isCurrent: isUnlocked && !isCompleted
      }
    })
  }

  return {
    modules,
    items,
    loading,
    fetchModules,
    fetchItems,
    fetchItemsByTopic,
    fetchRandomItem,
    fetchNextItem,
    getItemsWithUnlockStatus
  }
}
