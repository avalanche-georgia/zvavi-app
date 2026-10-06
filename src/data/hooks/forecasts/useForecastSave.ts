import { supabase } from '@data'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import buildSaveForecastArgs from './buildSaveForecastArgs'
import { ForecastSaveRejectedError } from './errors'
import type { ForecastSavePayload } from './types'
import { handleSupabaseError } from '../../helpers'
import { forecastsKeys, recentAvalanchesKeys } from '../../query-keys'

// Forecast + problems + links in one transaction (save_forecast). Resolves to
// the forecast id — new on the first save.
const saveForecast = async (payload: ForecastSavePayload): Promise<number> => {
  const { data, error } = await supabase.rpc('save_forecast', buildSaveForecastArgs(payload))

  // check_violation from the publish guard: a published forecast's valid_until
  // must stay after its publication time
  if (error?.code === '23514') throw new ForecastSaveRejectedError()

  handleSupabaseError(error)

  if (data == null) throw new Error('Failed to save forecast')

  return data
}

const useForecastSave = () => {
  const queryClient = useQueryClient()

  return useMutation<number, Error, ForecastSavePayload>({
    mutationFn: saveForecast,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forecastsKeys.all })
      // "On N forecasts" counts live on the record queries
      queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.all })
    },
  })
}

export default useForecastSave
