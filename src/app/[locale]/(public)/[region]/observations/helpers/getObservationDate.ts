import type { ObservationDateBasis, PublicObservation } from '@domain/types'

// The date the current view is based on: when it happened, or when it was
// reported. null when the occurrence date is unknown.
const getObservationDate = (
  observation: PublicObservation,
  dateBasis: ObservationDateBasis,
): Date | null => {
  if (dateBasis === 'reported') return new Date(observation.createdAt)
  if (observation.isDateUnknown || !observation.date) return null

  return new Date(observation.date)
}

export default getObservationDate
