import DeleteDialog from './DeleteDialog'
import DiscardDialog from './DiscardDialog'
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

// Footer of a record sheet. A pending question (delete? discard?) opens a dialog
// over the sheet — rendered inside it, so it nests.
const RecordSheetFooter = ({
  children,
  confirm,
  deleteMessage,
  isDeleting,
  onConfirmCancel,
  onDelete,
  onDiscard,
}: RecordSheetFooterProps) => (
  <>
    {children}
    <DeleteDialog
      isBusy={isDeleting}
      isOpen={confirm === 'delete'}
      message={deleteMessage}
      onCancel={onConfirmCancel}
      onConfirm={onDelete}
    />
    <DiscardDialog
      isOpen={confirm === 'close' || confirm === 'leave'}
      onCancel={onConfirmCancel}
      onConfirm={onDiscard}
    />
  </>
)

export default RecordSheetFooter
