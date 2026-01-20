import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useForecastCreate, useForecastUpdate } from '@data/hooks/forecasts'
import type { ForecastFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

import type { ForecastFormSchema } from '../schema'

export type UseForecastFormSubmitArgs = {
  initialForecastId: ForecastFormData['baseFormData']['id']
  onSuccess: VoidFunction
}

const useForecastFormSubmit = ({ initialForecastId, onSuccess }: UseForecastFormSubmitArgs) => {
  const t = useTranslations()
  const { mutateAsync: createForecast } = useForecastCreate()
  const { mutateAsync: updateForecast } = useForecastUpdate()

  const { toastError, toastSuccess } = useToast()

  const handleSubmit = useCallback(
    async (formData: ForecastFormSchema) => {
      const {
        additionalHazards,
        avalancheProblems,
        forecaster,
        hazardLevels,
        recentAvalanches,
        snowpack,
        summary,
        validUntil,
        weather,
      } = formData

      const payload = {
        avalancheProblems: avalancheProblems.map(({ createdAt, id, ...rest }) => rest), // eslint-disable-line @typescript-eslint/no-unused-vars
        forecast: {
          additionalHazards,
          forecaster,
          hazardLevels,
          id: initialForecastId,
          snowpack,
          summary,
          validUntil: validUntil?.toISOString() ?? null,
          weather,
        },
        recentAvalanches: recentAvalanches.map(({ createdAt, id, ...rest }) => rest), // eslint-disable-line @typescript-eslint/no-unused-vars
      }

      const isEditing = Boolean(initialForecastId)

      try {
        if (isEditing) {
          await updateForecast(payload)
          toastSuccess(t('admin.forecasts.messages.updated'))
        } else {
          await createForecast(payload)
          toastSuccess(t('admin.forecasts.messages.created'))
        }

        onSuccess()
      } catch (error) {
        toastError('useForecastFormSubmit | handleSubmit', { error })
      }
    },
    [createForecast, initialForecastId, onSuccess, t, toastError, toastSuccess, updateForecast],
  )

  return { handleSubmit }
}

export default useForecastFormSubmit
