import { startOfDay } from 'date-fns'

import toDateOnlyIso from './toDateOnlyIso'

import { atTbilisiTime, formatTbilisi, toTbilisiWallClock } from '@/lib/tbilisiTime'

// The picked calendar day at a time of day (HH:mm) in Georgian time: a reporter
// abroad types the time it was in the mountains, and everyone sees that time
const toObservationDate = (day: Date, time: string) => atTbilisiTime(day, time)

// What the API stores: the exact moment when a time was given, otherwise the day
// alone (see toDateOnlyIso)
export const toObservationDateIso = (day: Date, time: string | null) =>
  time ? toObservationDate(day, time).toISOString() : toDateOnlyIso(day)

// Back from a stored moment to the form's calendar day and HH:mm, in Georgian time
export const fromObservationDate = (date: Date) => ({
  day: startOfDay(toTbilisiWallClock(date)),
  time: formatTbilisi(date, 'HH:mm'),
})

export default toObservationDate
