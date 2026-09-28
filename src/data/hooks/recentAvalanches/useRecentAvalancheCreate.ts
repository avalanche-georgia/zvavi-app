import { recentAvalanchesKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import requestAdminAvalanche from './requestAdminAvalanche'

import type { CreateAvalancheBody } from '@/api/admin/recent-avalanches/schema'

const createRecentAvalanche = (body: CreateAvalancheBody) =>
  requestAdminAvalanche('/api/admin/recent-avalanches', 'POST', body)

const useRecentAvalancheCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, CreateAvalancheBody>({
    mutationFn: createRecentAvalanche,
    onSuccess: (_, { regionId }) => {
      queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.byRegion(regionId) })
    },
  })
}

export default useRecentAvalancheCreate
