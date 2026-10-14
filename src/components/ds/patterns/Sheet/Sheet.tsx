'use client'

import { useLayoutEffect, useRef } from 'react'
import { Dialog } from '@base-ui/react/dialog'

import handleStepKeys from './handleStepKeys'
import type { SheetSteps } from './types'
import useSwipeToClose from './useSwipeToClose'

import { cn } from '@/lib/utils'

type SheetProps = {
  children: React.ReactNode
  className?: string
  footer?: React.ReactNode
  // Row above the scrolling body. Must contain a SheetTitle (its accessible
  // name) — SheetHeader does
  header: React.ReactNode
  // Fixed near-full height on mobile instead of sizing to content (desktop
  // panels are always full height)
  isTall?: boolean
  isOpen: boolean
  // false while closing would lose data (e.g. a dirty form): backdrop click and
  // swipe no longer close it — only explicit actions (close button, Esc) do
  isDismissible?: boolean
  onOpenChange: (isOpen: boolean) => void
  // Element that opens the sheet (gets aria-expanded; focus returns to it on close)
  trigger?: React.ReactElement
  // The body scrolls back to the top whenever this changes (e.g. the shown record's id)
  scrollKey?: React.Key
  // Stepping through a list: ←/→ call these (pair with SheetStepButtons)
  steps?: SheetSteps | null
}

// Bottom sheet on mobile (swipe the handle/header down to close), floating
// right-side panel on desktop. Sheets opened from inside another sheet stack
// on top of it; Esc closes the topmost only.
const Sheet = ({
  children,
  className,
  footer,
  header,
  isDismissible = true,
  isOpen,
  isTall = false,
  onOpenChange,
  scrollKey,
  steps,
  trigger,
}: SheetProps) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const { dragHandlers, popupRef } = useSwipeToClose(() => onOpenChange(false))

  // Layout effect: the new content never paints at the old scroll offset
  useLayoutEffect(() => {
    bodyRef.current?.scrollTo({ top: 0 })
  }, [scrollKey])

  return (
    <Dialog.Root disablePointerDismissal={!isDismissible} onOpenChange={onOpenChange} open={isOpen}>
      {trigger && <Dialog.Trigger render={trigger} />}
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-scrim fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          ref={popupRef}
          className={cn(
            'text-ink bg-surface fixed inset-x-0 bottom-0 z-50 flex max-h-[94dvh] flex-col outline-hidden',
            'rounded-t-sheet shadow-sheet',
            'ease-sheet transition-transform duration-280',
            'data-ending-style:translate-y-full data-starting-style:translate-y-full',
            'lg:rounded-sheet lg:shadow-panel lg:inset-y-4 lg:right-4 lg:left-auto lg:max-h-none lg:w-120',
            'lg:data-ending-style:translate-x-[calc(100%+24px)] lg:data-ending-style:translate-y-0',
            'lg:data-starting-style:translate-x-[calc(100%+24px)] lg:data-starting-style:translate-y-0',
            isTall && 'h-[94dvh] lg:h-auto',
            className,
          )}
          onKeyDown={(event) => handleStepKeys(event, steps)}
        >
          {/* Drag area: handle + header (never the scrolling body) */}
          <div
            className="shrink-0 touch-none lg:touch-auto"
            {...(isDismissible ? dragHandlers : {})}
          >
            <div className="bg-rule-strong mx-auto mt-2 h-1.25 w-10 rounded-full lg:hidden" />
            <div className="border-rule flex items-center gap-2 border-b pt-2 pr-3 pb-2.5 pl-4 lg:pt-3">
              {header}
            </div>
          </div>
          <div ref={bodyRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
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
