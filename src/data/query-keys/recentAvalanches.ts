import type { ListFilterParams } from '@data/hooks/recentAvalanches/types'
import type { RegionId } from '@domain/types'

const recentAvalanchesKeys = {
  all: ['recentAvalanchesKeys'] as const,

  byRegion: (regionId: RegionId) => [...recentAvalanchesKeys.all, regionId] as const,
  item: (regionId: RegionId | undefined, id: number) =>
    [...recentAvalanchesKeys.all, regionId, 'item', id] as const,
  list: (regionId: RegionId, params: ListFilterParams) =>
    [...recentAvalanchesKeys.byRegion(regionId), 'list', params] as const,
  pendingCounts: () => [...recentAvalanchesKeys.all, 'pendingCounts'] as const,
  photos: (id: number) => [...recentAvalanchesKeys.all, 'photos', id] as const,
}

export default recentAvalanchesKeys
