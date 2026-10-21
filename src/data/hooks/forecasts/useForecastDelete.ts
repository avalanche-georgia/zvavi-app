import { supabase } from '@data'
import { forecastsKeys, recentAvalanchesKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { ForecastWriteDeniedError } from './errors'
import type { ForecastDeleteVariables } from './types'
import { handleSupabaseError } from '../../helpers'

const deleteForecast = async ({ forecastId }: ForecastDeleteVariables) => {
  const { data, error } = await supabase
    .from('forecasts')
    .delete()
    .eq('id', forecastId)
    .select('id')

  handleSupabaseError(error)

  if (!data?.length) throw new ForecastWriteDeniedError()
}

// forecastsKeys.item / adminItem(…, { forecastId })
const isForecastQuery = (queryKey: readonly unknown[], forecastId: number) =>
  (queryKey[2] === 'item' || queryKey[2] === 'adminItem') &&
  (queryKey[3] as { forecastId?: number })?.forecastId === forecastId

const useForecastDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, ForecastDeleteVariables>({
    meta: { scope: 'useForecastDelete' },
    mutationFn: deleteForecast,
    onSuccess: (_data, { forecastId }) =>
      // Returned, so the delete resolves only once the list is fresh: its confirmation
      // spins until then, and the toast lands as the row goes
      Promise.all([
        // Not the deleted forecast's own query: refetching it fails, and the page
        // behind the confirmation would flash an error
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => !isForecastQuery(queryKey, forecastId),
          queryKey: forecastsKeys.all,
        }),
        // …only marked stale: the next screen showing it refetches and finds it gone
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => isForecastQuery(queryKey, forecastId),
          queryKey: forecastsKeys.all,
          refetchType: 'none',
        }),
        // Its avalanche links go with it (cascade) — catalog link markers and filter
        queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.all }),
      ]),
  })
}

export default useForecastDelete
