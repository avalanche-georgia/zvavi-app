import { sortedElevationZones } from '@domain/constants'
import type { ElevationZone, HazardLevels, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import ElevationDividers from './ElevationDividers'
import ElevationLabel from './ElevationLabel'
import ElevationSlices from './ElevationSlices'
import { mountainWidth, sliceGap } from './mountain'
import SectionCard from '../sections/SectionCard'

type ElevationCardProps = {
  className?: string
  hazardLevels: HazardLevels
  onZoneInfoOpen: (zone: ElevationZone) => void
  regionId: RegionId
}

// Danger level per elevation band: three rows of text, the mountain beside them
const ElevationCard = ({
  className,
  hazardLevels,
  onZoneInfoOpen,
  regionId,
}: ElevationCardProps) => {
  const t = useTranslations()

  return (
    <SectionCard className={className} title={t('forecast.page.byElevation')}>
      <div
        className="grid"
        style={{ gridTemplateColumns: `minmax(0, 1fr) ${mountainWidth}px`, rowGap: sliceGap }}
      >
        {sortedElevationZones.map((zone, index) => (
          <ElevationLabel
            key={zone}
            level={hazardLevels[zone]}
            regionId={regionId}
            row={index + 1}
            zone={zone}
          />
        ))}
        <ElevationDividers />
        <ElevationSlices hazardLevels={hazardLevels} onZoneInfoOpen={onZoneInfoOpen} />
      </div>
    </SectionCard>
  )
}

export default ElevationCard
