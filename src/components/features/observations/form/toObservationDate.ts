import { setHours, setMinutes, startOfDay } from 'date-fns'

import toDateOnlyIso from './toDateOnlyIso'

// The picked day at a time of day (HH:mm), in the device's time zone
const toObservationDate = (day: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number)

  return setMinutes(setHours(startOfDay(day), hours), minutes)
}

// What the API stores: the exact moment when a time was given, otherwise the day
// alone (see toDateOnlyIso)
export const toObservationDateIso = (day: Date, time: string | null) =>
  time ? toObservationDate(day, time).toISOString() : toDateOnlyIso(day)

export default toObservationDate
