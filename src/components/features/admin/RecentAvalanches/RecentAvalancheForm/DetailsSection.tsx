/* eslint-disable max-lines */
'use client'

import { InputBlock, NumberInput, Select, Textarea, TextInput, toOptions } from '@components/ui'
import { avalancheTriggers, avalancheTypes } from '@domain/constants'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'

const DetailsSection = () => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()

  const typeOptions = [
    ...toOptions(avalancheTypes, (key) => t(`common.avalancheTypes.${key}`)),
    { label: t('common.avalancheTypes.unknown'), value: 'unknown' },
  ]

  const triggerOptions = [
    ...Object.keys(avalancheTriggers)
      .filter((key) => key !== 'unknown')
      .map((key) => ({ label: t(`common.avalancheTriggers.${key}`), value: key })),
    { label: t('common.words.unknown'), value: 'unknown' },
  ]

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="grid grid-cols-2 gap-3">
          <InputBlock
            error={form.formState.errors.type?.message}
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
            error={form.formState.errors.trigger?.message}
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

          <InputBlock label={t('admin.recentAvalanches.form.labels.slabDepth')}>
            <Controller
              control={form.control}
              name="slabDepth"
              render={({ field }) => (
                <NumberInput min={1} onValueChange={field.onChange} value={field.value} />
              )}
            />
          </InputBlock>

          <InputBlock label={t('admin.recentAvalanches.form.labels.width')}>
            <Controller
              control={form.control}
              name="width"
              render={({ field }) => (
                <NumberInput min={1} onValueChange={field.onChange} value={field.value} />
              )}
            />
          </InputBlock>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <InputBlock
            className="col-span-2"
            label={t('admin.recentAvalanches.form.labels.location')}
          >
            <Controller
              control={form.control}
              name="location"
              render={({ field }) => (
                <TextInput onChange={field.onChange} value={field.value ?? ''} />
              )}
            />
          </InputBlock>

          <InputBlock label={t('admin.recentAvalanches.form.labels.latitude')}>
            <Controller
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <NumberInput onValueChange={field.onChange} value={field.value} />
              )}
            />
          </InputBlock>

          <InputBlock label={t('admin.recentAvalanches.form.labels.longitude')}>
            <Controller
              control={form.control}
              name="longitude"
              render={({ field }) => (
                <NumberInput onValueChange={field.onChange} value={field.value} />
              )}
            />
          </InputBlock>
        </div>
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
