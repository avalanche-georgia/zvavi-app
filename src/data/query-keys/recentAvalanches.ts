import type { ListFilterParams } from '@data/hooks/recentAvalanches/types'
import type { RegionId } from '@domain/types'

const recentAvalanchesKeys = {
  all: ['recentAvalanchesKeys'] as const,

  byRegion: (regionId: RegionId) => [...recentAvalanchesKeys.all, regionId] as const,
  item: (regionId: RegionId, id: number) =>
    [...recentAvalanchesKeys.byRegion(regionId), 'item', id] as const,
  list: (regionId: RegionId, params: ListFilterParams) =>
    [...recentAvalanchesKeys.byRegion(regionId), 'list', params] as const,
}

export default recentAvalanchesKeys
