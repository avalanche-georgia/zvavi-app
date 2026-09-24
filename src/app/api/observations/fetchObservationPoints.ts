import { convertSnakeToCamel } from '@data/helpers'
import type { ObservationPoint, ObservationPoints } from '@domain/types'

import {
  dateColumns,
  pointColumns,
  type PublicObservationFilters,
  queryPublicObservations,
} from './publicObservationsQuery'

// Safety cap — points are tiny, but this is an anonymous endpoint
const maxPoints = 2000

// Every located observation matching the filter (for the map), plus the
// region's unfiltered total (for "N of M reports")
const fetchObservationPoints = async (
  filters: PublicObservationFilters,
): Promise<ObservationPoints> => {
  const [pointsResult, totalResult] = await Promise.all([
    queryPublicObservations(filters, { columns: pointColumns })
      .not('latitude', 'is', null)
      .not('longitude', 'is', null)
      // If the cap is ever hit, the oldest are the ones left off the map
      .order(dateColumns[filters.dateBasis], { ascending: false, nullsFirst: false })
      .order('created_at', { ascending: false })
      .limit(maxPoints),
    queryPublicObservations(
      { dateBasis: 'occurred', regionId: filters.regionId },
      { columns: 'id', isCounted: true },
    ).limit(1),
  ])

  if (pointsResult.error) throw new Error(pointsResult.error.message)
  if (totalResult.error) throw new Error(totalResult.error.message)

  return {
    points: convertSnakeToCamel(pointsResult.data ?? []) as ObservationPoint[],
    regionTotal: totalResult.count ?? 0,
  }
}

export default fetchObservationPoints
