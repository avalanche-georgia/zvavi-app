import { useId } from 'react'
import { Fieldset } from '@base-ui/react/fieldset'

import FieldLabelRow from './FieldLabelRow'
import RequiredMark from './RequiredMark'
import type { FieldChromeProps } from './types'
import { fieldDescriptionClasses, fieldErrorClasses, fieldLabelClasses } from './types'

import { cn } from '@/lib/utils'

type FieldGroupProps = FieldChromeProps & {
  children: React.ReactNode
}

// A labelled group of controls (chips, toggle grids): <fieldset> + legend, so assistive
// tech announces the label when focus enters any option.
const FieldGroup = ({
  children,
  className,
  description,
  error,
  hint,
  isLabelHidden,
  label,
  required,
}: FieldGroupProps) => {
  const id = useId()
  const descriptionId = `${id}-description`
  const errorId = `${id}-error`
  const describedBy = [description && descriptionId, error && errorId].filter(Boolean).join(' ')

  return (
    <Fieldset.Root
      aria-describedby={describedBy || undefined}
      className={cn('flex min-w-0 flex-col gap-2', className)}
    >
      <FieldLabelRow hint={hint}>
        <Fieldset.Legend className={cn(fieldLabelClasses, isLabelHidden && 'sr-only')}>
          {label}
          {required && <RequiredMark />}
        </Fieldset.Legend>
      </FieldLabelRow>
      {children}
      {description && (
        <div className={fieldDescriptionClasses} id={descriptionId}>
          {description}
        </div>
      )}
      {error && (
        <p className={fieldErrorClasses} data-field-error id={errorId}>
          {error}
        </p>
      )}
    </Fieldset.Root>
  )
}

export default FieldGroup
