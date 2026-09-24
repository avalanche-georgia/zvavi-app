'use client'

import { useFieldError } from '@components/hooks'
import { InputBlock, NumberInput, TextInput } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'

const LocationFields = ({ isLocationRequired }: { isLocationRequired: boolean }) => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()
  const { errors } = form.formState

  const getFieldError = useFieldError<AvalancheFormSchema>()

  return (
    <div className="grid grid-cols-2 gap-3">
      <InputBlock
        className="col-span-2"
        error={getFieldError('location')}
        label={t('admin.recentAvalanches.form.labels.location')}
      >
        <Controller
          control={form.control}
          name="location"
          render={({ field }) => <TextInput onChange={field.onChange} value={field.value ?? ''} />}
        />
      </InputBlock>

      <InputBlock
        error={getFieldError('latitude')}
        label={t('admin.recentAvalanches.form.labels.latitude')}
        required={isLocationRequired}
      >
        <Controller
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <NumberInput
              hasError={!!errors.latitude}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </InputBlock>

      <InputBlock
        error={getFieldError('longitude')}
        label={t('admin.recentAvalanches.form.labels.longitude')}
        required={isLocationRequired}
      >
        <Controller
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <NumberInput
              hasError={!!errors.longitude}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </InputBlock>
    </div>
  )
}

export default LocationFields
