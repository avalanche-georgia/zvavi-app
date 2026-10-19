'use client'

import { ChipGroup, Select } from '@ds/primitives'
import { useTranslations } from 'next-intl'
import { useMediaQuery } from 'usehooks-ts'

import type { ArchiveSeason } from './model'

type SeasonTabsProps = {
  onSeasonChange: (startYear: number) => void
  season: ArchiveSeason
  seasons: ArchiveSeason[]
}

// The latest seasons as chips (2 on phones, 3 wider), older ones in "Earlier"
const SeasonTabs = ({ onSeasonChange, season, seasons }: SeasonTabsProps) => {
  const t = useTranslations()
  const isWide = useMediaQuery('(min-width: 40rem)', { initializeWithValue: false })

  const chipSeasons = seasons.slice(0, isWide ? 3 : 2)
  const earlierSeasons = seasons.slice(chipSeasons.length)
  const isEarlier = !chipSeasons.includes(season)

  const chipOptions = chipSeasons.map(({ forecasts, label, startYear }) => ({
    label: (
      <>
        {label}
        <span className="text-copy-sm font-normal tabular-nums opacity-70">{forecasts.length}</span>
      </>
    ),
    value: String(startYear),
  }))

  const earlierOptions = earlierSeasons.map(({ forecasts, label, startYear }) => ({
    label: t('forecast.history.seasonOption', { count: forecasts.length, season: label }),
    value: String(startYear),
  }))

  const handleSeasonChange = (value: string | null) => {
    if (value) onSeasonChange(Number(value))
  }

  return (
    <div className="scrollbar-hide -mx-4 mt-4.5 flex gap-1.5 overflow-x-auto px-4 sm:-mx-6 sm:px-6">
      <ChipGroup
        ariaLabel={t('forecast.history.seasons')}
        className="flex-nowrap *:shrink-0 *:whitespace-nowrap"
        onChange={handleSeasonChange}
        options={chipOptions}
        value={isEarlier ? null : String(season.startYear)}
      />
      {earlierSeasons.length > 0 && (
        <Select
          className="w-auto shrink-0"
          isActive={isEarlier}
          onValueChange={handleSeasonChange}
          options={earlierOptions}
          placeholder={t('forecast.history.earlier')}
          size="sm"
          value={isEarlier ? String(season.startYear) : null}
        />
      )}
    </div>
  )
}

export default SeasonTabs
