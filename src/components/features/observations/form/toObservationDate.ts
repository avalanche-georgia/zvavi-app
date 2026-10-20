import { format } from 'date-fns'

import toDateOnlyIso from './toDateOnlyIso'

const timeZone = 'Asia/Tbilisi'

// Tbilisi's UTC offset at a moment, e.g. "+04:00"
const getTbilisiOffset = (date: Date) => {
  const offset = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'longOffset' })
    .formatToParts(date)
    .find(({ type }) => type === 'timeZoneName')?.value

  return offset?.replace('GMT', '') || 'Z'
}

// The picked calendar day at a time of day (HH:mm) in Tbilisi time: a reporter
// abroad types the time it was in the mountains, and everyone sees that time
const toObservationDate = (day: Date, time: string) => {
  const dateTime = `${format(day, 'yyyy-MM-dd')}T${time}:00`

  return new Date(`${dateTime}${getTbilisiOffset(new Date(`${dateTime}Z`))}`)
}

// What the API stores: the exact moment when a time was given, otherwise the day
// alone (see toDateOnlyIso)
export const toObservationDateIso = (day: Date, time: string | null) =>
  time ? toObservationDate(day, time).toISOString() : toDateOnlyIso(day)

// Back from a stored moment to the form's calendar day and HH:mm, in Tbilisi time
export const fromObservationDate = (date: Date) => {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-CA', {
      day: '2-digit',
      hour: '2-digit',
      hourCycle: 'h23',
      minute: '2-digit',
      month: '2-digit',
      timeZone,
      year: 'numeric',
    })
      .formatToParts(date)
      .map(({ type, value }) => [type, value]),
  )

  return {
    day: new Date(Number(parts.year), Number(parts.month) - 1, Number(parts.day)),
    time: `${parts.hour}:${parts.minute}`,
  }
}

export default toObservationDate
