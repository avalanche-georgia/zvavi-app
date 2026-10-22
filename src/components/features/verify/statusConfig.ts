import type { IconName } from '@components/icons'
import type { MemberStatus } from '@domain/types'

type StatusConfig = {
  badge: { bg: string; text: string }
  header: { bg: string }
  icon: IconName
}

export const statusConfig: Record<MemberStatus, StatusConfig> = {
  active: {
    badge: { bg: 'bg-success-soft', text: 'text-success' },
    header: { bg: 'bg-success' },
    icon: 'check',
  },
  expired: {
    // danger/10 until a danger-soft token exists (dark-theme-blockers D10), as in ConfirmDialog
    badge: { bg: 'bg-danger/10', text: 'text-danger' },
    header: { bg: 'bg-danger' },
    icon: 'xMark',
  },
  inactive: {
    badge: { bg: 'bg-tile', text: 'text-ink' },
    header: { bg: 'bg-muted' },
    icon: 'xMark',
  },
  pending: {
    badge: { bg: 'bg-accent-soft', text: 'text-accent' },
    header: { bg: 'bg-accent' },
    icon: 'info',
  },
  suspended: {
    badge: { bg: 'bg-warning-soft', text: 'text-warning' },
    header: { bg: 'bg-warning' },
    icon: 'info',
  },
}
