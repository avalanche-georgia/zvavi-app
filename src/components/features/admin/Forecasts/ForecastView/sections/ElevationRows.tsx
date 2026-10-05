import { hazardLevelNamesByScale, sortedElevationZones } from '@domain/constants'
import type { HazardLevels } from '@domain/types'
import { useTranslations } from 'next-intl'

import { HazardTile } from '../../shared'

// High alpine / Alpine / Sub-alpine: name · coloured chip · level name
const ElevationRows = ({ hazardLevels }: { hazardLevels: HazardLevels }) => {
  const t = useTranslations()

  return (
    <ul className="flex flex-col gap-1.5">
      {sortedElevationZones.map((zone) => {
        const level = hazardLevels[zone]

        return (
          <li key={zone} className="text-copy grid grid-cols-[96px_26px_1fr] items-center gap-2.5">
            <span className="text-body">{t(`common.elevationZones.${zone}`)}</span>
            <HazardTile className="size-6.5 rounded-[7px]" level={level} size="md" />
            <span className="text-ink font-medium">{t(hazardLevelNamesByScale[level])}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default ElevationRows
