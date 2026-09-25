import { NumberField as BaseNumberField } from '@base-ui/react/number-field'

import { fieldControlClasses, InputUnit } from '../Field'

import { cn } from '@/lib/utils'

type NumberFieldProps = {
  className?: string
  max?: number
  min?: number
  onValueChange: (value: number | null) => void
  placeholder?: string
  unit?: string
  value: number | null
}

// Free-typed number without steppers (e.g. dimensions). Empty input → null.
const NumberField = ({
  className,
  max,
  min,
  onValueChange,
  placeholder,
  unit,
  value,
}: NumberFieldProps) => (
  <BaseNumberField.Root
    className={cn('relative', className)}
    max={max}
    min={min}
    onValueChange={onValueChange}
    value={value}
  >
    <BaseNumberField.Input
      className={cn(fieldControlClasses, 'focus-ring h-11.5 px-3 tabular-nums', unit && 'pr-10')}
      placeholder={placeholder}
    />
    {unit && <InputUnit>{unit}</InputUnit>}
  </BaseNumberField.Root>
)

export default NumberField
