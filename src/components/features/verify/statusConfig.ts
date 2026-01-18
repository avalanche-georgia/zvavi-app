import type { IconName } from '@components/icons'
import type { MemberStatus } from '@domain/types'

type StatusConfig = {
  badge: { bg: string; text: string }
  header: { bg: string; iconBg: string }
  icon: IconName
}

export const statusConfig: Record<MemberStatus, StatusConfig> = {
  active: {
    badge: { bg: 'bg-green-100', text: 'text-green-800' },
    header: { bg: 'bg-green-500', iconBg: 'bg-green-400' },
    icon: 'check',
  },
  expired: {
    badge: { bg: 'bg-red-100', text: 'text-red-800' },
    header: { bg: 'bg-red-500', iconBg: 'bg-red-400' },
    icon: 'xMark',
  },
  inactive: {
    badge: { bg: 'bg-gray-100', text: 'text-gray-800' },
    header: { bg: 'bg-gray-500', iconBg: 'bg-gray-400' },
    icon: 'xMark',
  },
  suspended: {
    badge: { bg: 'bg-amber-100', text: 'text-amber-800' },
    header: { bg: 'bg-amber-500', iconBg: 'bg-amber-400' },
    icon: 'info',
  },
}
