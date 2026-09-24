'use client'

import { useEffect, useState } from 'react'
import type { RegionId } from '@domain/types'

import {
  type PendingOwnReport,
  readPendingOwnReports,
  writePendingOwnReports,
} from '../helpers/pendingOwnReports'

// This browser's own reports still under review in the region. One that shows
// up among the published ones has been approved and is dropped from storage.
const usePendingOwnReports = (regionId: RegionId, publishedIds: number[]) => {
  // Loaded after mount — storage doesn't exist during server rendering
  const [storedReports, setStoredReports] = useState<PendingOwnReport[]>([])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStoredReports(readPendingOwnReports())
  }, [])

  const approvedIds = storedReports
    .filter(({ id }) => publishedIds.includes(id))
    .map(({ id }) => id)
    .join()

  useEffect(() => {
    if (!approvedIds) return

    const approved = new Set(approvedIds.split(',').map(Number))

    writePendingOwnReports(readPendingOwnReports().filter(({ id }) => !approved.has(id)))
  }, [approvedIds])

  return storedReports.filter(
    ({ id, regionId: reportRegionId }) => reportRegionId === regionId && !publishedIds.includes(id),
  )
}

export default usePendingOwnReports
