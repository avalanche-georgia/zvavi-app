'use client'

import {
  Aspects,
  AvalancheSize,
  InputBlock,
  type SetAspectsData,
} from '@components/features/admin/Forecasts/ForecastForm/common'
import { Checkbox, DatePicker, NumberInput } from '@components/ui'
import type {
  Aspects as AspectsType,
  Avalanche,
  AvalancheSize as AvalancheSizeType,
} from '@domain/types'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import type { AvalancheFormSchema } from './schema'

const today = new Date()

const TopSection = () => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()
  const isDateUnknown = form.watch('isDateUnknown')

  return (
    <div className="grid grid-cols-2 items-start gap-x-6">
      <div className="flex flex-col gap-3">
        <InputBlock
          error={form.formState.errors.date?.message}
          label={t('common.labels.date')}
          labelClassName="w-32"
        >
          <Controller
            control={form.control}
            name="date"
            render={({ field }) => (
              <DatePicker
                className="h-8 w-42"
                disabled={isDateUnknown}
                hasError={!!form.formState.errors.date}
                maxDate={today}
                onChange={field.onChange}
                value={field.value}
              />
            )}
          />
          <Controller
            control={form.control}
            name="isDateUnknown"
            render={({ field }) => (
              <Checkbox
                isChecked={field.value}
                label={t('admin.recentAvalanches.form.labels.isDateUnknown')}
                onChange={field.onChange}
              />
            )}
          />
        </InputBlock>

        <Controller
          control={form.control}
          name="size"
          render={({ field }) => (
            <AvalancheSize
              onChange={field.onChange as (value: AvalancheSizeType) => void}
              value={field.value}
            />
          )}
        />

        <InputBlock label={t('admin.recentAvalanches.form.labels.quantity')} labelClassName="w-32">
          <Controller
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <NumberInput
                className="w-42"
                min={1}
                onValueChange={field.onChange}
                value={field.value}
              />
            )}
          />
        </InputBlock>
      </div>

      <Controller
        control={form.control}
        name="aspects"
        render={({ field }) => {
          const fakeData = { aspects: field.value as AspectsType } as Avalanche

          const fakeSetData: SetAspectsData = (updater) => {
            if (typeof updater === 'function') {
              const result = updater(fakeData)

              field.onChange((result as { aspects: AspectsType }).aspects)
            }
          }

          return <Aspects data={fakeData} setData={fakeSetData} />
        }}
      />
    </div>
  )
}

export default TopSection
