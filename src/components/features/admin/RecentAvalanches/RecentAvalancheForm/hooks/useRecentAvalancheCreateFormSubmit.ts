import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useRecentAvalancheCreate } from '@data/hooks/recentAvalanches'
import type { AvalancheTrigger, AvalancheType } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { AvalancheFormSchema } from '../schema'

const useRecentAvalancheCreateFormSubmit = ({ onSuccess }: { onSuccess: VoidFunction }) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createAvalanche } = useRecentAvalancheCreate()

  const handleSubmit = useCallback(
    async (formData: AvalancheFormSchema) => {
      try {
        await createAvalanche({
          ...formData,
          trigger: formData.trigger as AvalancheTrigger,
          type: formData.type as AvalancheType | 'unknown',
        })
        toastSuccess(t('admin.recentAvalanches.form.messages.created'))
        onSuccess()
      } catch (error) {
        toastError('RecentAvalancheForm | handleSubmit', { error })
      }
    },
    [createAvalanche, onSuccess, toastError, toastSuccess, t],
  )

  return { handleSubmit }
}

export default useRecentAvalancheCreateFormSubmit
