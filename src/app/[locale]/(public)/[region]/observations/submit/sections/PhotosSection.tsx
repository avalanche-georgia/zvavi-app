'use client'

import { observationPhotoLimits } from '@domain/constants'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'
import { useWatch } from 'react-hook-form'

import PhotosField from '../PhotosField'
import type { ObservationSubmitFormSchema } from '../schema'

const { maxCount } = observationPhotoLimits

const PhotosSection = () => {
  const t = useTranslations()
  const photos = useWatch<ObservationSubmitFormSchema, 'photos'>({ name: 'photos' })

  return (
    <FormCard
      headerAside={
        <span className="tabular-nums">
          {photos.length > 0
            ? t('observations.submit.photos.count', { count: photos.length, max: maxCount })
            : t('observations.submit.photos.upTo', { max: maxCount })}
        </span>
      }
      title={t('observations.submit.sections.photos')}
    >
      <PhotosField />
    </FormCard>
  )
}

export default PhotosSection
