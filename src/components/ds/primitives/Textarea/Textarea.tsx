import { Field } from '@base-ui/react/field'

import { fieldControlClasses } from '../Field'

import { cn } from '@/lib/utils'

type TextareaProps = {
  className?: string
  maxLength?: number
  onValueChange: (value: string) => void
  placeholder?: string
  value: string
}

// Multi-line text. Rendered through Field.Control so it joins the surrounding <Field>.
const Textarea = ({ className, maxLength, onValueChange, placeholder, value }: TextareaProps) => (
  <Field.Control
    className={cn(fieldControlClasses, 'focus-ring min-h-28 resize-y px-3 py-2.5', className)}
    maxLength={maxLength}
    onValueChange={onValueChange}
    placeholder={placeholder}
    render={<textarea />}
    value={value}
  />
)

export default Textarea
