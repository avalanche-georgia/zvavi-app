import { ConfirmDialog } from '@ds/patterns'
import { useTranslations } from 'next-intl'

type DiscardDialogProps = {
  isOpen: boolean
  onCancel: VoidFunction
  onConfirm: VoidFunction
}

// "Discard unsaved changes?" — asked before a sheet or form drops unsaved input
const DiscardDialog = ({ isOpen, onCancel, onConfirm }: DiscardDialogProps) => {
  const t = useTranslations()

  const handleOpenChange = (nextIsOpen: boolean) => !nextIsOpen && onCancel()

  return (
    <ConfirmDialog
      cancelLabel={t('admin.shared.sheet.keepEditing')}
      confirmLabel={t('admin.shared.sheet.discard')}
      isOpen={isOpen}
      onConfirm={onConfirm}
      onOpenChange={handleOpenChange}
      title={t('admin.shared.sheet.discardConfirm')}
      tone="danger"
    />
  )
}

export default DiscardDialog
