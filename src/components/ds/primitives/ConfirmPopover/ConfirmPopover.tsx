'use client'

import { useRef, useState } from 'react'
import { Popover } from '@base-ui/react/popover'

import { Button } from '../Button'

type ConfirmPopoverProps = {
  // Controlled mode: position against this element instead of a trigger
  anchor?: React.RefObject<HTMLElement | null>
  cancelLabel: string
  // The control that asks, e.g. a trash IconButton — rendered as the trigger.
  // Leave it out (and pass anchor + isOpen) when something else asks, like a menu item.
  children?: React.ReactElement<Record<string, unknown>>
  confirmLabel: string
  isOpen?: boolean
  message: string
  onConfirm: VoidFunction
  onOpenChange?: (isOpen: boolean) => void
}

// "Are you sure?" anchored to the control that asked, for destructive actions.
// Floats over the page (nothing shifts); Esc, a click outside or opening another
// one closes it. Focus starts on Cancel so a stray Enter never confirms.
const ConfirmPopover = ({
  anchor,
  cancelLabel,
  children,
  confirmLabel,
  isOpen,
  message,
  onConfirm,
  onOpenChange,
}: ConfirmPopoverProps) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const open = isOpen ?? internalIsOpen
  const setOpen = onOpenChange ?? setInternalIsOpen

  const handleConfirm = () => {
    setOpen(false)
    onConfirm()
  }

  return (
    <Popover.Root onOpenChange={setOpen} open={open}>
      {children && <Popover.Trigger render={children} />}
      <Popover.Portal>
        <Popover.Positioner
          align="end"
          anchor={anchor}
          className="z-60"
          collisionPadding={16}
          sideOffset={6}
        >
          <Popover.Popup
            className="rounded-control bg-surface shadow-float border-rule flex max-w-80 flex-col gap-3 border p-3.5 outline-hidden transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
            finalFocus={anchor}
            initialFocus={cancelRef}
          >
            <Popover.Description className="text-copy-sm text-ink font-semibold">
              {message}
            </Popover.Description>
            <div className="flex justify-end gap-2">
              <Popover.Close ref={cancelRef} render={<Button size="sm" variant="secondary" />}>
                {cancelLabel}
              </Popover.Close>
              <Button onClick={handleConfirm} size="sm" variant="danger">
                {confirmLabel}
              </Button>
            </div>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  )
}

export default ConfirmPopover
