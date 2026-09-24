import type { ObservationsPage, ObservationsSort } from '@domain/types'

import {
  dateColumns,
  publicColumns,
  type PublicObservationFilters,
  queryPublicObservations,
} from './publicObservationsQuery'
import toPublicObservations from './toPublicObservations'

export type FetchPublicObservationsParams = PublicObservationFilters & {
  limit: number
  offset: number
  sort: ObservationsSort
}

// One page of the list, in display order: newest first (unknown dates last),
// or largest first then newest. created_at + id keep the order stable across pages.
const fetchPublicObservations = async ({
  limit,
  offset,
  sort,
  ...filters
}: FetchPublicObservationsParams): Promise<ObservationsPage> => {
  const dateColumn = dateColumns[filters.dateBasis]

  let query = queryPublicObservations(filters, { columns: publicColumns, isCounted: true })

  if (sort === 'largest') query = query.order('size', { ascending: false })

  const { count, data, error } = await query
    .order(dateColumn, { ascending: false, nullsFirst: false })
    .order('created_at', { ascending: false })
    .order('id', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw new Error(error.message)

  return { observations: await toPublicObservations(data ?? []), total: count ?? 0 }
}

export default fetchPublicObservations
