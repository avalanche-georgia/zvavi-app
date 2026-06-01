import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { Avalanche, RegionId } from '@domain/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'

type QueryKey = ReturnType<typeof recentAvalanchesKeys.item>

type QueryOptions = Omit<
  UseQueryOptions<Avalanche | null, Error, Avalanche | null, QueryKey>,
  'queryFn' | 'queryKey'
> & { id: number; regionId?: RegionId }

const fetchRecentAvalanche = async (id: number, regionId?: RegionId): Promise<Avalanche | null> => {
  let query = supabase.from('recent_avalanches').select('*').eq('id', id)

  if (regionId) {
    query = query.eq('region_id', regionId)
  }

  const { data, error } = await query.single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data) as Avalanche
}

const useRecentAvalancheQuery = ({ id, regionId, ...options }: QueryOptions) =>
  useQuery({
    ...options,
    queryFn: () => fetchRecentAvalanche(id, regionId),
    queryKey: recentAvalanchesKeys.item(regionId, id),
  })

export default useRecentAvalancheQuery
