import { supabase } from '@data'
import { handleSupabaseError } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import type { AdminForecast, ForecastListItem } from '@domain/types'
import { type Query, useMutation, useQueryClient } from '@tanstack/react-query'

import { ForecastWriteDeniedError } from './errors'
import type { ForecastStatusToggleVariables } from './types'

type ToggleContext = {
  // Cached items are null for a forecast that doesn't exist
  previousItems: [readonly unknown[], AdminForecast | null | undefined][]
  previousRow?: Pick<ForecastListItem, 'publishedAt' | 'status'>
}

// Any cached single-forecast query for this id: [all, regionId?, 'item', { forecastId }]
const isItemOf = (forecastId: number) => (query: Query) =>
  query.queryKey[2] === 'item' &&
  (query.queryKey[3] as { forecastId?: number } | undefined)?.forecastId === forecastId

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
      if (context?.previousRow) patchRow(variables, context.previousRow)

      context?.previousItems.forEach(([queryKey, data]) =>
        queryClient.setQueryData<AdminForecast | null>(queryKey, data),
      )
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

      const itemFilter = {
        predicate: isItemOf(variables.forecastId),
        queryKey: forecastsKeys.all,
      }

      await queryClient.cancelQueries(itemFilter)

      const previousItems = queryClient.getQueriesData<AdminForecast | null>(itemFilter)

      queryClient.setQueriesData<AdminForecast | null>(itemFilter, (forecast) =>
        forecast ? { ...forecast, publishedAt, status: variables.status } : forecast,
      )

      return {
        previousItems,
        previousRow: row && { publishedAt: row.publishedAt, status: row.status },
      }
    },
    // Refreshes `current` (public rule), history and the dashboard. Not awaited, so
    // mutateAsync (and the Undo toast) don't wait for every refetch.
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: forecastsKeys.all })
    },
  })
}

export default useForecastStatusToggle
