import { supabase } from '@data'
import type { Forecast, FullForecast } from '@domain/types'
import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

type QueryKey = ReturnType<typeof forecastsKeys.current>
type Response = Forecast | FullForecast | undefined

const fetchCurrentForecast = async ({
  queryKey,
}: QueryFunctionContext<QueryKey>): Promise<Response> => {
  const [, , variables] = queryKey

  // Get latest published forecast
  const { data: forecastData, error: forecastError } = await supabase
    .from('forecasts')
    .select()
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(1)

  if (forecastError) {
    throw new Error(forecastError.message)
  }

  if (!forecastData || forecastData.length === 0) return undefined

  const currentForecast = forecastData[0]

  if (variables.isShort) {
    return convertSnakeToCamel(currentForecast) as Forecast
  }

  const { data: recentAvalanches, error: avalanchesError } = await supabase
    .from('recent_avalanches')
    .select()
    .match({ forecast_id: currentForecast.id })
    .order('date', { ascending: false })

  if (avalanchesError) {
    throw new Error(avalanchesError.message)
  }

  const { data: problems, error: problemsError } = await supabase
    .from('avalanche_problems')
    .select()
    .match({ forecast_id: currentForecast.id })

  if (problemsError) {
    throw new Error(problemsError.message)
  }

  return convertSnakeToCamel({
    ...currentForecast,
    avalancheProblems: problems ?? [],
    recentAvalanches: recentAvalanches ?? [],
  }) as Response
}

type QueryOptions = Omit<
  UseQueryOptions<Response, unknown, Response, QueryKey>,
  'queryKey' | 'queryFn'
> & { isShort?: boolean }

function useGetCurrentForecast(
  options: { isShort: true } & Partial<QueryOptions>,
): ReturnType<typeof useQuery<Forecast | undefined>>

function useGetCurrentForecast(
  options?: { isShort?: false } & Partial<QueryOptions>,
): ReturnType<typeof useQuery<FullForecast | undefined>>

function useGetCurrentForecast({ isShort = false, ...options }: Partial<QueryOptions> = {}) {
  return useQuery({
    queryFn: fetchCurrentForecast,
    queryKey: forecastsKeys.current({ isShort }),
    ...options,
  })
}

export default useGetCurrentForecast
