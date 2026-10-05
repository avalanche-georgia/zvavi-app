import type { ForecastListItem } from '@domain/types'

// current: the forecast the public site shows right now (latest-created published one,
// same query as the public pages). published: any other published one. draft: not public.
export type ForecastListStatus = 'current' | 'draft' | 'published'

export const getForecastListStatus = (
  { id, status }: Pick<ForecastListItem, 'id' | 'status'>,
  currentForecastId: number | null,
): ForecastListStatus => {
  if (status !== 'published') return 'draft'

  return id === currentForecastId ? 'current' : 'published'
}
