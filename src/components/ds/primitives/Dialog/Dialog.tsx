'use client'

import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { cn } from '@/lib/utils'

type DialogProps = {
  children: React.ReactNode
  className?: string
  // Buttons, right-aligned: [Cancel] [Primary]
  footer: React.ReactNode
  // Element focused on open, e.g. Cancel so a stray Enter never confirms
  initialFocus?: React.RefObject<HTMLElement | null>
  // false while closing would lose data: a click on the backdrop no longer closes it
  isDismissible?: boolean
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  title: string
}

// Centred modal for a decision that needs more room than a ConfirmPopover
// (e.g. a summary of what is about to go out). Esc and Cancel close it.
const Dialog = ({
  children,
  className,
  footer,
  initialFocus,
  isDismissible = true,
  isOpen,
  onOpenChange,
  title,
}: DialogProps) => (
  <BaseDialog.Root
    disablePointerDismissal={!isDismissible}
    onOpenChange={onOpenChange}
    open={isOpen}
  >
    <BaseDialog.Portal>
      <BaseDialog.Backdrop className="bg-scrim fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0" />
      <BaseDialog.Popup
        className={cn(
          'rounded-card bg-surface shadow-menu text-ink fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md -translate-1/2 flex-col outline-hidden',
          'transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
          className,
        )}
        initialFocus={initialFocus}
      >
        <BaseDialog.Title className="text-heading px-5 pt-5 font-bold">{title}</BaseDialog.Title>
        <div className="text-copy text-body overflow-y-auto px-5 pt-3 pb-5">{children}</div>
        <div className="border-rule flex justify-end gap-2 border-t px-5 py-3">{footer}</div>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  </BaseDialog.Root>
)

export default Dialog
