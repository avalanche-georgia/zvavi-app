import { cache } from 'react'
import type { HazardLevelScale, Region } from '@domain/types'

import fetchActiveRegions from './fetchActiveRegions'

import { createClient } from '@/lib/supabase/server'

export type RegionWithHazard = Region & { overallHazardLevel: HazardLevelScale | null }

const fetchRegionsWithHazard = cache(async (): Promise<RegionWithHazard[]> => {
  const supabase = await createClient()
  const regions = await fetchActiveRegions()

  if (!regions.length) return []

  const { data: forecasts } = await supabase
    .from('forecasts')
    .select('region_id, hazard_levels')
    .in(
      'region_id',
      regions.map((region) => region.id),
    )
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  const latestByRegion = new Map<string, string | null>()

  for (const forecast of forecasts ?? []) {
    if (!latestByRegion.has(forecast.region_id)) {
      const levels = forecast.hazard_levels as Record<string, string> | null

      latestByRegion.set(forecast.region_id, levels?.overall ?? null)
    }
  }

  return regions.map((region) => ({
    ...region,
    overallHazardLevel: (latestByRegion.get(region.id) ?? null) as HazardLevelScale | null,
  }))
})

export default fetchRegionsWithHazard
