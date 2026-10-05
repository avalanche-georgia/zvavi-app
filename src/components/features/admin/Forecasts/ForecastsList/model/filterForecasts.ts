import type { ForecastListItem } from '@domain/types'

import type { CreatedBounds } from './dateRange'
import type { ListStatusFilter } from './listParams'
import { toPlainText } from './plainText'

type ForecastFilters = { bounds: CreatedBounds; query: string; status: ListStatusFilter }

// "#180 " → "180"
const normalizeQuery = (query: string) => query.trim().toLowerCase().replace(/^#/, '')

const matchesQuery = ({ forecaster, id, summary }: ForecastListItem, query: string) =>
  [String(id), forecaster ?? '', toPlainText(summary)].some((text) =>
    text.toLowerCase().includes(query),
  )

const matchesStatus = ({ status }: ForecastListItem, filter: ListStatusFilter) =>
  filter === 'all' || (filter === 'published') === (status === 'published')

const isWithin = (createdAt: string, { end, start }: CreatedBounds) => {
  const created = new Date(createdAt)

  return (!start || created >= start) && (!end || created <= end)
}

export const filterForecasts = (
  forecasts: ForecastListItem[],
  { bounds, query, status }: ForecastFilters,
) => {
  const normalizedQuery = normalizeQuery(query)

  return forecasts.filter(
    (forecast) =>
      matchesStatus(forecast, status) &&
      isWithin(forecast.createdAt, bounds) &&
      (!normalizedQuery || matchesQuery(forecast, normalizedQuery)),
  )
}

// Per status-filter option, over the whole region
export const countByStatus = (forecasts: ForecastListItem[]): Record<ListStatusFilter, number> => {
  const published = forecasts.filter(({ status }) => status === 'published').length

  return { all: forecasts.length, draft: forecasts.length - published, published }
}
