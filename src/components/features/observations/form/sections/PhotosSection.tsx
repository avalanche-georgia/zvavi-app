'use client'

import { observationPhotoLimits } from '@domain/constants'
import { FormCard } from '@ds/patterns'
import { useTranslations } from 'next-intl'
import { useWatch } from 'react-hook-form'

import PhotosField from '../PhotosField'
import type { ObservationFormFields } from '../schema'

const { maxCount } = observationPhotoLimits

const PhotosSection = ({ storedPhotoUrls }: { storedPhotoUrls?: Record<string, string> }) => {
  const t = useTranslations()
  const photos = useWatch<ObservationFormFields, 'photos'>({ name: 'photos' })

  return (
    <FormCard
      headerAside={
        <span className="tabular-nums">
          {photos.length > 0
            ? t('observations.form.photos.count', { count: photos.length, max: maxCount })
            : t('observations.form.photos.upTo', { max: maxCount })}
        </span>
      }
      title={t('observations.form.sections.photos')}
    >
      <PhotosField storedPhotoUrls={storedPhotoUrls} />
    </FormCard>
  )
}

export default PhotosSection
