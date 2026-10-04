'use client'

import { useRef, useState } from 'react'
import { Popover } from '@base-ui/react/popover'

import { Button } from '../Button'

type ConfirmPopoverProps = {
  cancelLabel: string
  // The control that asks, e.g. a trash IconButton — rendered as the trigger
  children: React.ReactElement<Record<string, unknown>>
  confirmLabel: string
  message: string
  onConfirm: VoidFunction
}

// "Are you sure?" anchored to the control that asked, for destructive actions.
// Floats over the page (nothing shifts); Esc, a click outside or opening another
// one closes it. Focus starts on Cancel so a stray Enter never confirms.
const ConfirmPopover = ({
  cancelLabel,
  children,
  confirmLabel,
  message,
  onConfirm,
}: ConfirmPopoverProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleConfirm = () => {
    setIsOpen(false)
    onConfirm()
  }

  return (
    <Popover.Root onOpenChange={setIsOpen} open={isOpen}>
      <Popover.Trigger render={children} />
      <Popover.Portal>
        <Popover.Positioner align="end" className="z-60" collisionPadding={16} sideOffset={6}>
          <Popover.Popup
            className="rounded-control bg-surface shadow-float border-rule flex max-w-80 flex-col gap-3 border p-3.5 outline-hidden transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
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
