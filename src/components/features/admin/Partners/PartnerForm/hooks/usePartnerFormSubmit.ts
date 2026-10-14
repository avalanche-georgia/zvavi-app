import { useToast } from '@components/hooks'
import { usePartnerCreate, usePartnerUpdate } from '@data/hooks/partners'
import type { PartnerFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

type UsePartnerFormSubmitParams = {
  onSuccess: VoidFunction
  partnerId?: string
}

const usePartnerFormSubmit = ({ onSuccess, partnerId }: UsePartnerFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createPartner } = usePartnerCreate()
  const { mutateAsync: updatePartner } = usePartnerUpdate()

  const handleSubmit = async (formData: PartnerFormData) => {
    try {
      if (partnerId) {
        await updatePartner({ ...formData, id: partnerId })
      } else {
        await createPartner(formData)
      }

      toastSuccess(t(`admin.partners.messages.${partnerId ? 'updated' : 'created'}`))
      onSuccess()
    } catch (error) {
      toastError('PartnerForm | handleSubmit', { error })
    }
  }

  return { handleSubmit }
}

export default usePartnerFormSubmit
