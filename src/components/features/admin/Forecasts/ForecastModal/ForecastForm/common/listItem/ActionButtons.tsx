import { IconButton } from '@components/ui'

type ActionButtonsProps = {
  canEdit?: boolean
  onDelete: VoidFunction
  onEdit: VoidFunction
}

const ActionButtons = ({ canEdit = true, onDelete, onEdit }: ActionButtonsProps) => (
  <div className="flex items-center gap-2">
    <IconButton disabled={!canEdit} iconProps={{ icon: 'pencil' }} onClick={onEdit} />
    <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
  </div>
)

export default ActionButtons
