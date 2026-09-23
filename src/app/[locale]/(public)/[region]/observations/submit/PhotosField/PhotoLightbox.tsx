'use client'

import { useRef } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { Trash2, X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PhotoCarousel from './PhotoCarousel'
import type { PhotoUpload } from '../schema'

import { cn } from '@/lib/utils'

type PhotoLightboxProps = {
  // null = closed
  index: number | null
  onIndexChange: (index: number | null) => void
  onRemove: (id: string) => void
  photos: PhotoUpload[]
}

const toolbarButtonClassName = cn(
  'flex size-10 items-center justify-center rounded-full text-white/90',
  'transition-colors hover:bg-white/10 hover:text-white',
)

const PhotoLightbox = ({ index, onIndexChange, onRemove, photos }: PhotoLightboxProps) => {
  const t = useTranslations()
  // Focus Close, not the first tabbable (Remove) — Enter/Space right after
  // opening must never delete a photo.
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  const isOpen = index !== null && photos.length > 0
  const selectedIndex = Math.min(index ?? 0, photos.length - 1)
  const selectedPhoto = photos[selectedIndex]

  const handleOpenChange = (open: boolean) => {
    if (!open) onIndexChange(null)
  }

  const handleRemove = () => {
    if (selectedPhoto) onRemove(selectedPhoto.id)
  }

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-black transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          className="fixed inset-0 z-50 flex flex-col pb-[env(safe-area-inset-bottom)] outline-hidden transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          initialFocus={closeButtonRef}
        >
          <div className="flex items-center justify-between px-2 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 text-white">
            <Dialog.Title className="pl-3 text-sm font-medium tabular-nums">
              {t('observations.submit.photos.counter', {
                current: selectedIndex + 1,
                total: photos.length,
              })}
            </Dialog.Title>
            <div className="flex items-center gap-1">
              <button
                aria-label={t('observations.submit.photos.remove')}
                className={toolbarButtonClassName}
                onClick={handleRemove}
                type="button"
              >
                <Trash2 className="size-5" />
              </button>
              <Dialog.Close
                ref={closeButtonRef}
                aria-label={t('observations.submit.photos.close')}
                className={toolbarButtonClassName}
              >
                <X className="size-6" />
              </Dialog.Close>
            </div>
          </div>

          <PhotoCarousel
            onIndexChange={onIndexChange}
            photos={photos}
            selectedIndex={selectedIndex}
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default PhotoLightbox
