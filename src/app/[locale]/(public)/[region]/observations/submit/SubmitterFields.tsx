'use client'

import { InputBlock, Textarea, TextInput } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const SubmitterFields = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()

  return (
    <div className="flex flex-col gap-3">
      <InputBlock label={t('observations.submit.labels.submitterName')}>
        <Controller
          control={form.control}
          name="submitterName"
          render={({ field }) => <TextInput onChange={field.onChange} value={field.value ?? ''} />}
        />
      </InputBlock>

      <InputBlock label={t('observations.submit.labels.submitterEducation')}>
        <Controller
          control={form.control}
          name="submitterEducation"
          render={({ field }) => (
            <TextInput
              onChange={field.onChange}
              placeholder={t('observations.submit.placeholders.submitterEducation')}
              value={field.value ?? ''}
            />
          )}
        />
      </InputBlock>

      <InputBlock label={t('observations.submit.labels.submitterContact')}>
        <Controller
          control={form.control}
          name="submitterContact"
          render={({ field }) => (
            <Textarea
              onChange={field.onChange}
              placeholder={t('observations.submit.placeholders.submitterContact')}
              rows={2}
              value={field.value ?? ''}
            />
          )}
        />
      </InputBlock>
    </div>
  )
}

export default SubmitterFields
