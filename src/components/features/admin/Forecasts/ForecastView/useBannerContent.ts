'use client'

import type { AdminForecast, Forecast } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { ForecastViewStatus } from './model'
import { useListDates, useTimeLeft } from '../shared'

type CurrentForecast = Pick<Forecast, 'createdAt' | 'id'> | null

type BannerContent = {
  className: string
  hasClock?: boolean
  lead: string
  rest: string
}

const key = 'admin.forecasts.view.banner'

const useBannerContent = (
  forecast: AdminForecast,
  status: ForecastViewStatus,
  currentForecast: CurrentForecast,
  now: Date,
): BannerContent => {
  const t = useTranslations()
  const { formatDate, formatTime } = useListDates()
  const { formatAgo, formatLeft } = useTimeLeft()
  const { createdAt, regionId, validUntil } = forecast
  const region = t(`regions.names.${regionId}`)
  const ends = validUntil ? { date: formatDate(validUntil), time: formatTime(validUntil) } : null

  if (status === 'live') {
    return {
      className: 'bg-success-soft text-success',
      lead: t(`${key}.live.lead`, { region }),
      rest: t(`${key}.live.rest`, { timeLeft: validUntil ? formatLeft(validUntil, now) : '' }),
    }
  }

  if (status === 'expired') {
    return {
      className: 'bg-danger/8 text-danger ring-danger-border ring-1 ring-inset',
      hasClock: true,
      lead: validUntil
        ? t(`${key}.expired.lead`, { ago: formatAgo(validUntil, now), region })
        : t(`${key}.expired.leadNoDate`, { region }),
      rest: ends ? t(`${key}.expired.rest`, ends) : t(`${key}.expired.restNoDate`),
    }
  }

  if (status === 'superseded') {
    return {
      className: 'bg-tile text-body',
      lead: t(`${key}.superseded.lead`),
      rest: t(`${key}.superseded.rest`, { id: currentForecast?.id ?? '', region }),
    }
  }

  const isOlderThanCurrent =
    !!currentForecast && new Date(currentForecast.createdAt) > new Date(createdAt)

  const getDraftRest = () => {
    if (isOlderThanCurrent) return t(`${key}.draft.restOlder`, { id: currentForecast.id })
    if (!ends || new Date(validUntil) <= now) return t(`${key}.draft.restNoValidity`)

    return t(`${key}.draft.rest`, { region, ...ends })
  }

  return {
    className: 'bg-warning-soft text-warning',
    lead: t(`${key}.draft.lead`),
    rest: getDraftRest(),
  }
}

export default useBannerContent
