import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useObservationCreate } from '@data/hooks/observations'
import type { RegionId } from '@domain/types'
import { setHours, startOfDay } from 'date-fns'
import { useTranslations } from 'next-intl'

import { addPendingOwnReport } from '../../helpers/pendingOwnReports'
import type { ObservationSubmitFormData } from '../schema'
import { forgetSubmitterDetails, saveSubmitterDetails } from '../submitterDetailsStorage'

import { photosNotFoundError, photosUnprocessableError } from '@/api/observations/schema'

type UseObservationSubmitFormSubmitParams = {
  onSuccess: () => void
  regionId: RegionId
}

// A date-only choice is stored at local noon, so the calendar day survives any
// viewer's timezone offset (local midnight in UTC+4 is the previous day in UTC)
const toDateOnlyIso = (date: Date) => setHours(startOfDay(date), 12).toISOString()

// Photo-specific failures get messages that say which action fixes them
const getSubmitErrorKey = (error: unknown) => {
  const message = error instanceof Error ? error.message : undefined

  if (message === photosNotFoundError) return 'observations.submit.photos.errors.notFound'
  if (message === photosUnprocessableError) return 'observations.submit.photos.errors.unprocessable'

  return 'observations.submit.error'
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
          message: t(getSubmitErrorKey(error)),
        })
      }
    },
    [createObservation, onSuccess, regionId, t, toastError],
  )

  return { handleSubmit }
}

export default useObservationSubmitFormSubmit
