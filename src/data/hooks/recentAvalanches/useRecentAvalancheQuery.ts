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
> & { id: number; regionId: RegionId }

const fetchRecentAvalanche = async (id: number): Promise<Avalanche | null> => {
  const { data, error } = await supabase.from('recent_avalanches').select('*').eq('id', id).single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  return convertSnakeToCamel(data) as Avalanche
}

const useRecentAvalancheQuery = ({ id, regionId, ...options }: QueryOptions) =>
  useQuery({
    ...options,
    queryFn: () => fetchRecentAvalanche(id),
    queryKey: recentAvalanchesKeys.item(regionId, id),
  })

export default useRecentAvalancheQuery
