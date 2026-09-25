import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useRecentAvalancheCreate } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { AvalancheFormData } from '../schema'

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
    async (formData: AvalancheFormData) => {
      try {
        await createAvalanche({
          ...formData,
          regionId,
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
