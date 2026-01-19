import { useCallback } from 'react'
import { DateTimePicker } from '@components/ui'
import type { BaseFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

import { InputBlock } from './common'

type ValidUntilProps = {
  formData: BaseFormData
  setFormData: (value: React.SetStateAction<BaseFormData>) => void
}

const dateTimePickerClassName = 'h-8 rounded bg-gray-100 px-2'

const ValidUntil = ({ formData, setFormData }: ValidUntilProps) => {
  const tForecast = useTranslations('admin.forecast')

  const handleValidUntilChange = useCallback(
    (value: Date | null) => {
      setFormData((prev) => ({
        ...prev,
        validUntil: value,
      }))
    },
    [setFormData],
  )

  return (
    <InputBlock label={tForecast('form.general.labels.validUntil')}>
      <DateTimePicker
        className={dateTimePickerClassName}
        onChange={handleValidUntilChange}
        value={formData.validUntil}
      />
    </InputBlock>
  )
}

export default ValidUntil
