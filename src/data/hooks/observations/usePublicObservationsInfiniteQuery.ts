import { observationsKeys } from '@data/query-keys'
import type { ObservationsPage, ObservationsSort } from '@domain/types'
import { useInfiniteQuery } from '@tanstack/react-query'

import {
  type ObservationFilterParams,
  photoUrlsStaleTime,
  requestPublicObservations,
  toSearchParams,
} from './requestPublicObservations'

const pageSize = 20

type QueryParams = ObservationFilterParams & { sort: ObservationsSort }

// The public list, loaded a page at a time in display order (sorted server-side)
const usePublicObservationsInfiniteQuery = ({ regionId, sort, ...filters }: QueryParams) =>
  useInfiniteQuery({
    getNextPageParam: (lastPage: ObservationsPage, pages: ObservationsPage[]) => {
      const loaded = pages.reduce((count, page) => count + page.observations.length, 0)

      return loaded < lastPage.total ? loaded : undefined
    },
    initialPageParam: 0,
    placeholderData: (previousData) => previousData,
    queryFn: ({ pageParam }) =>
      requestPublicObservations<ObservationsPage>(
        `/api/observations?${toSearchParams({ ...filters, limit: pageSize, offset: pageParam, regionId, sort })}`,
      ),
    queryKey: observationsKeys.list(regionId, { ...filters, sort }),
    refetchInterval: photoUrlsStaleTime,
    staleTime: photoUrlsStaleTime,
  })

export default usePublicObservationsInfiniteQuery
