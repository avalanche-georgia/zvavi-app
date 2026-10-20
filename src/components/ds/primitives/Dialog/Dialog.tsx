'use client'

import { Dialog as BaseDialog } from '@base-ui/react/dialog'

import { cn } from '@/lib/utils'

type DialogProps = {
  // What the decision means: a sentence, or a summary of what goes out
  children?: React.ReactNode
  className?: string
  // Buttons, right-aligned: [Cancel] [Primary]. Full width on phones.
  footer: React.ReactNode
  // Leading mark beside the title, e.g. ConfirmDialog's tone icon
  icon?: React.ReactNode
  // Element focused on open, e.g. Cancel so a stray Enter never confirms
  initialFocus?: React.RefObject<HTMLElement | null>
  // false while closing would lose data: a click on the backdrop no longer closes it
  isDismissible?: boolean
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
  // The action being decided, e.g. "Delete forecast #180"
  title: string
}

// Centred modal for a decision: title (with an optional icon) and description on
// top, the buttons in a footer strip. Esc and Cancel close it.
const Dialog = ({
  children,
  className,
  footer,
  icon,
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
      {/* Rendered even when nested in a Sheet, so the sheet dims too */}
      <BaseDialog.Backdrop
        className="bg-scrim fixed inset-0 z-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0"
        forceRender
      />
      <BaseDialog.Popup
        className={cn(
          'rounded-card bg-surface shadow-menu text-ink fixed top-1/2 left-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md -translate-1/2 flex-col overflow-hidden outline-hidden',
          'transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0',
          className,
        )}
        initialFocus={initialFocus}
      >
        <div className="flex min-h-0 gap-4 overflow-y-auto p-5">
          {icon}
          <div className="flex min-w-0 flex-1 flex-col gap-1.5">
            <BaseDialog.Title className="text-heading font-bold text-pretty">
              {title}
            </BaseDialog.Title>
            {children && <div className="text-copy text-body text-pretty">{children}</div>}
          </div>
        </div>
        <div className="border-rule bg-canvas flex shrink-0 justify-end gap-2 border-t px-5 py-3 *:flex-1 sm:*:flex-none">
          {footer}
        </div>
      </BaseDialog.Popup>
    </BaseDialog.Portal>
  </BaseDialog.Root>
)

export default Dialog
