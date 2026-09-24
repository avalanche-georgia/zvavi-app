import { observationsKeys } from '@data/query-keys'
import type { ObservationDateBasis, PublicObservation, RegionId } from '@domain/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

type QueryKey = ReturnType<typeof observationsKeys.list>

type RequestParams = {
  dateBasis: ObservationDateBasis
  dateFrom?: string
  dateTo?: string
  regionId: RegionId
}

type QueryOptions = Omit<
  UseQueryOptions<PublicObservation[], Error, PublicObservation[], QueryKey>,
  'queryFn' | 'queryKey'
> &
  RequestParams

// Photo URLs in the response are signed for at least an hour — refetch well
// before they expire, also while the page just sits open
const staleTime = 30 * 60 * 1000

const requestPublicObservations = async ({
  dateBasis,
  dateFrom,
  dateTo,
  regionId,
}: RequestParams): Promise<PublicObservation[]> => {
  const searchParams = new URLSearchParams({ dateBasis, regionId })

  if (dateFrom) searchParams.set('dateFrom', dateFrom)
  if (dateTo) searchParams.set('dateTo', dateTo)

  const response = await fetch(`/api/observations?${searchParams.toString()}`)
  const result = await response.json()

  if (!response.ok || !result.ok) throw new Error(result.error ?? 'failed to fetch observations')

  return result.observations as PublicObservation[]
}

const usePublicObservationsQuery = ({
  dateBasis,
  dateFrom,
  dateTo,
  regionId,
  ...options
}: QueryOptions) =>
  useQuery({
    placeholderData: (previousData) => previousData,
    refetchInterval: staleTime,
    staleTime,
    ...options,
    queryFn: () => requestPublicObservations({ dateBasis, dateFrom, dateTo, regionId }),
    queryKey: observationsKeys.list(regionId, { dateBasis, dateFrom, dateTo }),
  })

export default usePublicObservationsQuery
