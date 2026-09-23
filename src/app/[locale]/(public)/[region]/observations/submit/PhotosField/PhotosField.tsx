'use client'

import { useState } from 'react'
import { InputBlock } from '@components/ui'
import { observationPhotoLimits } from '@domain/constants'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import AddPhotoTile from './AddPhotoTile'
import PhotoLightbox from './PhotoLightbox'
import PhotoTile from './PhotoTile'
import usePhotoSelectionFeedback from './usePhotoSelectionFeedback'
import usePhotoUploads from './usePhotoUploads'
import type { ObservationSubmitFormSchema } from '../schema'

const { maxCount } = observationPhotoLimits

const PhotosField = () => {
  const t = useTranslations()
  const form = useFormContext<ObservationSubmitFormSchema>()
  const { filterSelectedFiles, handlePhotoUnreadable } = usePhotoSelectionFeedback()
  const { addPhotos, photos, removePhoto, retryPhoto } = usePhotoUploads({
    onPhotoUnreadable: handlePhotoUnreadable,
  })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const errorMessage = form.formState.errors.photos?.message

  const handleFilesSelect = (files: File[]) => {
    const acceptedFiles = filterSelectedFiles(files, maxCount - photos.length)

    if (acceptedFiles.length > 0) addPhotos(acceptedFiles)
  }

  const handleLightboxRemove = (id: string) => {
    // Otherwise the lightbox would pop back open on the next added photo
    if (photos.length === 1) setLightboxIndex(null)

    removePhoto(id)
  }

  return (
    <InputBlock
      error={errorMessage && t(`observations.submit.photos.errors.${errorMessage}`)}
      label={t('observations.submit.photos.label')}
    >
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-[repeat(3,9rem)] sm:gap-3">
        {photos.map((photo, index) => (
          <PhotoTile
            key={photo.id}
            index={index}
            onOpen={setLightboxIndex}
            onRemove={removePhoto}
            onRetry={retryPhoto}
            photo={photo}
          />
        ))}

        {photos.length < maxCount && (
          <AddPhotoTile count={photos.length} onFilesSelect={handleFilesSelect} />
        )}
      </div>

      <PhotoLightbox
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onRemove={handleLightboxRemove}
        photos={photos}
      />
    </InputBlock>
  )
}

export default PhotosField
