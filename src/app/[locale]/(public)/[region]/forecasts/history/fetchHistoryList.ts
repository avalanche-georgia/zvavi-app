import { convertSnakeToCamel, handleSupabaseError } from '@data/helpers'
import type { HistoryListItem, RegionId } from '@domain/types'

import 'server-only'
import { createClient } from '@/lib/supabase/server'

// The region's past published forecasts, newest first, with their problems in order.
// A failed load throws to the (public) error boundary — an empty list would read as
// "no forecasts yet".
const fetchHistoryList = async (regionId: RegionId): Promise<HistoryListItem[]> => {
  const supabase = await createClient()
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

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return (convertSnakeToCamel(data ?? []) as HistoryListItem[]).map((forecast) => ({
    ...forecast,
    avalancheProblems: [...forecast.avalancheProblems].sort(
      (problemA, problemB) => problemA.order - problemB.order,
    ),
  }))
}

export default fetchHistoryList
