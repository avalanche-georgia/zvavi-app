import { eachDay, getMonthRange } from './days'
import type { ArchiveDateRange, ArchiveFilters, ArchiveForecast } from './types'

export const emptyFilters: ArchiveFilters = { from: null, levels: [], problem: null, to: null }

export const emptyDateRange: ArchiveDateRange = { from: null, to: null }

export const hasActiveFilters = ({ from, levels, problem, to }: ArchiveFilters) =>
  levels.length > 0 || problem !== null || from !== null || to !== null

// AND across filters. A forecast matches the dates when its range overlaps them.
export const matchesFilters = (
  forecast: ArchiveForecast,
  { from, levels, problem, to }: ArchiveFilters,
) =>
  (levels.length === 0 || levels.includes(forecast.hazardLevels.overall)) &&
  (!problem || forecast.avalancheProblems.some(({ type }) => type === problem)) &&
  (!from || forecast.endDay >= from) &&
  (!to || forecast.startDay <= to)

export const isWholeMonth = (from: string | null, to: string | null, monthId: string) => {
  const range = getMonthRange(monthId)

  return from === range.from && to === range.to
}

// One tap picks the whole month, a second one clears it
export const toggleMonthRange = (
  from: string | null,
  to: string | null,
  monthId: string,
): ArchiveDateRange => (isWholeMonth(from, to, monthId) ? emptyDateRange : getMonthRange(monthId))

// Day → the forecast covering it. Where ranges overlap, the later-published one wins.
export const buildDayMap = (forecasts: ArchiveForecast[]) => {
  const dayMap = new Map<string, ArchiveForecast>()
  const oldestFirst = [...forecasts].sort((forecastA, forecastB) =>
    forecastA.publishedAt.localeCompare(forecastB.publishedAt),
  )

  for (const forecast of oldestFirst) {
    for (const day of eachDay(forecast.startDay, forecast.endDay)) dayMap.set(day, forecast)
  }

  return dayMap
}
