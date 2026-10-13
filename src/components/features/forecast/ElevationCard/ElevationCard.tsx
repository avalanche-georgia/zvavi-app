import { sortedElevationZones } from '@domain/constants'
import type { HazardLevels } from '@domain/types'
import { useTranslations } from 'next-intl'

import ElevationRow from './ElevationRow'
import SectionCard from '../sections/SectionCard'

type ElevationCardProps = {
  className?: string
  hazardLevels: HazardLevels
}

// Danger level per elevation band, drawn as a three-slice pyramid
const ElevationCard = ({ className, hazardLevels }: ElevationCardProps) => {
  const t = useTranslations()

  return (
    <SectionCard className={className} title={t('forecast.page.byElevation')}>
      <ul className="flex flex-col gap-0.75">
        {sortedElevationZones.map((zone) => (
          <ElevationRow key={zone} level={hazardLevels[zone]} zone={zone} />
        ))}
      </ul>
    </SectionCard>
  )
}

export default ElevationCard
