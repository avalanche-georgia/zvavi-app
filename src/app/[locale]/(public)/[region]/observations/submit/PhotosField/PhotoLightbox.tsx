'use client'

import { PhotoViewer, photoViewerToolbarButtonClassName } from '@components/shared'
import { Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { PhotoUpload } from '../schema'

type PhotoLightboxProps = {
  // null = closed
  index: number | null
  onIndexChange: (index: number | null) => void
  onRemove: (id: string) => void
  photos: PhotoUpload[]
}

const PhotoLightbox = ({ index, onIndexChange, onRemove, photos }: PhotoLightboxProps) => {
  const t = useTranslations()

  const selectedPhoto = index === null ? undefined : photos[Math.min(index, photos.length - 1)]
  const viewerPhotos = photos.map((photo) => ({ id: photo.id, sources: [photo.previewUrl] }))

  const handleRemove = () => {
    if (selectedPhoto) onRemove(selectedPhoto.id)
  }

  return (
    <PhotoViewer
      actions={
        <button
          aria-label={t('observations.submit.photos.remove')}
          className={photoViewerToolbarButtonClassName}
          onClick={handleRemove}
          type="button"
        >
          <Trash2 className="size-5" />
        </button>
      }
      index={index}
      onIndexChange={onIndexChange}
      photos={viewerPhotos}
    />
  )
}

export default PhotoLightbox
