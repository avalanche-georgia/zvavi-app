import type { ObservationDateBasis, RegionId } from '@domain/types'

import { createServiceRoleClient } from '@/lib/supabase/serviceRole'

// Explicit column lists — never `select('*')` here. submitter_contact,
// submitter_education, created_by_user_id, and involvement (internal-only,
// see its "(internal)" label on the admin form) must never reach these
// public-facing endpoints (see recent_avalanches RLS: anon can't read
// external rows directly, these routes are the only path to them).
export const publicColumns =
  'id, region_id, date, is_date_unknown, description, size, quantity, latitude, ' +
  'longitude, type, trigger, aspects, width, slab_depth, photo_keys, ' +
  'submitter_name, created_at'

export const pointColumns = 'id, latitude, longitude, size, type'

export const dateColumns: Record<ObservationDateBasis, 'created_at' | 'date'> = {
  occurred: 'date',
  reported: 'created_at',
}

export type PublicObservationFilters = {
  dateBasis: ObservationDateBasis
  dateFrom?: string
  dateTo?: string
  regionId: RegionId
}

type QueryOptions = {
  columns: string
  // Adds the total number of matching rows to the response
  isCounted?: boolean
}

// Published public observations of a region, narrowed by the date filter.
// Callers add ordering / paging.
export const queryPublicObservations = (
  { dateBasis, dateFrom, dateTo, regionId }: PublicObservationFilters,
  { columns, isCounted = false }: QueryOptions,
) => {
  const dateColumn = dateColumns[dateBasis]

  let query = createServiceRoleClient()
    .from('recent_avalanches')
    .select(columns, isCounted ? { count: 'exact' } : undefined)
    .eq('source', 'external')
    .eq('status', 'published')
    .eq('region_id', regionId)

  // A date range can only match observations whose date is actually known
  if (dateBasis === 'occurred' && (dateFrom || dateTo)) query = query.eq('is_date_unknown', false)
  if (dateFrom) query = query.gte(dateColumn, dateFrom)
  if (dateTo) query = query.lte(dateColumn, dateTo)

  return query
}
