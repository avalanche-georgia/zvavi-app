import type { RegionId } from '@domain/types'

import type { ServerClient } from '@/lib/auth/requireStaff'
import { reportServerError } from '@/lib/posthog/server'

type SitemapForecast = { id: number; publishedAt: string | null; regionId: RegionId }

// Supabase returns at most 1000 rows a request
const pageSize = 1000

// Every published forecast of the active regions, newest first, page by page
const fetchSitemapForecasts = async (
  supabase: ServerClient,
  regionIds: RegionId[],
): Promise<SitemapForecast[]> => {
  const forecasts: SitemapForecast[] = []

  if (!regionIds.length) return forecasts

  for (let from = 0; ; from += pageSize) {
    const { data, error } = await supabase
      .from('forecasts')
      .select('id, published_at, region_id')
      .eq('status', 'published')
      .in('region_id', regionIds)
      .order('published_at', { ascending: false })
      .order('id', { ascending: false })
      .range(from, from + pageSize - 1)

    if (error) {
      reportServerError(new Error(error.message), { scope: 'sitemap | forecasts' })

      return forecasts
    }

    forecasts.push(
      ...data.map((forecast) => ({
        id: forecast.id,
        publishedAt: forecast.published_at,
        regionId: forecast.region_id,
      })),
    )

    if (data.length < pageSize) return forecasts
  }
}

export default fetchSitemapForecasts
