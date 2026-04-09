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

  return convertSnakeToCamel(data) as Partner
}

const usePartnerQuery = ({ partnerId }: QueryOptions) => {
  return useQuery<Partner | null, Error>({
    queryFn: () => fetchPartner(partnerId),
    queryKey: partnersKeys.item(partnerId),
  })
}

export default usePartnerQuery
