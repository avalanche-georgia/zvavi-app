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
        <span>
          <IconButton
            iconProps={{ icon: isPublished ? 'eyeOff' : 'eye' }}
            onClick={onStatusToggle}
          />
        </span>
      </Tooltip>
      <Tooltip content={t('duplicate')}>
        <span>
          <IconButton iconProps={{ icon: 'copy' }} onClick={onDuplicate} />
        </span>
      </Tooltip>
      <Tooltip content={t('edit')}>
        <span>
          <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
        </span>
      </Tooltip>
      <Tooltip content={t('delete')}>
        <span>
          <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
        </span>
      </Tooltip>
    </div>
  )
}

export default ActionButtons
