'use client'

import { Dialog } from '@base-ui/react/dialog'

import useSwipeToClose from './useSwipeToClose'

import { cn } from '@/lib/utils'

type SheetProps = {
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
  // Row above the scrolling body — include a SheetTitle for accessibility
  header: React.ReactNode
  // Fixed near-full height on mobile instead of sizing to content
  isTall?: boolean
  isOpen: boolean
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement>
  onOpenChange: (isOpen: boolean) => void
}

// Bottom sheet on mobile (swipe the handle/header down to close), floating
// right-side panel on desktop. Sheets opened from inside another sheet stack
// on top of it; Esc closes the topmost only.
const Sheet = ({
  children,
  className,
  footer,
  header,
  isOpen,
  isTall = false,
  onKeyDown,
  onOpenChange,
}: SheetProps) => {
  const { dragHandlers, popupRef } = useSwipeToClose(() => onOpenChange(false))

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-50 bg-[rgba(20,20,24,.42)] transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          ref={popupRef}
          className={cn(
            'text-ink fixed inset-x-0 bottom-0 z-50 flex max-h-[94dvh] flex-col bg-white outline-hidden',
            'rounded-t-[20px] shadow-[0_-10px_40px_rgba(0,0,0,.12)]',
            'transition-transform duration-280 ease-[cubic-bezier(.2,.8,.2,1)]',
            'data-ending-style:translate-y-full data-starting-style:translate-y-full',
            'lg:inset-y-4 lg:right-4 lg:left-auto lg:max-h-none lg:w-120 lg:rounded-[20px]',
            'lg:data-ending-style:translate-x-[calc(100%+24px)] lg:data-ending-style:translate-y-0',
            'lg:data-starting-style:translate-x-[calc(100%+24px)] lg:data-starting-style:translate-y-0',
            isTall && 'h-[94dvh] lg:h-auto',
            className,
          )}
          onKeyDown={onKeyDown}
        >
          {/* Drag area: handle + header (never the scrolling body) */}
          {}
          <div className="shrink-0 touch-none lg:touch-auto" {...dragHandlers}>
            <div className="mx-auto mt-2 h-1.25 w-10 rounded-full bg-[#d8d8d4] lg:hidden" />
            <div className="border-rule flex items-center gap-2 border-b pt-2 pr-3 pb-2.5 pl-4 lg:pt-3">
              {header}
            </div>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain" data-sheet-body>
            {children}
          </div>
          {footer && (
            <div className="border-rule flex shrink-0 gap-2.5 border-t px-4 pt-3 pb-[calc(12px+env(safe-area-inset-bottom))]">
              {footer}
            </div>
          )}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Sheet
