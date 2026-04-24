import { format, setHours, setMinutes } from 'date-fns'

import TimeInput from './TimeInput'

type DatePickerTimeInputProps = {
  onChange: (date: Date) => void
  value: Date | null
}

const DatePickerTimeInput = ({ onChange, value }: DatePickerTimeInputProps) => {
  const handleChange = (time: string): void => {
    if (!time) return

    const [hours, minutes] = time.split(':').map(Number)
    const base = value ?? new Date()

    onChange(setMinutes(setHours(base, hours), minutes))
  }

  return (
    <div className="border-t px-3 py-2">
      <TimeInput onChange={handleChange} value={value ? format(value, 'HH:mm') : ''} />
    </div>
  )
}

export default DatePickerTimeInput
