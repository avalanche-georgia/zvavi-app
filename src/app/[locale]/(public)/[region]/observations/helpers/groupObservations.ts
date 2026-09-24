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

// Groups in order of first appearance — the API returns newest first, so that's
// Today → … → older months. Doesn't rely on the order being right, though: while
// a new date basis loads, the list briefly still holds the previous order, and
// each key must still map to exactly one group. "Date unknown" always goes last.
const groupObservations = (
  observations: PublicObservation[],
  dateBasis: ObservationDateBasis,
  now: Date,
): ObservationGroup[] => {
  const groups = new Map<ObservationGroupKey, PublicObservation[]>()

  observations.forEach((observation) => {
    const key = getGroupKey(getObservationDate(observation, dateBasis), now)

    groups.set(key, [...(groups.get(key) ?? []), observation])
  })

  const unknown = groups.get('unknown')

  groups.delete('unknown')

  return [
    ...Array.from(groups, ([key, groupObservations]) => ({ key, observations: groupObservations })),
    ...(unknown ? [{ key: 'unknown' as const, observations: unknown }] : []),
  ]
}

export default groupObservations
