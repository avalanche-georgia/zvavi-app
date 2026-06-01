import { useCallback, useState } from 'react'
import { useBoolean } from '@components/hooks'
import type { Avalanche } from '@domain/types'
import { useFieldArray, useFormContext } from 'react-hook-form'

import type { AvalancheFormState } from '../common'
import type { ForecastFormSchema } from '../schema'

const toDate = (value: Date | string | null): Date | null =>
  !value ? null : value instanceof Date ? value : new Date(value)

const useRecentAvalanchesSection = () => {
  const { control } = useFormContext<ForecastFormSchema>()
  const { append, fields, remove, replace, update } = useFieldArray({
    control,
    keyName: 'localId',
    name: 'recentAvalanches',
  })

  const [formState, setFormState] = useState<AvalancheFormState>(null)
  const [isPickerOpen, { setFalse: closePicker, setTrue: openPicker }] = useBoolean(false)

  const handleCreateFormOpen = useCallback(() => setFormState({ mode: 'create' }), [])
  const handleFormClose = useCallback(() => setFormState(null), [])

  const handleSubmit = useCallback(
    (data: Omit<Avalanche, 'regionId'>) => {
      const prepared = { ...data, date: toDate(data.date) }

      if (formState?.mode === 'edit' && formState.localId) {
        const index = fields.findIndex((field) => field.localId === formState.localId)

        if (index === -1) return
        update(index, prepared)
      } else {
        append(prepared)
      }

      handleFormClose()
    },
    [append, fields, formState, handleFormClose, update],
  )

  const handleDelete = useCallback(
    (localId: string) => {
      const index = fields.findIndex((field) => field.localId === localId)

      if (index === -1) return
      remove(index)
    },
    [fields, remove],
  )

  const handlePickerConfirm = useCallback(
    (selected: Avalanche[]) => {
      const existingFieldById = new Map(
        fields.filter((field) => field.id != null).map((field) => [field.id, field]),
      )
      const manuallyCreatedFields = fields.filter((field) => field.id == null)
      const reconciledPickerFields = selected.map((avalanche) => {
        const existingField = avalanche.id != null ? existingFieldById.get(avalanche.id) : undefined

        return existingField ?? { ...avalanche, date: toDate(avalanche.date) }
      })

      replace([...manuallyCreatedFields, ...reconciledPickerFields])
      closePicker()
    },
    [closePicker, fields, replace],
  )

  return {
    avalanches: fields,
    closePicker,
    formState,
    handleCreateFormOpen,
    handleDelete,
    handleFormClose,
    handlePickerConfirm,
    handleSubmit,
    isPickerOpen,
    openPicker,
    selectedAvalancheIds: fields.flatMap((field) => (field.id != null ? [field.id] : [])),
    setFormState,
  }
}

export default useRecentAvalanchesSection
