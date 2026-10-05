import { sortedElevationZones } from '@domain/constants'
import type { HazardLevels } from '@domain/types'
import { useTranslations } from 'next-intl'

import { HazardTile } from '../../shared'

import { cn } from '@/lib/utils'

type ZoneTilesProps = { className?: string; hazardLevels: HazardLevels }

const ZoneTiles = ({ className, hazardLevels }: ZoneTilesProps) => {
  const t = useTranslations()

  return (
    <ul className={cn('flex gap-2', className)}>
      {sortedElevationZones.map((zone) => (
        <li
          key={zone}
          className="text-caption text-muted flex w-15.5 flex-col items-center gap-1 text-center leading-tight"
        >
          <HazardTile level={hazardLevels[zone]} size="sm" />
          {t(`common.elevationZones.${zone}`)}
        </li>
      ))}
    </ul>
  )
}

export default ZoneTiles
