import { supabase } from '@data'
import { recentAvalanchesKeys } from '@data/query-keys'
import type { Avalanche } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'

const fetchRecentAvalanche = async (id: number): Promise<Avalanche | null> => {
  const { data, error } = await supabase.from('recent_avalanches').select('*').eq('id', id).single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  return convertSnakeToCamel(data) as Avalanche
}

const useRecentAvalancheQuery = (id: number) =>
  useQuery<Avalanche | null, Error>({
    queryFn: () => fetchRecentAvalanche(id),
    queryKey: recentAvalanchesKeys.item(id),
  })

export default useRecentAvalancheQuery
