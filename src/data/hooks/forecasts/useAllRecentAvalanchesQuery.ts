import { supabase } from '@data'
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
>

const fetchAllAvalanches = async (): Promise<Response> => {
  const { data, error } = await supabase
    .from('recent_avalanches')
    .select('*, forecast_avalanche(forecast_id, forecasts(created_at))')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)

  return convertSnakeToCamel(data ?? []) as Response
}

const useAllRecentAvalanchesQuery = (options?: QueryOptions) =>
  useQuery({
    queryFn: fetchAllAvalanches,
    queryKey: forecastsKeys.allAvalanches(),
    ...options,
  })

export default useAllRecentAvalanchesQuery
