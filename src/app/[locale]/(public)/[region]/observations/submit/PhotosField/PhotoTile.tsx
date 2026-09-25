'use client'

import { useState } from 'react'
import { ImageOff, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PhotoTileStatus from './PhotoTileStatus'
import type { PhotoUpload } from '../schema'

import { cn } from '@/lib/utils'

type PhotoTileProps = {
  index: number
  onOpen: (index: number) => void
  onRemove: (id: string) => void
  onRetry: (id: string) => void
  photo: PhotoUpload
}

const PhotoTile = ({ index, onOpen, onRemove, onRetry, photo }: PhotoTileProps) => {
  const t = useTranslations()
  // Tracked per URL: the preview is swapped for the prepared JPEG once it's
  // ready, so an undisplayable original (HEIC outside Safari) recovers.
  const [failedPreviewUrl, setFailedPreviewUrl] = useState<string | null>(null)
  const hasPreviewError = failedPreviewUrl === photo.previewUrl

  return (
    <div className="group rounded-media bg-tile relative aspect-square overflow-hidden">
      <button
        aria-label={t('common.photoViewer.open', { index: index + 1 })}
        className="focus-ring flex size-full cursor-zoom-in items-center justify-center"
        onClick={() => onOpen(index)}
        type="button"
      >
        {hasPreviewError ? (
          <ImageOff className="text-muted size-6" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt=""
            className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
            onError={() => setFailedPreviewUrl(photo.previewUrl)}
            src={photo.previewUrl}
          />
        )}
      </button>

      <PhotoTileStatus onRetry={() => onRetry(photo.id)} photo={photo} />

      <button
        aria-label={t('observations.submit.photos.remove')}
        className={cn(
          'focus-ring absolute top-1.5 right-1.5 flex size-7.5 items-center justify-center rounded-full',
          'bg-ink/72 hover:bg-ink/90 text-white backdrop-blur-sm transition-colors',
          // 44px touch target without a visually bigger button
          'after:absolute after:-inset-1.75',
        )}
        onClick={() => onRemove(photo.id)}
        type="button"
      >
        <X className="size-3.5" strokeWidth={2.5} />
      </button>
    </div>
  )
}

export default PhotoTile
