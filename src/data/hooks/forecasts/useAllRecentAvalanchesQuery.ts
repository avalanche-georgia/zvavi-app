import { supabase } from '@data'
import type { RegionId } from '@domain/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

export type AvalancheWithForecasts = {
  aspects: Record<string, string[]>
  createdAt: string
  date: string | null
  description: string
  forecastAvalanche: { forecastId: number; forecasts: { createdAt: string } }[]
  id: number
  isDateUnknown: boolean
  size: number
}

type QueryKey = ReturnType<typeof forecastsKeys.allAvalanches>
type Response = AvalancheWithForecasts[]

type QueryOptions = Omit<
  UseQueryOptions<Response, unknown, Response, QueryKey>,
  'queryKey' | 'queryFn'
> & { regionId: RegionId }

const fetchAllAvalanches = async (regionId: RegionId): Promise<Response> => {
  const { data, error } = await supabase
    .from('recent_avalanches')
    .select('*, forecast_avalanche(forecast_id, forecasts(created_at))')
    .eq('region_id', regionId)
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return convertSnakeToCamel(data ?? []) as Response
}

const useAllRecentAvalanchesQuery = ({ regionId, ...options }: QueryOptions) =>
  useQuery({
    queryFn: () => fetchAllAvalanches(regionId),
    queryKey: forecastsKeys.allAvalanches(regionId),
    ...options,
  })

export default useAllRecentAvalanchesQuery
