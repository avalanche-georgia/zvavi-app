import type { ObservationDateBasis, PublicObservation } from '@domain/types'

import getObservationDate from './getObservationDate'
import type { ObservationsSort } from './searchParams'

const byDateDescending =
  (dateBasis: ObservationDateBasis) => (first: PublicObservation, second: PublicObservation) => {
    const firstTime = getObservationDate(first, dateBasis)?.getTime() ?? -Infinity
    const secondTime = getObservationDate(second, dateBasis)?.getTime() ?? -Infinity

    if (firstTime !== secondTime) return secondTime - firstTime

    // Same day (or both unknown) — most recently reported first
    return second.createdAt.localeCompare(first.createdAt)
  }

// Newest first with unknown dates last; "largest" is size first, then newest
const sortObservations = (
  observations: PublicObservation[],
  dateBasis: ObservationDateBasis,
  sort: ObservationsSort,
): PublicObservation[] => {
  const byDate = byDateDescending(dateBasis)

  return [...observations].sort((first, second) =>
    sort === 'largest' ? second.size - first.size || byDate(first, second) : byDate(first, second),
  )
}

export default sortObservations
