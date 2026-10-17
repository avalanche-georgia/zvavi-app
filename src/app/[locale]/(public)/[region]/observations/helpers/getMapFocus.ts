import { hasCoordinates } from '@components/features/observations'
import type { PublicObservation } from '@domain/types'

// Desktop centres the map on the open observation; mobile shows it in the sheet
const getMapFocus = (
  isDesktop: boolean,
  observation: PublicObservation | null | undefined,
): [number, number] | null =>
  isDesktop && observation && hasCoordinates(observation)
    ? [observation.latitude, observation.longitude]
    : null

export default getMapFocus
