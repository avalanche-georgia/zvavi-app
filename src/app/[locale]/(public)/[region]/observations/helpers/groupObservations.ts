import type { ObservationDateBasis, PublicObservation } from '@domain/types'
import { differenceInCalendarDays, format } from 'date-fns'

import getObservationDate from './getObservationDate'

export type ObservationGroupKey = 'today' | 'yesterday' | 'thisWeek' | 'unknown' | `month:${string}`

export type ObservationGroup = {
  key: ObservationGroupKey
  observations: PublicObservation[]
}

const getGroupKey = (date: Date | null, now: Date): ObservationGroupKey => {
  if (!date) return 'unknown'

  const daysAgo = differenceInCalendarDays(now, date)

  if (daysAgo <= 0) return 'today'
  if (daysAgo === 1) return 'yesterday'
  if (daysAgo < 7) return 'thisWeek'

  return `month:${format(date, 'yyyy-MM')}`
}

// Expects a list already sorted newest first (the API's order), so each group is contiguous and
// "Date unknown" (sorted last) ends up last.
const groupObservations = (
  observations: PublicObservation[],
  dateBasis: ObservationDateBasis,
  now: Date,
): ObservationGroup[] =>
  observations.reduce<ObservationGroup[]>((groups, observation) => {
    const key = getGroupKey(getObservationDate(observation, dateBasis), now)
    const lastGroup = groups[groups.length - 1]

    if (lastGroup?.key === key) {
      lastGroup.observations.push(observation)
    } else {
      groups.push({ key, observations: [observation] })
    }

    return groups
  }, [])

export default groupObservations
