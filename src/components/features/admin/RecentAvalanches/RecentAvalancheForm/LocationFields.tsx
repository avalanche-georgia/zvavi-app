'use client'

import { InputBlock, NumberInput, TextInput } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'

const LocationFields = () => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()

  return (
    <div className="grid grid-cols-2 gap-3">
      <InputBlock className="col-span-2" label={t('admin.recentAvalanches.form.labels.location')}>
        <Controller
          control={form.control}
          name="location"
          render={({ field }) => <TextInput onChange={field.onChange} value={field.value ?? ''} />}
        />
      </InputBlock>

      <InputBlock label={t('admin.recentAvalanches.form.labels.latitude')}>
        <Controller
          control={form.control}
          name="latitude"
          render={({ field }) => <NumberInput onValueChange={field.onChange} value={field.value} />}
        />
      </InputBlock>

      <InputBlock label={t('admin.recentAvalanches.form.labels.longitude')}>
        <Controller
          control={form.control}
          name="longitude"
          render={({ field }) => <NumberInput onValueChange={field.onChange} value={field.value} />}
        />
      </InputBlock>
    </div>
  )
}

export default LocationFields
