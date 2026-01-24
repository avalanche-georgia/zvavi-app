import type { TimeRange } from '@domain/types'

type StrictTimeRange = { start: Date | null; end: Date | null }

const prepareTimeOfDay = (timeOfDay: TimeRange): StrictTimeRange => ({
  end: timeOfDay.end ? new Date(timeOfDay.end) : null,
  start: timeOfDay.start ? new Date(timeOfDay.start) : null,
})

export default prepareTimeOfDay
