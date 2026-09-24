'use client'

import {
  Aspects,
  AvalancheSize,
  InputBlock,
  type SetAspectsData,
} from '@components/features/admin/Forecasts/ForecastForm/common'
import { useFieldError } from '@components/hooks'
import { NumberInput } from '@components/ui'
import { avalancheFieldLimits } from '@domain/constants'
import type {
  Aspects as AspectsType,
  Avalanche,
  AvalancheSize as AvalancheSizeType,
} from '@domain/types'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import DateField from './DateField'
import type { AvalancheFormSchema } from './schema'

const TopSection = () => {
  const t = useTranslations()
  const form = useFormContext<AvalancheFormSchema>()
  const getFieldError = useFieldError<AvalancheFormSchema>()

  return (
    // One column in the narrow side panel, two on the full page
    <div className="grid grid-cols-1 items-start gap-x-6 gap-y-3 @4xl:grid-cols-2">
      <div className="flex flex-col gap-3">
        <DateField />

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

        <InputBlock
          error={getFieldError('quantity')}
          label={t('admin.recentAvalanches.form.labels.quantity')}
          labelClassName="w-32"
        >
          <Controller
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <NumberInput
                className="w-42"
                max={avalancheFieldLimits.quantity.max}
                min={avalancheFieldLimits.quantity.min}
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
