import { endOfDay, format, parseISO, startOfDay } from 'date-fns'

// Everything in the app happens in Georgia, so dates and times are entered and
// shown in Georgian time, whatever the device's or server's zone. Georgia is
// UTC+4 all year (no daylight saving since 2005); a fixed offset keeps the server
// and the browser in agreement without time-zone data.
export const tbilisiOffsetMs = 4 * 60 * 60 * 1000

// A local Date whose fields read Georgia's wall-clock time for a moment, so
// date-fns (`format`, `startOfDay`, …) works in Georgian time. Known limit: a
// wall-clock time inside the device's own daylight-saving gap (one hour a year,
// devices outside Georgia only) comes out an hour off.
export const toTbilisiWallClock = (value: Date | string) => {
  const shifted = new Date(new Date(value).getTime() + tbilisiOffsetMs)

  return new Date(
    shifted.getUTCFullYear(),
    shifted.getUTCMonth(),
    shifted.getUTCDate(),
    shifted.getUTCHours(),
    shifted.getUTCMinutes(),
    shifted.getUTCSeconds(),
  )
}

// The reverse: the moment a local Date's fields mean in Georgia
export const fromTbilisiWallClock = (wallClock: Date) =>
  new Date(
    Date.UTC(
      wallClock.getFullYear(),
      wallClock.getMonth(),
      wallClock.getDate(),
      wallClock.getHours(),
      wallClock.getMinutes(),
      wallClock.getSeconds(),
    ) - tbilisiOffsetMs,
  )

// A calendar day (a local Date, as a date picker holds it) at HH:mm in Georgia
export const atTbilisiTime = (day: Date, time: string) => {
  const [hours, minutes] = time.split(':').map(Number)

  return fromTbilisiWallClock(
    new Date(day.getFullYear(), day.getMonth(), day.getDate(), hours, minutes),
  )
}

// date-fns `format` in Georgian time: formatTbilisi(date, 'HH:mm')
export const formatTbilisi = (
  value: Date | string,
  pattern: string,
  options?: Parameters<typeof format>[2],
) => format(toTbilisiWallClock(value), pattern, options)

// Today in Georgia, as a calendar day (a local Date at midnight)
export const getTbilisiToday = () => startOfDay(toTbilisiWallClock(new Date()))

// Today in Georgia as yyyy-MM-dd, e.g. a date picker's `max`
export const getTbilisiTodayIso = () => formatTbilisi(new Date(), 'yyyy-MM-dd')

// The first and last moment of a calendar day (yyyy-MM-dd) in Georgia, e.g. a
// date filter's bounds
export const startOfTbilisiDay = (day: string) => fromTbilisiWallClock(startOfDay(parseISO(day)))
export const endOfTbilisiDay = (day: string) => fromTbilisiWallClock(endOfDay(parseISO(day)))
