import { topicsMeta } from './topicsMeta.js'

/** @type {typeof topicsMeta} */
export const topics = topicsMeta

export const software = [
  { id: 'spss', name: 'SPSS', color: '#cc0000' },
  { id: 'r', name: 'R', color: '#276dc3' },
  { id: 'excel', name: 'Excel', color: '#217346' },
  { id: 'stata', name: 'Stata', color: '#1a476f' },
  { id: 'jamovi', name: 'jamovi', color: '#8b5cf6' }
]

export function getTopicById(topicId) {
  return topics.find(t => t.id === topicId)
}

export function getTopicsByModule(moduleId) {
  return topics.filter(t => t.moduleId === moduleId)
}

export function getAllTopics() {
  return topics
}
