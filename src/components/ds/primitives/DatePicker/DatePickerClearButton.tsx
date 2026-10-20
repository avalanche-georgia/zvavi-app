import { X } from 'lucide-react'

import { IconButton } from '../IconButton'

type DatePickerClearButtonProps = {
  label: string
  onClear: VoidFunction
}

// The × over the trigger's right edge, beside (not inside) the trigger button
const DatePickerClearButton = ({ label, onClear }: DatePickerClearButtonProps) => (
  <IconButton
    aria-label={label}
    className="absolute top-1/2 right-1 -translate-y-1/2"
    onClick={onClear}
  >
    <X aria-hidden className="size-4" />
  </IconButton>
)

export default DatePickerClearButton
