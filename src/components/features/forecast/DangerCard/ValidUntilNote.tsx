'use client'

import { useIsClient } from '@components/hooks'
import { useTranslations } from 'next-intl'

import useForecastDates from '../model/useForecastDates'
import { getValidity } from '../model/validity'

type ValidUntilNoteProps = {
  isCurrentForecast: boolean
  validUntil: string
}

// "00:00 · 36h left" on the current forecast, "expired" once the window passed
const ValidUntilNote = ({ isCurrentForecast, validUntil }: ValidUntilNoteProps) => {
  const t = useTranslations()
  const { formatTime } = useForecastDates()
  // The time left depends on "now" — only known for sure in the browser
  const isClient = useIsClient()
  const time = formatTime(validUntil)

  if (!isClient) return time

  const validity = getValidity(validUntil, new Date(), isCurrentForecast)

  if (validity.kind === 'expired') return t('forecast.page.expired')
  if (validity.kind === 'none') return time

  const left = t(validity.unit === 'hours' ? 'forecast.page.hoursLeft' : 'forecast.page.daysLeft', {
    count: validity.count,
  })

  return `${time} · ${left}`
}

export default ValidUntilNote
