import { IconButton, Tooltip } from '@components/ui'
import type { AvalancheStatus } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

type StatusToggleProps = {
  isPending: boolean
  onToggle: VoidFunction
  status: AvalancheStatus
}

const statusStyles: Record<AvalancheStatus, string> = {
  archived: 'bg-gray-100 text-gray-800',
  draft: 'bg-amber-100 text-amber-800',
  published: 'bg-green-100 text-green-800',
}

const StatusToggle = ({ isPending, onToggle, status }: StatusToggleProps) => {
  const t = useTranslations()

  return (
    <div className="flex items-center gap-2">
      <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium', statusStyles[status])}>
        {t(`common.avalancheStatuses.${status}`)}
      </span>

      {status !== 'archived' && (
        <Tooltip
          content={t(
            status === 'published'
              ? 'admin.recentAvalanches.actions.unpublish'
              : 'admin.recentAvalanches.actions.publish',
          )}
        >
          <IconButton
            disabled={isPending}
            iconProps={{ icon: status === 'published' ? 'eyeOff' : 'eye' }}
            onClick={onToggle}
          />
        </Tooltip>
      )}
    </div>
  )
}

export default StatusToggle
