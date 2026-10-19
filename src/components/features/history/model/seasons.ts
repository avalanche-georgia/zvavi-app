import { formatSeasonLabel, getSeasonStartYear, isSeasonMonth } from '@domain/season'

import { parseMonthId, toMonthId } from './days'
import type { ArchiveForecast, ArchiveSeason } from './types'

const getMonthSeason = (monthId: string) => {
  const { month, year } = parseMonthId(monthId)

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
    const startYear = getMonthSeason(forecast.monthId)

    bySeason.set(startYear, [...(bySeason.get(startYear) ?? []), forecast])
  }

  const todayMonth = toMonthId(today)
  const currentSeason = getMonthSeason(todayMonth)

  if (isSeasonMonth(parseMonthId(todayMonth).month) && !bySeason.has(currentSeason)) {
    bySeason.set(currentSeason, [])
  }

  return [...bySeason.entries()]
    .sort(([yearA], [yearB]) => yearB - yearA)
    .map(([startYear, seasonForecasts]) => ({
      forecasts: seasonForecasts,
      label: formatSeasonLabel(startYear),
      startYear,
    }))
}
