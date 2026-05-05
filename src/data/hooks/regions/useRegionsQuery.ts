import { supabase } from '@data'
import { regionsKeys } from '@data/query-keys'
import type { Region } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'

const fetchRegions = async (): Promise<Region[]> => {
  const { data, error } = await supabase
    .from('regions')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) throw new Error(error.message)

  return convertSnakeToCamel(data ?? []) as Region[]
}

const useRegionsQuery = () =>
  useQuery<Region[], Error>({
    queryFn: fetchRegions,
    queryKey: regionsKeys.list(),
  })

export default useRegionsQuery
