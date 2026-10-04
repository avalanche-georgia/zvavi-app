import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import type { ForecastListItem } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { ForecastStatusToggleVariables } from './types'

type ToggleContext = { previousForecasts?: ForecastListItem[] }

const toggleStatus = async ({ forecastId, status }: ForecastStatusToggleVariables) => {
  const { data, error } = await supabase
    .from('forecasts')
    .update({ status })
    .eq('id', forecastId)
    .select('id')

  handleSupabaseError(error)

  // RLS hides a blocked update: no error, just no rows
  if (!data?.length) throw new Error('Forecast status was not changed')
}

const useForecastStatusToggle = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ForecastStatusToggleVariables, ToggleContext>({
    mutationFn: toggleStatus,

    onError: (_error, { regionId }, context) => {
      if (!context?.previousForecasts) return
      queryClient.setQueryData(forecastsKeys.adminList(regionId), context.previousForecasts)
    },
    // The row changes at once; the DB trigger sets the real published_at
    onMutate: async ({ forecastId, regionId, status }) => {
      const queryKey = forecastsKeys.adminList(regionId)

      await queryClient.cancelQueries({ queryKey })

      const previousForecasts = queryClient.getQueryData<ForecastListItem[]>(queryKey)
      const publishedAt = status === 'published' ? new Date().toISOString() : null

      queryClient.setQueryData<ForecastListItem[]>(queryKey, (forecasts) =>
        forecasts?.map((forecast) =>
          forecast.id === forecastId ? { ...forecast, publishedAt, status } : forecast,
        ),
      )

      return { previousForecasts }
    },
    // Refreshes `current` (public rule), history and the dashboard. Not awaited, so
    // mutateAsync (and the Undo toast) don't wait for every refetch.
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: forecastsKeys.all })
    },
  })
}

export default useForecastStatusToggle
