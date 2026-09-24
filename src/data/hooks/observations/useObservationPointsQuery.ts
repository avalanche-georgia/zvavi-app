import { observationsKeys } from '@data/query-keys'
import type { ObservationPoints } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import {
  type ObservationFilterParams,
  requestPublicObservations,
  toSearchParams,
} from './requestPublicObservations'

// Every observation matching the filter, as map points (no photos)
const useObservationPointsQuery = ({ regionId, ...filters }: ObservationFilterParams) =>
  useQuery({
    errorDescription: 'useObservationPointsQuery',
    placeholderData: (previousData) => previousData,
    queryFn: () =>
      requestPublicObservations<ObservationPoints>(
        `/api/observations/map?${toSearchParams({ ...filters, regionId })}`,
      ),
    queryKey: observationsKeys.points(regionId, filters),
  })

export default useObservationPointsQuery
