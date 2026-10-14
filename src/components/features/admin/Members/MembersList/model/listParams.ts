import {
  applyParamEntries,
  pickAllowed,
  readPageIndex,
  writePageIndex,
} from '@components/features/admin/shared'
import type { MemberStatus } from '@domain/types'

// In the order an admin works through them: applications first
export const statusFilters = [
  'all',
  'pending',
  'active',
  'expired',
  'suspended',
  'inactive',
] as const satisfies readonly StatusFilter[]
export const sortKeys = ['createdAt', 'name', 'joinedAt', 'expiresAt'] as const

export type StatusFilter = 'all' | MemberStatus
export type SortKey = (typeof sortKeys)[number]

export type MembersListParams = {
  desc: boolean
  pageIndex: number
  query: string
  sortKey: SortKey
  status: StatusFilter
}

export const isSortKey = (value: string): value is SortKey => sortKeys.includes(value as SortKey)

// URL → list state; anything unknown falls back to the default
export const readListParams = (searchParams: Pick<URLSearchParams, 'get'>): MembersListParams => ({
  desc: searchParams.get('dir') !== 'asc',
  pageIndex: readPageIndex(searchParams.get('page')),
  query: searchParams.get('q') ?? '',
  sortKey: pickAllowed(sortKeys, searchParams.get('sort'), 'createdAt'),
  status: pickAllowed(statusFilters, searchParams.get('status'), 'all'),
})

// List state → URL. Defaults are left out; other keys in `base` (an open sheet) are kept.
export const serializeListParams = (params: MembersListParams, base: URLSearchParams) =>
  applyParamEntries(base, {
    dir: params.desc ? null : 'asc',
    page: writePageIndex(params.pageIndex),
    q: params.query.trim() ? params.query : null,
    sort: params.sortKey === 'createdAt' ? null : params.sortKey,
    status: params.status === 'all' ? null : params.status,
  })
