'use client'

import { useFieldError } from '@components/hooks'
import { type FieldValues, useController } from 'react-hook-form'

import type { FormFieldProps } from './types'
import { Field, Stepper } from '../primitives'

type FormStepperProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  decrementLabel: string
  incrementLabel: string
  max?: number
  min?: number
}

// Label and stepper share one row
const FormStepper = <TFieldValues extends FieldValues>({
  className,
  decrementLabel,
  description,
  incrementLabel,
  label,
  max,
  min,
  name,
  required,
}: FormStepperProps<TFieldValues>) => {
  const { field } = useController<TFieldValues>({ name })
  const getFieldError = useFieldError<TFieldValues>()

  return (
    <Field
      className={className}
      description={description}
      error={getFieldError(name)}
      label={label}
      orientation="horizontal"
      required={required}
    >
      <Stepper
        decrementLabel={decrementLabel}
        incrementLabel={incrementLabel}
        max={max}
        min={min}
        onValueChange={field.onChange}
        value={field.value}
      />
    </Field>
  )
}

export default FormStepper
