'use client'

import type { HistoryListItem } from '@data/hooks/forecasts'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import useArchiveFormat from './hooks/useArchiveFormat'
import useArchiveSeason from './hooks/useArchiveSeason'

import HistoryEmptyState from './HistoryEmptyState'
import SeasonTabs from './SeasonTabs'
import SeasonView from './SeasonView'

type HistoryListProps = {
  forecasts: HistoryListItem[]
  regionId: RegionId
}

const HistoryList = ({ forecasts: items, regionId }: HistoryListProps) => {
  const t = useTranslations()
  const { formatMonth } = useArchiveFormat()
  const { forecasts, season, seasons, selectSeason } = useArchiveSeason(items)

  const regionName = t(`regions.names.${regionId}`)
  // The list comes newest first
  const oldest = forecasts.at(-1)

  return (
    <>
      <p className="text-body text-copy mt-1.5 max-w-2xl text-pretty">
        {oldest
          ? t('forecast.history.lede', {
              regionName,
              since: formatMonth(oldest.monthId),
              total: forecasts.length,
            })
          : t('forecast.history.ledeEmpty', { regionName })}
      </p>
      {season ? (
        <>
          <SeasonTabs onSeasonChange={selectSeason} season={season} seasons={seasons} />
          {/* Keyed so a new season starts with clear filters */}
          <SeasonView key={season.startYear} regionId={regionId} season={season} />
        </>
      ) : (
        <HistoryEmptyState className="mt-6" regionId={regionId} variant="none" />
      )}
    </>
  )
}

export default HistoryList
