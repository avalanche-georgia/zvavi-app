import { IconButton } from '@components/shared'

type ActionButtonsProps = {
  isPublished: boolean
  onDelete: VoidFunction
  onEdit: VoidFunction
  onStatusToggle: VoidFunction
}

const ActionButtons = ({ isPublished, onDelete, onEdit, onStatusToggle }: ActionButtonsProps) => (
  <div className="flex items-center justify-end gap-2">
    <IconButton iconProps={{ icon: isPublished ? 'eyeOff' : 'eye' }} onClick={onStatusToggle} />
    <IconButton iconProps={{ icon: 'pencil' }} onClick={onEdit} />
    <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
  </div>
)

export default ActionButtons
