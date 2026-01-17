import PocketBase from 'pocketbase'

const pbUrl = import.meta.env.VITE_POCKETBASE_URL || 'http://localhost:8090'

export const pb = new PocketBase(pbUrl)

// Disable auto-cancellation for better UX
pb.autoCancellation(false)
