import { toTbilisiParts } from '@components/features/forecast/model/useForecastDates'
import type { HistoryListItem } from '@data/hooks/forecasts'
import { eachDayOfInterval, format, getDaysInMonth, parseISO } from 'date-fns'

import type { ArchiveForecast } from './types'

const pad = (value: number) => String(value).padStart(2, '0')

// yyyy-MM-dd of a moment in Georgia — the day forecasters and readers mean,
// whatever the browser's time zone
export const toTbilisiDay = (value: Date | string) => {
  const { day, month, year } = toTbilisiParts(value)

  return `${year}-${pad(month + 1)}-${pad(day)}`
}

export const toMonthId = (day: string) => day.slice(0, 7)

// Month is 0-based (Date convention)
export const parseMonthId = (monthId: string) => ({
  month: Number(monthId.slice(5, 7)) - 1,
  year: Number(monthId.slice(0, 4)),
})

export const getMonthLength = (monthId: string) => {
  const { month, year } = parseMonthId(monthId)

  return getDaysInMonth(new Date(year, month))
}

// The whole month as a day range
export const getMonthRange = (monthId: string) => ({
  from: `${monthId}-01`,
  to: `${monthId}-${pad(getMonthLength(monthId))}`,
})

export const eachDay = (from: string, to: string) =>
  eachDayOfInterval({ end: parseISO(to), start: parseISO(from) }).map((date) =>
    format(date, 'yyyy-MM-dd'),
  )

// Unpublished rows (no publishedAt) can't be placed in time, so they're dropped
export const toArchiveForecast = (forecast: HistoryListItem): ArchiveForecast | null => {
  if (!forecast.publishedAt) return null

  const startDay = toTbilisiDay(forecast.publishedAt)

  return {
    ...forecast,
    endDay: toTbilisiDay(forecast.validUntil),
    monthId: toMonthId(startDay),
    publishedAt: forecast.publishedAt,
    startDay,
  }
}
