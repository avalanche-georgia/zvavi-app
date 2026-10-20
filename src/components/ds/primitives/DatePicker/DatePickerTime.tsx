import { Field as BaseField } from '@base-ui/react/field'

import type { ControlSize } from '../Field'
import { TimeField } from '../TimeField'

type DatePickerTimeProps = {
  ariaLabel?: string
  disabled: boolean
  onTimeChange: (time: string | null) => void
  size: ControlSize
  // HH:mm
  value: string
}

// The time beside a DatePicker. Its own Field root, so the outer <Field> label
// keeps naming the date; the outer error still reaches the border
// (`in-data-invalid`).
const DatePickerTime = ({
  ariaLabel,
  disabled,
  onTimeChange,
  size,
  value,
}: DatePickerTimeProps) => (
  <BaseField.Root className="shrink-0">
    <TimeField
      ariaLabel={ariaLabel}
      disabled={disabled}
      onValueChange={onTimeChange}
      size={size}
      value={value}
    />
  </BaseField.Root>
)

export default DatePickerTime
