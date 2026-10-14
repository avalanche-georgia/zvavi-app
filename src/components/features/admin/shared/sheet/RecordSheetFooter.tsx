import { useTranslations } from 'next-intl'

import DiscardConfirm from './DiscardConfirm'
import FooterConfirm from './FooterConfirm'
import type { RecordSheetConfirm } from './useRecordSheet'

type RecordSheetFooterProps = {
  // The footer of the current mode (view actions, or Cancel / Save)
  children: React.ReactNode
  confirm: RecordSheetConfirm
  deleteMessage: string
  isDeleting: boolean
  onConfirmCancel: VoidFunction
  onDelete: VoidFunction
  onDiscard: VoidFunction
}

// Footer of a record sheet. A pending question (delete? discard?) takes it over —
// a second modal stacked on the sheet would fight its focus trap.
const RecordSheetFooter = ({
  children,
  confirm,
  deleteMessage,
  isDeleting,
  onConfirmCancel,
  onDelete,
  onDiscard,
}: RecordSheetFooterProps) => {
  const t = useTranslations()

  if (confirm === 'delete') {
    return (
      <FooterConfirm
        cancelLabel={t('common.actions.cancel')}
        confirmLabel={t('common.actions.delete')}
        isBusy={isDeleting}
        message={deleteMessage}
        onCancel={onConfirmCancel}
        onConfirm={onDelete}
      />
    )
  }

  if (confirm) return <DiscardConfirm onCancel={onConfirmCancel} onConfirm={onDiscard} />

  return children
}

export default RecordSheetFooter
