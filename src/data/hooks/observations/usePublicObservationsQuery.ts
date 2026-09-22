import { observationsKeys } from '@data/query-keys'
import type { Avalanche, RegionId } from '@domain/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

type QueryKey = ReturnType<typeof observationsKeys.list>

type QueryOptions = Omit<
  UseQueryOptions<Avalanche[], Error, Avalanche[], QueryKey>,
  'queryFn' | 'queryKey'
> & {
  dateFrom?: string
  dateTo?: string
  regionId: RegionId
}

const requestPublicObservations = async (
  regionId: RegionId,
  dateFrom?: string,
  dateTo?: string,
): Promise<Avalanche[]> => {
  const searchParams = new URLSearchParams({ regionId })

  if (dateFrom) searchParams.set('dateFrom', dateFrom)
  if (dateTo) searchParams.set('dateTo', dateTo)

  const response = await fetch(`/api/observations?${searchParams.toString()}`)
  const result = await response.json()

  if (!response.ok || !result.ok) throw new Error(result.error ?? 'failed to fetch observations')

  return result.observations as Avalanche[]
}

const usePublicObservationsQuery = ({ dateFrom, dateTo, regionId, ...options }: QueryOptions) =>
  useQuery({
    ...options,
    queryFn: () => requestPublicObservations(regionId, dateFrom, dateTo),
    queryKey: observationsKeys.list(regionId, { dateFrom, dateTo }),
  })

export default usePublicObservationsQuery
