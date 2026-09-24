import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import GroupHeader from './GroupHeader'
import ObservationCard from './ObservationCard'
import useGroupLabel from './useGroupLabel'
import groupObservations from '../helpers/groupObservations'
import type { ObservationsSort } from '../helpers/searchParams'

type ObservationsListProps = {
  dateBasis: ObservationDateBasis
  observations: PublicObservation[]
  onOpen: (id: number) => void
  selectedId: number | null
  sort: ObservationsSort
}

// Newest: grouped by day/month. Largest: one flat list.
const ObservationsList = ({
  dateBasis,
  observations,
  onOpen,
  selectedId,
  sort,
}: ObservationsListProps) => {
  const t = useTranslations()
  const getGroupLabel = useGroupLabel()

  const renderCard = (observation: PublicObservation) => (
    <ObservationCard
      key={observation.id}
      className="mb-2"
      dateBasis={dateBasis}
      isSelected={observation.id === selectedId}
      observation={observation}
      onOpen={onOpen}
    />
  )

  if (sort === 'largest') {
    return (
      <section>
        <GroupHeader label={t('observations.groups.largestFirst')} />
        {observations.map(renderCard)}
      </section>
    )
  }

  return groupObservations(observations, dateBasis, new Date()).map((group) => (
    <section key={group.key}>
      <GroupHeader count={group.observations.length} label={getGroupLabel(group.key)} />
      {group.observations.map(renderCard)}
    </section>
  ))
}

export default ObservationsList
