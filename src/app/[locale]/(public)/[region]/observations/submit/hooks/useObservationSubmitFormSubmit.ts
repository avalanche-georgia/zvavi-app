import { useCallback } from 'react'
import { useToast } from '@components/hooks'
import { useObservationCreate } from '@data/hooks/observations'
import type { AvalancheTrigger, AvalancheType, RegionId } from '@domain/types'
import { useTranslations } from 'next-intl'
import { useRouter } from 'src/i18n/navigation'

import type { ObservationSubmitFormSchema } from '../schema'

import { routes } from '@/routes'

type UseObservationSubmitFormSubmitParams = {
  regionId: RegionId
}

const useObservationSubmitFormSubmit = ({ regionId }: UseObservationSubmitFormSubmitParams) => {
  const t = useTranslations()
  const router = useRouter()
  const { toastError, toastSuccess } = useToast()
  const { mutateAsync: createObservation } = useObservationCreate()

  const handleSubmit = useCallback(
    async (formData: ObservationSubmitFormSchema) => {
      try {
        await createObservation({
          aspects: formData.aspects,
          date: formData.date ? formData.date.toISOString() : null,
          description: formData.description,
          honeypot: formData.honeypot,
          isDateUnknown: formData.isDateUnknown,
          latitude: formData.latitude,
          longitude: formData.longitude,
          regionId,
          size: formData.size,
          submitterContact: formData.submitterContact,
          submitterEducation: formData.submitterEducation,
          submitterName: formData.submitterName,
          trigger: formData.trigger as AvalancheTrigger | null,
          type: formData.type as AvalancheType | null,
        })

        toastSuccess(t('observations.submit.success'))
        router.push(routes.observationsByRegion(regionId).root)
      } catch (error) {
        toastError('ObservationSubmitForm | handleSubmit', {
          error,
          message: t('observations.submit.error'),
        })
      }
    },
    [createObservation, regionId, router, t, toastError, toastSuccess],
  )

  return { handleSubmit }
}

export default useObservationSubmitFormSubmit
