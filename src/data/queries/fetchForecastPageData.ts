import { convertSnakeToCamel, isNoRowsError } from '@data/helpers'
import fetchPublicForecastAvalanches from '@data/queries/fetchPublicForecastAvalanches'
import type { FullForecast, RegionId } from '@domain/types'

import { reportServerError } from '@/lib/posthog/server'
import { createClient } from '@/lib/supabase/server'

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

type AdjacentForecastParams = {
  createdAt: string
  direction: 'next' | 'previous'
  forecastId: number
  // Legacy rows may have no region
  regionId: RegionId | null
}

// The closest published forecast of the region, created before / after this one.
// Same ordering as the "current forecast" rule (latest created published forecast).
// null: there is none; undefined: the lookup failed.
const fetchAdjacentForecastId = async (
  supabase: SupabaseServerClient,
  { createdAt, direction, forecastId, regionId }: AdjacentForecastParams,
): Promise<number | null | undefined> => {
  if (!regionId) return undefined

  const isNext = direction === 'next'
  const query = supabase
    .from('forecasts')
    .select('id')
    .eq('status', 'published')
    .eq('region_id', regionId)
    .neq('id', forecastId)

  const { data, error } = await (
    isNext ? query.gt('created_at', createdAt) : query.lt('created_at', createdAt)
  )
    .order('created_at', { ascending: isNext })
    .limit(1)
    .maybeSingle()

  if (error) {
    reportServerError(new Error(error.message), {
      forecast_id: forecastId,
      scope: `fetchForecastPageData | ${direction} forecast`,
    })

    return undefined
  }

  return data?.id ?? null
}

export type ForecastPageData = {
  initialForecast: FullForecast
  // No published forecast was created after this one
  isCurrentForecast: boolean
  nextForecastId: number | null
  previousForecastId: number | null
}

type ForecastPageDataOptions = {
  // The caller has just resolved this id as the region's current forecast —
  // skips the lookup of a newer one
  isKnownCurrent?: boolean
}

export const fetchForecastPageData = async (
  forecastId: number,
  { isKnownCurrent = false }: ForecastPageDataOptions = {},
): Promise<ForecastPageData | null> => {
  const supabase = await createClient()

  const [forecastResult, recentAvalanches, avalancheProblemsResult] = await Promise.all([
    supabase.from('forecasts').select().match({ id: forecastId, status: 'published' }).single(),
    fetchPublicForecastAvalanches(forecastId),
    supabase.from('avalanche_problems').select().eq('forecast_id', forecastId).order('order'),
  ])

  if (forecastResult.error && !isNoRowsError(forecastResult.error)) {
    reportServerError(new Error(forecastResult.error.message), {
      forecast_id: forecastId,
      scope: 'fetchForecastPageData | forecasts',
    })
  }

  if (!forecastResult.data) return null

  if (avalancheProblemsResult.error) {
    reportServerError(new Error(avalancheProblemsResult.error.message), {
      forecast_id: forecastId,
      scope: 'fetchForecastPageData | avalanche_problems',
    })

    throw new Error(avalancheProblemsResult.error.message)
  }

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const forecastWithProblems = convertSnakeToCamel({
    ...forecastResult.data,
    avalancheProblems: avalancheProblemsResult.data,
  }) as Omit<FullForecast, 'recentAvalanches'>

  // The forecast's own region — a link with the wrong region in the URL still
  // compares against the right neighbours
  const { created_at: createdAt, region_id: regionId } = forecastResult.data
  const [previousForecastId, nextForecastId] = await Promise.all([
    fetchAdjacentForecastId(supabase, { createdAt, direction: 'previous', forecastId, regionId }),
    isKnownCurrent
      ? null
      : fetchAdjacentForecastId(supabase, { createdAt, direction: 'next', forecastId, regionId }),
  ])

  return {
    initialForecast: { ...forecastWithProblems, recentAvalanches },
    // A failed lookup counts as "not current": better a needless "past forecast"
    // banner than an old forecast passing for today's
    isCurrentForecast: nextForecastId === null,
    nextForecastId: nextForecastId ?? null,
    previousForecastId: previousForecastId ?? null,
  }
}
