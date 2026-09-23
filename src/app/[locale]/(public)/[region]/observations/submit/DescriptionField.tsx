'use client'

import { InputBlock, Textarea } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import useFieldError from './hooks/useFieldError'

import type { ObservationSubmitFormSchema } from './schema'

const DescriptionField = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const getFieldError = useFieldError()

  return (
    <InputBlock
      error={getFieldError('description')}
      label={t('observations.submit.labels.description')}
    >
      <Controller
        control={form.control}
        name="description"
        render={({ field }) => (
          <Textarea
            onChange={field.onChange}
            placeholder={t('observations.submit.placeholders.description')}
            rows={4}
            value={field.value ?? ''}
          />
        )}
      />
    </InputBlock>
  )
}

export default DescriptionField
