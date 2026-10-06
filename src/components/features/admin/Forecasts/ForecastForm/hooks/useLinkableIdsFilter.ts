import { useLinkableAvalanchesQuery } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'

// New links must point at the region's non-archived records — a record
// archived or deleted after it was picked (or copied by a duplicate) would make
// the save fail. Links the forecast already has are always kept.
const useLinkableIdsFilter = (regionId: RegionId) => {
  const { data: avalanches, isSuccess } = useLinkableAvalanchesQuery({ regionId })

  return (ids: number[], savedIds: number[]) => {
    // Unknown list: send as is and let the save report a problem
    if (!isSuccess) return ids

    const linkableIds = new Set(avalanches.map((avalanche) => avalanche.id))

    return ids.filter((id) => savedIds.includes(id) || linkableIds.has(id))
  }
}

export default useLinkableIdsFilter
