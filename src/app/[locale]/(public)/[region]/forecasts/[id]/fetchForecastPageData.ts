import { convertSnakeToCamel } from '@data/helpers'
import fetchPublicForecastAvalanches from '@data/queries/fetchPublicForecastAvalanches'
import type { FullForecast } from '@domain/types'

import { createClient } from '@/lib/supabase/server'

type ForecastPageData = {
  initialForecast: FullForecast
  isCurrentForecast: boolean
}

export const fetchForecastPageData = async (
  forecastId: number,
): Promise<ForecastPageData | null> => {
  const supabase = await createClient()

  const [forecastResult, recentAvalanches, avalancheProblemsResult, currentForecastResult] =
    await Promise.all([
      supabase.from('forecasts').select().match({ id: forecastId, status: 'published' }).single(),
      fetchPublicForecastAvalanches(forecastId),
      supabase.from('avalanche_problems').select().eq('forecast_id', forecastId).order('order'),
      supabase
        .from('forecasts')
        .select('id')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .limit(1)
        .single(),
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

  const isCurrentForecast = forecastResult.data.id === currentForecastResult.data?.id

  return { initialForecast, isCurrentForecast }
}
