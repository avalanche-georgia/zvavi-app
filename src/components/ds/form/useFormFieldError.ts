import { useFieldError } from '@components/hooks'
import { type FieldPath, type FieldValues, get, useFormState } from 'react-hook-form'

// Translated error for a form field. A field-specific `requiredMessage` ("Add your name.")
// replaces the generic "Required" when the schema reports 'required'.
const useFormFieldError = <TFieldValues extends FieldValues>(
  name: FieldPath<TFieldValues>,
  requiredMessage?: string,
) => {
  const getFieldError = useFieldError<TFieldValues>()
  const { errors } = useFormState<TFieldValues>({ name })
  const message: string | undefined = get(errors, name)?.message

  if (message === 'required' && requiredMessage) return requiredMessage

  return getFieldError(name)
}

export default useFormFieldError
