import { pb } from '../lib/pocketbase'

/**
 * Append-only research log. Never updates or deletes existing rows.
 */
export async function logLearningEvent(payload) {
  const userId = pb.authStore.record?.id
  if (!userId) return null
  try {
    return await pb.collection('learning_events').create({
      user: userId,
      ...payload
    })
  } catch (err) {
    console.warn('[learning_events] create failed:', err.message)
    return null
  }
}
