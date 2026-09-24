type Coordinates = { latitude: number | null; longitude: number | null }

type WithCoordinates<T> = T & { latitude: number; longitude: number }

// New records always have coordinates; legacy ones may not
const hasCoordinates = <T extends Coordinates>(record: T): record is WithCoordinates<T> =>
  record.latitude !== null && record.longitude !== null

export default hasCoordinates
