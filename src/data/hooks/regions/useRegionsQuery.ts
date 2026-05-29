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

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data ?? []) as Region[]
}

const useRegionsQuery = (initialData?: Region[]) =>
  useQuery<Region[], Error>({
    initialData,
    queryFn: fetchRegions,
    queryKey: regionsKeys.list(),
  })

export default useRegionsQuery
