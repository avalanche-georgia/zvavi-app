'use client'

import { useFieldError } from '@components/hooks'
import { InputBlock, Textarea } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import ClassificationFields from './ClassificationFields'
import LocationFields from './LocationFields'
import type { AvalancheFormSchema } from './schema'

const DetailsSection = ({ isLocationRequired }: { isLocationRequired: boolean }) => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()
  const getFieldError = useFieldError<AvalancheFormSchema>()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <ClassificationFields />
        <LocationFields isLocationRequired={isLocationRequired} />
      </div>

      {/* Used for internal purposes only — deliberately not exposed on the public
          observation submission form (see src/app/api/observations/schema.ts). */}
      <InputBlock
        error={getFieldError('involvement')}
        label={t('admin.recentAvalanches.form.labels.involvement')}
      >
        <Controller
          control={form.control}
          name="involvement"
          render={({ field }) => (
            <Textarea onChange={field.onChange} rows={2} value={field.value ?? ''} />
          )}
        />
      </InputBlock>

      <InputBlock
        error={getFieldError('description')}
        label={t('admin.recentAvalanches.form.labels.description')}
      >
        <Controller
          control={form.control}
          name="description"
          render={({ field }) => (
            <Textarea onChange={field.onChange} rows={4} value={field.value} />
          )}
        />
      </InputBlock>
    </div>
  )
}

export default DetailsSection
