import { Field as BaseField } from '@base-ui/react/field'

import FieldLabelRow from './FieldLabelRow'
import RequiredMark from './RequiredMark'
import type { FieldChromeProps } from './types'
import { fieldDescriptionClasses, fieldErrorClasses, fieldLabelClasses } from './types'

import { cn } from '@/lib/utils'

type FieldProps = FieldChromeProps & {
  children: React.ReactNode
  // 'horizontal' puts the label and a compact control (e.g. a stepper) on one row
  orientation?: 'horizontal' | 'vertical'
}

// One labelled control. base-ui wires the <label>, description and error to the control
// (Input, NumberField, Field.Control) for us — including aria-describedby / aria-invalid.
const Field = ({
  children,
  className,
  description,
  error,
  hint,
  isLabelHidden,
  label,
  orientation = 'vertical',
  required,
}: FieldProps) => (
  <BaseField.Root className={cn('flex flex-col gap-2', className)} invalid={!!error}>
    <div
      className={cn(
        'flex gap-2',
        orientation === 'horizontal' ? 'items-center justify-between' : 'flex-col',
      )}
    >
      <FieldLabelRow hint={orientation === 'vertical' ? hint : undefined}>
        <BaseField.Label className={cn(fieldLabelClasses, isLabelHidden && 'sr-only')}>
          {label}
          {required && <RequiredMark />}
        </BaseField.Label>
      </FieldLabelRow>
      {children}
    </div>
    {description && (
      <BaseField.Description className={fieldDescriptionClasses}>
        {description}
      </BaseField.Description>
    )}
    {error && (
      <BaseField.Error className={fieldErrorClasses} data-field-error match>
        {error}
      </BaseField.Error>
    )}
  </BaseField.Root>
)

export default Field
