import { sortedElevationZones } from '@domain/constants'
import type { ElevationZone, HazardLevels, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import ElevationLabel from './ElevationLabel'
import ElevationSlices from './ElevationSlices'
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
      <div className="grid grid-cols-[minmax(0,1fr)_101px] gap-y-0.75">
        {sortedElevationZones.map((zone) => (
          <ElevationLabel key={zone} level={hazardLevels[zone]} regionId={regionId} zone={zone} />
        ))}
        <ElevationSlices hazardLevels={hazardLevels} onZoneInfoOpen={onZoneInfoOpen} />
      </div>
    </SectionCard>
  )
}

export default ElevationCard
