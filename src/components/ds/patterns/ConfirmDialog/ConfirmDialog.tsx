'use client'

import { useRef } from 'react'

import { Button, Dialog } from '../../primitives'

type ConfirmDialogProps = {
  cancelLabel: string
  // What the confirmation is about: a sentence, or a summary of what goes out
  children: React.ReactNode
  confirmLabel: string
  isOpen: boolean
  onConfirm: VoidFunction
  onOpenChange: (isOpen: boolean) => void
  title: string
  tone?: 'danger' | 'default'
}

// "Are you sure?" with room for a summary. Prefer ConfirmPopover when one
// sentence is enough. Focus starts on Cancel so a stray Enter never confirms.
const ConfirmDialog = ({
  cancelLabel,
  children,
  confirmLabel,
  isOpen,
  onConfirm,
  onOpenChange,
  title,
  tone = 'default',
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)

  const handleCancel = () => onOpenChange(false)

  const handleConfirm = () => {
    onOpenChange(false)
    onConfirm()
  }

  const footer = (
    <>
      <Button ref={cancelRef} onClick={handleCancel} variant="secondary">
        {cancelLabel}
      </Button>
      <Button onClick={handleConfirm} variant={tone === 'danger' ? 'danger' : 'primary'}>
        {confirmLabel}
      </Button>
    </>
  )

  return (
    <Dialog
      footer={footer}
      initialFocus={cancelRef}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title={title}
    >
      {children}
    </Dialog>
  )
}

export default ConfirmDialog
