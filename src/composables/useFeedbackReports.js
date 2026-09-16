import { pb } from '../lib/pocketbase'
import { useAuth } from './useAuth'
import { useAccessMode } from './useAccessMode'
import { buildFeedbackContext } from '../lib/feedbackContext'

export const FEEDBACK_CATEGORIES = [
  { value: 'bug', label: 'Bug / something broken' },
  { value: 'content', label: 'Wrong or confusing question/content' },
  { value: 'account', label: 'Account / login / access' },
  { value: 'feedback', label: 'General feedback / suggestion' }
]

export function useFeedbackReports() {
  const { user } = useAuth()
  const { studentKey, ensureLoaded } = useAccessMode()

  async function submitFeedbackReport({ category, subject, message }, route) {
    if (!user.value?.id) {
      throw new Error('Sign in required')
    }

    const trimmedSubject = (subject || '').trim()
    const trimmedMessage = (message || '').trim()
    if (!category || !trimmedSubject || !trimmedMessage) {
      throw new Error('Category, subject, and message are required')
    }
    if (trimmedSubject.length > 120) {
      throw new Error('Subject must be 120 characters or fewer')
    }
    if (trimmedMessage.length > 4000) {
      throw new Error('Message must be 4000 characters or fewer')
    }

    await ensureLoaded()
    const ctx = buildFeedbackContext(route)

    return pb.collection('feedback_reports').create({
      user: user.value.id,
      student_key: studentKey.value || null,
      category,
      subject: trimmedSubject,
      message: trimmedMessage,
      status: 'open',
      ...ctx
    })
  }

  async function fetchAllFeedbackReports() {
    return pb.collection('feedback_reports').getFullList({
      sort: '-created'
    })
  }

  async function updateFeedbackReport(id, payload) {
    return pb.collection('feedback_reports').update(id, payload)
  }

  return {
    FEEDBACK_CATEGORIES,
    submitFeedbackReport,
    fetchAllFeedbackReports,
    updateFeedbackReport
  }
}
