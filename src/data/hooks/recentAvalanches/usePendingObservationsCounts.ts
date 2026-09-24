import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { handleSupabaseError } from '../../helpers'

type PendingObservationsCounts = {
  byRegion: Partial<Record<RegionId, number>>
  total: number
}

// External submissions awaiting moderation. The queue is expected to stay near
// empty, so fetching one column per row and counting here is cheap.
const fetchPendingObservationsCounts = async (): Promise<PendingObservationsCounts> => {
  const { data, error } = await supabase
    .from('recent_avalanches')
    .select('region_id')
    .eq('source', 'external')
    .eq('status', 'pending')

  handleSupabaseError(error)

  const byRegion: Partial<Record<RegionId, number>> = {}

  data?.forEach(({ region_id: regionId }) => {
    if (regionId) byRegion[regionId] = (byRegion[regionId] ?? 0) + 1
  })

  return { byRegion, total: data?.length ?? 0 }
}

// New public submissions don't trigger any admin-side mutation — poll so the
// badges notice them without a reload
const refetchIntervalMs = 60 * 1000

const emptyCounts: PendingObservationsCounts = { byRegion: {}, total: 0 }

const usePendingObservationsCounts = () => {
  const { data = emptyCounts } = useQuery({
    queryFn: fetchPendingObservationsCounts,
    queryKey: recentAvalanchesKeys.pendingCounts(),
    refetchInterval: refetchIntervalMs,
  })

  return data
}

export default usePendingObservationsCounts
