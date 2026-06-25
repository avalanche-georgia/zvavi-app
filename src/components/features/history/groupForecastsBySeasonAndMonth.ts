import type { Forecast } from '@domain/types'
import type { Locale } from 'date-fns'
import { format } from 'date-fns'
import { enUS, ka } from 'date-fns/locale'

export type ForecastItem = Pick<Forecast, 'publishedAt' | 'id' | 'hazardLevels' | 'validUntil'>

export type MonthGroup = {
  forecasts: ForecastItem[]
  monthLabel: string
}

export type SeasonGroup = {
  count: number
  months: MonthGroup[]
  seasonLabel: string
}

const dateFnsLocaleMap: Record<string, Locale> = { en: enUS, ka }

export const getDateFnsLocale = (locale: string): Locale => {
  return dateFnsLocaleMap[locale] ?? enUS
}

const getSeasonStartYear = (date: Date): number =>
  date.getFullYear() - (date.getMonth() + 1 <= 6 ? 1 : 0)

export const groupForecastsBySeasonAndMonth = (
  forecasts: ForecastItem[],
  locale: string,
  winterWord: string,
): SeasonGroup[] => {
  const dateFnsLocale = getDateFnsLocale(locale)
  const seasonMap = new Map<number, Map<string, ForecastItem[]>>()
  const seasonCounts = new Map<number, number>()

  for (const forecast of forecasts) {
    if (!forecast.publishedAt) continue
    const date = new Date(forecast.publishedAt)
    const seasonYear = getSeasonStartYear(date)
    const monthKey = format(date, 'MMMM yyyy', { locale: dateFnsLocale })

    let monthMap = seasonMap.get(seasonYear)

    if (!monthMap) {
      monthMap = new Map()
      seasonMap.set(seasonYear, monthMap)
    }

    let bucket = monthMap.get(monthKey)

    if (!bucket) {
      bucket = []
      monthMap.set(monthKey, bucket)
    }

    bucket.push(forecast)
    seasonCounts.set(seasonYear, (seasonCounts.get(seasonYear) ?? 0) + 1)
  }

  return [...seasonMap.keys()]
    .sort((yearA, yearB) => yearB - yearA)
    .map((seasonYear) => {
      const monthMap = seasonMap.get(seasonYear)!
      const months = [...monthMap.entries()].map(([monthLabel, monthForecasts]) => ({
        forecasts: monthForecasts,
        monthLabel,
      }))

      return {
        count: seasonCounts.get(seasonYear)!,
        months,
        seasonLabel: `${winterWord} ${seasonYear}–${seasonYear + 1}`,
      }
    })
}
