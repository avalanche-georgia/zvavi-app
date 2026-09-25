import { ConfirmationDialog } from '@components/shared'
import { useTranslations } from 'next-intl'

type RowDeleteDialogProps = {
  isOpen: boolean
  onClose: VoidFunction
  onConfirm: VoidFunction
}

const RowDeleteDialog = ({ isOpen, onClose, onConfirm }: RowDeleteDialogProps) => {
  const t = useTranslations()

  return (
    <ConfirmationDialog
      description={t('admin.recentAvalanches.actions.deleteDescription')}
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={onConfirm}
      title={t('admin.recentAvalanches.actions.deleteTitle')}
      variant="delete"
    />
  )
}

export default RowDeleteDialog
