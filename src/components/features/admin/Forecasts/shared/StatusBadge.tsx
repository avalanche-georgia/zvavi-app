import { StatusPill, type StatusPillTone } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { ForecastListStatus } from './listStatus'

const statusTones: Record<ForecastListStatus, StatusPillTone> = {
  current: 'success',
  draft: 'warning',
  published: 'neutral',
}

type StatusBadgeProps = {
  // A current forecast whose validity has run out (the public site still shows it)
  isExpired?: boolean
  status: ForecastListStatus
}

const StatusBadge = ({ isExpired = false, status }: StatusBadgeProps) => {
  const t = useTranslations()
  const isCurrent = status === 'current'

  if (isCurrent && isExpired) {
    return <StatusPill>{t('admin.forecasts.view.statuses.expired')}</StatusPill>
  }

  return (
    <StatusPill tone={statusTones[status]} withDot={isCurrent}>
      {t(`admin.forecasts.statuses.${status}`)}
    </StatusPill>
  )
}

export default StatusBadge
