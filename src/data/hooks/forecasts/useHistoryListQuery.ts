import { supabase } from '@data'
import { convertSnakeToCamel } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import type { Forecast } from '@domain/types'
import type { QueryFunction } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

type QueryKey = ReturnType<typeof forecastsKeys.list>
type HistoryListResponse = Pick<Forecast, 'publishedAt' | 'id' | 'hazardLevels'>[]

const fetchHistoryList: QueryFunction<HistoryListResponse, QueryKey> = async () => {
  const { data, error } = await supabase
    .from('forecasts')
    .select('id, published_at, hazard_levels')
    .eq('status', 'published')
    .lt('valid_until', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return []

  return convertSnakeToCamel(data) as HistoryListResponse
}

const useHistoryListQuery = () =>
  useQuery({
    queryFn: fetchHistoryList,
    queryKey: forecastsKeys.list(),
  })

export default useHistoryListQuery
