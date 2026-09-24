'use client'

import { useState } from 'react'
import { PhotoViewer } from '@components/shared'
import { FallbackImage } from '@components/ui'
import type { PhotoUrls } from '@domain/types'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

// Scroll-snap strip of resized previews; tapping one opens the full-resolution
// viewer on top of the detail sheet.
const DetailPhotos = ({ photos }: { photos: PhotoUrls[] }) => {
  const t = useTranslations()
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  const viewerPhotos = photos.map((photo) => ({
    id: photo.id,
    sources: [photo.largeUrl, photo.previewUrl],
  }))

  return (
    <>
      <div className="scrollbar-hide flex snap-x snap-mandatory scroll-px-4 gap-2 overflow-x-auto px-4 pt-4">
        {photos.map((photo, index) => (
          <button
            key={photo.id}
            aria-label={t('common.photoViewer.open', { index: index + 1 })}
            className={cn(
              'bg-tile aspect-4/3 shrink-0 snap-start overflow-hidden rounded-[14px]',
              'focus-visible:outline-accent focus-visible:outline-2 focus-visible:-outline-offset-2',
              photos.length === 1 ? 'w-full' : 'w-[82%]',
            )}
            onClick={() => setViewerIndex(index)}
            type="button"
          >
            <FallbackImage
              className="size-full object-cover"
              sources={[photo.previewUrl, photo.largeUrl]}
            />
          </button>
        ))}
      </div>

      <PhotoViewer index={viewerIndex} onIndexChange={setViewerIndex} photos={viewerPhotos} />
    </>
  )
}

export default DetailPhotos
