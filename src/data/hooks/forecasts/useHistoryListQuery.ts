import { supabase } from '@data'
import { convertSnakeToCamel, handleSupabaseError } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import type { Forecast, RegionId } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

type HistoryListItem = Pick<Forecast, 'hazardLevels' | 'id' | 'publishedAt' | 'validUntil'>

const fetchHistoryList = async (regionId: RegionId): Promise<HistoryListItem[]> => {
  const { data, error } = await supabase
    .from('forecasts')
    .select('id, published_at, hazard_levels, valid_until')
    .eq('status', 'published')
    .eq('region_id', regionId)
    .lt('valid_until', new Date().toISOString())
    .order('published_at', { ascending: false })

  handleSupabaseError(error)

  if (!data) return []

  return convertSnakeToCamel(data) as HistoryListItem[]
}

const useHistoryListQuery = (regionId: RegionId) =>
  useQuery({
    queryFn: () => fetchHistoryList(regionId),
    queryKey: forecastsKeys.list(regionId),
  })

export default useHistoryListQuery
