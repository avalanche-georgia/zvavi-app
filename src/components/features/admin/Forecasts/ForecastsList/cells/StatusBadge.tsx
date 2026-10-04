import { useTranslations } from 'next-intl'

import type { ForecastListStatus } from '../model'

import { cn } from '@/lib/utils'

const statusClasses: Record<ForecastListStatus, string> = {
  current: 'bg-success-soft text-success',
  draft: 'bg-warning-soft text-warning',
  published: 'bg-tile text-muted',
}

const StatusBadge = ({ status }: { status: ForecastListStatus }) => {
  const t = useTranslations()

  return (
    <span
      className={cn(
        'text-caption inline-flex items-center gap-1.5 rounded-md px-2 py-0.75 font-semibold whitespace-nowrap',
        statusClasses[status],
      )}
    >
      {status === 'current' && (
        <span aria-hidden className="bg-success ring-success/20 size-1.5 rounded-full ring-3" />
      )}
      {t(`admin.forecasts.statuses.${status}`)}
    </span>
  )
}

export default StatusBadge
