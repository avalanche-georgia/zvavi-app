/* eslint-disable react/jsx-props-no-spreading */
import { Input } from '@base-ui/react/input'

import { fieldControlClasses, InputUnit } from '../Field'

import { cn } from '@/lib/utils'

type TextFieldProps = Omit<Input.Props, 'className' | 'onValueChange' | 'value'> & {
  className?: string
  onValueChange: (value: string) => void
  unit?: string
  value: string
}

// Single-line text input. Put it inside <Field> for the label and error wiring.
const TextField = ({ className, onValueChange, unit, value, ...props }: TextFieldProps) => (
  <div className={cn('relative', className)}>
    <Input
      {...props}
      className={cn(fieldControlClasses, 'focus-ring h-11.5 px-3', unit && 'pr-10')}
      onValueChange={onValueChange}
      value={value}
    />
    {unit && <InputUnit>{unit}</InputUnit>}
  </div>
)

export default TextField
