import type { QueryFunction, UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import type { ForecastsQueryVariables } from './types'
import { convertSnakeToCamel } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

import type { FullForecast } from '@/business/types'
import { supabase } from '@/data'

type QueryKey = ReturnType<typeof forecastsKeys.list>
type ForecastsResponse = FullForecast[]

const fetchForecasts: QueryFunction<ForecastsResponse, QueryKey> = async ({ queryKey }) => {
  const [, , variables] = queryKey

  let query = supabase.from('forecasts').select('*, avalanche_problems(*), recent_avalanches(*)')

  if (variables?.status) {
    query = query.eq('status', variables.status)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return []

  return convertSnakeToCamel<ForecastsResponse>(data)
}

type BaseOptions = Omit<
  UseQueryOptions<ForecastsResponse, Error, ForecastsResponse, QueryKey>,
  'queryKey' | 'queryFn'
>
type QueryOptions = Partial<ForecastsQueryVariables> & BaseOptions

const useForecastsQuery = (options?: QueryOptions) => {
  const { status, ...restOptions } = (options ?? {}) as QueryOptions

  const variables = typeof status === 'undefined' ? undefined : { status }

  return useQuery({
    queryFn: fetchForecasts,
    queryKey: forecastsKeys.list(variables),
    ...restOptions,
  })
}

export default useForecastsQuery
