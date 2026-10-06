import { recentAvalanchesKeys } from '@data/query-keys'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import requestAdminAvalanche from './requestAdminAvalanche'

import type { CreateAvalancheBody } from '@/api/admin/recent-avalanches/schema'

// Resolves to the new record's id
const createRecentAvalanche = async (body: CreateAvalancheBody) => {
  const { id } = await requestAdminAvalanche('/api/admin/recent-avalanches', 'POST', body)

  if (id === undefined) throw new Error('failed to save avalanche')

  return id
}

const useRecentAvalancheCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<number, Error, CreateAvalancheBody>({
    mutationFn: createRecentAvalanche,
    onSuccess: (_, { regionId }) => {
      queryClient.invalidateQueries({ queryKey: recentAvalanchesKeys.byRegion(regionId) })
    },
  })
}

export default useRecentAvalancheCreate
