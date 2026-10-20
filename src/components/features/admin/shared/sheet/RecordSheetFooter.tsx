import { ConfirmationDialog } from '@components/shared'

import type { RecordSheetConfirm } from './useRecordSheet'

type RecordSheetFooterProps = {
  // The footer of the current mode (view actions, or Cancel / Save)
  children: React.ReactNode
  confirm: RecordSheetConfirm
  deleteMessage: string
  deleteTitle: string
  onConfirmCancel: VoidFunction
  // Returns the request, so the dialog spins until it's done
  onDelete: () => Promise<unknown> | void
  onDiscard: VoidFunction
}

// Footer of a record sheet. A pending question (delete? discard?) opens a dialog
// over the sheet — rendered inside it, so it nests.
const RecordSheetFooter = ({
  children,
  confirm,
  deleteMessage,
  deleteTitle,
  onConfirmCancel,
  onDelete,
  onDiscard,
}: RecordSheetFooterProps) => (
  <>
    {children}
    <ConfirmationDialog
      isOpen={confirm === 'delete'}
      message={deleteMessage}
      onCancel={onConfirmCancel}
      onConfirm={onDelete}
      title={deleteTitle}
      type="delete"
    />
    <ConfirmationDialog
      isOpen={confirm === 'close' || confirm === 'leave'}
      onCancel={onConfirmCancel}
      onConfirm={onDiscard}
      type="discard"
    />
  </>
)

export default RecordSheetFooter
