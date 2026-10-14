import { convertSnakeToCamel } from '@data/helpers'
import type { Forecast, RegionId } from '@domain/types'

import { reportServerError } from '@/lib/posthog/server'
import { createClient } from '@/lib/supabase/server'

// The public "current forecast" rule: latest created published forecast in the region.
// fetchCurrentForecastId, fetchRegionsWithHazard and the client's fetchCurrentForecast
// (useGetCurrentForecast) use the same rule — keep them in sync.
const fetchLatestPublishedForecast = async (regionId: RegionId): Promise<Forecast | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('forecasts')
    .select()
    .eq('status', 'published')
    .eq('region_id', regionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    reportServerError(new Error(error.message), {
      region_id: regionId,
      scope: 'fetchLatestPublishedForecast',
    })

    // Not "no forecast published" — let the error page say something went wrong
    throw new Error(error.message)
  }

  if (!data) return null

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data) as Forecast
}

export default fetchLatestPublishedForecast
