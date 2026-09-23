'use client'

import { InputBlock, RadioGroup, Select, toOptions } from '@components/ui'
import { avalancheTriggersOrdered, avalancheTypes } from '@domain/constants'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import MeasurementFields from './MeasurementFields'
import type { ObservationSubmitFormSchema } from './schema'

const sizeOptions = [1, 2, 3, 4, 5].map((value) => ({ label: String(value), value }))

const ClassificationFields = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()

  const typeOptions = [
    ...toOptions(avalancheTypes, (key) => t(`common.avalancheTypes.${key}`)),
    { label: t('common.avalancheTypes.unknown'), value: 'unknown' },
  ]
  const triggerOptions = toOptions(avalancheTriggersOrdered, (key) =>
    t(`common.avalancheTriggers.${key}`),
  )

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <InputBlock
        error={form.formState.errors.type?.message}
        label={t('observations.submit.labels.type')}
        required
      >
        <Controller
          control={form.control}
          name="type"
          render={({ field }) => (
            <Select
              hasError={!!form.formState.errors.type}
              onChange={field.onChange}
              options={typeOptions}
              placeholder={t('observations.submit.placeholders.type')}
              value={field.value ?? undefined}
            />
          )}
        />
      </InputBlock>

      <InputBlock
        error={form.formState.errors.trigger?.message}
        label={t('observations.submit.labels.trigger')}
        required
      >
        <Controller
          control={form.control}
          name="trigger"
          render={({ field }) => (
            <Select
              hasError={!!form.formState.errors.trigger}
              onChange={field.onChange}
              options={triggerOptions}
              placeholder={t('observations.submit.placeholders.trigger')}
              value={field.value ?? undefined}
            />
          )}
        />
      </InputBlock>

      <InputBlock
        error={form.formState.errors.size?.message}
        label={t('observations.submit.labels.size')}
      >
        <Controller
          control={form.control}
          name="size"
          render={({ field }) => (
            <RadioGroup
              onChange={(value) => field.onChange(Number(value))}
              options={sizeOptions}
              value={field.value}
            />
          )}
        />
      </InputBlock>

      <MeasurementFields />
    </div>
  )
}

export default ClassificationFields
