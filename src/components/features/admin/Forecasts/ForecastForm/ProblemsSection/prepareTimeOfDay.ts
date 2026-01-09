import type { TimeRange } from '@domain/types'

const prepareTimeOfDay = (timeOfDay: TimeRange) => ({
  end: timeOfDay.end ? new Date(timeOfDay.end).toISOString() : null,
  start: timeOfDay.start ? new Date(timeOfDay.start).toISOString() : null,
})

export default prepareTimeOfDay
