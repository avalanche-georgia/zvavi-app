import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { RegionId } from '@domain/types'
import { keepPreviousData } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import type { AvalancheListItem, ListFilterParams } from './types'
import { convertSnakeToCamel } from '../../helpers'

type PaginatedResult = {
  grandTotal: number
  avalanches: AvalancheListItem[]
  totalCount: number
}

type QueryParams = ListFilterParams & { regionId: RegionId }

export const fetchPaginatedAvalanches = async (params: QueryParams): Promise<PaginatedResult> => {
  const {
    dateFrom,
    dateMode,
    dateTo,
    excludeStatus,
    isOldestFirst = false,
    isUnlinked = false,
    page,
    pageSize,
    regionId,
    source,
    status,
  } = params
  const offset = (page - 1) * pageSize
  const dateField = dateMode === 'created' ? 'created_at' : 'date'

  let avalanchesQuery = supabase
    .from('recent_avalanches')
    .select('*, forecast_avalanche(forecast_id)', { count: 'exact' })
    .eq('region_id', regionId)
    .order('created_at', { ascending: isOldestFirst })

  if (dateFrom) avalanchesQuery = avalanchesQuery.gte(dateField, dateFrom)
  if (dateTo) avalanchesQuery = avalanchesQuery.lte(dateField, dateTo)
  if (source) avalanchesQuery = avalanchesQuery.eq('source', source)
  if (status) avalanchesQuery = avalanchesQuery.eq('status', status)
  if (excludeStatus) avalanchesQuery = avalanchesQuery.neq('status', excludeStatus)
  // No row in the embedded join table
  if (isUnlinked) avalanchesQuery = avalanchesQuery.is('forecast_avalanche', null)

  avalanchesQuery = avalanchesQuery.range(offset, offset + pageSize - 1)

  let grandTotalQuery = supabase
    .from('recent_avalanches')
    .select('*', { count: 'exact', head: true })
    .eq('region_id', regionId)

  if (source) grandTotalQuery = grandTotalQuery.eq('source', source)
  if (status) grandTotalQuery = grandTotalQuery.eq('status', status)
  if (excludeStatus) grandTotalQuery = grandTotalQuery.neq('status', excludeStatus)

  const [{ count, data, error }, { count: grandTotal, error: totalError }] = await Promise.all([
    avalanchesQuery,
    grandTotalQuery,
  ])

  if (error) throw new Error(error.message)
  if (totalError) throw new Error(totalError.message)

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return {
    avalanches: convertSnakeToCamel(data ?? []),
    grandTotal: grandTotal ?? 0,
    totalCount: count ?? 0,
  } as PaginatedResult
}

const useRecentAvalanchesPaginatedQuery = (params: QueryParams) => {
  const { regionId, ...filterParams } = params

  return useQuery<PaginatedResult, Error>({
    // Paging or filtering keeps the rows on screen until the next ones arrive;
    // another region starts empty — its rows must not be mistaken for this one's
    placeholderData: (previousData, previousQuery) =>
      previousQuery?.queryKey[1] === regionId ? keepPreviousData(previousData) : undefined,
    queryFn: () => fetchPaginatedAvalanches(params),
    queryKey: recentAvalanchesKeys.list(regionId, filterParams),
  })
}

export default useRecentAvalanchesPaginatedQuery
