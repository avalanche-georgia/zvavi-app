import { useCallback } from 'react'
import { Checkbox } from '@components'
import { DatePicker } from '@components/ui'
import type { AvalancheFormData } from '@domain/types'
import { useTranslations } from 'next-intl'

import { InputBlock } from '../../common'

type DateSectionProps = {
  data: AvalancheFormData
  error?: string
  setData: React.Dispatch<React.SetStateAction<AvalancheFormData>>
}

const DateSection = ({ data, error, setData }: DateSectionProps) => {
  const t = useTranslations()

  const handleDateChange = useCallback(
    (value: Date | null) => {
      setData((prev) => ({ ...prev, date: value }))
    },
    [setData],
  )

  const handleDateUnknownChange = useCallback(
    (isChecked: boolean) => {
      setData((prev) => ({ ...prev, isDateUnknown: isChecked }))
    },
    [setData],
  )

  return (
    <InputBlock
      error={error}
      label={t('admin.forecast.form.recentAvalanches.labels.date')}
      labelClassName="w-32"
    >
      <DatePicker
        className="h-8 w-42"
        disabled={data.isDateUnknown}
        hasError={!!error}
        maxDate={new Date()}
        onChange={handleDateChange}
        showTime
        value={data.date}
      />
      <Checkbox
        isChecked={data.isDateUnknown}
        label={t('admin.forecast.form.recentAvalanches.labels.dateUnknown')}
        onChange={handleDateUnknownChange}
      />
    </InputBlock>
  )
}

export default DateSection
