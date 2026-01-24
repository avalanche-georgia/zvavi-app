import { useCallback } from 'react'
import { Checkbox } from '@components'
import { dateTimeFormat } from '@domain/constants'
import type { Avalanche } from '@domain/types'
import { useTranslations } from 'next-intl'
import ReactDatePicker from 'react-datepicker'

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
      setData((prev) => ({
        ...prev,
        date: value,
      }))
    },
    [setData],
  )

  const handleDateUnknownChange = useCallback(
    (isChecked: boolean) => {
      setData((prev) => ({
        ...prev,
        date: isChecked ? null : prev.date,
        isDateUnknown: isChecked,
      }))
    },
    [setData],
  )

  return (
    <InputBlock label={t('admin.forecast.form.recentAvalanches.labels.date')} labelClassName="w-32">
      <div className="flex items-center gap-4">
        <div>
          <ReactDatePicker
            className="h-8 rounded bg-gray-100 px-2 disabled:cursor-not-allowed disabled:bg-gray-50"
            dateFormat={dateTimeFormat}
            disabled={data.isDateUnknown}
            onChange={handleDateChange}
            selected={toDate(data.date)}
            showTimeSelect
          />
        </div>
        <Checkbox
          className="bg-gray-200"
          isChecked={data.isDateUnknown}
          label={t('admin.forecast.form.recentAvalanches.labels.dateUnknown')}
          onChange={handleDateUnknownChange}
        />
      </div>
    </InputBlock>
  )
}

export default DateSection
