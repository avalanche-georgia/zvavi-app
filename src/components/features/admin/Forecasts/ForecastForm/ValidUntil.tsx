import { DateTimePicker } from '@components/ui'
import { useTranslations } from 'next-intl'
import { Controller, useFormContext } from 'react-hook-form'

import { InputBlock } from './common'
import type { ForecastFormSchema } from './schema'

type ValidUntilProps = {
  error?: string
}

const dateTimePickerClassName = 'h-8 rounded bg-gray-100 px-2'

const ValidUntil = ({ error }: ValidUntilProps) => {
  const t = useTranslations()
  const { control } = useFormContext<ForecastFormSchema>()

  return (
    <InputBlock error={error} label={t('admin.forecast.form.general.labels.validUntil')} required>
      <Controller
        control={control}
        name="validUntil"
        render={({ field }) => (
          <DateTimePicker
            className={dateTimePickerClassName}
            onChange={(date) => field.onChange(date)}
            value={field.value}
          />
        )}
      />
    </InputBlock>
  )
}

export default ValidUntil
