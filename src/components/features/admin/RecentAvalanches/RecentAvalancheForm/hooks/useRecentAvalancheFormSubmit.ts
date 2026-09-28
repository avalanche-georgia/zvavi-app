import { useCallback } from 'react'
import { getPhotoSubmitErrorKey } from '@components/features/observations/form'
import { useToast } from '@components/hooks'
import { useRecentAvalancheCreate, useRecentAvalancheUpdate } from '@data/hooks/recentAvalanches'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { AvalancheFormData } from '../schema'
import toAvalancheBody from '../toAvalancheBody'

type UseRecentAvalancheFormSubmitParams = {
  // undefined when creating a new record
  avalancheId: number | undefined
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
  const { mutateAsync: createAvalanche } = useRecentAvalancheCreate()
  const { mutateAsync: updateAvalanche } = useRecentAvalancheUpdate()

  const handleSubmit = useCallback(
    async (formData: AvalancheFormData) => {
      const { photos, ...fields } = formData
      const body = toAvalancheBody(fields)

      try {
        if (avalancheId === undefined) {
          await createAvalanche({ ...body, photoKeys: photos.add, regionId })
          toastSuccess(t('admin.recentAvalanches.form.messages.created'))
        } else {
          await updateAvalanche({ ...body, id: avalancheId, photos })
          toastSuccess(t('admin.recentAvalanches.form.messages.updated'))
        }

        onSuccess()
      } catch (error) {
        toastError('RecentAvalancheForm | handleSubmit', {
          error,
          message: t(getPhotoSubmitErrorKey(error, 'common.messages.error')),
        })
      }
    },
    [
      avalancheId,
      createAvalanche,
      onSuccess,
      regionId,
      t,
      toastError,
      toastSuccess,
      updateAvalanche,
    ],
  )

  return { handleSubmit }
}

export default useRecentAvalancheFormSubmit
