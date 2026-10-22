'use client'

import { useRef } from 'react'

import { type ConfirmDialogTone, confirmDialogTones } from './confirmDialogTones'
import useConfirmAction from './useConfirmAction'
import { Button, Dialog } from '../../primitives'

import { cn } from '@/lib/utils'

type ConfirmDialogProps = {
  cancelLabel: string
  // The body: the consequence, maybe a DialogList of what it touches
  children?: React.ReactNode
  closeLabel: string
  // The verb from the title: "Delete", "Publish", "Discard"
  confirmLabel: string
  isOpen: boolean
  // Return a promise for an async action (a request): Confirm spins and nothing
  // can dismiss the dialog until it settles; resolved → closes, rejected → stays
  // open, the caller says why (a toast). A plain function closes it right away.
  onConfirm: () => Promise<unknown> | void
  onOpenChange: (isOpen: boolean) => void
  // Confirm's label while the action runs: "Deleting…"
  pendingLabel?: string
  // The action, e.g. "Delete forecast #180" ("?" only for warning questions)
  title: string
  tone?: ConfirmDialogTone
}

// "Are you sure?" with the action as the title, its consequence in the body,
// [Cancel] [Confirm] below. The tone sets the icon, the confirm button and where
// focus starts. Inside a Sheet, render it within the sheet so it nests: Esc
// closes only the dialog.
const ConfirmDialog = ({
  cancelLabel,
  children,
  closeLabel,
  confirmLabel,
  isOpen,
  onConfirm,
  onOpenChange,
  pendingLabel,
  title,
  tone = 'info',
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const confirmRef = useRef<HTMLButtonElement>(null)
  const { button, focusesCancel, icon: Icon, role, tile } = confirmDialogTones[tone]
  const { handleConfirm, isBusy } = useConfirmAction({
    onConfirm,
    onOpenChange,
  })

  const handleCancel = () => onOpenChange(false)

  const footer = (
    <>
      <Button ref={cancelRef} disabled={isBusy} onClick={handleCancel} variant="secondary">
        {cancelLabel}
      </Button>
      <Button ref={confirmRef} isBusy={isBusy} onClick={handleConfirm} variant={button}>
        {isBusy && pendingLabel ? pendingLabel : confirmLabel}
      </Button>
    </>
  )

  return (
    <Dialog
      closeLabel={closeLabel}
      footer={footer}
      icon={
        <span
          aria-hidden
          className={cn('rounded-control grid size-9 shrink-0 place-items-center', tile)}
        >
          <Icon className="size-5" />
        </span>
      }
      initialFocus={focusesCancel ? cancelRef : confirmRef}
      isBusy={isBusy}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      role={role}
      title={title}
    >
      {children}
    </Dialog>
  )
}

export default ConfirmDialog
