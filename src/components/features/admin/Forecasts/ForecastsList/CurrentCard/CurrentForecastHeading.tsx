import { hazardLevelNamesByScale } from '@domain/constants'
import type { Forecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import { useListDates } from '../hooks'

import { cn } from '@/lib/utils'

type CurrentForecastHeadingProps = { forecast: Forecast; isExpired: boolean }

const CurrentForecastHeading = ({ forecast, isExpired }: CurrentForecastHeadingProps) => {
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
