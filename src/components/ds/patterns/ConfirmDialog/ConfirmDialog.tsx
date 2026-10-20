'use client'

import { useRef } from 'react'

import { Button, Dialog } from '../../primitives'

type ConfirmDialogProps = {
  cancelLabel: string
  // More about what happens, e.g. a summary of what goes out. Left out when the
  // question says it all.
  children?: React.ReactNode
  confirmLabel: string
  // The confirmed action is running. Passing it at all means the caller closes
  // the dialog once the action is done; until then it can't be dismissed.
  isBusy?: boolean
  isOpen: boolean
  onConfirm: VoidFunction
  onOpenChange: (isOpen: boolean) => void
  // The question
  title: string
  tone?: 'danger' | 'default'
}

// "Are you sure?" in a centred modal, for anything that can't be taken back.
// Inside a Sheet, render it within the sheet so it nests: Esc closes only the
// dialog. Focus starts on Cancel so a stray Enter never confirms.
const ConfirmDialog = ({
  cancelLabel,
  children,
  confirmLabel,
  isBusy,
  isOpen,
  onConfirm,
  onOpenChange,
  title,
  tone = 'default',
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const closesItself = isBusy === undefined

  const handleOpenChange = (nextIsOpen: boolean) => {
    if (isBusy) return

    onOpenChange(nextIsOpen)
  }

  const handleCancel = () => handleOpenChange(false)

  // The action runs first: closing reports through onOpenChange, which callers
  // often treat as "cancelled"
  const handleConfirm = () => {
    onConfirm()

    if (closesItself) onOpenChange(false)
  }

  const footer = (
    <>
      <Button ref={cancelRef} disabled={isBusy} onClick={handleCancel} variant="secondary">
        {cancelLabel}
      </Button>
      <Button
        isBusy={isBusy}
        onClick={handleConfirm}
        variant={tone === 'danger' ? 'danger' : 'primary'}
      >
        {confirmLabel}
      </Button>
    </>
  )

  return (
    <Dialog
      footer={footer}
      initialFocus={cancelRef}
      isDismissible={!isBusy}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      title={title}
    >
      {children}
    </Dialog>
  )
}

export default ConfirmDialog
