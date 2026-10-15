import type { RegionId } from '@domain/types'

import { reportServerError } from '@/lib/posthog/server'
import { createClient } from '@/lib/supabase/server'

// The public "current forecast" rule: latest created published forecast in the region.
// fetchLatestPublishedForecast (also behind the home page) and the client's fetchCurrentForecast
// (useGetCurrentForecast) use the same rule — keep them in sync.
const fetchCurrentForecastId = async (regionId: RegionId): Promise<number | null> => {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('forecasts')
    .select('id')
    .eq('status', 'published')
    .eq('region_id', regionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    reportServerError(new Error(error.message), {
      region_id: regionId,
      scope: 'fetchCurrentForecastId',
    })

    // Not "no forecast published" — let the error page say something went wrong
    throw new Error(error.message)
  }

  return data?.id ?? null
}

export default fetchCurrentForecastId
