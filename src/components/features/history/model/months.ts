import { parseMonthId } from './days'
import type { ArchiveForecast, ArchiveMonth, ArchiveSort } from './types'

const pad = (value: number) => String(value).padStart(2, '0')

// Nov–Apr: when forecasts are written. Months are 0-based.
const mainMonths = [10, 11, 0, 1, 2, 3]

// Off-season months only count with a few forecasts — a stray one is test data
const offSeasonMinimum = 3

const countByMonth = (forecasts: ArchiveForecast[]) => {
  const counts = new Map<string, number>()

  for (const { monthId } of forecasts) counts.set(monthId, (counts.get(monthId) ?? 0) + 1)

  return counts
}

// Months worth a calendar row or a preset, oldest first
export const getActiveMonths = (forecasts: ArchiveForecast[]) =>
  [...countByMonth(forecasts).entries()]
    .filter(([monthId, count]) => {
      const { month } = parseMonthId(monthId)

      return mainMonths.includes(month) || count >= offSeasonMinimum
    })
    .map(([monthId]) => monthId)
    .sort()

// Nov–Apr of the season (whether or not they have forecasts), then any other
// active month, in calendar order
export const getPresetMonths = (seasonStartYear: number, activeMonths: string[]) => {
  const main = mainMonths.map((month) => {
    const year = month >= mainMonths[0] ? seasonStartYear : seasonStartYear + 1

    return `${year}-${pad(month + 1)}`
  })
  const extra = activeMonths.filter((monthId) => !main.includes(monthId))

  return [...main, ...extra].sort()
}

export const sortForecasts = (forecasts: ArchiveForecast[], sort: ArchiveSort) =>
  [...forecasts].sort((forecastA, forecastB) => {
    const order = forecastA.publishedAt.localeCompare(forecastB.publishedAt)

    return sort === 'asc' ? order : -order
  })

// Groups already-sorted forecasts by the month they start in, keeping the order
export const groupByMonth = (forecasts: ArchiveForecast[]): ArchiveMonth[] => {
  const groups: ArchiveMonth[] = []

  for (const forecast of forecasts) {
    const last = groups.at(-1)

    if (last?.monthId === forecast.monthId) last.forecasts.push(forecast)
    else groups.push({ forecasts: [forecast], monthId: forecast.monthId })
  }

  return groups
}
