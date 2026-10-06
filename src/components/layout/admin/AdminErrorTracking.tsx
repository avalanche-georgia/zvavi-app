'use client'

import { initAdminErrorTracking } from '@/lib/posthog/adminErrors'

// Runs when the admin bundle loads (before the layout renders), so early admin errors are caught.
// No-op when the PostHog token is unset.
initAdminErrorTracking()

const AdminErrorTracking = () => null

export default AdminErrorTracking
