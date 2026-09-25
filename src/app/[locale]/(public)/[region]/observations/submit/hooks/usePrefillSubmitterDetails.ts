import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'

import type { ObservationSubmitFormSchema } from '../schema'
import type { SubmitterDetails } from '../submitterDetailsStorage'

// Fills "About you" from details remembered on this device. Updates the field
// defaults too, so prefilled values don't count as unsaved changes.
const usePrefillSubmitterDetails = (savedDetails: SubmitterDetails | null) => {
  const { resetField } = useFormContext<ObservationSubmitFormSchema>()

  useEffect(() => {
    if (!savedDetails) return

    resetField('submitterName', { defaultValue: savedDetails.submitterName })
    resetField('submitterEducation', { defaultValue: savedDetails.submitterEducation })
    resetField('submitterContact', { defaultValue: savedDetails.submitterContact })
    resetField('rememberDetails', { defaultValue: true })
  }, [resetField, savedDetails])
}

export default usePrefillSubmitterDetails
