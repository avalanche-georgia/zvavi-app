import { supabase } from '@data'
import { convertSnakeToCamel, handleSupabaseError } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import type { Forecast, Problem, RegionId } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

export type HistoryListItem = Pick<
  Forecast,
  'forecaster' | 'hazardLevels' | 'id' | 'publishedAt' | 'summary' | 'validUntil'
> & { avalancheProblems: Pick<Problem, 'order' | 'type'>[] }

const fetchHistoryList = async (regionId: RegionId): Promise<HistoryListItem[]> => {
  const { data, error } = await supabase
    .from('forecasts')
    .select(
      'id, published_at, valid_until, hazard_levels, summary, forecaster, avalanche_problems(type, order)',
    )
    .eq('status', 'published')
    .eq('region_id', regionId)
    .lt('valid_until', new Date().toISOString())
    .order('published_at', { ascending: false })

  handleSupabaseError(error)

  if (!data) return []

  return (convertSnakeToCamel(data) as HistoryListItem[]).map((forecast) => ({
    ...forecast,
    avalancheProblems: [...forecast.avalancheProblems].sort(
      (problemA, problemB) => problemA.order - problemB.order,
    ),
  }))
}

const useHistoryListQuery = (regionId: RegionId) =>
  useQuery({
    queryFn: () => fetchHistoryList(regionId),
    queryKey: forecastsKeys.list(regionId),
  })

export default useHistoryListQuery
