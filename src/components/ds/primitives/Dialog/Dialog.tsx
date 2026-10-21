'use client'

import { Dialog as BaseDialog } from '@base-ui/react/dialog'
import { X } from 'lucide-react'

import { IconButton } from '../IconButton'

import { cn } from '@/lib/utils'

type DialogProps = {
  // Body: what the decision means — sentences, a list, a summary. Left out when
  // the title says it all.
  children?: React.ReactNode
  className?: string
  // Accessible name of the × in the header (also its tooltip)
  closeLabel: string
  // Buttons, dismiss first: [Cancel] [Primary]. Stacked, primary on top, on phones.
  footer: React.ReactNode
  // Leading mark in the header, e.g. ConfirmDialog's tone tile
  icon?: React.ReactNode
  // Element focused on open, e.g. Cancel so a stray Enter never confirms
  initialFocus?: React.RefObject<HTMLElement | null>
  // false while an action runs: the backdrop and the × no longer close it (Esc
  // still calls onOpenChange — the caller ignores it, as ConfirmDialog does)
  isDismissible?: boolean
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  // alertdialog for a destructive or data-losing question
  role?: 'alertdialog' | 'dialog'
  // The decision, e.g. "Delete forecast #180"
  title: string
}

// Modal for a decision: header (icon, title, ×), body on the canvas tone, footer
// with the buttons. Centred from `sm`; a bottom sheet on phones.
const Dialog = ({
  children,
  className,
  closeLabel,
  footer,
  icon,
  initialFocus,
  isDismissible = true,
  isOpen,
  onOpenChange,
  role = 'dialog',
  title,
}: DialogProps) => (
  <BaseDialog.Root
    disablePointerDismissal={!isDismissible}
    onOpenChange={onOpenChange}
    open={isOpen}
  >
    <BaseDialog.Portal>
      {/* Rendered even when nested in a Sheet, so the sheet dims too */}
      <BaseDialog.Backdrop
        className="bg-scrim fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
        forceRender
      />
      <BaseDialog.Popup
        className={cn(
          'bg-surface shadow-menu text-ink fixed z-50 flex flex-col overflow-hidden outline-hidden',
          // Phones: a bottom sheet sliding up
          'rounded-t-sheet inset-x-0 bottom-0 max-h-[calc(100dvh-2rem)] pb-[env(safe-area-inset-bottom)] transition-[opacity,translate] duration-200 data-ending-style:translate-y-full data-starting-style:translate-y-full',
          // From `sm`: centred, scaling in
          'sm:rounded-card sm:inset-x-auto sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:w-[calc(100vw-2rem)] sm:max-w-120 sm:-translate-1/2 sm:pb-0 sm:transition-[opacity,scale] sm:duration-150 sm:data-ending-style:-translate-1/2 sm:data-ending-style:scale-95 sm:data-ending-style:opacity-0 sm:data-starting-style:-translate-1/2 sm:data-starting-style:scale-95 sm:data-starting-style:opacity-0',
          className,
        )}
        initialFocus={initialFocus}
        role={role}
      >
        <span
          aria-hidden
          className="bg-rule-strong mx-auto mt-2 h-1 w-9 shrink-0 rounded-full sm:hidden"
        />
        <div className="flex shrink-0 items-center gap-3 py-4.5 pr-4 pl-4 sm:pl-6">
          {icon}
          <BaseDialog.Title className="text-heading min-w-0 flex-1 font-semibold text-pretty">
            {title}
          </BaseDialog.Title>
          <BaseDialog.Close
            disabled={!isDismissible}
            render={<IconButton aria-label={closeLabel} />}
          >
            <X aria-hidden className="size-4.5" />
          </BaseDialog.Close>
        </div>
        {children && (
          <BaseDialog.Description
            className="bg-canvas border-rule text-copy text-ink flex min-h-0 flex-col gap-3 overflow-y-auto border-y p-4 text-pretty sm:px-6 sm:py-4.5"
            render={<div />}
          >
            {children}
          </BaseDialog.Description>
        )}
        <div
          className={cn(
            'flex shrink-0 flex-col-reverse gap-2 px-4 pt-3 pb-4 *:w-full sm:flex-row sm:justify-end sm:gap-2.5 sm:px-6 sm:py-4 sm:*:w-auto',
            !children && 'border-rule border-t',
          )}
        >
          {footer}
        </div>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  </BaseDialog.Root>
)

export default Dialog
