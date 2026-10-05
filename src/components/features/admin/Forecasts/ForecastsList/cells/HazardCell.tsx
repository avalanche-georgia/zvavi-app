import { hazardLevelNamesByScale } from '@domain/constants'
import type { HazardLevels } from '@domain/types'
import { useTranslations } from 'next-intl'

import HazardBars from './HazardBars'
import HazardTile from './HazardTile'

const HazardCell = ({ hazardLevels }: { hazardLevels: HazardLevels }) => {
  const t = useTranslations()
  const levelName = t(hazardLevelNamesByScale[hazardLevels.overall])

  return (
    <div className="flex items-center gap-2.5">
      <HazardTile
        label={levelName}
        level={hazardLevels.overall}
        size="md"
        title={t('admin.forecasts.list.overallTitle', { level: levelName })}
      />
      <HazardBars hazardLevels={hazardLevels} />
    </div>
  )
}

export default HazardCell
