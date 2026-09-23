'use client'

import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useTranslations } from 'next-intl'

import type { PhotoUpload } from '../schema'

import { cn } from '@/lib/utils'

type PhotoCarouselProps = {
  onIndexChange: (index: number) => void
  photos: PhotoUpload[]
  selectedIndex: number
}

const navButtonClassName = cn(
  'absolute top-1/2 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full',
  'bg-white/10 text-white backdrop-blur transition hover:bg-white/20 disabled:opacity-0 sm:flex',
)

// Swipe on touch, arrow buttons + keyboard on desktop.
const PhotoCarousel = ({ onIndexChange, photos, selectedIndex }: PhotoCarouselProps) => {
  const t = useTranslations()
  // Remounted on every open (the dialog unmounts its content when closed), so
  // this captures the tapped photo; later swipes must not re-init the carousel.
  const [startIndex] = useState(selectedIndex)
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex })

  useEffect(() => {
    if (!emblaApi) return undefined

    const handleSelect = () => onIndexChange(emblaApi.selectedScrollSnap())

    emblaApi.on('select', handleSelect).on('reInit', handleSelect)

    return () => {
      emblaApi.off('select', handleSelect).off('reInit', handleSelect)
    }
  }, [emblaApi, onIndexChange])

  useEffect(() => {
    if (!emblaApi) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') emblaApi.scrollPrev()
      if (event.key === 'ArrowRight') emblaApi.scrollNext()
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [emblaApi])

  return (
    <div className="relative min-h-0 flex-1 pb-4 sm:pb-8">
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="flex h-full min-w-0 flex-[0_0_100%] items-center justify-center px-2 sm:px-20"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="max-h-full max-w-full rounded-lg object-contain select-none"
                draggable={false}
                src={photo.previewUrl}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label={t('observations.submit.photos.previous')}
        className={cn(navButtonClassName, 'left-4')}
        disabled={selectedIndex === 0}
        onClick={() => emblaApi?.scrollPrev()}
        type="button"
      >
        <ChevronLeft className="size-6" />
      </button>
      <button
        aria-label={t('observations.submit.photos.next')}
        className={cn(navButtonClassName, 'right-4')}
        disabled={selectedIndex === photos.length - 1}
        onClick={() => emblaApi?.scrollNext()}
        type="button"
      >
        <ChevronRight className="size-6" />
      </button>
    </div>
  )
}

export default PhotoCarousel
