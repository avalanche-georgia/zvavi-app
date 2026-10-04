import { useRef, useState } from 'react'
import { useToast } from '@components/hooks'
import { useForecastSave } from '@data/hooks/forecasts'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'
import type { UseFormReturn } from 'react-hook-form'

import buildSavePayload from './buildSavePayload'
import resetToSaved from './resetToSaved'
import useLinkableIdsFilter from './useLinkableIdsFilter'
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
  const filterLinkable = useLinkableIdsFilter(regionId)
  const [forecastId, setForecastId] = useState(initialForecastId)
  // Refs, not state: a second ⌘S before the first save settles must see both
  const forecastIdRef = useRef(initialForecastId)
  const isSavingRef = useRef(false)
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null)
  // Set by the problems section; an open editor holds unsaved problem edits
  const isProblemEditorOpen = useRef(false)

  const persist = async (values: ForecastFormSchema, andClose: boolean) => {
    const previousId = forecastIdRef.current
    const savedIds =
      previousId === undefined ? [] : (form.formState.defaultValues?.recentAvalancheIds ?? [])
    const recentAvalancheIds = filterLinkable(
      values.recentAvalancheIds,
      savedIds.filter((id) => id !== undefined),
    )
    const saved = { ...values, recentAvalancheIds }

    try {
      const savedId = await saveForecast(buildSavePayload(saved, previousId, regionId))
      const dropped = values.recentAvalancheIds.filter((id) => !recentAvalancheIds.includes(id))

      if (dropped.length > 0) {
        const linkedIds = form.getValues('recentAvalancheIds')

        form.setValue(
          'recentAvalancheIds',
          linkedIds.filter((id) => !dropped.includes(id)),
        )
        toastInfo(t('admin.forecast.editor.save.unlinkedUnavailable', { count: dropped.length }))
      }

      resetToSaved(form, saved)
      forecastIdRef.current = savedId
      setForecastId(savedId)
      setLastSavedAt(new Date())
      onSaved({ andClose, forecastId: savedId, isCreated: previousId === undefined })
    } catch (error) {
      toastError('ForecastForm | save', { error })
    } finally {
      isSavingRef.current = false
    }
  }

  const save = (andClose: boolean) => {
    if (isSavingRef.current) return

    if (isProblemEditorOpen.current) {
      toastInfo(t('admin.forecast.editor.save.finishProblem'))

      return
    }

    isSavingRef.current = true
    form.handleSubmit(
      (values) => persist(values, andClose),
      () => {
        isSavingRef.current = false
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
