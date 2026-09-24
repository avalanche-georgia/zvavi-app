'use client'

import { useRef, useState } from 'react'
import { Dialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'
import { useTranslations } from 'next-intl'

import PhotoViewerCarousel from './PhotoViewerCarousel'
import type { ViewerPhoto } from './types'

import { cn } from '@/lib/utils'

type PhotoViewerProps = {
  // Extra toolbar buttons next to Close (e.g. "Remove" on the submit form)
  actions?: React.ReactNode
  // null = closed
  index: number | null
  onIndexChange: (index: number | null) => void
  photos: ViewerPhoto[]
}

export const photoViewerToolbarButtonClassName = cn(
  'flex size-10 items-center justify-center rounded-full text-white/90',
  'transition-colors hover:bg-white/10 hover:text-white',
)

// Full-screen photo viewer. Can be opened from inside another dialog — Esc and
// ←/→ are handled here and don't reach the parent (e.g. a detail sheet with
// its own prev/next keys).
const PhotoViewer = ({ actions, index, onIndexChange, photos }: PhotoViewerProps) => {
  const t = useTranslations()
  // Focus Close, not the first tabbable — Enter/Space right after opening must
  // never trigger a destructive action passed in `actions`.
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Remembers the last open photo: `index` turns null the moment the viewer
  // closes, but the close animation must keep showing that photo, not the first
  const [shownIndex, setShownIndex] = useState(index ?? 0)

  if (index !== null && index !== shownIndex) setShownIndex(index)

  const isOpen = index !== null && photos.length > 0
  const selectedIndex = Math.max(0, Math.min(shownIndex, photos.length - 1))

  const handleOpenChange = (open: boolean) => {
    if (!open) onIndexChange(null)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return

    // React events bubble through portals — keep arrows from reaching a parent dialog
    event.stopPropagation()

    const nextIndex = selectedIndex + (event.key === 'ArrowRight' ? 1 : -1)

    if (nextIndex >= 0 && nextIndex < photos.length) onIndexChange(nextIndex)
  }

  return (
    <Dialog.Root onOpenChange={handleOpenChange} open={isOpen}>
      <Dialog.Portal>
        {/* Background on the popup, not a Backdrop — base-ui skips backdrops of
            nested dialogs, and the viewer is often opened from another dialog */}
        <Dialog.Popup
          className="fixed inset-0 z-60 flex flex-col bg-[#0c0c0e] pb-[env(safe-area-inset-bottom)] outline-hidden transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          initialFocus={closeButtonRef}
          onKeyDown={handleKeyDown}
        >
          <div className="flex items-center justify-between px-2 pt-[max(0.5rem,env(safe-area-inset-top))] pb-2 text-white">
            <Dialog.Title className="pl-3 text-sm font-medium tabular-nums">
              {t('common.photoViewer.counter', {
                current: selectedIndex + 1,
                total: photos.length,
              })}
            </Dialog.Title>
            <div className="flex items-center gap-1">
              {actions}
              <Dialog.Close
                ref={closeButtonRef}
                aria-label={t('common.actions.close')}
                className={photoViewerToolbarButtonClassName}
              >
                <X className="size-6" />
              </Dialog.Close>
            </div>
          </div>

          <PhotoViewerCarousel
            onIndexChange={onIndexChange}
            photos={photos}
            selectedIndex={selectedIndex}
          />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default PhotoViewer
