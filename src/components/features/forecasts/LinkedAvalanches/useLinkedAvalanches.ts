import type { ForecastFormSchema } from '@components/features/admin/Forecasts/ForecastForm/schema'
import { formatAvalancheId } from '@components/features/observations'
import { useToast } from '@components/hooks'
import { useTranslations } from 'next-intl'
import { useController, useFormState } from 'react-hook-form'

// The forecast's linked record IDs — local form state until the forecast is
// saved. Records themselves are never changed from here.
const useLinkedAvalanches = (isForecastSaved: boolean) => {
  const t = useTranslations()
  const { toastAction } = useToast()
  const { field } = useController<ForecastFormSchema, 'recentAvalancheIds'>({
    name: 'recentAvalancheIds',
  })
  const { defaultValues } = useFormState<ForecastFormSchema>()
  const linkedIds = field.value
  // The form is reset to the saved values after every save
  const savedIds = isForecastSaved ? (defaultValues?.recentAvalancheIds ?? []) : []

  const link = (ids: number[]) =>
    field.onChange([...linkedIds, ...ids.filter((id) => !linkedIds.includes(id))])

  const unlink = (id: number) => {
    const index = linkedIds.indexOf(id)

    field.onChange(linkedIds.filter((linkedId) => linkedId !== id))
    toastAction(t('admin.forecast.editor.avalanches.unlinked', { id: formatAvalancheId(id) }), {
      label: t('common.actions.undo'),
      onClick: () => {
        const current = [...field.value]

        current.splice(index, 0, id)
        field.onChange(current)
      },
    })
  }

  const isSaved = (id: number) => savedIds.includes(id)

  return { isSaved, link, linkedIds, unlink }
}

export default useLinkedAvalanches
