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

  return convertSnakeToCamel(data) as Region
}

const useRegionQuery = ({ regionId, ...options }: QueryOptions) =>
  useQuery({
    ...options,
    queryFn: () => fetchRegion(regionId),
    queryKey: regionsKeys.item(regionId),
  })

export default useRegionQuery
