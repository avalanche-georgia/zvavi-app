import {
  applyParamEntries,
  pickAllowed,
  readIsoDay,
  readPageIndex,
  writePageIndex,
} from '@components/features/admin/shared'

export const listStatusFilters = ['all', 'published', 'draft'] as const
export const dateRanges = ['all', 'last30', 'season', 'custom'] as const
export const sortKeys = ['createdAt', 'validUntil', 'hazard'] as const

export type ListStatusFilter = (typeof listStatusFilters)[number]
export type DateRange = (typeof dateRanges)[number]
export type SortKey = (typeof sortKeys)[number]

export type ForecastsListParams = {
  dateFrom: string | null
  dateTo: string | null
  desc: boolean
  pageIndex: number
  query: string
  range: DateRange
  sortKey: SortKey
  status: ListStatusFilter
}

export const isSortKey = (value: string): value is SortKey => sortKeys.includes(value as SortKey)

// URL → list state; anything unknown falls back to the default
export const readListParams = (
  searchParams: Pick<URLSearchParams, 'get'>,
): ForecastsListParams => ({
  dateFrom: readIsoDay(searchParams.get('from')),
  dateTo: readIsoDay(searchParams.get('to')),
  desc: searchParams.get('dir') !== 'asc',
  pageIndex: readPageIndex(searchParams.get('page')),
  query: searchParams.get('q') ?? '',
  range: pickAllowed(dateRanges, searchParams.get('range'), 'all'),
  sortKey: pickAllowed(sortKeys, searchParams.get('sort'), 'createdAt'),
  status: pickAllowed(listStatusFilters, searchParams.get('status'), 'all'),
})

// List state → URL. Defaults are left out; other keys in `base` (regionId) are kept.
export const serializeListParams = (params: ForecastsListParams, base: URLSearchParams) => {
  const isCustom = params.range === 'custom'

  return applyParamEntries(base, {
    dir: params.desc ? null : 'asc',
    from: isCustom ? params.dateFrom : null,
    page: writePageIndex(params.pageIndex),
    q: params.query.trim() ? params.query : null,
    range: params.range === 'all' ? null : params.range,
    sort: params.sortKey === 'createdAt' ? null : params.sortKey,
    status: params.status === 'all' ? null : params.status,
    to: isCustom ? params.dateTo : null,
  })
}
