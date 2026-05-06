import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useRecentAvalancheCreate } from '@data/hooks/recentAvalanches'
import type { AvalancheTrigger, AvalancheType, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { AvalancheFormSchema } from '../schema'

type UseRecentAvalancheCreateFormSubmitParams = {
  onSuccess: VoidFunction
  regionId: RegionId
}

const useRecentAvalancheCreateFormSubmit = ({
  onSuccess,
  regionId,
}: UseRecentAvalancheCreateFormSubmitParams) => {
  const t = useTranslations()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createAvalanche } = useRecentAvalancheCreate()

  const handleSubmit = useCallback(
    async (formData: AvalancheFormSchema) => {
      try {
        await createAvalanche({
          ...formData,
          regionId,
          trigger: formData.trigger as AvalancheTrigger,
          type: formData.type as AvalancheType | 'unknown',
        })
        toastSuccess(t('admin.recentAvalanches.form.messages.created'))
        onSuccess()
      } catch (error) {
        toastError('RecentAvalancheForm | handleSubmit', { error })
      }
    },
    [createAvalanche, onSuccess, regionId, toastError, toastSuccess, t],
  )

  return { handleSubmit }
}

export default useRecentAvalancheCreateFormSubmit
