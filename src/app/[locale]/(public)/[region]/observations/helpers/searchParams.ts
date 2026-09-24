import type { ObservationDateBasis } from '@domain/types'

export type ObservationsPeriod = 'all' | '7d' | '30d' | 'custom'
export type ObservationsSort = 'newest' | 'largest'

export type ObservationsFilters = {
  dateBasis: ObservationDateBasis
  from: string | null
  period: ObservationsPeriod
  sort: ObservationsSort
  to: string | null
}

export type ObservationsParams = ObservationsFilters & { selectedId: number | null }

export const defaultFilters: ObservationsFilters = {
  dateBasis: 'occurred',
  from: null,
  period: 'all',
  sort: 'newest',
  to: null,
}

const periods: ObservationsPeriod[] = ['all', '7d', '30d', 'custom']
const dayPattern = /^\d{4}-\d{2}-\d{2}$/

const pick = <T extends string>(value: string | null, allowed: T[], fallback: T): T =>
  allowed.includes(value as T) ? (value as T) : fallback

const toDay = (value: string | null) => (value && dayPattern.test(value) ? value : null)

// URL ⇄ state. Defaults are left out of the URL so plain links stay clean:
// ?by=reported&period=custom&from=2026-01-01&to=2026-01-31&sort=largest&id=42
export const parseObservationsParams = (searchParams: URLSearchParams): ObservationsParams => {
  const period = pick(searchParams.get('period'), periods, 'all')
  const selectedId = Number(searchParams.get('id'))

  return {
    dateBasis: searchParams.get('by') === 'reported' ? 'reported' : 'occurred',
    from: period === 'custom' ? toDay(searchParams.get('from')) : null,
    period,
    selectedId: Number.isInteger(selectedId) && selectedId > 0 ? selectedId : null,
    sort: searchParams.get('sort') === 'largest' ? 'largest' : 'newest',
    to: period === 'custom' ? toDay(searchParams.get('to')) : null,
  }
}

export const serializeObservationsParams = (params: ObservationsParams): string => {
  const searchParams = new URLSearchParams()

  if (params.dateBasis !== defaultFilters.dateBasis) searchParams.set('by', params.dateBasis)
  if (params.period !== defaultFilters.period) searchParams.set('period', params.period)
  if (params.period === 'custom' && params.from) searchParams.set('from', params.from)
  if (params.period === 'custom' && params.to) searchParams.set('to', params.to)
  if (params.sort !== defaultFilters.sort) searchParams.set('sort', params.sort)
  if (params.selectedId !== null) searchParams.set('id', String(params.selectedId))

  return searchParams.toString()
}
