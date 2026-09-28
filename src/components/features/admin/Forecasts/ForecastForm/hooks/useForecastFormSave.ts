import { useRef, useState } from 'react'
import { useToast } from '@components/hooks'
import { useForecastSave } from '@data/hooks/forecasts'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'
import type { UseFormReturn } from 'react-hook-form'

import buildSavePayload from './buildSavePayload'
import type { ForecastFormSchema } from '../schema'

export type ForecastSavedEvent = { andClose: boolean; forecastId: number; isCreated: boolean }

type UseForecastFormSaveParams = {
  form: UseFormReturn<ForecastFormSchema>
  initialForecastId: number | undefined
  // Validation failed: bring the first error into view
  onInvalid: VoidFunction
  onSaved: (event: ForecastSavedEvent) => void
  regionId: RegionId
}

// Save (stay on the page) and Save & close share this: validate, persist in one
// transaction, then make the saved values the new clean state. Never changes
// the forecast's status.
const useForecastFormSave = ({
  form,
  initialForecastId,
  onInvalid,
  onSaved,
  regionId,
}: UseForecastFormSaveParams) => {
  const t = useTranslations()
  const { toastError, toastInfo } = useToast()
  const { isPending, mutateAsync: saveForecast } = useForecastSave()
  const [forecastId, setForecastId] = useState(initialForecastId)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  // Set by the problems section; an open editor holds unsaved problem edits
  const isProblemEditorOpen = useRef(false)

  const persist = async (values: ForecastFormSchema, andClose: boolean) => {
    try {
      const savedId = await saveForecast(buildSavePayload(values, forecastId, regionId))

      form.reset(values)
      setForecastId(savedId)
      setLastSavedAt(new Date())
      onSaved({ andClose, forecastId: savedId, isCreated: forecastId === undefined })
    } catch (error) {
      toastError('ForecastForm | save', { error })
    }
  }

  const save = (andClose: boolean) => {
    if (isPending) return

    if (isProblemEditorOpen.current) {
      toastInfo(t('admin.forecast.editor.save.finishProblem'))

      return
    }

    form.handleSubmit(
      (values) => persist(values, andClose),
      () => {
        onInvalid()
        toastError('ForecastForm | validation', {
          message: t('admin.forecast.editor.save.fieldsRequired'),
        })
      },
    )()
  }

  const setProblemEditorOpen = (isOpen: boolean) => {
    isProblemEditorOpen.current = isOpen
  }

  return { forecastId, isSaving: isPending, lastSavedAt, save, setProblemEditorOpen }
}

export default useForecastFormSave
