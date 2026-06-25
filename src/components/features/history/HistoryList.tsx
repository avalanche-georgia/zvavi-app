'use client'

import { Spoiler } from '@components/shared'
import { useLocale, useTranslations } from 'next-intl'

import type { ForecastItem } from './groupForecastsBySeasonAndMonth'
import { groupForecastsBySeasonAndMonth } from './groupForecastsBySeasonAndMonth'
import HistoryEmptyState from './HistoryEmptyState'
import HistoryForecastRow from './HistoryForecastRow'

type HistoryListProps = {
  forecasts: ForecastItem[]
  regionId: string
}

const HistoryList = ({ forecasts, regionId }: HistoryListProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const groups = groupForecastsBySeasonAndMonth(
    forecasts,
    locale,
    t('forecast.history.winterSeason'),
  )

  if (forecasts.length === 0) return <HistoryEmptyState />

  return (
    <div className="flex flex-col gap-2">
      {groups.map((season) => (
        <Spoiler key={season.seasonLabel} title={`${season.seasonLabel} · ${season.count}`}>
          {season.months.map((monthGroup) => (
            <div key={monthGroup.monthLabel} className="mb-1">
              <div className="px-2 py-2 text-xs font-semibold tracking-wide text-gray-400 uppercase">
                {monthGroup.monthLabel}
              </div>
              <div className="flex flex-col gap-0.5">
                {monthGroup.forecasts.map((forecast) => (
                  <HistoryForecastRow key={forecast.id} forecast={forecast} regionId={regionId} />
                ))}
              </div>
            </div>
          ))}
        </Spoiler>
      ))}
    </div>
  )
}

export default HistoryList
