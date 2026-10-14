import {
  applyParamEntries,
  pickAllowed,
  readIsoDay,
  readPageIndex,
  writePageIndex,
} from '@components/features/admin/shared'
import type { DateMode } from '@data/hooks/recentAvalanches'
import type { AvalancheSource } from '@domain/types'

import { type CatalogStatus, readCatalogFilters } from './catalogFilters'

export const dateModes = ['occurred', 'created'] as const satisfies readonly DateMode[]

export type AvalanchesListParams = {
  dateFrom: string | null
  dateMode: DateMode
  dateTo: string | null
  // Catalog only — the queue's source and status are fixed, and it can't be linked yet
  isUnlinked: boolean
  pageIndex: number
  source: AvalancheSource | null
  status: CatalogStatus | null
}

// URL → list state; anything unknown falls back to the default
export const readListParams = (
  searchParams: Pick<URLSearchParams, 'get'>,
): AvalanchesListParams => ({
  dateFrom: readIsoDay(searchParams.get('dateFrom')),
  dateMode: pickAllowed(dateModes, searchParams.get('dateMode'), 'occurred'),
  dateTo: readIsoDay(searchParams.get('dateTo')),
  pageIndex: readPageIndex(searchParams.get('page')),
  ...readCatalogFilters(searchParams),
})

// List state → URL. Defaults are left out; other keys in `base` (region, open sheet) are kept.
export const serializeListParams = (params: AvalanchesListParams, base: URLSearchParams) =>
  applyParamEntries(base, {
    dateFrom: params.dateFrom,
    dateMode: params.dateMode === 'occurred' ? null : params.dateMode,
    dateTo: params.dateTo,
    page: writePageIndex(params.pageIndex),
    source: params.source,
    status: params.status,
    unlinked: params.isUnlinked ? '1' : null,
  })
