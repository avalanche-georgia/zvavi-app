import { backgroundColorByHazardLevel } from '@components/constants'
import { sortedElevationZones } from '@domain/constants'
import type { ElevationZone, HazardLevels } from '@domain/types'
import { useTranslations } from 'next-intl'

import { mountainClipPath } from './mountain'
import { hazardTextClass } from '../model/hazard'

import { cn } from '@/lib/utils'

type ElevationSlicesProps = {
  hazardLevels: HazardLevels
  onZoneInfoOpen: (zone: ElevationZone) => void
}

// The three coloured slices of the mountain, clipped once as a single shape —
// the slope stays one straight line however tall each row grows. They take
// their heights from the card's rows (subgrid). Each opens the explanation of
// its band's level.
const ElevationSlices = ({ hazardLevels, onZoneInfoOpen }: ElevationSlicesProps) => {
  const t = useTranslations()

  return (
    <div
      className="col-start-2 row-span-3 row-start-1 grid grid-rows-subgrid"
      style={{ clipPath: mountainClipPath }}
    >
      {sortedElevationZones.map((zone) => {
        const level = hazardLevels[zone]
        const zoneLabel = t(`common.elevationZones.${zone}`)

        return (
          <button
            key={zone}
            aria-haspopup="dialog"
            aria-label={`${t('common.labels.zoneDangerLevel', { zone: zoneLabel })} — ${level}`}
            className={cn(
              'text-heading flex cursor-pointer items-center justify-end pr-3 font-bold',
              // Inside the slice: the mountain's clip would cut an outer ring
              'focus-visible:outline-accent outline-hidden focus-visible:outline-2 focus-visible:-outline-offset-4',
              backgroundColorByHazardLevel[level],
              hazardTextClass(level),
            )}
            onClick={() => onZoneInfoOpen(zone)}
            type="button"
          >
            {level === '0' ? '–' : level}
          </button>
        )
      })}
    </div>
  )
}

export default ElevationSlices
