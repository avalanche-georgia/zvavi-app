import { supabase } from '@data'
import { regionsKeys } from '@data/query-keys'
import type { Region, RegionId } from '@domain/types'
import type { UseQueryOptions } from '@tanstack/react-query'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'

type QueryKey = ReturnType<typeof regionsKeys.item>

type QueryOptions = Omit<
  UseQueryOptions<Region | null, Error, Region | null, QueryKey>,
  'queryFn' | 'queryKey'
> & { regionId: RegionId }

const fetchRegion = async (regionId: RegionId): Promise<Region | null> => {
  const { data, error } = await supabase.from('regions').select('*').eq('id', regionId).single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data) as Region
}

const useRegionQuery = ({ regionId, ...options }: QueryOptions) =>
  useQuery({
    ...options,
    queryFn: () => fetchRegion(regionId),
    queryKey: regionsKeys.item(regionId),
  })

export default useRegionQuery
