'use client'

import { useRef } from 'react'
import { Dialog } from '@base-ui/react/dialog'

import { Button } from '../Button'

type ConfirmDialogProps = {
  cancelLabel: string
  // What is being confirmed: a summary, a consequence — anything beyond one line
  children: React.ReactNode
  confirmLabel: string
  isOpen: boolean
  onConfirm: VoidFunction
  onOpenChange: (isOpen: boolean) => void
  title: string
}

// Centred confirmation for a weighty, non-destructive action that needs more
// than one line of context (destructive ones use ConfirmPopover). Esc, a click
// outside or Cancel close it; focus starts on Cancel so a stray Enter never confirms.
const ConfirmDialog = ({
  cancelLabel,
  children,
  confirmLabel,
  isOpen,
  onConfirm,
  onOpenChange,
  title,
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleConfirm = () => {
    onOpenChange(false)
    onConfirm()
  }

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={isOpen}>
      <Dialog.Portal>
        <Dialog.Backdrop className="bg-ink/40 fixed inset-0 z-60 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0" />
        <Dialog.Popup
          className="rounded-card bg-surface shadow-overlay text-ink fixed top-1/2 left-1/2 z-60 flex w-[calc(100vw-2rem)] max-w-md -translate-1/2 flex-col gap-4 p-5 outline-hidden transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0"
          initialFocus={cancelRef}
        >
          <Dialog.Title className="text-copy-lg font-semibold">{title}</Dialog.Title>
          <div className="text-copy-sm flex flex-col gap-3">{children}</div>
          <div className="flex justify-end gap-2">
            <Dialog.Close ref={cancelRef} render={<Button size="md" variant="secondary" />}>
              {cancelLabel}
            </Dialog.Close>
            <Button onClick={handleConfirm} size="md" variant="primary">
              {confirmLabel}
            </Button>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default ConfirmDialog
