import { useCallback } from 'react'
import { Checkbox } from '@components'
import { DatePicker } from '@components/ui'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'

import { InputBlock } from '../../common'

const toDate = (value: Date | string | null): Date | null => {
  if (!value) return null
  if (value instanceof Date) return value

  return new Date(value)
}

type DateSectionProps = {
  data: Avalanche
  setData: React.Dispatch<React.SetStateAction<Avalanche>>
}

const DateSection = ({ data, setData }: DateSectionProps) => {
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
    <InputBlock label={t('admin.forecast.form.recentAvalanches.labels.date')} labelClassName="w-32">
      <DatePicker
        className="h-8 w-42"
        disabled={data.isDateUnknown}
        maxDate={new Date()}
        onChange={handleDateChange}
        showTime
        value={toDate(data.date)}
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
