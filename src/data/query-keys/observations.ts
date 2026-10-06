import type { ObservationDateBasis, ObservationsSort, RegionId } from '@domain/types'

type ObservationFilters = {
  dateBasis: ObservationDateBasis
  dateFrom?: string
  dateTo?: string
  isDateUnknown?: boolean
}

const observationsKeys = {
  all: ['observationsKeys'] as const,

  byRegion: (regionId: RegionId) => [...observationsKeys.all, regionId] as const,
  detail: (regionId: RegionId, id: number) =>
    [...observationsKeys.byRegion(regionId), 'detail', id] as const,
  list: (regionId: RegionId, params: ObservationFilters & { sort: ObservationsSort }) =>
    [...observationsKeys.byRegion(regionId), 'list', params] as const,
  points: (regionId: RegionId, params: ObservationFilters) =>
    [...observationsKeys.byRegion(regionId), 'points', params] as const,
}

export default observationsKeys
