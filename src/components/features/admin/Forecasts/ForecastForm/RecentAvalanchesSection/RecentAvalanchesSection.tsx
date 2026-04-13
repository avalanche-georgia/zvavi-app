import { useCallback, useState } from 'react'
import { useBoolean } from '@components/hooks'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { AvalancheForm } from './AvalancheForm'
import { AvalanchePickerModal } from './AvalanchePickerModal'
import { AvalanchesList } from './AvalanchesList'
import type { FormState } from '../common'
import { initialAvalancheData } from '../constants'
import type { ForecastFormSchema } from '../schema'

const toDate = (value: Date | string | null): Date | null =>
  !value ? null : value instanceof Date ? value : new Date(value)

const RecentAvalanchesSection = ({ forecastId }: { forecastId?: number }) => {
  const t = useTranslations()
  const { control } = useFormContext<ForecastFormSchema>()
  const { append, fields, remove, update } = useFieldArray({
    control,
    keyName: 'localId',
    name: 'recentAvalanches',
  })

  const [formState, setFormState] = useState<FormState>(null)
  const [isPickerOpen, { setFalse: closePicker, setTrue: openPicker }] = useBoolean(false)

  const handleCreateFormOpen = useCallback(() => setFormState({ mode: 'create' }), [])
  const handleFormClose = useCallback(() => setFormState(null), [])

  const handleSubmit = useCallback(
    (data: Avalanche) => {
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
      selected.forEach((avalanche) => append({ ...avalanche, date: toDate(avalanche.date) }))
      closePicker()
    },
    [append, closePicker],
  )

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{t('admin.forecast.form.recentAvalanches.title')}</h3>
        <div className="ml-auto flex gap-2">
          <Button disabled={formState !== null} onClick={openPicker} variant="secondary">
            <Icon icon="history" size="sm" />
            {t('admin.forecast.form.recentAvalanches.labels.addFromExisting')}
          </Button>
          <Button disabled={formState !== null} onClick={handleCreateFormOpen}>
            <Icon icon="plus" size="sm" />
            {t('admin.forecast.form.recentAvalanches.labels.addAvalanche')}
          </Button>
        </div>
      </div>

      {formState?.mode === 'create' && (
        <AvalancheForm
          avalancheData={initialAvalancheData}
          onClose={handleFormClose}
          onSave={handleSubmit}
        />
      )}

      <AvalanchesList
        avalanches={fields}
        formState={formState}
        onDelete={handleDelete}
        onFormClose={handleFormClose}
        onFormOpen={setFormState}
        onFormSave={handleSubmit}
      />

      <AvalanchePickerModal
        currentForecastId={forecastId}
        isOpen={isPickerOpen}
        onClose={closePicker}
        onConfirm={handlePickerConfirm}
      />
    </section>
  )
}

export default RecentAvalanchesSection
