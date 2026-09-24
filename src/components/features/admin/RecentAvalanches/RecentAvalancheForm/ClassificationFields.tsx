'use client'

import { useFieldError } from '@components/hooks'
import { InputBlock, NumberInput, Select, toOptions } from '@components/ui'
import {
  avalancheFieldLimits,
  avalancheTriggersOrdered,
  avalancheTypesOrdered,
} from '@domain/constants'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'

const ClassificationFields = () => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()
  const getFieldError = useFieldError<AvalancheFormSchema>()

  const typeOptions = toOptions(avalancheTypesOrdered, (key) => t(`common.avalancheTypes.${key}`))

  const triggerOptions = toOptions(avalancheTriggersOrdered, (key) =>
    t(`common.avalancheTriggers.${key}`),
  )

  return (
    <div className="grid grid-cols-2 gap-3">
      <InputBlock
        error={getFieldError('type')}
        label={t('admin.recentAvalanches.form.labels.type')}
      >
        <Controller
          control={form.control}
          name="type"
          render={({ field }) => (
            <Select
              hasError={!!form.formState.errors.type}
              onChange={field.onChange}
              options={typeOptions}
              placeholder={t('admin.recentAvalanches.form.placeholders.type')}
              value={field.value ?? undefined}
            />
          )}
        />
      </InputBlock>

      <InputBlock
        error={getFieldError('trigger')}
        label={t('admin.recentAvalanches.form.labels.trigger')}
      >
        <Controller
          control={form.control}
          name="trigger"
          render={({ field }) => (
            <Select
              hasError={!!form.formState.errors.trigger}
              onChange={field.onChange}
              options={triggerOptions}
              placeholder={t('admin.recentAvalanches.form.placeholders.trigger')}
              value={field.value ?? undefined}
            />
          )}
        />
      </InputBlock>

      <InputBlock
        error={getFieldError('slabDepth')}
        label={t('admin.recentAvalanches.form.labels.slabDepth')}
      >
        <Controller
          control={form.control}
          name="slabDepth"
          render={({ field }) => (
            <NumberInput
              hasError={!!form.formState.errors.slabDepth}
              max={avalancheFieldLimits.slabDepth.max}
              min={avalancheFieldLimits.slabDepth.min}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </InputBlock>

      <InputBlock
        error={getFieldError('width')}
        label={t('admin.recentAvalanches.form.labels.width')}
      >
        <Controller
          control={form.control}
          name="width"
          render={({ field }) => (
            <NumberInput
              hasError={!!form.formState.errors.width}
              max={avalancheFieldLimits.width.max}
              min={avalancheFieldLimits.width.min}
              onValueChange={field.onChange}
              value={field.value}
            />
          )}
        />
      </InputBlock>
    </div>
  )
}

export default ClassificationFields
