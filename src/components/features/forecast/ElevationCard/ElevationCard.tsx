import { sortedElevationZones } from '@domain/constants'
import type { ElevationZone, HazardLevels, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import ElevationRow from './ElevationRow'
import SectionCard from '../sections/SectionCard'

type ElevationCardProps = {
  className?: string
  hazardLevels: HazardLevels
  onZoneInfoOpen: (zone: ElevationZone) => void
  regionId: RegionId
}

// Danger level per elevation band, next to the hazard pyramid
const ElevationCard = ({
  className,
  hazardLevels,
  onZoneInfoOpen,
  regionId,
}: ElevationCardProps) => {
  const t = useTranslations()

  return (
    <SectionCard className={className} title={t('forecast.page.byElevation')}>
      <ul className="flex flex-col gap-[5px]">
        {sortedElevationZones.map((zone) => (
          <ElevationRow
            key={zone}
            level={hazardLevels[zone]}
            onInfoOpen={() => onZoneInfoOpen(zone)}
            regionId={regionId}
            zone={zone}
          />
        ))}
      </ul>
    </SectionCard>
  )
}

export default ElevationCard
