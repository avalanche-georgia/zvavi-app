import type { PublicObservation, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import ObservationTile from './ObservationTile'
import SubmitObservationTile from './SubmitObservationTile'
import HomeSection from '../HomeSection'
import SectionHeader from '../SectionHeader'

import { routes } from '@/routes'

type LatestObservationsProps = {
  observations: PublicObservation[]
  regionId: RegionId
}

const headingId = 'home-observations'

// The region's newest observations and an invitation to report one
const LatestObservations = ({ observations, regionId }: LatestObservationsProps) => {
  const t = useTranslations()

  return (
    <HomeSection labelledBy={headingId}>
      <SectionHeader
        href={routes.observationsByRegion(regionId).root}
        id={headingId}
        linkLabel={t('home.observations.seeAll')}
        title={t('home.observations.title')}
      />
      {observations.length === 0 && (
        <p className="text-muted text-copy mb-4">{t('home.observations.empty')}</p>
      )}
      <ul className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
        {observations.map((observation) => (
          <li key={observation.id} className="grid">
            <ObservationTile observation={observation} />
          </li>
        ))}
        <li className="grid">
          <SubmitObservationTile regionId={regionId} />
        </li>
      </ul>
    </HomeSection>
  )
}

export default LatestObservations
