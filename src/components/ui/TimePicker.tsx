'use client'

import ReactDatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

type TimePickerProps = {
  className?: string
  isClearable?: boolean
  onChange: (date: Date | null) => void
  placeholder?: string
  value: Date | null
}

const TimePicker = ({
  className,
  isClearable = false,
  onChange,
  placeholder,
  value,
}: TimePickerProps) => (
  <ReactDatePicker
    className={className}
    dateFormat="HH:mm"
    isClearable={isClearable}
    onChange={onChange}
    placeholderText={placeholder}
    selected={value}
    showTimeSelect
    showTimeSelectOnly
    timeFormat="HH:mm"
  />
)

export default TimePicker
