import { IconButton, Tooltip } from '@components/ui'
import { useTranslations } from 'next-intl'

type ActionButtonsProps = {
  editHref: string
  isPublished: boolean
  onDelete: VoidFunction
  onDuplicate: VoidFunction
  onStatusToggle: VoidFunction
}

const ActionButtons = ({
  editHref,
  isPublished,
  onDelete,
  onDuplicate,
  onStatusToggle,
}: ActionButtonsProps) => {
  const t = useTranslations('admin.forecasts.actions')

  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip content={t(isPublished ? 'unpublish' : 'publish')}>
        <IconButton iconProps={{ icon: isPublished ? 'eyeOff' : 'eye' }} onClick={onStatusToggle} />
      </Tooltip>
      <Tooltip content={t('duplicate')}>
        <IconButton iconProps={{ icon: 'copy' }} onClick={onDuplicate} />
      </Tooltip>
      <Tooltip content={t('edit')}>
        <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
      </Tooltip>
      <Tooltip content={t('delete')}>
        <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
      </Tooltip>
    </div>
  )
}

export default ActionButtons
