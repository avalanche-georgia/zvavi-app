import { supabase } from '@data'
import { convertSnakeToCamel, handleSupabaseError } from '@data/helpers'
import { forecastsKeys } from '@data/query-keys'
import type { ForecastListItem, RegionId } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

// Supabase returns at most this many rows per request (max_rows)
const pageSize = 1000
const listColumns =
  'id, forecaster, created_at, valid_until, published_at, status, hazard_levels, summary'

const requestPage = (regionId: RegionId, pageIndex: number, withCount = false) =>
  supabase
    .from('forecasts')
    .select(listColumns, withCount ? { count: 'exact' } : undefined)
    .eq('region_id', regionId)
    .order('created_at', { ascending: false })
    // Tie-break so rows can't shift between pages
    .order('id', { ascending: false })
    .range(pageIndex * pageSize, (pageIndex + 1) * pageSize - 1)

// The whole region: first page with the total, the rest in parallel
const fetchAdminForecasts = async (regionId: RegionId): Promise<ForecastListItem[]> => {
  const firstPage = await requestPage(regionId, 0, true)

  handleSupabaseError(firstPage.error)

  const pageCount = Math.ceil((firstPage.count ?? 0) / pageSize)
  const restPages = await Promise.all(
    Array.from({ length: Math.max(0, pageCount - 1) }, (_, index) =>
      requestPage(regionId, index + 1),
    ),
  )

  restPages.forEach(({ error }) => handleSupabaseError(error))

  const rows = [firstPage, ...restPages].flatMap(({ data }) => data ?? [])

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(rows) as ForecastListItem[]
}

const useAdminForecastsQuery = (regionId: RegionId) =>
  useQuery({
    queryFn: () => fetchAdminForecasts(regionId),
    queryKey: forecastsKeys.adminList(regionId),
  })

export default useAdminForecastsQuery
