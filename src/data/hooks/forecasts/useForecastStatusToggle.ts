import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ForecastStatusToggleVariables } from './types'

const toggleStatus = async ({
  forecastId,
  status,
}: ForecastStatusToggleVariables): Promise<void> => {
  const { error } = await supabase.from('forecasts').update({ status }).eq('id', forecastId)

  handleSupabaseError(error)
}

const useForecastStatusToggle = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ForecastStatusToggleVariables>({
    mutationFn: toggleStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: forecastsKeys.list() })
    },
  })
}

export default useForecastStatusToggle
