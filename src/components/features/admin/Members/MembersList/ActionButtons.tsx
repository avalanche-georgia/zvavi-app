import { IconButton, Tooltip } from '@components/ui'
import { useTranslations } from 'next-intl'

type ActionButtonsProps = {
  editHref: string
  onDelete: VoidFunction
}

const ActionButtons = ({ editHref, onDelete }: ActionButtonsProps) => {
  const t = useTranslations()

  return (
    <div className="flex items-center justify-end gap-2">
      <Tooltip content={t('admin.members.actions.edit')}>
        <span>
          <IconButton href={editHref} iconProps={{ icon: 'pencil' }} />
        </span>
      </Tooltip>
      <Tooltip content={t('admin.members.actions.delete')}>
        <span>
          <IconButton iconProps={{ icon: 'trash' }} onClick={onDelete} />
        </span>
      </Tooltip>
    </div>
  )
}

export default ActionButtons
