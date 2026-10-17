import { handleSupabaseError } from '@data/helpers'

import type { BulletinRows } from './toBulletinCandidate'
import toBulletinCandidate from './toBulletinCandidate'

import type { BulletinCandidate } from '@/lib/caaml/buildFeed'
import { createAnonymousClient } from '@/lib/supabase/anonymous'

// Explicit column lists only: never `*`, never `forecaster` or created-by data
const regionColumns = 'id, caaml_region_id, name_en, elevation_low_m, elevation_high_m'
// The problems are embedded so the forecast and its problems come from one
// statement: a forecast unpublished between two queries can't yield a bulletin
// without problems
const forecastColumns =
  'id, region_id, created_at, published_at, valid_until, hazard_levels, summary, snowpack, weather, additional_hazards, avalanche_problems(order, type, avalanche_size, sensitivity, distribution, confidence, trend, aspects, description, time_of_day, is_all_day)'

type Supabase = ReturnType<typeof createAnonymousClient>
type RegionRow = BulletinRows['region']

// Current forecast = latest created_at among published forecasts of the region.
// Keep in sync with useGetCurrentForecast, fetchRegionsWithHazard and
// fetchForecastPageData. `status` is filtered explicitly:
// RLS may let anon read drafts on some environments.
const fetchRegionCandidate = async (supabase: Supabase, region: RegionRow) => {
  const { data: forecasts, error: forecastError } = await supabase
    .from('forecasts')
    .select(forecastColumns)
    .eq('region_id', region.id)
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .order('order', { referencedTable: 'avalanche_problems' })
    .order('id', { referencedTable: 'avalanche_problems' })
    .limit(1)

  handleSupabaseError(forecastError)

  const row = forecasts?.[0]

  if (!row) return null

  const { avalanche_problems: problems, ...forecast } = row

  return toBulletinCandidate({ forecast, problems, region })
}

// Active regions with complete API metadata, each with its current published
// forecast (regions without one are left out). Not cached: the CDN is the only
// cache layer. Throws on any data error.
const fetchPublicBulletinSources = async (): Promise<BulletinCandidate[]> => {
  const supabase = createAnonymousClient()
  const { data: regions, error } = await supabase
    .from('regions')
    .select(regionColumns)
    .eq('is_active', true)
    .not('caaml_region_id', 'is', null)
    .order('display_order')
    .order('id')

  handleSupabaseError(error)

  // Gudauri always has metadata, so no rows means the read itself went wrong
  // (e.g. an RLS change hides them): fail rather than serve an empty feed
  if (!regions?.length) throw new Error('no active region with API metadata is readable')

  const candidates = await Promise.all(
    regions.map((region) => fetchRegionCandidate(supabase, region)),
  )

  return candidates.filter((candidate) => candidate !== null)
}

export default fetchPublicBulletinSources
