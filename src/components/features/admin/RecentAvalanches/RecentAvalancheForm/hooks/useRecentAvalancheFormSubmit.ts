import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useRecentAvalancheUpdate } from '@data/hooks/recentAvalanches'
import type { AvalancheTrigger, AvalancheType, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { AvalancheFormSchema } from '../schema'

type UseRecentAvalancheFormSubmitParams = {
  avalancheId: number
  onSuccess: VoidFunction
  regionId: RegionId
}

const useRecentAvalancheFormSubmit = ({
  avalancheId,
  onSuccess,
  regionId,
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
          regionId,
          trigger: formData.trigger as AvalancheTrigger,
          type: formData.type as AvalancheType | 'unknown',
        })
        toastSuccess(t('admin.recentAvalanches.form.messages.updated'))
        onSuccess()
      } catch (error) {
        toastError('RecentAvalancheForm | handleSubmit', { error })
      }
    },
    [avalancheId, onSuccess, regionId, toastError, toastSuccess, t, updateAvalanche],
  )

  return { handleSubmit }
}

export default useRecentAvalancheFormSubmit
