import { supabase } from '@data'
import type { Forecast, FullForecast, RegionId } from '@domain/types'
import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

type QueryKey = ReturnType<typeof forecastsKeys.current>
type Response = Forecast | FullForecast | undefined

const fetchCurrentForecast = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<Response> => {
  const [, regionId, , variables] = queryKey

  const { data: forecastData, error: forecastError } = await supabase
    .from('forecasts')
    .select()
    .eq('status', 'published')
    .eq('region_id', regionId)
    .order('created_at', { ascending: false })
    .limit(1)

  if (forecastError) {
    throw new Error(forecastError.message)
  }

  if (!forecastData || forecastData.length === 0) return undefined

  const currentForecast = forecastData[0]

  if (variables.isShort) {
    // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
    return convertSnakeToCamel(currentForecast) as Forecast
  }

  const { data: recentAvalanches, error: avalanchesError } = await supabase
    .from('recent_avalanches')
    .select('*, forecast_avalanche!inner(forecast_id)')
    .eq('forecast_avalanche.forecast_id', currentForecast.id)
    .order('created_at', { ascending: false })

  if (avalanchesError) {
    throw new Error(avalanchesError.message)
  }

  const { data: problems, error: problemsError } = await supabase
    .from('avalanche_problems')
    .select()
    .match({ forecast_id: currentForecast.id })
    .order('order')

  if (problemsError) {
    throw new Error(problemsError.message)
  }

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel({
    ...currentForecast,
    avalancheProblems: problems ?? [],
    recentAvalanches: recentAvalanches ?? [],
  }) as Response
}

type QueryOptions = Omit<
  UseQueryOptions<Response, unknown, Response, QueryKey>,
  'queryKey' | 'queryFn'
> & { isShort?: boolean; regionId: RegionId }

function useGetCurrentForecast(
  options: { isShort: true; regionId: RegionId } & Partial<QueryOptions>,
): ReturnType<typeof useQuery<Forecast | undefined>>

function useGetCurrentForecast(
  options: { isShort?: false; regionId: RegionId } & Partial<QueryOptions>,
): ReturnType<typeof useQuery<FullForecast | undefined>>

function useGetCurrentForecast({ isShort = false, regionId, ...options }: QueryOptions) {
  return useQuery({
    queryFn: fetchCurrentForecast,
    queryKey: forecastsKeys.current(regionId, { isShort }),
    ...options,
  })
}

export default useGetCurrentForecast
