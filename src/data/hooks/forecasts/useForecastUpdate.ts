import { supabase } from '@data'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { attachDetailsToForecast, detachDetailsFromForecast } from './helpers'

import type { ForecastFormPayload } from './types'
import { convertCamelToSnake, handleSupabaseError } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

const updateForecast = async ({
  avalancheProblems,
  forecast,
  recentAvalanches,
}: ForecastFormPayload): Promise<void> => {
  const { error: forecastError } = await supabase
    .from('forecasts')
    .upsert(convertCamelToSnake(forecast))

  handleSupabaseError(forecastError)

  if (!forecast.id) throw new Error('Failed to update forecast')

  // At this stage (MVP) we re-create all problems and avalanches intentionally
  // Delete old avalanche problems and recent avalanches.
  await detachDetailsFromForecast('avalanche_problems', forecast.id)
  await detachDetailsFromForecast('recent_avalanches', forecast.id)

  // Insert new avalanche problems and recent avalanches
  if (avalancheProblems.length) {
    await attachDetailsToForecast('avalanche_problems', forecast.id, avalancheProblems)
  }

  if (recentAvalanches.length) {
    await attachDetailsToForecast('recent_avalanches', forecast.id, recentAvalanches)
  }
}

const useForecastUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ForecastFormPayload>({
    mutationFn: updateForecast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forecastsKeys.all })
    },
  })
}

export default useForecastUpdate
