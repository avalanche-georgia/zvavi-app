import type { QueryFunction } from '@tanstack/react-query'

import { convertSnakeToCamel } from '@/data/helpers'
import { useQuery } from '@/tanstack-query/hooks'

import type { Forecast } from '@/business/types'
import { supabase } from '@/data'
import { forecastsKeys } from '@/data/query-keys'

type QueryKey = ReturnType<typeof forecastsKeys.list>
type HistoryListResponse = Pick<Forecast, 'publishedAt' | 'id' | 'hazardLevels'>[]

const fetchHistoryList: QueryFunction<HistoryListResponse, QueryKey> = async () => {
  const { data, error } = await supabase
    .from('forecasts')
    .select('id, published_at, hazard_levels')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  console.log('data: ', data)

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
