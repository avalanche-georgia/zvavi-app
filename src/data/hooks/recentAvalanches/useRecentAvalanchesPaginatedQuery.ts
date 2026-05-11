import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import type { AvalancheListItem, ListFilterParams } from './types'
import { convertSnakeToCamel } from '../../helpers'

type PaginatedResult = {
  grandTotal: number
  avalanches: AvalancheListItem[]
  totalCount: number
}

type QueryParams = ListFilterParams & { regionId: RegionId }

const fetchPaginatedAvalanches = async (params: QueryParams): Promise<PaginatedResult> => {
  const { dateFrom, dateMode, dateTo, page, pageSize, regionId } = params
  const offset = (page - 1) * pageSize
  const dateField = dateMode === 'created' ? 'created_at' : 'date'

  let avalanchesQuery = supabase
    .from('recent_avalanches')
    .select('*, forecast_avalanche(forecast_id)', { count: 'exact' })
    .eq('region_id', regionId)
    .order('created_at', { ascending: false })

  if (dateFrom) avalanchesQuery = avalanchesQuery.gte(dateField, dateFrom)
  if (dateTo) avalanchesQuery = avalanchesQuery.lte(dateField, dateTo)

  avalanchesQuery = avalanchesQuery.range(offset, offset + pageSize - 1)

  const [{ count, data, error }, { count: grandTotal, error: totalError }] = await Promise.all([
    avalanchesQuery,
    supabase
      .from('recent_avalanches')
      .select('*', { count: 'exact', head: true })
      .eq('region_id', regionId),
  ])

  if (error) throw new Error(error.message)
  if (totalError) throw new Error(totalError.message)

  return {
    avalanches: convertSnakeToCamel(data ?? []),
    grandTotal: grandTotal ?? 0,
    totalCount: count ?? 0,
  } as PaginatedResult
}

const useRecentAvalanchesPaginatedQuery = (params: QueryParams) => {
  const { regionId, ...filterParams } = params

  return useQuery<PaginatedResult, Error>({
    queryFn: () => fetchPaginatedAvalanches(params),
    queryKey: recentAvalanchesKeys.list(regionId, filterParams),
  })
}

export default useRecentAvalanchesPaginatedQuery
