import { supabase } from '@data'
import { attachAvalanchesToForecast, attachDetailsToForecast } from '@data/hooks/forecasts/helpers'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ForecastFormPayload } from './types'
import { convertCamelToSnake, handleSupabaseError } from '../../helpers'
import { forecastsKeys } from '../../query-keys'

const createForecast = async ({
  avalancheProblems,
  forecast,
  recentAvalanches,
}: ForecastFormPayload): Promise<void> => {
  const { data: forecastData, error: forecastError } = await supabase
    .from('forecasts')
    .insert(convertCamelToSnake(forecast))
    .select('id')

  handleSupabaseError(forecastError)

  const forecastId = forecastData?.[0]?.id

  if (!forecastId) throw new Error('Failed to create forecast')

  await Promise.all([
    avalancheProblems.length
      ? attachDetailsToForecast('avalanche_problems', forecastId, avalancheProblems)
      : Promise.resolve(),
    recentAvalanches.length
      ? attachAvalanchesToForecast(forecastId, recentAvalanches)
      : Promise.resolve(),
  ])
}

const useForecastCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ForecastFormPayload>({
    mutationFn: createForecast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forecastsKeys.all })
    },
  })
}

export default useForecastCreate
