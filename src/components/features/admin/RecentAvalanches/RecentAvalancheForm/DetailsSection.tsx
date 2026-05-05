'use client'

import { InputBlock, Textarea } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import ClassificationFields from './ClassificationFields'
import LocationFields from './LocationFields'
import type { AvalancheFormSchema } from './schema'

const DetailsSection = () => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <ClassificationFields />
        <LocationFields />
      </div>

      <InputBlock label={t('admin.recentAvalanches.form.labels.involvement')}>
        <Controller
          control={form.control}
          name="involvement"
          render={({ field }) => (
            <Textarea onChange={field.onChange} rows={2} value={field.value ?? ''} />
          )}
        />
      </InputBlock>

      <InputBlock label={t('admin.recentAvalanches.form.labels.description')}>
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
