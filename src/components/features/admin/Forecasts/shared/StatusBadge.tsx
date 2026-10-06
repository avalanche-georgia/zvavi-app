import { useTranslations } from 'next-intl'

import type { ForecastListStatus } from './listStatus'

import { cn } from '@/lib/utils'

const statusClasses: Record<ForecastListStatus, string> = {
  current: 'bg-success-soft text-success',
  draft: 'bg-warning-soft text-warning',
  published: 'bg-tile text-muted',
}

type StatusBadgeProps = {
  // A current forecast whose validity has run out (the public site still shows it)
  isExpired?: boolean
  status: ForecastListStatus
}

const StatusBadge = ({ isExpired = false, status }: StatusBadgeProps) => {
  const t = useTranslations()
  const isExpiredCurrent = status === 'current' && isExpired

  return (
    <span
      className={cn(
        'text-caption inline-flex items-center gap-1.5 rounded-md px-2 py-0.75 font-semibold whitespace-nowrap',
        isExpiredCurrent ? 'bg-tile text-muted' : statusClasses[status],
      )}
    >
      {status === 'current' && !isExpired && (
        <span aria-hidden className="bg-success ring-success/20 size-1.5 rounded-full ring-3" />
      )}
      {isExpiredCurrent
        ? t('admin.forecasts.view.statuses.expired')
        : t(`admin.forecasts.statuses.${status}`)}
    </span>
  )
}

export default StatusBadge
