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

const useRecentAvalancheDelete = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, DeleteAvalanchePayload>({
    mutationFn: deleteRecentAvalanche,
    onSuccess: () => {
      // `all`, not `byRegion`: single-record queries opened without a region
      // (direct links) and the pending-review counters must refresh too
      queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.all })
    },
  })
}

export default useRecentAvalancheDelete
