'use client'

import { ConfirmDialog } from '@ds/patterns'
import { useTranslations } from 'next-intl'

import { type ConfirmationType, confirmationTypes } from './confirmationTypes'

type ConfirmationDialogProps = {
  cancelLabel?: string
  // Rich body in place of the message: paragraphs, a ConfirmationList, a summary
  children?: React.ReactNode
  confirmLabel?: string
  isOpen: boolean
  // What happens, e.g. "The forecast is deleted permanently. This can’t be undone."
  message?: string
  // Cancel, Esc, × or a click outside
  onCancel: VoidFunction
  // Return the request's promise: Confirm spins until it settles, then the dialog
  // closes — or stays open if it rejects (the handler toasts why)
  onConfirm: () => Promise<unknown> | void
  // The action, e.g. "Delete forecast #180"
  title?: string
  type?: ConfirmationType
}

// "Are you sure?" before anything that can't be taken back. `type` sets the
// tone and default texts; pass texts only to be more specific.
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
  const { hasCancelLabel, hasMessage, hasPendingLabel, tone } = confirmationTypes[type]
  const key = `common.confirmation.${type}`
  const defaultCancelLabel = hasCancelLabel ? t(`${key}.cancel`) : t('common.actions.cancel')
  const defaultMessage = hasMessage ? <p>{t(`${key}.message`)}</p> : null
  const body = children ?? (message ? <p>{message}</p> : defaultMessage)

  const handleOpenChange = (nextIsOpen: boolean) => !nextIsOpen && onCancel()

  return (
    <ConfirmDialog
      cancelLabel={cancelLabel ?? defaultCancelLabel}
      closeLabel={t('common.actions.close')}
      confirmLabel={confirmLabel ?? t(`${key}.confirm`)}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onOpenChange={handleOpenChange}
      pendingLabel={hasPendingLabel ? t(`${key}.pending`) : undefined}
      title={title ?? t(`${key}.title`)}
      tone={tone}
    >
      {body}
    </ConfirmDialog>
  )
}

export default ConfirmationDialog
