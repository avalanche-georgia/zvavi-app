import { supabase } from '@data'
import { partnersKeys } from '@data/query-keys'
import type { PartnerFormData } from '@domain/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { convertCamelToSnake, handleSupabaseError } from '../../helpers'

type UpdatePayload = Partial<PartnerFormData> & { id: string }

const updatePartner = async ({ id, ...formData }: UpdatePayload): Promise<void> => {
  const { error } = await supabase
    .from('partners')
    .update(convertCamelToSnake(formData))
    .eq('id', id)

  handleSupabaseError(error)
}

const usePartnerUpdate = () => {
  const queryClient = useQueryClient()

  return useMutation<void, Error, UpdatePayload>({
    mutationFn: updatePartner,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: partnersKeys.list() })
      queryClient.invalidateQueries({ queryKey: partnersKeys.active() })
      queryClient.invalidateQueries({ queryKey: partnersKeys.item(variables.id) })
    },
  })
}

export default usePartnerUpdate
