import { supabase } from '@data'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  attachAvalanchesToForecast,
  attachDetailsToForecast,
  detachAvalanchesFromForecast,
  detachDetailsFromForecast,
} from './helpers'

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

  await Promise.all([
    detachDetailsFromForecast('avalanche_problems', forecast.id),
    detachAvalanchesFromForecast(forecast.id),
  ])

  await Promise.all([
    avalancheProblems.length
      ? attachDetailsToForecast('avalanche_problems', forecast.id, avalancheProblems)
      : Promise.resolve(),
    recentAvalanches.length
      ? attachAvalanchesToForecast(forecast.id, recentAvalanches)
      : Promise.resolve(),
  ])
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
