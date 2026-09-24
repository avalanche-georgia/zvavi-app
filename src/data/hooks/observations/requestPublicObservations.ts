import type { ObservationDateBasis, RegionId } from '@domain/types'

export type ObservationFilterParams = {
  dateBasis: ObservationDateBasis
  dateFrom?: string
  dateTo?: string
  isDateUnknown?: boolean
  regionId: RegionId
}

// Photo URLs in responses are signed for at least an hour — refetch well
// before they expire, also while the page just sits open
export const photoUrlsStaleTime = 30 * 60 * 1000

// undefined and false are left out (a flag is only sent when set)
export const toSearchParams = (params: Record<string, boolean | number | string | undefined>) => {
  const searchParams = new URLSearchParams()

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== false) searchParams.set(key, String(value))
  })

  return searchParams.toString()
}

// GET a public observations endpoint; throws on { ok: false } / HTTP errors
export const requestPublicObservations = async <T>(path: string): Promise<T> => {
  const response = await fetch(path)
  const result = await response.json()

  if (!response.ok || !result.ok) throw new Error(result.error ?? 'failed to fetch observations')

  return result as T
}
