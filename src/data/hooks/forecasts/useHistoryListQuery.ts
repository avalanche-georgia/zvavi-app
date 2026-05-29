import { supabase } from '@data'
import { convertSnakeToCamel } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import type { Forecast, RegionId } from '@domain/types'
import type { QueryFunction } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

type QueryKey = ReturnType<typeof forecastsKeys.list>
type HistoryListResponse = Pick<Forecast, 'publishedAt' | 'id' | 'hazardLevels'>[]

const fetchHistoryList: QueryFunction<HistoryListResponse, QueryKey> = async ({ queryKey }) => {
  const [, regionId] = queryKey

  const { data, error } = await supabase
    .from('forecasts')
    .select('id, published_at, hazard_levels')
    .eq('status', 'published')
    .eq('region_id', regionId)
    .lt('valid_until', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return []

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data) as HistoryListResponse
}

const useHistoryListQuery = (regionId: RegionId) =>
  useQuery({
    queryFn: fetchHistoryList,
    queryKey: forecastsKeys.list(regionId),
  })

export default useHistoryListQuery
