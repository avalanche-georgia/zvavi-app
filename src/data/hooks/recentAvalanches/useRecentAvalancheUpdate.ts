import { recentAvalanchesKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import requestAdminAvalanche from './requestAdminAvalanche'

import type { UpdateAvalancheBody } from '@/api/admin/recent-avalanches/schema'

// Any subset of fields; `photos` only when the photo set changed
type UpdatePayload = UpdateAvalancheBody & { id: number }

const updateRecentAvalanche = ({ id, ...body }: UpdatePayload) =>
  requestAdminAvalanche(`/api/admin/recent-avalanches/${id}`, 'PATCH', body)

const useRecentAvalancheUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdatePayload>({
    mutationFn: updateRecentAvalanche,
    onSuccess: () => {
      // `all`, not `byRegion`: single-record queries opened without a region
      // (direct links) and the pending-review counters must refresh too
      queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.all })
    },
  })
}

export default useRecentAvalancheUpdate
