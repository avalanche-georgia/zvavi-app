import type { ObservationDateBasis, ObservationsSort, PublicObservation } from '@domain/types'
import { useTranslations } from 'next-intl'

import GroupHeader from './GroupHeader'
import ObservationCard from './ObservationCard'
import useGroupLabel from './useGroupLabel'
import groupObservations from '../helpers/groupObservations'

type ObservationsListProps = {
  dateBasis: ObservationDateBasis
  // More pages to load — the last group may still grow, so its count is hidden
  hasMore: boolean
  observations: PublicObservation[]
  onOpen: (id: number) => void
  selectedId: number | null
  sort: ObservationsSort
}

// Newest: grouped by day/month. Largest: one flat list. Server-sorted.
const ObservationsList = ({
  dateBasis,
  hasMore,
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

  const groups = groupObservations(observations, dateBasis, new Date())

  return groups.map((group, index) => (
    <section key={group.key}>
      <GroupHeader
        count={hasMore && index === groups.length - 1 ? undefined : group.observations.length}
        label={getGroupLabel(group.key)}
      />
      {group.observations.map(renderCard)}
    </section>
  ))
}

export default ObservationsList
