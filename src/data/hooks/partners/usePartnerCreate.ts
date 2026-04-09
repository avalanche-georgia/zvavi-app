import { supabase } from '@data'
import { partnersKeys } from '@data/query-keys'
import type { Partner, PartnerFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, convertSnakeToCamel, handleSupabaseError } from '../../helpers'

const createPartner = async (formData: PartnerFormData): Promise<Partner> => {
  const { data, error } = await supabase
    .from('partners')
    .insert(convertCamelToSnake(formData))
    .select()
    .single()

  handleSupabaseError(error)

  if (!data) throw new Error('Failed to create partner')

  return convertSnakeToCamel(data) as Partner
}

const usePartnerCreate = () => {
  const queryClient = useQueryClient()

  return useMutation<Partner, Error, PartnerFormData>({
    mutationFn: createPartner,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: partnersKeys.list() })
      queryClient.invalidateQueries({ queryKey: partnersKeys.active() })
    },
  })
}

export default usePartnerCreate
