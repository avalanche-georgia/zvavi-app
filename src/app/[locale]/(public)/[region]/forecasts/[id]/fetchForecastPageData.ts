import { convertSnakeToCamel } from '@data/helpers'
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

  const [forecastResult, recentAvalanchesResult, avalancheProblemsResult, currentForecastResult] =
    await Promise.all([
      supabase.from('forecasts').select().match({ id: forecastId, status: 'published' }).single(),
      supabase
        .from('recent_avalanches')
        .select('*, forecast_avalanche!inner(forecast_id)')
        .eq('forecast_avalanche.forecast_id', forecastId)
        .order('created_at', { ascending: false }),
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

  if (recentAvalanchesResult.error) {
    console.error('fetchForecastPageData | recent_avalanches query failed', {
      error: recentAvalanchesResult.error,
      forecastId,
    })
    throw new Error(recentAvalanchesResult.error.message)
  }

  if (avalancheProblemsResult.error) {
    console.error('fetchForecastPageData | avalanche_problems query failed', {
      error: avalancheProblemsResult.error,
      forecastId,
    })
    throw new Error(avalancheProblemsResult.error.message)
  }

  const initialForecast = convertSnakeToCamel({
    ...forecastResult.data,
    avalancheProblems: avalancheProblemsResult.data,
    recentAvalanches: recentAvalanchesResult.data,
  }) as FullForecast

  const isCurrentForecast = forecastResult.data.id === currentForecastResult.data?.id

  return { initialForecast, isCurrentForecast }
}
