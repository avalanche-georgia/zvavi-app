import { useCallback } from 'react'
import { getPhotoSubmitErrorKey, toDateOnlyIso } from '@components/features/observations/form'
import { useToast } from '@components/hooks'
import { useObservationCreate } from '@data/hooks/observations'
import type { RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'

import { addPendingOwnReport } from '../../helpers/pendingOwnReports'
import type { ObservationSubmitFormData } from '../schema'
import { forgetSubmitterDetails, saveSubmitterDetails } from '../submitterDetailsStorage'

type UseObservationSubmitFormSubmitParams = {
  onSuccess: () => void
  regionId: RegionId
}

const useObservationSubmitFormSubmit = ({
  onSuccess,
  regionId,
}: UseObservationSubmitFormSubmitParams) => {
  const t = useTranslations()
  const { toastError } = useToast()
  const { mutateAsync: createObservation } = useObservationCreate()

  const handleSubmit = useCallback(
    async (formData: ObservationSubmitFormData) => {
      try {
        const { id } = await createObservation({
          aspects: formData.aspects,
          date: formData.date && !formData.isDateUnknown ? toDateOnlyIso(formData.date) : null,
          description: formData.description,
          honeypot: formData.honeypot,
          isDateUnknown: formData.isDateUnknown,
          latitude: formData.latitude,
          longitude: formData.longitude,
          photoKeys: formData.photos,
          quantity: formData.quantity,
          regionId,
          size: formData.size,
          slabDepth: formData.slabDepth,
          submitterContact: formData.submitterContact,
          submitterEducation: formData.submitterEducation,
          submitterName: formData.submitterName,
          trigger: formData.trigger,
          type: formData.type,
          width: formData.width,
        })

        // Not public until reviewed — the submitter still sees it on the list
        addPendingOwnReport({
          createdAt: new Date().toISOString(),
          id,
          regionId,
          size: formData.size,
          type: formData.type,
        })

        // Unticking "Remember me" and sending also forgets what was saved before
        if (formData.rememberDetails) {
          saveSubmitterDetails({
            submitterContact: formData.submitterContact || null,
            submitterEducation: formData.submitterEducation || null,
            submitterName: formData.submitterName,
          })
        } else {
          forgetSubmitterDetails()
        }

        onSuccess()
      } catch (error) {
        toastError('ObservationSubmitForm | handleSubmit', {
          error,
          message: t(getPhotoSubmitErrorKey(error, 'observations.submit.error')),
        })
      }
    },
    [createObservation, onSuccess, regionId, t, toastError],
  )

  return { handleSubmit }
}

export default useObservationSubmitFormSubmit
