import { supabase } from '@data'
import type { Partner } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { partnersKeys } from '../../query-keys'

type QueryOptions = {
  partnerId: string
}

const fetchPartner = async (partnerId: string): Promise<Partner | null> => {
  const { data, error } = await supabase.from('partners').select('*').eq('id', partnerId).single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw new Error(error.message)
  }

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
  return convertSnakeToCamel(data) as Partner
}

const usePartnerQuery = ({ partnerId }: QueryOptions) => {
  return useQuery<Partner | null, Error>({
    queryFn: () => fetchPartner(partnerId),
    queryKey: partnersKeys.item(partnerId),
  })
}

export default usePartnerQuery
