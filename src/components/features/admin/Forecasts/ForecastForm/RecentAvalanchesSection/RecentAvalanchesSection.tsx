import { useCallback, useState } from 'react'
import { Icon } from '@components/icons'
import { Button } from '@components/ui'
import type { Avalanche } from '@domain/types'
import _uniqueId from 'lodash/uniqueId'
import { useTranslations } from 'next-intl'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { AvalancheForm } from './AvalancheForm'
import { AvalanchesList } from './AvalanchesList'
import type { FormState } from '../common'
import { initialAvalancheData } from '../constants'
import type { ForecastFormSchema } from '../schema'

const RecentAvalanchesSection = () => {
  const tAvalanches = useTranslations('admin.forecast.form.recentAvalanches')

  const { control } = useFormContext<ForecastFormSchema>()
  const { append, fields, remove, update } = useFieldArray({
    control,
    name: 'recentAvalanches',
  })

  const [formState, setFormState] = useState<FormState>(null)

  const handleCreateFormOpen = useCallback(() => {
    setFormState({ mode: 'create' })
  }, [])

  const handleFormClose = useCallback(() => {
    setFormState(null)
  }, [])

  const handleSubmit = useCallback(
    (data: Avalanche) => {
      const preparedAvalanche: Avalanche = {
        id: data.id || _uniqueId('avalanche-'),
        ...data,
      }

      const existingIndex = fields.findIndex((a) => a.id === data.id)

      if (existingIndex !== -1) {
        update(existingIndex, preparedAvalanche)
      } else {
        append(preparedAvalanche)
      }

      handleFormClose()
    },
    [append, fields, handleFormClose, update],
  )

  const handleDelete = useCallback(
    (id: string) => {
      const index = fields.findIndex((avalanche) => avalanche.id === id)

      if (index !== -1) {
        remove(index)
      }
    },
    [fields, remove],
  )

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{tAvalanches('title')}</h3>

        <Button className="ml-auto" disabled={formState !== null} onClick={handleCreateFormOpen}>
          <Icon icon="plus" size="sm" />
          {tAvalanches('labels.addAvalanche')}
        </Button>
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
    </section>
  )
}

export default RecentAvalanchesSection
