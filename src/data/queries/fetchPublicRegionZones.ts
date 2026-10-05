import { handleSupabaseError } from '@data/helpers'

import type { RegionZoneSource } from '@/lib/caaml/geojson'
import { createAnonymousClient } from '@/lib/supabase/anonymous'

// Active regions with complete API metadata and their forecast zone. The zone
// is passed through untouched (convertSnakeToCamel would rewrite GeoJSON keys).
const fetchPublicRegionZones = async (): Promise<RegionZoneSource[]> => {
  const { data, error } = await createAnonymousClient()
    .from('regions')
    .select('id, caaml_region_id, name_en, forecast_zone')
    .eq('is_active', true)
    .not('caaml_region_id', 'is', null)
    .not('name_en', 'is', null)
    .order('display_order')

  handleSupabaseError(error)

  return (data ?? []).flatMap(
    ({ caaml_region_id: caamlRegionId, forecast_zone: forecastZone, id, name_en: nameEn }) =>
      caamlRegionId && nameEn ? [{ caamlRegionId, forecastZone, id, nameEn }] : [],
  )
}

export default fetchPublicRegionZones
