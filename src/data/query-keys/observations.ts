import type { RegionId } from '@domain/types'

const observationsKeys = {
  all: ['observationsKeys'] as const,

  byRegion: (regionId: RegionId) => [...observationsKeys.all, regionId] as const,
  list: (regionId: RegionId, params: { dateFrom?: string; dateTo?: string }) =>
    [...observationsKeys.byRegion(regionId), 'list', params] as const,
}

export default observationsKeys
