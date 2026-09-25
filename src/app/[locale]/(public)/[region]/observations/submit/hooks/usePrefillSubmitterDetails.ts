import { useEffect } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import type { ObservationSubmitFormData, ObservationSubmitFormSchema } from '../schema'
import { loadSubmitterDetails } from '../submitterDetailsStorage'

type ObservationForm = UseFormReturn<
  ObservationSubmitFormSchema,
  unknown,
  ObservationSubmitFormData
>

// Fills "About you" from the last submission on this device. Runs after mount
// (localStorage isn't available while rendering on the server) and resets the
// defaults, so prefilled details don't count as unsaved changes.
const usePrefillSubmitterDetails = (form: ObservationForm) => {
  const { getValues, reset } = form

  useEffect(() => {
    const savedDetails = loadSubmitterDetails()

    if (!savedDetails) return

    reset({ ...getValues(), ...savedDetails })
  }, [getValues, reset])
}

export default usePrefillSubmitterDetails
