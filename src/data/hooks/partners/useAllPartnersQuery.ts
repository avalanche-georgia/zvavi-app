import { supabase } from '@data'
import type { Partner } from '@domain/types'

import { useQuery } from '@/tanstack-query/hooks'

import { convertSnakeToCamel } from '../../helpers'
import { partnersKeys } from '../../query-keys'

const fetchAllPartners = async (): Promise<Partner[]> => {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .order('name_en', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  if (!data) return []

  return convertSnakeToCamel(data) as Partner[]
}

const useAllPartnersQuery = () => {
  return useQuery<Partner[], Error>({
    queryFn: fetchAllPartners,
    queryKey: partnersKeys.list(),
  })
}

export default useAllPartnersQuery
