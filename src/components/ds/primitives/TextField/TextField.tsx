/* eslint-disable react/jsx-props-no-spreading */
import { Input } from '@base-ui/react/input'

import { fieldControlClasses, InputUnit } from '../Field'

import { cn } from '@/lib/utils'

type TextFieldProps = Omit<Input.Props, 'className' | 'onValueChange' | 'value'> & {
  className?: string
  // Decorative icon inside the control, before the text (e.g. a platform logo)
  leading?: React.ReactNode
  onValueChange: (value: string) => void
  // "12/24" inside the control, at the end; needs `maxLength`
  showCount?: boolean
  unit?: string
  value: string
}

// Single-line text input. Put it inside <Field> for the label and error wiring.
const TextField = ({
  className,
  leading,
  onValueChange,
  showCount = false,
  unit,
  value,
  ...props
}: TextFieldProps) => {
  const { maxLength } = props
  const count = showCount && maxLength ? `${value.length}/${maxLength}` : null

  return (
    <div className={cn('relative', className)}>
      {leading && (
        <span
          aria-hidden
          className="text-muted pointer-events-none absolute top-1/2 left-3.5 flex -translate-y-1/2"
        >
          {leading}
        </span>
      )}
      <Input
        {...props}
        className={cn(
          fieldControlClasses,
          'focus-ring h-11.5 px-3',
          leading && 'pl-10.5',
          unit && 'pr-10',
          count && 'pr-16',
        )}
        onValueChange={onValueChange}
        value={value}
      />
      {unit && <InputUnit>{unit}</InputUnit>}
      {/* Screen readers get the limit from maxLength itself */}
      {count && <InputUnit className="text-caption tabular-nums">{count}</InputUnit>}
    </div>
  )
}

export default TextField
