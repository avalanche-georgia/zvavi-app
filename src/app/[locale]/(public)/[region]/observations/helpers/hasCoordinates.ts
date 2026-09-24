import type { PublicObservation } from '@domain/types'

type WithCoordinates = PublicObservation & { latitude: number; longitude: number }

// New observations always have coordinates; legacy ones may not
const hasCoordinates = (observation: PublicObservation): observation is WithCoordinates =>
  observation.latitude !== null && observation.longitude !== null

export default hasCoordinates
