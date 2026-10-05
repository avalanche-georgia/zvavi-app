import { hazardLevelNamesByScale } from '@domain/constants'
import type { Forecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import { useListDates } from '../../shared'

import { cn } from '@/lib/utils'

type CurrentForecastHeadingProps = {
  // Hours left when under a day — the next forecast is due soon
  endsInHours: number | null
  forecast: Forecast
  isExpired: boolean
}

const CurrentForecastHeading = ({
  endsInHours,
  forecast,
  isExpired,
}: CurrentForecastHeadingProps) => {
  const t = useTranslations()
  const { formatDate, formatTime } = useListDates()
  const { forecaster, hazardLevels, id, publishedAt, validUntil } = forecast

  const formatMoment = (value: string | null) =>
    value ? `${formatDate(value)}, ${formatTime(value)}` : '—'

  return (
    <div className="min-w-0">
      <p
        className={cn(
          'text-caption flex items-center gap-1.5 font-semibold tracking-wide uppercase',
          isExpired ? 'text-warning' : 'text-success',
        )}
      >
        <span
          aria-hidden
          className={cn('size-1.5 rounded-full', isExpired ? 'bg-warning' : 'bg-success')}
        />
        {t(
          isExpired ? 'admin.forecasts.current.eyebrowExpired' : 'admin.forecasts.current.eyebrow',
        )}
        {endsInHours !== null && (
          <span className="bg-primary-soft text-primary-ink ml-1 rounded-md px-1.5 py-0.5 tracking-normal normal-case">
            {t('admin.forecasts.current.endsSoon', { count: endsInHours })}
          </span>
        )}
      </p>
      <h2 className="text-heading text-ink truncate font-semibold">
        {t(hazardLevelNamesByScale[hazardLevels.overall])} · #{id} {forecaster}
      </h2>
      <p className="text-copy-sm text-muted">
        {t('admin.forecasts.current.subline', {
          publishedAt: formatMoment(publishedAt),
          validUntil: formatMoment(validUntil),
        })}
        {isExpired && ` ${t('admin.forecasts.current.expiredHint')}`}
      </p>
    </div>
  )
}

export default CurrentForecastHeading
