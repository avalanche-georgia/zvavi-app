import { useTranslations } from 'next-intl'
import { type FieldPath, get, useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from '../schema'

// Schema messages are translation keys under `common.validation` (e.g.
// 'required'). Anything else — e.g. a zod default message for a constraint
// without a custom key — falls back to a generic "Invalid value" rather than
// leaking a raw key or English zod text into the UI.
const useFieldError = () => {
  const t = useTranslations()
  const { formState } = useFormContext<ObservationSubmitFormSchema>()

  return (name: FieldPath<ObservationSubmitFormSchema>): string | undefined => {
    const message: string | undefined = get(formState.errors, name)?.message

    if (message === undefined) return undefined

    const key = `common.validation.${message}`

    return t.has(key) ? t(key) : t('common.validation.invalid')
  }
}

export default useFieldError
