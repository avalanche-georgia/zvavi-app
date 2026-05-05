import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useRecentAvalancheUpdate } from '@data/hooks/recentAvalanches'
import type { AvalancheTrigger, AvalancheType } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { AvalancheFormSchema } from '../schema'

type UseRecentAvalancheFormSubmitParams = {
  avalancheId: number
  onSuccess: VoidFunction
}

const useRecentAvalancheFormSubmit = ({
  avalancheId,
  onSuccess,
}: UseRecentAvalancheFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: updateAvalanche } = useRecentAvalancheUpdate()

  const handleSubmit = useCallback(
    async (formData: AvalancheFormSchema) => {
      try {
        await updateAvalanche({
          ...formData,
          id: avalancheId,
          trigger: formData.trigger as AvalancheTrigger,
          type: formData.type as AvalancheType | 'unknown',
        })
        toastSuccess(t('admin.recentAvalanches.form.messages.updated'))
        onSuccess()
      } catch (error) {
        toastError('RecentAvalancheForm | handleSubmit', { error })
      }
    },
    [avalancheId, updateAvalanche, onSuccess, toastError, toastSuccess, t],
  )

  return { handleSubmit }
}

export default useRecentAvalancheFormSubmit
