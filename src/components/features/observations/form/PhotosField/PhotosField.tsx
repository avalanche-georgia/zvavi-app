'use client'

import { useState } from 'react'
import { observationPhotoLimits } from '@domain/constants'
import { useTranslations } from 'next-intl'
import { useFormContext } from 'react-hook-form'

import AddPhotoTile from './AddPhotoTile'
import PhotoLightbox from './PhotoLightbox'
import PhotoTile from './PhotoTile'
import { maxSourceSizeMb } from './preparePhoto'
import usePhotoSelectionFeedback from './usePhotoSelectionFeedback'
import usePhotoUploads from './usePhotoUploads'
import type { ObservationFormFields } from '../schema'

const { maxCount } = observationPhotoLimits

type PhotosFieldProps = {
  // Signed preview URLs of photos already saved on the record, by key — they
  // arrive after the form opens, so they're kept out of the form state
  storedPhotoUrls?: Record<string, string>
}

const PhotosField = ({ storedPhotoUrls }: PhotosFieldProps) => {
  const t = useTranslations()
  const form = useFormContext<ObservationFormFields>()
  const { filterSelectedFiles, handlePhotoUnreadable } = usePhotoSelectionFeedback()
  const { addPhotos, photos, removePhoto, retryPhoto } = usePhotoUploads({
    onPhotoUnreadable: handlePhotoUnreadable,
  })
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const displayedPhotos = photos.map((photo) =>
    photo.file ? photo : { ...photo, previewUrl: storedPhotoUrls?.[photo.key ?? ''] ?? '' },
  )

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
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-3 gap-2">
        {displayedPhotos.map((photo, index) => (
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

      <p className="text-copy-sm text-muted">
        {t('observations.form.photos.hint', { maxSize: maxSourceSizeMb })}
      </p>

      {errorMessage && (
        <p className="text-copy-sm text-danger" data-field-error>
          {t(`observations.form.photos.errors.${errorMessage}`)}
        </p>
      )}

      <PhotoLightbox
        index={lightboxIndex}
        onIndexChange={setLightboxIndex}
        onRemove={handleLightboxRemove}
        photos={displayedPhotos}
      />
    </div>
  )
}

export default PhotosField
