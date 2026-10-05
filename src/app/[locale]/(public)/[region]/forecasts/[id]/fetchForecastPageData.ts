import { convertSnakeToCamel } from '@data/helpers'
import fetchPublicForecastAvalanches from '@data/queries/fetchPublicForecastAvalanches'
import type { FullForecast, RegionId } from '@domain/types'

import { createClient } from '@/lib/supabase/server'

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

// Same rule as fetchCurrentForecast: latest created published forecast in the region
const requestCurrentForecastId = (supabase: SupabaseServerClient, regionId: RegionId) =>
  supabase
    .from('forecasts')
    .select('id')
    .eq('status', 'published')
    .eq('region_id', regionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

type ForecastPageData = {
  initialForecast: FullForecast
  isCurrentForecast: boolean
}

export const fetchForecastPageData = async (
  forecastId: number,
  regionId: RegionId,
): Promise<ForecastPageData | null> => {
  const supabase = await createClient()

  const [forecastResult, recentAvalanches, avalancheProblemsResult, currentForecastResult] =
    await Promise.all([
      supabase.from('forecasts').select().match({ id: forecastId, status: 'published' }).single(),
      fetchPublicForecastAvalanches(forecastId),
      supabase.from('avalanche_problems').select().eq('forecast_id', forecastId).order('order'),
      // Usually the forecast's own region; checked below
      requestCurrentForecastId(supabase, regionId),
    ])

  if (!forecastResult.data) return null

  if (avalancheProblemsResult.error) {
    console.error('fetchForecastPageData | avalanche_problems query failed', {
      error: avalancheProblemsResult.error,
      forecastId,
    })
    throw new Error(avalancheProblemsResult.error.message)
  }

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  const forecastWithProblems = convertSnakeToCamel({
    ...forecastResult.data,
    avalancheProblems: avalancheProblemsResult.data,
  }) as Omit<FullForecast, 'recentAvalanches'>

  const initialForecast: FullForecast = { ...forecastWithProblems, recentAvalanches }

  // A link with the wrong region in the URL still compares against the forecast's own region
  const forecastRegionId = forecastResult.data.region_id
  const currentForecastId =
    forecastRegionId && forecastRegionId !== regionId
      ? (await requestCurrentForecastId(supabase, forecastRegionId)).data?.id
      : currentForecastResult.data?.id

  const isCurrentForecast = forecastResult.data.id === currentForecastId

  return { initialForecast, isCurrentForecast }
}
