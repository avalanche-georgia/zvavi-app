import { useMemo } from 'react'
import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { handleSupabaseError } from '../../helpers'

type PendingObservationsSummary = {
  byRegion: Partial<Record<RegionId, number>>
  // Most recent submission still waiting
  latest: { createdAt: string; regionId: RegionId | null } | null
  total: number
}

// External submissions awaiting moderation. The queue is expected to stay near
// empty, so fetching two columns per row and counting here is cheap.
const fetchPendingObservationsSummary = async (): Promise<PendingObservationsSummary> => {
  const { data, error } = await supabase
    .from('recent_avalanches')
    .select('region_id, created_at')
    .eq('source', 'external')
    .eq('status', 'pending')
    .order('created_at', { ascending: false })

  handleSupabaseError(error)

  const byRegion: Partial<Record<RegionId, number>> = {}

  data?.forEach(({ region_id: regionId }) => {
    if (regionId) byRegion[regionId] = (byRegion[regionId] ?? 0) + 1
  })

  const latestRow = data?.[0]
  const latest = latestRow
    ? { createdAt: latestRow.created_at, regionId: latestRow.region_id }
    : null

  return { byRegion, latest, total: data?.length ?? 0 }
}

// New public submissions don't trigger any admin-side mutation — poll so the
// badges notice them without a reload
const refetchIntervalMs = 60 * 1000

const emptySummary: PendingObservationsSummary = { byRegion: {}, latest: null, total: 0 }

const usePendingObservationsSummary = () => {
  const {
    data = emptySummary,
    isError,
    isPending,
  } = useQuery({
    queryFn: fetchPendingObservationsSummary,
    queryKey: recentAvalanchesKeys.pendingSummary(),
    refetchInterval: refetchIntervalMs,
  })

  // A failed fetch falls back to empty data — `isError` lets callers avoid
  // presenting that as "nothing waiting"
  return useMemo(() => ({ ...data, isError, isPending }), [data, isError, isPending])
}

export default usePendingObservationsSummary
