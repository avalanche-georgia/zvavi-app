import { hazardScaleLevels } from '@components/features/forecast/model/hazard'
import HazardTile from '@components/features/forecasts/HazardTile'
import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevelScale } from '@domain/types'
import { MultiChipGroup } from '@ds/primitives'
import { useTranslations } from 'next-intl'

import type { ArchiveForecast } from '../model'

type LevelChipsProps = {
  forecasts: ArchiveForecast[]
  levels: HazardLevelScale[]
  onLevelsChange: (levels: HazardLevelScale[]) => void
}

// Levels 1–5 with the season's count each; a level the season never had is disabled
const LevelChips = ({ forecasts, levels, onLevelsChange }: LevelChipsProps) => {
  const t = useTranslations()

  const options = hazardScaleLevels.map((level) => {
    const name = t(hazardLevelNamesByScale[level])
    const count = forecasts.filter(({ hazardLevels }) => hazardLevels.overall === level).length

    return {
      ariaLabel: `${name} (${count})`,
      disabled: count === 0 && !levels.includes(level),
      label: (
        <>
          <HazardTile
            className="rounded-badge text-micro size-5"
            level={level}
            palette="public"
            size="sm"
          />
          {name}
          <span className="text-copy-sm font-normal tabular-nums opacity-70">{count}</span>
        </>
      ),
      value: level,
    }
  })

  return (
    <MultiChipGroup
      ariaLabel={t('forecast.history.filters.levels')}
      className="scrollbar-hide -mx-4 flex-nowrap overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0"
      onChange={onLevelsChange}
      options={options}
      value={levels}
    />
  )
}

export default LevelChips
