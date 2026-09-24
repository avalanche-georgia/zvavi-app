'use client'

import { useFieldError } from '@components/hooks'
import { InputBlock, NumberInput } from '@components/ui'
import { avalancheFieldLimits } from '@domain/constants'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const MeasurementFields = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const getFieldError = useFieldError<ObservationSubmitFormSchema>()

  return (
    <>
      <InputBlock
        error={getFieldError('quantity')}
        label={t('observations.submit.labels.quantity')}
      >
        <Controller
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <NumberInput
              className="w-28"
              max={avalancheFieldLimits.quantity.max}
              min={avalancheFieldLimits.quantity.min}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </InputBlock>

      <div className="flex gap-4 sm:col-span-2">
        <InputBlock label={t('observations.submit.labels.slabDepth')}>
          <Controller
            control={form.control}
            name="slabDepth"
            render={({ field }) => (
              <NumberInput
                className="w-28"
                max={avalancheFieldLimits.slabDepth.max}
                min={avalancheFieldLimits.slabDepth.min}
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
                max={avalancheFieldLimits.width.max}
                min={avalancheFieldLimits.width.min}
                onValueChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </InputBlock>
      </div>
    </>
  )
}

export default MeasurementFields
