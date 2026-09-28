import { observationsKeys } from '@data/query-keys'
import type { PublicObservation, RegionId } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import {
  isNotFoundError,
  photoUrlsStaleTime,
  requestPublicObservations,
} from './requestPublicObservations'

type QueryParams = {
  // null = nothing to fetch
  id: number | null
  isEnabled: boolean
  regionId: RegionId
}

// A single observation that isn't in the loaded list pages (link, map tap)
const usePublicObservationQuery = ({ id, isEnabled, regionId }: QueryParams) =>
  useQuery({
    enabled: isEnabled && id !== null,
    errorDescription: 'usePublicObservationQuery',
    queryFn: async () => {
      const { observation } = await requestPublicObservations<{ observation: PublicObservation }>(
        `/api/observations/${id}?regionId=${regionId}`,
      )

      return observation
    },
    queryKey: observationsKeys.detail(regionId, id ?? 0),
    refetchInterval: photoUrlsStaleTime,
    // A missing observation won't appear on retry; a flaky connection might
    retry: (failureCount, error) => !isNotFoundError(error) && failureCount < 2,
    staleTime: photoUrlsStaleTime,
  })

export default usePublicObservationQuery
