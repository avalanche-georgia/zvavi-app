'use client'

import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

type DateTimePickerProps = {
  className?: string
  dateFormat?: string
  disabled?: boolean
  onChange: (date: Date | null) => void
  value: Date | null
}

const DateTimePicker = ({
  className,
  dateFormat = 'dd.MM.yyyy HH:mm',
  disabled,
  onChange,
  value,
}: DateTimePickerProps) => (
  <ReactDatePicker
    className={className}
    dateFormat={dateFormat}
    disabled={disabled}
    onChange={onChange}
    selected={value}
    showTimeSelect
  />
)

export default DateTimePicker
