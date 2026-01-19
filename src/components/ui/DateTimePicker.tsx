'use client'

import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

type DateTimePickerProps = {
  className?: string
  dateFormat?: string
  onChange: (date: Date | null) => void
  value: Date | null
}

const DateTimePicker = ({
  className,
  dateFormat = 'dd.MM.yyyy HH:mm',
  onChange,
  value,
}: DateTimePickerProps) => (
  <ReactDatePicker
    className={className}
    dateFormat={dateFormat}
    onChange={onChange}
    selected={value}
    showTimeSelect
  />
)

export default DateTimePicker
