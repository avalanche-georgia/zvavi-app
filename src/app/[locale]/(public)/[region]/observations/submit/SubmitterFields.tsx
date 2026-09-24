'use client'

import { useFieldError } from '@components/hooks'
import { InputBlock, Textarea, TextInput } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from './schema'

const SubmitterFields = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const getFieldError = useFieldError<ObservationSubmitFormSchema>()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <InputBlock
        error={getFieldError('submitterName')}
        label={t('observations.submit.labels.submitterName')}
        required
      >
        <Controller
          control={form.control}
          name="submitterName"
          render={({ field }) => (
            <TextInput
              onChange={field.onChange}
              placeholder={t('observations.submit.placeholders.submitterName')}
              value={field.value ?? ''}
            />
          )}
        />
      </InputBlock>

      <InputBlock
        error={getFieldError('submitterEducation')}
        label={t('observations.submit.labels.submitterEducation')}
        optional
      >
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

      <div className="sm:col-span-2">
        <InputBlock
          error={getFieldError('submitterContact')}
          label={t('observations.submit.labels.submitterContact')}
          optional
        >
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
    </div>
  )
}

export default SubmitterFields
