import { useCallback } from 'react'
import { DatePicker } from '@components/ui'
import type { BaseFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

import { InputBlock } from './common'

type ValidUntilProps = {
  formData: BaseFormData
  setFormData: (value: React.SetStateAction<BaseFormData>) => void
}

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
      <DatePicker
        className="h-8 rounded bg-gray-100 px-2"
        dateFormat="dd.MM.yyyy HH:mm"
        onChange={handleValidUntilChange}
        selected={formData.validUntil}
        showTimeSelect
      />
    </InputBlock>
  )
}

export default ValidUntil
