import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { usePartnerCreate, usePartnerUpdate } from '@data/hooks/partners'
import type { PartnerFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

type UsePartnerFormSubmitParams = {
  partnerId?: string
  onSuccess: VoidFunction
}

const usePartnerFormSubmit = ({ onSuccess, partnerId }: UsePartnerFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createPartner } = usePartnerCreate()
  const { mutateAsync: updatePartner } = usePartnerUpdate()

  const handleSubmit = useCallback(
    async (formData: PartnerFormData) => {
      try {
        if (partnerId) {
          await updatePartner({ ...formData, id: partnerId })
          toastSuccess(t('admin.partners.messages.updated'))
        } else {
          await createPartner(formData)
          toastSuccess(t('admin.partners.messages.created'))
        }

        onSuccess()
      } catch (error) {
        toastError('PartnerForm | handleSubmit', { error })
      }
    },
    [partnerId, createPartner, updatePartner, onSuccess, toastError, toastSuccess, t],
  )

  return { handleSubmit }
}

export default usePartnerFormSubmit
