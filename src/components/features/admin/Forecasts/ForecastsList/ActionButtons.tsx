import { IconButton } from '@components/ui'

type ActionButtonsProps = {
  editHref: string
  isPublished: boolean
  onDelete: VoidFunction
  onStatusToggle: VoidFunction
}

const ActionButtons = ({ editHref, isPublished, onDelete, onStatusToggle }: ActionButtonsProps) => (
  <div className="flex items-center justify-end gap-2">
    <IconButton iconProps={{ icon: isPublished ? 'eyeOff' : 'eye' }} onClick={onStatusToggle} />
    <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
    <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
  </div>
)

export default ActionButtons
