import {
  applyParamEntries,
  pickAllowed,
  readPageIndex,
  writePageIndex,
} from '@components/features/admin/shared'

export const statusFilters = ['all', 'active', 'inactive'] as const
export const sortKeys = ['name', 'tier'] as const

export type StatusFilter = (typeof statusFilters)[number]
export type SortKey = (typeof sortKeys)[number]

// The list opens on the partners the public site shows
const defaultStatus: StatusFilter = 'active'

export type PartnersListParams = {
  desc: boolean
  pageIndex: number
  query: string
  sortKey: SortKey
  status: StatusFilter
}

export const isSortKey = (value: string): value is SortKey => sortKeys.includes(value as SortKey)

// URL → list state; anything unknown falls back to the default (active, by name, A → Z)
export const readListParams = (searchParams: Pick<URLSearchParams, 'get'>): PartnersListParams => ({
  desc: searchParams.get('dir') === 'desc',
  pageIndex: readPageIndex(searchParams.get('page')),
  query: searchParams.get('q') ?? '',
  sortKey: pickAllowed(sortKeys, searchParams.get('sort'), 'name'),
  status: pickAllowed(statusFilters, searchParams.get('status'), defaultStatus),
})

// List state → URL. Defaults are left out; other keys in `base` (an open sheet) are kept.
export const serializeListParams = (params: PartnersListParams, base: URLSearchParams) =>
  applyParamEntries(base, {
    dir: params.desc ? 'desc' : null,
    page: writePageIndex(params.pageIndex),
    q: params.query.trim() ? params.query : null,
    sort: params.sortKey === 'name' ? null : params.sortKey,
    status: params.status === defaultStatus ? null : params.status,
  })
