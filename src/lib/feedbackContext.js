/**
 * Build auto-captured context for feedback / issue reports.
 */
export function buildFeedbackContext(route) {
  const classId = route?.params?.classId || null
  const moduleId =
    route?.query?.module ||
    route?.params?.topicId ||
    route?.params?.moduleId ||
    null

  return {
    page_url: typeof window !== 'undefined' ? window.location.href : '',
    route_path: route?.fullPath || route?.path || '',
    class_id: classId,
    module_id: moduleId,
    context: {
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
    }
  }
}
