import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { formatAvalancheId } from '@components/features/observations'
import { useToast } from '@components/hooks'
import { useTranslations } from 'next-intl'
import { useController, useFormContext, useFormState } from 'react-hook-form'

// The forecast's linked record IDs — local form state until the forecast is
// saved. Records themselves are never changed from here.
const useLinkedAvalanches = (isForecastSaved: boolean) => {
  const t = useTranslations()
  const { toastAction } = useToast()
  const { field } = useController<ForecastFormSchema, 'recentAvalancheIds'>({
    name: 'recentAvalancheIds',
  })
  const { getValues } = useFormContext<ForecastFormSchema>()
  const { defaultValues } = useFormState<ForecastFormSchema>()
  const linkedIds = field.value
  // The form is reset to the saved values after every save
  const savedIds = isForecastSaved ? (defaultValues?.recentAvalancheIds ?? []) : []

  const link = (ids: number[]) =>
    field.onChange([...linkedIds, ...ids.filter((id) => !linkedIds.includes(id))])

  // The record was deleted: nothing to undo
  const drop = (id: number) => field.onChange(linkedIds.filter((linkedId) => linkedId !== id))

  const unlink = (id: number) => {
    const index = linkedIds.indexOf(id)

    drop(id)
    toastAction(t('admin.forecast.editor.avalanches.unlinked', { id: formatAvalancheId(id) }), {
      label: t('common.actions.undo'),
      // Reads the list at click time — links changed since the toast are kept
      onClick: () => {
        const current = getValues('recentAvalancheIds')

        if (current.includes(id)) return

        field.onChange([...current.slice(0, index), id, ...current.slice(index)])
      },
    })
  }

  const isSaved = (id: number) => savedIds.includes(id)

  return { drop, isSaved, link, linkedIds, unlink }
}

export default useLinkedAvalanches
