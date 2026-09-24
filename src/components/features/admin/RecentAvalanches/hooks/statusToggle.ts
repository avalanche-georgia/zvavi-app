import type { IconName } from '@components/icons'
import type { AvalancheStatus } from '@domain/types'

type StatusToggle = {
  icon: IconName
  labelKey:
    | 'admin.recentAvalanches.actions.approve'
    | 'admin.recentAvalanches.actions.publish'
    | 'admin.recentAvalanches.actions.unpublish'
}

// The one quick status action (list rows and the view). Approve is the same
// "→ published" move as Publish, labeled for moderation. Archived records have
// none — they're restored through the edit form's status field.
const statusToggles: Record<AvalancheStatus, StatusToggle | null> = {
  archived: null,
  draft: { icon: 'eye', labelKey: 'admin.recentAvalanches.actions.publish' },
  pending: { icon: 'check', labelKey: 'admin.recentAvalanches.actions.approve' },
  published: { icon: 'eyeOff', labelKey: 'admin.recentAvalanches.actions.unpublish' },
}

export const getStatusToggle = (status: AvalancheStatus) => statusToggles[status]
