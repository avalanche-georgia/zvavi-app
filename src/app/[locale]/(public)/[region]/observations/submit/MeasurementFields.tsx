'use client'

import { InputBlock, NumberInput } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const MeasurementFields = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()

  return (
    <>
      <InputBlock
        error={form.formState.errors.quantity?.message}
        label={t('observations.submit.labels.quantity')}
      >
        <Controller
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <NumberInput
              className="w-28"
              min={1}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </InputBlock>

      <InputBlock label={t('observations.submit.labels.slabDepth')}>
        <Controller
          control={form.control}
          name="slabDepth"
          render={({ field }) => (
            <NumberInput
              className="w-28"
              min={1}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </InputBlock>

      <InputBlock label={t('observations.submit.labels.width')}>
        <Controller
          control={form.control}
          name="width"
          render={({ field }) => (
            <NumberInput
              className="w-28"
              min={1}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </InputBlock>
    </>
  )
}

export default MeasurementFields
