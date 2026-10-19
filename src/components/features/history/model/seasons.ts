import { formatSeasonLabel, getSeasonStartYear, isSeasonMonth } from '@domain/season'

import { parseMonthId, toMonthId } from './days'
import type { ArchiveForecast, ArchiveSeason } from './types'

const getForecastSeason = (forecast: ArchiveForecast) => {
  const { month, year } = parseMonthId(forecast.monthId)

  return getSeasonStartYear(year, month)
}

// The days a season's forecasts span: the first start to the last end
export const getSeasonBounds = ({ forecasts }: ArchiveSeason) => ({
  firstDay: forecasts.map(({ startDay }) => startDay).sort()[0],
  lastDay: forecasts
    .map(({ endDay }) => endDay)
    .sort()
    .at(-1)!,
})

// Newest season first. The running season is listed even before its first
// forecast (so "no forecasts yet" can show), but only once it has started.
export const groupBySeason = (forecasts: ArchiveForecast[], today: string): ArchiveSeason[] => {
  const bySeason = new Map<number, ArchiveForecast[]>()

  for (const forecast of forecasts) {
    const startYear = getForecastSeason(forecast)

    bySeason.set(startYear, [...(bySeason.get(startYear) ?? []), forecast])
  }

  const { month, year } = parseMonthId(toMonthId(today))
  const currentSeason = getSeasonStartYear(year, month)

  if (isSeasonMonth(month) && !bySeason.has(currentSeason)) bySeason.set(currentSeason, [])

  return [...bySeason.entries()]
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([startYear, seasonForecasts]) => ({
      forecasts: seasonForecasts,
      label: formatSeasonLabel(startYear),
      startYear,
    }))
}
