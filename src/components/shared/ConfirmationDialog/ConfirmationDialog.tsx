'use client'

import { ConfirmDialog } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { type ConfirmationType, confirmationTypes } from './confirmationTypes'

type ConfirmationDialogProps = {
  cancelLabel?: string
  // Rich content in place of the message, e.g. a summary of what goes out
  children?: React.ReactNode
  confirmLabel?: string
  isOpen: boolean
  // What happens, e.g. "Forecast #180 is deleted permanently. This can’t be undone."
  message?: string
  // Cancel, Esc or a click outside
  onCancel: VoidFunction
  // Return the request's promise: Confirm spins until it settles, then the
  // dialog closes (stays open if it rejects)
  onConfirm: () => Promise<unknown> | void
  // The action, e.g. "Delete forecast #180"
  title?: string
  type?: ConfirmationType
}

// "Are you sure?" before anything that can't be taken back. `type` sets the
// icon, colour and default texts; pass texts only to be more specific.
const ConfirmationDialog = ({
  cancelLabel,
  children,
  confirmLabel,
  isOpen,
  message,
  onCancel,
  onConfirm,
  title,
  type = 'confirm',
}: ConfirmationDialogProps) => {
  const t = useTranslations()
  const { hasCancelLabel, hasMessage, icon, tone } = confirmationTypes[type]
  const key = `common.confirmation.${type}`
  const defaultCancelLabel = hasCancelLabel ? t(`${key}.cancel`) : t('common.actions.cancel')
  const defaultMessage = hasMessage ? t(`${key}.message`) : null

  const handleOpenChange = (nextIsOpen: boolean) => !nextIsOpen && onCancel()

  return (
    <ConfirmDialog
      cancelLabel={cancelLabel ?? defaultCancelLabel}
      confirmLabel={confirmLabel ?? t(`${key}.confirm`)}
      icon={icon}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onOpenChange={handleOpenChange}
      title={title ?? t(`${key}.title`)}
      tone={tone}
    >
      {children ?? message ?? defaultMessage}
    </ConfirmDialog>
  )
}

export default ConfirmationDialog
