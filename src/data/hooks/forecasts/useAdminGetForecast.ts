import { supabase } from '@data'
import type { FullForecast, RegionId } from '@domain/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

type QueryKey = ReturnType<typeof forecastsKeys.item>
type Response = FullForecast | undefined

type QueryOptions = Omit<
  UseQueryOptions<Response, unknown, Response, QueryKey>,
  'queryKey' | 'queryFn'
> & {
  forecastId: FullForecast['id']
  regionId?: RegionId
}

const fetchForecast = async (forecastId: number, regionId?: RegionId): Promise<Response> => {
  let query = supabase.from('forecasts').select().eq('id', forecastId)

  if (regionId) {
    query = query.eq('region_id', regionId)
  }

  const { data: forecastData, error: forecastError } = await query.single()

  if (forecastError) {
    throw new Error(forecastError.message)
  }

  if (!forecastData) return undefined

  const { data: recentAvalanches, error: avalanchesError } = await supabase
    .from('recent_avalanches')
    .select('*, forecast_avalanche!inner(forecast_id)')
    .eq('forecast_avalanche.forecast_id', forecastId)
    .order('created_at', { ascending: false })

  if (avalanchesError) {
    throw new Error(avalanchesError.message)
  }

  const { data: problems, error: problemsError } = await supabase
    .from('avalanche_problems')
    .select()
    .eq('forecast_id', forecastId)
    .order('order')

  if (problemsError) {
    throw new Error(problemsError.message)
  }

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel({
    ...forecastData,
    avalancheProblems: problems ?? [],
    recentAvalanches: recentAvalanches ?? [],
  }) as Response
}

const useAdminGetForecast = ({ forecastId, regionId, ...options }: QueryOptions) =>
  useQuery({
    queryFn: () => fetchForecast(forecastId, regionId),
    queryKey: forecastsKeys.item(regionId, { forecastId }),
    ...options,
  })

export default useAdminGetForecast
