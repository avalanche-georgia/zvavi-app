'use client'

import { useRef, useState } from 'react'
import { Info, type LucideIcon, OctagonAlert, TriangleAlert } from 'lucide-react'

import { Button, Dialog } from '../../primitives'

import { cn } from '@/lib/utils'

const isPromiseLike = (value: unknown): value is PromiseLike<unknown> =>
  typeof (value as PromiseLike<unknown> | undefined)?.then === 'function'

export type ConfirmDialogTone = 'danger' | 'info' | 'warning'

type ConfirmDialogProps = {
  cancelLabel: string
  // What happens if confirmed — the consequence, e.g. "This can't be undone."
  children?: React.ReactNode
  // The action, e.g. "Delete"
  confirmLabel: string
  // Replaces the tone's icon with one naming the action (Trash2 for delete…)
  icon?: LucideIcon
  isOpen: boolean
  // Return a promise for an async action (a request): Confirm spins and the
  // dialog can't be dismissed until it settles; resolved → closes, rejected →
  // stays open to retry. A plain function closes the dialog right away.
  onConfirm: () => Promise<unknown> | void
  onOpenChange: (isOpen: boolean) => void
  // The action being confirmed, e.g. "Delete forecast #180"
  title: string
  tone?: ConfirmDialogTone
}

// danger: gone for good (delete). warning: something is lost but nothing saved
// is touched (discard unsaved input, leave a form). info: a weighty step that
// isn't destructive (publish).
const toneStyles: Record<
  ConfirmDialogTone,
  { button: 'danger' | 'primary'; icon: LucideIcon; mark: string }
> = {
  danger: { button: 'danger', icon: OctagonAlert, mark: 'bg-danger/10 text-danger' },
  info: { button: 'primary', icon: Info, mark: 'bg-accent-soft text-accent' },
  warning: { button: 'danger', icon: TriangleAlert, mark: 'bg-warning-soft text-warning' },
}

// "Are you sure?" in a centred modal: the action as the title, its consequence
// below, [Cancel] [Confirm]. The tone picks the icon, its colour and the confirm
// button. Inside a Sheet, render it within the sheet so it nests: Esc closes only
// the dialog. Focus starts on Cancel so a stray Enter never confirms.
const ConfirmDialog = ({
  cancelLabel,
  children,
  confirmLabel,
  icon,
  isOpen,
  onConfirm,
  onOpenChange,
  title,
  tone = 'info',
}: ConfirmDialogProps) => {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const [isBusy, setIsBusy] = useState(false)
  const { button, icon: toneIcon, mark } = toneStyles[tone]
  const Icon = icon ?? toneIcon

  const handleOpenChange = (nextIsOpen: boolean) => {
    if (isBusy) return

    onOpenChange(nextIsOpen)
  }

  const handleCancel = () => handleOpenChange(false)

  // The action runs first: closing reports through onOpenChange, which callers
  // often treat as "cancelled"
  const handleConfirm = async () => {
    if (isBusy) return

    const result = onConfirm()

    if (!isPromiseLike(result)) return onOpenChange(false)

    setIsBusy(true)

    try {
      await result
      onOpenChange(false)
    } catch {
      // The caller reports the failure; the dialog stays open to try again
    } finally {
      setIsBusy(false)
    }
  }

  const footer = (
    <>
      <Button ref={cancelRef} disabled={isBusy} onClick={handleCancel} variant="secondary">
        {cancelLabel}
      </Button>
      <Button isBusy={isBusy} onClick={handleConfirm} variant={button}>
        {confirmLabel}
      </Button>
    </>
  )

  return (
    <Dialog
      footer={footer}
      icon={
        <span
          aria-hidden
          className={cn('grid size-10 shrink-0 place-items-center rounded-full', mark)}
        >
          <Icon className="size-5" />
        </span>
      }
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
