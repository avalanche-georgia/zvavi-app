'use client'

import { InputBlock, Textarea } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const DescriptionField = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()

  return (
    <InputBlock
      error={form.formState.errors.description?.message}
      label={t('observations.submit.labels.description')}
    >
      <Controller
        control={form.control}
        name="description"
        render={({ field }) => (
          <Textarea onChange={field.onChange} rows={4} value={field.value ?? ''} />
        )}
      />
    </InputBlock>
  )
}

export default DescriptionField
