import { recentAvalanchesKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'
import { useQueries } from '@tanstack/react-query'

import type { DateMode } from './types'
import { fetchPaginatedAvalanches } from './useRecentAvalanchesPaginatedQuery'

type Region = { id: RegionId }

type Params = {
  dateFrom?: string
  dateMode?: DateMode
}

const useAvalanchesPerRegion = (regions: Region[], params: Params = {}) => {
  const { dateFrom, dateMode = 'created' } = params

  return useQueries({
    queries: regions.map((region) => ({
      queryFn: () =>
        fetchPaginatedAvalanches({ dateFrom, dateMode, page: 1, pageSize: 1, regionId: region.id }),
      queryKey: recentAvalanchesKeys.list(region.id, { dateFrom, dateMode, page: 1, pageSize: 1 }),
    })),
  })
}

export default useAvalanchesPerRegion
