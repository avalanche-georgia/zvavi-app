import { supabase } from '@data'
import { forecastsKeys } from '@data/query-keys'
import type { Forecast } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { handleSupabaseError } from '../../helpers'

const deleteForecast = async (id: Forecast['id']) => {
  const { data, error } = await supabase.from('forecasts').delete().eq('id', id).select('id')

  handleSupabaseError(error)

  // RLS hides a blocked delete (trainee, protected row): no error, just no rows
  if (!data?.length) throw new Error('Forecast was not deleted')
}

const useForecastDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, Forecast['id']>({
    mutationFn: deleteForecast,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: forecastsKeys.all })
    },
  })
}

export default useForecastDelete
