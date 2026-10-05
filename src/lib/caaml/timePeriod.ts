import { localTimeZone } from './config'
import { InvalidForecastError } from './errors'
import type { CaamlValidTimePeriod } from './types'

type ProblemTiming = {
  isAllDay: boolean
  timeOfDay: { end?: string | null; start?: string | null } | null
}

const noon = 12 * 60

const localTimeFormat = new Intl.DateTimeFormat('en-GB', {
  hour: '2-digit',
  hour12: false,
  minute: '2-digit',
  timeZone: localTimeZone,
})

const localMinutesOfDay = (timestamp: string) => {
  const date = new Date(timestamp)

  if (Number.isNaN(date.getTime())) throw new InvalidForecastError('problem time window is invalid')

  const parts = localTimeFormat.formatToParts(date)
  const valueOf = (type: 'hour' | 'minute') =>
    Number(parts.find((part) => part.type === type)?.value)

  // Some engines format midnight as "24"
  return (valueOf('hour') % 24) * 60 + valueOf('minute')
}

// TBD (T3). Only the local time of day matters, not the date. Anything that
// isn't clearly a morning or afternoon window is sent as all day (conservative).
export const toValidTimePeriod = ({ isAllDay, timeOfDay }: ProblemTiming): CaamlValidTimePeriod => {
  if (isAllDay || !timeOfDay?.start || !timeOfDay.end) return 'all_day'

  const start = localMinutesOfDay(timeOfDay.start)
  const end = localMinutesOfDay(timeOfDay.end)

  // Crosses midnight, or zero length
  if (end <= start) return 'all_day'
  if (end <= noon) return 'earlier'
  if (start >= noon) return 'later'

  return 'all_day'
}
