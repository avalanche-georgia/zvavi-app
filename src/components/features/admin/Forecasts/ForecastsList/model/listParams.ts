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

const isoDayPattern = /^\d{4}-\d{2}-\d{2}$/

const pickAllowed = <T extends string>(allowed: readonly T[], value: string | null, fallback: T) =>
  allowed.includes(value as T) ? (value as T) : fallback

const readIsoDay = (value: string | null) => (value && isoDayPattern.test(value) ? value : null)

export const isSortKey = (value: string): value is SortKey => sortKeys.includes(value as SortKey)

// URL → list state; anything unknown falls back to the default
export const readListParams = (
  searchParams: Pick<URLSearchParams, 'get'>,
): ForecastsListParams => ({
  dateFrom: readIsoDay(searchParams.get('from')),
  dateTo: readIsoDay(searchParams.get('to')),
  desc: searchParams.get('dir') !== 'asc',
  pageIndex: Math.max(1, Math.floor(Number(searchParams.get('page'))) || 1) - 1,
  query: searchParams.get('q') ?? '',
  range: pickAllowed(dateRanges, searchParams.get('range'), 'all'),
  sortKey: pickAllowed(sortKeys, searchParams.get('sort'), 'createdAt'),
  status: pickAllowed(listStatusFilters, searchParams.get('status'), 'all'),
})

// List state → URL. Defaults are left out; other keys in `base` (regionId) are kept.
export const serializeListParams = (params: ForecastsListParams, base: URLSearchParams) => {
  const isCustom = params.range === 'custom'
  const next = new URLSearchParams(base)
  const entries: Record<string, string | null> = {
    dir: params.desc ? null : 'asc',
    from: isCustom ? params.dateFrom : null,
    page: params.pageIndex > 0 ? String(params.pageIndex + 1) : null,
    q: params.query.trim() ? params.query : null,
    range: params.range === 'all' ? null : params.range,
    sort: params.sortKey === 'createdAt' ? null : params.sortKey,
    status: params.status === 'all' ? null : params.status,
    to: isCustom ? params.dateTo : null,
  }

  for (const [key, value] of Object.entries(entries)) {
    if (value === null) next.delete(key)
    else next.set(key, value)
  }

  return next.toString()
}
