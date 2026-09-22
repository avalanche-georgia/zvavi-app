import type { AvalancheStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type StatusBadgeProps = {
  status: AvalancheStatus
}

const statusStyles: Record<AvalancheStatus, string> = {
  archived: 'bg-gray-100 text-gray-800',
  draft: 'bg-amber-100 text-amber-800',
  published: 'bg-green-100 text-green-800',
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const t = useTranslations()

  return (
    <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', statusStyles[status])}>
      {t(`common.avalancheStatuses.${status}`)}
    </span>
  )
}

export default StatusBadge
