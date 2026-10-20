import { convertSnakeToCamel, handleSupabaseError } from '@data/helpers'
import type { PhotoUrls, PublicAvalanche } from '@domain/types'

import { reportServerError } from '@/lib/posthog/server'
import { signPhotoUrls } from '@/lib/r2'
import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// Explicit columns — never `*`: submitter_*, created_by_user_id and
// involvement must not reach public pages
// (one literal, so supabase-js can type the rows)
const publicColumns =
  'id, region_id, date, is_date_unknown, is_time_known, description, size, quantity, latitude, longitude, location, type, trigger, aspects, width, slab_depth, photo_keys, created_at, forecast_avalanche!inner(forecast_id, forecasts!inner(status))'

// One signing pass for all records. A failure costs the photos, not the page.
const signRecordPhotos = async (forecastId: number, keys: string[]) => {
  try {
    return await signPhotoUrls(keys)
  } catch (error) {
    reportServerError(error, {
      forecast_id: forecastId,
      scope: 'fetchPublicForecastAvalanches | signPhotoUrls',
    })

    return new Map<string, PhotoUrls>()
  }
}

// Linked records of a published forecast, as the public sees them: published
// records only, of any source. Service role because anon RLS hides external
// records entirely — server-side only.
const fetchPublicForecastAvalanches = async (forecastId: number): Promise<PublicAvalanche[]> => {
  const supabase = createServiceRoleClient()

  const { data, error } = await supabase
    .from('recent_avalanches')
    .select(publicColumns)
    .eq('forecast_avalanche.forecast_id', forecastId)
    .eq('forecast_avalanche.forecasts.status', 'published')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  handleSupabaseError(error)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const rows = (data ?? []).map(({ forecast_avalanche, ...row }) => row)
  const photoUrls = await signRecordPhotos(
    forecastId,
    rows.flatMap((row) => row.photo_keys ?? []),
  )

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const avalanches = convertSnakeToCamel(rows) as (Omit<PublicAvalanche, 'photos'> & {
    photoKeys: string[] | null
  })[]

  // The keys of the originals stay on the server — the public gets signed URLs only
  return avalanches.map(({ photoKeys, ...avalanche }) => ({
    ...avalanche,
    photos: (photoKeys ?? [])
      .map((key) => photoUrls.get(key))
      .filter((photo) => photo !== undefined),
  }))
}

export default fetchPublicForecastAvalanches
