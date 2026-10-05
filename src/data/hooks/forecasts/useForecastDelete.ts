import { supabase } from '@data'
import { forecastsKeys } from '@data/query-keys'
import type { ForecastListItem } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ForecastWriteDeniedError } from './errors'
import type { ForecastDeleteVariables } from './types'
import { handleSupabaseError } from '../../helpers'

type DeleteContext = { previousForecasts?: ForecastListItem[] }

const deleteForecast = async ({ forecastId }: ForecastDeleteVariables) => {
  const { data, error } = await supabase
    .from('forecasts')
    .delete()
    .eq('id', forecastId)
    .select('id')

  handleSupabaseError(error)

  if (!data?.length) throw new ForecastWriteDeniedError()
}

const useForecastDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ForecastDeleteVariables, DeleteContext>({
    mutationFn: deleteForecast,

    onError: (_error, { regionId }, context) => {
      if (!context?.previousForecasts) return
      queryClient.setQueryData(forecastsKeys.adminList(regionId), context.previousForecasts)
    },
    // The row leaves the list at once, so it can't be deleted twice
    onMutate: async ({ forecastId, regionId }) => {
      const queryKey = forecastsKeys.adminList(regionId)

      await queryClient.cancelQueries({ queryKey })

      const previousForecasts = queryClient.getQueryData<ForecastListItem[]>(queryKey)

      queryClient.setQueryData<ForecastListItem[]>(queryKey, (forecasts) =>
        forecasts?.filter(({ id }) => id !== forecastId),
      )

      return { previousForecasts }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: forecastsKeys.all })
    },
  })
}

export default useForecastDelete
