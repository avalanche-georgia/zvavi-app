import { supabase } from '@data'
import type { FullForecast } from '@domain/types'
import type { QueryFunctionContext, UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

type QueryKey = ReturnType<typeof forecastsKeys.item>
type Response = FullForecast | undefined

type QueryOptions = Omit<
  UseQueryOptions<Response, unknown, Response, QueryKey>,
  'queryKey' | 'queryFn'
> & { forecastId: FullForecast['id'] }

const fetchForecast = async ({ queryKey }: QueryFunctionContext<QueryKey>): Promise<Response> => {
  const [, , variables] = queryKey

  const { data: forecastData, error: forecastError } = await supabase
    .from('forecasts')
    .select()
    .match({ id: variables.forecastId, status: 'published' })
    .single()

  if (forecastError) {
    throw new Error(forecastError.message)
  }

  if (!forecastData) return undefined

  const { data: recentAvalanches, error: avalanchesError } = await supabase
    .from('recent_avalanches')
    .select()
    .match({ forecast_id: variables.forecastId })
    .order('date', { ascending: false })

  if (avalanchesError) {
    throw new Error(avalanchesError.message)
  }

  const { data: problems, error: problemsError } = await supabase
    .from('avalanche_problems')
    .select()
    .match({ forecast_id: variables.forecastId })

  if (problemsError) {
    throw new Error(problemsError.message)
  }

  return convertSnakeToCamel({
    ...forecastData,
    avalancheProblems: problems ?? [],
    recentAvalanches: recentAvalanches ?? [],
  }) as Response
}

const useGetForecast = ({ forecastId, ...options }: QueryOptions) => {
  return useQuery({
    queryFn: fetchForecast,
    queryKey: forecastsKeys.item({ forecastId }),
    ...options,
  })
}

export default useGetForecast
