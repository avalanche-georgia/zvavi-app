import { recentAvalanchesKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type DeleteAvalanchePayload = { id: number; regionId: RegionId }

// Server route, not a direct delete: the record's photos must go too, and R2
// credentials are server-only
const deleteRecentAvalanche = async ({ id }: DeleteAvalanchePayload): Promise<void> => {
  const response = await fetch(`/api/admin/recent-avalanches/${id}`, { method: 'DELETE' })
  const body = (await response.json()) as { error?: string; ok: boolean }

  if (!response.ok || !body.ok) throw new Error(body.error ?? 'failed to delete avalanche')
}

// recentAvalanchesKeys.item(…, id) or .photos(id)
const isRecordQuery = (queryKey: readonly unknown[], id: number) =>
  (queryKey[2] === 'item' && queryKey[3] === id) || (queryKey[1] === 'photos' && queryKey[2] === id)

const useRecentAvalancheDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, DeleteAvalanchePayload>({
    meta: { scope: 'useRecentAvalancheDelete' },
    mutationFn: deleteRecentAvalanche,
    onSuccess: (_data, { id }) =>
      // Returned, so the delete resolves only once the list is fresh: its confirmation
      // spins until then, and the toast lands as the row goes
      // `all`, not `byRegion`: the pending-review counters must refresh too. Not the
      // deleted record's own queries: refetching them fails, and the sheet behind
      // the confirmation would flash an error.
      Promise.all([
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => !isRecordQuery(queryKey, id),
          queryKey: recentAvalanchesKeys.all,
        }),
        // …only marked stale: the next screen showing it refetches and finds it gone
        queryClient.invalidateQueries({
          predicate: ({ queryKey }) => isRecordQuery(queryKey, id),
          queryKey: recentAvalanchesKeys.all,
          refetchType: 'none',
        }),
      ]),
  })
}

export default useRecentAvalancheDelete
