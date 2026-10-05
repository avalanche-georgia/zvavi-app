import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import type { ForecastListItem } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ForecastWriteDeniedError } from './errors'
import type { ForecastStatusToggleVariables } from './types'

type ToggleContext = { previousRow?: Pick<ForecastListItem, 'publishedAt' | 'status'> }

const toggleStatus = async ({ forecastId, status }: ForecastStatusToggleVariables) => {
  const { data, error } = await supabase
    .from('forecasts')
    .update({ status })
    .eq('id', forecastId)
    .select('id')

  handleSupabaseError(error)

  if (!data?.length) throw new ForecastWriteDeniedError()
}

const useForecastStatusToggle = () => {
  const queryClient = useQueryClient()

  const patchRow = (
    { forecastId, regionId }: ForecastStatusToggleVariables,
    patch: Pick<ForecastListItem, 'publishedAt' | 'status'>,
  ) =>
    queryClient.setQueryData<ForecastListItem[]>(forecastsKeys.adminList(regionId), (forecasts) =>
      forecasts?.map((forecast) =>
        forecast.id === forecastId ? { ...forecast, ...patch } : forecast,
      ),
    )

  return useMutation<void, Error, ForecastStatusToggleVariables, ToggleContext>({
    mutationFn: toggleStatus,

    // Only this row goes back — other rows may have their own changes in flight
    onError: (_error, variables, context) => {
      if (!context?.previousRow) return
      patchRow(variables, context.previousRow)
    },

    // The row changes at once; the DB trigger sets the real published_at
    onMutate: async (variables) => {
      const queryKey = forecastsKeys.adminList(variables.regionId)

      await queryClient.cancelQueries({ queryKey })

      const row = queryClient
        .getQueryData<ForecastListItem[]>(queryKey)
        ?.find(({ id }) => id === variables.forecastId)
      const publishedAt = variables.status === 'published' ? new Date().toISOString() : null

      patchRow(variables, { publishedAt, status: variables.status })

      return { previousRow: row && { publishedAt: row.publishedAt, status: row.status } }
    },
    // Refreshes `current` (public rule), history and the dashboard. Not awaited, so
    // mutateAsync (and the Undo toast) don't wait for every refetch.
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: forecastsKeys.all })
    },
  })
}

export default useForecastStatusToggle
