import { ConfirmDialog } from '@ds/patterns'
import { useTranslations } from 'next-intl'

type DeleteDialogProps = {
  // The record is being deleted: the dialog stays open until it's done
  isBusy: boolean
  isOpen: boolean
  // The question, naming what goes and what goes with it
  message: string
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

// "Delete … permanently?" — asked before a record is deleted from its sheet or page
const DeleteDialog = ({ isBusy, isOpen, message, onCancel, onConfirm }: DeleteDialogProps) => {
  const t = useTranslations()

  const handleOpenChange = (nextIsOpen: boolean) => !nextIsOpen && onCancel()

  return (
    <ConfirmDialog
      cancelLabel={t('common.actions.cancel')}
      confirmLabel={t('common.actions.delete')}
      isBusy={isBusy}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onOpenChange={handleOpenChange}
      title={message}
      tone="danger"
    />
  )
}

export default DeleteDialog
