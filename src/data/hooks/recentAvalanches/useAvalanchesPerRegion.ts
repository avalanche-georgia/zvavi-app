import { recentAvalanchesKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'
import { useQueries } from '@tanstack/react-query'

import type { DateMode, ListFilterParams } from './types'
import { fetchPaginatedAvalanches } from './useRecentAvalanchesPaginatedQuery'

type Region = { id: RegionId }

type Params = {
  dateFrom?: string
  dateMode?: DateMode
}

const useAvalanchesPerRegion = (regions: Region[], params: Params = {}) => {
  const { dateFrom, dateMode = 'created' } = params
  // Submissions awaiting moderation aren't part of the catalog yet
  const listParams = {
    dateFrom,
    dateMode,
    excludeStatus: 'pending',
    page: 1,
    pageSize: 1,
  } satisfies ListFilterParams

  return useQueries({
    queries: regions.map((region) => ({
      queryFn: () => fetchPaginatedAvalanches({ ...listParams, regionId: region.id }),
      queryKey: recentAvalanchesKeys.list(region.id, listParams),
    })),
  })
}

export default useAvalanchesPerRegion
