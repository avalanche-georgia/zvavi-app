import { dateTimeFormat } from '@domain/constants'
import { useTranslations } from 'next-intl'
import ReactDatePicker from 'react-datepicker'
import { Controller, useFormContext } from 'react-hook-form'

import { InputBlock } from './common'
import type { ForecastFormSchema } from './schema'

type ValidUntilProps = {
  error?: string
}

const ValidUntil = ({ error }: ValidUntilProps) => {
  const t = useTranslations()
  const { control } = useFormContext<ForecastFormSchema>()

  return (
    <InputBlock error={error} label={t('admin.forecast.form.general.labels.validUntil')} required>
      <Controller
        control={control}
        name="validUntil"
        render={({ field }) => (
          <ReactDatePicker
            className="h-8 rounded bg-gray-100 px-2"
            dateFormat={dateTimeFormat}
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            showTimeSelect
          />
        )}
      />
    </InputBlock>
  )
}

export default ValidUntil
