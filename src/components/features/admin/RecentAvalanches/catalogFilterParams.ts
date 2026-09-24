import { avalancheSources } from '@domain/constants'
import type { AvalancheSource, AvalancheStatus } from '@domain/types'

// Statuses the catalog can show — `pending` lives in the moderation queue
export const catalogStatuses = [
  'published',
  'draft',
  'archived',
] as const satisfies AvalancheStatus[]

export type CatalogStatus = (typeof catalogStatuses)[number]

const isCatalogStatus = (value: string | null): value is CatalogStatus =>
  catalogStatuses.includes(value as CatalogStatus)

const isAvalancheSource = (value: string | null): value is AvalancheSource =>
  !!value && Object.hasOwn(avalancheSources, value)

// Source / status filters from the URL; anything unknown means "all"
export const readCatalogFilters = (searchParams: Pick<URLSearchParams, 'get'>) => {
  const source = searchParams.get('source')
  const status = searchParams.get('status')

  return {
    source: isAvalancheSource(source) ? source : null,
    status: isCatalogStatus(status) ? status : null,
  }
}
