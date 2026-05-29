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

  // TODO: type-safe DB conversion — https://app.asana.com/1/1208747886147296/project/1208747689500826/task/1214630622531225
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
